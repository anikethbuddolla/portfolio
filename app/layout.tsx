import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";
import CommandPalette from "@/components/CommandPalette";
import ScrollProgress from "@/components/ScrollProgress";
import DeferredAnalytics from "@/components/DeferredAnalytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Mono isn't used above the fold, so don't preload it — that frees
// high-priority bandwidth for Inter (the LCP text) at startup.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anikethbuddolla.vercel.app"),
  title: `${profile.name} — ${profile.title}`,
  description: profile.about,
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.about,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Let content extend into the safe areas (notch / Dynamic Island) on iPhones.
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#07090f" },
  ],
};

// Runs before paint to apply the saved/system theme and avoid a flash.
// Default to the dark "holographic glass" theme; only go light if the user
// has explicitly chosen it. Runs before paint to avoid a flash.
const themeScript = `(function(){document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t!=='light'){document.documentElement.classList.add('dark');}}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${inter.variable} ${mono.variable} font-sans antialiased`}
      >
        <ScrollProgress />
        {children}
        <CommandPalette />
        <DeferredAnalytics />
      </body>
    </html>
  );
}
