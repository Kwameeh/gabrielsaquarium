'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, X } from 'lucide-react';

export function DraftModeBanner() {
  // If we are inside an iframe (like the Sanity Presentation Tool), don't clutter the preview
  if (typeof window !== 'undefined' && window.self !== window.top) {
    return null;
  }

  return (
    <aside
      aria-label="Draft preview mode status"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-slate-900/90 text-white text-xs backdrop-blur-md border border-white/20 shadow-xl"
    >
      <Eye className="w-3.5 h-3.5 text-[#F8B828] animate-pulse" />
      <span className="font-medium">Draft &amp; Live Preview Active</span>
      <Link
        href="/api/draft-mode/disable"
        className="ml-2 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-[10px] font-semibold transition-colors"
      >
        <span>Exit</span>
        <X className="w-3 h-3" />
      </Link>
    </aside>
  );
}
