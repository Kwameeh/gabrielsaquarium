import React from 'react';
import { ShieldCheck, HeartHandshake, Truck, Wrench } from 'lucide-react';

interface TrustBadge {
  title: string;
  desc: string;
}

const icons = [Wrench, ShieldCheck, HeartHandshake, Truck];

const DEFAULT_ITEMS: TrustBadge[] = [
  {
    title: 'Custom Tank Engineering',
    desc: 'Curved glass, rimless low-iron, and custom in-wall cabinetry built to your exact specs.',
  },
  {
    title: 'Live Fish Health Guarantee',
    desc: 'Quarantined, parasite-free, and acclimated for Ghanaian water parameters.',
  },
  {
    title: 'Installation & Maintenance',
    desc: 'Complete setup, water chemistry balancing, and ongoing residential/office care.',
  },
  {
    title: 'Safe Delivery in Ghana',
    desc: 'Specialized aquatic transit with oxygen packaging safely delivered across Ghana.',
  },
];

export function TrustStrip({ badges }: { badges?: TrustBadge[] }) {
  const displayItems = badges && badges.length > 0 ? badges : DEFAULT_ITEMS;

  return (
    <section className="bg-white border-y border-border py-10 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayItems.map((item, index) => {
          const IconComponent = icons[index % icons.length];
          return (
            <div key={item.title || index} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary text-primary flex items-center justify-center shrink-0">
                <IconComponent className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
