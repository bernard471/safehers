"use client";

import { useState } from "react";
import Link from "next/link";
import { useCurrency } from "@/components/CurrencyToggle";
import { CurrencyToggle, useCurrency as _useCurrency } from "@/components/CurrencyToggle";
import { formatCurrency } from "@/lib/currencies";
import { motion } from "framer-motion";
import Image from "next/image";

// ─── Savings Goal Calculator ────────────────────────────────────────────────
function SavingsGoalCalc() {
  const { currency } = useCurrency();
  const [goal, setGoal] = useState("");
  const [monthly, setMonthly] = useState("");
  const [rate, setRate] = useState("5");
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    const G = parseFloat(goal);
    const M = parseFloat(monthly);
    const r = parseFloat(rate) / 100 / 12;
    if (!G || !M || G <= 0 || M <= 0) return setResult("Please enter valid numbers.");
    if (r === 0) {
      const months = Math.ceil(G / M);
      return setResult(`${months} months (${Math.ceil(months / 12)} years) to reach your goal.`);
    }
    const months = Math.ceil(Math.log(1 + (G * r) / M) / Math.log(1 + r));
    setResult(`Approximately ${months} months (${Math.ceil(months / 12)} years) to reach ${formatCurrency(G, currency)}.`);
  }

  return (
    <div className="p-6 border border-ink/15">
      <h3 className="display text-2xl mb-1">Savings Goal</h3>
      <p className="text-sm text-ink/60 mb-5">How long until you reach your target?</p>
      <div className="space-y-3">
        <input className="w-full border border-ink/20 px-4 py-3 bg-cream text-sm focus:outline-none focus:border-burgundy" placeholder={`Goal amount (${currency.symbol})`} value={goal} onChange={e => setGoal(e.target.value)} type="number" min="0" />
        <input className="w-full border border-ink/20 px-4 py-3 bg-cream text-sm focus:outline-none focus:border-burgundy" placeholder={`Monthly contribution (${currency.symbol})`} value={monthly} onChange={e => setMonthly(e.target.value)} type="number" min="0" />
        <input className="w-full border border-ink/20 px-4 py-3 bg-cream text-sm focus:outline-none focus:border-burgundy" placeholder="Annual interest rate (%)" value={rate} onChange={e => setRate(e.target.value)} type="number" min="0" step="0.1" />
        <button onClick={calculate} className="w-full bg-ink text-cream py-3 eyebrow hover:bg-burgundy transition-colors">Calculate</button>
        {result && <p className="text-sm font-medium text-burgundy pt-2">{result}</p>}
      </div>
    </div>
  );
}

// ─── Compound Interest Calculator ──────────────────────────────────────────
function CompoundInterestCalc() {
  const { currency } = useCurrency();
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("10");
  const [years, setYears] = useState("5");
  const [compounds, setCompounds] = useState("12");
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const n = parseFloat(compounds);
    if (!P || P <= 0) return setResult("Please enter a valid principal.");
    const A = P * Math.pow(1 + r / n, n * t);
    const interest = A - P;
    setResult(`${formatCurrency(A, currency)} total — ${formatCurrency(interest, currency)} in interest earned.`);
  }

  return (
    <div className="p-6 border border-ink/15">
      <h3 className="display text-2xl mb-1">Compound Interest</h3>
      <p className="text-sm text-ink/60 mb-5">See your money grow over time.</p>
      <div className="space-y-3">
        <input className="w-full border border-ink/20 px-4 py-3 bg-cream text-sm focus:outline-none focus:border-burgundy" placeholder={`Principal amount (${currency.symbol})`} value={principal} onChange={e => setPrincipal(e.target.value)} type="number" min="0" />
        <input className="w-full border border-ink/20 px-4 py-3 bg-cream text-sm focus:outline-none focus:border-burgundy" placeholder="Annual interest rate (%)" value={rate} onChange={e => setRate(e.target.value)} type="number" min="0" step="0.1" />
        <input className="w-full border border-ink/20 px-4 py-3 bg-cream text-sm focus:outline-none focus:border-burgundy" placeholder="Number of years" value={years} onChange={e => setYears(e.target.value)} type="number" min="1" />
        <select className="w-full border border-ink/20 px-4 py-3 bg-cream text-sm focus:outline-none focus:border-burgundy" value={compounds} onChange={e => setCompounds(e.target.value)}>
          <option value="1">Annually</option>
          <option value="4">Quarterly</option>
          <option value="12">Monthly</option>
          <option value="365">Daily</option>
        </select>
        <button onClick={calculate} className="w-full bg-ink text-cream py-3 eyebrow hover:bg-burgundy transition-colors">Calculate</button>
        {result && <p className="text-sm font-medium text-burgundy pt-2">{result}</p>}
      </div>
    </div>
  );
}

// ─── Debt Payoff Calculator ─────────────────────────────────────────────────
function DebtPayoffCalc() {
  const { currency } = useCurrency();
  const [balance, setBalance] = useState("");
  const [rate, setRate] = useState("20");
  const [payment, setPayment] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    const B = parseFloat(balance);
    const r = parseFloat(rate) / 100 / 12;
    const P = parseFloat(payment);
    if (!B || !P || B <= 0 || P <= 0) return setResult("Please enter valid numbers.");
    if (P <= B * r) return setResult("Your monthly payment does not cover the interest. Increase your payment.");
    const months = Math.ceil(-Math.log(1 - (B * r) / P) / Math.log(1 + r));
    const totalPaid = P * months;
    const totalInterest = totalPaid - B;
    setResult(`Paid off in ${months} months. Total paid: ${formatCurrency(totalPaid, currency)} (${formatCurrency(totalInterest, currency)} in interest).`);
  }

  return (
    <div className="p-6 border border-ink/15">
      <h3 className="display text-2xl mb-1">Debt Payoff</h3>
      <p className="text-sm text-ink/60 mb-5">How long to clear a debt?</p>
      <div className="space-y-3">
        <input className="w-full border border-ink/20 px-4 py-3 bg-cream text-sm focus:outline-none focus:border-burgundy" placeholder={`Outstanding balance (${currency.symbol})`} value={balance} onChange={e => setBalance(e.target.value)} type="number" min="0" />
        <input className="w-full border border-ink/20 px-4 py-3 bg-cream text-sm focus:outline-none focus:border-burgundy" placeholder="Annual interest rate (%)" value={rate} onChange={e => setRate(e.target.value)} type="number" min="0" step="0.1" />
        <input className="w-full border border-ink/20 px-4 py-3 bg-cream text-sm focus:outline-none focus:border-burgundy" placeholder={`Monthly payment (${currency.symbol})`} value={payment} onChange={e => setPayment(e.target.value)} type="number" min="0" />
        <button onClick={calculate} className="w-full bg-ink text-cream py-3 eyebrow hover:bg-burgundy transition-colors">Calculate</button>
        {result && <p className="text-sm font-medium text-burgundy pt-2">{result}</p>}
      </div>
    </div>
  );
}

// ─── Emergency Fund Calculator ──────────────────────────────────────────────
function EmergencyFundCalc() {
  const { currency } = useCurrency();
  const [monthly, setMonthly] = useState("");
  const [months, setMonths] = useState("3");
  const [saved, setSaved] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    const M = parseFloat(monthly);
    const mo = parseFloat(months);
    const S = parseFloat(saved) || 0;
    if (!M || M <= 0) return setResult("Please enter your monthly expenses.");
    const target = M * mo;
    const remaining = Math.max(target - S, 0);
    const pct = Math.min(Math.round((S / target) * 100), 100);
    setResult(`Target: ${formatCurrency(target, currency)}. You are ${pct}% there. Still needed: ${formatCurrency(remaining, currency)}.`);
  }

  return (
    <div className="p-6 border border-ink/15">
      <h3 className="display text-2xl mb-1">Emergency Fund</h3>
      <p className="text-sm text-ink/60 mb-5">How much buffer do you need?</p>
      <div className="space-y-3">
        <input className="w-full border border-ink/20 px-4 py-3 bg-cream text-sm focus:outline-none focus:border-burgundy" placeholder={`Monthly expenses (${currency.symbol})`} value={monthly} onChange={e => setMonthly(e.target.value)} type="number" min="0" />
        <select className="w-full border border-ink/20 px-4 py-3 bg-cream text-sm focus:outline-none focus:border-burgundy" value={months} onChange={e => setMonths(e.target.value)}>
          <option value="3">3 months (minimum)</option>
          <option value="6">6 months (recommended)</option>
          <option value="12">12 months (high stability)</option>
        </select>
        <input className="w-full border border-ink/20 px-4 py-3 bg-cream text-sm focus:outline-none focus:border-burgundy" placeholder={`Already saved (${currency.symbol}) — optional`} value={saved} onChange={e => setSaved(e.target.value)} type="number" min="0" />
        <button onClick={calculate} className="w-full bg-ink text-cream py-3 eyebrow hover:bg-burgundy transition-colors">Calculate</button>
        {result && <p className="text-sm font-medium text-burgundy pt-2">{result}</p>}
      </div>
    </div>
  );
}

// ─── Business Break-Even Calculator ────────────────────────────────────────
function BreakEvenCalc() {
  const { currency } = useCurrency();
  const [fixed, setFixed] = useState("");
  const [varCost, setVarCost] = useState("");
  const [price, setPrice] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    const F = parseFloat(fixed);
    const V = parseFloat(varCost);
    const P = parseFloat(price);
    if (!F || !V || !P || P <= V) return setResult(P <= V ? "Price must be higher than variable cost per unit." : "Please enter valid numbers.");
    const units = Math.ceil(F / (P - V));
    const revenue = units * P;
    setResult(`Break-even at ${units.toLocaleString()} units. Revenue at break-even: ${formatCurrency(revenue, currency)}.`);
  }

  return (
    <div className="p-6 border border-ink/15">
      <h3 className="display text-2xl mb-1">Business Break-Even</h3>
      <p className="text-sm text-ink/60 mb-5">How many units to cover your costs?</p>
      <div className="space-y-3">
        <input className="w-full border border-ink/20 px-4 py-3 bg-cream text-sm focus:outline-none focus:border-burgundy" placeholder={`Monthly fixed costs (${currency.symbol})`} value={fixed} onChange={e => setFixed(e.target.value)} type="number" min="0" />
        <input className="w-full border border-ink/20 px-4 py-3 bg-cream text-sm focus:outline-none focus:border-burgundy" placeholder={`Variable cost per unit (${currency.symbol})`} value={varCost} onChange={e => setVarCost(e.target.value)} type="number" min="0" />
        <input className="w-full border border-ink/20 px-4 py-3 bg-cream text-sm focus:outline-none focus:border-burgundy" placeholder={`Sale price per unit (${currency.symbol})`} value={price} onChange={e => setPrice(e.target.value)} type="number" min="0" />
        <button onClick={calculate} className="w-full bg-ink text-cream py-3 eyebrow hover:bg-burgundy transition-colors">Calculate</button>
        {result && <p className="text-sm font-medium text-burgundy pt-2">{result}</p>}
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
function CurrencyBar() {
  const { currency, setCurrency } = _useCurrency();
  return <CurrencyToggle value={currency} onChange={setCurrency} />;
}
export default function CalculatorsPage() {
  return (
    <>
      <section className="relative pt-40 pb-24 lg:pt-48 bg-ink text-cream overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-6 items-center max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
              <span className="inline-block w-8 h-px bg-gold" />
              Financial Safety & Wealth
            </p>
            <h1 className="display text-[clamp(2.5rem,7vw,7rem)] font-light">
              Financial<br />
              <span className="display-italic text-gold">Calculators</span>
            </h1>
            <p className="body-prose mt-6 max-w-2xl opacity-70">
              Five practical tools for planning your savings, investments, debts, and business finances. All calculations are illustrative only and do not constitute financial advice.
            </p>
            <div className="mt-8">
              <CurrencyBar />
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:flex justify-center lg:col-span-5"
          >
            <Image
              src="/images/safeherlogo.png"
              alt="SafeHer Academy"
              width={280}
              height={280}
              className="w-64 h-64 object-contain opacity-80 drop-shadow-[0_0_60px_rgba(184,150,62,0.2)]"
            />
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <SavingsGoalCalc />
            <CompoundInterestCalc />
            <DebtPayoffCalc />
            <EmergencyFundCalc />
            <BreakEvenCalc />
          </div>
          <p className="mt-10 text-xs text-ink/50 max-w-2xl">
            All calculations use simplified mathematical models for educational illustration only. They do not account for taxes, fees, currency fluctuations, or individual circumstances. Exchange rates used in currency conversion are static approximations and are not live market rates. SafeHers is not a licensed financial advisor.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/financial-literacy" className="border border-ink/30 px-8 py-4 eyebrow hover:border-ink transition-colors">Back to Financial Literacy</Link>
            <Link href="/coaches" className="bg-ink text-cream px-8 py-4 eyebrow hover:bg-burgundy transition-colors">Work with a coach</Link>
          </div>
        </div>
      </section>
    </>
  );
}
