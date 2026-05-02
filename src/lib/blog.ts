import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorTitle: string;
  category: string;
  readingTime: number; // minutes
  featured?: boolean;
}

export interface Post extends PostMeta {
  content: string; // rendered HTML
}

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getAllPostMetas(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? "Untitled",
        excerpt: data.excerpt ?? "",
        date: data.date ?? "",
        author: data.author ?? "SafeHers Team",
        authorTitle: data.authorTitle ?? "",
        category: data.category ?? "General",
        readingTime: estimateReadingTime(content),
        featured: data.featured ?? false,
      } satisfies PostMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const processed = await remark().use(remarkHtml).process(content);
  const html = processed.toString();

  return {
    slug,
    title: data.title ?? "Untitled",
    excerpt: data.excerpt ?? "",
    date: data.date ?? "",
    author: data.author ?? "SafeHers Team",
    authorTitle: data.authorTitle ?? "",
    category: data.category ?? "General",
    readingTime: estimateReadingTime(content),
    featured: data.featured ?? false,
    content: html,
  };
}

export function getAllCategories(): string[] {
  const metas = getAllPostMetas();
  return Array.from(new Set(metas.map((p) => p.category))).sort();
}
