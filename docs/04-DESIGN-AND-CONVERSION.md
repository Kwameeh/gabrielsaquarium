# 04. Design, Colours, shadcn Theme and Conversion

## The logo

Gabreil's Aquarium has two logo versions: a horizontal one (wordmark with swirl, angelfish and plants) and a round badge. The look is **friendly, clean, bright**: deep navy lettering, a strong royal blue, bright cyan water, an orange and gold angelfish, and a touch of plant green.

Use the horizontal logo in the header and the badge in the footer, favicon and social profiles. Ask for **SVG or transparent PNG** versions. The JPEG has a light grey background that will look like a box on coloured sections.

## Colours taken from the logo

These were sampled from the logo itself.

| Role | Hex | Where it comes from |
|---|---|---|
| Deep navy | `#031A44` | "Gabreil's" lettering, badge ring |
| Royal blue | `#0762BF` | "Aquarium" lettering, swirl |
| Bright blue | `#0475C5` | Fish fins, water |
| Cyan | `#00B9FF` | Bubbles, badge water |
| Light cyan | `#48D4F7` | Badge "Aquarium" text |
| Amber | `#F8B828` | Angelfish body |
| Plant green | `#40A808` | Plants |

How they are used:

| Token | Colour | Use |
|---|---|---|
| `primary` | Royal blue `#0762BF` | Main buttons, links, active states |
| `foreground` / dark sections | Deep navy `#031A44` | Text, hero, footer, "lit tank" sections |
| `ring`, dark-mode `primary` | Cyan `#00B9FF` | Focus outlines, buttons on dark sections |
| `highlight` | Amber `#F8B828` | "Custom", "New", "Most popular" badges, small highlights. Never for body text |
| `success` | Dark green `#2F7D0A` | In stock, confirmations (darker than the logo green so text is readable) |
| `whatsapp` | `#0F7B6C` | WhatsApp buttons only (green, so people recognise them, with white text that passes contrast) |
| `secondary`, `muted`, `accent` | Pale blue tints | Backgrounds of cards, tags, hover states |

**Contrast was checked** (WCAG AA needs 4.5:1 for normal text): white on primary 6.0, navy on page background 16.4, white on whatsapp green 5.2, navy on amber 9.6, muted text on page 6.2, cyan button on dark navy 7.6.

## Theme CSS: `src/app/globals.css`

`npx shadcn@latest init` creates this file. Keep what it generated (imports, `@theme inline` mapping, `@layer base`) and **replace the `:root` and `.dark` blocks with the ones below**, then add the extra tokens and the `@theme inline` lines for them.

```css
/* Add inside the existing @theme inline { ... } block */
@theme inline {
  --color-highlight: var(--highlight);
  --color-highlight-foreground: var(--highlight-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-whatsapp: var(--whatsapp);
  --color-whatsapp-foreground: var(--whatsapp-foreground);
  --font-sans: var(--font-inter);
  --font-heading: var(--font-poppins);
}

:root {
  --radius: 0.75rem;

  --background: oklch(0.986 0.007 248);        /* #F7FBFF */
  --foreground: oklch(0.231 0.085 260);        /* #031A44 deep navy */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.231 0.085 260);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.231 0.085 260);

  --primary: oklch(0.504 0.164 255);           /* #0762BF royal blue */
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.951 0.021 241);         /* #E3F1FC */
  --secondary-foreground: oklch(0.259 0.098 260);
  --muted: oklch(0.957 0.014 248);             /* #EAF2FA */
  --muted-foreground: oklch(0.482 0.059 254);  /* #47607F */
  --accent: oklch(0.933 0.031 234);            /* #D6EDFB */
  --accent-foreground: oklch(0.259 0.098 260);

  --destructive: oklch(0.576 0.209 29);        /* #D92D20 */
  --border: oklch(0.906 0.028 248);            /* #D2E2F2 */
  --input: oklch(0.906 0.028 248);
  --ring: oklch(0.741 0.157 235);              /* #00B9FF cyan */

  --highlight: oklch(0.821 0.16 82);           /* #F8B828 amber */
  --highlight-foreground: oklch(0.231 0.085 260);
  --success: oklch(0.521 0.159 139);           /* #2F7D0A */
  --success-foreground: oklch(1 0 0);
  --whatsapp: oklch(0.524 0.092 180);          /* #0F7B6C */
  --whatsapp-foreground: oklch(1 0 0);

  --chart-1: oklch(0.504 0.164 255);           /* royal blue */
  --chart-2: oklch(0.741 0.157 235);           /* cyan */
  --chart-3: oklch(0.821 0.16 82);             /* amber */
  --chart-4: oklch(0.521 0.159 139);           /* green */
  --chart-5: oklch(0.259 0.098 260);           /* navy */
}

/* "Lit tank at night". Used for hero, custom-build teaser, footer. */
.dark {
  --background: oklch(0.177 0.061 260);        /* #020F2B */
  --foreground: oklch(0.986 0.007 248);
  --card: oklch(0.262 0.09 259);               /* #05224F */
  --card-foreground: oklch(0.986 0.007 248);
  --popover: oklch(0.262 0.09 259);
  --popover-foreground: oklch(0.986 0.007 248);

  --primary: oklch(0.741 0.157 235);           /* cyan button on navy */
  --primary-foreground: oklch(0.231 0.085 260);
  --secondary: oklch(0.314 0.107 260);         /* #0A2E66 */
  --secondary-foreground: oklch(0.986 0.007 248);
  --muted: oklch(0.314 0.107 260);
  --muted-foreground: oklch(0.768 0.054 255);  /* #9DB6D6 */
  --accent: oklch(0.36 0.119 258);             /* #0D3A7A */
  --accent-foreground: oklch(0.986 0.007 248);

  --destructive: oklch(0.65 0.2 25);
  --border: oklch(0.381 0.116 259);            /* #17407F */
  --input: oklch(0.381 0.116 259);
  --ring: oklch(0.741 0.157 235);
}
```

### Dark sections without a dark mode toggle

The site is light by default. For dramatic sections, wrap them in the `dark` class. Every shadcn token flips inside that section, so Buttons, Cards and text all adapt automatically:

```tsx
<section className="dark bg-background text-foreground">
  {/* hero, custom-build teaser, footer */}
</section>
```

No hard-coded dark colours, so it passes the linter.

**Section rhythm on the home page:** Hero (dark), trust strip (light), categories (light), featured tanks (light), custom-build teaser (dark), our work (light), maintenance promo (dark), fish and supplies (light), testimonials (light), final call to action (dark), footer (dark).

## Fonts: `src/app/layout.tsx`

The logo lettering is a bold, rounded, geometric sans. **Poppins** is the closest free match for headings; **Inter** for body text.

```tsx
import {Inter, Poppins} from 'next/font/google'

const inter = Inter({subsets: ['latin'], variable: '--font-inter'})
const poppins = Poppins({subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-poppins'})

// <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
//   <body className="bg-background font-sans text-foreground antialiased">
```

In `globals.css`, inside `@layer base`, make headings use it:

```css
@layer base {
  h1, h2, h3 { font-family: var(--font-heading); }
}
```

## Custom button variants: `src/components/ui/button.tsx`

Add one variant to the `variants.variant` list in the generated file (and nothing else). It is the only place the WhatsApp colour is used:

```ts
whatsapp: "bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90",
```

For links styled as buttons, use `buttonVariants({variant, size})` on an `<a>` (the WhatsApp doc does this).

Add a Badge variant for amber highlights in `badge.tsx`:

```ts
highlight: "bg-highlight text-highlight-foreground",
```

## shadcn components to install

```bash
npx shadcn@latest add button input textarea label radio-group card badge accordion carousel sheet sonner separator
```

| Component | Used for |
|---|---|
| Button | All buttons and link-buttons |
| Card | Product cards, project cards, plan cards, inquiry box |
| Badge | "Buy online", "Enquire first", "Custom", "Easy care" / "Marine" on fish cards, "In stock", "Most popular" |
| Carousel | Hero banner slides, product image gallery (uses Embla) |
| Accordion | FAQ |
| Sheet | Mobile menu |
| Input, Textarea, Label, RadioGroup | All forms |
| Sonner | Toast messages ("Added to cart", form errors) |
| Separator | Footer and section dividers |

Product spec tables use plain `<dl>` elements (`SpecTable` in `07-PRODUCT-FIELDS.md`), so no extra shadcn component is needed.

## Linting the design system (`@shadcn/lint`)

The lint tool stops colours, spacing and styles drifting away from the theme, which keeps the site consistent when you or an AI assistant add pages quickly. Rules we use:

| Rule | What it blocks | Example |
|---|---|---|
| `no-raw-colors` | Palette colours instead of theme tokens | `bg-blue-500` → use `bg-primary` |
| `no-arbitrary-values` | One-off values | `p-[13px]` → use `p-3` |
| `no-inline-styles` | `style={{...}}` and `<style>` | use Tailwind classes |
| `no-unknown-classes` | Classes Tailwind cannot generate | `rounded-huge` |
| `require-static-classes` | Dynamic class strings the linter cannot read | `` `bg-${color}` `` |
| `no-restyle` | Overriding shadcn components with `className` | `<Button className="p-4">` → use a `size` |

Practical consequences for this project:
- Never `bg-white`, `bg-black`, `text-gray-500`. Use `bg-card`, `bg-foreground`, `text-muted-foreground`.
- Image overlays use tokens: `bg-background/70` inside a `dark` section.
- Never build class names from variables. Map values to full class strings:

```tsx
const badgeByKind = {tank: 'default', fish: 'secondary', supply: 'secondary'} as const
```

- Layout classes on components are fine (`w-full`, `mt-4`, `grid`, `gap-4`). Look and size come from variants.
- Setup is in `05-BUILD-STEPS.md`.

## Banners

Managed in Sanity (`banner`) so the owner can swap them without a developer.

**Hero (2 to 3 slides, auto-rotate every 6 seconds, swipeable on mobile).** Dark section, photo behind, a navy gradient so text is readable.
1. Showpiece tank: "Living art for your home or business." Buttons: *Browse Tanks*, *Get a Custom Quote*.
2. Custom build: "Your space. Your design. Built by us." Button: *Start your custom tank*.
3. Maintenance: "Keep your aquarium crystal clear." Button: *Book maintenance*.

**Promo banners (between sections):** free consultation, maintenance offer, new fish arrivals, seasonal offers. Use the amber `highlight` badge for the offer label.

**Announcement bar:** slim, `bg-primary text-primary-foreground`, editable from Sanity.

**Image specs**
- Hero: 2400 x 1200 px minimum, subject in the centre (use Sanity hotspot so mobile crops well)
- Promo: 1600 x 600 px
- JPG or WebP, quality around 80. Sanity and `next/image` resize.
- Keep text out of the image. Headlines come from Sanity so they stay sharp.
- Shoot or grade tank photos toward the logo's blues and cyan so the photography and brand match.

**Water details (optional, small touches):** a soft wave divider between a dark and a light section, drawn as inline SVG with a token fill class (for example `fill-background`). A few cyan bubbles as a subtle decoration near the hero. Keep it light so pages stay fast.

## What makes this site convert

1. **WhatsApp everywhere.** Floating button on every page, on every product, in header and footer. The chat is the sale.
2. **Two clear paths.** Products you can buy say *Add to cart* and show a price. Products that need a conversation say *Ask about this tank* or *Get a quote*. Never mix them on one product.
3. **Show prices where you can.** Even "From GHS x" filters wrong leads and cuts back-and-forth. Tanks with a firm price can be bought straight away.
4. **Badges that explain the path.** "Buy online" and "Enquire first" on tank cards remove confusion.
5. **Real photos and short videos.** A 10-second video of a lit curved tank beats any paragraph.
6. **Proof.** Our Work gallery, real testimonials, years in business, number of tanks built.
7. **Short forms.** Name and phone are the only required fields.
8. **One clear action per page.**
9. **Mobile first.** Big tap targets, sticky WhatsApp button, fast pages.
10. **Speed.** Compress images, use `next/image`, avoid autoplay video with sound.
11. **Delivery and live-fish clarity.** Where you deliver, how fish are packed, what happens if a fish arrives unwell. Large tanks: say delivery and installation are confirmed in the chat.
12. **Stock honesty.** Mark out-of-stock items.
13. **Fast replies.** The site gets the lead, your WhatsApp reply speed wins the sale. Set up WhatsApp Business quick replies and an away message.
14. **Local SEO.** Google Business Profile, correct address and hours in Site Settings, "aquarium shop in [your area]" wording on Home and Contact.

## Page-level checklist

| Page | Must have |
|---|---|
| Home | Hero with 2 buttons, trust strip, featured tanks, custom teaser, testimonials, WhatsApp CTA |
| Tank page | Multiple photos, clear specs, price or "From" price, correct action for its `purchaseType`, WhatsApp button |
| Fish / supplies | Clear price, stock status, quantity, Add to cart, delivery note |
| Custom tanks | Process steps, gallery, "starting from" guide, short quote form |
| Maintenance | Plans, who it's for, service area, request form |
| Cart | Total, delivery or pickup choice, reassuring text under the button |

## Accessibility and quality

- Alt text on every image
- All text and button colour pairs from the tokens above already pass WCAG AA. Do not place amber text on white
- Real `<button>` and `<a>` elements, reachable by keyboard
- Test on a low-end Android phone and with slow 3G throttling in Chrome DevTools
