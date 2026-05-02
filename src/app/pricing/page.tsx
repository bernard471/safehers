import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Certification Pricing — SafeHers",
  description:
    "Transparent pricing for SafeHers Educator Certification, Master Trainer Certification, and Institutional Licences.",
};

const tiers = [
  {
    id: "educator",
    name: "Educator",
    tagline: "For individuals ready to teach",
    price: "$250–$450",
    priceNote: "One-time payment. Payment plans available.",
    audience: "Community educators, teachers, NGO staff, HR professionals",
    features: [
      "Complete SafeHers Educator curriculum licence",
      "Facilitation guide and slide decks",
      "Participant workbooks (digital)",
      "Online certification exam",
      "SafeHers Certified Educator badge and certificate",
      "2-year certification with renewal pathway",
      "Access to the SafeHers Educator community",
    ],
    cta: "Apply for Educator Certification",
    ctaHref: "/contact",
    highlight: false,
  },
  {
    id: "institutional",
    name: "Institutional",
    tagline: "For organisations deploying at scale",
    price: "$5,000–$25,000",
    priceNote: "Annual licence. Pricing varies by organisation size.",
    audience: "Universities, corporations, hospitals, government bodies, NGOs",
    features: [
      "Full curriculum licence for the named organisation",
      "Train-the-Trainer workshop for up to 5 staff",
      "All facilitation materials and workbooks (print-ready)",
      "Annual curriculum update",
      "Programme evaluation framework and reporting templates",
      "Dedicated SafeHers implementation contact",
      "Optional: Founder keynote or launch event",
      "Logo on SafeHers partners page",
    ],
    cta: "Request a Quote",
    ctaHref: "/contact",
    highlight: true,
  },
  {
    id: "master-trainer",
    name: "Master Trainer",
    tagline: "For experienced facilitators who train other educators",
    price: "$1,500–$3,000",
    priceNote: "One-time payment. Prerequisites apply.",
    audience: "Experienced Educators seeking to train others",
    features: [
      "All Educator tier benefits",
      "Master Trainer curriculum extension modules",
      "Trainer-of-Trainers facilitation guide",
      "Authority to certify Educators under SafeHers",
      "Priority access to new curriculum releases",
      "Quarterly Master Trainer briefings",
      "Co-branded workshop materials available",
    ],
    cta: "Apply for Master Trainer",
    ctaHref: "/contact",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="pt-40 pb-24 lg:pt-48">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-ink" />
            Certification
          </p>
          <h1 className="display text-[clamp(3rem,8vw,8rem)] font-light max-w-[900px] mb-6">
            Transparent{" "}
            <span className="display-italic text-burgundy">pricing</span>
          </h1>
          <p className="body-prose max-w-2xl text-ink/70">
            We believe safety education should be accessible. All tiers include
            everything you need to deliver impactful training. Scholarships and
            bursaries are available — see our{" "}
            <Link href="/faq" className="link-underline">
              FAQ
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-px bg-ink/15 border border-ink/15">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`p-10 lg:p-12 flex flex-col ${
                  tier.highlight ? "bg-ink text-cream" : "bg-cream"
                }`}
              >
                {tier.highlight && (
                  <span className="eyebrow text-rose mb-4 text-xs">
                    Most Popular
                  </span>
                )}
                <p
                  className={`eyebrow mb-2 text-xs ${
                    tier.highlight ? "text-cream/50" : "text-ink/50"
                  }`}
                >
                  {tier.name}
                </p>
                <h2 className="display text-4xl font-light mb-2">
                  {tier.price}
                </h2>
                <p
                  className={`text-xs mb-2 ${
                    tier.highlight ? "text-cream/50" : "text-ink/40"
                  }`}
                >
                  {tier.priceNote}
                </p>
                <p
                  className={`text-sm mb-8 ${
                    tier.highlight ? "opacity-70" : "text-ink/60"
                  }`}
                >
                  {tier.tagline}
                </p>
                <div
                  className={`h-px mb-8 ${
                    tier.highlight ? "bg-cream/15" : "bg-ink/15"
                  }`}
                />
                <p
                  className={`eyebrow text-xs mb-4 ${
                    tier.highlight ? "text-cream/40" : "text-ink/40"
                  }`}
                >
                  Best for
                </p>
                <p
                  className={`text-sm mb-8 ${
                    tier.highlight ? "opacity-70" : "text-ink/60"
                  }`}
                >
                  {tier.audience}
                </p>
                <div
                  className={`h-px mb-8 ${
                    tier.highlight ? "bg-cream/15" : "bg-ink/15"
                  }`}
                />
                <ul className="space-y-3 flex-1 mb-10">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span
                        className={`mt-1 shrink-0 text-lg leading-none ${
                          tier.highlight ? "text-rose" : "text-burgundy"
                        }`}
                      >
                        ✦
                      </span>
                      <span className={tier.highlight ? "opacity-80" : "text-ink/70"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.ctaHref}
                  className={`flex items-center justify-center gap-2 py-3 eyebrow transition-colors ${
                    tier.highlight
                      ? "bg-rose text-ink hover:bg-cream"
                      : "border border-ink hover:bg-ink hover:text-cream"
                  }`}
                >
                  {tier.cta} <ArrowUpRight size={14} />
                </Link>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-3xl">
            <div className="border border-ink/15 p-8">
              <p className="eyebrow mb-3">Scholarships</p>
              <p className="text-sm text-ink/70">
                We offer limited full and partial scholarships for Educator
                Certification for women from low-income backgrounds,
                particularly in sub-Saharan Africa. Applications open twice
                yearly.
              </p>
            </div>
            <div className="border border-ink/15 p-8">
              <p className="eyebrow mb-3">Currency & Payment Plans</p>
              <p className="text-sm text-ink/70">
                African residents may be eligible for local currency pricing.
                Payment plans are available for Educator and Master Trainer
                tiers. Contact us to discuss your situation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
