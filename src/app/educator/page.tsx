"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Users, Award } from "lucide-react";
import EducatorShell from "@/components/EducatorShell";

interface Stats { courses: number; students: number; completions: number }

export default function EducatorDashboard() {
  const [stats, setStats] = useState<Stats>({ courses: 0, students: 0, completions: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch educator-specific stats
    fetch("/api/academy/courses")
      .then((r) => r.json())
      .then((d) => {
        setStats({ courses: d.courses?.length || 0, students: 0, completions: 0 });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <EducatorShell>
      <div className="mb-8">
        <p className="eyebrow text-gold mb-2">Educator Dashboard</p>
        <h1 className="display text-3xl lg:text-4xl">Your teaching overview.</h1>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        {[
          { icon: BookOpen, label: "Assigned Courses", value: stats.courses },
          { icon: Users, label: "Active Students", value: stats.students },
          { icon: Award, label: "Completions", value: stats.completions },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="border border-ink/10 bg-cream p-6">
              <Icon size={24} strokeWidth={1.5} className="text-gold mb-3" />
              <p className="display text-3xl mb-1">{loading ? "..." : s.value}</p>
              <p className="eyebrow text-xs opacity-50">{s.label}</p>
            </div>
          );
        })}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/educator/courses" className="border border-ink/10 bg-cream p-6 hover:border-gold transition-colors group">
          <h3 className="display text-lg group-hover:text-burgundy transition-colors mb-2">My Courses</h3>
          <p className="text-sm opacity-50">View and manage courses assigned to you.</p>
        </Link>
        <Link href="/educator/students" className="border border-ink/10 bg-cream p-6 hover:border-gold transition-colors group">
          <h3 className="display text-lg group-hover:text-burgundy transition-colors mb-2">View Students</h3>
          <p className="text-sm opacity-50">Track learner progress across your courses.</p>
        </Link>
      </div>
      <div className="mt-6 border border-ink/10 bg-bone p-4">
        <p className="text-xs opacity-40">Educator dashboards show course and learner data only. Personal safety plans, consultation records, and private notes are never visible to educators.</p>
      </div>
    </EducatorShell>
  );
}
