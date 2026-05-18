import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CardNav from "@/components/ui/card-nav";
import { Footer } from "@/components/ui/footer";
import { BlogList } from "@/components/ui/blog-list";
import { BlogPagination } from "@/components/ui/blog-pagination";
import { getBlogPage, getTotalPages } from "@/lib/blog-pagination";

export function generateStaticParams() {
  const total = getTotalPages();
  const pages = [];
  for (let p = 2; p <= total; p++) pages.push({ page: String(p) });
  return pages;
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  const n = Number(page);
  return {
    title: `Blog — page ${n}`,
    description:
      "Essays, release notes, and field reports from the Froots team on building a local-first AI workspace where notes become executable work.",
    alternates: { canonical: `/blog/page/${n}` },
  };
}

export default async function BlogPagedPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const n = Number(page);
  if (!Number.isInteger(n) || n < 2) notFound();

  const total = getTotalPages();
  if (n > total) notFound();

  const { featured, list, page: current, totalPages } = getBlogPage(n);

  return (
    <main className="min-h-screen">
      <CardNav
        logo="/froots-logo.png"
        logoAlt="Froots"
        logoText="Froots"
        ctaLabel="Login"
        items={[
          { label: "Product", bgColor: "#D7EFD3", textColor: "#0a0a0a", links: [{ label: "Memory", ariaLabel: "Memory", href: "/memory" }, { label: "Routines", ariaLabel: "Routines", href: "/routines" }, { label: "Skills", ariaLabel: "Skills", href: "/skills" }] },
          { label: "Harnesses", bgColor: "#5191F8", textColor: "#0a0a0a", links: [{ label: "Models", ariaLabel: "Models", href: "/models" }, { label: "Pricing", ariaLabel: "Pricing", href: "/pricing" }] },
          { label: "Resources", bgColor: "#FBD9DA", textColor: "#0a0a0a", links: [{ label: "Blog", ariaLabel: "Blog", href: "/blog" }, { label: "Docs", ariaLabel: "Docs", href: "/" }, { label: "Changelog", ariaLabel: "Changelog", href: "/" }, { label: "Discord", ariaLabel: "Discord", href: "https://discord.gg/y7cq9A5bYu" }] },
        ]}
      />

      <section className="relative w-full">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 pt-36 pb-16 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
            Notes from the playground.
          </h1>
          <p className="mt-3 max-w-xl text-base sm:text-lg text-muted-foreground">
            Page {current} of {totalPages}.
          </p>
        </div>
      </section>

      <BlogList featured={featured} posts={list} />

      <div className="px-6 md:px-10 pb-16">
        <div className="mx-auto max-w-6xl">
          <BlogPagination page={current} totalPages={totalPages} />
        </div>
      </div>

      <Footer />
    </main>
  );
}
