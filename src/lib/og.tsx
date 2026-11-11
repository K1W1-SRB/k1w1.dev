import { ImageResponse } from "next/og";
import { SITE, locationLabel } from "@/constants/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** Shared Open Graph card. Every route's opengraph-image.tsx renders through this. */
export function renderOg({
  eyebrow,
  title,
  subtitle = `${SITE.name} · ${locationLabel}`,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  const titleSize = title.length > 60 ? 52 : title.length > 36 ? 64 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0e0e10 0%, #1c1c21 60%, #0f2a12 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, fontWeight: 800, color: "#39a835", letterSpacing: -1 }}>
          {SITE.brand}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow && (
            <div style={{ display: "flex", fontSize: 28, color: "#839cb5", textTransform: "uppercase", letterSpacing: 4 }}>
              {eyebrow}
            </div>
          )}
          <div style={{ display: "flex", fontSize: titleSize, fontWeight: 700, marginTop: 16, lineHeight: 1.1 }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 32, marginTop: 24, color: "#d9ecff" }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#839cb5" }}>{SITE.url.replace("https://", "")}</div>
      </div>
    ),
    OG_SIZE
  );
}
