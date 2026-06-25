"use client";

import Link from "next/link";
import { FileText, Download, ArrowUpRight } from "lucide-react";
import PortalShell from "@/components/PortalShell";
import { RESOURCES } from "@/lib/resources";

export default function PortalResourcesPage() {
  return (
    <PortalShell>
      <div className="mb-8">
        <p className="eyebrow text-gold mb-2">Resources</p>
        <h1 className="display text-3xl lg:text-4xl">Safety resources.</h1>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {RESOURCES.map((r) => (
          <div key={r.id} className="border border-ink/10 bg-cream p-6">
            <FileText size={24} className="text-gold mb-3" />
            <h3 className="display text-lg mb-2">{r.title}</h3>
            <p className="text-sm opacity-60 mb-4 line-clamp-2">{r.description}</p>
            <div className="flex items-center justify-between">
              <span className="eyebrow text-xs opacity-40">{r.type} · {r.pages} pages</span>
              <Link href="/resources" className="text-burgundy flex items-center gap-1">
                <Download size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/resources" className="eyebrow text-burgundy flex items-center justify-center gap-2">
          View all resources <ArrowUpRight size={14} />
        </Link>
      </div>
    </PortalShell>
  );
}
