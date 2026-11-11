import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/header/SiteHeader';
import { Footer } from '@/components/home/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';
import { ArrowLeft, MapPin, Building, Ruler, MessageCircle } from 'lucide-react';
import { waLink } from '@/lib/whatsapp';

interface ProjectDetail {
  slug: string;
  title: string;
  location: string;
  clientType: string;
  tankSize: string;
  volume: string;
  filtration: string;
  glass: string;
  lighting: string;
  image: string;
  gallery: string[];
  description: string;
  highlights: string[];
}

const PROJECTS_DATA: ProjectDetail[] = [
  {
    slug: 'kasoa-panoramic-curved',
    title: 'Curved Glass Living Room Installation',
    location: 'East Legon, Accra',
    clientType: 'Private Residence',
    tankSize: '120 x 45 x 65 cm',
    volume: '350 Litres',
    filtration: 'Silent Internal Multi-Chamber Sump',
    glass: '10mm Heat-Bent Curved Front',
    lighting: 'Automated 24/7 Day-Night LED Bar',
    image: '/images/project-04-hotel-lobby-curved-tank-main.jpg',
    gallery: [
      '/images/project-04-hotel-lobby-curved-tank-main.jpg',
      '/images/project-04-hotel-lobby-curved-tank-detail.jpg',
    ],
    description:
      'A centerpiece installation custom-built for a modern residential living room in East Legon. The seamless curved glass corners provide a continuous panoramic viewing angle, eliminating bulky silicone lines on the front face.',
    highlights: [
      'Dual-curve seamless front corners eliminating blind spots',
      'Integrated water top-off reservoir to counter evaporation',
      'Cabinet finished in high-gloss water-resistant marine laminate',
      'Stocked with acclimated Cardinal Tetras and Discus fish',
    ],
  },
  {
    slug: 'kasoa-inwall-living-reef',
    title: 'Architectural In-Wall Living Reef',
    location: 'Trassaco Valley, East Legon',
    clientType: 'Executive Villa',
    tankSize: '150 x 50 x 70 cm',
    volume: '525 Litres',
    filtration: 'External Bean-Animal Drain & Sump with Skimmer',
    glass: '12mm Low-Iron Ultra-Clear Starphire Glass',
    lighting: 'App-Controlled High-PAR Actinic Coral Fixtures',
    image: '/images/project-08-marine-reef-at-home-main.jpg',
    gallery: [
      '/images/project-08-marine-reef-at-home-main.jpg',
      '/images/project-08-marine-reef-at-home-detail.jpg',
    ],
    description:
      'Engineered as an architectural room divider connecting the formal dining room and main lounge. Features an isolated rear filtration chamber for completely silent operation in the living space.',
    highlights: [
      'Full living reef supporting LPS and soft coral colonies',
      'Dual emergency backup plumbing loop for flood security',
      'Welded steel support frame with powder-coated anti-rust finish',
      'Dedicated reverse osmosis reservoir and auto-dosing system',
    ],
  },
  {
    slug: 'kasoa-planted-botanical',
    title: 'High-Tech Nature Planted Aquascape',
    location: 'Greater Accra',
    clientType: 'Design Studio',
    tankSize: '90 x 45 x 45 cm',
    volume: '182 Litres',
    filtration: 'Canister Filter with In-Line Heater and CO2 Diffuser',
    glass: '10mm Mitered Rimless Low-Iron Glass',
    lighting: 'High-PAR RGB LED Aquascaping Light',
    image: '/images/project-01-living-room-feature-tank-main.jpg',
    gallery: [
      '/images/project-01-living-room-feature-tank-main.jpg',
      '/images/project-01-living-room-feature-tank-detail.jpg',
    ],
    description:
      'An award-worthy Dutch and Iwagumi inspired planted habitat designed for a creative studio in Accra. The ultra-clear rimless glass creates a sense of floating water with vibrant plant growth and schooling nano fish.',
    highlights: [
      'Pressurized CO2 injection with digital solenoid timer',
      'Active aquatic soil substrate with natural volcanic stones',
      'Over 8 distinct species of live aquatic plants and mosses',
      'School of 40 brilliant micro rasboras and Amano shrimp',
    ],
  },
  {
    slug: 'airport-residential-cichlid',
    title: 'Lake Malawi African Cichlid Sanctuary',
    location: 'Airport Residential, Accra',
    clientType: 'Luxury Apartment',
    tankSize: '180 x 60 x 60 cm',
    volume: '648 Litres',
    filtration: 'Dual High-Flow Canisters with Surface Skimmers',
    glass: '12mm Tempered Safety Glass',
    lighting: 'Crisp 6500K Cichlid Enhancing LED Array',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop'],
    description:
      'A high-energy African cichlid habitat mimicking the rocky shorelines of Lake Malawi. Hand-selected calcium carbonate rockwork naturally buffers water hardness and pH for the colorful cichlids.',
    highlights: [
      'Precision cave structures engineered to prevent rock slides',
      'High-turnover mechanical filtration handling high bioload',
      'Collection of 35+ Peacock and Mbuna cichlid color morphs',
      'Bi-weekly water maintenance service plan included',
    ],
  },
  {
    slug: 'cantonments-office-reef',
    title: 'Corporate Lobby Marine Oceanarium',
    location: 'Cantonments, Accra',
    clientType: 'Corporate Headquarters',
    tankSize: '240 x 70 x 80 cm',
    volume: '1340 Litres',
    filtration: 'Commercial-Grade Sump with UV Sterilizer and Protein Skimmer',
    glass: '15mm Laminated Ultra-Clear Safety Glass',
    lighting: 'Triple High-Intensity Marine LED Modules',
    image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=800&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=800&auto=format&fit=crop'],
    description:
      'A monumental commercial display greeting visitors in a prestigious Cantonments corporate office. Houses Tangs, Clownfish, Angelfish, and flourishing coral colonies with fully automated maintenance protocols.',
    highlights: [
      'Reinforced concrete pad engineering with load-distribution base',
      'Integrated industrial UV sterilizer for crystal-clear pathogen-free water',
      'Automated daily feeding and chemical monitoring system',
      'Weekly white-glove corporate maintenance service',
    ],
  },
  {
    slug: 'east-legon-discus-showcase',
    title: 'Pristine Softwater Discus Showcase',
    location: 'East Legon, Accra',
    clientType: 'Private Residence',
    tankSize: '160 x 55 x 65 cm',
    volume: '572 Litres',
    filtration: 'Multi-Stage Biological Canister with Pre-Filters',
    glass: '12mm Low-Iron Rimless Glass',
    lighting: 'Warm Dimmable LED Simulating Amazonian Sun',
    image: 'https://images.unsplash.com/photo-1520315342629-6ea920342047?q=80&w=800&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1520315342629-6ea920342047?q=80&w=800&auto=format&fit=crop'],
    description:
      'Curated specifically for delicate Discus specimens, this tank features natural sand substrates, aged driftwood roots, and pristine temperature-controlled water conditioning.',
    highlights: [
      'Dual digital heaters ensuring constant 29°C temperature stability',
      'Zero-current water dispersion preventing Discus stress',
      'Showcase of Blue Diamond, Pigeon Blood, and Red Turquoise Discus',
      'Automated reverse osmosis drip system for gradual freshwater replenishment',
    ],
  },
];

export function generateStaticParams() {
  return PROJECTS_DATA.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const whatsappNumber = '233241234567';
  const whatsappUrl = waLink(
    whatsappNumber,
    `Hello Gabriel's Aquarium, I saw your project "${project.title}" (${project.tankSize}) and I want something similar for my space.`
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-12 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/our-work"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Title & Metadata Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-secondary text-primary">
              {project.clientType}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-[#F8B828]" />
              {project.location}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-heading">
            {project.title}
          </h1>
        </div>

        {/* Hero Image Showcase */}
        <div className="relative aspect-16/9 sm:aspect-21/9 w-full rounded-3xl overflow-hidden border border-border shadow-lg bg-slate-900 mb-12">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Specifications & Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Narrative & Key Highlights */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground font-heading mb-3">
                Project Overview
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-foreground font-heading mb-3">
                Key Technical Highlights
              </h3>
              <ul className="space-y-2.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-xs text-foreground/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Technical Spec Box & WhatsApp CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-foreground font-heading pb-3 border-b border-border/50">
                Installation Specifications
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-primary" />
                    Dimensions:
                  </span>
                  <span className="font-semibold text-foreground text-right">{project.tankSize}</span>
                </div>

                <div className="flex items-start justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-primary" />
                    Water Volume:
                  </span>
                  <span className="font-semibold text-foreground text-right">{project.volume}</span>
                </div>

                <div className="flex items-start justify-between">
                  <span className="text-muted-foreground">Glass Specification:</span>
                  <span className="font-semibold text-foreground text-right">{project.glass}</span>
                </div>

                <div className="flex items-start justify-between">
                  <span className="text-muted-foreground">Filtration Architecture:</span>
                  <span className="font-semibold text-foreground text-right">{project.filtration}</span>
                </div>

                <div className="flex items-start justify-between">
                  <span className="text-muted-foreground">Lighting Fixture:</span>
                  <span className="font-semibold text-foreground text-right">{project.lighting}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-border/50">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-whatsapp hover:bg-whatsapp/90 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                  <span>Want Something Similar? Inquire</span>
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-secondary/50 border border-border text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground block font-semibold mb-1">
                Have an architectural blueprint?
              </strong>
              Send your room dimensions and interior renders directly in our WhatsApp chat for a 3D CAD proposal and quotation.
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <FloatingWhatsApp />
    </div>
  );
}
