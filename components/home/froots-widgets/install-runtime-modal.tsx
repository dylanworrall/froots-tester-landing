// Ported from the Froots app: src/components/Settings/RuntimeCatalogDialog.tsx — InstallRuntimeModal
//
// The modal's card (not its backdrop), with the phases the app moves through: confirm (Cancel /
// Install), running ("Waiting for output…", "Installing…"), and done, where the app closes the
// modal and the runtime's row turns Ready (StatusChip). The Tauri install_runtime call and its
// output events are replaced by `phase`.

import type { ReactNode } from "react";
import { Loader2, X } from "lucide-react";
import { StatusChip } from "./runtime-settings";

export function InstallRuntimeModal({ label, command, phase, pressed }: { label: string; command: ReactNode; phase: "confirm" | "running" | "done"; pressed: boolean }) {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13.5px] font-semibold text-ink/85">Install {label}</h3>
        <span className="p-1 rounded-md text-ink/35">
          <X size={14} />
        </span>
      </div>
      <p className="text-[12px] text-ink/55 mb-2">Froots will run this command:</p>
      <pre className="rounded-lg bg-card-2 border border-ink/[0.06] px-3 py-2.5 font-mono text-[11.5px] text-ink/80 whitespace-pre-wrap break-all min-h-[38px]">{command}</pre>
      <div className={`mt-3 rounded-lg bg-card-2 border border-ink/[0.06] px-3 py-2 transition-opacity duration-300 ${phase === "running" ? "opacity-100" : "opacity-0"}`}>
        <p className="font-mono text-[10.5px] text-ink/35">Waiting for output…</p>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2 h-7">
        {phase === "running" ? (
          <span className="flex items-center gap-1.5 text-[12px] text-ink/45">
            <Loader2 size={12} className="animate-spin" /> Installing…
          </span>
        ) : phase === "done" ? (
          <StatusChip ready />
        ) : (
          <>
            <span className="px-3 py-1.5 rounded-md text-[12px] text-ink/55">Cancel</span>
            <span className={`px-3.5 py-1.5 rounded-md bg-brand text-on-brand text-[12px] font-medium transition-transform duration-150 ${pressed ? "scale-95 opacity-90" : ""}`}>Install</span>
          </>
        )}
      </div>
    </>
  );
}
