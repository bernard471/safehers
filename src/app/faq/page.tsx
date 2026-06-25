import type { Metadata } from "next";
import FAQContent from "./FAQContent";

export const metadata: Metadata = {
  title: "FAQ — SafeHer Foundation",
  description:
    "Answers to the most common questions from individuals, universities, corporations, donors, and funders about SafeHer Foundation and SafeHers programmes.",
  openGraph: {
    title: "Frequently Asked Questions — SafeHer Foundation",
    description:
      "Everything you need to know about SafeHer Foundation programmes, certification, training packages, and partnerships.",
  },
};

export default function FAQPage() {
  return <FAQContent />;
}
