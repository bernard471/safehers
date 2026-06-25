import { NextRequest, NextResponse } from "next/server";
import { Resend } from "@/lib/mail";
import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";
import { checkRateLimit } from "@/lib/rateLimiter";
import {
  contactConfirmationEmail,
  contactNotificationEmail,
} from "@/lib/email-templates";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const NOTIFICATION_EMAIL =
  process.env.NOTIFICATION_EMAIL ?? "hello@safehers.africa";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, organization, interest, message, country, website } =
      body;

    // ── Honeypot — bots fill hidden "website" field; humans leave it blank ──
    if (website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // ── Rate limiting ────────────────────────────────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!(await checkRateLimit(ip))) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // ── Validation ───────────────────────────────────────────────────────────
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // ── Persist to MongoDB ───────────────────────────────────────────────────
    try {
      await connectDB();
      await Contact.create({ name, email, organization, interest, message, country });
    } catch (dbErr) {
      console.error("[contact] DB error:", dbErr);
      // Don't block the user — still send emails if DB is down
    }

    // ── Send emails via Resend ───────────────────────────────────────────────
    if (resend) {
      const results = await Promise.allSettled([
        resend.emails.send({
          from: "SafeHer Foundation <noreply@safehers.africa>",
          to: email,
          subject: "We received your message — SafeHer Foundation",
          html: contactConfirmationEmail(name),
        }),
        resend.emails.send({
          from: "SafeHer Foundation <noreply@safehers.africa>",
          to: NOTIFICATION_EMAIL,
          subject: `New contact from ${name} — SafeHer Foundation`,
          html: contactNotificationEmail({
            name,
            email,
            organization,
            interest,
            country,
            message,
          }),
        }),
      ]);
      results.forEach((r, i) => {
        if (r.status === "rejected")
          console.error(`[contact] Email ${i} failed:`, r.reason);
      });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
