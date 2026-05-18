---
title: "Froots vs Hermes Agent: the honest 2026 comparison"
slug: "froots-vs-hermes"
date: 2026-04-14
author: "Priya Menon"
authorRole: "Product Engineer · Froots"
category: "Comparison"
excerpt: "Nous Research's Hermes is the serious terminal-native agent. Froots is the serious desktop-native agent. Both ship memory, learning loops, skills, and multi-channel messaging — they differ on shape, not on ambition."
tags: ["comparison", "hermes", "nous-research", "agents"]
coverColor: "#F6C849"
archived: true
faq:
  - q: "Who makes Hermes Agent and is it open source?"
    a: "Hermes Agent is built by Nous Research and released under MIT at github.com/NousResearch/hermes-agent. Latest public version at the time of writing: v0.10.0 (April 16, 2026). Froots is source-available for the desktop app, AGPL-3.0 for the forthcoming sync server. Both respect your freedom to audit and self-host; Hermes is friendlier if your compliance team specifically needs a permissive license."
  - q: "Does Froots actually have a learning loop? I thought that was Hermes's flagship."
    a: "Both have one — they're shaped differently. Hermes leans toward autonomously generating new skills from past sessions. Froots continuously indexes three editable memory files (context, decisions, learnings), auto-commits every vault change to a local git history, and ships a curated skill library (60+, including a skill-creator). The agent writes to memory forward, retrieves by relevance on every turn, and improves its own identity file over time. Same target, different bets."
  - q: "Does Hermes have a notes editor?"
    a: "No. Hermes ships a TUI, a multi-platform messaging gateway, a skills system, and a local web dashboard — but no native note-taking surface. If you want notes + agent + automations in one window, that's Froots. If you want a headless, chat-first runtime you can SSH into, Hermes is built for that."
  - q: "Can I run Hermes and Froots together?"
    a: "Yes — they're complementary. A common pattern: Hermes running on Modal or Daytona for always-on, messaging-triggered agent work, and Froots on the laptop for focused knowledge work. Both read and write plain files, so a shared folder is a simple integration point."
  - q: "Which platforms does each support?"
    a: "Hermes: Linux, macOS, WSL2, Android via Termux (one-line curl installer). No native Windows build; no iOS. Froots: native desktop for macOS, Windows, and Linux, plus iOS and Android apps in active development, plus native OS widgets (macOS WidgetKit, Windows Adaptive Cards). If mobile or a GUI matters, Froots covers more surface."
  - q: "Which is cheaper to run?"
    a: "Hermes is free software — you pay only for models and, if you choose serverless, idle-cheap compute on Modal/Daytona. Froots has a free Seedling tier (one device, full features with bring-your-own keys) plus paid tiers for managed models and cloud sync (launching 2026). If you're comfortable wiring infrastructure, Hermes + BYO model is cheaper; if you want zero-config, Froots Seedling is free and Froots Pro is the shortest no-setup path."
---

**Hermes Agent** got popular for good reasons. Nous Research shipped it under MIT, the installer is a one-line `curl`, the architecture is coherent, and the thesis is clear: *agents that improve themselves.* If you've read a few "local agents in 2026" threads, you've seen it. If you're evaluating a desktop-native alternative with the same ambitions, you've probably seen **[Froots](https://froots.ai)** too.

This is the honest comparison. We ship Froots, so there's a bias — but every Hermes claim below is checked against [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent), and every Froots claim is grounded in what our desktop app actually ships today. If you catch a factual error, [tell us](mailto:hello@froots.ai).

A first pass of this article undersold Froots's memory + learning story. The corrected version is here; the short version is that **both products take the "agent with persistent memory and self-improving behavior" thesis seriously** — they just embody it in very different shells.

## TL;DR

| | Pick Hermes | Pick Froots |
|---|---|---|
| **Primary surface** | Terminal UI + multi-platform gateway + web dashboard | Desktop app: editor + vault + agent pane + widgets |
| **Best for** | CLI-native workflows, always-on messaging agents, headless servers | Daily knowledge work, visual canvases, writing-heavy days, teams |
| **Notes editor** | None | Block editor, wikilinks, graph view, semantic search |
| **Memory** | `MEMORY.md` + `USER.md` + FTS5 session search + Honcho user modeling | `context.md` + `decisions.md` + `learnings.md` + editable persona files, continuously indexed |
| **Learning loop** | Auto-generated skills from experience | Curated skill library (60+) + skill-creator + auto-written memory + git-versioned identity |
| **Deployment** | Local, Docker, SSH, Daytona, Singularity, Modal | Local desktop app (plus an optional sync server on the roadmap) |
| **Platforms** | Linux, macOS, WSL2, Android (Termux) | macOS, Windows, Linux, iOS + Android (in development) |
| **License** | MIT | Source-available (app) / AGPL-3.0 (sync server, future) |

Different shells, real parity on the agent fundamentals. Pick based on how you want to sit in front of it.

## What Hermes actually is

A four-part stack:

- **Terminal UI** — multiline editing, slash-command autocomplete, conversation history, interrupt-and-redirect, streaming tool output. The default entry point.
- **Gateway** — a multi-platform messaging bridge: Telegram, Discord, Slack, WhatsApp, Signal, email — with cross-platform conversation continuity.
- **Skills System** — Hermes auto-creates reusable "skills" from past sessions and refines them during use.
- **Compute backends** — six of them: local, Docker, SSH, Daytona, Singularity, Modal. Run it on a $5 VPS, an HPC cluster, or serverless that hibernates between messages.

Three-layer memory:

1. Persistent files (`MEMORY.md`, `USER.md`)
2. SQLite **FTS5** session search with LLM summarization for cross-session recall
3. **Honcho** dialectic user modeling

Model coverage is deliberately eclectic: Nous Portal, OpenRouter (~200 models), NVIDIA NIM, Xiaomi MiMo, z.ai/GLM, Kimi/Moonshot, MiniMax, Hugging Face, OpenAI, or your own endpoint. Switch with `hermes model`.

That's a serious product, shaped by a specific hypothesis: **the interesting thing about a local agent is how it behaves over time, not how it displays notes.**

## What Froots actually is

A Tauri desktop app that treats *the workspace* as the unit, not the runtime. One window contains:

- A block markdown editor (Tiptap) with wikilinks, graph view, code/math/diagrams, semantic + lexical search across the vault
- An always-on agent with an editable identity — four persona files on disk (`IDENTITY.md`, `SOUL.md`, `USER.md`, `BOOTSTRAP.md`) you can rewrite any time
- Three persistent memory files (`context.md`, `decisions.md`, `learnings.md`) the agent writes forward across sessions, continuously indexed for retrieval
- A 60+ skill library — curated, sandboxed, on/off per-skill — including a `skill-creator` that generates new skills from conversation
- A unified inbox across iMessage, Gmail, IMAP/SMTP, Slack, Discord, Telegram, Signal, WhatsApp, X
- Native OS widgets the agent can generate on demand (SwiftUI WidgetKit on macOS, Adaptive Cards on Windows)
- A vault that's a folder of plain markdown — every save auto-committed to a local git history
- Three trust levels (Careful / Balanced / Yolo) with per-tool scoping

Same "memory + learning loop" thesis as Hermes — just wrapped in an editor instead of a terminal.

## Where they converge (and the lazy comparison is wrong)

Both products ship the same five fundamentals. This is the part the first version of this article got wrong:

| | Hermes | Froots |
|---|---|---|
| **Persistent memory across sessions** | `MEMORY.md`, `USER.md` | `context.md`, `decisions.md`, `learnings.md` + persona files |
| **Agent writes to memory on its own** | Yes — periodic "nudges" | Yes — writes facts forward as they emerge |
| **Search over past sessions** | FTS5 + LLM summarization | Semantic + lexical, indexed continuously |
| **User modeling** | Honcho dialectic modeling | Editable user persona file, agent-updated |
| **Skill/plugin system** | Auto-generated + self-improving | Curated (60+) + skill-creator for new ones |
| **Multi-channel messaging** | Gateway: Telegram, Discord, Slack, WhatsApp, Signal, email | Inbox: iMessage, Gmail, Slack, Discord, Telegram, Signal, WhatsApp, X |
| **Model flexibility** | Any provider with an API | Any Claude- or OpenAI-compatible endpoint |
| **Sandboxed tools** | Per-skill policies | Three trust levels + per-tool scoping |

If you were picking based on "which has memory" or "which has a learning loop" or "which has skills" — neither wins. Both have them. Pick based on the shape.

## Where Hermes has the edge

**Deployment range.** This is the single biggest Hermes-only advantage. Six compute backends mean you can run Hermes in a container, on a $5 VPS, on university HPC, or serverless-hibernating-until-someone-messages-it on Modal. Froots is a desktop app. If you want agents on servers, Hermes is the answer.

**Terminal-native ergonomics.** If your day is in tmux, Hermes meets you there. Froots has no Hermes-equivalent TUI; it wants to be a window.

**Auditability + license.** MIT, smaller codebase, no proprietary UI to reason about. The Nous Research team is explicit about the algorithms (FTS5, Honcho, etc.) rather than abstracting them behind an app.

**Auto-skill generation.** Hermes's skills system is more aggressive about *writing new procedures itself* than Froots's skill-creator. Same shape, Hermes pushes further on the autonomy axis. If that's the axis you care most about, Hermes wins.

**Cross-device conversation continuity.** Start a conversation on Telegram, continue from the terminal, finish in Signal — the Gateway orchestrates this better than Froots's inbox does today.

## Where Froots has the edge

**An editor.** The biggest single shape difference. Hermes assumes you bring your own editor; Froots *is* an editor with an agent living in it. If 60% of your day is writing, reading, or thinking in markdown, that difference is the whole product.

**Visual canvas.** Graph view over your vault, force-directed layout, first- and second-degree local graphs while writing. Widgets the agent generates on demand as native OS tiles. Hermes has none of this and isn't trying to — but if you think visually, Froots is built for you.

**The persona system.** Four editable markdown identity files (`IDENTITY.md`, `SOUL.md`, `USER.md`, `BOOTSTRAP.md`) you can rewrite any time — and the agent re-reads them mid-session. Hermes has user modeling via Honcho (great) but no equivalent to "edit the agent's voice in your editor, save the file, watch the agent update." Froots treats identity as a document, not a database.

**Desktop + mobile + widgets.** macOS, Windows, Linux desktop; iOS + Android in development; native widgets on macOS and Windows; lock-screen tiles on iOS. Hermes is terminal-first; no native GUI surfaces, no widgets.

**Git-backed vault.** Every save is auto-committed to a local git repo inside your workspace. Visual diff timeline per note, undo across days, not just the last edit. Hermes has `MEMORY.md` under your own git remote if you want; Froots bakes it in.

**Onboarding friction.** Both install in a minute, but Froots requires no terminal, no API key to start, no model choice. Hermes expects a provider, a gateway config, credentials. That's fine if you're technical; a wall if you're not.

**Teams (coming).** A paid Teams tier with shared encrypted vault, collaborative editing, per-seat billing is on the 2026 roadmap. Hermes is single-user out of the box.

## Side-by-side specifics

| Capability | Hermes Agent | Froots |
|---|---|---|
| **Primary UI** | Terminal (TUI) | Desktop window |
| **Secondary UIs** | Local web dashboard, multi-platform gateway | iOS, Android, native OS widgets |
| **Notes editor** | None | Block editor with graph, wikilinks, semantic + lexical search |
| **Memory (persistent)** | `MEMORY.md`, `USER.md` | `context.md`, `decisions.md`, `learnings.md` + persona files |
| **Memory (retrieval)** | FTS5 + LLM summarization + Honcho | Continuous index, relevance-ranked on every turn |
| **Learning mechanism** | Auto-generated skills from experience | Skill-creator + auto-written memory + git-versioned identity |
| **Built-in skills** | Library grows via self-generation | 60+ curated, sandboxed, on/off individually |
| **Models** | Nous Portal, OpenRouter (~200), NVIDIA NIM, MiMo, GLM, Kimi, MiniMax, HF, OpenAI, custom | Any Claude- or OpenAI-compatible endpoint |
| **Multi-channel messaging** | Gateway: 6 channels + email | Inbox: 8 channels |
| **Compute / deployment** | Local, Docker, SSH, Daytona, Singularity, Modal | Local desktop (+ optional sync server, roadmap) |
| **OS support** | Linux, macOS, WSL2, Android (Termux) | macOS, Windows, Linux, iOS, Android |
| **Sandboxing** | Per-skill configurable | Careful / Balanced / Yolo trust levels + per-tool policy |
| **Version control** | Bring your own | Local git auto-commit per save |
| **License** | MIT | Source-available (app), AGPL-3.0 (sync server) |

## When to use each

**Pick Hermes if you:**

- Live in a terminal and want your agent to live there with you
- Want an agent that writes its own new procedures, aggressively, from experience
- Need to run the same agent on a laptop, a VPS, and serverless
- Your compliance review process needs MIT specifically
- Value the smallest, most auditable codebase
- Want multi-channel messaging with conversation continuity across Telegram/Signal/Slack/email

**Pick Froots if you:**

- Want your editor and your agent in the same window
- Think visually — you want a graph view of your vault, native OS widgets, force-directed canvases
- Want to edit your agent's voice, values, and user model by opening a markdown file
- Want to keep a version history of every note you write without thinking about it
- Need mobile and native widget surfaces for your workflow
- Want a teams tier with a shared vault (roadmap)
- Want to bring non-technical teammates along

## The short version

The lazy version of this comparison says Hermes has memory and a learning loop; Froots is a pretty editor. That's wrong, and the first draft of this piece leaned into it too hard.

The honest version: **both products ship memory, a learning loop, skill systems, and multi-channel messaging.** What actually differs is the shell around those fundamentals — Hermes is a terminal + gateway + serverless backends; Froots is a desktop app with an editor, a vault, a graph, and widgets. Pick the shell you'd rather sit inside.

[Try Froots free →](/download.html) · [Hermes on GitHub →](https://github.com/NousResearch/hermes-agent)

## Related

- [Froots vs OpenClaw](/blog/froots-vs-openclaw)
- [The local-first AI workspace stack, 2026](/blog/local-first-ai-workspace-2026)
- [Automate git worktrees with an AI agent](/blog/automate-git-worktrees-with-an-agent)
