"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

type Format = "in-person-accra" | "virtual" | "either";
type State = "idle" | "loading" | "success" | "error";

const FORMAT_OPTIONS: { value: Format; label: string }[] = [
  { value: "in-person-accra", label: "In-person · Accra" },
  { value: "virtual", label: "Virtual cohort · Zoom" },
  { value: "either", label: "Either works for me" },
];

const inputBase =
  "w-full bg-transparent border-b border-ink/30 focus:border-[#5C1F2E] outline-none py-3 text-ink placeholder:text-ink/40 transition-colors duration-200 text-[1.0625rem]";

const labelBase = "eyebrow block mb-1 text-ink/60";

export default function RegistrationForm() {
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "Ghana",
    phone: "",
    format: "either" as Format,
    learningGoals: "",
    consentToContact: true,
    website: "", // honeypot
  });

  function set(k: keyof typeof form, v: string | boolean) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setState("error");
      } else {
        setState("success");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="py-16 text-center max-w-lg mx-auto">
        <p className="eyebrow text-[#5C1F2E] mb-6">You&rsquo;re confirmed</p>
        <h3
          className="display font-light mb-6"
          style={{ fontSize: "clamp(3rem, 7vw, 5rem)", lineHeight: 0.95 }}
        >
          You&rsquo;re in.
        </h3>
        <p className="body-prose text-ink/70 mb-8">
          We have your name on the waitlist. As soon as launch dates are
          confirmed, you will be the first to know. Check your inbox for a
          confirmation from us.
        </p>
        <p className="eyebrow text-ink/40 text-[10px]">
          Know someone who needs this? Share the link with a friend.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-xl space-y-8">
      {/* Honeypot — visually hidden */}
      <div style={{ position: "absolute", left: -9999, top: "auto", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="website">Leave this empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className={labelBase}>Full name</label>
        <input
          id="name"
          type="text"
          required
          autoComplete="name"
          className={inputBase}
          placeholder="Your full name"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelBase}>Email address</label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          className={inputBase}
          placeholder="you@email.com"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
        />
      </div>

      {/* Country */}
      <div>
        <label htmlFor="country" className={labelBase}>Country</label>
        <input
          id="country"
          type="text"
          className={inputBase}
          placeholder="Ghana"
          value={form.country}
          onChange={(e) => set("country", e.target.value)}
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className={labelBase}>
          Phone{" "}
          <span className="normal-case text-ink/40 tracking-normal font-sans font-normal text-xs">
            — optional. We&rsquo;ll only contact you about this workshop.
          </span>
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          className={inputBase}
          placeholder="+233 ..."
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
        />
      </div>

      {/* Format */}
      <fieldset>
        <legend className={labelBase}>Format preference</legend>
        <div className="mt-3 space-y-3">
          {FORMAT_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <span
                className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-colors ${
                  form.format === opt.value
                    ? "border-[#5C1F2E] bg-[#5C1F2E]"
                    : "border-ink/30 group-hover:border-ink/60"
                }`}
              >
                {form.format === opt.value && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cream block" />
                )}
              </span>
              <input
                type="radio"
                name="format"
                value={opt.value}
                checked={form.format === opt.value}
                onChange={() => set("format", opt.value)}
                className="sr-only"
              />
              <span className="text-[1.0625rem]">{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Learning goals */}
      <div>
        <label htmlFor="learningGoals" className={labelBase}>
          What do you want to learn from this workshop?{" "}
          <span className="normal-case text-ink/40 tracking-normal font-sans font-normal text-xs">
            — optional
          </span>
        </label>
        <textarea
          id="learningGoals"
          rows={4}
          maxLength={1000}
          className={`${inputBase} resize-none`}
          placeholder="Anything on your mind..."
          value={form.learningGoals}
          onChange={(e) => set("learningGoals", e.target.value)}
        />
      </div>

      {/* Consent */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <span
          className={`w-4 h-4 flex-shrink-0 mt-0.5 border transition-colors ${
            form.consentToContact ? "border-[#5C1F2E] bg-[#5C1F2E]" : "border-ink/30"
          }`}
        >
          {form.consentToContact && (
            <svg viewBox="0 0 10 10" className="w-full h-full p-0.5" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M1.5 5l2.5 2.5L8.5 2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </span>
        <input
          type="checkbox"
          className="sr-only"
          checked={form.consentToContact}
          onChange={(e) => set("consentToContact", e.target.checked)}
        />
        <span className="text-sm text-ink/70 leading-relaxed">
          I&rsquo;m happy to be contacted about this workshop and future SafeHers programs.
        </span>
      </label>

      {/* Error */}
      {state === "error" && (
        <p className="text-sm text-[#5C1F2E] border-l-2 border-[#5C1F2E] pl-4">{errorMsg}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={state === "loading"}
        className="group inline-flex items-center gap-3 bg-ink text-cream px-8 py-4 hover:bg-[#5C1F2E] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span className="eyebrow">
          {state === "loading" ? "Sending..." : "JOIN THE WAITLIST"}
        </span>
        {state !== "loading" && (
          <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
        )}
      </button>
    </form>
  );
}
