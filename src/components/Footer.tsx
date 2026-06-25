"use client";

import Link from "next/link";
import { useState } from "react";
import { SocialIcons } from "./SocialLinks";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const r = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (r.ok) {
        setStatus("success");
        setEmail("");
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="relative bg-ink text-cream mt-32">
      <div className="absolute -top-px left-0 right-0 gold-rule" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-5">
            <div className="flex items-baseline gap-3 mb-2">
              <h2 className="display text-4xl">SafeHer</h2>
              <span className="text-gold text-xs font-mono tracking-widest uppercase">
                Foundation
              </span>
            </div>
            <p className="display-italic text-lg text-gold/80 mb-6">
              Pretty Girl, Save Yourself.
            </p>
            <p className="body-prose max-w-md opacity-70 mb-8">
              A Ghana-US women&apos;s safety foundation equipping girls and
              women across Africa with practical physical, digital, and
              financial safety education.
            </p>
            <form onSubmit={subscribe} className="max-w-md">
              <label className="eyebrow opacity-60 block mb-3">
                Newsletter
              </label>
              <div className="flex border-b border-cream/30 pb-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent outline-none placeholder:opacity-40 text-sm"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="eyebrow hover:text-gold transition-colors disabled:opacity-50"
                >
                  {status === "loading" ? "..." : "Subscribe →"}
                </button>
              </div>
              {status === "success" && (
                <p className="text-xs mt-3 text-gold">
                  Thank you. Welcome to the movement.
                </p>
              )}
              {status === "error" && (
                <p className="text-xs mt-3 text-rose">
                  Something went wrong. Try again.
                </p>
              )}
            </form>
            <SocialIcons className="mt-8" />
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow opacity-60 mb-4">Foundation</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="link-underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/foundation" className="link-underline">
                  The Foundation
                </Link>
              </li>
              <li>
                <Link href="/governance" className="link-underline">
                  Governance
                </Link>
              </li>
              <li>
                <Link href="/reports" className="link-underline">
                  Annual Reports
                </Link>
              </li>
              <li>
                <Link href="/safeguarding" className="link-underline">
                  Safeguarding
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow opacity-60 mb-4">Get Involved</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="link-underline">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/donate" className="link-underline">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="link-underline">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="/partners" className="link-underline">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/contact" className="link-underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow opacity-60 mb-4">Offices</p>
            <p className="text-sm opacity-80 mb-4">
              <span className="block font-medium">Accra, Ghana</span>
              East Legon, Greater Accra
              <br />
              hello@safehers.africa
            </p>
            <p className="text-sm opacity-80 mb-6">
              <span className="block font-medium">Washington, D.C., USA</span>
              partnerships@safehers.africa
            </p>
            <div className="border-t border-cream/15 pt-4">
              <p className="eyebrow opacity-40 mb-2">Legal</p>
              <ul className="space-y-1 text-xs opacity-60">
                <li>
                  <Link href="/privacy" className="link-underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="link-underline">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between gap-4 text-xs opacity-50">
          <p>
            &copy; {new Date().getFullYear()} SafeHer Foundation. All rights
            reserved.
          </p>
          <p className="flex items-center gap-2">
            <span>
              Co-founded by Zarinah Knows &amp; DK Cyber
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
