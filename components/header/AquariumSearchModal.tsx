'use client';

import React, { useEffect, useState } from 'react';
import { Search, X, ArrowRight, Fish, Box, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AquariumSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SEARCH_DATABASE = [
  { title: 'Curved Glass Bow-Front Aquarium (120cm)', category: 'Tanks', href: '#tanks', tag: 'Curved Glass' },
  { title: 'Rimless Low-Iron Cube Tank (60cm)', category: 'Tanks', href: '#tanks', tag: 'Ultra-Clear' },
  { title: 'Cabinet Marine Reef Tank with Sump (150cm)', category: 'Tanks', href: '#tanks', tag: 'Reef Ready' },
  { title: 'Vibrant Discus Fish (Cobalt Blue & Pigeon Blood)', category: 'Fish', href: '#fish', tag: 'Freshwater' },
  { title: 'Ocellaris Clownfish Pair', category: 'Fish', href: '#fish', tag: 'Marine' },
  { title: 'African Lake Malawi Cichlids', category: 'Fish', href: '#fish', tag: 'Freshwater' },
  { title: 'Hikari Cichlid Bio-Gold Pellets', category: 'Supplies', href: '#supplies', tag: 'Feed' },
  { title: 'External Canister Filter 1200 L/H', category: 'Supplies', href: '#supplies', tag: 'Filtration' },
  { title: 'Full-Spectrum Aquatic Plant LED Light', category: 'Supplies', href: '#supplies', tag: 'Lighting' },
  { title: 'Custom In-Wall Architectural Aquarium', category: 'Custom Builds', href: '#custom', tag: 'Service' },
  { title: 'Monthly Aquarium Maintenance Plan', category: 'Maintenance', href: '#maintenance', tag: 'Service' },
];

export function AquariumSearchModal({ isOpen, onClose }: AquariumSearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const filtered = query.trim()
    ? SEARCH_DATABASE.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()) ||
          item.tag.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[#031A44]/60 backdrop-blur-md flex items-start justify-center pt-20 px-4 sm:px-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-border overflow-hidden text-foreground"
          >
            {/* Header & input */}
            <div className="p-5 sm:p-6 border-b border-border flex items-center gap-3.5">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search curved tanks, live fish, feeds, custom builds..."
                className="w-full bg-transparent text-base sm:text-lg text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Results or Quick categories */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {query.trim() ? (
                filtered.length > 0 ? (
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                      Search Results ({filtered.length})
                    </span>
                    <ul className="divide-y divide-border/40">
                      {filtered.map((item) => (
                        <li key={item.title}>
                          <a
                            href={item.href}
                            onClick={onClose}
                            className="py-3 px-3 rounded-lg hover:bg-secondary/60 flex items-center justify-between group transition-colors"
                          >
                            <div>
                              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                {item.title}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] font-medium text-muted-foreground">
                                  {item.category}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-primary font-medium">
                                  {item.tag}
                                </span>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground text-sm">
                    No aquarium products found matching &ldquo;{query}&rdquo;.
                  </div>
                )
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                      <Box className="w-4 h-4" />
                      <span>Ready Tanks</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      <li>
                        <a href="#tanks" onClick={onClose} className="hover:text-foreground">
                          Curved Front Glass Tanks
                        </a>
                      </li>
                      <li>
                        <a href="#tanks" onClick={onClose} className="hover:text-foreground">
                          Rimless Low-Iron Aquariums
                        </a>
                      </li>
                      <li>
                        <a href="#tanks" onClick={onClose} className="hover:text-foreground">
                          All-In-One Sump Systems
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                      <Fish className="w-4 h-4" />
                      <span>Live Fish & Feeds</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      <li>
                        <a href="#fish" onClick={onClose} className="hover:text-foreground">
                          Freshwater Community & Cichlids
                        </a>
                      </li>
                      <li>
                        <a href="#fish" onClick={onClose} className="hover:text-foreground">
                          Marine Reef Fish & Inverts
                        </a>
                      </li>
                      <li>
                        <a href="#supplies" onClick={onClose} className="hover:text-foreground">
                          Premium Hikari & Sera Food
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                      <Wrench className="w-4 h-4" />
                      <span>Custom Services</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      <li>
                        <a href="#custom" onClick={onClose} className="hover:text-foreground">
                          Bespoke Living Reef Tanks
                        </a>
                      </li>
                      <li>
                        <a href="#maintenance" onClick={onClose} className="hover:text-foreground">
                          Home & Office Maintenance
                        </a>
                      </li>
                      <li>
                        <a href="#our-work" onClick={onClose} className="hover:text-foreground">
                          Portfolio of Completed Builds
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-secondary/50 text-[11px] text-muted-foreground flex items-center justify-between border-t border-border">
              <span>
                Press <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-border text-[10px]">ESC</kbd> to close
              </span>
              <span className="font-medium text-foreground">Gabriel&apos;s Aquarium · Ghana</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
