'use client';

import React from 'react';
import { AquariumNavbar } from '@/components/header/AquariumNavbar';
import { AquariumHeroHeadline } from './AquariumHeroHeadline';
import { AquariumRadialGallery } from './AquariumRadialGallery';
import { AquariumFloatingBadge } from './AquariumFloatingBadge';
import { GalleryItemData } from './types';

interface AquariumHeroProps {
  whatsappNumber?: string;
  galleryItems?: GalleryItemData[];
  logo?: any;
  businessName?: string;
  videoUrl?: string;
}

export function AquariumHero({
  whatsappNumber = '233249384800',
  galleryItems,
  logo,
  businessName = "Gabriel's Aquarium",
  videoUrl = 'https://cdn.sanity.io/files/iicegrrv/production/51558fa95dd82f9f28eedabc19fe690aaf58381c.mp4',
}: AquariumHeroProps) {
  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[640px] max-h-screen overflow-hidden bg-slate-950 text-white select-none"
    >
      {/* 0. Fullscreen Living Video Background Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          src={videoUrl}
          poster="/images/hero-video-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter saturate-[1.2] brightness-[0.75]"
        />
        {/* Cinematic Vignette & Readability Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/25 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-[#031A44]/30 pointer-events-none" />
      </div>

      {/* 1. Header Navigation Bar (z-index: 50, smart scroll hide/show) */}
      <AquariumNavbar
        whatsappNumber={whatsappNumber}
        logo={logo}
        businessName={businessName}
      />

      {/* 2. 3D Radial Z-Axis Floating Gallery (z-index: 10 & 30 dynamically) */}
      <AquariumRadialGallery items={galleryItems} />

      {/* 3. Centerpiece Hero Headline & Actions (z-index: 20) */}
      <AquariumHeroHeadline />

      {/* 4. Bottom-Left Floating Guarantee Badge (z-index: 40) */}
      <AquariumFloatingBadge />
    </section>
  );
}

export default AquariumHero;
