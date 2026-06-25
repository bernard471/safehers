"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Shield,
  Wifi,
  Home as HomeIcon,
  Banknote,
  Users,
  BookOpen,
  Globe,
  Heart,
  Award,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import PartnerLogos from "@/components/PartnerLogos";
import TestimonialCarousel from "@/components/TestimonialCarousel";

interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

interface CaseStudyMeta {
  slug: string;
  title: string;
  client: string;
  participants: number;
  outcome: string;
  country: string;
}

interface HomeClientProps {
  recentPosts: PostMeta[];
  caseStudies: CaseStudyMeta[];
}

const programs = [
  {
    num: "01",
    icon: Shield,
    title: "Personal Safety",
    desc: "Awareness, instinct, and protocol. The foundation every woman deserves to know before she steps outside.",
    href: "/services",
  },
  {
    num: "02",
    icon: HomeIcon,
    title: "Home Safety",
    desc: "Doors, locks, neighbors, routines. Practical protection for the place you should feel safest.",
    href: "/services",
  },
  {
    num: "03",
    icon: Wifi,
    title: "Online Safety",
    desc: "Mobile money fraud, sextortion, romance scams, account security. Built for African digital life.",
    href: "/services",
  },
  {
    num: "04",
    icon: Banknote,
    title: "Financial Safety & Wealth",
    desc: "Budgeting, banking, investing, and entrepreneurship. Because financial independence is a safety strategy.",
    href: "/financial-literacy",
  },
];

const trustPillars = [
  {
    icon: Shield,
    title: "Safeguarding",
    desc: "Rigorous safeguarding policies protect every participant in our programs.",
    href: "/safeguarding",
  },
  {
    icon: BookOpen,
    title: "Financial Transparency",
    desc: "Annual reports and audited financials published for full donor confidence.",
    href: "/reports",
  },
  {
    icon: Users,
    title: "Governance",
    desc: "Independent board and advisory council providing oversight and accountability.",
    href: "/governance",
  },
  {
    icon: Heart,
    title: "Monitoring & Evaluation",
    desc: "Every program measured against clear outcomes, with results published openly.",
    href: "/impact",
  },
];

export default function HomeClient({ recentPosts, caseStudies }: HomeClientProps) {
  const [liveStats, setLiveStats] = useState({ womenReached: 0, certificatesIssued: 0, coursesAvailable: 6, countriesActive: 1 });

  useEffect(() => {
    fetch("/api/public/stats").then(r => r.json()).then(d => {
      if (d.stats) setLiveStats(d.stats);
    }).catch(() => {});
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative w-full text-cream overflow-hidden">
        {/* Full-width background image */}
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="/images/safeherhero.png"
            alt="SafeHer Foundation — Women equipped, empowered, protected"
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>

        {/* Left gradient overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-transparent pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pt-36 sm:pt-40 lg:pt-48 pb-20 sm:pb-28 lg:pb-36 min-h-[90vh] flex items-center">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3 mb-8"
            >
              <motion.span
                className="inline-block h-px bg-gold"
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
              <span className="eyebrow text-gold tracking-widest text-xs">
                GHANA-US WOMEN&apos;S SAFETY FOUNDATION
              </span>
            </motion.div>

            {/* Headline */}
            <h1
              className="display font-light"
              style={{ fontSize: "clamp(3.2rem, 7vw, 6rem)", lineHeight: 0.93, letterSpacing: "-0.02em" }}
            >
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="block text-cream"
              >
                SafeHer
              </motion.span>
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.65 }}
                className="block display-italic text-gold"
              >
                Foundation
              </motion.span>
            </h1>

            {/* Slogan */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="display-italic text-2xl sm:text-3xl lg:text-4xl text-rose mt-6 mb-6"
            >
              Pretty Girl, Save Yourself.
            </motion.p>

            {/* Gold divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="w-20 h-px bg-gold mb-6 origin-left"
            />

            {/* Body copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="body-prose max-w-lg text-cream/80 text-lg"
            >
              A Ghana-US women&apos;s safety foundation equipping girls and women
              across Africa with practical physical, digital, and financial safety
              education.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <Link
                href="/partners"
                className="group inline-flex items-center justify-center sm:justify-start gap-3 bg-gold text-ink px-7 py-4 hover:bg-cream transition-colors"
              >
                <span className="eyebrow">PARTNER WITH US</span>
                <ArrowUpRight
                  size={16}
                  className="group-hover:rotate-45 transition-transform duration-300"
                />
              </Link>
              {/* <Link
                href="/donate"
                className="group inline-flex items-center justify-center sm:justify-start gap-3 border border-gold/50 text-gold px-7 py-4 hover:bg-gold/10 transition-colors"
              >
                <span className="eyebrow">SPONSOR A COHORT</span>
                <ArrowUpRight size={16} />
              </Link> */}
              <Link
                href="/services"
                className="group inline-flex items-center justify-center sm:justify-start gap-3 border border-cream/20 text-cream/80 px-7 py-4 hover:bg-cream/5 transition-colors"
              >
                <span className="eyebrow">EXPLORE PROGRAMS</span>
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GOLD DIVIDER */}
      <div className="gold-rule" />

      {/* LIVE IMPACT COUNTER */}
      <section className="bg-ink text-cream py-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <span className="inline-block w-8 h-px bg-gold" />
            <p className="eyebrow text-gold text-xs">Live Impact</p>
            <span className="inline-block w-8 h-px bg-gold" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Users size={24} strokeWidth={1.5} className="text-gold" />, num: liveStats.womenReached || "—", label: "Women & girls reached" },
              { icon: <Award size={24} strokeWidth={1.5} className="text-gold" />, num: liveStats.certificatesIssued || "—", label: "Certificates issued" },
              { icon: <GraduationCap size={24} strokeWidth={1.5} className="text-gold" />, num: liveStats.coursesAvailable, label: "Free courses live" },
              { icon: <Globe size={24} strokeWidth={1.5} className="text-gold" />, num: liveStats.countriesActive, label: "Countries active" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">{s.icon}</div>
                <p className="display text-4xl sm:text-5xl lg:text-6xl text-gold mb-2">{s.num}</p>
                <p className="eyebrow text-[10px] opacity-50">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-ink/10 bg-ink text-cream overflow-hidden py-6">
        <div className="flex marquee-track whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 pr-12 shrink-0">
              <span className="display text-3xl">Personal safety</span>
              <span className="text-gold">✦</span>
              <span className="display-italic text-3xl">Home safety</span>
              <span className="text-gold">✦</span>
              <span className="display text-3xl">Online safety</span>
              <span className="text-gold">✦</span>
              <span className="display-italic text-3xl">Financial safety</span>
              <span className="text-gold">✦</span>
              <span className="display text-3xl">Certification</span>
              <span className="text-gold">✦</span>
              <span className="display-italic text-3xl">Community</span>
              <span className="text-gold">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-6 text-gold">Our Mission</p>
              <p className="display text-5xl lg:text-6xl">
                Equip every<br />
                <span className="display-italic text-burgundy">woman.</span>
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6 lg:pt-8">
              <p className="body-prose mb-6">
                Across Sub-Saharan Africa, more than 110 million young women
                navigate a world where physical, digital, and financial threats
                blur into one another. Existing safety education was not built
                for them — it was translated for them. That is not enough.
              </p>
              <p className="body-prose">
                SafeHer Foundation is what happens when a published curriculum
                forged over two decades meets ground presence, cultural fluency,
                and cybersecurity expertise. We do not adapt. We co-author. We do
                not lecture. We certify, equip, and step back so local
                educators can lead.
              </p>
            </div>
          </div>

          {/* stats */}
          <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 border-t border-ink/15">
            {[
              { v: "30+", l: "Core safety principles" },
              { v: "4", l: "Pillars of protection" },
              { v: "20+", l: "Years of expertise" },
              { v: "∞", l: "Lives we intend to reach" },
            ].map((s, i) => (
              <div
                key={i}
                className={`py-8 lg:py-10 pr-4 ${
                  i % 2 === 0 ? "border-r border-ink/15" : ""
                } ${
                  i < 2 ? "border-b lg:border-b-0" : ""
                } ${
                  i !== 3 ? "lg:border-r" : ""
                } border-ink/15`}
              >
                <p className="display text-5xl sm:text-6xl lg:text-7xl mb-2">{s.v}</p>
                <p className="eyebrow opacity-70">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER AUTHORITY */}
      <section className="py-24 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="eyebrow text-gold mb-6">Leadership</p>
            <h2 className="display text-4xl lg:text-6xl mb-4">
              Co-founded by<br />
              <span className="display-italic text-gold">Zarinah Knows</span>{" "}
              &amp; <span className="display-italic text-gold">DK Cyber</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-cream/10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-ink p-10 lg:p-16"
            >
              <p className="eyebrow text-gold mb-3">Co-Founder</p>
              <h3 className="display text-4xl mb-6">Zarinah Knows</h3>
              <p className="body-prose opacity-80 mb-4">
                Author, women&apos;s safety educator, and security/privacy
                professional with over twenty years of senior leadership in
                national security, privacy, law, and international trade.
              </p>
              <p className="body-prose opacity-60">
                A proud HBCU, law, and Harvard Kennedy School graduate. Author of{" "}
                <span className="display-italic">
                  30 Ways Pretty Girls Can Save Themselves
                </span>
                . The founding voice for personal safety education.
              </p>
              <div className="mt-8 pt-6 border-t border-cream/10 text-sm opacity-50">
                Washington, D.C. &middot; Curriculum &amp; US Operations
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="bg-ink p-10 lg:p-16"
            >
              <p className="eyebrow text-gold mb-3">Co-Founder</p>
              <h3 className="display text-4xl mb-6">DK Cyber</h3>
              <p className="body-prose opacity-80 mb-4">
                Ghanaian cybersecurity professional and digital safety trainer
                with deep expertise in account security, mobile fraud, social
                engineering, and digital safety architecture for African
                contexts.
              </p>
              <p className="body-prose opacity-60">
                Africa operations and technology lead. Brings the ground presence,
                cultural fluency, and continental network that transforms imported
                curriculum into authentic local movement.
              </p>
              <div className="mt-8 pt-6 border-t border-cream/10 text-sm opacity-50">
                Accra, Ghana &middot; Technology &amp; Africa Operations
              </div>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-3 group eyebrow text-gold/80 hover:text-gold transition-colors"
            >
              Read the full story
              <span className="w-8 h-px bg-gold/40 group-hover:w-14 transition-all duration-500" />
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* PROGRAMS GRID */}
      <section className="py-24 bg-bone">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-8">
            <div>
              <p className="eyebrow mb-4 text-gold">What we teach</p>
              <h2 className="display text-5xl lg:text-7xl max-w-2xl">
                Four pillars.<br />
                <span className="display-italic">One promise.</span>
              </h2>
            </div>
            <p className="body-prose max-w-md lg:pt-6">
              Every SafeHers program rests on the same belief: safety is
              learnable, teachable, and shareable. These are the four pillars
              that hold the work together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-ink/15">
            {programs.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-bone p-8 sm:p-10 lg:p-12 group lift relative overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-8">
                    <span className="num-tag text-5xl text-gold">{p.num}</span>
                    <Icon
                      size={28}
                      strokeWidth={1.2}
                      className="text-ink group-hover:text-burgundy transition-colors"
                    />
                  </div>
                  <h3 className="display text-3xl mb-4">{p.title}</h3>
                  <p className="body-prose opacity-80 mb-6">{p.desc}</p>
                  <Link
                    href={p.href}
                    className="eyebrow text-xs flex items-center gap-2 text-burgundy opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Explore <ArrowUpRight size={12} />
                  </Link>
                  <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-gold/0 group-hover:bg-gold/10 transition-all duration-700" />
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 group"
            >
              <span className="eyebrow">View all programs</span>
              <span className="w-12 h-px bg-ink group-hover:w-20 transition-all duration-500" />
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* PARTNER LOGOS */}
      <PartnerLogos />

      {/* SAFEHER ACADEMY SECTION */}
      <section className="py-24 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p className="eyebrow text-gold mb-4">SafeHer Academy</p>
                <h2 className="display text-4xl lg:text-5xl mb-6">
                  Learn to protect yourself.<br />
                  <span className="display-italic text-gold">Free. Online. Certified.</span>
                </h2>
                <p className="body-prose opacity-60 max-w-lg mb-8">
                  Practical safety courses designed for women and girls across Africa.
                  Built by security professionals, delivered online, and every course
                  earns you a verifiable SafeHer Foundation certificate.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/academy/courses" className="bg-gold text-ink px-7 py-4 inline-flex items-center gap-3 group hover:bg-cream transition-colors">
                    <span className="eyebrow">Browse Courses</span>
                    <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                  </Link>
                  <Link href="/portal/register" className="border border-cream/20 px-7 py-4 inline-flex items-center gap-3 group hover:bg-cream/5 transition-colors">
                    <span className="eyebrow">Create Free Account</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: BookOpen, title: "Personal Safety", desc: "Situational awareness, safety circles, and daily protocols" },
                { icon: Wifi, title: "Online Safety", desc: "Phone privacy, spy app detection, and sextortion response" },
                { icon: Banknote, title: "Financial Safety", desc: "Mobile money fraud protection and financial security" },
                { icon: Shield, title: "Campus Safety", desc: "Hostel security, campus resources, and emergency plans" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="border border-cream/10 p-6 hover:border-gold/30 transition-colors"
                  >
                    <Icon size={20} strokeWidth={1.2} className="text-gold mb-3" />
                    <h3 className="display text-lg mb-2">{item.title}</h3>
                    <p className="text-xs opacity-40">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* DONOR TRUST SECTION */}
      <section className="py-24 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4 text-gold">Accountability &amp; Trust</p>
            <h2 className="display text-4xl lg:text-6xl font-light">
              Built for<br />
              <span className="display-italic text-burgundy">transparency.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10">
            {trustPillars.map((tp, i) => {
              const Icon = tp.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-cream p-8 group"
                >
                  <Icon size={28} strokeWidth={1.2} className="text-gold mb-4" />
                  <h3 className="display text-xl mb-3">{tp.title}</h3>
                  <p className="text-sm opacity-70 leading-relaxed mb-4">{tp.desc}</p>
                  <Link
                    href={tp.href}
                    className="eyebrow text-xs text-burgundy flex items-center gap-2 group-hover:gap-3 transition-all"
                  >
                    Learn more <ArrowUpRight size={12} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* JOURNAL PREVIEW */}
      {recentPosts.length > 0 && (
        <section className="py-24 bg-bone">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex items-end justify-between mb-12 gap-6">
              <div>
                <p className="eyebrow mb-4 flex items-center gap-3">
                  <span className="inline-block w-8 h-px bg-ink" />
                  From the Journal
                </p>
                <h2 className="display text-4xl lg:text-6xl font-light">
                  Knowledge is<br />
                  <span className="display-italic text-burgundy">power.</span>
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden md:inline-flex items-center gap-3 group eyebrow shrink-0"
              >
                All articles
                <span className="w-8 h-px bg-ink group-hover:w-14 transition-all duration-500" />
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {recentPosts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="border-t-2 border-gold pt-6">
                      <p className="eyebrow text-xs opacity-60 mb-3">{post.category}</p>
                      <h3 className="display text-xl lg:text-2xl mb-3 group-hover:text-burgundy transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="body-prose text-sm opacity-70 line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <span className="eyebrow text-xs flex items-center gap-2 text-burgundy">
                        Read more
                        <ArrowUpRight
                          size={12}
                          className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                        />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            <div className="mt-10 md:hidden">
              <Link href="/blog" className="eyebrow link-underline">
                All articles →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIAL CAROUSEL */}
      <section className="py-24 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12 gap-6">
            <div>
              <p className="eyebrow mb-4 flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-ink" />
                What people say
              </p>
              <h2 className="display text-4xl lg:text-6xl font-light">
                Real voices,<br />
                <span className="display-italic text-burgundy">real change.</span>
              </h2>
            </div>
            <Link
              href="/testimonials"
              className="hidden md:inline-flex items-center gap-3 group eyebrow shrink-0"
            >
              All testimonials
              <span className="w-8 h-px bg-ink group-hover:w-14 transition-all duration-500" />
              <ArrowUpRight size={14} />
            </Link>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* CASE STUDIES TEASER */}
      {caseStudies.length > 0 && (
        <section className="py-24 bg-ink text-cream">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex items-end justify-between mb-12 gap-6">
              <div>
                <p className="eyebrow mb-4 text-gold flex items-center gap-3">
                  <span className="inline-block w-8 h-px bg-gold/40" />
                  Impact Stories
                </p>
                <h2 className="display text-4xl lg:text-6xl font-light">
                  Measurable<br />
                  <span className="display-italic text-gold">outcomes.</span>
                </h2>
              </div>
              <Link
                href="/case-studies"
                className="hidden md:inline-flex items-center gap-3 group eyebrow opacity-70 hover:opacity-100 transition-opacity shrink-0"
              >
                All case studies
                <span className="w-8 h-px bg-cream group-hover:w-14 transition-all duration-500" />
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-cream/10">
              {caseStudies.slice(0, 3).map((cs, i) => (
                <motion.div
                  key={cs.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-ink p-8 lg:p-10 group"
                >
                  <p className="eyebrow text-xs opacity-50 mb-6">{cs.country}</p>
                  <p className="display text-4xl lg:text-5xl text-gold mb-2">
                    {cs.participants.toLocaleString()}+
                  </p>
                  <p className="eyebrow text-xs opacity-50 mb-6">participants</p>
                  <h3 className="display text-lg mb-3 leading-snug">{cs.client}</h3>
                  <p className="body-prose text-sm opacity-60 mb-6">{cs.outcome}</p>
                  <Link
                    href={`/case-studies/${cs.slug}`}
                    className="eyebrow text-xs text-gold flex items-center gap-2 group-hover:gap-3 transition-all"
                  >
                    Read case study <ArrowUpRight size={12} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOUNDER QUOTE */}
      <section className="py-32 bg-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-10 text-[20rem] display leading-none text-ink">
            &ldquo;
          </div>
        </div>
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 relative">
          <p className="eyebrow text-gold mb-8">Voice of the co-founder</p>
          <blockquote className="display text-3xl sm:text-4xl lg:text-6xl leading-tight text-ink">
            I have been teaching this material to{" "}
            <span className="display-italic text-burgundy">teen girls</span> and
            women since 2015. We are no longer holding back. We are{" "}
            <span className="display-italic text-burgundy">building.</span>
          </blockquote>
          <div className="mt-12 flex items-center gap-4">
            <div className="w-12 h-px bg-gold" />
            <div>
              <p className="font-medium text-ink">Zarinah Knows</p>
              <p className="text-xs opacity-60">
                Co-Founder &middot; Author &middot; Harvard Kennedy School
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="bg-ink text-cream p-8 sm:p-12 lg:p-20 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center relative overflow-hidden">
            <div className="absolute top-8 right-8 spin-slow opacity-20">
              <span className="display text-6xl text-gold">✦</span>
            </div>
            <div className="lg:col-span-7">
              <p className="eyebrow text-gold mb-6">Ready to begin</p>
              <h2 className="display text-5xl lg:text-7xl mb-6">
                Bring SafeHers<br />
                <span className="display-italic text-gold">to your community.</span>
              </h2>
              <p className="body-prose opacity-80 max-w-xl">
                Universities, governments, NGOs, corporations — if you serve
                women and girls, we have a program built for you. Whether as a
                partner, donor, or institutional sponsor, the conversation
                begins here.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-4">
              <Link
                href="/contact"
                className="bg-gold text-ink px-7 py-5 inline-flex items-center justify-between group hover:bg-cream transition-colors"
              >
                <span className="eyebrow">Start a conversation</span>
                <ArrowUpRight
                  size={18}
                  className="group-hover:rotate-45 transition-transform"
                />
              </Link>
              <Link
                href="/donate"
                className="border border-gold/40 px-7 py-5 inline-flex items-center justify-between group hover:bg-gold/10 transition-colors"
              >
                <span className="eyebrow">Sponsor a cohort</span>
                <ArrowUpRight size={18} />
              </Link>
              <Link
                href="/services"
                className="border border-cream/20 px-7 py-5 inline-flex items-center justify-between group hover:bg-cream/5 transition-colors"
              >
                <span className="eyebrow">See programs</span>
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
