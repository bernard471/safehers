"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Home,
  Wifi,
  Award,
  BookOpen,
  Smartphone,
  Building2,
  Users,
  Banknote,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Personal Safety Training",
    tag: "Foundation",
    desc: "Workshops and curriculum covering situational awareness, instinct, secure movement, and personal protection. The bedrock module that anchors every SafeHers program.",
    bullets: [
      "Live workshops, virtual cohorts, or hybrid",
      "Customized for age, profession, or context",
      "Evidence-based protocols, not theatrics",
    ],
  },
  {
    icon: Home,
    title: "Home Safety Assessment",
    tag: "For households",
    desc: "Practical home security education tailored to African residential contexts — gated communities, hostels, family compounds, rented apartments — addressing access points, routines, and emergency planning.",
    bullets: [
      "On-site or guided self-assessment",
      "Smart-lock and camera advisory",
      "Family safety protocols",
    ],
  },
  {
    icon: Wifi,
    title: "Online Safety & Cybersecurity",
    tag: "Digital protection",
    desc: "Built specifically for African digital life. Mobile money fraud, sextortion, romance scams, account compromise, and social media safety — taught by working cybersecurity professionals.",
    bullets: [
      "Mobile money fraud prevention",
      "Account hardening & 2FA setup",
      "Sextortion & blackmail response",
      "Social engineering awareness",
    ],
  },
  {
    icon: Award,
    title: "Certified Safety Educator",
    tag: "Most popular",
    desc: "Become a credentialed educator authorized to deliver the SafeHers curriculum in your school, workplace, or community. Three tiers — Educator, Institutional License, and Master Trainer.",
    bullets: [
      "Tier 1: Individual certification",
      "Tier 2: Institutional license",
      "Tier 3: Master trainer authority",
      "Two-year credential, renewable",
    ],
  },
  {
    icon: Banknote,
    title: "Financial Safety & Wealth",
    tag: "New pillar",
    desc: "Because financial independence is a safety strategy. From mobile money literacy to investing, business registration, and wealth building — grounded in the African economic context.",
    bullets: [
      "Money foundations & budgeting",
      "Saving, banking & mobile money safety",
      "Investing & entrepreneurship basics",
      "Wealth building & insurance literacy",
    ],
  },
  {
    icon: BookOpen,
    title: "Books & Curriculum",
    tag: "Reference materials",
    desc: "The original 30 Ways Pretty Girls Can Save Themselves alongside the upcoming African Edition, workbooks for student use, and specialized editions for hospitality, corporate, and secondary school audiences.",
    bullets: [
      "Original edition (available now)",
      "African Edition (in development)",
      "Workbooks & study guides",
    ],
  },
  {
    icon: Smartphone,
    title: "SafeHers App",
    tag: "Coming soon",
    desc: "A mobile companion built in Ghana, hardened by cybersecurity experts. Location sharing, trusted-circle alerts, emergency check-ins, and the full SafeHers framework in your pocket.",
    bullets: [
      "Free tier with core safety tools",
      "Premium subscription with advanced features",
      "Offline functionality for low-connectivity areas",
    ],
  },
  {
    icon: Building2,
    title: "Institutional Programs",
    tag: "Universities & corporations",
    desc: "Campus-wide and enterprise-wide safety programs. From orientation curricula at universities to staff training at hotel chains, multinational corporations, and government ministries.",
    bullets: [
      "Universities & tertiary institutions",
      "Hotels & hospitality groups",
      "Corporate wellness programs",
      "Government ministry rollouts",
    ],
  },
  {
    icon: Users,
    title: "Speaking & Consulting",
    tag: "Strategic engagements",
    desc: "Keynote talks, advisory engagements, expert testimony, and curriculum design consulting. Drawing on twenty years of senior leadership in national security, privacy, law, and international trade.",
    bullets: [
      "Keynote & panel appearances",
      "Curriculum design advisory",
      "Policy & advocacy support",
    ],
  },
];

export default function Services() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-20 lg:pt-48">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-ink" />
            Our programs
          </p>
          <h1 className="display text-[clamp(3rem,8vw,8rem)] font-light max-w-[1100px]">
            Practical.<br />
            <span className="display-italic text-burgundy">Powerful.</span>
            <br />
            Local.
          </h1>
          <p className="body-prose mt-12 max-w-2xl">
            Nine programs across four pillars, designed to meet women and
            girls where they are — whether in a university lecture hall in
            Accra, a hotel staff training in Lagos, or on a phone in a village
            with intermittent service. We meet the moment.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-px bg-ink/15 border-y border-ink/15">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
                  className="bg-cream p-10 lg:p-14 group relative"
                >
                  <div className="flex items-start justify-between mb-8">
                    <Icon size={32} strokeWidth={1.2} className="text-burgundy" />
                    <span className="eyebrow opacity-60">{s.tag}</span>
                  </div>
                  <h2 className="display text-3xl lg:text-4xl mb-4">{s.title}</h2>
                  <p className="body-prose opacity-80 mb-6">{s.desc}</p>
                  <ul className="space-y-2 border-t border-ink/15 pt-6">
                    {s.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="text-sm flex items-start gap-3"
                      >
                        <span className="text-burgundy mt-1.5">✦</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-32 bg-bone">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-6">How we engage</p>
              <h2 className="display text-5xl lg:text-7xl">
                A clear<br />
                <span className="display-italic text-terracotta">path</span><br />
                to partnership.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 lg:pt-8">
              <p className="body-prose">
                Whether you are a university registrar, a corporate HR
                director, an NGO program lead, or a government ministry, the
                first conversation is the same. We listen, we learn, we
                propose. No two engagements are identical because no two
                contexts are.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/15">
            {[
              {
                step: "01",
                title: "Discovery",
                desc: "We learn your context, your audience, your constraints. No proposal until we understand.",
              },
              {
                step: "02",
                title: "Proposal",
                desc: "A custom program with clear scope, deliverables, timeline, and pricing. No surprises.",
              },
              {
                step: "03",
                title: "Delivery",
                desc: "We run the program with your team or train your educators to lead it themselves.",
              },
              {
                step: "04",
                title: "Continuity",
                desc: "Ongoing support, refresher training, and certification renewal. Safety is not one-and-done.",
              },
            ].map((p, i) => (
              <div key={i} className="bg-bone p-8 lg:p-10">
                <p className="num-tag text-5xl text-burgundy mb-6">{p.step}</p>
                <h3 className="display text-2xl mb-3">{p.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 text-center">
          <p className="eyebrow mb-6">Ready when you are</p>
          <h2 className="display text-5xl lg:text-7xl mb-8">
            Tell us what you<br />
            <span className="display-italic text-burgundy">need to build.</span>
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-ink text-cream px-8 py-5 hover:bg-burgundy transition-colors group"
          >
            <span className="eyebrow">Begin a conversation</span>
            <ArrowUpRight
              size={18}
              className="group-hover:rotate-45 transition-transform"
            />
          </Link>
        </div>
      </section>
    </>
  );
}
