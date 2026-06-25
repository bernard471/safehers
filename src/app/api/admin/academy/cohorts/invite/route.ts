import { NextRequest, NextResponse } from "next/server";
import { Resend } from "@/lib/mail";
import { connectDB } from "@/lib/mongodb";
import { Cohort } from "@/models/Cohort";
import { Course } from "@/models/Course";
import { requireRole } from "@/lib/rbac";
import { logAudit } from "@/lib/audit";
import { cohortInvitationEmail } from "@/lib/email-templates";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    const auth = await requireRole("admin", "super_admin");
    if (!auth.authorized) return auth.response!;

    const { cohortId, emails } = await req.json();
    if (!cohortId || !emails?.length) {
      return NextResponse.json({ error: "Cohort ID and email list required." }, { status: 400 });
    }

    await connectDB();

    const cohort = await Cohort.findById(cohortId).populate("course", "title");
    if (!cohort) return NextResponse.json({ error: "Cohort not found." }, { status: 404 });

    const courseTitle = (cohort.course as { title?: string })?.title || "SafeHer Academy Course";
    let sent = 0;

    if (resend) {
      for (const email of emails as string[]) {
        const trimmed = email.trim().toLowerCase();
        if (!trimmed) continue;
        try {
          await resend.emails.send({
            from: "SafeHer Foundation <noreply@safehers.africa>",
            to: trimmed,
            subject: `You're invited to ${cohort.name} — SafeHer Academy`,
            html: cohortInvitationEmail(trimmed.split("@")[0], cohort.name, courseTitle),
          });
          sent++;
        } catch (e) {
          console.error(`[cohort/invite] Failed to send to ${trimmed}:`, e);
        }
      }
    }

    await logAudit({
      userId: auth.session!.user.id,
      userEmail: auth.session!.user.email,
      action: "invite_to_cohort",
      resource: "Cohort",
      resourceId: cohortId,
      details: `Invited ${sent} of ${emails.length} emails to "${cohort.name}"`,
    });

    return NextResponse.json({ ok: true, sent, total: emails.length });
  } catch (err) {
    console.error("[admin/cohorts/invite]", err);
    return NextResponse.json({ error: "Invite failed." }, { status: 500 });
  }
}
