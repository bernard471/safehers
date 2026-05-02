import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const CASE_STUDIES_DIR = path.join(process.cwd(), "content", "case-studies");

export interface CaseStudyMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  client: string;
  sector: string;
  country: string;
  duration: string;
  participants: number;
  outcome: string;
}

export interface CaseStudy extends CaseStudyMeta {
  content: string; // rendered HTML
}

export function getAllCaseStudyMetas(): CaseStudyMeta[] {
  if (!fs.existsSync(CASE_STUDIES_DIR)) return [];
  const files = fs.readdirSync(CASE_STUDIES_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(CASE_STUDIES_DIR, filename), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? "Untitled",
        excerpt: data.excerpt ?? "",
        date: data.date ?? "",
        client: data.client ?? "",
        sector: data.sector ?? "",
        country: data.country ?? "",
        duration: data.duration ?? "",
        participants: data.participants ?? 0,
        outcome: data.outcome ?? "",
      } satisfies CaseStudyMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkHtml).process(content);

  return {
    slug,
    title: data.title ?? "Untitled",
    excerpt: data.excerpt ?? "",
    date: data.date ?? "",
    client: data.client ?? "",
    sector: data.sector ?? "",
    country: data.country ?? "",
    duration: data.duration ?? "",
    participants: data.participants ?? 0,
    outcome: data.outcome ?? "",
    content: processed.toString(),
  };
}
