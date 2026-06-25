"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewCoursePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", description: "", category: "personal-safety",
    level: "beginner", durationHours: 4, instructor: "SafeHer Foundation",
    isFree: true, isPublished: false, certificateEnabled: true, passingScore: 70,
    learningOutcomes: [""],
    tags: [""],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (k: string, v: string | number | boolean | string[]) => setForm({ ...form, [k]: v });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError("");
    const payload = {
      ...form,
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      learningOutcomes: form.learningOutcomes.filter(Boolean),
      tags: form.tags.filter(Boolean),
      modules: [],
    };
    const r = await fetch("/api/admin/academy/courses", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
    });
    if (r.ok) { const d = await r.json(); router.push(`/admin/academy/courses/${d.courseId}/edit`); }
    else { const d = await r.json(); setError(d.error || "Failed."); setSaving(false); }
  };

  return (
    <div>
      <Link href="/admin/academy/courses" className="eyebrow text-xs opacity-50 flex items-center gap-2 mb-6 hover:opacity-100">
        <ArrowLeft size={14} /> Back to courses
      </Link>
      <h1 className="display text-3xl mb-8">Create Course</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="eyebrow opacity-60 block mb-2">Title *</label>
          <input required value={form.title} onChange={e => update("title", e.target.value)} className="w-full bg-cream border-b border-ink/30 pb-3 outline-none focus:border-burgundy" />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="eyebrow opacity-60 block mb-2">Slug</label>
            <input value={form.slug} onChange={e => update("slug", e.target.value)} placeholder="auto-generated" className="w-full bg-cream border-b border-ink/30 pb-3 outline-none focus:border-burgundy" />
          </div>
          <div>
            <label className="eyebrow opacity-60 block mb-2">Instructor</label>
            <input value={form.instructor} onChange={e => update("instructor", e.target.value)} className="w-full bg-cream border-b border-ink/30 pb-3 outline-none focus:border-burgundy" />
          </div>
        </div>
        <div>
          <label className="eyebrow opacity-60 block mb-2">Excerpt *</label>
          <textarea required rows={2} value={form.excerpt} onChange={e => update("excerpt", e.target.value)} className="w-full bg-cream border-b border-ink/30 pb-3 outline-none focus:border-burgundy resize-none" />
        </div>
        <div>
          <label className="eyebrow opacity-60 block mb-2">Description</label>
          <textarea rows={4} value={form.description} onChange={e => update("description", e.target.value)} className="w-full bg-cream border-b border-ink/30 pb-3 outline-none focus:border-burgundy resize-none" />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="eyebrow opacity-60 block mb-2">Category</label>
            <select value={form.category} onChange={e => update("category", e.target.value)} className="w-full bg-cream border-b border-ink/30 pb-3 outline-none">
              <option value="personal-safety">Personal Safety</option>
              <option value="online-safety">Online Safety</option>
              <option value="financial-safety">Financial Safety</option>
              <option value="campus-safety">Campus Safety</option>
              <option value="wellbeing">Wellbeing</option>
            </select>
          </div>
          <div>
            <label className="eyebrow opacity-60 block mb-2">Level</label>
            <select value={form.level} onChange={e => update("level", e.target.value)} className="w-full bg-cream border-b border-ink/30 pb-3 outline-none">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="eyebrow opacity-60 block mb-2">Duration (hours)</label>
            <input type="number" value={form.durationHours} onChange={e => update("durationHours", Number(e.target.value))} className="w-full bg-cream border-b border-ink/30 pb-3 outline-none" />
          </div>
        </div>

        <div>
          <label className="eyebrow opacity-60 block mb-2">Learning Outcomes</label>
          {form.learningOutcomes.map((o, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input value={o} onChange={e => { const n = [...form.learningOutcomes]; n[i] = e.target.value; update("learningOutcomes", n); }}
                placeholder={`Outcome ${i + 1}`} className="flex-1 bg-cream border-b border-ink/20 pb-2 text-sm outline-none" />
              {i === form.learningOutcomes.length - 1 && (
                <button type="button" onClick={() => update("learningOutcomes", [...form.learningOutcomes, ""])} className="text-xs text-gold">+ Add</button>
              )}
            </div>
          ))}
        </div>

        {error && <p className="text-sm text-burgundy">{error}</p>}

        <button type="submit" disabled={saving} className="bg-ink text-cream px-8 py-4 eyebrow hover:bg-burgundy transition-colors disabled:opacity-60">
          {saving ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
}
