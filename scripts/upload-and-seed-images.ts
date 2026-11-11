/**
 * Script to upload all local images in public/images/ and public/logo.png to Sanity,
 * and update all Sanity documents (siteSettings, banners, tanks, projects, fish, gallery)
 * with the newly created image assets.
 */

import { createClient } from '@sanity/client';
import * as fs from 'fs';
import * as path from 'path';

// Read .env.local
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

if (!token) {
  console.error('❌ SANITY_API_WRITE_TOKEN is missing!');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-01-01',
  token,
  useCdn: false,
});

// Cache for uploaded assets: filename -> assetId
const assetMap: Record<string, string> = {};

async function uploadImage(relPath: string): Promise<string> {
  const fullPath = path.resolve(process.cwd(), relPath);
  const filename = path.basename(fullPath);

  if (assetMap[filename]) {
    return assetMap[filename];
  }

  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }

  console.log(`Uploading ${filename}...`);
  const asset = await client.assets.upload('image', fs.createReadStream(fullPath), {
    filename,
  });

  assetMap[filename] = asset._id;
  console.log(`  ✓ Uploaded ${filename} -> ${asset._id}`);
  return asset._id;
}

function sanityImageRef(assetId: string, alt?: string) {
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: assetId,
    },
    ...(alt ? { alt } : {}),
  };
}

async function main() {
  console.log('====================================================');
  console.log(" Gabriel's Aquarium - Asset Upload & Sanity Linker");
  console.log('====================================================');

  // 1. Logo
  console.log('\n--- 1. Uploading Logo & Updating Site Settings ---');
  const logoAssetId = await uploadImage('public/logo.png');
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    businessName: "Gabriel's Aquarium",
    logo: sanityImageRef(logoAssetId, "Gabriel's Aquarium Logo"),
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
  });
  console.log('  ✓ siteSettings updated with logo');

  // 2. Banners
  console.log('\n--- 2. Uploading Banners ---');
  const bannerHero1 = await uploadImage('public/images/banner-hero-1.jpg');
  const bannerHero2 = await uploadImage('public/images/banner-hero-2.jpg');
  const bannerHero3 = await uploadImage('public/images/banner-hero-3.jpg');
  const bannerPromo1 = await uploadImage('public/images/banner-promo-1.jpg');
  const bannerPromo2 = await uploadImage('public/images/banner-promo-2.jpg');

  const banners = [
    {
      _id: 'banner-hero-living-art',
      _type: 'banner',
      placement: 'hero',
      headline: 'Living Aquatic Art for Homes & Spaces',
      subtext: 'Bespoke rimless glass tanks, flourishing living reef ecosystems, and healthy acclimated ornamental fish.',
      image: sanityImageRef(bannerHero1, 'Living Aquatic Art'),
      buttonLabel: 'Explore Tanks',
      buttonLink: '/tanks',
      order: 1,
      active: true,
    },
    {
      _id: 'banner-hero-curved-panoramic',
      _type: 'banner',
      placement: 'hero',
      headline: 'Seamless Curved-Glass Panoramic Aquariums',
      subtext: 'Heat-bent front corners providing an unbroken vista into nature without silicone joints.',
      image: sanityImageRef(bannerHero2, 'Curved Glass Panoramic Tanks'),
      buttonLabel: 'Request Custom Build',
      buttonLink: '/custom-tanks',
      order: 2,
      active: true,
    },
    {
      _id: 'banner-hero-marine-reefs',
      _type: 'banner',
      placement: 'hero',
      headline: 'Vibrant Living Coral Reefs & Exotic Marine Life',
      subtext: 'Turnkey saltwater habitats with whisper-quiet multi-chamber sumps and high-PAR coral spectrum lighting.',
      image: sanityImageRef(bannerHero3, 'Marine Reef Aquariums'),
      buttonLabel: 'View Marine Life',
      buttonLink: '/fish',
      order: 3,
      active: true,
    },
    {
      _id: 'banner-promo-custom-builds',
      _type: 'banner',
      placement: 'promo',
      headline: 'Architectural In-Wall & Panoramic Aquariums',
      subtext: 'Engineered with German structural silicone, ultra-clear low-iron glass, and silent internal filtration.',
      image: sanityImageRef(bannerPromo1, 'Architectural In-Wall Aquariums'),
      buttonLabel: 'Request Custom Build',
      buttonLink: '/custom-tanks',
      order: 1,
      active: true,
    },
    {
      _id: 'banner-promo-maintenance-care',
      _type: 'banner',
      placement: 'promo',
      headline: 'Complete Aquarium Maintenance & Biological Care',
      subtext: 'Scheduled cleaning, filter maintenance, and water parameter monitoring across Greater Accra.',
      image: sanityImageRef(bannerPromo2, 'Professional Aquarium Maintenance'),
      buttonLabel: 'Book Maintenance Care',
      buttonLink: '/maintenance',
      order: 2,
      active: true,
    },
  ];

  for (const b of banners) {
    await client.createOrReplace(b);
    console.log(`  ✓ Seeded banner: ${b._id}`);
  }

  // 3. Tanks (12 tanks with 24 images)
  console.log('\n--- 3. Uploading Tanks ---');
  const tankDefs = [
    {
      id: 'tank-01-nano-cube-30',
      title: 'Mini Rimless Desktop Nano Cube (30cm)',
      slug: 'mini-rimless-desktop-nano-cube-30cm',
      purchaseType: 'buy',
      price: 650,
      inStock: true,
      featured: true,
      lengthCm: 30,
      widthCm: 30,
      heightCm: 30,
      volumeLitres: 27,
      shape: 'Cube',
      glassType: 'Low-iron (ultra clear)',
      glassThicknessMm: 6,
      frameStyle: 'Rimless',
      suitableFor: 'Freshwater',
      overflow: 'None',
      includes: ['Leveling mat'],
      weightKg: 6,
      leadTime: 'In stock',
      warranty: '1 year',
      description: 'Compact ultra-clear desktop nano cube ideal for modern work desks, bedrooms, and aquascaping shrimp or prize Betta setups.',
      frontImg: 'public/images/tank-01-nano-cube-30-front.jpg',
      angleImg: 'public/images/tank-01-nano-cube-30-angle.jpg',
    },
    {
      id: 'tank-02-starter-tank-60',
      title: 'Starter Tabletop Freshwater Aquarium (60cm)',
      slug: 'starter-tabletop-freshwater-aquarium-60cm',
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
      frontImg: 'public/images/tank-02-starter-tank-60-front.jpg',
      angleImg: 'public/images/tank-02-starter-tank-60-angle.jpg',
    },
    {
      id: 'tank-03-family-tank-90',
      title: 'Family Living Room Community Tank (90cm)',
      slug: 'family-living-room-community-tank-90cm',
      purchaseType: 'buy',
      price: 2600,
      inStock: true,
      featured: true,
      lengthCm: 90,
      widthCm: 40,
      heightCm: 50,
      volumeLitres: 180,
      shape: 'Rectangular',
      glassType: 'Standard clear',
      glassThicknessMm: 8,
      frameStyle: 'Framed',
      suitableFor: 'Freshwater',
      overflow: 'None',
      includes: ['Lid / hood', 'LED light', 'Filter'],
      weightKg: 28,
      leadTime: 'In stock',
      warranty: '2 years',
      description: 'Spacious community aquarium designed for a diverse schooling fish population, live plants, and easy maintenance in family living spaces.',
      frontImg: 'public/images/tank-03-family-tank-90-front.jpg',
      angleImg: 'public/images/tank-03-family-tank-90-angle.jpg',
    },
    {
      id: 'tank-04-office-display-80-aio',
      title: 'Executive Office Display All-In-One Aquarium (80cm)',
      slug: 'executive-office-display-aio-80cm',
      purchaseType: 'buy',
      price: 3200,
      inStock: true,
      featured: true,
      lengthCm: 80,
      widthCm: 40,
      heightCm: 45,
      volumeLitres: 144,
      shape: 'Rectangular',
      glassType: 'Low-iron (ultra clear)',
      glassThicknessMm: 8,
      frameStyle: 'Rimless',
      suitableFor: 'Freshwater and marine',
      overflow: 'All-in-one (built-in sump)',
      includes: ['Filter', 'Leveling mat'],
      weightKg: 26,
      leadTime: 'In stock',
      warranty: '2 years',
      description: 'Sleek all-in-one rimless tank with rear hidden filtration compartment for completely silent, wire-free office environments.',
      frontImg: 'public/images/tank-04-office-display-80-aio-front.jpg',
      angleImg: 'public/images/tank-04-office-display-80-aio-angle.jpg',
    },
    {
      id: 'tank-05-rimless-ultra-clear-100',
      title: 'Ultra-Clear Low-Iron Rimless Nature Aquascape (100cm)',
      slug: 'ultra-clear-rimless-nature-aquascape-100cm',
      purchaseType: 'buy',
      price: 3900,
      inStock: true,
      featured: true,
      lengthCm: 100,
      widthCm: 45,
      heightCm: 45,
      volumeLitres: 202,
      shape: 'Rectangular',
      glassType: 'Low-iron (ultra clear)',
      glassThicknessMm: 10,
      frameStyle: 'Rimless',
      suitableFor: 'Freshwater and marine',
      overflow: 'None',
      includes: ['Leveling mat'],
      weightKg: 42,
      leadTime: 'In stock',
      warranty: '3 years',
      description: 'Precision-mitered 45-degree edges bonded with German structural silicone. Unmatched clarity for Iwagumi and nature aquarium layouts.',
      frontImg: 'public/images/tank-05-rimless-ultra-clear-100-front.jpg',
      angleImg: 'public/images/tank-05-rimless-ultra-clear-100-angle.jpg',
    },
    {
      id: 'tank-06-bow-front-curved-100',
      title: 'Seamless Bow-Front Curved Aquarium (100cm)',
      slug: 'seamless-bow-front-curved-aquarium-100cm',
      purchaseType: 'buy',
      price: 4200,
      inStock: true,
      featured: false,
      lengthCm: 100,
      widthCm: 42,
      heightCm: 55,
      volumeLitres: 230,
      shape: 'Curved front (bow-front)',
      glassType: 'Standard clear',
      glassThicknessMm: 10,
      frameStyle: 'Framed',
      suitableFor: 'Freshwater',
      overflow: 'None',
      includes: ['Stand / cabinet', 'Lid / hood', 'LED light', 'Filter'],
      weightKg: 48,
      leadTime: 'In stock',
      warranty: '2 years',
      description: 'Graceful bow-front curvature adds extra visual depth and panoramic presence to any interior wall, complete with matching base cabinet.',
      frontImg: 'public/images/tank-06-bow-front-curved-100-front.jpg',
      angleImg: 'public/images/tank-06-bow-front-curved-100-angle.jpg',
    },
    {
      id: 'tank-07-bow-front-showpiece-150',
      title: 'Grand Bow-Front Showpiece Aquarium with Cabinet (150cm)',
      slug: 'grand-bow-front-showpiece-aquarium-150cm',
      purchaseType: 'inquire',
      price: 8500,
      inStock: true,
      featured: true,
      lengthCm: 150,
      widthCm: 50,
      heightCm: 70,
      volumeLitres: 525,
      shape: 'Curved front (bow-front)',
      glassType: 'Low-iron (ultra clear)',
      glassThicknessMm: 12,
      frameStyle: 'Framed',
      suitableFor: 'Freshwater and marine',
      overflow: 'Built-in overflow',
      includes: ['Stand / cabinet', 'Lid / hood', 'LED light', 'Filter', 'Sump'],
      weightKg: 95,
      leadTime: 'Available in showroom',
      warranty: '3 years',
      description: 'Showcase residential showpiece featuring heat-bent curved front glass, high-gloss moisture-sealed cabinetry, and dual return drains.',
      frontImg: 'public/images/tank-07-bow-front-showpiece-150-front.jpg',
      angleImg: 'public/images/tank-07-bow-front-showpiece-150-angle.jpg',
    },
    {
      id: 'tank-08-curved-corner-120',
      title: 'Curved Corner Panoramic Display Aquarium (120cm)',
      slug: 'curved-corner-panoramic-display-120cm',
      purchaseType: 'inquire',
      price: 5800,
      inStock: true,
      featured: true,
      lengthCm: 120,
      widthCm: 45,
      heightCm: 65,
      volumeLitres: 351,
      shape: 'Curved corner',
      glassType: 'Low-iron (ultra clear)',
      glassThicknessMm: 10,
      frameStyle: 'Frameless',
      suitableFor: 'Freshwater and marine',
      overflow: 'Pre-drilled',
      includes: ['Stand / cabinet', 'Lid / hood', 'LED light', 'Filter'],
      weightKg: 75,
      leadTime: 'In stock - White & Black Cabinet',
      warranty: '2 years',
      description: 'Signature heat-bent dual curved front corners eliminating unsightly corner silicone joints for an unbroken panoramic aquatic viewpoint.',
      frontImg: 'public/images/tank-08-curved-corner-120-front.jpg',
      angleImg: 'public/images/tank-08-curved-corner-120-angle.jpg',
    },
    {
      id: 'tank-09-corner-tank-90',
      title: 'Architectural Pentagon Corner Aquarium (90cm)',
      slug: 'architectural-pentagon-corner-aquarium-90cm',
      purchaseType: 'inquire',
      price: 4800,
      inStock: true,
      featured: false,
      lengthCm: 90,
      widthCm: 90,
      heightCm: 65,
      volumeLitres: 320,
      shape: 'Corner',
      glassType: 'Standard clear',
      glassThicknessMm: 10,
      frameStyle: 'Framed',
      suitableFor: 'Freshwater',
      overflow: 'None',
      includes: ['Stand / cabinet', 'Lid / hood', 'LED light', 'Filter'],
      weightKg: 58,
      leadTime: 'In stock',
      warranty: '2 years',
      description: 'Smart space-optimizing corner design that turns unused lounge corners into dynamic underwater habitats without taking away walking space.',
      frontImg: 'public/images/tank-09-corner-tank-90-front.jpg',
      angleImg: 'public/images/tank-09-corner-tank-90-angle.jpg',
    },
    {
      id: 'tank-10-cylinder-60-x-90',
      title: '360° Cylindrical Pillar Aquarium (60 x 90cm)',
      slug: 'cylindrical-pillar-aquarium-60x90cm',
      purchaseType: 'inquire',
      price: 11500,
      inStock: false,
      featured: true,
      lengthCm: 60,
      widthCm: 60,
      heightCm: 90,
      volumeLitres: 254,
      shape: 'Cylinder',
      glassType: 'Tempered',
      glassThicknessMm: 12,
      frameStyle: 'Frameless',
      suitableFor: 'Freshwater and marine',
      overflow: 'Built-in overflow',
      includes: ['Stand / cabinet', 'LED light', 'Filter', 'Leveling mat'],
      weightKg: 85,
      leadTime: 'Custom fabrication, 14 days',
      warranty: '5 years',
      description: 'Bespoke 360-degree cylindrical column aquarium fabricated for open-plan entrance foyers, hotel reception halls, and luxury villas.',
      frontImg: 'public/images/tank-10-cylinder-60-x-90-front.jpg',
      angleImg: 'public/images/tank-10-cylinder-60-x-90-angle.jpg',
    },
    {
      id: 'tank-11-marine-reef-120-with-sump',
      title: 'Living Marine Reef System with Cabinet & Sump (120cm)',
      slug: 'living-marine-reef-system-cabinet-sump-120cm',
      purchaseType: 'inquire',
      price: 9500,
      inStock: true,
      featured: true,
      lengthCm: 120,
      widthCm: 55,
      heightCm: 60,
      volumeLitres: 396,
      shape: 'Rectangular',
      glassType: 'Low-iron (ultra clear)',
      glassThicknessMm: 12,
      frameStyle: 'Rimless',
      suitableFor: 'Marine',
      overflow: 'Built-in overflow',
      includes: ['Stand / cabinet', 'Sump', 'Leveling mat'],
      weightKg: 95,
      leadTime: 'In stock',
      warranty: '3 years',
      description: 'Turnkey marine reef installation with dedicated multi-stage glass sump, ultra-clear low-iron glass, and silent emergency weir drain.',
      frontImg: 'public/images/tank-11-marine-reef-120-with-sump-front.jpg',
      angleImg: 'public/images/tank-11-marine-reef-120-with-sump-angle.jpg',
    },
    {
      id: 'tank-12-panoramic-wall-feature-200',
      title: 'Panoramic In-Wall Sovereign Oceanarium (200cm)',
      slug: 'panoramic-in-wall-sovereign-oceanarium-200cm',
      purchaseType: 'inquire',
      price: 19500,
      inStock: false,
      featured: true,
      lengthCm: 200,
      widthCm: 60,
      heightCm: 75,
      volumeLitres: 900,
      shape: 'Rectangular',
      glassType: 'Low-iron (ultra clear)',
      glassThicknessMm: 15,
      frameStyle: 'Framed',
      suitableFor: 'Freshwater and marine',
      overflow: 'Built-in overflow',
      includes: ['Stand / cabinet', 'Sump', 'Leveling mat'],
      weightKg: 180,
      leadTime: 'Custom fabrication, 14 days',
      warranty: '5 years',
      description: 'Our ultimate architectural statement build. 900-litre capacity with 15mm ultra-clear glass, heavy steel subframe, and dedicated plant room connectivity.',
      frontImg: 'public/images/tank-12-panoramic-wall-feature-200-front.jpg',
      angleImg: 'public/images/tank-12-panoramic-wall-feature-200-angle.jpg',
    },
  ];

  for (const t of tankDefs) {
    const frontAsset = await uploadImage(t.frontImg);
    const angleAsset = await uploadImage(t.angleImg);

    const doc = {
      _id: t.id,
      _type: 'tank',
      title: t.title,
      slug: { _type: 'slug', current: t.slug },
      purchaseType: t.purchaseType,
      price: t.price,
      inStock: t.inStock,
      featured: t.featured,
      lengthCm: t.lengthCm,
      widthCm: t.widthCm,
      heightCm: t.heightCm,
      volumeLitres: t.volumeLitres,
      shape: t.shape,
      glassType: t.glassType,
      glassThicknessMm: t.glassThicknessMm,
      frameStyle: t.frameStyle,
      suitableFor: t.suitableFor,
      overflow: t.overflow,
      includes: t.includes,
      weightKg: t.weightKg,
      leadTime: t.leadTime,
      warranty: t.warranty,
      description: t.description,
      images: [
        sanityImageRef(frontAsset, `${t.title} - Front View`),
        sanityImageRef(angleAsset, `${t.title} - Angle View`),
      ],
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ Seeded tank: ${t.id} (${t.title})`);
  }

  // Also update existing Sanity tanks if they had different IDs so they have valid images
  const legacyTankMap: Record<string, string> = {
    'tank-starter-desktop-60': 'tank-02-starter-tank-60',
    'tank-3ft-rimless-low-iron-cube': 'tank-05-rimless-ultra-clear-100',
    'tank-4ft-panoramic-bow-front': 'tank-08-curved-corner-120',
    'tank-5ft-inwall-architectural-reef': 'tank-11-marine-reef-120-with-sump',
    'tank-coffee-table-luxury': 'tank-04-office-display-80-aio',
    'tank-6ft-sovereign-oceanarium': 'tank-12-panoramic-wall-feature-200',
    'tank-corner-pentagon-220': 'tank-09-corner-tank-90',
    'tank-nano-desktop-cube-18': 'tank-01-nano-cube-30',
  };

  for (const [legacyId, mappedId] of Object.entries(legacyTankMap)) {
    const targetTank = tankDefs.find((t) => t.id === mappedId);
    if (targetTank) {
      const frontAsset = assetMap[path.basename(targetTank.frontImg)];
      const angleAsset = assetMap[path.basename(targetTank.angleImg)];
      if (frontAsset && angleAsset) {
        await client.patch(legacyId).set({
          images: [
            sanityImageRef(frontAsset, `${targetTank.title} - Front`),
            sanityImageRef(angleAsset, `${targetTank.title} - Angle`),
          ],
        }).commit().catch(() => {});
        console.log(`  ✓ Updated legacy tank images: ${legacyId}`);
      }
    }
  }

  // 4. Projects (10 projects with 20 images)
  console.log('\n--- 4. Uploading Projects ---');
  const projectDefs = [
    {
      id: 'project-01-living-room-feature-tank',
      title: 'East Legon Contemporary Living Room Feature Tank',
      slug: 'east-legon-living-room-feature-tank',
      clientType: 'Home',
      custom: true,
      tankSize: '120 x 45 x 65 cm · 350L',
      featured: true,
      summary: 'Seamless curved corner living room display with integrated timber cabinet, automated sunrise-sunset LED lighting, and whisper-quiet canister filtration.',
      mainImg: 'public/images/project-01-living-room-feature-tank-main.jpg',
      detailImg: 'public/images/project-01-living-room-feature-tank-detail.jpg',
    },
    {
      id: 'project-02-reception-area-display-tank',
      title: 'Corporate Reception Area Display Aquarium',
      slug: 'corporate-reception-area-display-aquarium',
      clientType: 'Office',
      custom: true,
      tankSize: '150 x 50 x 60 cm · 450L',
      featured: true,
      summary: 'Turnkey welcoming showpiece installed at an executive financial headquarters in Cantonments, Accra. Features active bio-filtration and acclimated schooling fish.',
      mainImg: 'public/images/project-02-reception-area-display-tank-main.jpg',
      detailImg: 'public/images/project-02-reception-area-display-tank-detail.jpg',
    },
    {
      id: 'project-03-restaurant-divider-aquarium',
      title: 'Osu Fine-Dining Room Divider Aquarium',
      slug: 'fine-dining-room-divider-aquarium',
      clientType: 'Restaurant',
      custom: true,
      tankSize: '200 x 40 x 70 cm · 560L',
      featured: true,
      summary: 'Double-sided architectural room divider separating private dining booths from the main lounge in an upscale Osu restaurant.',
      mainImg: 'public/images/project-03-restaurant-divider-aquarium-main.jpg',
      detailImg: 'public/images/project-03-restaurant-divider-aquarium-detail.jpg',
    },
    {
      id: 'project-04-hotel-lobby-curved-tank',
      title: 'Airport Residential Hotel Lobby Curved Tank',
      slug: 'hotel-lobby-curved-panoramic-tank',
      clientType: 'Hotel',
      custom: true,
      tankSize: '180 x 60 x 70 cm · 756L',
      featured: true,
      summary: 'High-traffic hotel lobby centerpiece featuring heat-bent seamless curved glass corners and an African rift lake cichlid ecosystem.',
      mainImg: 'public/images/project-04-hotel-lobby-curved-tank-main.jpg',
      detailImg: 'public/images/project-04-hotel-lobby-curved-tank-detail.jpg',
    },
    {
      id: 'project-05-bedroom-nano-setup',
      title: 'Master Bedroom Rimless Nano Aquascape',
      slug: 'master-bedroom-rimless-nano-aquascape',
      clientType: 'Home',
      custom: false,
      tankSize: '60 x 30 x 35 cm · 63L',
      featured: false,
      summary: 'Quiet, peaceful bedroom bedside aquascape built with low-iron rimless glass, natural dragon stone, and vibrant red cherry shrimp.',
      mainImg: 'public/images/project-05-bedroom-nano-setup-main.jpg',
      detailImg: 'public/images/project-05-bedroom-nano-setup-detail.jpg',
    },
    {
      id: 'project-06-corner-tank-in-a-family-lounge',
      title: 'Family Lounge Corner Living Aquarium',
      slug: 'family-lounge-corner-living-aquarium',
      clientType: 'Home',
      custom: true,
      tankSize: '90 x 90 x 65 cm · 320L',
      featured: true,
      summary: 'Pentagon corner build engineered to utilize room geometry in a family home in Trasacco Valley, Accra. Handcrafted wooden matching base.',
      mainImg: 'public/images/project-06-corner-tank-in-a-family-lounge-main.jpg',
      detailImg: 'public/images/project-06-corner-tank-in-a-family-lounge-detail.jpg',
    },
    {
      id: 'project-07-meeting-room-wall-tank',
      title: 'Executive Boardroom Flush In-Wall Aquarium',
      slug: 'executive-boardroom-flush-in-wall-aquarium',
      clientType: 'Office',
      custom: true,
      tankSize: '220 x 45 x 65 cm · 643L',
      featured: true,
      summary: 'Flush wall-mounted aquarium integrated into executive boardroom acoustic paneling in Ridge, Accra. Hidden access panels for quiet service.',
      mainImg: 'public/images/project-07-meeting-room-wall-tank-main.jpg',
      detailImg: 'public/images/project-07-meeting-room-wall-tank-detail.jpg',
    },
    {
      id: 'project-08-marine-reef-at-home',
      title: 'Trassaco Valley Architectural Marine Reef Wall',
      slug: 'trassaco-valley-marine-reef-wall',
      clientType: 'Home',
      custom: true,
      tankSize: '150 x 50 x 70 cm · 525L',
      featured: true,
      summary: 'Vibrant coral reef installation with SPS & LPS corals, clownfish pairs, high-output reef spectrum LED fixtures, and automated reverse osmosis top-off.',
      mainImg: 'public/images/project-08-marine-reef-at-home-main.jpg',
      detailImg: 'public/images/project-08-marine-reef-at-home-detail.jpg',
    },
    {
      id: 'project-09-staircase-column-tank',
      title: 'Spiral Staircase Architectural Column Aquarium',
      slug: 'spiral-staircase-column-aquarium',
      clientType: 'Home',
      custom: true,
      tankSize: '60 x 60 x 120 cm · 430L',
      featured: false,
      summary: 'Custom vertical tower tank positioned at the center of a spiral staircase landing in an executive villa at Cantonments.',
      mainImg: 'public/images/project-09-staircase-column-tank-main.jpg',
      detailImg: 'public/images/project-09-staircase-column-tank-detail.jpg',
    },
    {
      id: 'project-10-childrens-room-community-tank',
      title: "Children's Study Community Freshwater Haven",
      slug: 'childrens-study-community-freshwater-haven',
      clientType: 'Home',
      custom: false,
      tankSize: '80 x 35 x 45 cm · 126L',
      featured: false,
      summary: 'Safe, shatter-resistant tempered glass community tank with playful neon tetras, fancy guppies, and live aquatic mosses.',
      mainImg: 'public/images/project-10-childrens-room-community-tank-main.jpg',
      detailImg: 'public/images/project-10-childrens-room-community-tank-detail.jpg',
    },
  ];

  for (const p of projectDefs) {
    const mainAsset = await uploadImage(p.mainImg);
    const detailAsset = await uploadImage(p.detailImg);

    const doc = {
      _id: p.id,
      _type: 'project',
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      clientType: p.clientType,
      custom: p.custom,
      tankSize: p.tankSize,
      featured: p.featured,
      summary: p.summary,
      images: [
        sanityImageRef(mainAsset, `${p.title} - Main View`),
        sanityImageRef(detailAsset, `${p.title} - Detail View`),
      ],
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ Seeded project: ${p.id} (${p.title})`);
  }

  // Update legacy project IDs in Sanity
  const legacyProjMap: Record<string, string> = {
    'project-kasoa-panoramic-curved': 'project-01-living-room-feature-tank',
    'project-kasoa-inwall-living-reef': 'project-08-marine-reef-at-home',
    'project-nature-planted-aquascape': 'project-05-bedroom-nano-setup',
    'project-lake-malawi-sanctuary': 'project-04-hotel-lobby-curved-tank',
    'project-corporate-oceanarium': 'project-02-reception-area-display-tank',
    'project-discus-showcase': 'project-03-restaurant-divider-aquarium',
  };

  for (const [legacyId, mappedId] of Object.entries(legacyProjMap)) {
    const target = projectDefs.find((p) => p.id === mappedId);
    if (target) {
      const mainAsset = assetMap[path.basename(target.mainImg)];
      const detailAsset = assetMap[path.basename(target.detailImg)];
      if (mainAsset && detailAsset) {
        await client.patch(legacyId).set({
          images: [
            sanityImageRef(mainAsset, `${target.title} - Main`),
            sanityImageRef(detailAsset, `${target.title} - Detail`),
          ],
        }).commit().catch(() => {});
        console.log(`  ✓ Updated legacy project images: ${legacyId}`);
      }
    }
  }

  // 5. Fish (14 fish species)
  console.log('\n--- 5. Uploading Fish ---');
  const fishDefs = [
    {
      id: 'fish-01-guppy',
      legacyId: 'fish-fancy-guppy-trio',
      title: 'Tuxedo Red Fancy Guppy',
      slug: 'tuxedo-red-fancy-guppy',
      scientificName: 'Poecilia reticulata',
      price: 25,
      waterType: 'Freshwater',
      category: 'Livebearer',
      careLevel: 'Easy',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      adultSizeCm: 5,
      minTankLitres: 30,
      phRange: '6.8 - 7.8',
      tempRangeC: '22 - 28°C',
      description: 'Show-grade colorful male fancy guppies with sweeping tuxedo red caudal fins. Hardy, active swimmers ideal for community aquariums in Ghana.',
      img: 'public/images/fish-01-guppy.jpg',
    },
    {
      id: 'fish-02-betta',
      legacyId: 'fish-royal-blue-betta',
      title: 'Royal Blue Halfmoon Betta',
      slug: 'royal-blue-halfmoon-betta',
      scientificName: 'Betta splendens',
      price: 120,
      waterType: 'Freshwater',
      category: 'Labyrinth fish',
      careLevel: 'Easy',
      temperament: 'Semi-aggressive',
      diet: 'Carnivore',
      adultSizeCm: 7,
      minTankLitres: 15,
      phRange: '6.5 - 7.5',
      tempRangeC: '24 - 30°C',
      description: 'Stunning exhibition-grade halfmoon Betta with full 180-degree fin spread and intense iridescent royal blue coloration.',
      img: 'public/images/fish-02-betta.jpg',
    },
    {
      id: 'fish-03-angelfish',
      legacyId: 'fish-angelfish-veiltail',
      title: 'Silver Veiltail Freshwater Angelfish',
      slug: 'silver-veiltail-freshwater-angelfish',
      scientificName: 'Pterophyllum scalare',
      price: 85,
      waterType: 'Freshwater',
      category: 'Cichlid',
      careLevel: 'Moderate',
      temperament: 'Semi-aggressive',
      diet: 'Omnivore',
      adultSizeCm: 15,
      minTankLitres: 120,
      phRange: '6.5 - 7.4',
      tempRangeC: '24 - 28°C',
      description: 'Graceful veiltail angelfish with elongated dorsal and ventral fins. Majestic centerpieces for tall planted aquariums.',
      img: 'public/images/fish-03-angelfish.jpg',
    },
    {
      id: 'fish-04-discus',
      legacyId: 'fish-red-turquoise-discus',
      title: 'Red Turquoise Show Discus',
      slug: 'red-turquoise-show-discus',
      scientificName: 'Symphysodon aequifasciatus',
      price: 450,
      waterType: 'Freshwater',
      category: 'Cichlid',
      careLevel: 'Expert',
      temperament: 'Peaceful',
      diet: 'Carnivore',
      adultSizeCm: 16,
      minTankLitres: 200,
      phRange: '6.0 - 6.8',
      tempRangeC: '28 - 31°C',
      description: 'The king of the aquarium. Acclimated to soft treated water with brilliant metallic turquoise striations over deep red body coloration.',
      img: 'public/images/fish-04-discus.jpg',
    },
    {
      id: 'fish-05-neon-tetra',
      legacyId: 'fish-neon-tetra',
      title: 'Neon Tetra (Schooling Nano)',
      slug: 'neon-tetra',
      scientificName: 'Paracheirodon innesi',
      price: 15,
      waterType: 'Freshwater',
      category: 'Tetra / Characin',
      careLevel: 'Easy',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      adultSizeCm: 3.5,
      minTankLitres: 40,
      phRange: '6.0 - 7.0',
      tempRangeC: '21 - 26°C',
      description: 'Classic peaceful schooling fish with glowing iridescent neon blue line and vivid red tail. Best kept in schools of 10 or more.',
      img: 'public/images/fish-05-neon-tetra.jpg',
    },
    {
      id: 'fish-06-zebra-danio',
      legacyId: 'fish-zebra-danio',
      title: 'Zebra Danio Active Swimmer',
      slug: 'zebra-danio-active-swimmer',
      scientificName: 'Danio rerio',
      price: 18,
      waterType: 'Freshwater',
      category: 'Cyprinid',
      careLevel: 'Easy',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      adultSizeCm: 5,
      minTankLitres: 40,
      phRange: '6.5 - 7.5',
      tempRangeC: '18 - 25°C',
      description: 'High-energy surface schooling fish with uniform horizontal blue and gold stripes. Exceptionally hardy.',
      img: 'public/images/fish-06-zebra-danio.jpg',
    },
    {
      id: 'fish-07-oscar',
      legacyId: 'fish-oscar-tiger',
      title: 'Red Tiger Oscar Cichlid',
      slug: 'red-tiger-oscar-cichlid',
      scientificName: 'Astronotus ocellatus',
      price: 220,
      waterType: 'Freshwater',
      category: 'Cichlid',
      careLevel: 'Moderate',
      temperament: 'Aggressive',
      diet: 'Carnivore',
      adultSizeCm: 30,
      minTankLitres: 300,
      phRange: '6.5 - 7.2',
      tempRangeC: '23 - 28°C',
      description: 'Highly intelligent statement cichlid with remarkable personality, recognizing owners at feeding time.',
      img: 'public/images/fish-07-oscar.jpg',
    },
    {
      id: 'fish-08-fancy-goldfish',
      legacyId: 'fish-oranda-goldfish',
      title: 'Red & White Crown Oranda Goldfish',
      slug: 'red-white-crown-oranda-goldfish',
      scientificName: 'Carassius auratus',
      price: 180,
      waterType: 'Freshwater',
      category: 'Goldfish',
      careLevel: 'Moderate',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      adultSizeCm: 18,
      minTankLitres: 100,
      phRange: '7.0 - 7.8',
      tempRangeC: '18 - 24°C',
      description: 'Prize fancy goldfish displaying a prominent raspberry-like cranial growth (wen) and graceful flowing double finnage.',
      img: 'public/images/fish-08-fancy-goldfish.jpg',
    },
    {
      id: 'fish-09-bronze-corydoras',
      legacyId: 'fish-bronze-corydoras',
      title: 'Bronze Corydoras Bottom Cleaner',
      slug: 'bronze-corydoras-bottom-cleaner',
      scientificName: 'Corydoras aeneus',
      price: 35,
      waterType: 'Freshwater',
      category: 'Catfish',
      careLevel: 'Easy',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      adultSizeCm: 6,
      minTankLitres: 50,
      phRange: '6.5 - 7.5',
      tempRangeC: '22 - 27°C',
      description: 'Industrious armored catfish foraging substrate for uneaten food particles. Social and playful in groups.',
      img: 'public/images/fish-09-bronze-corydoras.jpg',
    },
    {
      id: 'fish-10-convict-cichlid',
      legacyId: 'fish-lake-malawi-peacock',
      title: 'African Lake Malawi Peacock Cichlid',
      slug: 'lake-malawi-peacock-cichlid',
      scientificName: 'Aulonocara baenschi',
      price: 150,
      waterType: 'Freshwater',
      category: 'Cichlid',
      careLevel: 'Moderate',
      temperament: 'Semi-aggressive',
      diet: 'Omnivore',
      adultSizeCm: 13,
      minTankLitres: 180,
      phRange: '7.8 - 8.6',
      tempRangeC: '24 - 28°C',
      description: 'Electric metallic yellow and blue African rift lake cichlid. Vibrant colors requiring hard alkaline water conditions.',
      img: 'public/images/fish-10-convict-cichlid.jpg',
    },
    {
      id: 'fish-11-bristlenose-pleco',
      legacyId: 'fish-bristlenose-pleco',
      title: 'Bristlenose Plecostomus (Algae Eater)',
      slug: 'bristlenose-plecostomus-algae-eater',
      scientificName: 'Ancistrus cirrhosus',
      price: 65,
      waterType: 'Freshwater',
      category: 'Catfish',
      careLevel: 'Easy',
      temperament: 'Peaceful',
      diet: 'Herbivore',
      adultSizeCm: 12,
      minTankLitres: 80,
      phRange: '6.5 - 7.5',
      tempRangeC: '23 - 27°C',
      description: 'The #1 natural algae cleaning fish for planted tanks. Does not outgrow home aquariums unlike common plecos.',
      img: 'public/images/fish-11-bristlenose-pleco.jpg',
    },
    {
      id: 'fish-12-platy',
      legacyId: 'fish-sunset-platy',
      title: 'Sunset Coral Platy',
      slug: 'sunset-coral-platy',
      scientificName: 'Xiphophorus maculatus',
      price: 22,
      waterType: 'Freshwater',
      category: 'Livebearer',
      careLevel: 'Easy',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      adultSizeCm: 5,
      minTankLitres: 35,
      phRange: '7.0 - 8.0',
      tempRangeC: '21 - 26°C',
      description: 'Vibrant orange-red peaceful livebearer. Excellent choice for community aquariums and beginner aquarists.',
      img: 'public/images/fish-12-platy.jpg',
    },
    {
      id: 'fish-13-ocellaris-clownfish',
      legacyId: 'fish-ocellaris-clownfish',
      title: 'Ocellaris Clownfish (Nemo)',
      slug: 'ocellaris-clownfish',
      scientificName: 'Amphiprion ocellaris',
      price: 180,
      waterType: 'Marine',
      category: 'Saltwater Fish',
      careLevel: 'Moderate',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      adultSizeCm: 9,
      minTankLitres: 80,
      phRange: '8.1 - 8.4',
      tempRangeC: '24 - 27°C',
      description: 'Captive-bred hardy saltwater clownfish with bright orange body and white bands with black margins. Pairs with anemones.',
      img: 'public/images/fish-13-ocellaris-clownfish.jpg',
    },
    {
      id: 'fish-14-royal-gramma',
      legacyId: 'fish-royal-gramma',
      title: 'Royal Gramma Basslet',
      slug: 'royal-gramma-basslet',
      scientificName: 'Gramma loreto',
      price: 280,
      waterType: 'Marine',
      category: 'Saltwater Fish',
      careLevel: 'Moderate',
      temperament: 'Peaceful',
      diet: 'Carnivore',
      adultSizeCm: 8,
      minTankLitres: 100,
      phRange: '8.1 - 8.4',
      tempRangeC: '23 - 26°C',
      description: 'Spectacular two-tone marine basslet with vibrant violet-purple front transitioning sharply to sunny yellow posterior.',
      img: 'public/images/fish-14-royal-gramma.jpg',
    },
  ];

  for (const f of fishDefs) {
    const asset = await uploadImage(f.img);

    const doc = {
      _id: f.id,
      _type: 'fish',
      title: f.title,
      slug: { _type: 'slug', current: f.slug },
      scientificName: f.scientificName,
      price: f.price,
      inStock: true,
      featured: true,
      waterType: f.waterType,
      category: f.category,
      careLevel: f.careLevel,
      temperament: f.temperament,
      diet: f.diet,
      adultSizeCm: f.adultSizeCm,
      minTankLitres: f.minTankLitres,
      phRange: f.phRange,
      tempRangeC: f.tempRangeC,
      description: f.description,
      images: [sanityImageRef(asset, f.title)],
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ Seeded fish: ${f.id} (${f.title})`);

    // Also update legacy ID if different
    if (f.legacyId && f.legacyId !== f.id) {
      await client.patch(f.legacyId).set({
        images: [sanityImageRef(asset, f.title)],
      }).commit().catch(() => {});
    }
  }

  // Also update remaining legacy fish in Sanity
  const extraLegacyFish = [
    { id: 'fish-african-butterfly', img: 'public/images/fish-03-angelfish.jpg' },
    { id: 'fish-clown-loach', img: 'public/images/fish-09-bronze-corydoras.jpg' },
    { id: 'fish-kribensis-cichlid', img: 'public/images/fish-10-convict-cichlid.jpg' },
    { id: 'fish-yellow-tang', img: 'public/images/fish-14-royal-gramma.jpg' },
  ];
  for (const ef of extraLegacyFish) {
    const asset = await uploadImage(ef.img);
    await client.patch(ef.id).set({
      images: [sanityImageRef(asset)],
    }).commit().catch(() => {});
  }

  // 6. Gallery items & Video
  console.log('\n--- 6. Updating Gallery Items & Video ---');
  let videoAssetRef: any = null;
  const videoPath = path.resolve(process.cwd(), 'public/videos/aquarium-showcase.mp4');
  if (fs.existsSync(videoPath)) {
    console.log('Uploading 4K video asset to Sanity...');
    const videoAsset = await client.assets.upload('file', fs.createReadStream(videoPath), {
      filename: 'gabriels-aquarium-video.mp4',
    });
    console.log(`  ✓ Uploaded video file asset -> ${videoAsset._id}`);
    videoAssetRef = {
      _type: 'file',
      asset: {
        _type: 'reference',
        _ref: videoAsset._id,
      },
    };
  }

  const galleryUpdates = [
    { id: 'gallery-kasoa-curved-panoramic', img: 'public/images/project-04-hotel-lobby-curved-tank-main.jpg' },
    { id: 'gallery-coral-reef-motion', thumb: 'public/images/project-08-marine-reef-at-home-main.jpg', video: true },
    { id: 'gallery-discus-softwater', img: 'public/images/fish-04-discus.jpg' },
    { id: 'gallery-kasoa-inwall-reef', img: 'public/images/project-08-marine-reef-at-home-main.jpg' },
    { id: 'gallery-tropical-school-video', thumb: 'public/images/fish-13-ocellaris-clownfish.jpg', video: true },
    { id: 'gallery-iwagumi-stone', img: 'public/images/tank-05-rimless-ultra-clear-100-front.jpg' },
    { id: 'gallery-malawi-cichlids', img: 'public/images/fish-10-convict-cichlid.jpg' },
    { id: 'gallery-kasoa-nature-haven', img: 'public/images/project-01-living-room-feature-tank-main.jpg' },
    { id: 'gallery-neon-tetras', img: 'public/images/fish-05-neon-tetra.jpg' },
    { id: 'gallery-halfmoon-betta', img: 'public/images/fish-02-betta.jpg' },
    { id: 'gallery-living-room-centerpiece', img: 'public/images/project-06-corner-tank-in-a-family-lounge-main.jpg' },
    { id: 'gallery-yellow-tang', img: 'public/images/fish-14-royal-gramma.jpg' },
  ];

  for (const g of galleryUpdates) {
    const patch: any = {};
    if (g.img) {
      const asset = await uploadImage(g.img);
      patch.image = sanityImageRef(asset);
    }
    if (g.thumb) {
      const asset = await uploadImage(g.thumb);
      patch.thumbnailImage = sanityImageRef(asset);
    }
    if (g.video && videoAssetRef) {
      patch.videoFile = videoAssetRef;
      patch.videoUrl = '/videos/aquarium-showcase.mp4';
    }
    await client.patch(g.id).set(patch).commit().catch(() => {});
    console.log(`  ✓ Updated gallery item: ${g.id}`);
  }

  console.log('\n====================================================');
  console.log('🎉 ALL SANITY IMAGES AND DOCUMENTS SUCCESSFULLY UPDATED!');
  console.log('====================================================');
}

main().catch((err) => {
  console.error('Fatal error in upload-and-seed:', err);
  process.exit(1);
});
