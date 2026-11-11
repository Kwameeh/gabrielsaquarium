'use client';

import React, { useState, useEffect } from 'react';
import { SiteHeader } from '@/components/header/SiteHeader';
import { Footer } from '@/components/home/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';
import { ProductCard } from '@/components/products/ProductCard';
import { client } from '@/sanity/lib/client';
import { fishQuery } from '@/lib/queries';
import type { Product } from '@/lib/types';
import { ShieldCheck } from 'lucide-react';

const SAMPLE_FISH: Product[] = [
  {
    _id: 'fish-discus-blue',
    _type: 'fish',
    title: 'Cobalt Blue Discus Specimen',
    slug: 'cobalt-blue-discus',
    price: 320,
    purchaseType: 'buy',
    soldAs: 'each',
    image: '/images/fish-04-discus.jpg',
    images: ['/images/fish-04-discus.jpg'],
    waterType: 'Freshwater',
    careLevel: 'Moderate',
    temperament: 'Peaceful',
    diet: 'Carnivore',
    adultSizeCm: 15,
    sizeSold: '6 to 7 cm',
    minTankLitres: 200,
    waterConditions: '28 to 30 °C, pH 6.0 to 7.0',
    compatibility: 'Peaceful community fish. Best kept in groups of 5+ with peaceful tetras.',
  },
  {
    _id: 'fish-clownfish-pair',
    _type: 'fish',
    title: 'Ocellaris Clownfish Pair (True Percula)',
    slug: 'ocellaris-clownfish-pair',
    price: 450,
    purchaseType: 'buy',
    soldAs: 'per pair',
    image: '/images/fish-13-ocellaris-clownfish.jpg',
    images: ['/images/fish-13-ocellaris-clownfish.jpg'],
    waterType: 'Marine',
    careLevel: 'Easy',
    temperament: 'Peaceful',
    diet: 'Omnivore',
    adultSizeCm: 9,
    sizeSold: '3 to 4 cm',
    minTankLitres: 80,
    reefSafe: 'Yes',
    waterConditions: '24 to 26 °C, Salinity 1.025, pH 8.1 to 8.4',
    compatibility: 'Reef safe. Highly compatible with anemones, soft corals, and peaceful reef fish.',
  },
  {
    _id: 'fish-lake-malawi-cichlid',
    _type: 'fish',
    title: 'Electric Yellow Labidochromis Cichlid',
    slug: 'electric-yellow-cichlid',
    price: 85,
    purchaseType: 'buy',
    soldAs: 'each',
    image: '/images/fish-10-convict-cichlid.jpg',
    images: ['/images/fish-10-convict-cichlid.jpg'],
    waterType: 'Freshwater',
    careLevel: 'Easy',
    temperament: 'Semi-aggressive',
    diet: 'Omnivore',
    adultSizeCm: 10,
    sizeSold: '4 to 5 cm',
    minTankLitres: 120,
    waterConditions: '24 to 27 °C, pH 7.8 to 8.6',
    compatibility: 'Keep with other Lake Malawi mbuna cichlids. Provide rock caves.',
  },
  {
    _id: 'fish-flame-angelfish',
    _type: 'fish',
    title: 'Flame Angelfish (Centropyge loricula)',
    slug: 'flame-angelfish',
    price: 680,
    purchaseType: 'buy',
    soldAs: 'each',
    image: '/images/fish-14-royal-gramma.jpg',
    images: ['/images/fish-14-royal-gramma.jpg'],
    waterType: 'Marine',
    careLevel: 'Moderate',
    temperament: 'Semi-aggressive',
    diet: 'Omnivore',
    adultSizeCm: 10,
    sizeSold: '5 to 6 cm',
    minTankLitres: 150,
    reefSafe: 'With caution',
    waterConditions: '24 to 26 °C, Salinity 1.024, pH 8.2',
    compatibility: 'Vivid centerpiece fish for mature marine systems.',
  },
  {
    _id: 'fish-neon-tetra-school',
    _type: 'fish',
    title: 'Cardinal Tetras (Paracheirodon axelrodi)',
    slug: 'cardinal-tetras-school',
    price: 90,
    purchaseType: 'buy',
    soldAs: 'group of 6',
    image: '/images/fish-05-neon-tetra.jpg',
    images: ['/images/fish-05-neon-tetra.jpg'],
    waterType: 'Freshwater',
    careLevel: 'Easy',
    temperament: 'Peaceful',
    diet: 'Omnivore',
    adultSizeCm: 4,
    sizeSold: '2 cm',
    minTankLitres: 50,
    waterConditions: '24 to 28 °C, pH 6.0 to 7.0',
    compatibility: 'Schooling fish. Peaceful with dwarf shrimp, rasboras, and planted tanks.',
  },
  {
    _id: 'fish-yellow-tang',
    _type: 'fish',
    title: 'Royal Blue Halfmoon Betta Specimen',
    slug: 'royal-blue-halfmoon-betta',
    price: 120,
    purchaseType: 'buy',
    soldAs: 'each',
    image: '/images/fish-02-betta.jpg',
    images: ['/images/fish-02-betta.jpg'],
    waterType: 'Marine',
    careLevel: 'Moderate',
    temperament: 'Semi-aggressive',
    diet: 'Herbivore',
    adultSizeCm: 20,
    sizeSold: '6 to 8 cm',
    minTankLitres: 300,
    reefSafe: 'Yes',
    waterConditions: '24 to 26 °C, Salinity 1.025, pH 8.2',
    compatibility: 'Reef safe. Great grazer for hair algae in established marine aquariums.',
  },
];

export default function FishPage() {
  const [fishList, setFishList] = useState<Product[]>(SAMPLE_FISH);
  const [filter, setFilter] = useState<'all' | 'freshwater' | 'marine' | 'easy'>('all');

  useEffect(() => {
    client
      .fetch(fishQuery)
      .then((data) => {
        if (data && data.length > 0) {
          setFishList(data);
        }
      })
      .catch(() => {});
  }, []);

  const filteredFish = fishList.filter((f) => {
    if (filter === 'all') return true;
    if (filter === 'freshwater') return f.waterType === 'Freshwater';
    if (filter === 'marine') return f.waterType === 'Marine';
    if (filter === 'easy') return f.careLevel === 'Easy';
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1 pt-24 sm:pt-28 pb-12 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        {/* Page Title */}
        <div className="mb-8">
          <span className="text-xs font-bold tracking-widest uppercase text-primary">
            Quarantined Live Stock
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mt-1 font-heading">
            Live Freshwater &amp; Marine Fish
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-2xl">
            Every specimen is quarantined for minimum 14 days, acclimated to local conditions, and delivered in pure oxygen transit bags backed by our Live Arrival Guarantee.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-border/50">
          {(
            [
              { id: 'all', label: 'All Fish' },
              { id: 'freshwater', label: 'Freshwater Species' },
              { id: 'marine', label: 'Marine & Reef Fish' },
              { id: 'easy', label: 'Easy Care' },
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

        {/* Fish Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFish.map((fish) => (
            <ProductCard key={fish._id} product={fish} />
          ))}
        </div>

        {/* Policy note banner */}
        <div className="mt-16 p-6 rounded-3xl bg-secondary/40 border border-border flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground block text-sm font-semibold mb-0.5">
              Gabriel&apos;s Live Arrival Health Policy
            </strong>
            All live fish orders are packed with oxygen tablets and delivered promptly. In the rare event of transit mortality, notify us with a clear photo in the WhatsApp chat within 2 hours of arrival for an immediate replacement or store credit.
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <FloatingWhatsApp />
    </div>
  );
}
