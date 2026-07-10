import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAdjacentDocs, getAllDocSlugs, getDocBySlug } from "@/lib/docs";

export function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) return {};
  return {
    title: `${doc.title} — Docs`,
    description: doc.description,
    alternates: { canonical: `/docs/${doc.slug}` },
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) notFound();

  const { prev, next } = getAdjacentDocs(slug);

  return (
    <div className="xl:flex xl:gap-12">
      <article className="min-w-0 flex-1 max-w-3xl">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {doc.section}
        </div>
        <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          {doc.title}
        </h1>
        {doc.description && (
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{doc.description}</p>
        )}

        <div
          className="mt-10 prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-[#5191F8] prose-code:before:content-none prose-code:after:content-none"
          dangerouslySetInnerHTML={{ __html: doc.html }}
        />

        <nav className="mt-16 flex items-stretch gap-4 border-t border-border pt-6" aria-label="Docs pagination">
          {prev ? (
            <Link
              href={`/docs/${prev.slug}`}
              className="group flex-1 rounded-xl border border-border p-4 transition hover:border-neutral-400"
            >
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                Previous
              </span>
              <span className="mt-1 block text-sm font-medium text-foreground">{prev.title}</span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/docs/${next.slug}`}
              className="group flex-1 rounded-xl border border-border p-4 text-right transition hover:border-neutral-400"
            >
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                Next
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-sm font-medium text-foreground">{next.title}</span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>
      </article>

      {doc.headings.length > 0 && (
        <nav
          aria-label="On this page"
          className="hidden xl:block w-52 shrink-0"
        >
          <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pb-10">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              On this page
            </div>
            <ul className="mt-3 space-y-1.5 text-sm">
              {doc.headings.map((h) => (
                <li key={h.id} className={h.depth === 3 ? "pl-3.5" : ""}>
                  <a
                    href={`#${h.id}`}
                    className="text-muted-foreground transition hover:text-foreground"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </div>
  );
}
