'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, MessageCircle, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { waLink } from '@/lib/whatsapp';
import { urlFor } from '@/sanity/lib/image';
import { motion, AnimatePresence } from 'motion/react';

interface SiteHeaderProps {
  whatsappNumber?: string;
  logo?: any;
  businessName?: string;
}

export function SiteHeader({
  whatsappNumber = '233249384800',
  logo,
  businessName = "Gabriel's Aquarium",
}: SiteHeaderProps) {
  const { items, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smart hide-on-scroll-down, reveal-on-scroll-up
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY < 30) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Scrolling down -> hide header
        setVisible(false);
        setMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up -> show header
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  const navLinks = [
    { label: 'TANKS', href: '/tanks' },
    { label: 'FISH', href: '/fish' },
    { label: 'SUPPLIES', href: '/supplies' },
    { label: 'GALLERY', href: '/gallery' },
    { label: 'CUSTOM', href: '/custom-tanks' },
    { label: 'OUR WORK', href: '/our-work' },
    { label: 'MAINTENANCE', href: '/maintenance' },
  ];

  const whatsappUrl = waLink(whatsappNumber, "Hello Gabriel's Aquarium, I'm reaching out from your website.");

  let logoUrl: string | null = '/logo.png';
  if (logo) {
    try {
      logoUrl = typeof logo === 'string' ? logo : urlFor(logo).height(80).auto('format').url();
    } catch {}
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-40 bg-background/85 backdrop-blur-xl border-b border-border/50 py-3.5 sm:py-4 px-4 sm:px-8 lg:px-12 flex items-center justify-between transition-all duration-300 ease-in-out ${
          visible ? 'translate-y-0 opacity-100 shadow-xs' : '-translate-y-full opacity-0'
        }`}
      >
        {/* Brand logo / Typography from Sanity */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 select-none group focus:outline-none"
            aria-label={`${businessName} Home`}
          >
            {logoUrl ? (
              <div className="relative h-9 sm:h-10 w-32 sm:w-36">
                <Image
                  src={logoUrl}
                  alt={businessName}
                  fill
                  sizes="(max-width: 640px) 128px, 144px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            ) : (
              <div className="flex items-baseline text-xl sm:text-2xl font-bold tracking-tight text-[#031A44]">
                <span className="font-heading">
                  {businessName.includes("'s") ? (
                    <>
                      <span>{businessName.split("'s")[0]}&apos;s</span>
                      <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#0762BF] uppercase ml-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                        {businessName.split("'s")[1]?.trim() || 'Aquarium'}
                      </span>
                    </>
                  ) : (
                    <span>{businessName}</span>
                  )}
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Floating pill navigation */}
        <div className="flex items-center gap-3">
          <nav className="hidden lg:flex bg-card/90 backdrop-blur-md rounded-full px-6 py-2 shadow-xs border border-border items-center gap-5 xl:gap-6">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[11px] tracking-[0.08em] font-medium text-foreground hover:text-primary transition-colors uppercase whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Cart Pill */}
          <button
            type="button"
            onClick={openCart}
            className="relative flex items-center gap-2 bg-card/90 backdrop-blur-md hover:bg-card text-foreground px-3.5 py-2 rounded-full border border-border shadow-xs hover:shadow-md transition-all active:scale-95"
            aria-label={`Open shopping cart with ${totalItems} items`}
          >
            <ShoppingBag className="w-4 h-4 text-primary" />
            <span className="hidden sm:inline-block text-[11px] font-semibold tracking-wide">
              Cart
            </span>
            {totalItems > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          {/* WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#0F7B6C] hover:bg-[#0D6D60] text-white text-[11px] font-semibold px-4 py-2 rounded-full shadow-xs hover:shadow-md transition-all active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white stroke-none" />
            <span>WhatsApp</span>
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-card text-foreground border border-border shadow-xs"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-4 top-20 z-50 bg-card rounded-2xl shadow-2xl border border-border p-6 lg:hidden"
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-semibold tracking-wider text-foreground hover:text-primary py-2 border-b border-border/40 flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-muted-foreground text-xs">→</span>
                </Link>
              ))}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 py-2.5 rounded-xl bg-[#0F7B6C] text-white text-xs font-semibold text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                Chat with Gabriel on WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
