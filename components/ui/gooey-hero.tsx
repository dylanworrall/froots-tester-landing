"use client";

import { useScreenSize } from "@/components/hooks/use-screen-size";
import { PixelTrail } from "@/components/ui/pixel-trail";
import { GooeyFilter } from "@/components/ui/gooey-filter";

export function GooeyHero() {
  const screenSize = useScreenSize();

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-black text-center overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/froot-hero-bg.jpg"
        alt=""
        className="w-full h-full object-cover object-center absolute inset-0 opacity-70"
      />

      <GooeyFilter id="gooey-filter-pixel-trail" strength={5} />

      <div
        className="absolute inset-0 z-0"
        style={{ filter: "url(#gooey-filter-pixel-trail)" }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan("md") ? 24 : 32}
          fadeDuration={0}
          delay={500}
          pixelClassName="bg-white"
        />
      </div>

      <div className="relative z-10 px-6 max-w-4xl">
        <p className="text-white text-5xl md:text-7xl font-bold leading-tight">
          Your agents.
          <br />
          Watered, picked, and ripe.
        </p>
        <p className="mt-6 text-white/70 text-base md:text-lg max-w-2xl mx-auto">
          The playground where AI agents grow up — bring any harness, give it
          tools, and watch every step.
        </p>
      </div>
    </div>
  );
}
