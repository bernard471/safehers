import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Course } from "@/models/Course";
import { SAMPLE_COURSES } from "@/lib/sample-courses";
import { requireRole } from "@/lib/rbac";
import { logAudit } from "@/lib/audit";

export async function POST() {
  try {
    const isDev = process.env.NODE_ENV !== "production";
    const allowSeed = process.env.SAFEHER_ALLOW_SEED === "true";
    const bypassAuth = isDev || allowSeed;

    let auth: any = { authorized: true };
    if (!bypassAuth) {
      auth = await requireRole("admin", "super_admin");
      if (!auth.authorized) return auth.response!;
    }

    if (process.env.NODE_ENV === "production" && !allowSeed) {
      return NextResponse.json({ error: "Seeding is disabled in production." }, { status: 403 });
    }

    await connectDB();

    let created = 0;
    for (const courseData of SAMPLE_COURSES) {
      const existing = await Course.findOne({ slug: courseData.slug });
      if (!existing) {
        await Course.create(courseData);
        created++;
      }
    }

    await logAudit({
      userId: auth.session?.user?.id || "system",
      userEmail: auth.session?.user?.email || "system@safehers.africa",
      action: "seed_courses",
      resource: "Course",
      details: `Seeded ${created} of ${SAMPLE_COURSES.length} courses`,
    });

    return NextResponse.json({ ok: true, created, total: SAMPLE_COURSES.length });
  } catch (err) {
    console.error("[admin/academy/seed]", err);
    return NextResponse.json({ error: "Seeding failed." }, { status: 500 });
  }
}
