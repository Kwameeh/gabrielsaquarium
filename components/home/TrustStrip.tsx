import React from 'react';
import { ShieldCheck, HeartHandshake, Truck, Wrench } from 'lucide-react';

export function TrustStrip() {
  const items = [
    {
      icon: Wrench,
      title: 'Custom Tank Engineering',
      desc: 'Curved glass, rimless low-iron, and custom in-wall cabinetry built to your exact specs.',
    },
    {
      icon: ShieldCheck,
      title: 'Live Fish Health Guarantee',
      desc: 'Quarantined, parasite-free, and acclimated for Ghanaian water parameters.',
    },
    {
      icon: HeartHandshake,
      title: 'Installation & Maintenance',
      desc: 'Complete setup, water chemistry balancing, and ongoing residential/office care.',
    },
    {
      icon: Truck,
      title: 'Safe Delivery in Ghana',
      desc: 'Specialized aquatic transit with oxygen packaging safely delivered across Ghana.',
    },
  ];

  return (
    <section className="bg-white border-y border-border py-10 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary text-primary flex items-center justify-center shrink-0">
              <item.icon className="w-6 h-6 stroke-[1.8]" />
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
        ))}
      </div>
    </section>
  );
}
