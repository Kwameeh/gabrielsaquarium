'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, ArrowUpRight, X, Sparkles, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { waLink } from '@/lib/whatsapp';
import { urlFor } from '@/sanity/lib/image';

export interface AutoScrollGalleryItem {
  id: string;
  title: string;
  category: string;
  mediaType: 'image' | 'video';
  imageUrl: string;
  videoUrl?: string;
  location?: string;
}

export const DEFAULT_GALLERY_ITEMS: AutoScrollGalleryItem[] = [
  // Row 1 items
  {
    id: 'kasoa-curved-1',
    title: 'Curved Glass Living Room Installation',
    category: 'Custom Tank',
    mediaType: 'image',
    imageUrl: '/images/project-04-hotel-lobby-curved-tank-main.jpg',
    location: 'East Legon, Accra',
  },
  {
    id: 'reef-motion-video',
    title: 'Acropora Reef Ecosystem in Motion',
    category: 'Marine Reef',
    mediaType: 'video',
    imageUrl: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://cdn.sanity.io/files/iicegrrv/production/51558fa95dd82f9f28eedabc19fe690aaf58381c.mp4',
    location: 'Studio Build',
  },
  {
    id: 'discus-softwater',
    title: 'Red Turquoise Discus Biotope',
    category: 'Exotic Fish',
    mediaType: 'image',
    imageUrl: '/images/fish-04-discus.jpg',
    location: 'East Legon Residence',
  },
  {
    id: 'kasoa-inwall-reef',
    title: 'Architectural In-Wall Living Reef',
    category: 'Custom Tank',
    mediaType: 'image',
    imageUrl: '/images/project-08-marine-reef-at-home-main.jpg',
    location: 'Trassaco Valley, East Legon',
  },
  {
    id: 'marine-school-video',
    title: 'Schooling Marine Fish Ambient Loop',
    category: 'Marine Life',
    mediaType: 'video',
    imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://cdn.sanity.io/files/iicegrrv/production/51558fa95dd82f9f28eedabc19fe690aaf58381c.mp4',
    location: 'Showroom Tank',
  },
  {
    id: 'iwagumi-aquascape',
    title: 'Iwagumi Stone Aquascape',
    category: 'Planted Tank',
    mediaType: 'image',
    imageUrl: '/images/tank-05-rimless-ultra-clear-100-front.jpg',
    location: 'Airport Residential',
  },
  {
    id: 'cichlids-malawi',
    title: 'Lake Malawi Peacock Cichlids',
    category: 'Freshwater Fish',
    mediaType: 'image',
    imageUrl: '/images/fish-10-convict-cichlid.jpg',
    location: 'Cantonments Project',
  },
  {
    id: 'kasoa-botanical-5',
    title: 'High-Tech Nature Planted Haven',
    category: 'Custom Tank',
    mediaType: 'image',
    imageUrl: '/images/project-01-living-room-feature-tank-main.jpg',
    location: 'Greater Accra',
  },

  // Row 2 items
  {
    id: 'cardinal-tetras',
    title: 'Schooling Neon Tetras in Riverbed Flora',
    category: 'Freshwater Fish',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1576836165612-8bc9b07e7778?q=80&w=800&auto=format&fit=crop',
    location: 'Client Setup',
  },
  {
    id: 'deep-blue-video',
    title: 'Reef Twilight Luminescence Motion',
    category: 'Marine Life',
    mediaType: 'video',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://cdn.sanity.io/files/iicegrrv/production/51558fa95dd82f9f28eedabc19fe690aaf58381c.mp4',
    location: 'Reef Showcase',
  },
  {
    id: 'halfmoon-betta',
    title: 'Royal Blue Halfmoon Betta',
    category: 'Exotic Fish',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=800&auto=format&fit=crop',
    location: 'Gabriel Stock',
  },
  {
    id: 'yellow-tang-marine',
    title: 'Hawaiian Yellow Tang Grazer',
    category: 'Marine Fish',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=800&auto=format&fit=crop',
    location: 'Reef Ecosystem',
  },
  {
    id: 'living-room-centerpiece',
    title: 'Living Room Centerpiece Aquarium',
    category: 'Custom Tank',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    location: 'Ridge, Accra',
  },
  {
    id: 'bubble-current-video',
    title: 'High-Flow Silent Sump Filtration',
    category: 'Filtration',
    mediaType: 'video',
    imageUrl: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://cdn.sanity.io/files/iicegrrv/production/51558fa95dd82f9f28eedabc19fe690aaf58381c.mp4',
    location: 'Engineered Systems',
  },
  {
    id: 'clownfish-anemone',
    title: 'Symbiotic Clownfish Colony',
    category: 'Marine Reef',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=800&auto=format&fit=crop',
    location: 'Luxury Villa',
  },
  {
    id: 'rimless-cube-planted',
    title: 'Low-Iron Crystal Clear Cube',
    category: 'Custom Tank',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=800&auto=format&fit=crop',
    location: 'Office Setup',
  },
];

interface AutoScrollGalleryProps {
  items?: AutoScrollGalleryItem[];
  sanityItems?: any[];
  whatsappNumber?: string;
}

export function AutoScrollGallery({
  items,
  sanityItems,
  whatsappNumber = '233249384800',
}: AutoScrollGalleryProps) {
  const [activeItem, setActiveItem] = useState<AutoScrollGalleryItem | null>(null);

  const resolvedItems: AutoScrollGalleryItem[] = useMemo(() => {
    if (items && items.length > 0) return items;
    if (sanityItems && sanityItems.length > 0) {
      return sanityItems.map((s, idx) => {
        let img = DEFAULT_GALLERY_ITEMS[idx % DEFAULT_GALLERY_ITEMS.length]?.imageUrl || '/images/project-01-living-room-feature-tank-main.jpg';
        if (s.image) {
          try {
            img = typeof s.image === 'string' ? s.image : urlFor(s.image).width(800).url();
          } catch {}
        } else if (s.thumbnailImage) {
          try {
            img = typeof s.thumbnailImage === 'string' ? s.thumbnailImage : urlFor(s.thumbnailImage).width(800).url();
          } catch {}
        }
        return {
          id: s._id || `item-${idx}`,
          title: s.title || 'Aquarium Feature',
          category: s.tags?.[0] ? s.tags[0].replace('-', ' ') : 'Living Art',
          mediaType: s.mediaType || 'image',
          imageUrl: img,
          videoUrl: s.videoUrl || s.videoFileUrl,
          location: 'Gabriel Showroom',
        };
      });
    }
    return DEFAULT_GALLERY_ITEMS;
  }, [items, sanityItems]);

  // Split into 2 rows for opposite scrolling
  const midPoint = Math.ceil(resolvedItems.length / 2);
  const row1 = resolvedItems.slice(0, midPoint);
  const row2 = resolvedItems.slice(midPoint);

  // Duplicate for seamless infinite loop
  const infiniteRow1 = [...row1, ...row1];
  const infiniteRow2 = [...row2, ...row2];

  return (
    <section className="py-20 sm:py-28 bg-[#020F2B] text-white relative overflow-hidden select-none">
      {/* Background ambient water glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#0762BF]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#00B9FF]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-12 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono tracking-wider uppercase text-[#00B9FF] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#F8B828]" />
              Living Aquatic Gallery
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-heading">
              Life at Gabriel&apos;s Aquarium
            </h2>
            <p className="text-xs sm:text-sm text-white/70 max-w-xl mt-2 leading-relaxed">
              Real custom tanks, thriving reef biotopes, exotic fish species, and precision builds across East Legon, Accra, and nationwide.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold backdrop-blur-md transition-all hover:scale-105 active:scale-95 group w-fit"
          >
            <span>View Full Gallery</span>
            <ArrowUpRight className="w-4 h-4 text-[#00B9FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Infinite Marquee Track 1 (Left Scrolling) */}
      <div className="relative w-full overflow-hidden mb-6">
        {/* Subtle edge fades */}
        <div className="absolute left-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-r from-[#020F2B] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-l from-[#020F2B] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 sm:gap-6 animate-marquee-left pause-hover w-max">
          {infiniteRow1.map((item, idx) => (
            <div
              key={`${item.id}-r1-${idx}`}
              onClick={() => setActiveItem(item)}
              className="relative w-64 sm:w-80 h-44 sm:h-52 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group flex-shrink-0 border border-white/10 shadow-lg hover:border-[#00B9FF]/60 hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 256px, 320px"
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Media badge: Video or Category */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-md text-white border border-white/20">
                  {item.category}
                </span>
                {item.mediaType === 'video' && (
                  <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-[#0762BF] text-white shadow-xs">
                    <Play className="w-2.5 h-2.5 fill-white stroke-none" />
                    Video
                  </span>
                )}
              </div>

              {/* Title & Location at bottom */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="text-xs sm:text-sm font-semibold truncate group-hover:text-[#00B9FF] transition-colors">
                  {item.title}
                </h3>
                {item.location && (
                  <p className="text-[10px] text-white/60 truncate mt-0.5 font-mono">
                    {item.location}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Marquee Track 2 (Right Scrolling) */}
      <div className="relative w-full overflow-hidden">
        {/* Subtle edge fades */}
        <div className="absolute left-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-r from-[#020F2B] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-l from-[#020F2B] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 sm:gap-6 animate-marquee-right pause-hover w-max">
          {infiniteRow2.map((item, idx) => (
            <div
              key={`${item.id}-r2-${idx}`}
              onClick={() => setActiveItem(item)}
              className="relative w-64 sm:w-80 h-44 sm:h-52 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group flex-shrink-0 border border-white/10 shadow-lg hover:border-[#00B9FF]/60 hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 256px, 320px"
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Media badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-md text-white border border-white/20">
                  {item.category}
                </span>
                {item.mediaType === 'video' && (
                  <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-[#0762BF] text-white shadow-xs">
                    <Play className="w-2.5 h-2.5 fill-white stroke-none" />
                    Video
                  </span>
                )}
              </div>

              {/* Title & Location at bottom */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="text-xs sm:text-sm font-semibold truncate group-hover:text-[#00B9FF] transition-colors">
                  {item.title}
                </h3>
                {item.location && (
                  <p className="text-[10px] text-white/60 truncate mt-0.5 font-mono">
                    {item.location}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Media Viewer Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#031A44] border border-white/15 rounded-3xl overflow-hidden shadow-2xl text-white"
            >
              {/* Media Container */}
              <div className="relative w-full aspect-16/10 bg-black overflow-hidden">
                {activeItem.mediaType === 'video' && activeItem.videoUrl ? (
                  <video
                    src={activeItem.videoUrl}
                    poster={activeItem.imageUrl}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={activeItem.imageUrl}
                    alt={activeItem.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Info & Call to Action */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-white/10 text-[#00B9FF]">
                    {activeItem.category}
                  </span>
                  {activeItem.location && (
                    <span className="text-[11px] text-white/60 font-mono">
                      · {activeItem.location}
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-heading">
                  {activeItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 mt-2 leading-relaxed">
                  Crafted and maintained by Gabriel&apos;s Aquarium Centre. We design, install, and service pristine freshwater and marine setups throughout Ghana.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={waLink(
                      whatsappNumber,
                      `Hello Gabriel's Aquarium! I saw "${activeItem.title}" in your gallery and would like to inquire about a similar setup or livestock.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#0F7B6C] hover:bg-[#0D6D60] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                  <Link
                    href="/custom-tanks"
                    onClick={() => setActiveItem(null)}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-white/20 hover:bg-white/10 text-white text-xs font-semibold text-center transition-colors"
                  >
                    Custom Build Quote
                  </Link>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors backdrop-blur-md"
                aria-label="Close preview"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
