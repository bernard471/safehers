"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download, FileText, Check, X, ArrowUpRight, BookOpen,
  Shield, Wifi, Banknote, Home, GraduationCap, Building2, Users,
} from "lucide-react";
import { RESOURCES, type Resource } from "@/lib/resources";
import Image from "next/image";

const CATEGORIES = ["All", ...Array.from(new Set(RESOURCES.map((r) => r.category)))];

const categoryIcons: Record<string, typeof Shield> = {
  "Personal Safety": Shield,
  "Home Safety": Home,
  "Online Safety": Wifi,
  "Financial Safety": Banknote,
  "Campus Safety": GraduationCap,
  Institutional: Building2,
};

const typeColors: Record<string, string> = {
  PDF: "bg-burgundy/10 text-burgundy",
  Checklist: "bg-gold/15 text-gold",
  Toolkit: "bg-moss/10 text-moss",
  Protocol: "bg-burgundy/15 text-burgundy",
  Guide: "bg-ink/5 text-ink",
  Worksheet: "bg-gold/10 text-gold",
  Poster: "bg-rose/20 text-ink",
};

const featured = RESOURCES.filter((r) => r.featured);

function DownloadModal({ resource, onClose }: { resource: Resource; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    try {
      const r = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resourceId: resource.id, country }),
      });
      const data = await r.json();
      if (r.ok) {
        setStatus("success");
        window.open(data.downloadUrl, "_blank");
      } else {
        setStatus("error");
        setErrMsg(data.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrMsg("Network error. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        className="relative bg-cream max-w-md w-full z-10"
      >
        <button onClick={onClose} className="absolute top-5 right-5 opacity-40 hover:opacity-100"><X size={20} /></button>

        {status !== "success" ? (
          <div className="p-10">
            <p className="eyebrow text-gold mb-4">Free Download</p>
            <h2 className="display text-2xl font-light mb-2">{resource.title}</h2>
            <p className="text-sm text-ink/60 mb-6">{resource.description}</p>
            {resource.pages && <p className="eyebrow text-xs opacity-40 mb-6">{resource.type} · {resource.pages} pages</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="eyebrow text-xs opacity-50 block mb-1">Email *</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
                  className="w-full border border-ink/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" />
              </div>
              <div>
                <label className="eyebrow text-xs opacity-50 block mb-1">Country</label>
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Ghana"
                  className="w-full border border-ink/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" />
              </div>
              {errMsg && <p className="text-xs text-burgundy">{errMsg}</p>}
              <button type="submit" disabled={status === "loading"}
                className="w-full bg-ink text-cream py-3 eyebrow hover:bg-burgundy transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                <Download size={14} /> {status === "loading" ? "Processing..." : "Download Now"}
              </button>
              <p className="text-xs opacity-30 text-center">We may send occasional safety updates. Unsubscribe anytime.</p>
            </form>
          </div>
        ) : (
          <div className="p-10 text-center">
            <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={28} className="text-gold" />
            </div>
            <h2 className="display text-3xl font-light mb-4">Download started</h2>
            <p className="text-sm text-ink/60 mb-6">Your download should have opened in a new tab.</p>
            {resource.courseSlug && (
              <div className="border border-ink/10 p-4 mb-6 text-left">
                <p className="eyebrow text-xs text-gold mb-2">Want to learn more?</p>
                <Link href={`/academy/courses/${resource.courseSlug}`} className="text-sm text-burgundy flex items-center gap-2 link-underline">
                  Take the full course <ArrowUpRight size={12} />
                </Link>
              </div>
            )}
            <button onClick={onClose} className="eyebrow border border-ink/20 px-6 py-2 hover:bg-ink hover:text-cream transition-colors">Close</button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const filtered = activeCategory === "All" ? RESOURCES : RESOURCES.filter((r) => r.category === activeCategory);

  return (
    <>
      {/* HERO */}
      <section className="relative pt-40 pb-24 lg:pt-48 bg-ink text-cream overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-6 items-center max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="lg:col-span-7">
          <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
            <span className="inline-block w-8 h-px bg-gold" />
            Free Resources
          </p>
          <h1 className="display text-[clamp(3rem,8vw,7rem)] font-light max-w-[900px] mb-6">
            Tools you can{" "}
            <span className="display-italic text-gold">use today</span>
          </h1>
          <p className="body-prose max-w-2xl opacity-70 mb-8">
            {RESOURCES.length} free safety resources — checklists, guides, toolkits, and protocols.
            Designed to be printed, shared, and put to immediate use. No login required.
          </p>
          <div className="flex items-center gap-6 text-sm opacity-40">
            <span className="flex items-center gap-2"><FileText size={14} /> {RESOURCES.length} resources</span>
            <span className="flex items-center gap-2"><Users size={14} /> Free for everyone</span>
            <span className="flex items-center gap-2"><Download size={14} /> Instant download</span>
          </div>
        </div>
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}
           className="hidden lg:flex justify-center lg:col-span-5"
         >
           <Image src="/images/safeherlogo.png" alt="SafeHer Academy" width={280} height={280} className="w-64 h-64 object-contain opacity-80 drop-shadow-[0_0_60px_rgba(184,150,62,0.2)]" />
         </motion.div>   
          </div>    
      </section>
      <div className="gold-rule" />

      {/* FEATURED RESOURCES */}
      <section className="py-16 bg-bone">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow text-gold mb-6">Most downloaded</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((r, i) => {
              const CatIcon = categoryIcons[r.category] || FileText;
              return (
                <motion.button
                  key={r.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setSelectedResource(r)}
                  className="border border-ink/10 bg-cream p-6 text-left hover:border-gold/40 transition-all group"
                >
                  <CatIcon size={20} strokeWidth={1.2} className="text-gold mb-3" />
                  <h3 className="display text-lg mb-2 group-hover:text-burgundy transition-colors">{r.title}</h3>
                  <p className="text-xs opacity-50 mb-3 line-clamp-2">{r.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`eyebrow text-[9px] px-2 py-0.5 ${typeColors[r.type] || "bg-ink/5"}`}>{r.type}</span>
                    <span className="eyebrow text-[10px] text-burgundy flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Download <Download size={10} />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ALL RESOURCES */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-8 gap-6">
            <div>
              <p className="eyebrow text-gold mb-3">All resources</p>
              <h2 className="display text-3xl lg:text-4xl">Browse by <span className="display-italic text-burgundy">category</span></h2>
            </div>
            <p className="text-sm opacity-40 hidden md:block">{filtered.length} resources</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`eyebrow px-5 py-2.5 transition-colors ${activeCategory === cat ? "bg-ink text-cream" : "border border-ink/15 text-ink/50 hover:text-ink hover:border-ink/40"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((resource, i) => {
              const CatIcon = categoryIcons[resource.category] || FileText;
              return (
                <motion.article
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="border border-ink/10 flex flex-col group hover:border-gold/30 transition-all"
                >
                  <div className="p-7 flex-1">
                    <div className="flex items-start justify-between mb-5">
                      <CatIcon size={24} strokeWidth={1.2} className="text-gold" />
                      <span className={`eyebrow text-[9px] px-2 py-0.5 ${typeColors[resource.type] ?? "bg-ink/5"}`}>
                        {resource.type}
                      </span>
                    </div>
                    <p className="eyebrow text-[10px] text-gold mb-2">{resource.category}</p>
                    <h3 className="display text-xl mb-3 group-hover:text-burgundy transition-colors">{resource.title}</h3>
                    <p className="text-sm opacity-60 mb-4 leading-relaxed">{resource.description}</p>
                    <div className="flex items-center gap-3 text-xs opacity-40">
                      {resource.pages && <span>{resource.pages} pages</span>}
                      {resource.audience && <span>· {resource.audience}</span>}
                    </div>
                  </div>
                  <div className="px-7 pb-7 pt-4 border-t border-ink/5 flex items-center justify-between">
                    <button onClick={() => setSelectedResource(resource)}
                      className="eyebrow text-xs text-burgundy flex items-center gap-2 group-hover:gap-3 transition-all">
                      <Download size={12} /> Free download
                    </button>
                    {resource.courseSlug && (
                      <Link href={`/academy/courses/${resource.courseSlug}`}
                        className="eyebrow text-[10px] text-gold flex items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
                        Full course <ArrowUpRight size={10} />
                      </Link>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ACADEMY CTA */}
      <section className="py-20 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <BookOpen size={28} strokeWidth={1.2} className="text-gold mb-4" />
              <h2 className="display text-3xl lg:text-4xl mb-4">
                Want to go deeper?
              </h2>
              <p className="body-prose opacity-60 max-w-lg">
                These resources are a starting point. Our free Academy courses take
                you further — with structured lessons, quizzes, practical tasks,
                and a certificate at the end.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/academy/courses" className="bg-gold text-ink px-7 py-5 inline-flex items-center justify-between group hover:bg-cream transition-colors">
                <span className="eyebrow">Browse Free Courses</span>
                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
              </Link>
              <Link href="/consultation" className="border border-cream/20 px-7 py-5 inline-flex items-center justify-between group hover:bg-cream/5 transition-colors">
                <span className="eyebrow">Book a Consultation</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedResource && (
          <DownloadModal resource={selectedResource} onClose={() => setSelectedResource(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
