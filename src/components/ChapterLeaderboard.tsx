"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Users, Award, BookOpen } from "lucide-react";
import { COUNTRIES } from "@/lib/chapters-data";

interface RankedChapter {
  name: string;
  country: string;
  countryCode: string;
  flag: string;
  members: number;
  workshops: number;
  certificates: number;
  score: number;
}

export default function ChapterLeaderboard() {
  const allChapters: RankedChapter[] = [];

  for (const country of COUNTRIES) {
    for (const ch of country.chapters) {
      if (ch.status === "active" || ch.status === "launching") {
        const score = ch.members * 2 + (ch.workshopsHeld || 0) * 10 + (ch.certificatesEarned || 0) * 5;
        allChapters.push({
          name: ch.name,
          country: country.country,
          countryCode: country.code,
          flag: country.flag,
          members: ch.members,
          workshops: ch.workshopsHeld || 0,
          certificates: ch.certificatesEarned || 0,
          score,
        });
      }
    }
  }

  const ranked = allChapters.sort((a, b) => b.score - a.score).slice(0, 10);

  if (ranked.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Trophy size={20} className="text-gold" />
        <p className="eyebrow text-gold">Chapter Leaderboard</p>
      </div>

      <div className="border border-ink/10 bg-cream">
        <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-ink/10 eyebrow text-[10px] opacity-40">
          <div className="col-span-1">#</div>
          <div className="col-span-5">Chapter</div>
          <div className="col-span-2 text-center">Members</div>
          <div className="col-span-2 text-center">Workshops</div>
          <div className="col-span-2 text-center">Certificates</div>
        </div>
        {ranked.map((ch, i) => (
          <motion.div key={ch.name}
            initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
          >
            <Link href={`/chapters/${ch.countryCode.toLowerCase()}`}
              className="block sm:grid sm:grid-cols-12 gap-4 p-4 border-b border-ink/5 last:border-0 text-sm hover:bg-bone/50 transition-colors items-center"
            >
              {/* Mobile layout */}
              <div className="sm:hidden flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`display text-lg w-6 ${i === 0 ? "text-gold" : "opacity-30"}`}>{i + 1}</span>
                  <img src={ch.flag} alt={ch.country} className="w-5 h-3.5 object-cover shrink-0 shadow-sm rounded-sm" />
                  <div>
                    <p className="font-medium text-xs">{ch.name}</p>
                    <p className="text-[10px] opacity-40">{ch.members} members · {ch.workshops} workshops</p>
                  </div>
                </div>
              </div>
              {/* Desktop layout */}
              <div className="hidden sm:block col-span-1">
                <span className={`display text-lg ${i === 0 ? "text-gold" : i === 1 ? "opacity-60" : i === 2 ? "opacity-40" : "opacity-30"}`}>{i + 1}</span>
              </div>
              <div className="hidden sm:flex col-span-5 items-center gap-2">
                <img src={ch.flag} alt={ch.country} className="w-5 h-3.5 object-cover shrink-0 shadow-sm rounded-sm" />
                <div>
                  <p className="font-medium text-xs truncate">{ch.name}</p>
                  <p className="text-[10px] opacity-40">{ch.country}</p>
                </div>
              </div>
              <div className="hidden sm:flex col-span-2 text-center items-center justify-center gap-1">
                <Users size={11} className="opacity-30" /><span className="opacity-70">{ch.members}</span>
              </div>
              <div className="hidden sm:flex col-span-2 text-center items-center justify-center gap-1">
                <BookOpen size={11} className="opacity-30" /><span className="opacity-70">{ch.workshops}</span>
              </div>
              <div className="hidden sm:flex col-span-2 text-center items-center justify-center gap-1">
                <Award size={11} className="opacity-30" /><span className="opacity-70">{ch.certificates}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
