import { ImageResponse } from "next/og";
import { SITE, locationLabel } from "@/constants/site";

export const alt = `${SITE.brand} – Freelance Web App Developer in ${locationLabel}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0e0e10 0%, #1c1c21 60%, #3a2410 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 800, letterSpacing: -4, color: "#cd7c2e" }}>
          {SITE.brand}
        </div>
        <div style={{ fontSize: 60, fontWeight: 700, marginTop: 20 }}>
          Freelance Web App Developer
        </div>
        <div style={{ fontSize: 36, marginTop: 24, color: "#d9ecff" }}>
          {`${SITE.name} · ${locationLabel}`}
        </div>
        <div style={{ fontSize: 28, marginTop: 48, color: "#839cb5" }}>
          {SITE.url.replace("https://", "")}
        </div>
      </div>
    ),
    size
  );
}
