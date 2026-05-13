import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CardNav from "@/components/ui/card-nav";
import { Footer } from "@/components/ui/footer";
import { MarkdownBody } from "@/components/ui/markdown-body";
import { getAllSlugs, getPostBySlug, posts } from "@/lib/blog-posts";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const next = posts[currentIndex + 1] ?? posts[0];

  return (
    <main className="min-h-screen">
      <CardNav
        logo="/froots-logo.png"
        logoAlt="Froots"
        logoText="Froots"
        ctaLabel="Login"
        items={[
          {
            label: "Product",
            bgColor: "#D7EFD3",
            textColor: "#0a0a0a",
            links: [
              { label: "Memory", ariaLabel: "Memory", href: "/memory" },
              { label: "Routines", ariaLabel: "Routines", href: "/routines" },
              { label: "Skills", ariaLabel: "Skills", href: "/skills" },
            ],
          },
          {
            label: "Harnesses",
            bgColor: "#5191F8",
            textColor: "#0a0a0a",
            links: [
              { label: "Models", ariaLabel: "Models", href: "/models" },
              { label: "Pricing", ariaLabel: "Pricing", href: "/pricing" },
            ],
          },
          {
            label: "Resources",
            bgColor: "#FBD9DA",
            textColor: "#0a0a0a",
            links: [
              { label: "Blog", ariaLabel: "Blog", href: "/blog" },
              { label: "Docs", ariaLabel: "Docs", href: "/" },
              { label: "Changelog", ariaLabel: "Changelog", href: "/" },
              {
                label: "Discord",
                ariaLabel: "Discord",
                href: "https://discord.gg/y7cq9A5bYu",
              },
            ],
          },
        ]}
      />

      <article className="px-6 md:px-10 pt-32 pb-16">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="size-3.5" />
            Back to blog
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
            <span className="rounded-full bg-neutral-100 px-2.5 py-1 font-medium text-neutral-700">
              {post.tag}
            </span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            {post.title}
          </h1>

          <p className="mt-5 text-lg md:text-xl text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>

          <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
            <span className="text-neutral-700 font-medium">{post.author}</span>
          </div>
        </div>

        <div className="mx-auto max-w-3xl mt-12">
          <div
            className="relative aspect-[16/7] overflow-hidden rounded-3xl border border-border"
            style={{ backgroundColor: post.accent }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl md:text-8xl font-semibold tracking-tight text-neutral-900/15 select-none">
                Froots
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl mt-14">
          <MarkdownBody paragraphs={post.body} />
        </div>
      </article>

      <section className="px-6 md:px-10 pb-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-border bg-white p-6 md:p-8 text-neutral-900">
            <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">
              Up next
            </div>
            <Link
              href={`/blog/${next.slug}`}
              className="group mt-3 flex items-start justify-between gap-6"
            >
              <div>
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-900">
                  {next.title}
                </h3>
                <p className="mt-2 text-sm md:text-base text-neutral-600">
                  {next.excerpt}
                </p>
              </div>
              <ArrowRight className="size-5 shrink-0 mt-1 text-neutral-500 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
