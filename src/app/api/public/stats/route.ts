import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Enrollment } from "@/models/Enrollment";
import { Certificate } from "@/models/Certificate";
import { Course } from "@/models/Course";
import { User } from "@/models/User";

export const dynamic = "force-dynamic";
export const revalidate = 300;

export async function GET() {
  try {
    await connectDB();
    const [enrollments, certificates, courses, countries] = await Promise.all([
      Enrollment.countDocuments(),
      Certificate.countDocuments({ isRevoked: false }),
      Course.countDocuments({ isPublished: true }),
      User.distinct("country", { role: "beneficiary" }),
    ]);

    return NextResponse.json({
      stats: {
        womenReached: enrollments,
        certificatesIssued: certificates,
        coursesAvailable: courses,
        countriesActive: Math.max(countries.length, 1),
      },
    });
  } catch {
    return NextResponse.json({
      stats: { womenReached: 0, certificatesIssued: 0, coursesAvailable: 6, countriesActive: 1 },
    });
  }
}
