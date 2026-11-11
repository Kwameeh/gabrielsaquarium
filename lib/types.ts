export type ProductType = 'tank' | 'fish' | 'feed' | 'accessory';

export type Product = {
  _id: string;
  _type: ProductType;
  title: string;
  slug: string;
  price?: number | null;
  inStock?: boolean;
  purchaseType: 'buy' | 'inquire';
  image?: string;
  images?: string[];
  description?: string;

  // tank
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
  volumeLitres?: number;
  shape?: string;
  glassType?: string;
  glassThicknessMm?: number;
  frameStyle?: string;
  suitableFor?: string | string[];
  overflow?: string;
  includes?: string[];
  weightKg?: number;
  leadTime?: string;
  warranty?: string;

  // fish
  soldAs?: string;
  scientificName?: string;
  waterType?: string;
  careLevel?: string;
  temperament?: string;
  diet?: string;
  adultSizeCm?: number;
  sizeSold?: string;
  minTankLitres?: number;
  waterConditions?: string;
  compatibility?: string;
  reefSafe?: string;

  // feed
  brand?: string;
  packSize?: string;
  foodType?: string;
  sinking?: string;
  pelletSize?: string;
  features?: string[];
  ingredients?: string;
  analysis?: { protein?: number; fat?: number; fibre?: number; moisture?: number };
  feedingGuide?: string;

  // accessory
  category?: string;
  specs?: { label: string; value: string }[];
  whatsIncluded?: string[];
};
