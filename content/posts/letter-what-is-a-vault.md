---
title: "What do you mean by 'vault,' exactly?"
slug: "letter-what-is-a-vault"
date: 2026-02-24
author: "The Froots editors"
authorRole: "Froots"
category: "Letter"
excerpt: "A reader in Oakland asks what the difference is between a vault, a workspace, and a folder. Short answer: a vault is a folder you've told Froots is the folder."
tags: ["letters", "vault", "glossary"]
coverColor: "#F2873A"
---

> **L. D., Oakland writes:** I've read the docs twice. I still don't understand what a "vault" is. Is it a folder? Is it a database? Can I have more than one? Why not just call it a folder?

Fair. Glossary question, honest confusion, our fault for not being clearer.

A **vault** is a folder you've told Froots is the folder. Functionally it's just a directory on your disk — `~/Froots` by default, but it can be anywhere: Dropbox, iCloud, a USB stick, a network drive. Inside it are your notes (`.md` files), your routines (`.routine.md` files), your agent identities, and a few dotfiles Froots uses to keep things in order. That's it. You can open a vault in TextEdit or VS Code or `cat`. Nothing is hidden in a database.

**Why we call it a vault instead of a folder:**

1. **A vault has a scope.** Agents, routines, and memory are bounded by the vault they live in. Open a different vault and you get a different set of agents, with different tools, looking at different notes. That's a useful mental model — "my work vault is different from my journal vault" — that "folder" doesn't carry.
2. **A vault is indexed.** Froots maintains a search index, a backlink graph, and an embedding store scoped to the vault. Those are regenerated if you move the vault; they're not baked in. But treating the folder *as* an index is conceptually different from "just a folder."
3. **Plural.** You can have more than one. Pick a different vault with `File → Open Vault…` or by pointing at a different folder at launch.

**What a vault is *not*:**

- Not a database. There's no binary file you can't read.
- Not a project. Projects, tags, and folders are still things *inside* your vault.
- Not proprietary. Open your vault folder in Obsidian tomorrow and most things work — markdown, wikilinks, tags, frontmatter, daily notes. The reverse is also true.

So: vault = the folder you've named as the root of a notes ecosystem, and the scope within which your agents, routines, and search operate. Nothing fancier than that.

— The editors
