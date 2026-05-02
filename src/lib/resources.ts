export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "PDF" | "Checklist" | "Toolkit" | "Protocol" | "Guide";
  category: string;
  pages?: number;
  downloadUrl: string; // placeholder — replace with real storage URLs
}

export const RESOURCES: Resource[] = [
  {
    id: "personal-safety-checklist",
    title: "Personal Safety Checklist",
    description:
      "A comprehensive 30-point checklist covering daily habits, awareness protocols, and response frameworks for personal safety. Printable and pocket-sized.",
    type: "Checklist",
    category: "Personal Safety",
    pages: 4,
    downloadUrl: "/placeholder-resources/personal-safety-checklist.pdf",
  },
  {
    id: "home-safety-audit",
    title: "Home Safety Audit Worksheet",
    description:
      "Walk through every room and entry point of your home with this structured audit worksheet. Identify vulnerabilities and create an action plan in under an hour.",
    type: "PDF",
    category: "Home Safety",
    pages: 8,
    downloadUrl: "/placeholder-resources/home-safety-audit.pdf",
  },
  {
    id: "online-safety-guide",
    title: "Online Safety Quick Guide",
    description:
      "A visual, easy-to-share guide covering password hygiene, two-factor authentication, social media privacy settings, and recognising common online scams.",
    type: "Guide",
    category: "Online Safety",
    pages: 6,
    downloadUrl: "/placeholder-resources/online-safety-guide.pdf",
  },
  {
    id: "campus-safety-toolkit",
    title: "University Campus Safety Toolkit",
    description:
      "Designed for university students across Africa. Covers accommodation safety, social situation protocols, digital safety on campus, and emergency contacts.",
    type: "Toolkit",
    category: "Personal Safety",
    pages: 20,
    downloadUrl: "/placeholder-resources/campus-safety-toolkit.pdf",
  },
  {
    id: "mobile-money-fraud-guide",
    title: "Mobile Money Fraud Prevention Guide",
    description:
      "Step-by-step protection against the most common mobile money scams in West Africa — including SIM swap fraud, fake agent scams, and wrong-transfer tricks.",
    type: "Guide",
    category: "Online Safety",
    pages: 10,
    downloadUrl: "/placeholder-resources/mobile-money-fraud-guide.pdf",
  },
  {
    id: "sextortion-response-protocol",
    title: "Sextortion Response Protocol",
    description:
      "A calm, step-by-step action plan for anyone experiencing sextortion or image-based abuse. Covers immediate steps, reporting channels, evidence preservation, and emotional support resources.",
    type: "Protocol",
    category: "Online Safety",
    pages: 5,
    downloadUrl: "/placeholder-resources/sextortion-response-protocol.pdf",
  },
];

export function getResourceById(id: string): Resource | undefined {
  return RESOURCES.find((r) => r.id === id);
}
