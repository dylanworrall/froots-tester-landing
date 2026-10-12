// Ported from the Froots app, for the banners on /memory, /routines and /skills:
//   src/components/MainShell/views/AssistantMemories.tsx         — MemoryRail, RailTab, the built-in
//                                                                  memory files and their hints
//   src/components/MainShell/editor/MarkdownPageEditor.tsx        — the file shown beside the rail
//                                                                  (drawn as plain markdown here)
//   src/components/Routines/RoutineCard.tsx                       — RoutineCard, describeSchedule,
//                                                                  triggerIcon, statusLabel
//   src/components/Routines/RunHistoryStrip.tsx                   — the run strip, statusIcon
//   src/components/MainShell/views/LibraryRoutinesPresets.tsx     — the Routines heading
//   src/components/MainShell/agentSettings/AgentSettingsSkills.tsx — Skill scope header, SkillRow
//   src-tauri/src/skills.rs                                       — the system skills
//
// Stores, invoke() calls and click handlers are dropped; each banner is a still of the app with
// illustrative content. Skill names and descriptions are real ones from the bundled skills/.

import type { ReactNode } from "react";
import { AlertTriangle, Brain, Calendar, Check, CircleDashed, Clock, Cpu, Edit, FileText, Pause, Play, Repeat, Shield, Zap } from "lucide-react";
import { AppWindow } from "./app-window";
import { Face, FACES } from "./faces";
import { FitScale } from "./fit-scale";

const CANVAS = { width: 960, height: 540, guess: 0.8 };

function Banner({ accent, children }: { accent: string; children: ReactNode }) {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden" style={{ backgroundColor: accent }}>
      <FitScale {...CANVAS}>
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/35 blur-2xl" />
        <div className="absolute left-[7%] top-[11%] w-[86%]">{children}</div>
      </FitScale>
    </div>
  );
}

const WINDOW = "h-[520px] w-full rounded-[14px] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)]";

/* ── Memory ────────────────────────────────────────────────────────────────────────────────── */

const MEMORY_FILES = [
  { label: "context.md", hint: "Working state" },
  { label: "decisions.md", hint: "Choices + reasoning" },
  { label: "learnings.md", hint: "Mistakes to remember" },
];

export function MemoryBanner({ accent }: { accent: string }) {
  return (
    <Banner accent={accent}>
      <AppWindow compact label="" className={WINDOW} tabs={[{ title: `${FACES.pip.name} · Memory`, icon: <Face who="pip" size={16} />, active: true }]}>
        <div className="flex min-h-0 flex-1">
          {/* MemoryRail */}
          <aside className="w-[200px] shrink-0 bg-panel border-r border-ink/[0.05] flex flex-col">
            <div className="flex-1 px-2 py-3">
              <div className="px-2 pb-1.5 text-[9px] uppercase tracking-[0.1em] text-ink/30">Memory files</div>
              <div className="space-y-px">
                {MEMORY_FILES.map((f, i) => (
                  <div key={f.label} className={`w-full flex items-start gap-2 px-2 py-1.5 rounded-md ${i === 0 ? "bg-brand/[0.08] text-ink/90" : "text-ink/55"}`}>
                    <FileText size={12} className={`mt-[3px] shrink-0 ${i === 0 ? "text-brand" : "text-ink/30"}`} />
                    <span className="flex-1 min-w-0">
                      <span className="block text-[12px] truncate font-medium">{f.label}</span>
                      <span className="block text-[10px] text-ink/30 truncate">{f.hint}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="shrink-0 border-t border-ink/[0.05] px-2 py-2">
              <div className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-ink/55">
                <Brain size={12} className="shrink-0 text-ink/35" />
                <span className="flex-1 text-[12px] truncate">Indexed memories</span>
                <span className="text-[10px] tabular-nums text-ink/25">412</span>
              </div>
            </div>
          </aside>
          {/* the open file */}
          <div className="flex-1 min-w-0 px-8 py-6 text-ink/80">
            <div className="text-[11px] text-ink/35">memory/context.md</div>
            <h2 className="mt-2 text-[22px] font-semibold tracking-tight text-ink/95">Context</h2>
            <h3 className="mt-5 text-[13px] font-semibold text-ink/90">Right now</h3>
            <ul className="mt-2 space-y-1.5 text-[13px] leading-relaxed list-disc pl-5 marker:text-ink/30">
              <li>Launch week: pricing page and changelog ship Friday</li>
              <li>Waiting on Maya&apos;s final deck before the investor call</li>
            </ul>
            <h3 className="mt-5 text-[13px] font-semibold text-ink/90">Keep in mind</h3>
            <ul className="mt-2 space-y-1.5 text-[13px] leading-relaxed list-disc pl-5 marker:text-ink/30">
              <li>Prefers short answers, no filler</li>
              <li>Release builds run on the Mac mini, not the laptop</li>
              <li>Never email customers without asking first</li>
            </ul>
          </div>
        </div>
      </AppWindow>
    </Banner>
  );
}

/* ── Routines ──────────────────────────────────────────────────────────────────────────────── */

type Run = "ok" | "running" | "error";
type Routine = { name: string; type: "daily" | "weekly" | "interval" | "cron" | "once"; schedule: string; intent: string; enabled: boolean; error?: boolean; runs: [Run, string][] };

const ROUTINES: Routine[] = [
  { name: "Morning brief", type: "daily", schedule: "Every day at 07:30", intent: "Read today's calendar and overnight mail from people, not newsletters, and post a five-line brief here.", enabled: true, runs: [["ok", "2h"], ["ok", "1d"], ["ok", "2d"], ["ok", "3d"]] },
  { name: "PR review", type: "cron", schedule: "Cron: 0 9 * * 1-5", intent: "Review open pull requests, flag anything failing CI or waiting on me.", enabled: true, runs: [["running", "just now"], ["ok", "1d"], ["error", "2d"], ["ok", "3d"]] },
  { name: "Inbox digest", type: "interval", schedule: "Every 30 min", intent: "Draft replies to anything that's clearly mine and queue them for review. Don't send.", enabled: true, runs: [["ok", "12m"], ["ok", "42m"], ["ok", "1h"]] },
  { name: "Weekly wrap-up", type: "weekly", schedule: "Every Friday", intent: "Group this week's notes into wins, unsolved and next week, and write it to the KB.", enabled: false, runs: [["ok", "7d"]] },
];

function TriggerIcon({ type }: { type: Routine["type"] }) {
  const Icon = type === "daily" || type === "weekly" ? Calendar : type === "interval" ? Repeat : type === "cron" ? Zap : Clock;
  return <Icon size={12} className="text-ink/40" />;
}

function RunIcon({ run }: { run: Run }) {
  if (run === "ok") return <Check size={9} className="text-[#30D158]" />;
  if (run === "running") return <CircleDashed size={9} className="text-brand" />;
  return <AlertTriangle size={9} className="text-[#FF453A]" />;
}

function RoutineCard({ r }: { r: Routine }) {
  const status = !r.enabled ? { label: "Paused", color: "text-ink/30", dot: "bg-ink/20" } : { label: "Active", color: "text-[#30D158]/90", dot: "bg-[#30D158]" };
  return (
    <div className="flex flex-col rounded-xl bg-ink/[0.02] border border-ink/[0.05] p-4 gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="text-[13px] text-ink/80 font-medium truncate">{r.name}</span>
          <div className="flex items-center gap-1.5 mt-1">
            <TriggerIcon type={r.type} />
            <span className="text-[11px] text-ink/40">{r.schedule}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          <span className={`text-[10px] uppercase tracking-wider ${status.color}`}>{status.label}</span>
        </div>
      </div>
      <p className="text-[11px] text-ink/40 leading-relaxed line-clamp-3">{r.intent}</p>
      <div className="pt-2 border-t border-ink/[0.04] flex items-center gap-2 flex-wrap">
        {r.runs.map(([run, ago], i) => (
          <span key={i} className="flex items-center gap-1 text-[10px] text-ink/40">
            <RunIcon run={run} />
            <span>{ago}</span>
          </span>
        ))}
      </div>
      <div className="flex items-center gap-1.5 pt-1">
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-brand/10 text-[11px] text-brand">
          <Play size={10} />
          Run Now
        </span>
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-ink/[0.04] text-[11px] text-ink/60">
          {r.enabled ? <Pause size={10} /> : <Play size={10} />}
          {r.enabled ? "Pause" : "Resume"}
        </span>
        <div className="flex-1" />
        <span className="p-1.5 rounded-md text-ink/40">
          <Edit size={12} />
        </span>
      </div>
    </div>
  );
}

export function RoutinesBanner({ accent }: { accent: string }) {
  return (
    <Banner accent={accent}>
      <AppWindow compact label="" className={WINDOW} tabs={[{ title: "Routines", icon: <Clock size={14} className="shrink-0 text-ink/45" />, active: true }]}>
        <div className="px-6 pt-5">
          <h1 className="text-[22px] font-semibold text-ink/90">Routines</h1>
          <p className="text-[12px] text-ink/40 mt-1">Automate work by setting up scheduled agent runs.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 px-6 pt-4">
          {ROUTINES.map((r) => (
            <RoutineCard key={r.name} r={r} />
          ))}
        </div>
      </AppWindow>
    </Banner>
  );
}

/* ── Skills ────────────────────────────────────────────────────────────────────────────────── */

type SkillRowData = { name: string; emoji?: string; description: string; checked: boolean; system?: boolean; blocked?: boolean };

const SKILLS: SkillRowData[] = [
  { name: "safe-file-deletion", description: "Enforces explicit user permission before any file deletion. Always active as a safety rule.", checked: true, system: true },
  { name: "github", emoji: "🐙", description: "Interact with GitHub using the `gh` CLI. Use `gh issue`, `gh pr`, `gh run`, and `gh api`.", checked: true },
  { name: "slack", emoji: "💬", description: "Slack as a comms channel for the assistant.", checked: true },
  { name: "obsidian", emoji: "💎", description: "Work with Obsidian vaults (plain Markdown notes) and automate via obsidian-cli.", checked: false },
  { name: "1password", emoji: "🔐", description: "Set up and use 1Password CLI (op).", checked: true },
  { name: "apple-notes", emoji: "📝", description: "Manage Apple Notes via the `memo` CLI on macOS.", checked: false, blocked: true },
  { name: "weather", emoji: "🌤️", description: "Get current weather and forecasts (no API key required).", checked: true },
];

function SkillRow({ s }: { s: SkillRowData }) {
  const disabled = s.system || s.blocked;
  return (
    <li className="py-2.5 flex items-start gap-3">
      <span className={`mt-0.5 w-4 h-4 rounded border shrink-0 ${disabled ? "border-ink/[0.10] bg-ink/[0.02]" : s.checked ? "border-brand bg-brand" : "border-ink/30 bg-transparent"}`}>
        {s.checked && (
          <svg viewBox="0 0 12 12" className="w-full h-full text-white">
            <path d="M2.5 6.2 L5 8.5 L9.5 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {s.emoji ? <span className="text-[13px] leading-none">{s.emoji}</span> : <Cpu size={11} className="text-ink/45" />}
          <span className="text-[12.5px] font-medium text-ink/90 truncate">{s.name}</span>
          {s.system && (
            <span className="text-[9px] text-brand/60 bg-brand/[0.08] px-1.5 py-0.5 rounded uppercase tracking-wider inline-flex items-center gap-1">
              <Shield size={7} /> system
            </span>
          )}
          {s.blocked && <span className="text-[9px] text-[#FF9F0A]/70 bg-[#FF9F0A]/[0.08] px-1.5 py-0.5 rounded uppercase tracking-wider">blocked</span>}
        </div>
        <div className="text-[11.5px] text-ink/55 mt-0.5 leading-snug truncate">{s.description}</div>
      </div>
    </li>
  );
}

export function SkillsBanner({ accent }: { accent: string }) {
  return (
    <Banner accent={accent}>
      <AppWindow compact label="" className={WINDOW} tabs={[{ title: `${FACES.scout.name} · Skills`, icon: <Face who="scout" size={16} />, active: true }]}>
        <div className="px-6 py-5">
          <div className="max-w-[640px]">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-ink/[0.06]">
              <div className="min-w-0">
                <div className="text-[13px] font-medium text-ink/95">Skill scope</div>
                <div className="text-[11.5px] text-ink/55 mt-0.5">Overriding defaults — only the checked skills are visible to this agent.</div>
              </div>
              <span className="shrink-0 px-3 py-1.5 rounded-md text-[11.5px] font-medium bg-brand/[0.18] text-brand">Reset to Library</span>
            </div>
            <ul className="mt-3 divide-y divide-ink/[0.04]">
              {SKILLS.map((s) => (
                <SkillRow key={s.name} s={s} />
              ))}
            </ul>
          </div>
        </div>
      </AppWindow>
    </Banner>
  );
}
