"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[SafeHers error boundary]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow mb-6 text-burgundy">Something went wrong</p>
      <h1 className="display text-[clamp(3rem,8vw,8rem)] font-light max-w-[700px] mb-6">
        An unexpected{" "}
        <span className="display-italic text-burgundy">error occurred</span>
      </h1>
      <p className="body-prose text-ink/60 max-w-md mb-12">
        We have been notified and are looking into it. Please try again, or
        navigate to another section of the site.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={reset}
          className="bg-ink text-cream px-8 py-3 eyebrow hover:bg-burgundy transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="border border-ink px-8 py-3 eyebrow hover:bg-ink hover:text-cream transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/contact"
          className="border border-ink px-8 py-3 eyebrow hover:bg-ink hover:text-cream transition-colors"
        >
          Contact Us
        </Link>
      </div>
      {error.digest && (
        <p className="mt-10 text-xs text-ink/30 font-mono">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
