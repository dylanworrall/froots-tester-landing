---
title: "Why we keep re-reading Christopher Alexander"
slug: "library-christopher-alexander"
coverImage: "/froots-art-10.jpg"
date: 2026-02-14
author: "Priya Menon"
authorRole: "Product Engineer · Froots"
category: "Library"
excerpt: "Christopher Alexander wrote about buildings, but he built the vocabulary we use to make software. We've re-read 'A Pattern Language' every winter since 2021. Here's what we take from it — and why his last book is the one we come back to."
tags: ["library", "architecture", "design"]
coverColor: "#F6C849"
---

We have a tradition at Froots: every January, whoever designed the biggest thing the previous year re-reads Christopher Alexander. Most of the team has now done it at least twice. My year was 2024 and I re-read it again two weeks ago, so here's a short note on why.

Alexander was an architect — buildings, towns, bridges — and the only architect whose vocabulary survived the move to software. "Design patterns" in the Gang of Four sense is Alexander's term, borrowed. "The architecture of a system" is Alexander's phrase. If you've ever typed the words *"living structure"* into a slack without explaining them, that's Alexander too.

The canonical book is *A Pattern Language* (1977). It's a catalog of 253 patterns you can combine to make a good building, or a good neighborhood, or a good town. What's remarkable about it is that **each pattern is a sentence-length problem followed by a sentence-length solution**, and you can read any one of them on its own. It is the book that most clearly formatted what a "design pattern" should look like. We lifted its structure wholesale when we first sketched the Routines compiler — every routine is a pattern, every pattern is a sentence.

The deeper book, though, is *The Nature of Order* (2002–2004), his four-volume late-career argument about what makes things *alive*. It's too long for most people to finish, so the honest recommendation is: read the first volume, *The Phenomenon of Life*. Specifically chapters 5 and 6, on the fifteen fundamental properties — levels of scale, strong centers, boundaries, alternating repetition, positive space, good shape, local symmetries, deep interlock and ambiguity, contrast, gradients, roughness, echoes, the void, inner calm, and not-separateness.

If those words sound mystical, that's because Alexander was flirting with mysticism by that point. But the properties themselves are operational. You can look at a piece of UI, walk through them, and say which are strong and which are missing. Any time we've sat down to evaluate a Froots screen and asked "why does this feel dead," the answer has come from this list.

What we take from him, operationally, in building software:

1. **Pattern over feature.** Don't ship "feature X"; ship a pattern that can be combined. Routines, widgets, agents — they're all patterns, not features.
2. **Wholeness over composability.** You can compose dead parts and get a dead whole. The fifteen properties are about preserving life under composition.
3. **Sentences are the unit of design.** If you can describe your feature in one sentence, you've understood it. If you need three, you're still designing.

Alexander thought buildings, not apps. But the real lineage of what we're trying to do runs through him. Re-read him once a year if you can.

*Shelved in: Library → Architecture & design*
