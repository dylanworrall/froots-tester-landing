import { SiAnthropic, SiOpenai, SiGooglegemini, SiOllama } from "react-icons/si";
import type { Metadata } from "next";
import type { IconType } from "react-icons";
import type { ComponentType, SVGProps } from "react";
import CardNav from "@/components/ui/card-nav";
import { CTA } from "@/components/ui/cta";
import { FAQ } from "@/components/ui/faq";
import { Footer } from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "Models — whatever your harness runs",
  description:
    "Froots runs the models your agent harness offers: Claude through Claude Code, GPT through Codex, Gemini through Gemini CLI, and more. Sign in with your own account or keys.",
  alternates: { canonical: "/models" },
  openGraph: { url: "https://froots.ai/models" },
};

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
      "Fable, Opus, Sonnet and Haiku, through Claude Code. Uses your Claude subscription or API key.",
  },
  {
    label: "GPT",
    Icon: SiOpenai,
    color: "#000",
    blurb:
      "OpenAI's coding models through Codex, with effort levels where Codex offers them. Uses your ChatGPT sign-in.",
  },
  {
    label: "Gemini",
    Icon: SiGooglegemini,
    color: "#1F6FEB",
    blurb: "Google's models through Gemini CLI.",
  },
  {
    label: "Grok",
    src: "/harness-logos/grok.svg",
    blurb: "xAI's models through Grok Build.",
  },
  {
    label: "Kimi",
    src: "/harness-logos/kimi.png",
    blurb: "Moonshot AI's models through Kimi Code.",
  },
  {
    label: "Local and open models",
    Icon: SiOllama,
    color: "#0a0a0a",
    blurb:
      "Harnesses like Goose, OpenCode and Kilo Code connect to many providers, including models on your own machine.",
  },
];

const harnesses: AgentCard[] = [
  {
    label: "Claude Code",
    src: "/harness-logos/claude.svg",
    blurb: "Anthropic's agentic coding tool that runs in the terminal.",
  },
  {
    label: "Codex",
    Icon: SiOpenai,
    color: "#000",
    blurb: "OpenAI's coding agent.",
  },
  {
    label: "Gemini CLI",
    src: "/harness-logos/gemini.svg",
    blurb: "Google's coding agent for the terminal.",
  },
  {
    label: "Cursor",
    glyph: "C",
    color: "#0a0a0a",
    blurb: "Cursor's coding agent, through the cursor-agent CLI.",
  },
  {
    label: "Amp",
    src: "/harness-logos/amp.png",
    blurb: "A coding agent from Sourcegraph.",
  },
  {
    label: "Goose",
    glyph: "G",
    color: "#0a0a0a",
    blurb: "Block's open-source, extensible AI agent.",
  },
  {
    label: "Kilo Code",
    glyph: "K",
    color: "#0a0a0a",
    blurb: "An open-source coding agent with access to hundreds of models.",
  },
  {
    label: "OpenCode",
    src: "/harness-logos/opencode.svg",
    blurb: "An open-source coding agent.",
  },
  {
    label: "Hermes Agent",
    src: "/harness-logos/hermes.png",
    blurb: "A general-purpose AI agent from Nous Research.",
  },
  {
    label: "Kimi Code",
    src: "/harness-logos/kimi.png",
    blurb: "A terminal coding agent from Moonshot AI.",
  },
  {
    label: "Oh My Pi",
    glyph: "π",
    color: "#0a0a0a",
    blurb: "A terminal coding agent with integrated development tools.",
  },
  {
    label: "Grok Build",
    src: "/harness-logos/grok.svg",
    blurb: "xAI's coding agent.",
  },
  {
    label: "Your own",
    glyph: ">_",
    color: "#0a0a0a",
    blurb: "Any other CLI that speaks ACP. Add it in Settings with a command and its arguments.",
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
              Froots runs the models your harness offers. Pick a harness and a
              model for each agent, signed in with your own account or keys.
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
