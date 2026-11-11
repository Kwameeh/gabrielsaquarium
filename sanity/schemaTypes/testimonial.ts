import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', type: 'string', description: 'e.g. Home owner, Restaurant owner' }),
    defineField({ name: 'quote', type: 'text', rows: 3, validation: (r) => r.required() }),
    defineField({ name: 'photo', type: 'image' }),
  ],
  preview: { select: { title: 'name', subtitle: 'quote', media: 'photo' } },
});
