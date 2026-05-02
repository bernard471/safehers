import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { connectDB } from "@/lib/mongodb";
import { Newsletter } from "@/models/Newsletter";
import { checkRateLimit } from "@/lib/rateLimiter";
import { newsletterWelcomeEmail } from "@/lib/email-templates";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, website } = body;

    // ── Honeypot ─────────────────────────────────────────────────────────────
    if (website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // ── Rate limiting ─────────────────────────────────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // ── Validation ────────────────────────────────────────────────────────────
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email." },
        { status: 400 }
      );
    }

    // ── Persist ───────────────────────────────────────────────────────────────
    let isNew = false;
    try {
      await connectDB();
      const result = await Newsletter.findOneAndUpdate(
        { email },
        { email },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      // If createdAt equals updatedAt it's a brand-new subscriber
      isNew = !!(
        result.createdAt &&
        result.updatedAt &&
        result.createdAt.getTime() === result.updatedAt.getTime()
      );
    } catch (dbErr) {
      console.error("[newsletter] DB error:", dbErr);
      isNew = true; // assume new and send welcome anyway
    }

    // ── Welcome email (only for genuinely new subscribers) ───────────────────
    if (resend && isNew) {
      resend.emails
        .send({
          from: "SafeHers <hello@safehers.africa>",
          to: email,
          subject: "Welcome to SafeHers ✦",
          html: newsletterWelcomeEmail(email),
        })
        .catch((e: unknown) => console.error("[newsletter] Email failed:", e));
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[newsletter] error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
