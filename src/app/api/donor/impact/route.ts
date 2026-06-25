import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireRole } from "@/lib/rbac";
import { Enrollment } from "@/models/Enrollment";
import { Course } from "@/models/Course";
import { User } from "@/models/User";

export async function GET() {
  try {
    const auth = await requireRole("donor", "admin", "super_admin");
    if (!auth.authorized) return auth.response!;

    await connectDB();

    const [totalEnrollments, totalCompletions, coursesSupported] = await Promise.all([
      Enrollment.countDocuments(),
      Enrollment.countDocuments({ status: "completed" }),
      Course.countDocuments({ isPublished: true }),
    ]);

    const countries = await User.distinct("country", { role: "beneficiary" });

    const completionRate = totalEnrollments > 0
      ? Math.round((totalCompletions / totalEnrollments) * 100)
      : 0;

    return NextResponse.json({
      impact: {
        totalEnrollments,
        totalCompletions,
        completionRate,
        countriesReached: countries.length,
        coursesSupported,
      },
    });
  } catch {
    return NextResponse.json({
      impact: { totalEnrollments: 0, totalCompletions: 0, completionRate: 0, countriesReached: 0, coursesSupported: 0 },
    });
  }
}
