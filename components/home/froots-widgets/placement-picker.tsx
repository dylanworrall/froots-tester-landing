// Ported from the Froots app: src/components/MainShell/agentSettings/AgentPlacementPicker.tsx
//   AgentPlacementPicker ("Where this agent runs") and AgentPlacementLabel ("Follows you" /
//   "Runs on <device>", via lib/agentPlacement.ts describePlacement)
//
// The device list and presence come from useDevicePresenceStore and Tauri in the app; here they are
// a fixed Mac mini and MacBook Air, and `home` says which row is chosen. The hint strings are the
// app's own.

import { Check } from "lucide-react";
import { SETTLE } from "../motion";

const FOLLOW_HINT = "Answers on whichever device you message it from. Files it makes stay on that device.";
const HOME_HINT = "Always answers from here. Another device stands in if it's off.";

function PlacementRow({ label, hint, active }: { label: string; hint: string; active: boolean }) {
  return (
    <div
      className={`flex items-center justify-between gap-3 px-3 py-2 rounded-md border text-left text-[12px] transition-colors duration-300 ${
        active ? "border-brand/40 bg-brand/[0.08] text-ink/95" : "border-ink/[0.06] bg-ink/[0.02] text-ink/70"
      }`}
    >
      <span className="min-w-0">
        <span className="block truncate">{label}</span>
        <span className="block text-[11px] text-ink/40 truncate">{hint}</span>
      </span>
      <Check size={11} className={`text-brand shrink-0 transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}

export function AgentPlacementPicker({ home }: { home: boolean }) {
  return (
    <section>
      <h3 className="text-[10.5px] font-semibold text-ink/30 uppercase tracking-[0.06em] mb-2 flex items-center gap-1.5">Where this agent runs</h3>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-1.5">
        <PlacementRow label="Follow me" hint={FOLLOW_HINT} active={!home} />
        <PlacementRow label="Mac mini" hint={HOME_HINT} active={home} />
        <PlacementRow label="MacBook Air (this device)" hint={HOME_HINT} active={false} />
      </div>
    </section>
  );
}

/** AgentPlacementLabel, beside a chat's title. The two states cross-fade. */
export function AgentPlacementLabel({ home }: { home: boolean }) {
  return (
    <span className="relative h-4 flex-1 overflow-hidden text-[11px] text-ink/30">
      {["Follows you", "Runs on Mac mini"].map((s, i) => (
        <span
          key={s}
          style={{ transition: `opacity 300ms ease, transform 500ms ${SETTLE}` }}
          className={`absolute inset-0 truncate ${(i === 1) === home ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
        >
          {s}
        </span>
      ))}
    </span>
  );
}
