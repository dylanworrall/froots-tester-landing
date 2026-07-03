import Link from "next/link";

interface Item {
  name: string;
  href: string;
  external?: boolean;
}

const columns: { title: string; items: Item[] }[] = [
  {
    title: "Product",
    items: [
      { name: "Memory", href: "/memory" },
      { name: "Routines", href: "/routines" },
      { name: "Skills", href: "/skills" },
      { name: "Models", href: "/models" },
      { name: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Use cases",
    items: [
      { name: "Coding agents", href: "/use-cases/coding-agents" },
      { name: "Browser automations", href: "/use-cases/browser-automations" },
      { name: "Research agents", href: "/use-cases/research-agents" },
    ],
  },
  {
    title: "Resources",
    items: [
      { name: "Blog", href: "/blog" },
      { name: "Docs", href: "/docs" },
      {
        name: "Changelog",
        href: "https://github.com/dylanworrall/froots/releases",
        external: true,
      },
      {
        name: "Download",
        href: "https://github.com/dylanworrall/froots/releases/latest",
        external: true,
      },
    ],
  },
  {
    title: "Community",
    items: [
      {
        name: "Discord",
        href: "https://discord.gg/y7cq9A5bYu",
        external: true,
      },
      {
        name: "GitHub",
        href: "https://github.com/dylanworrall/froots",
        external: true,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-background text-foreground w-full px-6 md:px-10 pt-12 pb-16">
      <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/froots-logo.png"
              alt="Froots"
              className="size-7 object-contain"
            />
            <span className="font-semibold text-lg">Froots</span>
            <span className="ml-1 inline-flex items-center rounded-full bg-foreground/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground/70">
              Beta
            </span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            © {new Date().getFullYear()} Froots, Inc.
            <br />
            All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-12 gap-y-8 text-sm">
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="font-medium text-foreground">{col.title}</h4>
              <ul className="flex flex-col gap-2">
                {col.items.map((item) => (
                  <li key={item.name}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
