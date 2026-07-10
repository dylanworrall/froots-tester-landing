---
title: "Automate git worktrees with an AI agent (full guide)"
slug: "automate-git-worktrees-with-an-agent"
coverImage: "/froots-art-3.jpg"
date: 2026-04-10
author: "Marcus Huang"
authorRole: "Infra lead · Froots"
category: "Tutorial"
excerpt: "Git worktrees are underused because the ergonomics are mediocre. An AI agent fixes that. This is a 15-minute guide to spinning up, managing, and cleaning up worktrees automatically — using Froots routines or any shell-capable agent runtime."
tags: ["tutorial", "git", "workflow", "agents"]
coverColor: "#E64B3F"
faq:
  - q: "What is a git worktree?"
    a: "A git worktree is a separate working directory attached to the same git repository. Instead of stashing or switching branches in one checkout, you check out each branch in its own folder. This lets you run tests on main while editing on a feature branch, or keep three in-progress PRs alive simultaneously without constant context switching."
  - q: "Why automate worktrees with an agent?"
    a: "Because the mechanics are repetitive. An agent can take one sentence and handle the setup steps for you, including the little bits you usually forget."
  - q: "Does this need a local model, or can I use a cloud model?"
    a: "Either. This is a straightforward enough workflow that both cloud and local setups can handle it."
  - q: "Is this safe?"
    a: "Worktrees themselves are safe. The real risk is letting an agent run commands for you, so keep approvals on for anything destructive."
  - q: "What if I use Codespaces or a devcontainer?"
    a: "This pattern is the devcontainer you already have, minus Docker. If you already live in Codespaces, skip this guide — you're getting similar isolation at the cost of network-dependent startup. Worktrees give you Codespaces-like isolation, locally, instantly."
---

A **git worktree** is the most underrated feature in git. It lets you check out more than one branch of the same repo in more than one directory, all sharing a single `.git`. You can have `main` building in one folder, a feature branch open in your editor in another, and a hotfix compiling in a third — at the same time, with no stashing.

Nobody uses them because the CLI is friction. This post fixes that.

## The problem

Your reviewer asked you to tweak PR #1234 "quickly." Meanwhile, you're elbow-deep in a different feature branch. Without worktrees, you stash, switch, fix, push, switch back, pop. Six commands, ten minutes of context damage.

With worktrees, you just open a new folder. In practice that still means the same small sequence every time: fetch the branch, create the worktree, install what the project needs, and open the folder. Repeating that by hand is exactly the sort of friction people avoid.

## The agent fix

An AI agent with shell access turns the above into one sentence:

> *Start a worktree for PR 1234, install deps, and open it in my editor.*

If you're using [Froots](https://froots.ai), you can turn that sentence into a reusable routine. A moment later you have a fresh folder, the project prepared, and the right editor window open.

Here's how to set that up.

## Step 1 — Give the agent shell access

In Froots, make sure the agent is allowed to run shell commands. Keep approvals on for destructive actions. The point is convenience, not blind trust.

If you want zero prompts, you can do that too, but most people should leave a checkpoint in place.

## Step 2 — Teach the agent your conventions

Every repo has its own quirks. The better you describe your conventions, the less the agent has to guess. Tell it which package manager you use, where you like worktrees to live, what should happen after creation, and how cleanup should work. Shared conventions can live in the repo; personal preferences can stay local.

## Step 3 — The actual routines

You'll want four of these. Build them once, use them forever. Each is one sentence in the compiler.

### Start a worktree for an issue

> When I say "worktree for #{issue}", fetch the branch, create a worktree at `~/work/<repo>-<branch>/`, copy `.env.local` over, run `pnpm install`, pick an unused port, and open the folder in Cursor.

Typical sequence:

- Fetch the branch
- Create the worktree in your preferred location
- Copy over any local environment setup you rely on
- Install dependencies
- Pick a sane port or local config if needed
- Open the folder in your editor
- Optionally notify your team

### Start a worktree for a PR

> When I say "worktree for PR {number}", fetch the PR ref, create a worktree, install deps, and open it in Cursor.

Same graph, substitutes `pull/#{n}/head:pr-#{n}` for the fetch step.

### List active worktrees

> When I say "show my worktrees", run `git worktree list` in every repo under `~/work/`, format the result as a table, and announce it in the editor.

This one's handy on Monday mornings. The agent scans your worktree folders and gives you a clean summary of what is still open.

### Clean up stale worktrees

> On the first weekday of the month, find all worktrees whose branch has been merged to main, and offer to remove them.

This one's a cron routine. Clem runs it Monday at 10am, gathers candidates, and pings you in the inbox with a "remove these four?" message. You pick the ones to delete; Clem runs `git worktree remove` and `git branch -D`. Your `~/work/` stays clean without you ever thinking about it.

## The same idea without Froots

If you're not on Froots yet, you can still capture the same workflow in a shell alias or a small script. It will cover most of the setup path, just with less context and fewer niceties around follow-up steps.

## Why this matters for AI-assisted dev

Worktrees are, secretly, the ideal unit of work for an AI coding agent. Claude / Cursor / whatever-you-use can happily work on `~/work/myrepo-issue-1234/` in parallel with you editing `~/work/myrepo-main/`. No merge conflicts, no stash dance, no "which branch am I on again." When you want the agent to review a PR, you give it the worktree path. When it's done, you remove the worktree.

You get the isolation you want without turning every small branch into a bigger environment decision.

## Troubleshooting

**"That branch is already checked out"** — you already have a worktree for that ref. Find the existing one first before creating another.

**Local env setup is missing** — make sure the copy step happens before dependency install or first run. The order matters.

**The editor opens but the project is half-prepared** — that usually means your install step or local setup step was too thin. Tighten the routine rather than memorizing the fix every time.

## Recap

Worktrees are good. Worktrees with one-sentence ergonomics are better. An agent that understands your repo conventions, runs the commands, allocates the port, opens the editor, and pings your team is the whole package.

If you want this set up in your workspace quickly, Froots's routine compiler is the shortest path. If you already have another agent runtime you like, the same pattern still holds — the real value is turning a repetitive setup ritual into one plain-English request.

[Try Froots free →](/download.html)

## Related

- [The local-first AI workspace stack, 2026](/blog/local-first-ai-workspace-2026)
