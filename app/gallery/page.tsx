import React from 'react';
import { SiteHeader } from '@/components/header/SiteHeader';
import { Footer } from '@/components/home/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';
import { GalleryGrid, GalleryGridItem, FALLBACK_GALLERY_DATA } from '@/components/gallery/GalleryGrid';
import { client } from '@/sanity/lib/client';
import { galleryQuery, settingsQuery } from '@/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { waLink } from '@/lib/whatsapp';
import { Sparkles, MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Aquarium Gallery & Video Vault | Gabriel's Aquarium Ghana",
  description: "Browse custom glass aquariums, living reef installations, and exotic fish crafted and serviced across Ghana.",
};

export const revalidate = 60; // Fresh content every 60s when edited in Sanity Studio

export default async function GalleryPage() {
  const [settings, sanityItems] = await Promise.all([
    client.fetch(settingsQuery).catch(() => null),
    client.fetch(galleryQuery).catch(() => []),
  ]);

  const whatsappNumber = settings?.whatsappNumber || '233249384800';

  // Map Sanity gallery documents to GalleryGrid items with reliable fallbacks
  const resolvedItems: GalleryGridItem[] =
    sanityItems && sanityItems.length > 0
      ? sanityItems.map((item: any, idx: number) => {
          const fallback = FALLBACK_GALLERY_DATA[idx % FALLBACK_GALLERY_DATA.length];
          let img = fallback?.imageUrl || '/images/project-01-living-room-feature-tank-main.jpg';
          if (item.image) {
            try {
              img = typeof item.image === 'string' ? item.image : urlFor(item.image).width(900).url();
            } catch {}
          } else if (item.thumbnailImage) {
            try {
              img = typeof item.thumbnailImage === 'string' ? item.thumbnailImage : urlFor(item.thumbnailImage).width(900).url();
            } catch {}
          }

          return {
            id: item._id || `gallery-${idx}`,
            title: item.title || fallback?.title || 'Aquarium Project',
            category: item.tags?.[0] || fallback?.category || 'custom-tanks',
            mediaType: (item.mediaType as 'image' | 'video') || fallback?.mediaType || 'image',
            imageUrl: img,
            videoUrl: item.videoUrl || item.videoFileUrl || fallback?.videoUrl,
            description:
              item.description ||
              fallback?.description ||
              'Bespoke aquarium setup engineered with premium clarity glass and silent filtration by Gabriel\'s Aquarium.',
            location: fallback?.location || 'Accra, Ghana',
            tankSize: fallback?.tankSize,
          };
        })
      : FALLBACK_GALLERY_DATA;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-highlight selection:text-highlight-foreground">
      {/* Sticky Header with Smart Scroll Hide/Show */}
      <SiteHeader
        whatsappNumber={whatsappNumber}
        logo={settings?.logo}
        businessName={settings?.businessName}
      />

      {/* Page Hero Header */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Gabriel&apos;s Portfolio &amp; Media
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-foreground">
              Aquarium Gallery &amp; Video Vault
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mt-3 leading-relaxed">
              Explore our completed residential builds, living marine ecosystems, high-tech planted aquascapes, and healthy exotic fish species in Ghana.
            </p>
          </div>

          <a
            href={waLink(
              whatsappNumber,
              "Hello Gabriel's Aquarium! I'm browsing your gallery and would like to ask about tank setups and livestock pricing."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0F7B6C] hover:bg-[#0D6D60] text-white text-xs font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-white stroke-none" />
            <span>Chat with Gabriel</span>
          </a>
        </div>
      </section>

      {/* Gallery Masonry / Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-24 w-full">
        <GalleryGrid items={resolvedItems} whatsappNumber={whatsappNumber} />
      </main>

      {/* Footer & Global Drawers */}
      <Footer whatsappNumber={whatsappNumber} settings={settings} />
      <CartDrawer whatsappNumber={whatsappNumber} />
      <FloatingWhatsApp number={whatsappNumber} />
    </div>
  );
}
