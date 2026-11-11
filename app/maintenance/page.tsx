import React from 'react';
import { SiteHeader } from '@/components/header/SiteHeader';
import { Footer } from '@/components/home/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';
import { MaintenanceSection } from '@/components/home/MaintenanceSection';
import { Droplet, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

import { client } from '@/sanity/lib/client';
import { plansQuery, settingsQuery } from '@/lib/queries';

export default async function MaintenancePage() {
  const [plans, settings] = await Promise.all([
    client.fetch(plansQuery).catch(() => []),
    client.fetch(settingsQuery).catch(() => null),
  ]);
  const whatsappNumber = settings?.whatsappNumber || '233249384800';
  const benefits = [
    {
      icon: Droplet,
      title: 'Water Chemistry Precision',
      desc: 'Accurate testing of pH, ammonia, nitrite, nitrate, calcium, and alkalinity to prevent fish distress.',
    },
    {
      icon: Sparkles,
      title: 'Crystal Clear Glass & Substrate',
      desc: 'Deep algae scraping and gravel vacuuming to maintain pristine aesthetics without scratching the glass.',
    },
    {
      icon: HeartHandshake,
      title: 'Preventive Fish Healthcare',
      desc: 'Visual disease inspections and nutritional assessments to ensure optimal vitality and longevity.',
    },
    {
      icon: ShieldCheck,
      title: 'Equipment Health Audits',
      desc: 'Impeller lubrication, filter media cleansing, heater calibration, and leak inspection every visit.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Intro */}
        <section className="py-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-widest uppercase text-primary">
              Certified Technicians
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mt-2 font-heading">
              Professional Aquarium Maintenance
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed">
              We provide scheduled routine care and emergency servicing for residential and commercial aquariums across Greater Accra and surrounding areas. Enjoy the tranquility of a flourishing aquarium while we handle the work.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {benefits.map((b) => (
              <div key={b.title} className="p-6 rounded-3xl border border-border bg-card">
                <div className="w-10 h-10 rounded-2xl bg-secondary text-primary flex items-center justify-center mb-4">
                  <b.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-sm font-heading">{b.title}</h3>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Plans and Booking */}
        <MaintenanceSection sanityPlans={plans} whatsappNumber={whatsappNumber} />
      </main>

      <Footer whatsappNumber={whatsappNumber} settings={settings} />
      <CartDrawer whatsappNumber={whatsappNumber} />
      <FloatingWhatsApp number={whatsappNumber} />
    </div>
  );
}
