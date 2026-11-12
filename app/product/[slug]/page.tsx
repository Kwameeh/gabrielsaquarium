import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/header/SiteHeader';
import { Footer } from '@/components/home/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';
import { ProductSpecs } from '@/components/products/ProductSpecs';
import { ProductActions } from '@/components/products/ProductActions';
import { ProductCard } from '@/components/products/ProductCard';
import { priceLabel } from '@/lib/whatsapp';
import { sanityFetch } from '@/sanity/lib/live';
import { productQuery, relatedQuery, allProductSlugsQuery, settingsQuery } from '@/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import type { Product } from '@/lib/types';
import { Truck, ShieldCheck, ArrowLeft } from 'lucide-react';

function resolveProductImage(product: Product): string {
  if (product.image) {
    if (typeof product.image === 'string') return product.image;
    try {
      return urlFor(product.image).width(1200).url();
    } catch {}
  }
  if (product.images && product.images.length > 0) {
    const first = product.images[0];
    if (typeof first === 'string') return first;
    try {
      return urlFor(first).width(1200).url();
    } catch {}
  }
  switch (product._type) {
    case 'tank':
      return '/images/tank-08-curved-corner-120-front.jpg';
    case 'fish':
      return '/images/fish-04-discus.jpg';
    case 'feed':
      return 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=900&auto=format&fit=crop';
    case 'accessory':
      return 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=900&auto=format&fit=crop';
    default:
      return '/images/tank-05-rimless-ultra-clear-100-front.jpg';
  }
}

const ALL_PRODUCTS: Product[] = [
  // Tanks
  {
    _id: 'tank-curved-120',
    _type: 'tank',
    title: 'Curved Glass Panoramic Aquarium (120cm)',
    slug: 'curved-glass-panoramic-120',
    price: 3800,
    purchaseType: 'inquire',
    image: '/images/tank-08-curved-corner-120-front.jpg',
    images: ['/images/tank-08-curved-corner-120-front.jpg', '/images/tank-08-curved-corner-120-angle.jpg'],
    description:
      'Seamless curved front corners give an uninterrupted panoramic underwater vista. Built with 10mm high-transmission glass and German silicone for maximum strength and safety.',
    lengthCm: 120,
    widthCm: 45,
    heightCm: 65,
    volumeLitres: 350,
    shape: 'Curved front (bow-front)',
    glassType: 'Heat-Bent Curved Front',
    glassThicknessMm: 10,
    frameStyle: 'Rimless',
    suitableFor: 'Freshwater and marine',
    overflow: 'Built-in overflow',
    leadTime: 'In stock',
    warranty: '2 years leak-free',
  },
  {
    _id: 'tank-rimless-60',
    _type: 'tank',
    title: 'Rimless Low-Iron High Clarity Cube (60cm)',
    slug: 'rimless-low-iron-cube-60',
    price: 1450,
    purchaseType: 'buy',
    image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=800&auto=format&fit=crop'],
    description:
      'Diamond-beveled edges and 91% light transmittance low-iron glass make this rimless cube the gold standard for planted aquascaping and boutique desktop reefs.',
    lengthCm: 60,
    widthCm: 60,
    heightCm: 60,
    volumeLitres: 216,
    shape: 'Cube',
    glassType: 'Low-iron (ultra clear)',
    glassThicknessMm: 8,
    frameStyle: 'Rimless',
    suitableFor: 'Freshwater',
    overflow: 'None',
    leadTime: 'In stock',
    warranty: '2 years leak-free',
  },
  {
    _id: 'tank-reef-sump-150',
    _type: 'tank',
    title: 'Complete Marine Reef System with Cabinet & Sump (150cm)',
    slug: 'marine-reef-system-cabinet-sump-150',
    price: 6500,
    purchaseType: 'inquire',
    image: '/images/tank-11-marine-reef-120-with-sump-front.jpg',
    images: ['/images/tank-11-marine-reef-120-with-sump-front.jpg', '/images/tank-11-marine-reef-120-with-sump-angle.jpg'],
    description:
      'Turnkey marine ecosystem featuring an ultra-clear 12mm glass display tank, silent internal weir, glass multi-chamber sump filtration, and marine-grade waterproof cabinetry.',
    lengthCm: 150,
    widthCm: 50,
    heightCm: 65,
    volumeLitres: 480,
    shape: 'Rectangular',
    glassType: 'Low-iron (ultra clear)',
    glassThicknessMm: 12,
    frameStyle: 'Rimless',
    suitableFor: 'Marine',
    overflow: 'All-in-one (built-in sump)',
    includes: ['Stand / cabinet', 'Sump', 'Leveling mat'],
    leadTime: 'Made to order, 7 to 10 days',
    warranty: '3 years',
  },
  {
    _id: 'tank-nature-aquarium-90',
    _type: 'tank',
    title: 'Nature Aquascaping Rimless Tank (90cm)',
    slug: 'aquascaping-nature-tank-90',
    price: 1950,
    purchaseType: 'buy',
    image: '/images/tank-05-rimless-ultra-clear-100-front.jpg',
    images: ['/images/tank-05-rimless-ultra-clear-100-front.jpg', '/images/tank-05-rimless-ultra-clear-100-angle.jpg'],
    description:
      'Classic 90P dimensions crafted for competitive planted aquascaping. Ultra-clear glass ensures natural truest plant colors and crystal water clarity.',
    lengthCm: 90,
    widthCm: 45,
    heightCm: 45,
    volumeLitres: 182,
    shape: 'Rectangular',
    glassType: 'Low-iron (ultra clear)',
    glassThicknessMm: 10,
    frameStyle: 'Rimless',
    suitableFor: 'Freshwater',
    overflow: 'None',
    leadTime: 'In stock',
    warranty: '2 years leak-free',
  },

  // Fish
  {
    _id: 'fish-discus-blue',
    _type: 'fish',
    title: 'Cobalt Blue Discus Specimen',
    slug: 'cobalt-blue-discus',
    price: 320,
    purchaseType: 'buy',
    soldAs: 'each',
    image: 'https://images.unsplash.com/photo-1520315342629-6ea920342047?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1520315342629-6ea920342047?q=80&w=800&auto=format&fit=crop'],
    description:
      'Known as the "King of the Aquarium", these premium Cobalt Blue Discus are bred in disease-free facilities, rigorously quarantined, and eating readily in Ghanaian water conditions.',
    scientificName: 'Symphysodon aequifasciatus',
    waterType: 'Freshwater',
    careLevel: 'Moderate',
    temperament: 'Peaceful',
    diet: 'Carnivore / Omnivore',
    adultSizeCm: 15,
    sizeSold: '6 to 7 cm',
    minTankLitres: 200,
    waterConditions: '28 to 30 °C, pH 6.0 to 7.0',
    compatibility: 'Peaceful community fish. Best kept in groups of 5+ with peaceful tetras and Corydoras.',
  },
  {
    _id: 'fish-clownfish-pair',
    _type: 'fish',
    title: 'Ocellaris Clownfish Pair (True Percula)',
    slug: 'ocellaris-clownfish-pair',
    price: 450,
    purchaseType: 'buy',
    soldAs: 'per pair',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop'],
    description:
      'A bonded pair of captive-bred Ocellaris clownfish. Bold, curious, and well-suited for both beginner nano reefs and mature coral tanks.',
    scientificName: 'Amphiprion ocellaris',
    waterType: 'Marine',
    careLevel: 'Easy',
    temperament: 'Peaceful',
    diet: 'Omnivore',
    adultSizeCm: 9,
    sizeSold: '3 to 4 cm',
    minTankLitres: 80,
    reefSafe: 'Yes',
    waterConditions: '24 to 26 °C, Salinity 1.025, pH 8.1 to 8.4',
    compatibility: 'Reef safe. Highly compatible with anemones, soft corals, and peaceful reef fish.',
  },
  {
    _id: 'fish-lake-malawi-cichlid',
    _type: 'fish',
    title: 'Electric Yellow Labidochromis Cichlid',
    slug: 'electric-yellow-cichlid',
    price: 85,
    purchaseType: 'buy',
    soldAs: 'each',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop'],
    description:
      'Vibrant electric yellow African cichlid from Lake Malawi. One of the most peaceful mbuna species, bringing vivid color to hard-water rock aquariums.',
    scientificName: 'Labidochromis caeruleus',
    waterType: 'Freshwater',
    careLevel: 'Easy',
    temperament: 'Semi-aggressive',
    diet: 'Omnivore',
    adultSizeCm: 10,
    sizeSold: '4 to 5 cm',
    minTankLitres: 120,
    waterConditions: '24 to 27 °C, pH 7.8 to 8.6',
    compatibility: 'Keep with other Lake Malawi mbuna cichlids. Provide rock caves.',
  },

  // Feeds & Supplies
  {
    _id: 'feed-hikari-cichlid',
    _type: 'feed',
    title: 'Hikari Cichlid Bio-Gold Sinking Pellets',
    slug: 'hikari-cichlid-bio-gold',
    price: 180,
    purchaseType: 'buy',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop'],
    description:
      'Daily diet formulated with natural carotenoids and beneficial living probiotics for exceptional coloration and optimal digestion without clouding aquarium water.',
    brand: 'Hikari',
    packSize: '250 g',
    foodType: 'Pellets',
    sinking: 'Sinking',
    pelletSize: 'Medium (3 mm)',
    suitableFor: ['Cichlids', 'Carnivores'],
    features: ['Color enhancing', 'Probiotic-enriched', 'Will not cloud water'],
    analysis: { protein: 45, fat: 5, fibre: 2, moisture: 10 },
    ingredients: 'Fish meal, wheat flour, spirulina, krill meal, garlic, dried Bacillus subtilis fermentation product.',
    feedingGuide: 'Feed 2 to 3 times daily only the amount your fish will consume within 2 minutes.',
  },
  {
    _id: 'accessory-canister-filter',
    _type: 'accessory',
    title: 'Ultra-Quiet External Canister Filter 1200L/H',
    slug: 'ultra-quiet-external-canister-filter-1200',
    price: 750,
    purchaseType: 'buy',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop'],
    description:
      'Multi-stage filtration canister offering mechanical, chemical, and biological filtration. Ultra-silent ceramic motor core designed for 24/7 reliability.',
    category: 'Filtration',
    brand: 'Sunsun Professional',
    suitableFor: 'Tanks up to 300 litres',
    whatsIncluded: ['Canister unit', 'Hoses and spray bar', 'Ceramic rings & bio balls', 'Filter pads'],
    specs: [
      { label: 'Flow Rate', value: '1200 L/h' },
      { label: 'Power Consumption', value: '28 W' },
      { label: 'Filter Baskets', value: '3 Trays' },
    ],
  },
];

export const revalidate = 60;

export async function generateStaticParams() {
  const { data: sanitySlugs } = await sanityFetch({
    query: allProductSlugsQuery,
    perspective: 'published',
    stega: false,
  }).catch(() => ({ data: [] }));
  const allSlugs = new Set([
    ...ALL_PRODUCTS.map((p) => p.slug),
    ...(sanitySlugs || []).map((s: any) => s.slug),
  ]);
  return Array.from(allSlugs).map((slug) => ({
    slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [
    { data: sanityProduct },
    { data: settings },
  ] = await Promise.all([
    sanityFetch({ query: productQuery, params: { slug } }).catch(() => ({ data: null })),
    sanityFetch({ query: settingsQuery }).catch(() => ({ data: null })),
  ]);
  const product = sanityProduct || ALL_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const whatsappNumber = settings?.whatsappNumber || '233249384800';
  const formattedPrice = priceLabel(product);
  const mainImage = resolveProductImage(product);
  const { data: relatedFromSanity } = await sanityFetch({
    query: relatedQuery,
    params: { type: product._type, slug: product.slug },
  }).catch(() => ({ data: [] }));
  const related =
    relatedFromSanity && relatedFromSanity.length > 0
      ? relatedFromSanity
      : ALL_PRODUCTS.filter((p) => p._type === product._type && p.slug !== product.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1 pt-24 sm:pt-28 pb-12 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href={product._type === 'tank' ? '/tanks' : product._type === 'fish' ? '/fish' : '/supplies'}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to {product._type === 'tank' ? 'Tanks' : product._type === 'fish' ? 'Fish' : 'Supplies'}</span>
          </Link>
        </div>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Image Display */}
          <div className="lg:col-span-7">
            <div className="relative aspect-4/3 w-full rounded-3xl overflow-hidden border border-border shadow-md bg-slate-900">
              <Image
                src={mainImage}
                alt={product.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/95 backdrop-blur-md text-[#031A44] shadow-xs">
                  {product._type}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Price, Description, Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-primary">
                Gabriel&apos;s Collection
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1 font-heading">
                {product.title}
              </h1>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  {formattedPrice}
                </span>
              </div>
            </div>

            {product.description && (
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Actions: Add to cart or WhatsApp inquiry */}
            <div className="pt-2">
              <ProductActions product={product} />
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/50 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary shrink-0" />
                <span>Safe Transit in Ghana</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span>Quality Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        <div className="mt-16 pt-12 border-t border-border">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 font-heading">
            Technical Specifications
          </h2>
          <div className="max-w-3xl">
            <ProductSpecs p={product} />
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-border">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 font-heading">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((item: Product) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer whatsappNumber={whatsappNumber} settings={settings} />
      <CartDrawer whatsappNumber={whatsappNumber} />
      <FloatingWhatsApp number={whatsappNumber} />
    </div>
  );
}
