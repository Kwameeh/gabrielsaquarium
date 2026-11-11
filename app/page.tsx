import AquariumHero from '@/components/hero/AquariumHero';
import { AnnouncementBar } from '@/components/header/AnnouncementBar';
import { TrustStrip } from '@/components/home/TrustStrip';
import { CategoryTiles } from '@/components/home/CategoryTiles';
import { FeaturedTanks } from '@/components/home/FeaturedTanks';
import { CustomBuildTeaser } from '@/components/home/CustomBuildTeaser';
import { OurWorkShowcase } from '@/components/home/OurWorkShowcase';
import { AutoScrollGallery } from '@/components/home/AutoScrollGallery';
import { MaintenanceSection } from '@/components/home/MaintenanceSection';
import { FishSuppliesSection } from '@/components/home/FishSuppliesSection';
import { TestimonialsFaq } from '@/components/home/TestimonialsFaq';
import { Footer } from '@/components/home/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';
import { client } from '@/sanity/lib/client';
import {
  settingsQuery,
  heroGalleryQuery,
  homeGalleryQuery,
  tanksQuery,
  projectsQuery,
  fishQuery,
  suppliesQuery,
  plansQuery,
  testimonialsQuery,
  homeFaqsQuery,
} from '@/lib/queries';
import { AQUARIUM_GALLERY_ITEMS } from '@/components/hero/aquariumGalleryData';
import { GalleryItemData } from '@/components/hero/types';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 60; // Revalidate at most every 60 seconds so Sanity Studio edits show up automatically

function buildHeroGalleryItems(sanityHeroItems: any[]): GalleryItemData[] {
  if (!sanityHeroItems || sanityHeroItems.length === 0) {
    return AQUARIUM_GALLERY_ITEMS;
  }

  // Combine with default gallery items so the 3D orbit remains full (28 items)
  return AQUARIUM_GALLERY_ITEMS.map((defaultItem, index) => {
    // If Sanity has an item at this index, replace its content with Sanity's content
    const sanityDoc = sanityHeroItems[index % sanityHeroItems.length];
    if (!sanityDoc) return defaultItem;

    let img = defaultItem.imageUrl;
    if (sanityDoc.image) {
      try {
        img = typeof sanityDoc.image === 'string' ? sanityDoc.image : urlFor(sanityDoc.image).width(700).url();
      } catch {}
    } else if (sanityDoc.thumbnailImage) {
      try {
        img = typeof sanityDoc.thumbnailImage === 'string' ? sanityDoc.thumbnailImage : urlFor(sanityDoc.thumbnailImage).width(700).url();
      } catch {}
    }

    return {
      ...defaultItem,
      title: sanityDoc.title || defaultItem.title,
      subtitle: sanityDoc.description || defaultItem.subtitle,
      imageUrl: img,
      videoUrl: sanityDoc.videoUrl || sanityDoc.videoFileUrl || defaultItem.videoUrl,
      type: (sanityDoc.mediaType as 'editorial' | 'video') || defaultItem.type,
    };
  });
}

export default async function Home() {
  const [
    settings,
    heroItems,
    galleryItems,
    tanks,
    projects,
    fishList,
    suppliesList,
    plansList,
    testimonials,
    faqs,
  ] = await Promise.all([
    client.fetch(settingsQuery).catch(() => null),
    client.fetch(heroGalleryQuery).catch(() => []),
    client.fetch(homeGalleryQuery).catch(() => []),
    client.fetch(tanksQuery).catch(() => []),
    client.fetch(projectsQuery).catch(() => []),
    client.fetch(fishQuery).catch(() => []),
    client.fetch(suppliesQuery).catch(() => []),
    client.fetch(plansQuery).catch(() => []),
    client.fetch(testimonialsQuery).catch(() => []),
    client.fetch(homeFaqsQuery).catch(() => []),
  ]);

  const whatsappNumber = settings?.whatsappNumber || '233249384800';
  const heroGallery = buildHeroGalleryItems(heroItems);

  const heroVideoItem = heroItems?.find((item: any) => item.mediaType === 'video');
  const heroVideoUrl =
    heroVideoItem?.videoFileUrl ||
    heroVideoItem?.videoUrl ||
    'https://cdn.sanity.io/files/iicegrrv/production/51558fa95dd82f9f28eedabc19fe690aaf58381c.mp4';

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-highlight selection:text-highlight-foreground">
      {/* 0. Top Announcement Bar */}
      {settings?.announcementActive !== false && (
        <AnnouncementBar
          text={
            settings?.announcementText ||
            'Free consultation on all custom aquarium builds across Greater Accra'
          }
        />
      )}

      {/* 1. 3D Radial Hero & Floating Pill Header */}
      <AquariumHero
        whatsappNumber={whatsappNumber}
        galleryItems={heroGallery}
        logo={settings?.logo}
        businessName={settings?.businessName}
        videoUrl={heroVideoUrl}
      />

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 3. Category Tiles */}
      <CategoryTiles />

      {/* 4. Featured Tanks */}
      <FeaturedTanks
        whatsappNumber={whatsappNumber}
        sanityTanks={tanks?.length > 0 ? tanks : undefined}
      />

      {/* 5. Custom Build Teaser (Dark Mode Section) */}
      <CustomBuildTeaser whatsappNumber={whatsappNumber} />

      {/* 6. Our Work Showcase Gallery */}
      <OurWorkShowcase
        sanityProjects={projects?.length > 0 ? projects : undefined}
      />

      {/* 6.5. Auto-Scrolling Motion Gallery (Videos & Images) */}
      <AutoScrollGallery
        whatsappNumber={whatsappNumber}
        sanityItems={galleryItems?.length > 0 ? galleryItems : undefined}
      />

      {/* 7. Maintenance Plans Section (Dark Mode Section) */}
      <MaintenanceSection
        whatsappNumber={whatsappNumber}
        sanityPlans={plansList?.length > 0 ? plansList : undefined}
      />

      {/* 8. Fish & Supplies Highlights */}
      <FishSuppliesSection
        sanityProducts={
          (fishList?.length > 0 || suppliesList?.length > 0)
            ? [...(fishList || []), ...(suppliesList || [])]
            : undefined
        }
      />

      {/* 9. Testimonials & FAQs */}
      <TestimonialsFaq
        sanityTestimonials={testimonials?.length > 0 ? testimonials : undefined}
        sanityFaqs={faqs?.length > 0 ? faqs : undefined}
      />

      {/* 10. Footer & Final CTA (Dark Mode Section) */}
      <Footer whatsappNumber={whatsappNumber} settings={settings} />

      {/* Global Interactive Cart Drawer */}
      <CartDrawer whatsappNumber={whatsappNumber} />

      {/* Global Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp number={whatsappNumber} />
    </main>
  );
}
