import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Token } from "@/models/Token";
import { User } from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    const tokenStr = req.nextUrl.searchParams.get("token");
    if (!tokenStr) {
      return NextResponse.json({ error: "Token required." }, { status: 400 });
    }

    await connectDB();

    const tokenDoc = await Token.findOne({
      token: tokenStr,
      type: "email_verification",
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!tokenDoc) {
      return NextResponse.json({ error: "Invalid or expired token." }, { status: 400 });
    }

    await User.updateOne({ _id: tokenDoc.userId }, { emailVerified: true });
    await Token.updateOne({ _id: tokenDoc._id }, { used: true });

    return NextResponse.redirect(new URL("/portal/login?verified=1", req.url));
  } catch (err) {
    console.error("[verify-email]", err);
    return NextResponse.json({ error: "Verification failed." }, { status: 500 });
  }
}
