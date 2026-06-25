"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Users, Award, MessageSquare, GraduationCap, Building2 } from "lucide-react";

interface Stats {
  courses: number; enrollments: number; certificates: number;
  consultations: number; users: number; institutions: number;
}

export default function AdminAcademyPage() {
  const [stats, setStats] = useState<Stats>({ courses: 0, enrollments: 0, certificates: 0, consultations: 0, users: 0, institutions: 0 });
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/academy/stats")
      .then(r => r.json())
      .then(d => { if (d.stats) setStats(d.stats); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const seed = async (endpoint: string, label: string) => {
    setSeeding(label);
    await fetch(endpoint, { method: "POST" });
    setSeeding(null);
    window.location.reload();
  };

  const cards = [
    { icon: BookOpen, label: "Courses", value: stats.courses },
    { icon: GraduationCap, label: "Enrollments", value: stats.enrollments },
    { icon: Award, label: "Certificates", value: stats.certificates },
    { icon: MessageSquare, label: "Consultations", value: stats.consultations },
    { icon: Users, label: "Portal Users", value: stats.users },
    { icon: Building2, label: "Institutions", value: stats.institutions },
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="eyebrow text-gold mb-2">Admin</p>
        <h1 className="display text-3xl">SafeHer Academy Management</h1>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {cards.map(c => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="border border-ink/10 bg-cream p-6">
              <Icon size={24} strokeWidth={1.5} className="text-gold mb-3" />
              <p className="display text-3xl mb-1">{loading ? "..." : c.value}</p>
              <p className="eyebrow text-xs opacity-50">{c.label}</p>
            </div>
          );
        })}
      </div>

      <p className="eyebrow text-gold text-xs mb-4">Content Management</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { href: "/admin/academy/courses", label: "Manage Courses", desc: "Create, edit, publish, and manage course content" },
          { href: "/admin/contacts", label: "Contact Submissions", desc: "View and manage contact form entries" },
          { href: "/admin/subscribers", label: "Newsletter Subscribers", desc: "View and export subscriber list" },
        ].map(item => (
          <Link key={item.href} href={item.href} className="border border-ink/10 bg-cream p-6 hover:border-gold transition-colors group">
            <h3 className="display text-lg group-hover:text-burgundy transition-colors mb-2">{item.label}</h3>
            <p className="text-sm opacity-50">{item.desc}</p>
          </Link>
        ))}
      </div>

      <p className="eyebrow text-gold text-xs mb-4">Seed &amp; Setup</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button onClick={() => seed("/api/admin/academy/seed", "courses")} disabled={!!seeding}
          className="border border-ink/10 bg-cream p-6 hover:border-gold transition-colors text-left disabled:opacity-50">
          <h3 className="display text-lg mb-2">{seeding === "courses" ? "Seeding..." : "Seed Sample Courses"}</h3>
          <p className="text-sm opacity-50">Load 6 flagship courses into the database</p>
        </button>
        <button onClick={() => seed("/api/admin/academy/seed-users", "users")} disabled={!!seeding}
          className="border border-ink/10 bg-cream p-6 hover:border-gold transition-colors text-left disabled:opacity-50">
          <h3 className="display text-lg mb-2">{seeding === "users" ? "Seeding..." : "Seed Test Users"}</h3>
          <p className="text-sm opacity-50">Create 8 test accounts (all roles)</p>
        </button>
      </div>
    </div>
  );
}
