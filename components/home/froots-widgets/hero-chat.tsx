"use client";

// The hero: a chat with an agent that plays a scripted demo until the visitor takes over. Click the
// window and the composer becomes a real box: Tab fills a suggested reply (Tab again cycles), Enter
// sends, and Pip answers from a small script of turns (tool calls in a card that folds, then a
// streamed reply and new suggestions), the same way the app does it.
//
// The demo is a pure function of the `useWidget` tick, like every other widget. A live turn runs
// on its own 100ms clock, timed the same way. Under reduced motion the demo shows its end state
// and a live turn lands whole.

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { FileText, Pencil, Search, Terminal } from "lucide-react";
import { useReducedMotion, useWidget } from "../motion";
import { AppWindow, type Tab } from "./app-window";
import { AssistantBubble, Caret, ChainBubble, Composer, ThinkingVerb, UserBubble, suggestionPlaceholder, type Step } from "./chat-surface";
import { Face } from "./faces";
import { Rail, type RailItem } from "./sidebar-rail";
import { ThreadHeader } from "./dm-thread";

const PROFILES_TAB: Tab = { title: "Profiles", icon: <FileText size={14} className="shrink-0 text-ink/45" /> };
const RAIL: RailItem[] = [
  { who: "pip", kind: "agent", here: true },
  { who: "scout", kind: "agent" },
  { who: "maya", kind: "dm", count: 2 },
  { who: "leo", kind: "group", count: 5 },
];
const VERBS = ["Pondering", "Tinkering", "Brewing"];

/* ── the scripted demo ─────────────────────────────────────────────────────────────────────── */

const ASK = "What's left before Friday's release?";
const TOOLS: Step[] = [
  { icon: FileText, label: "Read file", desc: "CHANGELOG.md", at: 16 },
  { icon: Search, label: "Searched", desc: "release", at: 23 },
  { icon: FileText, label: "Read file", desc: "release-checklist.md", at: 30 },
];
const REPLY =
  "Two things. The Windows installer still needs signing, and the onboarding copy is waiting on your review. Everything else is merged. Want me to start on the installer?";
const SUGGESTIONS = ["yes, sign it and cut the build", "show me the copy first"];
const CHAT = { loop: 150, ask: 4, think: 8, fold: 42, stream: 44, cps: 4, suggest: 92, tab1: 104, tab2: 118, fade: 141, end: 100 };

/* ── what Pip says when you drive ──────────────────────────────────────────────────────────── */

type Script = { match: RegExp; steps: { icon: Step["icon"]; label: string; desc: string }[]; reply: string; next: string[] };

const MORE = ["what else can you do?", "which models can you run on?"];
const SCRIPTS: Script[] = [
  {
    match: /\b(tighten|shorter|edit)/i,
    steps: [
      { icon: FileText, label: "Read file", desc: "onboarding/welcome.md" },
      { icon: Pencil, label: "Edited file", desc: "onboarding/welcome.md" },
    ],
    reply: "Tightened it to one line: “Your team and your agents, one chat.” The diff is in the card above.",
    next: ["looks good, ship it", ...MORE.slice(0, 1)],
  },
  {
    match: /\b(copy|show)\b/i,
    steps: [{ icon: FileText, label: "Read file", desc: "onboarding/welcome.md" }],
    reply: "Here's the headline: “Your agents, in the same chat as your team.” Two short lines sit under it. Tighten it, or is it good to go?",
    next: ["tighten it", "looks good, ship it"],
  },
  {
    match: /\b(sign|build|cut|installer|yes)\b/i,
    steps: [
      { icon: Terminal, label: "Ran command", desc: "gh workflow run release.yml" },
      { icon: Terminal, label: "Ran command", desc: "gh run watch" },
    ],
    reply: "Started. The Windows installer is signing, and the build is running for Mac, Windows and Linux. I'll post the download links here when it's done.",
    next: ["thanks, ping me when it's live", ...MORE.slice(0, 1)],
  },
  {
    match: /model|runtime|harness|claude|codex|gemini|cursor/i,
    steps: [{ icon: Terminal, label: "Ran command", desc: "froots runtimes" }],
    reply: "Whichever harness you already use: Claude Code, Codex, Gemini CLI, Cursor, OpenCode, Kimi and more. It runs on your machine with your own keys.",
    next: ["can you use a browser?", "what else can you do?"],
  },
  {
    match: /\b(browser|web|site|click)/i,
    steps: [{ icon: Terminal, label: "Ran command", desc: "froots-browser snapshot" }],
    reply: "Yes. Froots has a browser built in. I read a page as numbered parts and click by number, and you can watch, or take the wheel whenever you like.",
    next: ["which models can you run on?", "what else can you do?"],
  },
  {
    match: /what.*(do|can)|help|who are you|\?$/i,
    steps: [],
    reply: "I'm an agent on your desktop. I read and edit files, run commands, drive the browser and message people for you, and every step lands in a card like the ones above. Download Froots and I'm yours.",
    next: ["which models can you run on?", "can you use a browser?"],
  },
  {
    match: /\b(ship|good|thanks?|ping|live|ok|okay|cool|nice)\b/i,
    steps: [],
    reply: "Will do. I'll post here the moment it's out.",
    next: MORE,
  },
];

function answer(text: string): Script {
  return (
    SCRIPTS.find((s) => s.match.test(text)) ?? {
      match: /./,
      steps: [{ icon: Search, label: "Searched", desc: text.slice(0, 32) }],
      reply: "This page runs on a script, so I can't really do that here. In Froots I'd go and do it, and you'd watch every step. Download it and ask me for real.",
      next: MORE,
    }
  );
}

/** A live turn's timeline, in 100ms ticks: think, a tool every 6, fold, then stream 4 chars a tick. */
type Turn = { ask: string; steps: Step[]; reply: string; next: string[]; fold: number; stream: number; done: number };

function plan(ask: string): Turn {
  const s = answer(ask);
  const steps = s.steps.map((st, i) => ({ ...st, at: 7 + i * 6 }));
  const fold = steps.length ? steps[steps.length - 1].at + 8 : 0;
  const stream = steps.length ? fold + 2 : 9;
  return { ask, steps, reply: s.reply, next: s.next, fold, stream, done: stream + Math.ceil(s.reply.length / 4) };
}

function TurnView({ turn, p }: { turn: Turn; p: number }) {
  const streamed = Math.max(0, Math.min(turn.reply.length, (p - turn.stream) * 4));
  const firstAt = turn.steps[0]?.at ?? turn.stream;
  return (
    <>
      <UserBubble>{turn.ask}</UserBubble>
      {turn.steps.length > 0 && <ChainBubble steps={turn.steps} p={p} foldAt={turn.fold} doneAfter={5} />}
      {streamed > 0 && (
        <AssistantBubble>
          {turn.reply.slice(0, streamed)}
          {streamed < turn.reply.length && <Caret />}
        </AssistantBubble>
      )}
      {p >= 1 && p < firstAt && <ThinkingVerb verb={VERBS[Math.floor(p / 14) % VERBS.length]} />}
    </>
  );
}

/* ── the widget ────────────────────────────────────────────────────────────────────────────── */

const DONE = 1e9;

export function HeroChatWidget() {
  const { ref, t } = useWidget<HTMLDivElement>(90);
  const reduced = useReducedMotion();
  const [live, setLive] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [start, setStart] = useState(0);
  const [clock, setClock] = useState(0);
  const [text, setText] = useState("");
  const [pick, setPick] = useState(-1);
  const input = useRef<HTMLInputElement>(null);
  const scroller = useRef<HTMLDivElement>(null);

  const active = turns[turns.length - 1];
  const activeP = active ? (reduced ? DONE : clock - start) : DONE;
  const busy = !!active && activeP < active.done;
  const suggestions = !live ? SUGGESTIONS : busy ? [] : active ? active.next : SUGGESTIONS;

  // the live turn's clock runs only while a turn is still playing
  useEffect(() => {
    if (!busy) return;
    const id = window.setInterval(() => setClock((c) => c + 1), 100);
    return () => window.clearInterval(id);
  }, [busy]);

  useEffect(() => {
    const el = scroller.current;
    if (el && live) el.scrollTop = el.scrollHeight;
  }, [live, turns, clock]);

  // taking over (or clicking back into the window) puts the caret in the box
  const [focusAsk, setFocusAsk] = useState(0);
  useEffect(() => {
    if (live) input.current?.focus({ preventScroll: true });
  }, [live, focusAsk]);

  function takeOver() {
    setLive(true);
    setFocusAsk((n) => n + 1);
  }

  function send() {
    const ask = text.trim();
    if (!ask || busy) return;
    setTurns((ts) => [...ts, plan(ask)]);
    setStart(clock);
    setText("");
    setPick(-1);
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Tab" && suggestions.length && (text === "" || pick >= 0)) {
      e.preventDefault();
      const next = (pick + 1) % suggestions.length;
      setPick(next);
      setText(suggestions[next]);
    } else if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  }

  // demo state (only drawn until the visitor takes over)
  const p = t === null ? CHAT.end : t % CHAT.loop;
  const streamed = Math.max(0, Math.min(REPLY.length, (p - CHAT.stream) * CHAT.cps));
  const thinking = p >= CHAT.think && p < TOOLS[0].at;
  const filled = p >= CHAT.tab2 ? 1 : p >= CHAT.tab1 ? 0 : -1;
  const fading = p >= CHAT.fade && p < CHAT.loop;

  const placeholder = suggestions.length && (live || p >= CHAT.suggest) ? suggestionPlaceholder(suggestions[0], suggestions.length) : "Message Pip";

  return (
    <div className="relative">
      <div onClick={takeOver} className={live ? "" : "cursor-text"}>
        <AppWindow
          panelRef={ref}
          interactive
          label="A chat with Pip, an agent in Froots. It plays a demo; click it to take over and send your own messages."
          className="h-[520px] w-full shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]"
          tabs={[PROFILES_TAB, { title: "Pip", icon: <Face who="pip" size={16} />, active: true }]}
          rail={<Rail items={RAIL} />}
        >
          <ThreadHeader who="pip" title="Pip" sub={<span className="text-[11px] text-ink/30 truncate">Follows you</span>} />
          <div className="relative flex min-h-0 flex-1 flex-col">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-7 bg-gradient-to-b from-panel to-transparent" />
            <div ref={scroller} className={`flex min-h-0 flex-1 flex-col px-3 py-3 ${live ? "overflow-y-auto" : "overflow-hidden"}`}>
              <div className="mt-auto space-y-3">
                <UserBubble>Can you tidy up the release checklist?</UserBubble>
                <AssistantBubble>Done. It&apos;s grouped by platform now.</AssistantBubble>
                {live ? (
                  <>
                    <UserBubble>{ASK}</UserBubble>
                    <ChainBubble steps={TOOLS} p={DONE} foldAt={0} doneAfter={6} />
                    <AssistantBubble>{REPLY}</AssistantBubble>
                    {turns.map((turn, i) => (
                      <TurnView key={i} turn={turn} p={i === turns.length - 1 ? activeP : DONE} />
                    ))}
                  </>
                ) : (
                  <div className="space-y-3" style={{ opacity: fading ? 0 : 1, transition: "opacity 500ms ease" }}>
                    {p >= CHAT.ask && <UserBubble>{ASK}</UserBubble>}
                    <ChainBubble steps={TOOLS} p={p} foldAt={CHAT.fold} doneAfter={6} />
                    {streamed > 0 && (
                      <AssistantBubble>
                        {REPLY.slice(0, streamed)}
                        {streamed < REPLY.length && <Caret />}
                      </AssistantBubble>
                    )}
                    {thinking && <ThinkingVerb verb={VERBS[Math.floor(p / 14) % VERBS.length]} />}
                  </div>
                )}
              </div>
            </div>
          </div>
          <Composer
            placeholder={placeholder}
            canSend={live ? !!text.trim() && !busy : filled >= 0}
            draft={
              !live && filled >= 0 ? (
                <>
                  {SUGGESTIONS[filled]}
                  <Caret />
                </>
              ) : null
            }
            input={
              live ? (
                <input
                  ref={input}
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    setPick(-1);
                  }}
                  onKeyDown={onKey}
                  placeholder={placeholder}
                  aria-label="Message Pip"
                  className="flex-1 min-w-0 bg-transparent py-1 text-[13px] leading-[1.5] text-ink/90 outline-none placeholder:text-ink/30"
                />
              ) : undefined
            }
          />
        </AppWindow>
      </div>
      {!live && (
        <button
          type="button"
          onClick={takeOver}
          className="absolute bottom-[70px] left-1/2 -translate-x-1/2 rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-background shadow-lg transition-transform hover:scale-[1.03]"
        >
          Take over: send Pip a message
        </button>
      )}
      <p className="mt-4 text-center text-xs text-muted-foreground">
        {live ? "You're driving. Tab fills a suggested reply, Tab again cycles, Enter sends." : "A demo is playing. Click it to take the wheel."}
      </p>
    </div>
  );
}
