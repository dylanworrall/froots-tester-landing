export interface FeatureDoc {
  slug: "memory" | "routines" | "skills";
  title: string;
  tagline: string;
  tag: string;
  accent: string;
  video?: string;
  poster?: string;
  body: string[];
}

export const features: Record<FeatureDoc["slug"], FeatureDoc> = {
  memory: {
    slug: "memory",
    title: "Memory",
    tagline:
      "A semantic search index over the notes your agent writes. Three living markdown files plus a vector store, all local to your machine.",
    tag: "Product · Memory",
    accent: "#D7EFD3",
    poster: "/onbw-brain.jpg",
    body: [
      "## What it is",
      "Memory in Froots is two things working together: **three core markdown files** that hold the working state of the agent, and a **semantic vector index** over every other note the agent writes. Both live on your machine.",
      "The three files are `context.md` (what you&rsquo;re working on right now), `decisions.md` (choices made and the reasoning behind them), and `learnings.md` (mistakes worth remembering). The agent reads and edits them like any other file. They&rsquo;re plain markdown — you can open them in any editor.",
      "Everything else the agent writes into `workspace/memory/` or `workspace/kb/` gets automatically chunked, embedded, and indexed so it can be retrieved by similarity later.",
      "@stats\n384 | dimensions per embedding (BGE-small) | green\n0.45 | minimum cosine similarity to surface | blue\n8 | results retrieved per turn (configurable) | pink",
      "## How retrieval works",
      "When you send a prompt, Froots embeds your message and scores it against every chunk in the agent&rsquo;s memory store by cosine similarity. The store is a local SQLite-compatible database with a 384-dim `F32_BLOB` column per chunk.",
      "Froots takes a short list of the closest matches above the similarity threshold, reranks it with a small local cross-encoder that reads your message and each chunk together, and injects the top results into the prompt as a markdown context block before the model runs. The threshold and the result count live in **Settings → Advanced**.",
      "| Layer | What it does | Where it lives |\n| --- | --- | --- |\n| Core files | Hand-edited working state — context, decisions, learnings | `workspace/memory/*.md` |\n| Indexed notes | Automatic semantic recall over everything else the agent writes | The agent&rsquo;s local database |\n| Active prompt | Top-K snippets injected per turn | System prompt |",
      "> [database green] **Local by default.** Each agent&rsquo;s memory database sits in the app&rsquo;s data folder on your machine, next to its markdown files.",
      "## How writes happen",
      "Memory writes are **file-driven**, not turn-driven. The agent edits a markdown file in the workspace. A file-watcher notices the change and runs the indexer: it splits the file into chunks that never cross a heading, prefixes each with the document title and heading path so a retrieved fragment says what it&rsquo;s about, embeds the chunks, and updates the `memories` table.",
      "Each row stores the chunk text, its embedding, the source file path, a category, and bookkeeping timestamps (`created_at`, `last_retrieved`, `retrieval_count`). The **Memories** tab in each agent&rsquo;s settings shows recent memories, filters by category, and searches the index.",
      "> [check blue] **You see every write.** Memories are markdown files you can edit, diff, and version-control. There&rsquo;s no hidden internal state — if it&rsquo;s in memory, it&rsquo;s in a file you can open.",
      "## What it isn&rsquo;t (yet)",
      "Memory is ranked by relevance alone — similarity, then the reranker. Recency, retrieval frequency, and supersession (where a new decision replaces an old one) are tracked in the schema but don&rsquo;t yet affect ranking. There&rsquo;s no memory shared between people.",
      "## What you can do with it",
      "- **Resume threads.** Ask &ldquo;what was I doing with the API rewrite last month?&rdquo; — the index surfaces the decisions and notes that mention it.",
      "- **Hand-curate the core.** Edit `context.md` directly when you want the agent to know something without re-explaining it. The next turn picks it up.",
      "- **Search on purpose.** Besides the automatic recall on every turn, agents can search their memory explicitly when they need to dig.",
    ],
  },
  routines: {
    slug: "routines",
    title: "Routines",
    tagline:
      "A scheduler for your agent. Cron, daily, weekly, interval, or one-shot — running the same agent loop as chat, on a clock.",
    tag: "Product · Routines",
    accent: "#5191F8",
    poster: "/onbw-built.jpg",
    body: [
      "## What it is",
      "A routine is a saved prompt plus a schedule. When the schedule fires, Froots spawns a new session, hands the prompt to your default runtime (Claude Code, Codex, or any other harness you have installed), and lets the agent run with the same tools, memory, and skills it would have in chat.",
      "The scheduler is a Tokio task on the Rust side that polls every 30 seconds. Routines persist as `ScheduledTask` rows in the local database, so a quit-and-relaunch picks up exactly where it left off.",
      "## Schedule types",
      "Five trigger shapes cover essentially every cadence:",
      "| Type | Payload | Example |\n| --- | --- | --- |\n| `Once` | A single timestamp | Run at 3pm tomorrow |\n| `Interval` | Minutes between runs | Every 30 minutes |\n| `Daily` | `HH:MM` | Every day at 08:00 |\n| `Weekly` | Day + optional time | Mondays at 09:00 |\n| `Cron` | Full POSIX cron expression | `0 9 * * 1-5` |",
      "Next-run timestamps are computed deterministically, so you can see exactly when a routine will fire next without waiting for it.",
      "> [clock blue] **Cron when you need it.** The `Cron` type accepts full POSIX cron expressions via the `cron` crate. Everything else is sugar on top of the same scheduler.",
      "## What ships in the box",
      "Froots ships **about seventy-five preset templates** in the routines library — morning brief, weekly wrap-up, inbox digest, PR review, home and health nudges, and more. Presets are not auto-installed: you pick one, edit the prompt, set a schedule, and save. The only routines present on first launch are a few built-in background jobs, and they arrive switched off.",
      "This is intentional. We&rsquo;ve found that defaults nobody asked for get ignored, but presets you actively choose stick around.",
      "## Example routines people set up",
      "These are the kinds of routines people set up, written out to show what an actual routine looks like.",
      "> [calendar blue] **Morning briefing** — Daily at 07:30. _&ldquo;Read my calendar for today, check Linear for tickets assigned to me, scan my inbox for overnight mail from a person (not a newsletter), and write a five-line briefing to `memory/today.md`.&rdquo;_",
      "> [check green] **Weekly retro** — Fridays at 16:30. _&ldquo;Pull this week&rsquo;s notes from `workspace/`, group them into wins / unsolved / next-week, and append a section to `workspace/retros/{date}.md`.&rdquo;_",
      "> [graph pink] **Market pulse** — Every 4 hours during market hours, cron `0 9-16/4 * * 1-5`. _&ldquo;Check the tickers in `memory/watchlist.md`, summarize anything that moved more than 3%, and only notify me if something crossed a level I&rsquo;ve flagged.&rdquo;_",
      "> [zap blue] **Inbox triage** — Every 30 minutes via `Interval`. _&ldquo;Read new messages in my inbox, draft replies for anything that&rsquo;s clearly mine, and queue them for review. Don&rsquo;t send.&rdquo;_",
      "> [lightbulb green] **Sunday planner** — Sundays at 19:00. _&ldquo;Look at next week&rsquo;s calendar, the open items in `memory/decisions.md`, and the notes I starred this week. Draft a one-page plan into `workspace/plans/next-week.md`.&rdquo;_",
      "Each one is just a prompt plus a schedule. They use whatever skills are enabled on the assistant — `github` for the retro, `browser-automation` for market pulse, your mail skill for triage — and they read and write the same memory files you do.",
      "## Heartbeat",
      "Each assistant has an optional **heartbeat** — a recurring background session that runs on its own cadence (configurable between 15 minutes and 2 hours). It&rsquo;s off by default; you turn it on per-assistant.",
      "When the heartbeat fires, it runs a meta-prompt asking the agent to (a) review and maintain `memory/context.md`, and (b) decide whether anything in the world right now is worth surfacing unprompted. If yes, the agent calls `notify_user(title, body)` and Froots fires a desktop notification. If no, the session exits silently — but the agent&rsquo;s reasoning is saved as `last_response` so you can see what it considered.",
      "> [zap blue] **Proactive, not noisy.** Heartbeat is the only piece of Froots that pings you without being asked. It runs the same agent with the same memory, then trusts its own judgment about whether to interrupt you.",
      "## Execution path",
      "When a routine fires, it runs on your default runtime over the same Agent Client Protocol connection chat uses, with a time cap so a stuck run can&rsquo;t hang the scheduler. The same agent tools — `agent_read_doc`, `agent_write_doc`, `agent_edit_doc`, the browser tools when enabled — are available. If you run Froots on more than one machine, each occurrence fires on exactly one of them.",
      "Routines aren&rsquo;t a separate runtime. They&rsquo;re chat sessions on a timer.",
      "## What it isn&rsquo;t (yet)",
      "There&rsquo;s no built-in &ldquo;routine chaining&rdquo; (where one routine triggers another) and no multi-step workflow runtime — the `steps` and `edges` fields exist on the schema but the agent-side runtime for branching workflows is still in progress. For now, routines are single prompts; complex flows live inside the prompt itself.",
    ],
  },
  skills: {
    slug: "skills",
    title: "Skills",
    tagline:
      "Folders with a SKILL.md inside. Drop one in the skills directory and the model knows how to use it.",
    tag: "Product · Skills",
    accent: "#FBD9DA",
    poster: "/onbw-jellyfish.jpg",
    body: [
      "## What it is",
      "A skill is a folder. Inside it, a `SKILL.md` file with YAML frontmatter (name, description, optional binary/env requirements) and markdown instructions. Optionally, a `scripts/`, `references/`, or `assets/` directory next to it.",
      "On startup, Froots scans two locations — the `skills/` directory bundled with the app and your own skills directory at `~/.motive-x/pi/agent/skills/` — and discovers everything it finds. Each enabled, eligible skill contributes its `name` and `description` to a `<skills>` section in the system prompt.",
      "> [wrench pink] **Prompt-fragments, not tool registries.** A skill primes the model with domain knowledge and a description of when to use it. Tools (browser, file editing) are registered separately and gated independently.",
      "## What ships",
      "Ninety skills ship with the app, plus three hardcoded system skills that are always present:",
      "@stats\n90 | bundled skills | pink\n3 | hardcoded system skills | green\n0 | required to start (everything is optional) | blue",
      "The three hardcoded system skills are `safe-file-deletion` (cannot be disabled — enforces a confirm step on destructive file ops), `browser-automation` (gated on the `agent-browser` binary), and `openui` (generative UI scaffolding).",
      "## A sampler from the catalog",
      "A slice of what&rsquo;s in the bundled `skills/` directory, grouped by what people tend to reach for:",
      "| Skill | What it does |\n| --- | --- |\n| `github` | Read, comment, and ship PRs via the `gh` CLI |\n| `obsidian` | Read and edit your Obsidian vault as if it were your second brain |\n| `notion` | Pull pages, append blocks, search databases |\n| `slack` | Read channels, post messages, react to threads |\n| `signal` / `telegram` / `imsg` | Send and read messages on each platform |\n| `apple-notes` / `bear-notes` / `things-mac` | Native Apple-stack note and task capture |",
      "| Skill | What it does |\n| --- | --- |\n| `browser-automation` | Hand a multi-step web task to an autonomous browser agent — navigate, click, type, fill forms |\n| `summarize` | Condense long documents or transcripts |\n| `openai-whisper` / `openai-whisper-api` | Transcribe audio locally or via API |\n| `nano-banana-pro` / `openai-image-gen` | Generate images |\n| `blender` | Drive Blender from the agent for 3D work |\n| `image-to-3d` / `web-export-3d` | Turn images into 3D scenes and export them |",
      "| Skill | What it does |\n| --- | --- |\n| `1password` | Look up secrets without leaking them into prompts |\n| `spotify-player` / `sonoscli` | Control music and speakers |\n| `openhue` / `wyze` | Smart-home lights and cameras |\n| `weather` | Current conditions and forecasts |\n| `food-order` / `local-places` / `goplaces` | Real-world search and ordering |\n| `skill-creator` | Scaffold and package new skills from inside the agent |",
      "> [sparkles pink] **`skill-creator` is the meta one.** Ask the agent to add a new skill and it uses `skill-creator` to scaffold the folder, fill in the frontmatter, and drop instructions into `SKILL.md` for you.",
      "## Eligibility and activation",
      "When Froots discovers a skill, it runs an eligibility check based on the frontmatter — OS match, required binaries on PATH, required environment variables. Ineligible skills auto-disable; eligible ones are toggleable per agent under **Edit agent → Skills**.",
      "| Step | Where in code |\n| --- | --- |\n| Discovery | `SkillManager::discover()` walks the bundled and user skill directories |\n| Eligibility | `evaluate_eligibility()` checks OS, binaries, env vars |\n| State | `skills-state.json` tracks disabled list per assistant |\n| Prompt build | `generate_system_prompt()` lists every enabled+eligible skill |",
      "Toggling a skill off drops it from the agent&rsquo;s `<skills>` list, so it&rsquo;s no longer in the prompt on the next run. The model stops being told it knows that capability.",
      "## How the model picks one",
      "There are **no keyword triggers**. No regex matches, no &ldquo;activate when user mentions X.&rdquo; Activation is purely semantic: the model sees the list of enabled skills with their one-line descriptions, and decides which apply to your request.",
      "The skill-creator guidance is explicit about this: descriptions should name both *what* the skill does and *when* to use it, because that&rsquo;s the only signal the model gets. A skill description like &ldquo;Search the web and cite sources&rdquo; works; &ldquo;Web stuff&rdquo; does not.",
      "## Three flavors",
      "The system actually exposes three related concepts under one tab:",
      "- **Skill.** A `SKILL.md`-based prompt fragment. The bundled ones are all this kind.",
      "- **Extension.** A TypeScript runtime plugin (e.g. `browser.ts`) that registers actual tool implementations.",
      "- **Prompt.** A markdown file dropped in `~/.motive-x/pi/agent/prompts/` that becomes a reusable custom prompt fragment.",
      "Most users only interact with the first kind. The other two exist for power users who want to ship runtime code or build their own reusable prompts.",
      "## Authoring",
      "Two paths. The fast one: create a folder under `~/.motive-x/pi/agent/skills/{name}/`, drop a `SKILL.md` in it, restart the app. The skill is discovered on next launch.",
      "The structured one: use `init_skill.py` to scaffold a templated SKILL.md plus the optional subdirectories, and `package_skill.py` to bundle it into a distributable `.skill` (zip) file you can share.",
      "> [sparkles pink] **No special build step.** A skill is data, not code (unless you&rsquo;re writing an extension). Markdown and frontmatter, on disk, in a folder. That&rsquo;s the whole format.",
    ],
  },
};

export function getFeature(slug: string): FeatureDoc | undefined {
  return (features as Record<string, FeatureDoc>)[slug];
}

export const featureOrder: FeatureDoc["slug"][] = [
  "memory",
  "routines",
  "skills",
];
