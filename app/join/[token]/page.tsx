/// Public invite landing — /join/<token>.
///
/// Flow:
///   1. Server-fetch invite metadata (team name + inviter email) via
///      the motivex-billing Worker. If the invite is expired or used,
///      render an explanatory message and a CTA back to /.
///   2. Render a small client form: email input + "Join workspace" button.
///   3. On submit, POST /signup with { email, invite_token } against the
///      Worker. On success, redirect to froots://activate?app_session=…&… so
///      the desktop app picks up the deep-link.
///
/// Note: this page intentionally doesn't store the bearer token in any
/// client storage. The deep-link hands it straight to the desktop app
/// which owns the only persisted copy.

import Link from "next/link";
import { JoinForm } from "./join-form";

const BILLING_BASE =
  process.env.NEXT_PUBLIC_MOTIVEX_BILLING_BASE ??
  "https://motivex-billing.cryptodedefi.workers.dev";

interface InviteMetadata {
  team_name: string;
  inviter_email: string;
  invited_email: string | null;
  expires_at: number;
}

async function fetchInvite(token: string): Promise<
  | { ok: true; data: InviteMetadata }
  | { ok: false; status: number; error: string }
> {
  try {
    const res = await fetch(`${BILLING_BASE}/team/invite/${token}`, {
      // Server-side fetch — no caching, this changes when consumed.
      cache: "no-store",
    });
    if (!res.ok) {
      let errMsg = `${res.status}`;
      try {
        const j = (await res.json()) as { error?: string };
        if (j.error) errMsg = j.error;
      } catch {
        // ignore — fall back to status code
      }
      return { ok: false, status: res.status, error: errMsg };
    }
    return { ok: true, data: (await res.json()) as InviteMetadata };
  } catch (e) {
    return {
      ok: false,
      status: 0,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

export default async function JoinPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const lookup = await fetchInvite(token);

  if (!lookup.ok) {
    return (
      <Shell>
        <h1 className="text-2xl font-semibold text-zinc-900 mb-2">
          This invite isn&apos;t available
        </h1>
        <p className="text-zinc-600 mb-6">
          {lookup.status === 404 && "We couldn't find that invite."}
          {lookup.status === 410 && "This invite has expired or has already been used."}
          {lookup.status !== 404 && lookup.status !== 410 && (
            <>Something went wrong: {lookup.error}</>
          )}
        </p>
        <p className="text-zinc-500 text-sm mb-8">
          Ask whoever invited you to send a fresh link.
        </p>
        <Link
          href="/"
          className="inline-block px-5 py-2 rounded-lg bg-zinc-900 text-white text-sm hover:bg-zinc-700"
        >
          Back to froots.app
        </Link>
      </Shell>
    );
  }

  const { team_name, inviter_email, invited_email, expires_at } = lookup.data;
  const expiresIso = new Date(expires_at * 1000).toLocaleString();

  return (
    <Shell>
      <div className="mb-1 text-xs uppercase tracking-wide text-zinc-500">
        You&apos;re invited
      </div>
      <h1 className="text-2xl font-semibold text-zinc-900 mb-2">
        Join {team_name}
      </h1>
      <p className="text-zinc-600 mb-6">
        <span className="font-medium text-zinc-800">{inviter_email}</span> invited
        you to collaborate in {team_name} on Froots. You&apos;ll share the same
        knowledge base, skills, and widgets — changes show up on every
        device in real time.
      </p>

      <JoinForm
        token={token}
        billingBase={BILLING_BASE}
        suggestedEmail={invited_email}
      />

      <p className="mt-6 text-xs text-zinc-400">
        This invite expires {expiresIso}.
      </p>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-zinc-200/60 p-8">
        {children}
      </div>
    </div>
  );
}
