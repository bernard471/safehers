import { NextRequest, NextResponse } from "next/server";
import { Resend } from "@/lib/mail";
import { connectDB } from "@/lib/mongodb";
import { Enrollment } from "@/models/Enrollment";
import { Course } from "@/models/Course";
import { Certificate } from "@/models/Certificate";
import { requireAuth } from "@/lib/rbac";
import { checkRateLimit } from "@/lib/rateLimiter";
import { courseCompletionEmail, certificateIssuedEmail } from "@/lib/email-templates";
import crypto from "crypto";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!(await checkRateLimit(ip))) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    const auth = await requireAuth();
    if (!auth.authorized) return auth.response!;

    const { enrollmentId, lessonId, quizScore, quizPassed } = await req.json();
    if (!enrollmentId || !lessonId) {
      return NextResponse.json({ error: "Missing fields." }, { status: 400 });
    }

    await connectDB();

    const enrollment = await Enrollment.findOne({ _id: enrollmentId, user: auth.session!.user.id });
    if (!enrollment) {
      return NextResponse.json({ error: "Enrollment not found." }, { status: 404 });
    }

    const alreadyDone = enrollment.lessonsCompleted.find(
      (l: { lessonId: string }) => l.lessonId === lessonId
    );
    if (!alreadyDone) {
      enrollment.lessonsCompleted.push({
        lessonId,
        completed: true,
        completedAt: new Date(),
        quizScore,
        quizPassed,
      });
    }

    const course = await Course.findById(enrollment.course);
    if (course) {
      let totalLessons = 0;
      for (const mod of course.modules) {
        totalLessons += mod.lessons.length;
      }
      enrollment.progress = totalLessons > 0
        ? Math.round((enrollment.lessonsCompleted.length / totalLessons) * 100)
        : 0;

      if (enrollment.progress >= 100 && enrollment.status !== "completed") {
        enrollment.status = "completed";
        enrollment.completedAt = new Date();

        // Send completion email
        if (resend && auth.session!.user.email) {
          resend.emails.send({
            from: "SafeHer Foundation <noreply@safehers.africa>",
            to: auth.session!.user.email,
            subject: `Congratulations! You completed ${course.title}`,
            html: courseCompletionEmail(auth.session!.user.name, course.title),
          }).catch((e: unknown) => console.error("[progress] Completion email failed:", e));
        }

        if (course.certificateEnabled) {
          const certId = `SHF-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
          const cert = await Certificate.create({
            certificateId: certId,
            user: auth.session!.user.id,
            course: course._id,
            enrollment: enrollment._id,
            userName: auth.session!.user.name || "",
            courseTitle: course.title,
          });
          enrollment.certificate = cert._id;

          // Send certificate email
          if (resend && auth.session!.user.email) {
            resend.emails.send({
              from: "SafeHer Foundation <noreply@safehers.africa>",
              to: auth.session!.user.email,
              subject: `Your certificate is ready — ${course.title}`,
              html: certificateIssuedEmail(auth.session!.user.name, course.title, certId),
            }).catch((e: unknown) => console.error("[progress] Certificate email failed:", e));
          }
        }
      }
    }

    await enrollment.save();

    return NextResponse.json({
      ok: true,
      progress: enrollment.progress,
      status: enrollment.status,
      certificate: enrollment.certificate || null,
    });
  } catch (err) {
    console.error("[portal/progress]", err);
    return NextResponse.json({ error: "Failed." }, { status: 500 });
  }
}
