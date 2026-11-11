'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export function Navbar({ onOpenSearch }: NavbarProps) {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  const languages = ['EN', 'IT', 'FR', 'DE'];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 flex items-center justify-between px-6 sm:px-10 lg:px-12 py-7 pointer-events-auto">
      {/* Left side: Floema® Logo & Search button */}
      <div className="flex items-center">
        <a
          href="#home"
          className="text-2xl font-medium tracking-tight text-[#241F21] select-none group flex items-baseline"
          aria-label="Floema home"
        >
          <span>Floema</span>
          <sup className="text-[11px] font-normal tracking-normal ml-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
            ®
          </sup>
        </a>

        {/* Search icon button 24px to the right of logo */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="ml-6 p-1.5 text-[#241F21]/80 hover:text-[#241F21] hover:scale-105 active:scale-95 transition-all rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#241F21]"
          aria-label="Open search"
        >
          <Search className="w-[18px] h-[18px] stroke-[1.6]" />
        </button>
      </div>

      {/* Right side: Floating white pill & Language selector */}
      <div className="flex items-center">
        {/* Floating white pill container */}
        <nav
          className="bg-white/95 backdrop-blur-md rounded-full px-6 sm:px-7 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex items-center gap-4 sm:gap-7 transition-shadow hover:shadow-[0_6px_28px_rgba(0,0,0,0.07)]"
          aria-label="Main Navigation"
        >
          {(['PRODUCTS', 'ABOUT', 'SUSTAINABILITY', 'JOURNAL'] as const).map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[11px] tracking-[0.08em] font-medium text-[#241F21] hover:opacity-60 transition-all uppercase whitespace-nowrap"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Minimal language selector "EN ▾" outside the pill to the right (ml-6) */}
        <div className="relative ml-6">
          <button
            type="button"
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-[#241F21] hover:opacity-60 transition-opacity focus:outline-none py-1"
            aria-expanded={langMenuOpen}
            aria-haspopup="true"
          >
            <span>{currentLang}</span>
            <span className="text-[9px] -mt-0.5 transition-transform duration-200" style={{ transform: langMenuOpen ? 'rotate(180deg)' : 'none' }}>
              ▾
            </span>
          </button>

          {/* Language Dropdown */}
          <AnimatePresence>
            {langMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-20 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-black/[0.05] py-1.5 z-50 flex flex-col"
              >
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      setCurrentLang(lang);
                      setLangMenuOpen(false);
                    }}
                    className={`text-left px-3.5 py-1 text-[11px] font-medium transition-colors ${
                      lang === currentLang
                        ? 'text-[#241F21] bg-black/[0.04] font-semibold'
                        : 'text-[#241F21]/70 hover:text-[#241F21] hover:bg-black/[0.02]'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
