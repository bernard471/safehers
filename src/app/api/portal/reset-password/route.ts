import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Token } from "@/models/Token";
import { checkRateLimit } from "@/lib/rateLimiter";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!(await checkRateLimit(ip, "auth"))) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    const { token, password } = await req.json();
    if (!token || !password) {
      return NextResponse.json({ error: "Token and password required." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    await connectDB();

    const tokenDoc = await Token.findOne({
      token,
      type: "password_reset",
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!tokenDoc) {
      return NextResponse.json({ error: "Invalid or expired reset link." }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await User.updateOne({ _id: tokenDoc.userId }, { passwordHash });
    await Token.updateOne({ _id: tokenDoc._id }, { used: true });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[reset-password]", err);
    return NextResponse.json({ error: "Reset failed." }, { status: 500 });
  }
}
