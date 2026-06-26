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
  GraduationCap,
  MessageSquare,
  Globe,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

const programmes = [
  {
    icon: Shield,
    title: "Personal Safety Training",
    tag: "Foundation",
    desc: "Situational awareness, instinct, secure movement, and personal protection. The bedrock module that anchors every SafeHers programme.",
    bullets: ["Live workshops, virtual cohorts, or hybrid", "Customised for age, profession, or context", "Evidence-based protocols, not theatrics"],
    courseSlug: "personal-safety-foundations",
    courseLive: true,
  },
  {
    icon: Wifi,
    title: "Online Safety & Cybersecurity",
    tag: "Digital protection",
    desc: "Mobile money fraud, sextortion, romance scams, account compromise, and social media safety — taught by working cybersecurity professionals.",
    bullets: ["Mobile money fraud prevention", "Account hardening & 2FA setup", "Sextortion & blackmail response", "Social engineering awareness"],
    courseSlug: "phone-privacy-spy-detection",
    courseLive: true,
  },
  {
    icon: Banknote,
    title: "Financial Safety & Wealth",
    tag: "Financial pillar",
    desc: "Financial independence is a safety strategy. From mobile money literacy to investing, business registration, and wealth building.",
    bullets: ["Money foundations & budgeting", "Saving, banking & mobile money safety", "Investing & entrepreneurship basics"],
    courseSlug: "mobile-money-fraud",
    courseLive: true,
  },
  {
    icon: Home,
    title: "Home Safety Assessment",
    tag: "For households",
    desc: "Practical home security education tailored to African residential contexts — gated communities, hostels, family compounds, and rented apartments.",
    bullets: ["On-site or guided self-assessment", "Smart-lock and camera advisory", "Family safety protocols"],
    courseSlug: null,
    courseLive: false,
  },
  {
    icon: Award,
    title: "Certified Safety Educator",
    tag: "Certification",
    desc: "Become a credentialed educator authorised to deliver the SafeHers curriculum. Three tiers — Educator, Institutional Licence, and Master Trainer.",
    bullets: ["Tier 1: Individual certification", "Tier 2: Institutional licence", "Tier 3: Master trainer authority", "Scholarship and donor-funded seats available"],
    courseSlug: null,
    courseLive: false,
  },
  {
    icon: BookOpen,
    title: "Books & Curriculum",
    tag: "Reference materials",
    desc: "The original 30 Ways Pretty Girls Can Save Themselves alongside the upcoming African Edition, workbooks, and specialised editions.",
    bullets: ["Original edition (available now)", "African Edition (in development)", "Workbooks & study guides"],
    courseSlug: null,
    courseLive: false,
  },
  {
    icon: Smartphone,
    title: "SafeHers App",
    tag: "Coming soon",
    desc: "A mobile companion built in Ghana. Location sharing, trusted-circle alerts, emergency check-ins, and the full SafeHers framework in your pocket.",
    bullets: ["Free tier with core safety tools", "Offline functionality for low-connectivity areas"],
    courseSlug: null,
    courseLive: false,
  },
  {
    icon: Building2,
    title: "Institutional Programmes",
    tag: "Universities & corporations",
    desc: "Campus-wide and enterprise-wide safety programmes for universities, hotel chains, corporations, and government ministries.",
    bullets: ["Universities & tertiary institutions", "Hotels & hospitality groups", "Corporate wellness programmes", "Government ministry rollouts"],
    courseSlug: null,
    courseLive: false,
  },
  {
    icon: Users,
    title: "Speaking & Consulting",
    tag: "Strategic engagements",
    desc: "Keynote talks, advisory engagements, expert testimony, and curriculum design consulting.",
    bullets: ["Keynote & panel appearances", "Curriculum design advisory", "Policy & advocacy support"],
    courseSlug: null,
    courseLive: false,
  },
];

const audiences = [
  { icon: Users, title: "Students & Young Women", desc: "University students, secondary school girls, and young women navigating independence for the first time." },
  { icon: Building2, title: "Institutions & Employers", desc: "Universities, hotels, corporations, and government bodies looking to protect their female staff and students." },
  { icon: Globe, title: "NGOs & Development Partners", desc: "Organisations integrating safety education into existing programmes across Africa." },
  { icon: GraduationCap, title: "Educators & Trainers", desc: "Teachers, facilitators, and community leaders who want to deliver safety training in their own contexts." },
];

export default function Services() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-40 pb-24 lg:pt-48 bg-ink text-cream overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-6 items-center max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="lg:col-span-7">
          <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
            <span className="inline-block w-8 h-px bg-gold" />
            SafeHers Programmes
          </p>
          <h1 className="display text-[clamp(3rem,8vw,8rem)] font-light max-w-[1100px]">
            Practical.<br />
            <span className="display-italic text-gold">Powerful.</span>
            Local.
          </h1>
          <p className="body-prose mt-12 max-w-2xl opacity-70">
            Nine programmes across four pillars, designed to meet women and
            girls where they are — whether in a university lecture hall in
            Accra, a hotel staff training in Lagos, or on a phone in a village
            with intermittent service. Powered by SafeHer Foundation.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/academy/courses" className="inline-flex items-center gap-3 bg-gold text-ink px-8 py-5 hover:bg-cream transition-colors group">
              <span className="eyebrow">Start Learning Free</span>
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-3 border border-cream/30 px-8 py-5 hover:bg-cream/10 transition-colors group">
              <span className="eyebrow">Partner With Us</span>
              <ArrowUpRight size={16} />
            </Link>
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

      {/* IMPACT STATS */}
      <section className="py-12 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "6", label: "Free online courses" },
              { value: "4", label: "Safety pillars covered" },
              { value: "20+", label: "Years of expertise" },
              { value: "Free", label: "For all women & girls" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center py-4"
              >
                <p className="display text-4xl lg:text-5xl text-gold mb-2">{s.value}</p>
                <p className="eyebrow text-xs opacity-50">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMY BANNER */}
      <section className="bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow text-gold mb-3">SafeHer Academy</p>
              <h2 className="display text-3xl lg:text-4xl mb-4">
                Three courses are live.<br />
                <span className="display-italic text-gold">Start learning today.</span>
              </h2>
              <p className="body-prose opacity-60 max-w-lg">
                Enroll in free, self-paced courses. Complete lessons, pass quizzes,
                and earn a verifiable SafeHer Foundation certificate — all online.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-3">
              <Link href="/academy/courses" className="bg-gold text-ink px-7 py-4 inline-flex items-center justify-between group hover:bg-cream transition-colors">
                <span className="eyebrow">Browse Courses</span>
                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
              </Link>
              <Link href="/portal/register" className="border border-cream/20 px-7 py-4 inline-flex items-center justify-between group hover:bg-cream/5 transition-colors">
                <span className="eyebrow">Create Free Account</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="gold-rule" />

      {/* PROGRAMMES GRID */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="eyebrow mb-4 text-gold">All programmes</p>
            <h2 className="display text-4xl lg:text-6xl">
              Nine programmes.<br />
              <span className="display-italic text-burgundy">Four pillars.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programmes.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                  className="border border-ink/10 bg-cream group hover:border-gold/40 transition-all duration-300 flex flex-col"
                >
                  <div className="p-8 flex-1">
                    <div className="flex items-start justify-between mb-6">
                      <Icon size={28} strokeWidth={1.2} className="text-gold" />
                      <div className="flex items-center gap-2">
                        {s.courseLive && (
                          <span className="eyebrow text-[9px] bg-gold/15 text-gold px-2 py-0.5">Live</span>
                        )}
                        <span className="eyebrow text-[10px] opacity-40">{s.tag}</span>
                      </div>
                    </div>
                    <h3 className="display text-2xl mb-3 group-hover:text-burgundy transition-colors">{s.title}</h3>
                    <p className="text-sm opacity-70 mb-5 leading-relaxed">{s.desc}</p>
                    <ul className="space-y-1.5">
                      {s.bullets.map((b, j) => (
                        <li key={j} className="text-xs flex items-start gap-2 opacity-60">
                          <CheckCircle size={12} className="text-gold mt-0.5 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="px-8 pb-8 pt-4 border-t border-ink/5">
                    {s.courseLive && s.courseSlug ? (
                      <Link href={`/academy/courses/${s.courseSlug}`} className="eyebrow text-xs text-gold flex items-center gap-2 group-hover:gap-3 transition-all">
                        Enroll free <ArrowUpRight size={12} />
                      </Link>
                    ) : (
                      <Link href="/contact" className="eyebrow text-xs opacity-40 flex items-center gap-2 group-hover:opacity-70 transition-opacity">
                        Enquire <ArrowUpRight size={12} />
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="py-24 bg-bone">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-4 text-gold">Who this is for</p>
          <h2 className="display text-4xl lg:text-5xl mb-16">
            Built for every woman<br />
            <span className="display-italic text-burgundy">who needs it.</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-ink/10 bg-cream p-8"
                >
                  <Icon size={24} strokeWidth={1.2} className="text-gold mb-4" />
                  <h3 className="display text-xl mb-3">{a.title}</h3>
                  <p className="text-sm opacity-60 leading-relaxed">{a.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-6 text-gold">How we engage</p>
              <h2 className="display text-5xl lg:text-6xl">
                A clear<br />
                <span className="display-italic text-burgundy">path</span><br />
                to partnership.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 lg:pt-8">
              <p className="body-prose">
                Whether you are a university registrar, a corporate HR
                director, an NGO programme lead, or a government ministry, the
                first conversation is the same. We listen, we learn, we
                propose. No two engagements are identical.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10">
            {[
              { step: "01", title: "Discovery", desc: "We learn your context, audience, and constraints." },
              { step: "02", title: "Proposal", desc: "A custom programme with clear scope, deliverables, and timeline." },
              { step: "03", title: "Delivery", desc: "We deliver or train your educators to lead it themselves." },
              { step: "04", title: "Continuity", desc: "Ongoing support, refresher training, and certification renewal." },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-cream p-8 lg:p-10"
              >
                <p className="num-tag text-5xl text-gold mb-6">{p.step}</p>
                <h3 className="display text-2xl mb-3">{p.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONSULTATION CTA */}
      <section className="py-20 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <MessageSquare size={32} strokeWidth={1.2} className="text-gold mb-6" />
              <h2 className="display text-4xl lg:text-5xl mb-4">
                Need personal<br />
                <span className="display-italic text-gold">guidance?</span>
              </h2>
              <p className="body-prose opacity-60 max-w-lg">
                Book a confidential consultation with a SafeHer Foundation
                specialist. Online safety, sextortion response, financial fraud,
                or personal safety planning — we are here to help.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/consultation/book" className="bg-gold text-ink px-7 py-5 inline-flex items-center justify-between group hover:bg-cream transition-colors">
                <span className="eyebrow">Book a Consultation</span>
                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
              </Link>
              <Link href="/consultation" className="border border-cream/20 px-7 py-5 inline-flex items-center justify-between group hover:bg-cream/5 transition-colors">
                <span className="eyebrow">Learn More</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 text-center">
          <p className="eyebrow mb-6 text-gold">Ready when you are</p>
          <h2 className="display text-5xl lg:text-6xl mb-8">
            Tell us what you<br />
            <span className="display-italic text-burgundy">need to build.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/academy/courses" className="inline-flex items-center gap-3 bg-ink text-cream px-8 py-5 hover:bg-burgundy transition-colors group">
              <span className="eyebrow">Start Learning Free</span>
              <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-3 border border-ink px-8 py-5 hover:bg-ink hover:text-cream transition-colors group">
              <span className="eyebrow">Begin a Conversation</span>
              <ArrowUpRight size={18} />
            </Link>
            <Link href="/program-support" className="inline-flex items-center gap-3 border border-ink/30 px-8 py-5 hover:border-ink transition-colors group">
              <span className="eyebrow">Training Packages</span>
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
