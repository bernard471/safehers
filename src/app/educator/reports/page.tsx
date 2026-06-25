"use client";

import EducatorShell from "@/components/EducatorShell";
import { BarChart, Users, Award } from "lucide-react";

export default function EducatorReportsPage() {
  return (
    <EducatorShell>
      <div className="mb-8">
        <p className="eyebrow text-gold mb-2">Reports</p>
        <h1 className="display text-3xl">Teaching analytics.</h1>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        {[
          { icon: BarChart, label: "Avg. Completion Rate", value: "—" },
          { icon: Users, label: "Active Learners", value: "—" },
          { icon: Award, label: "Certificates Issued", value: "—" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="border border-ink/10 bg-cream p-6">
              <Icon size={24} strokeWidth={1.5} className="text-gold mb-3" />
              <p className="display text-3xl mb-1">{s.value}</p>
              <p className="eyebrow text-xs opacity-50">{s.label}</p>
            </div>
          );
        })}
      </div>
      <div className="border border-ink/10 bg-cream p-12 text-center">
        <p className="display text-2xl mb-2">Reports coming soon</p>
        <p className="body-prose opacity-60">Detailed teaching analytics and engagement reports will be available here.</p>
      </div>
    </EducatorShell>
  );
}
