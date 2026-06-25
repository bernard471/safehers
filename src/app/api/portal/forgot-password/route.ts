import { NextRequest, NextResponse } from "next/server";
import { Resend } from "@/lib/mail";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Token } from "@/models/Token";
import { checkRateLimit } from "@/lib/rateLimiter";
import { passwordResetEmail } from "@/lib/email-templates";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const BASE_URL = process.env.NEXTAUTH_URL ?? "https://safehers.africa";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!(await checkRateLimit(ip, "auth"))) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required." }, { status: 400 });

    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase(), isActive: true });

    // Always return success to prevent email enumeration
    if (!user) return NextResponse.json({ ok: true });

    const token = crypto.randomBytes(32).toString("hex");
    await Token.create({
      userId: user._id,
      type: "password_reset",
      token,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    if (resend) {
      const resetUrl = `${BASE_URL}/portal/reset-password?token=${token}`;
      await resend.emails.send({
        from: "SafeHer Foundation <noreply@safehers.africa>",
        to: user.email,
        subject: "Reset your password — SafeHer Academy",
        html: passwordResetEmail(user.name, resetUrl),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[forgot-password]", err);
    return NextResponse.json({ error: "Failed." }, { status: 500 });
  }
}
