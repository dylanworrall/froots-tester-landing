"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { DocSection } from "@/lib/docs";

interface DocsSidebarProps {
  sections: DocSection[];
}

function SidebarNav({ sections, pathname }: DocsSidebarProps & { pathname: string }) {
  return (
    <nav aria-label="Docs navigation" className="space-y-7">
      <div>
        <Link
          href="/docs"
          className={`text-sm transition ${
            pathname === "/docs"
              ? "font-medium text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Overview
        </Link>
      </div>
      {sections.map((section) => (
        <div key={section.title}>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {section.title}
          </div>
          <ul className="mt-2.5 space-y-0.5 border-l border-border">
            {section.pages.map((page) => {
              const href = `/docs/${page.slug}`;
              const active = pathname === href;
              return (
                <li key={page.slug}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`-ml-px block border-l py-1 pl-3.5 text-sm leading-relaxed transition ${
                      active
                        ? "border-foreground font-medium text-foreground"
                        : "border-transparent text-muted-foreground hover:border-neutral-400 hover:text-foreground"
                    }`}
                  >
                    {page.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DocsSidebar({ sections }: DocsSidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile disclosure whenever navigation happens.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const currentTitle =
    pathname === "/docs"
      ? "Overview"
      : sections
          .flatMap((s) => s.pages)
          .find((p) => `/docs/${p.slug}` === pathname)?.title ?? "Menu";

  return (
    <>
      {/* Desktop: persistent left rail */}
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pb-10 pr-2">
          <SidebarNav sections={sections} pathname={pathname} />
        </div>
      </aside>

      {/* Mobile: collapsible disclosure above the content */}
      <div className="lg:hidden mb-8">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground"
        >
          <span>
            <span className="text-muted-foreground">Docs</span>
            <span className="mx-2 text-muted-foreground">/</span>
            {currentTitle}
          </span>
          <ChevronDown
            className={`size-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
        {open && (
          <div className="mt-3 rounded-xl border border-border bg-card p-5">
            <SidebarNav sections={sections} pathname={pathname} />
          </div>
        )}
      </div>
    </>
  );
}
