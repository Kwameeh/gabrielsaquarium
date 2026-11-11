export type GalleryCardType = 'editorial' | 'pastel' | 'wireframe' | 'video';

export interface GalleryItemData {
  id: number;
  type: GalleryCardType;
  title: string;
  subtitle?: string;
  angle: number; // in radians
  duration: number; // in seconds (10 to 16)
  initialProgress: number; // 0 to 1
  radiusMultiplier: number; // 0.85 to 1.15
  aspect: 'aspect-[4/5]' | 'aspect-square' | 'aspect-[3/4]';
  width: string; // e.g. 'w-36 md:w-44'
  bgColor?: string; // for pastel cards: '#D8E2D5' or '#F2A679'
  imageUrl?: string; // for editorial & poster cards
  videoUrl?: string; // for video cards
  blueprintVariant?: 'grid' | 'elevation' | 'joint' | 'plan' | 'chair' | 'slats';
}
