import type { Metadata } from "next";
import Link from "next/link";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";

export const metadata: Metadata = {
  title: "Entrepreneurship — Financial Safety & Wealth — SafeHers",
  description: "Business registration, mobile money for business, pricing, and Susu cooperatives for African women entrepreneurs.",
};

const topics = [
  { title: "Registering a business in Ghana", body: "A sole proprietorship in Ghana can be registered at the Registrar General's Department (RGD) for a modest fee. We walk through the process: choosing a business name, completing the registration form, obtaining a Tax Identification Number (TIN) from the Ghana Revenue Authority (GRA), and what it means to be formally registered versus informal trading. Formal registration opens doors to bank accounts, loans, and contracts." },
  { title: "Separating personal and business finances", body: "This is the single highest-impact financial habit for a small business owner. Mixing personal and business money makes it impossible to know if your business is actually profitable, creates tax complications, and makes your business invisible to lenders. We explain how to open a dedicated business account, even at a mobile money provider, and how to pay yourself a salary from the business." },
  { title: "Basic pricing and profit margins", body: "Many small businesses in Africa run at a loss without knowing it because they price to match competitors rather than to cover costs. We explain: cost of goods sold (COGS), gross margin, operating expenses, and net profit. We walk through a simple pricing formula: (Total costs ÷ units) × (1 + desired margin) = price. We also cover the psychology of raising prices." },
  { title: "Mobile money for business", body: "MTN MoMo Business, Vodafone Cash Business, and AirtelTigo Money all offer merchant accounts that separate business flows from personal wallets, provide transaction statements useful for loan applications, and allow cashless point-of-sale without expensive hardware. We explain how to register for a merchant account and how to share a payment QR code." },
  { title: "Susu and savings cooperatives as business capital", body: "Susu (Ghana), Ajo (Nigeria), and Chama (Kenya/East Africa) are rotating savings and credit associations — community-based structures where members contribute a fixed amount weekly or monthly and take turns collecting the full pot. They are legitimate, effective micro-capital tools. We explain how to structure a susu group for business capital, including record-keeping and conflict-resolution clauses." },
  { title: "Access to women-focused business grants and loans", body: "We document specific programmes: Mastercard Foundation's women's enterprise programmes, GIZ's WIDU programme (West Africa), the Ghana Enterprises Agency's MSME support, and mobile lenders like Jumo and Branch that use mobile money history for credit scoring. All listed opportunities are subject to change and availability — we include links and application tips, not endorsements." },
];

export default function EntrepreneurshipPage() {
  return (
    <>
      <section className="pt-40 pb-20 lg:pt-48">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-4 flex items-center gap-3">
            <Link href="/financial-literacy" className="opacity-60 hover:opacity-100 transition-opacity">Financial Safety & Wealth</Link>
            <span className="opacity-30">/</span>
            Module 04
          </p>
          <h1 className="display text-[clamp(2.5rem,7vw,7rem)] font-light max-w-[900px]">
            Entrepreneurship &<br />
            <span className="display-italic text-burgundy">Business Basics</span>
          </h1>
          <p className="body-prose mt-6 max-w-2xl text-ink/70">
            From registering your first business to separating personal and business finances, pricing for profit, and accessing funding.
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
            <Link href="/financial-literacy/tax-and-legal" className="bg-ink text-cream px-8 py-4 eyebrow hover:bg-burgundy transition-colors">Next: Tax & Legal Basics</Link>
            <Link href="/calculators" className="border border-ink/30 px-8 py-4 eyebrow hover:border-ink transition-colors">Financial calculators</Link>
          </div>
        </div>
      </section>
    </>
  );
}
