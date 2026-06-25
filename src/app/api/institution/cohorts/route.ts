import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireRole } from "@/lib/rbac";
import { Cohort } from "@/models/Cohort";
import { User } from "@/models/User";

export async function GET() {
  try {
    const auth = await requireRole("institution_admin", "admin", "super_admin");
    if (!auth.authorized) return auth.response!;

    await connectDB();
    const user = await User.findById(auth.session!.user.id).select("institution");
    const instId = user?.institution;
    if (!instId) return NextResponse.json({ cohorts: [] });

    const cohorts = await Cohort.find({ institution: instId })
      .populate("course", "title")
      .sort({ startDate: -1 })
      .lean();
    return NextResponse.json({ cohorts });
  } catch {
    return NextResponse.json({ cohorts: [] });
  }
}
