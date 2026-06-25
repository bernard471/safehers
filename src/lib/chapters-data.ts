export interface Chapter {
  name: string;
  type: "campus" | "community";
  city: string;
  institution?: string;
  members: number;
  status: "active" | "launching" | "planned";
  leader?: string;
  workshopsHeld?: number;
  certificatesEarned?: number;
}

export interface Ambassador {
  name: string;
  role: string;
  chapter: string;
  bio: string;
  country: string;
}

export interface EmergencyResource {
  name: string;
  number: string;
  type: "police" | "domestic-violence" | "cyber-crime" | "helpline" | "medical";
}

export interface CountryHub {
  country: string;
  code: string;
  flag: string;
  region: "West Africa" | "East Africa" | "Southern Africa" | "Central Africa" | "North Africa";
  status: "active" | "launching" | "planned" | "interest";
  coordinator?: string;
  chapters: Chapter[];
  totalMembers: number;
  description: string;
  languages?: string[];
  emergencyResources?: EmergencyResource[];
  ambassadors?: Ambassador[];
  mapPosition?: { x: number; y: number };
}

export const REGIONS = [
  "West Africa",
  "East Africa",
  "Southern Africa",
  "Central Africa",
  "North Africa",
] as const;

export const COUNTRIES: CountryHub[] = [
  // ── WEST AFRICA ──────────────────────────────────────────────────────────
  {
    country: "Ghana",
    code: "GH",
    flag: "https://flagcdn.com/gh.svg",
    region: "West Africa",
    status: "active",
    coordinator: "DK Cyber",
    totalMembers: 156,
    description: "SafeHer Foundation headquarters. Our first and most active country hub with chapters across Greater Accra, Ashanti, and Northern regions.",
    languages: ["English", "Twi", "Ga"],
    mapPosition: { x: 47, y: 52 },
    emergencyResources: [
      { name: "Ghana Police Emergency", number: "191", type: "police" },
      { name: "DOVVSU (Domestic Violence)", number: "0800-111-222", type: "domestic-violence" },
      { name: "Ghana Cyber Crime Unit", number: "+233-30-277-3906", type: "cyber-crime" },
      { name: "Ghana Ambulance Service", number: "193", type: "medical" },
      { name: "Ark Foundation Helpline", number: "+233-30-222-8815", type: "helpline" },
    ],
    ambassadors: [
      { name: "Abena Mensah", role: "Campus Chapter Lead", chapter: "University of Ghana SafeHers", bio: "Final year law student and women's rights advocate. Founded the UG SafeHers chapter with 45 members in its first semester.", country: "Ghana" },
      { name: "Kwame Asante", role: "Digital Safety Trainer", chapter: "East Legon Community Chapter", bio: "Cybersecurity professional who leads weekly online safety workshops for market women in East Legon.", country: "Ghana" },
    ],
    chapters: [
      { name: "University of Ghana SafeHers", type: "campus", city: "Accra", institution: "University of Ghana, Legon", members: 45, status: "active", leader: "Abena Mensah", workshopsHeld: 12, certificatesEarned: 38 },
      { name: "Ashesi SafeHers", type: "campus", city: "Berekuso", institution: "Ashesi University", members: 32, status: "active", workshopsHeld: 8, certificatesEarned: 25 },
      { name: "KNUST SafeHers", type: "campus", city: "Kumasi", institution: "Kwame Nkrumah University of Science & Technology", members: 28, status: "launching", workshopsHeld: 2, certificatesEarned: 10 },
      { name: "GIMPA SafeHers", type: "campus", city: "Accra", institution: "Ghana Institute of Management & Public Administration", members: 15, status: "launching", workshopsHeld: 1, certificatesEarned: 5 },
      { name: "East Legon Community Chapter", type: "community", city: "Accra", members: 22, status: "active", leader: "Kwame Asante", workshopsHeld: 6, certificatesEarned: 18 },
      { name: "Kumasi Women's Safety Circle", type: "community", city: "Kumasi", members: 14, status: "launching", workshopsHeld: 1, certificatesEarned: 0 },
    ],
  },
  {
    country: "Nigeria",
    code: "NG",
    flag: "https://flagcdn.com/ng.svg",
    region: "West Africa",
    status: "launching",
    totalMembers: 67,
    description: "Expanding into Nigeria with campus chapters in Lagos and Abuja. Focus on mobile money fraud protection and campus safety.",
    languages: ["English", "Pidgin", "Yoruba", "Igbo", "Hausa"],
    mapPosition: { x: 50, y: 52 },
    emergencyResources: [
      { name: "Nigeria Police Emergency", number: "112", type: "police" },
      { name: "NAPTIP (Trafficking)", number: "+234-803-800-0401", type: "helpline" },
      { name: "Nigeria Cyber Crime Unit", number: "+234-903-475-1111", type: "cyber-crime" },
    ],
    chapters: [
      { name: "University of Lagos SafeHers", type: "campus", city: "Lagos", institution: "University of Lagos", members: 30, status: "launching" },
      { name: "University of Abuja SafeHers", type: "campus", city: "Abuja", institution: "University of Abuja", members: 22, status: "planned" },
      { name: "Lagos Island Community Chapter", type: "community", city: "Lagos", members: 15, status: "planned" },
    ],
  },
  {
    country: "Senegal",
    code: "SN",
    flag: "https://flagcdn.com/sn.svg",
    region: "West Africa",
    status: "planned",
    totalMembers: 0,
    mapPosition: { x: 38, y: 48 },
    description: "Planned expansion into Francophone West Africa. Seeking bilingual chapter leaders and curriculum translators.",
    chapters: [],
  },
  {
    country: "Côte d'Ivoire",
    code: "CI",
    flag: "https://flagcdn.com/ci.svg",
    region: "West Africa",
    status: "interest",
    totalMembers: 0,
    mapPosition: { x: 43, y: 53 },
    description: "Interest received from university groups in Abidjan. French-language curriculum development in progress.",
    chapters: [],
  },
  {
    country: "Sierra Leone",
    code: "SL",
    flag: "https://flagcdn.com/sl.svg",
    region: "West Africa",
    status: "interest",
    totalMembers: 0,
    mapPosition: { x: 39, y: 52 },
    description: "Interest from women's organisations in Freetown. Partnership discussions ongoing.",
    chapters: [],
  },
  {
    country: "The Gambia",
    code: "GM",
    flag: "https://flagcdn.com/gm.svg",
    region: "West Africa",
    status: "interest",
    totalMembers: 0,
    mapPosition: { x: 37, y: 49 },
    description: "Expression of interest received. Exploring partnership with local women's safety organisations.",
    chapters: [],
  },

  // ── EAST AFRICA ──────────────────────────────────────────────────────────
  {
    country: "Kenya",
    code: "KE",
    flag: "https://flagcdn.com/ke.svg",
    region: "East Africa",
    status: "launching",
    totalMembers: 38,
    description: "East African hub launching in Nairobi. Strong interest from university students and women in the tech sector.",
    languages: ["English", "Swahili"],
    mapPosition: { x: 65, y: 56 },
    emergencyResources: [
      { name: "Kenya Police Emergency", number: "999", type: "police" },
      { name: "GBV Hotline", number: "1195", type: "domestic-violence" },
      { name: "Kenya Red Cross", number: "1199", type: "medical" },
    ],
    chapters: [
      { name: "University of Nairobi SafeHers", type: "campus", city: "Nairobi", institution: "University of Nairobi", members: 20, status: "launching" },
      { name: "Strathmore SafeHers", type: "campus", city: "Nairobi", institution: "Strathmore University", members: 18, status: "planned" },
    ],
  },
  {
    country: "Tanzania",
    code: "TZ",
    flag: "https://flagcdn.com/tz.svg",
    region: "East Africa",
    status: "planned",
    totalMembers: 0,
    mapPosition: { x: 65, y: 62 },
    description: "Planned expansion with Swahili-language curriculum. Seeking chapter leaders in Dar es Salaam.",
    chapters: [],
  },
  {
    country: "Uganda",
    code: "UG",
    flag: "https://flagcdn.com/ug.svg",
    region: "East Africa",
    status: "interest",
    totalMembers: 0,
    mapPosition: { x: 63, y: 54 },
    description: "Interest from Makerere University students and Kampala women's groups.",
    chapters: [],
  },
  {
    country: "Rwanda",
    code: "RW",
    flag: "https://flagcdn.com/rw.svg",
    region: "East Africa",
    status: "interest",
    totalMembers: 0,
    mapPosition: { x: 62, y: 58 },
    description: "Interest received from women's organisations in Kigali.",
    chapters: [],
  },
  {
    country: "Ethiopia",
    code: "ET",
    flag: "https://flagcdn.com/et.svg",
    region: "East Africa",
    status: "interest",
    totalMembers: 0,
    mapPosition: { x: 68, y: 50 },
    description: "Early interest from Addis Ababa. Exploring partnerships with local NGOs.",
    chapters: [],
  },

  // ── SOUTHERN AFRICA ──────────────────────────────────────────────────────
  {
    country: "South Africa",
    code: "ZA",
    flag: "https://flagcdn.com/za.svg",
    region: "Southern Africa",
    status: "launching",
    totalMembers: 25,
    description: "Southern African hub launching in Johannesburg and Cape Town. Focus on GBV prevention and campus safety.",
    languages: ["English", "Zulu", "Xhosa", "Afrikaans"],
    mapPosition: { x: 57, y: 80 },
    emergencyResources: [
      { name: "SAPS Emergency", number: "10111", type: "police" },
      { name: "GBV Command Centre", number: "0800-428-428", type: "domestic-violence" },
      { name: "Lifeline SA", number: "0861-322-322", type: "helpline" },
    ],
    chapters: [
      { name: "University of Cape Town SafeHers", type: "campus", city: "Cape Town", institution: "University of Cape Town", members: 15, status: "planned" },
      { name: "Wits SafeHers", type: "campus", city: "Johannesburg", institution: "University of the Witwatersrand", members: 10, status: "planned" },
    ],
  },
  {
    country: "Botswana",
    code: "BW",
    flag: "https://flagcdn.com/bw.svg",
    region: "Southern Africa",
    status: "interest",
    totalMembers: 0,
    mapPosition: { x: 57, y: 75 },
    description: "Interest from University of Botswana student groups.",
    chapters: [],
  },
  {
    country: "Zimbabwe",
    code: "ZW",
    flag: "https://flagcdn.com/zw.svg",
    region: "Southern Africa",
    status: "interest",
    totalMembers: 0,
    mapPosition: { x: 60, y: 74 },
    description: "Interest from Harare women's safety networks.",
    chapters: [],
  },
  {
    country: "Zambia",
    code: "ZM",
    flag: "https://flagcdn.com/zm.svg",
    region: "Southern Africa",
    status: "interest",
    totalMembers: 0,
    mapPosition: { x: 58, y: 70 },
    description: "Expression of interest from University of Zambia.",
    chapters: [],
  },

  // ── CENTRAL AFRICA ─────────────────────────────────────────────────────
  {
    country: "Cameroon",
    code: "CM",
    flag: "https://flagcdn.com/cm.svg",
    region: "Central Africa",
    status: "interest",
    totalMembers: 0,
    mapPosition: { x: 52, y: 53 },
    description: "Interest from bilingual university communities in Douala and Yaoundé.",
    chapters: [],
  },
  {
    country: "DR Congo",
    code: "CD",
    flag: "https://flagcdn.com/cd.svg",
    region: "Central Africa",
    status: "interest",
    totalMembers: 0,
    mapPosition: { x: 57, y: 58 },
    description: "Early discussions with women's organisations in Kinshasa.",
    chapters: [],
  },

  // ── NORTH AFRICA ───────────────────────────────────────────────────────
  {
    country: "Egypt",
    code: "EG",
    flag: "https://flagcdn.com/eg.svg",
    region: "North Africa",
    status: "interest",
    totalMembers: 0,
    mapPosition: { x: 60, y: 30 },
    description: "Interest from women's safety advocates in Cairo.",
    chapters: [],
  },
  {
    country: "Morocco",
    code: "MA",
    flag: "https://flagcdn.com/ma.svg",
    region: "North Africa",
    status: "interest",
    totalMembers: 0,
    mapPosition: { x: 43, y: 28 },
    description: "Early interest from university groups in Casablanca and Rabat.",
    chapters: [],
  },
];

export const TOTAL_COUNTRIES = COUNTRIES.length;
export const ACTIVE_COUNTRIES = COUNTRIES.filter(c => c.status === "active" || c.status === "launching").length;
export const TOTAL_CHAPTERS = COUNTRIES.reduce((sum, c) => sum + c.chapters.length, 0);
export const TOTAL_MEMBERS = COUNTRIES.reduce((sum, c) => sum + c.totalMembers, 0);
