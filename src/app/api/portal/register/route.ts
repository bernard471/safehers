import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Resend } from "@/lib/mail";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Token } from "@/models/Token";
import { checkRateLimit } from "@/lib/rateLimiter";
import { emailVerificationEmail, academyWelcomeEmail } from "@/lib/email-templates";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const BASE_URL = process.env.NEXTAUTH_URL ?? "https://safehers.africa";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, phone, country, dateOfBirth, guardianName, guardianEmail, guardianConsent } = body;

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!(await checkRateLimit(ip, "register"))) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password are required." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    await connectDB();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const isMinor = dateOfBirth ? new Date().getFullYear() - new Date(dateOfBirth).getFullYear() < 18 : false;
    if (isMinor && !guardianConsent) {
      return NextResponse.json({ error: "Guardian consent is required for participants under 18." }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      phone,
      country: country || "Ghana",
      dateOfBirth,
      isMinor,
      guardianName: isMinor ? guardianName : undefined,
      guardianEmail: isMinor ? guardianEmail : undefined,
      guardianConsent: isMinor ? guardianConsent : undefined,
      role: "beneficiary",
    });

    // Send verification email
    const token = crypto.randomBytes(32).toString("hex");
    await Token.create({
      userId: user._id,
      type: "email_verification",
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    if (resend) {
      const verifyUrl = `${BASE_URL}/api/portal/verify-email?token=${token}`;
      resend.emails
        .send({
          from: "SafeHer Foundation <noreply@safehers.africa>",
          to: email.toLowerCase(),
          subject: "Verify your email — SafeHer Academy",
          html: emailVerificationEmail(name, verifyUrl),
        })
        .catch((e: unknown) => console.error("[register] Verification email failed:", e));

      // Also send welcome email
      resend.emails
        .send({
          from: "SafeHer Foundation <noreply@safehers.africa>",
          to: email.toLowerCase(),
          subject: "Welcome to SafeHer Academy",
          html: academyWelcomeEmail(name),
        })
        .catch((e: unknown) => console.error("[register] Welcome email failed:", e));
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[portal/register]", err);
    return NextResponse.json({ error: "Registration failed." }, { status: 500 });
  }
}
