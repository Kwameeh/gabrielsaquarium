import { defineField, defineType } from 'sanity';
import {
  descriptionField,
  featuredField,
  imagesField,
  inStockField,
  priceField,
  productGroups,
  slugField,
  titleField,
} from './productFields';

export const accessory = defineType({
  name: 'accessory',
  title: 'Accessory',
  type: 'document',
  groups: productGroups,
  fields: [
    titleField('Product name'),
    slugField,
    defineField({
      name: 'category',
      type: 'string',
      group: 'basics',
      options: {
        list: [
          'Filtration',
          'Heating and cooling',
          'Lighting',
          'Water care',
          'Substrate and decor',
          'Stands and cabinets',
          'Test kits and tools',
          'Other',
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'brand', type: 'string', group: 'basics' }),
    priceField,
    inStockField(),
    imagesField,
    descriptionField,
    featuredField,

    // Specs
    defineField({
      name: 'suitableFor',
      title: 'Suitable for',
      type: 'string',
      group: 'specs',
      description: 'e.g. "Tanks up to 250 litres"',
    }),
    defineField({
      name: 'specs',
      title: 'Specifications',
      type: 'array',
      group: 'specs',
      description: 'e.g. Flow rate = 1050 L/h, Power = 200 W',
      of: [
        {
          type: 'object',
          name: 'spec',
          fields: [
            { name: 'label', type: 'string', validation: (r) => r.required() },
            { name: 'value', type: 'string', validation: (r) => r.required() },
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
    }),
    defineField({ name: 'whatsIncluded', title: "What's in the box", type: 'array', group: 'specs', of: [{ type: 'string' }] }),
    defineField({ name: 'warranty', type: 'string', group: 'specs', description: 'e.g. "1 year"' }),
  ],
  preview: { select: { title: 'title', subtitle: 'category', media: 'images.0' } },
});
