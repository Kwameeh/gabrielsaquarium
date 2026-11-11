'use client';

import React from 'react';
import { GalleryItemData } from './types';

export function BlueprintGraphic({ variant }: { variant?: GalleryItemData['blueprintVariant'] }) {
  switch (variant) {
    case 'joint':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#241F21]/40 fill-none" strokeWidth="1">
          {/* Isometric mortise & tenon */}
          <path d="M 20 45 L 50 28 L 80 45 L 50 62 Z" strokeDasharray="3 2" />
          <path d="M 20 45 L 20 75 L 50 92 L 50 62" />
          <path d="M 80 45 L 80 75 L 50 92" />
          <path d="M 38 35 L 50 28 L 62 35 L 50 42 Z" className="stroke-[#241F21]/70" />
          <path d="M 38 35 L 38 20 L 50 13 L 62 20 L 62 35" className="stroke-[#241F21]/70" />
          <path d="M 50 13 L 50 28" className="stroke-[#241F21]/70" />
          {/* Dimension arrows */}
          <line x1="88" y1="45" x2="88" y2="75" strokeWidth="0.75" />
          <line x1="85" y1="45" x2="91" y2="45" strokeWidth="0.75" />
          <line x1="85" y1="75" x2="91" y2="75" strokeWidth="0.75" />
          <text x="94" y="62" fontSize="5" fill="#241F21" opacity="0.6" textAnchor="middle" transform="rotate(90,94,62)">32mm</text>
        </svg>
      );
    case 'slats':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#241F21]/40 fill-none" strokeWidth="1">
          {/* Acoustic Slat repeated cross section */}
          <rect x="10" y="70" width="80" height="8" rx="1" className="fill-[#241F21]/5" />
          <rect x="14" y="25" width="12" height="45" rx="1" className="fill-[#241F21]/10 stroke-[#241F21]/60" />
          <rect x="34" y="25" width="12" height="45" rx="1" className="fill-[#241F21]/10 stroke-[#241F21]/60" />
          <rect x="54" y="25" width="12" height="45" rx="1" className="fill-[#241F21]/10 stroke-[#241F21]/60" />
          <rect x="74" y="25" width="12" height="45" rx="1" className="fill-[#241F21]/10 stroke-[#241F21]/60" />
          {/* Sound absorption wavy vectors */}
          <path d="M 10 15 Q 20 8 30 15 T 50 15 T 70 15 T 90 15" strokeDasharray="2 2" strokeWidth="0.75" />
          <line x1="14" y1="82" x2="26" y2="82" strokeWidth="0.75" />
          <line x1="14" y1="80" x2="14" y2="84" strokeWidth="0.75" />
          <line x1="26" y1="80" x2="26" y2="84" strokeWidth="0.75" />
          <text x="20" y="90" fontSize="5" fill="#241F21" opacity="0.6" textAnchor="middle">13mm</text>
        </svg>
      );
    case 'elevation':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#241F21]/40 fill-none" strokeWidth="1">
          {/* Architectural elevation */}
          <line x1="5" y1="85" x2="95" y2="85" strokeWidth="1.5" className="stroke-[#241F21]/70" />
          <rect x="15" y="30" width="70" height="55" />
          <line x1="15" y1="30" x2="50" y2="12" />
          <line x1="85" y1="30" x2="50" y2="12" />
          {/* Window / mullion dividers */}
          <line x1="30" y1="42" x2="45" y2="42" />
          <line x1="30" y1="62" x2="45" y2="62" />
          <rect x="30" y="42" width="15" height="43" />
          <rect x="55" y="50" width="20" height="35" />
          <circle cx="50" cy="22" r="3" strokeWidth="0.75" />
        </svg>
      );
    case 'chair':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#241F21]/45 fill-none" strokeWidth="1">
          {/* Wireframe chair contour */}
          <path d="M 28 85 L 32 45 L 35 15 C 35 12, 65 12, 65 15 L 68 45 L 72 85" />
          <path d="M 32 45 C 32 40, 68 40, 68 45 L 70 56 C 70 60, 30 60, 30 56 Z" />
          <line x1="30" y1="56" x2="26" y2="85" />
          <line x1="70" y1="56" x2="74" y2="85" />
          <line x1="30" y1="70" x2="70" y2="70" strokeDasharray="2 2" strokeWidth="0.75" />
        </svg>
      );
    case 'plan':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#241F21]/40 fill-none" strokeWidth="1">
          {/* Floor plan schematic */}
          <rect x="15" y="15" width="70" height="70" strokeWidth="1.5" />
          <line x1="15" y1="45" x2="60" y2="45" strokeWidth="1.2" />
          <line x1="60" y1="45" x2="60" y2="85" strokeWidth="1.2" />
          <path d="M 35 45 A 15 15 0 0 1 50 60" strokeDasharray="2 2" strokeWidth="0.75" />
          <line x1="35" y1="45" x2="35" y2="60" strokeWidth="0.75" />
          <circle cx="72" cy="30" r="8" className="fill-[#241F21]/5" />
          <rect x="25" y="24" width="22" height="12" rx="2" strokeWidth="0.75" />
        </svg>
      );
    case 'grid':
    default:
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#241F21]/30 fill-none" strokeWidth="0.75">
          {/* Technical blueprint grid */}
          <defs>
            <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#smallGrid)" className="stroke-none text-[#241F21]" />
          <circle cx="50" cy="50" r="32" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="2" fill="#241F21" opacity="0.6" />
          <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="4 2" />
          <line x1="10" y1="50" x2="90" y2="50" strokeDasharray="4 2" />
        </svg>
      );
  }
}

export function PastelFurnitureGraphic({ title = '' }: { title?: string }) {
  if (title.includes('Stool') || title.includes('Ottoman')) {
    return (
      <svg viewBox="0 0 60 60" className="w-14 sm:w-16 h-14 sm:h-16 stroke-[#241F21] fill-none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="30" cy="22" rx="18" ry="7" className="fill-white/60" />
        <path d="M 14 24 L 18 48" />
        <path d="M 46 24 L 42 48" />
        <path d="M 27 28 L 26 49" />
        <path d="M 33 28 L 34 49" />
        <ellipse cx="30" cy="38" rx="10" ry="2" strokeDasharray="2 2" strokeWidth="0.75" />
      </svg>
    );
  }

  if (title.includes('Vessel') || title.includes('Bowl')) {
    return (
      <svg viewBox="0 0 60 60" className="w-14 sm:w-16 h-14 sm:h-16 stroke-[#241F21] fill-none" strokeWidth="1.2" strokeLinecap="round">
        <path d="M 16 20 C 16 38, 44 38, 44 20 Z" className="fill-white/40" />
        <ellipse cx="30" cy="20" rx="14" ry="4" />
        <ellipse cx="30" cy="44" rx="8" ry="2" className="stroke-[#241F21]/30" />
      </svg>
    );
  }

  if (title.includes('Luminaire') || title.includes('Pendant')) {
    return (
      <svg viewBox="0 0 60 60" className="w-14 sm:w-16 h-14 sm:h-16 stroke-[#241F21] fill-none" strokeWidth="1.2" strokeLinecap="round">
        <line x1="30" y1="8" x2="30" y2="24" strokeWidth="1" />
        <path d="M 12 36 C 20 25, 40 25, 48 36 Z" className="fill-white/60" />
        <ellipse cx="30" cy="36" rx="18" ry="4" />
        <circle cx="30" cy="40" r="3" className="fill-[#241F21]/80" />
      </svg>
    );
  }

  if (title.includes('Lounge') || title.includes('Console') || title.includes('Table')) {
    return (
      <svg viewBox="0 0 60 60" className="w-14 sm:w-16 h-14 sm:h-16 stroke-[#241F21] fill-none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="22" width="40" height="5" rx="1" className="fill-white/70" />
        <path d="M 14 27 L 14 46" />
        <path d="M 46 27 L 46 46" />
        <line x1="14" y1="36" x2="46" y2="36" strokeDasharray="2 2" strokeWidth="0.8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 60 60" className="w-14 sm:w-16 h-14 sm:h-16 stroke-[#241F21] fill-none" strokeWidth="1.2">
      <circle cx="30" cy="30" r="16" className="fill-white/50" />
      <circle cx="30" cy="30" r="8" strokeDasharray="3 2" />
    </svg>
  );
}
