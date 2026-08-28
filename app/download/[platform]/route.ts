import { NextResponse } from "next/server";

// Permanent download URLs: /download/mac, /download/windows, /download/linux.
//
// These never change, so nothing on the site has to be bumped after a release.
// The version is resolved here, on the server, by following GitHub's
// /releases/latest redirect and reading the tag out of the Location header.
// (latest.json can't be fetched from the browser — GitHub's release assets
// don't send CORS headers — which is why this is a route handler and not a
// client fetch.)
//
// FALLBACK_VERSION is only used if GitHub is unreachable. It does not need to
// be current for the buttons to work; it's a floor, not the source of truth.
const REPO = "https://github.com/dylanworrall/froots";
const FALLBACK_VERSION = "0.3.10";
const CACHE_MS = 10 * 60 * 1000;

const ASSET: Record<string, (v: string) => string> = {
  mac: (v) => `Froots_${v}_aarch64.dmg`,
  windows: (v) => `Froots_${v}_x64-setup.exe`,
  linux: (v) => `Froots_${v}_amd64.AppImage`,
};

let cached: { version: string; at: number } | null = null;

async function latestVersion(): Promise<string> {
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.version;

  try {
    // redirect: "manual" so we can read the tag instead of downloading the page.
    const res = await fetch(`${REPO}/releases/latest`, {
      redirect: "manual",
      cache: "no-store",
    });
    const tag = res.headers.get("location")?.match(/\/tag\/v?([0-9][^/?#]*)$/)?.[1];
    if (tag) {
      cached = { version: tag, at: Date.now() };
      return tag;
    }
  } catch {
    // fall through — a broken download button is worse than a stale one
  }

  return cached?.version ?? FALLBACK_VERSION;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ platform: string }> },
) {
  const { platform } = await params;
  const filename = ASSET[platform];

  // Unknown platform (or a phone): send them to the release page to pick.
  if (!filename) return NextResponse.redirect(`${REPO}/releases/latest`, 302);

  const version = await latestVersion();
  return NextResponse.redirect(
    `${REPO}/releases/download/v${version}/${filename(version)}`,
    302,
  );
}
