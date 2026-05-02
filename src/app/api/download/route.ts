import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ResourceDownload } from "@/models/ResourceDownload";
import { getResourceById } from "@/lib/resources";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, resourceId, country } = body;

    // Validate email
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    // Validate resource
    const resource = getResourceById(resourceId);
    if (!resource) {
      return NextResponse.json(
        { error: "Resource not found." },
        { status: 404 }
      );
    }

    // Save to DB (graceful fallback)
    try {
      await connectDB();
      await ResourceDownload.create({ email, resourceId, country: country ?? "" });
    } catch (dbErr) {
      console.error("[download] DB error:", dbErr);
      // Still return the URL so the user can download even without DB
    }

    return NextResponse.json(
      { ok: true, downloadUrl: resource.downloadUrl, title: resource.title },
      { status: 200 }
    );
  } catch (err) {
    console.error("[download] error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
