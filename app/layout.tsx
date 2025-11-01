import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { criticalAssetPaths } from "@/constants/paths";
import ProgressLoader from "@/components/layouts/progress-loader";
import FirstVisitEffects from "@/components/layouts/first-visit-effects";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (typeof process !== "undefined" && process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FastestTruck",
    template: "%s | FastestTruck",
  },
  description: "FastestTruck — Deliver Faster. Safer. Smarter.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      th: "/th",
    },
  },
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "FastestTruck",
    description: "Your trusted logistics partner — Fastest Truck.",
    siteName: "FastestTruck",
    images: [
      {
        url: "/icon.svg",
        width: 512,
        height: 512,
        alt: "FastestTruck logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FastestTruck",
    description: "Your trusted logistics partner — Fastest Truck.",
    images: [
      {
        url: "/icon.svg",
        alt: "FastestTruck logo",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111827",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          // Ensure Next doesn't attempt to hydrate this static script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "FastestTruck",
              url: siteUrl,
              inLanguage: "en",
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteUrl}/?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@type": "Organization",
                name: "FastestTruck",
                url: siteUrl,
                logo: `${siteUrl}/icon.svg`,
              },
            }),
          }}
        />
        {/* Run first-visit fade-in effects (no-op after first load) */}
        <FirstVisitEffects />
        <ProgressLoader
          assets={criticalAssetPaths}
          includeFonts={true}
          minShowMs={700}
          backdropClass="bg-white"
        />
        {children}
      </body>
    </html>
  );
}
