"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function getDashboardForRole(role?: string): string {
  switch (role) {
    case "institution_admin":
      return "/institution";
    case "donor":
      return "/donor";
    case "educator":
      return "/educator";
    case "consultant":
      return "/consultant";
    default:
      return "/portal";
  }
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("portal-login", { redirect: false, email, password });
    if (res?.ok) {
      if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        // Fetch the session to get the user's role for redirect
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();
        router.push(getDashboardForRole(session?.user?.role));
      }
    } else {
      setError("Invalid email or password.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-cream mb-12 text-center">
          <Image src="/images/safeherlogo.png" alt="SafeHer Foundation" width={64} height={64} className="w-16 h-16 object-contain mx-auto mb-4" />
          <h1 className="display text-4xl font-light mb-1">SafeHer Academy</h1>
          <p className="eyebrow text-cream/40 mt-4">Student Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-cream p-10 space-y-5">
          <div>
            <label className="eyebrow opacity-60 block mb-2">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy transition-colors" />
          </div>
          <div>
            <label className="eyebrow opacity-60 block mb-2">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy transition-colors" />
          </div>
          {error && <p className="text-sm text-burgundy">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-ink text-cream py-4 eyebrow hover:bg-burgundy transition-colors disabled:opacity-60">
            {loading ? "Signing in..." : "Sign In"}
          </button>
          <div className="text-center space-y-2">
            <p className="text-sm opacity-60">
              Don&apos;t have an account?{" "}
              <Link href={callbackUrl ? `/portal/register?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/portal/register"} className="text-burgundy link-underline">Create one</Link>
            </p>
            <p className="text-sm opacity-40">
              <Link href="/portal/forgot-password" className="link-underline">Forgot password?</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PortalLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ink flex items-center justify-center p-6 text-cream opacity-50 font-mono text-xs uppercase tracking-widest">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
