"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function About() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 lg:pt-48 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
            <span className="inline-block w-8 h-px bg-gold" />
            About SafeHer Foundation
          </p>
          <h1 className="display text-[clamp(3rem,8vw,8rem)] font-light max-w-[1100px] mb-12">
            Two visionaries.<br />
            <span className="display-italic text-gold">
              One foundation.
            </span>
          </h1>
          <div className="grid lg:grid-cols-12 gap-12">
            <p className="lg:col-span-7 body-prose text-lg opacity-70">
              SafeHer Foundation is a Ghana-US women&apos;s safety foundation
              co-founded by Zarinah Knows and DK Cyber. Together, they combine
              two decades of senior leadership in national security and
              privacy with deep ground presence across West Africa — to build
              what safety education for African women should have always been.
            </p>
          </div>
        </div>
      </section>
      <div className="gold-rule" />

      {/* FOUNDERS */}
      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-px bg-ink/15 border-y border-ink/15">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-cream p-8 sm:p-10 lg:p-16"
            >
              <p className="eyebrow mb-4 text-gold">Co-Founder &middot; Author</p>
              <h2 className="display text-5xl mb-2">Zarinah</h2>
              <p className="display-italic text-5xl text-burgundy mb-8">
                Knows
              </p>
              <p className="body-prose mb-4">
                Author, women&apos;s safety educator, and security/privacy
                professional. CEO and Founder of Happy.Gov, Happy You, and
                Ballard &amp; Silas LLCs. Author of{" "}
                <span className="display-italic">
                  30 Ways Pretty Girls Can Save Themselves
                </span>
                .
              </p>
              <p className="body-prose mb-6">
                Twenty-plus years as a senior leader in national security,
                privacy, law, and international trade. A proud HBCU, law, and
                Harvard Kennedy School graduate, with additional certifications
                in counterterrorism, use of force, European Union law, and
                commercial real estate. The founding voice for personal safety
                education — teaching this material since 2015.
              </p>
              <div className="border-t border-ink/15 pt-6 space-y-2 text-sm">
                <p>
                  <span className="eyebrow opacity-60 mr-3">Based</span>
                  Washington, D.C., USA
                </p>
                <p>
                  <span className="eyebrow opacity-60 mr-3">Focus</span>
                  Curriculum, content, US operations
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="bg-cream p-8 sm:p-10 lg:p-16"
            >
              <p className="eyebrow mb-4 text-gold">Co-Founder &middot; Cybersecurity</p>
              <h2 className="display text-5xl mb-2">DK</h2>
              <p className="display-italic text-5xl text-burgundy mb-8">
                Cyber
              </p>
              <p className="body-prose mb-4">
                Ghanaian cybersecurity professional and digital safety trainer.
                Founder of DK Cyber. Technical depth in account security,
                mobile fraud, social engineering, and digital safety
                architecture for African contexts.
              </p>
              <p className="body-prose mb-6">
                Africa operations and technology lead. Brings the on-the-ground
                operational capacity, cultural fluency, and African network that
                turns SafeHer Foundation from imported curriculum into authentic
                local movement. Leads technology, regional operations, and
                government engagement across the continent.
              </p>
              <div className="border-t border-ink/15 pt-6 space-y-2 text-sm">
                <p>
                  <span className="eyebrow opacity-60 mr-3">Based</span>
                  Accra, Ghana
                </p>
                <p>
                  <span className="eyebrow opacity-60 mr-3">Focus</span>
                  Technology, Africa operations, partnerships
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="py-32 bg-bone">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-8 text-center text-gold">Our story</p>
          <h2 className="display text-5xl lg:text-6xl text-center mb-16">
            Built quietly.<br />
            <span className="display-italic text-burgundy">
              Released with purpose.
            </span>
          </h2>

          <div className="space-y-8 body-prose text-lg max-w-3xl mx-auto">
            <p>
              The book came first. Written in 2020, refined for years, the
              30 Ways framework took shape across nearly a decade of
              teaching teen girls and women — long before it appeared
              between covers. When publication finally arrived in 2024,
              one thing remained held back: the harder material. The
              physical defense, escape exercises, and advanced safety
              modules that needed the right partner and the right ground.
            </p>
            <p>
              That ground turned out to be Ghana. The partner turned out
              to be a cybersecurity expert who had been building safety
              tools for African digital life and recognised the framework
              as the missing curriculum piece he needed.
            </p>
            <p>
              SafeHer Foundation is the result. An American framework, an
              African edition, a partnership that combines twenty years of
              security expertise with cultural fluency that no amount of
              translation can replicate. SafeHers — the movement it
              powers — is built for women everywhere. Starting in West Africa.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-6 text-gold">Our principles</p>
              <h2 className="display text-5xl lg:text-7xl">
                What we<br />
                <span className="display-italic">stand on.</span>
              </h2>
            </div>
            <p className="lg:col-span-6 lg:col-start-7 body-prose lg:pt-8">
              Six principles that shape every decision we make — what we
              build, how we fund it, who we partner with, and what we
              refuse to do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/15">
            {[
              {
                num: "01",
                title: "Safety is a right",
                desc: "Not a luxury. We build for women regardless of income, geography, or institutional access.",
              },
              {
                num: "02",
                title: "Localise, don't translate",
                desc: "African women's safety needs cannot be addressed by translating Western curricula. We co-author.",
              },
              {
                num: "03",
                title: "Sustainability matters",
                desc: "Programmes that collapse after one grant cycle help nobody. We build to last.",
              },
              {
                num: "04",
                title: "Impact is measurable",
                desc: "Every programme is evaluated against clear outcomes. We publish what we find — openly.",
              },
              {
                num: "05",
                title: "Earn the harder rooms",
                desc: "We start with what we know works. We expand into sensitive areas only when we have the trust to do it well.",
              },
              {
                num: "06",
                title: "Local voices lead",
                desc: "Our certified educators are the face of the work. We exist to equip them, not replace them.",
              },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-cream p-10"
              >
                <p className="num-tag text-4xl text-gold mb-4">{v.num}</p>
                <h3 className="display text-2xl mb-3">{v.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6 text-gold">Join us</p>
            <h2 className="display text-5xl lg:text-7xl">
              The work is<br />
              <span className="display-italic text-gold">just beginning.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="body-prose opacity-80 mb-6">
              If you serve women and girls — as an institution, a company, a
              government, or a donor — we want to hear from you.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-gold text-ink px-7 py-4 hover:bg-cream transition-colors group"
              >
                <span className="eyebrow">Get in touch</span>
                <ArrowUpRight
                  size={16}
                  className="group-hover:rotate-45 transition-transform"
                />
              </Link>
              <Link
                href="/donate"
                className="inline-flex items-center gap-3 border border-cream/30 text-cream px-7 py-4 hover:bg-cream/10 transition-colors group"
              >
                <span className="eyebrow">Support our work</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
