"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight, BookOpen, Shield, Award, Users, Clock,
  CheckCircle, MessageSquare, Globe, Wifi, Banknote,
} from "lucide-react";
import { SAMPLE_COURSES } from "@/lib/sample-courses";

const featuredCourses = SAMPLE_COURSES.filter(c => c.isPublished).slice(0, 3);

const stats = [
  { value: "6", label: "Free courses" },
  { value: "30+", label: "Practical lessons" },
  { value: "100%", label: "Free for all women" },
  { value: "✓", label: "Verified certificates" },
];

const categoryIcons: Record<string, typeof Shield> = {
  "personal-safety": Shield,
  "online-safety": Wifi,
  "financial-safety": Banknote,
  "campus-safety": BookOpen,
};

const testimonials = [
  { quote: "The personal safety course changed how I move through Accra. I now have a safety circle and real protocols.", name: "Abena M.", role: "University student, Legon" },
  { quote: "I had no idea my phone could be compromised. The spy app detection lesson was eye-opening.", name: "Fatima K.", role: "Teacher, Tamale" },
  { quote: "After the mobile money course, I set up SIM PIN and 2FA. I feel so much more in control.", name: "Grace B.", role: "Market trader, Kumasi" },
];

export default function AcademyPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-40 pb-24 lg:pt-48 bg-ink text-cream overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[40%] right-[15%] w-[400px] h-[400px] rounded-full bg-gold/5 blur-[120px]" />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
                  <span className="inline-block w-8 h-px bg-gold" />
                  SafeHer Academy
                </p>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                className="display text-[clamp(3rem,7vw,6rem)] font-light max-w-[600px] mb-6"
              >
                Learn to protect<br />
                <span className="display-italic text-gold">yourself.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
                className="body-prose max-w-lg opacity-70 text-lg mb-8"
              >
                Free, practical safety courses designed for women and girls across
                Africa. Built by security professionals, delivered online, certified
                by SafeHer Foundation.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/academy/courses" className="inline-flex items-center gap-3 bg-gold text-ink px-8 py-5 hover:bg-cream transition-colors group">
                  <span className="eyebrow">Browse Courses</span>
                  <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
                </Link>
                <Link href="/portal/register" className="inline-flex items-center gap-3 border border-cream/30 px-8 py-5 hover:bg-cream/10 transition-colors group">
                  <span className="eyebrow">Create Free Account</span>
                  <ArrowUpRight size={16} />
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}
              className="hidden lg:flex justify-center"
            >
              <Image src="/images/safeherlogo.png" alt="SafeHer Academy" width={280} height={280} className="w-64 h-64 object-contain opacity-80 drop-shadow-[0_0_60px_rgba(184,150,62,0.2)]" />
            </motion.div>
          </div>
        </div>
      </section>
      <div className="gold-rule" />

      {/* STATS */}
      <section className="py-10 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center py-4">
                <p className="display text-4xl text-gold mb-1">{s.value}</p>
                <p className="eyebrow text-xs opacity-50">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-bone">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-4 text-gold">How it works</p>
          <h2 className="display text-4xl lg:text-5xl mb-16">Four steps to <span className="display-italic text-burgundy">safety literacy.</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, step: "01", title: "Create Account", desc: "Register for free. No fees, no credit card, no hidden costs." },
              { icon: BookOpen, step: "02", title: "Enroll in Courses", desc: "Choose from practical safety courses built for African women and girls." },
              { icon: Shield, step: "03", title: "Learn & Practice", desc: "Complete lessons, pass quizzes, complete practical tasks, build your safety plan." },
              { icon: Award, step: "04", title: "Get Certified", desc: "Earn a verifiable SafeHer Foundation certificate you can share with anyone." },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                  className="border border-ink/10 bg-cream p-8 relative overflow-hidden group hover:border-gold/30 transition-colors"
                >
                  <div className="absolute top-4 right-4 num-tag text-6xl text-gold/10 group-hover:text-gold/20 transition-colors">{s.step}</div>
                  <Icon size={28} strokeWidth={1.2} className="text-gold mb-4 relative" />
                  <h3 className="display text-xl mb-3 relative">{s.title}</h3>
                  <p className="text-sm opacity-60 relative">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12 gap-6">
            <div>
              <p className="eyebrow mb-4 text-gold">Featured courses</p>
              <h2 className="display text-4xl lg:text-5xl">Start with <span className="display-italic text-burgundy">these.</span></h2>
            </div>
            <Link href="/academy/courses" className="hidden md:inline-flex items-center gap-3 group eyebrow shrink-0">
              All courses <span className="w-8 h-px bg-ink group-hover:w-14 transition-all duration-500" /> <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredCourses.map((course, i) => {
              const CatIcon = categoryIcons[course.category] || BookOpen;
              const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
              return (
                <motion.div key={course.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Link href={`/academy/courses/${course.slug}`} className="group block border border-ink/10 hover:border-gold/40 transition-all h-full">
                    <div className="bg-ink text-cream p-8 relative overflow-hidden">
                      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <CatIcon size={60} strokeWidth={0.8} />
                      </div>
                      <span className="eyebrow text-xs text-gold">{course.category.replace(/-/g, " ")}</span>
                      <h3 className="display text-xl lg:text-2xl mt-3 leading-snug group-hover:text-gold transition-colors pr-12">{course.title}</h3>
                      <div className="flex items-center gap-4 mt-4 text-xs opacity-40">
                        <span className="flex items-center gap-1"><Clock size={11} /> {course.durationHours}h</span>
                        <span>{totalLessons} lessons</span>
                        <span className="eyebrow text-gold opacity-100">Free</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-sm opacity-70 mb-4 line-clamp-2">{course.excerpt}</p>
                      <p className="text-xs opacity-50 mb-4">Instructor: <span className="text-ink">{course.instructor}</span></p>
                      <ul className="space-y-1.5 mb-4">
                        {course.learningOutcomes.slice(0, 3).map((o) => (
                          <li key={o} className="text-xs flex items-start gap-2 opacity-60">
                            <CheckCircle size={11} className="text-gold mt-0.5 shrink-0" /> {o}
                          </li>
                        ))}
                      </ul>
                      <span className="eyebrow text-xs text-burgundy flex items-center gap-2 group-hover:gap-3 transition-all">
                        Enroll free <ArrowUpRight size={12} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 md:hidden">
            <Link href="/academy/courses" className="eyebrow text-burgundy link-underline">All courses →</Link>
          </div>
        </div>
      </section>

      {/* INSTRUCTORS */}
      <section className="py-24 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-4 text-gold">Your instructors</p>
          <h2 className="display text-4xl lg:text-5xl mb-16">Learn from <span className="display-italic text-gold">the experts.</span></h2>
          <div className="grid md:grid-cols-2 gap-px bg-cream/10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-ink p-10 lg:p-14">
              <p className="eyebrow text-gold mb-3">Personal Safety</p>
              <h3 className="display text-3xl mb-4">Zarinah Knows</h3>
              <p className="body-prose opacity-60 mb-4">Author of 30 Ways Pretty Girls Can Save Themselves. Twenty-plus years in national security, privacy, law, and international trade. Harvard Kennedy School graduate.</p>
              <p className="text-xs opacity-30">Teaches: Personal Safety Foundations</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-ink p-10 lg:p-14">
              <p className="eyebrow text-gold mb-3">Digital &amp; Financial Safety</p>
              <h3 className="display text-3xl mb-4">DK Cyber</h3>
              <p className="body-prose opacity-60 mb-4">Ghanaian cybersecurity professional. Expert in account security, mobile fraud, social engineering, and digital safety architecture for African contexts.</p>
              <p className="text-xs opacity-30">Teaches: Mobile Money Fraud, Phone Privacy, Sextortion Response</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-4 text-gold">What learners say</p>
          <h2 className="display text-4xl lg:text-5xl mb-16">Real voices, <span className="display-italic text-burgundy">real impact.</span></h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.blockquote key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="border-t-2 border-gold pt-6"
              >
                <p className="body-prose text-ink/80 mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <footer>
                  <p className="eyebrow text-ink text-xs">{t.name}</p>
                  <p className="text-xs text-ink/40 mt-1">{t.role}</p>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CONSULTATION + SAFETY PLAN */}
      <section className="py-20 bg-bone">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="border border-ink/10 bg-cream p-10 lg:p-14"
            >
              <MessageSquare size={28} strokeWidth={1.2} className="text-gold mb-6" />
              <h3 className="display text-2xl lg:text-3xl mb-4">Need personal guidance?</h3>
              <p className="body-prose opacity-60 mb-6">Book a confidential consultation with a SafeHer Foundation specialist for online safety, sextortion response, or personal safety planning.</p>
              <Link href="/consultation/book" className="eyebrow text-burgundy flex items-center gap-2 group hover:gap-3 transition-all">
                Book consultation <ArrowUpRight size={14} />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="border border-ink/10 bg-cream p-10 lg:p-14"
            >
              <Shield size={28} strokeWidth={1.2} className="text-gold mb-6" />
              <h3 className="display text-2xl lg:text-3xl mb-4">Build your safety plan</h3>
              <p className="body-prose opacity-60 mb-6">Every student gets a personal safety plan — emergency contacts, safety checklist, safe locations, and private notes. All encrypted and private.</p>
              <Link href="/portal/register" className="eyebrow text-burgundy flex items-center gap-2 group hover:gap-3 transition-all">
                Create account <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-4 text-gold text-center">Common questions</p>
          <h2 className="display text-4xl lg:text-5xl mb-16 text-center">About <span className="display-italic text-burgundy">the Academy.</span></h2>
          <div className="space-y-6">
            {[
              { q: "Is SafeHer Academy really free?", a: "Yes. All courses are free for women and girls. Funded by donors and institutional partners. No credit card required, no hidden fees." },
              { q: "Do I get a certificate?", a: "Yes. Complete all lessons and pass the quizzes to earn a verifiable SafeHer Foundation certificate with a unique ID that anyone can verify online." },
              { q: "How long do courses take?", a: "Courses range from 3 to 6 hours. You learn at your own pace — there are no deadlines. Pick up where you left off anytime." },
              { q: "Can I access courses on my phone?", a: "Yes. SafeHer Academy is fully responsive. All courses work on phones, tablets, and computers. No app download required." },
              { q: "Is my data safe?", a: "Yes. Your data is protected under Ghana's Data Protection Act 2012. Safety plans and consultation records are private and accessible only to you." },
              { q: "Can my school or organisation use this?", a: "Yes. Contact us to set up an institutional partnership with cohort management, progress tracking, and impact reporting." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="border-b border-ink/10 pb-6"
              >
                <h3 className="display text-lg mb-2">{item.q}</h3>
                <p className="text-sm opacity-60 leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-ink text-cream">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="display-italic text-2xl text-gold mb-4">Pretty Girl, Save Yourself.</p>
            <h2 className="display text-5xl lg:text-6xl mb-6">Your safety education<br /><span className="display-italic text-gold">starts here.</span></h2>
            <p className="body-prose opacity-60 max-w-xl mx-auto mb-10">
              Join women across Africa who are learning to protect themselves — physically, digitally, and financially. It is free, it is practical, and it is yours.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/academy/courses" className="inline-flex items-center gap-3 bg-gold text-ink px-8 py-5 hover:bg-cream transition-colors group">
                <span className="eyebrow">Browse Courses</span>
                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
              </Link>
              <Link href="/portal/register" className="inline-flex items-center gap-3 border border-cream/30 px-8 py-5 hover:bg-cream/10 transition-colors group">
                <span className="eyebrow">Create Free Account</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
