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
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

if (!token) {
  console.error('Error: SANITY_API_WRITE_TOKEN is missing in .env.local');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

async function run() {
  console.log(`Connecting to Sanity project: ${projectId}, dataset: ${dataset}...`);

  // 1. Update siteSettings with comprehensive homepage copy fields
  console.log('Updating siteSettings with all homepage copy fields...');
  await client
    .patch('siteSettings')
    .setIfMissing({
      heroBadge: "Ghana's Premier Aquarium Specialist",
      heroHeadline: 'Handcrafted Aquariums & Living Reefs',
      heroSubheadline:
        'Custom living walls, curved-glass panoramic tanks, vibrant live fish, and professional maintenance across Greater Accra.',
      heroCtaPrimary: 'Browse Tanks',
      heroCtaSecondary: 'Get a Custom Quote',
      heroGuaranteeTitle: "Gabriel's Guarantee",
      heroGuaranteeText: 'Live Fish Health & Leak-Free Tank Guarantee',
      trustBadges: [
        {
          _key: 'trust-1',
          title: 'Custom Tank Engineering',
          desc: 'Curved glass, rimless low-iron, and custom in-wall cabinetry built to your exact specs.',
        },
        {
          _key: 'trust-2',
          title: 'Live Fish Health Guarantee',
          desc: 'Quarantined, parasite-free, and acclimated for Ghanaian water parameters.',
        },
        {
          _key: 'trust-3',
          title: 'Installation & Maintenance',
          desc: 'Complete setup, water chemistry balancing, and ongoing residential/office care.',
        },
        {
          _key: 'trust-4',
          title: 'Safe Delivery in Ghana',
          desc: 'Specialized aquatic transit with oxygen packaging safely delivered across Ghana.',
        },
      ],
      categoriesBadge: 'Curated Collections',
      categoriesHeading: 'Everything for Your Aquatic World',
      categoriesSubtitle:
        'From handcrafted curved tanks to living reefs and premium feeds, discover everything you need for your living aquatic centerpiece.',
      featuredTanksBadge: 'Signature Craftsmanship',
      featuredTanksHeading: 'Ready-Made & Curved Glass Tanks',
      featuredTanksSubtitle:
        'Seamless curved-front glass, ultra-clear low-iron sheets, and leak-free precision joints. Delivered and installed safely at your location.',
      customBuildBadge: 'Bespoke Architectural Systems',
      customBuildHeading: 'Turn Any Wall into a Living Coral or Freshwater Oasis',
      customBuildDescription:
        'Whether you envision a sleek room-divider in a luxury penthouse, a serene freshwater nature tank in your living room, or a statement marine aquarium in a restaurant lobby, our artisans build it to perfection.',
      customBuildSteps: [
        { _key: 'step-1', num: '01', title: 'Share Your Space', desc: 'Tell us where you want your aquarium and send photos of the room.' },
        { _key: 'step-2', num: '02', title: 'Custom 3D CAD Design', desc: 'We tailor dimensions, filtration chambers, and cabinet finish.' },
        { _key: 'step-3', num: '03', title: 'Master Glass Crafting', desc: 'Hand-assembled with ultra-clear glass, precision silicone & plumbing.' },
        { _key: 'step-4', num: '04', title: 'White-Glove Installation', desc: 'Delivered, filled, aquascaped, and biologically established.' },
      ],
      ourWorkBadge: 'Ghana Portfolio',
      ourWorkHeading: 'Recent Living Installations',
      ourWorkSubtitle:
        "From residential penthouses to flagship commercial offices, explore custom installations handcrafted and maintained by Gabriel's Aquarium.",
      galleryBadge: 'Live From The Workshop & Builds',
      galleryHeading: 'Living Aquascapes In Motion',
      gallerySubtitle: 'Watch our living reefs, custom installations, and vibrant fish in action.',
      maintenanceBadge: 'Zero Stress Aquatics',
      maintenanceHeading: 'Professional Maintenance Plans',
      maintenanceSubtitle:
        'Keep your aquarium crystal clear and biologically balanced without lifting a finger. Routine scheduled care for homes and businesses in Accra.',
      fishSuppliesBadge: 'Livestock & Essentials',
      fishSuppliesHeading: 'Live Fish & Premium Supplies',
      fishSuppliesSubtitle:
        'Healthy quarantined live fish, specialized feeds, filtration media, and aquascaping essentials delivered to your doorstep.',
      testimonialsHeading: 'What Our Clients Say',
      testimonialsSubtitle: 'Trusted by homeowners, architects, and luxury venues across Ghana.',
      faqsHeading: 'Frequently Asked Questions',
      faqsSubtitle: 'Everything you need to know about ordering, delivery, custom builds, and ongoing care.',
      footerCtaBadge: 'Start Your Aquarium Journey',
      footerCtaHeading: 'Ready to Build Your Dream Aquarium?',
      footerCtaSubtitle:
        'Whether you need a curved glass tank, a custom in-wall coral reef, healthy live fish, or routine tank care in Ghana, Gabriel and his team are ready to assist.',
      footerAboutText:
        "Ghana's premier specialist in handcrafted curved glass aquariums, living coral reefs, exotic freshwater & marine fish, and professional aquarium maintenance.",
    })
    .commit();
  console.log('✓ siteSettings updated successfully!');

  // 2. Create standard Page documents
  const pages: any[] = [
    {
      _id: 'page-about',
      _type: 'page',
      title: "Dedicated to the Art of Aquatics in Ghana",
      slug: { _type: 'slug', current: 'about' },
      badge: 'Our Story & Craft',
      intro:
        "Founded with a passion for underwater ecology, Gabriel's Aquarium has grown into Ghana's premier destination for custom curved glass tanks, living coral reefs, and healthy acclimated aquatic life.",
      featuresHeading: 'Craftsmanship Without Compromise',
      features: [
        { _key: 'f1', title: '72-Hour Leak Testing', description: 'Every tank is leak-tested under full water load for 72 hours before dispatch.' },
        { _key: 'f2', title: 'Biosecure Quarantine', description: 'Live fish are quarantined in dedicated biosecure systems to guarantee health.' },
        { _key: 'f3', title: 'Marine-Safe Structural Silicone', description: 'We use only marine-safe non-toxic structural silicone and low-iron glass.' },
        { _key: 'f4', title: 'Full After-Sales Support', description: 'Full after-sales support and scheduled maintenance throughout Ghana.' },
      ],
    },
    {
      _id: 'page-custom-tanks',
      _type: 'page',
      title: 'Custom Built Aquariums & Living Walls',
      slug: { _type: 'slug', current: 'custom-tanks' },
      badge: 'Bespoke Aquarium Engineering',
      intro:
        "Every space is unique. Gabriel's Aquarium designs, manufactures, and installs bespoke luxury aquariums for private homes, corporate offices, restaurants, and hotels throughout Ghana.",
      featuresHeading: 'What You Can Customize',
      features: [
        { _key: 'c1', title: 'Dimensions & Geometry', description: 'Any length, depth, or height up to 3 meters. Rectangular, curved bow-front, L-shape, or cube.' },
        { _key: 'c2', title: 'Glass Selection', description: 'Standard float, ultra-clear low-iron (Starphire), tempered safety glass, or thick cast acrylic.' },
        { _key: 'c3', title: 'Filtration Systems', description: 'Silent weir internal overflows, bean-animal plumbing, drilled returns, or built-in multi-stage sumps.' },
        { _key: 'c4', title: 'Cabinetry & Stands', description: 'Heavy-duty welded steel frameworks wrapped in waterproof marine plywood with custom architectural laminate finishes.' },
        { _key: 'c5', title: 'Automated Lighting', description: 'App-controlled reef or planted full-spectrum LED fixtures with custom sunrise/sunset ramps.' },
        { _key: 'c6', title: 'Backgrounds & Hardscapes', description: '3D textured slate or granite rock backgrounds, driftwood aquascaping, and living coral reefs.' },
      ],
    },
    {
      _id: 'page-maintenance',
      _type: 'page',
      title: 'Professional Aquarium Maintenance',
      slug: { _type: 'slug', current: 'maintenance' },
      badge: 'Certified Technicians',
      intro:
        'We provide scheduled routine care and emergency servicing for residential and commercial aquariums across Greater Accra and surrounding areas. Enjoy the tranquility of a flourishing aquarium while we handle the work.',
      featuresHeading: 'Why Choose Our Service',
      features: [
        { _key: 'm1', title: 'Water Chemistry Precision', description: 'Accurate testing of pH, ammonia, nitrite, nitrate, calcium, and alkalinity to prevent fish distress.' },
        { _key: 'm2', title: 'Crystal Clear Glass & Substrate', description: 'Deep algae scraping and gravel vacuuming to maintain pristine aesthetics without scratching the glass.' },
        { _key: 'm3', title: 'Preventive Fish Healthcare', description: 'Visual disease inspections and nutritional assessments to ensure optimal vitality and longevity.' },
        { _key: 'm4', title: 'Equipment Health Audits', description: 'Impeller lubrication, filter media cleansing, heater calibration, and leak inspection every visit.' },
      ],
    },
    {
      _id: 'page-contact',
      _type: 'page',
      title: "We're Here to Help",
      slug: { _type: 'slug', current: 'contact' },
      badge: 'Get in Touch',
      intro:
        'Have a question about a tank, custom build, live fish availability, or maintenance service? Connect with Gabriel directly via WhatsApp or phone.',
    },
    {
      _id: 'page-delivery-policy',
      _type: 'page',
      title: 'Delivery & Live Arrival Policy',
      slug: { _type: 'slug', current: 'delivery-policy' },
      badge: 'Safe Aquatic Transit',
      intro:
        'We take extreme care in packaging and transporting glass tanks and live aquatic life across Greater Accra and nationwide throughout Ghana.',
    },
    {
      _id: 'page-terms',
      _type: 'page',
      title: 'Terms & Conditions',
      slug: { _type: 'slug', current: 'terms' },
      badge: 'Client Agreement',
      intro:
        'Transparent terms for custom aquarium manufacturing, warranties, payments, and delivery.',
    },
    {
      _id: 'page-privacy',
      _type: 'page',
      title: 'Privacy Policy',
      slug: { _type: 'slug', current: 'privacy' },
      badge: 'Data Protection',
      intro:
        "How Gabriel's Aquarium handles customer contact details and order communications.",
    },
  ];

  console.log(`Seeding ${pages.length} page documents...`);
  for (const page of pages) {
    await client.createOrReplace(page);
    console.log(`✓ Seeded page: ${page.slug.current} (${page.title})`);
  }

  console.log('\nAll pages and homepage copy successfully seeded to Sanity!');
}

run().catch((err) => {
  console.error('Error seeding pages and copy:', err);
  process.exit(1);
});
