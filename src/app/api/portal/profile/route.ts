import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { requireAuth } from "@/lib/rbac";

export async function GET() {
  try {
    const auth = await requireAuth();
    if (!auth.authorized) return auth.response!;

    await connectDB();
    const user = await User.findById(auth.session!.user.id)
      .select("name email phone country bio role emailVerified createdAt")
      .lean();
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const auth = await requireAuth();
    if (!auth.authorized) return auth.response!;

    const body = await req.json();
    const { name, phone, country, bio } = body;
    await connectDB();
    await User.updateOne(
      { _id: auth.session!.user.id },
      { name, phone, country, bio }
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[portal/profile]", err);
    return NextResponse.json({ error: "Failed." }, { status: 500 });
  }
}
