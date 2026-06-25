"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Award, BookOpen } from "lucide-react";
import DonorShell from "@/components/DonorShell";

interface Stats { sponsoredCohorts: number; beneficiariesReached: number; completions: number }

export default function DonorDashboard() {
  const [stats, setStats] = useState<Stats>({ sponsoredCohorts: 0, beneficiariesReached: 0, completions: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/donor/stats").then((r) => r.json()).then((d) => {
      if (d.stats) setStats(d.stats);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <DonorShell>
      <div className="mb-8">
        <p className="eyebrow text-gold mb-2">Donor Dashboard</p>
        <h1 className="display text-3xl lg:text-4xl">Your impact overview.</h1>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        {[
          { icon: BookOpen, label: "Sponsored Cohorts", value: stats.sponsoredCohorts },
          { icon: Users, label: "Beneficiaries Reached", value: stats.beneficiariesReached },
          { icon: Award, label: "Course Completions", value: stats.completions },
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
        <Link href="/donor/impact" className="border border-ink/10 bg-cream p-6 hover:border-gold transition-colors group">
          <h3 className="display text-lg group-hover:text-burgundy transition-colors mb-2">View Impact Data</h3>
          <p className="text-sm opacity-50">Aggregated programme outcomes and completion metrics.</p>
        </Link>
        <Link href="/donor/sponsored-cohorts" className="border border-ink/10 bg-cream p-6 hover:border-gold transition-colors group">
          <h3 className="display text-lg group-hover:text-burgundy transition-colors mb-2">Sponsored Cohorts</h3>
          <p className="text-sm opacity-50">View cohorts funded by your contributions.</p>
        </Link>
      </div>
      <div className="mt-6 border border-ink/10 bg-bone p-4">
        <p className="text-xs opacity-40">Donor dashboards show aggregated impact data only. Individual beneficiary names, contact details, consultation records, and personal safety plans are never visible to donors.</p>
      </div>
    </DonorShell>
  );
}
