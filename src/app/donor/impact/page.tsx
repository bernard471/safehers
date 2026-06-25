"use client";

import { useEffect, useState } from "react";
import DonorShell from "@/components/DonorShell";

interface ImpactData { totalEnrollments: number; totalCompletions: number; completionRate: number; countriesReached: number; coursesSupported: number }

export default function DonorImpactPage() {
  const [data, setData] = useState<ImpactData>({ totalEnrollments: 0, totalCompletions: 0, completionRate: 0, countriesReached: 0, coursesSupported: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/donor/impact").then((r) => r.json()).then((d) => { if (d.impact) setData(d.impact); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <DonorShell>
      <div className="mb-8">
        <p className="eyebrow text-gold mb-2">Impact Data</p>
        <h1 className="display text-3xl">Aggregated programme outcomes.</h1>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Enrollments", value: data.totalEnrollments },
          { label: "Course Completions", value: data.totalCompletions },
          { label: "Completion Rate", value: `${data.completionRate}%` },
          { label: "Countries Reached", value: data.countriesReached },
          { label: "Courses Supported", value: data.coursesSupported },
        ].map((s) => (
          <div key={s.label} className="border border-ink/10 bg-cream p-6">
            <p className="display text-3xl mb-1">{loading ? "..." : s.value}</p>
            <p className="eyebrow text-xs opacity-50">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="border border-ink/10 bg-bone p-4">
        <p className="text-xs opacity-40">All data shown is aggregated. No individual beneficiary information is disclosed. Impact metrics are updated regularly based on programme evaluations.</p>
      </div>
    </DonorShell>
  );
}
