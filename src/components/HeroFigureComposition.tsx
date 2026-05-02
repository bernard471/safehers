"use client";

import Image from "next/image";

export function HeroFigureComposition() {
  return (
    <div className="relative w-full h-full min-h-[520px] flex items-end justify-center select-none">

      {/* Dotted map background — CSS radial gradient pattern */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #B8893A 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Burgundy semicircle halo behind center figure */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 rounded-t-full bg-[#5C1F2E] z-[1]"
        style={{ width: "340px", height: "420px" }}
        aria-hidden="true"
      />

      {/* LEFT figure — safe1 */}
      <div className="absolute left-[3%] bottom-0 z-[2]" style={{ width: "38%", maxWidth: 260 }}>
        <Image
          src="/images/safe1.png"
          alt=""
          width={260}
          height={480}
          priority
          className="object-contain object-bottom w-full h-auto drop-shadow-md"
          aria-hidden="true"
        />
      </div>

      {/* RIGHT figure — safe2 */}
      <div className="absolute right-[3%] bottom-0 z-[2]" style={{ width: "38%", maxWidth: 260 }}>
        <Image
          src="/images/safe2.png"
          alt=""
          width={260}
          height={480}
          priority
          className="object-contain object-bottom w-full h-auto drop-shadow-md"
          aria-hidden="true"
        />
      </div>

      {/* CENTER figure — safe3 (foreground) */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-[3]" style={{ width: "52%", maxWidth: 340 }}>
        <Image
          src="/images/safe3.png"
          alt="SafeHers — women and girls equipped, empowered, protected"
          width={340}
          height={560}
          priority
          className="object-contain object-bottom w-full h-auto drop-shadow-xl"
        />
      </div>
    </div>
  );
}
