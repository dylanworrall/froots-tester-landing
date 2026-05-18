import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL = "https://froots.ai";
const SITE_TITLE = "Froots — the local-first workspace for AI agents";
const SITE_DESC =
  "Run Claude Code, Codex, Cursor, or your own AI agent harness locally — with full visibility into every step. BYO model keys. Free forever.";
const OG_IMAGE = `${SITE_URL}/assets/froots-scene.jpeg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s — Froots" },
  description: SITE_DESC,
  keywords: [
    "ai workspace",
    "local-first ai",
    "notion alternative",
    "obsidian alternative",
    "ai agent app",
    "agentic workspace",
    "ai notes app",
    "markdown vault",
    "byo keys ai",
    "claude code",
    "openai codex",
    "cursor",
  ],
  authors: [{ name: "Froots" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Froots",
    title: SITE_TITLE,
    description:
      "Run AI agents — Claude Code, Codex, Cursor, your own harness — on a local-first desktop app with full visibility into every step. BYO model keys. Free forever.",
    url: SITE_URL,
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Froots — local-first AI workspace" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description:
      "Run Claude Code, Codex, Cursor, or your own AI agent harness — locally, with full visibility into every step.",
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.png"],
  },
};

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Froots",
  url: "https://froots.ai",
  logo: "https://froots.ai/assets/froots-logo.jpeg",
  description:
    "Local-first desktop app for running AI agents — Claude Code, Codex, Cursor, or your own harness — with full visibility into every step. Bring your own model keys.",
  sameAs: [],
};

const SOFTWARE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Froots",
  operatingSystem: "macOS, Windows, Linux",
  applicationCategory: "ProductivityApplication",
  description:
    "Local-first desktop app for running AI agents like Claude Code, OpenAI Codex, and Cursor — with full visibility into every tool call, file diff, browser session, and memory update. Bring your own model keys.",
  offers: [
    { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD", description: "Free forever with your own model API keys" },
    {
      "@type": "Offer",
      name: "Sync",
      price: "12",
      priceCurrency: "USD",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "12", priceCurrency: "USD", unitText: "month" },
      description: "Cross-device sync, memory snapshots, publish memory",
    },
  ],
  url: "https://froots.ai",
  downloadUrl: "https://froots.ai/",
  featureList: [
    "Local-first markdown vault",
    "Built-in AI agent harness",
    "Bring-your-own-key for any model",
    "End-to-end encrypted sync",
    "Routines that turn notes into tasks",
    "Skills system for connecting tools",
  ],
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Froots",
  url: "https://froots.ai",
  publisher: { "@type": "Organization", name: "Froots" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=document.documentElement;if(t==='light'){d.classList.remove('dark');}else if(t==='dark'){d.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_JSONLD) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSONLD) }} />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
        <Script id="ga4-loader" strategy="afterInteractive">
          {`(function(){var host=location.hostname.replace(/^www\\./,'');var id=host==='froots.md'?'G-8455N28R7R':'G-XLZPE1DW92';var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.appendChild(s);window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',id,{anonymize_ip:true});})();`}
        </Script>
        <Script src="/track.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
