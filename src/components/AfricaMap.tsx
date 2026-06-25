"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { COUNTRIES } from "@/lib/chapters-data";

const statusColors: Record<string, string> = {
  active: "#B8963E",
  launching: "#5C1F2E",
  planned: "#666666",
  interest: "#444444",
};

export default function AfricaMap() {
  return (
    <div className="relative w-full max-w-[500px] mx-auto aspect-[3/4]">
      {/* Simplified Africa silhouette as SVG */}
      <svg viewBox="0 0 100 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M45,5 C50,3 58,4 62,6 L68,10 C72,12 74,15 76,20 L78,28 C79,32 78,36 76,40 L74,44 C73,47 74,50 76,53 L78,56 C79,60 78,64 76,68 L72,74 C70,78 68,82 66,85 L62,90 C60,93 58,96 56,98 L54,100 C52,103 50,105 48,106 L44,108 C42,108 40,107 38,105 L34,100 C32,97 30,94 29,90 L28,86 C27,82 26,78 26,74 L26,70 C26,66 25,62 24,58 L22,54 C21,50 20,46 20,42 L20,38 C20,34 21,30 22,26 L24,22 C26,18 28,14 30,11 L35,7 Z"
          fill="rgba(184,150,62,0.08)"
          stroke="rgba(184,150,62,0.2)"
          strokeWidth="0.5"
        />

        {/* Country dots */}
        {COUNTRIES.filter(c => c.mapPosition).map((country) => {
          const pos = country.mapPosition!;
          const color = statusColors[country.status] || "#444";
          const size = country.status === "active" ? 3 : country.status === "launching" ? 2.5 : 1.5;

          return (
            <Link key={country.code} href={`/chapters/${country.code.toLowerCase()}`}>
              <g className="cursor-pointer">
                {/* Pulse ring for active countries */}
                {country.status === "active" && (
                  <motion.circle
                    cx={pos.x} cy={pos.y} r={size + 2}
                    fill="none" stroke={color} strokeWidth="0.5"
                    initial={{ opacity: 0.6, r: size + 1 }}
                    animate={{ opacity: 0, r: size + 6 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <circle cx={pos.x} cy={pos.y} r={size} fill={color} className="hover:opacity-80 transition-opacity" />
                {/* Label for active/launching */}
                {(country.status === "active" || country.status === "launching") && (
                  <text x={pos.x + size + 2} y={pos.y + 1.5} fontSize="3.5" fill="rgba(250,247,241,0.5)" fontFamily="monospace">
                    {country.code}
                  </text>
                )}
              </g>
            </Link>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        {[
          { color: "#B8963E", label: "Active" },
          { color: "#5C1F2E", label: "Launching" },
          { color: "#666", label: "Planned" },
          { color: "#444", label: "Interest" },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
            <span className="eyebrow text-[9px] opacity-50">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
