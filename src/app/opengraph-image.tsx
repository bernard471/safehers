import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SafeHer Foundation — Pretty Girl, Save Yourself. Women's safety education across Africa.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0C0C0E",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 20% 80%, rgba(92,31,46,0.35) 0%, transparent 60%), " +
              "radial-gradient(ellipse at 80% 20%, rgba(184,150,62,0.15) 0%, transparent 55%)",
          }}
        />

        {/* Decorative mark */}
        <div
          style={{
            position: "absolute",
            top: 64,
            right: 80,
            fontSize: 120,
            color: "#B8963E",
            opacity: 0.2,
            lineHeight: 1,
          }}
        >
          ✦
        </div>

        {/* Logo wordmark */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 80,
            display: "flex",
            alignItems: "baseline",
            gap: 12,
          }}
        >
          <span style={{ color: "#FAF7F1", fontSize: 28, letterSpacing: "-0.02em" }}>
            SafeHer
          </span>
          <span style={{ color: "#B8963E", fontSize: 13, fontFamily: "monospace", letterSpacing: "0.18em", textTransform: "uppercase" as const }}>
            Foundation
          </span>
        </div>

        {/* Headline */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 13,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: "#B8963E",
              opacity: 0.8,
              marginBottom: 20,
            }}
          >
            Ghana-US Women&apos;s Safety Foundation
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 300,
              color: "#FAF7F1",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 900,
            }}
          >
            Pretty Girl,
            <br />
            <span style={{ color: "#B8963E", fontStyle: "italic" }}>Save Yourself.</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontFamily: "monospace",
              fontSize: 14,
              letterSpacing: "0.1em",
              color: "#FAF7F1",
              opacity: 0.4,
            }}
          >
            safehers.africa
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
