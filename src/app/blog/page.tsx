import type { Metadata } from "next";
import Link from "next/link";
import { getAllPostMetas, getAllCategories } from "@/lib/blog";
import BlogIndex from "./BlogIndex";

export const metadata: Metadata = {
  title: "Journal — SafeHer Foundation",
  description:
    "Safety insights, practical guides, and expert perspectives from SafeHer Foundation on personal safety, online security, and campus life across Africa.",
  openGraph: {
    title: "SafeHer Foundation Journal",
    description: "Safety insights and practical guides from SafeHer Foundation.",
  },
};

export default function BlogPage() {
  const posts = getAllPostMetas();
  const categories = getAllCategories();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return <BlogIndex featured={featured} posts={rest} categories={categories} />;
}
