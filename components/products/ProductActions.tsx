'use client';

import React, { useState } from 'react';
import { ShoppingBag, MessageSquare, Plus, Minus, Send } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { waLink, productQuestionMessage, tankInquiryMessage } from '@/lib/whatsapp';
import type { Product } from '@/lib/types';

export function ProductActions({
  product,
  whatsappNumber = '233249384800',
}: {
  product: Product;
  whatsappNumber?: string;
}) {
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);

  // Inquire form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleAddToCart = () => {
    if (!product.price) return;
    add(
      {
        id: product._id,
        title: product.title,
        slug: product.slug,
        price: product.price,
        image: product.image,
      },
      qty
    );
  };

  const handleAskQuestion = () => {
    const text = productQuestionMessage({
      title: product.title,
      slug: product.slug,
    });
    window.open(waLink(whatsappNumber, text), '_blank');
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!phone.trim()) {
      setError('Please enter your phone number');
      return;
    }

    const text = tankInquiryMessage(
      { title: product.title, slug: product.slug },
      { name, phone, note: note.trim() || undefined }
    );
    window.open(waLink(whatsappNumber, text), '_blank');
  };

  if (product.purchaseType === 'buy' && product.price) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-xl border border-border bg-card p-1">
            <button
              type="button"
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted text-foreground transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center text-sm font-bold">{qty}</span>
            <button
              type="button"
              onClick={() => setQty(qty + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted text-foreground transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 py-3 px-6 rounded-xl text-xs sm:text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart · GHS {(product.price * qty).toLocaleString('en-GH')}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleAskQuestion}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold border border-border hover:bg-muted text-foreground flex items-center justify-center gap-2 transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-primary" />
          <span>Ask a Question on WhatsApp</span>
        </button>
      </div>
    );
  }

  // Inquiry mode
  return (
    <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-xs">
      <div>
        <h4 className="text-sm font-bold text-foreground">
          Ask About This Tank
        </h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          We will confirm availability, glass thickness options, delivery, and installation on WhatsApp.
        </p>
      </div>

      {error && (
        <div className="text-xs text-destructive bg-destructive/10 px-3 py-1.5 rounded-lg font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSendInquiry} className="space-y-3">
        <input
          type="text"
          required
          placeholder="Your Name *"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <input
          type="tel"
          required
          placeholder="Phone Number (024...) *"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setError('');
          }}
          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <textarea
          rows={2}
          placeholder="Optional notes, location, or questions..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
        />

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl font-semibold text-xs text-white bg-whatsapp hover:bg-whatsapp/90 shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send Inquiry on WhatsApp</span>
        </button>
      </form>
    </div>
  );
}
