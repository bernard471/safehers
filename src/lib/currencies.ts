// Currency constants for calculators.
// NOTE: These are static reference rates for illustration only.
// For production, replace with a live FX API (e.g. ExchangeRate-API, Open Exchange Rates).
// Rates are approximate as of Q1 2025. Do NOT use for actual financial decisions.

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  /** Approximate units per 1 USD — for display scaling only */
  approxPerUSD: number;
}

export const CURRENCIES: Currency[] = [
  { code: "GHS", symbol: "GH\u20B5", name: "Ghanaian Cedi", approxPerUSD: 15.5 },
  { code: "NGN", symbol: "\u20A6", name: "Nigerian Naira", approxPerUSD: 1580 },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling", approxPerUSD: 130 },
  { code: "ZAR", symbol: "R", name: "South African Rand", approxPerUSD: 18.8 },
  { code: "USD", symbol: "$", name: "US Dollar", approxPerUSD: 1 },
];

export const DEFAULT_CURRENCY: Currency = CURRENCIES[0];

export const CURRENCY_STORAGE_KEY = "safehers-currency";

export function getCurrencyByCode(code: string): Currency {
  return CURRENCIES.find((c) => c.code === code) ?? DEFAULT_CURRENCY;
}

/** Format a number as a currency string */
export function formatCurrency(amount: number, currency: Currency): string {
  return `${currency.symbol}${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
