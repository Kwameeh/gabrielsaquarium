'use client';

import React, { useState } from 'react';
import { SiteHeader } from '@/components/header/SiteHeader';
import { Footer } from '@/components/home/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';
import { ProductCard } from '@/components/products/ProductCard';
import type { Product } from '@/lib/types';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const SAMPLE_TANKS: Product[] = [
  {
    _id: 'tank-curved-120',
    _type: 'tank',
    title: 'Curved Glass Panoramic Aquarium (120cm)',
    slug: 'curved-glass-panoramic-120',
    price: 3800,
    purchaseType: 'inquire',
    image: '/images/kasoa-r3.jpg',
    lengthCm: 120,
    widthCm: 45,
    heightCm: 65,
    volumeLitres: 350,
    shape: 'Curved front (bow-front)',
    glassType: 'Heat-Bent Curved Front',
    glassThicknessMm: 10,
    frameStyle: 'Rimless',
    suitableFor: 'Freshwater and marine',
    overflow: 'Built-in overflow',
    leadTime: 'In stock',
    warranty: '2 years leak-free',
  },
  {
    _id: 'tank-rimless-60',
    _type: 'tank',
    title: 'Rimless Low-Iron High Clarity Cube (60cm)',
    slug: 'rimless-low-iron-cube-60',
    price: 1450,
    purchaseType: 'buy',
    image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=800&auto=format&fit=crop',
    lengthCm: 60,
    widthCm: 60,
    heightCm: 60,
    volumeLitres: 216,
    shape: 'Cube',
    glassType: 'Low-iron (ultra clear)',
    glassThicknessMm: 8,
    frameStyle: 'Rimless',
    suitableFor: 'Freshwater',
    overflow: 'None',
    leadTime: 'In stock',
    warranty: '2 years leak-free',
  },
  {
    _id: 'tank-reef-sump-150',
    _type: 'tank',
    title: 'Complete Marine Reef System with Cabinet & Sump (150cm)',
    slug: 'marine-reef-system-cabinet-sump-150',
    price: 6500,
    purchaseType: 'inquire',
    image: '/images/kasoa-r4.jpg',
    lengthCm: 150,
    widthCm: 50,
    heightCm: 65,
    volumeLitres: 480,
    shape: 'Rectangular',
    glassType: 'Low-iron (ultra clear)',
    glassThicknessMm: 12,
    frameStyle: 'Rimless',
    suitableFor: 'Marine',
    overflow: 'All-in-one (built-in sump)',
    includes: ['Stand / cabinet', 'Sump', 'Leveling mat'],
    leadTime: 'Made to order, 7 to 10 days',
    warranty: '3 years',
  },
  {
    _id: 'tank-nature-aquarium-90',
    _type: 'tank',
    title: 'Nature Aquascaping Rimless Tank (90cm)',
    slug: 'aquascaping-nature-tank-90',
    price: 1950,
    purchaseType: 'buy',
    image: '/images/kasoa_r5.jpg',
    lengthCm: 90,
    widthCm: 45,
    heightCm: 45,
    volumeLitres: 182,
    shape: 'Rectangular',
    glassType: 'Low-iron (ultra clear)',
    glassThicknessMm: 10,
    frameStyle: 'Rimless',
    suitableFor: 'Freshwater',
    overflow: 'None',
    leadTime: 'In stock',
    warranty: '2 years leak-free',
  },
  {
    _id: 'tank-curved-corner-100',
    _type: 'tank',
    title: 'Seamless Curved-Corner Desktop Tank (100cm)',
    slug: 'seamless-curved-corner-desktop-100',
    price: 2400,
    purchaseType: 'buy',
    image: '/images/kasoa-r3.jpg',
    lengthCm: 100,
    widthCm: 40,
    heightCm: 50,
    volumeLitres: 200,
    shape: 'Curved corner',
    glassType: 'Standard clear',
    glassThicknessMm: 8,
    frameStyle: 'Frameless',
    suitableFor: 'Freshwater',
    leadTime: 'In stock',
    warranty: '2 years',
  },
  {
    _id: 'tank-custom-room-divider-200',
    _type: 'tank',
    title: 'Panoramic In-Wall Room Divider Aquarium (200cm)',
    slug: 'panoramic-in-wall-room-divider-200',
    price: 9500,
    purchaseType: 'inquire',
    image: '/images/kasoa-r4.jpg',
    lengthCm: 200,
    widthCm: 60,
    heightCm: 75,
    volumeLitres: 900,
    shape: 'Rectangular',
    glassType: 'Low-iron (ultra clear)',
    glassThicknessMm: 15,
    frameStyle: 'Framed',
    suitableFor: 'Freshwater and marine',
    overflow: 'Built-in overflow',
    leadTime: 'Made to order, 14 days',
    warranty: '5 years',
  },
];

export default function TanksPage() {
  const [filter, setFilter] = useState<'all' | 'curved' | 'low-iron' | 'buy' | 'inquire'>('all');

  const filteredTanks = SAMPLE_TANKS.filter((t) => {
    if (filter === 'all') return true;
    if (filter === 'curved') return t.shape?.toLowerCase().includes('curved');
    if (filter === 'low-iron') return t.glassType?.toLowerCase().includes('low-iron');
    if (filter === 'buy') return t.purchaseType === 'buy';
    if (filter === 'inquire') return t.purchaseType === 'inquire';
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-12 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        {/* Page Title & Breadcrumbs */}
        <div className="mb-8">
          <span className="text-xs font-bold tracking-widest uppercase text-primary">
            Curved &amp; Rimless Aquariums
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mt-1 font-heading">
            Ready-Made &amp; Curved Glass Tanks
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-2xl">
            Precision engineered tanks crafted with high-clarity glass, seamless heat-bent front corners, and German structural silicone for leak-free peace of mind in Ghana.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-border/50">
          {(
            [
              { id: 'all', label: 'All Tanks' },
              { id: 'curved', label: 'Curved Glass' },
              { id: 'low-iron', label: 'Low-Iron Ultra Clear' },
              { id: 'buy', label: 'Buy Online' },
              { id: 'inquire', label: 'Enquire First' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                filter === tab.id
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-card border border-border text-foreground hover:bg-muted'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tanks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTanks.map((tank) => (
            <ProductCard key={tank._id} product={tank} />
          ))}
        </div>

        {/* Empty state / custom build banner */}
        <div className="mt-16 p-8 rounded-3xl bg-secondary/50 border border-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-foreground font-heading">
              Don&apos;t see the exact size you need?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
              We design and construct custom architectural aquariums to any millimeter specification with matching stands and filtration.
            </p>
          </div>
          <Link
            href="/custom-tanks"
            className="px-6 py-3 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md flex items-center gap-2 whitespace-nowrap transition-all"
          >
            <span>Request Custom Build</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <FloatingWhatsApp />
    </div>
  );
}
