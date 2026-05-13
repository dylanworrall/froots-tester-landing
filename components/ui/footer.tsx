import Link from "next/link";

const columns = [
  {
    title: "Product",
    items: [
      { name: "Use cases", href: "#" },
      { name: "Pricing", href: "/pricing" },
      { name: "Changelog", href: "#" },
    ],
  },
  {
    title: "Company",
    items: [
      { name: "About us", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Contact us", href: "#" },
      { name: "Press kit", href: "#" },
    ],
  },
  {
    title: "Developers",
    items: [
      { name: "Docs", href: "#" },
      { name: "API", href: "#" },
      { name: "SDK", href: "#" },
    ],
  },
  {
    title: "Community",
    items: [
      { name: "Discord", href: "https://discord.gg/y7cq9A5bYu" },
      { name: "LinkedIn", href: "#" },
      { name: "X", href: "#" },
    ],
  },
  {
    title: "Resources",
    items: [
      { name: "Whitepaper", href: "#" },
      { name: "Terms of use", href: "#" },
      { name: "Privacy policy", href: "#" },
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
            <img src="/froots-logo.png" alt="Froots" className="size-7 object-contain" />
            <span className="font-semibold text-lg">Froots</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            © {new Date().getFullYear()} Froots, Inc.
            <br />
            All rights reserved.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-12 gap-y-8 text-sm">
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="font-medium text-foreground">{col.title}</h4>
              <ul className="flex flex-col gap-2">
                {col.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
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
