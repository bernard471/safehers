"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import PortalShell from "@/components/PortalShell";

interface EnrollmentItem {
  _id: string;
  progress: number;
  status: string;
  enrolledAt: string;
  course: { title: string; slug: string; category: string; durationHours: number };
  certificate?: { certificateId: string };
}

export default function MyCoursesPage() {
  const [enrollments, setEnrollments] = useState<EnrollmentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portal/courses").then((r) => r.json()).then((d) => { setEnrollments(d.enrollments || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <PortalShell>
      <div className="mb-8">
        <p className="eyebrow text-gold mb-2">My Courses</p>
        <h1 className="display text-3xl lg:text-4xl">Your enrolled courses.</h1>
      </div>

      {loading ? (
        <p className="text-sm opacity-50">Loading...</p>
      ) : enrollments.length === 0 ? (
        <div className="border border-ink/10 bg-cream p-12 text-center">
          <BookOpen size={40} className="text-gold mx-auto mb-4" />
          <p className="display text-2xl mb-2">No courses yet</p>
          <p className="body-prose opacity-60 mb-6">Browse our free courses and start learning.</p>
          <Link href="/academy/courses" className="bg-ink text-cream px-6 py-3 eyebrow hover:bg-burgundy transition-colors">Browse courses</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {enrollments.map((e) => (
            <div key={e._id} className="border border-ink/10 bg-cream p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="display text-xl mb-1">{e.course?.title}</h3>
                  <p className="eyebrow text-xs opacity-40">{e.course?.category?.replace("-", " ")} · {e.course?.durationHours}h · Enrolled {new Date(e.enrolledAt).toLocaleDateString()}</p>
                </div>
                <span className={`eyebrow text-xs px-3 py-1 ${e.status === "completed" ? "bg-gold/20 text-gold" : "bg-ink/5"}`}>
                  {e.status === "completed" ? "Completed" : "Active"}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex-1 h-2 bg-bone rounded-full overflow-hidden">
                  <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${e.progress}%` }} />
                </div>
                <span className="eyebrow text-xs text-gold w-12 text-right">{e.progress}%</span>
              </div>
              {e.certificate && (
                <p className="mt-3 eyebrow text-xs text-burgundy">
                  Certificate: <Link href={`/certificate/verify/${e.certificate.certificateId}`} className="link-underline">{e.certificate.certificateId}</Link>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </PortalShell>
  );
}
