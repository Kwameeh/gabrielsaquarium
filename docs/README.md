# Gabreil's Aquarium: Website Project

A website for an aquarium business that sells empty tanks, live fish, fish food and supplies, builds custom tanks, and offers tank maintenance.

## Decisions (read this first)

| Decision | Choice |
|---|---|
| Empty tanks (ready-made and curved glass) | **Two modes, set per tank in Sanity.** *Buy online*: price + Add to cart. *Enquire first*: "From GHS x" or "Price on request" + "Ask about this tank" |
| Custom tanks | **Inquiry only.** Quote request form |
| Maintenance | **Inquiry / booking request** |
| Fish, food, supplies | **Add to cart, then send the order on WhatsApp.** Payment is arranged in the chat (MoMo, bank, cash on delivery or pickup) |
| Payment gateway | **Not in Phase 1.** Can be added later without changing the content structure |
| Where does the business info live? | **Sanity** (`siteSettings`): phone, WhatsApp number, email, address, hours, socials, announcement bar |
| Who edits the site? | The owner, in Sanity Studio at `/studio`. No code needed for day-to-day changes |
| Products | **Four separate types with their own fields:** `tank`, `fish`, `feed`, `accessory`. A fish form asks for care level and temperament, a tank form for glass and dimensions, a food form for ingredients and analysis |
| Schema rule | **Only fields that appear on the website.** If a field is not shown or used, it does not exist |

## Tech stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- shadcn/ui components, with a theme built from the Gabreil's logo colours
- `@shadcn/lint` so the design system rules are enforced automatically
- Sanity (embedded Studio at `/studio`)
- Zustand for the cart (saved in the browser)
- WhatsApp click-to-chat links (`wa.me`) for orders and inquiries
- Vercel for hosting

## Files in this folder

| File | What it covers |
|---|---|
| `README.md` | This overview |
| `AGENTS.md` | Rules for AI coding assistants (business rules, design system rules, lint command) |
| `CLAUDE.md` | Points Claude Code to `AGENTS.md` |
| `01-SITE-STRUCTURE.md` | Sitemap, every page, every homepage section |
| `02-SANITY-SCHEMA.md` | Lean Sanity schemas (copy-paste code) and queries |
| `03-WHATSAPP-INTEGRATION.md` | Cart, order message, inquiry message, floating button (code) |
| `04-DESIGN-AND-CONVERSION.md` | Logo-based colour palette, shadcn theme (copy-paste CSS), fonts, banners, lint rules, conversion checklist |
| `05-BUILD-STEPS.md` | Step-by-step build from zero to launch |
| `06-CONTENT-AND-LAUNCH.md` | What the client must provide, SEO, test and launch checklists |
| `07-PRODUCT-FIELDS.md` | Research on what tank, fish and food pages show, the fields for each kind, and the spec and card components |
| `assets/` | High-resolution photography assets (e.g. Kasoa custom builds) |

## Build order

1. Read `01` and `04` so you know what you are building and how it should look.
2. Follow `05-BUILD-STEPS.md`. It tells you when to open `02` and `03`.
3. Use `06` to collect content in parallel and to launch.
