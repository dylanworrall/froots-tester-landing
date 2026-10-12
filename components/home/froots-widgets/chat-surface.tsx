// Ported from the Froots app:
//   src/components/chat/Bubbles.tsx            — UserBubble, AssistantBubble, ChainBubble, ChainStep
//   src/components/ai-elements/message.tsx     — Message, MessageContent
//   src/components/ai-elements/chain-of-thought.tsx — ChainOfThoughtStep (+ stepStatusStyles)
//   src/components/ai-elements/thinking-verb.tsx, shimmer.tsx — ThinkingVerb / Shimmer
//   src/components/chat/MessageComposer.tsx    — the composer bar (barClassName and its buttons)
//   src/lib/suggestedReplies.ts                — suggestionPlaceholder()
//   src/components/chat/toolMeta.tsx           — the step labels ("Read file", "Searched", "Ran command")
//
// The ConversationMessage objects, Collapsible, Streamdown and stores are replaced by plain props;
// the scripted timeline (../froots-widgets/widgets.tsx) decides what's on screen at each tick.

import type { CSSProperties, ReactNode } from "react";
import { AtSign, ChevronRight, Paperclip, Send, SmilePlus, type LucideIcon } from "lucide-react";

/** Bubbles.tsx UserBubble → <Message from="user"><MessageContent>. */
export function UserBubble({ children }: { children: ReactNode }) {
  return (
    <div className="rise-in group is-user ml-auto flex w-full max-w-[95%] flex-col justify-end gap-2">
      <div className="ml-auto flex w-fit min-w-0 max-w-full flex-col gap-2 overflow-hidden rounded-lg bg-secondary px-4 py-3 text-sm text-foreground">{children}</div>
    </div>
  );
}

/** Bubbles.tsx AssistantBubble → <Message from="assistant"><MessageContent><MessageResponse>. */
export function AssistantBubble({ children }: { children: ReactNode }) {
  return (
    <div className="rise-in group is-assistant flex w-full max-w-[95%] flex-col gap-2">
      <div className="flex w-fit min-w-0 max-w-full flex-col gap-2 overflow-hidden text-sm text-foreground">
        <p className="leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

/** ThinkingVerb → Shimmer: "Pondering..." with a highlight swept across it. */
export function ThinkingVerb({ verb }: { verb: string }) {
  const text = `${verb}...`;
  return (
    <div className="flex justify-start pl-1">
      <p
        className="shimmer-sweep relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent [--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--color-background),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box] text-[12px]"
        style={
          {
            "--spread": `${text.length * 2}px`,
            backgroundImage: "var(--bg), linear-gradient(var(--color-muted-foreground), var(--color-muted-foreground))",
            animationDuration: "2s",
          } as CSSProperties
        }
      >
        {text}
      </p>
    </div>
  );
}

export type Step = { icon: LucideIcon; label: string; desc: string; at: number };

/** ChainBubble + ChainStep: "watch live, fold when done". Open while any tool runs, collapsed to
 *  "<first step summary>  N tool calls ›" once the chain settles. */
export function ChainBubble({ steps, p, foldAt, doneAfter, output }: { steps: Step[]; p: number; foldAt: number; doneAfter: number; output?: (s: Step) => ReactNode }) {
  const shown = steps.filter((s) => p >= s.at);
  if (shown.length === 0) return null;
  const open = p < foldAt;
  const n = shown.length;
  const firstRaw = `${steps[0].label} · ${steps[0].desc}`;
  const firstSummary = firstRaw.length > 64 ? firstRaw.slice(0, 63) + "…" : firstRaw;
  return (
    <div className="rise-in w-fit max-w-full rounded-md border border-ink/[0.12] px-3.5 py-2">
      <div className="group flex w-full max-w-full flex-col items-start gap-0.5 text-left">
        <div className="flex max-w-full items-center gap-2 leading-[18px]">
          <span className="min-w-0 truncate text-[13px] font-semibold text-ink">{firstSummary}</span>
          <span className="flex shrink-0 items-center gap-0.5 text-[13px] font-semibold text-brand">
            {n} tool call{n === 1 ? "" : "s"}
            <ChevronRight size={15} className={"transition-transform " + (open ? "rotate-90" : "")} />
          </span>
        </div>
      </div>
      {open && (
        <div className="mt-2.5 space-y-3">
          {shown.map((s) => {
            const Icon = s.icon;
            const active = p < s.at + doneAfter;
            return (
              // ChainOfThoughtStep: status "active" → text-foreground, "complete" → text-muted-foreground
              <div key={s.at} className={`flex gap-2 text-sm fade-in-0 slide-in-from-top-2 animate-in text-[12px] ${active ? "text-foreground" : "text-muted-foreground"}`}>
                <div className="relative mt-0.5">
                  <Icon className="size-4" />
                </div>
                <div className="flex-1 space-y-2 overflow-hidden">
                  <div className="flex items-baseline gap-2 min-w-0">
                    <span className="font-medium text-[12px] shrink-0">{s.label}</span>
                    <span className="text-[11px] text-muted-foreground truncate font-mono">{s.desc}</span>
                  </div>
                  {!active && output?.(s)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** suggestedReplies.ts */
export function suggestionPlaceholder(suggestion: string, count: number): string {
  return count > 1 ? `${suggestion}   ⇥ Tab (1 of ${count})` : `${suggestion}   ⇥ Tab`;
}

/** MessageComposer: the bar. `draft` is what's in the box; empty shows the placeholder. */
export function Composer({ draft, placeholder, above, below }: { draft: ReactNode; placeholder: string; above?: ReactNode; below?: ReactNode }) {
  const canSend = !!draft;
  return (
    <div className="shrink-0 px-3 py-3">
      <div className="relative flex items-end gap-1.5 rounded-xl bg-ink/[0.05] px-2 py-1.5 transition-colors">
        {above}
        <span className="shrink-0 p-1.5 rounded-lg text-ink/45">
          <Paperclip size={16} />
        </span>
        <span className="flex-1 min-w-0 truncate whitespace-pre text-[13px] leading-[1.5] py-1">
          {draft ? <span className="text-ink/90">{draft}</span> : <span className="text-ink/30">{placeholder}</span>}
        </span>
        <span className="shrink-0 p-1.5 rounded-lg text-ink/45">
          <AtSign size={16} />
        </span>
        <span className="shrink-0 p-1.5 rounded-lg text-ink/45">
          <SmilePlus size={16} />
        </span>
        <span className={`shrink-0 p-1.5 rounded-lg transition-colors ${canSend ? "text-brand" : "text-ink/20"}`}>
          <Send size={16} />
        </span>
      </div>
      {below}
    </div>
  );
}

/** The text caret in a box being typed into. */
export function Caret() {
  return <span className="fw-caret ml-px inline-block h-[1.05em] w-px translate-y-[2px] bg-ink/80" />;
}
