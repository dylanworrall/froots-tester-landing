import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const DOCS_DIR = path.join(process.cwd(), "content", "docs");

/** Sidebar order. Sections not listed here sort after these, alphabetically. */
const SECTION_ORDER = [
  "Get Started",
  "Memory",
  "Routines",
  "Skills",
  "Sync & Billing",
  "Troubleshooting",
];

export interface DocHeading {
  id: string;
  text: string;
  depth: 2 | 3;
}

export interface DocPage {
  slug: string;
  title: string;
  description: string;
  section: string;
  order: number;
  html: string;
  headings: DocHeading[];
}

export interface DocNavItem {
  slug: string;
  title: string;
}

export interface DocSection {
  title: string;
  pages: DocNavItem[];
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/g, " ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

/**
 * Add stable ids + anchor scroll offset to h2/h3 in rendered HTML and
 * collect them for the "On this page" rail.
 */
function anchorHeadings(html: string): { html: string; headings: DocHeading[] } {
  const headings: DocHeading[] = [];
  const used = new Set<string>();
  const out = html.replace(
    /<h([23])>([\s\S]*?)<\/h\1>/g,
    (_match, level: string, inner: string) => {
      const text = stripTags(inner);
      let id = slugifyHeading(text) || "section";
      let i = 2;
      while (used.has(id)) id = `${slugifyHeading(text)}-${i++}`;
      used.add(id);
      headings.push({ id, text, depth: Number(level) as 2 | 3 });
      return `<h${level} id="${id}" class="scroll-mt-32">${inner}</h${level}>`;
    },
  );
  return { html: out, headings };
}

function loadDocs(): DocPage[] {
  if (!fs.existsSync(DOCS_DIR)) return [];

  const files: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".md") && !entry.name.startsWith("_")) files.push(full);
    }
  };
  walk(DOCS_DIR);

  const pages: DocPage[] = [];
  for (const file of files) {
    const raw = fs.readFileSync(file, "utf8");
    const { data, content } = matter(raw);
    if (!data.title || !data.section) continue;

    const rendered = marked.parse(content, { async: false }) as string;
    const { html, headings } = anchorHeadings(rendered);

    pages.push({
      slug: path.basename(file, ".md"),
      title: data.title,
      description: data.description || "",
      section: data.section,
      order: typeof data.order === "number" ? data.order : 999,
      html,
      headings,
    });
  }

  return pages.sort((a, b) => {
    const sa = sectionRank(a.section);
    const sb = sectionRank(b.section);
    if (sa !== sb) return sa - sb;
    if (a.section !== b.section) return a.section.localeCompare(b.section);
    return a.order - b.order;
  });
}

function sectionRank(section: string): number {
  const i = SECTION_ORDER.indexOf(section);
  return i === -1 ? SECTION_ORDER.length : i;
}

const docs = loadDocs();

export function getAllDocs(): DocPage[] {
  return docs;
}

export function getDocBySlug(slug: string): DocPage | undefined {
  return docs.find((d) => d.slug === slug);
}

export function getAllDocSlugs(): string[] {
  return docs.map((d) => d.slug);
}

/** Ordered sidebar tree: sections in SECTION_ORDER, pages by frontmatter order. */
export function getDocsTree(): DocSection[] {
  const sections: DocSection[] = [];
  for (const doc of docs) {
    let section = sections.find((s) => s.title === doc.section);
    if (!section) {
      section = { title: doc.section, pages: [] };
      sections.push(section);
    }
    section.pages.push({ slug: doc.slug, title: doc.title });
  }
  return sections;
}

/** Prev/next across the full ordered doc list, for footer pagination. */
export function getAdjacentDocs(slug: string): {
  prev: DocNavItem | null;
  next: DocNavItem | null;
} {
  const i = docs.findIndex((d) => d.slug === slug);
  if (i === -1) return { prev: null, next: null };
  const prev = docs[i - 1];
  const next = docs[i + 1];
  return {
    prev: prev ? { slug: prev.slug, title: prev.title } : null,
    next: next ? { slug: next.slug, title: next.title } : null,
  };
}
