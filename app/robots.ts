import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    // Invite and workspace-join links are private handoffs, not content —
    // a crawler that indexes one leaks a live join link into search results.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/invite/", "/join/"] }],
    sitemap: "https://froots.ai/sitemap.xml",
    host: "https://froots.ai",
  };
}
