"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const partnerTypes = [
  {
    title: "Universities & Tertiary Institutions",
    desc: "Embed SafeHers into orientation, student affairs, and campus safety programmes. Train faculty and staff as certified safety educators.",
    examples: "University of Ghana, Ashesi University, GIMPA, KNUST",
  },
  {
    title: "Corporations & Employers",
    desc: "Staff safety training, workplace harassment prevention, and employee wellness programmes. Customised for your industry and workforce.",
    examples: "Hotels, banks, telecoms, multinationals",
  },
  {
    title: "Government & Public Sector",
    desc: "Ministry-level rollouts, public safety campaigns, and policy support. We work with government at every level.",
    examples: "NCCE, DOVVSU, Ministry of Gender",
  },
  {
    title: "NGOs & Development Agencies",
    desc: "Integrate SafeHers into existing programmes or co-fund new initiatives. Impact reporting included for all funded partnerships.",
    examples: "International development, women-focused NGOs",
  },
  {
    title: "Foundations & Donors",
    desc: "Fund scholarships, sponsor cohorts, or support curriculum development. Full transparency and detailed impact reporting.",
    examples: "Private foundations, CSR programmes, individual donors",
  },
  {
    title: "Media & Advocacy",
    desc: "Feature SafeHers in your coverage. Access our media kit, founder interviews, and programme data for your reporting.",
    examples: "Journalists, broadcasters, digital media",
  },
];

export default function PartnersPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-40 pb-24 lg:pt-48 bg-ink text-cream overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-6 items-center max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
              <span className="inline-block w-8 h-px bg-gold" />
              Partner With Us
            </p>
            <h1 className="display text-[clamp(3rem,8vw,7rem)] font-light max-w-[1000px] mb-8">
              Build with us.<br />
              <span className="display-italic text-gold">Scale with us.</span>
            </h1>
            <p className="body-prose max-w-2xl opacity-70">
              SafeHer Foundation works with institutions that serve women and
              girls. Whether you are a university, a corporation, a government
              agency, or a funder — we design partnerships that deliver
              measurable impact.
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

      {/* PARTNER TYPES */}
      <section className="pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10">
            {partnerTypes.map((pt) => (
              <div key={pt.title} className="bg-cream p-10">
                <h3 className="display text-2xl mb-4">{pt.title}</h3>
                <p className="body-prose opacity-70 mb-4">{pt.desc}</p>
                <p className="eyebrow text-xs opacity-40">{pt.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT PARTNERS RECEIVE */}
      <section className="py-24 bg-bone">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 text-gold">What partners receive</p>
          <h2 className="display text-4xl lg:text-5xl mb-12">
            A <span className="display-italic text-burgundy">structured</span> engagement.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Custom Programme Design", desc: "Tailored to your context, audience, and goals." },
              { title: "Certified Facilitators", desc: "Trained educators who deliver with quality and consistency." },
              { title: "Impact Reporting", desc: "Pre/post assessment data and programme evaluation reports." },
              { title: "Recognition", desc: "Logo placement on SafeHer Foundation partners page and materials." },
            ].map((item) => (
              <div key={item.title} className="border-t-2 border-gold pt-6">
                <h3 className="display text-xl mb-3">{item.title}</h3>
                <p className="text-sm opacity-70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-ink text-cream">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 text-center">
          <p className="eyebrow text-gold mb-6">Let&apos;s build together</p>
          <h2 className="display text-5xl lg:text-6xl mb-8">
            Start the<br />
            <span className="display-italic text-gold">conversation.</span>
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-gold text-ink px-8 py-5 hover:bg-cream transition-colors group"
            >
              <span className="eyebrow">Become a partner</span>
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center gap-3 border border-cream/30 px-8 py-5 hover:bg-cream/10 transition-colors group"
            >
              <span className="eyebrow">Fund a programme</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
