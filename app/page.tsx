import CircularGallery from "@/components/ui/circular-gallery";
import { HeroBerry } from "@/components/ui/hero-berry";
import { HeroChatWidget } from "@/components/home/froots-widgets/hero-chat";
import { UseCasesGrid } from "@/components/ui/use-cases-grid";
import CardNav from "@/components/ui/card-nav";
import { Footer } from "@/components/ui/footer";
import { FAQ } from "@/components/ui/faq";
import { Reveal } from "@/components/home/motion";
import {
  BrowserSection,
  HomeCTA,
  PlacementSection,
  RuntimesSection,
  TogetherSection,
} from "@/components/home/sections";
import { WorksWithStack } from "@/components/ui/works-with-stack";

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
        text: "Froots is a local-first desktop app for Mac, Windows and Linux where people and agents share DMs and group DMs. Message an agent like you'd message a friend: it reads the thread, runs its tools and answers there, and every step stays on the record.",
      },
    },
    {
      "@type": "Question",
      name: "Which agent harnesses does Froots support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Claude Code, Codex, Gemini CLI, Cursor, Amp, Goose, Kilo Code, OpenCode, Hermes Agent, Kimi Code, Oh My Pi and Grok Build. Froots drives the CLI you already use instead of reimplementing one. Any other harness that speaks ACP can be added in Settings.",
      },
    },
    {
      "@type": "Question",
      name: "What AI models can I use with Froots?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Whatever your harness offers: Claude through Claude Code, GPT through Codex, Gemini through Gemini CLI, and more. Froots reads each harness's model list, and you sign in with your own account or keys.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a Froots mobile app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not yet. Froots runs on Mac, Windows and Linux.",
      },
    },
    {
      "@type": "Question",
      name: "How much does Froots cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Free for individuals and teams, with your own keys. No card required. Companies that want their own relay can get an Enterprise license.",
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
      {/* The hero is a chat with an agent: a demo plays until you take over (components/home). */}
      <HeroBerry
        heading="Message an agent like a person."
        tagline="It reads, runs its tools and answers in the thread, and every step stays on the record."
      >
        <HeroChatWidget />
      </HeroBerry>
      {/* The rest of the product story, drawn: live widgets that animate as they scroll in. */}
      <TogetherSection />
      <RuntimesSection />
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
      <BrowserSection />
      <PlacementSection />
      <Reveal>
        <UseCasesGrid />
      </Reveal>
      <Reveal>
        <WorksWithStack />
      </Reveal>
      <FAQ />
      <HomeCTA />
      <Footer />
    </main>
  );
}
