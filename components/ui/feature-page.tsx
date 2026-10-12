import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CardNav from "@/components/ui/card-nav";
import { Footer } from "@/components/ui/footer";
import { MemoryBanner, RoutinesBanner, SkillsBanner } from "@/components/home/froots-widgets/feature-banners";
import { MarkdownBody } from "@/components/ui/markdown-body";
import { features, featureOrder, type FeatureDoc } from "@/lib/features";

const TOP_LINKS_PRODUCT = [
  { label: "Memory", ariaLabel: "Memory", href: "/memory" },
  { label: "Routines", ariaLabel: "Routines", href: "/routines" },
  { label: "Skills", ariaLabel: "Skills", href: "/skills" },
];

/** Each page's banner is the app's own screen for that feature, on one of the site's pastels. */
const BANNERS = { memory: MemoryBanner, routines: RoutinesBanner, skills: SkillsBanner };
const BANNER_PASTEL: Record<FeatureDoc["slug"], string> = { memory: "#D7EFD3", routines: "#DCE7FD", skills: "#FBD9DA" };

export function FeaturePage({ feature }: { feature: FeatureDoc }) {
  const Banner = BANNERS[feature.slug];
  const i = featureOrder.indexOf(feature.slug);
  const next = features[featureOrder[(i + 1) % featureOrder.length]];

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
            links: TOP_LINKS_PRODUCT,
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
              { label: "Docs", ariaLabel: "Docs", href: "/docs" },
              { label: "Changelog", ariaLabel: "Changelog", href: "https://github.com/dylanworrall/froots/releases" },
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
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {feature.tag}
          </div>
          <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight text-foreground">
            {feature.title}
          </h1>
          <p className="mt-5 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {feature.tagline}
          </p>
        </div>

        <div className="mx-auto max-w-3xl mt-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-border">
            <Banner accent={BANNER_PASTEL[feature.slug]} />
          </div>
        </div>

        <div className="mx-auto max-w-3xl mt-14">
          <MarkdownBody paragraphs={feature.body} />
        </div>
      </article>

      <section className="px-6 md:px-10 pb-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-border bg-white p-6 md:p-8 text-neutral-900">
            <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">
              Up next
            </div>
            <Link
              href={`/${next.slug}`}
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
