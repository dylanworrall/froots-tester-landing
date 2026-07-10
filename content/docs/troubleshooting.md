---
title: Troubleshooting & FAQ
description: Quick answers for the most common setup snags, and where to get help.
section: Troubleshooting
order: 1
---

Most first-day problems come down to one of three things: the agent CLI isn't installed, a key isn't set for the endpoint you picked, or the app needs a moment to finish its first update check. Here are the quick answers; if yours isn't here, the [Discord](https://discord.gg/y7cq9A5bYu) is the fastest place to get help from the team.

## "CLI not found" when picking a brain

The Claude and Codex engines drive their official CLIs, which must be on your `PATH`. Run the install command shown in the wizard — `npm install -g @anthropic-ai/claude-code` or `npm install -g @openai/codex` — then log in (`claude`, or `codex login`) and hit **Re-check**. No restart needed. Details in [Model keys](/docs/model-keys).

## macOS says the app can't be opened

Releases from v0.2.0 are Developer-ID signed and notarized, so a fresh download from [GitHub releases](https://github.com/dylanworrall/froots/releases) opens cleanly. If you see a Gatekeeper warning, you're likely on an older build — download the current one.

## Where is my data?

On your machine. Your workspace, memory, conversations, and API keys are stored locally in the app's data directory and never leave your computer unless you turn on [Sync](/docs/sync-and-billing) — and Sync copies are end-to-end encrypted.

## How do updates work?

Froots checks for updates shortly after launch and installs signed releases automatically. You can watch what shipped on the [releases page](https://github.com/dylanworrall/froots/releases).

## Something else is broken

Say so in the [Discord](https://discord.gg/y7cq9A5bYu) — bug reports with a short screen recording get fixed fastest. This page is an outline and will grow into a proper FAQ as questions come in.
