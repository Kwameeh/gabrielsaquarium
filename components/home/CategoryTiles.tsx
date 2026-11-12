import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

interface CategoryTilesProps {
  badge?: string;
  heading?: string;
  subtitle?: string;
}

export function CategoryTiles({
  badge = 'Curated Collections',
  heading = 'Everything for Your Aquatic World',
  subtitle = 'From handcrafted curved tanks to living reefs and premium feeds, discover everything you need for your living aquatic centerpiece.',
}: CategoryTilesProps) {
  const categories = [
    {
      title: 'Ready-Made Tanks',
      subtitle: 'Curved front, rimless & cube glass aquariums',
      href: '#tanks',
      badge: 'Popular',
      image: '/images/tank-08-curved-corner-120-front.jpg',
      colSpan: 'sm:col-span-2 lg:col-span-2',
    },
    {
      title: 'Custom Aquariums',
      subtitle: 'Bespoke living walls, room dividers & cabinetry',
      href: '#custom',
      badge: 'Bespoke',
      image: '/images/project-03-restaurant-divider-aquarium-main.jpg',
      colSpan: 'sm:col-span-1 lg:col-span-1',
    },
    {
      title: 'Live Exotic Fish',
      subtitle: 'Acclimated freshwater cichlids, discus & marine species',
      href: '#fish',
      badge: 'Quarantined',
      image: '/images/fish-04-discus.jpg',
      colSpan: 'sm:col-span-1 lg:col-span-1',
    },
    {
      title: 'Food & Aquascaping Supplies',
      subtitle: 'Hikari feeds, filtration, LED lighting & substrate',
      href: '#supplies',
      badge: 'Premium',
      image: '/images/tank-05-rimless-ultra-clear-100-front.jpg',
      colSpan: 'sm:col-span-1 lg:col-span-1',
    },
    {
      title: 'Professional Maintenance',
      subtitle: 'Scheduled cleaning, filter servicing & water testing',
      href: '#maintenance',
      badge: 'Scheduled',
      image: '/images/project-01-living-room-feature-tank-main.jpg',
      colSpan: 'sm:col-span-2 lg:col-span-1',
    },
  ];

  return (
    <section className="py-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <span className="text-xs font-bold tracking-widest uppercase text-primary">
            {badge}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mt-1 font-heading">
            {heading}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c) => (
          <a
            key={c.title}
            href={c.href}
            className={`group relative overflow-hidden rounded-3xl border border-border bg-card p-6 min-h-[260px] flex flex-col justify-end transition-all hover:shadow-xl hover:border-primary/50 ${c.colSpan}`}
          >
            <div className="absolute inset-0 z-0">
              <Image
                src={c.image}
                alt={c.title}
                fill
                className="object-cover brightness-[0.4] group-hover:scale-105 group-hover:brightness-[0.45] transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            </div>

            <div className="relative z-10 text-white">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-primary text-white mb-2 shadow-xs">
                {c.badge}
              </span>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight font-heading">
                  {c.title}
                </h3>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-primary transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <p className="text-xs text-white/80 mt-1 max-w-sm line-clamp-2">
                {c.subtitle}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
