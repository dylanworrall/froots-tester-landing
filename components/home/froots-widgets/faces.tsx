// Ported from the Froots app:
//   src/components/Blobatar.tsx        — the generated face every person and agent wears
//   src/components/MainShell/AgentAvatar.tsx, MemberAvatar.tsx, views/DmsView.tsx (SelfAvatar)
//
// The app renders blobatars live with the `blobatar` package. The site ships them pre-rendered:
// the SVGs in /public/home/faces were generated once from the same package (blobatar 2.4.0), so each face is the exact
// drawing the app would show for its seed. (The app seeds on a pubkey or agent id, never the display
// name, so the demo people use fixed seeds: Juno, Nora, Maya, Sam, Leo, Wren.) Like the app's Blobatar,
// a face draws at 1.3x its nominal box (SIZE_SCALE) with no disc behind it.

export type Who = "pip" | "scout" | "maya" | "sam" | "leo" | "you";

export const FACES: Record<Who, { name: string; agent?: boolean }> = {
  pip: { name: "Pip", agent: true },
  scout: { name: "Scout", agent: true },
  maya: { name: "Maya Chen" },
  sam: { name: "Sam Ortiz" },
  leo: { name: "Leo Park" },
  you: { name: "You" },
};

const SIZE_SCALE = 1.3;

export function Face({ who, size = 24 }: { who: Who; size?: number }) {
  const drawn = Math.round(size * SIZE_SCALE);
  return (
    <span className="relative shrink-0 grid place-items-center" style={{ width: size, height: size }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/home/faces/${who}.svg`} alt="" width={drawn} height={drawn} loading="lazy" draggable={false} className="absolute max-w-none" style={{ width: drawn, height: drawn }} />
    </span>
  );
}
