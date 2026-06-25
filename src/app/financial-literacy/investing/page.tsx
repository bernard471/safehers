import type { Metadata } from "next";
import Link from "next/link";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";

export const metadata: Metadata = {
  title: "Investing Basics — Financial Safety & Wealth — SafeHer Foundation",
  description: "Ghana Stock Exchange, treasury bills, mutual funds, and real estate basics. Investment education for African women.",
};

const INVEST_DISCLAIMER = "IMPORTANT: This page is educational content only. SafeHers is not a licensed investment advisor. Nothing on this page constitutes investment advice. Investment involves risk including the possible loss of principal. Past performance does not guarantee future results. Always consult a licensed investment professional in your jurisdiction before investing.";

const topics = [
  { title: "Why investing matters: beating inflation", body: "Inflation erodes the purchasing power of money sitting in a savings account. In Ghana, Nigeria, and Kenya, inflation has historically run between 8–25% per year. An investment that returns less than inflation is effectively losing value. Understanding this is the first reason to invest." },
  { title: "Ghana Stock Exchange (GSE)", body: "The GSE is Ghana's primary stock exchange, listing companies across banking, telecommunications, mining, and consumer goods. We explain how to open a stockbroking account through a licensed GSE broker, how to buy and sell shares, what dividends are, and how to read a basic stock chart. This is educational context, not a recommendation to buy any particular stock." },
  { title: "Treasury Bills (T-Bills) and Government Bonds", body: "Treasury bills are short-term government debt instruments considered among the lowest-risk investments available. In Ghana, 91-day, 182-day, and 364-day T-bills are sold regularly by the Bank of Ghana. They are accessible to individuals through licensed financial institutions. Similar instruments exist in Nigeria (FGN bonds/T-bills via DMO) and Kenya (CBK)." },
  { title: "Mutual Funds", body: "Mutual funds pool money from many investors and are managed by professional fund managers. They provide diversification without requiring you to select individual stocks. Licensed fund managers in Ghana include several Securities and Exchange Commission (SEC-Ghana) regulated entities. We explain how to verify a fund manager is legitimately licensed before investing." },
  { title: "Real estate basics", body: "Land and property investment is the most common wealth-building vehicle for African families. We cover the basics: the difference between freehold and leasehold in Ghana (the 99-year lease), how to verify a land title through the Lands Commission, the risks of building on family land without documentation, and the fundamentals of rental income." },
  { title: "Protecting yourself from investment fraud", body: "Ghana, Nigeria, and Kenya have all seen waves of Ponzi schemes and fraudulent investment clubs. We document common red flags: guaranteed high returns, informal structures, urgency pressure, and unlicensed promoters. We explain how to check whether an investment entity is SEC-Ghana, SEC-Nigeria, or CMA-Kenya registered." },
];

export default function InvestingPage() {
  return (
    <>
      <section className="pt-40 pb-20 lg:pt-48">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-4 flex items-center gap-3">
            <Link href="/financial-literacy" className="opacity-60 hover:opacity-100 transition-opacity">Financial Safety & Wealth</Link>
            <span className="opacity-30">/</span>
            Module 03
          </p>
          <h1 className="display text-[clamp(2.5rem,7vw,7rem)] font-light max-w-[900px]">
            Investing<br />
            <span className="display-italic text-burgundy">Basics</span>
          </h1>
          <p className="body-prose mt-6 max-w-2xl text-ink/70">
            Understanding your options — stocks, bonds, funds, and property — demystified for the African context.
          </p>
          <div className="mt-6 p-4 bg-rose/10 border border-rose/30 max-w-2xl">
            <p className="text-xs leading-relaxed text-ink/70">{INVEST_DISCLAIMER}</p>
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
            <Link href="/financial-literacy/entrepreneurship" className="bg-ink text-cream px-8 py-4 eyebrow hover:bg-burgundy transition-colors">Next: Entrepreneurship</Link>
            <Link href="/coaches" className="border border-ink/30 px-8 py-4 eyebrow hover:border-ink transition-colors">Find a financial coach</Link>
          </div>
        </div>
      </section>
    </>
  );
}
