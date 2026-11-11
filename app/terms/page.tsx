import React from 'react';
import { SiteHeader } from '@/components/header/SiteHeader';
import { Footer } from '@/components/home/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-16 px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading mb-6">
          Terms &amp; Conditions
        </h1>

        <div className="space-y-6 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">1. Custom Aquarium Quotes &amp; Orders</h2>
            <p>
              Custom builds require a 50% mobilization deposit before glass procurement and fabrication commence. The remaining balance is payable upon successful installation and water testing.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">2. Warranty Coverage</h2>
            <p>
              Standard and custom glass tanks built by Gabriel&apos;s Aquarium carry a 2-year leak-free silicone warranty when placed on a level, manufacturer-approved stand or surface with a leveling foam mat.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">3. Payments</h2>
            <p>
              Payments are arranged directly via official WhatsApp correspondence. We accept Mobile Money (MTN MoMo, Telecel Cash), official bank transfers, and cash upon delivery/pickup.
            </p>
          </section>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <FloatingWhatsApp />
    </div>
  );
}
