'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { HeroHeadline } from './HeroHeadline';
import { RadialGallery } from './RadialGallery';
import { FloatingBadge } from './FloatingBadge';
import { SearchModal } from './SearchModal';

export function FloemaHero() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <section
      id="hero"
      className="relative w-screen h-screen max-w-full max-h-screen overflow-hidden bg-[#F3EFEA] text-[#241F21] select-none"
      style={{
        backgroundColor: '#F3EFEA',
        color: '#241F21',
      }}
    >
      {/* 1. Fixed Header / Navigation Bar (z-index: 50) */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* 2. 3D Radial Z-Axis Floating Gallery (z-index: 10 & 30 dynamically) */}
      <RadialGallery />

      {/* 3. Centerpiece Hero Headline (z-index: 20, pointer-events-none) */}
      <HeroHeadline />

      {/* 4. Bottom-Left Floating Badge (z-index: 40) */}
      <FloatingBadge />

      {/* 5. Minimal Bottom-Right Tagline / Ambient Indicator */}
      <div className="fixed bottom-6 right-6 sm:right-12 z-40 pointer-events-auto flex items-center gap-3">
        <span className="hidden sm:inline-block text-[10px] tracking-[0.14em] uppercase font-mono text-[#241F21]/40">
          Curated Perspective · 2026
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-[#241F21]/40 animate-pulse" />
      </div>

      {/* 6. Interactive Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </section>
  );
}

export default FloemaHero;
