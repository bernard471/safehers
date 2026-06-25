"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, BookOpen, Award, ArrowUpRight } from "lucide-react";
import InstitutionShell from "@/components/InstitutionShell";

interface Stats { cohorts: number; students: number; completions: number }

export default function InstitutionDashboard() {
  const [stats, setStats] = useState<Stats>({ cohorts: 0, students: 0, completions: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/institution/stats").then((r) => r.json()).then((d) => {
      if (d.stats) setStats(d.stats);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <InstitutionShell>
      <div className="mb-8">
        <p className="eyebrow text-gold mb-2">Institution Dashboard</p>
        <h1 className="display text-3xl lg:text-4xl">Your organisation overview.</h1>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        {[
          { icon: BookOpen, label: "Active Cohorts", value: stats.cohorts },
          { icon: Users, label: "Enrolled Students", value: stats.students },
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
        <Link href="/institution/cohorts" className="border border-ink/10 bg-cream p-6 hover:border-gold transition-colors group">
          <h3 className="display text-lg group-hover:text-burgundy transition-colors mb-2">View Cohorts</h3>
          <p className="text-sm opacity-50">Manage your enrolled cohorts and programmes.</p>
        </Link>
        <Link href="/institution/students" className="border border-ink/10 bg-cream p-6 hover:border-gold transition-colors group">
          <h3 className="display text-lg group-hover:text-burgundy transition-colors mb-2">View Students</h3>
          <p className="text-sm opacity-50">See enrolled students and their progress.</p>
        </Link>
      </div>
      <div className="mt-6 border border-ink/10 bg-bone p-4">
        <p className="text-xs opacity-40">Institution data is scoped to your organisation only. Student consultation details and personal notes are never visible to institution administrators.</p>
      </div>
    </InstitutionShell>
  );
}
