"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Reg {
  _id: string;
  name: string;
  email: string;
  country?: string;
  format?: string;
  phone?: string;
  consentToContact?: boolean;
  createdAt?: string;
}

function toCSV(rows: Reg[]): string {
  const headers = ["Date", "Name", "Email", "Country", "Format", "Phone"];
  const lines = rows.map((r) => [
    r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "",
    `"${r.name.replace(/"/g, '""')}"`,
    r.email,
    r.country ?? "",
    r.format ?? "",
    r.phone ?? "",
  ].join(","));
  return [headers.join(","), ...lines].join("\n");
}

function downloadCSV(rows: Reg[]) {
  const blob = new Blob([toCSV(rows)], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `safehers-registrations-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminRegistrationsPage() {
  const [token, setToken] = useState("");
  const [savedToken, setSavedToken] = useState<string | null>(null);
  const [registrations, setRegistrations] = useState<Reg[]>([]);
  const [status, setStatus] = useState<"prompt" | "loading" | "loaded" | "error">("prompt");
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("safehers-admin-token");
    if (stored) {
      setSavedToken(stored);
      fetchData(stored);
    }
  }, []);

  async function fetchData(t: string) {
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/admin/registrations", {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (res.status === 401) {
        setStatus("error");
        setError("Invalid token. Please check your ADMIN_TOKEN and try again.");
        localStorage.removeItem("safehers-admin-token");
        return;
      }
      const data = await res.json();
      setRegistrations(data.registrations ?? []);
      setStatus("loaded");
      localStorage.setItem("safehers-admin-token", t);
    } catch {
      setStatus("error");
      setError("Network error. Check the server is running.");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetchData(token.trim());
  }

  const FORMAT_LABELS: Record<string, string> = {
    "in-person-accra": "In-person · Accra",
    virtual: "Virtual · Zoom",
    either: "Either",
  };

  return (
    <div className="min-h-screen bg-cream pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="eyebrow text-xs text-ink/40 hover:text-ink transition-colors mb-6 block">
            ← Back to site
          </Link>
          <h1 className="display text-5xl font-light mb-2">Registrations</h1>
          <p className="eyebrow opacity-50">Personal Safety Training — Waitlist</p>
        </div>

        {/* Token prompt */}
        {status === "prompt" && (
          <form onSubmit={handleSubmit} className="max-w-md">
            <p className="body-prose text-ink/70 mb-6">
              Enter your admin token to view registrations. This is the{" "}
              <code className="font-mono text-sm bg-bone px-1">ADMIN_TOKEN</code> value from your{" "}
              <code className="font-mono text-sm bg-bone px-1">.env.local</code>.
            </p>
            <label className="eyebrow block mb-2 opacity-60">Admin Token</label>
            <input
              type="password"
              className="w-full border-b border-ink/30 bg-transparent py-3 focus:outline-none focus:border-[#5C1F2E] text-ink mb-4"
              placeholder="Paste your ADMIN_TOKEN here"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              autoComplete="off"
            />
            <button
              type="submit"
              className="bg-ink text-cream px-7 py-3 eyebrow hover:bg-[#5C1F2E] transition-colors"
            >
              UNLOCK
            </button>
          </form>
        )}

        {/* Loading */}
        {status === "loading" && (
          <p className="eyebrow opacity-40">Loading registrations...</p>
        )}

        {/* Error */}
        {status === "error" && (
          <div>
            <p className="text-[#5C1F2E] body-prose mb-6">{error}</p>
            <button
              onClick={() => setStatus("prompt")}
              className="eyebrow text-sm border border-ink/30 px-5 py-2 hover:border-ink transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        {/* Table */}
        {status === "loaded" && (
          <>
            <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
              <div>
                <p className="display text-4xl font-light">{registrations.length}</p>
                <p className="eyebrow opacity-50 mt-1">Total registrations</p>
              </div>
              <div className="flex gap-4">
                {registrations.length > 0 && (
                  <button
                    onClick={() => downloadCSV(registrations)}
                    className="eyebrow border border-ink/30 px-6 py-3 hover:border-ink transition-colors text-xs"
                  >
                    DOWNLOAD CSV
                  </button>
                )}
                <button
                  onClick={() => { setStatus("prompt"); localStorage.removeItem("safehers-admin-token"); }}
                  className="eyebrow text-ink/40 hover:text-ink transition-colors text-xs"
                >
                  SIGN OUT
                </button>
              </div>
            </div>

            {registrations.length === 0 ? (
              <p className="body-prose text-ink/50">No registrations yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-ink/15">
                      {["Date", "Name", "Email", "Country", "Format", "Phone"].map((h) => (
                        <th key={h} className="eyebrow text-[10px] opacity-50 pb-3 pr-6 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((r) => (
                      <tr
                        key={r._id}
                        className="border-b border-ink/10 hover:bg-bone transition-colors"
                      >
                        <td className="py-4 pr-6 text-sm text-ink/50 whitespace-nowrap">
                          {r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-GB") : "—"}
                        </td>
                        <td className="py-4 pr-6 text-sm font-medium whitespace-nowrap">{r.name}</td>
                        <td className="py-4 pr-6 text-sm text-ink/70">{r.email}</td>
                        <td className="py-4 pr-6 text-sm text-ink/60 whitespace-nowrap">{r.country || "—"}</td>
                        <td className="py-4 pr-6 text-sm text-ink/60 whitespace-nowrap">
                          {FORMAT_LABELS[r.format ?? ""] ?? r.format ?? "—"}
                        </td>
                        <td className="py-4 text-sm text-ink/50">{r.phone || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
