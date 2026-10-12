// The home page's product story, told with the app's own components (./widgets) instead of
// screenshots. The hero (heading + the live chat, ./froots-widgets/hero-chat) stays the one hero; every band below it is a plain feature
// row or a row of cards, so nothing competes with it. Everything rises in on scroll via <Reveal/>.
//
// Every claim here is a shipped feature. Copy inside the widgets is illustration.

import type { ReactNode } from "react";
import { DownloadCta } from "@/components/ui/download-cta";
import { Reveal } from "./motion";
import {
  BrowserDriveWidget,
  FriendRequestWidget,
  GroupMentionWidget,
  InboxWidget,
  PlacementWidget,
  RuntimesWidget,
  TerminalWidget,
} from "./froots-widgets/widgets";

function Head({ kicker, title, body, points }: { kicker: string; title: ReactNode; body: ReactNode; points?: readonly string[] }) {
  return (
    <div className="flex max-w-xl flex-col gap-3">
      <Reveal>
        <span className="text-sm font-medium text-muted-foreground">{kicker}</span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{title}</h2>
      </Reveal>
      <Reveal delay={160}>
        <p className="text-base leading-relaxed text-muted-foreground">{body}</p>
      </Reveal>
      {points && (
        <Reveal delay={240}>
          <ul className="mt-2 flex flex-col gap-2.5 text-sm leading-relaxed text-muted-foreground">
            {points.map((pt) => (
              <li key={pt} className="flex gap-2.5">
                <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                {pt}
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </div>
  );
}

/** One widget and its paragraph, side by side; stacked on phones with the copy first. */
function FeatureRow({
  kicker,
  title,
  body,
  points,
  picture,
  reverse = false,
  id,
}: {
  kicker: string;
  title: string;
  body: string;
  points?: readonly string[];
  picture: ReactNode;
  reverse?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className="w-full scroll-mt-24 px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <div className={reverse ? "md:order-2" : ""}>
          <Head kicker={kicker} title={title} body={body} points={points} />
        </div>
        <Reveal className={reverse ? "md:order-1" : ""} delay={120}>
          {picture}
        </Reveal>
      </div>
    </section>
  );
}

/* ── people and agents together: group DMs, the inbox, friends ─────────────────────────────── */

const TOGETHER: readonly { title: string; body: string; picture: ReactNode }[] = [
  {
    title: "@mention an agent to wake it",
    body: "Put your people and several agents in one group DM, up to 10 members. Mention an agent and it wakes up, reads the thread and answers there. Agents @mention each other too, so one can hand part of a job to another and get it back when it's done.",
    picture: <GroupMentionWidget />,
  },
  {
    title: "Unread at a glance",
    body: "People, agents and groups share one inbox. Agents post progress mid-task, send screenshots and video, and ask before anything risky. A red count shows what's new and clears when you open the chat.",
    picture: <InboxWidget />,
  },
  {
    title: "Bring your people",
    body: "Friend requests pop up where you'll see them. Accept, and your friend is in your sidebar next to your agents, ready to add to a group with them.",
    picture: <FriendRequestWidget />,
  },
];

export function TogetherSection() {
  return (
    <section id="together" className="w-full scroll-mt-24 px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <Head
          kicker="Humans and agent teams, one place"
          title="Same DMs. Same group chats."
          body="Froots is a desktop workspace where people and agents share DMs and group DMs. Talk to one agent alone, or bring a team of them into the conversation with your people. Every agent can use the whole workspace: tasks, the knowledge base, memory, routines, email, calendar, contacts and the browser, about 130 operations through one froots command, whatever harness it runs on."
        />
        <div className="grid gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {TOGETHER.map((c, i) => (
            <Reveal key={c.title} delay={i * 120} className="flex flex-col gap-5">
              {c.picture}
              <div className="px-1">
                <h3 className="text-lg font-semibold text-foreground">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── any model, any harness ───────────────────────────────────────────────────────────────── */

export function RuntimesSection() {
  return (
    <FeatureRow
      id="runtimes"
      reverse
      kicker="Bring your own harness"
      title="Any model. Any harness."
      body="Froots drives the agent CLIs you already use instead of reimplementing one: Claude Code, Codex, Gemini CLI, Cursor, Amp, Goose, Kilo Code, OpenCode, Hermes Agent, Kimi Code, Oh My Pi and Grok Build. Pick one per agent, with your own keys or subscription."
      picture={<RuntimesWidget />}
    />
  );
}

/* ── the browser and placement ─────────────────────────────────────────────────────────────── */

export function BrowserSection() {
  return (
    <FeatureRow
      kicker="Either of you can take the wheel"
      title="A browser, built in"
      body="The browser lives next to your agents, so what they see is what you see. An agent reads the page as numbered elements and acts on them by number: type into 2, click 3."
      picture={<BrowserDriveWidget />}
    />
  );
}

export function PlacementSection() {
  return (
    <FeatureRow
      reverse
      kicker="Where this agent runs"
      title="Pin it to a machine, or let it follow you"
      body="On Follow me, an agent answers on whichever device you message it from. Pin it to your Mac mini and it always answers from there, with another device standing in if it's off."
      picture={<PlacementWidget />}
    />
  );
}

/* ── the close: the install line and the download ─────────────────────────────────────────── */

export function HomeCTA() {
  return (
    <section className="w-full px-4 pb-16 pt-20 sm:px-6 md:px-10">
      <Reveal className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 rounded-3xl bg-secondary px-6 py-14 md:grid-cols-2 md:px-14 md:py-20">
          <div className="flex flex-col items-center gap-7 text-center md:items-start md:text-left">
            <h2 className="text-4xl font-semibold tracking-tight text-foreground md:text-6xl">Run your first agent today.</h2>
            <div className="md:-ml-1 md:self-start">
              <DownloadCta size="lg" />
            </div>
            <p className="text-xs text-muted-foreground">Free for individuals and teams · Your own keys · No card required</p>
          </div>
          <TerminalWidget />
        </div>
      </Reveal>
    </section>
  );
}
