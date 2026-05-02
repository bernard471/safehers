import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Registration } from "@/models/Registration";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace("Bearer ", "").trim();
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken || token !== adminToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const registrations = await Registration.find({})
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ registrations });
  } catch (err) {
    console.error("[admin/registrations] DB error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
