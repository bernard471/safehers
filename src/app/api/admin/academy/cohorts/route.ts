import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Cohort } from "@/models/Cohort";
import { requireRole } from "@/lib/rbac";
import { logAudit } from "@/lib/audit";

export async function GET() {
  try {
    const auth = await requireRole("admin", "super_admin");
    if (!auth.authorized) return auth.response!;

    await connectDB();
    const cohorts = await Cohort.find()
      .populate("course", "title slug")
      .populate("institution", "name")
      .populate("sponsor", "name")
      .populate("facilitator", "name email")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ cohorts });
  } catch {
    return NextResponse.json({ cohorts: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireRole("admin", "super_admin");
    if (!auth.authorized) return auth.response!;

    const body = await req.json();
    const { name, courseId, institutionId, sponsorId, startDate, endDate, maxParticipants, location, facilitatorId } = body;

    if (!name) return NextResponse.json({ error: "Cohort name required." }, { status: 400 });

    await connectDB();

    const cohort = await Cohort.create({
      name,
      course: courseId || undefined,
      institution: institutionId || undefined,
      sponsor: sponsorId || undefined,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      maxParticipants: maxParticipants || 30,
      location,
      facilitator: facilitatorId || undefined,
    });

    await logAudit({
      userId: auth.session!.user.id,
      userEmail: auth.session!.user.email,
      action: "create_cohort",
      resource: "Cohort",
      resourceId: cohort._id.toString(),
      details: `Created cohort "${name}"`,
    });

    return NextResponse.json({ ok: true, cohortId: cohort._id }, { status: 201 });
  } catch (err) {
    console.error("[admin/cohorts]", err);
    return NextResponse.json({ error: "Failed." }, { status: 500 });
  }
}
