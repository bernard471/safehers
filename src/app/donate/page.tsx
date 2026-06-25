"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight, Heart, Users, BookOpen, Globe, Award,
  Shield, CheckCircle, Sparkles, Check,
} from "lucide-react";

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000];

const CATEGORIES = [
  { value: "general", label: "Where it's needed most", icon: Globe, desc: "Unrestricted — we direct it to the highest-need area." },
  { value: "scholarship", label: "Fund a Scholarship", icon: Heart, desc: "Cover certification for one woman who cannot afford it." },
  { value: "cohort-sponsorship", label: "Sponsor a Cohort", icon: Users, desc: "Fund an entire cohort of women through a full course." },
  { value: "curriculum-development", label: "Curriculum Development", icon: BookOpen, desc: "Fund new course modules and African editions." },
  { value: "academy-operations", label: "Academy Operations", icon: Shield, desc: "Platform, hosting, and technology for online learning." },
  { value: "campus-chapter", label: "Campus Chapter", icon: Award, desc: "Establish a SafeHers chapter at a university campus." },
];

const FREQUENCIES = [
  { value: "one-time", label: "One-time" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "annual", label: "Annual" },
];

const CURRENCIES = [
  { code: "USD", symbol: "$", label: "USD" },
  { code: "GHS", symbol: "GH₵", label: "GHS" },
  { code: "GBP", symbol: "£", label: "GBP" },
  { code: "EUR", symbol: "€", label: "EUR" },
];

const IMPACT_EXAMPLES = [
  { amount: 25, text: "Provides safety resources for 5 women" },
  { amount: 50, text: "Funds one student through a safety course" },
  { amount: 100, text: "Equips 20 women with emergency safety plans" },
  { amount: 250, text: "Sponsors one woman's full educator certification" },
  { amount: 500, text: "Launches a campus safety workshop for 30 students" },
  { amount: 1000, text: "Funds a full cohort of 20 women through certification" },
];

export default function DonatePage() {
  const [step, setStep] = useState<"form" | "success">("form");
  const [amount, setAmount] = useState<number | "">("");
  const [customAmount, setCustomAmount] = useState("");
  const [currency, setCurrency] = useState("GHS");
  const [frequency, setFrequency] = useState("one-time");
  const [category, setCategory] = useState("general");
  const [form, setForm] = useState({ name: "", email: "", phone: "", organization: "", country: "", message: "", dedication: "", isAnonymous: false });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const selectedAmount = typeof amount === "number" ? amount : Number(customAmount) || 0;
  const currencyObj = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0];
  const impactText = IMPACT_EXAMPLES.find(i => selectedAmount >= i.amount)?.text;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAmount < 1) { setError("Please enter a donation amount."); return; }
    setSubmitting(true); setError("");
    try {
      // Try Paystack first
      const payRes = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, amount: selectedAmount, currency, type: frequency, category }),
      });
      const payData = await payRes.json();

      if (payRes.ok && payData.authorizationUrl) {
        window.location.href = payData.authorizationUrl;
        return;
      }

      // Fallback to pledge if Paystack not configured
      const r = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, amount: selectedAmount, currency, type: frequency, category }),
      });
      if (r.ok) { setStep("success"); }
      else { const d = await r.json(); setError(d.error || "Something went wrong."); setSubmitting(false); }
    } catch { setError("Network error. Please try again."); setSubmitting(false); }
  };

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  if (step === "success") {
    return (
      <>
        <section className="pt-40 pb-24 lg:pt-48 bg-ink text-cream min-h-[80vh] flex items-center">
          <div className="max-w-[700px] mx-auto px-6 lg:px-12 text-center">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex w-20 h-20 rounded-full border-2 border-gold items-center justify-center mb-8">
                <Heart size={32} className="text-gold" />
              </div>
              <h1 className="display text-5xl lg:text-6xl mb-6">Thank you.</h1>
              <p className="display-italic text-xl text-gold mb-6">Your generosity changes lives.</p>
              <p className="body-prose opacity-70 mb-4">
                Your donation of <strong>{currencyObj.symbol}{selectedAmount.toLocaleString()}</strong> has been received.
                We have sent a confirmation to your email.
              </p>
              <p className="body-prose opacity-50 mb-10 text-sm">
                SafeHer Foundation will use your gift to fund safety education for women and girls across Africa.
                You will receive impact updates showing exactly how your donation made a difference.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/impact" className="bg-gold text-ink px-7 py-4 eyebrow hover:bg-cream transition-colors inline-flex items-center gap-2">
                  View Our Impact <ArrowUpRight size={14} />
                </Link>
                <Link href="/" className="border border-cream/30 px-7 py-4 eyebrow hover:bg-cream/10 transition-colors">
                  Back to Home
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-20 lg:pt-48 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
            <span className="inline-block w-8 h-px bg-gold" />
            Support SafeHer Foundation
          </p>
          <h1 className="display text-[clamp(3rem,7vw,6rem)] font-light max-w-[900px] mb-6">
            Invest in<br />
            <span className="display-italic text-gold">women&apos;s safety.</span>
          </h1>
          <p className="body-prose max-w-2xl opacity-70 text-lg">
            Every donation directly funds safety education for women and girls
            across Africa. Choose your amount, your cause, and your frequency.
          </p>
        </div>
      </section>
      <div className="gold-rule" />

      {/* DONATION FORM */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-12 gap-12">
              {/* LEFT — Amount & Options */}
              <div className="lg:col-span-7 space-y-10">
                {/* Step 1: Amount */}
                <div>
                  <p className="eyebrow text-gold mb-1">Step 1</p>
                  <h2 className="display text-3xl mb-6">Choose your amount</h2>

                  {/* Currency selector */}
                  <div className="flex gap-2 mb-6">
                    {CURRENCIES.map(c => (
                      <button key={c.code} type="button" onClick={() => setCurrency(c.code)}
                        className={`eyebrow text-xs px-4 py-2 transition-colors ${currency === c.code ? "bg-ink text-cream" : "border border-ink/15 opacity-50 hover:opacity-100"}`}
                      >
                        {c.symbol} {c.label}
                      </button>
                    ))}
                  </div>

                  {/* Preset amounts */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
                    {PRESET_AMOUNTS.map(a => (
                      <button key={a} type="button"
                        onClick={() => { setAmount(a); setCustomAmount(""); }}
                        className={`py-4 display text-xl transition-all ${amount === a ? "bg-ink text-cream border-2 border-gold" : "border border-ink/15 hover:border-ink/40"}`}
                      >
                        {currencyObj.symbol}{a}
                      </button>
                    ))}
                  </div>

                  {/* Custom amount */}
                  <div className="flex items-center gap-3">
                    <span className="display text-2xl text-gold">{currencyObj.symbol}</span>
                    <input
                      type="number" min="1" step="1" placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setAmount(""); }}
                      className="flex-1 bg-transparent border-b-2 border-ink/20 pb-3 outline-none focus:border-gold transition-colors display text-2xl"
                    />
                  </div>

                  {/* Impact message */}
                  {selectedAmount > 0 && impactText && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="mt-4 flex items-start gap-3 bg-gold/10 border border-gold/20 p-4"
                    >
                      <Sparkles size={16} className="text-gold shrink-0 mt-0.5" />
                      <p className="text-sm"><span className="font-medium">{currencyObj.symbol}{selectedAmount.toLocaleString()}</span> — {impactText}</p>
                    </motion.div>
                  )}
                </div>

                {/* Step 2: Frequency */}
                <div>
                  <p className="eyebrow text-gold mb-1">Step 2</p>
                  <h2 className="display text-3xl mb-6">How often?</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {FREQUENCIES.map(f => (
                      <button key={f.value} type="button" onClick={() => setFrequency(f.value)}
                        className={`py-3 eyebrow text-xs transition-all ${frequency === f.value ? "bg-ink text-cream" : "border border-ink/15 hover:border-ink/40"}`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Category */}
                <div>
                  <p className="eyebrow text-gold mb-1">Step 3</p>
                  <h2 className="display text-3xl mb-6">Direct your gift</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {CATEGORIES.map(c => {
                      const Icon = c.icon;
                      return (
                        <button key={c.value} type="button" onClick={() => setCategory(c.value)}
                          className={`p-5 text-left transition-all flex items-start gap-4 ${category === c.value ? "bg-ink text-cream border-2 border-gold" : "border border-ink/15 hover:border-ink/40"}`}
                        >
                          <Icon size={20} strokeWidth={1.5} className={category === c.value ? "text-gold" : "text-gold/60"} />
                          <div>
                            <p className="eyebrow text-xs mb-1">{c.label}</p>
                            <p className={`text-xs ${category === c.value ? "opacity-60" : "opacity-40"}`}>{c.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 4: Your info */}
                <div>
                  <p className="eyebrow text-gold mb-1">Step 4</p>
                  <h2 className="display text-3xl mb-6">Your information</h2>
                  <div className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="eyebrow opacity-50 text-[10px] block mb-2">Full name *</label>
                        <input required value={form.name} onChange={update("name")} className="w-full bg-transparent border-b border-ink/20 pb-3 outline-none focus:border-gold transition-colors" />
                      </div>
                      <div>
                        <label className="eyebrow opacity-50 text-[10px] block mb-2">Email *</label>
                        <input type="email" required value={form.email} onChange={update("email")} className="w-full bg-transparent border-b border-ink/20 pb-3 outline-none focus:border-gold transition-colors" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="eyebrow opacity-50 text-[10px] block mb-2">Phone</label>
                        <input value={form.phone} onChange={update("phone")} className="w-full bg-transparent border-b border-ink/20 pb-3 outline-none focus:border-gold transition-colors" />
                      </div>
                      <div>
                        <label className="eyebrow opacity-50 text-[10px] block mb-2">Organisation</label>
                        <input value={form.organization} onChange={update("organization")} className="w-full bg-transparent border-b border-ink/20 pb-3 outline-none focus:border-gold transition-colors" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="eyebrow opacity-50 text-[10px] block mb-2">Country</label>
                        <input value={form.country} onChange={update("country")} className="w-full bg-transparent border-b border-ink/20 pb-3 outline-none focus:border-gold transition-colors" />
                      </div>
                      <div>
                        <label className="eyebrow opacity-50 text-[10px] block mb-2">Dedicate this gift (optional)</label>
                        <input value={form.dedication} onChange={update("dedication")} placeholder="In honour of..." className="w-full bg-transparent border-b border-ink/20 pb-3 outline-none focus:border-gold transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="eyebrow opacity-50 text-[10px] block mb-2">Message (optional)</label>
                      <textarea rows={2} value={form.message} onChange={update("message")} maxLength={500}
                        className="w-full bg-transparent border-b border-ink/20 pb-3 outline-none focus:border-gold transition-colors resize-none" />
                    </div>
                    <label className="flex items-center gap-3 text-sm cursor-pointer">
                      <input type="checkbox" checked={form.isAnonymous} onChange={(e) => setForm({ ...form, isAnonymous: e.target.checked })} className="accent-gold" />
                      <span className="opacity-60">Make my donation anonymous</span>
                    </label>
                  </div>
                </div>

                {error && <p className="text-sm text-burgundy">{error}</p>}

                <button type="submit" disabled={submitting || selectedAmount < 1}
                  className="w-full bg-ink text-cream py-5 eyebrow hover:bg-burgundy transition-colors disabled:opacity-40 flex items-center justify-center gap-3 group"
                >
                  {submitting ? "Processing..." : (
                    <>
                      Donate {currencyObj.symbol}{selectedAmount > 0 ? selectedAmount.toLocaleString() : "—"} {frequency !== "one-time" ? `/ ${frequency}` : ""}
                      <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-xs opacity-40 text-center">
                  By donating, you agree to SafeHer Foundation&apos;s <Link href="/terms" className="link-underline">Terms</Link> and <Link href="/privacy" className="link-underline">Privacy Policy</Link>. You will receive a donation receipt by email.
                </p>
              </div>

              {/* RIGHT — Sidebar */}
              <div className="lg:col-span-5">
                <div className="sticky top-28 space-y-6">
                  {/* Donation summary */}
                  <div className="border-2 border-gold/30 bg-cream p-8">
                    <p className="eyebrow text-gold text-xs mb-4">Donation Summary</p>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between"><span className="opacity-50">Amount</span><span className="display text-xl">{currencyObj.symbol}{selectedAmount > 0 ? selectedAmount.toLocaleString() : "—"}</span></div>
                      <div className="flex justify-between"><span className="opacity-50">Frequency</span><span className="capitalize">{frequency.replace("-", " ")}</span></div>
                      <div className="flex justify-between"><span className="opacity-50">Directed to</span><span className="capitalize text-right max-w-[180px]">{CATEGORIES.find(c => c.value === category)?.label}</span></div>
                      <div className="h-px bg-ink/10 my-2" />
                      {frequency === "monthly" && selectedAmount > 0 && (
                        <div className="flex justify-between opacity-50"><span>Annual total</span><span>{currencyObj.symbol}{(selectedAmount * 12).toLocaleString()}</span></div>
                      )}
                    </div>
                  </div>

                  {/* Trust signals */}
                  <div className="border border-ink/10 bg-bone p-8">
                    <p className="eyebrow text-gold text-xs mb-4">Your trust matters</p>
                    <ul className="space-y-3">
                      {[
                        "100% goes to programme delivery",
                        "Annual audited financial reports",
                        "Detailed impact reporting for donors",
                        "Independent board governance",
                        "Tax-deductible where applicable",
                      ].map(t => (
                        <li key={t} className="flex items-start gap-3 text-sm">
                          <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                          <span className="opacity-60">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What your donation funds */}
                  <div className="border border-ink/10 bg-cream p-8">
                    <p className="eyebrow text-gold text-xs mb-4">What we fund</p>
                    <ul className="space-y-2 text-xs opacity-50">
                      <li>✦ Free safety courses for women &amp; girls</li>
                      <li>✦ Educator certification scholarships</li>
                      <li>✦ Campus chapter establishment</li>
                      <li>✦ Consultation services for survivors</li>
                      <li>✦ Curriculum development for African contexts</li>
                      <li>✦ Technology platform &amp; certificate system</li>
                    </ul>
                  </div>

                  {/* Emergency note */}
                  <div className="border border-burgundy/20 bg-burgundy/5 p-4">
                    <p className="text-xs opacity-50">
                      SafeHer Foundation is a registered Ghana-US women&apos;s safety
                      foundation. Donations are processed securely. For large institutional
                      gifts or grant funding, <Link href="/contact" className="link-underline text-burgundy">contact us directly</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="py-24 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow text-gold mb-4">Your impact</p>
          <h2 className="display text-4xl lg:text-5xl mb-16">Every amount <span className="display-italic text-gold">matters.</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {IMPACT_EXAMPLES.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="border border-cream/10 p-8"
              >
                <p className="display text-3xl text-gold mb-3">${item.amount}</p>
                <p className="text-sm opacity-60">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPARENCY */}
      <section className="py-24 bg-bone">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 text-center">
          <p className="eyebrow text-gold mb-4">Transparency</p>
          <h2 className="display text-4xl lg:text-5xl mb-12">Your trust is <span className="display-italic text-burgundy">non-negotiable.</span></h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Financial Transparency", desc: "Annual audited statements published openly for public review." },
              { title: "Impact Reporting", desc: "Every donor receives detailed reports showing where their money went." },
              { title: "Governance", desc: "Independent board oversight ensures responsible use of every donation." },
            ].map(item => (
              <div key={item.title} className="border border-ink/10 bg-cream p-8">
                <h3 className="display text-xl mb-3">{item.title}</h3>
                <p className="text-sm opacity-60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
