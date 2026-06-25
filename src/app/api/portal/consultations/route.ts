import { NextRequest, NextResponse } from "next/server";
import { Resend } from "@/lib/mail";
import { connectDB } from "@/lib/mongodb";
import { Consultation } from "@/models/Consultation";
import { requireAuth } from "@/lib/rbac";
import { checkRateLimit } from "@/lib/rateLimiter";
import { consultationBookedEmail } from "@/lib/email-templates";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function GET() {
  try {
    const auth = await requireAuth();
    if (!auth.authorized) return auth.response!;

    await connectDB();
    const consultations = await Consultation.find({ user: auth.session!.user.id })
      .select("type format preferredDate status urgency createdAt confirmedDate")
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ consultations });
  } catch {
    return NextResponse.json({ consultations: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!(await checkRateLimit(ip))) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    const auth = await requireAuth();
    if (!auth.authorized) return auth.response!;

    const body = await req.json();
    const { type, format, preferredDate, preferredTime, description, urgency } = body;
    if (!type || !preferredDate || !description) {
      return NextResponse.json({ error: "Type, date and description are required." }, { status: 400 });
    }
    if (description.length > 1000) {
      return NextResponse.json({ error: "Description too long (max 1000 characters)." }, { status: 400 });
    }

    await connectDB();

    await Consultation.create({
      user: auth.session!.user.id,
      type,
      format: format || "virtual",
      preferredDate: new Date(preferredDate),
      preferredTime,
      description,
      urgency: urgency || "standard",
    });

    if (resend && auth.session!.user.email) {
      const dateStr = new Date(preferredDate).toLocaleDateString("en-GB", {
        day: "numeric", month: "long", year: "numeric",
      });
      resend.emails.send({
        from: "SafeHer Foundation <noreply@safehers.africa>",
        to: auth.session!.user.email,
        subject: "Consultation request received — SafeHer Foundation",
        html: consultationBookedEmail(auth.session!.user.name, type, dateStr),
      }).catch((e: unknown) => console.error("[consultation] Email failed:", e));
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[portal/consultations]", err);
    return NextResponse.json({ error: "Booking failed." }, { status: 500 });
  }
}
