'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { cardMeta } from '@/lib/productMeta';
import { priceLabel } from '@/lib/whatsapp';
import { urlFor } from '@/sanity/lib/image';
import type { Product } from '@/lib/types';

function getProductImageUrl(product: Product): string {
  if (product.image) {
    if (typeof product.image === 'string') return product.image;
    try {
      return urlFor(product.image).width(800).auto('format').url();
    } catch {
      // fallback
    }
  }
  // Curated high quality fallbacks per product category
  switch (product._type) {
    case 'tank':
      return '/images/tank-08-curved-corner-120-front.jpg';
    case 'fish':
      return '/images/fish-04-discus.jpg';
    case 'feed':
      return 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=800&auto=format&fit=crop';
    case 'accessory':
      return 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=800&auto=format&fit=crop';
    default:
      return '/images/tank-05-rimless-ultra-clear-100-front.jpg';
  }
}

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const metaParts = cardMeta(product);
  const formattedPrice = priceLabel(product);
  const imageUrl = getProductImageUrl(product);

  return (
    <div className="bg-card rounded-3xl overflow-hidden border border-border shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
      <Link href={`/product/${product.slug}`} className="block relative aspect-4/3 w-full bg-slate-900 overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#031A44] shadow-xs uppercase tracking-wider">
            {product._type}
          </span>
        </div>

        <div className="absolute bottom-3 right-3">
          <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs">
            {product.purchaseType === 'buy' ? 'Buy Online' : 'Enquire First'}
          </span>
        </div>
      </Link>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-bold text-foreground text-sm line-clamp-1 hover:text-primary transition-colors font-heading">
              {product.title}
            </h3>
          </Link>

          {metaParts.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
              {metaParts.join(' · ')}
            </p>
          )}
        </div>

        <div className="mt-5 pt-3 border-t border-border/50 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-muted-foreground block font-medium">Price</span>
            <span className="text-sm sm:text-base font-bold text-foreground">
              {formattedPrice}
            </span>
          </div>

          {product.purchaseType === 'buy' && product.price ? (
            <button
              type="button"
              onClick={() =>
                add({
                  id: product._id,
                  title: product.title,
                  slug: product.slug,
                  price: product.price!,
                  image: product.image,
                })
              }
              className="py-2 px-3.5 rounded-xl text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          ) : (
            <Link
              href={`/product/${product.slug}`}
              className="py-2 px-3.5 rounded-xl text-xs font-semibold bg-secondary hover:bg-secondary/80 text-secondary-foreground flex items-center gap-1 transition-colors"
            >
              <span>View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
