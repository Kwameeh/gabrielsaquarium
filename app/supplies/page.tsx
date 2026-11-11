'use client';

import React, { useState } from 'react';
import { SiteHeader } from '@/components/header/SiteHeader';
import { Footer } from '@/components/home/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';
import { ProductCard } from '@/components/products/ProductCard';
import type { Product } from '@/lib/types';

const SAMPLE_SUPPLIES: Product[] = [
  {
    _id: 'feed-hikari-cichlid',
    _type: 'feed',
    title: 'Hikari Cichlid Bio-Gold Sinking Pellets',
    slug: 'hikari-cichlid-bio-gold',
    price: 180,
    purchaseType: 'buy',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop',
    brand: 'Hikari',
    packSize: '250 g',
    foodType: 'Pellets',
    sinking: 'Sinking',
    pelletSize: 'Medium (3 mm)',
    suitableFor: ['Cichlids', 'Carnivores'],
    features: ['Color enhancing', 'Probiotic-enriched', 'Will not cloud water'],
  },
  {
    _id: 'feed-sera-flora',
    _type: 'feed',
    title: 'Sera Flora Spirulina Flakes',
    slug: 'sera-flora-spirulina-flakes',
    price: 140,
    purchaseType: 'buy',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop',
    brand: 'Sera',
    packSize: '100 g',
    foodType: 'Flakes',
    sinking: 'Floating',
    suitableFor: ['Algae eaters / herbivores', 'Tropical community fish'],
    features: ['7% Spirulina', 'Rich in natural minerals'],
  },
  {
    _id: 'accessory-canister-filter',
    _type: 'accessory',
    title: 'Ultra-Quiet External Canister Filter 1200L/H',
    slug: 'ultra-quiet-external-canister-filter-1200',
    price: 750,
    purchaseType: 'buy',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    category: 'Filtration',
    brand: 'Sunsun Professional',
    suitableFor: 'Tanks up to 300 litres',
    whatsIncluded: ['Canister unit', 'Hoses and spray bar', 'Ceramic rings & bio balls'],
  },
  {
    _id: 'accessory-led-light-planted',
    _type: 'accessory',
    title: 'Full-Spectrum High-PAR Planted Aquarium LED Light',
    slug: 'full-spectrum-high-par-led-light',
    price: 520,
    purchaseType: 'buy',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop',
    category: 'Lighting',
    brand: 'Chihiros RGB',
    suitableFor: '60cm to 90cm aquariums',
    whatsIncluded: ['RGB LED fixture', 'Aluminum brackets', 'Power supply'],
  },
  {
    _id: 'accessory-digital-titanium-heater',
    _type: 'accessory',
    title: 'Digital Titanium Submersible Heater 300W',
    slug: 'digital-titanium-heater-300w',
    price: 310,
    purchaseType: 'buy',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    category: 'Heating and cooling',
    brand: 'AquaHeat',
    suitableFor: 'Tanks up to 250 litres',
    whatsIncluded: ['Titanium heating element', 'Digital thermostat controller'],
  },
  {
    _id: 'accessory-seachem-prime',
    _type: 'accessory',
    title: 'Seachem Prime Complete Water Conditioner 500ml',
    slug: 'seachem-prime-water-conditioner-500ml',
    price: 195,
    purchaseType: 'buy',
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=800&auto=format&fit=crop',
    category: 'Water care',
    brand: 'Seachem',
    suitableFor: 'Freshwater & Marine',
    whatsIncluded: ['500ml bottle with dosing cap'],
  },
];

export default function SuppliesPage() {
  const [filter, setFilter] = useState<'all' | 'feed' | 'filtration' | 'lighting' | 'care'>('all');

  const filteredSupplies = SAMPLE_SUPPLIES.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'feed') return item._type === 'feed';
    if (filter === 'filtration') return item.category === 'Filtration';
    if (filter === 'lighting') return item.category === 'Lighting';
    if (filter === 'care') return item.category === 'Water care';
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-12 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        {/* Page Title */}
        <div className="mb-8">
          <span className="text-xs font-bold tracking-widest uppercase text-primary">
            Nutrition &amp; Equipment
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mt-1 font-heading">
            Fish Food &amp; Aquarium Supplies
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-2xl">
            World-class nutrition from Hikari and Sera, multi-stage filtration, full-spectrum LED lighting, and pharmaceutical-grade water conditioners.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-border/50">
          {(
            [
              { id: 'all', label: 'All Supplies' },
              { id: 'feed', label: 'Fish Food & Nutrition' },
              { id: 'filtration', label: 'Filters & Pumps' },
              { id: 'lighting', label: 'Lighting Systems' },
              { id: 'care', label: 'Water Care & Test Kits' },
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

        {/* Supplies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSupplies.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <FloatingWhatsApp />
    </div>
  );
}
