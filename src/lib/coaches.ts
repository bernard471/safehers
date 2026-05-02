export interface Coach {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  country: string;
  languages: string[];
  bio: string;
  illustrative: true;
}

export const COACHES: Coach[] = [
  {
    id: "amara-mensah",
    name: "Amara Mensah",
    title: "Certified Financial Planner",
    specialties: ["Saving & Banking", "Wealth Building", "Entrepreneurship"],
    country: "Ghana",
    languages: ["English", "Twi"],
    bio: "10 years helping Ghanaian women build financial independence through structured savings plans and investment education.",
    illustrative: true,
  },
  {
    id: "fatima-osei",
    name: "Fatima Osei",
    title: "Business Finance Coach",
    specialties: ["Entrepreneurship", "Tax & Legal", "Money Foundations"],
    country: "Ghana",
    languages: ["English", "Hausa"],
    bio: "Former GRA tax officer turned small business coach. Specialises in helping market traders and SME owners formalise and grow.",
    illustrative: true,
  },
  {
    id: "ngozi-adeyemi",
    name: "Ngozi Adeyemi",
    title: "Investment & Wealth Coach",
    specialties: ["Investing", "Wealth Building", "Tax & Legal"],
    country: "Nigeria",
    languages: ["English", "Yoruba", "Igbo"],
    bio: "Former stockbroker on the Nigerian Stock Exchange with a passion for demystifying markets for first-time investors.",
    illustrative: true,
  },
  {
    id: "aisha-mwangi",
    name: "Aisha Mwangi",
    title: "Micro-Finance Specialist",
    specialties: ["Saving & Banking", "Money Foundations", "Entrepreneurship"],
    country: "Kenya",
    languages: ["English", "Swahili"],
    bio: "Focuses on mobile money, M-Pesa integrations, and building savings habits for informal sector workers.",
    illustrative: true,
  },
  {
    id: "lerato-dlamini",
    name: "Lerato Dlamini",
    title: "Corporate Financial Wellness Coach",
    specialties: ["Wealth Building", "Investing", "Money Foundations"],
    country: "South Africa",
    languages: ["English", "Zulu", "Sotho"],
    bio: "Works with corporate women navigating salary negotiations, pension planning, and transitioning to entrepreneurship.",
    illustrative: true,
  },
  {
    id: "abena-kyei",
    name: "Abena Kyei",
    title: "Debt & Credit Coach",
    specialties: ["Money Foundations", "Saving & Banking"],
    country: "Ghana",
    languages: ["English", "Fante"],
    bio: "Specialises in helping women exit debt cycles and repair financial relationships — whether with banks, mobile lenders, or family.",
    illustrative: true,
  },
  {
    id: "chiamaka-eze",
    name: "Chiamaka Eze",
    title: "Business Launch Coach",
    specialties: ["Entrepreneurship", "Tax & Legal"],
    country: "Nigeria",
    languages: ["English", "Igbo"],
    bio: "Guides women through registering with CAC Nigeria, opening business accounts, and building pitch decks for grants.",
    illustrative: true,
  },
  {
    id: "wanjiru-kamau",
    name: "Wanjiru Kamau",
    title: "Land & Property Advisor",
    specialties: ["Wealth Building", "Tax & Legal"],
    country: "Kenya",
    languages: ["English", "Kikuyu", "Swahili"],
    bio: "Advocates for women's land rights in East Africa with practical guidance on title searches, land purchases, and estate planning.",
    illustrative: true,
  },
];

export const ALL_SPECIALTIES = [
  "Money Foundations",
  "Saving & Banking",
  "Investing",
  "Entrepreneurship",
  "Tax & Legal",
  "Wealth Building",
];

export const ALL_COUNTRIES = [...new Set(COACHES.map((c) => c.country))].sort();
