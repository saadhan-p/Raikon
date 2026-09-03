import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Raikon",
    short_name: "Raikon",
    description: "Digital partner for ambitious businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1a18",
    theme_color: "#1a1a18",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
