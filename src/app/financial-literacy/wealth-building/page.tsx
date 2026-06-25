import type { Metadata } from "next";
import Link from "next/link";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";

export const metadata: Metadata = {
  title: "Wealth Building — Financial Safety & Wealth — SafeHer Foundation",
  description: "Generational wealth, land and property, SSNIT pension, and the wealth gap in Africa. For African women.",
};

const topics = [
  { title: "Defining wealth vs. income", body: "Income is what you earn. Wealth is what you keep, grow, and pass on. Many high-income women in Africa are not building wealth because their income is immediately absorbed by family obligations, lifestyle costs, and informal support networks — none of which build personal net worth. Understanding this distinction is the foundation for intentional wealth building." },
  { title: "SSNIT and formal pension systems", body: "The Social Security and National Insurance Trust (SSNIT) is Ghana's mandatory pension scheme, requiring contributions from formal sector workers and their employers. Many self-employed and informal sector women are not enrolled. We explain the three-tier pension structure in Ghana, how to enroll as a self-employed individual, and why pension contributions are a form of forced wealth building even when they feel like an inconvenience." },
  { title: "Land as a wealth vehicle: verification and documentation", body: "Land remains the primary inter-generational wealth transfer mechanism in most of Africa. However, land disputes are common. We explain the importance of conducting land searches at the Lands Commission before any purchase, what a site plan is and why you need one, the difference between allocation papers, indenture, and land title certificate, and why family land without documentation is not reliable wealth." },
  { title: "Generational wealth: estate planning basics", body: "Generational wealth requires intentional estate planning. We explain wills (how to make a legally valid will in Ghana), trusts (useful for protecting assets for children), beneficiary designations on bank accounts and insurance policies, and the role of a licensed attorney in ensuring your estate plan actually works. The goal is not just to accumulate — but to ensure what you build can be transferred to your children or chosen beneficiaries." },
  { title: "The gender wealth gap and systemic barriers", body: "Women in sub-Saharan Africa face documented structural barriers to wealth building: land tenure laws that favour men, informal sector concentration with no pension access, caregiving obligations that reduce earning years, and credit markets that under-serve women-led businesses. Understanding these is not about helplessness — it is about naming what you are working against, advocating for change, and finding the workarounds that exist within the current system." },
  { title: "Building a personal net worth statement", body: "A net worth statement lists all assets (things you own or are owed) minus all liabilities (debts). Tracking net worth annually is a better measure of financial progress than income alone. We walk through how to build a simple net worth statement using a notebook or spreadsheet, what to include (mobile money balances, savings accounts, property value, business equity, pension balance) and what not to forget (mobile loans, credit card balances, family debts)." },
];

export default function WealthBuildingPage() {
  return (
    <>
      <section className="pt-40 pb-20 lg:pt-48">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-4 flex items-center gap-3">
            <Link href="/financial-literacy" className="opacity-60 hover:opacity-100 transition-opacity">Financial Safety & Wealth</Link>
            <span className="opacity-30">/</span>
            Module 06
          </p>
          <h1 className="display text-[clamp(2.5rem,7vw,7rem)] font-light max-w-[900px]">
            Wealth<br />
            <span className="display-italic text-burgundy">Building</span>
          </h1>
          <p className="body-prose mt-6 max-w-2xl text-ink/70">
            Pensions, property, estate planning, and building generational wealth in the African context.
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
          <div className="mt-20 p-8 bg-ink text-cream">
            <p className="eyebrow mb-3 opacity-60">You have completed the curriculum</p>
            <h2 className="display text-3xl mb-6">All six modules complete ✦</h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/calculators" className="bg-cream text-ink px-8 py-4 eyebrow hover:bg-rose transition-colors">Try the calculators</Link>
              <Link href="/coaches" className="border border-cream/40 px-8 py-4 eyebrow hover:border-cream transition-colors">Work with a coach</Link>
              <Link href="/financial-literacy" className="border border-cream/40 px-8 py-4 eyebrow hover:border-cream transition-colors">Back to overview</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
