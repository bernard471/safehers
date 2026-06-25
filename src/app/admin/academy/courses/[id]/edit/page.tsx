"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, GripVertical } from "lucide-react";

interface Lesson { title: string; slug: string; type: string; content: string; videoUrl?: string; durationMinutes: number; order: number; quizQuestions: { question: string; options: string[]; correctIndex: number; explanation: string }[] }
interface Module { title: string; slug: string; description: string; order: number; lessons: Lesson[] }
interface CourseData { _id: string; title: string; slug: string; excerpt: string; description: string; category: string; level: string; durationHours: number; instructor: string; isFree: boolean; isPublished: boolean; modules: Module[]; learningOutcomes: string[]; tags: string[] }

export default function EditCoursePage() {
  const params = useParams();
  const id = params.id as string;
  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/academy/courses`).then(r => r.json()).then(async d => {
      const found = d.courses?.find((c: CourseData) => c._id === id);
      if (found) {
        const full = await fetch(`/api/admin/academy/courses?id=${id}`).then(r => r.json());
        setCourse(full.course || found);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const save = async () => {
    if (!course) return;
    setSaving(true); setSaved(false);
    await fetch("/api/admin/academy/courses", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(course),
    });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addModule = () => {
    if (!course) return;
    setCourse({
      ...course,
      modules: [...course.modules, { title: "", slug: "", description: "", order: course.modules.length, lessons: [] }],
    });
  };

  const addLesson = (mi: number) => {
    if (!course) return;
    const mods = [...course.modules];
    mods[mi] = {
      ...mods[mi],
      lessons: [...mods[mi].lessons, { title: "", slug: "", type: "text", content: "", durationMinutes: 15, order: mods[mi].lessons.length, quizQuestions: [] }],
    };
    setCourse({ ...course, modules: mods });
  };

  const updateModule = (mi: number, field: string, value: string) => {
    if (!course) return;
    const mods = [...course.modules];
    mods[mi] = { ...mods[mi], [field]: value };
    setCourse({ ...course, modules: mods });
  };

  const updateLesson = (mi: number, li: number, field: string, value: string | number) => {
    if (!course) return;
    const mods = [...course.modules];
    const lessons = [...mods[mi].lessons];
    lessons[li] = { ...lessons[li], [field]: value };
    mods[mi] = { ...mods[mi], lessons };
    setCourse({ ...course, modules: mods });
  };

  const removeModule = (mi: number) => {
    if (!course) return;
    setCourse({ ...course, modules: course.modules.filter((_, i) => i !== mi) });
  };

  const removeLesson = (mi: number, li: number) => {
    if (!course) return;
    const mods = [...course.modules];
    mods[mi] = { ...mods[mi], lessons: mods[mi].lessons.filter((_, i) => i !== li) };
    setCourse({ ...course, modules: mods });
  };

  if (loading) return <p className="text-sm opacity-50">Loading...</p>;
  if (!course) return <p className="text-sm text-burgundy">Course not found.</p>;

  return (
    <div>
      <Link href="/admin/academy/courses" className="eyebrow text-xs opacity-50 flex items-center gap-2 mb-6 hover:opacity-100">
        <ArrowLeft size={14} /> Back to courses
      </Link>

      <div className="flex items-center justify-between mb-8">
        <h1 className="display text-3xl">Edit: {course.title}</h1>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-gold">Saved ✓</span>}
          <button onClick={save} disabled={saving} className="bg-ink text-cream px-6 py-3 eyebrow hover:bg-burgundy transition-colors disabled:opacity-60">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Basic fields */}
      <div className="border border-ink/10 bg-cream p-6 mb-6 space-y-4">
        <p className="eyebrow text-gold text-xs">Course Details</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="eyebrow opacity-40 text-[10px] block mb-1">Title</label>
            <input value={course.title} onChange={e => setCourse({ ...course, title: e.target.value })} className="w-full bg-transparent border-b border-ink/20 pb-2 text-sm outline-none" />
          </div>
          <div>
            <label className="eyebrow opacity-40 text-[10px] block mb-1">Instructor</label>
            <input value={course.instructor} onChange={e => setCourse({ ...course, instructor: e.target.value })} className="w-full bg-transparent border-b border-ink/20 pb-2 text-sm outline-none" />
          </div>
        </div>
        <div>
          <label className="eyebrow opacity-40 text-[10px] block mb-1">Excerpt</label>
          <textarea rows={2} value={course.excerpt} onChange={e => setCourse({ ...course, excerpt: e.target.value })} className="w-full bg-transparent border-b border-ink/20 pb-2 text-sm outline-none resize-none" />
        </div>
        <div>
          <label className="eyebrow opacity-40 text-[10px] block mb-1">Description</label>
          <textarea rows={3} value={course.description} onChange={e => setCourse({ ...course, description: e.target.value })} className="w-full bg-transparent border-b border-ink/20 pb-2 text-sm outline-none resize-none" />
        </div>
      </div>

      {/* Modules & Lessons */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="eyebrow text-gold text-xs">Modules &amp; Lessons</p>
          <button onClick={addModule} className="eyebrow text-xs text-burgundy flex items-center gap-1 hover:underline"><Plus size={12} /> Add Module</button>
        </div>

        {course.modules.map((mod, mi) => (
          <div key={mi} className="border border-ink/10 bg-cream mb-4">
            <div className="p-4 bg-bone flex items-center gap-4">
              <GripVertical size={14} className="opacity-30" />
              <input value={mod.title} onChange={e => updateModule(mi, "title", e.target.value)} placeholder="Module title" className="flex-1 bg-transparent font-medium outline-none" />
              <input value={mod.slug} onChange={e => updateModule(mi, "slug", e.target.value)} placeholder="slug" className="w-40 bg-transparent text-xs opacity-50 outline-none" />
              <button onClick={() => removeModule(mi)} className="text-burgundy p-1"><Trash2 size={14} /></button>
            </div>
            <div className="p-4">
              <input value={mod.description} onChange={e => updateModule(mi, "description", e.target.value)} placeholder="Module description" className="w-full bg-transparent border-b border-ink/10 pb-2 text-sm opacity-60 outline-none mb-4" />

              {mod.lessons.map((les, li) => (
                <div key={li} className="border border-ink/5 p-3 mb-2 flex items-start gap-3">
                  <span className="text-xs opacity-30 mt-2">{mi + 1}.{li + 1}</span>
                  <div className="flex-1 space-y-2">
                    <input value={les.title} onChange={e => updateLesson(mi, li, "title", e.target.value)} placeholder="Lesson title" className="w-full bg-transparent text-sm font-medium outline-none" />
                    <div className="flex gap-3">
                      <select value={les.type} onChange={e => updateLesson(mi, li, "type", e.target.value)} className="bg-transparent text-xs outline-none border-b border-ink/10 pb-1">
                        <option value="text">Text</option>
                        <option value="video">Video</option>
                        <option value="quiz">Quiz</option>
                        <option value="activity">Activity</option>
                      </select>
                      <input type="number" value={les.durationMinutes} onChange={e => updateLesson(mi, li, "durationMinutes", Number(e.target.value))} className="w-16 bg-transparent text-xs outline-none border-b border-ink/10 pb-1" />
                      <span className="text-xs opacity-30 mt-1">min</span>
                    </div>
                    <textarea value={les.content} onChange={e => updateLesson(mi, li, "content", e.target.value)} placeholder="Lesson content..." rows={2} className="w-full bg-transparent text-xs opacity-70 outline-none border-b border-ink/5 resize-none" />
                  </div>
                  <button onClick={() => removeLesson(mi, li)} className="text-burgundy p-1"><Trash2 size={12} /></button>
                </div>
              ))}
              <button onClick={() => addLesson(mi)} className="eyebrow text-xs text-gold flex items-center gap-1 mt-2 hover:underline"><Plus size={12} /> Add Lesson</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={save} disabled={saving} className="bg-ink text-cream px-8 py-4 eyebrow hover:bg-burgundy transition-colors disabled:opacity-60">
        {saving ? "Saving..." : "Save All Changes"}
      </button>
    </div>
  );
}
