import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllCaseStudyMetas } from "@/lib/caseStudies";

export const metadata: Metadata = {
  title: "Case Studies — SafeHers",
  description:
    "Real-world impact stories from SafeHers programmes across universities, hotels, and corporations in Africa.",
};

export default function CaseStudiesPage() {
  const cases = getAllCaseStudyMetas();

  return (
    <>
      <section className="pt-40 pb-24 lg:pt-48">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-ink" />
            Impact Stories
          </p>
          <h1 className="display text-[clamp(3rem,8vw,8rem)] font-light max-w-[900px]">
            Proof in{" "}
            <span className="display-italic text-burgundy">practice</span>
          </h1>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="space-y-px border-t border-b border-ink/15">
            {cases.map((c, i) => (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="group block"
              >
                <div className="grid lg:grid-cols-12 gap-8 py-12 border-b border-ink/10 last:border-0">
                  <div className="lg:col-span-1">
                    <span className="num-tag text-3xl text-ink/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="eyebrow text-burgundy mb-3">{c.sector} ✦ {c.country}</p>
                    <h2 className="display text-3xl font-light mb-4 group-hover:text-burgundy transition-colors">
                      {c.title}
                    </h2>
                    <p className="body-prose text-ink/60">{c.excerpt}</p>
                  </div>
                  <div className="lg:col-span-4 lg:col-start-8 space-y-3">
                    <div>
                      <p className="eyebrow text-xs opacity-40 mb-1">Outcome</p>
                      <p className="text-sm text-ink/70">{c.outcome}</p>
                    </div>
                    <div className="flex gap-8">
                      <div>
                        <p className="eyebrow text-xs opacity-40 mb-1">Participants</p>
                        <p className="display text-2xl">{c.participants.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="eyebrow text-xs opacity-40 mb-1">Duration</p>
                        <p className="text-sm text-ink/70">{c.duration}</p>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-1 flex items-center justify-end">
                    <ArrowUpRight
                      size={24}
                      className="text-ink/30 group-hover:text-burgundy transition-colors"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
