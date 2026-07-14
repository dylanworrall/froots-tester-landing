import CircularGallery from "@/components/ui/circular-gallery";
import { HeroBerry } from "@/components/ui/hero-berry";
import { VideoShowcase } from "@/components/ui/video-showcase";
import { UseCasesGrid } from "@/components/ui/use-cases-grid";
import { AnimatedFeatureSpotlight } from "@/components/ui/feature-spotlight";
import { Eye } from "lucide-react";
import CardNav from "@/components/ui/card-nav";
import { Footer } from "@/components/ui/footer";
import { CTA } from "@/components/ui/cta";
import { FeatureSplit } from "@/components/ui/feature-modern";
import { FAQ } from "@/components/ui/faq";
import { AiModelsList } from "@/components/ui/ai-models-preview";
import { WorksWithStack } from "@/components/ui/works-with-stack";

const aiModels = [
  {
    id: "claude-opus-4-7",
    name: "Claude Opus 4.7",
    provider: "Anthropic",
    family: "Claude 4",
    description: "Top-tier reasoning for long agent runs and complex tool use.",
    contextWindowTokens: 1000000,
    inputPricePer1KTokensUSD: 0.015,
    outputPricePer1KTokensUSD: 0.075,
    supports: { streaming: true, vision: true, functionCalling: true },
    tags: ["frontier", "reasoning"],
  },
  {
    id: "claude-sonnet-4-6",
    name: "Claude Sonnet 4.6",
    provider: "Anthropic",
    family: "Claude 4",
    description: "Balanced flagship — fast enough for chat, smart enough for agents.",
    contextWindowTokens: 1000000,
    inputPricePer1KTokensUSD: 0.003,
    outputPricePer1KTokensUSD: 0.015,
    supports: { streaming: true, vision: true, functionCalling: true },
    tags: ["balanced", "agentic"],
  },
  {
    id: "gpt-5",
    name: "GPT-5",
    provider: "OpenAI",
    family: "GPT-5",
    description: "Multimodal flagship with strong reasoning and structured tool use.",
    contextWindowTokens: 400000,
    inputPricePer1KTokensUSD: 0.005,
    outputPricePer1KTokensUSD: 0.015,
    supports: { streaming: true, vision: true, functionCalling: true },
    tags: ["frontier", "multimodal"],
  },
  {
    id: "gemini-2-5-pro",
    name: "Gemini 2.5 Pro",
    provider: "Google",
    family: "Gemini 2.5",
    description: "Long-context multimodal model with search and code execution.",
    contextWindowTokens: 2000000,
    inputPricePer1KTokensUSD: 0.00125,
    outputPricePer1KTokensUSD: 0.005,
    supports: { streaming: true, vision: true, functionCalling: true },
    tags: ["long-context", "multimodal"],
  },
  {
    id: "llama-4-405b",
    name: "Llama 4 405B",
    provider: "Meta",
    family: "Llama 4",
    description: "Open-weight flagship — run hosted or on your own GPU. No vendor lock-in.",
    contextWindowTokens: 256000,
    inputPricePer1KTokensUSD: 0.0008,
    outputPricePer1KTokensUSD: 0.0008,
    supports: { streaming: true, functionCalling: true },
    tags: ["open-weight", "self-host"],
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    provider: "DeepSeek",
    family: "DeepSeek",
    description: "Open-weight reasoning model — frontier benchmarks at a fraction of the price.",
    contextWindowTokens: 128000,
    inputPricePer1KTokensUSD: 0.0003,
    outputPricePer1KTokensUSD: 0.0012,
    supports: { streaming: true, functionCalling: true },
    tags: ["open-weight", "cheap"],
  },
];

const galleryItems = [
  {
    image: "/froots-memory-graph.jpg",
    title: "Memory graph",
    description: "Every conversation indexed, linked, and searchable so your agent remembers what you said last week, last month, last year.",
  },
  {
    image: "/froots-routines.jpg",
    title: "Routines",
    description: "Schedule agent runs that fire on their own — morning briefings, weekly reports, market checks. Set it once, forget it.",
  },
  {
    image: "/froots-skills.jpg",
    title: "Skills library",
    description: "Browse, install, and toggle skills for your assistant. Treat capabilities like apps — turn them on when you need them.",
  },
  {
    image: "/froots-conversations.jpg",
    title: "Conversations",
    description: "Pinned, background, and recent runs in one pane. Pick up any thread without losing context across tabs.",
  },
  {
    image: "/froots-welcome.jpg",
    title: "Setup in minutes",
    description: "Skippable, reversible onboarding with sensible defaults. Tell it who you are once and it tunes the rest.",
  },
  {
    image: "/froots-import.jpg",
    title: "Bring your notes",
    description: "Import from Obsidian, Notion, or start fresh. Your second brain stays yours — agent reads, you write.",
  },
  {
    image: "/froots-automation.jpg",
    title: "Automation",
    description: "Heartbeat checks in on its own and surfaces what matters — drafts ready to review, decisions waiting on you.",
  },
  {
    image: "/froots-widgets.jpg",
    title: "Widgets",
    description: "Calendar, weather, focus board, custom dashboards — pinned to your desktop so the data is always one glance away.",
  },
  {
    image: "/froots-usecase.jpg",
    title: "Tuned to you",
    description: "Tell it your role, goals, and constraints. It tailors prompts, tools, and tone so every response sounds like you wrote it.",
  },
];

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Froots?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Froots is a local-first desktop app where you run AI agents — Claude Code, OpenAI Codex, Cursor, or your own harness — and watch every move they make. Tool calls, file diffs, browser sessions, memory updates, and reasoning all stream into one timeline you can pause, fork, and replay. You bring the model keys; your data stays on your machine.",
      },
    },
    {
      "@type": "Question",
      name: "How is Froots different from Notion or Obsidian?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Notion and Obsidian are places to write things down. Froots is a place where what you write down can run. It is local-first like Obsidian, agentic like a custom GPT, and replaces the gap that tools like Zapier filled — but inside your editor, not in a separate dashboard.",
      },
    },
    {
      "@type": "Question",
      name: "Does Froots work offline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The vault, editor, and skills all run locally. The AI agent calls out to whatever model you connect — including local models running on your machine, so you can use Froots fully offline if you want to.",
      },
    },
    {
      "@type": "Question",
      name: "What AI models can I use with Froots?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Any. Froots is bring-your-own-key. Connect OpenAI, Anthropic Claude, Google Gemini, DeepSeek, Mistral, or run a local model through Ollama or LM Studio.",
      },
    },
    {
      "@type": "Question",
      name: "How much does Froots cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Froots is free forever when you bring your own model API keys (Claude, GPT, Gemini, Ollama, local). Add Sync for $12/month to share your vault and memory across devices. Beta pricing locked in for life.",
      },
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
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
      <HeroBerry />
      <VideoShowcase imageUrl="/froots-app-preview.png" />
      <UseCasesGrid />
      <div className="flex items-center justify-center w-full py-24 bg-background px-4">
        <AnimatedFeatureSpotlight
          preheaderIcon={<Eye className="h-4 w-4" />}
          preheaderText="See every move your agent makes"
          heading={
            <>
              <span className="text-primary">Watch</span> your agents{" "}
              <span className="text-primary">work</span>
            </>
          }
          description="Tool calls, file edits, browser sessions, and reasoning — all streamed into one timeline. Spot a wrong turn early, hit pause, and steer it back without ever leaving the dashboard."
          buttonText="See it live"
          imageUrl="/froots-watch-agent.png"
          imageAlt="Froots dashboard — watch every tool call, file edit, and step"
        />
      </div>
      <section className="w-full py-24">
        <AiModelsList models={aiModels} />
      </section>
      {false && <section className="w-full py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Everything in one place
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Memory, routines, skills, widgets — every surface of Froots, designed to work together.
          </p>
        </div>
        <div className="relative mt-4 h-[600px] w-full">
          <CircularGallery
            items={galleryItems.map((it) => ({ image: it.image, text: it.title }))}
            bend={3}
            textColor="#0a0a0a"
            borderRadius={0.05}
            scrollSpeed={0.6}
            scrollEase={0.04}
            font="600 56px Geist, system-ui, -apple-system, sans-serif"
          />
        </div>
      </section>}
      <FeatureSplit
        title="Custom views for your internal ops"
        description="Spin up dashboards, widgets, and panels tailored to how your team actually works. Pin them to your desktop, share them with your agents, and stop tab-hopping between five different tools."
        imageSrc="/froot-cantalope.jpg"
        imageAlt="Froots custom widgets"
        primaryCta="Build a view"
      />
      <FeatureSplit
        reverse
        title="A browser, built in"
        description="Research, prospect, and pull data without ever leaving Froots. The built-in browser lives next to your agents, so what they see is what you see — and either of you can take the wheel."
        imageSrc="/froot-grapefruit.jpg"
        imageAlt="Froots built-in browser"
        primaryCta="Try the browser"
      />
      <FeatureSplit
        title="Multi-panel for multi-agent workflows"
        description="Run several agents side by side — one drafting, one researching, one shipping. Each gets its own panel, its own context, its own tools, while you orchestrate from a single canvas."
        imageSrc="/froot-pomegranete.jpg"
        imageAlt="Froots multi-agent panels"
        primaryCta="See the layout"
      />
      <WorksWithStack />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
