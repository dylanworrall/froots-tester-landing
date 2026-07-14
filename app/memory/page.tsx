import type { Metadata } from "next";
import { FeaturePage } from "@/components/ui/feature-page";
import { features } from "@/lib/features";
import { clampDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Memory",
  description: clampDescription(features.memory.tagline),
  alternates: { canonical: "/memory" },
  openGraph: { url: "https://froots.ai/memory" },
};

export default function MemoryPage() {
  return <FeaturePage feature={features.memory} />;
}
