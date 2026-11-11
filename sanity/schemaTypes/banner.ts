import { defineField, defineType } from 'sanity';

export const banner = defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'placement',
      type: 'string',
      options: {
        list: [
          { title: 'Hero (top of home page)', value: 'hero' },
          { title: 'Promo (between sections)', value: 'promo' },
        ],
        layout: 'radio',
      },
      initialValue: 'hero',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'headline', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'subtext', type: 'string' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'buttonLabel', type: 'string' }),
    defineField({ name: 'buttonLink', type: 'string', description: 'Example: /custom-tanks' }),
    defineField({ name: 'order', type: 'number', description: 'Lower numbers show first', initialValue: 10 }),
    defineField({ name: 'active', type: 'boolean', initialValue: true }),
  ],
  preview: { select: { title: 'headline', subtitle: 'placement', media: 'image' } },
});
