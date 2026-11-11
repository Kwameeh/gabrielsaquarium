# Project rules: Gabreil's Aquarium

Stack: Next.js App Router, TypeScript, Tailwind CSS v4, shadcn/ui, `@shadcn/lint`, Sanity (embedded Studio at /studio), Zustand, Vercel.

## Always
After making changes, run `npm run lint` and fix all errors.

## Business rules
- Products are four Sanity document types: `tank`, `fish`, `feed`, `accessory`. Each has its own fields (see `07-PRODUCT-FIELDS.md`). Branch on `_type`, never assume a field exists for every product.
- Every product query returns `purchaseType` as `buy` or `inquire`.
  - `buy` (all fish, feed, accessories, and tanks set to "Buy online"): show the price and **Add to cart**.
  - `inquire` (tanks set to "Enquire first"): show "From GHS x" or "Price on request" and the **Ask about this tank** form. Never an Add to cart button.
- Spec tables are built from `ProductSpecs` and `SpecTable`. Empty fields are hidden. Do not add placeholders for missing data.
- The cart never takes payment. It builds a WhatsApp message and opens `wa.me`.
- Contact details (WhatsApp, phone, email, address, hours, socials) come ONLY from the Sanity `siteSettings` document. Never hard-code them.
- Never invent prices, stock, specs or testimonials. Sections with no content render nothing.
- Prices are in GHS. Format with `toLocaleString('en-GH')`.

## Design system rules (enforced by lint)
- Use shadcn components from `@/components/ui` (Button, Input, Textarea, Card, Badge, Accordion, Carousel, Sheet...). Do not build custom versions.
- Colours come from theme tokens only (`bg-primary`, `text-muted-foreground`, `bg-highlight`, `bg-whatsapp`...). No raw Tailwind palette colours (`bg-blue-500`, `text-gray-600`), no hex values, no `bg-black` or `bg-white`.
- No arbitrary values (`p-[13px]`, `w-[420px]`). Use the Tailwind scale.
- No inline `style` props or `<style>` tags.
- Do not restyle components with `className`. Use their variants and sizes. Layout classes (`mt-4`, `w-full`, `grid`, `flex`, `gap-*`) are fine.
- WhatsApp buttons use `variant="whatsapp"` (defined in `components/ui/button.tsx`).
- Dark sections: wrap in an element with className `dark bg-background text-foreground`. This flips the tokens inside that section. Do not hard-code dark colours.
- Image overlays use tokens, e.g. `bg-background/70` inside a `dark` section.
- Headings use `font-heading` (Poppins). Body uses the default sans (Inter).

## Code rules
- Mobile first. Every page must work at 360px width.
- Server components fetch from Sanity. Client components only where needed (cart, forms, floating button).
- Use `next/image` with the Sanity image URL builder. Always set `alt`.
- Keep the Sanity schema lean: no fields that are not rendered on the site.

## Docs
`01-SITE-STRUCTURE.md` (pages), `02-SANITY-SCHEMA.md` (schema), `03-WHATSAPP-INTEGRATION.md` (cart and inquiries), `04-DESIGN-AND-CONVERSION.md` (theme and design), `07-PRODUCT-FIELDS.md` (product fields and spec components).
