import type { Metadata } from "next";
import { FeaturePage } from "@/components/ui/feature-page";
import { features } from "@/lib/features";
import { clampDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Routines",
  description: clampDescription(features.routines.tagline),
  alternates: { canonical: "/routines" },
  openGraph: { url: "https://froots.ai/routines" },
};

export default function RoutinesPage() {
  return <FeaturePage feature={features.routines} />;
}
