---
title: Troubleshooting & FAQ
description: Quick answers for the most common setup snags, and where to get help.
section: Troubleshooting
order: 1
---

Most first-day problems come down to one of three things: no agent CLI installed, a CLI that isn't signed in, or an agent answering from a different computer than you expect. Here are the quick answers. If yours isn't here, the [Discord](https://discord.gg/y7cq9A5bYu) is the fastest place to get help from the team.

## Setup won't let me continue past "Choose your default harness"

Setup needs at least one agent CLI installed. Pick one, follow its setup line, and hit **Check again**. The green dot means it's ready. No restart needed. Install commands are in [Install Froots](/docs/install).

## "isn't signed in" when I send a message

The CLI is installed but not logged in. The notice tells you which command to run, for example:

> Claude Code isn't signed in. Open a terminal, run `claude` and sign in, then send your message again.

Run it, sign in, then hit **Retry** on the failed message. Froots never handles your model login. The CLI does. More in [Agent runtimes](/docs/model-keys).

## A runtime is missing from the model picker

Pickers only list runtimes that are installed on this machine. Open **Settings → Agents → Add runtimes** to see the rest, with setup guides. Once the CLI is on your `PATH`, it appears.

## The first message takes a long time

Claude Code and Codex connect through a small adapter that Froots downloads with `npx` the first time. Make sure Node.js is installed. After the first run it starts from the local cache.

## A message failed

Failed turns show a notice in the chat with the reason and a **Retry** button. If the reason mentions a device name, the agent tried to answer from that computer. See the next question.

## My agent answers from the wrong computer

If you run Froots on more than one machine, each agent answers from one place. Right-click the agent, choose **Edit agent → Models**, and set **Where this agent runs**. **Follow me** answers on whichever device you message it from. Picking a device makes that machine answer every time, with another of yours standing in while it's off. If the device you picked doesn't have the CLI signed in, messages fail there, so pick one that does.

## macOS says the app can't be opened

Current releases are Developer-ID signed and notarized, so a fresh download from [GitHub releases](https://github.com/dylanworrall/froots/releases) opens cleanly. Drag Froots into Applications and open it from there. If you still see a warning, you're likely on an old build. Download the current one.

## Windows SmartScreen warns about the installer

The Windows installer isn't code-signed right now. Click **More info → Run anyway**.

## Where is my data?

On your machine. Your agents, memory, routines, and local notes are stored in the app's data directory. Messages with friends and agents travel over the Froots relay. Your identity key never leaves your computer. Back it up from **Settings → Profile**. Without it there's no way to recover the account. See [Relay & pricing](/docs/sync-and-billing).

## How do updates work?

Froots checks for updates shortly after launch. When there's a new release it asks, then downloads, verifies, and relaunches. You can see what shipped on the [releases page](https://github.com/dylanworrall/froots/releases).

## Something else is broken

Say so in the [Discord](https://discord.gg/y7cq9A5bYu). Bug reports with a short screen recording get fixed fastest. This page is an outline and will grow into a proper FAQ as questions come in.
