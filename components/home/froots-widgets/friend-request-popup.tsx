// Ported from the Froots app: src/components/MainShell/FriendRequestPopup.tsx
//
// The popup's markup and classes as-is. framer-motion's spring in/out is a CSS transition driven
// by `shown`; useFriendsStore/useToastStore are replaced by props. The toast after Accepting is the
// app's own message ("You and <name> are now friends"), drawn as a card here because the app shows
// toasts in a separate overlay window.

import { Check, UserPlus, X } from "lucide-react";
import { SETTLE } from "../motion";
import { Face, FACES, type Who } from "./faces";

export function FriendRequestPopup({ who, keyLabel, shown, pressed, accepting }: { who: Who; keyLabel: string; shown: boolean; pressed: boolean; accepting: boolean }) {
  const name = FACES[who].name;
  return (
    <div
      style={{ transition: `opacity 300ms ease, transform 450ms ${SETTLE}` }}
      className={`absolute top-2.5 right-2.5 left-2.5 z-[5] rounded-2xl bg-panel border border-ink/[0.1] shadow-[0_16px_48px_rgba(0,0,0,0.5)] p-3 ${shown ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
    >
      <div className="flex items-center gap-1.5 text-[11px] text-ink/45 mb-2.5">
        <UserPlus size={12} />
        Friend request
      </div>
      <div className="flex items-center gap-3">
        <Face who={who} size={36} />
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-medium text-ink/95 truncate">{name}</div>
          <div className="text-[11px] text-ink/45 truncate">wants to be friends · {keyLabel}</div>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <span className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg text-[12px] text-ink/70 bg-ink/[0.06]">
          <X size={13} /> Decline
        </span>
        <span
          className={`flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg text-[12px] font-medium text-emerald-400 transition-all duration-150 ${pressed || accepting ? "bg-emerald-500/[0.3]" : "bg-emerald-500/[0.18]"} ${pressed ? "scale-95" : ""} ${accepting ? "opacity-50" : ""}`}
        >
          <Check size={13} /> {accepting ? "Accepting…" : "Accept"}
        </span>
      </div>
    </div>
  );
}

export function FriendsToast({ who, shown }: { who: Who; shown: boolean }) {
  return (
    <div
      style={{ transition: `opacity 300ms ease, transform 450ms ${SETTLE}` }}
      className={`absolute bottom-3 right-3 left-3 flex items-center gap-2 rounded-xl bg-card-1 border border-ink/[0.1] shadow-[0_16px_48px_rgba(0,0,0,0.5)] px-3 py-2.5 text-[12.5px] text-ink/90 ${shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
    >
      <Check size={14} className="text-emerald-400 shrink-0" />
      You and {FACES[who].name} are now friends
    </div>
  );
}
