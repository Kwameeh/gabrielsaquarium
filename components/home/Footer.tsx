import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { waLink } from '@/lib/whatsapp';
import { urlFor } from '@/sanity/lib/image';

export function Footer({
  whatsappNumber = '233249384800',
  settings,
  logo,
  businessName = "Gabriel's Aquarium",
}: {
  whatsappNumber?: string;
  settings?: any;
  logo?: any;
  businessName?: string;
}) {
  const whatsappUrl = waLink(whatsappNumber, "Hello Gabriel's Aquarium, I'm reaching out from your website.");
  const displayAddress = settings?.address || 'American House, East Legon, Accra, Ghana';
  const displayPhone = settings?.phone || '+233 24 938 4800';
  const displayEmail = settings?.email || 'info@gabrielsaquarium.com';
  const name = settings?.businessName || businessName;

  let logoUrl: string | null = '/logo.png';
  const logoSource = logo || settings?.logo;
  if (logoSource) {
    try {
      logoUrl = typeof logoSource === 'string' ? logoSource : urlFor(logoSource).height(120).auto('format').url();
    } catch {}
  }

  return (
    <footer id="contact" className="dark bg-background text-foreground pt-20 pb-12 border-t border-border transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Final Call to Action Banner */}
        <div className="rounded-3xl p-8 sm:p-12 bg-card border border-border/50 text-center max-w-4xl mx-auto mb-20 shadow-2xl">
          <span className="text-xs font-bold tracking-widest uppercase text-primary">
            Start Your Aquarium Journey
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mt-2 font-heading">
            Ready to Build Your Dream Aquarium?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-3 max-w-xl mx-auto leading-relaxed">
            Whether you need a curved glass tank, a custom in-wall coral reef, healthy live fish, or routine tank care in Ghana, Gabriel and his team are ready to assist.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-xs font-semibold bg-whatsapp hover:bg-whatsapp/90 text-white shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white stroke-none" />
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href="tel:+233249384800"
              className="px-6 py-3 rounded-full text-xs font-semibold bg-secondary hover:bg-secondary/80 text-foreground border border-border transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Us: +233 24 938 4800</span>
            </a>
          </div>
        </div>

        {/* Footer Links & Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-border/40">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center group focus:outline-none"
              aria-label={`${name} Home`}
            >
              {logoUrl ? (
                <div className="bg-white/95 px-3.5 py-2 rounded-2xl border border-white/20 shadow-xs group-hover:bg-white transition-all">
                  <div className="relative h-10 w-36 sm:w-44">
                    <Image
                      src={logoUrl}
                      alt={name}
                      fill
                      sizes="(max-width: 640px) 144px, 176px"
                      className="object-contain object-left"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-baseline">
                  <span className="text-xl font-bold tracking-tight text-foreground font-heading">
                    Gabriel&apos;s
                  </span>
                  <span className="text-[11px] font-semibold text-primary uppercase ml-1 tracking-wider">
                    Aquarium
                  </span>
                </div>
              )}
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ghana&apos;s premier specialist in handcrafted curved glass aquariums, living coral reefs, exotic freshwater &amp; marine fish, and professional aquarium maintenance.
            </p>
            <div className="pt-2 text-xs text-foreground/80 font-medium">
              Workshop &amp; Showroom: {displayAddress}
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <a href="/gallery" className="hover:text-foreground transition-colors text-primary font-medium">
                  Gallery &amp; Video Vault
                </a>
              </li>
              <li>
                <a href="#tanks" className="hover:text-foreground transition-colors">
                  Ready-Made &amp; Curved Tanks
                </a>
              </li>
              <li>
                <a href="#custom" className="hover:text-foreground transition-colors">
                  Custom Aquarium Builds
                </a>
              </li>
              <li>
                <a href="#fish" className="hover:text-foreground transition-colors">
                  Live Fish Collection
                </a>
              </li>
              <li>
                <a href="#supplies" className="hover:text-foreground transition-colors">
                  Fish Food &amp; Supplies
                </a>
              </li>
              <li>
                <a href="#our-work" className="hover:text-foreground transition-colors">
                  Our Work &amp; Portfolio
                </a>
              </li>
              <li>
                <a href="#maintenance" className="hover:text-foreground transition-colors">
                  Maintenance Plans
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Opening Hours */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
              Contact &amp; Hours
            </h4>
            <ul className="space-y-3 text-xs text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{displayAddress}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>{displayPhone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>{displayEmail}</span>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p>Mon - Sat: 8:00 AM - 8:00 PM</p>
                  <p className="text-[11px] opacity-75">Sunday: Emergency Calls Only</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Orders & Delivery */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
              Easy Ordering
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We operate convenient WhatsApp click-to-chat ordering. Add items to your cart, and send your order with one tap. Payment by Mobile Money (MoMo), Bank, or Cash upon delivery/pickup.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-card border border-border/40 text-[11px] text-foreground/80">
              <span className="font-semibold block text-primary mb-1">
                Live Arrival Guarantee
              </span>
              All fish and living organisms are backed by our transit safety commitment.
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted-foreground">
          <p>© 2026 Gabriel&apos;s Aquarium. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#home" className="hover:text-foreground transition-colors">Back to top ↑</a>
            <span>·</span>
            <a href="/floema-demo" className="hover:text-foreground transition-colors">Design Archive</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
