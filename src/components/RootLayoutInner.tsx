"use client";

import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import Nav from "./Nav";
import Footer from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { CookieBanner } from "./CookieBanner";
import { NewsletterModal } from "./NewsletterModal";
import { CountrySelector } from "./CountrySelector";

export default function RootLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    // Admin pages render their own layout — no Nav/Footer
    return <>{children}</>;
  }

  return (
    <>
      <CountrySelector />
      <Nav />
      <main className="relative z-0">{children}</main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
      <NewsletterModal />
      <Analytics />
    </>
  );
}
