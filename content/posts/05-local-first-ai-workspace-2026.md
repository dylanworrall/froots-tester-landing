---
title: "The local-first AI workspace stack, 2026"
slug: "local-first-ai-workspace-2026"
coverImage: "/froots-art-4.jpg"
date: 2026-04-08
author: "Jordan Reed"
authorRole: "Head of Product · Froots"
category: "Deep dive"
excerpt: "If you're building (or just using) a local-first AI workspace in 2026, these are the ten building blocks — editor, vault, runtime, sync, tools, model routing, memory, inbox, widgets, plugins — and how the serious options stack up across each."
tags: ["local-first", "stack", "comparison", "agents"]
coverColor: "#8FB339"
faq:
  - q: "What does \"local-first\" actually mean in 2026?"
    a: "Local-first means your data lives on your device first. The app works fully offline, the canonical copy is on your disk, and cloud sync (if any) is an optional optimization — not a dependency. The phrase was coined by Ink & Switch; in 2026 it's a de-facto requirement for serious note/agent apps."
  - q: "Do I need all ten layers to have a workspace?"
    a: "No. A workspace is whichever layers you actually use. The point of listing them is to expose design trade-offs — an app that does editor + vault + runtime well can be a workspace; an app that ignores sync or memory is half a workspace. Pick deliberately."
  - q: "Is local-first actually private if I bring my own cloud model?"
    a: "Partially. Your notes stay local, but whatever you send to a cloud model leaves your machine. If privacy matters absolutely, use a local model runtime. If you're comfortable with a narrower trade, cloud models are fine."
  - q: "What's the single most important layer to get right?"
    a: "The vault format. Everything else can be replaced — the editor, the runtime, the sync backend. But if your vault is locked in a proprietary binary format, you're locked in forever. Plain markdown (or Org-mode, or plaintext + metadata) is the one non-negotiable."
  - q: "Will local models replace cloud models for workspace agents in 2026?"
    a: "Partially. Smaller local models are already good enough for a lot of everyday workspace tasks, while cloud models still lead on the harder jobs. The best systems mix both."
---

Every year someone publishes "the [X] stack for [Y]." They're always a little reductive and a little useful. This is the 2026 one for local-first AI workspaces — the apps that treat your data as yours, run agents against it, and don't require a cloud to function.

We build one of these ([Froots](https://froots.ai)), so we're biased. We've tried to make the comparisons honest anyway.

## The ten layers

A local-first AI workspace is a stack. Not every app implements every layer; the ones that miss a layer usually pair with a companion app that fills the gap.

1. **Editor** — where you write
2. **Vault** — where the writing lives on disk
3. **Runtime** — what runs agents and tools
4. **Sync** — how it moves between devices
5. **Tools** — what agents can do (filesystem, shell, network, integrations)
6. **Models** — what language models are in use, and how they're routed
7. **Memory** — what the agent remembers between sessions
8. **Inbox** — how outside messages (email, Slack, iMessage, etc.) come in
9. **Widgets** — how the workspace shows up outside the app (lock screen, menu bar, desktop)
10. **Plugins** — how third parties extend the surface

Below, how each layer looks in 2026, and how the serious options compare.

## 1. Editor

The minimum: markdown, with wikilinks, backlinks, and live preview. Beyond that, the table stakes are the basics people now expect: code blocks, diagrams, tables, tasks, and a generally smooth writing experience.

The current good options:

- **Obsidian** — still the gold standard for the pure editor layer. Plugin-rich, mature.
- **Bear** — the prettiest, macOS-only, fewer features but zero friction.
- **Froots** — Obsidian-feature-matched, with the agent pane integrated.
- **Logseq** — outliner-first; the right tool if you think in outlines.
- **Tana** — graph-native; the right tool if you want nodes-everywhere.

**2026 change:** AI-assisted writing is now assumed. A note-taking app without inline agent hints feels dated. All five options above have some version of it.

## 2. Vault

The minimum: plain markdown files on your disk, in a folder you choose. Anything proprietary is disqualifying. In a serious workspace, the notes are yours, the supporting files are yours, and the agent's memory lives somewhere you can inspect rather than in a black box.

## 3. Runtime

Where the agents actually run. This is the layer that's diverged most in the last 18 months.

Canonical options:

- **In-process (app-owned)** — Froots, Obsidian AI plugins, Cursor. The agent runs inside your editor process; low latency, tight UX integration.
- **Standalone** — tools like Hermes Agent, Aider, or a local runtime. Runs as its own process, not inside your editor. Easier to audit, easier to deploy headless, and often more flexible if you like composing your own stack.
- **Remote** — Claude desktop apps, ChatGPT desktop, Perplexity Comet. The agent lives in the cloud; your editor is a thin client.

The 2026 trend is **hybrid**: a workspace app paired with a runtime layer it can talk to cleanly. That gives you tighter UX without locking you into one shape forever.

## 4. Sync

Local-first doesn't mean single-device. The question is *how* your vault ends up on your phone.

Four patterns:

| Pattern | Example | Tradeoff |
|---|---|---|
| Cloud drive (you pick) | Obsidian + iCloud/Dropbox | Zero cost, imperfect conflict handling |
| Git remote | Anyone + GitHub | Free, great for devs, bad for large attachments |
| CRDT sync | Froots, Logseq | Conflict-free, usually a managed service, sometimes paid |
| Encrypted blob | Obsidian Sync, Froots Pro | End-to-end encrypted, paid, usually the best UX |

**2026 default:** pick a sync layer that feels native when it's available; fall back to git if you're already comfortable living in git.

## 5. Tools

What an agent can *do*, concretely. In 2026 the expected minimum is:

- **Filesystem** — read and write files in the vault, scoped to the vault
- **Shell** — run commands, sandboxed or not (configurable)
- **Network** — HTTP requests; fetch URLs; hit APIs
- **Vault-specific** — search, create/link notes, manage tags
- **OS integrations** — calendar, contacts, notifications, clipboard

More ambitious workspaces add:

- **Browser automation** — headless Chromium, via agent-browser or similar
- **App automation** — AppleScript / JXA on macOS, COM on Windows
- **MCP servers** — the emerging standard for plug-in tools

Everyone has filesystem + shell. Differentiation happens in the middle (OS integrations, vault operations) and at the top (browser + app automation).

## 6. Models

Not which model is best — which model for which task. The 2026 pattern is **per-agent, per-task model routing**. The best workspaces let you use lighter local models for cheap, frequent tasks and stronger cloud models for the harder work. The worst ones still make you pick one model globally and live with it.

## 7. Memory

What the agent remembers about you, across sessions. The 2026 state of the art has three layers:

- **Context** — what's in the current prompt (the model knows this for ~ a minute)
- **Episodic** — per-session memory (the model knows this for a day)
- **Semantic** — persistent, indexed (the model knows this forever, retrieved by similarity)

Froots and a few others implement all three with editable memory documents. The key property is not the exact file layout; it's that you can *read and edit* the memory yourself. If the agent gets something wrong, you should be able to fix it directly.

## 8. Inbox

Messages from the outside world: email, Slack, iMessage, Telegram, etc. A workspace with an inbox is substantively different from one without — the agent can read, summarize, and reply on your behalf, making the app a genuine communications cockpit rather than just a notepad.

Every channel is effectively a connector. The question is less "can this exist in theory?" and more "which channels feel like first-class parts of the product today?"

## 9. Widgets

Native OS widgets — macOS Notification Center, Windows Widget Board, iOS Lock Screen, Android AOD — are the 2026 equivalent of what browser tabs were in 2016: the workspace bleeding out into the rest of your life.

Most workspaces don't do this yet. Froots is leaning into it early. It's still an emerging category, but it matters because it lets the workspace spill into the rest of your day instead of staying trapped in one window.

## 10. Plugins

Third-party extension. Two models compete:

- **In-process** (Obsidian, Tana) — plugins run in the same sandbox as the app; easy to write, risky to install.
- **Out-of-process** (Froots, Raycast) — plugins run in a sandboxed child process with declared capabilities; harder to write, safer to install.

The convergence point is shared tool protocols. The exact acronyms matter less than the outcome: extensions should be portable, and workspaces should not require one-off plugin ecosystems forever.

## The short recommendation

If you're picking a workspace today, evaluate on these axes:

1. **Vault format is plain markdown.** Non-negotiable.
2. **Agent runtime is swappable.** You should be able to point at a different model or a local runtime without replacing the app.
3. **Memory is readable.** You can open the memory file in any text editor.
4. **At least three inbox channels.** Email is the floor.
5. **Per-agent model routing.** Global-model-only is a 2024 design.
6. **Open sync backend.** You can point sync at storage you control.

If you want one that checks all six today, try [Froots](https://froots.ai). If you want the most mature editor layer standalone, Obsidian is still the answer. If you want a more standalone runtime-led setup, that path still exists too.

The meta-point is: in 2026 you don't have to choose between "AI tool" and "notes tool." The stack has merged. The question is whose version of that merger fits your brain.

[Try Froots free →](/download.html)

## Further reading

- [Automate git worktrees with an agent](/blog/automate-git-worktrees-with-an-agent)
