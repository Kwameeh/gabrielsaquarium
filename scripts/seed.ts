/**
 * Gabriel's Aquarium - Comprehensive Sanity Seed Script
 * 
 * Populates realistic data based on Gabriel's Aquarium at American House, East Legon, Accra, Ghana:
 * - Site Settings (Contact, Address, Hours, Socials)
 * - Hero & Promo Banners
 * - Tanks (Buy online & Inquire custom builds)
 * - Live Ornamental Fish (Freshwater, Marine, West African biotopes)
 * - Premium Fish Food (Pellets, Flakes, Granules)
 * - Equipment & Accessories (Filters, Heaters, Lights, ADA soil, Kits)
 * - Portfolio Projects (Our Work)
 * - Maintenance Service Plans
 * - Customer Testimonials
 * - FAQs
 * - Gallery Collection (Images & Videos with home/hero flags)
 * 
 * Usage:
 *   bun run scripts/seed.ts
 *   or: npx tsx scripts/seed.ts
 * 
 * Options:
 *   --dry-run        Print documents without pushing to Sanity
 *   --export-ndjson  Save documents to seed-data.ndjson for `npx sanity dataset import`
 */

import { createClient } from '@sanity/client';
import * as fs from 'fs';
import * as path from 'path';

// Read .env.local if present
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf-8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...vals] = trimmed.split('=');
      const val = vals.join('=').replace(/^["']|["']$/g, '');
      if (key && !process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'iicegrrv';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN;

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isExportNdjson = args.includes('--export-ndjson');

// --- Seed Data Definitions ---

const siteSettingsDoc = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  businessName: "Gabriel's Aquarium",
  whatsappNumber: '233249384800',
  phone: '+233 24 938 4800',
  email: 'info@gabrielsaquarium.com',
  address: 'American House, East Legon, Accra, Ghana',
  mapLink: 'https://maps.google.com/?q=American+House+East+Legon+Accra+Ghana',
  openingHours: [
    'Monday - Saturday: 8:00 AM - 8:00 PM',
    'Sunday: Closed (Emergency Call-Outs Only)',
  ],
  instagram: 'https://instagram.com/gabrielsaquarium',
  facebook: 'https://facebook.com/gabrielsaquarium',
  announcementText: 'Free consultation on all custom aquarium builds across Greater Accra',
  announcementActive: true,
};

const banners = [
  {
    _id: 'banner-hero-living-art',
    _type: 'banner',
    placement: 'hero',
    headline: 'Living Aquatic Art for Homes & Spaces',
    subtext: 'Bespoke rimless glass tanks, flourishing living reef ecosystems, and healthy acclimated ornamental fish.',
    buttonLabel: 'Explore Tanks',
    buttonLink: '/tanks',
    order: 1,
    active: true,
  },
  {
    _id: 'banner-promo-custom-builds',
    _type: 'banner',
    placement: 'promo',
    headline: 'Architectural In-Wall & Panoramic Aquariums',
    subtext: 'Engineered with German structural silicone, ultra-clear low-iron glass, and silent internal filtration.',
    buttonLabel: 'Request Custom Build',
    buttonLink: '/custom-tanks',
    order: 2,
    active: true,
  },
];

const tanks = [
  {
    _id: 'tank-starter-desktop-60',
    _type: 'tank',
    title: 'Starter Tabletop Freshwater Aquarium (60cm)',
    slug: { _type: 'slug', current: 'starter-tabletop-freshwater-aquarium-60cm' },
    purchaseType: 'buy',
    price: 1200,
    inStock: true,
    featured: true,
    lengthCm: 60,
    widthCm: 30,
    heightCm: 35,
    volumeLitres: 63,
    shape: 'Rectangular',
    glassType: 'Standard clear',
    glassThicknessMm: 6,
    frameStyle: 'Framed',
    suitableFor: 'Freshwater',
    overflow: 'None',
    includes: ['Lid / hood', 'LED light', 'Filter'],
    weightKg: 14,
    leadTime: 'In stock',
    warranty: '1 year',
    description: 'An ideal, hassle-free starter aquarium for bedrooms, study desks, or reception counters. Complete with integrated hood, filtration cartridge, and bright energy-efficient LED bar.',
  },
  {
    _id: 'tank-3ft-rimless-low-iron-cube',
    _type: 'tank',
    title: '3ft Ultra-Clear Low-Iron Rimless Cube (90cm)',
    slug: { _type: 'slug', current: '3ft-ultra-clear-low-iron-rimless-cube' },
    purchaseType: 'buy',
    price: 3500,
    inStock: true,
    featured: true,
    lengthCm: 90,
    widthCm: 45,
    heightCm: 45,
    volumeLitres: 182,
    shape: 'Cube',
    glassType: 'Low-iron (ultra clear)',
    glassThicknessMm: 10,
    frameStyle: 'Rimless',
    suitableFor: 'Freshwater and marine',
    overflow: 'None',
    includes: ['Leveling mat'],
    weightKg: 38,
    leadTime: 'In stock',
    warranty: '3 years',
    description: 'Crafted from 91% ultra-translucent low-iron glass with 45-degree mitered corners and German structural silicone. Provides an invisible glass aesthetic for high-end planted aquascapes and marine reefs.',
  },
  {
    _id: 'tank-4ft-panoramic-bow-front',
    _type: 'tank',
    title: '4ft Panoramic Curved-Corner Display Tank',
    slug: { _type: 'slug', current: '4ft-panoramic-curved-corner-display' },
    purchaseType: 'inquire',
    price: 5800,
    inStock: true,
    featured: true,
    lengthCm: 120,
    widthCm: 45,
    heightCm: 65,
    volumeLitres: 351,
    shape: 'Curved front (bow-front)',
    glassType: 'Standard clear',
    glassThicknessMm: 10,
    frameStyle: 'Framed',
    suitableFor: 'Freshwater and marine',
    overflow: 'Pre-drilled',
    includes: ['Stand / cabinet', 'Lid / hood', 'LED light', 'Filter'],
    weightKg: 75,
    leadTime: 'In stock - White & Black Cabinet',
    warranty: '2 years',
    description: 'Signature curved-corner glass fabrication offering an uninterrupted panoramic vista into your aquatic habitat. Includes a moisture-sealed hardwood cabinet stand and twin return filtration.',
  },
  {
    _id: 'tank-5ft-inwall-architectural-reef',
    _type: 'tank',
    title: '5ft Architectural In-Wall Living Reef Installation',
    slug: { _type: 'slug', current: '5ft-architectural-in-wall-living-reef' },
    purchaseType: 'inquire',
    price: 12500,
    inStock: false,
    featured: true,
    lengthCm: 150,
    widthCm: 50,
    heightCm: 70,
    volumeLitres: 525,
    shape: 'Rectangular',
    glassType: 'Low-iron (ultra clear)',
    glassThicknessMm: 12,
    frameStyle: 'Rimless',
    suitableFor: 'Marine',
    overflow: 'Built-in overflow',
    includes: ['Stand / cabinet', 'Sump', 'Leveling mat'],
    weightKg: 110,
    leadTime: 'Made to order, 10 to 14 days',
    warranty: '5 years',
    description: 'Bespoke architectural installation designed to mount flush within interior divider walls. Equipped with an ultra-quiet multi-chamber glass sump, dual emergency overflow drains, and rear access clearances.',
  },
  {
    _id: 'tank-coffee-table-luxury',
    _type: 'tank',
    title: 'Tempered Glass Center Coffee Table Aquarium',
    slug: { _type: 'slug', current: 'tempered-glass-center-coffee-table-aquarium' },
    purchaseType: 'inquire',
    price: 9800,
    inStock: true,
    featured: true,
    lengthCm: 100,
    widthCm: 60,
    heightCm: 50,
    volumeLitres: 300,
    shape: 'Other',
    glassType: 'Tempered',
    glassThicknessMm: 12,
    frameStyle: 'Framed',
    suitableFor: 'Freshwater',
    overflow: 'All-in-one (built-in sump)',
    includes: ['LED light', 'Filter', 'Leveling mat'],
    weightKg: 65,
    leadTime: 'Available in showroom',
    warranty: '2 years',
    description: 'A striking focal piece for executive lounges and contemporary living rooms. Features heavy-duty beveled tempered top glass, hidden subsurface aeration, and subtle ambient LED illumination.',
  },
  {
    _id: 'tank-6ft-sovereign-oceanarium',
    _type: 'tank',
    title: '6ft Sovereign Marine & Cichlid Oceanarium',
    slug: { _type: 'slug', current: '6ft-sovereign-marine-oceanarium' },
    purchaseType: 'inquire',
    price: 18500,
    inStock: false,
    featured: false,
    lengthCm: 180,
    widthCm: 60,
    heightCm: 80,
    volumeLitres: 864,
    shape: 'Rectangular',
    glassType: 'Low-iron (ultra clear)',
    glassThicknessMm: 15,
    frameStyle: 'Rimless',
    suitableFor: 'Freshwater and marine',
    overflow: 'Built-in overflow',
    includes: ['Stand / cabinet', 'Sump', 'Leveling mat'],
    weightKg: 160,
    leadTime: 'Custom fabrication, 14 days',
    warranty: '5 years',
    description: 'Our premier residential and commercial statement aquarium. Built with massive 15mm low-iron glass sheets, structural perimeter bracing, and a heavy-gauge powder-coated steel chassis.',
  },
  {
    _id: 'tank-corner-pentagon-220',
    _type: 'tank',
    title: 'Pentagon Corner Living Room Aquarium (220L)',
    slug: { _type: 'slug', current: 'pentagon-corner-living-room-aquarium' },
    purchaseType: 'buy',
    price: 4200,
    inStock: true,
    featured: false,
    lengthCm: 70,
    widthCm: 70,
    heightCm: 60,
    volumeLitres: 220,
    shape: 'Corner',
    glassType: 'Standard clear',
    glassThicknessMm: 8,
    frameStyle: 'Framed',
    suitableFor: 'Freshwater',
    overflow: 'None',
    includes: ['Stand / cabinet', 'Lid / hood', 'LED light', 'Filter'],
    weightKg: 42,
    leadTime: 'In stock',
    warranty: '2 years',
    description: 'Maximizes room corner geometry without sacrificing volume or depth. Complete with a matching corner cabinet stand and integrated multi-stage trickle filter.',
  },
  {
    _id: 'tank-nano-desktop-cube-18',
    _type: 'tank',
    title: 'Mini Rimless Desktop Nano Cube (18L)',
    slug: { _type: 'slug', current: 'mini-rimless-desktop-nano-cube-18l' },
    purchaseType: 'buy',
    price: 450,
    inStock: true,
    featured: false,
    lengthCm: 25,
    widthCm: 25,
    heightCm: 30,
    volumeLitres: 18,
    shape: 'Cube',
    glassType: 'Standard clear',
    glassThicknessMm: 5,
    frameStyle: 'Rimless',
    suitableFor: 'Freshwater',
    overflow: 'None',
    includes: ['Leveling mat'],
    weightKg: 4,
    leadTime: 'In stock',
    warranty: '1 year',
    description: 'Compact desktop nano tank perfect for a single prize Betta, live aquatic plants, or miniature cherry shrimp.',
  },
];

const fishList = [
  {
    _id: 'fish-neon-tetra',
    _type: 'fish',
    title: 'Neon Tetra',
    slug: { _type: 'slug', current: 'neon-tetra' },
    scientificName: 'Paracheirodon innesi',
    price: 15,
    soldAs: 'each (recommended min group of 6)',
    inStock: true,
    featured: true,
    waterType: 'Freshwater',
    careLevel: 'Easy',
    temperament: 'Peaceful',
    diet: 'Omnivore',
    adultSizeCm: 3.5,
    sizeSold: '2 to 2.5 cm',
    minTankLitres: 40,
    waterConditions: '22 to 26 °C, pH 6.0 to 7.0',
    compatibility: 'Very peaceful schooling fish. Keep in groups of 6 to 12. Ideal tankmates include guppies, harlequin rasboras, and corydoras.',
    description: 'The iconic iridescent blue and red jewel of community planted aquariums. Active, peaceful, and stunning in schools against dense green vegetation.',
  },
  {
    _id: 'fish-kribensis-cichlid',
    _type: 'fish',
    title: 'Kribensis Dwarf Cichlid',
    slug: { _type: 'slug', current: 'kribensis-dwarf-cichlid' },
    scientificName: 'Pelvicachromis pulcher',
    price: 45,
    soldAs: 'each',
    inStock: true,
    featured: true,
    waterType: 'Freshwater',
    careLevel: 'Easy',
    temperament: 'Peaceful',
    diet: 'Omnivore',
    adultSizeCm: 8,
    sizeSold: '4 to 5 cm',
    minTankLitres: 80,
    waterConditions: '24 to 27 °C, pH 6.5 to 7.5',
    compatibility: 'Native West African dwarf cichlid. Peaceful towards other fish, but territorial around their breeding cave.',
    description: 'Native to West African river basins, the Kribensis is renowned for vibrant magenta belly highlights, exceptional hardiness, and fascinating parental brood care.',
  },
  {
    _id: 'fish-african-butterfly',
    _type: 'fish',
    title: 'African Butterfly Fish',
    slug: { _type: 'slug', current: 'african-butterfly-fish' },
    scientificName: 'Pantodon buchholzi',
    price: 95,
    soldAs: 'each',
    inStock: true,
    featured: true,
    waterType: 'Freshwater',
    careLevel: 'Moderate',
    temperament: 'Semi-aggressive',
    diet: 'Carnivore',
    adultSizeCm: 10,
    sizeSold: '6 to 7 cm',
    minTankLitres: 100,
    waterConditions: '25 to 29 °C, pH 6.5 to 7.2',
    compatibility: 'Surface dweller with wing-shaped pectoral fins. Keep with calm midwater and bottom dwellers. Avoid fin-nipping barbs.',
    description: 'An ancient biotope predator from the Congo and Volta basins. Glides motionless at the water surface resembling a fallen leaf, striking prey with astonishing speed.',
  },
  {
    _id: 'fish-royal-blue-betta',
    _type: 'fish',
    title: 'Royal Blue Halfmoon Betta',
    slug: { _type: 'slug', current: 'royal-blue-halfmoon-betta' },
    scientificName: 'Betta splendens',
    price: 40,
    soldAs: 'each',
    inStock: true,
    featured: true,
    waterType: 'Freshwater',
    careLevel: 'Easy',
    temperament: 'Semi-aggressive',
    diet: 'Carnivore',
    adultSizeCm: 6.5,
    sizeSold: '4.5 to 5 cm',
    minTankLitres: 20,
    waterConditions: '25 to 28 °C, pH 6.5 to 7.5',
    compatibility: 'Males must be kept solitary or with non-aggressive bottom dwellers like Nerite snails and pygmy corys.',
    description: 'Hand-selected specimen with a full 180-degree spread caudal fin in deep metallic royal blue. Quarantine-tested and vigorous.',
  },
  {
    _id: 'fish-red-turquoise-discus',
    _type: 'fish',
    title: 'Red Turquoise Discus',
    slug: { _type: 'slug', current: 'red-turquoise-discus' },
    scientificName: 'Symphysodon aequifasciatus',
    price: 280,
    soldAs: 'each',
    inStock: true,
    featured: true,
    waterType: 'Freshwater',
    careLevel: 'Advanced',
    temperament: 'Peaceful',
    diet: 'Carnivore',
    adultSizeCm: 18,
    sizeSold: '7 to 8 cm',
    minTankLitres: 250,
    waterConditions: '28 to 30 °C, pH 6.0 to 6.8',
    compatibility: 'The undisputed King of the Aquarium. Keep in small groups of 5+ in warm, pristine soft water alongside cardinal tetras and sterbai corydoras.',
    description: 'Captive-bred with high-intensity vermiculated ruby-red and iridescent cyan striations. Acclimated to conditioned Ghanaian water parameters.',
  },
  {
    _id: 'fish-lake-malawi-peacock',
    _type: 'fish',
    title: 'Lake Malawi Peacock Cichlid',
    slug: { _type: 'slug', current: 'lake-malawi-peacock-cichlid' },
    scientificName: 'Aulonocara nyassae',
    price: 65,
    soldAs: 'each',
    inStock: true,
    featured: false,
    waterType: 'Freshwater',
    careLevel: 'Moderate',
    temperament: 'Semi-aggressive',
    diet: 'Omnivore',
    adultSizeCm: 14,
    sizeSold: '6 to 7 cm',
    minTankLitres: 200,
    waterConditions: '24 to 28 °C, pH 7.8 to 8.6',
    compatibility: 'Keep in an African rift-lake setup with heavy rockwork caves. Compatible with other peacocks and docile haplochromines.',
    description: 'Radiant electric blues, yellows, and oranges reminiscent of coral reef fish. Extremely active and hearty eaters.',
  },
  {
    _id: 'fish-fancy-guppy-trio',
    _type: 'fish',
    title: 'Tuxedo Red Fancy Guppy',
    slug: { _type: 'slug', current: 'tuxedo-red-fancy-guppy' },
    scientificName: 'Poecilia reticulata',
    price: 20,
    soldAs: 'each (or 50 GHS per trio: 1M 2F)',
    inStock: true,
    featured: false,
    waterType: 'Freshwater',
    careLevel: 'Easy',
    temperament: 'Peaceful',
    diet: 'Omnivore',
    adultSizeCm: 5,
    sizeSold: '3 cm',
    minTankLitres: 30,
    waterConditions: '22 to 28 °C, pH 7.0 to 8.2',
    compatibility: 'Super-peaceful livebearer. Great for planted tanks and beginners.',
    description: 'Vigorous show-strain guppies bred locally in Ghana with flowing scarlet caudal fins and deep velvet black bodies.',
  },
  {
    _id: 'fish-clown-loach',
    _type: 'fish',
    title: 'Clown Loach',
    slug: { _type: 'slug', current: 'clown-loach' },
    scientificName: 'Chromobotia macracanthus',
    price: 120,
    soldAs: 'each',
    inStock: true,
    featured: false,
    waterType: 'Freshwater',
    careLevel: 'Moderate',
    temperament: 'Peaceful',
    diet: 'Carnivore',
    adultSizeCm: 25,
    sizeSold: '5 to 6 cm',
    minTankLitres: 300,
    waterConditions: '25 to 29 °C, pH 6.5 to 7.5',
    compatibility: 'Peaceful bottom-dweller with distinct tiger stripes and red fins. Legendary for eradicating pest snails.',
    description: 'Playful, comical schooling bottom scavengers that add tremendous vitality to medium and large display aquariums.',
  },
  {
    _id: 'fish-ocellaris-clownfish',
    _type: 'fish',
    title: 'Ocellaris Clownfish (Nemo)',
    slug: { _type: 'slug', current: 'ocellaris-clownfish' },
    scientificName: 'Amphiprion ocellaris',
    price: 185,
    soldAs: 'each',
    inStock: true,
    featured: true,
    waterType: 'Marine',
    careLevel: 'Moderate',
    temperament: 'Peaceful',
    diet: 'Omnivore',
    adultSizeCm: 9,
    sizeSold: '3.5 to 4 cm',
    minTankLitres: 80,
    waterConditions: '24 to 26 °C, salinity 1.023 to 1.025, pH 8.1 to 8.4',
    compatibility: 'Reef safe. Compatible with all peaceful marine invertebrates, corals, and gobies.',
    reefSafe: 'Yes',
    description: 'Captive-bred marine clownfish with brilliant orange bodies and crisp white bars. Readily accepts pellet feeds and thrives in reef aquariums.',
  },
  {
    _id: 'fish-yellow-tang',
    _type: 'fish',
    title: 'Hawaiian Yellow Tang',
    slug: { _type: 'slug', current: 'hawaiian-yellow-tang' },
    scientificName: 'Zebrasoma flavescens',
    price: 380,
    soldAs: 'each',
    inStock: true,
    featured: true,
    waterType: 'Marine',
    careLevel: 'Moderate',
    temperament: 'Semi-aggressive',
    diet: 'Herbivore',
    adultSizeCm: 20,
    sizeSold: '7 to 8 cm',
    minTankLitres: 350,
    waterConditions: '24 to 26 °C, salinity 1.024, pH 8.2 to 8.4',
    compatibility: 'Outstanding algae grazer. May quarrel with other zebrasoma tangs unless tank is over 500L.',
    reefSafe: 'With caution',
    description: 'The golden centerpiece of any marine reef setup. Continuously grazes microalgae from glass and live rock, maintaining a clean tank ecosystem.',
  },
];

const feedList = [
  {
    _id: 'feed-hikari-micro-pellets',
    _type: 'feed',
    title: 'Hikari Micro Pellets (45g)',
    slug: { _type: 'slug', current: 'hikari-micro-pellets-45g' },
    brand: 'Hikari',
    packSize: '45 g',
    price: 85,
    inStock: true,
    featured: true,
    foodType: 'Pellets',
    sinking: 'Slow-sinking',
    pelletSize: 'Micro (1 mm)',
    suitableFor: ['Tropical community fish', 'Tetras', 'Guppies', 'Livebearers'],
    features: ['Colour enhancing', 'High marine protein', 'Will not cloud water'],
    description: 'A scientifically formulated micro-pellet for small-mouthed tropical fish. Made in Japan with natural carotenoids for vivid coloration.',
  },
  {
    _id: 'feed-sera-discus-granules',
    _type: 'feed',
    title: 'Sera Discus Color Nature Granules (250ml)',
    slug: { _type: 'slug', current: 'sera-discus-color-nature-250ml' },
    brand: 'Sera',
    packSize: '250 ml (110 g)',
    price: 135,
    inStock: true,
    featured: true,
    foodType: 'Granules',
    sinking: 'Sinking',
    pelletSize: 'Fine (1.5 mm)',
    suitableFor: ['Cichlids', 'Discus', 'Angelfish'],
    features: ['Hematococcus algae', 'Dye & preservative free', 'Optimal digestibility'],
    description: 'Premium staple German food for demanding Discus and South American cichlids. Softens rapidly in water without disintegrating or polluting the gravel.',
  },
  {
    _id: 'feed-tetramin-flakes',
    _type: 'feed',
    title: 'TetraMin Tropical Flakes (100g)',
    slug: { _type: 'slug', current: 'tetramin-tropical-flakes-100g' },
    brand: 'Tetra',
    packSize: '100 g',
    price: 70,
    inStock: true,
    featured: false,
    foodType: 'Flakes',
    sinking: 'Floating',
    suitableFor: ['Tropical community fish'],
    features: ['BioActive formula', 'Clear water guarantee', 'Balanced nutrition'],
    description: 'The world standard tropical community flake. Packed with 40+ high-grade raw ingredients and essential prebiotics for immune resilience.',
  },
  {
    _id: 'feed-hikari-cichlid-gold',
    _type: 'feed',
    title: 'Hikari Cichlid Gold Pellets (250g)',
    slug: { _type: 'slug', current: 'hikari-cichlid-gold-250g' },
    brand: 'Hikari',
    packSize: '250 g',
    price: 145,
    inStock: true,
    featured: false,
    foodType: 'Pellets',
    sinking: 'Floating',
    pelletSize: 'Medium (3.5 mm)',
    suitableFor: ['Cichlids', 'Carnivores'],
    features: ['High protein 40%', 'Enhanced Astaxanthin', 'Floating formula'],
    description: 'Daily color-enhancing diet for larger African and American cichlids. Supports robust growth and vibrant natural colors without cloudy residue.',
  },
  {
    _id: 'feed-ocean-nutrition-marine-flakes',
    _type: 'feed',
    title: 'Ocean Nutrition Formula One Marine Flakes (70g)',
    slug: { _type: 'slug', current: 'ocean-nutrition-formula-one-70g' },
    brand: 'Ocean Nutrition',
    packSize: '70 g',
    price: 95,
    inStock: true,
    featured: false,
    foodType: 'Flakes',
    sinking: 'Floating',
    suitableFor: ['Marine fish'],
    features: ['Fresh seafood extract', 'Rich in garlic', 'Immune booster'],
    description: 'Gourmet natural seafood flake enriched with garlic and microalgae for carnivorous and omnivorous marine fish. High palatability.',
  },
];

const accessories = [
  {
    _id: 'acc-boyu-canister-filter',
    _type: 'accessory',
    title: 'BOYU External Canister Filter EF-25 (1050 L/h)',
    slug: { _type: 'slug', current: 'boyu-external-canister-filter-ef25' },
    category: 'Filtration',
    brand: 'BOYU',
    price: 850,
    inStock: true,
    featured: true,
    suitableFor: 'Tanks up to 300 litres',
    specs: [
      { label: 'Flow Rate', value: '1050 Litres/Hour' },
      { label: 'Power Consumption', value: '18 Watts' },
      { label: 'Media Baskets', value: '3 Stage Trays' },
      { label: 'Tubing Size', value: '16/22 mm' },
    ],
    whatsIncluded: ['Filter canister', 'Inlet & spray bar outlet', 'Flexible hoses', 'Bio-sponges & ceramic rings'],
    warranty: '1 year',
    description: 'Robust, whisper-quiet external canister filter. Provides mechanical, chemical, and biological filtration without occupying valuable space inside the tank.',
  },
  {
    _id: 'acc-chihiros-wrgb-ii-60',
    _type: 'accessory',
    title: 'Chihiros WRGB II LED Aquascape Luminaire 60cm',
    slug: { _type: 'slug', current: 'chihiros-wrgb-ii-led-60cm' },
    category: 'Lighting',
    brand: 'Chihiros',
    price: 1350,
    inStock: true,
    featured: true,
    suitableFor: 'Tanks 60 to 80 cm',
    specs: [
      { label: 'Luminous Flux', value: '4500 Lumens' },
      { label: 'Power', value: '67 Watts' },
      { label: 'LED Count', value: '60 full-spectrum WRGB chips' },
      { label: 'Control', value: 'Bluetooth App (Sunrise/Sunset timer)' },
    ],
    whatsIncluded: ['LED fixture', 'Adjustable stainless steel legs', 'Power supply adapter', 'Bluetooth manual'],
    warranty: '1 year',
    description: 'The golden standard lighting fixture for lush high-tech planted aquariums. Delivers extreme PAR values to penetrate deep water columns and promote vibrant red plant tones.',
  },
  {
    _id: 'acc-eheim-heater-200w',
    _type: 'accessory',
    title: 'Eheim Jäger Precision Submersible Heater 200W',
    slug: { _type: 'slug', current: 'eheim-jager-precision-heater-200w' },
    category: 'Heating and cooling',
    brand: 'Eheim',
    price: 340,
    inStock: true,
    featured: false,
    suitableFor: 'Tanks 300 to 400 litres',
    specs: [
      { label: 'Wattage', value: '200 W' },
      { label: 'Temperature Range', value: '18 to 34 °C' },
      { label: 'Glass', value: 'DURAN laboratory glass' },
    ],
    warranty: '3 years',
    description: 'Precision German engineered thermostat with thermo-safety control (auto shutoff when dry). Essential for delicate Discus and sensitive marine reefs.',
  },
  {
    _id: 'acc-seachem-prime-500ml',
    _type: 'accessory',
    title: 'Seachem Prime Complete Water Conditioner 500ml',
    slug: { _type: 'slug', current: 'seachem-prime-500ml' },
    category: 'Water care',
    brand: 'Seachem',
    price: 180,
    inStock: true,
    featured: true,
    suitableFor: 'Treats up to 20,000 litres of tap water',
    specs: [
      { label: 'Volume', value: '500 ml' },
      { label: 'Action', value: 'Removes chlorine, chloramine & detoxifies ammonia' },
      { label: 'Concentration', value: '5ml per 200L' },
    ],
    warranty: 'N/A',
    description: 'Crucial for aquarium setups in Ghana. Instantly neutralizes municipal tap water chlorine and heavy metals, detoxifying ammonia and nitrite during water changes.',
  },
  {
    _id: 'acc-ada-amazonia-soil-9l',
    _type: 'accessory',
    title: 'ADA Aqua Soil Amazonia Ver.2 (9L)',
    slug: { _type: 'slug', current: 'ada-aqua-soil-amazonia-ver2-9l' },
    category: 'Substrate and decor',
    brand: 'ADA',
    price: 460,
    inStock: true,
    featured: false,
    suitableFor: 'Freshwater planted tanks & caridina shrimp',
    specs: [
      { label: 'Volume', value: '9 Litres' },
      { label: 'Grain Size', value: '2 to 3 mm normal type' },
      { label: 'Effect', value: 'Softens water & stabilizes acidic pH 6.0' },
    ],
    description: 'The world-famous Japanese black soil substrate created by Takashi Amano. Rich in organic plant nutrients for explosive root development and crystal clear water.',
  },
  {
    _id: 'acc-api-master-test-kit',
    _type: 'accessory',
    title: 'API Freshwater Master Test Kit (800 Tests)',
    slug: { _type: 'slug', current: 'api-freshwater-master-test-kit' },
    category: 'Test kits and tools',
    brand: 'API',
    price: 290,
    inStock: true,
    featured: false,
    suitableFor: 'All freshwater aquariums and ponds',
    specs: [
      { label: 'Tests Included', value: 'pH, High Range pH, Ammonia, Nitrite, Nitrate' },
      { label: 'Test Count', value: 'Over 800 tests' },
    ],
    whatsIncluded: ['7 test solution bottles', '4 glass test tubes with caps', 'Laminated color comparison cards', 'Instructions booklet'],
    description: 'Indispensable testing kit to monitor the biological nitrogen cycle and ensure your aquarium water remains safe and toxin-free.',
  },
];

const projects = [
  {
    _id: 'project-kasoa-panoramic-curved',
    _type: 'project',
    title: 'Curved Glass Living Room Installation',
    slug: { _type: 'slug', current: 'curved-glass-living-room-installation' },
    clientType: 'Home',
    custom: true,
    tankSize: '120 x 45 x 65 cm · 350L',
    featured: true,
    summary: 'Custom bent curved-glass panoramic aquarium integrated into a private residence in East Legon. Features automated lighting cycles and a silent internal sump filtration system.',
  },
  {
    _id: 'project-kasoa-inwall-living-reef',
    _type: 'project',
    title: 'Architectural In-Wall Living Reef',
    slug: { _type: 'slug', current: 'architectural-in-wall-living-reef' },
    clientType: 'Home',
    custom: true,
    tankSize: '150 x 50 x 70 cm · 525L',
    featured: true,
    summary: 'Flush in-wall living ocean wall installation in an executive villa at East Legon. Engineered with a rear dedicated maintenance plant room, dual skimmers, and coral spectrum lighting.',
  },
  {
    _id: 'project-nature-planted-aquascape',
    _type: 'project',
    title: 'High-Tech Nature Planted Aquascape',
    slug: { _type: 'slug', current: 'high-tech-nature-planted-aquascape' },
    clientType: 'Office',
    custom: true,
    tankSize: '90 x 45 x 45 cm · 182L',
    featured: true,
    summary: 'Rimless low-iron glass housing hundreds of nano schooling fish amongst lush aquatic flora in a creative design studio in Greater Accra.',
  },
  {
    _id: 'project-lake-malawi-sanctuary',
    _type: 'project',
    title: 'Lake Malawi African Cichlid Sanctuary',
    slug: { _type: 'slug', current: 'lake-malawi-african-cichlid-sanctuary' },
    clientType: 'Home',
    custom: true,
    tankSize: '180 x 60 x 60 cm · 648L',
    featured: true,
    summary: 'Heavy limestone rockwork providing natural caves for over 40 colorful peacock cichlids in Airport Residential, Accra.',
  },
  {
    _id: 'project-corporate-oceanarium',
    _type: 'project',
    title: 'Corporate Lobby Marine Oceanarium',
    slug: { _type: 'slug', current: 'corporate-lobby-marine-oceanarium' },
    clientType: 'Office',
    custom: true,
    tankSize: '240 x 70 x 80 cm · 1340L',
    featured: true,
    summary: 'Turnkey commercial installation with automated water dosing and scheduled bi-weekly care at a corporate headquarters in Cantonments, Accra.',
  },
  {
    _id: 'project-discus-showcase',
    _type: 'project',
    title: 'Pristine Softwater Discus Showcase',
    slug: { _type: 'slug', current: 'pristine-softwater-discus-showcase' },
    clientType: 'Home',
    custom: true,
    tankSize: '160 x 55 x 65 cm · 572L',
    featured: true,
    summary: 'Manzanita driftwood hardscape with wild-type Heckel and Blue Diamond Discus specimens in East Legon, Accra.',
  },
];

const maintenancePlans = [
  {
    _id: 'plan-essential',
    _type: 'maintenancePlan',
    name: 'Essential Care',
    priceNote: 'From GHS 300 per visit',
    order: 1,
    highlighted: false,
    features: [
      '25% to 30% water change with conditioned water',
      'Internal glass algae scraping and vacuum substrate',
      'Filter cartridge inspection and media rinse',
      'Complete water parameter check (pH, Ammonia, Nitrite)',
      'Basic fish health and feeding assessment',
    ],
  },
  {
    _id: 'plan-complete',
    _type: 'maintenancePlan',
    name: 'Complete Care',
    priceNote: 'From GHS 600 per visit',
    order: 2,
    highlighted: true,
    features: [
      'Bi-weekly scheduled maintenance visits',
      'Comprehensive testing (Nitrate, Phosphate, Calcium/Magnesium for reef)',
      'Aquatic plant trimming, shaping & liquid fertilizer dosing',
      'Canister/sump pump disassembly & impeller decontamination',
      'Chemical filter media replacement (carbon, purigen)',
      'Livestock condition check with preventive disease screening',
    ],
  },
  {
    _id: 'plan-executive',
    _type: 'maintenancePlan',
    name: 'Executive Concierge',
    priceNote: 'From GHS 1,200 per visit',
    order: 3,
    highlighted: false,
    features: [
      'Weekly scheduled concierge visits',
      '24/7 priority emergency response for leaks or equipment faults',
      'All routine replacement filter media included at no extra cost',
      'Automated doser calibration & RO/DI top-off water service',
      'Livestock replacement guarantee for managed tanks',
      'Monthly water quality and ecological health report',
    ],
  },
];

const testimonials = [
  {
    _id: 'test-kwame-mensah',
    _type: 'testimonial',
    name: 'Dr. Kwame Mensah',
    role: 'Home Owner · Trassaco Valley, East Legon',
    quote: "Gabriel's team fabricated a flush in-wall 525-liter reef aquarium for our new home. The mitered glass work, silent plumbing, and automated lighting are on par with international standards.",
  },
  {
    _id: 'test-akosua-boateng',
    _type: 'testimonial',
    name: 'Akosua Boateng',
    role: 'Corporate Facilities Lead · Cantonments',
    quote: "Their bi-weekly maintenance team has managed our corporate lobby marine tank for over 18 months. The water is consistently crystal clear and visiting clients constantly stop to take photos.",
  },
  {
    _id: 'test-kofi-addo',
    _type: 'testimonial',
    name: 'Kofi Addo',
    role: 'Aquarist & Hobbyist · East Legon',
    quote: "By far the most dependable aquarium shop in Greater Accra for healthy, quarantined exotic fish. I purchased all my discus and Chihiros lights from Gabriel and received top-tier advice.",
  },
  {
    _id: 'test-sarah-osei',
    _type: 'testimonial',
    name: 'Sarah Osei-Tutu',
    role: 'Interior Architect · Airport Residential',
    quote: "Working with Gabriel on custom curved glass builds has been effortless. They understand architectural structural loads, hidden sump integration, and deliver strictly on schedule.",
  },
];

const faqs = [
  {
    _id: 'faq-delivery-accra',
    _type: 'faq',
    question: 'Do you deliver aquariums across Accra and other regions?',
    answer: 'Yes! We provide specialized white-glove aquarium transport across Greater Accra, Tema, and can arrange secure crated delivery and on-site setup anywhere in Ghana.',
    showOnHome: true,
    order: 1,
  },
  {
    _id: 'faq-custom-sizes',
    _type: 'faq',
    question: 'Can you build a custom-sized aquarium to fit my exact room layout?',
    answer: 'Absolutely. Custom builds are our specialty. Whether you need an in-wall room divider, a curved panoramic living room tank, or a large commercial oceanarium, we engineer tanks to any millimeter specification.',
    showOnHome: true,
    order: 2,
  },
  {
    _id: 'faq-whats-included',
    _type: 'faq',
    question: 'What is included in a custom aquarium build package?',
    answer: 'Our turnkey packages typically include the low-iron glass tank, structural welded steel or marine-ply cabinet, LED lighting luminaire, silent sump or canister filtration system, plumbing, and complete installation.',
    showOnHome: true,
    order: 3,
  },
  {
    _id: 'faq-maintenance-frequency',
    _type: 'faq',
    question: 'How often should an aquarium receive routine maintenance?',
    answer: 'For freshwater tanks, bi-weekly or monthly maintenance keeps biological waste balanced and glass crystal clean. High-density cichlid setups and marine coral reefs benefit most from bi-weekly or weekly scheduled care.',
    showOnHome: true,
    order: 4,
  },
  {
    _id: 'faq-fish-quarantine',
    _type: 'faq',
    question: 'Are your ornamental fish quarantined before being sold?',
    answer: 'Yes. All incoming fish undergo a strict quarantine and conditioning protocol in our facility to ensure they are parasite-free, actively eating, and acclimated to local water conditions before sale.',
    showOnHome: true,
    order: 5,
  },
  {
    _id: 'faq-warranty-glass',
    _type: 'faq',
    question: 'Do you provide warranties on your custom-built aquariums?',
    answer: 'Yes. All our custom glass tanks carry a minimum 2 to 5-year structural silicone seal warranty against seam failure and leaks.',
    showOnHome: false,
    order: 6,
  },
  {
    _id: 'faq-water-ghana',
    _type: 'faq',
    question: 'What water conditioning do you recommend for tap water in Ghana?',
    answer: 'We recommend treating all municipal tap water with Seachem Prime to instantly neutralize chlorine, chloramine, and heavy metals. For delicate species like Discus and saltwater corals, we supply purified RO/DI water.',
    showOnHome: false,
    order: 7,
  },
  {
    _id: 'faq-consultation-process',
    _type: 'faq',
    question: 'How do I book a consultation for a custom aquarium?',
    answer: 'You can message us directly on WhatsApp at +233 24 938 4800 or submit our online Custom Tank inquiry form. We provide free initial phone consultations and can visit your site for structural measurements.',
    showOnHome: false,
    order: 8,
  },
];

const galleryDocs = [
  {
    _id: 'gallery-kasoa-curved-panoramic',
    _type: 'gallery',
    title: 'Curved Glass Living Room Installation',
    slug: { _type: 'slug', current: 'curved-glass-living-room-installation' },
    mediaType: 'image',
    tags: ['tanks', 'custom-builds'],
    description: 'Heat-bent seamless curved corner glass fabricated in our workshop for a private villa in East Legon.',
    showOnHome: true,
    showInHero: true,
    featured: true,
    order: 1,
  },
  {
    _id: 'gallery-coral-reef-motion',
    _type: 'gallery',
    title: 'Acropora Reef Ecosystem in Motion',
    slug: { _type: 'slug', current: 'acropora-reef-ecosystem-in-motion' },
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/43527/43527-720.mp4',
    tags: ['marine', 'fish'],
    description: 'Vibrant living reef motion showing clownfish, acropora corals, and sea anemones.',
    showOnHome: true,
    showInHero: true,
    featured: true,
    order: 2,
  },
  {
    _id: 'gallery-discus-softwater',
    _type: 'gallery',
    title: 'Red Turquoise Discus Softwater Biotope',
    slug: { _type: 'slug', current: 'red-turquoise-discus-softwater-biotope' },
    mediaType: 'image',
    tags: ['fish', 'freshwater'],
    description: 'Acclimated Heckel and Red Turquoise discus in an Amazonian driftwood aquascape.',
    showOnHome: true,
    showInHero: true,
    featured: true,
    order: 3,
  },
  {
    _id: 'gallery-kasoa-inwall-reef',
    _type: 'gallery',
    title: 'Architectural In-Wall Living Reef',
    slug: { _type: 'slug', current: 'architectural-in-wall-living-reef' },
    mediaType: 'image',
    tags: ['tanks', 'custom-builds', 'marine'],
    description: 'Flush in-wall living reef installation with rear filtration plant room in an executive villa at East Legon.',
    showOnHome: true,
    showInHero: true,
    featured: true,
    order: 4,
  },
  {
    _id: 'gallery-tropical-school-video',
    _type: 'gallery',
    title: 'Schooling Marine Fish Ambient Loop',
    slug: { _type: 'slug', current: 'schooling-marine-fish-ambient-loop' },
    mediaType: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/24128/24128-720.mp4',
    tags: ['marine', 'fish'],
    description: 'High-definition underwater loop of schooling marine tangs and anthias swimming gracefully.',
    showOnHome: true,
    showInHero: true,
    featured: true,
    order: 5,
  },
  {
    _id: 'gallery-iwagumi-stone',
    _type: 'gallery',
    title: 'Nature Planted Aquascape with Iwagumi Stones',
    slug: { _type: 'slug', current: 'nature-planted-aquascape-iwagumi' },
    mediaType: 'image',
    tags: ['freshwater', 'tanks'],
    description: 'Seiryu stone layout with vibrant Monte Carlo carpet in Airport Residential, Accra.',
    showOnHome: true,
    showInHero: true,
    featured: true,
    order: 6,
  },
  {
    _id: 'gallery-malawi-cichlids',
    _type: 'gallery',
    title: 'Lake Malawi African Cichlid Sanctuary',
    slug: { _type: 'slug', current: 'lake-malawi-african-cichlid-sanctuary' },
    mediaType: 'image',
    tags: ['fish', 'freshwater'],
    description: 'Vivid metallic peacock cichlids in a limestone rockwork setup.',
    showOnHome: true,
    showInHero: true,
    featured: true,
    order: 7,
  },
  {
    _id: 'gallery-kasoa-nature-haven',
    _type: 'gallery',
    title: 'High-Tech Nature Botanical Aquascape',
    slug: { _type: 'slug', current: 'high-tech-nature-botanical-aquascape' },
    mediaType: 'image',
    tags: ['tanks', 'custom-builds', 'freshwater'],
    description: 'Rimless low-iron botanical aquarium with German structural silicone joints.',
    showOnHome: true,
    showInHero: true,
    featured: true,
    order: 8,
  },
  {
    _id: 'gallery-neon-tetras',
    _type: 'gallery',
    title: 'Schooling Neon Tetras in Riverbed Flora',
    slug: { _type: 'slug', current: 'schooling-neon-tetras-riverbed' },
    mediaType: 'image',
    tags: ['fish', 'freshwater'],
    description: 'Healthy community tank with over 80 schooling tetras moving in synchrony.',
    showOnHome: true,
    showInHero: false,
    featured: false,
    order: 9,
  },
  {
    _id: 'gallery-halfmoon-betta',
    _type: 'gallery',
    title: 'Royal Blue Halfmoon Betta Specimen',
    slug: { _type: 'slug', current: 'royal-blue-halfmoon-betta-specimen' },
    mediaType: 'image',
    tags: ['fish', 'freshwater'],
    description: 'Show-grade Betta splendens with full 180-degree caudal fin spread.',
    showOnHome: true,
    showInHero: false,
    featured: false,
    order: 10,
  },
  {
    _id: 'gallery-living-room-centerpiece',
    _type: 'gallery',
    title: 'Living Room Centerpiece Aquarium',
    slug: { _type: 'slug', current: 'living-room-centerpiece-aquarium' },
    mediaType: 'image',
    tags: ['tanks', 'custom-builds'],
    description: 'Custom timber stand with rimless low-iron display and integrated lighting luminaire.',
    showOnHome: true,
    showInHero: false,
    featured: false,
    order: 11,
  },
  {
    _id: 'gallery-yellow-tang',
    _type: 'gallery',
    title: 'Hawaiian Yellow Tang Grazer',
    slug: { _type: 'slug', current: 'hawaiian-yellow-tang-grazer' },
    mediaType: 'image',
    tags: ['fish', 'marine'],
    description: 'Vibrant yellow tang active algae grazer in live coral setup.',
    showOnHome: true,
    showInHero: false,
    featured: false,
    order: 12,
  },
];

const allDocuments = [
  siteSettingsDoc,
  ...banners,
  ...tanks,
  ...fishList,
  ...feedList,
  ...accessories,
  ...projects,
  ...maintenancePlans,
  ...testimonials,
  ...faqs,
  ...galleryDocs,
];

async function main() {
  console.log("==========================================");
  console.log(" Gabriel's Aquarium - Sanity Seeder");
  console.log("==========================================");
  console.log(`Project ID: ${projectId}`);
  console.log(`Dataset:    ${dataset}`);
  console.log(`Total Docs: ${allDocuments.length}`);
  console.log("------------------------------------------");

  // If user requested NDJSON export
  if (isExportNdjson) {
    const outputPath = path.resolve(process.cwd(), 'seed-data.ndjson');
    const ndjsonContent = allDocuments.map((doc) => JSON.stringify(doc)).join('\n') + '\n';
    fs.writeFileSync(outputPath, ndjsonContent, 'utf-8');
    console.log(` Exported ${allDocuments.length} documents to seed-data.ndjson`);
    console.log(` You can now import with Sanity CLI:`);
    console.log(`   npx sanity dataset import seed-data.ndjson ${dataset} --replace`);
    return;
  }

  // Dry run mode
  if (isDryRun) {
    console.log(" [DRY RUN] Generated document summary:");
    const typeCounts: Record<string, number> = {};
    for (const doc of allDocuments) {
      typeCounts[doc._type] = (typeCounts[doc._type] || 0) + 1;
    }
    for (const [type, count] of Object.entries(typeCounts)) {
      console.log(` - ${type.padEnd(18)} : ${count} documents`);
    }
    console.log("\nDry run completed successfully. No remote changes made.");
    return;
  }

  // If token is missing, provide clear guidance
  if (!token) {
    console.warn("⚠️  NOTICE: No Sanity Write Token found in environment or .env.local.");
    console.warn("   Looked for: SANITY_API_WRITE_TOKEN, SANITY_API_TOKEN, SANITY_AUTH_TOKEN\n");
    console.log("You have two simple options to complete the seed:");
    console.log("------------------------------------------------------------------");
    console.log("OPTION 1: (Easiest with CLI session)");
    console.log("  Export to ndjson and import via Sanity CLI:");
    console.log("    bun run scripts/seed.ts --export-ndjson");
    console.log(`    npx sanity dataset import seed-data.ndjson ${dataset} --replace\n`);
    console.log("OPTION 2: (Direct API Token)");
    console.log("  1. Open https://www.sanity.io/manage/project/" + projectId + "/api#tokens");
    console.log("  2. Click 'Add API token', give it 'Editor' or 'Contributor' permissions");
    console.log("  3. Add this line to your .env.local file:");
    console.log("     SANITY_API_WRITE_TOKEN=your_token_here");
    console.log("  4. Rerun: bun run seed\n");

    // Automatically export seed-data.ndjson so the user immediately has it ready!
    const outputPath = path.resolve(process.cwd(), 'seed-data.ndjson');
    const ndjsonContent = allDocuments.map((doc) => JSON.stringify(doc)).join('\n') + '\n';
    fs.writeFileSync(outputPath, ndjsonContent, 'utf-8');
    console.log(`✨ We also automatically generated seed-data.ndjson for you in your project root!`);
    return;
  }

  // With token, seed directly via Sanity Client
  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2025-01-01',
    token,
    useCdn: false,
  });

  console.log("🚀 Pushing documents to Sanity dataset via API token...");

  let successCount = 0;
  for (const doc of allDocuments) {
    try {
      await client.createOrReplace(doc as any);
      successCount++;
      process.stdout.write(`\r  [${successCount}/${allDocuments.length}] Seeded: ${doc._type} (${doc._id})`);
    } catch (err: any) {
      console.error(`\n❌ Error creating ${doc._id}:`, err?.message || err);
    }
  }

  console.log(`\n\n🎉 Done! Successfully seeded ${successCount} documents to Sanity!`);
}

main().catch((err) => {
  console.error("Fatal seed error:", err);
  process.exit(1);
});
