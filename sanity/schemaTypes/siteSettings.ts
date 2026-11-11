import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'businessName', type: 'string', initialValue: "Gabriel's Aquarium" }),
    defineField({ name: 'logo', type: 'image' }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp number',
      type: 'string',
      description: 'International format, digits only. Example: 233241234567',
      initialValue: '233241234567',
      validation: (r) => r.required().regex(/^\d{10,15}$/, 'Digits only, no + or spaces'),
    }),
    defineField({ name: 'phone', type: 'string', initialValue: '+233 24 123 4567' }),
    defineField({ name: 'email', type: 'string', initialValue: 'gabrielsaquarium@gmail.com' }),
    defineField({ name: 'address', type: 'text', rows: 2, initialValue: 'Kasoa, Greater Accra Region, Ghana' }),
    defineField({ name: 'mapLink', title: 'Google Maps link', type: 'url' }),
    defineField({
      name: 'openingHours',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'One line each, e.g. "Mon - Sat: 8am - 6pm"',
      initialValue: ['Mon - Sat: 8:00 AM - 6:00 PM', 'Sunday: By Appointment'],
    }),
    defineField({ name: 'instagram', type: 'url' }),
    defineField({ name: 'facebook', type: 'url' }),
    defineField({ name: 'tiktok', type: 'url' }),
    defineField({ name: 'announcementText', title: 'Announcement bar text', type: 'string', initialValue: 'Free consultation on all custom aquarium builds' }),
    defineField({ name: 'announcementActive', title: 'Show announcement bar', type: 'boolean', initialValue: true }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
});
