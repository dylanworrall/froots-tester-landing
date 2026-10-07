"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  imageUrl: string;
  /** When set, plays a looping demo video; imageUrl becomes the poster frame. */
  videoUrl?: string;
  alt?: string;
  /** Playback volume once sound is on (0–1). Kept low so the hero never blasts. */
  volume?: number;
}

const GESTURES = ["pointerdown", "keydown", "touchend"] as const;

export function VideoShowcase({ imageUrl, videoUrl, alt = "Preview", volume = 0.6 }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const userMuted = useRef(false);
  const [muted, setMuted] = useState(true);

  // Try to start with sound. Browsers refuse unmuted autoplay for most fresh
  // visitors, so on refusal it plays muted and turns the sound on at the
  // visitor's first click, tap or keypress anywhere on the page.
  useEffect(() => {
    const v = ref.current;
    if (!v || !videoUrl) return;
    v.volume = volume;
    const unmute = () => {
      if (userMuted.current) return;
      v.muted = false;
      v.volume = volume;
      v.play().then(() => setMuted(false)).catch(() => {
        v.muted = true;
        void v.play().catch(() => {});
      });
    };
    const onGesture = (e: Event) => {
      if (buttonRef.current?.contains(e.target as Node)) return; // the toggle handles itself
      GESTURES.forEach((t) => document.removeEventListener(t, onGesture, true));
      unmute();
    };
    v.muted = false;
    v.play().then(() => setMuted(false)).catch(() => {
      v.muted = true;
      setMuted(true);
      void v.play().catch(() => {});
      GESTURES.forEach((t) => document.addEventListener(t, onGesture, true));
    });
    return () => GESTURES.forEach((t) => document.removeEventListener(t, onGesture, true));
  }, [videoUrl, volume]);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    userMuted.current = v.muted;
    v.volume = volume;
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
                ref={buttonRef}
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
