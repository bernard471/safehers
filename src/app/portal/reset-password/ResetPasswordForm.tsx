"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrMsg("");
    if (password !== confirm) { setErrMsg("Passwords do not match."); return; }
    if (password.length < 8) { setErrMsg("Password must be at least 8 characters."); return; }
    setStatus("loading");
    try {
      const r = await fetch("/api/portal/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await r.json();
      if (r.ok) setStatus("success");
      else { setErrMsg(data.error || "Reset failed."); setStatus("error"); }
    } catch { setErrMsg("Network error."); setStatus("error"); }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center p-6">
        <div className="bg-cream p-10 max-w-md text-center">
          <h2 className="display text-2xl mb-4">Invalid reset link</h2>
          <p className="body-prose opacity-70 mb-6">This password reset link is invalid or has expired.</p>
          <Link href="/portal/forgot-password" className="eyebrow text-burgundy link-underline">Request a new link</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-cream mb-12 text-center">
          <Image src="/images/safeherlogo.png" alt="SafeHer Foundation" width={64} height={64} className="w-16 h-16 object-contain mx-auto mb-4" />
          <h1 className="display text-3xl font-light mb-1">New Password</h1>
        </div>

        {status === "success" ? (
          <div className="bg-cream p-10 text-center">
            <h2 className="display text-2xl mb-4">Password reset.</h2>
            <p className="body-prose opacity-70 mb-6">Your password has been updated. You can now sign in.</p>
            <Link href="/portal/login" className="bg-ink text-cream px-8 py-4 eyebrow hover:bg-burgundy transition-colors inline-block">Sign In</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-cream p-10 space-y-5">
            <div>
              <label className="eyebrow opacity-60 block mb-2">New password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy" />
            </div>
            <div>
              <label className="eyebrow opacity-60 block mb-2">Confirm password</label>
              <input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)}
                className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy" />
            </div>
            {errMsg && <p className="text-sm text-burgundy">{errMsg}</p>}
            <button type="submit" disabled={status === "loading"}
              className="w-full bg-ink text-cream py-4 eyebrow hover:bg-burgundy transition-colors disabled:opacity-60">
              {status === "loading" ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
