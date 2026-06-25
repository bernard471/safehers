"use client";

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://instagram.com/safeherfoundation",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/safeherfoundation",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/safeherfdn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/safeher-foundation",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@safeherfoundation",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#0C0C0E" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@safeherfoundation",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.38-6.19V9.06a8.16 8.16 0 0 0 4.84 1.58V7.19a4.85 4.85 0 0 1-1-.5z" />
      </svg>
    ),
  },
  {
    name: "Threads",
    href: "https://threads.net/@safeherfoundation",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
        <path d="M12.186 24h-.007C5.965 24 2.615 20.248 2.615 14.735c0-5.063 3.128-9.735 9.571-9.735 3.89 0 6.498 1.97 7.677 4.478l-2.682 1.248c-.753-1.588-2.266-2.726-4.995-2.726-4.106 0-6.211 3.163-6.211 6.735 0 4.19 2.475 6.265 6.225 6.265 2.105 0 3.646-.609 4.697-1.834.738-.862 1.199-2.032 1.336-3.393h-5.148V13.2h8.033c.091.504.138 1.03.138 1.576 0 2.852-.808 5.09-2.332 6.63C17.389 22.992 15.13 24 12.186 24z" />
      </svg>
    ),
  },
];

export function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {SOCIALS.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`SafeHer Foundation on ${s.name}`}
          className="w-9 h-9 rounded-full border border-cream/15 flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold/40 transition-colors"
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}

export function SocialIconsLight({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {SOCIALS.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`SafeHer Foundation on ${s.name}`}
          className="w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center text-ink/40 hover:text-burgundy hover:border-burgundy/40 transition-colors"
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}

export { SOCIALS };
