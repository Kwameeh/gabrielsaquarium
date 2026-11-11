import { defineField, defineType } from 'sanity';

export const maintenancePlan = defineType({
  name: 'maintenancePlan',
  title: 'Maintenance Plan',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'priceNote',
      title: 'Price text',
      type: 'string',
      description: 'e.g. "From GHS 300 per visit" or "Contact us"',
    }),
    defineField({ name: 'features', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'highlighted', title: 'Mark as most popular', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', type: 'number', initialValue: 10 }),
  ],
  preview: { select: { title: 'name', subtitle: 'priceNote' } },
});
