import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";
import { Newsletter } from "@/models/Newsletter";
import { ResourceDownload } from "@/models/ResourceDownload";

async function getMetrics() {
  try {
    await connectDB();
    const [contacts, subscribers, downloads] = await Promise.all([
      Contact.countDocuments(),
      Newsletter.countDocuments(),
      ResourceDownload.countDocuments(),
    ]);
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();
    return { contacts, subscribers, downloads, recentContacts };
  } catch {
    return { contacts: 0, subscribers: 0, downloads: 0, recentContacts: [] };
  }
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { contacts, subscribers, downloads, recentContacts } =
    await getMetrics();

  const metrics = [
    { label: "Contact Submissions", value: contacts, color: "text-burgundy" },
    { label: "Newsletter Subscribers", value: subscribers, color: "text-moss" },
    { label: "Resource Downloads", value: downloads, color: "text-terracotta" },
  ];

  return (
    <>
      <div className="mb-10">
        <p className="eyebrow text-ink/40 mb-2">Welcome back</p>
        <h1 className="display text-4xl font-light">Dashboard</h1>
      </div>

      {/* Metric cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {metrics.map((m) => (
          <div key={m.label} className="bg-cream border border-ink/10 p-8">
            <p className="eyebrow text-xs text-ink/40 mb-3">{m.label}</p>
            <p className={`display text-5xl font-light ${m.color}`}>
              {m.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Recent contacts */}
      <div>
        <p className="eyebrow mb-6 text-ink/50">Recent Contact Submissions</p>
        {(recentContacts as any[]).length > 0 ? (
          <div className="bg-cream border border-ink/10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink/10">
                  <th className="text-left px-6 py-4 eyebrow text-xs text-ink/40">Name</th>
                  <th className="text-left px-6 py-4 eyebrow text-xs text-ink/40">Email</th>
                  <th className="text-left px-6 py-4 eyebrow text-xs text-ink/40">Interest</th>
                  <th className="text-left px-6 py-4 eyebrow text-xs text-ink/40">Date</th>
                </tr>
              </thead>
              <tbody>
                {(recentContacts as any[]).map((c: any) => (
                  <tr key={c._id} className="border-b border-ink/5">
                    <td className="px-6 py-4">{c.name}</td>
                    <td className="px-6 py-4 text-ink/60">{c.email}</td>
                    <td className="px-6 py-4">
                      <span className="eyebrow text-xs bg-burgundy/10 text-burgundy px-2 py-0.5">
                        {c.interest}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-ink/40">
                      {new Date(c.createdAt).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-cream border border-ink/10 p-10 text-center">
            <p className="text-ink/40 text-sm">
              No contact submissions yet. When MongoDB is connected and someone
              submits the contact form, submissions will appear here.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
