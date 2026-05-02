"use client";

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

const stats = [
  { v: "30+", l: "Core safety principles" },
  { v: "4", l: "Pillars of protection" },
  { v: "20+", l: "Years of expertise" },
  { v: "∞", l: "Lives we intend to reach" },
];

export default function HomeClient({ recentPosts, caseStudies }: HomeClientProps) {
  return (
    <>
      {/* HERO */}
      <section className="relative w-full bg-cream pt-28 lg:pt-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-end">

            {/* LEFT — text */}
            <div className="pb-16 lg:pb-24 lg:pt-8">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-8"
              >
                <span className="inline-block w-8 h-px bg-[#5C1F2E]" />
                <span className="eyebrow text-[#5C1F2E] tracking-widest text-xs">
                  PAN-AFRICAN SAFETY MOVEMENT / EST. 2024
                </span>
              </motion.div>

              {/* Headline */}
              <h1
                className="display font-light"
                style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)", lineHeight: 0.95, letterSpacing: "-0.02em" }}
              >
                <motion.span
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="block text-ink"
                >
                  Pretty girls
                </motion.span>
                <motion.span
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                  className="block display-italic text-[#5C1F2E]"
                >
                  save
                </motion.span>
                <motion.span
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="block text-ink"
                >
                  themselves.
                </motion.span>
              </h1>

              {/* Decorative star */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-[#5C1F2E] text-lg mt-6 mb-4 block"
                aria-hidden="true"
              >
                ✦
              </motion.span>

              {/* Body copy */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.65 }}
                className="body-prose max-w-[480px] text-ink"
              >
                SafeHers is a safety education movement equipping women and girls across Ghana, Africa, and the world with practical knowledge to protect themselves physically, digitally, and emotionally. Built on decades of expertise, rooted in local context, designed to scale.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 mt-8"
              >
                <Link
                  href="/services"
                  className="group inline-flex items-center justify-center sm:justify-start gap-3 bg-ink text-cream px-7 py-4 hover:bg-[#5C1F2E] transition-colors"
                >
                  <span className="eyebrow">EXPLORE PROGRAMS</span>
                  <ArrowUpRight
                    size={16}
                    className="group-hover:rotate-45 transition-transform duration-300"
                  />
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center sm:justify-start gap-3 border border-[#5C1F2E] text-[#5C1F2E] px-7 py-4 hover:bg-[#5C1F2E] hover:text-cream transition-colors"
                >
                  <span className="eyebrow">BECOME A PARTNER</span>
                  <ArrowUpRight size={16} />
                </Link>
              </motion.div>
            </div>

            {/* RIGHT — image, flush to right edge, bottom-anchored */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="relative h-[420px] sm:h-[540px] lg:h-[680px] lg:-mr-12 overflow-hidden"
            >
              <Image
                src="/images/hero.png"
                alt="SafeHers — Pan-African Safety Movement"
                fill
                priority
                className="object-cover object-top"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-t border-ink/15 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 sm:py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0">
            {[
              { icon: <BookOpen size={24} strokeWidth={1.5} className="text-[#5C1F2E]" />, num: "20+", label: "Years of expertise" },
              { icon: <Users size={24} strokeWidth={1.5} className="text-[#5C1F2E]" />, num: "Founding", label: "Cohort launching 2026" },
              { icon: <Globe size={24} strokeWidth={1.5} className="text-[#5C1F2E]" />, num: "2", label: "Continents engaged" },
              { icon: <Shield size={24} strokeWidth={1.5} className="text-[#5C1F2E]" />, num: "3 Pillars", label: "Physical · Digital · Emotional" },
            ].map((s, i, arr) => (
              <div
                key={i}
                className={`flex items-center gap-3 py-3 sm:py-4 sm:px-6 ${i < arr.length - 1 ? "sm:border-r border-[#5C1F2E]/20" : ""}`}
              >
                <div className="shrink-0">{s.icon}</div>
                <div>
                  <p className="display text-2xl sm:text-3xl lg:text-4xl leading-none mb-1">{s.num}</p>
                  <p className="eyebrow text-[9px] sm:text-[10px] opacity-60">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* MARQUEE */}
      <section className="border-y border-ink/15 bg-burgundy text-cream overflow-hidden py-6">
        <div className="flex marquee-track whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 pr-12 shrink-0">
              <span className="display text-3xl">Personal safety</span>
              <span className="text-rose">✦</span>
              <span className="display-italic text-3xl">Home safety</span>
              <span className="text-rose">✦</span>
              <span className="display text-3xl">Online safety</span>
              <span className="text-rose">✦</span>
              <span className="display-italic text-3xl">Financial safety</span>
              <span className="text-rose">✦</span>
              <span className="display text-3xl">Wealth building</span>
              <span className="text-rose">✦</span>
              <span className="display-italic text-3xl">Certification</span>
              <span className="text-rose">✦</span>
              <span className="display text-3xl">Community</span>
              <span className="text-rose">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-6">Our Mission</p>
              <p className="display text-5xl lg:text-6xl">
                Equip every<br />
                <span className="display-italic text-terracotta">woman.</span>
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
                SafeHers is what happens when a published curriculum forged
                over two decades meets ground presence, cultural fluency, and
                cybersecurity expertise. We do not adapt. We co-author. We do
                not lecture. We certify, equip, and step back so local
                educators can lead.
              </p>
            </div>
          </div>

          {/* stats */}
          <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 border-t border-ink/15">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`py-8 lg:py-10 pr-4 ${
                  i % 2 === 0 ? "border-r border-ink/15" : ""
                } ${
                  i < 2 ? "border-b lg:border-b-0" : ""
                } ${
                  i !== stats.length - 1 ? "lg:border-r" : ""
                } border-ink/15`}
              >
                <p className="display text-5xl sm:text-6xl lg:text-7xl mb-2">{s.v}</p>
                <p className="eyebrow opacity-70">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS GRID */}
      <section className="py-24 bg-bone">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-8">
            <div>
              <p className="eyebrow mb-4">What we teach</p>
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
                    <span className="num-tag text-5xl text-burgundy">{p.num}</span>
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
                  <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-rose/0 group-hover:bg-rose/20 transition-all duration-700" />
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

      {/* JOURNAL PREVIEW */}
      {recentPosts.length > 0 && (
        <section className="py-24 bg-cream">
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
                    <div className="border-t-2 border-burgundy pt-6">
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
      <section className="py-24 bg-bone">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12 gap-6">
            <div>
              <p className="eyebrow mb-4 flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-ink" />
                What people say
              </p>
              <h2 className="display text-4xl lg:text-6xl font-light">
                Real voices,<br />
                <span className="display-italic text-terracotta">real change.</span>
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
                <p className="eyebrow mb-4 opacity-60 flex items-center gap-3">
                  <span className="inline-block w-8 h-px bg-cream opacity-40" />
                  Impact in numbers
                </p>
                <h2 className="display text-4xl lg:text-6xl font-light">
                  Proven at<br />
                  <span className="display-italic text-rose">scale.</span>
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
                  <p className="display text-4xl lg:text-5xl text-rose mb-2">
                    {cs.participants.toLocaleString()}+
                  </p>
                  <p className="eyebrow text-xs opacity-50 mb-6">participants</p>
                  <h3 className="display text-lg mb-3 leading-snug">{cs.client}</h3>
                  <p className="body-prose text-sm opacity-60 mb-6">{cs.outcome}</p>
                  <Link
                    href={`/case-studies/${cs.slug}`}
                    className="eyebrow text-xs text-rose flex items-center gap-2 group-hover:gap-3 transition-all"
                  >
                    Read case study <ArrowUpRight size={12} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* QUOTE / TESTIMONIAL */}
      <section className="py-32 bg-ink text-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-10 text-[20rem] display leading-none text-rose">
            "
          </div>
        </div>
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 relative">
          <p className="eyebrow text-rose mb-8">Voice of the co-founder</p>
          <blockquote className="display text-3xl sm:text-4xl lg:text-6xl leading-tight">
            I have been teaching this material to{" "}
            <span className="display-italic text-rose">teen girls</span> and
            women since 2015. We are no longer holding back. We are{" "}
            <span className="display-italic text-rose">building.</span>
          </blockquote>
          <div className="mt-12 flex items-center gap-4">
            <div className="w-12 h-px bg-cream/50" />
            <div>
              <p className="font-medium">Zarinah Traci</p>
              <p className="text-xs opacity-60">
                Co-Founder · Author · Harvard Kennedy School
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="bg-burgundy text-cream p-8 sm:p-12 lg:p-20 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center relative overflow-hidden">
            <div className="absolute top-8 right-8 spin-slow opacity-30">
              <span className="display text-6xl">✦</span>
            </div>
            <div className="lg:col-span-7">
              <p className="eyebrow text-rose mb-6">Ready to begin</p>
              <h2 className="display text-5xl lg:text-7xl mb-6">
                Bring SafeHers<br />
                <span className="display-italic">to your community.</span>
              </h2>
              <p className="body-prose opacity-90 max-w-xl">
                Universities, governments, hotels, NGOs, corporations — if you
                serve women and girls, we have a program built for you.
                Conversations begin here.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-4">
              <Link
                href="/contact"
                className="bg-cream text-ink px-7 py-5 inline-flex items-center justify-between group hover:bg-rose transition-colors"
              >
                <span className="eyebrow">Start a conversation</span>
                <ArrowUpRight
                  size={18}
                  className="group-hover:rotate-45 transition-transform"
                />
              </Link>
              <Link
                href="/services"
                className="border border-cream/40 px-7 py-5 inline-flex items-center justify-between group hover:bg-cream/10 transition-colors"
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
