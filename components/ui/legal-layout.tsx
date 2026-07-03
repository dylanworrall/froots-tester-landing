import CardNav from "@/components/ui/card-nav";
import { Footer } from "@/components/ui/footer";

const NAV_ITEMS = [
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
      { label: "Discord", ariaLabel: "Discord", href: "https://discord.gg/y7cq9A5bYu" },
    ],
  },
];

/** Shared shell for the legal pages (Privacy, Terms): standard nav +
 *  a centered prose column + footer. Prose styling comes from the
 *  @tailwindcss/typography plugin already enabled in globals.css. */
export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <CardNav
        logo="/froots-logo.png"
        logoAlt="Froots"
        logoText="Froots"
        ctaLabel="Login"
        items={NAV_ITEMS}
      />
      <div className="mx-auto max-w-3xl px-6 pt-32 pb-20">
        <header className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">{title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: {updated}</p>
        </header>
        <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-xl prose-a:text-foreground prose-a:underline-offset-2">
          {children}
        </article>
      </div>
      <Footer />
    </main>
  );
}

export default LegalLayout;
