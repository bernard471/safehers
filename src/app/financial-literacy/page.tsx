import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Financial Safety & Wealth — SafeHer Foundation",
  description:
    "Financial independence is a safety strategy. SafeHer Foundation equips African women with money management, banking, investing, and entrepreneurship knowledge rooted in local context.",
};

const DISCLAIMER =
  "SafeHers financial content is educational only. It does not constitute personalized financial advice. Always consult a qualified financial professional before making financial decisions.";

const curriculum = [
  {
    num: "01",
    title: "Money Foundations",
    desc: "Budgeting, financial mindset, and breaking intergenerational financial trauma cycles.",
    href: "/financial-literacy/money-foundations",
  },
  {
    num: "02",
    title: "Saving & Banking",
    desc: "Choosing the right bank, mobile money safety, susu and ajo savings circles, and building an emergency fund.",
    href: "/financial-literacy/saving-and-banking",
  },
  {
    num: "03",
    title: "Investing Basics",
    desc: "Ghana Stock Exchange, treasury bills, mutual funds, and real estate basics — demystified.",
    href: "/financial-literacy/investing",
  },
  {
    num: "04",
    title: "Entrepreneurship",
    desc: "Registering a business in Ghana, Nigeria, or Kenya. Separating personal and business finances. Basic accounting.",
    href: "/financial-literacy/entrepreneurship",
  },
  {
    num: "05",
    title: "Tax & Legal Basics",
    desc: "GRA and FIRS fundamentals, record keeping, and the most common tax mistakes to avoid.",
    href: "/financial-literacy/tax-and-legal",
  },
  {
    num: "06",
    title: "Wealth Building",
    desc: "Long-term financial thinking, generational wealth, retirement planning, and insurance literacy.",
    href: "/financial-literacy/wealth-building",
  },
];

const whyItems = [
  {
    stat: "67%",
    label:
      "of women in sub-Saharan Africa are financially excluded from formal banking systems.",
  },
  {
    stat: "3×",
    label:
      "more likely — women who control household finances are three times more likely to leave abusive relationships.",
  },
  {
    stat: "40%",
    label:
      "of mobile money fraud in Ghana targets women, according to industry estimates.",
  },
];

export default function FinancialLiteracyPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 lg:pt-48 bg-ink text-cream grain">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 opacity-60 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-cream opacity-40" />
            Pillar 4 ✦ Financial Safety & Wealth
          </p>
          <h1 className="display text-[clamp(3rem,8vw,7rem)] font-light max-w-[1000px] leading-[1.02]">
            Financial independence
            <br />
            <span className="display-italic text-rose">is a safety strategy.</span>
          </h1>
          <p className="body-prose mt-8 max-w-2xl opacity-70 text-lg">
            Women who control their finances are safer. Not metaphorically —
            statistically. SafeHers Financial Safety & Wealth gives African
            women the money knowledge they were never taught, grounded in local
            reality: mobile money, susu groups, the Ghana Stock Exchange,
            and building wealth in a market economy.
          </p>
          <div className="mt-4 p-4 border border-cream/20 max-w-2xl">
            <p className="font-mono text-xs tracking-widest uppercase opacity-50 mb-1">
              Educational disclaimer
            </p>
            <p className="text-xs opacity-60 leading-relaxed">{DISCLAIMER}</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/calculators"
              className="bg-cream text-ink px-8 py-4 eyebrow hover:bg-bone transition-colors"
            >
              Try the calculators
            </Link>
            <Link
              href="/contact"
              className="border border-cream/30 text-cream px-8 py-4 eyebrow hover:border-cream/70 transition-colors"
            >
              Partner with us
            </Link>
          </div>
        </div>
      </section>

      {/* WHY FINANCIAL SAFETY */}
      <section className="py-24 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-ink" />
            Why financial safety is safety
          </p>
          <h2 className="display text-[clamp(2rem,5vw,4.5rem)] font-light mb-16 max-w-3xl">
            Money is not separate<br />
            <span className="display-italic text-burgundy">from safety.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyItems.map((item) => (
              <div key={item.stat} className="border-t-2 border-burgundy pt-6">
                <p className="display text-6xl text-burgundy mb-3">{item.stat}</p>
                <p className="body-prose text-ink/75">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs font-mono tracking-widest uppercase opacity-40">
            Statistics are indicative. Always verify with current authoritative sources.
          </p>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="py-24 bg-bone">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-12 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-ink" />
            Curriculum overview
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculum.map((item) => (
              <Link
                key={item.num}
                href={item.href}
                className="group border border-ink/15 p-8 hover:border-burgundy transition-colors bg-cream"
              >
                <p className="num-tag text-4xl text-burgundy mb-4">{item.num}</p>
                <h3 className="display text-2xl mb-3 group-hover:text-burgundy transition-colors">
                  {item.title}
                </h3>
                <p className="body-prose text-sm opacity-70 mb-4">{item.desc}</p>
                <span className="eyebrow text-xs flex items-center gap-2 text-burgundy opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowUpRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AFRICAN CONTEXT */}
      <section className="py-24 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="eyebrow mb-6 flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-ink" />
                Built for the African context
              </p>
              <h2 className="display text-4xl lg:text-5xl font-light mb-8">
                Not imported.<br />
                <span className="display-italic text-terracotta">Co-authored.</span>
              </h2>
              <div className="space-y-5 body-prose text-ink/75">
                <p>
                  Western financial education assumes a bank account, a credit
                  score, and a salaried job. Most African women operate in a
                  market economy: mobile money, informal savings circles, market
                  trading, and family financial obligations that don't appear in
                  any budgeting app.
                </p>
                <p>
                  SafeHers Financial Safety & Wealth was co-authored with women
                  operating in these realities. We cover MTN MoMo, Vodafone
                  Cash, and AirtelTigo Money alongside formal banking. We
                  explain susu and ajo groups alongside investment accounts.
                </p>
                <p>
                  We reference GRA (Ghana Revenue Authority), FIRS (Nigeria),
                  KRA (Kenya), and SARS (South Africa) because that is where
                  you live. Every lesson is actionable without a laptop or
                  stable internet connection.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                "Mobile money safety (MTN MoMo, Vodafone Cash, AirtelTigo)",
                "Susu and ajo informal savings circles",
                "Ghana Stock Exchange & Treasury Bills",
                "Registering a business under GIPC / CAC / Registrar of Companies",
                "GRA filing basics for small business owners",
                "Understanding Ghana's National Pensions Act",
                "Protecting yourself from investment fraud",
              ].map((item) => (
                <div key={item} className="flex items-start gap-4 py-3 border-b border-ink/10">
                  <span className="text-burgundy mt-1 shrink-0">✦</span>
                  <p className="body-prose text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-burgundy text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <p className="eyebrow opacity-60 mb-4">Start learning today</p>
          <h2 className="display text-[clamp(2rem,6vw,5rem)] font-light mb-8">
            Your money,<br />
            <span className="display-italic">your safety.</span>
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/calculators" className="bg-cream text-ink px-8 py-4 eyebrow hover:bg-bone transition-colors">
              Free calculators
            </Link>
            <Link href="/coaches" className="border border-cream/40 text-cream px-8 py-4 eyebrow hover:border-cream/80 transition-colors">
              Find a coach
            </Link>
          </div>
          <p className="mt-8 text-xs opacity-40 font-mono tracking-widest uppercase">{DISCLAIMER}</p>
        </div>
      </section>
    </>
  );
}
