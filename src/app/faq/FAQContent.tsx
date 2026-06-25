"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const categories = [
  {
    id: "individuals",
    label: "For Individuals",
    items: [
      {
        q: "Who is the SafeHers curriculum designed for?",
        a: "SafeHers is designed for women and girls of all ages across Africa and the diaspora. The curriculum covers three pillars — personal safety, home safety, and online safety — and is applicable whether you are a student, professional, or community member. The content is grounded in the African context, particularly addressing risks common in West Africa and other regions of the continent.",
      },
      {
        q: "Do I need any prior knowledge to benefit from SafeHers training?",
        a: "None at all. Our curriculum is built from the ground up to be accessible to anyone regardless of education level or prior safety knowledge. We start with foundational awareness and progress to practical protocols. The language is clear, the examples are local, and the skills are immediately applicable.",
      },
      {
        q: "Is the content available in local languages?",
        a: "Currently the curriculum is delivered in English. We are actively working on Twi, Pidgin, and Swahili versions. If your community or institution would benefit from a specific language adaptation, please contact us — localisation projects are a funding priority.",
      },
      {
        q: "Can I access SafeHers content online at my own pace?",
        a: "Our self-paced digital learning modules are currently in development. At present, our programmes are delivered through licensed educators, institutional workshops, and our downloadable resource library. Subscribe to our newsletter to be the first to know when self-paced courses launch.",
      },
    ],
  },
  {
    id: "universities",
    label: "For Universities",
    items: [
      {
        q: "How can our university partner with SafeHers?",
        a: "Universities can partner with SafeHers through our Institutional Licence, which allows your student services, wellness, or gender equity office to deliver the full SafeHers curriculum on campus. We provide training for your staff, all curriculum materials, facilitation guides, and ongoing support. Contact us at partnerships@safehers.africa to start a conversation.",
      },
      {
        q: "What is included in a university campus programme?",
        a: "A standard campus programme includes a Train-the-Trainer workshop for 2–5 of your staff, the complete SafeHers curriculum licence for one academic year, facilitation slide decks and workbooks, digital assessment tools, and a programme evaluation framework. We can also provide a keynote or launch event with one of our founders.",
      },
      {
        q: "Can SafeHers training count toward academic credit?",
        a: "That depends on your institution's credit framework. Some partner universities have integrated SafeHers content into existing courses on gender studies, public health, or student development. We can provide detailed learning outcomes and competency frameworks to support accreditation discussions with your curriculum team.",
      },
      {
        q: "Do you offer reduced rates for African universities with limited budgets?",
        a: "Yes. We have a dedicated Africa Campus Access Fund that provides subsidised institutional licences to accredited universities in sub-Saharan Africa. Eligibility is assessed on a case-by-case basis. Please reach out to discuss your situation — we are committed to access over revenue.",
      },
    ],
  },
  {
    id: "corporations",
    label: "For Corporations",
    items: [
      {
        q: "Why should our company invest in SafeHers training?",
        a: "Organisations that prioritise employee safety — especially for women — see measurable improvements in retention, productivity, and inclusion metrics. SafeHers training equips your female employees with practical safety skills while demonstrating that your organisation takes gender equity seriously. It is both a welfare investment and a reputational one.",
      },
      {
        q: "Can the curriculum be customised for our industry?",
        a: "Yes. We offer bespoke curriculum adaptation for industries with specific risk profiles — including hospitality, financial services, mining, agriculture, and professional services. Industry customisation is available on the Institutional and Master Trainer tiers. Contact us to discuss your needs.",
      },
      {
        q: "How long does a corporate training programme take?",
        a: "A standard corporate programme is a half-day (3–4 hours) workshop for up to 30 participants. Full-day and multi-day programmes are available for larger cohorts or deeper curriculum coverage. We also offer a 6-week blended learning format for teams that prefer a lighter-touch weekly model.",
      },
    ],
  },
  {
    id: "funders",
    label: "For Funders",
    items: [
      {
        q: "What is SafeHers' theory of change?",
        a: "SafeHers operates on the premise that safety knowledge is a fundamental right, not a privilege. Our theory of change holds that when women have practical, contextualised safety knowledge they are better able to protect themselves and their communities, which in turn reduces gender-based violence, financial exploitation, and online harm at a systemic level. We measure change through knowledge assessments, behaviour change surveys, and community reach data.",
      },
      {
        q: "What funding opportunities exist with SafeHers?",
        a: "We welcome funding partnerships across four areas: (1) Programme delivery — sponsoring campus or community workshops; (2) Curriculum development — funding new modules, translations, or digital learning formats; (3) Research — supporting impact measurement and needs assessments; (4) Scale — funding the Africa Campus Access Fund or Master Trainer expansion. Contact us at funding@safehers.africa.",
      },
      {
        q: "Is SafeHers a registered non-profit?",
        a: "SafeHers operates as a social enterprise. Our legal structure includes registered entities in Ghana and the United States. Specific registration documentation and financial reports are available to prospective institutional funders upon request and under NDA where appropriate.",
      },
    ],
  },
  {
    id: "certification",
    label: "About Certification",
    items: [
      {
        q: "What are the different certification levels?",
        a: "There are three certification pathways. The Educator Certification is for individuals who want to deliver SafeHers programmes in their community, school, or workplace. The Master Trainer Certification is for experienced facilitators who want to train other educators. The Institutional Certification is for organisations that want to licence and embed the curriculum internally at scale. Each pathway has different prerequisites, training hours, and assessment requirements.",
      },
      {
        q: "How long is the certification valid?",
        a: "Educator and Master Trainer certifications are valid for two years and require a renewal assessment and continuing education credits. The Institutional Certification is renewed annually alongside the licence agreement.",
      },
      {
        q: "Can I lose my certification?",
        a: "Yes. SafeHers reserves the right to revoke certification in cases of misrepresentation, curriculum misuse, conduct unbecoming of a SafeHers Certified Educator, or failure to meet renewal requirements. We take the integrity of our certification mark seriously.",
      },
    ],
  },
  {
    id: "pricing",
    label: "About Pricing",
    items: [
      {
        q: "What does Educator Certification cost?",
        a: "Educator Certification is priced between $250 and $450 USD depending on the cohort format (self-study, cohort-based, or intensive). Payment plans are available. African residents may be eligible for local currency pricing — contact us for details.",
      },
      {
        q: "What does an Institutional Licence cost?",
        a: "Institutional pricing ranges from $5,000 to $25,000 USD annually depending on organisation size, geography, and scope of deployment. This includes all curriculum materials, staff training, and ongoing support. We strongly encourage organisations to contact us for a tailored quote rather than assume the top of the range applies.",
      },
      {
        q: "Are there scholarships or bursaries available?",
        a: "Yes. We offer a limited number of full and partial scholarships for Educator Certification to women from low-income backgrounds, particularly in sub-Saharan Africa. Scholarship applications open twice yearly. Subscribe to our newsletter to be notified of application windows.",
      },
    ],
  },
];

function AccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-ink/15">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-6 text-left group"
        aria-expanded={open}
      >
        <span className="body-prose font-medium group-hover:text-burgundy transition-colors pr-4">
          {question}
        </span>
        <span className="shrink-0 mt-1 text-burgundy">
          {open ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.7, 0, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="body-prose text-ink/70 pb-6 pr-8">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQContent() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const current = categories.find((c) => c.id === activeCategory)!;

  return (
    <>
      <section className="pt-40 pb-24 lg:pt-48 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
            <span className="inline-block w-8 h-px bg-gold" />
            Frequently Asked Questions
          </p>
          <h1 className="display text-[clamp(3rem,8vw,8rem)] font-light max-w-[900px] mb-6">
            Got{" "}
            <span className="display-italic text-gold">questions?</span>
          </h1>
          <p className="body-prose max-w-2xl opacity-70">
            We have compiled answers to the most common questions we receive
            from individuals, universities, corporations, and funders. If
            yours is not here,{" "}
            <a href="/contact" className="link-underline text-gold">
              reach out directly
            </a>
            .
          </p>
        </div>
      </section>
      <div className="gold-rule" />

      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-16 border-b border-ink/15 pb-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`eyebrow px-4 py-2 transition-colors ${
                  activeCategory === cat.id
                    ? "bg-ink text-cream"
                    : "border border-ink/20 text-ink/60 hover:text-ink hover:border-ink/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <p className="eyebrow text-burgundy mb-8">{current.label}</p>
                {current.items.map((item) => (
                  <AccordionItem
                    key={item.q}
                    question={item.q}
                    answer={item.a}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA */}
          <div className="mt-20 border border-ink/15 p-10 max-w-2xl">
            <p className="eyebrow mb-4">Still have questions?</p>
            <p className="body-prose text-ink/70 mb-6">
              Our team is based in Accra and Washington, D.C. We typically
              respond within two business days.
            </p>
            <a
              href="/contact"
              className="inline-block bg-ink text-cream px-8 py-3 eyebrow hover:bg-burgundy transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
