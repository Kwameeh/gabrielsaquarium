'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { waLink } from '@/lib/whatsapp';

interface FloatingWhatsAppProps {
  number?: string;
}

export function FloatingWhatsApp({ number = '233249384800' }: FloatingWhatsAppProps) {
  const url = waLink(number, "Hello Gabriel's Aquarium, I have an inquiry.");

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 right-6 z-50 pointer-events-auto">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Gabriel's Aquarium on WhatsApp"
        className="group relative flex items-center gap-2.5 bg-[#0F7B6C] hover:bg-[#0D6D60] text-white px-4 py-3 rounded-full shadow-[0_8px_24px_rgba(15,123,108,0.35)] hover:shadow-[0_10px_28px_rgba(15,123,108,0.45)] transition-all hover:scale-105 active:scale-95"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 fill-white stroke-none" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#F8B828] rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#F8B828] rounded-full" />
        </div>
        <span className="hidden sm:inline-block text-xs font-semibold tracking-wide">
          WhatsApp Us
        </span>
      </a>
    </aside>
  );
}
