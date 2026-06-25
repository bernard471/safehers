"use client";

import { useState } from "react";
import ConsultantShell from "@/components/ConsultantShell";

interface Booking { _id: string; clientName: string; date: string; time: string; status: string; topic: string }

export default function ConsultantBookingsPage() {
  const [bookings] = useState<Booking[]>([]);
  const loading = false;

  return (
    <ConsultantShell>
      <div className="mb-8">
        <p className="eyebrow text-gold mb-2">Bookings</p>
        <h1 className="display text-3xl">Consultation sessions.</h1>
      </div>
      {loading ? <p className="text-sm opacity-50">Loading...</p> : bookings.length === 0 ? (
        <div className="border border-ink/10 bg-cream p-12 text-center">
          <p className="display text-2xl mb-2">No bookings yet</p>
          <p className="body-prose opacity-60">Consultation bookings from beneficiaries will appear here once scheduled.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div key={b._id} className="border border-ink/10 bg-cream p-5 flex items-center justify-between">
              <div>
                <h3 className="display text-lg">{b.clientName}</h3>
                <p className="eyebrow text-xs opacity-40 mt-1">{b.topic} · {b.date} at {b.time}</p>
              </div>
              <span className={`eyebrow text-xs px-3 py-1 capitalize ${b.status === "upcoming" ? "bg-gold/20 text-gold" : b.status === "completed" ? "bg-ink/5" : "bg-burgundy/10 text-burgundy"}`}>{b.status}</span>
            </div>
          ))}
        </div>
      )}
    </ConsultantShell>
  );
}
