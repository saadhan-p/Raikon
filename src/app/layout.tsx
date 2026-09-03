import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://raikon.tech"),
  applicationName: "Raikon",
  title: "Raikon | Digital Studio for Ambitious Brands",
  description: "Raikon is a Mysuru-based digital studio creating bespoke websites, digital products, and technology that move businesses forward.",
  keywords: ["digital studio", "web development Mysuru", "software development", "digital product development", "brand experience", "startup technology"],
  authors: [{ name: "Raikon" }],
  creator: "Raikon",
  publisher: "Raikon",
  category: "Digital agency",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Raikon | Digital Studio for Ambitious Brands",
    description: "Bespoke websites, digital products, and technology built with intention.",
    url: "/",
    siteName: "Raikon",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raikon | Digital Studio for Ambitious Brands",
    description: "Bespoke websites, digital products, and technology built with intention.",
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
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
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
