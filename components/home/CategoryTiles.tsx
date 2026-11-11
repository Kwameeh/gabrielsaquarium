import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export function CategoryTiles() {
  const categories = [
    {
      title: 'Ready-Made Tanks',
      subtitle: 'Curved front, rimless & cube glass aquariums',
      href: '#tanks',
      badge: 'Popular',
      image: '/images/kasoa-r3.jpg',
      colSpan: 'sm:col-span-2 lg:col-span-2',
    },
    {
      title: 'Custom Aquariums',
      subtitle: 'Bespoke living walls, room dividers & cabinetry',
      href: '#custom',
      badge: 'Bespoke',
      image: '/images/kasoa-r4.jpg',
      colSpan: 'sm:col-span-1 lg:col-span-1',
    },
    {
      title: 'Live Exotic Fish',
      subtitle: 'Acclimated freshwater cichlids, discus & marine species',
      href: '#fish',
      badge: 'Quarantined',
      image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=800&auto=format&fit=crop',
      colSpan: 'sm:col-span-1 lg:col-span-1',
    },
    {
      title: 'Food & Aquascaping Supplies',
      subtitle: 'Hikari feeds, filtration, LED lighting & substrate',
      href: '#supplies',
      badge: 'Premium',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop',
      colSpan: 'sm:col-span-1 lg:col-span-1',
    },
    {
      title: 'Professional Maintenance',
      subtitle: 'Scheduled cleaning, filter servicing & water testing',
      href: '#maintenance',
      badge: 'Scheduled',
      image: '/images/kasoa_r5.jpg',
      colSpan: 'sm:col-span-2 lg:col-span-1',
    },
  ];

  return (
    <section className="py-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <span className="text-xs font-bold tracking-widest uppercase text-primary">
            Curated Collections
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mt-1 font-heading">
            Everything for Your Aquatic World
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
          From compact desktop rimless cubes to monumental commercial living reefs, we provide the complete ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <a
            key={cat.title}
            href={cat.href}
            className={`group relative overflow-hidden rounded-3xl min-h-[280px] sm:min-h-[320px] shadow-sm hover:shadow-xl transition-all duration-300 ${cat.colSpan}`}
          >
            <Image
              src={cat.image}
              alt={cat.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#031A44]/90 via-[#031A44]/40 to-transparent" />

            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/90 backdrop-blur-md text-[#031A44] shadow-xs">
                {cat.badge}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-heading">
                  {cat.title}
                </h3>
                <p className="text-xs text-white/80 mt-1 max-w-sm">
                  {cat.subtitle}
                </p>
              </div>

              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-primary text-white flex items-center justify-center transition-colors shrink-0">
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
