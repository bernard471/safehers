"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", phone: "", country: "Ghana", dateOfBirth: "", guardianName: "", guardianEmail: "", guardianConsent: false });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value });

  const isMinor = form.dateOfBirth ? new Date().getFullYear() - new Date(form.dateOfBirth).getFullYear() < 18 : false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    try {
      const r = await fetch("/api/portal/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await r.json();
      if (r.ok) {
        const nextUrl = callbackUrl ? `/portal/login?registered=1&callbackUrl=${encodeURIComponent(callbackUrl)}` : "/portal/login?registered=1";
        router.push(nextUrl);
      } else {
        setError(data.error || "Registration failed.");
        setLoading(false);
      }
    } catch { setError("Network error."); setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="text-cream mb-10 text-center">
          <Image src="/images/safeherlogo.png" alt="SafeHer Foundation" width={64} height={64} className="w-16 h-16 object-contain mx-auto mb-4" />
          <h1 className="display text-4xl font-light mb-1">Create Account</h1>
          <p className="eyebrow text-cream/40 mt-4">SafeHer Academy — Student Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-cream p-10 space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="eyebrow opacity-60 block mb-2">Full name *</label>
              <input required value={form.name} onChange={update("name")} className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy" />
            </div>
            <div>
              <label className="eyebrow opacity-60 block mb-2">Email *</label>
              <input type="email" required value={form.email} onChange={update("email")} className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="eyebrow opacity-60 block mb-2">Password *</label>
              <input type="password" required value={form.password} onChange={update("password")} className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy" />
            </div>
            <div>
              <label className="eyebrow opacity-60 block mb-2">Confirm password *</label>
              <input type="password" required value={form.confirmPassword} onChange={update("confirmPassword")} className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="eyebrow opacity-60 block mb-2">Phone</label>
              <input value={form.phone} onChange={update("phone")} className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy" />
            </div>
            <div>
              <label className="eyebrow opacity-60 block mb-2">Country</label>
              <input value={form.country} onChange={update("country")} className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy" />
            </div>
          </div>
          <div>
            <label className="eyebrow opacity-60 block mb-2">Date of birth</label>
            <input type="date" value={form.dateOfBirth} onChange={update("dateOfBirth")} className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy" />
          </div>

          {isMinor && (
            <div className="border border-burgundy/30 p-6 bg-bone space-y-4">
              <p className="eyebrow text-xs text-burgundy">Guardian Consent Required</p>
              <p className="text-xs opacity-60">Participants under 18 require guardian consent to register.</p>
              <div>
                <label className="eyebrow opacity-60 block mb-2">Guardian name *</label>
                <input required value={form.guardianName} onChange={update("guardianName")} className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy" />
              </div>
              <div>
                <label className="eyebrow opacity-60 block mb-2">Guardian email *</label>
                <input type="email" required value={form.guardianEmail} onChange={update("guardianEmail")} className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy" />
              </div>
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" checked={form.guardianConsent} onChange={update("guardianConsent")} className="mt-1" />
                <span>I confirm I am the guardian and consent to this minor&apos;s participation in SafeHer Academy.</span>
              </label>
            </div>
          )}

          {error && <p className="text-sm text-burgundy">{error}</p>}

          <div className="border border-ink/10 p-4 bg-bone">
            <p className="text-xs opacity-50">By creating an account, you agree to SafeHer Foundation&apos;s <Link href="/terms" className="link-underline">Terms</Link> and <Link href="/privacy" className="link-underline">Privacy Policy</Link>. Your data is protected under Ghana&apos;s Data Protection Act 2012.</p>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-ink text-cream py-4 eyebrow hover:bg-burgundy transition-colors disabled:opacity-60">
            {loading ? "Creating account..." : "Create Account"}
          </button>
          <p className="text-center text-sm opacity-60">
            Already have an account?{" "}
            <Link href={callbackUrl ? `/portal/login?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/portal/login"} className="text-burgundy link-underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function PortalRegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ink flex items-center justify-center p-6 text-cream opacity-50 font-mono text-xs uppercase tracking-widest">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
