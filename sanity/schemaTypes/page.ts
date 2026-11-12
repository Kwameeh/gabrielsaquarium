import { defineField, defineType } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      description: 'Use: about, custom-tanks, maintenance, contact, delivery-policy, terms, privacy',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'badge', title: 'Badge / Category Tag', type: 'string' }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'intro', title: 'Intro Paragraph', type: 'text', rows: 3 }),
    defineField({
      name: 'featuresHeading',
      title: 'Features / Highlights Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'features',
      title: 'Key Highlights / Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'description', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({ name: 'body', title: 'Rich Content / Policy Body', type: 'array', of: [{ type: 'block' }] }),
  ],
  preview: { select: { title: 'title', subtitle: 'slug.current', media: 'heroImage' } },
});
