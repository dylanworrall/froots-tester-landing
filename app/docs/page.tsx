import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllDocs, getDocsTree } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Get started with Froots — the local-first desktop workspace for AI agents. Install, add a model key, and learn how Memory, Routines, and Skills work.",
  alternates: { canonical: "/docs" },
  openGraph: { url: "https://froots.ai/docs" },
};

export default function DocsIndexPage() {
  const sections = getDocsTree();
  const docs = getAllDocs();
  const first = docs[0];

  return (
    <div className="max-w-3xl">
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Documentation
      </div>
      <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
        Froots documentation
      </h1>
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
        Froots is a local-first desktop workspace for running AI agents with full visibility into
        every step. These docs cover installing the app, connecting a model, and getting real work
        out of Memory, Routines, and Skills.
      </p>

      {first && (
        <Link
          href={`/docs/${first.slug}`}
          className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
        >
          Start here: {first.title}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}

      <div className="mt-12 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {section.title}
            </h2>
            <ul className="mt-3 divide-y divide-border border-y border-border">
              {section.pages.map((page) => {
                const doc = docs.find((d) => d.slug === page.slug);
                return (
                  <li key={page.slug}>
                    <Link
                      href={`/docs/${page.slug}`}
                      className="group flex items-baseline justify-between gap-6 py-3"
                    >
                      <span className="text-sm font-medium text-foreground group-hover:underline underline-offset-4">
                        {page.title}
                      </span>
                      {doc?.description && (
                        <span className="hidden sm:block flex-1 truncate text-right text-sm text-muted-foreground">
                          {doc.description}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-12 text-sm text-muted-foreground">
        Can&rsquo;t find what you need? Ask in the{" "}
        <a
          href="https://discord.gg/y7cq9A5bYu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-4"
        >
          Discord
        </a>{" "}
        or follow{" "}
        <a
          href="https://github.com/dylanworrall/froots/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-4"
        >
          releases on GitHub
        </a>
        .
      </p>
    </div>
  );
}
