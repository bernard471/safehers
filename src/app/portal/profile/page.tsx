"use client";

import { useEffect, useState } from "react";
import PortalShell from "@/components/PortalShell";

export default function ProfilePage() {
  const [form, setForm] = useState({ name: "", phone: "", country: "", bio: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/portal/profile").then((r) => r.json()).then((d) => {
      if (d.user) setForm({ name: d.user.name || "", phone: d.user.phone || "", country: d.user.country || "", bio: d.user.bio || "" });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await fetch("/api/portal/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <PortalShell>
      <div className="mb-8">
        <p className="eyebrow text-gold mb-2">Profile</p>
        <h1 className="display text-3xl lg:text-4xl">Your account.</h1>
      </div>

      {loading ? (
        <p className="text-sm opacity-50">Loading...</p>
      ) : (
        <form onSubmit={save} className="max-w-xl space-y-6">
          <div>
            <label className="eyebrow opacity-60 block mb-2">Full name</label>
            <input value={form.name} onChange={update("name")} className="w-full bg-cream border-b border-ink/30 pb-3 outline-none focus:border-burgundy" />
          </div>
          <div>
            <label className="eyebrow opacity-60 block mb-2">Phone</label>
            <input value={form.phone} onChange={update("phone")} className="w-full bg-cream border-b border-ink/30 pb-3 outline-none focus:border-burgundy" />
          </div>
          <div>
            <label className="eyebrow opacity-60 block mb-2">Country</label>
            <input value={form.country} onChange={update("country")} className="w-full bg-cream border-b border-ink/30 pb-3 outline-none focus:border-burgundy" />
          </div>
          <div>
            <label className="eyebrow opacity-60 block mb-2">Bio</label>
            <textarea value={form.bio} onChange={update("bio")} rows={3} maxLength={500} className="w-full bg-cream border-b border-ink/30 pb-3 outline-none focus:border-burgundy resize-none" />
          </div>
          <div className="flex items-center gap-4">
            <button type="submit" disabled={saving} className="bg-ink text-cream px-8 py-4 eyebrow hover:bg-burgundy transition-colors disabled:opacity-60">
              {saving ? "Saving..." : "Save Profile"}
            </button>
            {saved && <span className="text-sm text-gold">Saved.</span>}
          </div>
        </form>
      )}
    </PortalShell>
  );
}
