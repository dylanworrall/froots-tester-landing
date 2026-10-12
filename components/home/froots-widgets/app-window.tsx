// Ported from the Froots app:
//   src/index.css                          — .app-window-rounded, the dark theme tokens (see the
//                                            site's app/globals.css, `.froots-app`)
//   src/components/MainShell/UnifiedTopBar.tsx — the 44px top bar on the shell: traffic lights,
//                                            back/forward, the tab strip
//   src/components/MainShell/TabStrip.tsx  — TabPill: h-8 rounded-[10px] pills; the active one
//                                            sits on the content card's colour
//
// The shell (`bg-shell`) holds the rail on the left and the content card (`bg-panel`,
// rounded-xl) on the right, exactly as MainShell lays them out.

import type { ReactNode, Ref } from "react";
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import { appFont } from "../font";

export type Tab = { title: string; icon?: ReactNode; active?: boolean; driver?: boolean };

function TabPill({ tab }: { tab: Tab }) {
  return (
    <span
      className={`group relative shrink-0 h-8 flex items-center gap-2 rounded-[10px] max-w-[200px] min-w-0 pl-3 pr-1.5 ${
        tab.active ? "text-ink/95 bg-panel rounded-b-none h-[37px] pb-[5px]" : "text-ink/55"
      } ${tab.driver ? "ring-1 ring-brand/70 ring-inset" : ""}`}
    >
      {tab.icon}
      <span className="flex-1 min-w-0 truncate text-[12.5px] leading-4">{tab.title}</span>
      {tab.driver && <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-brand" />}
      <span className={`shrink-0 w-[18px] h-[18px] inline-grid place-items-center rounded-md text-ink/45 ${tab.active ? "" : "opacity-0"}`}>
        <X size={12} />
      </span>
    </span>
  );
}

function TopBar({ tabs, compact }: { tabs: Tab[]; compact: boolean }) {
  const button = "w-7 h-7 grid place-items-center rounded-lg text-ink/20";
  return (
    <div className="relative shrink-0 h-[44px] flex items-stretch bg-shell">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex gap-2">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>
      <div className={`flex-1 flex items-center ${compact ? "pl-[68px]" : "pl-[84px]"} pr-3 gap-1 min-w-0`}>
        <div className={`shrink-0 items-center gap-0.5 mr-0.5 ${compact ? "hidden" : "hidden sm:flex"}`}>
          <span className={button}>
            <ArrowLeft size={15} />
          </span>
          <span className={button}>
            <ArrowRight size={15} />
          </span>
        </div>
        <div className="flex-1 min-w-0 self-start h-[44px] overflow-hidden">
          <div className="relative w-max h-full flex items-start gap-1.5 pl-2 pr-2 pt-[7px]">
            {tabs.map((t) => (
              <TabPill key={t.title} tab={t} />
            ))}
            <span className="relative shrink-0 mt-[2px] w-7 h-7 grid place-items-center rounded-full text-ink/45">
              <Plus size={15} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** The whole window: top bar, rail (optional), content card. */
export function AppWindow({
  children,
  rail,
  tabs,
  label,
  panelRef,
  compact = false,
  className = "",
}: {
  children: ReactNode;
  rail?: ReactNode;
  tabs: Tab[];
  /** A small window (a card on the page): no back/forward, the tabs start closer to the lights. */
  compact?: boolean;
  label: string;
  panelRef?: Ref<HTMLDivElement>;
  className?: string;
}) {
  return (
    <div ref={panelRef} role="img" aria-label={label} className={`fw froots-app froots-window ${appFont.className} relative flex flex-col overflow-hidden bg-shell text-left ${className}`}>
      <div aria-hidden className="contents">
        <TopBar tabs={tabs} compact={compact} />
        <div className="flex min-h-0 flex-1 pb-1.5 pr-1.5">
          {rail ?? <span className="w-1.5 shrink-0" />}
          <div className="@container relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl bg-panel">{children}</div>
        </div>
      </div>
    </div>
  );
}

/** One piece of the app on its own (a settings section, a modal), in the app's material. */
export function AppPanel({ children, label, panelRef, className = "" }: { children: ReactNode; label: string; panelRef?: Ref<HTMLDivElement>; className?: string }) {
  return (
    <div ref={panelRef} role="img" aria-label={label} className={`fw froots-app froots-window ${appFont.className} relative overflow-hidden bg-panel text-left ${className}`}>
      <div aria-hidden>{children}</div>
    </div>
  );
}
