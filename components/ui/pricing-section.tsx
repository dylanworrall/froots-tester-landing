import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tier {
  name: string;
  price: string;
  cadence?: string;
  tagline: string;
  cta: string;
  features: string[];
  highlighted?: boolean;
}

const tiers: Tier[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    tagline: "Kick the tires.",
    cta: "Start free",
    features: ["Limited chats", "Local memory", "Basic skills"],
  },
  {
    name: "BYOM",
    price: "$12",
    cadence: "/ mo",
    tagline: "Bring your own model keys.",
    cta: "Bring your own model",
    features: ["Your API keys", "Cloud sync", "Publish memory"],
  },
  {
    name: "Pro",
    price: "$75",
    cadence: "/ mo",
    tagline: "Our hosted models, no keys to manage.",
    cta: "Get Pro",
    highlighted: true,
    features: ["Sonnet, GPT-4o, Gemini", "Generous usage", "All BYOM features"],
  },
  {
    name: "Pro Max",
    price: "$150",
    cadence: "/ mo",
    tagline: "Frontier models with the highest limits.",
    cta: "Go Pro Max",
    features: ["Opus, GPT-4 Turbo", "Highest limits", "Everything in Pro"],
  },
];

function TierCard({ tier }: { tier: Tier }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/15",
        tier.highlighted
          ? "border-transparent text-neutral-900 shadow-xl shadow-sky-900/10"
          : "border-border bg-white text-neutral-900",
      )}
      style={
        tier.highlighted ? { backgroundColor: "#5191F8" } : undefined
      }
    >
      {tier.highlighted ? (
        <span className="mb-3 inline-flex w-fit rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white">
          Most popular
        </span>
      ) : null}
      <h3 className="text-lg font-semibold">{tier.name}</h3>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-4xl font-semibold tracking-tight">{tier.price}</span>
        {tier.cadence ? (
          <span className="text-xs opacity-70">{tier.cadence}</span>
        ) : null}
      </div>
      <p className="mt-2 text-xs opacity-75">{tier.tagline}</p>
      <button
        className={cn(
          "mt-4 inline-flex h-9 w-full items-center justify-center rounded-full text-xs font-medium transition",
          tier.highlighted
            ? "bg-neutral-900 text-white hover:opacity-90"
            : "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100",
        )}
      >
        {tier.cta}
      </button>
      <ul className="mt-5 space-y-2 text-xs">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-70" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PricingSection() {
  return (
    <section className="w-full py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
            Pick the plan that fits how you ship.
          </h1>
          <p className="mt-3 mx-auto max-w-xl text-base sm:text-lg text-muted-foreground">
            Start free. Bring your own model, or let us host the best.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <TierCard key={tier.name} tier={tier} />
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Annual billing saves you 20%. Team and enterprise plans available — <a className="underline underline-offset-2 hover:text-foreground" href="#">talk to us</a>.
        </p>
      </div>
    </section>
  );
}
