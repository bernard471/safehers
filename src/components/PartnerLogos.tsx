"use client";

const partners = [
  { name: "University of Ghana", abbr: "UG" },
  { name: "Kwame Nkrumah University of Science and Technology", abbr: "KNUST" },
  { name: "University of Lagos", abbr: "UNILAG" },
  { name: "University of Nairobi", abbr: "UoN" },
  { name: "Ghana Education Service", abbr: "GES" },
  { name: "African Union Commission", abbr: "AUC" },
  { name: "UN Women Ghana", abbr: "UNW" },
  { name: "Mastercard Foundation", abbr: "MCF" },
  { name: "Tony Elumelu Foundation", abbr: "TEF" },
  { name: "Amref Health Africa", abbr: "AMREF" },
];

function PartnerLogo({ name, abbr }: { name: string; abbr: string }) {
  return (
    <div
      title={name}
      className="shrink-0 flex items-center justify-center border border-ink/10 bg-cream px-8 py-5 w-44 h-20 select-none"
    >
      <span className="eyebrow text-ink/40 text-xs tracking-[0.2em]">{abbr}</span>
    </div>
  );
}

export default function PartnerLogos() {
  // Duplicate for seamless loop
  const doubled = [...partners, ...partners];

  return (
    <section className="py-16 overflow-hidden border-y border-ink/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-8">
        <p className="eyebrow opacity-40 text-center">
          Trusted by institutions across Africa
        </p>
      </div>
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-cream to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-cream to-transparent" />
        <div className="flex marquee-track gap-6 w-max">
          {doubled.map((p, i) => (
            <PartnerLogo key={`${p.abbr}-${i}`} name={p.name} abbr={p.abbr} />
          ))}
        </div>
      </div>
    </section>
  );
}
