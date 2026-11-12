'use client';

import React from 'react';
import { Check, MessageCircle } from 'lucide-react';
import { maintenanceMessage, waLink } from '@/lib/whatsapp';

interface MaintenanceSectionProps {
  whatsappNumber?: string;
  sanityPlans?: any[];
  badge?: string;
  heading?: string;
  subtitle?: string;
}

export function MaintenanceSection({
  whatsappNumber = '233249384800',
  sanityPlans,
  badge = 'Hassle-Free Aquarium Ownership',
  heading = 'Professional Maintenance Plans',
  subtitle = 'Never worry about cloudy water, algae spikes, or dirty filters. Our certified technicians keep your aquatic habitat crystal clear and thriving.',
}: MaintenanceSectionProps) {
  const plans = [
    {
      name: 'Essential Care',
      price: 'From GHS 300 / visit',
      features: [
        'Water test & chemical balance (pH, Ammonia, Nitrite, Nitrate)',
        '25-30% RO water change and substrate vacuuming',
        'Glass scrub (inside & exterior acrylic/glass polish)',
        'Filter mechanical pad rinse & impeller check',
      ],
      highlighted: false,
    },
    {
      name: 'Complete Care',
      price: 'From GHS 600 / visit',
      features: [
        'All Essential Care features included',
        'Coral dipping, plant pruning, and aquascaping refresh',
        'Filter media renewal (activated carbon, biological media)',
        'Fish health diagnostic & preventive nutrition review',
        'Priority emergency call-out within 4 hours',
      ],
      highlighted: true,
    },
    {
      name: 'Executive Concierge',
      price: 'From GHS 1,200 / visit',
      features: [
        'Weekly scheduled morning/evening maintenance',
        'Full stock replenishment & automatic feeder servicing',
        'Dedicated technician with monthly water parameter logs',
        'Comprehensive leak & pump insurance coverage',
      ],
      highlighted: false,
    },
  ];

  const displayPlans =
    sanityPlans && sanityPlans.length > 0
      ? sanityPlans.map((p) => ({
          name: p.name,
          price: p.priceNote || 'Contact for Pricing',
          features: p.features || [],
          highlighted: !!p.highlighted,
        }))
      : plans;

  const handleBook = (planName: string) => {
    const text = maintenanceMessage({
      name: 'Website Visitor',
      phone: 'Via WhatsApp',
      location: 'Ghana (Specify on WhatsApp)',
      tanks: '1 tank',
      plan: planName,
    });
    window.open(waLink(whatsappNumber, text), '_blank');
  };

  return (
    <section id="maintenance" className="dark bg-background text-foreground py-24 px-6 sm:px-10 lg:px-16 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-primary">
            {badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2 font-heading">
            {heading}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {displayPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-7 flex flex-col justify-between border transition-all ${
                plan.highlighted
                  ? 'bg-card border-primary/50 shadow-2xl relative'
                  : 'bg-card/70 border-border/40'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-[#F8B828] text-[#031A44] text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-foreground font-heading">{plan.name}</h3>
                <p className="text-sm font-semibold text-primary mt-1">{plan.price}</p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature: string) => (
                    <li key={feature} className="flex items-start gap-2.5 text-xs text-foreground/80 leading-relaxed">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-border/40">
                <button
                  type="button"
                  onClick={() => handleBook(plan.name)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    plan.highlighted
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Book {plan.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
