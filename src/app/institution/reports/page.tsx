"use client";

import InstitutionShell from "@/components/InstitutionShell";

export default function InstitutionReportsPage() {
  return (
    <InstitutionShell>
      <div className="mb-8">
        <p className="eyebrow text-gold mb-2">Reports</p>
        <h1 className="display text-3xl">Programme reports.</h1>
      </div>
      <div className="border border-ink/10 bg-cream p-12 text-center">
        <p className="display text-2xl mb-4">Reports coming soon</p>
        <p className="body-prose opacity-60 max-w-md mx-auto">
          Detailed programme evaluation reports will be available here. Reports will include
          aggregate completion rates, knowledge gain metrics, and programme satisfaction scores.
        </p>
        <p className="mt-6 text-xs opacity-40">Individual student data, consultation records, and personal notes are never included in institutional reports.</p>
      </div>
    </InstitutionShell>
  );
}
