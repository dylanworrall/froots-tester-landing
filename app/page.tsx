import ExpandOnHover from "@/components/ui/expand-cards";
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
import Testimonial1 from "@/components/ui/testimonial-1";
import { FAQ } from "@/components/ui/faq";
import { AiModelsList } from "@/components/ui/ai-models-preview";
import { WorksWithStack } from "@/components/ui/works-with-stack";

const aiModels = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    family: "GPT-4",
    version: "2024-08-06",
    description: "Multimodal flagship model with strong reasoning.",
    contextWindowTokens: 128000,
    inputPricePer1KTokensUSD: 0.005,
    outputPricePer1KTokensUSD: 0.015,
    supports: { vision: true, streaming: true, functionCalling: true },
    tags: ["general", "multimodal"],
    meta: { latencyMsP50: 320 },
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    family: "Claude 3",
    description: "High reasoning performance for complex tasks.",
    contextWindowTokens: 200000,
    inputPricePer1KTokensUSD: 0.015,
    outputPricePer1KTokensUSD: 0.075,
    supports: { streaming: true },
  },
  {
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    family: "Gemini",
    description: "State-of-the-art multimodal reasoning and search.",
    contextWindowTokens: 1000000,
    inputPricePer1KTokensUSD: 0.01,
    outputPricePer1KTokensUSD: 0.03,
    supports: { vision: true, toolUse: true },
  },
  {
    id: "mistral-large",
    name: "Mistral Large",
    provider: "Mistral",
    description: "Efficient and cost-effective model with open weights.",
    inputPricePer1KTokensUSD: 0.002,
    outputPricePer1KTokensUSD: 0.006,
    tags: ["open-weight", "fast"],
  },
  {
    id: "llama-3.1-70b",
    name: "LLaMA 3.1 70B",
    provider: "Meta",
    family: "LLaMA",
    description: "Open-weight with high accuracy across benchmarks.",
    contextWindowTokens: 128000,
    inputPricePer1KTokensUSD: 0.002,
    outputPricePer1KTokensUSD: 0.004,
  },
  {
    id: "mixtral-8x7b",
    name: "Mixtral 8x7B",
    provider: "Mistral",
    description: "Sparse mixture of experts, balanced speed and quality.",
    tags: ["smol", "sparse"],
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

export default function Home() {
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
              { label: "Memory", ariaLabel: "Memory", href: "#" },
              { label: "Routines", ariaLabel: "Routines", href: "#" },
              { label: "Skills", ariaLabel: "Skills", href: "#" },
            ],
          },
          {
            label: "Harnesses",
            bgColor: "#5191F8",
            textColor: "#0a0a0a",
            links: [
              { label: "Models", ariaLabel: "Models", href: "#" },
              { label: "Pricing", ariaLabel: "Pricing", href: "#" },
            ],
          },
          {
            label: "Resources",
            bgColor: "#FBD9DA",
            textColor: "#0a0a0a",
            links: [
              { label: "Docs", ariaLabel: "Docs", href: "#" },
              { label: "Changelog", ariaLabel: "Changelog", href: "#" },
              { label: "Discord", ariaLabel: "Discord", href: "#" },
            ],
          },
        ]}
      />
      <HeroBerry
        heading="Hours of work in minutes."
        tagline="Froots is a playground for your AI — let it browse the web, build your digital brain, write notes, create widgets, and run automations."
        buttonText="Join the waitlist"
      />
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
          imageUrl="https://froots.ai/assets/hero-home.png"
          imageAlt="Froots dashboard"
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
        imageSrc="/froots-feature-widgets.png"
        imageAlt="Froots custom widgets"
        primaryCta="Build a view"
      />
      <FeatureSplit
        reverse
        title="A browser, built in"
        description="Research, prospect, and pull data without ever leaving Froots. The built-in browser lives next to your agents, so what they see is what you see — and either of you can take the wheel."
        imageSrc="/froots-feature-browser.png"
        imageAlt="Froots built-in browser"
        primaryCta="Try the browser"
      />
      <FeatureSplit
        title="Multi-panel for multi-agent workflows"
        description="Run several agents side by side — one drafting, one researching, one shipping. Each gets its own panel, its own context, its own tools, while you orchestrate from a single canvas."
        imageSrc="/froots-feature-multipanel.png"
        imageAlt="Froots multi-agent panels"
        primaryCta="See the layout"
      />
      <Testimonial1 />
      <ExpandOnHover />
      <WorksWithStack />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
