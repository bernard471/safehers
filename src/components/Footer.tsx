"use client";

import Link from "next/link";
import { useState } from "react";

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
      <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-cream/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-5">
            <div className="flex items-baseline gap-2 mb-6">
              <h2 className="display text-5xl">SafeHers</h2>
              <span className="text-rose">✦</span>
            </div>
            <p className="body-prose max-w-md opacity-80 mb-8">
              A pan-African safety education movement.{" "}
              <span className="display-italic">Built in Ghana,</span> built for
              women and girls everywhere.
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
                  className="eyebrow hover:text-rose transition-colors disabled:opacity-50"
                >
                  {status === "loading" ? "..." : "Subscribe →"}
                </button>
              </div>
              {status === "success" && (
                <p className="text-xs mt-3 text-rose">
                  Thank you. Welcome to the movement.
                </p>
              )}
              {status === "error" && (
                <p className="text-xs mt-3 text-rose">
                  Something went wrong. Try again.
                </p>
              )}
            </form>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow opacity-60 mb-4">Navigate</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="link-underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="link-underline">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/about" className="link-underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="link-underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow opacity-60 mb-4">Programs</p>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Personal Safety</li>
              <li>Home Safety</li>
              <li>Online Safety</li>
              <li>Cybersecurity</li>
              <li>Certification</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow opacity-60 mb-4">Locations</p>
            <p className="text-sm opacity-80 mb-4">
              <span className="block font-medium">Accra, Ghana</span>
              East Legon, Accra
              <br />
              hello@safehers.africa
            </p>
            <p className="text-sm opacity-80">
              <span className="block font-medium">Washington, USA</span>
              partnerships@safehers.africa
            </p>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-cream/15 flex flex-col md:flex-row justify-between gap-4 text-xs opacity-60">
          <p>© {new Date().getFullYear()} SafeHers. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>A collaboration between Zarinah Traci & DK Cyber</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
