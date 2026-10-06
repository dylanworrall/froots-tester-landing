"use client";

import { useRef, useState } from "react";

interface Props {
  imageUrl: string;
  /** When set, plays a looping demo video; imageUrl becomes the poster frame. */
  videoUrl?: string;
  alt?: string;
}

export function VideoShowcase({ imageUrl, videoUrl, alt = "Preview" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  // Browsers only autoplay muted video, so it starts silent and the visitor can turn the music on.
  const [muted, setMuted] = useState(true);
  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) void v.play();
  };

  return (
    <section className="relative w-full pb-24">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-black/15">
          {videoUrl ? (
            <>
              <video
                ref={ref}
                src={videoUrl}
                poster={imageUrl}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label={alt}
                className="block h-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700"
              />
              <button
                type="button"
                onClick={toggleSound}
                aria-label={muted ? "Turn sound on" : "Turn sound off"}
                className="absolute bottom-4 right-4 rounded-full bg-black/55 px-3.5 py-2 text-xs font-medium text-white backdrop-blur transition hover:bg-black/70"
              >
                {muted ? "🔇 Sound off" : "🔊 Sound on"}
              </button>
            </>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={alt}
              className="block h-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700"
            />
          )}
        </div>
      </div>
    </section>
  );
}
