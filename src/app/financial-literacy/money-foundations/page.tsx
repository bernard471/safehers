import type { Metadata } from "next";
import Link from "next/link";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";

export const metadata: Metadata = {
  title: "Money Foundations — Financial Safety & Wealth — SafeHer Foundation",
  description: "Budgeting, financial mindset, and breaking financial trauma cycles. Practical money foundations for African women.",
};

const topics = [
  { title: "Understanding your relationship with money", body: "Many of us were raised in households where money was a source of fear, secrecy, or shame. Before any budgeting spreadsheet, SafeHers starts with the emotional and cultural context — understanding the beliefs that drive your financial behaviour, and identifying which serve you and which do not." },
  { title: "Your first budget: the 50/30/20 rule adapted for African realities", body: "The classic 50/30/20 rule (50% needs, 30% wants, 20% savings) assumes a predictable income and no extended family obligations. We adapt it: the SafeHers framework accounts for remittances, irregular income, school fees, and the reality of supporting multiple dependants." },
  { title: "Tracking your spending without apps", body: "Not everyone has reliable data or smartphone access. We teach paper-based and SMS-based methods for tracking spending that work offline, in markets, and in areas with intermittent connectivity." },
  { title: "Breaking financial trauma cycles", body: "Intergenerational financial trauma — patterns of scarcity, over-spending, financial secrecy between partners, or giving to others at your own expense — is real and documented. Recognising these patterns is the first step to changing them." },
  { title: "Setting financial goals you will actually keep", body: "SMART goals applied to personal finance, with African examples: saving for school fees, building a market stall float, saving for a land plot, or setting aside money that is not accessible to family requests." },
];

export default function MoneyFoundationsPage() {
  return (
    <>
      <section className="pt-40 pb-20 lg:pt-48">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-4 flex items-center gap-3">
            <Link href="/financial-literacy" className="opacity-60 hover:opacity-100 transition-opacity">Financial Safety & Wealth</Link>
            <span className="opacity-30">/</span>
            Module 01
          </p>
          <h1 className="display text-[clamp(2.5rem,7vw,7rem)] font-light max-w-[900px]">
            Money<br />
            <span className="display-italic text-burgundy">Foundations</span>
          </h1>
          <p className="body-prose mt-6 max-w-2xl text-ink/70">
            Before investments, before business plans — the foundation. Your mindset, your budget, your habits.
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
            <Link href="/financial-literacy/saving-and-banking" className="bg-ink text-cream px-8 py-4 eyebrow hover:bg-burgundy transition-colors">
              Next: Saving & Banking
            </Link>
            <Link href="/calculators" className="border border-ink/30 px-8 py-4 eyebrow hover:border-ink transition-colors">
              Try the calculators
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
