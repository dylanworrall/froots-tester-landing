// Ported from the Froots app:
//   src/components/Settings/AgentRuntimesSettings.tsx — the "Agent runtimes" section: header,
//                                                      Check again, the rows, StatusChip, Add runtimes
//   src/components/Settings/RuntimeIcon.tsx          — LOGO_FILES / CHIP_BG / the fallbacks
//   src/lib/runtimeCatalogLogic.ts                   — statusChipLabel()
//   public/harness-logos/*                           — copied into the site's /public/harness-logos
//                                                      (with CREDITS.md)
//
// The runtime catalog comes from the Rust side (list_runtime_catalog); here it's a fixed list, and
// `answered(i)` says which rows have come back from "Check again".

import { Loader2, Plus, RefreshCw, SquareTerminal } from "lucide-react";

const LOGO_FILES: Record<string, string> = {
  amp: "/harness-logos/amp.png",
  claude: "/harness-logos/claude.svg",
  gemini: "/harness-logos/gemini.svg",
  grok: "/harness-logos/grok.svg",
  hermes: "/harness-logos/hermes.png",
  kimi: "/harness-logos/kimi.png",
  openclaw: "/harness-logos/openclaw.svg",
  opencode: "/harness-logos/opencode.svg",
};
const CHIP_BG: Record<string, string> = { grok: "#ffffff" };
/** providers.ts BACKENDS colours, for a harness with no logo file (its initial on its colour). */
const BRAND: Record<string, string> = { codex: "#10A37F" };

export function RuntimeIcon({ id, size = 20 }: { id: string; size?: number }) {
  const inner = Math.round(size * 0.65);
  const logo = LOGO_FILES[id];
  const brand = logo ? undefined : BRAND[id];
  const chipBg = CHIP_BG[id] ?? brand;
  return (
    <span
      className={`inline-flex items-center justify-center rounded-lg shrink-0 overflow-hidden ${chipBg ? "" : "bg-ink/[0.05] border border-ink/[0.06]"}`}
      style={{ width: size, height: size, ...(chipBg ? { backgroundColor: chipBg } : {}) }}
    >
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt="" width={inner} height={inner} loading="lazy" className="object-contain" style={{ maxWidth: inner, maxHeight: inner }} draggable={false} />
      ) : brand ? (
        <span className="font-semibold leading-none text-white" style={{ fontSize: Math.round(size * 0.46) }}>
          {id[0].toUpperCase()}
        </span>
      ) : (
        <SquareTerminal size={inner} strokeWidth={1.25} className="text-ink/55" />
      )}
    </span>
  );
}

export function StatusChip({ ready }: { ready: boolean }) {
  return ready ? (
    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10.5px] font-medium text-emerald-500">Ready</span>
  ) : (
    <span className="inline-flex items-center rounded-full bg-ink/[0.06] px-2 py-0.5 text-[10.5px] font-medium text-ink/45">CLI needed</span>
  );
}

export type RuntimeRow = { id: string; label: string; ready: boolean };

export function AgentRuntimesSettings({ rows, checking, answered }: { rows: readonly RuntimeRow[]; checking: boolean; answered: (i: number) => boolean }) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-[11px] font-semibold text-ink/25 uppercase tracking-[0.06em] mb-1">Agent runtimes</h2>
          <p className="text-[12px] text-ink/40">Choose which agent tools Froots can use on this device.</p>
        </div>
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-ink/[0.08] bg-card-1 text-[12px] text-ink/60 shrink-0">
          <RefreshCw size={13} className={checking ? "animate-spin" : ""} />
          <span className="hidden sm:inline">Check again</span>
        </span>
      </div>
      <div className="bg-card-1 rounded-xl border border-ink/[0.06] px-4">
        {rows.map((r, i) => {
          const known = answered(i);
          return (
            <div key={r.id} className="py-3 border-b border-ink/[0.04] last:border-0">
              <div className="flex items-center gap-2.5">
                <RuntimeIcon id={r.id} size={28} />
                <span className="text-[13px] text-ink/80">{r.label}</span>
                <span className="text-ink/20 text-[12px]">·</span>
                <span className="relative">
                  <span className={`transition-opacity duration-300 ${known ? "opacity-100" : "opacity-0"}`}>
                    <StatusChip ready={r.ready} />
                  </span>
                  <Loader2 size={12} className={`absolute left-1 top-1/2 -translate-y-1/2 animate-spin text-ink/30 ${known ? "hidden" : ""}`} />
                </span>
                <div className="flex-1" />
                <span className={`px-2.5 py-1 rounded-md bg-brand text-on-brand text-[11.5px] font-medium transition-opacity duration-300 ${known && !r.ready ? "opacity-100" : "opacity-0"}`}>Install</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-ink/[0.08] bg-card-1 text-[12px] text-ink/60">
          <Plus size={13} /> Add runtimes
        </span>
      </div>
    </div>
  );
}
