import React from 'react';
import { SiteHeader } from '@/components/header/SiteHeader';
import { Footer } from '@/components/home/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';
import { ContactForm } from '@/components/contact/ContactForm';
import { Phone, Mail, Clock, MessageCircle, MapPin } from 'lucide-react';
import { waLink } from '@/lib/whatsapp';
import { sanityFetch } from '@/sanity/lib/live';
import { settingsQuery, pageQuery } from '@/lib/queries';

export default async function ContactPage() {
  const [
    { data: settings },
    { data: pageData },
  ] = await Promise.all([
    sanityFetch({ query: settingsQuery }).catch(() => ({ data: null })),
    sanityFetch({ query: pageQuery, params: { slug: 'contact' } }).catch(() => ({ data: null })),
  ]);

  const whatsappNumber = settings?.whatsappNumber || '233249384800';
  const displayPhone = settings?.phone || '+233 24 938 4800';
  const displayEmail = settings?.email || 'info@gabrielsaquarium.com';
  const displayAddress = settings?.address || 'American House, East Legon, Accra, Ghana';
  const hours =
    settings?.openingHours && settings.openingHours.length > 0
      ? settings.openingHours
      : ['Monday – Saturday: 8:00 AM – 8:00 PM', 'Sunday: Closed (Emergency Call-Outs Only)'];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-16 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-primary">
            {pageData?.badge || 'Get in Touch'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mt-2 font-heading">
            {pageData?.title || "We're Here to Help"}
          </h1>
          <p className="text-sm text-muted-foreground mt-3">
            {pageData?.intro ||
              'Have a question about a tank, custom build, live fish availability, or maintenance service? Connect with Gabriel directly via WhatsApp or phone.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl border border-border bg-card space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-secondary text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Phone &amp; WhatsApp</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{displayPhone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-secondary text-primary flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Email</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{displayEmail}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-secondary text-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Location</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{displayAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-secondary text-primary flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Working Hours</h3>
                  {hours.map((h: string) => (
                    <p key={h} className="text-xs text-muted-foreground mt-0.5">{h}</p>
                  ))}
                </div>
              </div>
            </div>

            <a
              href={waLink(whatsappNumber, "Hello Gabriel's Aquarium, I'd like to chat.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-2xl bg-whatsapp hover:bg-whatsapp/90 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <MessageCircle className="w-4 h-4 fill-white stroke-none" />
              <span>Chat with Gabriel on WhatsApp</span>
            </a>
          </div>

          {/* Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-card rounded-3xl border border-border p-8 shadow-xs">
              <h2 className="text-xl font-bold text-foreground font-heading mb-1">
                Send a Direct Message
              </h2>
              <p className="text-xs text-muted-foreground mb-6">
                Fill out the quick form below and it will instantly open a pre-filled WhatsApp chat with our team.
              </p>

              <ContactForm whatsappNumber={whatsappNumber} />
            </div>
          </div>
        </div>
      </main>

      <Footer whatsappNumber={whatsappNumber} settings={settings} />
      <CartDrawer whatsappNumber={whatsappNumber} />
      <FloatingWhatsApp number={whatsappNumber} />
    </div>
  );
}
