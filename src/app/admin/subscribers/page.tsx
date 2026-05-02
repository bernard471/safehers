import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import { Newsletter } from "@/models/Newsletter";
import SubscribersClient from "./SubscribersClient";

export default async function AdminSubscribersPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  let subscribers: any[] = [];
  try {
    await connectDB();
    const raw = await Newsletter.find().sort({ subscribedAt: -1 }).lean();
    subscribers = raw.map((s: any) => ({
      ...s,
      _id: s._id.toString(),
      subscribedAt: s.subscribedAt?.toISOString() ?? "",
    }));
  } catch {
    // DB unreachable
  }

  return <SubscribersClient subscribers={subscribers} />;
}
