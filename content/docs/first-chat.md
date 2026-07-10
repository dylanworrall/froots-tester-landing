---
title: Your first chat
description: The two-minute setup wizard, step by step, and how to start putting your agent to work.
section: Get Started
order: 3
---

The first time Froots opens, it runs a short setup wizard inside the main window. Here's what each step does — and what happens right after.

## The setup wizard

1. **Welcome** — "Own your agents." One button: **Get Started**.
2. **A quick tour** — three quick slides on what Froots is: agents that do the work, one workspace for everything, ship from the same window.
3. **Meet your agent** — name your first agent (default: "Froots") and pick a role: Assistant, Writer, Researcher, Coder, or Productivity. The role seeds what it offers to help with first.
4. **Give your agent a brain** — pick the engine: **Claude** (recommended, uses your Claude subscription), **Codex** (uses your ChatGPT subscription), or **Custom** (any OpenAI-compatible endpoint, including local Ollama). If the CLI for Claude or Codex isn't installed, the step shows the exact install command and a **Re-check** button. Details in [Model keys](/docs/model-keys).
5. **Connect your accounts** — optionally connect **Google** (mail and calendar) and **GitHub** (PR review and pushing from the Dev tab). Both are skippable and can be added later in Settings → Accounts.
6. **Sync** — choose **Stay local** (the default: everything on this machine) or **Turn on Sync** (an encrypted cloud copy for multiple devices). See [Sync & billing](/docs/sync-and-billing).
7. **Your tabs** — toggle which workspace tabs you want visible. Files is always on.
8. **Default browser** *(macOS, packaged builds)* — optionally make Froots your default browser so links open in the workspace. Skippable.
9. **Done** — "*Your agent* is ready." Click **Start using Froots**.

## Starting the conversation

After setup you land in the main shell. Three ways in:

- Press the global summon hotkey — **⌘⇧Space** by default — from anywhere, even with Froots in the background. It focuses the chat composer.
- Press **⌘K** for the command bar.
- Or just click into Conversations and type.

Ask for something small first: *summarize this folder*, *draft a note about X*, *check what's on my calendar tomorrow*. Watching a small task end-to-end is the fastest way to build a feel for what the agent can do.

## What you'll see during a run

Froots shows the run as it happens: every tool call, file edit, and step in a timeline you can inspect. The model chip in the composer shows which brain is active — click it to swap models for the conversation. Once small tasks feel trustworthy, hand over bigger ones, or schedule them to run on their own with [Routines](/docs/routines).
