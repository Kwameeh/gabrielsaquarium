'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Sparkles } from 'lucide-react';

export function AquariumHeroHeadline() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-6 select-none"
      aria-hidden="true"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-black/[0.04] shadow-xs mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#F8B828]" />
          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#031A44]/80">
            Ghana&apos;s Premier Aquarium Specialist
          </span>
        </div>

        <h1 className="text-[#031A44] font-medium text-[clamp(2.1rem,4.4vw,4.5rem)] tracking-[-0.03em] leading-[1.1] font-heading">
          Handcrafted Aquariums &amp; Living Reefs
        </h1>

        <p className="mt-3.5 text-xs sm:text-sm md:text-base text-[#031A44]/75 max-w-xl font-normal tracking-wide">
          Custom living walls, curved-glass panoramic tanks, vibrant live fish, and professional maintenance across Greater Accra &amp; Kasoa.
        </p>

        {/* Interactive CTA buttons in hero center */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5 pointer-events-auto">
          <a
            href="#tanks"
            className="px-6 py-3 rounded-full text-xs font-semibold bg-[#0762BF] text-white hover:bg-[#0652A1] shadow-[0_6px_20px_rgba(7,98,191,0.28)] hover:shadow-[0_8px_24px_rgba(7,98,191,0.38)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>Browse Tanks</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
          <a
            href="#custom"
            className="px-6 py-3 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-[#031A44] hover:bg-white border border-black/[0.05] shadow-xs hover:shadow-md transition-all hover:scale-105 active:scale-95"
          >
            Get a Custom Quote
          </a>
        </div>
      </motion.div>
    </div>
  );
}
