import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "froots.ai" },
    ],
  },
  async redirects() {
    return [
      { source: "/blog.html", destination: "/blog", permanent: true },
      { source: "/download.html", destination: "/", permanent: true },
    ];
  },
  async rewrites() {
    return [{ source: "/docs", destination: "/docs.html" }];
  },
};

export default nextConfig;
