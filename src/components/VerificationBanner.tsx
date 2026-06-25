"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";

export default function VerificationBanner() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const resend = async () => {
    setSending(true);
    await fetch("/api/portal/resend-verification", { method: "POST" });
    setSending(false);
    setSent(true);
  };

  return (
    <div className="bg-gold/10 border border-gold/30 p-4 mb-6 flex items-start gap-3">
      <AlertTriangle size={18} className="text-gold shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-medium">Verify your email address</p>
        <p className="text-xs opacity-60 mt-1">
          Some features like consultations and certificate downloads require a verified email.
        </p>
      </div>
      {sent ? (
        <span className="eyebrow text-xs text-gold shrink-0">Sent ✓</span>
      ) : (
        <button
          onClick={resend}
          disabled={sending}
          className="eyebrow text-xs text-burgundy shrink-0 hover:underline disabled:opacity-50"
        >
          {sending ? "Sending..." : "Resend"}
        </button>
      )}
    </div>
  );
}
