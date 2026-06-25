import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Course } from "@/models/Course";
import { Enrollment } from "@/models/Enrollment";
import { Certificate } from "@/models/Certificate";
import { Consultation } from "@/models/Consultation";
import { User } from "@/models/User";
import { Institution } from "@/models/Institution";
import { requireRole } from "@/lib/rbac";

export async function GET() {
  try {
    const auth = await requireRole("admin", "super_admin");
    if (!auth.authorized) return auth.response!;

    await connectDB();
    const [courses, enrollments, certificates, consultations, users, institutions] = await Promise.all([
      Course.countDocuments(),
      Enrollment.countDocuments(),
      Certificate.countDocuments(),
      Consultation.countDocuments(),
      User.countDocuments(),
      Institution.countDocuments(),
    ]);
    return NextResponse.json({ stats: { courses, enrollments, certificates, consultations, users, institutions } });
  } catch {
    return NextResponse.json({ stats: { courses: 0, enrollments: 0, certificates: 0, consultations: 0, users: 0, institutions: 0 } });
  }
}
