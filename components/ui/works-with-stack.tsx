import {
  SiAnthropic,
  SiOpenai,
  SiGooglegemini,
  SiMeta,
  SiMistralai,
  SiImessage,
  SiGithub,
  SiNotion,
  SiObsidian,
  SiSlack,
  SiDiscord,
  SiLinear,
  SiSonos,
  SiPhilipshue,
  SiWyze,
  SiBlender,
  SiSpotify,
  SiApple,
  SiHomeassistant,
} from "react-icons/si";
import type { IconType } from "react-icons";
import type { ComponentType, SVGProps } from "react";

interface StackItem {
  label: string;
  Icon?: IconType | ComponentType<SVGProps<SVGSVGElement>>;
  src?: string;
  color?: string;
  blurb?: string;
}

const agents: StackItem[] = [
  {
    label: "Claude",
    Icon: SiAnthropic,
    color: "#D97706",
    blurb: "Anthropic's flagship for long-context reasoning and tool use — the default brain for agent loops.",
  },
  {
    label: "GPT",
    Icon: SiOpenai,
    color: "#000",
    blurb: "OpenAI's multimodal workhorse — broad ecosystem, vision, and fast function calling.",
  },
  {
    label: "Gemini",
    Icon: SiGooglegemini,
    color: "#1F6FEB",
    blurb: "Google's million-token model — ideal when you need to drop in whole repos or hours of transcripts.",
  },
  {
    label: "Llama",
    Icon: SiMeta,
    color: "#0866FF",
    blurb: "Meta's open weights — run it locally for privacy or fine-tune it for niche domains.",
  },
  {
    label: "Mistral",
    Icon: SiMistralai,
    color: "#FA520F",
    blurb: "Lean European models with strong tool use — cheap, fast, and Apache-licensed.",
  },
  {
    label: "OpenClaw",
    src: "/logo-openclaw.svg",
    blurb: "Open-source agent harness built around tool authoring and durable memory.",
  },
  {
    label: "Hermes",
    src: "/logo-hermes.png",
    blurb: "Nous Research's fine-tunes — agentic behavior tuned for structured output and persona.",
  },
];

const integrations: StackItem[] = [
  { label: "GitHub", Icon: SiGithub, color: "#0a0a0a" },
  { label: "Notion", Icon: SiNotion, color: "#0a0a0a" },
  { label: "Obsidian", Icon: SiObsidian, color: "#7C3AED" },
  { label: "iMessage", Icon: SiImessage, color: "#34DA50" },
  { label: "Slack", Icon: SiSlack, color: "#4A154B" },
  { label: "Discord", Icon: SiDiscord, color: "#5865F2" },
  { label: "Linear", Icon: SiLinear, color: "#5E6AD2" },
];

const home: StackItem[] = [
  { label: "Sonos", Icon: SiSonos, color: "#0a0a0a" },
  { label: "Hue", Icon: SiPhilipshue, color: "#0a0a0a" },
  { label: "Wyze", Icon: SiWyze, color: "#84BD00" },
  { label: "Home Assistant", Icon: SiHomeassistant, color: "#18BCF2" },
  { label: "Spotify", Icon: SiSpotify, color: "#1DB954" },
  { label: "Blender", Icon: SiBlender, color: "#EA7600" },
  { label: "Apple", Icon: SiApple, color: "#0a0a0a" },
];

function Row({ items }: { label?: string; items: StackItem[] }) {
  return (
    <div className="text-center">
      <div className="flex flex-wrap justify-center gap-4">
        {items.map(({ label, Icon, src, color }) => (
          <div key={label} className="flex flex-col items-center gap-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:bg-white/95">
              {Icon ? (
                <Icon className="h-9 w-9" style={{ color }} />
              ) : src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt={label} className="h-10 w-10 object-contain" />
              ) : null}
            </div>
            <span className="text-sm text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WorksWithStack() {
  return (
    <section className="w-full py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tight text-foreground">
            Works with your stack
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Connect Froots once, then every agent and tool you use knows your context instantly.
          </p>
        </div>
        <div className="mt-16 space-y-12">
          <Row label="Agents" items={agents} />
          <Row label="Integrations" items={integrations} />
          <Row label="Devices & apps" items={home} />
        </div>
      </div>
    </section>
  );
}
