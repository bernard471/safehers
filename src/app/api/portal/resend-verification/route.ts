import { NextResponse } from "next/server";
import { Resend } from "@/lib/mail";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import { Token } from "@/models/Token";
import { requireAuth } from "@/lib/rbac";
import { User } from "@/models/User";
import { emailVerificationEmail } from "@/lib/email-templates";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const BASE_URL = process.env.NEXTAUTH_URL ?? "https://safehers.africa";

export async function POST() {
  try {
    const auth = await requireAuth();
    if (!auth.authorized) return auth.response!;

    await connectDB();
    const user = await User.findById(auth.session!.user.id);
    if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });
    if (user.emailVerified) return NextResponse.json({ error: "Already verified." }, { status: 400 });

    const token = crypto.randomBytes(32).toString("hex");
    await Token.create({
      userId: user._id,
      type: "email_verification",
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    if (resend) {
      const verifyUrl = `${BASE_URL}/api/portal/verify-email?token=${token}`;
      await resend.emails.send({
        from: "SafeHer Foundation <noreply@safehers.africa>",
        to: user.email,
        subject: "Verify your email — SafeHer Academy",
        html: emailVerificationEmail(user.name, verifyUrl),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[resend-verification]", err);
    return NextResponse.json({ error: "Failed." }, { status: 500 });
  }
}
