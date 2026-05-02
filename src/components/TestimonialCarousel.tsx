"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "SafeHers did not just teach us what to do — it taught us why. That deeper understanding is what changes behaviour for life.",
    name: "Adwoa Mensah",
    title: "Student",
    org: "University of Ghana, Legon",
    type: "student",
  },
  {
    quote:
      "Within one semester of running the SafeHers programme, our student welfare office saw a measurable increase in safety incident reporting. Women were speaking up because they knew their rights.",
    name: "Dr. Kofi Asante",
    title: "Dean of Student Affairs",
    org: "KNUST",
    type: "university",
  },
  {
    quote:
      "We brought SafeHers in for our female operations staff in Lagos and Accra. The feedback was unanimous — this is the most useful corporate training they had ever attended.",
    name: "Ngozi Osei",
    title: "Head of People",
    org: "Continental Finance Group",
    type: "corporate",
  },
  {
    quote:
      "The online safety module should be required curriculum at every secondary school on the continent. The sextortion protocol alone could save lives.",
    name: "Amina Diallo",
    title: "Programme Officer",
    org: "ECOWAS Gender Development Centre",
    type: "government",
  },
  {
    quote:
      "I trained as an Educator and now deliver this curriculum at my church every quarter. The transformation in the women I teach is visible from week to week.",
    name: "Sister Grace Boateng",
    title: "Community Educator",
    org: "Accra",
    type: "student",
  },
  {
    quote:
      "As a funder, what impressed us most was the rigour of the impact framework. SafeHers can tell us exactly what change they are creating and how they know.",
    name: "Jennifer Kiplangat",
    title: "Programme Director",
    org: "East Africa Women's Fund",
    type: "government",
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-rotate every 6s
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[index];

  return (
    <section className="py-24 bg-ink text-cream overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <p className="eyebrow text-rose mb-12">Voices from the community</p>

        <div className="relative min-h-[260px] flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
              className="max-w-4xl"
            >
              <p className="display text-3xl lg:text-5xl font-light leading-tight mb-10">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center shrink-0">
                  <span className="eyebrow text-xs">{t.name[0]}</span>
                </div>
                <div>
                  <p className="font-medium text-sm">{t.name}</p>
                  <p className="text-xs opacity-60">
                    {t.title} ✦ {t.org}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mt-12">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-12 h-12 border border-cream/20 flex items-center justify-center hover:bg-cream/10 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={`Testimonial ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === index ? "bg-rose w-6" : "bg-cream/20"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-12 h-12 border border-cream/20 flex items-center justify-center hover:bg-cream/10 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
