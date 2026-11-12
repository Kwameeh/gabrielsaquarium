import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings & Homepage Copy',
  type: 'document',
  fieldsets: [
    { name: 'general', title: 'General & Contact Info', options: { collapsible: true, collapsed: false } },
    { name: 'hero', title: 'Homepage: Hero Section', options: { collapsible: true, collapsed: true } },
    { name: 'trust', title: 'Homepage: Trust Strip', options: { collapsible: true, collapsed: true } },
    { name: 'categories', title: 'Homepage: Category Showcase', options: { collapsible: true, collapsed: true } },
    { name: 'tanks', title: 'Homepage: Featured Tanks', options: { collapsible: true, collapsed: true } },
    { name: 'customBuild', title: 'Homepage: Custom Builds Section', options: { collapsible: true, collapsed: true } },
    { name: 'ourWork', title: 'Homepage: Our Work Showcase', options: { collapsible: true, collapsed: true } },
    { name: 'gallerySection', title: 'Homepage: Motion Gallery Section', options: { collapsible: true, collapsed: true } },
    { name: 'maintenance', title: 'Homepage: Maintenance Plans Section', options: { collapsible: true, collapsed: true } },
    { name: 'fishSupplies', title: 'Homepage: Fish & Supplies Section', options: { collapsible: true, collapsed: true } },
    { name: 'testimonialsFaq', title: 'Homepage: Testimonials & FAQs Section', options: { collapsible: true, collapsed: true } },
    { name: 'footer', title: 'Footer & Call-To-Action Banner', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // 1. General & Contact
    defineField({ name: 'businessName', type: 'string', fieldset: 'general', initialValue: "Gabriel's Aquarium" }),
    defineField({ name: 'logo', type: 'image', fieldset: 'general' }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp number',
      type: 'string',
      fieldset: 'general',
      description: 'International format, digits only. Example: 233249384800',
      initialValue: '233249384800',
      validation: (r) => r.required().regex(/^\d{10,15}$/, 'Digits only, no + or spaces'),
    }),
    defineField({ name: 'phone', type: 'string', fieldset: 'general', initialValue: '+233 24 938 4800' }),
    defineField({ name: 'email', type: 'string', fieldset: 'general', initialValue: 'info@gabrielsaquarium.com' }),
    defineField({ name: 'address', type: 'text', rows: 2, fieldset: 'general', initialValue: 'American House, East Legon, Accra, Ghana' }),
    defineField({ name: 'mapLink', title: 'Google Maps link', type: 'url', fieldset: 'general' }),
    defineField({
      name: 'openingHours',
      type: 'array',
      fieldset: 'general',
      of: [{ type: 'string' }],
      description: 'One line each, e.g. "Mon - Sat: 8am - 8pm"',
      initialValue: ['Monday - Saturday: 8:00 AM - 8:00 PM', 'Sunday: Closed (Emergency Call-Outs Only)'],
    }),
    defineField({ name: 'instagram', type: 'url', fieldset: 'general' }),
    defineField({ name: 'facebook', type: 'url', fieldset: 'general' }),
    defineField({ name: 'tiktok', type: 'url', fieldset: 'general' }),
    defineField({ name: 'announcementText', title: 'Announcement bar text', type: 'string', fieldset: 'general', initialValue: 'Free consultation on all custom aquarium builds across Greater Accra' }),
    defineField({ name: 'announcementActive', title: 'Show announcement bar', type: 'boolean', fieldset: 'general', initialValue: true }),

    // 2. Hero Section
    defineField({ name: 'heroBadge', title: 'Hero Badge', type: 'string', fieldset: 'hero', initialValue: "Ghana's Premier Aquarium Specialist" }),
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string', fieldset: 'hero', initialValue: 'Handcrafted Aquariums & Living Reefs' }),
    defineField({ name: 'heroSubheadline', title: 'Hero Subtitle', type: 'text', rows: 2, fieldset: 'hero', initialValue: 'Custom living walls, curved-glass panoramic tanks, vibrant live fish, and professional maintenance across Greater Accra.' }),
    defineField({ name: 'heroCtaPrimary', title: 'Primary CTA Button Text', type: 'string', fieldset: 'hero', initialValue: 'Browse Tanks' }),
    defineField({ name: 'heroCtaSecondary', title: 'Secondary CTA Button Text', type: 'string', fieldset: 'hero', initialValue: 'Get a Custom Quote' }),
    defineField({ name: 'heroGuaranteeTitle', title: 'Floating Guarantee Badge Title', type: 'string', fieldset: 'hero', initialValue: "Gabriel's Guarantee" }),
    defineField({ name: 'heroGuaranteeText', title: 'Floating Guarantee Badge Text', type: 'string', fieldset: 'hero', initialValue: 'Live Fish Health & Leak-Free Tank Guarantee' }),

    // 3. Trust Strip
    defineField({
      name: 'trustBadges',
      title: 'Trust Badges',
      type: 'array',
      fieldset: 'trust',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'desc', title: 'Description', type: 'text', rows: 2, validation: (r) => r.required() }),
          ],
        },
      ],
      initialValue: [
        {
          title: 'Custom Tank Engineering',
          desc: 'Curved glass, rimless low-iron, and custom in-wall cabinetry built to your exact specs.',
        },
        {
          title: 'Live Fish Health Guarantee',
          desc: 'Quarantined, parasite-free, and acclimated for Ghanaian water parameters.',
        },
        {
          title: 'Installation & Maintenance',
          desc: 'Complete setup, water chemistry balancing, and ongoing residential/office care.',
        },
        {
          title: 'Safe Delivery in Ghana',
          desc: 'Specialized aquatic transit with oxygen packaging safely delivered across Ghana.',
        },
      ],
    }),

    // 4. Categories Section
    defineField({ name: 'categoriesBadge', title: 'Categories Badge', type: 'string', fieldset: 'categories', initialValue: 'Curated Collections' }),
    defineField({ name: 'categoriesHeading', title: 'Categories Heading', type: 'string', fieldset: 'categories', initialValue: 'Everything for Your Aquatic World' }),
    defineField({ name: 'categoriesSubtitle', title: 'Categories Subtitle', type: 'text', rows: 2, fieldset: 'categories', initialValue: 'From handcrafted curved tanks to living reefs and premium feeds, discover everything you need.' }),

    // 5. Featured Tanks Section
    defineField({ name: 'featuredTanksBadge', title: 'Featured Tanks Badge', type: 'string', fieldset: 'tanks', initialValue: 'Signature Craftsmanship' }),
    defineField({ name: 'featuredTanksHeading', title: 'Featured Tanks Heading', type: 'string', fieldset: 'tanks', initialValue: 'Ready-Made & Curved Glass Tanks' }),
    defineField({ name: 'featuredTanksSubtitle', title: 'Featured Tanks Subtitle', type: 'text', rows: 2, fieldset: 'tanks', initialValue: 'Seamless curved-front glass, ultra-clear low-iron sheets, and leak-free precision joints. Delivered and installed safely at your location.' }),

    // 6. Custom Build Section
    defineField({ name: 'customBuildBadge', title: 'Custom Build Badge', type: 'string', fieldset: 'customBuild', initialValue: 'Bespoke Architectural Systems' }),
    defineField({ name: 'customBuildHeading', title: 'Custom Build Heading', type: 'string', fieldset: 'customBuild', initialValue: 'Turn Any Wall into a Living Coral or Freshwater Oasis' }),
    defineField({ name: 'customBuildDescription', title: 'Custom Build Description', type: 'text', rows: 3, fieldset: 'customBuild', initialValue: 'Whether you envision a sleek room-divider in a luxury penthouse, a serene freshwater nature tank in your living room, or a statement marine aquarium in a restaurant lobby, our artisans build it to perfection.' }),
    defineField({
      name: 'customBuildSteps',
      title: 'Custom Build Steps',
      type: 'array',
      fieldset: 'customBuild',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'num', title: 'Step Number (e.g. 01)', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'desc', title: 'Description', type: 'text', rows: 2 }),
          ],
        },
      ],
      initialValue: [
        { num: '01', title: 'Share Your Space', desc: 'Tell us where you want your aquarium and send photos of the room.' },
        { num: '02', title: 'Custom 3D CAD Design', desc: 'We tailor dimensions, filtration chambers, and cabinet finish.' },
        { num: '03', title: 'Master Glass Crafting', desc: 'Hand-assembled with ultra-clear glass, precision silicone & plumbing.' },
        { num: '04', title: 'White-Glove Installation', desc: 'Delivered, filled, aquascaped, and biologically established.' },
      ],
    }),

    // 7. Our Work Section
    defineField({ name: 'ourWorkBadge', title: 'Our Work Badge', type: 'string', fieldset: 'ourWork', initialValue: 'Ghana Portfolio' }),
    defineField({ name: 'ourWorkHeading', title: 'Our Work Heading', type: 'string', fieldset: 'ourWork', initialValue: 'Recent Living Installations' }),
    defineField({ name: 'ourWorkSubtitle', title: 'Our Work Subtitle', type: 'text', rows: 2, fieldset: 'ourWork', initialValue: "From residential penthouses to flagship commercial offices, explore custom installations handcrafted and maintained by Gabriel's Aquarium." }),

    // 8. Motion Gallery Section
    defineField({ name: 'galleryBadge', title: 'Gallery Badge', type: 'string', fieldset: 'gallerySection', initialValue: 'Live From The Workshop & Builds' }),
    defineField({ name: 'galleryHeading', title: 'Gallery Heading', type: 'string', fieldset: 'gallerySection', initialValue: 'Living Aquascapes In Motion' }),
    defineField({ name: 'gallerySubtitle', title: 'Gallery Subtitle', type: 'text', rows: 2, fieldset: 'gallerySection', initialValue: 'Watch our living reefs, custom installations, and vibrant fish in action.' }),

    // 9. Maintenance Section
    defineField({ name: 'maintenanceBadge', title: 'Maintenance Badge', type: 'string', fieldset: 'maintenance', initialValue: 'Zero Stress Aquatics' }),
    defineField({ name: 'maintenanceHeading', title: 'Maintenance Heading', type: 'string', fieldset: 'maintenance', initialValue: 'Professional Maintenance Plans' }),
    defineField({ name: 'maintenanceSubtitle', title: 'Maintenance Subtitle', type: 'text', rows: 2, fieldset: 'maintenance', initialValue: 'Keep your aquarium crystal clear and biologically balanced without lifting a finger. Routine scheduled care for homes and businesses in Accra.' }),

    // 10. Fish & Supplies Section
    defineField({ name: 'fishSuppliesBadge', title: 'Fish & Supplies Badge', type: 'string', fieldset: 'fishSupplies', initialValue: 'Livestock & Essentials' }),
    defineField({ name: 'fishSuppliesHeading', title: 'Fish & Supplies Heading', type: 'string', fieldset: 'fishSupplies', initialValue: 'Live Fish & Premium Supplies' }),
    defineField({ name: 'fishSuppliesSubtitle', title: 'Fish & Supplies Subtitle', type: 'text', rows: 2, fieldset: 'fishSupplies', initialValue: 'Healthy quarantined live fish, specialized feeds, filtration media, and aquascaping essentials delivered to your doorstep.' }),

    // 11. Testimonials & FAQs Section
    defineField({ name: 'testimonialsHeading', title: 'Testimonials Heading', type: 'string', fieldset: 'testimonialsFaq', initialValue: 'What Our Clients Say' }),
    defineField({ name: 'testimonialsSubtitle', title: 'Testimonials Subtitle', type: 'text', rows: 2, fieldset: 'testimonialsFaq', initialValue: 'Trusted by homeowners, architects, and luxury venues across Ghana.' }),
    defineField({ name: 'faqsHeading', title: 'FAQs Heading', type: 'string', fieldset: 'testimonialsFaq', initialValue: 'Frequently Asked Questions' }),
    defineField({ name: 'faqsSubtitle', title: 'FAQs Subtitle', type: 'text', rows: 2, fieldset: 'testimonialsFaq', initialValue: 'Everything you need to know about ordering, delivery, custom builds, and ongoing care.' }),

    // 12. Footer Section
    defineField({ name: 'footerCtaBadge', title: 'Footer CTA Badge', type: 'string', fieldset: 'footer', initialValue: 'Start Your Aquarium Journey' }),
    defineField({ name: 'footerCtaHeading', title: 'Footer CTA Heading', type: 'string', fieldset: 'footer', initialValue: 'Ready to Build Your Dream Aquarium?' }),
    defineField({ name: 'footerCtaSubtitle', title: 'Footer CTA Subtitle', type: 'text', rows: 2, fieldset: 'footer', initialValue: 'Whether you need a curved glass tank, a custom in-wall coral reef, healthy live fish, or routine tank care in Ghana, Gabriel and his team are ready to assist.' }),
    defineField({ name: 'footerAboutText', title: 'Footer About Blurb', type: 'text', rows: 3, fieldset: 'footer', initialValue: "Ghana's premier aquarium specialist. Handcrafted curved-glass panoramic tanks, living coral reefs, and healthy live fish delivered safely across Ghana." }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings & Homepage Copy' }) },
});
