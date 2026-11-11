'use client';

import React from 'react';
import { motion } from 'motion/react';

export function HeroHeadline() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 px-6 select-none"
      aria-hidden="true"
    >
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-[#241F21] font-light md:font-normal text-[clamp(2.2rem,4.2vw,4.25rem)] tracking-[-0.02em] text-center md:whitespace-nowrap leading-[1.15]"
      >
        Spaces for people, made for life.
      </motion.h1>
    </div>
  );
}
