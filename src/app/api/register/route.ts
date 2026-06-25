import { NextRequest, NextResponse } from "next/server";
import { Resend } from "@/lib/mail";
import { connectDB } from "@/lib/mongodb";
import { Registration } from "@/models/Registration";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = process.env.RESEND_FROM_EMAIL ?? "hello@safehers.africa";
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL ?? FROM;

// ── Email helpers ─────────────────────────────────────────────────────────────

function confirmationHtml(name: string) {
  return `
<!DOCTYPE html><html><head><meta charset="utf-8"/></head><body style="margin:0;padding:0;background:#FAF6EF;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:40px auto;background:#FAF6EF;">
    <tr><td style="background:#0E0E10;padding:28px 40px;">
      <span style="font-family:Georgia,serif;font-size:22px;color:#FAF6EF;letter-spacing:-0.02em;">SafeHers</span>
      <span style="color:#E8B4B8;font-size:16px;margin-left:6px;">✦</span>
    </td></tr>
    <tr><td style="padding:48px 40px 32px;">
      <p style="font-family:Georgia,serif;font-size:40px;line-height:1;color:#0E0E10;margin:0 0 24px;">You&rsquo;re on the list.</p>
      <p style="font-size:16px;line-height:1.7;color:#0E0E10;margin:0 0 16px;">Hi ${name}, you are on the waitlist for the SafeHers Personal Safety Training founding cohort. We will be in touch as soon as launch dates are confirmed &mdash; you will be first to know.</p>
      <p style="font-size:16px;line-height:1.7;color:#0E0E10;margin:0 0 32px;">In the meantime, visit <a href="https://safehers.africa" style="color:#5C1F2E;">safehers.africa</a> to learn more about the programme.</p>
      <p style="font-size:14px;color:#0E0E10;margin:0;">With care,<br/><strong>Zarinah Traci</strong><br/><span style="opacity:0.6;">Co-Founder, SafeHers</span></p>
    </td></tr>
    <tr><td style="background:#0E0E10;padding:20px 40px;">
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#FAF6EF;opacity:0.4;margin:0;">
        SafeHers &mdash; Pan-African Safety Education
      </p>
    </td></tr>
  </table>
</body></html>`;
}

function adminHtml(reg: {
  name: string; email: string; country?: string;
  format?: string; phone?: string; learningGoals?: string;
}) {
  return `<pre style="font-family:monospace;font-size:13px;">New Registration\n\nName:   ${reg.name}\nEmail:  ${reg.email}\nCountry: ${reg.country ?? "-"}\nFormat: ${reg.format ?? "-"}\nPhone:  ${reg.phone ?? "-"}\n\nLearning goals:\n${reg.learningGoals ?? "(none)"}</pre>`;
}

async function sendEmails(reg: {
  name: string; email: string; country?: string;
  format?: string; phone?: string; learningGoals?: string;
}) {
  if (!resend) {
    console.log("[register] No RESEND_API_KEY — emails skipped. Registration:", reg);
    return;
  }
  try {
    resend.emails.send({
      from: FROM,
      to: reg.email,
      subject: "You're on the SafeHers waitlist ✦",
      html: confirmationHtml(reg.name),
    });
  } catch (e) {
    console.error("[register] Confirmation email failed:", e);
  }
  try {
    resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      subject: `New SafeHers registration — ${reg.name}`,
      html: adminHtml(reg),
    });
  } catch (e) {
    console.error("[register] Admin notification failed:", e);
  }
}

// ── POST handler ──────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, country, format, phone, learningGoals, consentToContact, website } = body;

    // Honeypot
    if (website) return NextResponse.json({ ok: true });

    // Validation
    if (!name || !email || !format) {
      return NextResponse.json({ error: "Name, email and format are required." }, { status: 400 });
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    // DB
    try {
      await connectDB();
      const exists = await Registration.findOne({ email: email.toLowerCase() });
      if (!exists) {
        await Registration.create({ name, email, country, format, phone, learningGoals, consentToContact });
      }
    } catch (dbErr) {
      console.error("[register] DB error — logging registration to console:", { name, email, country, format });
      // Fire emails anyway and return success
      sendEmails({ name, email, country, format, phone, learningGoals });
      return NextResponse.json({ ok: true, warning: "saved-locally" });
    }

    // Fire-and-forget emails
    sendEmails({ name, email, country, format, phone, learningGoals });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[register] Unhandled error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
