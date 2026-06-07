"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type BillingMode = "monthly" | "annual";
type PlanId = "free" | "sync_monthly" | "sync_annual";

interface Tier {
  id: PlanId | "free";
  annualId?: PlanId;
  name: string;
  priceMonthly: string;
  priceAnnualMonthly: string;
  cadence: string;
  cadenceAnnual?: string;
  tagline: string;
  cta: string;
  features: string[];
  highlighted?: boolean;
}

const BILLING_BASE =
  process.env.NEXT_PUBLIC_MOTIVEX_BILLING_BASE ??
  "https://motivex-billing.cryptodedefi.workers.dev";

const tiers: Tier[] = [
  {
    id: "free",
    name: "Free",
    priceMonthly: "$0",
    priceAnnualMonthly: "$0",
    cadence: "forever",
    tagline: "Plug in your own API keys and run Froots free.",
    cta: "Start free — no card",
    features: [
      "Bring any model — Claude, GPT, Gemini, Ollama, local",
      "Local memory vault, your machine",
      "All built-in skills (browser, shell, files, MCP)",
      "1 device",
    ],
  },
  {
    id: "sync_monthly",
    annualId: "sync_annual",
    name: "Sync",
    priceMonthly: "$12",
    priceAnnualMonthly: "$9",
    cadence: "/ mo",
    cadenceAnnual: "/ mo · billed yearly",
    tagline: "Same as Free — now everywhere you work.",
    cta: "Add Sync",
    highlighted: true,
    features: [
      "Everything in Free",
      "Sync across all your devices",
      "Memory snapshots & restore",
      "Publish memory snippets",
    ],
  },
];

function TierCard({
  tier,
  mode,
  email,
  setEmail,
  onCheckout,
  busyPlan,
}: {
  tier: Tier;
  mode: BillingMode;
  email: string;
  setEmail: (e: string) => void;
  onCheckout: (plan: PlanId) => Promise<void>;
  busyPlan: PlanId | null;
}) {
  const price = mode === "annual" ? tier.priceAnnualMonthly : tier.priceMonthly;
  const cadence = mode === "annual" ? tier.cadenceAnnual ?? tier.cadence : tier.cadence;
  const isFree = tier.id === "free";
  const planForMode: PlanId =
    isFree ? "free" : mode === "annual" ? (tier.annualId ?? tier.id as PlanId) : (tier.id as PlanId);
  const busy = busyPlan === planForMode;
  const disabled = !isFree && (!email.includes("@") || !!busyPlan);

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
      {tier.highlighted ? (
        <span className="absolute -top-3 left-6 inline-flex w-fit rounded-full bg-neutral-900 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-white">
          Most popular
        </span>
      ) : null}
      <h3 className="text-lg font-semibold">{tier.name}</h3>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-4xl font-semibold tracking-tight">{price}</span>
        <span className="text-[11px] opacity-70">{cadence}</span>
      </div>
      <p className="mt-2 text-xs opacity-75 min-h-[2.5rem]">{tier.tagline}</p>

      {!isFree && (
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@team.com"
          className={cn(
            "mt-3 h-10 w-full rounded-full border px-3 text-xs outline-none transition",
            tier.highlighted
              ? "border-neutral-900/30 bg-white/95 text-neutral-900 focus:border-neutral-900"
              : "border-neutral-200 bg-white text-neutral-900 focus:border-neutral-900",
          )}
          autoComplete="email"
        />
      )}

      <button
        type="button"
        onClick={() => {
          if (isFree) {
            window.location.assign("/");
          } else {
            void onCheckout(planForMode);
          }
        }}
        disabled={disabled}
        className={cn(
          "mt-3 inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed",
          tier.highlighted
            ? "bg-neutral-900 text-white hover:opacity-90"
            : "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100",
        )}
      >
        {busy ? "Opening Stripe…" : tier.cta}
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
  const [mode, setMode] = useState<BillingMode>("monthly");
  const [email, setEmail] = useState("");
  const [busyPlan, setBusyPlan] = useState<PlanId | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Prefill email when the desktop app sent the user here. The query
  // param ?email=… lands them on /pricing with one less form field.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const fromUrl = url.searchParams.get("email");
    if (fromUrl && fromUrl.includes("@")) setEmail(fromUrl);
  }, []);

  async function startCheckout(plan: PlanId) {
    if (!email.includes("@")) {
      setError("Enter your email so we can attach the subscription to your workspace.");
      return;
    }
    setBusyPlan(plan);
    setError(null);
    try {
      const res = await fetch(`${BILLING_BASE}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, plan }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`${res.status}: ${txt}`);
      }
      const json = (await res.json()) as { url: string };
      window.location.assign(json.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setBusyPlan(null);
    }
  }

  return (
    <section className="w-full py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
            Simple pricing.
          </h1>
          <p className="mt-3 mx-auto max-w-xl text-base sm:text-lg text-muted-foreground">
            Free with your own keys. $12 to sync across devices.
          </p>

          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-border bg-white p-1 text-xs">
            <button
              type="button"
              onClick={() => setMode("monthly")}
              className={cn(
                "rounded-full px-4 py-1.5 transition",
                mode === "monthly" ? "bg-neutral-900 text-white" : "text-neutral-600 hover:text-neutral-900",
              )}
              aria-pressed={mode === "monthly"}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setMode("annual")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 transition",
                mode === "annual" ? "bg-neutral-900 text-white" : "text-neutral-600 hover:text-neutral-900",
              )}
              aria-pressed={mode === "annual"}
            >
              Annual
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                  mode === "annual" ? "bg-emerald-400/90 text-emerald-950" : "bg-emerald-100 text-emerald-700",
                )}
              >
                save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-2">
          {tiers.map((tier) => (
            <TierCard
              key={tier.name}
              tier={tier}
              mode={mode}
              email={email}
              setEmail={setEmail}
              onCheckout={startCheckout}
              busyPlan={busyPlan}
            />
          ))}
        </div>

        {error && (
          <div className="mx-auto mt-6 max-w-xl rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-center text-sm text-rose-700">
            {error}
          </div>
        )}

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Cancel anytime · No card on Free · 14-day refund on paid plans · Beta pricing locked in for life
        </p>
      </div>
    </section>
  );
}
