"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

const STORAGE_KEY = "safehers-newsletter-modal";
const RESHOW_DAYS = 7;
const SCROLL_THRESHOLD = 0.6; // 60% scroll depth

function shouldShow(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    const { dismissedAt } = JSON.parse(raw);
    const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
    return daysSince > RESHOW_DAYS;
  } catch {
    return true;
  }
}

function markDismissed() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ dismissedAt: Date.now() })
  );
}

export function NewsletterModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (!shouldShow()) return;

    const handleScroll = () => {
      const scrolled =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled >= SCROLL_THRESHOLD) {
        setOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function dismiss() {
    markDismissed();
    setOpen(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    try {
      const r = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await r.json();
      if (r.ok) {
        setStatus("success");
        markDismissed();
      } else {
        setStatus("error");
        setErrMsg(data.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrMsg("Network error. Please try again.");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            role="dialog"
            aria-modal="true"
            aria-label="Newsletter signup"
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none px-4"
          >
            <div className="bg-cream max-w-lg w-full pointer-events-auto relative overflow-hidden">
              {/* Burgundy accent bar */}
              <div className="h-1 bg-burgundy w-full" />

              <div className="p-8 lg:p-10">
                <button
                  onClick={dismiss}
                  aria-label="Close"
                  className="absolute top-5 right-5 opacity-40 hover:opacity-100 transition-opacity"
                >
                  <X size={18} />
                </button>

                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="inline-flex w-14 h-14 rounded-full bg-burgundy items-center justify-center mb-5">
                      <Check size={22} color="white" />
                    </div>
                    <h3 className="display text-3xl mb-3">You're in.</h3>
                    <p className="body-prose opacity-70 text-sm mb-6">
                      Check your inbox for a welcome message and your free
                      Personal Safety Checklist.
                    </p>
                    <button onClick={dismiss} className="eyebrow link-underline">
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <p className="eyebrow opacity-60 mb-3 flex items-center gap-2">
                      <span className="inline-block w-5 h-px bg-ink" />
                      Free download
                    </p>
                    <h3 className="display text-3xl lg:text-4xl mb-3 leading-tight">
                      Get your Personal
                      <br />
                      <span className="display-italic text-burgundy">
                        Safety Checklist
                      </span>
                    </h3>
                    <p className="body-prose text-sm opacity-70 mb-7">
                      A practical, printable guide used by over 2,000 women
                      across Africa. Enter your email and we'll send it
                      instantly — no spam, unsubscribe any time.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Honeypot */}
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        style={{ display: "none" }}
                      />
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy transition-colors text-sm"
                      />
                      {errMsg && (
                        <p className="text-xs text-rose">{errMsg}</p>
                      )}
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full bg-ink text-cream py-3 font-mono text-xs tracking-widest uppercase hover:bg-burgundy transition-colors disabled:opacity-60"
                      >
                        {status === "loading" ? "Sending…" : "Send me the checklist ✦"}
                      </button>
                    </form>

                    <button
                      onClick={dismiss}
                      className="mt-4 text-xs opacity-40 hover:opacity-70 transition-opacity w-full text-center"
                    >
                      No thanks
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
