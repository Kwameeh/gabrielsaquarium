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
import { sanityFetch } from '@/sanity/lib/live';
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
    { data: settings },
    { data: heroItems },
    { data: galleryItems },
    { data: tanks },
    { data: projects },
    { data: fishList },
    { data: suppliesList },
    { data: plansList },
    { data: testimonials },
    { data: faqs },
  ] = await Promise.all([
    sanityFetch({ query: settingsQuery }).catch(() => ({ data: null })),
    sanityFetch({ query: heroGalleryQuery }).catch(() => ({ data: [] })),
    sanityFetch({ query: homeGalleryQuery }).catch(() => ({ data: [] })),
    sanityFetch({ query: tanksQuery }).catch(() => ({ data: [] })),
    sanityFetch({ query: projectsQuery }).catch(() => ({ data: [] })),
    sanityFetch({ query: fishQuery }).catch(() => ({ data: [] })),
    sanityFetch({ query: suppliesQuery }).catch(() => ({ data: [] })),
    sanityFetch({ query: plansQuery }).catch(() => ({ data: [] })),
    sanityFetch({ query: testimonialsQuery }).catch(() => ({ data: [] })),
    sanityFetch({ query: homeFaqsQuery }).catch(() => ({ data: [] })),
  ]);

  const whatsappNumber = settings?.whatsappNumber || '233249384800';
  const heroGallery = buildHeroGalleryItems(heroItems || []);

  const heroVideoItem = heroItems?.find((item: any) => item.mediaType === 'video');
  const candidateVideoUrl = heroVideoItem?.videoFileUrl || heroVideoItem?.videoUrl;
  // Use optimized local video (2.1MB with faststart) instead of the 45.7MB uncompressed CDN file
  const heroVideoUrl =
    candidateVideoUrl && !candidateVideoUrl.includes('51558fa95dd82f9f28eedabc19fe690aaf58381c')
      ? candidateVideoUrl
      : '/videos/aquarium-showcase.mp4';

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
        settings={settings}
      />

      {/* 2. Trust Strip */}
      <TrustStrip badges={settings?.trustBadges} />

      {/* 3. Category Tiles */}
      <CategoryTiles
        badge={settings?.categoriesBadge}
        heading={settings?.categoriesHeading}
        subtitle={settings?.categoriesSubtitle}
      />

      {/* 4. Featured Tanks */}
      <FeaturedTanks
        whatsappNumber={whatsappNumber}
        sanityTanks={tanks && tanks.length > 0 ? tanks : undefined}
        badge={settings?.featuredTanksBadge}
        heading={settings?.featuredTanksHeading}
        subtitle={settings?.featuredTanksSubtitle}
      />

      {/* 5. Custom Build Teaser (Dark Mode Section) */}
      <CustomBuildTeaser
        whatsappNumber={whatsappNumber}
        badge={settings?.customBuildBadge}
        heading={settings?.customBuildHeading}
        description={settings?.customBuildDescription}
        steps={settings?.customBuildSteps}
      />

      {/* 6. Our Work Showcase Gallery */}
      <OurWorkShowcase
        sanityProjects={projects && projects.length > 0 ? projects : undefined}
        badge={settings?.ourWorkBadge}
        heading={settings?.ourWorkHeading}
        subtitle={settings?.ourWorkSubtitle}
      />

      {/* 6.5. Auto-Scrolling Motion Gallery (Videos & Images) */}
      <AutoScrollGallery
        whatsappNumber={whatsappNumber}
        sanityItems={galleryItems && galleryItems.length > 0 ? galleryItems : undefined}
        badge={settings?.galleryBadge}
        heading={settings?.galleryHeading}
        subtitle={settings?.gallerySubtitle}
      />

      {/* 7. Maintenance Plans Section (Dark Mode Section) */}
      <MaintenanceSection
        whatsappNumber={whatsappNumber}
        sanityPlans={plansList && plansList.length > 0 ? plansList : undefined}
        badge={settings?.maintenanceBadge}
        heading={settings?.maintenanceHeading}
        subtitle={settings?.maintenanceSubtitle}
      />

      {/* 8. Fish & Supplies Highlights */}
      <FishSuppliesSection
        sanityProducts={
          (fishList?.length > 0 || suppliesList?.length > 0)
            ? [...(fishList || []), ...(suppliesList || [])]
            : undefined
        }
        badge={settings?.fishSuppliesBadge}
        heading={settings?.fishSuppliesHeading}
        subtitle={settings?.fishSuppliesSubtitle}
      />

      {/* 9. Testimonials & FAQs */}
      <TestimonialsFaq
        sanityTestimonials={testimonials && testimonials.length > 0 ? testimonials : undefined}
        sanityFaqs={faqs && faqs.length > 0 ? faqs : undefined}
        testimonialsHeading={settings?.testimonialsHeading}
        testimonialsSubtitle={settings?.testimonialsSubtitle}
        faqsHeading={settings?.faqsHeading}
        faqsSubtitle={settings?.faqsSubtitle}
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
