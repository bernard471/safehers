import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — SafeHer Foundation",
  description:
    "Terms governing use of the SafeHer Foundation website, intellectual property, liability disclaimers, and governing law.",
  openGraph: {
    title: "Terms of Service — SafeHer Foundation",
    description: "Terms governing use of the SafeHer Foundation website.",
  },
};

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    body: `By accessing or using safehers.africa (the "Site") you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy, which is incorporated herein by reference. If you do not agree, discontinue use immediately.

SafeHers reserves the right to modify these Terms at any time. Modifications take effect upon posting. Continued use after any change constitutes acceptance of the revised Terms.`,
  },
  {
    id: "services",
    title: "Description of Services",
    body: `SafeHers provides a safety education platform offering:

Informational content on personal safety, home safety, online safety, and related topics.
Certification programs for safety educators (Educator, Master Trainer, and Institutional tracks).
Downloadable resources, checklists, and guides.
A contact form and newsletter subscription service.
Institutional and corporate training programme information.

We reserve the right to modify, suspend, or discontinue any part of the Site or services at any time without notice.`,
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    body: `All content on this Site — including but not limited to text, graphics, curriculum materials, worksheets, checklists, blog posts, training modules, methodology frameworks, and the SafeHers brand identity — is the exclusive intellectual property of Zarinah Traci and SafeHers.

**© Zarinah Traci and SafeHers. All rights reserved.**

This includes the curriculum "30 Ways Pretty Girls Can Save Themselves," the SafeHers certification framework, and all derivative materials.

You may not copy, reproduce, distribute, transmit, sell, license, or exploit any content from the Site without prior written permission from SafeHers. Limited non-commercial personal use is permitted for individual reference only, provided all copyright notices are maintained.

Permissions requests: legal@safehers.africa`,
  },
  {
    id: "educational-disclaimer",
    title: "Educational Content Disclaimer",
    body: `IMPORTANT — PLEASE READ CAREFULLY.

The information, resources, and advice provided on this Site are for general educational and informational purposes only. They do not constitute professional legal advice, law enforcement guidance, medical advice, or emergency response protocols.

**SafeHers makes no guarantee, express or implied, that following the information, checklists, protocols, or recommendations on this Site will prevent harm, injury, crime, or any other adverse outcome.**

Personal safety is complex and context-dependent. SafeHers' curriculum provides awareness and frameworks, not definitive protection.

If you are in immediate danger, contact your local emergency services immediately. Do not rely solely on this Site for safety decisions in emergency situations.

By using this Site you acknowledge that SafeHers, Zarinah Traci, their partners, affiliates, officers, and employees bear no liability for any harm, loss, or damage arising from your reliance on information provided here.`,
  },
  {
    id: "user-conduct",
    title: "Acceptable Use",
    body: `You agree not to use the Site to:

Violate any applicable law or regulation.
Transmit harmful, hateful, defamatory, obscene, or fraudulent content.
Impersonate any person or entity or misrepresent your affiliation with SafeHers.
Attempt to gain unauthorised access to any part of the Site or its infrastructure.
Use automated tools (bots, scrapers, crawlers) to extract content without prior written permission.
Upload or transmit viruses, malware, or other malicious code.
Use the Site to solicit personal information from minors.
Reproduce, distribute, or commercialise any part of the curriculum or resources without a valid licence.

Violations may result in immediate termination of access and may be reported to relevant authorities.`,
  },
  {
    id: "certification",
    title: "Certification Terms",
    body: `SafeHers certification programmes are subject to separate Certification Agreements issued upon enrolment. Key terms:

Certificates are issued to named individuals and are non-transferable.
Use of the "SafeHers Certified" designation is subject to compliance with our Code of Conduct and continuing education requirements.
SafeHers reserves the right to revoke certification in cases of misrepresentation, misconduct, or material breach.
Institutional licences grant the right to deliver SafeHers curriculum within the named organisation only and do not confer ownership of intellectual property.`,
  },
  {
    id: "links",
    title: "Third-Party Links",
    body: `The Site may contain links to third-party websites for reference purposes. SafeHers does not endorse, control, or assume responsibility for the content, privacy practices, or policies of any third-party site. Access to linked sites is at your own risk.`,
  },
  {
    id: "disclaimer",
    title: "Disclaimer of Warranties",
    body: `THE SITE AND ALL CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.

We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.`,
  },
  {
    id: "limitation",
    title: "Limitation of Liability",
    body: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SAFEHERS, ZARINAH TRACI, DK CYBER, AND THEIR RESPECTIVE AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF, OR INABILITY TO USE, THE SITE OR ITS CONTENT.`,
  },
  {
    id: "governing-law",
    title: "Governing Law and Dispute Resolution",
    body: `These Terms are governed by the laws of the Republic of Ghana, without regard to conflict-of-law principles. The courts of Ghana shall have primary jurisdiction.

**US Arbitration Option:** For disputes involving US-based parties, either party may elect binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules. Proceedings shall be conducted in English, virtually or in Washington, D.C. Nothing here prevents either party from seeking injunctive relief in court to protect intellectual property rights.`,
  },
  {
    id: "contact",
    title: "Contact",
    body: `For questions regarding these Terms or permissions:

Email: legal@safehers.africa
Post: SafeHers, East Legon, Accra, Ghana

Response time: 5–10 business days.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="pt-40 pb-24 lg:pt-48">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-ink" />
            Legal
          </p>
          <h1 className="display text-[clamp(3rem,7vw,7rem)] font-light max-w-[900px] mb-6">
            Terms of{" "}
            <span className="display-italic text-burgundy">Service</span>
          </h1>
          <p className="body-prose text-ink/60 mb-2">
            Last updated: 2 May 2026 ✦ Effective: 2 May 2026
          </p>
          <p className="body-prose max-w-2xl mt-4">
            Please read these terms carefully before using the SafeHers
            platform. Using the site constitutes acceptance.
          </p>
        </div>
      </section>

      {/* Table of contents */}
      <section className="pb-8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="border border-ink/15 p-8 max-w-2xl">
            <p className="eyebrow mb-4">Contents</p>
            <ol className="space-y-1 text-sm">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="link-underline opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl space-y-16">
            {sections.map((s, i) => (
              <div key={s.id} id={s.id}>
                <div className="flex items-start gap-4 mb-6">
                  <span className="num-tag text-2xl text-ink/30 mt-1 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="display text-3xl font-light">{s.title}</h2>
                </div>
                <div className="body-prose text-ink/80 space-y-4 pl-10">
                  {s.body.split("\n\n").map((para, j) => (
                    <p
                      key={j}
                      dangerouslySetInnerHTML={{
                        __html: para
                          .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                          .replace(/\n/g, "<br />"),
                      }}
                    />
                  ))}
                </div>
                {i < sections.length - 1 && (
                  <div className="divider-rule mt-16" />
                )}
              </div>
            ))}
          </div>

          <div className="max-w-3xl mt-20 pt-10 border-t border-ink/15">
            <p className="text-sm text-ink/50">
              Questions about these terms?{" "}
              <Link href="/contact" className="link-underline text-ink">
                Contact us
              </Link>{" "}
              or email legal@safehers.africa.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
