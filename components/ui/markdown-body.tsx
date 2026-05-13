import React from "react";
import {
  Brain,
  Calendar,
  CheckCircle2,
  Clock,
  Database,
  GitBranch,
  Lightbulb,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";

const ICONS = {
  brain: Brain,
  calendar: Calendar,
  check: CheckCircle2,
  clock: Clock,
  database: Database,
  graph: GitBranch,
  lightbulb: Lightbulb,
  sparkles: Sparkles,
  wrench: Wrench,
  zap: Zap,
} as const;

type IconKey = keyof typeof ICONS;

const ACCENT: Record<string, string> = {
  green: "#D7EFD3",
  blue: "#5191F8",
  pink: "#FBD9DA",
};

function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={`${keyPrefix}-${i}`}
          className="font-semibold text-neutral-900"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={`${keyPrefix}-${i}`}
          className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[0.9em] text-neutral-800"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return (
      <span
        key={`${keyPrefix}-${i}`}
        dangerouslySetInnerHTML={{ __html: part }}
      />
    );
  });
}

type Block =
  | { kind: "h2"; text: string }
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] }
  | {
      kind: "callout";
      icon: IconKey;
      accent: string;
      heading?: string;
      text: string;
    }
  | { kind: "code"; lines: string[]; label?: string }
  | { kind: "table"; head: string[]; rows: string[][] }
  | {
      kind: "stats";
      items: { value: string; label: string; accent: string }[];
    };

const CALLOUT_RE = /^>\s+\[([a-z]+)(?:\s+([a-z]+))?\]\s*(.+)$/;

function groupBlocks(paragraphs: string[]): Block[] {
  const blocks: Block[] = [];
  let listBuf: string[] = [];

  const flushList = () => {
    if (listBuf.length) {
      blocks.push({ kind: "list", items: listBuf });
      listBuf = [];
    }
  };

  for (const p of paragraphs) {
    // Bullet list item
    if (p.startsWith("- ")) {
      listBuf.push(p.slice(2));
      continue;
    }
    flushList();

    // Heading
    if (p.startsWith("## ")) {
      blocks.push({ kind: "h2", text: p.slice(3) });
      continue;
    }

    // Callout: > [icon accent] **Heading.** body
    // accent optional; defaults to "green"
    const calloutMatch = CALLOUT_RE.exec(p);
    if (calloutMatch) {
      const [, icon, accent, rest] = calloutMatch;
      const iconKey = (icon in ICONS ? icon : "sparkles") as IconKey;
      const accentKey = accent && accent in ACCENT ? accent : "green";

      // optional bold heading at start: **Heading.**
      const headingMatch = /^\*\*([^*]+)\*\*\s*(.*)$/.exec(rest);
      blocks.push({
        kind: "callout",
        icon: iconKey,
        accent: ACCENT[accentKey],
        heading: headingMatch?.[1],
        text: headingMatch?.[2] ?? rest,
      });
      continue;
    }

    // Code / ASCII diagram block: ```label
    // lines\nline...
    // ```
    if (p.startsWith("```")) {
      const firstNl = p.indexOf("\n");
      const label = firstNl > 3 ? p.slice(3, firstNl).trim() : undefined;
      const inner = firstNl >= 0 ? p.slice(firstNl + 1) : p.slice(3);
      const cleaned = inner.replace(/```$/, "").replace(/\n$/, "");
      blocks.push({ kind: "code", lines: cleaned.split("\n"), label });
      continue;
    }

    // Table: "| h1 | h2 |\n| --- | --- |\n| r1a | r1b |"
    if (p.startsWith("|") && p.includes("\n")) {
      const rows = p
        .split("\n")
        .map((r) => r.trim())
        .filter((r) => r.startsWith("|"))
        .map((r) =>
          r
            .replace(/^\|/, "")
            .replace(/\|$/, "")
            .split("|")
            .map((c) => c.trim()),
        );
      if (rows.length >= 2) {
        const [head, , ...dataRows] = rows;
        blocks.push({ kind: "table", head, rows: dataRows });
        continue;
      }
    }

    // Stats block: "@stats\n42 | label | green\n..."
    if (p.startsWith("@stats")) {
      const items = p
        .split("\n")
        .slice(1)
        .map((line) => line.split("|").map((s) => s.trim()))
        .filter((parts) => parts.length >= 2)
        .map(([value, label, accent]) => ({
          value,
          label,
          accent: ACCENT[accent || "green"] ?? ACCENT.green,
        }));
      if (items.length) {
        blocks.push({ kind: "stats", items });
        continue;
      }
    }

    blocks.push({ kind: "p", text: p });
  }

  flushList();
  return blocks;
}

export function MarkdownBody({ paragraphs }: { paragraphs: string[] }) {
  const blocks = groupBlocks(paragraphs);

  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        if (b.kind === "h2") {
          return (
            <h2
              key={i}
              className="mt-10 text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900"
            >
              {renderInline(b.text, `h2-${i}`)}
            </h2>
          );
        }
        if (b.kind === "list") {
          return (
            <ul key={i} className="space-y-2.5 pl-1">
              {b.items.map((item, j) => (
                <li
                  key={j}
                  className="relative pl-6 text-base md:text-lg text-neutral-700 leading-relaxed"
                >
                  <span className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-neutral-400" />
                  {renderInline(item, `li-${i}-${j}`)}
                </li>
              ))}
            </ul>
          );
        }
        if (b.kind === "callout") {
          const Icon = ICONS[b.icon];
          return (
            <div
              key={i}
              className="my-2 flex gap-4 rounded-2xl border border-border bg-white p-5"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: b.accent }}
              >
                <Icon className="h-5 w-5 text-neutral-900" />
              </div>
              <div className="flex-1 text-base text-neutral-700 leading-relaxed">
                {b.heading && (
                  <span className="font-semibold text-neutral-900">
                    {b.heading}{" "}
                  </span>
                )}
                {renderInline(b.text, `ct-${i}`)}
              </div>
            </div>
          );
        }
        if (b.kind === "code") {
          return (
            <div
              key={i}
              className="my-2 overflow-hidden rounded-2xl border border-border bg-neutral-950 text-neutral-100"
            >
              {b.label && (
                <div className="border-b border-white/10 px-5 py-2 text-xs font-medium uppercase tracking-wider text-neutral-400">
                  {b.label}
                </div>
              )}
              <pre className="overflow-x-auto px-5 py-4 text-xs md:text-sm leading-relaxed font-mono">
                {b.lines.join("\n")}
              </pre>
            </div>
          );
        }
        if (b.kind === "table") {
          return (
            <div
              key={i}
              className="my-2 overflow-hidden rounded-2xl border border-border bg-white"
            >
              <table className="w-full text-left text-sm md:text-base">
                <thead className="bg-neutral-50 text-neutral-700">
                  <tr>
                    {b.head.map((h, j) => (
                      <th
                        key={j}
                        className="px-5 py-3 font-semibold tracking-tight"
                      >
                        {renderInline(h, `th-${i}-${j}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className="border-t border-border text-neutral-700"
                    >
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-5 py-3 align-top">
                          {renderInline(cell, `td-${i}-${rIdx}-${cIdx}`)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (b.kind === "stats") {
          return (
            <div
              key={i}
              className="my-2 grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {b.items.map((s, j) => (
                <div
                  key={j}
                  className="rounded-2xl border border-border bg-white p-5"
                >
                  <div
                    className="h-1.5 w-10 rounded-full"
                    style={{ backgroundColor: s.accent }}
                  />
                  <div className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm text-neutral-600">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          );
        }
        return (
          <p
            key={i}
            className="text-base md:text-lg text-neutral-700 leading-relaxed"
          >
            {renderInline(b.text, `p-${i}`)}
          </p>
        );
      })}
    </div>
  );
}
