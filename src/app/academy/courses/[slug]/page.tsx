"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  ArrowUpRight, Clock, BarChart, BookOpen, CheckCircle,
  ChevronDown, Award, Shield, MessageSquare, FileText,
} from "lucide-react";
import { SAMPLE_COURSES } from "@/lib/sample-courses";

const instructorBios: Record<string, { bio: string; title: string }> = {
  "Zarinah Knows": {
    title: "Co-Founder & Executive Director, SafeHer Foundation",
    bio: "Author of 30 Ways Pretty Girls Can Save Themselves. Twenty-plus years in national security, privacy, law, and international trade. Harvard Kennedy School graduate.",
  },
  "DK Cyber": {
    title: "Co-Founder & Director of Operations, SafeHer Foundation",
    bio: "Ghanaian cybersecurity professional. Expert in account security, mobile fraud, social engineering, and digital safety architecture for African contexts.",
  },
  "SafeHer Foundation": {
    title: "SafeHer Foundation Curriculum Team",
    bio: "Developed by the SafeHer Foundation team, combining expertise in personal safety, cybersecurity, financial literacy, and women's education across Africa.",
  },
};

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const course = SAMPLE_COURSES.find((c) => c.slug === slug);
  const [expandedModule, setExpandedModule] = useState<number>(0);

  const { data: session, status } = useSession();
  const [dbCourseId, setDbCourseId] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
  const [loadingEnrollment, setLoadingEnrollment] = useState<boolean>(true);
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/academy/courses")
      .then((r) => r.json())
      .then((data) => {
        const dbCourse = data.courses?.find((c: any) => c.slug === slug);
        if (dbCourse) {
          setDbCourseId(dbCourse._id);
        }
      })
      .catch((err) => console.error("Error fetching courses:", err));
  }, [slug]);

  useEffect(() => {
    if (status === "authenticated") {
      setLoadingEnrollment(true);
      fetch("/api/portal/courses")
        .then((r) => r.json())
        .then((data) => {
          const enrolled = data.enrollments?.some(
            (e: any) => e.course?.slug === slug
          );
          setIsEnrolled(!!enrolled);
          setLoadingEnrollment(false);
        })
        .catch((err) => {
          console.error("Error checking enrollment:", err);
          setLoadingEnrollment(false);
        });
    } else {
      setLoadingEnrollment(false);
    }
  }, [status, slug]);

  const handleEnroll = async () => {
    if (!dbCourseId) {
      setError("Course ID not found. Please try again.");
      return;
    }
    setEnrolling(true);
    setError("");
    try {
      const res = await fetch("/api/portal/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId: dbCourseId }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setIsEnrolled(true);
      } else {
        setError(data.error || "Failed to enroll. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setEnrolling(false);
    }
  };

  if (!course) { notFound(); return null; }

  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const totalQuizzes = course.modules.reduce(
    (sum, m) => sum + m.lessons.filter(l => l.type === "quiz" || l.quizQuestions.length > 0).length, 0
  );
  const instructor = instructorBios[course.instructor] || instructorBios["SafeHer Foundation"];
  const relatedCourses = SAMPLE_COURSES.filter(c => c.slug !== course.slug && c.isPublished).slice(0, 2);

  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 lg:pt-48 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/academy" className="eyebrow text-cream/40 hover:text-cream transition-colors">Academy</Link>
            <span className="text-cream/20">/</span>
            <Link href="/academy/courses" className="eyebrow text-cream/40 hover:text-cream transition-colors">Courses</Link>
            <span className="text-cream/20">/</span>
            <span className="eyebrow text-gold capitalize">{course.category.replace(/-/g, " ")}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="display text-[clamp(2.2rem,5vw,4rem)] font-light mb-6"
              >
                {course.title}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="body-prose max-w-2xl opacity-70 text-lg mb-8"
              >
                {course.excerpt}
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center gap-6 text-sm opacity-50 mb-10"
              >
                <span className="flex items-center gap-2"><Clock size={15} /> {course.durationHours} hours</span>
                <span className="flex items-center gap-2"><BarChart size={15} /> {course.level}</span>
                <span className="flex items-center gap-2"><BookOpen size={15} /> {totalLessons} lessons</span>
                <span className="flex items-center gap-2"><FileText size={15} /> {course.modules.length} modules</span>
                {totalQuizzes > 0 && <span className="flex items-center gap-2">{totalQuizzes} quizzes</span>}
                <span className="eyebrow text-gold opacity-100">Free</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                {status === "loading" || (status === "authenticated" && loadingEnrollment) ? (
                  <button disabled className="inline-flex items-center gap-3 bg-gold/50 text-ink px-8 py-5 cursor-not-allowed">
                    <span className="eyebrow">Checking enrollment...</span>
                  </button>
                ) : isEnrolled ? (
                  <Link href="/portal/my-courses" className="inline-flex items-center gap-3 bg-burgundy text-cream px-8 py-5 hover:bg-ink transition-colors group">
                    <span className="eyebrow">You are enrolled — Go to Portal</span>
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                ) : status === "authenticated" ? (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleEnroll}
                      disabled={enrolling}
                      className="inline-flex items-center gap-3 bg-gold text-ink px-8 py-5 hover:bg-cream transition-colors group disabled:opacity-50"
                    >
                      <span className="eyebrow">{enrolling ? "Enrolling..." : "Enroll Now — Free"}</span>
                      {!enrolling && <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />}
                    </button>
                    {error && <p className="text-xs text-burgundy mt-1">{error}</p>}
                    {success && <p className="text-xs text-gold mt-1">Successfully enrolled!</p>}
                  </div>
                ) : (
                  <>
                    <Link href={`/portal/register?callbackUrl=/academy/courses/${slug}`} className="inline-flex items-center gap-3 bg-gold text-ink px-8 py-5 hover:bg-cream transition-colors group">
                      <span className="eyebrow">Enroll Now — Free</span>
                      <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
                    </Link>
                    <Link href={`/portal/login?callbackUrl=/academy/courses/${slug}`} className="inline-flex items-center gap-3 border border-cream/30 px-8 py-5 hover:bg-cream/10 transition-colors">
                      <span className="eyebrow">Log in to continue</span>
                    </Link>
                  </>
                )}
              </motion.div>
            </div>

            {/* Quick stats card */}
            <div className="lg:col-span-4">
              <div className="border border-cream/10 bg-cream/5 p-8">
                <p className="eyebrow text-gold text-xs mb-6">Course includes</p>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-center gap-3 opacity-70"><BookOpen size={16} className="text-gold" /> {totalLessons} practical lessons</li>
                  {totalQuizzes > 0 && <li className="flex items-center gap-3 opacity-70"><FileText size={16} className="text-gold" /> {totalQuizzes} knowledge quizzes</li>}
                  <li className="flex items-center gap-3 opacity-70"><Shield size={16} className="text-gold" /> Practical safety tasks</li>
                  <li className="flex items-center gap-3 opacity-70"><Award size={16} className="text-gold" /> Verified certificate</li>
                  <li className="flex items-center gap-3 opacity-70"><Clock size={16} className="text-gold" /> Self-paced, no deadlines</li>
                  <li className="flex items-center gap-3 opacity-70"><MessageSquare size={16} className="text-gold" /> Consultation access</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="gold-rule" />

      {/* MAIN CONTENT */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Left: Course content */}
            <div className="lg:col-span-7">
              {/* About */}
              <div className="mb-16">
                <p className="eyebrow mb-4 text-gold">About this course</p>
                <p className="body-prose text-lg opacity-80 whitespace-pre-line">{course.description}</p>
              </div>

              {/* Instructor */}
              <div className="mb-16 border border-ink/10 bg-bone p-8">
                <p className="eyebrow mb-4 text-gold">Your instructor</p>
                <h3 className="display text-2xl mb-2">{course.instructor}</h3>
                <p className="eyebrow text-xs opacity-40 mb-4">{instructor.title}</p>
                <p className="text-sm opacity-70 leading-relaxed">{instructor.bio}</p>
              </div>

              {/* Curriculum — expandable modules */}
              <div className="mb-16">
                <p className="eyebrow mb-4 text-gold">Curriculum</p>
                <p className="text-sm opacity-50 mb-8">{course.modules.length} modules · {totalLessons} lessons · {course.durationHours} hours total</p>
                <div className="space-y-3">
                  {course.modules.map((mod, mi) => {
                    const isOpen = expandedModule === mi;
                    return (
                      <div key={mod.slug} className="border border-ink/10 overflow-hidden">
                        <button
                          onClick={() => setExpandedModule(isOpen ? -1 : mi)}
                          className="w-full bg-bone p-5 flex items-center justify-between text-left hover:bg-ink/5 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <span className="num-tag text-2xl text-gold">{String(mi + 1).padStart(2, "0")}</span>
                            <div>
                              <h3 className="display text-lg">{mod.title}</h3>
                              <p className="text-xs opacity-40 mt-0.5">{mod.lessons.length} lessons</p>
                            </div>
                          </div>
                          <ChevronDown size={18} className={`opacity-40 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="bg-cream">
                            {mod.description && (
                              <p className="px-5 pt-4 pb-2 text-sm opacity-50">{mod.description}</p>
                            )}
                            <div className="divide-y divide-ink/5">
                              {mod.lessons.map((lesson, li) => (
                                <div key={lesson.slug} className="px-5 py-3.5 flex items-center justify-between text-sm">
                                  <span className="flex items-center gap-3">
                                    <span className="text-gold opacity-40 text-xs w-8">{mi + 1}.{li + 1}</span>
                                    <span className={lesson.type === "quiz" ? "font-medium" : ""}>{lesson.title}</span>
                                    {lesson.type === "quiz" && <span className="eyebrow text-[9px] bg-burgundy/10 text-burgundy px-1.5 py-0.5 ml-1">Quiz</span>}
                                    {lesson.type === "activity" && <span className="eyebrow text-[9px] bg-gold/10 text-gold px-1.5 py-0.5 ml-1">Task</span>}
                                    {lesson.type === "video" && <span className="eyebrow text-[9px] bg-ink/5 px-1.5 py-0.5 ml-1">Video</span>}
                                  </span>
                                  <span className="opacity-30 text-xs">{lesson.durationMinutes} min</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Sticky sidebar */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-6">
                {/* Enrollment CTA */}
                <div className="border-2 border-gold/30 bg-cream p-8 text-center">
                  <p className="display-italic text-lg text-burgundy mb-2">Pretty Girl, Save Yourself.</p>
                  <h3 className="display text-2xl mb-4">{isEnrolled ? "Enrolled" : "Enroll for free"}</h3>
                  <p className="text-sm opacity-60 mb-6">{isEnrolled ? "Access your learning materials in your portal." : "No credit card. No hidden fees. Start learning now."}</p>
                  {status === "loading" || (status === "authenticated" && loadingEnrollment) ? (
                    <button disabled className="w-full bg-ink/50 text-cream py-4 eyebrow cursor-not-allowed">
                      Checking status...
                    </button>
                  ) : isEnrolled ? (
                    <Link href="/portal/my-courses" className="block bg-burgundy text-cream py-4 eyebrow hover:bg-ink transition-colors text-center">
                      Go to Course Portal
                    </Link>
                  ) : status === "authenticated" ? (
                    <div className="space-y-3">
                      <button
                        onClick={handleEnroll}
                        disabled={enrolling}
                        className="w-full bg-ink text-cream py-4 eyebrow hover:bg-burgundy transition-colors disabled:opacity-50"
                      >
                        {enrolling ? "Enrolling..." : "Enroll Now — Free"}
                      </button>
                      {error && <p className="text-xs text-burgundy text-center">{error}</p>}
                      {success && <p className="text-xs text-gold text-center">Enrolled successfully!</p>}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link href={`/portal/register?callbackUrl=/academy/courses/${slug}`} className="block bg-ink text-cream py-4 eyebrow hover:bg-burgundy transition-colors text-center">
                        Create Account & Enroll
                      </Link>
                      <Link href={`/portal/login?callbackUrl=/academy/courses/${slug}`} className="block border border-ink/20 py-3 eyebrow text-xs opacity-60 hover:opacity-100 transition-opacity text-center">
                        Already enrolled? Log in
                      </Link>
                    </div>
                  )}
                </div>

                {/* Learning outcomes */}
                <div className="border border-ink/10 bg-bone p-8">
                  <p className="eyebrow mb-4 text-gold text-xs">What you will learn</p>
                  <ul className="space-y-3">
                    {course.learningOutcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-3 text-sm">
                        <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                        <span className="opacity-70">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Certificate info */}
                <div className="border border-ink/10 bg-cream p-8">
                  <Award size={24} className="text-gold mb-4" />
                  <p className="eyebrow text-xs text-gold mb-2">Certificate</p>
                  <p className="text-sm opacity-70">Complete all lessons and quizzes to earn a verifiable SafeHer Foundation certificate with a unique ID.</p>
                </div>

                {/* Safety disclaimer */}
                <div className="border border-ink/10 bg-bone p-6">
                  <p className="text-xs opacity-40">SafeHer Academy courses are educational. Content may reference sensitive topics. If you are in immediate danger, contact local emergency services.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED COURSES */}
      {relatedCourses.length > 0 && (
        <section className="py-24 bg-bone">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <p className="eyebrow mb-4 text-gold">Continue learning</p>
            <h2 className="display text-3xl lg:text-4xl mb-12">More <span className="display-italic text-burgundy">courses.</span></h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedCourses.map(rc => (
                <Link key={rc.slug} href={`/academy/courses/${rc.slug}`} className="group border border-ink/10 bg-cream hover:border-gold/30 transition-colors">
                  <div className="p-8">
                    <span className="eyebrow text-[10px] text-gold capitalize">{rc.category.replace(/-/g, " ")}</span>
                    <h3 className="display text-xl mt-2 mb-3 group-hover:text-burgundy transition-colors">{rc.title}</h3>
                    <p className="text-sm opacity-60 mb-4 line-clamp-2">{rc.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs opacity-40">
                      <span>{rc.durationHours}h</span>
                      <span>{rc.instructor}</span>
                      <span className="eyebrow text-gold opacity-100">Free</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONSULTATION CTA */}
      <section className="py-16 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <MessageSquare size={24} strokeWidth={1.2} className="text-gold mb-4" />
              <h3 className="display text-2xl lg:text-3xl mb-3">Need personal support?</h3>
              <p className="body-prose opacity-50 text-sm">Book a confidential consultation with a SafeHer Foundation specialist.</p>
            </div>
            <div className="flex justify-start lg:justify-end">
              <Link href="/consultation/book" className="bg-gold text-ink px-7 py-4 inline-flex items-center gap-3 group hover:bg-cream transition-colors">
                <span className="eyebrow">Book Consultation</span>
                <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
