# 07. Product Fields: research, reasoning and how they show on the site

Fish, tanks and fish food need different information. A fish buyer wants to know if it is peaceful and how big it grows. A tank buyer wants dimensions and glass thickness. A food buyer wants the pack size and protein level. So each kind is its **own Sanity document type** with its own fields (code in `02-SANITY-SCHEMA.md`).

## What I looked at

| Kind | Examples studied | What the pages show |
|---|---|---|
| Fish | LiveAquaria freshwater and marine fish pages (discus, betta, guppy, puffer, royal gramma, blennies, angelfish) | A "Quick Stats" box: care level, temperament, diet, water conditions (temperature, pH, hardness), max size, family, minimum tank size, and for marine fish "reef compatible". Also the size the fish is sold at ("approximate purchase size") and a compatibility chart |
| Tanks | Bulk Reef Supply, JBJ, Waterbox, Oase Styleline (Fishyhub), Tetra kits | Dimensions, volume, glass thickness, glass type (low-iron), shape, trim (rimless or framed), overflow type, freshwater or marine, weight, what is included (stand, lid, light, filter, sump), guarantee years |
| Fish food | Hikari Cichlid Gold and Hikari Staple on several retail sites | Brand, food form (pellet, flake), package size, pellet size, floating or sinking, who it suits (cichlids, goldfish), colour-enhancing claims, ingredients, guaranteed analysis (protein, fat, fibre, moisture), feeding instructions |
| Accessories | Oase and Bioscape canister filters with heaters | Flow rate, wattage, "suitable for tanks up to X litres", dimensions, what is in the box, warranty. These differ a lot between a filter, a heater and a light, so a flexible label and value list works best |

## How I decided what to keep

Your rule was no unnecessary fields. A field is in the schema only if it does at least one of these:

1. **Appears on the product card or filter** (what the customer scans).
2. **Answers a question the customer would otherwise ask on WhatsApp** (will it fit, is it peaceful, how big is the pack).
3. **Helps sell responsibly** (live fish compatibility, minimum tank size, tank warranty).

Left out on purpose: SKU, barcode, weight for fish and food, fish family and colour form, tags, SEO fields per product. They can be added later (see "Adding later" in `02-SANITY-SCHEMA.md`).

## Fields by kind

### Tank
| Field | Why | Shows on |
|---|---|---|
| Name, photos, description, featured | Basics | Card, page |
| **How customers get it** (buy online / enquire first) | Your two modes | Card badge, page buttons |
| Price | Required for buy online; optional "From" price for enquire first | Card, page |
| In stock | Only for buy-online tanks | Card, page |
| Length, width, height (cm) | The first thing a tank buyer checks | Card, page, spec table |
| Volume (litres) | Standard in every listing | Spec table |
| Shape (rectangular, cube, curved front, curved corner, corner, cylinder) | Your curved-glass range | Card, filter, spec table |
| Glass type (standard, low-iron, tempered, acrylic) | Clarity and strength | Filter, spec table |
| Glass thickness (mm) | Shown on every serious tank listing | Spec table |
| Frame style (rimless / framed) | Look and bracing | Spec table |
| Suitable for (freshwater / marine / both) | Marine tanks need different features | Filter, spec table |
| Overflow / filtration (none, pre-drilled, built-in, all-in-one) | Key for sumps and reef tanks | Spec table |
| What's included (stand, lid, light, filter, heater, sump, background, mat) | Stops "does it come with a stand?" messages | Spec table |
| Weight (kg) | Floor load and delivery planning | Spec table |
| Availability / lead time | Ready-made vs made to order | Spec table |
| Warranty | Builds trust | Spec table |

### Fish
| Field | Why | Shows on |
|---|---|---|
| Common name (title), photos, description, featured | Basics | Card, page |
| Price, **sold as** (each, per pair, per group of 6) | Live fish are often sold as pairs or groups | Card, page |
| Available now | Live stock changes often | Card, page |
| Scientific name | Trust, and customers search by it | Page |
| Water type (freshwater / marine / brackish) | Main filter | Card, filter |
| Care level (easy, moderate, advanced) | Beginners filter by this | Card, filter |
| Temperament | Compatibility | Card, filter, page |
| Diet | Feeding and which food to suggest | Page |
| Adult size (cm) | Avoids buying a fish that outgrows the tank | Card, page |
| Size you sell at | Customers expect a size, e.g. "3 to 4 cm" | Page |
| Minimum tank size (litres) | Responsible selling | Page |
| Water conditions (text) | Temperature and pH in one line | Page |
| Compatibility (text) | Tank mates and group size | Page |
| Reef safe (marine only) | Only shown when water type is Marine | Page |

### Fish food
| Field | Why | Shows on |
|---|---|---|
| Name, photos, description, featured | Basics | Card, page |
| Brand | People shop by brand | Card, filter |
| Pack size | Required: different packs are separate products | Card, page |
| Price, in stock | Basics | Card, page |
| Food type (flakes, pellets, granules, sticks, wafers, frozen, freeze-dried, live, liquid) | Main filter | Card, filter |
| Floating / sinking, pellet size | Matches the fish's feeding style and mouth size | Page |
| Suitable for (cichlids, goldfish, bettas, marine, herbivores...) | How people choose food | Filter, page |
| Features (tags) | Selling points like "colour enhancing" | Page |
| Ingredients | Required on most packs | Page (accordion) |
| Guaranteed analysis (protein, fat, fibre, moisture %) | Serious buyers compare protein | Page |
| Feeding guide | Reduces overfeeding questions | Page (accordion) |

### Accessory (optional)
| Field | Why | Shows on |
|---|---|---|
| Name, photos, description, price, in stock, featured | Basics | Card, page |
| Category (filtration, heating and cooling, lighting, water care, substrate and decor, stands, test kits, other) | Filter | Card, filter |
| Brand | Shop by brand | Card |
| Suitable for | "Tanks up to 250 litres" is the key question | Page |
| Specifications (label and value list) | Flow rate, wattage... differs per item | Page |
| What's in the box, warranty | Avoids returns | Page |

## Tank cards vs fish cards vs food cards

One `ProductCard` component, but the small details line changes with the product kind.

| Kind | Details line on the card | Price line |
|---|---|---|
| Tank | `120 x 50 x 60 cm · Curved front · Low-iron (ultra clear)` | `GHS 4,500` or `From GHS 4,500` or `Price on request` |
| Fish | `Freshwater · Easy care · up to 8 cm` | `GHS 25 each` |
| Food | `Hikari · Pellets · 100 g` | `GHS 40` |
| Accessory | `Oase · Filtration` | `GHS 650` |

## Code to add on the website

### Types: `src/lib/types.ts`

```ts
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'

export type ProductType = 'tank' | 'fish' | 'feed' | 'accessory'

// One wide type: only the fields that belong to the product's _type are filled in
export type Product = {
  _id: string
  _type: ProductType
  title: string
  slug: string
  price?: number | null
  inStock?: boolean
  purchaseType: 'buy' | 'inquire'
  image?: SanityImageSource
  images?: SanityImageSource[]
  description?: string

  // tank
  lengthCm?: number
  widthCm?: number
  heightCm?: number
  volumeLitres?: number
  shape?: string
  glassType?: string
  glassThicknessMm?: number
  frameStyle?: string
  suitableFor?: string | string[]
  overflow?: string
  includes?: string[]
  weightKg?: number
  leadTime?: string
  warranty?: string

  // fish
  soldAs?: string
  scientificName?: string
  waterType?: string
  careLevel?: string
  temperament?: string
  diet?: string
  adultSizeCm?: number
  sizeSold?: string
  minTankLitres?: number
  waterConditions?: string
  compatibility?: string
  reefSafe?: string

  // feed
  brand?: string
  packSize?: string
  foodType?: string
  sinking?: string
  pelletSize?: string
  features?: string[]
  ingredients?: string
  analysis?: {protein?: number; fat?: number; fibre?: number; moisture?: number}
  feedingGuide?: string

  // accessory
  category?: string
  specs?: {label: string; value: string}[]
  whatsIncluded?: string[]
}
```

If the `@sanity/image-url/lib/types/types` import path differs in your version, use `Parameters<typeof urlFor>[0]` from `src/lib/sanity.ts` instead.

### Card details line: `src/lib/productMeta.ts`

```ts
import type {Product} from './types'

export function cardMeta(p: Product): string[] {
  const parts: (string | number | undefined | false)[] = []
  switch (p._type) {
    case 'tank':
      parts.push(
        p.lengthCm && p.widthCm && p.heightCm ? `${p.lengthCm} x ${p.widthCm} x ${p.heightCm} cm` : undefined,
        p.shape,
        p.glassType
      )
      break
    case 'fish':
      parts.push(p.waterType, p.careLevel && `${p.careLevel} care`, p.adultSizeCm && `up to ${p.adultSizeCm} cm`)
      break
    case 'feed':
      parts.push(p.brand, p.foodType, p.packSize)
      break
    case 'accessory':
      parts.push(p.brand, p.category)
      break
  }
  return parts.filter((x): x is string => typeof x === 'string' && x.length > 0)
}
```

### Spec table: `src/components/SpecTable.tsx`

Native elements, no shadcn component, so there is nothing for the linter to flag. Rows with no value are hidden automatically, so a half-filled product still looks clean.

```tsx
export type SpecRow = [label: string, value?: string | number | null | false]

export function SpecTable({rows}: {rows: SpecRow[]}) {
  const filled = rows.filter(([, v]) => v !== undefined && v !== null && v !== false && v !== '')
  if (filled.length === 0) return null
  return (
    <dl className="divide-y rounded-lg border">
      {filled.map(([label, value]) => (
        <div key={label} className="grid grid-cols-3 gap-2 px-4 py-3 text-sm">
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="col-span-2 font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
```

### Specs per kind: `src/components/ProductSpecs.tsx`

```tsx
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion'
import {SpecTable, type SpecRow} from './SpecTable'
import type {Product} from '@/lib/types'

const list = (v?: string | string[]) => (Array.isArray(v) ? v.join(', ') : v)

export function ProductSpecs({p}: {p: Product}) {
  switch (p._type) {
    case 'tank': {
      const size = p.lengthCm && p.widthCm && p.heightCm ? `${p.lengthCm} x ${p.widthCm} x ${p.heightCm} cm` : null
      const rows: SpecRow[] = [
        ['Size (L x W x H)', size],
        ['Volume', p.volumeLitres && `${p.volumeLitres} litres`],
        ['Shape', p.shape],
        ['Glass', p.glassType],
        ['Glass thickness', p.glassThicknessMm && `${p.glassThicknessMm} mm`],
        ['Frame', p.frameStyle],
        ['Suitable for', list(p.suitableFor)],
        ['Overflow / filtration', p.overflow],
        ['Weight (empty)', p.weightKg && `${p.weightKg} kg`],
        ['Availability', p.leadTime],
        ['Warranty', p.warranty],
        ['Included', p.includes?.join(', ')],
      ]
      return <SpecTable rows={rows} />
    }

    case 'fish': {
      const rows: SpecRow[] = [
        ['Scientific name', p.scientificName],
        ['Water type', p.waterType],
        ['Care level', p.careLevel],
        ['Temperament', p.temperament],
        ['Diet', p.diet],
        ['Adult size', p.adultSizeCm && `${p.adultSizeCm} cm`],
        ['Size we sell at', p.sizeSold],
        ['Minimum tank size', p.minTankLitres && `${p.minTankLitres} litres`],
        ['Water conditions', p.waterConditions],
        ['Reef safe', p.reefSafe],
        ['Compatibility', p.compatibility],
      ]
      return <SpecTable rows={rows} />
    }

    case 'feed': {
      const a = p.analysis
      const rows: SpecRow[] = [
        ['Brand', p.brand],
        ['Pack size', p.packSize],
        ['Food type', p.foodType],
        ['Floating / sinking', p.sinking],
        ['Pellet size', p.pelletSize],
        ['Suitable for', list(p.suitableFor)],
        ['Crude protein', a?.protein != null && `${a.protein}%`],
        ['Crude fat', a?.fat != null && `${a.fat}%`],
        ['Crude fibre', a?.fibre != null && `${a.fibre}%`],
        ['Moisture', a?.moisture != null && `${a.moisture}%`],
      ]
      return (
        <div className="space-y-4">
          <SpecTable rows={rows} />
          {(p.ingredients || p.feedingGuide) && (
            <Accordion type="multiple">
              {p.ingredients && (
                <AccordionItem value="ingredients">
                  <AccordionTrigger>Ingredients</AccordionTrigger>
                  <AccordionContent>{p.ingredients}</AccordionContent>
                </AccordionItem>
              )}
              {p.feedingGuide && (
                <AccordionItem value="feeding">
                  <AccordionTrigger>Feeding guide</AccordionTrigger>
                  <AccordionContent>{p.feedingGuide}</AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          )}
        </div>
      )
    }

    case 'accessory': {
      const rows: SpecRow[] = [
        ['Brand', p.brand],
        ['Category', p.category],
        ['Suitable for', list(p.suitableFor)],
        ...(p.specs ?? []).map(({label, value}): SpecRow => [label, value]),
        ['In the box', p.whatsIncluded?.join(', ')],
        ['Warranty', p.warranty],
      ]
      return <SpecTable rows={rows} />
    }
  }
}
```

If your shadcn version is the Base UI flavour, the Accordion `type="multiple"` prop may be named differently. Check the generated `accordion.tsx`.

### Product page: `src/app/product/[slug]/page.tsx` (outline)

```tsx
const product: Product | null = await client.fetch(productQuery, {slug}, {next: {revalidate: 60}})
if (!product) notFound()
const related: Product[] = await client.fetch(relatedQuery, {type: product._type, slug}, {next: {revalidate: 60}})

// Layout: gallery on the left; on the right the title, priceLabel(product),
// <ProductActions product={product} />, a short delivery note, then <ProductSpecs p={product} />.
```

Delivery notes under the buttons:
- **Fish:** "Live fish delivery and arrival policy" (link to `/delivery-policy`).
- **Tank:** "Delivery and installation are confirmed in the chat."
- **Food and accessories:** standard delivery line.

### Filters per kind

Filter on the client from the products already loaded. Build the options from the values that exist, so an empty option never shows.

```ts
// src/lib/filters.ts
export const filtersByPage = {
  tanks: [
    {key: 'shape', label: 'Shape'},
    {key: 'glassType', label: 'Glass'},
    {key: 'suitableFor', label: 'Suitable for'},
    {key: 'purchaseType', label: 'Availability', labels: {buy: 'Buy online', inquire: 'Enquire first'}},
  ],
  fish: [
    {key: 'waterType', label: 'Water type'},
    {key: 'careLevel', label: 'Care level'},
    {key: 'temperament', label: 'Temperament'},
  ],
  supplies: [
    {key: '_type', label: 'Type', labels: {feed: 'Fish food', accessory: 'Accessories'}},
    {key: 'brand', label: 'Brand'},
    {key: 'foodType', label: 'Food type'},
    {key: 'category', label: 'Category'},
  ],
} as const

export const distinct = (items: Record<string, unknown>[], key: string) =>
  [...new Set(items.map((i) => i[key]).flat().filter((v): v is string => typeof v === 'string' && v.length > 0))].sort()
```

Use shadcn `Badge` toggles or a `Select` for each filter. Keep the filter row to one line on mobile (horizontal scroll).

### Cards

One `ProductCard` that takes a `Product`:
- Image (`urlFor(p.image)`), title.
- `cardMeta(p)` rendered as small muted text or Badges.
- `priceLabel(p)` (the function in `03-WHATSAPP-INTEGRATION.md`, which already handles "each / per pair" for fish).
- Tanks also show the **Buy online** or **Enquire first** Badge.
- Button: `purchaseType === 'buy'` shows a small Add to cart, otherwise a "View / Ask" link to `/product/[slug]`.

## Content team tips

- **Fish:** a clear photo of the actual fish, plus a size reference. Update "Available now" when a batch sells out. Fill the compatibility line carefully: it prevents the most returns.
- **Tanks:** measure in cm. If a tank is curved, say which part is curved in the description.
- **Food:** copy ingredients and the analysis from the pack label exactly. Create a separate product for each pack size.
- **Accessories:** copy the specs from the box or manufacturer page into the label and value list.
