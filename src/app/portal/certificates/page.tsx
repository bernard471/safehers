"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Award } from "lucide-react";
import PortalShell from "@/components/PortalShell";

interface Cert { _id: string; certificateId: string; courseTitle: string; userName: string; issuedAt: string; grade?: string }

export default function CertificatesPage() {
  const [certs, setCerts] = useState<Cert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portal/certificates").then((r) => r.json()).then((d) => { setCerts(d.certificates || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <PortalShell>
      <div className="mb-8">
        <p className="eyebrow text-gold mb-2">Certificates</p>
        <h1 className="display text-3xl lg:text-4xl">Your achievements.</h1>
      </div>

      {loading ? (
        <p className="text-sm opacity-50">Loading...</p>
      ) : certs.length === 0 ? (
        <div className="border border-ink/10 bg-cream p-12 text-center">
          <Award size={40} className="text-gold mx-auto mb-4" />
          <p className="display text-2xl mb-2">No certificates yet</p>
          <p className="body-prose opacity-60 mb-6">Complete a course to earn your first certificate.</p>
          <Link href="/portal/my-courses" className="bg-ink text-cream px-6 py-3 eyebrow hover:bg-burgundy transition-colors">My courses</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {certs.map((c) => (
            <div key={c._id} className="border-2 border-gold/30 bg-cream p-8 text-center">
              <Award size={32} className="text-gold mx-auto mb-4" />
              <h3 className="display text-xl mb-1">{c.courseTitle}</h3>
              <p className="text-sm opacity-60 mb-1">{c.userName}</p>
              <p className="eyebrow text-xs opacity-40 mb-4">Issued {new Date(c.issuedAt).toLocaleDateString()}</p>
              <p className="font-mono text-xs opacity-50 mb-4">{c.certificateId}</p>
              <div className="flex items-center justify-center gap-4">
                <Link href={`/certificate/verify/${c.certificateId}`} className="eyebrow text-xs text-burgundy link-underline">Verify</Link>
                <a href={`/api/portal/certificates/pdf?id=${c.certificateId}`} target="_blank" rel="noopener" className="eyebrow text-xs text-gold link-underline">Download</a>
                <a href={`/api/certificate/image?id=${c.certificateId}`} target="_blank" rel="noopener" className="eyebrow text-xs opacity-50 link-underline">Image</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </PortalShell>
  );
}
