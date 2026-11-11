'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, MessageCircle, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { waLink } from '@/lib/whatsapp';
import { AquariumSearchModal } from './AquariumSearchModal';
import { motion, AnimatePresence } from 'motion/react';

export function SiteHeader({ whatsappNumber = '233241234567' }: { whatsappNumber?: string }) {
  const { items, openCart } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  const navLinks = [
    { label: 'TANKS', href: '/tanks' },
    { label: 'FISH', href: '/fish' },
    { label: 'SUPPLIES', href: '/supplies' },
    { label: 'CUSTOM', href: '/custom-tanks' },
    { label: 'OUR WORK', href: '/our-work' },
    { label: 'MAINTENANCE', href: '/maintenance' },
  ];

  const whatsappUrl = waLink(whatsappNumber, "Hello Gabriel's Aquarium, I'm reaching out from your website.");

  return (
    <>
      <header className="sticky top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-border/40 py-4 px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand logo & Search trigger */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold tracking-tight text-[#031A44] select-none group flex items-baseline"
          >
            <span className="font-heading">Gabriel&apos;s</span>
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#0762BF] uppercase ml-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
              Aquarium
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="ml-4 sm:ml-6 p-2 text-[#031A44]/80 hover:text-[#031A44] hover:scale-105 active:scale-95 transition-all rounded-full bg-secondary border border-border focus:outline-none"
            aria-label="Search site"
          >
            <Search className="w-4 h-4 stroke-[1.8]" />
          </button>
        </div>

        {/* Floating pill navigation */}
        <div className="flex items-center gap-3">
          <nav className="hidden lg:flex bg-white/95 backdrop-blur-md rounded-full px-6 py-2 shadow-xs border border-border items-center gap-5 xl:gap-6">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[11px] tracking-[0.08em] font-medium text-[#031A44] hover:text-[#0762BF] transition-colors uppercase whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Cart Pill */}
          <button
            type="button"
            onClick={openCart}
            className="relative flex items-center gap-2 bg-white/95 backdrop-blur-md hover:bg-white text-[#031A44] px-3.5 py-2 rounded-full border border-border shadow-xs hover:shadow-md transition-all active:scale-95"
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
            className="lg:hidden p-2 rounded-full bg-white text-[#031A44] border border-border shadow-xs"
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
            className="fixed inset-x-4 top-20 z-40 bg-white rounded-2xl shadow-2xl border border-border p-6 lg:hidden"
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-semibold tracking-wider text-[#031A44] hover:text-[#0762BF] py-2 border-b border-border/40 flex items-center justify-between"
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

      <AquariumSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
