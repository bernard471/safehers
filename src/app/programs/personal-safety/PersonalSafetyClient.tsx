"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Eye, Compass, Footprints, Shield, type LucideIcon } from "lucide-react";
import RegistrationForm from "@/components/RegistrationForm";

interface CurriculumItem { num: string; icon: LucideIcon; title: string; body: string; }
interface FAQ { q: string; a: string; }
interface Audience { title: string; body: string; }

const curriculum: CurriculumItem[] = [
  { num: "01", icon: Eye, title: "Situational Awareness", body: "Look up, look down, look around. Train your attention to read environments before they read you. Learn what your eyes should be doing in any space — public, private, familiar, unfamiliar." },
  { num: "02", icon: Compass, title: "Instinct & Intuition", body: "Your sixth sense is data. We will teach you how to listen to it, trust it, and act on it without second-guessing — and when something feels off, how to leave." },
  { num: "03", icon: Footprints, title: "Secure Movement", body: "How to walk, where to walk, when to walk. Visibility, route planning, headphone protocols, and the practical mechanics of moving through public space safely." },
  { num: "04", icon: Shield, title: "Personal Protection", body: "Personal alarms, situational deterrents, and the principles behind effective protection. Evidence-based protocols, not theatrics. What actually works, what does not, and why." },
];

const audiences: Audience[] = [
  { title: "University students", body: "Newly independent, navigating campuses, hostels, late nights, and unfamiliar cities for the first time." },
  { title: "Working professionals", body: "Daily commutes, business travel, evening meetings, and the realities of moving through cities for work." },
  { title: "Mothers and caregivers", body: "Protecting yourself while protecting others. Modeling safety habits for the daughters and sisters watching you." },
];

const faqs: FAQ[] = [
  { q: "When does the workshop run?", a: "We are confirming launch dates for the founding cohort. Joining the waitlist puts you first in line for date announcements." },
  { q: "What does it cost?", a: "The founding cohort is offered free of charge. Future cohorts will be priced affordably, with scholarships available for students." },
  { q: "Do I need any prior experience?", a: "No. The curriculum is built for women who know they need this knowledge but have never been formally taught." },
  { q: "What is the time commitment?", a: "Half a day for in-person Accra workshops. Three two-hour sessions across two weeks for virtual cohorts." },
  { q: "Can my organization book a private cohort?", a: "Yes. Universities, NGOs, and corporations can book private cohorts of 30 or more participants. Reach out via the contact page." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-24 lg:py-32 ${className}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">{children}</div>
    </section>
  );
}

function FaqItem({ q, a }: FAQ) {
  return (
    <details className="border-t border-ink/15 group">
      <summary className="flex items-center justify-between py-5 cursor-pointer list-none gap-4">
        <span className="display text-xl font-light">{q}</span>
        <span className="text-ink/40 group-open:rotate-180 transition-transform duration-300 shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </summary>
      <p className="pb-6 body-prose text-ink/70 max-w-2xl">{a}</p>
    </details>
  );
}

export default function PersonalSafetyClient() {
  return (
    <>
      {/* ── SECTION 1: HERO ────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 lg:pt-52 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-8 flex items-center gap-3 text-[#5C1F2E] text-[10px] sm:text-xs">
            <span className="inline-block w-6 sm:w-8 h-px bg-[#5C1F2E] shrink-0" />
            <span className="leading-relaxed">PERSONAL SAFETY TRAINING<span className="hidden sm:inline"> / FOUNDATION MODULE</span></span>
          </p>

          <h1
            className="display font-light max-w-[900px]"
            style={{ fontSize: "clamp(3.5rem, 8vw, 8rem)", lineHeight: 0.95, letterSpacing: "-0.02em" }}
          >
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="block"
            >
              The bedrock
            </motion.span>
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="block display-italic text-[#5C1F2E]"
            >
              of every
            </motion.span>
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="block"
            >
              woman&rsquo;s safety.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="body-prose mt-10 max-w-[600px] text-ink/75"
          >
            Workshops and curriculum covering situational awareness, instinct, secure movement, and personal protection. Built on twenty years of expertise. Designed for the women who already know they can save themselves — and want the tools to do it well.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <a
              href="#register"
              className="group inline-flex items-center justify-center sm:justify-start gap-3 bg-ink text-cream px-7 py-4 hover:bg-[#5C1F2E] transition-colors"
            >
              <span className="eyebrow">JOIN THE WAITLIST</span>
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
            </a>
            <a
              href="#curriculum"
              className="group inline-flex items-center justify-center sm:justify-start gap-3 border border-ink/30 px-7 py-4 hover:border-ink transition-colors"
            >
              <span className="eyebrow">SEE WHAT YOU&rsquo;LL LEARN</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: CURRICULUM ─────────────────────────────────────────── */}
      <Section id="curriculum" className="bg-bone">
        <p className="eyebrow mb-4 opacity-60">Curriculum</p>
        <h2 className="display text-5xl lg:text-6xl mb-16 font-light">
          Four areas.<br />
          <span className="display-italic text-[#5C1F2E]">One foundation.</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-px bg-ink/10">
          {curriculum.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-bone p-8 sm:p-10 lg:p-12 group hover:bg-cream transition-colors"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="display-italic text-[#5C1F2E] text-5xl font-light leading-none">
                    {item.num}
                  </span>
                  <Icon size={28} strokeWidth={1.2} className="text-ink/40 group-hover:text-ink transition-colors" />
                </div>
                <h3 className="display text-2xl lg:text-3xl mb-4 font-light">{item.title}</h3>
                <p className="body-prose text-ink/70">{item.body}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* ── SECTION 3: WHO THIS IS FOR ────────────────────────────────────── */}
      <Section>
        <p className="eyebrow mb-4 opacity-60">Designed for</p>
        <h2 className="display text-5xl lg:text-6xl mb-16 font-light">
          Women at every stage.
        </h2>
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {audiences.map((a, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="display-italic text-[#5C1F2E] text-5xl font-light mb-4">0{i + 1}</p>
              <h3 className="display text-2xl mb-4 font-light">{a.title}</h3>
              <p className="body-prose text-ink/70">{a.body}</p>
            </motion.div>
          ))}
        </div>
        <p className="body-prose mt-16 text-ink/50 border-t border-ink/15 pt-10">
          Customized for age, profession, and context. No two cohorts run identically.
        </p>
      </Section>

      {/* ── SECTION 4: FORMAT OPTIONS ─────────────────────────────────────── */}
      <Section className="bg-bone">
        <p className="eyebrow mb-4 opacity-60">How it runs</p>
        <h2 className="display text-5xl lg:text-6xl mb-16 font-light">
          In-person, virtual,<br />
          <span className="display-italic text-[#5C1F2E]">or hybrid.</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-px bg-ink/10">
          {[
            {
              label: "Accra — In-person",
              items: [
                "Half-day workshop",
                "Intimate cohorts of 12–20 women",
                "Hands-on exercises",
                "Live Q&A with Zarinah",
                "Certificate of completion",
                "Held at vetted venues in East Legon",
              ],
            },
            {
              label: "Virtual — Zoom",
              items: [
                "Three-session cohort across two weeks",
                "Live with Zarinah",
                "Breakout exercises",
                "Recorded for review",
                "Certificate of completion",
                "Open to women anywhere",
              ],
            },
          ].map((col, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-bone p-8 sm:p-10 lg:p-12"
            >
              <p className="eyebrow text-[#5C1F2E] mb-6">{col.label}</p>
              <ul className="space-y-3">
                {col.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 body-prose text-ink/75">
                    <span className="text-[#5C1F2E] mt-1 shrink-0">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <p className="body-prose mt-6 text-ink/50 text-sm">
          Hybrid options available for institutional cohorts of 30 or more women.
        </p>
      </Section>

      {/* ── SECTION 5: THE INSTRUCTOR ─────────────────────────────────────── */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5">
            <h2
              className="display font-light"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 0.95, letterSpacing: "-0.02em" }}
            >
              Taught by<br />
              <span className="display-italic text-[#5C1F2E]">Zarinah Traci.</span>
            </h2>
          </div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="lg:col-span-6 lg:col-start-7"
          >
            <p className="body-prose text-ink/75 mb-6">
              Author of <em>30 Ways Pretty Girls Can Save Themselves</em>. Twenty-plus years as a senior leader in national security, privacy, law, and international trade. HBCU, law, and Harvard Kennedy School graduate, with certifications in counterterrorism, use of force, and European Union law. Has been teaching this material to teen girls and women since 2015.
            </p>
            <p className="eyebrow text-ink/50">Co-Founder · SafeHers</p>
          </motion.div>
        </div>
      </Section>

      {/* ── SECTION 6: EVIDENCE-BASED ─────────────────────────────────────── */}
      <Section className="bg-bone">
        <div className="max-w-[760px]">
          <p className="eyebrow mb-4 opacity-60">Our approach</p>
          <h2 className="display text-5xl lg:text-6xl mb-8 font-light">
            Real protocols.<br />
            <span className="display-italic text-[#5C1F2E]">Real practice.</span>
          </h2>
          <p className="body-prose text-ink/75">
            Personal safety training is full of bad advice — outdated assumptions, performative defense moves, and fear-based marketing. SafeHers teaches what actually works: protocols rooted in two decades of national security work, adapted for the realities African women face. We do not sell fear. We build capability.
          </p>
        </div>
      </Section>

      {/* ── SECTION 7: REGISTRATION FORM ──────────────────────────────────── */}
      <Section id="register">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4 text-[#5C1F2E]">Reserve your seat</p>
            <h2
              className="display font-light mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 0.95 }}
            >
              Join the founding cohort.
            </h2>
            <p className="body-prose text-ink/70">
              We are confirming dates for our launch cohort now. Add your name to the waitlist and you will be the first to know when registration opens.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <RegistrationForm />
          </div>
        </div>
      </Section>

      {/* ── SECTION 8: FAQ ─────────────────────────────────────────────────── */}
      <Section className="bg-bone">
        <p className="eyebrow mb-4 opacity-60">Common questions</p>
        <h2 className="display text-5xl lg:text-6xl mb-12 font-light">
          Before you sign up.
        </h2>
        <div className="max-w-3xl">
          {faqs.map((faq, i) => (
            <FaqItem key={i} {...faq} />
          ))}
          <div className="border-t border-ink/15" />
        </div>
      </Section>

      {/* ── SECTION 9: FINAL CTA ───────────────────────────────────────────── */}
      <section className="bg-[#5C1F2E] text-cream py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2
            className="display font-light mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", lineHeight: 0.95 }}
          >
            The work begins<br />
            <span className="display-italic" style={{ color: "var(--rose)" }}>with one decision.</span>
          </h2>
          <p className="body-prose opacity-80 max-w-md mx-auto mb-10">
            Add your name to the list. Take the first step in choosing yourself.
          </p>
          <a
            href="#register"
            className="group inline-flex items-center gap-3 bg-cream text-ink px-8 py-4 hover:bg-[var(--rose)] transition-colors"
          >
            <span className="eyebrow">JOIN THE WAITLIST</span>
            <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
          </a>
        </div>
      </section>
    </>
  );
}
