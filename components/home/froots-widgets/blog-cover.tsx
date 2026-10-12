// A blog post's cover, drawn with the app's own pieces like the home page widgets: one of five
// Froots scenes on one of the site's pastels, each carrying the article title. Static (no clock),
// so it renders on the server. The slug picks the scene, the pastel and the agent, so a post always
// gets the same cover.
//
//   chat     — an agent posts the article in a DM, under a "Wrote file" tool card
//   group    — someone @mentions the agent in a group, it answers with the article
//   browser  — the article open in the built-in browser, its parts numbered the way an agent reads them
//   runtimes — the Agent runtimes settings, with the article dropped in as a message
//   friend   — the article in a DM, a friend request popping up over it

import type { ReactNode } from "react";
import { FileText, Globe } from "lucide-react";
import { AppPanel, AppWindow } from "./app-window";
import { ChainBubble } from "./chat-surface";
import { DmBubble, MentionPill, ThreadHeader } from "./dm-thread";
import { Face, FACES, type Who } from "./faces";
import { FitScale } from "./fit-scale";
import { FriendRequestPopup } from "./friend-request-popup";
import { AgentRuntimesSettings } from "./runtime-settings";
import { ElementRef, BrowserToolbar } from "./browser-chrome";
import { Rail } from "./sidebar-rail";

const PASTELS = ["#FBD9DA", "#D7EFD3", "#DCE7FD", "#FBEBC8"];
const AGENTS: Who[] = ["pip", "scout", "maya", "leo", "sam"];
const SCENES = ["chat", "group", "browser", "runtimes", "friend"] as const;
type Scene = (typeof SCENES)[number];
type Size = "card" | "feature" | "hero";

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** The size each cover is drawn at before it's scaled to its box (the feature's box is taller on
 *  wide screens, so its canvas runs long and the overflow is cropped). */
const CANVAS: Record<Size, { width: number; height: number; guess: number }> = {
  card: { width: 600, height: 338, guess: 0.6 },
  feature: { width: 640, height: 600, guess: 0.85 },
  hero: { width: 900, height: 394, guess: 0.85 },
};

const SHADOW = "shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)]";

/** Where the main window sits: cropped off the bottom of the card, a little wider on the hero. */
function windowBox(size: Size) {
  return size === "card" ? "left-[9%] top-[16%] w-[86%]" : size === "feature" ? "left-[10%] top-[14%] w-[84%]" : "left-[14%] top-[16%] w-[72%]";
}

function Frame({ size, children }: { size: Size; children: ReactNode }) {
  return <div className={`absolute ${windowBox(size)} transition-transform duration-500 group-hover:-translate-y-1`}>{children}</div>;
}

function ChatScene({ slug, title, tag, who, size }: SceneProps) {
  return (
    <Frame size={size}>
      <AppWindow compact label="" className={`h-[420px] w-full rounded-[14px] ${SHADOW}`} tabs={[{ title: FACES[who].name, icon: <Face who={who} size={16} />, active: true }]}>
        <ThreadHeader who={who} title={FACES[who].name} sub={<span className="truncate text-[11px] text-ink/30">{tag}</span>} />
        <div className="flex flex-col gap-2.5 px-3 pt-1">
          <ChainBubble steps={[{ icon: FileText, label: "Wrote file", desc: `${slug}.md`, at: 0 }]} p={1e9} foldAt={0} doneAfter={1} />
          <DmBubble who={who} time="9:41 AM">
            {title}
          </DmBubble>
        </div>
      </AppWindow>
    </Frame>
  );
}

function GroupScene({ title, who, size }: SceneProps) {
  const asker: Who = who === "maya" ? "leo" : "maya";
  return (
    <Frame size={size}>
      <AppWindow
        compact
        label=""
        className={`h-[420px] w-full rounded-[14px] ${SHADOW}`}
        tabs={[{ title: "Launch crew", icon: <Face who="maya" size={16} />, active: true }]}
        rail={
          <Rail
            items={[
              { who: "pip", kind: "agent" },
              { who: "maya", kind: "group", here: true },
              { who: "scout", kind: "agent", count: 2 },
              { who: "leo", kind: "dm", count: 1 },
            ]}
          />
        }
      >
        <ThreadHeader who="maya" title="Launch crew" sub={<span className="truncate text-[11px] text-ink/30">4 people</span>} />
        <div className="flex flex-col gap-2.5 px-3 pt-1">
          <DmBubble who={asker} group time="9:40 AM">
            <MentionPill who={who} /> can you write this one up?
          </DmBubble>
          <DmBubble who={who} group time="9:41 AM">
            {title}
          </DmBubble>
        </div>
      </AppWindow>
    </Frame>
  );
}

function BrowserScene({ slug, title, who, size }: SceneProps) {
  return (
    <Frame size={size}>
      <AppWindow
        compact
        label=""
        className={`h-[420px] w-full rounded-[14px] ${SHADOW}`}
        tabs={[
          { title: FACES[who].name, icon: <Face who={who} size={16} /> },
          { title: "froots.ai", icon: <Globe size={13} className="shrink-0 text-ink/45" />, active: true, driver: true },
        ]}
      >
        <BrowserToolbar url={`froots.ai/blog/${slug}`} />
        <div className="relative mx-1.5 mb-1.5 flex flex-1 flex-col gap-3 rounded-lg bg-[#faf7f0] p-5 text-[#171717]">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-full bg-[#e5e0d4]" />
            <span className="h-2 w-20 rounded-full bg-[#e5e0d4]" />
          </div>
          <div className="relative w-fit max-w-[92%]">
            <ElementRef n={1} show />
            <div className="text-[19px] font-semibold leading-[1.2] tracking-tight">{title}</div>
          </div>
          <div className="flex flex-col gap-2">
            {[0.92, 0.76, 0.84].map((w, i) => (
              <span key={i} className="h-2 rounded-full bg-[#ebe6da]" style={{ width: `${w * 100}%` }} />
            ))}
          </div>
          <span className="relative mt-1 w-fit rounded-full bg-[#171717] px-4 py-1.5 text-[12px] font-semibold text-white ring-4 ring-[#7c5cff]/30">
            <ElementRef n={2} show hot />
            Read
          </span>
        </div>
      </AppWindow>
    </Frame>
  );
}

function RuntimesScene({ title, who, size }: SceneProps) {
  const settings = size === "card" ? "left-[7%] top-[12%] w-[64%]" : size === "feature" ? "left-[8%] top-[12%] w-[60%]" : "left-[12%] top-[14%] w-[50%]";
  const message = size === "hero" ? "right-[12%] top-[46%] w-[40%]" : "right-[6%] top-[50%] w-[52%]";
  return (
    <>
      <div className={`absolute ${settings} transition-transform duration-500 group-hover:-translate-y-1`}>
        <AppPanel label="" className={`rounded-[14px] p-4 ${SHADOW}`}>
          <AgentRuntimesSettings
            rows={[
              { id: "claude", label: "Claude Code", ready: true },
              { id: "codex", label: "Codex", ready: true },
              { id: "gemini", label: "Gemini CLI", ready: true },
              { id: "kimi", label: "Kimi Code", ready: false },
            ]}
            checking={false}
            answered={() => true}
          />
        </AppPanel>
      </div>
      <div className={`absolute ${message} transition-transform duration-500 delay-75 group-hover:-translate-y-1.5`}>
        <AppPanel label="" className={`rounded-[14px] p-3 ${SHADOW}`}>
          <DmBubble who={who} time="9:41 AM">
            {title}
          </DmBubble>
        </AppPanel>
      </div>
    </>
  );
}

function FriendScene({ title, who, size }: SceneProps) {
  const friend: Who = who === "sam" ? "leo" : "sam";
  return (
    <Frame size={size}>
      <AppWindow compact label="" className={`h-[420px] w-full rounded-[14px] ${SHADOW}`} tabs={[{ title: FACES[who].name, icon: <Face who={who} size={16} />, active: true }]}>
        <div className="relative flex flex-1 flex-col">
          <div className="flex flex-col gap-2.5 px-3 pt-[132px]">
            <DmBubble mine time="9:40 AM">
              Send me the post when it&apos;s up
            </DmBubble>
            <DmBubble who={who} time="9:41 AM">
              {title}
            </DmBubble>
          </div>
          <FriendRequestPopup who={friend} keyLabel="npub1uvr…5dsz" shown pressed={false} accepting={false} />
        </div>
      </AppWindow>
    </Frame>
  );
}

type SceneProps = { slug: string; title: string; tag: string; who: Who; size: Size };

const DRAW: Record<Scene, (p: SceneProps) => ReactNode> = {
  chat: ChatScene,
  group: GroupScene,
  browser: BrowserScene,
  runtimes: RuntimesScene,
  friend: FriendScene,
};

export function BlogCover({ slug, title, tag, size = "card" }: { slug: string; title: string; tag: string; size?: Size }) {
  const h = hash(slug);
  const who = AGENTS[h % AGENTS.length];
  // A salt picked so the first blog page shows all five scenes with no two alike side by side.
  const scene = SCENES[hash(`scene195:${slug}`) % SCENES.length];
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden" style={{ backgroundColor: PASTELS[h % PASTELS.length] }}>
      <FitScale {...CANVAS[size]}>
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/35 blur-2xl" />
        {DRAW[scene]({ slug, title, tag, who, size })}
      </FitScale>
    </div>
  );
}
