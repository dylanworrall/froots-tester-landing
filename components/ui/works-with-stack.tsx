import {
  SiOpenai,
  SiImessage,
  SiGithub,
  SiNotion,
  SiObsidian,
  SiSlack,
  SiDiscord,
  SiTrello,
  SiSonos,
  SiPhilipshue,
  SiWyze,
  SiBlender,
  SiSpotify,
  SiApple,
} from "react-icons/si";
import type { IconType } from "react-icons";
import type { ComponentType, SVGProps } from "react";

interface StackItem {
  label: string;
  Icon?: IconType | ComponentType<SVGProps<SVGSVGElement>>;
  src?: string;
  glyph?: string;
  color?: string;
}

const agents: StackItem[] = [
  { label: "Claude Code", src: "/harness-logos/claude.svg" },
  { label: "Codex", Icon: SiOpenai, color: "#000" },
  { label: "Gemini CLI", src: "/harness-logos/gemini.svg" },
  { label: "Cursor", glyph: "C", color: "#0a0a0a" },
  { label: "Amp", src: "/harness-logos/amp.png" },
  { label: "Goose", glyph: "G", color: "#0a0a0a" },
  { label: "Kilo Code", glyph: "K", color: "#0a0a0a" },
  { label: "OpenCode", src: "/harness-logos/opencode.svg" },
  { label: "Hermes Agent", src: "/harness-logos/hermes.png" },
  { label: "Kimi Code", src: "/harness-logos/kimi.png" },
  { label: "Oh My Pi", glyph: "π", color: "#0a0a0a" },
  { label: "Grok Build", src: "/harness-logos/grok.svg" },
];

const integrations: StackItem[] = [
  { label: "GitHub", Icon: SiGithub, color: "#0a0a0a" },
  { label: "Notion", Icon: SiNotion, color: "#0a0a0a" },
  { label: "Obsidian", Icon: SiObsidian, color: "#7C3AED" },
  { label: "iMessage", Icon: SiImessage, color: "#34DA50" },
  { label: "Slack", Icon: SiSlack, color: "#4A154B" },
  { label: "Discord", Icon: SiDiscord, color: "#5865F2" },
  { label: "Trello", Icon: SiTrello, color: "#0052CC" },
];

const home: StackItem[] = [
  { label: "Sonos", Icon: SiSonos, color: "#0a0a0a" },
  { label: "Hue", Icon: SiPhilipshue, color: "#0a0a0a" },
  { label: "Wyze", Icon: SiWyze, color: "#84BD00" },
  { label: "Spotify", Icon: SiSpotify, color: "#1DB954" },
  { label: "Blender", Icon: SiBlender, color: "#EA7600" },
  { label: "Apple", Icon: SiApple, color: "#0a0a0a" },
];

function Row({ items }: { label?: string; items: StackItem[] }) {
  return (
    <div className="text-center">
      <div className="flex flex-wrap justify-center gap-4">
        {items.map(({ label, Icon, src, glyph, color }) => (
          <div key={label} className="flex flex-col items-center gap-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:bg-white/95">
              {Icon ? (
                <Icon className="h-9 w-9" style={{ color }} />
              ) : src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt={label} className="h-10 w-10 object-contain" />
              ) : glyph ? (
                <span className="text-3xl font-semibold leading-none" style={{ color }}>
                  {glyph}
                </span>
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
            Pick a harness for each agent. Turn on skills for the apps you already use.
          </p>
        </div>
        <div className="mt-16 space-y-12">
          <Row label="Harnesses" items={agents} />
          <Row label="Integrations" items={integrations} />
          <Row label="Devices & apps" items={home} />
        </div>
      </div>
    </section>
  );
}
