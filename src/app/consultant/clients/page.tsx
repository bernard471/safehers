"use client";

import { useState } from "react";
import ConsultantShell from "@/components/ConsultantShell";

interface ClientItem { _id: string; name: string; email: string; totalSessions: number; lastSession: string }

export default function ConsultantClientsPage() {
  const [clients] = useState<ClientItem[]>([]);
  const loading = false;

  return (
    <ConsultantShell>
      <div className="mb-8">
        <p className="eyebrow text-gold mb-2">Clients</p>
        <h1 className="display text-3xl">Your assigned beneficiaries.</h1>
      </div>
      <div className="border border-ink/10 bg-bone p-4 mb-6">
        <p className="text-xs opacity-40">Only names and booking details are shown. Personal safety plans, financial data, and private notes remain confidential to the beneficiary.</p>
      </div>
      {loading ? <p className="text-sm opacity-50">Loading...</p> : clients.length === 0 ? (
        <div className="border border-ink/10 bg-cream p-12 text-center">
          <p className="display text-2xl mb-2">No clients yet</p>
          <p className="body-prose opacity-60">Clients will appear here once they book consultations with you.</p>
        </div>
      ) : (
        <div className="border border-ink/10 bg-cream overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-ink/10 eyebrow text-xs opacity-50">
              <div className="col-span-4">Name</div>
              <div className="col-span-4">Email</div>
              <div className="col-span-2">Sessions</div>
              <div className="col-span-2">Last Session</div>
            </div>
            {clients.map((c) => (
              <div key={c._id} className="grid grid-cols-12 gap-4 p-4 border-b border-ink/5 last:border-0 text-sm">
                <div className="col-span-4 truncate">{c.name}</div>
                <div className="col-span-4 truncate opacity-60">{c.email}</div>
                <div className="col-span-2">{c.totalSessions}</div>
                <div className="col-span-2 opacity-60">{c.lastSession}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ConsultantShell>
  );
}
