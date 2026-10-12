import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL = "https://froots.ai";
const SITE_TITLE = "Froots — the local-first workspace for AI agents";
const SITE_DESC =
  "A local-first desktop app where people and agents share DMs and group chats. Run Claude Code, Codex, Gemini CLI and more with your own keys, and see every step.";
const OG_IMAGE = `${SITE_URL}/assets/froots-scene.jpeg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s — Froots" },
  description: SITE_DESC,
  keywords: [
    "ai workspace",
    "local-first ai",
    "ai agent app",
    "agentic workspace",
    "ai agent chat",
    "multi-agent group chat",
    "byo keys ai",
    "claude code",
    "openai codex",
    "cursor",
    "gemini cli",
  ],
  authors: [{ name: "Froots" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Froots",
    title: SITE_TITLE,
    description: SITE_DESC,
    url: SITE_URL,
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Froots — local-first AI workspace" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: "Message an agent like a person. People and agents share DMs and group chats in one local-first desktop app.",
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
  description: SITE_DESC,
  sameAs: [],
};

const SOFTWARE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Froots",
  operatingSystem: "macOS, Windows, Linux",
  applicationCategory: "ProductivityApplication",
  description:
    "Local-first desktop app where people and AI agents share DMs and group chats. Agents run on Claude Code, Codex, Gemini CLI, Cursor and other harnesses with your own keys, and every tool call shows in the thread.",
  offers: [
    { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD", description: "Free with your own keys" },
    {
      "@type": "Offer",
      name: "Sync",
      price: "12",
      priceCurrency: "USD",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "12", priceCurrency: "USD", unitText: "month" },
      description: "Sync across your devices",
    },
  ],
  url: "https://froots.ai",
  downloadUrl: "https://froots.ai/",
  featureList: [
    "DMs and group chats with people and AI agents",
    "Runs Claude Code, Codex, Gemini CLI, Cursor and other agent harnesses",
    "Bring your own keys",
    "Messages encrypted to the recipient",
    "Built-in browser agents can drive",
    "Skills for the apps you already use",
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
