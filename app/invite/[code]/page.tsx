/// Public community-invite landing — /invite/<code>  (task B1.3).
///
/// This is the whole Discord join loop: someone shares froots.ai/invite/<code>,
/// the recipient clicks it, and they end up inside the community. The page
/// itself does three things and no more:
///
///   1. Server-resolves the code against the motivex-billing Worker
///      (`GET /community/invite/:code`, public, added by B1.2) so a dead
///      link says WHY it's dead — not found / revoked / expired / used up —
///      before anyone bothers downloading anything.
///   2. Hands off to the desktop app via a `froots://invite?...` deep link.
///   3. Falls back to a platform-aware download when the app isn't installed.
///
/// Deliberately NOT here: the claim itself. Claiming an invite needs an
/// authenticated account session, and the only place that session lives is
/// the desktop app — so the app performs the claim against the Worker
/// (B1.4) once the deep link lands. The browser never sees a credential,
/// which is also why there's no email form on this page (unlike the
/// workspace `/join/<token>` flow, which mints a brand-new account).
///
/// One wrinkle worth knowing: the Worker's metadata response has no
/// community NAME. Communities are rows in the workspace Turso DB; only
/// membership and invites are server-authoritative in the Worker's D1
/// (see migrations/0004_community_invites.sql). So the copy here says "a
/// Froots community" and shows the id as a support handle rather than
/// inventing a name the control plane doesn't have.

import type { Metadata } from "next";
import Link from "next/link";
import { InviteHandoff } from "./invite-handoff";

const BILLING_BASE =
  process.env.NEXT_PUBLIC_MOTIVEX_BILLING_BASE ??
  "https://motivex-billing.cryptodedefi.workers.dev";

/// Why an otherwise-real invite is dead. Mirrors the Worker's
/// `InviteInvalidReason`.
type InvalidReason = "revoked" | "expired" | "exhausted";

interface InviteMetadata {
  community_id: string;
  role: "admin" | "member";
  /** Unix seconds; null means the invite never expires. */
  expires_at: number | null;
  /** null means unlimited uses. */
  max_uses: number | null;
  uses: number;
  /** null when unlimited. */
  remaining_uses: number | null;
}

type Lookup =
  | { ok: true; data: InviteMetadata }
  | { ok: false; status: number; reason: InvalidReason | null; error: string };

async function fetchInvite(code: string): Promise<Lookup> {
  try {
    const res = await fetch(
      `${BILLING_BASE}/community/invite/${encodeURIComponent(code)}`,
      // Server-side fetch, never cached: an invite can be revoked or used
      // up between two clicks of the same link.
      { cache: "no-store" }
    );
    if (!res.ok) {
      let error = `${res.status}`;
      let reason: InvalidReason | null = null;
      try {
        const j = (await res.json()) as { error?: string; reason?: string };
        if (j.error) error = j.error;
        if (j.reason === "revoked" || j.reason === "expired" || j.reason === "exhausted") {
          reason = j.reason;
        }
      } catch {
        // Non-JSON body — fall back to the status code.
      }
      return { ok: false, status: res.status, reason, error };
    }
    return { ok: true, data: (await res.json()) as InviteMetadata };
  } catch (e) {
    // Worker unreachable. Distinct from "invite is dead" — say so, because
    // the fix is "try again later", not "ask for a new link".
    return {
      ok: false,
      status: 0,
      reason: null,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

/// Invite URLs are private links, not content. Keep them out of the index
/// even if one gets pasted somewhere public.
export const metadata: Metadata = {
  title: "Join a community",
  description: "Accept a Froots community invite.",
  robots: { index: false, follow: false },
};

export default async function InvitePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const lookup = await fetchInvite(code);

  if (!lookup.ok) {
    return (
      <Shell>
        <Eyebrow>Invite</Eyebrow>
        <h1 className="text-2xl font-semibold tracking-tight">
          {lookup.status === 0 ? "Couldn't check this invite" : "This invite isn't usable"}
        </h1>
        <p className="mt-3 text-muted-foreground">{deadInviteCopy(lookup)}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          {lookup.status === 0
            ? "That's on our side, not yours — give it a minute and reload."
            : "Ask whoever invited you for a fresh link."}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
        >
          Go to froots.ai
        </Link>
      </Shell>
    );
  }

  const { community_id, role, expires_at, remaining_uses } = lookup.data;

  return (
    <Shell>
      <Eyebrow>You&apos;re invited</Eyebrow>
      <h1 className="text-2xl font-semibold tracking-tight">
        Join a Froots community
      </h1>
      <p className="mt-3 text-muted-foreground">
        You&apos;ll join as{" "}
        <span className="font-medium text-foreground">
          {role === "admin" ? "an admin" : "a member"}
        </span>
        . Communities share channels, knowledge, and agents — everything syncs
        to every device you sign in on.
      </p>

      <InviteHandoff code={code} communityId={community_id} role={role} />

      <dl className="mt-8 space-y-1.5 text-xs text-muted-foreground">
        <Row label="Expires">{expiryCopy(expires_at)}</Row>
        <Row label="Uses left">
          {remaining_uses === null ? "Unlimited" : `${remaining_uses}`}
        </Row>
        <Row label="Community">
          <span className="font-mono">{community_id}</span>
        </Row>
      </dl>
    </Shell>
  );
}

function deadInviteCopy(lookup: Extract<Lookup, { ok: false }>): string {
  switch (lookup.reason) {
    case "revoked":
      return "An admin revoked this invite link.";
    case "expired":
      return "This invite link has expired.";
    case "exhausted":
      return "This invite link has already been used the maximum number of times.";
    default:
      break;
  }
  if (lookup.status === 404) return "We couldn't find that invite code.";
  if (lookup.status === 410) return "This invite link is no longer active.";
  if (lookup.status === 0) return "We couldn't reach Froots to check this invite.";
  return `Something went wrong: ${lookup.error}`;
}

function expiryCopy(expiresAt: number | null): string {
  if (expiresAt === null) return "Never";
  // Rendered on the server, so this is UTC rather than the visitor's zone.
  // Say so instead of quietly showing them the wrong clock.
  return `${new Date(expiresAt * 1000).toISOString().replace("T", " ").slice(0, 16)} UTC`;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt>{label}</dt>
      <dd className="text-right text-foreground/70">{children}</dd>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
      {children}
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-card-foreground shadow-sm">
        {children}
      </div>
    </main>
  );
}
