import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Course } from "@/models/Course";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const courses = await Course.find({ isPublished: true })
      .select("title slug excerpt category level durationHours instructor isFree coverImage enrollmentCount tags learningOutcomes")
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ courses });
  } catch (err) {
    console.error("[academy/courses]", err);
    return NextResponse.json({ courses: [] });
  }
}
