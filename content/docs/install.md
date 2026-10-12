---
title: Install Froots
description: Download the desktop app, install an agent CLI, and open it for the first time.
section: Get Started
order: 1
---

Froots is a desktop app. It runs on your machine and keeps its data on your machine. Your agents run on the agent CLIs you already use, so there are no model keys to hand over.

## Download

Grab the installer for your platform from [GitHub releases](https://github.com/dylanworrall/froots/releases):

- **macOS (Apple silicon)** — [`Froots_0.3.23_aarch64.dmg`](https://github.com/dylanworrall/froots/releases/download/v0.3.23/Froots_0.3.23_aarch64.dmg). Developer-ID signed and notarized, so it opens without a Gatekeeper warning. There is no Intel Mac build.
- **Windows (x64)** — [`Froots_0.3.23_x64-setup.exe`](https://github.com/dylanworrall/froots/releases/download/v0.3.23/Froots_0.3.23_x64-setup.exe), or the [`.msi`](https://github.com/dylanworrall/froots/releases/download/v0.3.23/Froots_0.3.23_x64_en-US.msi). The installer isn't code-signed right now, so SmartScreen may warn. Click **More info → Run anyway**.
- **Linux (x86_64)** — [`Froots_0.3.23_amd64.AppImage`](https://github.com/dylanworrall/froots/releases/download/v0.3.23/Froots_0.3.23_amd64.AppImage), or the [`.deb`](https://github.com/dylanworrall/froots/releases/download/v0.3.23/Froots_0.3.23_amd64.deb) / [`.rpm`](https://github.com/dylanworrall/froots/releases/download/v0.3.23/Froots-0.3.23-1.x86_64.rpm). For the AppImage, run `chmod +x Froots_*.AppImage` and then open it.

Froots checks for updates a few seconds after launch. When a new release is out it asks first, then downloads it, verifies the signature, and relaunches. You install once and stay current.

There's no mobile app yet.

No email or password is required. On first launch Froots creates an identity key on your machine, and that key is your account.

## Install an agent CLI

Froots drives real agent CLIs rather than reimplementing one. Setup won't continue until at least one is installed. Pick whichever you already pay for:

- **Claude Code** — `npm install -g @anthropic-ai/claude-code`, then run `claude` once and sign in.
- **Codex** — `npm install -g @openai/codex`, then `codex login` with your ChatGPT account.
- **Gemini CLI** — `npm install -g @google/gemini-cli`, then run `gemini` once and sign in.
- **Goose**, **Kilo Code**, **OpenCode**, **Hermes Agent**, **Amp**, **Cursor**, **Grok Build**, **Kimi Code**, and **Oh My Pi** work too. Each one's setup guide is linked from **Settings → Agents → Add runtimes**. OpenClaw is listed there as well, but it doesn't work yet.

Claude Code and Codex connect through a small adapter that Froots fetches with `npx`, so you need Node.js installed. On a fresh machine the first message can take a minute while the adapter downloads.

If you install a CLI while setup is open, hit **Check again**. No restart needed. More in [Agent runtimes](/docs/model-keys).

## First launch

On first launch Froots runs a short setup. You create your identity key and back it up, pick your default harness, set your name and picture, meet your first agent, and optionally connect Google and GitHub. It takes a couple of minutes. [Your first chat](/docs/first-chat) walks through each step.
