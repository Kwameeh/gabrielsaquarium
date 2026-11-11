import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';

interface ProjectItem {
  id: string;
  title: string;
  location: string;
  clientType: string;
  tankSize: string;
  image: string;
  description: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'kasoa-panoramic-curved',
    title: 'Curved Glass Living Room Installation',
    location: 'East Legon, Accra',
    clientType: 'Private Residence',
    tankSize: '120 x 45 x 65 cm · 350L',
    image: '/images/project-04-hotel-lobby-curved-tank-main.jpg',
    description: 'Heat-bent seamless curved corners with automated lighting and silent internal sump filtration.',
  },
  {
    id: 'kasoa-inwall-living-reef',
    title: 'Architectural In-Wall Living Reef',
    location: 'Trassaco Valley, East Legon',
    clientType: 'Executive Villa',
    tankSize: '150 x 50 x 70 cm · 525L',
    image: '/images/project-08-marine-reef-at-home-main.jpg',
    description: 'Flush in-wall installation with rear maintenance room, high-output coral lights, and skimmer.',
  },
  {
    id: 'kasoa-planted-botanical',
    title: 'High-Tech Nature Planted Aquascape',
    location: 'Greater Accra',
    clientType: 'Design Studio',
    tankSize: '90 x 45 x 45 cm · 182L',
    image: '/images/project-01-living-room-feature-tank-main.jpg',
    description: 'Rimless low-iron glass housing hundreds of nano schooling fish amongst lush aquatic flora.',
  },
  {
    id: 'airport-residential-cichlid',
    title: 'Lake Malawi African Cichlid Sanctuary',
    location: 'Airport Residential, Accra',
    clientType: 'Luxury Apartment',
    tankSize: '180 x 60 x 60 cm · 648L',
    image: '/images/project-06-corner-tank-in-a-family-lounge-main.jpg',
    description: 'Heavy limestone rockwork providing natural caves for over 40 colorful peacock cichlids.',
  },
  {
    id: 'cantonments-office-reef',
    title: 'Corporate Lobby Marine Oceanarium',
    location: 'Cantonments, Accra',
    clientType: 'Corporate Headquarters',
    tankSize: '240 x 70 x 80 cm · 1340L',
    image: '/images/project-02-reception-area-display-tank-main.jpg',
    description: 'Turnkey commercial installation with automated water dosing and scheduled bi-weekly care.',
  },
  {
    id: 'east-legon-discus-showcase',
    title: 'Pristine Softwater Discus Showcase',
    location: 'East Legon, Accra',
    clientType: 'Private Residence',
    tankSize: '160 x 55 x 65 cm · 572L',
    image: '/images/project-07-meeting-room-wall-tank-main.jpg',
    description: 'Manzanita driftwood hardscape with wild-type Heckel and Blue Diamond Discus specimens.',
  },
];

interface OurWorkShowcaseProps {
  sanityProjects?: any[];
}

export function OurWorkShowcase({ sanityProjects }: OurWorkShowcaseProps = {}) {
  const displayProjects: ProjectItem[] =
    sanityProjects && sanityProjects.length > 0
      ? sanityProjects.map((p, idx) => {
          const fallback = PROJECTS[idx % PROJECTS.length];
          let img = fallback?.image || '/images/project-01-living-room-feature-tank-main.jpg';
          const imgSource = p.image || (p.images && p.images[0]);
          if (imgSource) {
            try {
              img = typeof imgSource === 'string' ? imgSource : urlFor(imgSource).width(800).url();
            } catch {}
          }
          return {
            id: p.slug || p._id || `proj-${idx}`,
            title: p.title || fallback?.title || 'Aquarium Project',
            location: p.location || fallback?.location || 'Accra, Ghana',
            clientType: p.clientType || fallback?.clientType || 'Custom Project',
            tankSize: p.tankSize || fallback?.tankSize || 'Custom Size',
            image: img,
            description: p.summary || fallback?.description || 'Custom aquarium installation engineered by Gabriel\'s Aquarium.',
          };
        })
      : PROJECTS;

  return (
    <section id="our-work" className="py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <span className="text-xs font-bold tracking-widest uppercase text-primary">
            Proven Installations
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mt-1 font-heading">
            Our Work Across Ghana
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
          Explore our real installations in residences, executive suites, and luxury venues across Ghana.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayProjects.map((proj) => (
          <div
            key={proj.id}
            className="group rounded-3xl overflow-hidden border border-border bg-card shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative aspect-4/3 w-full bg-slate-900 overflow-hidden">
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/95 backdrop-blur-md text-[#031A44]">
                  {proj.clientType}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-end text-white text-xs">
                <span className="font-mono text-[11px] font-semibold bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  {proj.tankSize}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <Link href={`/our-work/${proj.id}`}>
                  <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors font-heading">
                    {proj.title}
                  </h3>
                </Link>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
                <Link
                  href={`/our-work/${proj.id}`}
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  View build details
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
