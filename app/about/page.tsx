import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SiteHeader } from '@/components/header/SiteHeader';
import { Footer } from '@/components/home/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';
import { CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-16 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        {/* Intro */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-primary">
            Our Story &amp; Craft
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mt-2 font-heading">
            Dedicated to the Art of Aquatics in Ghana
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed">
            Founded with a passion for underwater ecology, Gabriel&apos;s Aquarium has grown into Ghana&apos;s premier destination for custom curved glass tanks, living coral reefs, and healthy acclimated aquatic life.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden border border-border shadow-md">
            <Image
              src="/images/project-01-living-room-feature-tank-main.jpg"
              alt="Gabriel's Aquarium Workshop"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-heading">
              Craftsmanship Without Compromise
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Based in Ghana, our specialized workshop brings together glass artisans, biological filtrations experts, and passionate aquarists. We believe that an aquarium should be more than a tank—it is a living, breathing architectural centerpiece that transforms living and working spaces.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Every tank is leak-tested under full water load for 72 hours before dispatch.',
                'Live fish are quarantined in dedicated biosecure systems to guarantee health.',
                'We use only marine-safe non-toxic structural silicone and low-iron glass.',
                'Full after-sales support and scheduled maintenance throughout Ghana.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-xs text-foreground/85">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex gap-4">
              <Link
                href="/tanks"
                className="py-3 px-6 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs"
              >
                Browse Our Tanks
              </Link>
              <Link
                href="/custom-tanks"
                className="py-3 px-6 rounded-full text-xs font-semibold bg-secondary text-foreground hover:bg-muted border border-border transition-colors"
              >
                Custom Builds
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <FloatingWhatsApp />
    </div>
  );
}
