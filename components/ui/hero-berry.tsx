"use client";

import { ArrowRight } from "lucide-react";

interface Props {
  heading?: string;
  tagline?: string;
  buttonText?: string;
}

export function HeroBerry({
  heading = "Hours of work in minutes.",
  tagline = "Froots is a playground for your AI — let it browse the web, build your digital brain, write notes, create widgets, and run automations.",
  buttonText = "Join the waitlist",
}: Props) {
  return (
    <section className="relative w-full">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 pt-36 pb-16 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
          {heading}
        </h1>
        <p className="mt-3 max-w-xl text-base sm:text-lg text-muted-foreground">
          {tagline}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition hover:opacity-90">
            {buttonText}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
