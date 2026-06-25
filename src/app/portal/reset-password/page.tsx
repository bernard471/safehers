"use client";

import { Suspense } from "react";
import { ResetPasswordForm } from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <p className="eyebrow text-cream/50">Loading...</p>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
