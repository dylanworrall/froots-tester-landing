import {
  SiAnthropic,
  SiOpenai,
  SiGooglegemini,
  SiMeta,
  SiMistralai,
  SiOllama,
} from "react-icons/si";
import type { IconType } from "react-icons";
import type { ComponentType, SVGProps } from "react";
import CardNav from "@/components/ui/card-nav";
import { CTA } from "@/components/ui/cta";
import { FAQ } from "@/components/ui/faq";
import { Footer } from "@/components/ui/footer";

interface AgentCard {
  label: string;
  Icon?: IconType | ComponentType<SVGProps<SVGSVGElement>>;
  src?: string;
  glyph?: string;
  color?: string;
  blurb: string;
}

const models: AgentCard[] = [
  {
    label: "Claude",
    Icon: SiAnthropic,
    color: "#D97706",
    blurb:
      "Anthropic's flagship for long-context reasoning and tool use — the default brain for agent loops.",
  },
  {
    label: "GPT",
    Icon: SiOpenai,
    color: "#000",
    blurb:
      "OpenAI's multimodal workhorse — broad ecosystem, vision, and fast function calling.",
  },
  {
    label: "Gemini",
    Icon: SiGooglegemini,
    color: "#1F6FEB",
    blurb:
      "Google's million-token model — ideal when you need to drop in whole repos or hours of transcripts.",
  },
  {
    label: "Llama",
    Icon: SiMeta,
    color: "#0866FF",
    blurb:
      "Meta's open weights — run it locally for privacy or fine-tune it for niche domains.",
  },
  {
    label: "Mistral",
    Icon: SiMistralai,
    color: "#FA520F",
    blurb:
      "Lean European models with strong tool use — cheap, fast, and Apache-licensed.",
  },
  {
    label: "Grok",
    glyph: "𝕏",
    color: "#0a0a0a",
    blurb:
      "xAI's chatty model with real-time access to X — useful for news-aware agents and sharp tone.",
  },
  {
    label: "Groq",
    glyph: "G",
    color: "#F55036",
    blurb:
      "Not a model — an inference provider. Runs Llama and Mixtral at hundreds of tokens per second.",
  },
  {
    label: "Ollama",
    Icon: SiOllama,
    color: "#0a0a0a",
    blurb:
      "Run any open model locally on your machine — fully offline, zero token costs, full privacy.",
  },
];

const harnesses: AgentCard[] = [
  {
    label: "OpenClaw",
    src: "/logo-openclaw.svg",
    blurb:
      "Open-source agent harness built around tool authoring and durable memory.",
  },
  {
    label: "Hermes",
    src: "/logo-hermes.png",
    blurb:
      "Nous Research's fine-tunes — agentic behavior tuned for structured output and persona.",
  },
];

function CardGrid({ items }: { items: AgentCard[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(({ label, Icon, src, glyph, color, blurb }) => (
        <div
          key={label}
          className="flex gap-4 rounded-2xl border border-border bg-card p-5 text-left shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:bg-white/95">
            {Icon ? (
              <Icon className="h-6 w-6" style={{ color }} />
            ) : src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt={label} className="h-6 w-6 object-contain" />
            ) : glyph ? (
              <span
                className="text-xl font-semibold leading-none"
                style={{ color }}
              >
                {glyph}
              </span>
            ) : null}
          </div>
          <div>
            <div className="text-base font-medium text-foreground">{label}</div>
            <p className="mt-1 text-sm text-muted-foreground">{blurb}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ModelsPage() {
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
              { label: "Docs", ariaLabel: "Docs", href: "/docs" },
              { label: "Changelog", ariaLabel: "Changelog", href: "https://github.com/dylanworrall/froots/releases" },
              { label: "Discord", ariaLabel: "Discord", href: "https://discord.gg/y7cq9A5bYu" },
            ],
          },
        ]}
      />
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-14">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-foreground">
              Bring your own brain.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Every major model API, swappable per task. Pick the agent that
              fits the job.
            </p>
          </div>
          <div className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Models
          </div>
          <CardGrid items={models} />
        </div>
      </section>
      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Harnesses
          </div>
          <CardGrid items={harnesses} />
        </div>
      </section>
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
