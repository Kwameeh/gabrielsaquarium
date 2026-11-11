'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { GALLERY_ITEMS } from './galleryData';
import { GalleryItemData } from './types';
import { BlueprintGraphic, PastelFurnitureGraphic } from './CardVisuals';
import { X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function RadialGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Mouse parallax tracking
  const mousePos = useRef({ x: 0, y: 0 });
  const currentParallax = useRef({ x: 0, y: 0 });
  
  // Active modal for clicked card
  const [activeItem, setActiveItem] = useState<GalleryItemData | null>(null);
  const isPaused = useRef(false);

  // Track window dimensions
  const dimensions = useRef({ width: 1440, height: 900 });

  useEffect(() => {
    const updateDimensions = () => {
      dimensions.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Handle mouse move for parallax (±30px)
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    // Normalized [-1, 1] from center
    const nx = (e.clientX / innerWidth - 0.5) * 2;
    const ny = (e.clientY / innerHeight - 0.5) * 2;
    mousePos.current = {
      x: Math.max(-1, Math.min(1, nx)) * 30,
      y: Math.max(-1, Math.min(1, ny)) * 30,
    };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Main high-performance Animation Frame Loop
  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    let pausedTime = 0;
    let lastPauseTimestamp: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;

      if (isPaused.current) {
        if (lastPauseTimestamp === null) lastPauseTimestamp = timestamp;
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      if (lastPauseTimestamp !== null) {
        pausedTime += timestamp - lastPauseTimestamp;
        lastPauseTimestamp = null;
      }

      const elapsed = (timestamp - startTime - pausedTime) / 1000;

      // Smooth lerp for mouse parallax
      currentParallax.current.x += (mousePos.current.x - currentParallax.current.x) * 0.06;
      currentParallax.current.y += (mousePos.current.y - currentParallax.current.y) * 0.06;

      const { width, height } = dimensions.current;
      const baseMaxRadius = Math.max(width, height) * 0.68;

      GALLERY_ITEMS.forEach((item, index) => {
        const el = itemsRef.current[index];
        if (!el) return;

        // Progress 0 to 1 loop with individual duration & initial offset
        const progress = (item.initialProgress + elapsed / item.duration) % 1.0;

        // 1. Scale: Exponential interpolation from scale(0.096) to scale(1.62) (~20% larger 3D depth)
        // scale = 0.096 * (1.62 / 0.096) ^ progress
        const scale = 0.096 * Math.pow(1.62 / 0.096, progress);

        // 2. Position: outward along assigned angle with exponential acceleration
        const maxRadius = baseMaxRadius * item.radiusMultiplier;
        // Nonlinear radial distance curve matching perspective
        const distProgress = 0.12 * progress + 0.88 * Math.pow(progress, 1.6);
        const radius = maxRadius * distProgress;

        // Mouse parallax differential (foreground items shift slightly more)
        const depthParallaxMultiplier = 0.4 + 0.6 * progress;
        const pX = currentParallax.current.x * depthParallaxMultiplier;
        const pY = currentParallax.current.y * depthParallaxMultiplier;

        const posX = Math.cos(item.angle) * radius + pX;
        const posY = Math.sin(item.angle) * radius + pY;

        // 3. Opacity:
        // 0 at progress 0 -> fades to 0.35 in inner ring (0.15-0.4) -> 1.0 in outer ring (0.5-0.9) -> fades out at edge
        let opacity = 0;
        if (progress < 0.15) {
          opacity = (progress / 0.15) * 0.35;
        } else if (progress <= 0.4) {
          opacity = 0.35;
        } else if (progress < 0.6) {
          opacity = 0.35 + ((progress - 0.4) / 0.2) * 0.65;
        } else if (progress <= 0.9) {
          opacity = 1.0;
        } else {
          opacity = Math.max(0, 1.0 - ((progress - 0.9) / 0.1));
        }

        // 4. Z-index: scale < 0.72 -> z-index: 10; scale >= 0.72 -> z-index: 30
        const zIndex = scale < 0.72 ? 10 : 30;

        // Apply styles via direct transform for 60/120fps hardware acceleration
        el.style.transform = `translate3d(${posX.toFixed(2)}px, ${posY.toFixed(2)}px, 0px) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = zIndex.toString();
        // Hide elements with 0 opacity to prevent interaction / paint overhead
        el.style.visibility = opacity < 0.01 ? 'hidden' : 'visible';
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <>
      {/* 3D Radial Stage Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ perspective: '1200px' }}
      >
        {/* Center Vanishing Point Reference (50% X, 50% Y) */}
        <div className="absolute top-1/2 left-1/2 w-0 h-0">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              onClick={() => {
                setActiveItem(item);
                isPaused.current = true;
              }}
              className={`absolute top-0 left-0 cursor-pointer pointer-events-auto will-change-transform select-none group transition-[filter] duration-200 ${item.width}`}
              style={{
                transform: 'translate3d(0px, 0px, 0px) translate(-50%, -50%) scale(0.096)',
                opacity: 0,
                zIndex: 10,
              }}
            >
              <div
                className={`w-full ${item.aspect} rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-black/[0.05] relative transition-shadow duration-300 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.14)]`}
              >
                {/* 1. VIDEO CARD */}
                {item.type === 'video' && item.videoUrl && (
                  <div className="relative w-full h-full bg-[#1A1817] overflow-hidden">
                    <video
                      src={item.videoUrl}
                      poster={item.imageUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Minimal live film badge */}
                    <div className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md flex items-center gap-1 border border-white/10 pointer-events-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E9E778] animate-pulse" />
                      <span className="text-[7.5px] font-mono tracking-widest text-white/90">FILM</span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <p className="text-white text-[11px] sm:text-[12px] font-medium leading-tight truncate">
                        {item.title}
                      </p>
                    </div>
                  </div>
                )}

                {/* 2. EDITORIAL PHOTO CARD */}
                {item.type === 'editorial' && (
                  <div className="relative w-full h-full bg-[#E5DFD7]">
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 180px, 240px"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading="eager"
                        priority={index < 8}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <p className="text-white text-[11px] sm:text-[12px] font-medium leading-tight truncate">
                        {item.title}
                      </p>
                    </div>
                  </div>
                )}

                {/* 2. PASTEL MINIMAL CARD (#D8E2D5 or #F2A679) */}
                {item.type === 'pastel' && (
                  <div
                    className="w-full h-full p-3.5 sm:p-5 flex flex-col justify-between items-center text-center transition-transform duration-300 group-hover:scale-[1.02]"
                    style={{ backgroundColor: item.bgColor || '#D8E2D5' }}
                  >
                    <div className="w-full flex justify-between items-center text-[8px] font-semibold uppercase tracking-[0.12em] text-[#241F21]/70">
                      <span>FLOEMA</span>
                      <span>0{item.id}</span>
                    </div>

                    <div className="py-2.5 flex items-center justify-center">
                      <PastelFurnitureGraphic title={item.title} />
                    </div>

                    <div className="w-full">
                      <p className="text-[10px] sm:text-[11px] font-semibold text-[#241F21] leading-tight truncate">
                        {item.title}
                      </p>
                      <p className="text-[8.5px] sm:text-[9px] text-[#241F21]/60 truncate font-mono">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                )}

                {/* 3. TECHNICAL BLUEPRINT / WIREFRAME CARD */}
                {item.type === 'wireframe' && (
                  <div className="w-full h-full p-3 sm:p-3.5 bg-white/70 backdrop-blur-sm border border-[#241F21]/15 flex flex-col justify-between relative group-hover:bg-white/90 transition-colors">
                    {/* Header line with technical markings */}
                    <div className="flex justify-between items-center text-[7.5px] sm:text-[8px] font-mono uppercase text-[#241F21]/60">
                      <span>DWG // {item.id < 10 ? `0${item.id}` : item.id}</span>
                      <span>SCALE 1:25</span>
                    </div>

                    <div className="w-full h-full flex items-center justify-center p-1.5">
                      <BlueprintGraphic variant={item.blueprintVariant} />
                    </div>

                    <div className="border-t border-[#241F21]/10 pt-1.5 flex justify-between items-center">
                      <p className="text-[9px] sm:text-[10px] font-medium text-[#241F21] truncate">
                        {item.title}
                      </p>
                      <span className="text-[7.5px] font-mono text-[#241F21]/50">
                        REV.B
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Item Inspection Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#241F21]/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => {
              setActiveItem(null);
              isPaused.current = false;
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F3EFEA] rounded-2xl shadow-2xl border border-black/10 overflow-hidden max-w-md w-full p-6 text-[#241F21] relative"
            >
              <button
                type="button"
                onClick={() => {
                  setActiveItem(null);
                  isPaused.current = false;
                }}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/5 text-[#241F21]/70 hover:text-[#241F21] transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider bg-black/5 text-[#241F21]">
                    {activeItem.type}
                  </span>
                  <span className="text-[10px] text-[#241F21]/60 font-mono">
                    ID // 00{activeItem.id}
                  </span>
                </div>

                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/5 relative flex items-center justify-center border border-black/5">
                  {activeItem.type === 'video' && activeItem.videoUrl && (
                    <video
                      src={activeItem.videoUrl}
                      poster={activeItem.imageUrl}
                      autoPlay
                      loop
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  )}
                  {activeItem.type === 'editorial' && activeItem.imageUrl && (
                    <Image
                      src={activeItem.imageUrl}
                      alt={activeItem.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  )}
                  {activeItem.type === 'pastel' && (
                    <div
                      className="w-full h-full flex flex-col items-center justify-center p-8"
                      style={{ backgroundColor: activeItem.bgColor || '#D8E2D5' }}
                    >
                      <PastelFurnitureGraphic title={activeItem.title} />
                    </div>
                  )}
                  {activeItem.type === 'wireframe' && (
                    <div className="w-full h-full p-8 flex items-center justify-center bg-white/80">
                      <BlueprintGraphic variant={activeItem.blueprintVariant} />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-medium tracking-tight text-[#241F21]">
                    {activeItem.title}
                  </h3>
                  {activeItem.subtitle && (
                    <p className="text-xs text-[#241F21]/60 mt-0.5">
                      {activeItem.subtitle}
                    </p>
                  )}
                  <p className="text-xs text-[#241F21]/80 mt-3 leading-relaxed">
                    Designed and engineered under Floema&apos;s circular architecture principles. Crafted from sustainably harvested materials with zero-carbon finish.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-black/10 text-xs">
                  <span className="font-medium text-[#241F21]">Floema Living Archive</span>
                  <a
                    href="#products"
                    onClick={() => {
                      setActiveItem(null);
                      isPaused.current = false;
                    }}
                    className="inline-flex items-center gap-1.5 font-medium underline underline-offset-4 hover:opacity-70 transition-opacity"
                  >
                    View Product Sheet <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
