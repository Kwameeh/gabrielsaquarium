import type { Product } from './types';

export function cardMeta(p: Product): string[] {
  const parts: (string | number | undefined | false)[] = [];
  switch (p._type) {
    case 'tank':
      parts.push(
        p.lengthCm && p.widthCm && p.heightCm
          ? `${p.lengthCm} x ${p.widthCm} x ${p.heightCm} cm`
          : undefined,
        p.shape,
        p.glassType
      );
      break;
    case 'fish':
      parts.push(
        p.waterType,
        p.careLevel && `${p.careLevel} care`,
        p.adultSizeCm && `up to ${p.adultSizeCm} cm`
      );
      break;
    case 'feed':
      parts.push(p.brand, p.foodType, p.packSize);
      break;
    case 'accessory':
      parts.push(p.brand, p.category);
      break;
  }
  return parts.filter((x): x is string => typeof x === 'string' && x.length > 0);
}
