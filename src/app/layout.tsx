import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raikon | Innovative Digital Partner & Tech Fixers",
  description: "We don't build websites. We build digital weapons for businesses that refuse to blend in. Explore our growth partnership and royalty models.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
