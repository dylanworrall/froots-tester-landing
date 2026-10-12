---
title: Memory
description: How Froots keeps your agents oriented — a local, searchable record of everything they've seen and done.
section: Memory
order: 1
---

Memory is Froots' answer to the goldfish problem. Each agent keeps three markdown files, `context.md`, `decisions.md`, and `learnings.md`, plus anything else it writes into its `memory/` or `kb/` folders. Froots indexes those files on your machine. When you send a message, it pulls the most relevant pieces into the agent's context automatically, so an agent that wakes up Monday already knows what you were working on Friday. Agents can also search memory on purpose, and you can read and edit everything it holds.

## Where to find it

Right-click an agent, choose **Edit agent**, and open **Memories**. The three core files sit at the top. Click one to edit it like any other note. **Indexed memories** below them lets you search what the agent has stored.

Each agent has its own memory. Edit `context.md` when you want an agent to know something without re-explaining it. The next message picks it up.

This page is an outline — the full guide is being written. It will cover:

- What gets written to memory, and when
- How retrieval picks what an agent sees
- Browsing, editing, and pruning memories
- Backing up and exporting

In the meantime, the [Memory](/memory) page has the technical version.
