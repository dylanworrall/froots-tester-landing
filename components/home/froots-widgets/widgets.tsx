"use client";

// The home page's product widgets: the Froots app's own components (the ports in this folder, each
// naming the app file it came from), put together the way the app puts them together and driven by
// a scripted timeline instead of stores and Tauri.
//
// Each widget runs on a `useWidget` clock that only counts while it's on screen; what it shows is
// a pure function of the tick, so every loop plays the same way. Under reduced motion the clock is
// null and each widget renders its END state with every transition off (`.fw`, globals.css).
//
// What the widgets SAY (names, messages, counts) is illustration. What they look like and do is
// the shipped app.

import type { CSSProperties } from "react";
import { FileText, Terminal, Plus } from "lucide-react";
import { useWidget } from "../motion";
import { AppPanel, AppWindow, type Tab } from "./app-window";
import { AssistantBubble, Caret, ChainBubble, Composer, type Step } from "./chat-surface";
import { DayDivider, DmBubble, InlineMentionPicker, MentionPill, PendingIndicator, ThreadHeader } from "./dm-thread";
import { Face } from "./faces";
import { FriendRequestPopup, FriendsToast } from "./friend-request-popup";
import { AgentPlacementLabel, AgentPlacementPicker } from "./placement-picker";
import { AgentRuntimesSettings, type RuntimeRow } from "./runtime-settings";
import { BrowserToolbar, ElementRef } from "./browser-chrome";
import { InstallRuntimeModal } from "./install-runtime-modal";
import { Rail, type RailItem } from "./sidebar-rail";

/** Fades the moving part of a scene out over the last ticks of a loop so it can start clean. */
function loopFade(p: number, loop: number, fadeAt: number): CSSProperties {
  return { opacity: p >= fadeAt && p < loop ? 0 : 1, transition: "opacity 500ms ease" };
}

const PROFILES_TAB: Tab = { title: "Profiles", icon: <FileText size={14} className="shrink-0 text-ink/45" /> };

/* ── 2. a group DM: an @mention wakes the agent ────────────────────────────────────────────── */

const NUDGE_REST = " draft them from this week's merges";
const WAKE_REPLY = "On it. I'll keep them to user-facing changes and post the draft here.";
const GROUP = { loop: 124, at: 6, pick: 14, rest: 16, cps: 1.8, send: 40, think: 43, reply: 60, cpsReply: 3, fade: 116, end: 104 };

export function GroupMentionWidget() {
  const { ref, t } = useWidget<HTMLDivElement>(90);
  const p = t === null ? GROUP.end : t % GROUP.loop;
  const typingAt = p >= GROUP.at && p < GROUP.pick ? "@Sc".slice(0, Math.min(3, Math.floor((p - GROUP.at) / 2) + 1)) : "";
  const picked = p >= GROUP.pick && p < GROUP.send;
  const rest = picked ? NUDGE_REST.slice(0, Math.max(0, Math.floor((p - GROUP.rest) * GROUP.cps))) : "";
  const sent = p >= GROUP.send;
  const thinking = p >= GROUP.think && p < GROUP.reply;
  const replied = Math.max(0, Math.min(WAKE_REPLY.length, (p - GROUP.reply) * GROUP.cpsReply));
  const menuOpen = p >= GROUP.at + 2 && p < GROUP.pick;
  return (
    <AppWindow
      panelRef={ref}
      label="A group DM in Froots: you @mention the agent Scout, it starts thinking and answers in the thread."
      compact
      className="h-[400px] w-full"
      tabs={[{ title: "Launch crew", icon: <Face who="maya" size={16} />, active: true }]}
    >
      <ThreadHeader who="maya" title="Launch crew" sub={<span className="flex-1 min-w-0 text-[11px] text-ink/30 truncate">4 people</span>} />
      <div className="relative flex min-h-0 flex-1 flex-col justify-end gap-2.5 overflow-hidden px-3 py-2">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-panel to-transparent" />
        <DmBubble who="leo" group time="10:01 AM">
          Notes are the last thing before we ship.
        </DmBubble>
        <DmBubble who="maya" group time="10:02 AM">
          Who&apos;s writing the release notes?
        </DmBubble>
        <div className="flex flex-col gap-2.5" style={loopFade(p, GROUP.loop, GROUP.fade)}>
          {sent && (
            <DmBubble mine time="10:03 AM">
              <MentionPill who="scout" />
              {NUDGE_REST}
            </DmBubble>
          )}
          {p >= GROUP.reply && (
            <DmBubble who="scout" group time="10:03 AM">
              {WAKE_REPLY.slice(0, replied)}
              {replied < WAKE_REPLY.length && <Caret />}
            </DmBubble>
          )}
        </div>
      </div>
      <Composer
        placeholder="Message Launch crew"
        draft={
          typingAt ? (
            <>
              {typingAt}
              <Caret />
            </>
          ) : picked ? (
            <>
              <MentionPill who="scout" />
              {rest}
              <Caret />
            </>
          ) : null
        }
        above={menuOpen && <InlineMentionPicker who="scout" />}
        below={<PendingIndicator name="Scout" on={thinking} />}
      />
    </AppWindow>
  );
}

/* ── 3. the inbox: counts climb on the rail, and clear when you open the chat ──────────────── */

export function InboxWidget() {
  const { ref, t } = useWidget<HTMLDivElement>(700);
  const p = t === null ? 8 : t % 12;
  const crew = 3 + (p >= 2 ? 1 : 0) + (p >= 3 ? 1 : 0);
  const openMaya = p >= 6 && p < 11;
  const items: RailItem[] = [
    { who: "maya", kind: "dm", count: openMaya && p >= 7 ? 0 : 2 + (p >= 4 ? 1 : 0), here: openMaya },
    { who: "leo", kind: "group", count: crew },
    { who: "scout", kind: "agent", count: 1 },
    { who: "pip", kind: "agent" },
  ];
  return (
    <AppWindow
      panelRef={ref}
      label="The Froots sidebar: red unread counts on each face climb as messages arrive, and clear when you open the conversation."
      compact
      className="h-[400px] w-full"
      tabs={[{ title: openMaya ? "Maya Chen" : "Profiles", icon: openMaya ? <Face who="maya" size={16} /> : PROFILES_TAB.icon, active: true }]}
      rail={<Rail items={items} />}
    >
      <div className={`flex h-full flex-col transition-opacity duration-300 ${openMaya ? "opacity-100" : "opacity-0"}`}>
        <ThreadHeader who="maya" title="Maya Chen" />
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-2 px-2.5 pb-3">
          <DayDivider label="Today" />
          <DmBubble who="maya" time="9:40 AM">
            Sent you the deck.
          </DmBubble>
          <DmBubble who="maya" time="9:41 AM">
            Slide 4 needs your numbers.
          </DmBubble>
          <DmBubble who="maya" time="9:52 AM">
            No rush!
          </DmBubble>
        </div>
      </div>
      <div className={`pointer-events-none absolute inset-0 flex flex-col gap-3 p-4 pt-14 transition-opacity duration-300 ${openMaya ? "opacity-0" : "opacity-100"}`}>
        {[0.7, 0.5, 0.62, 0.4].map((w, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="h-6 w-6 shrink-0 rounded-full bg-ink/[0.06]" />
            <span className="h-2 rounded-full bg-ink/[0.06]" style={{ width: `${w * 100}%` }} />
          </div>
        ))}
      </div>
    </AppWindow>
  );
}

/* ── 4. a friend request: Accept, and you're friends ───────────────────────────────────────── */

export function FriendRequestWidget() {
  const { ref, t } = useWidget<HTMLDivElement>(600);
  const p = t === null ? 3 : t % 12;
  const rail: RailItem[] = [{ who: "pip", kind: "agent" }, { who: "maya", kind: "dm" }, ...(p >= 7 ? [{ who: "sam" as const, kind: "dm" as const }] : [])];
  return (
    <AppWindow
      panelRef={ref}
      label="A friend request pops up in Froots with Decline and Accept; accepting it makes you friends."
      compact
      className="h-[400px] w-full"
      tabs={[PROFILES_TAB]}
      rail={<Rail items={rail} />}
    >
      <div className="flex flex-col gap-3 p-4 pt-[150px]">
        {[0.7, 0.5, 0.62, 0.4].map((w, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="h-6 w-6 shrink-0 rounded-full bg-ink/[0.06]" />
            <span className="h-2 rounded-full bg-ink/[0.06]" style={{ width: `${w * 100}%` }} />
          </div>
        ))}
      </div>
      <FriendRequestPopup who="sam" keyLabel="npub1x7…c21e" shown={p >= 1 && p < 7} pressed={p === 5} accepting={p === 6} />
      <FriendsToast who="sam" shown={p >= 7 && p < 11} />
    </AppWindow>
  );
}

/* ── 5. agent runtimes: Check again, and each harness answers ──────────────────────────────── */

const RUNTIMES: readonly RuntimeRow[] = [
  { id: "claude", label: "Claude Code", ready: true },
  { id: "codex", label: "Codex", ready: true },
  { id: "gemini", label: "Gemini CLI", ready: true },
  { id: "cursor", label: "Cursor", ready: true },
  { id: "opencode", label: "OpenCode", ready: true },
  { id: "goose", label: "Goose", ready: false },
  { id: "hermes", label: "Hermes Agent", ready: true },
  { id: "kimi", label: "Kimi Code", ready: true },
];

export function RuntimesWidget() {
  const { ref, t } = useWidget<HTMLDivElement>(260);
  const LOOP = 52;
  const p = t === null ? LOOP - 6 : t % LOOP;
  const checking = p < 6;
  return (
    <AppPanel
      panelRef={ref}
      label="Froots' agent runtimes settings: Claude Code, Codex, Gemini CLI, Cursor, OpenCode, Goose, Hermes Agent and Kimi Code, each marked Ready or CLI needed."
      className="w-full p-5"
    >
      <AgentRuntimesSettings rows={RUNTIMES} checking={checking} answered={(i) => !checking && p >= 6 + i * 2} />
    </AppPanel>
  );
}

/* ── 6. where this agent runs ──────────────────────────────────────────────────────────────── */

export function PlacementWidget() {
  const { ref, t } = useWidget<HTMLDivElement>(1500);
  const p = t === null ? 2 : t % 4;
  const home = p >= 2;
  return (
    <AppWindow
      panelRef={ref}
      label="Where this agent runs: Follow me, or pinned to a Mac mini. The label beside the agent's name follows the choice."
      className="w-full"
      tabs={[{ title: "Scout", icon: <Face who="scout" size={16} />, active: true }]}
    >
      <ThreadHeader who="scout" title="Scout" sub={<AgentPlacementLabel home={home} />} />
      <div className="px-4 pb-4 pt-1">
        <div className="rounded-xl bg-card-1 border border-ink/[0.06] p-3.5">
          <AgentPlacementPicker home={home} />
        </div>
      </div>
    </AppWindow>
  );
}

/* ── 7. the browser, driven by number ──────────────────────────────────────────────────────── */

const POST = "Shipping Friday. Notes in the thread.";
const BROWSE = { loop: 120, snap: 6, type: 22, typeStart: 26, cps: 1.4, click: 60, press: 62, posted: 66, fold: 74, fade: 110, end: 80 };
const BROWSER_STEPS: Step[] = [
  { icon: Terminal, label: "Ran command", desc: "froots-browser snapshot", at: BROWSE.snap },
  { icon: Terminal, label: "Ran command", desc: `froots-browser type 2 "${POST}"`, at: BROWSE.type },
  { icon: Terminal, label: "Ran command", desc: "froots-browser click 3", at: BROWSE.click },
];

export function BrowserDriveWidget() {
  const { ref, t } = useWidget<HTMLDivElement>(100);
  const p = t === null ? BROWSE.end : t % BROWSE.loop;
  const tagged = p >= BROWSE.snap + 4 && p < BROWSE.posted;
  const typedN = p >= BROWSE.posted ? 0 : Math.max(0, Math.min(POST.length, Math.floor((p - BROWSE.typeStart) * BROWSE.cps)));
  const hot = p >= BROWSE.click && p < BROWSE.posted;
  const pressed = p >= BROWSE.press && p < BROWSE.press + 2;
  const posted = p >= BROWSE.posted;
  const driving = p >= BROWSE.snap && p < BROWSE.fold;
  return (
    <AppWindow
      panelRef={ref}
      label="Froots' built-in browser with an agent driving it: it reads the page as numbered elements, types into 2 and clicks 3, Post."
      className="h-[540px] w-full"
      tabs={[
        { title: "Pip", icon: <Face who="pip" size={16} /> },
        { title: "example.com", icon: <span className="w-3.5 h-3.5 shrink-0 rounded-sm bg-[#e5e0d4]" />, active: true, driver: driving },
      ]}
    >
      <div className="flex min-h-0 flex-1 flex-col @xl:flex-row" style={loopFade(p, BROWSE.loop, BROWSE.fade)}>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <BrowserToolbar url="example.com/compose" />
          {/* the web page (a stand-in) */}
          <div className="relative mx-1.5 mb-1.5 flex min-h-0 flex-1 flex-col gap-3 rounded-lg bg-[#faf7f0] p-4 text-[#171717]">
            <div className="flex items-center gap-2.5">
              <span className="h-7 w-7 rounded-full bg-[#e5e0d4]" />
              <span className="h-2 w-24 rounded-full bg-[#e5e0d4]" />
            </div>
            <div className={`relative rounded-xl border bg-white p-3 transition-colors duration-300 ${p >= BROWSE.type && !posted ? "border-[#3b6ef6]/60" : "border-[#e5e0d4]"}`}>
              <ElementRef n={2} show={tagged} />
              <div className="min-h-[40px] text-[13px] leading-snug">
                {typedN > 0 ? (
                  <>
                    {POST.slice(0, typedN)}
                    {typedN < POST.length && <span className="fw-caret ml-px inline-block h-[1em] w-px translate-y-[2px] bg-[#171717]" />}
                  </>
                ) : (
                  <span className="text-[#a3a3a3]">What&apos;s new?</span>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="relative grid h-7 w-7 place-items-center rounded-lg bg-[#efeae0] text-[#737373]">
                  <ElementRef n={1} show={tagged} />
                  <Plus size={14} />
                </span>
                <span className={`relative rounded-full bg-[#171717] px-4 py-1.5 text-[12px] font-semibold text-white transition-all duration-200 ${pressed ? "scale-90" : "scale-100"} ${hot ? "ring-4 ring-[#7c5cff]/30" : ""}`}>
                  <ElementRef n={3} show={tagged} hot={hot} />
                  Post
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-1">
              {[0.9, 0.7, 0.8].map((w, i) => (
                <span key={i} className="h-2 rounded-full bg-[#ebe6da]" style={{ width: `${w * 100}%` }} />
              ))}
            </div>
            <div
              style={{ transition: "opacity 400ms ease, transform 600ms cubic-bezier(0.16, 1, 0.3, 1)" }}
              className={`absolute inset-x-4 bottom-4 rounded-lg bg-[#d7efd3] px-3 py-2 text-center text-[12px] font-medium ${posted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
            >
              Your post was sent.
            </div>
          </div>
        </div>
        {/* the agent's chat beside the tab: its tool calls, the snapshot as the first one's output */}
        <div className="flex h-[200px] shrink-0 flex-col justify-end gap-3 overflow-hidden border-t border-ink/[0.06] p-3 @xl:h-auto @xl:w-[46%] @xl:border-l @xl:border-t-0">
          <ChainBubble
            steps={BROWSER_STEPS}
            p={p}
            foldAt={BROWSE.fold}
            doneAfter={4}
            output={(s) =>
              s.at === BROWSE.snap ? (
                <div className="rounded-md border border-ink/[0.06] bg-card-2 px-2.5 py-2 font-mono text-[10.5px] leading-snug text-ink/60">
                  <div>[1] button &quot;Add image&quot;</div>
                  <div>[2] textbox &quot;What&apos;s new?&quot;</div>
                  <div>[3] button &quot;Post&quot;</div>
                </div>
              ) : null
            }
          />
          {posted && p >= BROWSE.fold && <AssistantBubble>Posted. The page says &ldquo;Your post was sent.&rdquo;</AssistantBubble>}
        </div>
      </div>
    </AppWindow>
  );
}

/* ── 8. the install line ───────────────────────────────────────────────────────────────────── */

const INSTALL = "npm install -g @anthropic-ai/claude-code";

export function TerminalWidget() {
  const { ref, t } = useWidget<HTMLDivElement>(55);
  const LOOP = INSTALL.length + 110;
  const p = t === null ? INSTALL.length + 6 : t % LOOP;
  const after = p - INSTALL.length;
  const phase = after >= 60 ? "done" : after >= 13 ? "running" : "confirm";
  return (
    <AppPanel
      panelRef={ref}
      label="Froots' Install Claude Code dialog: the command it will run, npm install -g @anthropic-ai/claude-code, then Install."
      className="w-full rounded-xl border border-ink/[0.08] p-5"
    >
      <InstallRuntimeModal
        label="Claude Code"
        phase={phase}
        pressed={after >= 10 && after < 13}
        command={
          <>
            {INSTALL.slice(0, p)}
            {after < 0 && <Caret />}
          </>
        }
      />
    </AppPanel>
  );
}
