---
title: "Froots 0.1 Beta — the first public build"
slug: "beta-0-1-froots"
date: 2026-04-24
author: "The Froots team"
authorRole: "Froots"
category: "Release notes"
excerpt: "Froots is in public beta. A local-first desktop workspace with a markdown editor, a flexible vault, and an agent layer built into the app — honest about what's shipping today and what's still ahead."
tags: ["release", "beta", "launch"]
coverColor: "#B4D92E"
faq:
  - q: "Is Froots ready to be my daily driver?"
    a: "If you write in markdown and you're comfortable using a beta, probably yes. The core workspace is real and usable now. If you need broader device coverage or more collaborative features, you may want to keep Froots alongside your existing setup for a while."
  - q: "What do I need to start?"
    a: "A desktop machine and a model endpoint you already trust. Froots works with the mainstream cloud options as well as local runtimes, and you don't need to create a separate Froots account just to try it."
  - q: "What happens to my data?"
    a: "It stays on your machine unless you deliberately connect it to something else. Froots stores your workspace in plain files you control and keeps local safeguards around configuration and keys."
  - q: "Is there a free tier?"
    a: "Yes. During beta, everything is free if you bring your own model key. Paid plans come later around convenience and collaboration, but trying the product is straightforward."
  - q: "What's the version number and how often will you ship?"
    a: "This is 0.1.0. We're pacing releases by apple variety — this one's nameless; 0.2 is on deck. Point releases weekly for bug fixes, minor versions monthly for features, majors when something substantial lands. The full changelog lives on this blog."
  - q: "Where do I report bugs?"
    a: "For now: email hello@froots.ai with 'beta bug' in the subject, and include your OS + what you were trying to do. We're hiring a community manager specifically for beta triage; once the Discord opens, reports move there."
---

We're in public beta. **Froots 0.1 is shipping today** to anyone who wants to run it — with the caveats that beta implies and the honesty we think they deserve.

This is not a 1.0 announcement with a preloaded marketing engine. It's a real first build of an app we've been working on for a year, enough features shipping that it earns "beta" instead of "alpha," and enough gaps that we want to tell you about them before you install.

## What ships in 0.1

**A local-first markdown workspace.** Your notes are plain `.md` files in a folder you pick. Every save is auto-committed to a local git repo inside the workspace. Nothing is in a proprietary format; if Froots disappeared tomorrow, you'd still have every byte you ever wrote in a format any editor can open.

**A capable block editor.** One writing surface with the things most people actually need:

- Wikilinks, backlinks, and context around related pages
- Clean handling for code, diagrams, tables, and tasks
- A workspace that still feels like writing software, not a pile of panels

**An always-on agent with real memory.** The right pane is an assistant that can read your vault, edit files, use connected integrations, and work with whichever model setup you already prefer. What makes it useful beyond "a chat window in your notes app":

- A small set of editable memory documents that the agent can write back into over time
- Persona files you can open and rewrite yourself if you want the assistant to behave differently
- A curated set of built-in skills for common communication, knowledge, and productivity workflows
- A way to scaffold custom skills when the built-ins do not cover your use case

**Three trust levels.** *Careful* prompts before every tool call. *Balanced* prompts once per session for destructive actions. *Yolo* doesn't prompt. Per-tool scoping lets you allow reads but not writes (or shell, or network) for any agent.

**A unified inbox.** Connect the communication channels you actually use, triage them in one place, and let the agent help summarize or draft when that is useful.

**Native OS widgets.** The workspace can surface small, useful pieces of state outside the main app window instead of forcing everything back into the editor.

**Global hotkey.** You can pull Froots up from anywhere without hunting for the app window.

## What doesn't ship yet

Beta honesty: if one of these is a hard requirement for you, wait for 1.0.

- **Mobile.** iOS and Android apps are in development. No public build yet.
- **Sync.** No first-party multi-device sync in 0.1. Your workspace is local-first today; broader sync comes later.
- **Teams.** Single-user only today. Shared vaults, cross-seat billing, managed cloud hosting — later this year.
- **Routine canvas.** The broader automation story is underway, but the more visual layer is not the main entry point yet.
- **Public plugin SDK.** The internal skill system exists; the public-facing extension story is still being tightened up.
- **Notifications.** In-app and native notifications for memory saves, KB edits, permission requests, and scheduled task completions are planned and partially wired — not on by default.

None of these are vaporware. They're all designed; most are partially implemented. We'd rather ship 0.1 now and close these gaps in the open than keep it in private beta for another six months.

## Under the hood

A few honest architecture notes, since beta users tend to care:

- **Desktop-native feel.** Froots is trying to feel like a real desktop app, not a browser tab in disguise.
- **Local memory and storage.** The product keeps its working context close to the vault instead of hiding it in a remote service.
- **Direct model setup.** You point Froots at the model endpoint you want to use; there is no mystery routing layer in the middle.
- **Inspectable files.** The workspace content remains readable outside the app.
- **Scoped tools.** Agent capabilities are intentionally constrained rather than left wide open by default.

## How to get it

Visit the [downloads page](/download.html) and click your platform. For the duration of the beta, installers are distributed via the waitlist — drop your email and we'll ship a signed build within a business day, along with a beta Discord invite.

The installers are free during beta. Pricing kicks in at 1.0.

## The shape of the next few releases

- **Near-term releases** focus on inbox polish, onboarding, and making the memory layer easier to understand.
- **After that** come broader device support, a more visible automation layer, and a cleaner extension story.
- **The road to 1.0** is mostly about rounding out sync, collaboration, and the edges around the core workspace.

## Why we're doing this

Because the note-taking apps we love don't have agents, and the agent apps we love don't have editors. Because markdown is the right format and nobody should take it from you. Because a workspace that keeps memory across sessions starts to feel like a second brain about six weeks in, and most of us have been waiting for that for a decade.

0.1 is where we start. Thank you for trying it.

— The Froots team
