// Ported from the Froots app:
//   src/components/MainShell/views/BrowserChrome.tsx — the toolbar (toolButton) over a web tab
//   src/components/MainShell/views/browserBits.tsx   — AddressBar
//   src-tauri/src/agent_browser_kit.js               — snapshot(): the "[3] button "Post"" lines an
//                                                      agent reads; the numbered tags drawn on the
//                                                      page here are those same numbers, made visible
//
// The page itself is a stand-in (example.com), drawn in placeholder bars.

import { ArrowLeft, ArrowRight, Globe, RotateCw } from "lucide-react";
import { SETTLE } from "../motion";

const toolButton = "shrink-0 grid place-items-center w-7 h-7 rounded-lg text-ink/55";

export function BrowserToolbar({ url }: { url: string }) {
  return (
    <div className="min-w-0 max-w-full shrink-0 bg-panel">
      <div className="flex items-center gap-1 px-2 pb-1.5 pt-1.5">
        <span className={toolButton}>
          <ArrowLeft size={14} />
        </span>
        <span className={toolButton}>
          <ArrowRight size={14} />
        </span>
        <span className={toolButton}>
          <RotateCw size={14} />
        </span>
        <div className="flex-1 min-w-[100px] px-0.5">
          <div className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-ink/[0.05]">
            <Globe size={12} className="shrink-0 text-ink/35" />
            <span className="flex-1 min-w-0 truncate text-[12.5px] text-ink/90">{url}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** An element's snapshot number, on the page. */
export function ElementRef({ n, show, hot = false }: { n: number; show: boolean; hot?: boolean }) {
  return (
    <span
      style={{ transition: `opacity 250ms ease, transform 400ms ${SETTLE}` }}
      className={`absolute -left-2 -top-2 z-10 grid h-[18px] min-w-[18px] place-items-center rounded-[5px] px-1 font-mono text-[10px] font-bold text-white ${hot ? "bg-[#7c5cff]" : "bg-[#3b6ef6]"} ${show ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
    >
      {n}
    </span>
  );
}
