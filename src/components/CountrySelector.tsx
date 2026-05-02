"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "safehers-country";

const COUNTRIES = [
  { code: "GH", label: "Ghana" },
  { code: "NG", label: "Nigeria" },
  { code: "KE", label: "Kenya" },
  { code: "ZA", label: "South Africa" },
  { code: "TZ", label: "Tanzania" },
  { code: "UG", label: "Uganda" },
  { code: "SN", label: "Senegal" },
  { code: "CM", label: "Cameroon" },
  { code: "DIAG", label: "Diaspora" },
  { code: "OTHER", label: "Other" },
];

export function CountrySelector() {
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setSelected(saved);
      setDismissed(true); // already chosen, no prompt needed
    }
  }, []);

  function choose(code: string) {
    setSelected(code);
    setDismissed(true);
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, code);
  }

  // Show the prompt bar only if user has not yet chosen
  if (dismissed) return null;

  const selectedCountry = COUNTRIES.find((c) => c.code === selected);

  return (
    <div className="relative bg-ink text-cream" style={{ zIndex: 60 }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between gap-4 py-2">
        <p className="font-mono text-xs tracking-widest uppercase opacity-60">
          ✦ Select your country for localised resources
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase border border-cream/20 px-3 py-1 hover:border-cream/50 transition-colors"
          >
            {selectedCountry?.label ?? "Choose country"}
            <ChevronDown
              size={12}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="font-mono text-xs tracking-widest uppercase opacity-30 hover:opacity-70 transition-opacity"
          >
            Dismiss
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute right-6 lg:right-12 top-full mt-1 bg-ink border border-cream/15 shadow-2xl z-50 min-w-[200px]"
          >
            {COUNTRIES.map((c) => (
              <button
                key={c.code}
                onClick={() => choose(c.code)}
                className="w-full text-left px-5 py-3 font-mono text-xs tracking-widest uppercase opacity-70 hover:opacity-100 hover:bg-cream/10 transition-colors border-b border-cream/10 last:border-0"
              >
                {c.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
