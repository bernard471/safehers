"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Award, MessageSquare, ShieldCheck, ArrowUpRight } from "lucide-react";
import PortalShell from "@/components/PortalShell";
import VerificationBanner from "@/components/VerificationBanner";

interface EnrollmentItem {
  _id: string;
  progress: number;
  status: string;
  course: { title: string; slug: string; category: string };
}

export default function PortalDashboard() {
  const [enrollments, setEnrollments] = useState<EnrollmentItem[]>([]);
  const [certCount, setCertCount] = useState(0);
  const [consultCount, setConsultCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/portal/courses").then((r) => r.json()),
      fetch("/api/portal/certificates").then((r) => r.json()),
      fetch("/api/portal/consultations").then((r) => r.json()),
      fetch("/api/portal/profile").then((r) => r.json()),
    ]).then(([c, cert, con, profile]) => {
      setEnrollments(c.enrollments || []);
      setCertCount(cert.certificates?.length || 0);
      setConsultCount(con.consultations?.length || 0);
      if (profile.user && profile.user.emailVerified === false) setEmailVerified(false);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <PortalShell>
      {!emailVerified && <VerificationBanner />}

      <div className="mb-8">
        <p className="eyebrow text-gold mb-2">Dashboard</p>
        <h1 className="display text-3xl lg:text-4xl">Welcome back.</h1>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {[
          { icon: BookOpen, label: "Enrolled Courses", value: enrollments.length, href: "/portal/my-courses" },
          { icon: Award, label: "Certificates", value: certCount, href: "/portal/certificates" },
          { icon: MessageSquare, label: "Consultations", value: consultCount, href: "/portal/consultations" },
          { icon: ShieldCheck, label: "Safety Plan", value: "→", href: "/portal/safety-plan" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.label} href={s.href} className="border border-ink/10 bg-cream p-6 hover:border-ink/30 transition-colors group">
              <Icon size={24} strokeWidth={1.5} className="text-gold mb-3" />
              <p className="display text-3xl mb-1">{loading ? "..." : s.value}</p>
              <p className="eyebrow text-xs opacity-50">{s.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Active courses */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="display text-2xl">My Courses</h2>
          <Link href="/portal/my-courses" className="eyebrow text-xs text-burgundy flex items-center gap-2">
            View all <ArrowUpRight size={12} />
          </Link>
        </div>
        {loading ? (
          <p className="text-sm opacity-50">Loading...</p>
        ) : enrollments.length === 0 ? (
          <div className="border border-ink/10 bg-cream p-8 text-center">
            <p className="body-prose opacity-60 mb-4">You haven&apos;t enrolled in any courses yet.</p>
            <Link href="/academy/courses" className="eyebrow text-burgundy link-underline">Browse courses →</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {enrollments.slice(0, 4).map((e) => (
              <div key={e._id} className="border border-ink/10 bg-cream p-5 flex items-center justify-between">
                <div>
                  <h3 className="display text-lg">{e.course?.title}</h3>
                  <p className="eyebrow text-xs opacity-40 mt-1">{e.status === "completed" ? "Completed" : `${e.progress}% complete`}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-bone rounded-full overflow-hidden">
                    <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${e.progress}%` }} />
                  </div>
                  <span className="eyebrow text-xs text-gold">{e.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/academy/courses" className="border border-ink/10 bg-cream p-6 hover:border-gold transition-colors group">
          <p className="eyebrow text-gold text-xs mb-2">Explore</p>
          <h3 className="display text-xl group-hover:text-burgundy transition-colors">Browse more courses</h3>
        </Link>
        <Link href="/consultation/book" className="border border-ink/10 bg-cream p-6 hover:border-gold transition-colors group">
          <p className="eyebrow text-gold text-xs mb-2">Support</p>
          <h3 className="display text-xl group-hover:text-burgundy transition-colors">Book a consultation</h3>
        </Link>
      </div>
    </PortalShell>
  );
}
