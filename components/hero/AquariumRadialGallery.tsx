'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { AQUARIUM_GALLERY_ITEMS } from './aquariumGalleryData';
import { GalleryItemData } from './types';
import { BlueprintGraphic, PastelFurnitureGraphic } from './CardVisuals';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AquariumRadialGallery() {
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

      AQUARIUM_GALLERY_ITEMS.forEach((item, index) => {
        const el = itemsRef.current[index];
        if (!el) return;

        // Progress 0 to 1 loop with individual duration & initial offset
        const progress = (item.initialProgress + elapsed / item.duration) % 1.0;

        // Scale: Exponential interpolation from scale(0.096) to scale(1.62)
        const scale = 0.096 * Math.pow(1.62 / 0.096, progress);

        // Position: outward along assigned angle with exponential acceleration
        const maxRadius = baseMaxRadius * item.radiusMultiplier;
        const distProgress = 0.12 * progress + 0.88 * Math.pow(progress, 1.6);
        const radius = maxRadius * distProgress;

        const x = Math.cos(item.angle) * radius + currentParallax.current.x * progress;
        const y = Math.sin(item.angle) * radius + currentParallax.current.y * progress;

        // Opacity curve: fade in quickly from 0 to 0.1, stay visible, fade out near edge (0.85 to 1.0)
        let opacity = 1;
        if (progress < 0.1) {
          opacity = progress / 0.1;
        } else if (progress > 0.82) {
          opacity = Math.max(0, 1 - (progress - 0.82) / 0.18);
        }

        // Layer depth: below headline (z: 10) when small/far, above headline (z: 30) when prominent
        const zIndex = progress > 0.48 ? 30 : 10;

        el.style.transform = `translate3d(calc(-50% + ${x.toFixed(2)}px), calc(-50% + ${y.toFixed(2)}px), 0) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = `${zIndex}`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const openModal = (item: GalleryItemData) => {
    isPaused.current = true;
    setActiveItem(item);
  };

  const closeModal = () => {
    setActiveItem(null);
    isPaused.current = false;
  };

  return (
    <>
      {/* 3D Radial Orbit Viewport */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
      >
        {/* Origin container pinned at center (50% 50%) */}
        <div className="absolute top-1/2 left-1/2 w-0 h-0">
          {AQUARIUM_GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              onClick={() => openModal(item)}
              className={`absolute top-0 left-0 ${item.width} ${item.aspect} pointer-events-auto cursor-pointer group origin-center will-change-transform`}
              style={{
                transform: 'translate3d(-50%, -50%, 0) scale(0.1)',
                opacity: 0,
              }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(3,26,68,0.12)] border border-white/60 bg-white group-hover:shadow-[0_16px_48px_rgba(3,26,68,0.22)] group-hover:scale-105 transition-all duration-300">
                {/* 1. Image / Editorial Card */}
                {item.type === 'editorial' && item.imageUrl && (
                  <div className="relative w-full h-full">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 160px, 220px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031A44]/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                      <p className="text-[10px] font-semibold tracking-wide truncate">{item.title}</p>
                      <p className="text-[8px] opacity-75 truncate">{item.subtitle}</p>
                    </div>
                  </div>
                )}

                {/* 2. Video Card */}
                {item.type === 'video' && item.imageUrl && (
                  <div className="relative w-full h-full">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 160px, 220px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031A44]/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-xs rounded-full p-1 text-[#031A44]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0762BF] animate-ping" />
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                      <p className="text-[10px] font-semibold tracking-wide truncate">{item.title}</p>
                      <p className="text-[8px] opacity-75 truncate">{item.subtitle}</p>
                    </div>
                  </div>
                )}

                {/* 3. Pastel Minimal Card */}
                {item.type === 'pastel' && (
                  <div
                    className="w-full h-full flex flex-col justify-between p-3"
                    style={{ backgroundColor: item.bgColor || '#E3F1FC' }}
                  >
                    <div className="w-full flex justify-end">
                      <PastelFurnitureGraphic />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold tracking-wide text-[#031A44] truncate">
                        {item.title}
                      </p>
                      <p className="text-[8px] text-[#031A44]/70 tracking-wider uppercase truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                )}

                {/* 4. Technical Blueprint Graphic Card */}
                {item.type === 'wireframe' && (
                  <div className="w-full h-full bg-[#F7FBFF] p-2.5 flex flex-col justify-between border border-[#0762BF]/15">
                    <div className="w-full flex-1 flex items-center justify-center p-1">
                      <BlueprintGraphic variant={item.blueprintVariant} />
                    </div>
                    <div className="border-t border-[#0762BF]/10 pt-1.5">
                      <p className="text-[9px] font-mono tracking-tight text-[#031A44] truncate">
                        {item.title}
                      </p>
                      <p className="text-[7px] font-mono text-[#0762BF] uppercase tracking-wider truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal on Click */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#031A44]/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-border"
            >
              {activeItem.imageUrl && (
                <div className="relative w-full h-64 bg-slate-900">
                  <Image
                    src={activeItem.imageUrl}
                    alt={activeItem.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              )}

              <div className="p-6">
                <span className="text-[10px] tracking-widest font-mono uppercase text-[#0762BF] font-semibold">
                  Gabriel&apos;s Showcase · Ghana
                </span>
                <h3 className="text-xl font-bold text-[#031A44] mt-1">
                  {activeItem.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {activeItem.subtitle}
                </p>

                <p className="text-xs text-[#031A44]/80 mt-4 leading-relaxed">
                  Precision engineered by Gabriel&apos;s Aquarium. Every tank, aquascape, and living marine ecosystem is crafted with premium low-iron glass, silent filtration, and acclimated specimens for Ghanaian environments.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <a
                    href="#tanks"
                    onClick={closeModal}
                    className="flex-1 text-center py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#0762BF] text-white hover:bg-[#0652A1] transition-colors shadow-xs"
                  >
                    View All Tanks
                  </a>
                  <a
                    href="#custom"
                    onClick={closeModal}
                    className="flex-1 text-center py-2.5 px-4 rounded-xl text-xs font-semibold border border-border hover:bg-muted text-[#031A44] transition-colors"
                  >
                    Request Custom Quote
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors backdrop-blur-xs"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
