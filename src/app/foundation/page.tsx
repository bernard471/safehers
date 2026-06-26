"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function FoundationPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-40 pb-24 lg:pt-48 bg-ink text-cream overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-6 items-center max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
              <span className="inline-block w-8 h-px bg-gold" />
              The Foundation
            </p>
            <h1 className="display text-[clamp(3rem,8vw,7rem)] font-light max-w-[1000px] mb-8">
              SafeHer Foundation.<br />
              <span className="display-italic text-gold">
                The structure behind the movement.
              </span>
            </h1>
            <p className="body-prose max-w-2xl opacity-70 text-lg">
              SafeHer Foundation is a registered Ghana-US women&apos;s safety
              foundation. SafeHers is the public movement and campaign identity
              it powers. The foundation provides governance, funding, and
              accountability. The movement reaches women and girls.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:flex justify-center lg:col-span-5"
          >
            <Image
              src="/images/safeherlogo.png"
              alt="SafeHer Academy"
              width={280}
              height={280}
              className="w-64 h-64 object-contain opacity-80 drop-shadow-[0_0_60px_rgba(184,150,62,0.2)]"
            />
          </motion.div>
        </div>
      </section>

      <div className="gold-rule" />

      {/* STRUCTURE */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="eyebrow mb-6 text-gold">Official NGO</p>
              <h2 className="display text-4xl lg:text-5xl mb-8">
                SafeHer Foundation
              </h2>
              <div className="space-y-4 body-prose text-ink/75">
                <p>
                  The legal and institutional entity. SafeHer Foundation holds
                  the governance structure, fiduciary responsibility, donor
                  relationships, and accountability frameworks that make the
                  work sustainable.
                </p>
                <p>
                  Used in all official, legal, donor, governance, and
                  institutional contexts. The name that appears on MOUs,
                  grant agreements, and annual reports.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <Link
                  href="/governance"
                  className="border border-ink/15 p-5 text-sm hover:border-ink/40 transition-colors"
                >
                  <p className="eyebrow text-gold mb-2">Governance</p>
                  <p className="opacity-60">Board &amp; advisory council</p>
                </Link>
                <Link
                  href="/reports"
                  className="border border-ink/15 p-5 text-sm hover:border-ink/40 transition-colors"
                >
                  <p className="eyebrow text-gold mb-2">Reports</p>
                  <p className="opacity-60">Annual &amp; financial reports</p>
                </Link>
              </div>
            </div>
            <div>
              <p className="eyebrow mb-6 text-gold">Public Movement</p>
              <h2 className="display text-4xl lg:text-5xl mb-8">
                SafeHers
              </h2>
              <div className="space-y-4 body-prose text-ink/75">
                <p>
                  The public-facing identity. SafeHers is the movement, the
                  community, the campaign name. It appears on programmes,
                  social media, merchandise, youth-facing content, and
                  educator materials.
                </p>
                <p>
                  <span className="display-italic">
                    Pretty Girl, Save Yourself.
                  </span>{" "}
                  This is the voice that reaches women and girls on the ground —
                  in lecture halls, WhatsApp groups, and community centres.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <Link
                  href="/services"
                  className="border border-ink/15 p-5 text-sm hover:border-ink/40 transition-colors"
                >
                  <p className="eyebrow text-gold mb-2">Programmes</p>
                  <p className="opacity-60">What SafeHers teaches</p>
                </Link>
                <Link
                  href="/chapters"
                  className="border border-ink/15 p-5 text-sm hover:border-ink/40 transition-colors"
                >
                  <p className="eyebrow text-gold mb-2">Chapters</p>
                  <p className="opacity-60">Campus &amp; community chapters</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="py-24 bg-bone">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="eyebrow mb-4 text-gold">Mission</p>
              <p className="display text-3xl lg:text-4xl mb-6">
                Equip women and girls across Africa with practical safety
                education.
              </p>
              <p className="body-prose opacity-70">
                Physical, digital, and financial — rooted in local context,
                delivered through certified local educators, measured against
                clear outcomes.
              </p>
            </div>
            <div>
              <p className="eyebrow mb-4 text-gold">Vision</p>
              <p className="display text-3xl lg:text-4xl mb-6">
                A continent where every woman has the knowledge to protect
                herself.
              </p>
              <p className="body-prose opacity-70">
                We envision a pan-African network of certified safety educators
                in every major city, campus, and community — making safety
                literacy as fundamental as financial literacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DATA PROTECTION */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 text-gold">Trust &amp; Compliance</p>
          <h2 className="display text-4xl lg:text-5xl mb-12">
            Built for <span className="display-italic text-burgundy">accountability.</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10">
            {[
              {
                title: "Data Protection",
                desc: "Compliant with Ghana Data Protection Act 2012 and GDPR. Participant data handled with the highest standards.",
              },
              {
                title: "Safeguarding",
                desc: "Comprehensive safeguarding policy protects every participant, especially minors and vulnerable adults.",
              },
              {
                title: "Financial Transparency",
                desc: "Annual financial reports and audited statements published for donor and public review.",
              },
              {
                title: "Monitoring & Evaluation",
                desc: "Every programme measured against clear outcomes with results published openly.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-cream p-8">
                <h3 className="display text-xl mb-3">{item.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-ink text-cream">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 text-center">
          <p className="eyebrow text-gold mb-6">Get involved</p>
          <h2 className="display text-5xl lg:text-6xl mb-8">
            Partner, donate, or<br />
            <span className="display-italic text-gold">volunteer.</span>
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/donate"
              className="inline-flex items-center gap-3 bg-gold text-ink px-8 py-5 hover:bg-cream transition-colors group"
            >
              <span className="eyebrow">Support our work</span>
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-cream/30 px-8 py-5 hover:bg-cream/10 transition-colors group"
            >
              <span className="eyebrow">Contact us</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
