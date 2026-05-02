"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface HeroFloatingCardProps {
  icon: ReactNode;
  heading: string;
  tagline: string;
  delay?: number;
  className?: string;
}

export function HeroFloatingCard({
  icon,
  heading,
  tagline,
  delay = 0,
  className = "",
}: HeroFloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -6, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: { duration: 3, ease: "easeInOut", repeat: Infinity, delay: delay + 0.5 },
      }}
      className={`bg-[#FAF6EF] rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.10)] px-4 py-3 pointer-events-none ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">{icon}</div>
        <div>
          <p className="font-semibold text-[13px] text-[#1A1A1A] leading-tight mb-0.5">{heading}</p>
          <p className="text-[11px] text-[#1A1A1A]/60 leading-snug">{tagline}</p>
          <p className="text-[#5C1F2E] text-[10px] mt-1.5 tracking-widest">• • •</p>
        </div>
      </div>
    </motion.div>
  );
}

interface HeroPillCardProps {
  images: string[];
  delay?: number;
  className?: string;
}

export function HeroPillCard({ images, delay = 0, className = "" }: HeroPillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`bg-[#FAF6EF] rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.10)] px-4 py-3 flex items-center gap-3 pointer-events-none ${className}`}
    >
      <div className="flex -space-x-2 shrink-0">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="w-8 h-8 rounded-full object-cover border-2 border-[#FAF6EF]"
            style={{ objectPosition: "top" }}
          />
        ))}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[12px] text-[#1A1A1A] leading-tight">A movement. A sisterhood.</p>
        <p className="text-[10px] text-[#1A1A1A]/60 leading-snug">For every girl. Everywhere.</p>
      </div>
      <div className="w-7 h-7 rounded-full bg-[#5C1F2E] flex items-center justify-center shrink-0">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </motion.div>
  );
}
