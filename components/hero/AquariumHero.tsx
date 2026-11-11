'use client';

import React, { useState } from 'react';
import { AquariumNavbar } from '@/components/header/AquariumNavbar';
import { AquariumHeroHeadline } from './AquariumHeroHeadline';
import { AquariumRadialGallery } from './AquariumRadialGallery';
import { AquariumFloatingBadge } from './AquariumFloatingBadge';
import { AquariumSearchModal } from '@/components/header/AquariumSearchModal';

interface AquariumHeroProps {
  whatsappNumber?: string;
}

export function AquariumHero({ whatsappNumber = '233241234567' }: AquariumHeroProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[640px] max-h-screen overflow-hidden bg-[#F7FBFF] text-[#031A44] select-none"
    >
      {/* 1. Header Navigation Bar (z-index: 50) */}
      <AquariumNavbar
        onOpenSearch={() => setIsSearchOpen(true)}
        whatsappNumber={whatsappNumber}
      />

      {/* 2. 3D Radial Z-Axis Floating Gallery (z-index: 10 & 30 dynamically) */}
      <AquariumRadialGallery />

      {/* 3. Centerpiece Hero Headline & Actions (z-index: 20) */}
      <AquariumHeroHeadline />

      {/* 4. Bottom-Left Floating Guarantee Badge (z-index: 40) */}
      <AquariumFloatingBadge />

      {/* 5. Minimal Bottom-Right Ambient Tagline */}
      <div className="fixed bottom-6 right-20 sm:right-28 z-40 pointer-events-auto flex items-center gap-2.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-black/[0.04] shadow-xs">
        <span className="text-[10px] tracking-[0.14em] uppercase font-mono text-[#031A44]/60 font-medium">
          Kasoa · Accra · 2026
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-[#00B9FF] animate-pulse" />
      </div>

      {/* 6. Interactive Search Modal */}
      <AquariumSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </section>
  );
}

export default AquariumHero;
