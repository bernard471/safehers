import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Training Packages — SafeHer Foundation",
  description:
    "Training packages, certification tiers, scholarships, and donor-funded seats for SafeHers safety educator programmes. Transparent investment, measurable impact.",
};

const tiers = [
  {
    id: "educator",
    name: "Educator Certification",
    tagline: "For individuals ready to teach",
    price: "$250–$450",
    priceNote: "One-time investment. Payment plans available.",
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
    cta: "Apply for Certification",
    ctaHref: "/contact",
    highlight: false,
  },
  {
    id: "institutional",
    name: "Institutional Licence",
    tagline: "For organisations deploying at scale",
    price: "$5,000–$25,000",
    priceNote: "Annual licence. Varies by organisation size.",
    audience: "Universities, corporations, hospitals, government bodies, NGOs",
    features: [
      "Full curriculum licence for the named organisation",
      "Train-the-Trainer workshop for up to 5 staff",
      "All facilitation materials and workbooks (print-ready)",
      "Annual curriculum update",
      "Programme evaluation framework and reporting templates",
      "Dedicated SafeHer Foundation implementation contact",
      "Optional: Founder keynote or launch event",
      "Logo on SafeHer Foundation partners page",
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
    priceNote: "One-time investment. Prerequisites apply.",
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

export default function ProgramSupportPage() {
  return (
    <>
      <section className="pt-40 pb-24 lg:pt-48 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
            <span className="inline-block w-8 h-px bg-gold" />
            Programme Investment
          </p>
          <h1 className="display text-[clamp(3rem,8vw,8rem)] font-light max-w-[900px] mb-6">
            Training{" "}
            <span className="display-italic text-gold">packages</span>
          </h1>
          <p className="body-prose max-w-2xl opacity-70">
            SafeHer Foundation believes safety education should be accessible.
            Certification fees sustain the programme and fund scholarships for
            women who could not otherwise participate. Every seat filled is an
            investment in community safety.
          </p>
        </div>
      </section>
      <div className="gold-rule" />

      {/* Comparison table */}
      <section className="pb-24">
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
                  <span className="eyebrow text-gold mb-4 text-xs">
                    Most Requested
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
                          tier.highlight ? "text-gold" : "text-gold"
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
                      ? "bg-gold text-ink hover:bg-cream"
                      : "border border-ink hover:bg-ink hover:text-cream"
                  }`}
                >
                  {tier.cta} <ArrowUpRight size={14} />
                </Link>
              </div>
            ))}
          </div>

          {/* Funding notes */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="border border-ink/15 p-8">
              <p className="eyebrow mb-3 text-gold">Scholarships</p>
              <p className="text-sm text-ink/70">
                SafeHer Foundation offers full and partial scholarships for
                Educator Certification for women from low-income backgrounds,
                particularly in sub-Saharan Africa. Applications open twice
                yearly. Funded by our donors and institutional partners.
              </p>
            </div>
            <div className="border border-ink/15 p-8">
              <p className="eyebrow mb-3 text-gold">Donor-Funded Seats</p>
              <p className="text-sm text-ink/70">
                Organisations and individual donors can sponsor certification
                seats for women who cannot afford the fee. Each sponsored seat
                trains one educator who will go on to reach dozens more.{" "}
                <Link href="/donate" className="link-underline text-burgundy">
                  Sponsor a seat →
                </Link>
              </p>
            </div>
            <div className="border border-ink/15 p-8">
              <p className="eyebrow mb-3 text-gold">Institutional Sponsorship</p>
              <p className="text-sm text-ink/70">
                Government ministries, development agencies, and corporate CSR
                programmes can fund entire cohorts. Contact us for a tailored
                sponsorship proposal with impact reporting included.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
