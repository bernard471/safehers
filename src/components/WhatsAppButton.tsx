"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "233XXXXXXXXX"; // replace with real number
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello, SafeHer Foundation! I'd like to learn more about your programmes."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export function WhatsAppButton() {
  const [tooltip, setTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-ink text-cream text-xs font-mono tracking-widest uppercase px-4 py-2 flex items-center gap-2"
          >
            Chat with us
            <button
              onClick={() => setTooltip(false)}
              aria-label="Dismiss"
              className="opacity-50 hover:opacity-100 transition-opacity"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with SafeHers on WhatsApp"
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.96 }}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg"
        onClick={() => setTooltip(false)}
      >
        <MessageCircle size={26} fill="white" strokeWidth={0} />
      </motion.a>
    </div>
  );
}
