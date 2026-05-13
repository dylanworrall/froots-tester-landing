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
    body: [
      "## What it is",
      "Memory in Froots is two things working together: **three core markdown files** that hold the working state of the agent, and a **semantic vector index** over every other note the agent writes. Both live on your machine.",
      "The three files are `context.md` (what you&rsquo;re working on right now), `decisions.md` (choices made and the reasoning behind them), and `learnings.md` (mistakes worth remembering). The agent reads and edits them like any other file. They&rsquo;re plain markdown — you can open them in any editor.",
      "Everything else the agent writes into `workspace/memory/` or `workspace/kb/` gets automatically chunked, embedded, and indexed so it can be retrieved by similarity later.",
      "@stats\n384 | dimensions per embedding (BGE-small) | green\n0.45 | minimum cosine similarity to surface | blue\n8 | results retrieved per turn (configurable) | pink",
      "## How retrieval works",
      "When you send a prompt, Froots embeds your message and runs an approximate-nearest-neighbour search against the vector index. The store is **libsql** with a DiskANN index on a 384-dim `F32_BLOB` column — fast enough to return top results in milliseconds even on years of notes.",
      "Anything above the similarity threshold is rescored exactly, ranked, and injected into the system prompt as a markdown context block before the model runs. You can tune the threshold and the result count per assistant.",
      "| Layer | What it does | Where it lives |\n| --- | --- | --- |\n| Core files | Hand-edited working state — context, decisions, learnings | `workspace/memory/*.md` |\n| Indexed notes | Automatic semantic recall over everything else the agent writes | `motive-x.db` (libsql) |\n| Active prompt | Top-K snippets injected per turn | System prompt |",
      "> [database green] **Local-only by default.** The libsql file sits next to the app. There&rsquo;s no remote sync in v1 — your memory never leaves your machine unless you point it somewhere.",
      "## How writes happen",
      "Memory writes are **file-driven**, not turn-driven. The agent edits a markdown file in the workspace. A file-watcher notices the change and runs the indexer: it chunks the file by markdown heading (with ~20% overlap so sentences near a boundary don&rsquo;t get split), batch-embeds the chunks, and atomically updates the `memories` table.",
      "Each row stores the chunk text, its embedding, the source file path, a category, and bookkeeping timestamps (`created_at`, `last_retrieved`, `retrieval_count`). Tracking retrievals is what powers the &ldquo;most-used memories&rdquo; views in the UI.",
      "> [check blue] **You see every write.** Memories are markdown files you can edit, diff, and version-control. There&rsquo;s no hidden internal state — if it&rsquo;s in memory, it&rsquo;s in a file you can open.",
      "## What it isn&rsquo;t (yet)",
      "Memory is currently ranked by cosine similarity alone. Recency, retrieval frequency, and supersession (where a new decision replaces an old one) are tracked in the schema but don&rsquo;t yet affect ranking. Cloud sync, multi-device memory, and team-shared memory are planned, not shipped.",
      "If you&rsquo;ve seen the **graph view** in the Memories tab, it&rsquo;s a UI visualization derived from the vector index on-the-fly — clusters and edges are computed from category overlap and a 0.62 similarity threshold. The underlying store is flat; the graph is the picture.",
      "## What you can do with it",
      "- **Resume threads.** Ask &ldquo;what was I doing with the API rewrite last month?&rdquo; — the index surfaces the decisions and notes that mention it.",
      "- **Hand-curate the core.** Edit `context.md` directly when you want the agent to know something without re-explaining it. The next turn picks it up.",
      "- **Share across assistants.** Each assistant has its own memory directory. Point a routine&rsquo;s assistant at the same folder and they share recall.",
    ],
  },
  routines: {
    slug: "routines",
    title: "Routines",
    tagline:
      "A scheduler for your agent. Cron, daily, weekly, interval, or one-shot — running the same agent loop as chat, on a clock.",
    tag: "Product · Routines",
    accent: "#5191F8",
    body: [
      "## What it is",
      "A routine is a saved prompt plus a schedule. When the schedule fires, Froots spawns a new session, hands the prompt to your active backend (Claude, Codex, or Pi), and lets the agent run with the same tools, memory, and skills it would have in chat.",
      "The scheduler is a Tokio task on the Rust side that polls every 30 seconds. Routines persist as `ScheduledTask` rows in the local database, so a quit-and-relaunch picks up exactly where it left off.",
      "## Schedule types",
      "Five trigger shapes cover essentially every cadence:",
      "| Type | Payload | Example |\n| --- | --- | --- |\n| `Once` | A single timestamp | Run at 3pm tomorrow |\n| `Interval` | Minutes between runs | Every 30 minutes |\n| `Daily` | `HH:MM` | Every day at 08:00 |\n| `Weekly` | Day + optional time | Mondays at 09:00 |\n| `Cron` | Full POSIX cron expression | `0 9 * * 1-5` |",
      "Next-run timestamps are computed deterministically, so you can see exactly when a routine will fire next without waiting for it.",
      "> [clock blue] **Cron when you need it.** The `Cron` type accepts full POSIX cron expressions via the `cron` crate. Everything else is sugar on top of the same scheduler.",
      "## What ships in the box",
      "Froots ships **fifty preset templates** in a Library tab — morning briefing, weekly standup, inbox triage, market pulse, planning prompts, and more. Presets are not auto-installed: you pick one, edit the prompt, set a schedule, and save. The database starts empty on first launch.",
      "This is intentional. We&rsquo;ve found that defaults nobody asked for get ignored, but presets you actively choose stick around.",
      "## Example routines people set up",
      "These are real shapes from the preset library, lightly edited to show what an actual routine looks like.",
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
      "When a routine fires, it routes to whichever backend is active for that assistant. Claude and Codex both run as one-shot subprocesses (with transcript loading for multi-turn). Pi runs as a long-lived process with persistent memory. The same agent tools — `agent_read_doc`, `agent_write_doc`, `agent_edit_doc`, browser automation when enabled — are available.",
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
    body: [
      "## What it is",
      "A skill is a folder. Inside it, a `SKILL.md` file with YAML frontmatter (name, description, optional binary/env requirements) and markdown instructions. Optionally, a `scripts/`, `references/`, or `assets/` directory next to it.",
      "On startup, Froots scans three locations — the bundled `skills/` directory, your workspace `skills/` directory, and `~/.motive-x/pi/agent/skills/` — and discovers everything it finds. Each enabled, eligible skill contributes its `name` and `description` to a `<skills>` section in the system prompt.",
      "> [wrench pink] **Prompt-fragments, not tool registries.** A skill primes the model with domain knowledge and a description of when to use it. Tools (browser, file editing) are registered separately and gated independently.",
      "## What ships",
      "Sixty-two skills ship with the app, plus three hardcoded system skills that are always present:",
      "@stats\n62 | bundled skills | pink\n3 | hardcoded system skills | green\n0 | required to start (everything is optional) | blue",
      "The three hardcoded system skills are `safe-file-deletion` (cannot be disabled — enforces a confirm step on destructive file ops), `browser-automation` (gated on the `agent-browser` binary), and `openui` (generative UI scaffolding).",
      "## A sampler from the catalog",
      "A slice of what&rsquo;s in the bundled `skills/` directory, grouped by what people tend to reach for:",
      "| Skill | What it does |\n| --- | --- |\n| `github` | Read, comment, and ship PRs via the `gh` CLI |\n| `obsidian` | Read and edit your Obsidian vault as if it were your second brain |\n| `notion` | Pull pages, append blocks, search databases |\n| `slack` | Read channels, post messages, react to threads |\n| `signal` / `telegram` / `imsg` | Send and read messages on each platform |\n| `apple-notes` / `bear-notes` / `things-mac` | Native Apple-stack note and task capture |",
      "| Skill | What it does |\n| --- | --- |\n| `browser-automation` | Playwright-driven open / click / fill / screenshot |\n| `summarize` | Condense long documents or transcripts |\n| `openai-whisper` / `openai-whisper-api` | Transcribe audio locally or via API |\n| `nano-banana-pro` / `openai-image-gen` | Generate images |\n| `blender` | Drive Blender from the agent for 3D work |\n| `image-to-3d` / `web-export-3d` | Turn images into 3D scenes and export them |",
      "| Skill | What it does |\n| --- | --- |\n| `1password` | Look up secrets without leaking them into prompts |\n| `spotify-player` / `sonoscli` | Control music and speakers |\n| `openhue` / `wyze` | Smart-home lights and cameras |\n| `weather` | Current conditions and forecasts |\n| `food-order` / `local-places` / `goplaces` | Real-world search and ordering |\n| `skill-creator` | Scaffold and package new skills from inside the agent |",
      "> [sparkles pink] **`skill-creator` is the meta one.** Ask the agent to add a new skill and it uses `skill-creator` to scaffold the folder, fill in the frontmatter, and drop instructions into `SKILL.md` for you.",
      "## Eligibility and activation",
      "When Froots discovers a skill, it runs an eligibility check based on the frontmatter — OS match, required binaries on PATH, required environment variables. Ineligible skills auto-disable; eligible ones are toggleable in the Skills tab.",
      "| Step | Where in code |\n| --- | --- |\n| Discovery | `SkillManager::discover()` walks three skill directories |\n| Eligibility | `evaluate_eligibility()` checks OS, binaries, env vars |\n| State | `skills-state.json` tracks disabled list per assistant |\n| Prompt build | `generate_system_prompt()` lists every enabled+eligible skill |",
      "Toggling a skill off removes it from Pi&rsquo;s live skills directory, so its `SKILL.md` is no longer included in the prompt on the next run. The model stops being told it knows that capability.",
      "## How the model picks one",
      "There are **no keyword triggers**. No regex matches, no &ldquo;activate when user mentions X.&rdquo; Activation is purely semantic: the model sees the list of enabled skills with their one-line descriptions, and decides which apply to your request.",
      "The skill-creator guidance is explicit about this: descriptions should name both *what* the skill does and *when* to use it, because that&rsquo;s the only signal the model gets. A skill description like &ldquo;Search the web and cite sources&rdquo; works; &ldquo;Web stuff&rdquo; does not.",
      "## Three flavors",
      "The system actually exposes three related concepts under one tab:",
      "- **Skill.** A `SKILL.md`-based prompt fragment. The 62 bundled ones are all this kind.",
      "- **Extension.** A TypeScript runtime plugin (e.g. `browser.ts`, `widget-generator.ts`) that registers actual tool implementations.",
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
