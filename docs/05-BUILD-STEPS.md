# 05. Build Steps (zero to launch)

Work through these in order. Each step ends with a check so you know it works before moving on.

---

## Step 0. Prepare (30 minutes)

- Install **Node.js 20.19 or newer** (required by `@shadcn/lint`) and **Git**.
- Create free accounts: **GitHub**, **Sanity** (sanity.io), **Vercel**.
- Get the shop's **WhatsApp number** (ideally WhatsApp Business). Write it as digits only: `233XXXXXXXXX`.
- Ask for the logo as SVG or transparent PNG (see `04-DESIGN-AND-CONVERSION.md`).
- Start collecting content from `06-CONTENT-AND-LAUNCH.md` now. It takes the longest.

**Check:** `node -v` shows 20.19 or higher.

## Step 1. Create the Next.js project

```bash
npx create-next-app@latest gabreils-aquarium --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd gabreils-aquarium
```

Copy this docs folder into the project (for example `/docs`) and copy `AGENTS.md` and `CLAUDE.md` to the project root.

**Check:** `npm run dev` opens the starter page at http://localhost:3000.

## Step 2. Set up shadcn/ui

```bash
npx shadcn@latest init
npx shadcn@latest add button input textarea label radio-group card badge accordion carousel sheet sonner separator
```

Pick the neutral base colour when asked. We replace the colours in the next step.

**Check:** `src/components/ui/` contains the components and `components.json` exists in the project root.

## Step 3. Apply the Gabreil's theme

Open `04-DESIGN-AND-CONVERSION.md` and do these in order:

1. Replace the `:root` and `.dark` blocks in `src/app/globals.css` and add the extra tokens (`highlight`, `success`, `whatsapp`) and fonts in `@theme inline`.
2. Add Inter and Poppins in `src/app/layout.tsx`.
3. Add the `whatsapp` variant to `components/ui/button.tsx` and the `highlight` variant to `badge.tsx`.
4. Put the logo files in `public/` (`logo-horizontal.svg`, `logo-badge.svg`, or PNG).

**Check:** make a temporary page with a Button, a `variant="whatsapp"` Button, a Badge, and a `<section className="dark bg-background text-foreground">` containing a Button. Primary is royal blue on light, cyan inside the dark section, WhatsApp is green. Delete the page afterwards.

## Step 4. Set up `@shadcn/lint`

**Fastest way:** give your coding agent this prompt:

```
Read https://github.com/shadcn-ui/lint/blob/main/SETUP.md
and set up @shadcn/lint in this project.
```

**Manual way:**

```bash
npm install -D @shadcn/lint @typescript-eslint/parser
```

`create-next-app` already made an `eslint.config.mjs`. Keep what is there and add this block to the config array (needs ESLint 9.30 or newer):

```js
import {plugin as shadcn} from '@shadcn/lint'
import tsParser from '@typescript-eslint/parser'

// add inside the exported array:
{
  files: ['**/*.{js,jsx,ts,tsx}'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {ecmaFeatures: {jsx: true}},
  },
  plugins: {shadcn},
  rules: {
    'shadcn/no-raw-colors': 'error',
    'shadcn/no-arbitrary-values': 'error',
    'shadcn/no-inline-styles': 'error',
    'shadcn/no-unknown-classes': 'error',
    'shadcn/require-static-classes': 'error',
    'shadcn/no-restyle': ['error', {allow: ['layout']}],
  },
},
// the shadcn components themselves may restyle their own internals:
{
  files: ['src/components/ui/**'],
  rules: {'shadcn/no-restyle': 'off'},
},
```

In `package.json` make sure the lint script is:

```json
"lint": "eslint ."
```

The Sanity Studio code (`src/sanity/**` or similar) does not use Tailwind classes, so add it to your ignores if the linter reports anything there.

**Check:** add `<div className="bg-blue-500 p-[13px]" />` to a page and run `npm run lint`. It should report both errors with suggestions. Remove the line.

From now on run `npm run lint` before every commit. `AGENTS.md` already tells AI assistants to do the same.

## Step 5. Install the remaining packages

```bash
npm install next-sanity @sanity/image-url sanity @sanity/vision styled-components zustand
```

## Step 6. Set up Sanity with an embedded Studio

```bash
npx sanity@latest init
```

Answer the prompts:
- Log in / create the project: name it **Gabreil's Aquarium**
- Dataset: **production**
- Add configuration files to the Next.js app: **yes**
- Embedded Studio route: **/studio**
- Template: **clean**, TypeScript: **yes**
- Write the project ID and dataset to `.env.local`: **yes**

Prompts change slightly between versions. If something differs, follow the current Sanity docs for "Next.js embedded Studio".

Add to `.env.local`:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Check:** open http://localhost:3000/studio and log in. You see an empty Studio.

## Step 7. Add the schemas

Open `02-SANITY-SCHEMA.md`.
1. Create one file per schema in the `schemaTypes` folder.
2. Add `schemaTypes/index.ts`.
3. Replace `sanity.config.ts` with the config in the doc (singleton Site Settings). Adjust import paths to match your folders.

**Check:** the Studio sidebar shows Site Settings, Banner, Product, Project, Maintenance Plan, Testimonial, FAQ, Page. In Product, choose Type = Tank: you see "How do customers get this tank?" with Enquire first / Buy online. Choose Buy online and the price becomes required. Switch to Fish: tank fields disappear and water type appears.

## Step 8. Enter starter content

Create at least:
- Site Settings: WhatsApp number, phone, email, address, hours, socials
- 2 hero banners, 1 promo banner
- **4 tanks: 2 set to Buy online (with prices), 2 set to Enquire first (one curved-glass)**, 3 fish, 3 supplies (at least 1 featured of each kind)
- 3 projects, 2 to 3 maintenance plans, 3 testimonials, 5 FAQs
- Pages: `about`, `custom-tanks`, `maintenance`, `delivery-policy`, `terms`, `privacy`

Use real photos if you have them. **Publish** each document (the Publish button, not just saved).

## Step 9. Connect the site to Sanity

Create `src/lib/sanity.ts`:

```ts
import {createClient} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: Parameters<typeof builder.image>[0]) => builder.image(source)
```

Create `src/lib/queries.ts` from `02-SANITY-SCHEMA.md`.

In `next.config.ts`, allow Sanity images:

```ts
images: {remotePatterns: [{protocol: 'https', hostname: 'cdn.sanity.io'}]},
```

Fetch with a short cache so edits appear within a minute:

```ts
const data = await client.fetch(query, params, {next: {revalidate: 60}})
```

**Check:** a test page that fetches `settingsQuery` prints the business name.

## Step 10. Layout, header, footer, WhatsApp button

Open `03-WHATSAPP-INTEGRATION.md`.
1. Create `SettingsProvider` and wrap the root layout. Add `<Toaster />`.
2. Add `src/lib/whatsapp.ts` and `src/lib/cart.ts`.
3. Build `AnnouncementBar`, `Header` (horizontal logo, nav, cart icon with count, WhatsApp button; mobile menu with `Sheet`), and `Footer` (dark section: badge logo, contact, hours, socials from settings).
4. Add `WhatsAppFloat`.

**Check:** the WhatsApp button opens WhatsApp with the message and the right number. Changing the number in Studio changes it on the site within about a minute. `npm run lint` passes.

## Step 11. Homepage

Build the sections from `01-SITE-STRUCTURE.md` in order, using the light/dark rhythm in `04-DESIGN-AND-CONVERSION.md`. Make each section its own component:

`Hero` (Carousel), `TrustStrip`, `CategoryTiles`, `FeaturedTanks`, `CustomTeaser`, `ProjectsGallery`, `PromoBanner`, `FeaturedFishSupplies`, `Testimonials`, `FaqPreview` (Accordion), `FinalCta`.

If a section has no content in Sanity, render nothing (no empty headings).

**Check:** the home page looks right at 360px, 768px and 1280px, and `npm run lint` passes.

## Step 12. Tanks list and product page (buy online and enquire first)

1. `/tanks`: grid from `productsByKindQuery` with `kind = "tank"`. Each card is a shadcn Card with image, name, size, shape, a Badge (**Buy online** or **Enquire first**), and `priceLabel(product)`. Add filters for shape, glass type and Buy online / Enquire first (client-side filtering is enough for a small catalog).
2. `/product/[slug]`: gallery (Carousel), title, `priceLabel`, specs table, then `<ProductActions product={product} />`. It shows Add to cart for `buy` and the inquiry form for `inquire`.

**Check:**
- A *Buy online* tank shows its price and Add to cart. A *Enquire first* tank shows "From GHS x" or "Price on request" and the form. No cart button on it.
- The inquiry button opens WhatsApp with the tank name, link and customer details filled in.
- Switching a tank from Enquire first to Buy online in Studio changes the page within a minute.

## Step 13. Fish, supplies and cart

1. `/fish` and `/supplies` using the same product card. Fish gets a freshwater / marine filter.
2. Add Add to cart to buy-type cards and product pages.
3. Header cart icon with count (use the mounted trick).
4. `/cart` page with the order form.

**Check:** add a supply and a buy-online tank, change quantities, send the order, and verify the WhatsApp message lists items, total, name, phone and delivery method. Refresh: the cart is still there.

## Step 14. Service and content pages

- `/custom-tanks`: content from `page` (slug `custom-tanks`), process steps, featured custom projects, quote form that opens WhatsApp with `customTankMessage`.
- `/maintenance`: plans from `maintenancePlan`, request form using `maintenanceMessage`.
- `/our-work` and `/our-work/[slug]`.
- `/about`, `/contact`, `/faq`, and policy pages.

**Check:** every form shows an error if name or phone is empty, and opens WhatsApp when valid.

## Step 15. Polish: SEO, speed, accessibility

- Set `metadata` (title, description, Open Graph image) on every page. Use `generateMetadata` for product and project pages.
- Add `app/sitemap.ts` and `app/robots.ts`.
- Add **LocalBusiness** JSON-LD on Home and Contact (name, address, phone, hours, social links from settings).
- Use `next/image` everywhere with `sizes` and `alt`. Use `priority` only on the hero image.
- Favicon from the badge logo.
- Run Lighthouse in Chrome: aim for 90+ on mobile Performance and 100 on Accessibility and SEO.
- Add Vercel Analytics (free): `npm i @vercel/analytics`, then add `<Analytics />` to the root layout.
- `npm run lint` and `npm run build` both pass.

## Step 16. Deploy

1. Push the project to GitHub.
2. In Vercel: **Add New Project**, import the repo.
3. Add the environment variables from `.env.local` (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SITE_URL` set to your live URL).
4. Deploy.
5. In **sanity.io/manage** open the project, go to **API, CORS origins**, and add your Vercel URL and your domain with **Allow credentials** ticked. Without this the Studio at `/studio` will not log in on the live site.
6. Connect the custom domain in Vercel and update `NEXT_PUBLIC_SITE_URL`.

**Check:** open `https://yourdomain.com/studio`, edit the announcement text, publish, and see it on the live site within about a minute.

## Step 17. Hand over to the owner

- Give each editor a Sanity login (Sanity manage, Members).
- Show them: add a product, switch a tank between Buy online and Enquire first, mark an item out of stock, change a banner, change the WhatsApp number, add a project.
- Set up **WhatsApp Business**: greeting message, away message, quick replies ("Tank prices", "Delivery info", "Maintenance plans"), labels (New, Quoted, Paid, Delivered).
- Create or verify the **Google Business Profile** with the same address and hours as the site.

## Step 18. Later phases

- **Phase 2:** care guides (`post` type), Paystack or Flutterwave payments, WhatsApp click tracking, email backup of inquiries (Resend).
- **Phase 3:** reviews, promo codes, maintenance subscriptions.

## Troubleshooting

| Problem | Likely fix |
|---|---|
| Studio won't load on the live site | Add the site URL to Sanity CORS origins with credentials |
| Content missing on the site | The document is not **published**, or the query filters it out |
| Images don't show | Add `cdn.sanity.io` to `images.remotePatterns` |
| Cart count flashes wrong number | Render the count only after mount |
| WhatsApp opens with a blank chat | Check the number format (digits only) |
| A tank shows the wrong buttons | Check its `purchaseType` in Studio and that the query returns `purchaseType` (see `productFields`) |
| Lint says a colour is not allowed | Use a theme token (`bg-primary`, `text-muted-foreground`) or add a new token in `globals.css` |
| Lint complains about `className` on a shadcn component | Use a variant or size. Layout classes like `w-full` and `mt-4` are allowed |
| WhatsApp button has no colour | Add the `whatsapp` variant to `button.tsx` and the `--whatsapp` tokens to `globals.css` |
| Dark section looks light | The wrapper needs both `dark` and `bg-background text-foreground` |
