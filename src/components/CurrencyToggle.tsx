"use client";

import { useEffect, useState } from "react";
import {
  CURRENCIES,
  CURRENCY_STORAGE_KEY,
  DEFAULT_CURRENCY,
  type Currency,
} from "@/lib/currencies";
import { ChevronDown } from "lucide-react";

interface CurrencyToggleProps {
  value: Currency;
  onChange: (currency: Currency) => void;
  compact?: boolean;
}

export function CurrencyToggle({
  value,
  onChange,
  compact = false,
}: CurrencyToggleProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [open]);

  return (
    <div className="relative inline-block">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="flex items-center gap-2 border border-ink/20 px-3 py-2 font-mono text-xs tracking-widest uppercase hover:border-ink/50 transition-colors bg-cream"
        aria-label="Select currency"
      >
        {compact ? value.symbol : `${value.symbol} ${value.code}`}
        <ChevronDown
          size={12}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-full left-0 mt-1 w-48 bg-cream border border-ink/15 shadow-xl z-20"
        >
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                onChange(c);
                setOpen(false);
                localStorage.setItem(CURRENCY_STORAGE_KEY, c.code);
              }}
              className={`w-full text-left px-4 py-3 text-xs font-mono tracking-widest uppercase border-b border-ink/10 last:border-0 hover:bg-bone transition-colors ${
                c.code === value.code ? "text-burgundy" : "text-ink"
              }`}
            >
              {c.symbol} {c.code} — {c.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Hook to persist currency preference across the session */
export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);

  useEffect(() => {
    const saved = localStorage.getItem(CURRENCY_STORAGE_KEY);
    if (saved) {
      const found = CURRENCIES.find((c) => c.code === saved);
      if (found) setCurrency(found);
    }
  }, []);

  function update(c: Currency) {
    setCurrency(c);
    localStorage.setItem(CURRENCY_STORAGE_KEY, c.code);
  }

  return { currency, setCurrency: update };
}
