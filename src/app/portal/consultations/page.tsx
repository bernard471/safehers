"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare, ArrowUpRight } from "lucide-react";
import PortalShell from "@/components/PortalShell";

interface ConsultItem { _id: string; type: string; format: string; preferredDate: string; status: string; urgency: string; createdAt: string }

const statusColors: Record<string, string> = { pending: "bg-gold/20 text-gold", confirmed: "bg-moss/20 text-moss", completed: "bg-ink/10", cancelled: "bg-rose/20 text-burgundy" };

export default function ConsultationsPage() {
  const [items, setItems] = useState<ConsultItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portal/consultations").then((r) => r.json()).then((d) => { setItems(d.consultations || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <PortalShell>
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="eyebrow text-gold mb-2">Consultations</p>
          <h1 className="display text-3xl lg:text-4xl">Your sessions.</h1>
        </div>
        <Link href="/consultation/book" className="bg-ink text-cream px-6 py-3 eyebrow hover:bg-burgundy transition-colors flex items-center gap-2">
          Book new <ArrowUpRight size={14} />
        </Link>
      </div>

      {loading ? (
        <p className="text-sm opacity-50">Loading...</p>
      ) : items.length === 0 ? (
        <div className="border border-ink/10 bg-cream p-12 text-center">
          <MessageSquare size={40} className="text-gold mx-auto mb-4" />
          <p className="display text-2xl mb-2">No consultations</p>
          <p className="body-prose opacity-60 mb-6">Book a confidential session with a SafeHer specialist.</p>
          <Link href="/consultation/book" className="bg-ink text-cream px-6 py-3 eyebrow hover:bg-burgundy transition-colors">Book consultation</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((c) => (
            <div key={c._id} className="border border-ink/10 bg-cream p-5 flex items-center justify-between">
              <div>
                <h3 className="display text-lg capitalize">{c.type.replace(/-/g, " ")}</h3>
                <p className="eyebrow text-xs opacity-40 mt-1">{c.format} · {new Date(c.preferredDate).toLocaleDateString()}</p>
              </div>
              <span className={`eyebrow text-xs px-3 py-1 capitalize ${statusColors[c.status] || "bg-ink/5"}`}>{c.status}</span>
            </div>
          ))}
        </div>
      )}
    </PortalShell>
  );
}
