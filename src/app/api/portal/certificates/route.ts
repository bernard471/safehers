import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Certificate } from "@/models/Certificate";
import { requireAuth } from "@/lib/rbac";

export async function GET() {
  try {
    const auth = await requireAuth();
    if (!auth.authorized) return auth.response!;

    await connectDB();
    const certificates = await Certificate.find({ user: auth.session!.user.id, isRevoked: false })
      .select("certificateId courseTitle userName issuedAt grade")
      .sort({ issuedAt: -1 })
      .lean();
    return NextResponse.json({ certificates });
  } catch {
    return NextResponse.json({ certificates: [] });
  }
}
