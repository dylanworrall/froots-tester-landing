"use client";

import { useState } from "react";

interface SignupResponse {
  mode: "joined_team" | "new_user";
  app_session: string;
  turso_url: string;
  turso_token: string;
  team_id: string;
}

export function JoinForm({
  token,
  billingBase,
  suggestedEmail,
}: {
  token: string;
  billingBase: string;
  suggestedEmail: string | null;
}) {
  const [email, setEmail] = useState(suggestedEmail ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deepLink, setDeepLink] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Enter a valid email.");
      return;
    }
    setBusy(true);
    setError(null);
    setDeepLink(null);
    try {
      const res = await fetch(`${billingBase}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, invite_token: token }),
      });
      if (!res.ok) {
        let detail = `${res.status}`;
        try {
          const j = (await res.json()) as { error?: string };
          if (j.error) detail = j.error;
        } catch {
          // ignore
        }
        throw new Error(detail);
      }
      const json = (await res.json()) as SignupResponse;
      const url =
        `froots://activate` +
        `?app_session=${encodeURIComponent(json.app_session)}` +
        `&turso_url=${encodeURIComponent(json.turso_url)}` +
        `&turso_token=${encodeURIComponent(json.turso_token)}` +
        `&team_id=${encodeURIComponent(json.team_id)}` +
        `&email=${encodeURIComponent(email)}`;
      setDeepLink(url);
      // Auto-navigate — most browsers fire the protocol handler on
      // window.location.assign. Backup button below in case it's
      // blocked.
      window.location.assign(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  if (deepLink) {
    return (
      <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
        <div className="font-medium text-emerald-900 mb-1">
          Opening the Froots desktop app…
        </div>
        <p className="text-sm text-emerald-800 mb-3">
          If the app didn&apos;t open automatically, click the button below.
        </p>
        <a
          href={deepLink}
          className="inline-block px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
        >
          Open Froots
        </a>
        <p className="mt-4 text-xs text-emerald-700/80">
          Don&apos;t have the desktop app yet?{" "}
          <a href="/" className="underline">
            Download it here.
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <label className="block">
        <span className="text-sm font-medium text-zinc-700">Your email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          disabled={!!suggestedEmail || busy}
          className="mt-1 w-full px-3 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-500"
        />
        {suggestedEmail && (
          <span className="mt-1 block text-xs text-zinc-500">
            This invite was sent specifically to {suggestedEmail}.
          </span>
        )}
      </label>

      <button
        type="submit"
        disabled={busy}
        className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 text-white font-medium text-sm hover:bg-zinc-700 disabled:opacity-60"
      >
        {busy ? "Joining…" : "Join workspace"}
      </button>

      {error && (
        <div className="rounded-lg bg-rose-50 border border-rose-200 px-3 py-2 text-sm text-rose-700">
          {error}
        </div>
      )}
    </form>
  );
}
