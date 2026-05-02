"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type AudienceType = "all" | "student" | "university" | "corporate" | "government";

const testimonials = [
  {
    quote:
      "SafeHers did not just teach us what to do — it taught us why. That deeper understanding is what changes behaviour for life.",
    name: "Adwoa Mensah",
    title: "Student",
    org: "University of Ghana, Legon",
    type: "student" as AudienceType,
  },
  {
    quote:
      "Within one semester of running the SafeHers programme, our student welfare office saw a measurable increase in safety incident reporting. Women were speaking up because they knew their rights.",
    name: "Dr. Kofi Asante",
    title: "Dean of Student Affairs",
    org: "KNUST",
    type: "university" as AudienceType,
  },
  {
    quote:
      "We brought SafeHers in for our female operations staff in Lagos and Accra. The feedback was unanimous — this is the most useful corporate training they had ever attended.",
    name: "Ngozi Osei",
    title: "Head of People",
    org: "Continental Finance Group",
    type: "corporate" as AudienceType,
  },
  {
    quote:
      "The online safety module should be required curriculum at every secondary school on the continent. The sextortion protocol alone could save lives.",
    name: "Amina Diallo",
    title: "Programme Officer",
    org: "ECOWAS Gender Development Centre",
    type: "government" as AudienceType,
  },
  {
    quote:
      "I trained as an Educator and now deliver this curriculum at my church every quarter. The transformation in the women I teach is visible from week to week.",
    name: "Sister Grace Boateng",
    title: "Community Educator",
    org: "Accra",
    type: "student" as AudienceType,
  },
  {
    quote:
      "As a funder, what impressed us most was the rigour of the impact framework. SafeHers can tell us exactly what change they are creating and how they know.",
    name: "Jennifer Kiplangat",
    title: "Programme Director",
    org: "East Africa Women's Fund",
    type: "government" as AudienceType,
  },
  {
    quote:
      "The campus programme transformed how our residence halls approach women's safety. Students take it seriously because the facilitators take it seriously.",
    name: "Prof. Esi Quaye",
    title: "Vice-Chancellor",
    org: "Valley View University",
    type: "university" as AudienceType,
  },
  {
    quote:
      "We integrated SafeHers into our hospitality onboarding programme for all female staff. Night-shift confidence and incident response have both improved significantly.",
    name: "Marcus Asiedu",
    title: "HR Director",
    org: "Kempinski Hotels West Africa",
    type: "corporate" as AudienceType,
  },
  {
    quote:
      "The Personal Safety Checklist alone gave me language to talk about safety with my teenage daughter. We now have protocols we review together monthly.",
    name: "Fatima Al-Hassan",
    title: "Parent",
    org: "Tamale, Ghana",
    type: "student" as AudienceType,
  },
];

const filters: { value: AudienceType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "student", label: "Students & Individuals" },
  { value: "university", label: "Universities" },
  { value: "corporate", label: "Corporate" },
  { value: "government", label: "Government & NGO" },
];

export default function TestimonialsPage() {
  const [filter, setFilter] = useState<AudienceType>("all");

  const visible =
    filter === "all"
      ? testimonials
      : testimonials.filter((t) => t.type === filter);

  return (
    <>
      <section className="pt-40 pb-24 lg:pt-48">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-ink" />
            Testimonials
          </p>
          <h1 className="display text-[clamp(3rem,8vw,8rem)] font-light max-w-[900px]">
            Words from{" "}
            <span className="display-italic text-burgundy">the community</span>
          </h1>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-16">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`eyebrow px-4 py-2 transition-colors ${
                  filter === f.value
                    ? "bg-ink text-cream"
                    : "border border-ink/20 text-ink/60 hover:text-ink hover:border-ink/50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Masonry-style grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {visible.map((t, i) => (
              <motion.div
                key={`${t.name}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="break-inside-avoid border border-ink/15 p-8"
              >
                <p className="display text-xl font-light leading-snug mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-ink/10">
                  <div className="w-8 h-8 rounded-full bg-burgundy/10 flex items-center justify-center shrink-0">
                    <span className="eyebrow text-xs text-burgundy">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-ink/50">
                      {t.title} ✦ {t.org}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="body-prose text-ink/50 text-center py-20">
              No testimonials in this category yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
