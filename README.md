This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploying (Fly.io — app `froots-ab`)

Always deploy with:

```bash
npm run deploy
```

**Never run bare `fly deploy`.** The npm script runs `scripts/guard-clean.js` first, which
refuses to deploy if the working tree is dirty or HEAD isn't pushed to `origin/main` — so
production is always reproducible from the remote. (On 2026-07-09 prod was shipped from a
dirty tree; 50 files existed in no commit until they were captured after the fact.)

The script also stamps the build with the deployed commit via the `GIT_SHA` Docker build
arg. Check what prod is running:

```bash
curl https://froots.ai/api/version   # → {"sha":"<commit>"}
```

A `-dirty` suffix on the SHA means someone used the emergency override:

```bash
npm run deploy:dirty   # real emergencies only — ships code not in git history
```
