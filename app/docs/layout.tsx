import CardNav from "@/components/ui/card-nav";
import { Footer } from "@/components/ui/footer";
import { DocsSidebar } from "@/components/ui/docs-sidebar";
import { getDocsTree } from "@/lib/docs";

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
      { label: "Docs", ariaLabel: "Docs", href: "/docs" },
      { label: "Changelog", ariaLabel: "Changelog", href: "https://github.com/dylanworrall/froots/releases" },
      { label: "Discord", ariaLabel: "Discord", href: "https://discord.gg/y7cq9A5bYu" },
    ],
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const sections = getDocsTree();

  return (
    <main className="min-h-screen">
      <CardNav logo="/froots-logo.png" logoAlt="Froots" logoText="Froots" ctaLabel="Login" items={NAV_ITEMS} />

      <div className="px-6 md:px-10 pt-32 pb-24">
        <div className="mx-auto max-w-6xl lg:flex lg:gap-12">
          <DocsSidebar sections={sections} />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
