"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight, MapPin, Users, GraduationCap, Globe,
  CheckCircle, Clock, Sparkles, ChevronDown,
} from "lucide-react";
import {
  COUNTRIES, REGIONS, TOTAL_COUNTRIES, ACTIVE_COUNTRIES,
  TOTAL_CHAPTERS, TOTAL_MEMBERS, type CountryHub,
} from "@/lib/chapters-data";
import AfricaMap from "@/components/AfricaMap";
import ChapterLeaderboard from "@/components/ChapterLeaderboard";

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: "bg-gold/15", text: "text-gold", label: "Active" },
  launching: { bg: "bg-burgundy/10", text: "text-burgundy", label: "Launching" },
  planned: { bg: "bg-ink/5", text: "text-ink/60", label: "Planned" },
  interest: { bg: "bg-ink/5", text: "text-ink/40", label: "Interest" },
};

export default function ChaptersPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [expandedCountry, setExpandedCountry] = useState<string | null>("GH");

  const filtered = selectedRegion === "All"
    ? COUNTRIES
    : COUNTRIES.filter(c => c.region === selectedRegion);

  const activeCountries = filtered.filter(c => c.status === "active" || c.status === "launching");
  const plannedCountries = filtered.filter(c => c.status === "planned" || c.status === "interest");

  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 lg:pt-48 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
            <span className="inline-block w-8 h-px bg-gold" />
            Pan-African Chapters
          </p>
          <h1 className="display text-[clamp(3rem,7vw,6rem)] font-light max-w-[1000px] mb-6">
            One movement.<br />
            <span className="display-italic text-gold">Every country.</span>
          </h1>
          <p className="body-prose max-w-2xl opacity-70 text-lg mb-10">
            SafeHers chapters are the local face of the movement. Student-led on campuses,
            community-led in towns — every chapter delivers practical safety education
            adapted to its local context. We are building across the entire continent.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: TOTAL_COUNTRIES, label: "Countries" },
              { value: ACTIVE_COUNTRIES, label: "Active hubs" },
              { value: TOTAL_CHAPTERS, label: "Chapters" },
              { value: TOTAL_MEMBERS, label: "Members" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="text-center">
                <p className="display text-4xl text-gold mb-1">{s.value}</p>
                <p className="eyebrow text-[10px] opacity-40">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <div className="gold-rule" />

      {/* AFRICA MAP */}
      <section className="py-24 bg-bone">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow text-gold mb-4">Across the continent</p>
              <h2 className="display text-4xl lg:text-5xl mb-6">SafeHers chapters <span className="display-italic text-burgundy">map.</span></h2>
              <p className="body-prose opacity-60 mb-6">
                Click any country dot to see its chapters, emergency resources,
                ambassadors, and how to join. Gold dots are active hubs. Burgundy dots
                are launching soon.
              </p>
              <Link href="/chapters/join" className="eyebrow text-burgundy flex items-center gap-2 hover:gap-3 transition-all">
                Start a chapter in your country <ArrowUpRight size={14} />
              </Link>
            </div>
            <AfricaMap />
          </div>
        </div>
      </section>

      {/* LEADERBOARD */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <ChapterLeaderboard />
        </div>
      </section>

      {/* REGION FILTER */}
      <section className="py-8 bg-cream border-b border-ink/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSelectedRegion("All")}
              className={`eyebrow px-5 py-2.5 transition-colors ${selectedRegion === "All" ? "bg-ink text-cream" : "border border-ink/15 opacity-50 hover:opacity-100"}`}>
              All Africa
            </button>
            {REGIONS.map(r => (
              <button key={r} onClick={() => setSelectedRegion(r)}
                className={`eyebrow px-5 py-2.5 transition-colors ${selectedRegion === r ? "bg-ink text-cream" : "border border-ink/15 opacity-50 hover:opacity-100"}`}>
                {r}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVE & LAUNCHING COUNTRIES */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {activeCountries.length > 0 && (
            <>
              <p className="eyebrow text-gold mb-4">Active &amp; Launching</p>
              <h2 className="display text-3xl lg:text-4xl mb-12">Countries with <span className="display-italic text-burgundy">chapters.</span></h2>
              <div className="space-y-4 mb-20">
                {activeCountries.map((c, i) => (
                  <CountryCard key={c.code} country={c} index={i} expanded={expandedCountry === c.code}
                    onToggle={() => setExpandedCountry(expandedCountry === c.code ? null : c.code)} />
                ))}
              </div>
            </>
          )}

          {plannedCountries.length > 0 && (
            <>
              <p className="eyebrow text-gold mb-4">Expanding &amp; Interest</p>
              <h2 className="display text-3xl lg:text-4xl mb-12">Countries where SafeHers is <span className="display-italic text-burgundy">growing.</span></h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {plannedCountries.map((c, i) => {
                  const st = statusStyles[c.status];
                  return (
                    <motion.div key={c.code}
                      initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                      className="border border-ink/10 bg-cream p-6 hover:border-gold/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img src={c.flag} alt={c.country} className="w-8 h-5.5 object-cover shrink-0 shadow-sm rounded-sm" />
                          <div>
                            <h3 className="display text-lg">{c.country}</h3>
                            <p className="eyebrow text-[9px] opacity-40">{c.region}</p>
                          </div>
                        </div>
                        <span className={`eyebrow text-[9px] px-2 py-1 ${st.bg} ${st.text}`}>{st.label}</span>
                      </div>
                      <p className="text-xs opacity-50 leading-relaxed mb-4">{c.description}</p>
                      <Link href="/contact" className="eyebrow text-[10px] text-burgundy flex items-center gap-1 hover:gap-2 transition-all">
                        Lead a chapter here <ArrowUpRight size={10} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* HOW TO START A CHAPTER */}
      <section className="py-24 bg-bone">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow text-gold mb-4">Start a chapter</p>
          <h2 className="display text-4xl lg:text-5xl mb-16">How to bring SafeHers to <span className="display-italic text-burgundy">your country.</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", icon: Sparkles, title: "Express Interest", desc: "Contact us with your country, city, and whether you want a campus or community chapter." },
              { step: "02", icon: GraduationCap, title: "Get Trained", desc: "Complete chapter leader training (virtual or in-person). Learn the SafeHers curriculum and facilitation methods." },
              { step: "03", icon: Users, title: "Recruit Members", desc: "Build your founding group of 10+ members. We provide social media assets and recruitment materials." },
              { step: "04", icon: Globe, title: "Launch & Grow", desc: "Hold your first workshop, appear on the SafeHers chapter map, and connect with the pan-African network." },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="border border-ink/10 bg-cream p-8 relative overflow-hidden">
                  <div className="absolute top-4 right-4 num-tag text-6xl text-gold/10">{s.step}</div>
                  <Icon size={24} strokeWidth={1.2} className="text-gold mb-4 relative" />
                  <h3 className="display text-xl mb-3 relative">{s.title}</h3>
                  <p className="text-sm opacity-60 relative">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT CHAPTERS RECEIVE */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="eyebrow text-gold mb-4">Campus Chapters</p>
              <h2 className="display text-3xl mb-6">For universities</h2>
              <ul className="space-y-3">
                {["Chapter leader training (virtual or in-person)", "SafeHers curriculum for peer workshops", "Branded identity and social media assets", "Connection to pan-African chapter network", "Annual chapter recognition awards", "Priority access to SafeHer Academy courses"].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm"><CheckCircle size={14} className="text-gold mt-0.5 shrink-0" /><span className="opacity-70">{item}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-gold mb-4">Community Chapters</p>
              <h2 className="display text-3xl mb-6">For communities</h2>
              <ul className="space-y-3">
                {["Subsidised educator certification for chapter leaders", "Community-appropriate curriculum adaptations", "Printed materials and visual aids", "Quarterly check-ins with foundation team", "Recognition on SafeHers chapters map", "Support for local events and workshops"].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm"><CheckCircle size={14} className="text-gold mt-0.5 shrink-0" /><span className="opacity-70">{item}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-ink text-cream">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 text-center">
          <Globe size={40} strokeWidth={1} className="text-gold mx-auto mb-6" />
          <p className="display-italic text-xl text-gold mb-4">Pretty Girl, Save Yourself.</p>
          <h2 className="display text-5xl lg:text-6xl mb-6">
            Lead the movement<br />
            <span className="display-italic text-gold">where you are.</span>
          </h2>
          <p className="body-prose opacity-60 max-w-xl mx-auto mb-10">
            Whether you are in Lagos, Nairobi, Cape Town, or Accra — if you want to
            bring safety education to your community, we want to hear from you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center gap-3 bg-gold text-ink px-8 py-5 hover:bg-cream transition-colors group">
              <span className="eyebrow">Start a Chapter</span>
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
            </Link>
            <Link href="/academy" className="inline-flex items-center gap-3 border border-cream/30 px-8 py-5 hover:bg-cream/10 transition-colors">
              <span className="eyebrow">Explore Academy</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function CountryCard({ country: c, index, expanded, onToggle }: { country: CountryHub; index: number; expanded: boolean; onToggle: () => void }) {
  const st = statusStyles[c.status];
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}
      className="border border-ink/10 bg-cream overflow-hidden hover:border-gold/30 transition-colors"
    >
      <button onClick={onToggle} className="w-full p-6 flex items-center justify-between text-left">
        <div className="flex items-center gap-4">
          <img src={c.flag} alt={c.country} className="w-10 h-7 object-cover shrink-0 shadow-sm rounded-sm" />
          <div>
            <div className="flex items-center gap-3">
              <h3 className="display text-2xl">{c.country}</h3>
              <span className={`eyebrow text-[9px] px-2 py-0.5 ${st.bg} ${st.text}`}>{st.label}</span>
            </div>
            <p className="eyebrow text-[10px] opacity-40 mt-1">{c.region} · {c.chapters.length} chapters · {c.totalMembers} members</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {c.coordinator && <span className="eyebrow text-xs opacity-30 hidden sm:block">Coordinator: {c.coordinator}</span>}
          <ChevronDown size={18} className={`opacity-40 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </div>
      </button>

      {expanded && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="border-t border-ink/10">
          <div className="p-6">
            <p className="text-sm opacity-60 mb-6">{c.description}</p>

            {c.chapters.length > 0 ? (
              <div className="space-y-3">
                {c.chapters.map(ch => {
                  const chSt = statusStyles[ch.status];
                  return (
                    <div key={ch.name} className="border border-ink/5 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {ch.type === "campus" ? <GraduationCap size={16} className="text-gold shrink-0" /> : <MapPin size={16} className="text-gold shrink-0" />}
                        <div>
                          <p className="text-sm font-medium">{ch.name}</p>
                          <p className="text-xs opacity-40">{ch.city}{ch.institution ? ` · ${ch.institution}` : ""}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="eyebrow text-[10px] opacity-40 hidden sm:block">{ch.members} members</span>
                        <span className={`eyebrow text-[9px] px-2 py-0.5 ${chSt.bg} ${chSt.text}`}>{chSt.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="border border-dashed border-ink/10 p-6 text-center">
                <p className="text-sm opacity-40 mb-3">No chapters yet in {c.country}</p>
                <Link href="/contact" className="eyebrow text-xs text-burgundy link-underline">Be the first to start one →</Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
