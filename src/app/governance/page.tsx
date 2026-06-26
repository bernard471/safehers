"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function GovernancePage() {
  return (
    <>
      <section className="relative pt-40 pb-24 lg:pt-48 bg-ink text-cream overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-6 items-center max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
              <span className="inline-block w-8 h-px bg-gold" />
              Governance
            </p>
            <h1 className="display text-[clamp(3rem,8vw,7rem)] font-light max-w-[1000px] mb-8">
              Accountable<br />
              <span className="display-italic text-gold">leadership.</span>
            </h1>
            <p className="body-prose max-w-2xl opacity-70">
              SafeHer Foundation is committed to the highest standards of
              governance. Our structure ensures transparent decision-making,
              fiduciary responsibility, and accountability to our donors,
              partners, and the communities we serve.
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
          {/* Leadership */}
          <div className="mb-24">
            <p className="eyebrow mb-6 text-gold">Executive Leadership</p>
            <h2 className="display text-4xl mb-12">
              Co-Founders &amp; <span className="display-italic text-burgundy">Executive Team</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-px bg-ink/10">
              <div className="bg-cream p-10">
                <p className="eyebrow text-gold mb-2">Co-Founder &amp; Executive Director</p>
                <h3 className="display text-3xl mb-4">Zarinah Knows</h3>
                <p className="body-prose opacity-70">
                  Curriculum development, US operations, strategic partnerships,
                  and institutional development.
                </p>
              </div>
              <div className="bg-cream p-10">
                <p className="eyebrow text-gold mb-2">Co-Founder &amp; Director of Operations</p>
                <h3 className="display text-3xl mb-4">DK Cyber</h3>
                <p className="body-prose opacity-70">
                  Technology, Africa operations, government engagement, and
                  regional partnerships.
                </p>
              </div>
            </div>
          </div>

          {/* Board */}
          <div className="mb-24">
            <p className="eyebrow mb-6 text-gold">Board of Directors</p>
            <h2 className="display text-4xl mb-8">
              Independent <span className="display-italic text-burgundy">oversight.</span>
            </h2>
            <div className="border border-ink/15 p-10 bg-bone">
              <p className="body-prose opacity-70 mb-4">
                SafeHer Foundation is establishing an independent board of
                directors with expertise in women&apos;s rights, education,
                cybersecurity, finance, and African development. Board
                appointments will be announced as they are confirmed.
              </p>
              <p className="body-prose opacity-70">
                If you are interested in serving on our board or advisory
                council, please{" "}
                <Link href="/contact" className="link-underline text-burgundy">
                  contact us
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Advisory */}
          <div className="mb-24">
            <p className="eyebrow mb-6 text-gold">Advisory Council</p>
            <h2 className="display text-4xl mb-8">
              Expert <span className="display-italic text-burgundy">guidance.</span>
            </h2>
            <div className="border border-ink/15 p-10 bg-bone">
              <p className="body-prose opacity-70">
                Our advisory council brings domain expertise in women&apos;s
                safety, cybersecurity, financial inclusion, higher education,
                and African policy. Advisory members guide strategy but do not
                hold fiduciary responsibility. Appointments to be announced.
              </p>
            </div>
          </div>

          {/* Accountability */}
          <div>
            <p className="eyebrow mb-6 text-gold">Accountability Framework</p>
            <h2 className="display text-4xl mb-12">
              How we hold ourselves <span className="display-italic text-burgundy">accountable.</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10">
              {[
                {
                  title: "Annual Reports",
                  desc: "Published openly with programme outcomes, financial summaries, and strategic updates.",
                },
                {
                  title: "Financial Audits",
                  desc: "Annual audited financial statements prepared by an independent auditor.",
                },
                {
                  title: "Safeguarding Reviews",
                  desc: "Regular review of safeguarding policies and incident reports.",
                },
                {
                  title: "Programme Evaluations",
                  desc: "Independent evaluations of major programmes with findings published.",
                },
                {
                  title: "Donor Reporting",
                  desc: "Detailed impact reports provided to all major donors and institutional partners.",
                },
                {
                  title: "Public Disclosure",
                  desc: "Key governance documents available on request for any stakeholder.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-cream p-8">
                  <h3 className="display text-xl mb-3">{item.title}</h3>
                  <p className="text-sm opacity-70 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
