// Ported from the Froots app:
//   src/components/MainShell/views/DmsView.tsx — Thread header, DmMessageRow, SelfAvatar,
//                                               DmPendingIndicator
//   src/components/MainShell/views/DmTimeline.tsx — DayDivider
//   src/components/MainShell/MentionPicker.tsx  — MentionBody pill (KIND_META colours) and the
//                                               inline picker
//   src/components/ai-elements/thinking-dots.tsx — ThinkingDots
//
// Relay keys, petnames, reactions and the hover action bar are dropped; ChatMarkdown is plain text.

import type { ReactNode } from "react";
import { Face, FACES, type Who } from "./faces";

/** The header over a DM: face, name, and (group) the head count or (agent) AgentPlacementLabel. */
export function ThreadHeader({ who, title, sub }: { who: Who; title: string; sub?: ReactNode }) {
  return (
    <div className="shrink-0 flex items-center gap-2.5 px-4 h-11">
      <Face who={who} size={26} />
      <span className="text-[13px] font-medium text-ink/95 truncate">{title}</span>
      {sub}
    </div>
  );
}

/** DayDivider */
export function DayDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="flex-1 h-px bg-ink/[0.06]" />
      <span className="shrink-0 text-[10.5px] font-medium text-ink/35">{label}</span>
      <div className="flex-1 h-px bg-ink/[0.06]" />
    </div>
  );
}

/** DmMessageRow: theirs left with their face (and their name, in a group), yours right in the
 *  brand tint with your face; the time inside the bubble. */
export function DmBubble({ who, mine = false, group = false, time, children }: { who?: Who; mine?: boolean; group?: boolean; time: string; children: ReactNode }) {
  return (
    <div className={`rise-in flex items-end gap-2 ${mine ? "justify-end" : "justify-start"}`}>
      {!mine && who && <Face who={who} size={24} />}
      <div className="relative min-w-0 max-w-[72%]">
        <div className={`px-3 py-2 rounded-2xl text-[13px] leading-[18px] ${mine ? "bg-brand/[0.18] text-ink/95 rounded-br-md" : "bg-ink/[0.05] text-ink/90 rounded-bl-md"}`}>
          {!mine && group && who && <div className="text-[10.5px] text-ink/45 mb-0.5">{FACES[who].name}</div>}
          <div className="break-words">{children}</div>
          <div className="mt-0.5 text-[10px] text-ink/30 text-right">{time}</div>
        </div>
      </div>
      {mine && <Face who="you" size={24} />}
    </div>
  );
}

/** KIND_META.agent */
export const AGENT_MENTION = "#7C7CFF";

/** MentionBody: the mention pill, wearing the mentioned agent's face. */
export function MentionPill({ who }: { who: Who }) {
  return (
    <span className="inline-flex items-center gap-1 rounded px-1 -mx-0.5 font-medium align-middle leading-none" style={{ color: AGENT_MENTION, background: `${AGENT_MENTION}1f` }}>
      <Face who={who} size={14} />
      {FACES[who].name}
    </span>
  );
}

/** MentionPicker, inline: opens over the composer bar from the "@". */
export function InlineMentionPicker({ who }: { who: Who }) {
  return (
    <div className="absolute bottom-full left-0 mb-2 w-[240px] rounded-xl bg-panel border border-ink/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.5)] p-1.5 z-50">
      <div className="mb-1">
        <div className="px-2 py-1 text-[9.5px] font-medium uppercase tracking-wider text-ink/35">Agents</div>
        <div className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left bg-brand/[0.18]">
          <Face who={who} size={20} />
          <span className="flex-1 truncate text-[12.5px] text-ink/85">{FACES[who].name}</span>
        </div>
      </div>
    </div>
  );
}

/** ThinkingDots */
export function ThinkingDots() {
  return (
    <span className="inline-flex gap-0.5 shrink-0">
      <span className="rounded-full animate-bounce [animation-delay:0ms] w-1 h-1 bg-brand/60" />
      <span className="rounded-full animate-bounce [animation-delay:120ms] w-1 h-1 bg-brand/60" />
      <span className="rounded-full animate-bounce [animation-delay:240ms] w-1 h-1 bg-brand/60" />
    </span>
  );
}

/** DmPendingIndicator: "<agent> is thinking…" under the composer. `on` fades it without moving
 *  anything (its line is reserved). */
export function PendingIndicator({ name, on }: { name: string; on: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 px-1 mt-1 min-w-0 text-[11px] h-4 transition-opacity duration-200 ${on ? "opacity-100" : "opacity-0"}`}>
      <ThinkingDots />
      <span className="text-ink/50 font-medium truncate">{name} is thinking…</span>
    </div>
  );
}
