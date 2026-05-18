"use client";

import { DownloadCta } from "./download-cta";

interface Props {
  heading?: string;
  tagline?: string;
}

export function HeroBerry({
  heading = "Multiply yourself.",
  tagline = "A local-first desktop app for running AI agents — Claude Code, Codex, Cursor, or your own — with full visibility into every step. Bring your own keys. Free forever.",
}: Props) {
  return (
    <section className="relative w-full">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 pt-36 pb-16 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
          {heading}
        </h1>
        <p className="mt-3 max-w-2xl text-base sm:text-lg text-muted-foreground">
          {tagline}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <DownloadCta size="lg" />
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Free with your own keys · $12/mo to sync across devices · No card required
        </p>
      </div>
    </section>
  );
}
