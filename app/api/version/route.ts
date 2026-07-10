export const dynamic = "force-dynamic";

// "What is prod running?" — answerable with:
//   curl https://froots.ai/api/version
// GIT_SHA is injected at build time by `npm run deploy` (see scripts/guard-clean.js).
// A "-dirty" suffix means it was shipped via the `npm run deploy:dirty` override.
export function GET() {
  const sha = process.env.NEXT_PUBLIC_GIT_SHA ?? "unknown";
  return Response.json(
    { sha },
    { headers: { "x-git-sha": sha, "cache-control": "no-store" } },
  );
}
