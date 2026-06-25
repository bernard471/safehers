import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Cohort } from "@/models/Cohort";
import { User } from "@/models/User";
import { Enrollment } from "@/models/Enrollment";
import { requireRole } from "@/lib/rbac";
import { logAudit } from "@/lib/audit";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireRole("admin", "super_admin");
    if (!auth.authorized) return auth.response!;

    const cohortId = req.nextUrl.searchParams.get("cohortId");
    if (!cohortId) return NextResponse.json({ error: "Cohort ID required." }, { status: 400 });

    await connectDB();

    const cohort = await Cohort.findById(cohortId).populate("course", "title").lean();
    if (!cohort) return NextResponse.json({ error: "Cohort not found." }, { status: 404 });

    const students = await User.find({ cohort: cohortId, role: "beneficiary" })
      .select("name email country")
      .lean();

    const enrollments = await Enrollment.find({
      user: { $in: students.map((s) => s._id) },
    }).select("user progress status completedAt").lean();

    const rows = [["Name", "Email", "Country", "Progress", "Status", "Completed"].join(",")];

    for (const student of students) {
      const enrollment = enrollments.find(
        (e) => String(e.user) === String(student._id)
      );
      rows.push([
        `"${student.name}"`,
        student.email,
        student.country || "",
        enrollment ? String(enrollment.progress) : "0",
        enrollment?.status || "not_enrolled",
        enrollment?.completedAt ? new Date(enrollment.completedAt as Date).toISOString().split("T")[0] : "",
      ].join(","));
    }

    await logAudit({
      userId: auth.session!.user.id,
      userEmail: auth.session!.user.email,
      action: "export_cohort_csv",
      resource: "Cohort",
      resourceId: cohortId,
      details: `Exported ${students.length} students`,
    });

    return new NextResponse(rows.join("\n"), {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="cohort-${cohortId}.csv"`,
      },
    });
  } catch (err) {
    console.error("[admin/cohorts/export]", err);
    return NextResponse.json({ error: "Export failed." }, { status: 500 });
  }
}
