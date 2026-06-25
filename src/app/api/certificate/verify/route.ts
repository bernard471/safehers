import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Certificate } from "@/models/Certificate";
import { checkRateLimit } from "@/lib/rateLimiter";

export async function GET(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!(await checkRateLimit(ip, "verify"))) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Certificate ID required." }, { status: 400 });
    }
    await connectDB();
    const cert = await Certificate.findOne({ certificateId: id })
      .select("certificateId userName courseTitle issuedAt grade isRevoked")
      .lean();
    if (!cert) {
      return NextResponse.json({ error: "Certificate not found." }, { status: 404 });
    }
    return NextResponse.json({ certificate: cert });
  } catch {
    return NextResponse.json({ error: "Verification failed." }, { status: 500 });
  }
}
