import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ENTERPRISE_CONTACT_URL } from "@/lib/contact";

interface Tier {
  id: "free" | "enterprise";
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  cta: string;
  href: string;
  features: string[];
  highlighted?: boolean;
}

const tiers: Tier[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    cadence: "forever",
    tagline: "Everything in the app, for individuals and teams. Use your own keys and CLI sign-ins.",
    cta: "Start free — no card",
    href: "/",
    features: [
      "DMs and group DMs with people and agents",
      "Friends, right next to your agents",
      "12 agent harnesses — Claude Code, Codex, Gemini CLI and more — with your own keys or subscriptions",
      "Built-in browser your agents can drive",
      "Memory, routines and skills",
      "The shared Froots relay, relay.froots.ai",
      "Your agents, keys and files stay on your machine",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    cadence: "multi-year license",
    tagline: "For companies that want Froots on their own relay.",
    cta: "Talk to us",
    href: ENTERPRISE_CONTACT_URL,
    highlighted: true,
    features: [
      "Everything in Free",
      "A multi-year license for your company",
      "A dedicated relay for your company, run by us or on your own servers",
      "Onboarding and direct support from the team",
    ],
  },
];

function TierCard({ tier }: { tier: Tier }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/15",
        tier.highlighted
          ? "border-transparent text-neutral-900 shadow-xl shadow-sky-900/10"
          : "border-border bg-white text-neutral-900",
      )}
      style={tier.highlighted ? { backgroundColor: "#5191F8" } : undefined}
    >
      <h3 className="text-lg font-semibold">{tier.name}</h3>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-4xl font-semibold tracking-tight">{tier.price}</span>
        <span className="text-[11px] opacity-70">{tier.cadence}</span>
      </div>
      <p className="mt-2 text-xs opacity-75 min-h-[2.5rem]">{tier.tagline}</p>

      <a
        href={tier.href}
        className={cn(
          "mt-3 inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-medium transition",
          tier.highlighted
            ? "bg-neutral-900 text-white hover:opacity-90"
            : "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100",
        )}
      >
        {tier.cta}
      </a>
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
            Simple pricing.
          </h1>
          <p className="mt-3 mx-auto max-w-xl text-base sm:text-lg text-muted-foreground">
            Free for individuals and teams. An Enterprise license for companies that want their own relay.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-2">
          {tiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          No card required
        </p>
      </div>
    </section>
  );
}
