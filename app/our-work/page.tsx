import React from 'react';
import { SiteHeader } from '@/components/header/SiteHeader';
import { Footer } from '@/components/home/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';
import { OurWorkShowcase } from '@/components/home/OurWorkShowcase';

export default function OurWorkPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <OurWorkShowcase />
      </main>

      <Footer />
      <CartDrawer />
      <FloatingWhatsApp />
    </div>
  );
}
