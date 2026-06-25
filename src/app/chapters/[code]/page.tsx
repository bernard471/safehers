"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowUpRight, MapPin, Users, GraduationCap,
  Phone, Shield, Globe, Award, BookOpen, AlertTriangle, CheckCircle,
} from "lucide-react";
import { COUNTRIES } from "@/lib/chapters-data";

const resourceIcons: Record<string, typeof Phone> = {
  police: Shield, "domestic-violence": Phone, "cyber-crime": Globe, helpline: Phone, medical: AlertTriangle,
};

export default function CountryDetailPage() {
  const params = useParams();
  const code = (params.code as string)?.toUpperCase();
  const country = COUNTRIES.find(c => c.code === code);

  if (!country) { notFound(); return null; }

  const totalWorkshops = country.chapters.reduce((s, c) => s + (c.workshopsHeld || 0), 0);
  const totalCerts = country.chapters.reduce((s, c) => s + (c.certificatesEarned || 0), 0);

  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 lg:pt-48 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Link href="/chapters" className="eyebrow text-xs text-cream/40 flex items-center gap-2 mb-8 hover:text-cream transition-colors">
            <ArrowLeft size={14} /> All Chapters
          </Link>
          <div className="flex items-center gap-5 mb-6">
            <img src={country.flag} alt={country.country} className="w-16 h-11 object-cover rounded shadow-md border border-cream/10 shrink-0" />
            <div>
              <h1 className="display text-[clamp(2.5rem,6vw,5rem)] font-light">{country.country}</h1>
              <p className="eyebrow text-gold text-xs mt-1">{country.region} · SafeHers {country.status === "active" ? "Hub" : "Launching"}</p>
            </div>
          </div>
          <p className="body-prose max-w-2xl opacity-70 text-lg mb-10">{country.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: country.chapters.length, label: "Chapters" },
              { value: country.totalMembers, label: "Members" },
              { value: totalWorkshops, label: "Workshops held" },
              { value: totalCerts, label: "Certificates earned" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                <p className="display text-3xl text-gold">{s.value}</p>
                <p className="eyebrow text-[10px] opacity-40">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {country.languages && (
            <div className="mt-8 flex items-center gap-2 text-xs opacity-40">
              <Globe size={12} /> Languages: {country.languages.join(", ")}
            </div>
          )}
        </div>
      </section>
      <div className="gold-rule" />

      {/* CHAPTERS */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow text-gold mb-4">Chapters in {country.country}</p>
          <h2 className="display text-3xl lg:text-4xl mb-12">{country.chapters.length > 0 ? "Active and launching chapters." : "No chapters yet."}</h2>

          {country.chapters.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {country.chapters.map((ch, i) => (
                <motion.div key={ch.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="border border-ink/10 bg-cream hover:border-gold/30 transition-colors"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {ch.type === "campus" ? <GraduationCap size={20} className="text-gold" /> : <MapPin size={20} className="text-gold" />}
                        <div>
                          <h3 className="display text-xl">{ch.name}</h3>
                          <p className="eyebrow text-[10px] opacity-40 mt-0.5">{ch.city}{ch.institution ? ` · ${ch.institution}` : ""}</p>
                        </div>
                      </div>
                      <span className={`eyebrow text-[9px] px-2 py-0.5 ${ch.status === "active" ? "bg-gold/15 text-gold" : ch.status === "launching" ? "bg-burgundy/10 text-burgundy" : "bg-ink/5 text-ink/40"}`}>
                        {ch.status}
                      </span>
                    </div>
                    {ch.leader && <p className="text-xs opacity-50 mb-3">Chapter lead: <span className="text-ink">{ch.leader}</span></p>}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-ink/5">
                      <div><p className="display text-xl text-gold">{ch.members}</p><p className="eyebrow text-[9px] opacity-40">Members</p></div>
                      <div><p className="display text-xl">{ch.workshopsHeld || 0}</p><p className="eyebrow text-[9px] opacity-40">Workshops</p></div>
                      <div><p className="display text-xl">{ch.certificatesEarned || 0}</p><p className="eyebrow text-[9px] opacity-40">Certificates</p></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-ink/15 p-16 text-center">
              <p className="display text-2xl mb-4">Be the first.</p>
              <p className="body-prose opacity-60 max-w-md mx-auto mb-6">There are no SafeHers chapters in {country.country} yet. You can change that.</p>
              <Link href={`/chapters/join?country=${country.code}`} className="bg-ink text-cream px-7 py-4 eyebrow hover:bg-burgundy transition-colors inline-flex items-center gap-2">
                Start a Chapter <ArrowUpRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* AMBASSADORS */}
      {country.ambassadors && country.ambassadors.length > 0 && (
        <section className="py-24 bg-bone">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <p className="eyebrow text-gold mb-4">Chapter Ambassadors</p>
            <h2 className="display text-3xl lg:text-4xl mb-12">Leaders on the <span className="display-italic text-burgundy">ground.</span></h2>
            <div className="grid md:grid-cols-2 gap-6">
              {country.ambassadors.map((amb, i) => (
                <motion.div key={amb.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="border border-ink/10 bg-cream p-8"
                >
                  <p className="eyebrow text-gold text-xs mb-2">{amb.role}</p>
                  <h3 className="display text-2xl mb-1">{amb.name}</h3>
                  <p className="eyebrow text-[10px] opacity-40 mb-4">{amb.chapter}</p>
                  <p className="text-sm opacity-60 leading-relaxed">{amb.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EMERGENCY RESOURCES */}
      {country.emergencyResources && country.emergencyResources.length > 0 && (
        <section className="py-24">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <p className="eyebrow text-gold mb-4">Emergency Resources — {country.country}</p>
            <h2 className="display text-3xl lg:text-4xl mb-4">Safety <span className="display-italic text-burgundy">numbers.</span></h2>
            <p className="body-prose opacity-50 mb-12 max-w-lg">Save these numbers in your phone. If you are in immediate danger, call emergency services first.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {country.emergencyResources.map((res, i) => {
                const Icon = resourceIcons[res.type] || Phone;
                return (
                  <motion.div key={res.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                    className="border border-ink/10 bg-cream p-6 flex items-start gap-4"
                  >
                    <Icon size={20} className="text-gold shrink-0 mt-1" />
                    <div>
                      <p className="display text-lg mb-1">{res.name}</p>
                      <a href={`tel:${res.number.replace(/\s/g, "")}`} className="display text-xl text-burgundy">{res.number}</a>
                      <p className="eyebrow text-[9px] opacity-30 mt-1 capitalize">{res.type.replace(/-/g, " ")}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* JOIN CTA */}
      <section className="py-24 bg-ink text-cream">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 text-center">
          <p className="display-italic text-xl text-gold mb-4">Pretty Girl, Save Yourself.</p>
          <h2 className="display text-4xl lg:text-5xl mb-6">Join SafeHers in<br /><span className="display-italic text-gold">{country.country}.</span></h2>
          <p className="body-prose opacity-60 max-w-md mx-auto mb-10">
            {country.chapters.length > 0
              ? "Join an existing chapter or start a new one in your city."
              : `Be the first to bring SafeHers to ${country.country}.`}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/chapters/join?country=${country.code}`} className="bg-gold text-ink px-8 py-5 eyebrow hover:bg-cream transition-colors inline-flex items-center gap-2">
              {country.chapters.length > 0 ? "Join a Chapter" : "Start a Chapter"} <ArrowUpRight size={14} />
            </Link>
            <Link href="/academy" className="border border-cream/30 px-8 py-5 eyebrow hover:bg-cream/10 transition-colors">
              Explore Academy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
