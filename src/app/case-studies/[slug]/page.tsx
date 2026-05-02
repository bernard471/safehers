import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  getAllCaseStudyMetas,
  getCaseStudyBySlug,
} from "@/lib/caseStudies";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const cases = getAllCaseStudyMetas();
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cs = await getCaseStudyBySlug(params.slug);
  if (!cs) return { title: "Case Study not found — SafeHers" };
  return {
    title: `${cs.title} — SafeHers Case Study`,
    description: cs.excerpt,
    openGraph: { title: cs.title, description: cs.excerpt, type: "article" },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const cs = await getCaseStudyBySlug(params.slug);
  if (!cs) notFound();

  const meta = [
    { label: "Sector", value: cs.sector },
    { label: "Country", value: cs.country },
    { label: "Duration", value: cs.duration },
    { label: "Participants", value: cs.participants.toLocaleString() },
    { label: "Client", value: cs.client },
  ];

  return (
    <>
      <div className="pt-32 pb-0">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Link
            href="/case-studies"
            className="eyebrow flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft size={14} /> All Case Studies
          </Link>
        </div>
      </div>

      <section className="pt-12 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="eyebrow text-burgundy mb-4">
              {cs.sector} ✦ {cs.country}
            </p>
            <h1 className="display text-[clamp(2.5rem,6vw,5rem)] font-light mb-8">
              {cs.title}
            </h1>
            <p className="body-prose text-ink/70 text-xl mb-12">{cs.excerpt}</p>

            {/* Meta strip */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 border border-ink/15 p-8 mb-0">
              {meta.map((m) => (
                <div key={m.label}>
                  <p className="eyebrow text-xs opacity-40 mb-1">{m.label}</p>
                  <p className="text-sm font-medium">{m.value}</p>
                </div>
              ))}
            </div>

            {/* Outcome callout */}
            <div className="bg-ink text-cream p-8 mb-0">
              <p className="eyebrow text-rose mb-2">Key Outcome</p>
              <p className="body-prose">{cs.outcome}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div
            className="max-w-3xl body-prose text-ink/85 prose-safehers"
            style={{ lineHeight: "1.8" }}
            dangerouslySetInnerHTML={{ __html: cs.content }}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-ink/15">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Bring SafeHers to your organisation</p>
            <p className="body-prose text-ink/70 mb-8">
              Ready to create impact like this? Get in touch to discuss how
              SafeHers can be tailored to your context and goals.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-ink text-cream px-8 py-3 eyebrow hover:bg-burgundy transition-colors"
            >
              Start the conversation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
