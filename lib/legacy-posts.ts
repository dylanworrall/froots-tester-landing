import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { BlogPost } from "./blog-posts";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const DEFAULT_ACCENT = "#5191F8";

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function estimateReadingTime(content: string): string {
  const words = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}

function loadLegacyPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"));

  const out: BlogPost[] = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    if (data.archived) continue;
    if (!data.slug || !data.title) continue;

    const date = data.date instanceof Date ? data.date : new Date(data.date);
    const html = marked.parse(content, { async: false }) as string;

    out.push({
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt || "",
      date: formatDate(date),
      readingTime: estimateReadingTime(content),
      tag: data.category || "Article",
      author: data.author || "Froots",
      accent: data.coverColor || DEFAULT_ACCENT,
      coverImage: data.coverImage || null,
      body: [],
      html,
      sortDate: date.toISOString(),
    });
  }

  return out.sort((a, b) => (b.sortDate || "").localeCompare(a.sortDate || ""));
}

export const legacyPosts = loadLegacyPosts();
