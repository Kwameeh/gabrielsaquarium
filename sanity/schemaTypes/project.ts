import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project (Our Work)',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({
      name: 'clientType',
      type: 'string',
      options: { list: ['Home', 'Office', 'Restaurant', 'Hotel', 'Other'] },
    }),
    defineField({ name: 'custom', title: 'Custom build', type: 'boolean', initialValue: false }),
    defineField({ name: 'tankSize', title: 'Tank size', type: 'string', description: 'e.g. 240 x 60 x 70 cm' }),
    defineField({ name: 'summary', type: 'text', rows: 4 }),
    defineField({
      name: 'images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (r) => r.required().min(1),
    }),
    defineField({ name: 'featured', title: 'Show on home page', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'title', subtitle: 'clientType', media: 'images.0' } },
});
