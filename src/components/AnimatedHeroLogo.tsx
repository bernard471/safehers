"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AnimatedHeroLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="hidden lg:flex justify-center lg:col-span-5"
    >
      <Image
        src="/images/safeherlogo.png"
        alt="SafeHer Academy"
        width={280}
        height={280}
        className="w-64 h-64 object-contain opacity-80 drop-shadow-[0_0_60px_rgba(184,150,62,0.2)]"
      />
    </motion.div>
  );
}
