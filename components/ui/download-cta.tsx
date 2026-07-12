"use client";

import { useEffect, useState, type ComponentType } from "react";
import { Download, Smartphone } from "lucide-react";
import { FaApple, FaWindows, FaLinux } from "react-icons/fa";

// All platforms on v0.2.8 (updater-signed; macOS also Developer-ID-signed +
// notarized so it opens without the Gatekeeper prompt; Windows bundles the
// WebView2 offline installer). Auto-update via latest.json on the froots
// releases repo.
const DL = "https://github.com/dylanworrall/froots/releases/download";
const MAC_DMG = `${DL}/v0.2.9/Froots_0.2.9_aarch64.dmg`;
const WIN_EXE = `${DL}/v0.2.8/Froots_0.2.8_x64-setup.exe`;
const LINUX_APPIMAGE = `${DL}/v0.2.8/Froots_0.2.8_amd64.AppImage`;
const ALL_ASSETS = "https://github.com/dylanworrall/froots/releases";

type Platform = "mac" | "windows" | "linux" | "mobile" | "unknown";

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
    href: MAC_DMG,
    platform: "mac",
    icon: FaApple,
  },
  windows: {
    label: "Download for Windows",
    shortLabel: "Download",
    href: WIN_EXE,
    platform: "windows",
    icon: FaWindows,
  },
  linux: {
    label: "Download for Linux",
    shortLabel: "Download",
    href: LINUX_APPIMAGE,
    platform: "linux",
    icon: FaLinux,
  },
  // Phones and tablets can't run the desktop app — link to the release
  // page so they can email themselves a link or come back on a desktop.
  mobile: {
    label: "Desktop only — see all assets",
    shortLabel: "Desktop only",
    href: ALL_ASSETS,
    platform: "mobile",
    icon: Smartphone,
  },
  unknown: {
    label: "Download Froots",
    shortLabel: "Download",
    href: ALL_ASSETS,
    platform: "unknown",
    icon: Download,
  },
};

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  const platform = (navigator.platform || "").toLowerCase();
  // iPadOS 13+ reports as "MacIntel" but has touch — distinguish via
  // maxTouchPoints so iPad users don't get sent the desktop .dmg.
  const isIpadOS =
    platform === "macintel" &&
    typeof navigator.maxTouchPoints === "number" &&
    navigator.maxTouchPoints > 1;
  if (/iphone|ipad|ipod|android/.test(ua) || isIpadOS) return "mobile";
  if (/win/.test(ua + platform)) return "windows";
  if (/linux|x11|cros/.test(ua + platform)) return "linux";
  if (/mac|darwin/.test(ua + platform)) return "mac";
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
  const isMobile = asset.platform === "mobile";

  return (
    <div className="flex flex-col items-center gap-2">
      <a
        href={asset.href}
        className={`group inline-flex items-center gap-2 rounded-full ${
          isMobile ? "bg-muted text-muted-foreground" : "bg-foreground text-background"
        } ${padX} text-sm font-medium transition hover:opacity-90`}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        {mounted ? asset.label : "Download Froots"}
      </a>
      <div className="text-xs text-muted-foreground">
        {asset.platform === "unknown" ? (
          <a className="underline-offset-2 hover:underline" href={ALL_ASSETS}>All platforms & assets</a>
        ) : asset.platform === "mobile" ? (
          <>open this page on your Mac, PC, or Linux box</>
        ) : (
          <>or <a className="underline-offset-2 hover:underline" href={ALL_ASSETS}>pick another platform</a></>
        )}
      </div>
    </div>
  );
}
