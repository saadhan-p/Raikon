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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
