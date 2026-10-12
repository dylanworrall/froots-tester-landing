// Ported from the Froots app: src/components/MainShell/Sidebar.tsx
//   Sidebar (the w-16 rail), RailButton, RowFace, NewCount, HereHighlight, FaceBox
//
// Store reads (agents, DM rows, unread counts, presence) are replaced by the `items` prop; the
// layoutId spring on the "here" highlight is a CSS opacity fade.

import { MessageSquare, MoreHorizontal, Settings as SettingsIcon, UsersRound } from "lucide-react";
import { SETTLE } from "../motion";
import { Face, type Who } from "./faces";

/** NewCount: "a red dot with the number in it, bottom corner, the way Discord does it". */
export function NewCount({ count }: { count: number }) {
  return (
    <span
      className={`absolute -bottom-1 -right-1 min-w-[18px] h-[18px] px-[5px] grid place-items-center rounded-full bg-red-500 text-white text-[10.5px] font-bold tabular-nums leading-none ring-[3px] ring-shell transition-[transform,opacity] duration-300 ${count > 0 ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
      style={{ transitionTimingFunction: SETTLE }}
    >
      {count > 0 ? (count > 99 ? "99+" : count) : ""}
    </span>
  );
}

export type RailItem = { who: Who; kind: "agent" | "dm" | "group"; count?: number; here?: boolean };

/** RailButton + FaceBox + RowFace: a 48px button, the face at 32, the kind badge bottom-left (a
 *  chat bubble for a person, people for a group), the count bottom-right, the highlight behind. */
function RailButton({ item }: { item: RailItem }) {
  const Kind = item.kind === "group" ? UsersRound : MessageSquare;
  return (
    <span className="relative shrink-0 w-12 h-12 grid place-items-center rounded-2xl">
      <span className={`absolute inset-0 rounded-2xl bg-ink/[0.09] transition-opacity duration-300 ${item.here ? "opacity-100" : "opacity-0"}`} />
      <span className="relative shrink-0 flex items-center justify-center" style={{ width: 32, height: 32 }}>
        {item.kind === "group" ? (
          // A group is two members' faces stacked.
          <span className="relative w-8 h-8">
            <span className="absolute left-0 top-0">
              <Face who="leo" size={20} />
            </span>
            <span className="absolute right-0 bottom-0">
              <Face who="maya" size={20} />
            </span>
          </span>
        ) : (
          <Face who={item.who} size={32} />
        )}
        {item.kind !== "agent" && (
          <span className="absolute -bottom-1 -left-1 w-[15px] h-[15px] grid place-items-center rounded-full bg-panel text-ink/70 ring-2 ring-shell">
            <Kind size={9} strokeWidth={2.5} />
          </span>
        )}
        <NewCount count={item.count ?? 0} />
      </span>
    </span>
  );
}

export function Rail({ items }: { items: RailItem[] }) {
  return (
    <aside className="relative shrink-0 w-16 flex flex-col items-center pt-1 pb-1">
      <div className="flex-1 min-h-0 w-full flex flex-col items-center gap-1.5 overflow-hidden">
        {items.map((it) => (
          <RailButton key={it.who + it.kind} item={it} />
        ))}
        <span className="relative shrink-0 w-12 h-10 grid place-items-center rounded-2xl text-ink/45">
          <MoreHorizontal size={18} />
        </span>
      </div>
      {/* Profiles, Settings, and the view dots under everything. */}
      <span className="shrink-0 w-10 h-10 grid place-items-center rounded-xl text-ink/45">
        <UsersRound size={17} />
      </span>
      <span className="shrink-0 w-10 h-10 grid place-items-center rounded-xl text-ink/45">
        <SettingsIcon size={17} />
      </span>
      <div className="shrink-0 h-6 mt-1 flex items-center justify-center gap-1.5">
        {[0, 1, 2].map((v) => (
          <span key={v} className="w-3 h-4 grid place-items-center">
            <span className={`w-1.5 h-1.5 rounded-full ${v === 0 ? "bg-ink/70" : "bg-ink/20"}`} />
          </span>
        ))}
      </div>
    </aside>
  );
}
