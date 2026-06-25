"use client";

import { useEffect, useState } from "react";
import DonorShell from "@/components/DonorShell";

interface CohortItem { _id: string; name: string; status: string; currentParticipants: number; maxParticipants: number; course?: { title: string } }

export default function SponsoredCohortsPage() {
  const [cohorts, setCohorts] = useState<CohortItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/donor/stats").then((r) => r.json()).then((d) => { setCohorts(d.cohorts || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <DonorShell>
      <div className="mb-8">
        <p className="eyebrow text-gold mb-2">Sponsored Cohorts</p>
        <h1 className="display text-3xl">Cohorts you have funded.</h1>
      </div>
      {loading ? <p className="text-sm opacity-50">Loading...</p> : cohorts.length === 0 ? (
        <div className="border border-ink/10 bg-cream p-12 text-center">
          <p className="display text-2xl mb-2">No sponsored cohorts yet</p>
          <p className="body-prose opacity-60">Contact SafeHer Foundation to sponsor a cohort of beneficiaries.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {cohorts.map((c) => (
            <div key={c._id} className="border border-ink/10 bg-cream p-5 flex items-center justify-between">
              <div>
                <h3 className="display text-lg">{c.name}</h3>
                <p className="eyebrow text-xs opacity-40 mt-1">{c.course?.title} · {c.currentParticipants}/{c.maxParticipants} participants</p>
              </div>
              <span className={`eyebrow text-xs px-3 py-1 capitalize ${c.status === "active" ? "bg-gold/20 text-gold" : c.status === "completed" ? "bg-ink/10" : "bg-ink/5"}`}>{c.status}</span>
            </div>
          ))}
        </div>
      )}
    </DonorShell>
  );
}
