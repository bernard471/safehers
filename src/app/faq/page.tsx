import type { Metadata } from "next";
import FAQContent from "./FAQContent";

export const metadata: Metadata = {
  title: "FAQ — SafeHers",
  description:
    "Answers to the most common questions from individuals, universities, corporations, and funders about SafeHers safety education programmes.",
  openGraph: {
    title: "Frequently Asked Questions — SafeHers",
    description:
      "Everything you need to know about SafeHers programmes, certification, pricing, and partnerships.",
  },
};

export default function FAQPage() {
  return <FAQContent />;
}
