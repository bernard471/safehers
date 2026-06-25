import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireRole } from "@/lib/rbac";
import { Cohort } from "@/models/Cohort";
import { Enrollment } from "@/models/Enrollment";
import { Sponsor } from "@/models/Sponsor";

export async function GET() {
  try {
    const auth = await requireRole("donor", "admin", "super_admin");
    if (!auth.authorized) return auth.response!;

    await connectDB();

    const sponsor = await Sponsor.findOne({ contactEmail: auth.session!.user.email });
    const sponsorId = sponsor?._id;

    const cohorts = sponsorId
      ? await Cohort.find({ sponsor: sponsorId }).populate("course", "title").lean()
      : [];

    const sponsoredCohorts = cohorts.length;
    let beneficiariesReached = 0;
    for (const c of cohorts) {
      beneficiariesReached += (c as { currentParticipants?: number }).currentParticipants || 0;
    }

    const completions = sponsoredCohorts > 0
      ? await Enrollment.countDocuments({ status: "completed" })
      : 0;

    return NextResponse.json({
      stats: { sponsoredCohorts, beneficiariesReached, completions },
      cohorts,
    });
  } catch {
    return NextResponse.json({ stats: { sponsoredCohorts: 0, beneficiariesReached: 0, completions: 0 }, cohorts: [] });
  }
}
