import { defineField, defineType } from 'sanity';
import {
  descriptionField,
  featuredField,
  imagesField,
  inStockField,
  productGroups,
  slugField,
  titleField,
} from './productFields';

export const tank = defineType({
  name: 'tank',
  title: 'Tank',
  type: 'document',
  groups: productGroups,
  fields: [
    titleField('Tank name'),
    slugField,
    defineField({
      name: 'purchaseType',
      title: 'How do customers get this tank?',
      type: 'string',
      group: 'basics',
      options: {
        list: [
          { title: 'Enquire first (price optional)', value: 'inquire' },
          { title: 'Buy online (price + Add to cart)', value: 'buy' },
        ],
        layout: 'radio',
      },
      initialValue: 'inquire',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (GHS)',
      type: 'number',
      group: 'basics',
      description: 'Required for "Buy online". For "Enquire first" it is optional and shows as "From GHS x".',
      validation: (r) =>
        r.min(0).custom((value, ctx) => {
          const doc = ctx.document as { purchaseType?: string } | undefined;
          return doc?.purchaseType === 'buy' && value == null
            ? 'Price is required when customers can add this to the cart'
            : true;
        }),
    }),
    { ...inStockField(), hidden: (context) => (context.document as Record<string, unknown> | undefined)?.purchaseType !== 'buy' },
    imagesField,
    descriptionField,
    featuredField,

    // Specs
    defineField({ name: 'lengthCm', title: 'Length (cm)', type: 'number', group: 'specs', validation: (r) => r.required().min(1) }),
    defineField({ name: 'widthCm', title: 'Width / depth (cm)', type: 'number', group: 'specs', validation: (r) => r.required().min(1) }),
    defineField({ name: 'heightCm', title: 'Height (cm)', type: 'number', group: 'specs', validation: (r) => r.required().min(1) }),
    defineField({ name: 'volumeLitres', title: 'Volume (litres)', type: 'number', group: 'specs' }),
    defineField({
      name: 'shape',
      type: 'string',
      group: 'specs',
      options: { list: ['Rectangular', 'Cube', 'Curved front (bow-front)', 'Curved corner', 'Corner', 'Cylinder', 'Other'] },
    }),
    defineField({
      name: 'glassType',
      type: 'string',
      group: 'specs',
      options: { list: ['Standard clear', 'Low-iron (ultra clear)', 'Tempered', 'Acrylic'] },
    }),
    defineField({ name: 'glassThicknessMm', title: 'Glass thickness (mm)', type: 'number', group: 'specs' }),
    defineField({
      name: 'frameStyle',
      type: 'string',
      group: 'specs',
      options: { list: ['Rimless', 'Framed'], layout: 'radio' },
    }),
    defineField({
      name: 'suitableFor',
      title: 'Suitable for',
      type: 'string',
      group: 'specs',
      options: { list: ['Freshwater', 'Marine', 'Freshwater and marine'], layout: 'radio' },
    }),
    defineField({
      name: 'overflow',
      title: 'Overflow / filtration',
      type: 'string',
      group: 'specs',
      options: { list: ['None', 'Pre-drilled', 'Built-in overflow', 'All-in-one (built-in sump)'] },
    }),
    defineField({
      name: 'includes',
      title: "What's included",
      type: 'array',
      group: 'specs',
      of: [{ type: 'string' }],
      options: { list: ['Stand / cabinet', 'Lid / hood', 'LED light', 'Filter', 'Heater', 'Sump', 'Background', 'Leveling mat'] },
    }),
    defineField({ name: 'weightKg', title: 'Weight, empty (kg)', type: 'number', group: 'specs' }),
    defineField({
      name: 'leadTime',
      title: 'Availability / lead time',
      type: 'string',
      group: 'specs',
      description: 'e.g. "In stock" or "Made to order, 7 to 10 days"',
    }),
    defineField({ name: 'warranty', type: 'string', group: 'specs', description: 'e.g. "2 years"' }),
  ],
  preview: { select: { title: 'title', subtitle: 'purchaseType', media: 'images.0' } },
});
