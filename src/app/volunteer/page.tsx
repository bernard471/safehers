"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const roles = [
  {
    title: "Campus Ambassador",
    commitment: "5–10 hrs/month",
    desc: "Represent SafeHers at your university. Organise awareness events, connect us with student groups, and help us reach more young women on campus.",
    location: "Any university campus",
  },
  {
    title: "Programme Volunteer",
    commitment: "Varies by programme",
    desc: "Support delivery of SafeHers workshops and training sessions. Assist with logistics, registration, participant support, and post-programme follow-up.",
    location: "Ghana (primarily Accra)",
  },
  {
    title: "Content Contributor",
    commitment: "Flexible / remote",
    desc: "Write safety tips, blog posts, social media content, or educational materials. We value contributors with expertise in safety, cybersecurity, finance, or women's rights.",
    location: "Remote",
  },
  {
    title: "Translation Volunteer",
    commitment: "Project-based",
    desc: "Help us translate SafeHers content into local languages — Twi, Ga, Ewe, Pidgin, Swahili, and others. Making safety education accessible means speaking the right language.",
    location: "Remote",
  },
];

export default function VolunteerPage() {
  return (
    <>
      <section className="relative pt-40 pb-24 lg:pt-48 bg-ink text-cream overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-6 items-center max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
              <span className="inline-block w-8 h-px bg-gold" />
              Volunteer
            </p>
            <h1 className="display text-[clamp(3rem,8vw,7rem)] font-light max-w-[1000px] mb-8">
              Join the<br />
              <span className="display-italic text-gold">movement.</span>
            </h1>
            <p className="body-prose max-w-2xl opacity-70">
              SafeHers is powered by women who believe safety education should
              reach every girl and woman in Africa. Volunteer your time, skills,
              or platform to help us grow.
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

      <section className="pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-px bg-ink/10">
            {roles.map((role) => (
              <div key={role.title} className="bg-cream p-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="display text-2xl">{role.title}</h3>
                  <span className="eyebrow text-xs text-gold shrink-0 ml-4">{role.commitment}</span>
                </div>
                <p className="body-prose opacity-70 mb-4">{role.desc}</p>
                <p className="eyebrow text-xs opacity-40">{role.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-ink text-cream">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 text-center">
          <p className="eyebrow text-gold mb-6">Ready to volunteer?</p>
          <h2 className="display text-5xl lg:text-6xl mb-8">
            Your time<br />
            <span className="display-italic text-gold">matters.</span>
          </h2>
          <p className="body-prose opacity-70 max-w-xl mx-auto mb-10">
            Tell us about yourself and how you would like to contribute. We
            will match you with an opportunity that fits your skills and
            availability.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-gold text-ink px-8 py-5 hover:bg-cream transition-colors group"
          >
            <span className="eyebrow">Apply to volunteer</span>
            <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
