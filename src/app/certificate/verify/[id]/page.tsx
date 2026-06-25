"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Award, CheckCircle, XCircle } from "lucide-react";

interface CertData {
  certificateId: string;
  userName: string;
  courseTitle: string;
  issuedAt: string;
  grade?: string;
  isRevoked: boolean;
}

export default function CertificateVerifyPage() {
  const params = useParams();
  const id = params.id as string;
  const [cert, setCert] = useState<CertData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/certificate/verify?id=${encodeURIComponent(id)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.certificate) setCert(data.certificate);
        else setError(data.error || "Not found.");
      })
      .catch(() => setError("Verification failed."))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <section className="pt-40 pb-16 lg:pt-48 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
            <span className="inline-block w-8 h-px bg-gold" />
            Certificate Verification
          </p>
          <h1 className="display text-5xl lg:text-6xl font-light">
            Verify a <span className="display-italic text-gold">certificate.</span>
          </h1>
        </div>
      </section>
      <div className="gold-rule" />

      <section className="py-24">
        <div className="max-w-[700px] mx-auto px-6 lg:px-12">
          {loading ? (
            <div className="text-center py-20">
              <p className="eyebrow opacity-50">Verifying certificate...</p>
            </div>
          ) : error ? (
            <div className="border-2 border-burgundy p-12 text-center">
              <XCircle size={48} className="text-burgundy mx-auto mb-4" />
              <h2 className="display text-3xl mb-3">Certificate not found</h2>
              <p className="text-sm opacity-60">ID: {id}</p>
              <p className="body-prose opacity-70 mt-4">{error}</p>
            </div>
          ) : cert && !cert.isRevoked ? (
            <div className="border-2 border-gold p-12 text-center">
              <Award size={48} className="text-gold mx-auto mb-4" />
              <CheckCircle size={24} className="text-gold mx-auto mb-6" />
              <p className="eyebrow text-gold mb-2">Verified Certificate</p>
              <h2 className="display text-3xl mb-2">{cert.userName}</h2>
              <p className="body-prose opacity-70 mb-6">{cert.courseTitle}</p>
              <div className="border-t border-ink/10 pt-6 space-y-2 text-sm opacity-60">
                <p>Certificate ID: <span className="font-mono">{cert.certificateId}</span></p>
                <p>Issued: {new Date(cert.issuedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                {cert.grade && <p>Grade: {cert.grade}</p>}
                <p className="mt-4 eyebrow text-gold text-xs">Issued by SafeHer Foundation</p>
              </div>
            </div>
          ) : (
            <div className="border-2 border-burgundy p-12 text-center">
              <XCircle size={48} className="text-burgundy mx-auto mb-4" />
              <h2 className="display text-3xl mb-3">Certificate Revoked</h2>
              <p className="body-prose opacity-70">This certificate has been revoked.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
