/**
 * SEO metadata helpers.
 *
 * Centralizes canonical + Open Graph URL construction so that, for every page,
 * `openGraph.url` always equals the canonical URL. Also provides length-clamping
 * helpers for titles (<= 60 chars) and meta descriptions (<= 155 chars) so
 * generated metadata (e.g. from blog excerpts) stays within SEO limits without
 * altering the visible page copy.
 */

export const SITE_URL = "https://froots.ai";

/** Absolute URL for a site-relative path (leading slash optional). */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean === "/" ? "" : clean}`;
}

/**
 * Truncate at a word boundary so the result is <= max chars.
 * Adds a single-character ellipsis (…) when truncated, still within max.
 */
function clamp(input: string, max: number): string {
  const text = input.trim().replace(/\s+/g, " ");
  if (text.length <= max) return text;
  // Reserve one char for the ellipsis.
  const slice = text.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(" ");
  const base = lastSpace > max * 0.5 ? slice.slice(0, lastSpace) : slice;
  return `${base.replace(/[\s,;:.\-–—]+$/, "")}…`;
}

/** Clamp a page title used in `<title>` to <= 60 characters. */
export function clampTitle(title: string, max = 60): string {
  return clamp(title, max);
}

/** Clamp a meta description to <= 155 characters. */
export function clampDescription(description: string, max = 155): string {
  return clamp(description, max);
}
