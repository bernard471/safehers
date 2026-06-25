"use client";

import { useEffect, useState } from "react";
import EducatorShell from "@/components/EducatorShell";

interface StudentItem { _id: string; name: string; email: string; progress: number; courseTitle: string; status: string }

export default function EducatorStudentsPage() {
  const [students] = useState<StudentItem[]>([]);
  const loading = false;

  return (
    <EducatorShell>
      <div className="mb-8">
        <p className="eyebrow text-gold mb-2">Students</p>
        <h1 className="display text-3xl">Learner progress.</h1>
      </div>
      <div className="border border-ink/10 bg-bone p-4 mb-6">
        <p className="text-xs opacity-40">Only names, emails, and course progress are shown. Personal safety plans, consultation details, and private notes are never visible to educators.</p>
      </div>
      {loading ? <p className="text-sm opacity-50">Loading...</p> : students.length === 0 ? (
        <div className="border border-ink/10 bg-cream p-12 text-center">
          <p className="display text-2xl mb-2">No students enrolled yet</p>
          <p className="body-prose opacity-60">Students will appear here once they enrol in your courses.</p>
        </div>
      ) : (
        <div className="border border-ink/10 bg-cream overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-ink/10 eyebrow text-xs opacity-50">
              <div className="col-span-3">Name</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-3">Course</div>
              <div className="col-span-2">Progress</div>
              <div className="col-span-1">Status</div>
            </div>
            {students.map((s) => (
              <div key={s._id} className="grid grid-cols-12 gap-4 p-4 border-b border-ink/5 last:border-0 text-sm">
                <div className="col-span-3 truncate">{s.name}</div>
                <div className="col-span-3 truncate opacity-60">{s.email}</div>
                <div className="col-span-3 truncate opacity-60">{s.courseTitle}</div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-bone rounded-full overflow-hidden"><div className="h-full bg-gold rounded-full" style={{ width: `${s.progress}%` }} /></div>
                    <span className="text-xs opacity-50 w-8">{s.progress}%</span>
                  </div>
                </div>
                <div className="col-span-1"><span className={`eyebrow text-[10px] capitalize ${s.status === "completed" ? "text-gold" : "opacity-50"}`}>{s.status}</span></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </EducatorShell>
  );
}
