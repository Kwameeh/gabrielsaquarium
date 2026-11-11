# 01. Site Structure

## Sitemap

| Route | Page | Content source |
|---|---|---|
| `/` | Home | banners, featured products, projects, testimonials, faqs |
| `/tanks` | Ready-made tanks (filter: shape, glass, suitable for, buy or enquire) | `tank` |
| `/fish` | Live fish (filter: water type, care level, temperament) | `fish` |
| `/supplies` | Fish food and accessories (filter: type, brand, food type, category) | `feed`, `accessory` |
| `/product/[slug]` | Single product page (all kinds, specs change per kind) | `tank`, `fish`, `feed`, `accessory` |
| `/custom-tanks` | Custom tank service and quote form | page + projects |
| `/maintenance` | Plans and booking request | maintenancePlan + page |
| `/our-work` | Portfolio grid (filter by client type) | project |
| `/our-work/[slug]` | Single project | project |
| `/about` | About the business | page |
| `/contact` | Contact, map, hours, message form | siteSettings |
| `/cart` | Cart and "Send order on WhatsApp" | local cart |
| `/faq` | All FAQs | faq |
| `/delivery-policy`, `/terms`, `/privacy` | Policies | page |
| `/care-guides` (Phase 3) | Blog | post |

## Header and footer

**Announcement bar** (top, editable, can be switched off): e.g. "Free consultation for custom tanks".

**Header:** Floating glassmorphic pill navbar style with brand mark, Tanks, Fish, Supplies, Custom Tanks, Maintenance, Our Work, Contact, interactive search modal, live cart icon with count badge, and a green "WhatsApp us" button.

**Footer:** short blurb, quick links, contact details, opening hours, map link, social links, policies. All of it from `siteSettings`.

**Floating WhatsApp button** on every page, bottom-right, on mobile and desktop.

## Homepage sections (in order)

1. **Hero centerpiece.** 3D interactive Radial Gallery & ambient centerpiece hero (retaining the floating 3D depth-layered visual style, featuring Gabriel's curved-glass tanks, planted aquascapes, and marine reef builds, ambient badges, and two primary action buttons: *Browse Tanks* and *Get a Custom Quote*). The original standalone prototype is preserved at `/floema-demo`.
2. **Trust strip.** Four short items: Custom builds, Live fish, Installation and maintenance, Delivery info.
3. **Category tiles.** Large image cards: Tanks, Custom Tanks, Fish, Food and Supplies, Maintenance.
4. **Featured tanks.** 4 to 6 products where `featured` is true, including curved-glass pieces. Each card has a "View / Ask" button.
5. **Custom build teaser.** Image plus 4 steps: Tell us your idea, We design it, We build it, We install it. Button: *Request a quote*.
6. **Our work gallery.** 6 featured projects, link to `/our-work`.
7. **Maintenance banner.** Promo banner (placement = promo). Button: *Book maintenance*.
8. **Fish and supplies highlights.** Featured fish and supplies with Add to cart.
9. **Testimonials.** 3 to 6 real customer quotes.
10. **FAQ preview.** 5 questions with accordion.
11. **Final call to action.** "Ready for your own aquarium?" with WhatsApp and call buttons.

## Page details

### Tanks list
Grid of cards: image, name, details line (`120 x 50 x 60 cm · Curved front · Low-iron`), Buy online / Enquire first badge. Each card follows the tank's `purchaseType`:
- **Buy online:** exact price and an *Add to cart* button.
- **Enquire first:** "From GHS x" (or "Price on request") and an *Ask about this tank* button.

Filters: shape, glass type, suitable for (freshwater / marine), availability (Buy online / Enquire first). Empty state: "Don't see what you need? We build custom tanks" with a link.

### Fish list
Cards show water type, care level and adult size, plus the price with its unit ("GHS 25 each"). Filters: water type, care level, temperament. Out-of-stock fish show "Not available now" instead of Add to cart.

### Supplies list
Fish food and accessories together. Food cards show brand, food type and pack size. Accessory cards show brand and category. Filters: type (food / accessories), brand, food type, category.

### Product page
The layout is the same for every kind, and the spec table changes with the kind (field list in `07-PRODUCT-FIELDS.md`).
- Gallery (swipeable on mobile), title, price line.
- Actions by `purchaseType`: **buy** shows quantity and *Add to cart* plus a secondary *Ask a question on WhatsApp*; **inquire** shows the inquiry form (name, phone, optional message, *Send inquiry on WhatsApp*).
- **Tank:** size, volume, shape, glass type and thickness, frame, suitable for, overflow, weight, lead time, warranty, what's included. Note: "Delivery and installation are confirmed in the chat."
- **Fish:** scientific name, water type, care level, temperament, diet, adult size, size we sell at, minimum tank, water conditions, reef safe (marine), compatibility. Note and link: live fish delivery and arrival policy.
- **Food:** brand, pack size, food type, floating or sinking, pellet size, suitable for, protein / fat / fibre / moisture, and accordions for ingredients and feeding guide.
- **Accessory:** brand, category, suitable for, specification list, what's in the box, warranty.
- Below: "You may also like" (same kind, 4 items), delivery note.

### Custom tanks
Hero, 4-step process, what you can customise (size, shape, glass type, stand, lighting, background, filtration), gallery of past builds (projects marked custom), quote form: name, phone, location, home or business, approximate size, idea. The form opens WhatsApp with the details and tells the customer: "Send us photos of your space and any inspiration in the chat."

### Maintenance
Hero, who it's for (homes, offices, restaurants, hotels), plans from `maintenancePlan`, what's included, service area, request form: name, phone, location, number and size of tanks, preferred plan.

### Our work
Filterable grid. Project page: gallery, client type, tank size, short description, button *Want something similar? Get a quote*.

### Contact
WhatsApp, call, email buttons, address, map link, opening hours, and the same short message form (opens WhatsApp).

### Cart
List of items, quantity controls, total, then a short form: name, phone, delivery or pickup, address (only if delivery), note. Button *Send order on WhatsApp*. Text under it: "We'll confirm availability, delivery fee and payment details in the chat. Large items like tanks may need extra delivery arrangements."
