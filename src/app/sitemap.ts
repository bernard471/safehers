import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://safehers.africa";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/foundation`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/impact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/donate`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/partners`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/program-support`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/testimonials`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/ghana`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/governance`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/safeguarding`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/reports`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/volunteer`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/chapters`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/media-kit`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/academy`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/academy/courses`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/consultation`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/team`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const courseSlugs = [
    "personal-safety-foundations",
    "mobile-money-fraud",
    "phone-privacy-spy-detection",
    "sextortion-blackmail-response",
    "social-media-safety",
    "campus-hostel-safety",
  ];

  const courseRoutes: MetadataRoute.Sitemap = courseSlugs.map((slug) => ({
    url: `${base}/academy/courses/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogSlugs = [
    "mobile-money-fraud-protection",
    "setting-up-two-factor-authentication",
    "safety-on-african-campuses",
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const caseSlugs = [
    "ghana-university-pilot",
    "hotel-chain-training",
    "corporate-wellness-rollout",
  ];

  const caseRoutes: MetadataRoute.Sitemap = caseSlugs.map((slug) => ({
    url: `${base}/case-studies/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...caseRoutes, ...courseRoutes];
}
