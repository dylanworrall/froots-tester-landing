import type { Metadata } from "next";
import { FeaturePage } from "@/components/ui/feature-page";
import { features } from "@/lib/features";
import { clampDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Skills",
  description: clampDescription(features.skills.tagline),
  alternates: { canonical: "/skills" },
  openGraph: { url: "https://froots.ai/skills" },
};

export default function SkillsPage() {
  return <FeaturePage feature={features.skills} />;
}
