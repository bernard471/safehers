"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";

const leadership = [
  {
    name: "Zarinah Knows",
    role: "Co-Founder & Executive Director",
    location: "Washington, D.C., USA",
    bio: "Author of 30 Ways Pretty Girls Can Save Themselves. Twenty-plus years as a senior leader in national security, privacy, law, and international trade. A proud HBCU, law, and Harvard Kennedy School graduate. The founding voice for personal safety education.",
    focus: ["Curriculum & content", "US operations", "Strategic partnerships"],
  },
  {
    name: "DK Cyber",
    role: "Co-Founder & Director of Operations",
    location: "Accra, Ghana",
    bio: "Ghanaian cybersecurity professional and digital safety trainer. Expert in account security, mobile fraud, social engineering, and digital safety architecture for African contexts. Leads technology, regional operations, and government engagement.",
    focus: ["Technology & platform", "Africa operations", "Cybersecurity curriculum"],
  },
];

const advisors = [
  { name: "Advisory Board", desc: "SafeHer Foundation is establishing an independent advisory board with expertise in women's rights, education, cybersecurity, finance, and African development. Board appointments will be announced as they are confirmed." },
];

const openRoles = [
  { title: "Campus Programme Coordinator", location: "Accra, Ghana", type: "Full-time" },
  { title: "Curriculum Development Lead", location: "Remote", type: "Contract" },
  { title: "Digital Marketing Specialist", location: "Accra / Remote", type: "Part-time" },
];

export default function TeamPage() {
  return (
    <>
      <section className="pt-40 pb-24 lg:pt-48 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
            <span className="inline-block w-8 h-px bg-gold" />
            Our Team
          </p>
          <h1 className="display text-[clamp(3rem,7vw,6rem)] font-light max-w-[1000px] mb-6">
            The people behind<br />
            <span className="display-italic text-gold">the mission.</span>
          </h1>
          <p className="body-prose max-w-2xl opacity-70 text-lg">
            SafeHer Foundation is led by two professionals who came together because
            the work demanded it. Our team spans two continents, combining decades of
            security expertise with deep African ground presence.
          </p>
        </div>
      </section>
      <div className="gold-rule" />

      {/* LEADERSHIP */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow text-gold mb-4">Leadership</p>
          <h2 className="display text-4xl lg:text-5xl mb-16">Co-Founders</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {leadership.map((person, i) => (
              <motion.div key={person.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="border border-ink/10 bg-cream"
              >
                <div className="bg-ink text-cream p-8">
                  <p className="eyebrow text-gold text-xs mb-3">{person.role}</p>
                  <h3 className="display text-3xl lg:text-4xl">{person.name}</h3>
                  <p className="flex items-center gap-2 text-xs opacity-40 mt-3"><Globe size={12} /> {person.location}</p>
                </div>
                <div className="p-8">
                  <p className="body-prose opacity-70 mb-6">{person.bio}</p>
                  <div className="border-t border-ink/10 pt-5">
                    <p className="eyebrow text-xs opacity-40 mb-3">Focus areas</p>
                    <div className="flex flex-wrap gap-2">
                      {person.focus.map(f => (
                        <span key={f} className="eyebrow text-[9px] bg-gold/10 text-gold px-3 py-1">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVISORY */}
      <section className="py-24 bg-bone">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow text-gold mb-4">Advisory &amp; Governance</p>
          <h2 className="display text-4xl lg:text-5xl mb-12">Guided by <span className="display-italic text-burgundy">expertise.</span></h2>
          {advisors.map(a => (
            <div key={a.name} className="border border-ink/10 bg-cream p-10 max-w-2xl">
              <h3 className="display text-2xl mb-4">{a.name}</h3>
              <p className="body-prose opacity-60">{a.desc}</p>
              <Link href="/governance" className="eyebrow text-xs text-burgundy flex items-center gap-2 mt-6">
                View governance structure <ArrowUpRight size={12} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* JOIN THE TEAM */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow text-gold mb-4">Join the team</p>
          <h2 className="display text-4xl lg:text-5xl mb-12">Open <span className="display-italic text-burgundy">positions.</span></h2>
          <div className="space-y-4 mb-12">
            {openRoles.map(role => (
              <div key={role.title} className="border border-ink/10 bg-cream p-6 flex items-center justify-between hover:border-gold/30 transition-colors">
                <div>
                  <h3 className="display text-lg">{role.title}</h3>
                  <p className="eyebrow text-xs opacity-40 mt-1">{role.location} · {role.type}</p>
                </div>
                <Link href="/contact" className="eyebrow text-xs text-burgundy flex items-center gap-2 hover:gap-3 transition-all">
                  Apply <ArrowUpRight size={12} />
                </Link>
              </div>
            ))}
          </div>
          <p className="text-sm opacity-50">
            Don&apos;t see your role? We are always interested in hearing from talented people
            who share our mission.{" "}
            <Link href="/contact" className="text-burgundy link-underline">Send us your CV</Link>.
          </p>
        </div>
      </section>

      {/* VOLUNTEER CTA */}
      <section className="py-20 bg-ink text-cream">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 text-center">
          <p className="eyebrow text-gold mb-4">Volunteer</p>
          <h2 className="display text-4xl lg:text-5xl mb-6">Not looking for a job?<br /><span className="display-italic text-gold">Volunteer with us.</span></h2>
          <p className="body-prose opacity-60 max-w-md mx-auto mb-8">Campus ambassadors, content contributors, translation volunteers, and programme support.</p>
          <Link href="/volunteer" className="bg-gold text-ink px-7 py-4 eyebrow hover:bg-cream transition-colors inline-flex items-center gap-2">
            Volunteer opportunities <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}
