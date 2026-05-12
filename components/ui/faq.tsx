"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type FaqItem = { q: string; a: string };

const items: FaqItem[] = [
  {
    q: "What is Froots?",
    a: "Froots is a playground for your AI — let it browse the web, build your digital brain, write notes, create widgets, and run automations. Bring any agent harness, give it the tools it needs, and watch every step from one UI.",
  },
  {
    q: "Which agent harnesses does it support?",
    a: "Claude Code, OpenAI Codex, Cursor agents, and your own homegrown harness. We speak to each through a thin adapter so the interface and controls stay identical regardless of who's driving.",
  },
  {
    q: "What kinds of tools can my agents use?",
    a: "Shell, browsers, MCP servers, your private APIs, and anything you can wrap in a function. Wire a tool into a run with a few lines of config — agents call it, you see exactly what they did.",
  },
  {
    q: "Can I pause or interrupt a run?",
    a: "Yes. Every run is fully interruptible. Pause anything risky before it touches prod, review the diff, and either approve, edit, or kill the run. You stay in the loop on the steps that matter.",
  },
  {
    q: "Is my data private?",
    a: "Your runs, memory, and knowledge base stay on your machine by default. Bring your own model keys; we never see your prompts or outputs unless you opt in to cloud features.",
  },
  {
    q: "How is this different from a chat UI?",
    a: "Chat UIs show the conversation. Froots shows the work — tool calls, file diffs, browser sessions, memory updates, and reasoning all streamed into one timeline you can replay and fork.",
  },
  {
    q: "Do I need to be a developer?",
    a: "No. The starter routines, widgets, and skills work out of the box. If you're a developer, you can write your own skills and harness adapters — but most teams ship without writing code.",
  },
  {
    q: "How much does it cost?",
    a: "Free while you're kicking the tires. Paid plans kick in when you connect production tools or run heavy schedules. You bring your own model keys, so you're never locked in.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-background text-foreground py-24 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Frequently asked
          </h2>
          <p className="mt-3 text-foreground/60 text-base md:text-lg">
            The stuff people ask before they sign up.
          </p>
        </div>

        <ul className="space-y-2">
          {items.map((item, i) => {
            const open = openIndex === i;
            return (
              <li
                key={item.q}
                className={cn(
                  "rounded-xl border border-white/10 bg-white/5 supports-[backdrop-filter]:bg-white/[0.03] backdrop-blur-xl transition-colors",
                  open && "border-white/20",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={open}
                >
                  <span className="font-medium text-base md:text-lg">
                    {item.q}
                  </span>
                  <Plus
                    className={cn(
                      "size-4 shrink-0 transition-transform duration-200",
                      open && "rotate-45",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-200 ease-out",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm md:text-base text-foreground/70 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
