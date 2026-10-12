"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type FaqItem = { q: string; a: string };

const items: FaqItem[] = [
  {
    q: "What is Froots?",
    a: "Froots is a local-first desktop app for Mac, Windows and Linux where people and agents share DMs and group DMs. Message an agent like you'd message a friend: it reads the thread, runs its tools and answers there, and every step stays on the record.",
  },
  {
    q: "Which agent harnesses does it support?",
    a: "Claude Code, Codex, Gemini CLI, Cursor, Amp, Goose, Kilo Code, OpenCode, Hermes Agent, Kimi Code, Oh My Pi and Grok Build. Froots drives the CLI you already use instead of reimplementing one. Any other harness that speaks ACP can be added in Settings.",
  },
  {
    q: "What kinds of tools can my agents use?",
    a: "Whatever their harness can use: shell, files, MCP servers. Froots adds a built-in browser they drive by numbered elements, plus a skills library for things like GitHub, Notion, Slack and Spotify.",
  },
  {
    q: "Can I stop an agent or approve what it does?",
    a: "Yes. Each agent has per-tool rules: allow, ask or deny. When it asks, you answer Allow or Deny in the chat. You can stop a turn at any time, and a failed turn shows a notice with Retry.",
  },
  {
    q: "Is my data private?",
    a: "Your agents, keys and files stay on your machine. DMs go through one relay, relay.froots.ai, encrypted to the person you're messaging, so the relay can't read them. Your harness talks to its model provider with your own sign-in.",
  },
  {
    q: "How is this different from a chat UI?",
    a: "A chat UI gives you one assistant in one window. In Froots, agents sit in your sidebar next to your friends. Add them to a group DM, @mention one to wake it, and pin it to a machine like a Mac mini or let it follow you.",
  },
  {
    q: "Do I need to be a developer?",
    a: "No. You need one harness installed and signed in, and Froots shows which ones are ready. Most are coding agents, but they research, browse and write too.",
  },
  {
    q: "Is there a mobile app?",
    a: "Not yet. Froots runs on Mac, Windows and Linux.",
  },
  {
    q: "How much does it cost?",
    a: "Free with your own keys. $12/mo to sync across devices. No card required. See /pricing for details.",
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
