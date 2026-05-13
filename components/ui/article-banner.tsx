import { Play } from "lucide-react";

interface Props {
  accent: string;
  label: string;
  video?: string;
  poster?: string;
}

export function ArticleBanner({ accent, label, video, poster }: Props) {
  if (video) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-border bg-black">
        <video
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-border"
      style={{ backgroundColor: accent }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-5xl md:text-7xl font-semibold tracking-tight text-neutral-900/15 select-none text-center px-6">
          {label}
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-white/90 shadow-2xl shadow-black/20 backdrop-blur-sm transition group-hover:scale-105">
          <Play
            className="h-6 w-6 md:h-7 md:w-7 text-neutral-900 translate-x-0.5"
            fill="currentColor"
          />
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 px-5 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-1 flex-1 rounded-full bg-neutral-900/15 overflow-hidden">
            <div className="h-full w-1/3 bg-neutral-900/40" />
          </div>
          <span className="text-xs font-medium tabular-nums text-neutral-900/60">
            0:24 / 1:12
          </span>
        </div>
      </div>

      <div className="absolute top-4 left-5 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-neutral-900/30" />
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-900/50">
          Preview
        </span>
      </div>
    </div>
  );
}
