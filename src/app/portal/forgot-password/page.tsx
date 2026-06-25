"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const r = await fetch("/api/portal/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (r.ok) setStatus("sent");
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-cream mb-12 text-center">
          <Image src="/images/safeherlogo.png" alt="SafeHer Foundation" width={64} height={64} className="w-16 h-16 object-contain mx-auto mb-4" />
          <h1 className="display text-3xl font-light mb-1">Reset Password</h1>
          <p className="eyebrow text-cream/40 mt-4">SafeHer Academy</p>
        </div>

        {status === "sent" ? (
          <div className="bg-cream p-10 text-center">
            <h2 className="display text-2xl mb-4">Check your email.</h2>
            <p className="body-prose opacity-70 mb-6">
              If an account exists with that email, we&apos;ve sent a password reset link.
              Check your inbox and spam folder.
            </p>
            <Link href="/portal/login" className="eyebrow text-burgundy link-underline">Back to login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-cream p-10 space-y-5">
            <p className="text-sm opacity-60 mb-4">
              Enter the email address you used to register. We&apos;ll send you a link to reset your password.
            </p>
            <div>
              <label className="eyebrow opacity-60 block mb-2">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy" />
            </div>
            {status === "error" && <p className="text-sm text-burgundy">Something went wrong. Try again.</p>}
            <button type="submit" disabled={status === "loading"}
              className="w-full bg-ink text-cream py-4 eyebrow hover:bg-burgundy transition-colors disabled:opacity-60">
              {status === "loading" ? "Sending..." : "Send Reset Link"}
            </button>
            <p className="text-center text-sm opacity-60">
              <Link href="/portal/login" className="text-burgundy link-underline">Back to login</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
