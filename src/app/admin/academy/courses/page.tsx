"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Eye, EyeOff, Edit, ArrowUpRight } from "lucide-react";

interface CourseRow {
  _id: string; title: string; slug: string; category: string;
  level: string; isPublished: boolean; enrollmentCount: number; durationHours: number;
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<CourseRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/academy/courses").then(r => r.json()).then(d => {
      setCourses(d.courses || []); setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const togglePublish = async (id: string, current: boolean) => {
    await fetch("/api/admin/academy/courses", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id, isPublished: !current }),
    });
    setCourses(cs => cs.map(c => c._id === id ? { ...c, isPublished: !current } : c));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="eyebrow text-gold mb-2">Academy Admin</p>
          <h1 className="display text-3xl">Course Management</h1>
        </div>
        <Link href="/admin/academy/courses/new" className="bg-ink text-cream px-5 py-3 eyebrow hover:bg-burgundy transition-colors flex items-center gap-2">
          <Plus size={14} /> New Course
        </Link>
      </div>

      {loading ? <p className="text-sm opacity-50">Loading...</p> : (
        <div className="border border-ink/10 bg-cream overflow-x-auto">
          <div className="min-w-[700px]">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-ink/10 eyebrow text-xs opacity-50">
            <div className="col-span-4">Title</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-1">Level</div>
            <div className="col-span-1">Hours</div>
            <div className="col-span-1">Enrolled</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2">Actions</div>
          </div>
          {courses.map(c => (
            <div key={c._id} className="grid grid-cols-12 gap-4 p-4 border-b border-ink/5 last:border-0 text-sm items-center">
              <div className="col-span-4 font-medium truncate">{c.title}</div>
              <div className="col-span-2 opacity-60 capitalize">{c.category.replace(/-/g, " ")}</div>
              <div className="col-span-1 opacity-60 capitalize">{c.level}</div>
              <div className="col-span-1 opacity-60">{c.durationHours}h</div>
              <div className="col-span-1 opacity-60">{c.enrollmentCount}</div>
              <div className="col-span-1">
                <span className={`eyebrow text-[10px] px-2 py-0.5 ${c.isPublished ? "bg-gold/20 text-gold" : "bg-ink/5 opacity-50"}`}>
                  {c.isPublished ? "Live" : "Draft"}
                </span>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Link href={`/admin/academy/courses/${c._id}/edit`} className="p-1.5 border border-ink/10 hover:border-ink/40 transition-colors">
                  <Edit size={14} />
                </Link>
                <button onClick={() => togglePublish(c._id, c.isPublished)} className="p-1.5 border border-ink/10 hover:border-ink/40 transition-colors" title={c.isPublished ? "Unpublish" : "Publish"}>
                  {c.isPublished ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <Link href={`/academy/courses/${c.slug}`} className="p-1.5 border border-ink/10 hover:border-ink/40 transition-colors" target="_blank">
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          ))}
          </div>
          {courses.length === 0 && (
            <div className="p-8 text-center opacity-50">
              No courses yet. <Link href="/admin/academy/courses/new" className="text-burgundy link-underline">Create one</Link> or <Link href="/admin/academy" className="text-burgundy link-underline">seed sample courses</Link>.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
