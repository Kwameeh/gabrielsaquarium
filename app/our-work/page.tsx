import React from 'react';
import { SiteHeader } from '@/components/header/SiteHeader';
import { Footer } from '@/components/home/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';
import { OurWorkShowcase } from '@/components/home/OurWorkShowcase';
import { sanityFetch } from '@/sanity/lib/live';
import { projectsQuery, settingsQuery } from '@/lib/queries';

export default async function OurWorkPage() {
  const [
    { data: projects },
    { data: settings },
  ] = await Promise.all([
    sanityFetch({ query: projectsQuery }).catch(() => ({ data: [] })),
    sanityFetch({ query: settingsQuery }).catch(() => ({ data: null })),
  ]);
  const whatsappNumber = settings?.whatsappNumber || '233249384800';

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader
        whatsappNumber={whatsappNumber}
        logo={settings?.logo}
        businessName={settings?.businessName}
      />

      <main className="flex-1">
        <OurWorkShowcase
          sanityProjects={projects}
          badge={settings?.ourWorkBadge}
          heading={settings?.ourWorkHeading}
          subtitle={settings?.ourWorkSubtitle}
        />
      </main>

      <Footer whatsappNumber={whatsappNumber} settings={settings} />
      <CartDrawer whatsappNumber={whatsappNumber} />
      <FloatingWhatsApp number={whatsappNumber} />
    </div>
  );
}
