"use client";

/// The handoff half of /invite/<code>: browser → desktop app.
///
/// We do NOT auto-fire the protocol handler on mount. Chrome and Safari
/// only reliably launch an external scheme off a user gesture, and when the
/// app isn't installed an auto-fire produces a browser error dialog before
/// the visitor has read a single word. So: one explicit button, then a
/// "didn't open?" panel with the download.
///
/// The code is carried in the deep link rather than claimed here on purpose
/// — see the note at the top of page.tsx. The app holds the account session
/// and calls the Worker's claim endpoint (B1.4) itself.

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { DownloadCta } from "@/components/ui/download-cta";

export function InviteHandoff({
  code,
  communityId,
  role,
}: {
  code: string;
  communityId: string;
  role: "admin" | "member";
}) {
  const [opened, setOpened] = useState(false);

  const deepLink =
    `froots://invite` +
    `?code=${encodeURIComponent(code)}` +
    `&community_id=${encodeURIComponent(communityId)}` +
    `&role=${encodeURIComponent(role)}`;

  if (opened) {
    return (
      <div className="mt-6 rounded-xl border border-border bg-secondary/60 p-5">
        <div className="font-medium">Opening Froots…</div>
        <p className="mt-1 text-sm text-muted-foreground">
          Accept the invite in the app to finish joining. If nothing happened,
          Froots probably isn&apos;t installed on this machine yet.
        </p>
        <a
          href={deepLink}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
        >
          Try opening it again
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <div className="mt-6 border-t border-border pt-5">
          <p className="mb-3 text-sm text-muted-foreground">
            Don&apos;t have the app? Install it, then come back to this link.
          </p>
          <DownloadCta size="md" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <a
        href={deepLink}
        onClick={() => setOpened(true)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
      >
        Open in Froots
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Froots is a desktop app — the invite is accepted there, so your account
        stays out of the browser.
      </p>
    </div>
  );
}
