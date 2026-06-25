"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, BookOpen, CheckCircle, Shield, Wifi, Banknote, Award } from "lucide-react";
import { SAMPLE_COURSES } from "@/lib/sample-courses";

const categories = [
  { value: "all", label: "All Courses" },
  { value: "personal-safety", label: "Personal Safety" },
  { value: "online-safety", label: "Online Safety" },
  { value: "financial-safety", label: "Financial Safety" },
  { value: "campus-safety", label: "Campus Safety" },
];

const categoryIcons: Record<string, typeof Shield> = {
  "personal-safety": Shield,
  "online-safety": Wifi,
  "financial-safety": Banknote,
  "campus-safety": BookOpen,
};

export default function CoursesPage() {
  const [filter, setFilter] = useState("all");
  const courses = filter === "all" ? SAMPLE_COURSES : SAMPLE_COURSES.filter(c => c.category === filter);
  const featured = SAMPLE_COURSES[0];

  return (
    <>
      <section className="pt-40 pb-24 lg:pt-48 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
            <span className="inline-block w-8 h-px bg-gold" />
            Course Catalog
          </p>
          <h1 className="display text-[clamp(3rem,8vw,7rem)] font-light max-w-[1000px] mb-8">
            Practical safety<br />
            <span className="display-italic text-gold">courses.</span>
          </h1>
          <p className="body-prose max-w-2xl opacity-70 mb-10">
            Every course is free, practical, and built for African women
            and girls. Enroll, learn at your own pace, and earn a verifiable certificate.
          </p>
          <div className="flex items-center gap-6 text-sm opacity-50">
            <span className="flex items-center gap-2"><BookOpen size={14} /> {SAMPLE_COURSES.length} courses</span>
            <span className="flex items-center gap-2"><Award size={14} /> Certificates included</span>
            <span className="eyebrow text-gold opacity-100">100% Free</span>
          </div>
        </div>
      </section>
      <div className="gold-rule" />

      {/* FEATURED COURSE */}
      <section className="py-16 bg-bone">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Link href={`/academy/courses/${featured.slug}`} className="group block">
            <div className="grid lg:grid-cols-12 gap-8 border border-ink/10 bg-cream hover:border-gold/30 transition-colors">
              <div className="lg:col-span-5 bg-ink text-cream p-10 lg:p-14 flex flex-col justify-between">
                <div>
                  <span className="eyebrow text-xs text-gold">Featured Course</span>
                  <h2 className="display text-3xl lg:text-4xl mt-4 mb-4 group-hover:text-gold transition-colors">{featured.title}</h2>
                  <p className="text-sm opacity-60 mb-6">{featured.excerpt}</p>
                </div>
                <div className="flex items-center gap-4 text-xs opacity-40">
                  <span className="flex items-center gap-1"><Clock size={11} /> {featured.durationHours}h</span>
                  <span>{featured.modules.reduce((s, m) => s + m.lessons.length, 0)} lessons</span>
                  <span>By {featured.instructor}</span>
                </div>
              </div>
              <div className="lg:col-span-7 p-10 lg:p-14">
                <p className="eyebrow text-gold text-xs mb-4">What you will learn</p>
                <ul className="space-y-3 mb-8">
                  {featured.learningOutcomes.map(o => (
                    <li key={o} className="flex items-start gap-3 text-sm">
                      <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                      <span className="opacity-70">{o}</span>
                    </li>
                  ))}
                </ul>
                <span className="eyebrow text-xs text-burgundy flex items-center gap-2 group-hover:gap-3 transition-all">
                  Enroll free <ArrowUpRight size={12} />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* FILTER + GRID */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map(c => (
              <button key={c.value} onClick={() => setFilter(c.value)}
                className={`eyebrow px-5 py-2.5 transition-colors ${filter === c.value ? "bg-ink text-cream" : "border border-ink/15 text-ink/50 hover:text-ink hover:border-ink/40"}`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Course grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => {
              const CatIcon = categoryIcons[course.category] || BookOpen;
              const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
              return (
                <motion.div key={course.slug}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/academy/courses/${course.slug}`} className="group block border border-ink/10 hover:border-gold/40 transition-all h-full">
                    <div className="bg-ink text-cream p-7 relative overflow-hidden">
                      <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <CatIcon size={50} strokeWidth={0.8} />
                      </div>
                      <span className="eyebrow text-[10px] text-gold">{course.category.replace(/-/g, " ")}</span>
                      <h3 className="display text-xl mt-2 leading-snug group-hover:text-gold transition-colors pr-10">{course.title}</h3>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-sm opacity-70 mb-4 line-clamp-2 flex-1">{course.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs opacity-40 mb-4">
                        <span className="flex items-center gap-1"><Clock size={11} /> {course.durationHours}h</span>
                        <span>{totalLessons} lessons</span>
                        <span className="capitalize">{course.level}</span>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-ink/5">
                        <span className="text-xs opacity-50">{course.instructor}</span>
                        <span className="eyebrow text-xs text-burgundy flex items-center gap-1 group-hover:gap-2 transition-all">
                          Enroll <ArrowUpRight size={11} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {courses.length === 0 && (
            <div className="text-center py-16 opacity-50">
              <p className="display text-2xl mb-2">No courses in this category yet.</p>
              <button onClick={() => setFilter("all")} className="eyebrow text-burgundy link-underline">Show all courses</button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-ink text-cream">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 text-center">
          <p className="display-italic text-xl text-gold mb-4">Pretty Girl, Save Yourself.</p>
          <h2 className="display text-4xl lg:text-5xl mb-6">Ready to start <span className="display-italic text-gold">learning?</span></h2>
          <p className="body-prose opacity-60 max-w-md mx-auto mb-8">Create your free account in 30 seconds and enroll in your first course.</p>
          <Link href="/portal/register" className="inline-flex items-center gap-3 bg-gold text-ink px-8 py-5 hover:bg-cream transition-colors group">
            <span className="eyebrow">Create Free Account</span>
            <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
