import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Enrollment } from "@/models/Enrollment";
import { requireAuth } from "@/lib/rbac";

export async function GET() {
  try {
    const auth = await requireAuth();
    if (!auth.authorized) return auth.response!;

    await connectDB();
    const enrollments = await Enrollment.find({ user: auth.session!.user.id })
      .populate("course", "title slug excerpt category durationHours coverImage")
      .populate("certificate", "certificateId")
      .sort({ enrolledAt: -1 })
      .lean();
    return NextResponse.json({ enrollments });
  } catch {
    return NextResponse.json({ enrollments: [] });
  }
}
