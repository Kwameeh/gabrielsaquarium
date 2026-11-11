import AquariumHero from '@/components/hero/AquariumHero';
import { AnnouncementBar } from '@/components/header/AnnouncementBar';
import { TrustStrip } from '@/components/home/TrustStrip';
import { CategoryTiles } from '@/components/home/CategoryTiles';
import { FeaturedTanks } from '@/components/home/FeaturedTanks';
import { CustomBuildTeaser } from '@/components/home/CustomBuildTeaser';
import { OurWorkShowcase } from '@/components/home/OurWorkShowcase';
import { MaintenanceSection } from '@/components/home/MaintenanceSection';
import { FishSuppliesSection } from '@/components/home/FishSuppliesSection';
import { TestimonialsFaq } from '@/components/home/TestimonialsFaq';
import { Footer } from '@/components/home/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';

export default function Home() {
  const whatsappNumber = '233241234567';

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-highlight selection:text-highlight-foreground">
      {/* 0. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 1. 3D Radial Hero & Floating Pill Header */}
      <AquariumHero whatsappNumber={whatsappNumber} />

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 3. Category Tiles */}
      <CategoryTiles />

      {/* 4. Featured Tanks */}
      <FeaturedTanks whatsappNumber={whatsappNumber} />

      {/* 5. Custom Build Teaser (Dark Mode Section) */}
      <CustomBuildTeaser whatsappNumber={whatsappNumber} />

      {/* 6. Our Work Showcase Gallery */}
      <OurWorkShowcase />

      {/* 7. Maintenance Plans Section (Dark Mode Section) */}
      <MaintenanceSection whatsappNumber={whatsappNumber} />

      {/* 8. Fish & Supplies Highlights */}
      <FishSuppliesSection />

      {/* 9. Testimonials & FAQs */}
      <TestimonialsFaq />

      {/* 10. Footer & Final CTA (Dark Mode Section) */}
      <Footer whatsappNumber={whatsappNumber} />

      {/* Global Interactive Cart Drawer */}
      <CartDrawer whatsappNumber={whatsappNumber} />

      {/* Global Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp number={whatsappNumber} />
    </main>
  );
}
