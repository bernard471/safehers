"use client";

import DonorShell from "@/components/DonorShell";

export default function DonorReportsPage() {
  return (
    <DonorShell>
      <div className="mb-8">
        <p className="eyebrow text-gold mb-2">Reports</p>
        <h1 className="display text-3xl">Donor impact reports.</h1>
      </div>
      <div className="border border-ink/10 bg-cream p-12 text-center">
        <p className="display text-2xl mb-4">Reports coming soon</p>
        <p className="body-prose opacity-60 max-w-md mx-auto">
          Downloadable impact reports will be available here, including aggregate programme outcomes,
          financial transparency summaries, and impact per cohort.
        </p>
        <p className="mt-6 text-xs opacity-40">Reports contain aggregated data only. Individual beneficiary identities and private details are never disclosed in donor reports.</p>
      </div>
    </DonorShell>
  );
}
