"use client";

import { useEffect, useState } from "react";
import EducatorShell from "@/components/EducatorShell";

interface CourseItem { _id: string; title: string; slug: string; category: string; isPublished: boolean; enrollmentCount?: number }

export default function EducatorCoursesPage() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/academy/courses")
      .then((r) => r.json())
      .then((d) => { setCourses(d.courses || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <EducatorShell>
      <div className="mb-8">
        <p className="eyebrow text-gold mb-2">My Courses</p>
        <h1 className="display text-3xl">Courses you manage.</h1>
      </div>
      {loading ? <p className="text-sm opacity-50">Loading...</p> : courses.length === 0 ? (
        <div className="border border-ink/10 bg-cream p-12 text-center">
          <p className="display text-2xl mb-2">No courses assigned yet</p>
          <p className="body-prose opacity-60">Contact an administrator to assign courses to your account.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {courses.map((c) => (
            <div key={c._id} className="border border-ink/10 bg-cream p-5 flex items-center justify-between">
              <div>
                <h3 className="display text-lg">{c.title}</h3>
                <p className="eyebrow text-xs opacity-40 mt-1 capitalize">{c.category.replace(/-/g, " ")}</p>
              </div>
              <span className={`eyebrow text-xs px-3 py-1 ${c.isPublished ? "bg-gold/20 text-gold" : "bg-ink/5"}`}>
                {c.isPublished ? "Published" : "Draft"}
              </span>
            </div>
          ))}
        </div>
      )}
    </EducatorShell>
  );
}
