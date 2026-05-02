"use client";

import { useState } from "react";
import { Search, Download } from "lucide-react";

interface SubscriberRow {
  _id: string;
  email: string;
  subscribedAt: string;
}

function exportCSV(rows: SubscriberRow[]) {
  const headers = ["Email", "Subscribed Date"];
  const csvRows = [
    headers.join(","),
    ...rows.map((r) =>
      [
        `"${r.email}"`,
        `"${new Date(r.subscribedAt).toLocaleDateString("en-GB")}"`,
      ].join(",")
    ),
  ];
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `safehers-subscribers-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
}

export default function SubscribersClient({
  subscribers,
}: {
  subscribers: SubscriberRow[];
}) {
  const [search, setSearch] = useState("");

  const filtered = subscribers.filter(
    (s) =>
      search === "" || s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="mb-10 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="eyebrow text-ink/40 mb-2">Admin</p>
          <h1 className="display text-4xl font-light">
            Newsletter Subscribers
            <span className="ml-3 text-ink/30 text-2xl">({subscribers.length})</span>
          </h1>
        </div>
        <button
          onClick={() => exportCSV(filtered)}
          className="flex items-center gap-2 border border-ink px-5 py-2.5 eyebrow text-xs hover:bg-ink hover:text-cream transition-colors"
        >
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative inline-block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-ink/20 pl-9 pr-4 py-2.5 text-sm outline-none focus:border-ink/50 bg-cream w-72"
          />
        </div>
      </div>

      {/* Table */}
      {filtered.length > 0 ? (
        <div className="bg-cream border border-ink/10 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/10">
                {["#", "Email", "Subscribed"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-4 eyebrow text-xs text-ink/40"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s._id} className="border-b border-ink/5 hover:bg-bone/50">
                  <td className="px-6 py-4 text-ink/30 text-xs">
                    {String(i + 1).padStart(3, "0")}
                  </td>
                  <td className="px-6 py-4">{s.email}</td>
                  <td className="px-6 py-4 text-ink/40">
                    {new Date(s.subscribedAt).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-cream border border-ink/10 p-10 text-center">
          <p className="text-ink/40 text-sm">
            {subscribers.length === 0
              ? "No subscribers yet."
              : "No results match your search."}
          </p>
        </div>
      )}
    </>
  );
}
