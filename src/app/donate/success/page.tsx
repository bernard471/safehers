"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Heart, ArrowUpRight, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

function SuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("GHS");

  useEffect(() => {
    if (!reference) { setStatus("failed"); return; }
    fetch(`/api/paystack/verify?reference=${reference}`)
      .then(r => r.json())
      .then(d => {
        if (d.verified) {
          setStatus("success");
          setAmount(d.amount || 0);
          setCurrency(d.currency || "GHS");
        } else {
          setStatus("failed");
        }
      })
      .catch(() => setStatus("failed"));
  }, [reference]);

  return (
    <section className="pt-40 pb-24 lg:pt-48 bg-ink text-cream min-h-[80vh] flex items-center">
      <div className="max-w-[700px] mx-auto px-6 lg:px-12 text-center">
        {status === "loading" && (
          <div>
            <p className="eyebrow text-gold mb-4">Processing...</p>
            <h1 className="display text-4xl">Verifying your payment</h1>
          </div>
        )}

        {status === "success" && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="inline-flex w-20 h-20 rounded-full border-2 border-gold items-center justify-center mb-8">
              <CheckCircle size={36} className="text-gold" />
            </div>
            <h1 className="display text-5xl lg:text-6xl mb-4">Thank you.</h1>
            <p className="display-italic text-xl text-gold mb-6">Your generosity changes lives.</p>
            {amount > 0 && (
              <p className="body-prose opacity-70 mb-4">
                Your donation of <strong>{currency} {amount.toLocaleString()}</strong> has been confirmed.
              </p>
            )}
            <p className="body-prose opacity-50 text-sm mb-10">A receipt has been sent to your email.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/impact" className="bg-gold text-ink px-7 py-4 eyebrow hover:bg-cream transition-colors inline-flex items-center gap-2">
                View Our Impact <ArrowUpRight size={14} />
              </Link>
              <Link href="/" className="border border-cream/30 px-7 py-4 eyebrow hover:bg-cream/10 transition-colors">Home</Link>
            </div>
          </motion.div>
        )}

        {status === "failed" && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="inline-flex w-20 h-20 rounded-full border-2 border-burgundy items-center justify-center mb-8">
              <XCircle size={36} className="text-burgundy" />
            </div>
            <h1 className="display text-4xl mb-4">Payment not confirmed</h1>
            <p className="body-prose opacity-60 mb-8">The payment could not be verified. If you were charged, please contact us.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/donate" className="bg-gold text-ink px-7 py-4 eyebrow hover:bg-cream transition-colors">Try Again</Link>
              <Link href="/contact" className="border border-cream/30 px-7 py-4 eyebrow hover:bg-cream/10 transition-colors">Contact Us</Link>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default function DonateSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ink flex items-center justify-center"><p className="eyebrow text-cream/50">Loading...</p></div>}>
      <SuccessContent />
    </Suspense>
  );
}
