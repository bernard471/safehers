"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Menu, X, ChevronDown, Building2, BarChart, Users, Calendar,
  BookOpen, UserCircle, MessageSquare, FileText, Award,
  HelpCircle, MapPin, ArrowUpRight, Heart, GraduationCap,
} from "lucide-react";
import { SocialIcons } from "./SocialLinks";

const primaryLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Programs" },
  { href: "/academy", label: "Academy" },
  { href: "/resources", label: "Resources" },
  { href: "/chapters", label: "Chapters" },
];

const moreGroups = [
  {
    title: "Foundation",
    items: [
      { href: "/foundation", label: "The Foundation", icon: Building2, desc: "Structure, mission, and governance" },
      { href: "/impact", label: "Impact", icon: BarChart, desc: "Outcomes and evaluation" },
      { href: "/partners", label: "Partners", icon: Users, desc: "Institutional partnerships" },
      { href: "/team", label: "Our Team", icon: UserCircle, desc: "Leadership and open roles" },
    ],
  },
  {
    title: "Learn",
    items: [
      { href: "/events", label: "Events", icon: Calendar, desc: "Workshops and webinars" },
      { href: "/blog", label: "Journal", icon: BookOpen, desc: "Safety guides and insights" },
      { href: "/case-studies", label: "Case Studies", icon: FileText, desc: "Real-world impact stories" },
      { href: "/testimonials", label: "Testimonials", icon: MessageSquare, desc: "Voices from the community" },
    ],
  },
  {
    title: "Support",
    items: [
      { href: "/program-support", label: "Training Packages", icon: Award, desc: "Certification pricing and scholarships" },
      { href: "/faq", label: "FAQ", icon: HelpCircle, desc: "Common questions answered" },
      { href: "/ghana", label: "Ghana Hub", icon: MapPin, desc: "Our headquarters and local work" },
    ],
  },
];

const allMoreLinks = moreGroups.flatMap(g => g.items);

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

  useEffect(() => {
    if (!moreOpen) return;
    const handler = () => setMoreOpen(false);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [moreOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  const isMoreActive = allMoreLinks.some((l) => isActive(l.href));

  return (
    <>
      <header
        className={`relative sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-md shadow-sm"
            : "bg-cream/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <Image src="/images/safeherlogo.png" alt="SafeHer Foundation" width={36} height={36} className="w-9 h-9 object-contain" />
            <span className="display text-2xl font-medium tracking-tight">SafeHer</span>
            <span className="text-gold text-xs font-mono tracking-widest uppercase hidden sm:inline">Foundation</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {primaryLinks.map((l) => (
              <Link key={l.href} href={l.href}
                className={`link-underline text-sm font-medium tracking-wide transition-colors ${isActive(l.href) ? "text-burgundy" : "text-ink"}`}>
                {l.label}
              </Link>
            ))}

            {/* More mega dropdown */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setMoreOpen((v) => !v); }}
                className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors ${isMoreActive ? "text-burgundy" : "text-ink"}`}
                aria-expanded={moreOpen}
              >
                More
                <ChevronDown size={14} className={`transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
              </button>

              {moreOpen && (
                <div onClick={(e) => e.stopPropagation()}
                  className="absolute top-full right-0 mt-4 bg-cream border border-ink/10 shadow-2xl z-50 w-[680px]"
                >
                  <div className="grid grid-cols-3 gap-0 divide-x divide-ink/5">
                    {moreGroups.map((group) => (
                      <div key={group.title} className="py-5">
                        <p className="eyebrow text-[10px] text-gold px-5 mb-3">{group.title}</p>
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link key={item.href} href={item.href} onClick={() => setMoreOpen(false)}
                              className={`flex items-start gap-3 px-5 py-2.5 hover:bg-bone transition-colors group ${isActive(item.href) ? "text-burgundy" : "text-ink"}`}>
                              <Icon size={16} strokeWidth={1.5} className="text-gold mt-0.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                              <div>
                                <p className="text-sm font-medium leading-tight">{item.label}</p>
                                <p className="text-[11px] opacity-40 mt-0.5 leading-tight">{item.desc}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {/* Bottom bar with featured CTAs */}
                  <div className="border-t border-ink/10 bg-bone/50 px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <Link href="/consultation" onClick={() => setMoreOpen(false)} className="flex items-center gap-2 text-xs font-medium text-burgundy hover:text-ink transition-colors">
                        <Heart size={13} /> Book a consultation
                      </Link>
                      <Link href="/volunteer" onClick={() => setMoreOpen(false)} className="flex items-center gap-2 text-xs font-medium opacity-50 hover:opacity-100 transition-opacity">
                        <GraduationCap size={13} /> Volunteer
                      </Link>
                    </div>
                    <Link href="/donate" onClick={() => setMoreOpen(false)} className="flex items-center gap-2 text-xs font-medium text-gold hover:text-burgundy transition-colors">
                      Support our work <ArrowUpRight size={11} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/donate"
              className={`bg-gold text-ink px-5 py-2.5 text-xs tracking-[0.18em] uppercase font-mono hover:bg-burgundy hover:text-cream transition-colors ${isActive("/donate") ? "bg-burgundy text-cream" : ""}`}>
              Donate
            </Link>
            <Link href="/contact"
              className={`bg-ink text-cream px-5 py-2.5 text-xs tracking-[0.18em] uppercase font-mono hover:bg-burgundy transition-colors ${isActive("/contact") ? "bg-burgundy" : ""}`}>
              Contact
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(true)} className="lg:hidden p-2" aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-ink text-cream flex flex-col overflow-y-auto">
          <div className="px-6 py-5 flex items-center justify-between shrink-0">
            <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
              <Image src="/images/safeherlogo.png" alt="SafeHer Foundation" width={32} height={32} className="w-8 h-8 object-contain" />
              <span className="display text-2xl">SafeHer</span>
              <span className="text-gold text-xs font-mono tracking-widest uppercase">Foundation</span>
            </Link>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2"><X size={24} /></button>
          </div>

          <nav className="flex-1 px-6 py-6 overflow-y-auto">
            {/* Primary links large */}
            {primaryLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className={`display text-3xl py-2 block transition-colors ${isActive(l.href) ? "text-gold" : "text-cream/80 hover:text-cream"}`}>
                {l.label}
              </Link>
            ))}

            {/* Grouped more links */}
            {moreGroups.map((group) => (
              <div key={group.title} className="mt-6">
                <p className="eyebrow text-[10px] text-gold/60 mb-2">{group.title}</p>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 py-2.5 transition-colors ${isActive(item.href) ? "text-gold" : "text-cream/60 hover:text-cream"}`}>
                      <Icon size={16} strokeWidth={1.5} className="text-gold/40" />
                      <span className="text-lg">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          <div className="px-6 pb-8 space-y-3 shrink-0">
            <Link href="/donate" onClick={() => setOpen(false)}
              className="block w-full text-center bg-gold text-ink py-4 eyebrow hover:bg-cream transition-colors">
              Donate
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)}
              className="block w-full text-center border border-cream/30 text-cream py-4 eyebrow hover:bg-cream/10 transition-colors">
              Contact Us
            </Link>
            <Link href="/consultation" onClick={() => setOpen(false)}
              className="block w-full text-center border border-cream/10 text-cream/60 py-3 eyebrow text-xs hover:bg-cream/5 transition-colors">
              Book a Consultation
            </Link>
            <SocialIcons className="justify-center pt-4" />
            <p className="eyebrow opacity-40 text-center pt-2">
              Accra, Ghana &middot; Washington, D.C.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
