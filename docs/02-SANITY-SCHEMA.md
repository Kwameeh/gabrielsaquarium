# 02. Sanity Schema (lean)

Eleven document types (four of them are products). Every field below is shown somewhere on the website. Nothing else.

| Type | Purpose | Singleton? |
|---|---|---|
| `siteSettings` | Contact details, hours, socials, announcement bar | Yes |
| `banner` | Hero and promo banners | No |
| `tank`, `fish`, `feed`, `accessory` | Products, one type per kind (different fields for each) | No |
| `project` | Our Work portfolio | No |
| `maintenancePlan` | Maintenance plans | No |
| `testimonial` | Customer quotes | No |
| `faq` | Questions and answers | No |
| `page` | About, Custom Tanks intro, policies | No |

Put each schema in `sanity/schemaTypes/` (or `src/sanity/schemaTypes/`, depending on what `sanity init` created).

---

## siteSettings.ts

```ts
import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'businessName', type: 'string', initialValue: "Gabreil's Aquarium"}),
    defineField({name: 'logo', type: 'image'}),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp number',
      type: 'string',
      description: 'International format, digits only. Example: 233241234567',
      validation: (r) => r.required().regex(/^\d{10,15}$/, 'Digits only, no + or spaces'),
    }),
    defineField({name: 'phone', type: 'string'}),
    defineField({name: 'email', type: 'string'}),
    defineField({name: 'address', type: 'text', rows: 2}),
    defineField({name: 'mapLink', title: 'Google Maps link', type: 'url'}),
    defineField({
      name: 'openingHours',
      type: 'array',
      of: [{type: 'string'}],
      description: 'One line each, e.g. "Mon - Sat: 8am - 6pm"',
    }),
    defineField({name: 'instagram', type: 'url'}),
    defineField({name: 'facebook', type: 'url'}),
    defineField({name: 'tiktok', type: 'url'}),
    defineField({name: 'announcementText', title: 'Announcement bar text', type: 'string'}),
    defineField({name: 'announcementActive', title: 'Show announcement bar', type: 'boolean', initialValue: false}),
  ],
  preview: {prepare: () => ({title: 'Site Settings'})},
})
```

## banner.ts

```ts
import {defineField, defineType} from 'sanity'

export const banner = defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'placement',
      type: 'string',
      options: {list: [{title: 'Hero (top of home page)', value: 'hero'}, {title: 'Promo (between sections)', value: 'promo'}], layout: 'radio'},
      initialValue: 'hero',
      validation: (r) => r.required(),
    }),
    defineField({name: 'headline', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'subtext', type: 'string'}),
    defineField({name: 'image', type: 'image', options: {hotspot: true}, validation: (r) => r.required()}),
    defineField({name: 'buttonLabel', type: 'string'}),
    defineField({name: 'buttonLink', type: 'string', description: 'Example: /custom-tanks'}),
    defineField({name: 'order', type: 'number', description: 'Lower numbers show first', initialValue: 10}),
    defineField({name: 'active', type: 'boolean', initialValue: true}),
  ],
  preview: {select: {title: 'headline', subtitle: 'placement', media: 'image'}},
})
```

## Product schemas: one type per kind

Fish, tanks and food need different details, so each kind is its **own document type**. In Studio the owner sees a **Products** folder with Tank, Fish, Feed and Accessory lists, and each form only shows fields that make sense for that kind. The fields come from how established aquarium shops describe their products (see `07-PRODUCT-FIELDS.md` for the research and the reasoning behind every field).

| Type | Behaviour | Fields (beyond name, photos, description, price, featured) |
|---|---|---|
| `tank` | **Buy online** or **Enquire first**, chosen per tank | Size L x W x H, volume, shape, glass type and thickness, frame style, suitable for (fresh / marine), overflow, what's included, weight, lead time, warranty |
| `fish` | Always add to cart | Scientific name, water type, care level, temperament, diet, adult size, size sold, minimum tank, water conditions, compatibility, reef safe (marine only), sold as |
| `feed` | Always add to cart | Brand, food type, pack size, floating / sinking, pellet size, suitable for, features, ingredients, guaranteed analysis, feeding guide |
| `accessory` | Always add to cart | Category, brand, suitable for, specifications (label + value list), what's in the box, warranty |

`accessory` covers filters, heaters, lights, water conditioners, decor, stands and test kits. **If the shop does not sell these, simply do not create that file or register it.**

Create all of these in `schemaTypes/`. Start with the shared helpers.

### productFields.ts (shared pieces)

```ts
import {defineField, type SlugIsUniqueValidator} from 'sanity'

export const PRODUCT_TYPES = ['tank', 'fish', 'feed', 'accessory'] as const

export const productGroups = [
  {name: 'basics', title: 'Basics', default: true},
  {name: 'specs', title: 'Details & specs'},
]

// Every product lives at /product/[slug], so slugs must be unique across ALL product types.
export const isUniqueAcrossProducts: SlugIsUniqueValidator = async (slug, context) => {
  const {document, getClient} = context
  const client = getClient({apiVersion: '2025-01-01'})
  const id = document?._id.replace(/^drafts\./, '')
  const params = {draft: `drafts.${id}`, published: id, slug}
  const query = `!defined(*[_type in ["tank","fish","feed","accessory"] && !(_id in [$draft, $published]) && slug.current == $slug][0]._id)`
  return await client.fetch(query, params)
}

export const titleField = (title = 'Name') =>
  defineField({name: 'title', title, type: 'string', group: 'basics', validation: (r) => r.required()})

export const slugField = defineField({
  name: 'slug',
  type: 'slug',
  group: 'basics',
  options: {source: 'title', isUnique: isUniqueAcrossProducts},
  validation: (r) => r.required(),
})

export const imagesField = defineField({
  name: 'images',
  type: 'array',
  group: 'basics',
  of: [{type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string', title: 'Alt text'}]}],
  validation: (r) => r.required().min(1),
})

export const descriptionField = defineField({name: 'description', type: 'text', rows: 4, group: 'basics'})

export const featuredField = defineField({
  name: 'featured',
  title: 'Show on home page',
  type: 'boolean',
  initialValue: false,
  group: 'basics',
})

export const priceField = defineField({
  name: 'price',
  title: 'Price (GHS)',
  type: 'number',
  group: 'basics',
  validation: (r) => r.required().min(0),
})

export const inStockField = (title = 'In stock') =>
  defineField({name: 'inStock', title, type: 'boolean', initialValue: true, group: 'basics'})
```

### tank.ts

```ts
import {defineField, defineType} from 'sanity'
import {descriptionField, featuredField, imagesField, inStockField, productGroups, slugField, titleField} from './productFields'

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
          {title: 'Enquire first (price optional)', value: 'inquire'},
          {title: 'Buy online (price + Add to cart)', value: 'buy'},
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
          const doc = ctx.document as {purchaseType?: string} | undefined
          return doc?.purchaseType === 'buy' && value == null ? 'Price is required when customers can add this to the cart' : true
        }),
    }),
    {...inStockField(), hidden: ({document}) => document?.purchaseType !== 'buy'},
    imagesField,
    descriptionField,
    featuredField,

    // Specs
    defineField({name: 'lengthCm', title: 'Length (cm)', type: 'number', group: 'specs', validation: (r) => r.required().min(1)}),
    defineField({name: 'widthCm', title: 'Width / depth (cm)', type: 'number', group: 'specs', validation: (r) => r.required().min(1)}),
    defineField({name: 'heightCm', title: 'Height (cm)', type: 'number', group: 'specs', validation: (r) => r.required().min(1)}),
    defineField({name: 'volumeLitres', title: 'Volume (litres)', type: 'number', group: 'specs'}),
    defineField({
      name: 'shape',
      type: 'string',
      group: 'specs',
      options: {list: ['Rectangular', 'Cube', 'Curved front (bow-front)', 'Curved corner', 'Corner', 'Cylinder', 'Other']},
    }),
    defineField({
      name: 'glassType',
      type: 'string',
      group: 'specs',
      options: {list: ['Standard clear', 'Low-iron (ultra clear)', 'Tempered', 'Acrylic']},
    }),
    defineField({name: 'glassThicknessMm', title: 'Glass thickness (mm)', type: 'number', group: 'specs'}),
    defineField({
      name: 'frameStyle',
      type: 'string',
      group: 'specs',
      options: {list: ['Rimless', 'Framed'], layout: 'radio'},
    }),
    defineField({
      name: 'suitableFor',
      title: 'Suitable for',
      type: 'string',
      group: 'specs',
      options: {list: ['Freshwater', 'Marine', 'Freshwater and marine'], layout: 'radio'},
    }),
    defineField({
      name: 'overflow',
      title: 'Overflow / filtration',
      type: 'string',
      group: 'specs',
      options: {list: ['None', 'Pre-drilled', 'Built-in overflow', 'All-in-one (built-in sump)']},
    }),
    defineField({
      name: 'includes',
      title: "What's included",
      type: 'array',
      group: 'specs',
      of: [{type: 'string'}],
      options: {list: ['Stand / cabinet', 'Lid / hood', 'LED light', 'Filter', 'Heater', 'Sump', 'Background', 'Leveling mat']},
    }),
    defineField({name: 'weightKg', title: 'Weight, empty (kg)', type: 'number', group: 'specs'}),
    defineField({
      name: 'leadTime',
      title: 'Availability / lead time',
      type: 'string',
      group: 'specs',
      description: 'e.g. "In stock" or "Made to order, 7 to 10 days"',
    }),
    defineField({name: 'warranty', type: 'string', group: 'specs', description: 'e.g. "2 years"'}),
  ],
  preview: {select: {title: 'title', subtitle: 'purchaseType', media: 'images.0'}},
})
```

### fish.ts

```ts
import {defineField, defineType} from 'sanity'
import {descriptionField, featuredField, imagesField, inStockField, priceField, productGroups, slugField, titleField} from './productFields'

export const fish = defineType({
  name: 'fish',
  title: 'Fish',
  type: 'document',
  groups: productGroups,
  fields: [
    titleField('Common name'),
    slugField,
    priceField,
    defineField({
      name: 'soldAs',
      title: 'Sold as',
      type: 'string',
      group: 'basics',
      initialValue: 'each',
      description: 'Shown after the price: "each", "per pair", "per group of 6"',
    }),
    inStockField('Available now'),
    imagesField,
    descriptionField,
    featuredField,

    // Specs
    defineField({name: 'scientificName', title: 'Scientific name', type: 'string', group: 'specs'}),
    defineField({
      name: 'waterType',
      title: 'Water type',
      type: 'string',
      group: 'specs',
      options: {list: ['Freshwater', 'Marine', 'Brackish'], layout: 'radio'},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'careLevel',
      title: 'Care level',
      type: 'string',
      group: 'specs',
      options: {list: ['Easy', 'Moderate', 'Advanced'], layout: 'radio'},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'temperament',
      type: 'string',
      group: 'specs',
      options: {list: ['Peaceful', 'Semi-aggressive', 'Aggressive'], layout: 'radio'},
    }),
    defineField({
      name: 'diet',
      type: 'string',
      group: 'specs',
      options: {list: ['Omnivore', 'Carnivore', 'Herbivore'], layout: 'radio'},
    }),
    defineField({name: 'adultSizeCm', title: 'Adult size (cm)', type: 'number', group: 'specs'}),
    defineField({
      name: 'sizeSold',
      title: 'Size you sell at',
      type: 'string',
      group: 'specs',
      description: 'e.g. "3 to 4 cm"',
    }),
    defineField({name: 'minTankLitres', title: 'Minimum tank size (litres)', type: 'number', group: 'specs'}),
    defineField({
      name: 'waterConditions',
      title: 'Water conditions',
      type: 'string',
      group: 'specs',
      description: 'e.g. "24 to 28 °C, pH 6.5 to 7.5"',
    }),
    defineField({
      name: 'compatibility',
      type: 'text',
      rows: 3,
      group: 'specs',
      description: 'Tank mates and group size, e.g. "Peaceful. Keep in groups of 6 or more. Avoid fin nippers."',
    }),
    defineField({
      name: 'reefSafe',
      title: 'Reef safe',
      type: 'string',
      group: 'specs',
      options: {list: ['Yes', 'With caution', 'No'], layout: 'radio'},
      hidden: ({document}) => document?.waterType !== 'Marine',
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'waterType', media: 'images.0'}},
})
```

### feed.ts

```ts
import {defineField, defineType} from 'sanity'
import {descriptionField, featuredField, imagesField, inStockField, priceField, productGroups, slugField, titleField} from './productFields'

export const feed = defineType({
  name: 'feed',
  title: 'Fish Food',
  type: 'document',
  groups: productGroups,
  fields: [
    titleField('Product name'),
    slugField,
    defineField({name: 'brand', type: 'string', group: 'basics', validation: (r) => r.required()}),
    defineField({
      name: 'packSize',
      title: 'Pack size',
      type: 'string',
      group: 'basics',
      description: 'e.g. "100 g". Different pack sizes are separate products so each has its own price.',
      validation: (r) => r.required(),
    }),
    priceField,
    inStockField(),
    imagesField,
    descriptionField,
    featuredField,

    // Specs
    defineField({
      name: 'foodType',
      title: 'Food type',
      type: 'string',
      group: 'specs',
      options: {list: ['Flakes', 'Pellets', 'Granules', 'Sticks', 'Wafers / tablets', 'Frozen', 'Freeze-dried', 'Live', 'Liquid / fry food']},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sinking',
      title: 'Floating or sinking',
      type: 'string',
      group: 'specs',
      options: {list: ['Floating', 'Slow-sinking', 'Sinking'], layout: 'radio'},
    }),
    defineField({name: 'pelletSize', title: 'Pellet size', type: 'string', group: 'specs', description: 'e.g. "Mini (3 mm)"'}),
    defineField({
      name: 'suitableFor',
      title: 'Suitable for',
      type: 'array',
      group: 'specs',
      of: [{type: 'string'}],
      options: {
        list: [
          'Tropical community fish',
          'Cichlids',
          'Goldfish and koi',
          'Bettas',
          'Marine fish',
          'Algae eaters / herbivores',
          'Carnivores',
          'Fry and juveniles',
        ],
      },
    }),
    defineField({
      name: 'features',
      type: 'array',
      group: 'specs',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      description: 'Short selling points, e.g. "Colour enhancing", "High protein", "Will not cloud water"',
    }),
    defineField({name: 'ingredients', type: 'text', rows: 3, group: 'specs'}),
    defineField({
      name: 'analysis',
      title: 'Guaranteed analysis (from the pack label)',
      type: 'object',
      group: 'specs',
      options: {columns: 2},
      fields: [
        {name: 'protein', title: 'Crude protein %', type: 'number', validation: (r) => r.min(0).max(100)},
        {name: 'fat', title: 'Crude fat %', type: 'number', validation: (r) => r.min(0).max(100)},
        {name: 'fibre', title: 'Crude fibre %', type: 'number', validation: (r) => r.min(0).max(100)},
        {name: 'moisture', title: 'Moisture %', type: 'number', validation: (r) => r.min(0).max(100)},
      ],
    }),
    defineField({name: 'feedingGuide', title: 'Feeding guide', type: 'text', rows: 3, group: 'specs'}),
  ],
  preview: {select: {title: 'title', subtitle: 'brand', media: 'images.0'}},
})
```

### accessory.ts

For filters, heaters, lights, water care, decor, stands and test kits. Specs differ a lot between these, so they are a simple label and value list.

```ts
import {defineField, defineType} from 'sanity'
import {descriptionField, featuredField, imagesField, inStockField, priceField, productGroups, slugField, titleField} from './productFields'

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
        list: ['Filtration', 'Heating and cooling', 'Lighting', 'Water care', 'Substrate and decor', 'Stands and cabinets', 'Test kits and tools', 'Other'],
      },
      validation: (r) => r.required(),
    }),
    defineField({name: 'brand', type: 'string', group: 'basics'}),
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
            {name: 'label', type: 'string', validation: (r) => r.required()},
            {name: 'value', type: 'string', validation: (r) => r.required()},
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        },
      ],
    }),
    defineField({name: 'whatsIncluded', title: "What's in the box", type: 'array', group: 'specs', of: [{type: 'string'}]}),
    defineField({name: 'warranty', type: 'string', group: 'specs', description: 'e.g. "1 year"'}),
  ],
  preview: {select: {title: 'title', subtitle: 'category', media: 'images.0'}},
})
```

---

## project.ts

```ts
import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project (Our Work)',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'slug', type: 'slug', options: {source: 'title'}, validation: (r) => r.required()}),
    defineField({
      name: 'clientType',
      type: 'string',
      options: {list: ['Home', 'Office', 'Restaurant', 'Hotel', 'Other']},
    }),
    defineField({name: 'custom', title: 'Custom build', type: 'boolean', initialValue: false}),
    defineField({name: 'tankSize', title: 'Tank size', type: 'string', description: 'e.g. 240 x 60 x 70 cm'}),
    defineField({name: 'summary', type: 'text', rows: 4}),
    defineField({
      name: 'images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      validation: (r) => r.required().min(1),
    }),
    defineField({name: 'featured', title: 'Show on home page', type: 'boolean', initialValue: false}),
  ],
  preview: {select: {title: 'title', subtitle: 'clientType', media: 'images.0'}},
})
```

## maintenancePlan.ts

```ts
import {defineField, defineType} from 'sanity'

export const maintenancePlan = defineType({
  name: 'maintenancePlan',
  title: 'Maintenance Plan',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'priceNote', title: 'Price text', type: 'string', description: 'e.g. "From GHS 300 per visit" or "Contact us"'}),
    defineField({name: 'features', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'highlighted', title: 'Mark as most popular', type: 'boolean', initialValue: false}),
    defineField({name: 'order', type: 'number', initialValue: 10}),
  ],
  preview: {select: {title: 'name', subtitle: 'priceNote'}},
})
```

## testimonial.ts

```ts
import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'role', type: 'string', description: 'e.g. Home owner, Restaurant owner'}),
    defineField({name: 'quote', type: 'text', rows: 3, validation: (r) => r.required()}),
    defineField({name: 'photo', type: 'image'}),
  ],
  preview: {select: {title: 'name', subtitle: 'quote', media: 'photo'}},
})
```

## faq.ts

```ts
import {defineField, defineType} from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({name: 'question', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'answer', type: 'text', rows: 4, validation: (r) => r.required()}),
    defineField({name: 'showOnHome', title: 'Show on home page', type: 'boolean', initialValue: false}),
    defineField({name: 'order', type: 'number', initialValue: 10}),
  ],
  preview: {select: {title: 'question'}},
})
```

## page.ts

Used for About, Custom Tanks intro, Maintenance intro, Delivery policy, Terms, Privacy. The page layout lives in code; the words and image live here.

```ts
import {defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      description: 'Use: about, custom-tanks, maintenance, delivery-policy, terms, privacy',
      validation: (r) => r.required(),
    }),
    defineField({name: 'heroImage', type: 'image', options: {hotspot: true}}),
    defineField({name: 'intro', type: 'text', rows: 3}),
    defineField({name: 'body', type: 'array', of: [{type: 'block'}]}),
  ],
  preview: {select: {title: 'title', subtitle: 'slug.current', media: 'heroImage'}},
})
```

---

## schemaTypes/index.ts

```ts
import {siteSettings} from './siteSettings'
import {banner} from './banner'
import {tank} from './tank'
import {fish} from './fish'
import {feed} from './feed'
import {accessory} from './accessory' // remove if the shop does not sell accessories
import {project} from './project'
import {maintenancePlan} from './maintenancePlan'
import {testimonial} from './testimonial'
import {faq} from './faq'
import {page} from './page'

export const schemaTypes = [
  siteSettings,
  banner,
  tank,
  fish,
  feed,
  accessory,
  project,
  maintenancePlan,
  testimonial,
  faq,
  page,
]
```

## Make Site Settings a single document (sanity.config.ts)

```ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes' // adjust path to your project

const productTypes = ['tank', 'fish', 'feed', 'accessory']

export default defineConfig({
  name: 'default',
  title: "Gabreil's Aquarium",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Site Settings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.listItem()
              .title('Products')
              .child(S.list().title('Products').items(productTypes.map((type) => S.documentTypeListItem(type)))),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => !['siteSettings', ...productTypes].includes(item.getId() ?? '')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    // Hide "create new" for the singleton
    templates: (templates) => templates.filter(({schemaType}) => schemaType !== 'siteSettings'),
  },
})
```

---

## Queries (src/lib/queries.ts)

Each product kind is a different document type, so the queries fetch a few type-specific fields for cards (via conditional projections) and everything for the product page. Every product comes back with a `_type` and a `purchaseType` that is always `"buy"` or `"inquire"` (tanks use their own setting, everything else is always `"buy"`).

```ts
import {groq} from 'next-sanity'

const PRODUCTS = `["tank","fish","feed","accessory"]`

// What a product card needs, plus the few details each type shows on its card
const cardFields = `
  _id, _type, title, "slug": slug.current, price, inStock, soldAs,
  "image": images[0],
  "purchaseType": select(_type == "tank" => coalesce(purchaseType, "inquire"), "buy"),
  _type == "tank" => {lengthCm, widthCm, heightCm, shape, glassType, suitableFor},
  _type == "fish" => {waterType, careLevel, temperament, adultSizeCm},
  _type == "feed" => {brand, foodType, packSize, suitableFor},
  _type == "accessory" => {brand, category}
`

export const settingsQuery = groq`*[_type == "siteSettings"][0]`

export const heroBannersQuery = groq`*[_type == "banner" && active == true && placement == "hero"] | order(order asc)`
export const promoBannersQuery = groq`*[_type == "banner" && active == true && placement == "promo"] | order(order asc)`

// Listing pages
export const tanksQuery = groq`*[_type == "tank"] | order(_createdAt desc){ ${cardFields} }`
export const fishQuery = groq`*[_type == "fish"] | order(_createdAt desc){ ${cardFields} }`
export const suppliesQuery = groq`*[_type in ["feed","accessory"]] | order(_type asc, _createdAt desc){ ${cardFields} }`

// Home page: pass $type = "tank" or "fish"
export const featuredQuery = groq`*[_type == $type && featured == true][0...6]{ ${cardFields} }`
export const featuredSuppliesQuery = groq`*[_type in ["feed","accessory"] && featured == true][0...6]{ ${cardFields} }`

// Product page (all fields) and "you may also like" (pass the product's _type)
export const productQuery = groq`*[_type in ${PRODUCTS} && slug.current == $slug][0]{
  ...,
  "purchaseType": select(_type == "tank" => coalesce(purchaseType, "inquire"), "buy")
}`
export const relatedQuery = groq`*[_type == $type && slug.current != $slug][0...4]{ ${cardFields} }`

// Sitemap
export const allProductSlugsQuery = groq`*[_type in ${PRODUCTS} && defined(slug.current)]{"slug": slug.current, _updatedAt}`

export const projectsQuery = groq`*[_type == "project"] | order(_createdAt desc){
  _id, title, "slug": slug.current, clientType, custom, "image": images[0]
}`
export const featuredProjectsQuery = groq`*[_type == "project" && featured == true][0...6]{
  _id, title, "slug": slug.current, clientType, "image": images[0]
}`
export const projectQuery = groq`*[_type == "project" && slug.current == $slug][0]`

export const plansQuery = groq`*[_type == "maintenancePlan"] | order(order asc)`
export const testimonialsQuery = groq`*[_type == "testimonial"][0...6]`
export const faqsQuery = groq`*[_type == "faq"] | order(order asc)`
export const homeFaqsQuery = groq`*[_type == "faq" && showOnHome == true] | order(order asc)[0...5]`
export const pageQuery = groq`*[_type == "page" && slug.current == $slug][0]`
```

## Adding later (only when needed)

- **Care guides:** add a `post` type (title, slug, cover image, excerpt, body).
- **Online payments:** add Paystack or Flutterwave to the cart. No schema change needed.
- **Stock quantities:** replace `inStock` with a `stock` number.
- **Quote-only accessories or fish** (for example a big filtration system or a rare specimen): copy the `purchaseType` field from `tank.ts` into that type and use the same price rule.
- **Pack-size variants** for food: add a `variants` array (label, price, in stock) and put the variant id in the cart item id.
- **More fish detail** if the shop wants it: `origin` (captive-bred or wild-caught), `family`, `colourForm`.
