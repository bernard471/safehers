import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — SafeHers",
  description:
    "How SafeHers collects, stores, and protects your personal data, and your rights under Ghana's Data Protection Act 2012 and the GDPR.",
  openGraph: {
    title: "Privacy Policy — SafeHers",
    description: "Your data rights and how SafeHers handles personal information.",
  },
};

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    body: `SafeHers ("we", "us", "our") is committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how we collect, use, store, and share information when you visit safehers.africa, complete our contact form, subscribe to our newsletter, or download resources from our library.

This policy is governed primarily by Ghana's Data Protection Act, 2012 (Act 843). Where visitors are located in the European Economic Area (EEA) or United Kingdom, we additionally comply with the General Data Protection Regulation (GDPR) and UK GDPR. References to "data controller" in this document mean SafeHers.

Please read this policy carefully. By using our website you acknowledge you have read and understood its terms.`,
  },
  {
    id: "data-we-collect",
    title: "Data We Collect",
    body: `We collect data in two ways: information you provide directly, and information collected automatically.

**Information you provide directly**

Contact Form: When you submit a message we collect your full name, email address, country, organisation name (optional), area of interest, and message content.

Newsletter Subscription: When you subscribe we collect your email address and the timestamp of subscription.

Resource Downloads: We collect your email address, the resource requested, download timestamp, and country.

**Information collected automatically**

Server Logs: Our hosting infrastructure may log your IP address, browser type, OS, referral URL, and pages visited. Logs are retained for a maximum of 30 days.

Cookies: We use strictly necessary session cookies and optional analytics cookies. See the Cookies section below.`,
  },
  {
    id: "how-we-use",
    title: "How We Use Your Data",
    body: `We use your personal data only for the purposes for which it was collected:

To respond to contact form enquiries and service requests.
To send our newsletter to subscribers who have opted in.
To process and fulfil resource download requests.
To improve our website and content through aggregated analytics.
To detect and prevent fraud, spam, and abusive activity.
To comply with applicable law.

We do not sell, rent, or trade your personal data to third parties for marketing purposes.`,
  },
  {
    id: "legal-basis",
    title: "Legal Basis for Processing",
    body: `Under the Ghana Data Protection Act 2012 and the GDPR we must have a lawful basis for processing your data.

**Consent** — Newsletter subscriptions and optional analytics cookies are processed on the basis of your explicit consent. You may withdraw consent at any time.

**Legitimate Interests** — Contact form submissions and server logs are processed on the basis of our legitimate interest in responding to enquiries and maintaining site security.

**Legal Obligation** — We may process data where required by applicable law or court order.`,
  },
  {
    id: "mongodb-storage",
    title: "Data Storage and Security",
    body: `Your personal data is stored in a MongoDB Atlas database. MongoDB Atlas is certified to ISO 27001 and SOC 2 Type II standards and provides encryption at rest (AES-256) and in transit (TLS 1.2+).

Database access is restricted to our application servers and authorised personnel only. We store only the fields necessary for each use case.

**Retention periods:** Contact form data — 24 months. Newsletter subscription data — until unsubscribe. Resource download records — 12 months.

Despite our best efforts, no method of transmission over the internet is 100% secure. If you become aware of a security incident please contact privacy@safehers.africa immediately.`,
  },
  {
    id: "cookies",
    title: "Cookies",
    body: `**Strictly Necessary Cookies** (always active) — Required for the site to function. Includes session management and security tokens. These cannot be switched off.

**Analytics Cookies** (optional, require consent) — If accepted, we use Vercel Analytics to understand which pages are most visited. Data is aggregated and anonymised — no personal profiles are built. You can change your preference at any time via the cookie banner.

We do not use advertising, social media tracking, or cross-site tracking cookies.`,
  },
  {
    id: "third-parties",
    title: "Third-Party Services",
    body: `We use the following third-party providers who may process data on our behalf. All are bound by Data Processing Agreements:

**MongoDB Atlas** — Database hosting. United States / EU regions.
**Vercel** — Website hosting and edge network. United States.
**Resend** — Transactional email delivery. United States.
**Google Fonts** — Typography CDN. Google may log your IP address when fonts load.`,
  },
  {
    id: "your-rights",
    title: "Your Rights",
    body: `Under the Ghana Data Protection Act 2012 you have the right to:

1. **Access** — Request a copy of the personal data we hold about you.
2. **Correction** — Request that inaccurate data be corrected.
3. **Erasure** — Request deletion of your personal data (subject to legal retention obligations).
4. **Objection** — Object to processing based on legitimate interests.
5. **Withdrawal of Consent** — Withdraw consent at any time for consent-based processing.

EEA/UK residents additionally have GDPR rights to data portability and restriction of processing.

To exercise any right, contact privacy@safehers.africa. We will respond within 30 days. You may lodge a complaint with the Data Protection Commission of Ghana or your local supervisory authority.`,
  },
  {
    id: "data-transfers",
    title: "International Data Transfers",
    body: `SafeHers operates from Ghana and the United States. Transfers outside the EEA are protected by Standard Contractual Clauses approved by the European Commission, adequacy decisions, or other appropriate safeguards permitted under the GDPR.`,
  },
  {
    id: "children",
    title: "Children's Privacy",
    body: `Our website is not directed at children under 13 (or 16 in the EEA). We do not knowingly collect data from children. If you believe a child has provided us data without parental consent, contact privacy@safehers.africa and we will delete it promptly.`,
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. The "Last Updated" date at the top reflects the most recent revision. Continued use of the site after a revision constitutes acceptance of the updated policy.`,
  },
  {
    id: "contact-us",
    title: "Contact Us",
    body: `For privacy questions, data requests, or complaints contact our Data Protection Officer:

Email: privacy@safehers.africa
Post: SafeHers, East Legon, Accra, Ghana

For EU/UK matters: gdpr@safehers.africa`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="pt-40 pb-24 lg:pt-48">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-ink" />
            Legal
          </p>
          <h1 className="display text-[clamp(3rem,7vw,7rem)] font-light max-w-[900px] mb-6">
            Privacy{" "}
            <span className="display-italic text-burgundy">Policy</span>
          </h1>
          <p className="body-prose text-ink/60 mb-2">
            Last updated: 2 May 2026 ✦ Effective: 2 May 2026
          </p>
          <p className="body-prose max-w-2xl mt-4">
            We take your privacy seriously. This document explains in plain
            language what data we collect, why, and what rights you have.
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
              Questions?{" "}
              <Link href="/contact" className="link-underline text-ink">
                Contact us
              </Link>{" "}
              or email privacy@safehers.africa.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
