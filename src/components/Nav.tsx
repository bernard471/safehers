"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const primaryLinks = [
  { href: "/services", label: "Programs" },
  { href: "/blog", label: "Journal" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

const moreLinks = [
  { href: "/testimonials", label: "Testimonials" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/ghana", label: "Ghana" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close more dropdown when clicking outside
  useEffect(() => {
    if (!moreOpen) return;
    const handler = () => setMoreOpen(false);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [moreOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  const isMoreActive = moreLinks.some((l) => isActive(l.href));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-md shadow-sm"
            : "bg-cream/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <span className="display text-2xl font-medium tracking-tight">
              SafeHers
            </span>
            <span className="text-burgundy text-xl">✦</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {primaryLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`link-underline text-sm font-medium tracking-wide transition-colors ${
                  isActive(l.href) ? "text-burgundy" : "text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMoreOpen((v) => !v);
                }}
                className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors ${
                  isMoreActive ? "text-burgundy" : "text-ink"
                }`}
                aria-expanded={moreOpen}
              >
                More
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
                />
              </button>

              {moreOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-full right-0 mt-3 w-48 bg-cream border border-ink/10 shadow-xl z-50"
                >
                  {moreLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setMoreOpen(false)}
                      className={`block px-5 py-3 text-sm font-medium border-b border-ink/10 last:border-0 hover:bg-bone transition-colors ${
                        isActive(l.href) ? "text-burgundy" : "text-ink"
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className={`bg-ink text-cream px-5 py-2.5 text-xs tracking-[0.18em] uppercase font-mono hover:bg-burgundy transition-colors ${
                isActive("/contact") ? "bg-burgundy" : ""
              }`}
            >
              Partner with us
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-ink text-cream flex flex-col overflow-y-auto">
          <div className="px-6 py-5 flex items-center justify-between shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <span className="display text-2xl">SafeHers</span>
              <span className="text-rose">✦</span>
            </Link>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-2"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center gap-2 px-6 py-8">
            {[...primaryLinks, ...moreLinks].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`display text-4xl py-2 transition-colors ${
                  isActive(l.href) ? "text-rose" : "text-cream/80 hover:text-cream"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="px-6 pb-10 space-y-4 shrink-0">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block w-full text-center bg-cream text-ink py-4 eyebrow hover:bg-bone transition-colors"
            >
              Partner with us ✦
            </Link>
            <p className="eyebrow opacity-40 text-center">
              Accra · Ghana / Washington · USA
            </p>
          </div>
        </div>
      )}
    </>
  );
}
