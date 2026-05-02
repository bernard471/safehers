"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { COACHES, ALL_SPECIALTIES, ALL_COUNTRIES } from "@/lib/coaches";

export default function CoachesPage() {
  const [specialty, setSpecialty] = useState("All");
  const [country, setCountry] = useState("All");

  const filtered = useMemo(
    () =>
      COACHES.filter(
        (c) =>
          (specialty === "All" || c.specialties.includes(specialty)) &&
          (country === "All" || c.country === country)
      ),
    [specialty, country]
  );

  return (
    <>
      <section className="pt-40 pb-20 lg:pt-48">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-4 opacity-60">Financial Safety & Wealth</p>
          <h1 className="display text-[clamp(2.5rem,7vw,7rem)] font-light max-w-[900px]">
            Financial<br />
            <span className="display-italic text-burgundy">Coaches</span>
          </h1>
          <p className="body-prose mt-6 max-w-2xl text-ink/70">
            Work with a trained financial coach who understands the African context. One-to-one sessions, group workshops, and ongoing accountability.
          </p>
          <div className="mt-4 p-4 bg-rose/10 border border-rose/30 max-w-2xl">
            <p className="text-xs text-ink/60">
              ✦ Illustrative roster — these profiles are pending real partner onboarding. All coaches shown are placeholder representatives. Verified coach partnerships are in progress.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-10">
            <div className="flex flex-col gap-1">
              <label className="eyebrow text-xs opacity-60">Specialty</label>
              <select
                className="border border-ink/20 px-4 py-3 bg-cream text-sm focus:outline-none focus:border-burgundy"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              >
                <option value="All">All specialties</option>
                {ALL_SPECIALTIES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="eyebrow text-xs opacity-60">Country</label>
              <select
                className="border border-ink/20 px-4 py-3 bg-cream text-sm focus:outline-none focus:border-burgundy"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="All">All countries</option>
                {ALL_COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            {(specialty !== "All" || country !== "All") && (
              <button
                className="self-end border border-ink/20 px-4 py-3 text-sm eyebrow hover:border-ink transition-colors"
                onClick={() => { setSpecialty("All"); setCountry("All"); }}
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <p className="text-ink/50 text-sm">No coaches match your filters. Try broadening your search.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((coach) => (
                <div key={coach.id} className="border border-ink/15 p-6 flex flex-col">
                  <div className="w-14 h-14 rounded-full bg-rose/20 flex items-center justify-center mb-4">
                    <span className="display text-xl text-burgundy">{coach.name[0]}</span>
                  </div>
                  <h3 className="display text-xl mb-1">{coach.name}</h3>
                  <p className="eyebrow text-xs text-burgundy mb-3">{coach.title}</p>
                  <p className="text-sm text-ink/70 leading-relaxed flex-1">{coach.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {coach.specialties.map((s) => (
                      <span key={s} className="text-xs border border-ink/20 px-2 py-1">{s}</span>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-ink/50">
                    {coach.country} ✦ {coach.languages.join(", ")}
                  </div>
                  <Link
                    href="/contact"
                    className="mt-5 w-full text-center border border-ink/30 px-4 py-3 eyebrow text-xs hover:bg-ink hover:text-cream transition-colors"
                  >
                    Request session
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 flex flex-wrap gap-4">
            <Link href="/financial-literacy" className="border border-ink/30 px-8 py-4 eyebrow hover:border-ink transition-colors">Back to Financial Literacy</Link>
            <Link href="/calculators" className="bg-ink text-cream px-8 py-4 eyebrow hover:bg-burgundy transition-colors">Financial Calculators</Link>
          </div>
        </div>
      </section>
    </>
  );
}
