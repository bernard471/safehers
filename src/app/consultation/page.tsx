"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight, Shield, Wifi, Banknote, AlertTriangle,
  GraduationCap, MessageSquare, Clock, CheckCircle, Lock,
} from "lucide-react";

const consultationTypes = [
  { icon: Shield, value: "personal-safety", title: "Personal Safety", desc: "Safety assessment, protocol development, threat evaluation, and personalised safety planning.", color: "text-gold" },
  { icon: Wifi, value: "online-safety", title: "Online Safety", desc: "Account security audit, privacy settings review, social media safety, and digital threat assessment.", color: "text-gold" },
  { icon: Banknote, value: "financial-safety", title: "Financial Safety", desc: "Mobile money security, fraud response, SIM swap recovery, and financial protection planning.", color: "text-gold" },
  { icon: AlertTriangle, value: "sextortion-response", title: "Sextortion Response", desc: "Urgent support for sextortion, blackmail, or image-based abuse. Evidence preservation and reporting.", color: "text-burgundy" },
  { icon: GraduationCap, value: "campus-safety", title: "Campus Safety", desc: "Safety planning for students — hostel security, social situations, campus resources, and emergency protocols.", color: "text-gold" },
  { icon: MessageSquare, value: "general", title: "General Consultation", desc: "Any safety-related concern not listed above. We will match you with the right specialist.", color: "text-gold" },
];

const process = [
  { step: "01", title: "Request", desc: "Fill out the booking form with your preferred date, consultation type, and a brief description." },
  { step: "02", title: "Confirmation", desc: "A SafeHer Foundation specialist confirms your session within 2 business days via email." },
  { step: "03", title: "Session", desc: "Meet your consultant virtually or in-person (Accra). Sessions are typically 45-60 minutes." },
  { step: "04", title: "Follow-up", desc: "Receive a personalised safety plan and follow-up resources based on your session." },
];

export default function ConsultationPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 lg:pt-48 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
                <span className="inline-block w-8 h-px bg-gold" />
                Consultations
              </p>
              <h1 className="display text-[clamp(3rem,7vw,6rem)] font-light max-w-[600px] mb-6">
                Confidential safety<br />
                <span className="display-italic text-gold">support.</span>
              </h1>
              <p className="body-prose max-w-lg opacity-70 text-lg mb-8">
                Book a one-on-one session with a SafeHer Foundation safety specialist.
                All consultations are confidential and handled with the highest
                standards of safeguarding.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/consultation/book" className="inline-flex items-center gap-3 bg-gold text-ink px-8 py-5 hover:bg-cream transition-colors group">
                  <span className="eyebrow">Book a Session</span>
                  <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
                </Link>
                <Link href="/portal/login" className="inline-flex items-center gap-3 border border-cream/30 px-8 py-5 hover:bg-cream/10 transition-colors">
                  <span className="eyebrow">View My Sessions</span>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="border border-cream/10 bg-cream/5 p-10 space-y-5">
                {[
                  { icon: Lock, text: "All sessions are fully confidential" },
                  { icon: Clock, text: "Confirmed within 2 business days" },
                  { icon: MessageSquare, text: "Virtual or in-person (Accra)" },
                  { icon: Shield, text: "Trained safety specialists" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-4 opacity-60">
                      <Icon size={18} className="text-gold shrink-0" />
                      <span className="text-sm">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="gold-rule" />

      {/* CONSULTATION TYPES */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow text-gold mb-4">Types of consultation</p>
          <h2 className="display text-4xl lg:text-5xl mb-16">Choose the support <span className="display-italic text-burgundy">you need.</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultationTypes.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div key={t.value}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="border border-ink/10 p-8 hover:border-gold/30 transition-colors group"
                >
                  <Icon size={28} strokeWidth={1.2} className={`${t.color} mb-4`} />
                  <h3 className="display text-xl mb-3 group-hover:text-burgundy transition-colors">{t.title}</h3>
                  <p className="text-sm opacity-60 leading-relaxed mb-4">{t.desc}</p>
                  <Link href="/consultation/book" className="eyebrow text-xs text-burgundy flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Book this type <ArrowUpRight size={12} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-bone">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow text-gold mb-4">How it works</p>
          <h2 className="display text-4xl lg:text-5xl mb-16">Four simple <span className="display-italic text-burgundy">steps.</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <motion.div key={p.step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="border border-ink/10 bg-cream p-8 relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 num-tag text-6xl text-gold/10">{p.step}</div>
                <p className="num-tag text-3xl text-gold mb-4 relative">{p.step}</p>
                <h3 className="display text-xl mb-3 relative">{p.title}</h3>
                <p className="text-sm opacity-60 relative">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST & SAFETY */}
      <section className="py-24">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
          <p className="eyebrow text-gold mb-4 text-center">Your safety comes first</p>
          <h2 className="display text-4xl lg:text-5xl mb-12 text-center">Built on <span className="display-italic text-burgundy">trust.</span></h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Confidentiality", desc: "Only you and your assigned consultant can view session details. No information is shared with institutions, donors, or other users." },
              { title: "Safeguarding", desc: "All consultants are trained in safeguarding. Participant wellbeing is the first priority in every session." },
              { title: "Data Protection", desc: "Consultation data is protected under Ghana's Data Protection Act 2012. We collect only what is necessary to provide support." },
              { title: "No Pressure", desc: "You are never required to share more than you are comfortable with. You can stop or reschedule at any time." },
            ].map((item) => (
              <div key={item.title} className="border border-ink/10 p-8">
                <CheckCircle size={20} className="text-gold mb-3" />
                <h3 className="display text-xl mb-3">{item.title}</h3>
                <p className="text-sm opacity-60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMERGENCY + CTA */}
      <section className="py-16 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Emergency notice */}
          <div className="border border-burgundy/30 bg-burgundy/10 p-6 mb-12">
            <div className="flex items-start gap-4">
              <AlertTriangle size={20} className="text-burgundy shrink-0 mt-0.5" />
              <div>
                <p className="eyebrow text-xs text-burgundy mb-1">Emergency Notice</p>
                <p className="text-sm opacity-70">
                  SafeHer Foundation consultations are not a substitute for emergency services,
                  law enforcement, or professional counselling. If you are in immediate danger,
                  contact local emergency services. Ghana Police: 191 · DOVVSU: 0800-111-222
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="display-italic text-xl text-gold mb-4">Pretty Girl, Save Yourself.</p>
            <h2 className="display text-4xl lg:text-5xl mb-6">Ready to <span className="display-italic text-gold">talk?</span></h2>
            <p className="body-prose opacity-60 max-w-md mx-auto mb-8">
              Your first step is filling out a short booking form. We will match you
              with the right specialist and confirm within 2 business days.
            </p>
            <Link href="/consultation/book" className="inline-flex items-center gap-3 bg-gold text-ink px-8 py-5 hover:bg-cream transition-colors group">
              <span className="eyebrow">Book Your Session</span>
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
