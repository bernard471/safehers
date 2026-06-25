import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "@/lib/mail";
import { connectDB } from "@/lib/mongodb";
import { Token } from "@/models/Token";
import { requireRole } from "@/lib/rbac";
import { logAudit } from "@/lib/audit";
import { adminOtpEmail } from "@/lib/email-templates";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST() {
  try {
    const auth = await requireRole("admin", "super_admin");
    if (!auth.authorized) return auth.response!;

    const otp = crypto.randomInt(100000, 999999).toString();

    await connectDB();

    // Invalidate any existing unused OTPs for this user
    await Token.updateMany(
      { userId: auth.session!.user.id, type: "admin_otp", used: false },
      { used: true }
    );

    await Token.create({
      userId: auth.session!.user.id,
      type: "admin_otp",
      token: otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await logAudit({
      userId: auth.session!.user.id,
      userEmail: auth.session!.user.email,
      action: "admin_otp_requested",
      resource: "AdminAuth",
    });

    if (resend && auth.session!.user.email) {
      await resend.emails.send({
        from: "SafeHer Foundation <noreply@safehers.africa>",
        to: auth.session!.user.email,
        subject: "Admin verification code — SafeHer Foundation",
        html: adminOtpEmail(otp),
      });
    }

    // Never reveal whether email was sent
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/otp]", err);
    return NextResponse.json({ error: "Failed." }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const auth = await requireRole("admin", "super_admin");
    if (!auth.authorized) return auth.response!;

    const { otp } = await req.json();
    if (!otp) return NextResponse.json({ error: "OTP required." }, { status: 400 });

    await connectDB();
    const tokenDoc = await Token.findOne({
      userId: auth.session!.user.id,
      type: "admin_otp",
      token: otp,
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!tokenDoc) {
      await logAudit({
        userId: auth.session!.user.id,
        userEmail: auth.session!.user.email,
        action: "admin_otp_failed",
        resource: "AdminAuth",
        details: "Invalid or expired OTP attempt",
      });
      return NextResponse.json({ error: "Invalid or expired code." }, { status: 400 });
    }

    await Token.updateOne({ _id: tokenDoc._id }, { used: true });

    await logAudit({
      userId: auth.session!.user.id,
      userEmail: auth.session!.user.email,
      action: "admin_otp_verified",
      resource: "AdminAuth",
    });

    return NextResponse.json({ ok: true, verified: true });
  } catch (err) {
    console.error("[admin/otp/verify]", err);
    return NextResponse.json({ error: "Verification failed." }, { status: 500 });
  }
}
