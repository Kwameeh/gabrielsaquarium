'use client';

import React, { useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const quickLinks = [
    { category: 'Products', items: ['Aethel Solid Oak', 'Ribbed Ash Credenza', 'Acoustic Slat Walls'] },
    { category: 'Materials', items: ['FSC European Oak', 'Recycled PET Felt', 'Natural Matte Wax'] },
    { category: 'Journal', items: ['Circular Architecture in Milan', 'Acoustic Balance in Living Spaces'] },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[#241F21]/40 backdrop-blur-md flex items-start justify-center pt-24 px-4 sm:px-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-[#F3EFEA] rounded-2xl shadow-2xl border border-[#241F21]/10 overflow-hidden text-[#241F21]"
          >
            {/* Header & input */}
            <div className="p-6 border-b border-[#241F21]/10 flex items-center gap-4">
              <Search className="w-5 h-5 text-[#241F21]/60" />
              <input
                type="text"
                autoFocus
                placeholder="Search collections, acoustics, materials..."
                className="w-full bg-transparent text-lg md:text-xl font-light text-[#241F21] placeholder:text-[#241F21]/40 focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-full text-[#241F21]/60 hover:text-[#241F21] transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick links & categories */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white/50">
              {quickLinks.map((group) => (
                <div key={group.category} className="space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.1em] font-semibold text-[#241F21]/50">
                    {group.category}
                  </span>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <button
                          type="button"
                          onClick={onClose}
                          className="text-xs text-[#241F21]/80 hover:text-[#241F21] flex items-center justify-between w-full group text-left transition-colors"
                        >
                          <span className="group-hover:translate-x-0.5 transition-transform">{item}</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-[#EAE5DF] text-[11px] text-[#241F21]/60 flex items-center justify-between">
              <span>Press <kbd className="font-mono bg-white/60 px-1.5 py-0.5 rounded text-[10px]">ESC</kbd> to exit</span>
              <span className="font-medium">Floema Architectural Archive</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
