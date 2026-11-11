'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { orderMessage, waLink } from '@/lib/whatsapp';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  whatsappNumber?: string;
}

export function CartDrawer({ whatsappNumber = '233241234567' }: CartDrawerProps) {
  const { items, isOpen, closeCart, setQty, remove, clear } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!phone.trim()) {
      setError('Please enter your phone number');
      return;
    }
    if (method === 'delivery' && !address.trim()) {
      setError('Please enter your delivery location/address');
      return;
    }

    const message = orderMessage(items, {
      name,
      phone,
      method,
      address: method === 'delivery' ? address : undefined,
      note: note.trim() || undefined,
    });

    const url = waLink(whatsappNumber, message);
    window.open(url, '_blank');
    clear();
    closeCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-white text-[#031A44] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-border/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#0762BF]" />
                  <h2 className="text-lg font-bold tracking-tight">Your Aquarium Cart</h2>
                  <span className="text-xs bg-secondary text-primary font-semibold px-2 py-0.5 rounded-full">
                    {items.reduce((acc, i) => acc + i.qty, 0)} items
                  </span>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-secondary/60 flex items-center justify-center text-primary mb-4">
                      <ShoppingBag className="w-8 h-8 opacity-60" />
                    </div>
                    <h3 className="font-semibold text-foreground text-base">Your cart is empty</h3>
                    <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                      Explore our handcrafted tanks, exotic live fish, and premium aquascaping supplies.
                    </p>
                    <button
                      type="button"
                      onClick={closeCart}
                      className="mt-6 text-xs font-semibold text-[#0762BF] hover:underline flex items-center gap-1"
                    >
                      Start browsing products <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-3.5 rounded-xl border border-border/40 hover:border-border transition-colors bg-card"
                    >
                      {item.image && (
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-muted">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-semibold text-foreground truncate">
                            {item.title}
                          </h4>
                          <button
                            type="button"
                            onClick={() => remove(item.id)}
                            className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                            aria-label={`Remove ${item.title}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs font-medium text-[#0762BF] mt-0.5">
                          GHS {item.price.toLocaleString('en-GH')}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => setQty(item.id, item.qty - 1)}
                            className="w-6 h-6 rounded border border-border flex items-center justify-center hover:bg-muted text-foreground transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold px-1">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => setQty(item.id, item.qty + 1)}
                            className="w-6 h-6 rounded border border-border flex items-center justify-center hover:bg-muted text-foreground transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <span className="ml-auto text-xs font-bold text-foreground">
                            GHS {(item.price * item.qty).toLocaleString('en-GH')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout Form */}
              {items.length > 0 && (
                <div className="p-6 border-t border-border/40 bg-muted/20 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium">Subtotal</span>
                    <span className="text-lg font-bold text-foreground">
                      GHS {total.toLocaleString('en-GH')}
                    </span>
                  </div>

                  {error && (
                    <div className="text-xs text-destructive bg-destructive/10 px-3 py-1.5 rounded-md font-medium">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleCheckout} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setError('');
                        }}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Phone (024...) *"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setError('');
                        }}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        required
                      />
                    </div>

                    <div className="flex gap-4 text-xs font-medium">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="method"
                          value="delivery"
                          checked={method === 'delivery'}
                          onChange={() => setMethod('delivery')}
                          className="accent-[#0762BF]"
                        />
                        Delivery
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="method"
                          value="pickup"
                          checked={method === 'pickup'}
                          onChange={() => setMethod('pickup')}
                          className="accent-[#0762BF]"
                        />
                        Local Pickup (Direct)
                      </label>
                    </div>

                    {method === 'delivery' && (
                      <input
                        type="text"
                        placeholder="Delivery Location / Landmark *"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          setError('');
                        }}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        required
                      />
                    )}

                    <input
                      type="text"
                      placeholder="Optional notes or instructions..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    />

                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl font-semibold text-xs tracking-wide text-white bg-[#0F7B6C] hover:bg-[#0D6D60] shadow-[0_4px_16px_rgba(15,123,108,0.25)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <span>Send Order on WhatsApp</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[10px] text-center text-muted-foreground leading-snug">
                      Payment and delivery details are arranged directly in WhatsApp (MoMo, Bank, or Cash on delivery/pickup).
                    </p>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
