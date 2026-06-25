"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, Globe } from "lucide-react";
import { COUNTRIES } from "@/lib/chapters-data";

function JoinForm() {
  const searchParams = useSearchParams();
  const preselectedCountry = searchParams.get("country") || "";
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: preselectedCountry, city: "", chapterType: "join", institution: "", experience: "", motivation: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const r = await fetch("/api/chapters/join", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      setStatus(r.ok ? "success" : "error");
    } catch { setStatus("error"); }
  };

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-ink text-cream p-12 lg:p-16 text-center max-w-lg mx-auto">
        <div className="inline-flex w-16 h-16 rounded-full border-2 border-gold items-center justify-center mb-6"><Check size={28} className="text-gold" /></div>
        <h2 className="display text-3xl mb-4">Application received.</h2>
        <p className="body-prose opacity-70 mb-6">Thank you for your interest in SafeHers. We will be in touch within 5 business days.</p>
        <Link href="/chapters" className="eyebrow text-gold link-underline">Back to chapters</Link>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="eyebrow opacity-50 text-[10px] block mb-2">Full name *</label>
          <input required value={form.name} onChange={update("name")} className="w-full bg-transparent border-b border-ink/20 pb-3 outline-none focus:border-gold" />
        </div>
        <div>
          <label className="eyebrow opacity-50 text-[10px] block mb-2">Email *</label>
          <input type="email" required value={form.email} onChange={update("email")} className="w-full bg-transparent border-b border-ink/20 pb-3 outline-none focus:border-gold" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="eyebrow opacity-50 text-[10px] block mb-2">Country *</label>
          <select required value={form.country} onChange={update("country")} className="w-full bg-transparent border-b border-ink/20 pb-3 outline-none focus:border-gold">
            <option value="">Select country</option>
            {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.country}</option>)}
            <option value="OTHER">Other African country</option>
          </select>
        </div>
        <div>
          <label className="eyebrow opacity-50 text-[10px] block mb-2">City *</label>
          <input required value={form.city} onChange={update("city")} className="w-full bg-transparent border-b border-ink/20 pb-3 outline-none focus:border-gold" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="eyebrow opacity-50 text-[10px] block mb-2">I want to</label>
          <select value={form.chapterType} onChange={update("chapterType")} className="w-full bg-transparent border-b border-ink/20 pb-3 outline-none">
            <option value="join">Join an existing chapter</option>
            <option value="start-campus">Start a campus chapter</option>
            <option value="start-community">Start a community chapter</option>
          </select>
        </div>
        <div>
          <label className="eyebrow opacity-50 text-[10px] block mb-2">Phone</label>
          <input value={form.phone} onChange={update("phone")} className="w-full bg-transparent border-b border-ink/20 pb-3 outline-none focus:border-gold" />
        </div>
      </div>
      {(form.chapterType === "start-campus" || form.chapterType === "join") && (
        <div>
          <label className="eyebrow opacity-50 text-[10px] block mb-2">University / Institution</label>
          <input value={form.institution} onChange={update("institution")} placeholder="e.g. University of Ghana, Legon" className="w-full bg-transparent border-b border-ink/20 pb-3 outline-none focus:border-gold" />
        </div>
      )}
      <div>
        <label className="eyebrow opacity-50 text-[10px] block mb-2">Why do you want to join SafeHers? *</label>
        <textarea required rows={3} value={form.motivation} onChange={update("motivation")} maxLength={500} className="w-full bg-transparent border-b border-ink/20 pb-3 outline-none focus:border-gold resize-none" />
      </div>
      <div>
        <label className="eyebrow opacity-50 text-[10px] block mb-2">Any relevant experience? (optional)</label>
        <textarea rows={2} value={form.experience} onChange={update("experience")} maxLength={300} placeholder="Leadership, community work, teaching, etc." className="w-full bg-transparent border-b border-ink/20 pb-3 outline-none focus:border-gold resize-none" />
      </div>

      {status === "error" && <p className="text-sm text-burgundy">Something went wrong. Please try again.</p>}

      <button type="submit" disabled={status === "loading"} className="bg-ink text-cream px-8 py-4 eyebrow hover:bg-burgundy transition-colors disabled:opacity-50 flex items-center gap-3">
        {status === "loading" ? "Submitting..." : "Submit Application"}
        <ArrowUpRight size={14} />
      </button>
    </form>
  );
}

export default function JoinChapterPage() {
  return (
    <>
      <section className="pt-40 pb-24 lg:pt-48 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Link href="/chapters" className="eyebrow text-xs text-cream/40 flex items-center gap-2 mb-8 hover:text-cream"><ArrowLeft size={14} /> Chapters</Link>
          <Globe size={40} strokeWidth={1} className="text-gold mb-6" />
          <h1 className="display text-[clamp(3rem,7vw,5rem)] font-light max-w-[800px] mb-6">
            Join the <span className="display-italic text-gold">movement.</span>
          </h1>
          <p className="body-prose max-w-lg opacity-70">Whether you want to join an existing chapter or start a new one — fill out the form below and we will be in touch.</p>
        </div>
      </section>
      <div className="gold-rule" />

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Suspense fallback={<p className="text-sm opacity-50">Loading form...</p>}>
            <JoinForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
