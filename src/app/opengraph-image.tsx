import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SafeHers — Safety education for women across Africa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0E0E10",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Grain texture overlay simulation */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 20% 80%, rgba(92,31,46,0.35) 0%, transparent 60%), " +
              "radial-gradient(ellipse at 80% 20%, rgba(92,31,46,0.2) 0%, transparent 55%)",
          }}
        />

        {/* Decorative mark */}
        <div
          style={{
            position: "absolute",
            top: 64,
            right: 80,
            fontSize: 120,
            color: "#E8B4B8",
            opacity: 0.25,
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
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ color: "#FAF6EF", fontSize: 28, letterSpacing: "-0.02em" }}>
            SafeHers
          </span>
          <span style={{ color: "#E8B4B8", fontSize: 22 }}>✦</span>
        </div>

        {/* Headline */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 13,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#FAF6EF",
              opacity: 0.5,
              marginBottom: 20,
            }}
          >
            Safety education for women
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 300,
              color: "#FAF6EF",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 900,
            }}
          >
            Knowledge is the
            <span style={{ color: "#E8B4B8", fontStyle: "italic" }}> first</span>
            <br />
            line of defence.
          </div>
          <div
            style={{
              marginTop: 28,
              fontFamily: "monospace",
              fontSize: 14,
              letterSpacing: "0.1em",
              color: "#FAF6EF",
              opacity: 0.45,
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
