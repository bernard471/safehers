import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Impact — SafeHer Foundation",
  description:
    "SafeHer Foundation's impact: programme outcomes, monitoring and evaluation, and our commitment to transparent, measurable results across Africa.",
};

export default function ImpactPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 lg:pt-48 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
            <span className="inline-block w-8 h-px bg-gold" />
            Impact &amp; Outcomes
          </p>
          <h1 className="display text-[clamp(3rem,8vw,7rem)] font-light max-w-[1000px] mb-8">
            Measured.<br />
            <span className="display-italic text-gold">Published. Accountable.</span>
          </h1>
          <p className="body-prose max-w-2xl opacity-70">
            SafeHer Foundation is committed to transparent, evidence-based
            impact reporting. Every programme is evaluated against clear
            outcomes, and results are shared openly with our donors, partners,
            and the communities we serve.
          </p>
        </div>
      </section>
      <div className="gold-rule" />

      {/* M&E FRAMEWORK */}
      <section className="py-24 bg-bone">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 text-gold">Monitoring &amp; Evaluation</p>
          <h2 className="display text-4xl lg:text-5xl mb-12">
            How we measure <span className="display-italic text-burgundy">impact.</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10">
            {[
              {
                step: "01",
                title: "Baseline Assessment",
                desc: "Pre-programme surveys measure knowledge, confidence, and safety practices before intervention.",
              },
              {
                step: "02",
                title: "Programme Delivery",
                desc: "Facilitator observations, attendance tracking, and real-time participant feedback during sessions.",
              },
              {
                step: "03",
                title: "Post-Programme Evaluation",
                desc: "Knowledge assessments and confidence surveys measure immediate learning outcomes.",
              },
              {
                step: "04",
                title: "Follow-Up Impact",
                desc: "3-month and 12-month follow-up surveys track sustained behaviour change and safety improvements.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-bone p-8 lg:p-10">
                <p className="num-tag text-5xl text-gold mb-6">{item.step}</p>
                <h3 className="display text-2xl mb-3">{item.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHASE ONE TARGETS */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 text-gold">Phase One Targets (2025–2027)</p>
          <h2 className="display text-4xl lg:text-5xl mb-12">
            What we are <span className="display-italic text-burgundy">building toward.</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "5,000+", label: "Women & girls reached through direct programmes" },
              { value: "100+", label: "Certified safety educators trained" },
              { value: "15+", label: "Institutional partnerships established" },
              { value: "4", label: "Countries with active SafeHers programmes" },
            ].map((stat) => (
              <div key={stat.label} className="border-t-2 border-gold pt-6">
                <p className="display text-5xl lg:text-6xl mb-3">{stat.value}</p>
                <p className="eyebrow text-xs opacity-60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT AREAS */}
      <section className="py-24 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 text-gold">What we measure</p>
          <h2 className="display text-4xl lg:text-5xl mb-12">
            Core impact <span className="display-italic text-gold">indicators.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-cream/10">
            {[
              {
                title: "Knowledge Gain",
                desc: "Percentage increase in safety knowledge scores between pre- and post-programme assessments.",
              },
              {
                title: "Behaviour Change",
                desc: "Adoption of safety practices (2FA setup, emergency contacts, financial planning) measured at 3-month follow-up.",
              },
              {
                title: "Confidence & Agency",
                desc: "Self-reported confidence in handling safety threats, measured on a standardised scale.",
              },
              {
                title: "Incident Reporting",
                desc: "Increase in willingness and ability to report safety incidents to appropriate authorities.",
              },
              {
                title: "Educator Multiplication",
                desc: "Number of additional women reached by each certified educator within 12 months of certification.",
              },
              {
                title: "Institutional Adoption",
                desc: "Organisations that embed SafeHers content into their ongoing policies and orientation programmes.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-ink p-8 lg:p-10">
                <h3 className="display text-xl mb-3 text-gold">{item.title}</h3>
                <p className="text-sm opacity-60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 text-center">
          <p className="eyebrow mb-6 text-gold">Reports &amp; Data</p>
          <h2 className="display text-5xl lg:text-6xl mb-8">
            Full transparency.<br />
            <span className="display-italic text-burgundy">Always.</span>
          </h2>
          <p className="body-prose max-w-xl mx-auto mb-10 opacity-70">
            Our annual reports, financial statements, and programme evaluations
            are published openly. If you are a donor or partner, we will provide
            detailed impact reports for your specific investment.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/reports"
              className="inline-flex items-center gap-3 bg-ink text-cream px-8 py-5 hover:bg-burgundy transition-colors group"
            >
              <span className="eyebrow">View Reports</span>
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-3 border border-ink px-8 py-5 hover:bg-ink hover:text-cream transition-colors group"
            >
              <span className="eyebrow">Case Studies</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
