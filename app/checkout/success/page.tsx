/// /checkout/success — landing page Stripe redirects to after a
/// successful Checkout. We immediately hand off to the motivex-billing
/// Worker's /activate endpoint, which provisions the Turso DB + mints
/// the app session + serves an HTML page that fires the froots://
/// deep-link.
///
/// The handoff is server-side (next/redirect) so we don't render an
/// extra paint flicker — the user goes straight from Stripe to the
/// "opening Froots app…" page.

import { redirect } from "next/navigation";

const BILLING_BASE =
  process.env.NEXT_PUBLIC_MOTIVEX_BILLING_BASE ??
  "https://motivex-billing.cryptodedefi.workers.dev";

export default async function CheckoutSuccess({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  if (!session_id) {
    redirect("/pricing");
  }
  redirect(
    `${BILLING_BASE}/activate?session_id=${encodeURIComponent(session_id)}`
  );
}
