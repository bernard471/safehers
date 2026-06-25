"use client";

import { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";

const QA_ITEMS = [
  { category: "Registration & Auth", items: [
    "Register new beneficiary account",
    "Register minor beneficiary (under 18) — guardian consent required",
    "Receive email verification link after registration",
    "Click verification link — email marked as verified",
    "Log in to portal with valid credentials",
    "Log in fails with wrong password",
    "Forgot password — receive reset email",
    "Reset password with valid token",
    "Reset password with expired token — rejected",
    "Resend verification email from portal",
  ]},
  { category: "Course Enrollment & Progress", items: [
    "Browse course catalog at /academy/courses",
    "View course detail page with curriculum",
    "Enroll in a course from portal",
    "Duplicate enrollment prevented",
    "Update lesson progress — progress bar increases",
    "Complete quiz — score recorded",
    "Complete all lessons — course marked complete",
    "Certificate auto-issued on completion",
  ]},
  { category: "Certificates", items: [
    "Certificate appears in portal certificates page",
    "Certificate verification at /certificate/verify/[id]",
    "Certificate image at /api/certificate/image?id=...",
    "Certificate PDF/HTML download from portal",
    "Invalid certificate ID — shows 'not found'",
  ]},
  { category: "Consultations", items: [
    "Book consultation from /consultation/book",
    "Consultation appears in portal consultations list",
    "Consultation description max 1000 chars enforced",
    "Unverified email users see verification banner",
    "Safeguarding notice visible on consultation pages",
  ]},
  { category: "Role Restrictions", items: [
    "Beneficiary can only access portal routes",
    "Institution admin sees only their institution data",
    "Donor sees only aggregated data — no names/emails",
    "Consultation notes NOT visible to institution/donor",
    "Safety plans NOT visible to institution/donor",
    "Admin routes require admin/super_admin role",
    "Seed routes blocked in production without SAFEHER_ALLOW_SEED",
  ]},
  { category: "Admin Functions", items: [
    "Admin can create/edit/publish courses",
    "Admin can create cohorts",
    "Admin can invite beneficiaries to cohort by email",
    "Admin can export cohort CSV",
    "Admin OTP email sent on request",
    "Admin OTP verification succeeds with valid code",
    "Admin OTP fails with expired/invalid code",
    "Audit logs created for admin actions",
  ]},
  { category: "Rate Limiting", items: [
    "Registration rate limited (3/hr per IP)",
    "Auth rate limited (10/15min per IP)",
    "Certificate verify rate limited (20/hr per IP)",
    "Contact form rate limited (5/hr per IP)",
  ]},
  { category: "Data Privacy", items: [
    "Institution dashboard privacy notice displayed",
    "Donor dashboard privacy notice displayed",
    "Emergency disclaimer on consultation pages",
    "Data retention notice on safety plan page",
    "Sensitive consultation descriptions not exposed in any non-user API",
  ]},
];

export default function QAChecklistPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (item: string) => {
    const next = new Set(checked);
    if (next.has(item)) next.delete(item); else next.add(item);
    setChecked(next);
  };

  const totalItems = QA_ITEMS.reduce((s, c) => s + c.items.length, 0);
  const doneCount = checked.size;

  return (
    <div>
      <div className="mb-8">
        <p className="eyebrow text-gold mb-2">Pilot QA</p>
        <h1 className="display text-3xl">Launch Readiness Checklist</h1>
        <p className="text-sm opacity-50 mt-2">{doneCount} of {totalItems} checks completed</p>
        <div className="w-full h-2 bg-bone rounded-full overflow-hidden mt-3">
          <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${(doneCount / totalItems) * 100}%` }} />
        </div>
      </div>

      <div className="space-y-8">
        {QA_ITEMS.map(cat => (
          <div key={cat.category}>
            <p className="eyebrow text-xs text-gold mb-3">{cat.category}</p>
            <div className="border border-ink/10 bg-cream divide-y divide-ink/5">
              {cat.items.map(item => (
                <button key={item} onClick={() => toggle(item)} className="w-full flex items-center gap-3 p-4 text-left text-sm hover:bg-bone/50 transition-colors">
                  {checked.has(item) ? <CheckCircle size={16} className="text-gold shrink-0" /> : <Circle size={16} className="opacity-20 shrink-0" />}
                  <span className={checked.has(item) ? "line-through opacity-40" : ""}>{item}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
