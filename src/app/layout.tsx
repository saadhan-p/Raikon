import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://raikon.tech"),
  title: "Raikon | Innovative Digital Partner & Tech Fixers",
  description: "We don't build websites. We build digital weapons for businesses that refuse to blend in. Explore our growth partnership and royalty models.",
  keywords: ["digital agency", "tech fixers", "web development Mysuru", "software development", "growth partnership", "startup tech partner"],
  authors: [{ name: "Raikon" }],
  creator: "Raikon",
  publisher: "Raikon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Raikon | Innovative Digital Partner & Tech Fixers",
    description: "We don't build websites. We build digital weapons for businesses that refuse to blend in.",
    url: "https://raikon.tech",
    siteName: "Raikon",
    images: [
      {
        url: "/favicon.svg", // Fallback to our nice new logo for now
        width: 800,
        height: 600,
        alt: "Raikon Logo",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raikon | Innovative Digital Partner & Tech Fixers",
    description: "We don't build websites. We build digital weapons for businesses that refuse to blend in.",
    images: ["/favicon.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Improved accessibility
};

import { Nova_Round } from 'next/font/google'

const novaRound = Nova_Round({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-nova-round',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={novaRound.variable}>
        {children}
      </body>
    </html>
  );
}
