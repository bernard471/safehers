import { NextRequest, NextResponse } from "next/server";
import { Resend } from "@/lib/mail";
import { connectDB } from "@/lib/mongodb";
import { Enrollment } from "@/models/Enrollment";
import { Course } from "@/models/Course";
import { requireAuth } from "@/lib/rbac";
import { checkRateLimit } from "@/lib/rateLimiter";
import { enrollmentConfirmationEmail } from "@/lib/email-templates";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!(await checkRateLimit(ip))) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    const auth = await requireAuth();
    if (!auth.authorized) return auth.response!;

    const { courseId } = await req.json();
    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required." }, { status: 400 });
    }

    await connectDB();

    const course = await Course.findById(courseId);
    if (!course || !course.isPublished) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    const existing = await Enrollment.findOne({ user: auth.session!.user.id, course: courseId });
    if (existing) {
      return NextResponse.json({ error: "Already enrolled.", enrollmentId: existing._id }, { status: 409 });
    }

    const enrollment = await Enrollment.create({
      user: auth.session!.user.id,
      course: courseId,
    });

    await Course.updateOne({ _id: courseId }, { $inc: { enrollmentCount: 1 } });

    if (resend && auth.session!.user.email) {
      resend.emails.send({
        from: "SafeHer Foundation <noreply@safehers.africa>",
        to: auth.session!.user.email,
        subject: `Enrolled: ${course.title} — SafeHer Academy`,
        html: enrollmentConfirmationEmail(auth.session!.user.name, course.title, course.slug),
      }).catch((e: unknown) => console.error("[enroll] Email failed:", e));
    }

    return NextResponse.json({ ok: true, enrollmentId: enrollment._id }, { status: 201 });
  } catch (err) {
    console.error("[portal/enroll]", err);
    return NextResponse.json({ error: "Enrollment failed." }, { status: 500 });
  }
}
