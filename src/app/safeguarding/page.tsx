import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Safeguarding Policy — SafeHer Foundation",
  description:
    "SafeHer Foundation's safeguarding policy protects every participant in our programmes, especially minors and vulnerable adults.",
};

export default function SafeguardingPage() {
  return (
    <>
      <section className="pt-40 pb-24 lg:pt-48 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
            <span className="inline-block w-8 h-px bg-gold" />
            Safeguarding
          </p>
          <h1 className="display text-[clamp(3rem,8vw,7rem)] font-light max-w-[1000px] mb-8">
            Protecting<br />
            <span className="display-italic text-gold">every participant.</span>
          </h1>
          <p className="body-prose max-w-2xl opacity-70">
            SafeHer Foundation is committed to the safety and wellbeing of
            every person involved in our programmes. Our safeguarding framework
            ensures that the highest standards of protection are upheld.
          </p>
        </div>
      </section>
      <div className="gold-rule" />

      <section className="pb-32">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          <div className="space-y-12 body-prose">
            <div>
              <h2 className="display text-3xl mb-4">Our Commitment</h2>
              <p>
                All SafeHer Foundation programmes are designed with participant
                safety as the first priority. We recognise that the women and
                girls we serve may be in vulnerable situations, and we take our
                duty of care seriously.
              </p>
            </div>

            <div>
              <h2 className="display text-3xl mb-4">Key Principles</h2>
              <ul className="space-y-3 list-none">
                {[
                  "Zero tolerance for abuse, exploitation, or harassment of any kind.",
                  "All facilitators and educators undergo safeguarding training and background checks.",
                  "Confidential reporting channels for any safeguarding concerns.",
                  "Regular review and update of safeguarding policies and procedures.",
                  "Compliance with Ghana's Children's Act, Domestic Violence Act, and international best practice.",
                  "Data protection and privacy upheld in all participant interactions.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-gold mt-1 shrink-0">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="display text-3xl mb-4">Reporting a Concern</h2>
              <p>
                If you have a safeguarding concern related to any SafeHer
                Foundation programme, please contact us immediately at{" "}
                <a
                  href="mailto:safeguarding@safehers.africa"
                  className="link-underline text-burgundy"
                >
                  safeguarding@safehers.africa
                </a>
                . All reports are treated confidentially and investigated
                promptly.
              </p>
            </div>

            <div>
              <h2 className="display text-3xl mb-4">For Partners &amp; Donors</h2>
              <p>
                Our full safeguarding policy document is available on request
                for all institutional partners and donors. We welcome scrutiny
                and encourage partners to review our safeguarding standards as
                part of their due diligence process.
              </p>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="eyebrow text-burgundy link-underline"
                >
                  Request our full safeguarding policy →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
