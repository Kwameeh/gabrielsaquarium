import { SpecTable, type SpecRow } from './SpecTable';
import type { Product } from '@/lib/types';

const list = (v?: string | string[]) => (Array.isArray(v) ? v.join(', ') : v);

export function ProductSpecs({ p }: { p: Product }) {
  switch (p._type) {
    case 'tank': {
      const size =
        p.lengthCm && p.widthCm && p.heightCm
          ? `${p.lengthCm} x ${p.widthCm} x ${p.heightCm} cm`
          : null;
      const rows: SpecRow[] = [
        ['Dimensions (L x W x H)', size],
        ['Volume', p.volumeLitres && `${p.volumeLitres} litres`],
        ['Shape', p.shape],
        ['Glass Type', p.glassType],
        ['Glass Thickness', p.glassThicknessMm && `${p.glassThicknessMm} mm`],
        ['Frame Style', p.frameStyle],
        ['Suitable For', list(p.suitableFor)],
        ['Overflow / Filtration', p.overflow],
        ['Weight (Empty)', p.weightKg && `${p.weightKg} kg`],
        ['Availability / Lead Time', p.leadTime],
        ['Warranty', p.warranty],
        ['Included in Box', p.includes?.join(', ')],
      ];
      return <SpecTable rows={rows} />;
    }

    case 'fish': {
      const rows: SpecRow[] = [
        ['Scientific Name', p.scientificName],
        ['Water Type', p.waterType],
        ['Care Level', p.careLevel],
        ['Temperament', p.temperament],
        ['Diet', p.diet],
        ['Adult Size', p.adultSizeCm && `Up to ${p.adultSizeCm} cm`],
        ['Size Sold At', p.sizeSold],
        ['Minimum Tank Size', p.minTankLitres && `${p.minTankLitres} litres`],
        ['Reef Safe', p.waterType === 'Marine' ? p.reefSafe : false],
        ['Water Parameters', p.waterConditions],
        ['Compatibility', p.compatibility],
      ];
      return <SpecTable rows={rows} />;
    }

    case 'feed': {
      const rows: SpecRow[] = [
        ['Brand', p.brand],
        ['Pack Size', p.packSize],
        ['Food Type', p.foodType],
        ['Buoyancy', p.sinking],
        ['Pellet Size', p.pelletSize],
        ['Suitable For', list(p.suitableFor)],
        ['Key Features', p.features?.join(', ')],
        [
          'Guaranteed Analysis',
          p.analysis
            ? [
                p.analysis.protein && `Protein: ${p.analysis.protein}%`,
                p.analysis.fat && `Fat: ${p.analysis.fat}%`,
                p.analysis.fibre && `Fibre: ${p.analysis.fibre}%`,
                p.analysis.moisture && `Moisture: ${p.analysis.moisture}%`,
              ]
                .filter(Boolean)
                .join(' · ')
            : false,
        ],
        ['Ingredients', p.ingredients],
        ['Feeding Instructions', p.feedingGuide],
      ];
      return <SpecTable rows={rows} />;
    }

    case 'accessory': {
      const rows: SpecRow[] = [
        ['Brand', p.brand],
        ['Category', p.category],
        ['Suitable For', list(p.suitableFor)],
        ...(p.specs?.map((s) => [s.label, s.value] as SpecRow) ?? []),
        ['What is in the Box', p.whatsIncluded?.join(', ')],
      ];
      return <SpecTable rows={rows} />;
    }

    default:
      return null;
  }
}
