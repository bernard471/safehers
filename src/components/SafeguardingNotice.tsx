import { ShieldCheck } from "lucide-react";

export function EmergencyDisclaimer() {
  return (
    <div className="border border-burgundy/20 bg-burgundy/5 p-4">
      <p className="eyebrow text-xs text-burgundy mb-1">Emergency Notice</p>
      <p className="text-xs opacity-70">
        If you are in immediate danger, contact local emergency services first.
        SafeHer Foundation programmes are not a substitute for emergency services,
        law enforcement, or professional counselling.
      </p>
    </div>
  );
}

export function ConfidentialityNotice() {
  return (
    <div className="border border-ink/10 bg-bone p-4">
      <p className="eyebrow text-xs text-gold mb-1 flex items-center gap-1">
        <ShieldCheck size={12} /> Confidentiality
      </p>
      <p className="text-xs opacity-60">
        Consultation details are strictly confidential. Only you and your assigned
        consultant can view session notes. Institution administrators, donors, and
        other users cannot access your consultation records.
      </p>
    </div>
  );
}

export function DataRetentionNotice() {
  return (
    <div className="border border-ink/10 bg-bone p-4">
      <p className="eyebrow text-xs text-gold mb-1">Data Protection</p>
      <p className="text-xs opacity-60">
        Your data is protected under Ghana&apos;s Data Protection Act 2012.
        Personal safety plans, consultation records, and private notes are
        encrypted and accessible only to you and authorised personnel.
        Data is retained only as long as necessary for service delivery.
      </p>
    </div>
  );
}

export function DataScopeNotice({ audience }: { audience: "institution" | "donor" }) {
  const text = audience === "institution"
    ? "Only aggregated progress data is shown. Student consultation details, personal safety plans, and private notes are never visible to institution administrators."
    : "All data shown is aggregated. Individual beneficiary identities, contact details, consultation records, and personal safety plans are never disclosed to donors.";

  return (
    <div className="border border-ink/10 bg-bone p-4">
      <p className="eyebrow text-xs text-gold mb-1">Data Scope</p>
      <p className="text-xs opacity-40">{text}</p>
    </div>
  );
}
