import { NextRequest, NextResponse } from "next/server";
import { Resend } from "@/lib/mail";
import { connectDB } from "@/lib/mongodb";
import { Donation } from "@/models/Donation";
import { checkRateLimit } from "@/lib/rateLimiter";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL ?? "hello@safehers.africa";
const BASE_URL = process.env.NEXTAUTH_URL ?? "https://safehers.africa";

function donationConfirmEmail(name: string, amount: number, currency: string, category: string): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#F0ECE4;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F0ECE4;padding:40px 0"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FAF7F1">
<tr><td style="background:#0C0C0E;padding:28px 40px">
<span style="font-family:Georgia,serif;font-size:24px;color:#FAF7F1">SafeHer</span>
<span style="color:#B8963E;font-size:12px;font-family:monospace;letter-spacing:0.15em;text-transform:uppercase;margin-left:8px">Foundation</span>
</td></tr>
<tr><td style="padding:40px">
<p style="font-family:Georgia,serif;font-size:28px;font-weight:300;color:#0C0C0E;margin:0 0 20px">Thank you, ${name}.</p>
<p style="font-size:15px;line-height:1.7;color:#0C0C0E;opacity:0.8;margin:0 0 16px">
Your generous donation of <strong>${currency} ${amount.toLocaleString()}</strong> towards <strong>${category.replace(/-/g, " ")}</strong> has been received.</p>
<p style="font-size:15px;line-height:1.7;color:#0C0C0E;opacity:0.8;margin:0 0 24px">
Every contribution directly funds safety education for women and girls across Africa. You are making a real difference.</p>
<a href="${BASE_URL}/impact" style="display:inline-block;background:#0C0C0E;color:#FAF7F1;padding:14px 32px;font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none">View Our Impact</a>
<p style="font-size:13px;color:#0C0C0E;opacity:0.4;margin-top:32px">SafeHer Foundation · East Legon, Accra, Ghana</p>
</td></tr>
</table></td></tr></table></body></html>`;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!(await checkRateLimit(ip))) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    const body = await req.json();
    const { name, email, phone, amount, currency, type, category, dedication, isAnonymous, organization, country, message } = body;

    if (!name || !email || !amount) {
      return NextResponse.json({ error: "Name, email, and amount are required." }, { status: 400 });
    }
    if (typeof amount !== "number" || amount < 1) {
      return NextResponse.json({ error: "Please enter a valid donation amount." }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    await connectDB();

    const donation = await Donation.create({
      name, email: email.toLowerCase(), phone,
      amount, currency: currency || "USD",
      type: type || "one-time",
      category: category || "general",
      dedication, isAnonymous: isAnonymous || false,
      organization, country, message,
      status: "pending",
    });

    if (resend) {
      // Confirm to donor
      resend.emails.send({
        from: "SafeHer Foundation <noreply@safehers.africa>",
        to: email.toLowerCase(),
        subject: "Thank you for your donation — SafeHer Foundation",
        html: donationConfirmEmail(name, amount, currency || "USD", category || "general"),
      }).catch((e: unknown) => console.error("[donate] Donor email failed:", e));

      // Notify team
      resend.emails.send({
        from: "SafeHer Foundation <noreply@safehers.africa>",
        to: NOTIFICATION_EMAIL,
        subject: `New donation: ${currency || "USD"} ${amount} from ${name}`,
        html: `<p><strong>${name}</strong> (${email}) donated <strong>${currency || "USD"} ${amount.toLocaleString()}</strong> towards ${category || "general"}.</p><p>Type: ${type || "one-time"}</p>${message ? `<p>Message: ${message}</p>` : ""}${organization ? `<p>Org: ${organization}</p>` : ""}<p><a href="${BASE_URL}/admin">View in admin</a></p>`,
      }).catch((e: unknown) => console.error("[donate] Notify email failed:", e));
    }

    return NextResponse.json({ ok: true, donationId: donation._id }, { status: 201 });
  } catch (err) {
    console.error("[donate]", err);
    return NextResponse.json({ error: "Donation submission failed." }, { status: 500 });
  }
}
