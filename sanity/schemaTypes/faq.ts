import { defineField, defineType } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'answer', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'showOnHome', title: 'Show on home page', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', type: 'number', initialValue: 10 }),
  ],
  preview: { select: { title: 'question' } },
});
