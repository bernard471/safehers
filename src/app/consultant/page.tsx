"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Users, MessageSquare } from "lucide-react";
import ConsultantShell from "@/components/ConsultantShell";

interface Stats { upcoming: number; clients: number; completed: number }

export default function ConsultantDashboard() {
  const [stats, setStats] = useState<Stats>({ upcoming: 0, clients: 0, completed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch consultant-specific stats (placeholder — real API can be wired later)
    setStats({ upcoming: 0, clients: 0, completed: 0 });
    setLoading(false);
  }, []);

  return (
    <ConsultantShell>
      <div className="mb-8">
        <p className="eyebrow text-gold mb-2">Consultant Dashboard</p>
        <h1 className="display text-3xl lg:text-4xl">Your practice overview.</h1>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        {[
          { icon: Calendar, label: "Upcoming Bookings", value: stats.upcoming },
          { icon: Users, label: "Total Clients", value: stats.clients },
          { icon: MessageSquare, label: "Completed Sessions", value: stats.completed },
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
        <Link href="/consultant/bookings" className="border border-ink/10 bg-cream p-6 hover:border-gold transition-colors group">
          <h3 className="display text-lg group-hover:text-burgundy transition-colors mb-2">View Bookings</h3>
          <p className="text-sm opacity-50">Manage upcoming and past consultation sessions.</p>
        </Link>
        <Link href="/consultant/clients" className="border border-ink/10 bg-cream p-6 hover:border-gold transition-colors group">
          <h3 className="display text-lg group-hover:text-burgundy transition-colors mb-2">View Clients</h3>
          <p className="text-sm opacity-50">See beneficiaries who have booked with you.</p>
        </Link>
      </div>
      <div className="mt-6 border border-ink/10 bg-bone p-4">
        <p className="text-xs opacity-40">Consultation records are confidential. Only booking details visible to the consultant are shown. Safety plans and personal notes remain private to the beneficiary.</p>
      </div>
    </ConsultantShell>
  );
}
