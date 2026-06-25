import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireRole } from "@/lib/rbac";
import { User } from "@/models/User";
import { Enrollment } from "@/models/Enrollment";

interface UserDoc { _id: string; name: string; email: string }

export async function GET() {
  try {
    const auth = await requireRole("institution_admin", "admin", "super_admin");
    if (!auth.authorized) return auth.response!;

    await connectDB();
    const user = await User.findById(auth.session!.user.id).select("institution");
    const instId = user?.institution;
    if (!instId) return NextResponse.json({ students: [] });

    const users = (await User.find({ institution: instId, role: "beneficiary" })
      .select("name email")
      .lean()) as unknown as UserDoc[];

    const userIds = users.map((u) => u._id);

    const enrollments = await Enrollment.find({ user: { $in: userIds } })
      .populate("course", "title")
      .select("user progress status course")
      .lean();

    const students = enrollments.map((e) => {
      const userId = String(e.user);
      const matchedUser = users.find((u) => String(u._id) === userId);
      return {
        _id: String(e._id),
        name: matchedUser?.name || "—",
        email: matchedUser?.email || "—",
        progress: e.progress as number,
        courseTitle: (e.course as { title?: string })?.title || "—",
        status: e.status as string,
      };
    });

    return NextResponse.json({ students });
  } catch {
    return NextResponse.json({ students: [] });
  }
}
