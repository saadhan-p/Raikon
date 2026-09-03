import { ImageResponse } from "next/og";

export const alt = "Raikon - Digital Partner for Ambitious Businesses";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1a1a18",
          color: "#f5f2eb",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", fontSize: 34, letterSpacing: "-1px" }}>
          <span style={{ background: "#E14E26", display: "flex", height: 34, marginRight: 16, transform: "skewX(-24deg)", width: 12 }} />
          raikon
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#E14E26", fontSize: 31, letterSpacing: "5px", marginBottom: 24 }}>DIGITAL PARTNER</div>
          <div style={{ fontSize: 78, fontWeight: 700, letterSpacing: "-4px", lineHeight: 1.02, maxWidth: 920 }}>
            Build beyond generic tech.
          </div>
        </div>
        <div style={{ color: "#aaa79f", display: "flex", fontSize: 25, justifyContent: "space-between" }}>
          <span>Bespoke digital experiences that captivate and convert.</span>
          <span>raikon.tech</span>
        </div>
      </div>
    ),
    size,
  );
}
