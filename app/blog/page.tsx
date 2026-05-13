import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CardNav from "@/components/ui/card-nav";
import { Footer } from "@/components/ui/footer";
import { posts } from "@/lib/blog-posts";

const [featured, ...rest] = posts;

export default function BlogPage() {
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

      <section className="relative w-full">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 pt-36 pb-16 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
            Notes from the playground.
          </h1>
          <p className="mt-3 max-w-xl text-base sm:text-lg text-muted-foreground">
            What we&apos;re building, what we&apos;re learning, and where AI
            playgrounds go next.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10 pb-12">
        <div className="mx-auto max-w-6xl">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid md:grid-cols-2 overflow-hidden rounded-3xl border border-border bg-white text-neutral-900 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10"
          >
            <div
              className="relative aspect-[16/10] md:aspect-auto"
              style={{ backgroundColor: featured.accent }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl md:text-7xl font-semibold tracking-tight text-neutral-900/15 select-none">
                  Froots
                </span>
              </div>
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                <span className="rounded-full bg-neutral-100 px-2.5 py-1 font-medium text-neutral-700">
                  {featured.tag}
                </span>
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readingTime}</span>
              </div>
              <h2 className="mt-5 text-2xl md:text-4xl font-semibold tracking-tight text-neutral-900">
                {featured.title}
              </h2>
              <p className="mt-3 text-base text-neutral-600 leading-relaxed">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
                <span className="text-neutral-700 font-medium">
                  {featured.author}
                </span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="px-6 md:px-10 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between gap-6 flex-wrap">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                More from the team
              </h2>
              <p className="mt-3 text-muted-foreground text-base md:text-lg">
                Engineering deep-dives, product notes, and field reports from
                running agents in the wild.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white text-neutral-900 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
              >
                <div
                  className="relative aspect-[16/9]"
                  style={{ backgroundColor: post.accent }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-semibold tracking-tight text-neutral-900/15 select-none">
                      Froots
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 font-medium text-neutral-700">
                      {post.tag}
                    </span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-neutral-900">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                    <span>{post.author}</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
