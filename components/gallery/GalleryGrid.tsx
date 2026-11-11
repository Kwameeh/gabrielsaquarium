'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, ArrowUpRight, X, Sparkles, Filter, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { waLink } from '@/lib/whatsapp';

export interface GalleryGridItem {
  id: string;
  title: string;
  category: string;
  mediaType: 'image' | 'video';
  imageUrl: string;
  videoUrl?: string;
  description: string;
  location?: string;
  tankSize?: string;
}

export const FALLBACK_GALLERY_DATA: GalleryGridItem[] = [
  {
    id: 'kasoa-curved-panoramic',
    title: 'Curved Glass Living Room Installation',
    category: 'custom-tanks',
    mediaType: 'image',
    imageUrl: '/images/project-04-hotel-lobby-curved-tank-main.jpg',
    description: 'Heat-bent seamless curved corner glass with high-clarity view, automated lighting schedule, and silent sump filtration.',
    location: 'East Legon, Accra',
    tankSize: '120 x 45 x 65 cm · 350L',
  },
  {
    id: 'coral-reef-video',
    title: 'Acropora & Soft Corals Living Reef Motion',
    category: 'marine',
    mediaType: 'video',
    imageUrl: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=900&auto=format&fit=crop',
    videoUrl: 'https://cdn.sanity.io/files/iicegrrv/production/51558fa95dd82f9f28eedabc19fe690aaf58381c.mp4',
    description: '4K video footage of thriving acropora, euphillia corals, and clownfish in high-spec reef system.',
    location: 'Gabriel Showroom',
    tankSize: '150 x 60 x 60 cm',
  },
  {
    id: 'discus-softwater-biotope',
    title: 'Red Turquoise Discus Softwater Display',
    category: 'fish',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1520315342629-6ea920342047?q=80&w=900&auto=format&fit=crop',
    description: 'Showcasing acclimated Heckel & Red Turquoise discus in Amazonian driftwood biotope with soft RO water conditioning.',
    location: 'East Legon Residence',
    tankSize: '160 x 55 x 65 cm · 572L',
  },
  {
    id: 'kasoa-inwall-living-reef',
    title: 'Architectural In-Wall Living Reef',
    category: 'custom-tanks',
    mediaType: 'image',
    imageUrl: '/images/project-08-marine-reef-at-home-main.jpg',
    description: 'Flush in-wall installation with rear maintenance room, dual protein skimmers, and full automation.',
    location: 'Trassaco Valley, East Legon',
    tankSize: '150 x 50 x 70 cm · 525L',
  },
  {
    id: 'tropical-school-video',
    title: 'Vibrant Schooling Reef Life in Motion',
    category: 'marine',
    mediaType: 'video',
    imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=900&auto=format&fit=crop',
    videoUrl: 'https://cdn.sanity.io/files/iicegrrv/production/51558fa95dd82f9f28eedabc19fe690aaf58381c.mp4',
    description: 'Underwater loop of schooling marine tangs and anthias swimming gracefully across live rock formations.',
    location: 'Ridge Corporate Lounge',
    tankSize: '200 x 70 x 75 cm',
  },
  {
    id: 'iwagumi-stone-aquascape',
    title: 'Nature Planted Aquascape with Iwagumi Stones',
    category: 'freshwater',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=900&auto=format&fit=crop',
    description: 'Seiryu stone layout with vibrant Monte Carlo carpet and pressurized CO2 dosing for pristine plant pearling.',
    location: 'Airport Residential',
    tankSize: '90 x 45 x 45 cm · 182L',
  },
  {
    id: 'malawi-peacock-cichlids',
    title: 'Lake Malawi African Cichlid Sanctuary',
    category: 'fish',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=900&auto=format&fit=crop',
    description: 'Rocky cave habitat housing over 40 colorful African peacock cichlids with natural limestone buffer.',
    location: 'Cantonments Project',
    tankSize: '180 x 60 x 60 cm · 648L',
  },
  {
    id: 'kasoa-nature-haven',
    title: 'High-Tech Nature Botanical Aquascape',
    category: 'custom-tanks',
    mediaType: 'image',
    imageUrl: '/images/project-01-living-room-feature-tank-main.jpg',
    description: 'Ultra-clear rimless aquarium custom-built in our workshop with precision beveled 12mm glass joints.',
    location: 'Greater Accra',
    tankSize: '120 x 50 x 50 cm · 300L',
  },
  {
    id: 'schooling-neon-tetras',
    title: 'Neon & Cardinal Tetras Riverbed Community',
    category: 'freshwater',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1576836165612-8bc9b07e7778?q=80&w=900&auto=format&fit=crop',
    description: 'Healthy community tank with over 80 schooling tetras moving in synchrony above soft river substrate.',
    location: 'Private Villa',
    tankSize: '100 x 40 x 45 cm',
  },
  {
    id: 'royal-blue-betta',
    title: 'Royal Blue Halfmoon Betta Specimen',
    category: 'fish',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=900&auto=format&fit=crop',
    description: 'Hand-picked show-grade Betta splendens with 180-degree caudal fin spread, quarantine-tested and acclimated.',
    location: 'Gabriel Stockroom',
    tankSize: 'Nano 30L Cube',
  },
  {
    id: 'living-room-centerpiece-build',
    title: 'Modern Timber Cabinet Living Room Centerpiece',
    category: 'custom-tanks',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=900&auto=format&fit=crop',
    description: 'Solid moisture-resistant hardwood cabinet with integrated LED lighting hood and hidden piping passages.',
    location: 'East Legon Hills',
    tankSize: '180 x 55 x 70 cm · 693L',
  },
  {
    id: 'clownfish-symbiosis',
    title: 'Ocellaris Clownfish in Sea Anemone',
    category: 'marine',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=900&auto=format&fit=crop',
    description: 'Healthy captive-bred clownfish pair hosting a thriving bubble-tip anemone under marine full-spectrum LEDs.',
    location: 'Gabriel Marine Lab',
    tankSize: '60L Marine Cube',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Media' },
  { id: 'custom-tanks', label: 'Custom Tanks' },
  { id: 'fish', label: 'Live Fish' },
  { id: 'marine', label: 'Marine & Coral' },
  { id: 'freshwater', label: 'Freshwater Plants' },
  { id: 'video', label: 'Videos Only' },
];

interface GalleryGridProps {
  items?: GalleryGridItem[];
  whatsappNumber?: string;
}

export function GalleryGrid({
  items = FALLBACK_GALLERY_DATA,
  whatsappNumber = '233249384800',
}: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<GalleryGridItem | null>(null);

  const displayList = items.length > 0 ? items : FALLBACK_GALLERY_DATA;

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return displayList;
    if (activeCategory === 'video') return displayList.filter((item) => item.mediaType === 'video');
    return displayList.filter((item) => item.category === activeCategory);
  }, [activeCategory, displayList]);

  return (
    <>
      {/* Filter Tabs */}
      <div className="mb-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs text-muted-foreground mr-2 hidden sm:inline-flex items-center gap-1 font-medium">
          <Filter className="w-3.5 h-3.5" /> Filter by:
        </span>
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-foreground text-background shadow-xs scale-105'
                  : 'bg-muted hover:bg-muted/80 text-foreground border border-border/50'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item) => (
          <motion.div
            layout
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative rounded-3xl overflow-hidden border border-border bg-card shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
          >
            {/* Media Container */}
            <div className="relative aspect-4/3 w-full bg-slate-900 overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#031A44] shadow-xs">
                  {item.category.replace('-', ' ')}
                </span>
                {item.mediaType === 'video' && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#0762BF] text-white shadow-xs">
                    <Play className="w-2.5 h-2.5 fill-white stroke-none" />
                    Video
                  </span>
                )}
              </div>

              {/* Bottom Details Overlay */}
              {item.tankSize && (
                <div className="absolute bottom-3 right-3 text-white text-xs">
                  <span className="text-[10px] font-mono opacity-80 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    {item.tankSize}
                  </span>
                </div>
              )}
            </div>

            {/* Text Information */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors font-heading leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-primary font-semibold">
                <span>{item.mediaType === 'video' ? 'Play Video' : 'View Full Image'}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox / Video Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl text-foreground"
            >
              {/* Media viewer */}
              <div className="relative w-full aspect-16/10 bg-black overflow-hidden">
                {selectedItem.mediaType === 'video' && selectedItem.videoUrl ? (
                  <video
                    src={selectedItem.videoUrl}
                    poster={selectedItem.imageUrl}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold uppercase tracking-wider text-[10px]">
                    {selectedItem.category.replace('-', ' ')}
                  </span>
                  {selectedItem.tankSize && (
                    <span className="text-muted-foreground font-mono text-[11px]">
                      · {selectedItem.tankSize}
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
                  {selectedItem.title}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
                  {selectedItem.description}
                </p>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={waLink(
                      whatsappNumber,
                      `Hello Gabriel's Aquarium! I saw "${selectedItem.title}" on your gallery page and would like to discuss a similar build or order.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#0F7B6C] hover:bg-[#0D6D60] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                    <span>Inquire about this on WhatsApp</span>
                  </a>
                  <Link
                    href="/custom-tanks"
                    onClick={() => setSelectedItem(null)}
                    className="w-full sm:w-auto py-3 px-5 rounded-xl border border-border hover:bg-muted text-foreground text-xs font-semibold text-center transition-colors"
                  >
                    Custom Build Form
                  </Link>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors backdrop-blur-md"
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
