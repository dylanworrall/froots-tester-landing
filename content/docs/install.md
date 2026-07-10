---
title: Install Froots
description: Download the desktop app, open it for the first time, and make sure an agent CLI is available.
section: Get Started
order: 1
---

Froots is a desktop app. It runs on your machine, stores its data on your machine, and is free forever when you bring your own model access.

## Download

Grab the installer for your platform from [GitHub releases](https://github.com/dylanworrall/froots/releases):

- **macOS (Apple silicon)** — [`Froots_0.2.0_aarch64.dmg`](https://github.com/dylanworrall/froots/releases/download/v0.2.0/Froots_0.2.0_aarch64.dmg). The build is Developer-ID signed and notarized, so it opens without a Gatekeeper warning.
- **Windows** — [`Froots_0.2.0_x64-setup.exe`](https://github.com/dylanworrall/froots/releases/download/v0.2.0/Froots_0.2.0_x64-setup.exe)
- **Linux** — [`Froots_0.2.0_amd64.AppImage`](https://github.com/dylanworrall/froots/releases/download/v0.2.0/Froots_0.2.0_amd64.AppImage)

Froots checks for updates a few seconds after launch and updates itself from signed releases — you install once and stay current. macOS is the primary platform today; Windows and Linux builds ship from the same releases.

No account is required. You won't be asked to sign up for anything to start using the app.

## Install an agent CLI

Froots drives real agent harnesses rather than reimplementing one. At least one of these needs to be on your `PATH`:

- **Claude Code** (recommended) — `npm install -g @anthropic-ai/claude-code`, then run `claude` once to log in with your Claude subscription.
- **Codex** — `npm install -g @openai/codex`, then `codex login` with your ChatGPT account.
- **Any OpenAI-compatible endpoint** — no CLI needed; point Froots at local [Ollama](https://ollama.com) or a cloud endpoint with an API key. See [Model keys](/docs/model-keys).

If you skip this, that's fine — the setup wizard detects what's missing, shows you the exact install command, and re-checks without a restart.

## First launch

On first launch Froots opens a short setup wizard: name your agent, pick the brain it runs on, optionally connect Google and GitHub, and choose whether to stay local or turn on Sync. The whole thing takes about two minutes — [First chat](/docs/first-chat) walks through each step.
