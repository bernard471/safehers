import type { Metadata } from "next";
import Link from "next/link";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";

export const metadata: Metadata = {
  title: "Tax & Legal Basics — Financial Safety & Wealth — SafeHer Foundation",
  description: "Ghana GRA taxes, contracts, inheritance law, and property rights. Legal and tax literacy for African women.",
};

const LEGAL_DISCLAIMER = "This page is educational content only. SafeHers is not a law firm and nothing on this page constitutes legal advice. Tax laws and regulations change frequently. Always consult a licensed lawyer or certified tax professional in your jurisdiction.";

const topics = [
  { title: "Income tax basics: Ghana Revenue Authority (GRA)", body: "Ghana operates a progressive income tax system. Individuals earning above the tax-free threshold (currently GH¢ 4,380 per year as of 2024) are required to file returns. Employees on payroll have PAYE (Pay As You Earn) deducted by their employer. Self-employed individuals must file self-assessment returns and pay in installments. We explain how to register for a TIN, how to file online through the GRA's e-Services portal, and common deductions available to self-employed individuals." },
  { title: "VAT and Flat Rate for traders", body: "If your business turns over more than GH¢ 200,000 per year you are required to register for VAT. Small traders below this threshold may opt for the 3% VAT Flat Rate Scheme. We explain the difference, how to display prices with and without VAT, and how to file VAT returns. Equivalent thresholds and processes exist in Nigeria (FIRS) and Kenya (KRA) — always verify current thresholds with the relevant authority." },
  { title: "Contracts and written agreements", body: "A verbal agreement is difficult to enforce. Written contracts protect you whether you are a service provider, employee, landlord, or lender. We explain the essential elements of a valid contract in Ghanaian law: offer, acceptance, consideration, and intention to create legal relations. We cover the difference between an employment contract and a service contract, and why a simple written agreement signed by both parties provides far more protection than any handshake." },
  { title: "Understanding inheritance and intestate law", body: "Ghana's Intestate Succession Law (PNDC Law 111, 1985) governs what happens to a person's property when they die without a will. Notably, this law can conflict with customary family land claims. Many Ghanaian women have lost property after the death of a spouse because they did not understand these rules. We explain the basics of writing a will, how to find a licensed lawyer through the Ghana Bar Association, and the difference between a will and a trust." },
  { title: "Property rights for women", body: "Ghana's 1992 Constitution and the Property Rights of Spouses Bill (still pending as of 2024) affect what a woman can claim in a marriage dissolution. Under current law, assets acquired during marriage are not automatically split equally — courts look at contribution. We explain the legal landscape in plain language, the importance of having your name on title deeds, and what recourse is available through the courts and DOVVSU (Domestic Violence and Victim Support Unit)." },
];

export default function TaxAndLegalPage() {
  return (
    <>
      <section className="pt-40 pb-20 lg:pt-48">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-4 flex items-center gap-3">
            <Link href="/financial-literacy" className="opacity-60 hover:opacity-100 transition-opacity">Financial Safety & Wealth</Link>
            <span className="opacity-30">/</span>
            Module 05
          </p>
          <h1 className="display text-[clamp(2.5rem,7vw,7rem)] font-light max-w-[900px]">
            Tax &<br />
            <span className="display-italic text-burgundy">Legal Basics</span>
          </h1>
          <p className="body-prose mt-6 max-w-2xl text-ink/70">
            GRA tax obligations, contracts, inheritance, and property rights — the legal layer that protects your financial safety.
          </p>
          <div className="mt-6 p-4 bg-rose/10 border border-rose/30 max-w-2xl">
            <p className="text-xs leading-relaxed text-ink/70">{LEGAL_DISCLAIMER}</p>
          </div>
          <FinancialDisclaimer />
        </div>
      </section>
      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl space-y-12">
            {topics.map((t, i) => (
              <div key={i} className="border-t border-ink/15 pt-8">
                <h2 className="display text-2xl lg:text-3xl mb-4">{t.title}</h2>
                <p className="body-prose text-ink/75">{t.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-20 flex flex-wrap gap-4">
            <Link href="/financial-literacy/wealth-building" className="bg-ink text-cream px-8 py-4 eyebrow hover:bg-burgundy transition-colors">Next: Wealth Building</Link>
            <Link href="/coaches" className="border border-ink/30 px-8 py-4 eyebrow hover:border-ink transition-colors">Find a coach</Link>
          </div>
        </div>
      </section>
    </>
  );
}
