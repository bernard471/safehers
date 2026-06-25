import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Certificate } from "@/models/Certificate";
import { requireAuth } from "@/lib/rbac";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth();
    if (!auth.authorized) return auth.response!;

    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Certificate ID required." }, { status: 400 });

    await connectDB();
    const certDoc = await Certificate.findOne({
      certificateId: id,
      user: auth.session!.user.id,
      isRevoked: false,
    }).lean();

    if (!certDoc) return NextResponse.json({ error: "Certificate not found." }, { status: 404 });

    const cert = certDoc as unknown as {
      certificateId: string; userName: string; courseTitle: string;
      issuedAt: Date; grade?: string;
    };

    const issuedDate = new Date(cert.issuedAt as Date).toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric",
    });

    const verifyUrl = `https://safehers.africa/certificate/verify/${cert.certificateId}`;
    const isOnlineSafety = (cert.courseTitle as string).toLowerCase().includes("online") ||
      (cert.courseTitle as string).toLowerCase().includes("cyber") ||
      (cert.courseTitle as string).toLowerCase().includes("phone") ||
      (cert.courseTitle as string).toLowerCase().includes("sextortion");
    const signatory = isOnlineSafety ? "DK Cyber" : "Zarinah Knows";
    const signatoryTitle = isOnlineSafety
      ? "Co-Founder & Director of Operations"
      : "Co-Founder & Executive Director";

    // Generate an HTML-based printable certificate (PDF via browser print)
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Certificate — ${cert.certificateId}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;1,400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
@page{size:landscape;margin:0}
body{width:297mm;height:210mm;background:#0C0C0E;color:#FAF7F1;font-family:Georgia,serif;display:flex;align-items:center;justify-content:center;position:relative}
.border{position:absolute;inset:12mm;border:2px solid #B8963E}
.border-inner{position:absolute;inset:16mm;border:1px solid rgba(184,150,62,0.3)}
.content{text-align:center;position:relative;z-index:1;max-width:220mm}
.star{color:#B8963E;font-size:28pt;margin-bottom:8mm}
.org{font-family:monospace;font-size:9pt;letter-spacing:0.25em;text-transform:uppercase;color:#B8963E;margin-bottom:3mm}
.title{font-size:10pt;letter-spacing:0.3em;text-transform:uppercase;color:rgba(250,247,241,0.4);font-family:monospace;margin-bottom:12mm}
.name{font-size:36pt;font-weight:300;letter-spacing:-0.02em;margin-bottom:6mm;font-family:'Fraunces',Georgia,serif}
.divider{width:60px;height:1px;background:#B8963E;margin:0 auto 6mm}
.completed{font-size:13pt;color:rgba(250,247,241,0.7);margin-bottom:3mm}
.course{font-size:18pt;font-style:italic;color:#B8963E;margin-bottom:15mm;font-family:'Fraunces',Georgia,serif}
.details{font-family:monospace;font-size:8pt;color:rgba(250,247,241,0.4);letter-spacing:0.1em;margin-bottom:12mm;display:flex;gap:30px;justify-content:center}
.signature{display:flex;justify-content:center;gap:60px;margin-bottom:8mm}
.sig-block{text-align:center}
.sig-line{width:120px;height:1px;background:rgba(250,247,241,0.2);margin:0 auto 4mm}
.sig-name{font-size:10pt;color:#B8963E;margin-bottom:2mm}
.sig-title{font-size:7pt;color:rgba(250,247,241,0.3);font-family:monospace;letter-spacing:0.1em;text-transform:uppercase}
.verify{position:absolute;bottom:8mm;left:0;right:0;text-align:center;font-family:monospace;font-size:7pt;color:rgba(250,247,241,0.2);letter-spacing:0.1em}
.qr{margin-top:4mm;font-size:7pt;color:rgba(250,247,241,0.15)}
@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style>
</head>
<body>
<div class="border"></div>
<div class="border-inner"></div>
<div class="content">
<div class="star">✦</div>
<div class="org">SafeHer Foundation</div>
<div class="title">Certificate of Completion</div>
<div class="name">${cert.userName}</div>
<div class="divider"></div>
<div class="completed">has successfully completed</div>
<div class="course">${cert.courseTitle}</div>
<div class="details">
<span>ID: ${cert.certificateId}</span>
<span>Issued: ${issuedDate}</span>
${cert.grade ? `<span>Grade: ${cert.grade}</span>` : ""}
</div>
<div class="signature">
<div class="sig-block">
<div class="sig-line"></div>
<div class="sig-name">${signatory}</div>
<div class="sig-title">${signatoryTitle}</div>
</div>
<div class="sig-block">
<div class="sig-line"></div>
<div class="sig-name">SafeHer Foundation</div>
<div class="sig-title">Issuing Authority</div>
</div>
</div>
</div>
<div class="verify">Verify: ${verifyUrl}<div class="qr">safehers.africa</div></div>
</body>
</html>`;

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `inline; filename="SafeHer-Certificate-${cert.certificateId}.html"`,
      },
    });
  } catch (err) {
    console.error("[certificates/pdf]", err);
    return NextResponse.json({ error: "Failed." }, { status: 500 });
  }
}
