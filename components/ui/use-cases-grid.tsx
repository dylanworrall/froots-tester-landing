import { ArrowRight } from "lucide-react";

type UseCase = {
  title: string;
  description: string;
  brands: string[];
};

const cases: UseCase[] = [
  {
    title: "Coding agents",
    description:
      "Plug in Claude Code, Codex, Aider, or your own harness. Watch tool calls and diffs in real time, approve risky edits, and ship without losing the plot.",
    brands: ["anthropic.com", "openai.com", "github.com", "cursor.com"],
  },
  {
    title: "Browser automations",
    description:
      "Hand the agent a browser and a task. Froots renders the live session, captures every click, and lets you intervene when it gets stuck.",
    brands: ["google.com", "mozilla.org", "playwright.dev", "selenium.dev"],
  },
  {
    title: "Research agents",
    description:
      "Multi-step research, market deep-dives, and technical surveys with citations. The agent does the legwork; you read the brief.",
    brands: ["perplexity.ai", "notion.so", "wikipedia.org", "arxiv.org"],
  },
  {
    title: "Sales & outbound",
    description:
      "Source leads, enrich them, draft outreach in your voice, and log everything to your CRM — all from a run you can audit line by line.",
    brands: ["salesforce.com", "hubspot.com", "linkedin.com", "gmail.com"],
  },
  {
    title: "Data extraction",
    description:
      "Point an agent at a site and get clean, structured data back. No scrapers, no brittle selectors — the run is the spec.",
    brands: [
      "postgresql.org",
      "mongodb.com",
      "airtable.com",
      "google.com",
    ],
  },
  {
    title: "Customer support",
    description:
      "Triage tickets, draft replies grounded in your KB, and route the hard ones back to a human — with a transcript of every step.",
    brands: ["zendesk.com", "intercom.com", "slack.com", "gmail.com"],
  },
  {
    title: "Ops & internal tools",
    description:
      "Morning briefs, weekly reports, scheduled cleanups. Give an agent the tools and a cron, then forget about it (until something interesting happens).",
    brands: ["linear.app", "notion.so", "slack.com", "calendar.google.com"],
  },
  {
    title: "Marketing & content",
    description:
      "Competitor tracking, content drafts, scheduling — agents handle the busywork while you keep editorial control over what ships.",
    brands: ["youtube.com", "x.com", "buffer.com", "hubspot.com"],
  },
  {
    title: "Evals & QA",
    description:
      "Run an agent across a dataset, replay any case, and diff outputs between harnesses or model versions to see what actually got better.",
    brands: [
      "openai.com",
      "anthropic.com",
      "huggingface.co",
      "wandb.ai",
    ],
  },
];

function BrandIcon({ domain }: { domain: string }) {
  return (
    <span className="size-9 rounded-full bg-white flex items-center justify-center ring-2 ring-background overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
        alt=""
        className="size-5"
        loading="lazy"
      />
    </span>
  );
}

export function UseCasesGrid() {
  return (
    <section className="bg-background text-foreground py-20 px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            What can I run on Froots?
          </h2>
          <p className="mt-3 text-foreground/60 text-base md:text-lg">
            Bring any agent harness, give it the tools it needs, and watch it
            work. A few of the things teams ship today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl p-6 flex flex-col border border-white/10 bg-white/5 supports-[backdrop-filter]:bg-white/[0.03] backdrop-blur-xl"
            >
              <div className="flex -space-x-2 mb-6">
                {c.brands.map((domain) => (
                  <BrandIcon key={domain} domain={domain} />
                ))}
              </div>
              <h3 className="text-base font-semibold mb-2">{c.title}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed flex-1">
                {c.description}
              </p>
              <button
                type="button"
                className="mt-6 inline-flex items-center gap-1.5 self-start rounded-full bg-white text-black text-sm px-4 py-2 hover:bg-white/90 transition-colors"
              >
                See how
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
