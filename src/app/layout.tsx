import type { Metadata } from "next";
import "./globals.css";
import RootLayoutInner from "@/components/RootLayoutInner";

export const metadata: Metadata = {
  metadataBase: new URL("https://safehers.africa"),
  title: "SafeHers — Pan-African Safety Education",
  description:
    "A pan-African safety education movement equipping women and girls with practical knowledge to protect themselves — physically, digitally, and emotionally.",
  keywords: [
    "women safety",
    "Africa",
    "Ghana",
    "cybersecurity",
    "personal safety",
    "online safety",
    "education",
  ],
  openGraph: {
    title: "SafeHers — Pan-African Safety Education",
    description:
      "A pan-African safety education movement equipping women and girls with practical knowledge to protect themselves.",
    siteName: "SafeHers",
  },
  twitter: {
    card: "summary_large_image",
    title: "SafeHers — Pan-African Safety Education",
    description:
      "Safety education for women and girls across Africa.",
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
      </body>
    </html>
  );
}
