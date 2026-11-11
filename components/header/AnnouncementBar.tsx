'use client';

import React, { useState } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface AnnouncementBarProps {
  text?: string;
  link?: string;
  linkText?: string;
}

export function AnnouncementBar({
  text = 'Free consultation & 3D CAD proposal for all custom aquarium builds in Ghana',
  link = '/custom-tanks',
  linkText = 'Request quote',
}: AnnouncementBarProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <aside aria-label="Announcement" className="relative z-50 bg-primary text-primary-foreground px-4 py-2 text-center text-xs font-medium flex items-center justify-center gap-2 shadow-xs transition-colors">
      <Sparkles className="w-3.5 h-3.5 text-highlight shrink-0" />
      <span>{text}</span>
      {link && (
        <Link
          href={link}
          className="font-bold underline underline-offset-2 hover:opacity-90 inline-flex items-center gap-0.5 ml-1"
        >
          <span>{linkText}</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      )}
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="absolute right-3 sm:right-6 p-1 rounded-full text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
        aria-label="Close announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
}
