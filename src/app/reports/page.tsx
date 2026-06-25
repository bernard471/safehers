import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Annual Reports — SafeHer Foundation",
  description:
    "SafeHer Foundation annual reports, financial statements, and programme evaluations. Full transparency for donors, partners, and the public.",
};

export default function ReportsPage() {
  return (
    <>
      <section className="pt-40 pb-24 lg:pt-48 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
            <span className="inline-block w-8 h-px bg-gold" />
            Reports &amp; Publications
          </p>
          <h1 className="display text-[clamp(3rem,8vw,7rem)] font-light max-w-[1000px] mb-8">
            Full<br />
            <span className="display-italic text-gold">transparency.</span>
          </h1>
          <p className="body-prose max-w-2xl opacity-70">
            SafeHer Foundation publishes annual reports, financial statements,
            and programme evaluations for public review. We believe
            accountability is the foundation of donor trust.
          </p>
        </div>
      </section>
      <div className="gold-rule" />

      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Upcoming Reports */}
          <div className="mb-24">
            <p className="eyebrow mb-6 text-gold">Annual Reports</p>
            <div className="border border-ink/15 p-10 bg-bone">
              <h2 className="display text-3xl mb-4">2025–2026 Annual Report</h2>
              <p className="body-prose opacity-70 mb-4">
                Our inaugural annual report is in preparation and will cover
                the foundation&apos;s first full year of operations, including
                programme outcomes, financial summary, and strategic priorities
                for the year ahead.
              </p>
              <p className="eyebrow text-xs opacity-40">
                Expected publication: Q3 2026
              </p>
            </div>
          </div>

          {/* Report types */}
          <div>
            <p className="eyebrow mb-6 text-gold">What We Publish</p>
            <h2 className="display text-4xl mb-12">
              Documents available <span className="display-italic text-burgundy">openly.</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10">
              {[
                {
                  title: "Annual Report",
                  desc: "Programme outcomes, strategic highlights, financial summary, and year-ahead priorities.",
                  frequency: "Annually",
                },
                {
                  title: "Financial Statements",
                  desc: "Audited financial statements prepared by an independent auditor.",
                  frequency: "Annually",
                },
                {
                  title: "Programme Evaluations",
                  desc: "Detailed impact evaluations for major programmes, including methodology and findings.",
                  frequency: "Per programme",
                },
                {
                  title: "Safeguarding Report",
                  desc: "Summary of safeguarding reviews, training completed, and policy updates.",
                  frequency: "Annually",
                },
                {
                  title: "Donor Impact Reports",
                  desc: "Custom reports for major donors showing exactly how their investment was used.",
                  frequency: "Per donor cycle",
                },
                {
                  title: "Strategic Plan",
                  desc: "Multi-year strategic plan outlining growth targets, new markets, and programme development.",
                  frequency: "Every 3 years",
                },
              ].map((item) => (
                <div key={item.title} className="bg-cream p-8">
                  <h3 className="display text-xl mb-2">{item.title}</h3>
                  <p className="eyebrow text-xs text-gold mb-3">{item.frequency}</p>
                  <p className="text-sm opacity-70 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 border border-ink/15 p-8">
            <p className="body-prose opacity-70">
              To request a copy of any published report or to discuss custom
              donor reporting, please{" "}
              <Link href="/contact" className="link-underline text-burgundy">
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
