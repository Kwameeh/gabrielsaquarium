import React from 'react';
import { SiteHeader } from '@/components/header/SiteHeader';
import { Footer } from '@/components/home/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';
import { sanityFetch } from '@/sanity/lib/live';
import { pageQuery, settingsQuery } from '@/lib/queries';
import { PortableText } from 'next-sanity';

export default async function PrivacyPage() {
  const [
    { data: pageData },
    { data: settings },
  ] = await Promise.all([
    sanityFetch({ query: pageQuery, params: { slug: 'privacy' } }).catch(() => ({ data: null })),
    sanityFetch({ query: settingsQuery }).catch(() => ({ data: null })),
  ]);

  const whatsappNumber = settings?.whatsappNumber || '233249384800';

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-16 px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto w-full">
        {pageData?.badge && (
          <span className="text-xs font-bold tracking-widest uppercase text-primary mb-2 block">
            {pageData.badge}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading mb-6">
          {pageData?.title || 'Privacy Policy'}
        </h1>

        {pageData?.intro && (
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            {pageData.intro}
          </p>
        )}

        <div className="space-y-6 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {pageData?.body && pageData.body.length > 0 ? (
            <PortableText value={pageData.body} />
          ) : (
            <>
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
            </>
          )}
        </div>
      </main>

      <Footer whatsappNumber={whatsappNumber} settings={settings} />
      <CartDrawer whatsappNumber={whatsappNumber} />
      <FloatingWhatsApp number={whatsappNumber} />
    </div>
  );
}
