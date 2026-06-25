import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Course } from "@/models/Course";
import { requireRole } from "@/lib/rbac";
import { logAudit } from "@/lib/audit";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireRole("admin", "super_admin");
    if (!auth.authorized) return auth.response!;

    await connectDB();

    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const course = await Course.findById(id).lean();
      return NextResponse.json({ course });
    }

    const courses = await Course.find()
      .select("title slug category level isPublished enrollmentCount durationHours createdAt")
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ courses });
  } catch {
    return NextResponse.json({ courses: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireRole("admin", "super_admin");
    if (!auth.authorized) return auth.response!;

    const body = await req.json();
    await connectDB();

    const course = await Course.create(body);

    await logAudit({
      userId: auth.session!.user.id,
      userEmail: auth.session!.user.email,
      action: "create_course",
      resource: "Course",
      resourceId: course._id.toString(),
      details: `Created course "${body.title}"`,
    });

    return NextResponse.json({ ok: true, courseId: course._id }, { status: 201 });
  } catch (err) {
    console.error("[admin/courses]", err);
    return NextResponse.json({ error: "Failed to create course." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const auth = await requireRole("admin", "super_admin");
    if (!auth.authorized) return auth.response!;

    const body = await req.json();
    const { _id, ...updates } = body;
    if (!_id) return NextResponse.json({ error: "Course ID required." }, { status: 400 });

    await connectDB();
    await Course.updateOne({ _id }, { $set: updates });

    await logAudit({
      userId: auth.session!.user.id,
      userEmail: auth.session!.user.email,
      action: "update_course",
      resource: "Course",
      resourceId: _id,
      details: `Updated course "${updates.title || _id}"`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/courses]", err);
    return NextResponse.json({ error: "Failed to update course." }, { status: 500 });
  }
}
