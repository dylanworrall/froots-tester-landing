import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CardNav from "@/components/ui/card-nav";
import { Footer } from "@/components/ui/footer";
import { ArticleBanner } from "@/components/ui/article-banner";
import { MarkdownBody } from "@/components/ui/markdown-body";
import { getUseCase, useCaseOrder, useCases } from "@/lib/use-cases";

export function generateStaticParams() {
  return useCaseOrder.map((slug) => ({ slug }));
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const uc = getUseCase(slug);
  if (!uc) notFound();

  const i = useCaseOrder.indexOf(uc.slug);
  const next = useCases[useCaseOrder[(i + 1) % useCaseOrder.length]];

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

      <article className="px-6 md:px-10 pt-32 pb-12">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/#use-cases"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="size-3.5" />
            All use cases
          </Link>

          <div className="mt-8 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {uc.tag}
          </div>
          <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight text-foreground">
            {uc.title}
          </h1>
          <p className="mt-5 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {uc.tagline}
          </p>
        </div>

        <div className="mx-auto max-w-3xl mt-12">
          <ArticleBanner
            accent={uc.accent}
            label={uc.title}
            video={uc.video}
            poster={uc.poster}
          />
        </div>

        <div className="mx-auto max-w-3xl mt-14">
          <MarkdownBody paragraphs={uc.body} />
        </div>
      </article>

      <section className="px-6 md:px-10 pb-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-border bg-white p-6 md:p-8 text-neutral-900">
            <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">
              Up next
            </div>
            <Link
              href={`/use-cases/${next.slug}`}
              className="group mt-3 flex items-start justify-between gap-6"
            >
              <div>
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-900">
                  {next.title}
                </h3>
                <p className="mt-2 text-sm md:text-base text-neutral-600">
                  {next.tagline}
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
