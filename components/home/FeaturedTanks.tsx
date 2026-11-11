'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingBag, MessageSquare, Sparkles } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { waLink, tankInquiryMessage } from '@/lib/whatsapp';

interface TankItem {
  id: string;
  title: string;
  slug: string;
  price: number | null;
  purchaseType: 'buy' | 'inquire';
  image: string;
  dimensions: string;
  glass: string;
  suitable: string;
  featuredBadge?: string;
}

const FEATURED_TANKS: TankItem[] = [
  {
    id: 'tank-curved-120',
    title: 'Curved Glass Panoramic Aquarium (120cm)',
    slug: 'curved-glass-panoramic-120',
    price: 3800,
    purchaseType: 'inquire',
    image: '/images/kasoa-r3.jpg',
    dimensions: '120 x 45 x 65 cm · 350L',
    glass: 'Heat-Bent Curved Front · 10mm Ultra-Clear',
    suitable: 'Freshwater / Marine',
    featuredBadge: 'Signature Piece',
  },
  {
    id: 'tank-rimless-60',
    title: 'Rimless Low-Iron High Clarity Cube',
    slug: 'rimless-low-iron-cube-60',
    price: 1450,
    purchaseType: 'buy',
    image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=800&auto=format&fit=crop',
    dimensions: '60 x 60 x 60 cm · 216L',
    glass: 'Low-Iron (91% Transmittance) · 8mm Rimless',
    suitable: 'Planted Aquascapes / Shrimp',
    featuredBadge: 'Ready to Ship',
  },
  {
    id: 'tank-reef-sump-150',
    title: 'Complete Marine Reef System with Cabinet & Sump',
    slug: 'marine-reef-system-cabinet-sump-150',
    price: 6500,
    purchaseType: 'inquire',
    image: '/images/kasoa-r4.jpg',
    dimensions: '150 x 50 x 65 cm · 480L',
    glass: 'Ultra-Clear 12mm · Silent Weir Overflow',
    suitable: 'Living Coral Reefs / Marine',
    featuredBadge: 'All-in-One System',
  },
  {
    id: 'tank-nature-aquarium-90',
    title: 'Aquascaping Nature Tank with Floating Mat',
    slug: 'aquascaping-nature-tank-90',
    price: 1950,
    purchaseType: 'buy',
    image: '/images/kasoa_r5.jpg',
    dimensions: '90 x 45 x 45 cm · 182L',
    glass: 'German High-Strength Silicone · 10mm',
    suitable: 'High-Tech Planted Tanks',
    featuredBadge: 'In Stock',
  },
];

export function FeaturedTanks({ whatsappNumber = '233241234567' }: { whatsappNumber?: string }) {
  const add = useCart((s) => s.add);

  const handleInquire = (tank: TankItem) => {
    const text = tankInquiryMessage(
      { title: tank.title, slug: tank.slug },
      { name: 'Website Visitor', phone: 'Via WhatsApp', note: 'I would like to inquire about pricing, delivery, and installation for this tank.' }
    );
    window.open(waLink(whatsappNumber, text), '_blank');
  };

  return (
    <section id="tanks" className="py-20 px-6 sm:px-10 lg:px-16 bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-primary text-xs font-bold tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#F8B828]" />
              Signature Craftsmanship
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground font-heading">
              Ready-Made &amp; Curved Glass Tanks
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
            Seamless curved-front glass, ultra-clear low-iron sheets, and leak-free precision joints. Delivered and installed safely at your location.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_TANKS.map((tank) => (
            <div
              key={tank.id}
              className="bg-card rounded-3xl overflow-hidden border border-border shadow-xs hover:shadow-xl transition-all flex flex-col group"
            >
              <div className="relative aspect-4/3 w-full bg-slate-900 overflow-hidden">
                <Image
                  src={tank.image}
                  alt={tank.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {tank.featuredBadge && (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#031A44] shadow-xs">
                      {tank.featuredBadge}
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs">
                    {tank.purchaseType === 'buy' ? 'Buy Online' : 'Enquire First'}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-foreground text-sm line-clamp-2 font-heading">
                    {tank.title}
                  </h3>

                  <div className="mt-3 space-y-1.5 text-xs text-muted-foreground border-y border-border/50 py-2.5">
                    <p className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
                      <span>{tank.dimensions}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
                      <span>{tank.glass}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
                      <span>{tank.suitable}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-2">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-[11px] text-muted-foreground font-medium">Price</span>
                    <span className="text-base font-bold text-foreground">
                      {tank.price
                        ? tank.purchaseType === 'inquire'
                          ? `From GHS ${tank.price.toLocaleString('en-GH')}`
                          : `GHS ${tank.price.toLocaleString('en-GH')}`
                        : 'Price on request'}
                    </span>
                  </div>

                  {tank.purchaseType === 'buy' && tank.price ? (
                    <button
                      type="button"
                      onClick={() =>
                        add({
                          id: tank.id,
                          title: tank.title,
                          slug: tank.slug,
                          price: tank.price!,
                          image: tank.image,
                        })
                      }
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleInquire(tank)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#0F7B6C] hover:bg-[#0D6D60] text-white shadow-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Ask About This Tank</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
