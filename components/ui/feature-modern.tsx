"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};
type ContainerProps = SectionProps;

const Section = ({ children, className, id }: SectionProps) => (
  <section className={cn("py-8 md:py-12", className)} id={id}>
    {children}
  </section>
);

const Container = ({ children, className, id }: ContainerProps) => (
  <div className={cn("mx-auto max-w-5xl p-6 sm:p-8", className)} id={id}>
    {children}
  </div>
);

type FeatureSplitProps = {
  title?: string;
  description?: string;
  imageSrc?: string;
  /** When set, plays a looping demo video; imageSrc becomes the poster frame. */
  videoSrc?: string;
  imageAlt?: string;
  primaryCta?: string;
  secondaryCta?: string;
  reverse?: boolean;
};

export function FeatureSplit({
  title = "One dashboard, every workflow",
  description = "Track revenue, manage customers, and ship updates from a single surface designed for speed and clarity.",
  imageSrc = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
  videoSrc,
  imageAlt = "dashboard",
  primaryCta = "Get Started",
  secondaryCta = "Learn More →",
  reverse = false,
}: FeatureSplitProps) {
  return (
    <Section>
      <Container className="grid items-stretch md:grid-cols-2 md:gap-12">
        <div
          className={cn(
            "relative h-96 w-full overflow-hidden rounded-2xl border border-border bg-white",
            reverse && "md:order-2",
          )}
        >
          {videoSrc ? (
            <video
              src={videoSrc}
              poster={imageSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={imageAlt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt={imageAlt}
              className="absolute inset-0 w-full h-full object-contain p-6"
            />
          )}
        </div>

        <div
          className={cn(
            "flex flex-col gap-6 py-8",
            reverse && "md:order-1",
          )}
        >
          <h3 className="text-3xl md:text-4xl !my-0">{title}</h3>
          <p className="font-light leading-[1.4] opacity-70">{description}</p>

          <div className="flex items-center gap-2">
            <Button className="w-fit" asChild>
              <Link href="#">{primaryCta}</Link>
            </Button>
            <Button className="w-fit" variant="link" asChild>
              <Link href="#">{secondaryCta}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
