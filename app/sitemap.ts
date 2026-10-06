import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog-posts";
import { getAllDocSlugs } from "@/lib/docs";

const SITE = "https://froots.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/docs`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/memory`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/models`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/routines`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/skills`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/pricing`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Note: paginated blog list pages (/blog/page/N) are intentionally excluded.
  // They are thin, non-canonical index pages; only canonical content URLs belong
  // in the sitemap.

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : undefined,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const docRoutes: MetadataRoute.Sitemap = getAllDocSlugs().map((slug) => ({
    url: `${SITE}/docs/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Use-case detail pages are unpublished for now — thin content, and the route
  // is noindexed. Restore these entries when they're rewritten.
  // const useCaseRoutes: MetadataRoute.Sitemap = useCaseOrder.map((slug) => ({
  //   url: `${SITE}/use-cases/${slug}`,
  //   changeFrequency: "monthly",
  //   priority: 0.6,
  // }));

  return [...staticRoutes, ...docRoutes, ...blogRoutes];
}
