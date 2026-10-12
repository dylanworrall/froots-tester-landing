// A blog post's cover, drawn with the app's own pieces like the home page widgets: a Froots
// window on one of the site's pastels, with an agent posting the article into a chat. Static (no
// clock), so it renders on the server. The slug picks the pastel and the agent, so a post always
// gets the same cover.

import { FileText } from "lucide-react";
import { AppWindow } from "./app-window";
import { ChainBubble } from "./chat-surface";
import { DmBubble, ThreadHeader } from "./dm-thread";
import { Face, FACES, type Who } from "./faces";

const PASTELS = ["#FBD9DA", "#D7EFD3", "#DCE7FD", "#FBEBC8"];
const WHO: Who[] = ["pip", "scout", "maya", "leo", "sam"];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function BlogCover({ slug, title, tag, size = "card" }: { slug: string; title: string; tag: string; size?: "card" | "feature" | "hero" }) {
  const h = hash(slug);
  const who = WHO[h % WHO.length];
  const window = size === "card" ? "left-[9%] top-[16%] w-[86%]" : size === "feature" ? "left-[10%] top-[14%] w-[84%]" : "left-[14%] top-[16%] w-[72%]";
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden" style={{ backgroundColor: PASTELS[h % PASTELS.length] }}>
      <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/35 blur-2xl" />
      <div className={`absolute ${window} transition-transform duration-500 group-hover:-translate-y-1`}>
        <AppWindow
          compact
          label=""
          className="h-[420px] w-full rounded-[14px] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)]"
          tabs={[{ title: FACES[who].name, icon: <Face who={who} size={16} />, active: true }]}
        >
          <ThreadHeader who={who} title={FACES[who].name} sub={<span className="truncate text-[11px] text-ink/30">{tag}</span>} />
          <div className="flex flex-col gap-2.5 px-3 pt-1">
            <ChainBubble steps={[{ icon: FileText, label: "Wrote file", desc: `${slug}.md`, at: 0 }]} p={1e9} foldAt={0} doneAfter={1} />
            <DmBubble who={who} time="9:41 AM">
              {title}
            </DmBubble>
          </div>
        </AppWindow>
      </div>
    </div>
  );
}
