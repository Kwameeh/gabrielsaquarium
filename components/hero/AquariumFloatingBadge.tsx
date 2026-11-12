'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

interface AquariumFloatingBadgeProps {
  title?: string;
  subtitle?: string;
}

export function AquariumFloatingBadge({
  title = "Gabriel's Guarantee",
  subtitle = 'Live Fish Health & Leak-Free Tank Guarantee',
}: AquariumFloatingBadgeProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-auto select-none">
      <motion.button
        type="button"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-[38px] h-[38px] rounded-full bg-[#F8B828] flex items-center justify-center shadow-[0_4px_16px_rgba(248,184,40,0.35)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#031A44]/30 transition-shadow"
        aria-label="Quality and Live Arrival Guarantee Badge"
      >
        <ShieldCheck className="w-5 h-5 text-[#031A44]" />
      </motion.button>

      {/* Floating tooltip on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: -6, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -4, y: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute left-[48px] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-black/[0.05] whitespace-nowrap pointer-events-none"
          >
            <p className="text-[11px] font-bold text-[#031A44]">
              {title}
            </p>
            <p className="text-[9px] text-[#031A44]/70">
              {subtitle}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
