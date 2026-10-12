---
title: Agent runtimes
description: Which agent CLIs Froots runs, how they sign in, and how to pick one per agent.
section: Get Started
order: 2
---

Froots doesn't ask for model keys. Every agent runs on an agent CLI (Froots calls them runtimes, or harnesses), and each CLI signs in on its own: your Claude subscription, `codex login`, and so on. Froots launches the CLI and drives it. Change your mind any time, per agent.

## The runtimes

Four ship built in and always show in **Settings → Agents**:

- **Claude Code** — install it (`npm install -g @anthropic-ai/claude-code`), run `claude` once, and sign in.
- **Codex** — install it (`npm install -g @openai/codex`) and run `codex login`.
- **Gemini CLI** — runs through `gemini --acp`. Sign in through the CLI itself.
- **Goose** — runs through `goose acp`.

More are in the **Add runtimes** catalog: **Amp**, **Cursor**, **Grok Build**, **Hermes Agent** (`hermes acp`; run `hermes model` once to pick a provider), **Kilo Code**, **Kimi Code**, **Oh My Pi**, and **OpenCode**. **OpenClaw** is listed too, but it doesn't work yet.

A runtime that isn't installed stays out of the model pickers. It still shows in Add runtimes, with its setup guide. On Mac and Linux, runtimes with a one-line installer also get an **Install** button that shows the exact command before it runs. Once the CLI is on your `PATH`, it shows up everywhere.

Running something else? **Add runtimes → Custom harness** takes a command, its arguments, and any environment variables. It works with anything that speaks the Agent Client Protocol (ACP).

## Signing in

Froots never holds your model login. The CLI does. If a runtime isn't signed in, your message fails with a notice like:

> Claude Code isn't signed in. Open a terminal, run `claude` and sign in, then send your message again.

Do that, then hit **Retry**.

Want an API key or a local model instead of a subscription? Set it up in the runtime itself. OpenCode, Kilo Code, Goose, and Hermes Agent each let you choose a provider, and Froots uses whatever the CLI is configured for.

## Choosing a runtime and model

- **During setup** — the "Choose your default harness" step sets the runtime your first agent uses.
- **In a chat** — in a one-on-one chat with your agent, the picker in the top-right switches runtime and model for that agent.
- **Per agent** — right-click an agent, choose **Edit agent**, and open **Models**. You can set the runtime, the model, and how hard it thinks. The same tab holds **Where this agent runs** (see below).

Models come live from each runtime, so new ones appear as soon as the CLI knows about them.

## Where this agent runs

If you use Froots on more than one computer, each agent answers from one place:

- **Follow me** — it answers on whichever device you message it from. Files it makes stay on that device.
- **A specific device** — it always answers from that machine. If that machine is off, another one of yours stands in until it's back.

Your other devices show up in the list once they're running a current version of Froots.

## Mixing runtimes

Nothing forces one runtime on everything. A common setup is Claude Code for long coding runs, Codex for a second opinion, and an open-source runtime pointed at a local model for private work. Each agent carries its own runtime and model.
