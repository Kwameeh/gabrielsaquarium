import React from 'react';
import { SiteHeader } from '@/components/header/SiteHeader';
import { Footer } from '@/components/home/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';
import { CustomBuildTeaser } from '@/components/home/CustomBuildTeaser';
import { Check } from 'lucide-react';

export default function CustomTanksPage() {
  const customizable = [
    { title: 'Dimensions & Geometry', desc: 'Any length, depth, or height up to 3 meters. Rectangular, curved bow-front, L-shape, or cube.' },
    { title: 'Glass Selection', desc: 'Standard float, ultra-clear low-iron (Starphire), tempered safety glass, or thick cast acrylic.' },
    { title: 'Filtration Systems', desc: 'Silent weir internal overflows, bean-animal plumbing, drilled returns, or built-in multi-stage sumps.' },
    { title: 'Cabinetry & Stands', desc: 'Heavy-duty welded steel frameworks wrapped in waterproof marine plywood with custom architectural laminate finishes.' },
    { title: 'Automated Lighting', desc: 'App-controlled reef or planted full-spectrum LED fixtures with custom sunrise/sunset ramps.' },
    { title: 'Backgrounds & Hardscapes', desc: '3D textured slate or granite rock backgrounds, driftwood aquascaping, and living coral reefs.' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Intro Hero */}
        <section className="py-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-widest uppercase text-primary">
              Bespoke Aquarium Engineering
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mt-2 font-heading">
              Custom Built Aquariums &amp; Living Walls
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed">
              Every space is unique. Gabriel&apos;s Aquarium designs, manufactures, and installs bespoke luxury aquariums for private homes, corporate offices, restaurants, and hotels throughout Ghana.
            </p>
          </div>

          {/* Customization Grid */}
          <div className="mt-16">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground font-heading mb-6">
              What You Can Customize
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {customizable.map((c) => (
                <div key={c.title} className="p-6 rounded-3xl border border-border bg-card">
                  <div className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center mb-3">
                    <Check className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-foreground text-sm font-heading">{c.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Embedded Custom Build Teaser with Form */}
        <CustomBuildTeaser />
      </main>

      <Footer />
      <CartDrawer />
      <FloatingWhatsApp />
    </div>
  );
}
