"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Consent = "all" | "essential" | null;

const STORAGE_KEY = "safehers-cookie-consent";
const EXPIRY_DAYS = 365;

function getSavedConsent(): Consent {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const { value, expiry } = JSON.parse(raw);
    if (Date.now() > expiry) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return value as Consent;
  } catch {
    return null;
  }
}

function saveConsent(value: Consent) {
  const expiry = Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, expiry }));
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getSavedConsent() === null) {
      // Small delay so it doesn't flash on mount
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    saveConsent("all");
    setVisible(false);
  }

  function reject() {
    saveConsent("essential");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "110%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          role="dialog"
          aria-label="Cookie consent"
          className="fixed bottom-0 left-0 right-0 z-40 bg-ink text-cream"
          style={{ borderTop: "1px solid rgba(250,246,239,0.12)" }}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm leading-relaxed opacity-80 flex-1">
              We use cookies to improve your experience and analyse site usage.{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-2 opacity-100 hover:opacity-70 transition-opacity"
              >
                Privacy Policy
              </Link>
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={reject}
                className="font-mono text-xs tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity px-4 py-2 border border-cream/20 hover:border-cream/50"
              >
                Essential only
              </button>
              <button
                onClick={accept}
                className="font-mono text-xs tracking-widest uppercase bg-cream text-ink px-4 py-2 hover:bg-bone transition-colors"
              >
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
