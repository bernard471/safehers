import type { Metadata } from "next";
import Link from "next/link";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";

export const metadata: Metadata = {
  title: "Saving & Banking — Financial Safety & Wealth — SafeHer Foundation",
  description: "Choosing banks, mobile money safety, susu groups, and building an emergency fund. Practical banking guidance for African women.",
};

const topics = [
  { title: "Choosing the right bank for your needs", body: "Not all bank accounts are created equal. We compare fee structures, minimum balance requirements, and ATM access across major Ghanaian, Nigerian, and Kenyan banks — including microfinance banks, rural and community banks, and digital-only neobanks. We explain what to look for and what to avoid." },
  { title: "Mobile money: maximising safety", body: "Mobile money is the most widely used financial tool for African women. We cover PIN security, recognising impersonation scams (fake MTN/Vodafone agents), what to do when you send money to the wrong number, and how to dispute fraudulent transactions. Covers MTN Mobile Money, Vodafone Cash, AirtelTigo Money, and M-Pesa." },
  { title: "Susu and ajo savings circles: how to run them safely", body: "Informal rotating savings clubs are a powerful financial tool — when run correctly. We explain how to set up a susu or ajo group with clear rules, contribution records, payout schedules, and conflict resolution procedures. We also cover red flags that indicate an informal savings club is actually a Ponzi scheme." },
  { title: "Building your emergency fund", body: "Financial advisors recommend three to six months of expenses as an emergency fund. For most African women, this feels impossible. We teach a graduated approach: start with one week, then one month, then three months — using separate accounts or mobile money wallets to prevent dipping into emergency savings." },
  { title: "Understanding interest: when it works for you and against you", body: "Savings accounts pay you interest. Loans charge you interest. Understanding the difference between simple and compound interest — and how to compare annual percentage rates (APR) across products — is one of the most valuable skills in personal finance." },
];

export default function SavingAndBankingPage() {
  return (
    <>
      <section className="pt-40 pb-20 lg:pt-48">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-4 flex items-center gap-3">
            <Link href="/financial-literacy" className="opacity-60 hover:opacity-100 transition-opacity">Financial Safety & Wealth</Link>
            <span className="opacity-30">/</span>
            Module 02
          </p>
          <h1 className="display text-[clamp(2.5rem,7vw,7rem)] font-light max-w-[900px]">
            Saving &<br />
            <span className="display-italic text-burgundy">Banking</span>
          </h1>
          <p className="body-prose mt-6 max-w-2xl text-ink/70">
            Choosing the right financial home for your money — and keeping it safe once it gets there.
          </p>
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
            <Link href="/financial-literacy/investing" className="bg-ink text-cream px-8 py-4 eyebrow hover:bg-burgundy transition-colors">Next: Investing Basics</Link>
            <Link href="/calculators" className="border border-ink/30 px-8 py-4 eyebrow hover:border-ink transition-colors">Try the calculators</Link>
          </div>
        </div>
      </section>
    </>
  );
}
