import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { SafetyPlan } from "@/models/SafetyPlan";
import { requireAuth } from "@/lib/rbac";

export async function GET() {
  try {
    const auth = await requireAuth();
    if (!auth.authorized) return auth.response!;

    await connectDB();
    const plan = await SafetyPlan.findOne({ user: auth.session!.user.id }).lean();
    return NextResponse.json({ plan: plan || null });
  } catch {
    return NextResponse.json({ plan: null });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth();
    if (!auth.authorized) return auth.response!;

    const body = await req.json();
    await connectDB();

    await SafetyPlan.findOneAndUpdate(
      { user: auth.session!.user.id },
      { ...body, user: auth.session!.user.id, lastReviewedAt: new Date() },
      { upsert: true, new: true }
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[portal/safety-plan]", err);
    return NextResponse.json({ error: "Failed." }, { status: 500 });
  }
}
