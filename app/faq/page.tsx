import React from 'react';
import { SiteHeader } from '@/components/header/SiteHeader';
import { Footer } from '@/components/home/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';
import { TestimonialsFaq } from '@/components/home/TestimonialsFaq';
import { sanityFetch } from '@/sanity/lib/live';
import { faqsQuery, testimonialsQuery, settingsQuery } from '@/lib/queries';

export default async function FaqPage() {
  const [
    { data: faqs },
    { data: testimonials },
    { data: settings },
  ] = await Promise.all([
    sanityFetch({ query: faqsQuery }).catch(() => ({ data: [] })),
    sanityFetch({ query: testimonialsQuery }).catch(() => ({ data: [] })),
    sanityFetch({ query: settingsQuery }).catch(() => ({ data: null })),
  ]);

  const whatsappNumber = settings?.whatsappNumber || '233249384800';

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <TestimonialsFaq
          sanityFaqs={faqs && faqs.length > 0 ? faqs : undefined}
          sanityTestimonials={testimonials && testimonials.length > 0 ? testimonials : undefined}
          testimonialsHeading={settings?.testimonialsHeading}
          testimonialsSubtitle={settings?.testimonialsSubtitle}
          faqsHeading={settings?.faqsHeading}
          faqsSubtitle={settings?.faqsSubtitle}
        />
      </main>

      <Footer whatsappNumber={whatsappNumber} settings={settings} />
      <CartDrawer whatsappNumber={whatsappNumber} />
      <FloatingWhatsApp number={whatsappNumber} />
    </div>
  );
}
