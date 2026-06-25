import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireRole } from "@/lib/rbac";
import { Cohort } from "@/models/Cohort";
import { Enrollment } from "@/models/Enrollment";
import { User } from "@/models/User";

export async function GET() {
  try {
    const auth = await requireRole("institution_admin", "admin", "super_admin");
    if (!auth.authorized) return auth.response!;

    await connectDB();
    const user = await User.findById(auth.session!.user.id).select("institution");
    const instId = user?.institution;

    const cohorts = instId ? await Cohort.countDocuments({ institution: instId }) : 0;
    const studentIds = instId ? await User.find({ institution: instId, role: "beneficiary" }).select("_id") : [];
    const students = studentIds.length;
    const completions = students > 0
      ? await Enrollment.countDocuments({ user: { $in: studentIds.map((s: { _id: string }) => s._id) }, status: "completed" })
      : 0;

    return NextResponse.json({ stats: { cohorts, students, completions } });
  } catch {
    return NextResponse.json({ stats: { cohorts: 0, students: 0, completions: 0 } });
  }
}
