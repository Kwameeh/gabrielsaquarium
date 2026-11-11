'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SiteHeader } from '@/components/header/SiteHeader';
import { Footer } from '@/components/home/Footer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';
import { useCart } from '@/lib/cart';
import { orderMessage, waLink } from '@/lib/whatsapp';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { items, setQty, remove, clear } = useCart();
  const whatsappNumber = '233241234567';

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
      setError('Please enter your delivery address / landmark');
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
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-12 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <span className="text-xs font-bold tracking-widest uppercase text-primary">
            Checkout on WhatsApp
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-1 font-heading">
            Your Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Review your items and send your order directly to our team via WhatsApp for instant confirmation.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center bg-card rounded-3xl border border-border p-8 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-secondary text-primary flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 opacity-60" />
            </div>
            <h2 className="text-lg font-bold text-foreground">Your cart is currently empty</h2>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
              Explore our ready-made tanks, vibrant live fish, and premium aquascaping supplies.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/tanks"
                className="py-2.5 px-5 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Browse Tanks
              </Link>
              <Link
                href="/fish"
                className="py-2.5 px-5 rounded-full text-xs font-semibold bg-secondary text-foreground hover:bg-muted border border-border transition-colors"
              >
                Browse Live Fish
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Items Column */}
            <div className="lg:col-span-7 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-2xl border border-border bg-card shadow-xs"
                >
                  {item.image && (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-muted">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-foreground truncate font-heading">
                        {item.title}
                      </h3>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                        aria-label={`Remove ${item.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs font-semibold text-primary">
                      GHS {item.price.toLocaleString('en-GH')} each
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setQty(item.id, item.qty - 1)}
                          className="w-7 h-7 rounded border border-border flex items-center justify-center hover:bg-muted text-foreground transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-2">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(item.id, item.qty + 1)}
                          className="w-7 h-7 rounded border border-border flex items-center justify-center hover:bg-muted text-foreground transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-foreground">
                        GHS {(item.price * item.qty).toLocaleString('en-GH')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Details Column */}
            <div className="lg:col-span-5">
              <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-foreground font-heading">
                    Order Summary
                  </h2>
                  <div className="mt-4 flex items-baseline justify-between border-b border-border/50 pb-4">
                    <span className="text-sm text-muted-foreground font-medium">Subtotal</span>
                    <span className="text-2xl font-extrabold text-foreground">
                      GHS {total.toLocaleString('en-GH')}
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="text-xs text-destructive bg-destructive/10 px-3.5 py-2 rounded-xl font-medium">
                    {error}
                  </div>
                )}

                <form onSubmit={handleCheckout} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kwame Mensah"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setError('');
                      }}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="024 XXX XXXX"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setError('');
                      }}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                      Delivery Method
                    </label>
                    <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
                      <label className="flex items-center gap-2 p-3 rounded-xl border border-border bg-background cursor-pointer">
                        <input
                          type="radio"
                          name="delivery-method"
                          value="delivery"
                          checked={method === 'delivery'}
                          onChange={() => setMethod('delivery')}
                          className="accent-[#0762BF]"
                        />
                        <span>Delivery</span>
                      </label>
                      <label className="flex items-center gap-2 p-3 rounded-xl border border-border bg-background cursor-pointer">
                        <input
                          type="radio"
                          name="delivery-method"
                          value="pickup"
                          checked={method === 'pickup'}
                          onChange={() => setMethod('pickup')}
                          className="accent-[#0762BF]"
                        />
                        <span>Pickup (Kasoa)</span>
                      </label>
                    </div>
                  </div>

                  {method === 'delivery' && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        Delivery Address / Landmark *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Street, area, or landmark in Accra / Kasoa"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          setError('');
                        }}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Notes / Instructions
                    </label>
                    <input
                      type="text"
                      placeholder="Special instructions or questions..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl font-semibold text-xs tracking-wide text-white bg-whatsapp hover:bg-whatsapp/90 shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <span>Send Order on WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                    We&apos;ll confirm availability, delivery fee, and payment details in the chat. Large items like tanks may need extra delivery arrangements.
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
