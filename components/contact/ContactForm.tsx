'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { waLink } from '@/lib/whatsapp';

export function ContactForm({ whatsappNumber = '233249384800' }: { whatsappNumber?: string }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;
    const text = [
      '*Website Contact Inquiry*',
      '',
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      `*Message:* ${message}`,
    ].join('\n');
    window.open(waLink(whatsappNumber, text), '_blank');
  };

  return (
    <form onSubmit={handleSendMessage} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Your Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Kwame Mensah"
            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="024 XXX XXXX"
            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          Your Message / Question *
        </label>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about tank dimensions, fish stock, delivery to your area..."
          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <button
        type="submit"
        className="py-3 px-6 rounded-xl font-semibold text-xs text-white bg-primary hover:bg-primary/90 shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
      >
        <Send className="w-3.5 h-3.5" />
        <span>Send Message on WhatsApp</span>
      </button>
    </form>
  );
}
