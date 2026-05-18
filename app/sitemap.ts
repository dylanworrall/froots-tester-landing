import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog-posts";
import { getTotalPages } from "@/lib/blog-pagination";

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
  ];

  const totalPages = getTotalPages();
  const paginationRoutes: MetadataRoute.Sitemap = [];
  for (let p = 2; p <= totalPages; p++) {
    paginationRoutes.push({ url: `${SITE}/blog/page/${p}`, changeFrequency: "weekly", priority: 0.5 });
  }

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : undefined,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...paginationRoutes, ...blogRoutes];
}
