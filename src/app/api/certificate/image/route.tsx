import { ImageResponse } from "next/og";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Certificate ID required." }, { status: 400 });
  }

  try {
    const baseUrl = req.nextUrl.origin;
    const verifyRes = await fetch(`${baseUrl}/api/certificate/verify?id=${encodeURIComponent(id)}`);
    if (!verifyRes.ok) {
      return NextResponse.json({ error: "Certificate not found." }, { status: 404 });
    }
    const { certificate: cert } = await verifyRes.json() as {
      certificate: { certificateId: string; userName: string; courseTitle: string; issuedAt: string; grade?: string; isRevoked: boolean };
    };

    if (!cert || cert.isRevoked) {
      return NextResponse.json({ error: "Certificate not found or revoked." }, { status: 404 });
    }

    const issuedDate = new Date(cert.issuedAt).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#0C0C0E",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 80px",
            fontFamily: "Georgia, serif",
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", inset: "20px", border: "2px solid #B8963E", display: "flex" }} />
          <div style={{ position: "absolute", inset: "28px", border: "1px solid rgba(184,150,62,0.3)", display: "flex" }} />

          <div style={{ color: "#B8963E", fontSize: 36, marginBottom: 16 }}>✦</div>

          <div style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "#B8963E", marginBottom: 8 }}>
            SafeHer Foundation
          </div>
          <div style={{ fontSize: 14, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(250,247,241,0.4)", fontFamily: "monospace", marginBottom: 40 }}>
            Certificate of Completion
          </div>

          <div style={{ fontSize: 48, fontWeight: 300, color: "#FAF7F1", letterSpacing: "-0.02em", marginBottom: 12, textAlign: "center" }}>
            {cert.userName}
          </div>

          <div style={{ width: 80, height: 1, background: "#B8963E", marginBottom: 20 }} />

          <div style={{ fontSize: 18, color: "rgba(250,247,241,0.7)", textAlign: "center", marginBottom: 8, maxWidth: 600 }}>
            has successfully completed
          </div>
          <div style={{ fontSize: 24, fontStyle: "italic", color: "#B8963E", textAlign: "center", marginBottom: 40, maxWidth: 600 }}>
            {cert.courseTitle}
          </div>

          <div style={{ display: "flex", gap: 40, fontFamily: "monospace", fontSize: 11, color: "rgba(250,247,241,0.4)", letterSpacing: "0.1em" }}>
            <span>ID: {cert.certificateId}</span>
            <span>ISSUED: {issuedDate}</span>
            {cert.grade && <span>GRADE: {cert.grade}</span>}
          </div>

          <div style={{ position: "absolute", bottom: 40, fontFamily: "monospace", fontSize: 10, color: "rgba(250,247,241,0.25)", letterSpacing: "0.1em" }}>
            Verify: safehers.africa/certificate/verify/{cert.certificateId}
          </div>
        </div>
      ),
      { width: 900, height: 636 }
    );
  } catch {
    return NextResponse.json({ error: "Failed to generate certificate." }, { status: 500 });
  }
}
