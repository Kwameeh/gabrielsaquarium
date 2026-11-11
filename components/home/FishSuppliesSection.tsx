'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { urlFor } from '@/sanity/lib/image';

interface ProductItem {
  id: string;
  type: 'fish' | 'feed' | 'accessory';
  title: string;
  slug: string;
  price: number;
  soldAs?: string;
  image: string;
  tag: string;
  specs: string;
}

const HIGHLIGHT_PRODUCTS: ProductItem[] = [
  {
    id: 'fish-discus-blue',
    type: 'fish',
    title: 'Cobalt Blue Discus Specimen',
    slug: 'cobalt-blue-discus',
    price: 320,
    soldAs: 'each',
    image: 'https://images.unsplash.com/photo-1520315342629-6ea920342047?q=80&w=600&auto=format&fit=crop',
    tag: 'Freshwater · Peaceful',
    specs: 'Adult 15cm · Acclimated in Ghana',
  },
  {
    id: 'fish-clownfish-pair',
    type: 'fish',
    title: 'Ocellaris Clownfish Pair (True Percula)',
    slug: 'ocellaris-clownfish-pair',
    price: 450,
    soldAs: 'per pair',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop',
    tag: 'Marine · Reef Safe',
    specs: 'Captive Bred · Easy Care',
  },
  {
    id: 'fish-lake-malawi-cichlid',
    type: 'fish',
    title: 'Electric Yellow Labidochromis Cichlid',
    slug: 'electric-yellow-cichlid',
    price: 85,
    soldAs: 'each',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
    tag: 'African Cichlid',
    specs: 'Lake Malawi · Hardy',
  },
  {
    id: 'feed-hikari-cichlid',
    type: 'feed',
    title: 'Hikari Cichlid Bio-Gold Sinking Pellets',
    slug: 'hikari-cichlid-bio-gold',
    price: 180,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=600&auto=format&fit=crop',
    tag: 'Hikari · 250g',
    specs: 'Color Enhancing · High Protein',
  },
  {
    id: 'feed-sera-flora',
    type: 'feed',
    title: 'Sera Flora Spirulina Flakes',
    slug: 'sera-flora-spirulina-flakes',
    price: 140,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop',
    tag: 'Sera · 100g',
    specs: 'For Herbivores & Livebearers',
  },
  {
    id: 'accessory-canister-filter',
    type: 'accessory',
    title: 'Ultra-Quiet External Canister Filter 1200L/H',
    slug: 'ultra-quiet-external-canister-filter-1200',
    price: 750,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    tag: 'Filtration · Multi-Stage',
    specs: 'Tanks up to 300L · With Media',
  },
];

interface FishSuppliesSectionProps {
  sanityProducts?: any[];
}

export function FishSuppliesSection({ sanityProducts }: FishSuppliesSectionProps = {}) {
  const [filter, setFilter] = useState<'all' | 'fish' | 'supplies'>('all');
  const add = useCart((s) => s.add);

  const displayList: ProductItem[] =
    sanityProducts && sanityProducts.length > 0
      ? sanityProducts.map((p, idx) => {
          const fallback = HIGHLIGHT_PRODUCTS[idx % HIGHLIGHT_PRODUCTS.length];
          let img =
            fallback?.image ||
            'https://images.unsplash.com/photo-1520315342629-6ea920342047?q=80&w=600&auto=format&fit=crop';
          if (p.image) {
            try {
              img = typeof p.image === 'string' ? p.image : urlFor(p.image).width(600).url();
            } catch {}
          }
          return {
            id: p._id || `prod-${idx}`,
            type: (p._type as 'fish' | 'feed' | 'accessory') || fallback?.type || 'fish',
            title: p.title || fallback?.title || 'Aquarium Item',
            slug: p.slug || fallback?.slug || '',
            price: p.price ?? fallback?.price ?? 100,
            soldAs: p.soldAs || fallback?.soldAs,
            image: img,
            tag:
              p._type === 'fish'
                ? `${p.waterType || 'Freshwater'} · ${p.temperament || 'Quarantined'}`
                : `${p.brand || 'Premium'} · ${p.category || 'Supplies'}`,
            specs:
              p._type === 'fish'
                ? `Adult ${p.adultSizeCm || 10}cm · Acclimated in Ghana`
                : p.packSize || 'In stock · Ready to ship',
          };
        })
      : HIGHLIGHT_PRODUCTS;

  const filtered = displayList.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'fish') return item.type === 'fish';
    return item.type === 'feed' || item.type === 'accessory';
  });

  return (
    <section id="fish" className="py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-bold tracking-widest uppercase text-primary">
            Healthy Stock &amp; Essentials
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mt-1 font-heading">
            Live Fish, Feeds &amp; Supplies
          </h2>
        </div>

        {/* Tab Filters */}
        <div className="flex gap-2 p-1.5 bg-muted rounded-full border border-border/50 self-start md:self-auto">
          {(
            [
              { id: 'all', label: 'All Items' },
              { id: 'fish', label: 'Live Fish' },
              { id: 'supplies', label: 'Food & Supplies' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                filter === tab.id
                  ? 'bg-white text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div id="supplies" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="rounded-3xl border border-border bg-card overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group"
          >
            <div className="relative aspect-4/3 w-full bg-slate-900 overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#031A44] shadow-xs">
                  {product.tag}
                </span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-foreground text-sm line-clamp-1 font-heading">
                  {product.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {product.specs}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-border/50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-muted-foreground block font-medium">Price</span>
                  <span className="text-base font-bold text-foreground">
                    GHS {product.price.toLocaleString('en-GH')}{' '}
                    {product.soldAs && (
                      <span className="text-xs font-normal text-muted-foreground">
                        {product.soldAs}
                      </span>
                    )}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    add({
                      id: product.id,
                      title: product.title,
                      slug: product.slug,
                      price: product.price,
                      image: product.image,
                    })
                  }
                  className="py-2 px-3.5 rounded-xl text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
