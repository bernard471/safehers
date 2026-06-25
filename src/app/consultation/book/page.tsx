"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

const TYPES = [
  { value: "personal-safety", label: "Personal Safety" },
  { value: "online-safety", label: "Online Safety" },
  { value: "financial-safety", label: "Financial Safety" },
  { value: "sextortion-response", label: "Sextortion Response" },
  { value: "campus-safety", label: "Campus Safety" },
  { value: "general", label: "General" },
];

export default function BookConsultationPage() {
  const { data: session } = useSession();
  const [form, setForm] = useState({ type: "general", format: "virtual", preferredDate: "", preferredTime: "", description: "", urgency: "standard" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const r = await fetch("/api/portal/consultations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (r.ok) { setStatus("success"); } else { const d = await r.json(); setErrMsg(d.error || "Failed."); setStatus("error"); }
    } catch { setErrMsg("Network error."); setStatus("error"); }
  };

  if (!session) {
    return (
      <>
        <section className="pt-40 pb-24 lg:pt-48 bg-ink text-cream">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <p className="eyebrow mb-6 text-gold">Book a Consultation</p>
            <h1 className="display text-5xl lg:text-6xl font-light mb-8">Please log in to<br /><span className="display-italic text-gold">book a session.</span></h1>
            <div className="flex gap-4">
              <Link href="/portal/login" className="bg-gold text-ink px-8 py-5 eyebrow hover:bg-cream transition-colors">Log In</Link>
              <Link href="/portal/register" className="border border-cream/30 px-8 py-5 eyebrow hover:bg-cream/10 transition-colors">Create Account</Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="pt-40 pb-16 lg:pt-48 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3 text-gold"><span className="inline-block w-8 h-px bg-gold" />Book a Consultation</p>
          <h1 className="display text-5xl lg:text-6xl font-light">Request a <span className="display-italic text-gold">session.</span></h1>
        </div>
      </section>
      <div className="gold-rule" />

      <section className="py-24">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          {status === "success" ? (
            <div className="bg-ink text-cream p-12 text-center">
              <div className="inline-flex w-16 h-16 rounded-full border-2 border-gold items-center justify-center mb-6"><Check size={28} className="text-gold" /></div>
              <h3 className="display text-4xl mb-4">Request received.</h3>
              <p className="body-prose opacity-80 max-w-md mx-auto mb-8">We will confirm your consultation within 2 business days. Check your email for updates.</p>
              <Link href="/portal/consultations" className="eyebrow text-gold link-underline">View my consultations</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="eyebrow opacity-60 block mb-2">Consultation type *</label>
                <select required value={form.type} onChange={update("type")} className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy">
                  {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="eyebrow opacity-60 block mb-2">Format *</label>
                  <select required value={form.format} onChange={update("format")} className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy">
                    <option value="virtual">Virtual (Online)</option>
                    <option value="in-person">In-Person (Accra)</option>
                  </select>
                </div>
                <div>
                  <label className="eyebrow opacity-60 block mb-2">Urgency</label>
                  <select value={form.urgency} onChange={update("urgency")} className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy">
                    <option value="standard">Standard</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="eyebrow opacity-60 block mb-2">Preferred date *</label>
                  <input type="date" required value={form.preferredDate} onChange={update("preferredDate")} className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy" />
                </div>
                <div>
                  <label className="eyebrow opacity-60 block mb-2">Preferred time</label>
                  <input type="time" value={form.preferredTime} onChange={update("preferredTime")} className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy" />
                </div>
              </div>
              <div>
                <label className="eyebrow opacity-60 block mb-2">Brief description of your concern *</label>
                <textarea required rows={4} maxLength={1000} value={form.description} onChange={update("description")} placeholder="Please describe what you need help with. Do not include unnecessary personal details." className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy resize-none" />
                <p className="text-xs opacity-40 mt-2">{form.description.length}/1000 characters</p>
              </div>

              <div className="border border-ink/15 p-6 bg-bone">
                <p className="eyebrow text-xs text-gold mb-2">Safeguarding Notice</p>
                <p className="text-xs opacity-60">Your information is confidential and protected. We do not collect unnecessary sensitive details. If you are in immediate danger, contact local emergency services first.</p>
              </div>

              {status === "error" && <p className="text-sm text-burgundy">{errMsg}</p>}

              <button type="submit" disabled={status === "loading"} className="bg-ink text-cream px-8 py-4 inline-flex items-center gap-3 hover:bg-burgundy transition-colors disabled:opacity-60 group">
                <span className="eyebrow">{status === "loading" ? "Submitting..." : "Request Consultation"}</span>
                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
