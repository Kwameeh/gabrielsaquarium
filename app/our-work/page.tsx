import React from 'react';
import { SiteHeader } from '@/components/header/SiteHeader';
import { Footer } from '@/components/home/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';
import { OurWorkShowcase } from '@/components/home/OurWorkShowcase';

import { client } from '@/sanity/lib/client';
import { projectsQuery, settingsQuery } from '@/lib/queries';

export const revalidate = 60;

export default async function OurWorkPage() {
  const [projects, settings] = await Promise.all([
    client.fetch(projectsQuery).catch(() => []),
    client.fetch(settingsQuery).catch(() => null),
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
        <OurWorkShowcase sanityProjects={projects} />
      </main>

      <Footer whatsappNumber={whatsappNumber} settings={settings} />
      <CartDrawer whatsappNumber={whatsappNumber} />
      <FloatingWhatsApp number={whatsappNumber} />
    </div>
  );
}
