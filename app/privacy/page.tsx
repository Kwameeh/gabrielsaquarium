import React from 'react';
import { SiteHeader } from '@/components/header/SiteHeader';
import { Footer } from '@/components/home/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-16 px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading mb-6">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">1. Information We Collect</h2>
            <p>
              When you place an order or request a quote, we collect your name, phone number, and delivery location to communicate through WhatsApp and fulfill your order.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">2. Communication</h2>
            <p>
              We do not sell or share your contact details with third-party advertisers. Your information is used strictly by Gabriel&apos;s Aquarium for direct order coordination and delivery.
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
