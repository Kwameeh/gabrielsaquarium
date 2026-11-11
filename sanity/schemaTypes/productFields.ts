import { defineField, type SlugIsUniqueValidator } from 'sanity';

export const PRODUCT_TYPES = ['tank', 'fish', 'feed', 'accessory'] as const;

export const productGroups = [
  { name: 'basics', title: 'Basics', default: true },
  { name: 'specs', title: 'Details & specs' },
];

export const isUniqueAcrossProducts: SlugIsUniqueValidator = async (slug, context) => {
  const { document, getClient } = context;
  const client = getClient({ apiVersion: '2025-01-01' });
  const id = document?._id.replace(/^drafts\./, '');
  const params = { draft: `drafts.${id}`, published: id, slug };
  const query = `!defined(*[_type in ["tank","fish","feed","accessory"] && !(_id in [$draft, $published]) && slug.current == $slug][0]._id)`;
  return await client.fetch(query, params);
};

export const titleField = (title = 'Name') =>
  defineField({ name: 'title', title, type: 'string', group: 'basics', validation: (r) => r.required() });

export const slugField = defineField({
  name: 'slug',
  type: 'slug',
  group: 'basics',
  options: { source: 'title', isUnique: isUniqueAcrossProducts },
  validation: (r) => r.required(),
});

export const imagesField = defineField({
  name: 'images',
  type: 'array',
  group: 'basics',
  of: [{ type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt text' }] }],
  validation: (r) => r.required().min(1),
});

export const descriptionField = defineField({ name: 'description', type: 'text', rows: 4, group: 'basics' });

export const featuredField = defineField({
  name: 'featured',
  title: 'Show on home page',
  type: 'boolean',
  initialValue: false,
  group: 'basics',
});

export const priceField = defineField({
  name: 'price',
  title: 'Price (GHS)',
  type: 'number',
  group: 'basics',
  validation: (r) => r.required().min(0),
});

export const inStockField = (title = 'In stock') =>
  defineField({ name: 'inStock', title, type: 'boolean', initialValue: true, group: 'basics' });
