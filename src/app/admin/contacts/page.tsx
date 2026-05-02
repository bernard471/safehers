import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";
import ContactsClient from "./ContactsClient";

export default async function AdminContactsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  let contacts: any[] = [];
  try {
    await connectDB();
    const raw = await Contact.find().sort({ createdAt: -1 }).lean();
    contacts = raw.map((c: any) => ({
      ...c,
      _id: c._id.toString(),
      createdAt: c.createdAt?.toISOString() ?? "",
      updatedAt: c.updatedAt?.toISOString() ?? "",
    }));
  } catch {
    // DB unreachable — empty state shown
  }

  return <ContactsClient contacts={contacts} />;
}
