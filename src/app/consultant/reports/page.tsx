"use client";

import ConsultantShell from "@/components/ConsultantShell";
import { BarChart, Users, Calendar } from "lucide-react";

export default function ConsultantReportsPage() {
  return (
    <ConsultantShell>
      <div className="mb-8">
        <p className="eyebrow text-gold mb-2">Reports</p>
        <h1 className="display text-3xl">Practice analytics.</h1>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        {[
          { icon: Calendar, label: "Total Sessions", value: "—" },
          { icon: Users, label: "Unique Clients", value: "—" },
          { icon: BarChart, label: "Avg. Sessions / Client", value: "—" },
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
        <p className="body-prose opacity-60">Detailed consultation analytics and client engagement reports will be available here.</p>
      </div>
    </ConsultantShell>
  );
}
