"use client";

import { useState } from "react";
import { Search, Download } from "lucide-react";

interface ContactRow {
  _id: string;
  name: string;
  email: string;
  organization?: string;
  interest: string;
  country?: string;
  message: string;
  createdAt: string;
}

const INTERESTS = [
  "all",
  "certification",
  "institutional",
  "partnership",
  "speaking",
  "media",
  "other",
];

function exportCSV(rows: ContactRow[]) {
  const headers = ["Name", "Email", "Organization", "Interest", "Country", "Message", "Date"];
  const csvRows = [
    headers.join(","),
    ...rows.map((r) =>
      [
        `"${r.name}"`,
        `"${r.email}"`,
        `"${r.organization ?? ""}"`,
        `"${r.interest}"`,
        `"${r.country ?? ""}"`,
        `"${r.message.replace(/"/g, '""')}"`,
        `"${new Date(r.createdAt).toLocaleDateString("en-GB")}"`,
      ].join(",")
    ),
  ];
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `safehers-contacts-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
}

export default function ContactsClient({ contacts }: { contacts: ContactRow[] }) {
  const [search, setSearch] = useState("");
  const [interest, setInterest] = useState("all");

  const filtered = contacts.filter((c) => {
    const matchesSearch =
      search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.organization ?? "").toLowerCase().includes(search.toLowerCase());
    const matchesInterest = interest === "all" || c.interest === interest;
    return matchesSearch && matchesInterest;
  });

  return (
    <>
      <div className="mb-10 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="eyebrow text-ink/40 mb-2">Admin</p>
          <h1 className="display text-4xl font-light">
            Contact Submissions
            <span className="ml-3 text-ink/30 text-2xl">({contacts.length})</span>
          </h1>
        </div>
        <button
          onClick={() => exportCSV(filtered)}
          className="flex items-center gap-2 border border-ink px-5 py-2.5 eyebrow text-xs hover:bg-ink hover:text-cream transition-colors"
        >
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
          <input
            type="text"
            placeholder="Search name, email, org..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-ink/20 pl-9 pr-4 py-2.5 text-sm outline-none focus:border-ink/50 bg-cream w-64"
          />
        </div>
        <select
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="border border-ink/20 px-4 py-2.5 text-sm outline-none focus:border-ink/50 bg-cream eyebrow"
        >
          {INTERESTS.map((i) => (
            <option key={i} value={i}>
              {i === "all" ? "All interests" : i}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {filtered.length > 0 ? (
        <div className="bg-cream border border-ink/10 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/10">
                {["Name", "Email", "Organisation", "Interest", "Country", "Date"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-4 eyebrow text-xs text-ink/40 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c._id} className="border-b border-ink/5 hover:bg-bone/50">
                  <td className="px-6 py-4 font-medium whitespace-nowrap">{c.name}</td>
                  <td className="px-6 py-4 text-ink/60">{c.email}</td>
                  <td className="px-6 py-4 text-ink/60">{c.organization ?? "—"}</td>
                  <td className="px-6 py-4">
                    <span className="eyebrow text-xs bg-burgundy/10 text-burgundy px-2 py-0.5">
                      {c.interest}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-ink/60">{c.country ?? "—"}</td>
                  <td className="px-6 py-4 text-ink/40 whitespace-nowrap">
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
            {contacts.length === 0
              ? "No contact submissions yet."
              : "No results match your filters."}
          </p>
        </div>
      )}
    </>
  );
}
