export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tag: string;
  author: string;
  accent: string;
  /** Stipple brand-art cover (from the app's Imagery set). Falls back to `accent`. */
  coverImage?: string | null;
  body: string[];
  html?: string;
  sortDate?: string;
}

const newPosts: BlogPost[] = [
  {
    slug: "introducing-froots",
    title: "Introducing Froots — your AI playground",
    excerpt:
      "Why we built a single home for your agents, memory, and tools — and what it means to actually own your second brain.",
    date: "May 12, 2026",
    readingTime: "5 min read",
    tag: "Announcement",
    author: "The Froots team",
    accent: "#5191F8",
    coverImage: "/froots-art-2.jpg",
    body: [
      "Today we&rsquo;re opening the doors to Froots — a desktop playground that lets your AI actually do things. Browse the web, take notes, draft code, run shell commands, schedule itself for tomorrow morning. The pieces have existed for a while. What hasn&rsquo;t existed is a place where they live together, share memory, and stay yours.",
      "Most AI products today force a tradeoff. Chat apps are great at talking but forget you the moment you close the tab. Agent frameworks can drive a browser but ship without a place to live. Note apps want to be your second brain but can&rsquo;t reason about what they hold. We kept running into the same wall: the interesting work is at the seams, and nobody owns the seams.",
      "## What Froots is",
      "Froots is one app with four tightly-linked pieces. **Memory** is a graph of everything you and your agents have ever said, written, or done — searchable, linkable, and yours. **Routines** are scheduled agent runs: morning briefings, weekly reports, market checks. **Skills** are togglable capabilities, more like apps than plugins. **Conversations** is where you steer it all in real time, with full visibility into tool calls, file edits, and reasoning.",
      "The whole thing runs on whatever model you want — Claude, GPT, Gemini, Llama through Ollama, Mistral through Groq. We&rsquo;re model-agnostic on purpose. The brain you pick today won&rsquo;t be the best brain in six months, and we&rsquo;d rather you swap models than swap apps.",
      "## What it isn&rsquo;t",
      "Froots isn&rsquo;t a SaaS chat app dressed up as a desktop client. Your data lives on your machine. Your model keys are yours. Your memory graph is a file you can grep. We sync to the cloud when you ask us to, never by default.",
      "## How to try it",
      "Open the playground, paste your model key, and ask it to do something small — summarize your inbox, draft a blog post, scrape a website. Watch the run timeline. Pause it, steer it, rerun it. That&rsquo;s the loop. Once you trust it on small things, hand it bigger ones.",
      "We&rsquo;ll be shipping fast. Join the Discord and tell us what&rsquo;s broken.",
    ],
  },
  {
    slug: "memory-graph-explained",
    title: "How the memory graph works",
    excerpt:
      "Every conversation indexed, linked, and searchable. A look under the hood at the structure that keeps your agent oriented over months.",
    date: "May 3, 2026",
    readingTime: "8 min read",
    tag: "Engineering",
    author: "Dylan Worrall",
    accent: "#D7EFD3",
    coverImage: "/froots-art-3.jpg",
    body: [
      "If you&rsquo;ve used a chat-based AI for more than a week, you&rsquo;ve felt the goldfish problem. Context windows have grown, but the *useful* context — the stuff from three weeks ago that matters today — keeps falling off the edge. Froots fixes this with a memory graph. Here&rsquo;s how it works under the hood.",
      "## The shape of the graph",
      "Every conversation, note, file edit, tool call, and routine run lands as a node. Nodes have a type (`conversation`, `note`, `file`, `event`), a timestamp, raw text, and structured metadata. Edges connect nodes by reference (this note quotes that conversation), by entity (both mention &ldquo;Acme Corp&rdquo;), and by time (these three events happened in the same session).",
      "We don&rsquo;t throw everything at the model. The model sees a *projection* — the subset of the graph that&rsquo;s relevant to the current task — pulled by a retrieval step that combines vector similarity, recency decay, and explicit links from whatever&rsquo;s pinned in the active conversation.",
      "## Why a graph and not just embeddings",
      "Embeddings alone tell you *what looks similar*. They don&rsquo;t tell you *what&rsquo;s actually connected*. A vector search for &ldquo;refund policy&rdquo; surfaces ten paragraphs that mention refunds; the graph tells you which of those paragraphs came from the actual policy doc your agent wrote last Tuesday versus a customer email versus a random Slack thread.",
      "We use embeddings for the long tail — semantic recall when you don&rsquo;t know the right keyword — and the graph for the head: entities, projects, and explicit references you and your agents have already wired up.",
      "## Writing into the graph",
      "Every assistant turn ends with a small &ldquo;memory commit&rdquo; pass. The model proposes nodes to create, edges to add, and (occasionally) old nodes to deprecate. We never silently overwrite — corrections become new nodes that link to and supersede the old one, so the history is always reconstructable.",
      "This sounds expensive. It isn&rsquo;t. The commit pass runs on a small fast model, costs cents per day, and the resulting graph compresses years of conversation into something a frontier model can navigate with a single retrieval call.",
      "## What you can do with it",
      "The graph is a file. You can grep it, back it up, import it into another tool, or — our favorite — let another agent read it. A research agent that wakes up Monday morning already knows what you were arguing about Friday afternoon, without you having to brief it.",
    ],
  },
  {
    slug: "model-agnostic-by-default",
    title: "Why Froots is model-agnostic by default",
    excerpt:
      "Locking yourself into one model ages badly. We let you swap brains per task — here's the architecture that makes it boring to do.",
    date: "April 24, 2026",
    readingTime: "6 min read",
    tag: "Product",
    author: "The Froots team",
    accent: "#FBD9DA",
    coverImage: "/froots-art-4.jpg",
    body: [
      "Pick the best model today and you&rsquo;ll be wrong in six months. That&rsquo;s not pessimism, that&rsquo;s the last three years of releases. We built Froots with the assumption that the frontier moves, often, and you shouldn&rsquo;t have to migrate your entire workflow every time it does.",
      "## The bet",
      "Most AI apps pick a horse. They wire their prompts, tools, and evals to one model&rsquo;s quirks, and ship something that works really well — until that model is no longer the right model. We picked the opposite bet. Every Froots primitive — chat, skills, routines, memory — is model-agnostic by construction.",
      "## What that looks like in practice",
      "Each conversation has a model selector. Each routine has its own. Each skill can declare a preferred model or fall back to whatever&rsquo;s active. You can run a $0.0002-per-call Haiku on triage and route the hard cases up to Opus, in the same chat thread, without restarting anything.",
      "Under the hood we use a thin adapter layer that normalizes tool-calling, streaming, and content-block formats across providers. The model sees a consistent shape; we translate at the edge. New providers ship as a single file.",
      "## Why this matters for you",
      "It means when a new model lands — and one will, soon — you don&rsquo;t rebuild. You change a dropdown. Your skills keep working, your routines keep firing, your memory graph stays intact. The upgrade tax is gone.",
      "It also means cost. The cheapest capable model has dropped roughly 10x per year for two years running. Model-agnostic design is the only way to actually capture that. Lock into one provider and you pay their price; let the work flow to whichever model fits, and the average cost of every task trends toward the floor.",
      "## What we&rsquo;re not promising",
      "We&rsquo;re not promising every model is equal. They aren&rsquo;t. Claude is still the best at long agent loops; GPT is still the most ecosystem-rich; Gemini still wins on raw context; Llama wins when you need it offline. Model-agnostic doesn&rsquo;t mean &ldquo;the model doesn&rsquo;t matter&rdquo; — it means *you* pick which one matters, per task, and we make swapping painless.",
    ],
  },
  {
    slug: "skills-library-design",
    title: "Designing the Skills library",
    excerpt:
      "Capabilities as apps you toggle on. How we kept the model honest about what it can and can't do at any given moment.",
    date: "April 11, 2026",
    readingTime: "7 min read",
    tag: "Design",
    author: "The Froots team",
    accent: "#FBD9DA",
    coverImage: "/froots-art-5.jpg",
    body: [
      "There&rsquo;s a quiet problem with most agent frameworks: the model has access to fifty tools and the prompt instructs it to &ldquo;use them when appropriate.&rdquo; That works for demos. It breaks the moment a user asks something ambiguous and the model picks the wrong tool with confidence.",
      "Skills are our answer. They&rsquo;re a unit between &ldquo;tool&rdquo; and &ldquo;app&rdquo; — a named, scoped capability that you toggle on for a session.",
      "## The mental model",
      "Think of skills like apps on a phone. You don&rsquo;t have every app open all the time. You open Maps when you need to navigate. You open Camera when you want a photo. The phone doesn&rsquo;t ask the OS to &ldquo;figure out from context&rdquo; which app to open — *you* decide, and the apps make themselves available to the OS.",
      "Skills work the same way. Each skill bundles a system prompt fragment, a set of tools, and trigger conditions (keywords, file types, MCP servers, schedules). When you toggle on the &ldquo;Research&rdquo; skill, the model gains web search, scraping, and citation tools, plus a system prompt that explains *when and how* to use them. Toggle it off and those tools vanish — the model can&rsquo;t accidentally call them.",
      "## Why this beats one big prompt",
      "Models trained on long, kitchen-sink system prompts are worse at every individual task than models with focused prompts. The cost of an unused instruction isn&rsquo;t zero — it&rsquo;s mild confusion. Skills let us keep the active prompt small and sharp, and let the user opt into complexity exactly when they want it.",
      "It&rsquo;s also better for debugging. When the model does something weird, you can ask &ldquo;which skill was active?&rdquo; and inspect the exact prompt + tools it had access to. No more &ldquo;why did it just call the wrong API?&rdquo;",
      "## The hard part: honesty",
      "The trickiest design decision was making the model *honest* about what it can and can&rsquo;t do. If you turn off the Email skill, the model needs to say &ldquo;I can&rsquo;t send email right now — want me to enable the Email skill?&rdquo; instead of either silently failing or hallucinating that it sent something.",
      "We landed on a small meta-skill that&rsquo;s always on: the model knows which skills exist, which are active, and how to ask for one to be enabled. That gives you the best of both worlds — a clean active surface, and a model that knows what&rsquo;s behind the curtain.",
    ],
  },
  {
    slug: "routines-and-heartbeat",
    title: "Routines and the heartbeat loop",
    excerpt:
      "Scheduled agent runs sound boring until you let one wake up every morning and tee up your day. Here's how heartbeat picks what matters.",
    date: "March 30, 2026",
    readingTime: "4 min read",
    tag: "Product",
    author: "The Froots team",
    accent: "#D7EFD3",
    coverImage: "/froots-art-6.jpg",
    body: [
      "Most agents are reactive. You ask, they respond. That&rsquo;s great for chat — and useless for the kinds of tasks that don&rsquo;t start with a question. Routines flip the loop. They&rsquo;re scheduled agent runs that fire on their own, with a goal, a set of tools, and a place to drop the output.",
      "## A morning routine",
      "Mine runs at 7:30am. It reads my calendar for the day, checks Linear for any tickets assigned to me, scans my inbox for anything that arrived overnight from a person (not a newsletter), pulls the latest from three specific blogs, and writes a 5-line briefing into a note titled &ldquo;Today.&rdquo; I read it with coffee. It took twenty minutes to set up and I haven&rsquo;t touched it in months.",
      "## Heartbeat",
      "The trick to making routines actually useful is making them know when *not* to ping you. Heartbeat is the small meta-loop that runs every routine through a relevance check before surfacing anything. If your morning briefing is identical to yesterday&rsquo;s, heartbeat tags it &ldquo;routine-skip&rdquo; and just files it. If something genuinely new shows up — a calendar conflict, a customer escalation, a research alert — heartbeat surfaces it to your dashboard with a one-line summary.",
      "The result is the opposite of a notification firehose. Most days, heartbeat is quiet. The days it speaks up, you read it carefully.",
      "## What to schedule first",
      "Three routines we recommend setting up on day one: a morning briefing, a Friday weekly retro, and a Sunday next-week planner. They&rsquo;re obvious, they&rsquo;re ten minutes to configure, and they put scheduled-agents in your head as a category. Once you have the shape, the weird custom ones start to suggest themselves.",
    ],
  },
  {
    slug: "local-first-with-ollama",
    title: "Going local-first with Ollama",
    excerpt:
      "Run a real agent fully offline on a laptop. What works, what doesn't, and the trade-offs you actually feel.",
    date: "March 18, 2026",
    readingTime: "9 min read",
    tag: "Tutorial",
    author: "Dylan Worrall",
    accent: "#5191F8",
    coverImage: "/froots-art-7.jpg",
    body: [
      "I ran Froots fully offline for two weeks on a MacBook Pro M3 with Ollama as the only backend. No cloud calls, no API keys, no internet for the model layer. Here&rsquo;s what worked, what didn&rsquo;t, and the trade-offs you actually feel day to day.",
      "## The setup",
      "Ollama running locally, serving Llama 3.1 70B for heavy tasks and Llama 3.1 8B for routing and triage. Froots configured to point at `http://localhost:11434` instead of any cloud provider. Memory graph, skills, and routines all unchanged — just a different brain on the other end of the adapter.",
      "Total cost: $0 in API spend, ~40W of extra power draw, and about 45GB of disk for the model weights. The 70B took roughly 90 seconds to load on first call and stayed warm after that.",
      "## What worked surprisingly well",
      "Chat felt almost identical to GPT-4o for everyday tasks. Drafting emails, summarizing notes, writing tweets, light coding. The 8B model is fast enough to feel instant on intent classification and routing. Heartbeat&rsquo;s relevance-check runs (small prompts, structured output) ran beautifully on the 8B.",
      "Memory commits — the small write-back step at the end of each turn — were also great on the 8B. They&rsquo;re prompt-heavy but output-light, which is exactly Llama&rsquo;s wheelhouse.",
      "## What didn&rsquo;t",
      "Long agent loops fell apart. The 70B is good for a few turns; it&rsquo;s noticeably worse than Claude Opus at staying focused across 20+ tool calls. By turn 12 or so, the model started repeating itself or losing the plot. This is the gap that the frontier models really earn their price on.",
      "Code generation was decent but not Cursor-level. The model gets the structure right but introduces small bugs that a frontier model wouldn&rsquo;t.",
      "## The trade-off, in one sentence",
      "Local-first is excellent for the 80% of tasks that are short, focused, and routine — and noticeably worse for the 20% that are long, exploratory, and complex. So the right setup is mixed: Ollama as the default brain, with a frontier model on standby for the hard runs. Froots lets you do exactly that with a per-conversation model toggle.",
      "Two weeks later I&rsquo;m back on a hybrid setup. But I keep Ollama running. The number of one-shot tasks I now route to the local 8B for free, instead of paying a frontier model to handle, is much higher than I expected.",
    ],
  },
];

import { legacyPosts } from "./legacy-posts";

export const posts: BlogPost[] = [...newPosts, ...legacyPosts];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}
