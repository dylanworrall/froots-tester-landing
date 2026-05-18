"use client";

import { useEffect, useState, type ComponentType } from "react";
import { Download } from "lucide-react";
import { FaApple, FaWindows, FaLinux } from "react-icons/fa";

const REL = "https://github.com/dylanworrall/froots/releases/download/v0.1.1";

type Platform = "mac" | "windows" | "linux" | "unknown";

interface Asset {
  label: string;
  shortLabel: string;
  href: string;
  platform: Platform;
  icon: ComponentType<{ className?: string }>;
}

const PRIMARY: Record<Platform, Asset> = {
  mac: {
    label: "Download for Mac",
    shortLabel: "Download",
    href: `${REL}/Froots_0.1.0_aarch64.dmg`,
    platform: "mac",
    icon: FaApple,
  },
  windows: {
    label: "Download for Windows",
    shortLabel: "Download",
    href: `${REL}/Froots_0.1.0_x64-setup.exe`,
    platform: "windows",
    icon: FaWindows,
  },
  linux: {
    label: "Download for Linux",
    shortLabel: "Download",
    href: `${REL}/Froots_0.1.0_amd64.AppImage`,
    platform: "linux",
    icon: FaLinux,
  },
  unknown: {
    label: "Download Froots",
    shortLabel: "Download",
    href: "https://github.com/dylanworrall/froots/releases/latest",
    platform: "unknown",
    icon: Download,
  },
};

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  const platform = (navigator.platform || "").toLowerCase();
  if (/mac|iphone|ipad|ipod|darwin/.test(ua + platform)) return "mac";
  if (/win/.test(ua + platform)) return "windows";
  if (/linux|x11|cros/.test(ua + platform)) return "linux";
  return "unknown";
}

type Variant = "hero" | "nav";

export function DownloadCta({
  variant = "hero",
  size = "lg",
}: {
  variant?: Variant;
  size?: "md" | "lg";
}) {
  const [asset, setAsset] = useState<Asset>(PRIMARY.unknown);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setAsset(PRIMARY[detectPlatform()]);
    setMounted(true);
  }, []);

  const Icon = asset.icon;

  if (variant === "nav") {
    return (
      <a
        href={asset.href}
        className="card-nav-cta-button inline-flex items-center gap-1.5 no-underline"
        aria-label={asset.label}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        <span>{mounted ? asset.shortLabel : "Download"}</span>
      </a>
    );
  }

  const padX = size === "lg" ? "px-7 py-3.5" : "px-5 py-2.5";

  return (
    <div className="flex flex-col items-center gap-2">
      <a
        href={asset.href}
        className={`group inline-flex items-center gap-2 rounded-full bg-foreground ${padX} text-sm font-medium text-background transition hover:opacity-90`}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        {mounted ? asset.label : "Download Froots"}
      </a>
      <div className="text-xs text-muted-foreground">
        {asset.platform === "unknown" ? (
          <a className="underline-offset-2 hover:underline" href="https://github.com/dylanworrall/froots/releases/latest">All platforms & assets</a>
        ) : (
          <>or <a className="underline-offset-2 hover:underline" href="https://github.com/dylanworrall/froots/releases/latest">pick another platform</a></>
        )}
      </div>
    </div>
  );
}
