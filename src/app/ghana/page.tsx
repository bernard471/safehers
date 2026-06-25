import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ghana — SafeHer Foundation",
  description:
    "SafeHer Foundation was founded in Accra, Ghana. We partner with Ghanaian universities, corporations, and government to deliver safety education rooted in the local context.",
  openGraph: {
    title: "SafeHer Foundation — Ghana",
    description:
      "Women's safety education rooted in Ghana — in the classroom, the workplace, and online.",
  },
};

const targetPartners = [
  "University of Ghana, Legon",
  "Ashesi University",
  "Ghana Institute of Management & Public Administration",
  "Kwame Nkrumah University of Science & Technology",
  "Ghana National Commission on Civic Education",
  "Absa Bank Ghana",
  "Standard Chartered Ghana",
  "Vodafone Ghana Foundation",
];

const testimonials = [
  {
    quote:
      "Before SafeHers, I did not know I could report online harassment to NCCE. Now I know my rights and I know who to call.",
    name: "Abena K.",
    role: "Final year student, University of Ghana",
  },
  {
    quote:
      "The mobile money fraud module was exactly what our female agents needed. It is practical, it is local, it works.",
    name: "Kofi M.",
    role: "Branch Manager, Accra",
  },
  {
    quote:
      "We brought SafeHers to our East Legon campus and the feedback from students has been remarkable. It sparked conversations we had never been able to start.",
    name: "Dr. Ama O.",
    role: "Student Affairs Director",
  },
];

export default function GhanaPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 lg:pt-48 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
            <span className="inline-block w-8 h-px bg-gold" />
            Ghana &middot; West Africa
          </p>
          <h1 className="display text-[clamp(3rem,8vw,7rem)] font-light max-w-[1000px] leading-[1.02]">
            Safety education,
            <br />
            <span className="display-italic text-gold">rooted in Ghana.</span>
          </h1>
          <p className="body-prose mt-8 max-w-2xl opacity-70 text-lg">
            SafeHer Foundation was born in Accra. Our curriculum is designed
            around the realities facing Ghanaian women — from Accra&apos;s
            digital economy to university campuses across the country.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="bg-gold text-ink px-8 py-4 eyebrow hover:bg-cream transition-colors"
            >
              Partner with us in Ghana
            </Link>
            <Link
              href="/resources"
              className="border border-cream/30 text-cream px-8 py-4 eyebrow hover:border-cream/70 transition-colors"
            >
              Free resources
            </Link>
          </div>
        </div>
      </section>

      <div className="gold-rule" />

      {/* LOCAL CONTEXT */}
      <section className="py-24 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
                <span className="inline-block w-8 h-px bg-gold" />
                Why Ghana
              </p>
              <h2 className="display text-[clamp(2rem,5vw,4rem)] font-light mb-8">
                Context matters.
              </h2>
              <div className="space-y-5 body-prose text-ink/75">
                <p>
                  Ghana has seen a dramatic rise in mobile money fraud, online
                  sextortion, and workplace harassment as digital adoption
                  accelerates. Yet most safety resources are imported from
                  Western contexts and miss the nuances that matter.
                </p>
                <p>
                  SafeHer Foundation was built from the ground up in Ghana — by
                  Ghanaian women, for Ghanaian women. We reference local laws
                  (the Domestic Violence Act, the Data Protection Act), local
                  platforms (MTN Mobile Money, Vodafone Cash), and local
                  institutions (DOVVSU, NCCE, GhanaPolice) so that our
                  content is immediately actionable.
                </p>
                <p>
                  Our Accra-based team provides in-person delivery, while our
                  digital resources extend our reach to Kumasi, Tamale, Takoradi,
                  and beyond.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="eyebrow text-gold mb-4">Phase One Targets (2025–2027)</p>
              {[
                { label: "Target partner universities", value: "12+" },
                { label: "Planned workshop participants", value: "3,000+" },
                { label: "Targeted certified educators in Ghana", value: "50+" },
                { label: "Target districts", value: "8" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b border-ink/15 pb-4"
                >
                  <span className="eyebrow opacity-60">{label}</span>
                  <span className="display text-3xl font-light">{value}</span>
                </div>
              ))}
              <p className="text-xs opacity-40 mt-2">
                These are planned rollout metrics for our Ghana Phase One
                programme. Verified outcomes will be published in our annual
                reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TARGET PARTNERS */}
      <section className="py-24 bg-bone">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-12 flex items-center gap-3 text-gold">
            <span className="inline-block w-8 h-px bg-gold" />
            Target Institutional Partners
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {targetPartners.map((p) => (
              <div
                key={p}
                className="border border-ink/15 px-5 py-4 body-prose text-sm text-ink/70 hover:border-ink/40 transition-colors"
              >
                {p}
              </div>
            ))}
          </div>
          <p className="text-xs opacity-40 mt-4">
            Institutional partnerships are in development. Confirmed partners
            will be listed on our{" "}
            <Link href="/partners" className="link-underline">
              partners page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-12 flex items-center gap-3 text-gold">
            <span className="inline-block w-8 h-px bg-gold" />
            Early Voices from Ghana
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <blockquote key={t.name} className="border-t-2 border-gold pt-6">
                <p className="body-prose text-ink/80 mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer>
                  <p className="eyebrow text-ink">{t.name}</p>
                  <p className="text-sm text-ink/50 mt-1">{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-24 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <p className="eyebrow text-gold mb-4">Based in East Legon, Accra</p>
          <h2 className="display text-[clamp(2rem,6vw,5rem)] font-light mb-6">
            Let&apos;s work together.
          </h2>
          <p className="body-prose opacity-75 max-w-xl mx-auto mb-10">
            Whether you are a university, a corporation, or a government
            agency — if you are in Ghana and you care about women&apos;s safety,
            we want to hear from you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-gold text-ink px-8 py-4 eyebrow hover:bg-cream transition-colors"
            >
              Get in touch
            </Link>
            <a
              href="mailto:ghana@safehers.africa"
              className="border border-cream/30 text-cream px-8 py-4 eyebrow hover:border-cream/70 transition-colors"
            >
              ghana@safehers.africa
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
