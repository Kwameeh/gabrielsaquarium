'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function FloatingBadge() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-auto select-none">
      <motion.button
        type="button"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-[36px] h-[36px] rounded-full bg-[#E9E778] flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.06)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#241F21]/30 transition-shadow"
        aria-label="CO certification badge"
      >
        <span className="text-[#241F21] text-[10px] font-bold tracking-tight leading-none">
          CO
        </span>
      </motion.button>

      {/* Subtle floating tooltip on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: -6, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -4, y: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute left-[46px] top-1/2 -translate-y-1/2 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-md shadow-md border border-black/[0.05] whitespace-nowrap pointer-events-none"
          >
            <p className="text-[10px] tracking-wide font-medium text-[#241F21]">
              Carbon Neutral Circular Origin
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
