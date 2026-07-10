import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download, KeyRound, Play } from "lucide-react";
import CardNav from "@/components/ui/card-nav";
import { Footer } from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Get started with Froots — the local-first desktop workspace for AI agents. Install, add a model key, and learn how Memory, Routines, and Skills work.",
  alternates: { canonical: "/docs" },
};

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

const START = [
  {
    icon: Download,
    title: "1. Download Froots",
    body: "Grab the desktop app for macOS, Windows, or Linux. It's free forever with your own model keys — no account required to start.",
    href: "https://github.com/dylanworrall/froots/releases",
    cta: "Download",
  },
  {
    icon: KeyRound,
    title: "2. Add a model key",
    body: "Paste an Anthropic, OpenAI, Gemini, or Groq key — or point Froots at a local model through Ollama. You can swap models per task at any time.",
    href: "/models",
    cta: "Supported models",
  },
  {
    icon: Play,
    title: "3. Run your first agent",
    body: "Ask it to do something small — summarize your inbox, draft a note, scrape a page — and watch every tool call, file edit, and step in the run timeline.",
    href: "/routines",
    cta: "How routines work",
  },
];

const GUIDES = [
  { title: "Memory", href: "/memory", desc: "How the local semantic memory graph stores and recalls what your agents write.", accent: "#D7EFD3" },
  { title: "Routines", href: "/routines", desc: "Schedule agents to run on their own — briefings, reports, and recurring work.", accent: "#5191F8" },
  { title: "Skills", href: "/skills", desc: "Togglable capabilities — browser automation, transcription, image generation, and more.", accent: "#FBD9DA" },
  { title: "Models & harnesses", href: "/models", desc: "Bring any model or agent harness; Froots stays model-agnostic by design.", accent: "#F6C849" },
];

export default function DocsPage() {
  return (
    <main className="min-h-screen">
      <CardNav logo="/froots-logo.png" logoAlt="Froots" logoText="Froots" ctaLabel="Login" items={NAV_ITEMS} />

      <section className="px-6 md:px-10 pt-32 pb-8">
        <div className="mx-auto max-w-6xl">
          <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700">Documentation</span>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-foreground">Get started with Froots</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Froots is a local-first desktop workspace for running AI agents — with full visibility into every step. Install it, bring your own keys, and hand your agents real work.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10 py-8">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-5">
          {START.map((s) => {
            const Icon = s.icon;
            const external = s.href.startsWith("http");
            return (
              <Link
                key={s.title}
                href={s.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex flex-col rounded-3xl border border-border bg-white p-6 text-neutral-900 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
              >
                <Icon className="size-6 text-neutral-700" />
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed flex-1">{s.body}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-neutral-700">
                  {s.cta}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="px-6 md:px-10 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">Guides</h2>
          <p className="mt-2 text-muted-foreground">Deep dives on each part of Froots.</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {GUIDES.map((g) => (
              <Link
                key={g.title}
                href={g.href}
                className="group flex items-stretch overflow-hidden rounded-3xl border border-border bg-white text-neutral-900 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
              >
                <div className="w-2 shrink-0" style={{ backgroundColor: g.accent }} />
                <div className="p-6">
                  <h3 className="text-lg font-semibold tracking-tight">{g.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{g.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 pb-20">
        <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-neutral-50 p-8 md:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">More help</h2>
          <p className="mt-2 text-muted-foreground">Ask questions, report bugs, and follow releases.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="https://discord.gg/y7cq9A5bYu" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition">
              Join the Discord <ArrowUpRight className="size-4" />
            </a>
            <a href="https://github.com/dylanworrall/froots/releases" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-white transition">
              Changelog <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
