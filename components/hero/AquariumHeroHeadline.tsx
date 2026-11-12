'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Sparkles } from 'lucide-react';

interface AquariumHeroHeadlineProps {
  badge?: string;
  headline?: string;
  subheadline?: string;
  primaryCta?: string;
  secondaryCta?: string;
}

export function AquariumHeroHeadline({
  badge = "Ghana's Premier Aquarium Specialist",
  headline = 'Handcrafted Aquariums & Living Reefs',
  subheadline = 'Custom living walls, curved-glass panoramic tanks, vibrant live fish, and professional maintenance across Greater Accra.',
  primaryCta = 'Browse Tanks',
  secondaryCta = 'Get a Custom Quote',
}: AquariumHeroHeadlineProps) {
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-lg mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#F8B828]" />
          <span className="text-[11px] font-semibold tracking-wider uppercase text-white/90">
            {badge}
          </span>
        </div>

        <h1 className="text-white font-medium text-[clamp(2.1rem,4.4vw,4.5rem)] tracking-[-0.03em] leading-[1.1] font-heading drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
          {headline}
        </h1>

        <p className="mt-3.5 text-xs sm:text-sm md:text-base text-white/90 max-w-xl font-normal tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
          {subheadline}
        </p>

        {/* Interactive CTA buttons in hero center */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5 pointer-events-auto">
          <a
            href="#tanks"
            className="px-6 py-3 rounded-full text-xs font-semibold bg-[#0762BF] text-white hover:bg-[#0652A1] shadow-[0_6px_24px_rgba(7,98,191,0.5)] hover:shadow-[0_8px_32px_rgba(7,98,191,0.7)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>{primaryCta}</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
          <a
            href="#custom"
            className="px-6 py-3 rounded-full text-xs font-semibold bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            {secondaryCta}
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default AquariumHeroHeadline;
