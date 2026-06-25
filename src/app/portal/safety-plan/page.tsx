"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Plus, Trash2 } from "lucide-react";
import PortalShell from "@/components/PortalShell";

const DEFAULT_CHECKLIST = [
  { label: "I have a safety circle of 2-4 trusted people", category: "personal" as const, completed: false },
  { label: "I vary my daily route to work/school", category: "personal" as const, completed: false },
  { label: "My phone has a lock screen and 2FA enabled", category: "online" as const, completed: false },
  { label: "I have checked my phone for spy apps", category: "online" as const, completed: false },
  { label: "My mobile money PIN is not shared with anyone", category: "financial" as const, completed: false },
  { label: "I have emergency contacts saved and accessible", category: "emergency" as const, completed: false },
  { label: "My home/hostel has secure locks on all entry points", category: "home" as const, completed: false },
  { label: "I know how to report harassment at my institution", category: "personal" as const, completed: false },
];

interface Contact { name: string; phone: string; relationship: string }
interface CheckItem { label: string; category: string; completed: boolean }

export default function SafetyPlanPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [checklist, setChecklist] = useState<CheckItem[]>(DEFAULT_CHECKLIST);
  const [safeLocations, setSafeLocations] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/portal/safety-plan").then((r) => r.json()).then((d) => {
      if (d.plan) {
        if (d.plan.emergencyContacts?.length) setContacts(d.plan.emergencyContacts);
        if (d.plan.checklist?.length) setChecklist(d.plan.checklist);
        if (d.plan.safeLocations?.length) setSafeLocations(d.plan.safeLocations);
        if (d.plan.personalNotes) setNotes(d.plan.personalNotes);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/portal/safety-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emergencyContacts: contacts, checklist, safeLocations, personalNotes: notes }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleCheck = (i: number) => {
    const next = [...checklist];
    next[i] = { ...next[i], completed: !next[i].completed };
    setChecklist(next);
  };

  const completedCount = checklist.filter((c) => c.completed).length;

  return (
    <PortalShell>
      <div className="mb-8">
        <p className="eyebrow text-gold mb-2">Safety Plan</p>
        <h1 className="display text-3xl lg:text-4xl">Your personal safety plan.</h1>
      </div>

      {loading ? (
        <p className="text-sm opacity-50">Loading...</p>
      ) : (
        <div className="space-y-8">
          {/* Progress */}
          <div className="border border-ink/10 bg-cream p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="eyebrow text-gold text-xs">Checklist Progress</p>
              <span className="eyebrow text-xs">{completedCount}/{checklist.length}</span>
            </div>
            <div className="h-3 bg-bone rounded-full overflow-hidden">
              <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${(completedCount / checklist.length) * 100}%` }} />
            </div>
          </div>

          {/* Checklist */}
          <div className="border border-ink/10 bg-cream p-6">
            <p className="eyebrow text-gold text-xs mb-4">Safety Checklist</p>
            <div className="space-y-3">
              {checklist.map((item, i) => (
                <label key={i} className="flex items-start gap-3 text-sm cursor-pointer">
                  <input type="checkbox" checked={item.completed} onChange={() => toggleCheck(i)} className="mt-1 accent-gold" />
                  <span className={item.completed ? "line-through opacity-40" : ""}>{item.label}</span>
                  <span className="eyebrow text-[9px] opacity-30 ml-auto shrink-0">{item.category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Emergency contacts */}
          <div className="border border-ink/10 bg-cream p-6">
            <p className="eyebrow text-gold text-xs mb-4">Emergency Contacts</p>
            {contacts.map((c, i) => (
              <div key={i} className="flex items-center gap-4 mb-3">
                <input value={c.name} onChange={(e) => { const n = [...contacts]; n[i] = { ...n[i], name: e.target.value }; setContacts(n); }} placeholder="Name" className="flex-1 bg-transparent border-b border-ink/20 pb-2 text-sm outline-none" />
                <input value={c.phone} onChange={(e) => { const n = [...contacts]; n[i] = { ...n[i], phone: e.target.value }; setContacts(n); }} placeholder="Phone" className="flex-1 bg-transparent border-b border-ink/20 pb-2 text-sm outline-none" />
                <input value={c.relationship} onChange={(e) => { const n = [...contacts]; n[i] = { ...n[i], relationship: e.target.value }; setContacts(n); }} placeholder="Relationship" className="flex-1 bg-transparent border-b border-ink/20 pb-2 text-sm outline-none" />
                <button onClick={() => setContacts(contacts.filter((_, j) => j !== i))} className="text-burgundy"><Trash2 size={14} /></button>
              </div>
            ))}
            <button onClick={() => setContacts([...contacts, { name: "", phone: "", relationship: "" }])} className="flex items-center gap-2 text-xs text-gold mt-2"><Plus size={14} /> Add contact</button>
          </div>

          {/* Notes */}
          <div className="border border-ink/10 bg-cream p-6">
            <p className="eyebrow text-gold text-xs mb-4">Personal Notes</p>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} maxLength={2000} placeholder="Private notes for your safety plan..." className="w-full bg-transparent border-b border-ink/20 pb-2 text-sm outline-none resize-none" />
          </div>

          {/* Save */}
          <div className="flex items-center gap-4">
            <button onClick={save} disabled={saving} className="bg-ink text-cream px-8 py-4 eyebrow hover:bg-burgundy transition-colors disabled:opacity-60">
              {saving ? "Saving..." : "Save Safety Plan"}
            </button>
            {saved && <span className="text-sm text-gold">Saved successfully.</span>}
          </div>

          <div className="border border-ink/10 bg-bone p-4">
            <p className="text-xs opacity-40"><ShieldCheck size={12} className="inline mr-1" />Your safety plan is private and encrypted. Only you can see this data.</p>
          </div>
        </div>
      )}
    </PortalShell>
  );
}
