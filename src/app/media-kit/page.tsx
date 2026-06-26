"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MediaKitPage() {
  return (
    <>
      <section className="relative pt-40 pb-24 lg:pt-48 bg-ink text-cream overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-6 items-center max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
              <span className="inline-block w-8 h-px bg-gold" />
              Media Kit
            </p>
            <h1 className="display text-[clamp(3rem,8vw,7rem)] font-light max-w-[1000px] mb-8">
              Press &amp;<br />
              <span className="display-italic text-gold">media resources.</span>
            </h1>
            <p className="body-prose max-w-2xl opacity-70">
              Everything journalists, broadcasters, and media professionals need
              to cover SafeHer Foundation and the SafeHers movement accurately.
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

      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Brand Names */}
          <div className="mb-24">
            <p className="eyebrow mb-6 text-gold">Brand Names &amp; Usage</p>
            <div className="grid md:grid-cols-2 gap-px bg-ink/10">
              <div className="bg-cream p-10">
                <h3 className="display text-3xl mb-4">SafeHer Foundation</h3>
                <p className="body-prose opacity-70">
                  The official NGO name. Use for all official, legal, donor,
                  governance, and institutional references. First reference in
                  any article should use the full name.
                </p>
              </div>
              <div className="bg-cream p-10">
                <h3 className="display text-3xl mb-4">SafeHers</h3>
                <p className="body-prose opacity-70">
                  The public movement and campaign name. Use for community,
                  programme, and youth-facing references. Acceptable for
                  subsequent references after the full name has been used.
                </p>
              </div>
            </div>
          </div>

          {/* Slogan */}
          <div className="mb-24">
            <p className="eyebrow mb-6 text-gold">Slogan</p>
            <div className="border border-ink/15 p-10 bg-bone">
              <p className="display-italic text-4xl lg:text-5xl text-burgundy">
                Pretty Girl, Save Yourself.
              </p>
            </div>
          </div>

          {/* Founder Bios */}
          <div className="mb-24">
            <p className="eyebrow mb-6 text-gold">Founder Bios (Approved)</p>
            <div className="grid md:grid-cols-2 gap-px bg-ink/10">
              <div className="bg-cream p-10">
                <h3 className="display text-2xl mb-2">Zarinah Knows</h3>
                <p className="eyebrow text-xs text-gold mb-4">Co-Founder &amp; Executive Director</p>
                <p className="body-prose opacity-70 text-sm">
                  Author, women&apos;s safety educator, and security/privacy
                  professional with over twenty years of senior leadership in
                  national security, privacy, law, and international trade. A
                  proud HBCU, law, and Harvard Kennedy School graduate. Author
                  of <span className="italic">30 Ways Pretty Girls Can Save
                  Themselves</span>. The founding voice for personal safety
                  education. Based in Washington, D.C.
                </p>
              </div>
              <div className="bg-cream p-10">
                <h3 className="display text-2xl mb-2">DK Cyber</h3>
                <p className="eyebrow text-xs text-gold mb-4">Co-Founder &amp; Director of Operations</p>
                <p className="body-prose opacity-70 text-sm">
                  Ghanaian cybersecurity professional and digital safety trainer.
                  Founder of DK Cyber. Technical expertise in account security,
                  mobile fraud, social engineering, and digital safety
                  architecture for African contexts. Africa operations and
                  technology lead. Based in Accra, Ghana.
                </p>
              </div>
            </div>
          </div>

          {/* Press Contact */}
          <div className="mb-24">
            <p className="eyebrow mb-6 text-gold">Press Contact</p>
            <div className="border border-ink/15 p-10">
              <p className="body-prose mb-2">
                For media inquiries, interview requests, or press materials:
              </p>
              <a
                href="mailto:media@safehers.africa"
                className="display text-2xl text-burgundy link-underline"
              >
                media@safehers.africa
              </a>
            </div>
          </div>

          {/* Key Facts */}
          <div>
            <p className="eyebrow mb-6 text-gold">Key Facts</p>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { label: "Founded", value: "2024" },
                { label: "Headquarters", value: "Accra, Ghana & Washington, D.C., USA" },
                { label: "Focus", value: "Women's safety education — physical, digital, financial" },
                { label: "Geographic reach", value: "Pan-African, starting with Ghana and West Africa" },
                { label: "Slogan", value: "Pretty Girl, Save Yourself." },
                { label: "Website", value: "safehers.africa" },
              ].map((fact) => (
                <div key={fact.label} className="flex items-start gap-4 border-b border-ink/10 pb-4">
                  <span className="eyebrow opacity-40 w-32 shrink-0">{fact.label}</span>
                  <span className="body-prose text-sm">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <p className="body-prose opacity-60 text-sm">
              Brand assets (logos, colour palette, typography guidelines) are
              available on request. Contact{" "}
              <a
                href="mailto:media@safehers.africa"
                className="link-underline text-burgundy"
              >
                media@safehers.africa
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
