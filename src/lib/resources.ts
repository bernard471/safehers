export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "PDF" | "Checklist" | "Toolkit" | "Protocol" | "Guide" | "Worksheet" | "Poster";
  category: string;
  pages?: number;
  downloadUrl: string;
  featured?: boolean;
  courseSlug?: string;
  audience?: string;
}

export const RESOURCES: Resource[] = [
  // ── Personal Safety ────────────────────────────────────────────────────────
  {
    id: "personal-safety-checklist",
    title: "Personal Safety Checklist",
    description: "A comprehensive 30-point checklist covering daily habits, awareness protocols, and response frameworks for personal safety. Printable and pocket-sized.",
    type: "Checklist",
    category: "Personal Safety",
    pages: 4,
    downloadUrl: "/placeholder-resources/personal-safety-checklist.pdf",
    featured: true,
    courseSlug: "personal-safety-foundations",
    audience: "All women & girls",
  },
  {
    id: "safety-circle-template",
    title: "Safety Circle Template",
    description: "A fill-in template to build your safety circle — 2-4 trusted people with contact details, code words, and check-in protocols.",
    type: "Worksheet",
    category: "Personal Safety",
    pages: 2,
    downloadUrl: "/placeholder-resources/safety-circle-template.pdf",
    courseSlug: "personal-safety-foundations",
    audience: "All women & girls",
  },
  {
    id: "emergency-contact-plan",
    title: "Emergency Contact Plan",
    description: "A printable emergency contact card with spaces for police, hospital, safety circle, family, and local support organisations. Keep one in your bag and one at home.",
    type: "PDF",
    category: "Personal Safety",
    pages: 1,
    downloadUrl: "/placeholder-resources/emergency-contact-plan.pdf",
    featured: true,
    audience: "All women & girls",
  },
  {
    id: "home-safety-audit",
    title: "Home Safety Audit Worksheet",
    description: "Walk through every room and entry point of your home with this structured audit. Identify vulnerabilities and create an action plan.",
    type: "Worksheet",
    category: "Home Safety",
    pages: 8,
    downloadUrl: "/placeholder-resources/home-safety-audit.pdf",
    audience: "Households",
  },

  // ── Online Safety ──────────────────────────────────────────────────────────
  {
    id: "online-safety-guide",
    title: "Online Safety Quick Guide",
    description: "A visual, easy-to-share guide covering password hygiene, two-factor authentication, social media privacy settings, and recognising common online scams.",
    type: "Guide",
    category: "Online Safety",
    pages: 6,
    downloadUrl: "/placeholder-resources/online-safety-guide.pdf",
    audience: "All women & girls",
  },
  {
    id: "mobile-money-fraud-guide",
    title: "Mobile Money Fraud Prevention",
    description: "Step-by-step protection against the most common mobile money scams in West Africa — including SIM swap fraud, fake agent scams, and wrong-transfer tricks.",
    type: "Guide",
    category: "Financial Safety",
    pages: 10,
    downloadUrl: "/placeholder-resources/mobile-money-fraud-guide.pdf",
    featured: true,
    courseSlug: "mobile-money-fraud",
    audience: "Mobile money users",
  },
  {
    id: "sextortion-response-protocol",
    title: "Sextortion Response Protocol",
    description: "A calm, step-by-step action plan for anyone experiencing sextortion or image-based abuse. Covers immediate steps, reporting channels, evidence preservation, and emotional support.",
    type: "Protocol",
    category: "Online Safety",
    pages: 5,
    downloadUrl: "/placeholder-resources/sextortion-response-protocol.pdf",
    featured: true,
    courseSlug: "sextortion-blackmail-response",
    audience: "Survivors & supporters",
  },
  {
    id: "phone-privacy-checklist",
    title: "Phone Privacy Checklist",
    description: "A step-by-step checklist to audit your phone for spy apps, lock down permissions, enable 2FA, and protect your digital privacy.",
    type: "Checklist",
    category: "Online Safety",
    pages: 3,
    downloadUrl: "/placeholder-resources/phone-privacy-checklist.pdf",
    courseSlug: "phone-privacy-spy-detection",
    audience: "All phone users",
  },
  {
    id: "social-media-safety-checklist",
    title: "Social Media Safety Checklist",
    description: "Platform-by-platform privacy settings guide for Instagram, Facebook, WhatsApp, TikTok, and X. Protect your identity and control your digital footprint.",
    type: "Checklist",
    category: "Online Safety",
    pages: 6,
    downloadUrl: "/placeholder-resources/social-media-safety-checklist.pdf",
    courseSlug: "social-media-safety",
    audience: "Social media users",
  },
  {
    id: "password-security-guide",
    title: "Password Security Guide",
    description: "How to create strong passwords, set up a password manager, enable 2FA on every account, and store backup codes safely.",
    type: "Guide",
    category: "Online Safety",
    pages: 4,
    downloadUrl: "/placeholder-resources/password-security-guide.pdf",
    audience: "All users",
  },

  // ── Campus Safety ──────────────────────────────────────────────────────────
  {
    id: "campus-safety-toolkit",
    title: "University Campus Safety Toolkit",
    description: "Designed for university students across Africa. Covers accommodation safety, social situation protocols, digital safety on campus, and emergency contacts.",
    type: "Toolkit",
    category: "Campus Safety",
    pages: 20,
    downloadUrl: "/placeholder-resources/campus-safety-toolkit.pdf",
    courseSlug: "campus-hostel-safety",
    audience: "University students",
  },
  {
    id: "hostel-safety-poster",
    title: "Hostel Safety Poster",
    description: "A printable A3 poster with 10 essential hostel safety rules. Designed for notice boards in university halls of residence.",
    type: "Poster",
    category: "Campus Safety",
    pages: 1,
    downloadUrl: "/placeholder-resources/hostel-safety-poster.pdf",
    audience: "University hostels",
  },

  // ── Financial Safety ───────────────────────────────────────────────────────
  {
    id: "financial-safety-basics",
    title: "Financial Safety Basics",
    description: "A beginner's guide to protecting your money — covering budgeting, mobile money security, savings strategies, and recognising financial fraud.",
    type: "Guide",
    category: "Financial Safety",
    pages: 8,
    downloadUrl: "/placeholder-resources/financial-safety-basics.pdf",
    audience: "All women",
  },

  // ── Institutional ──────────────────────────────────────────────────────────
  {
    id: "institutional-programme-overview",
    title: "SafeHers Institutional Programme Overview",
    description: "A 2-page overview for university registrars, HR directors, and NGO leads considering a SafeHers institutional programme.",
    type: "PDF",
    category: "Institutional",
    pages: 2,
    downloadUrl: "/placeholder-resources/institutional-overview.pdf",
    audience: "Decision-makers",
  },
];

export function getResourceById(id: string): Resource | undefined {
  return RESOURCES.find((r) => r.id === id);
}
