import type { Metadata } from "next";
import "./globals.css";
import RootLayoutInner from "@/components/RootLayoutInner";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://safehers.africa"),
  title: "SafeHer Foundation — Women's Safety Education Across Africa",
  description:
    "SafeHer Foundation is a Ghana-US women's safety foundation equipping girls and women across Africa with practical physical, digital, and financial safety education. Pretty Girl, Save Yourself.",
  keywords: [
    "SafeHer Foundation",
    "SafeHers movement",
    "Pretty Girl Save Yourself",
    "women safety education Africa",
    "girls safety training Ghana",
    "digital safety for women",
    "online safety Ghana",
    "women empowerment Africa",
    "financial literacy women Africa",
    "personal safety training",
    "cybersecurity women Ghana",
    "pan-African women foundation",
  ],
  openGraph: {
    title: "SafeHer Foundation — Pretty Girl, Save Yourself.",
    description:
      "A Ghana-US women's safety foundation equipping girls and women across Africa with practical physical, digital, and financial safety education.",
    siteName: "SafeHer Foundation",
  },
  twitter: {
    card: "summary_large_image",
    title: "SafeHer Foundation — Pretty Girl, Save Yourself.",
    description:
      "A Ghana-US women's safety foundation equipping girls and women across Africa with practical physical, digital, and financial safety education.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grain">
        <RootLayoutInner>{children}</RootLayoutInner>
        <Analytics />
      </body>
    </html>
  );
}
