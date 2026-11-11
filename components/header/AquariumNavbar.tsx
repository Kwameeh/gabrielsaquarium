'use client';

import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, MessageCircle, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { waLink } from '@/lib/whatsapp';
import { urlFor } from '@/sanity/lib/image';
import { motion, AnimatePresence } from 'motion/react';

const emptySubscribe = () => () => {};

interface AquariumNavbarProps {
  whatsappNumber?: string;
  logo?: any;
  businessName?: string;
}

export function AquariumNavbar({
  whatsappNumber = '233249384800',
  logo,
  businessName = "Gabriel's Aquarium",
}: AquariumNavbarProps) {
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

      // Always show near the very top of the page
      if (currentScrollY < 30) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Scrolling down -> hide navbar
        setVisible(false);
        setMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up -> reveal navbar
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const totalItems = isMounted
    ? items.reduce((sum, item) => sum + item.qty, 0)
    : 0;

  const navLinks = [
    { label: 'TANKS', href: '/tanks' },
    { label: 'FISH', href: '/fish' },
    { label: 'SUPPLIES', href: '/supplies' },
    { label: 'GALLERY', href: '/gallery' },
    { label: 'CUSTOM', href: '/custom-tanks' },
    { label: 'OUR WORK', href: '/our-work' },
    { label: 'MAINTENANCE', href: '/maintenance' },
  ];

  const whatsappUrl = waLink(
    whatsappNumber,
    "Hello Gabriel's Aquarium, I'm reaching out from your website."
  );

  let logoUrl: string | null = '/logo.png';
  if (logo) {
    try {
      logoUrl = typeof logo === 'string' ? logo : urlFor(logo).height(80).auto('format').url();
    } catch {}
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 flex items-center justify-between px-4 sm:px-8 lg:px-12 py-4 sm:py-5 pointer-events-auto transition-all duration-300 ease-in-out ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(3,26,68,0.06)] border-b border-black/[0.04]'
            : 'bg-transparent'
        }`}
      >
        {/* Left side: Brand Logo / Typography from Sanity Site Settings */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2.5 select-none group focus:outline-none"
            aria-label={`${businessName} Home`}
          >
            {logoUrl ? (
              <div className="relative h-9 sm:h-11 w-32 sm:w-40 transition-all bg-transparent">
                <Image
                  src={logoUrl}
                  alt={businessName}
                  fill
                  sizes="(max-width: 640px) 128px, 160px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            ) : (
              <div
                className={`flex items-baseline text-xl sm:text-2xl font-bold tracking-tight ${
                  !isScrolled ? 'text-white drop-shadow-md' : 'text-[#031A44]'
                }`}
              >
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

        {/* Right side: Floating Navigation Pill & Quick Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Floating white pill container - desktop */}
          <nav
            className="hidden lg:flex bg-white/95 backdrop-blur-md rounded-full px-6 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] items-center gap-5 xl:gap-6 transition-shadow hover:shadow-[0_6px_28px_rgba(0,0,0,0.07)]"
            aria-label="Main Navigation"
          >
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[11px] tracking-[0.08em] font-medium text-[#031A44] hover:text-[#0762BF] hover:opacity-80 transition-all uppercase whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Cart Pill Button */}
          <button
            type="button"
            onClick={openCart}
            className="relative flex items-center gap-2 bg-white/95 backdrop-blur-md hover:bg-white text-[#031A44] px-3.5 py-2 sm:py-2.5 rounded-full border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all active:scale-95"
            aria-label={`Open shopping cart with ${totalItems} items`}
          >
            <ShoppingBag className="w-4 h-4 text-[#0762BF]" />
            <span className="hidden sm:inline-block text-[11px] font-semibold tracking-wide">
              Cart
            </span>
            {totalItems > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#0762BF] text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          {/* Direct WhatsApp CTA Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#0F7B6C] hover:bg-[#0D6D60] text-white text-[11px] font-semibold px-4 py-2 sm:py-2.5 rounded-full shadow-[0_4px_16px_rgba(15,123,108,0.25)] hover:shadow-[0_6px_20px_rgba(15,123,108,0.35)] transition-all hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white stroke-none" />
            <span>WhatsApp</span>
          </a>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-white/95 backdrop-blur-md text-[#031A44] border border-black/[0.04] shadow-xs"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-4 top-20 z-50 bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-black/[0.06] p-6 lg:hidden"
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-semibold tracking-wider text-[#031A44] hover:text-[#0762BF] py-2 border-b border-black/[0.04] flex items-center justify-between"
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
