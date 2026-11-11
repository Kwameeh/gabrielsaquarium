# 03. WhatsApp Integration (cart, orders, enquiries)

No WhatsApp API, no server, no monthly fees. We use **click-to-chat links**: `https://wa.me/<number>?text=<message>`. The customer taps a button, WhatsApp opens with the message already written, and they press send.

The number comes from Sanity `siteSettings.whatsappNumber` (digits only, international format, e.g. `233241234567`).

All components below use **shadcn/ui components and theme tokens only**, so they pass `@shadcn/lint` (no raw colours, no arbitrary values). Set up the theme first (`04-DESIGN-AND-CONVERSION.md`, including the `whatsapp` button variant).

## What goes through WhatsApp

| Action | Where | Message contains |
|---|---|---|
| Ask about a tank (enquire first) | Product page | Product name, link, name, phone, note |
| Quick question about a product | Product page (buy online items) | Product name, link |
| Order fish, food, supplies, buy-online tanks | Cart page | Items, quantities, prices, total, delivery or pickup, address |
| Custom tank quote | `/custom-tanks` | Name, phone, location, home or business, size, idea |
| Maintenance request | `/maintenance` | Name, phone, location, tanks, plan |
| General question | Floating button, Contact | "Hello, I have a question" |

## How a product page decides what to show

Every product from Sanity (tank, fish, feed or accessory) carries `purchaseType`. Only tanks can be `inquire`; fish, food and accessories are always `buy`:

| `purchaseType` | Component shown |
|---|---|
| `buy` (and has a price) | `AddToCart` + `AskAboutProduct` |
| `inquire` | `TankInquiry` |

## shadcn components to install

```bash
npx shadcn@latest add button input textarea label radio-group card sonner
```

Add `<Toaster />` (from `@/components/ui/sonner`) once in the root layout. We use it for form errors instead of `alert()`.

## 1. Helpers: `src/lib/whatsapp.ts`

```ts
export function waLink(number: string, text: string) {
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? ''

export type CartItem = {id: string; title: string; slug: string; price: number; qty: number}

export function priceLabel(p: {price?: number | null; purchaseType: 'buy' | 'inquire'; soldAs?: string | null}) {
  if (p.price == null) return 'Price on request'
  const amount = `GHS ${p.price.toLocaleString('en-GH')}`
  if (p.purchaseType === 'inquire') return `From ${amount}`
  return p.soldAs ? `${amount} ${p.soldAs}` : amount // fish: "GHS 25 each"
}

export function orderMessage(
  items: CartItem[],
  c: {name: string; phone: string; method: 'delivery' | 'pickup'; address?: string; note?: string}
) {
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const lines = items.map((i) => `• ${i.qty} x ${i.title} - GHS ${(i.price * i.qty).toLocaleString('en-GH')}`)
  return [
    "*New order - Gabreil's Aquarium*",
    '',
    ...lines,
    '',
    `*Total:* GHS ${total.toLocaleString('en-GH')}`,
    '',
    `*Name:* ${c.name}`,
    `*Phone:* ${c.phone}`,
    `*Method:* ${c.method === 'delivery' ? 'Delivery' : 'Pickup'}`,
    ...(c.method === 'delivery' && c.address ? [`*Address:* ${c.address}`] : []),
    ...(c.note ? [`*Note:* ${c.note}`] : []),
  ].join('\n')
}

export function tankInquiryMessage(
  p: {title: string; slug: string},
  c: {name: string; phone: string; note?: string}
) {
  return [
    "Hello Gabreil's Aquarium, I'm interested in this tank:",
    `*${p.title}*`,
    `${SITE_URL}/product/${p.slug}`,
    '',
    `*Name:* ${c.name}`,
    `*Phone:* ${c.phone}`,
    ...(c.note ? [`*Message:* ${c.note}`] : []),
  ].join('\n')
}

export function productQuestionMessage(p: {title: string; slug: string}) {
  return [`Hello Gabreil's Aquarium, I have a question about:`, `*${p.title}*`, `${SITE_URL}/product/${p.slug}`].join('\n')
}

export function customTankMessage(c: {
  name: string
  phone: string
  location: string
  clientType: string
  size?: string
  idea: string
}) {
  return [
    '*Custom tank request*',
    '',
    `*Name:* ${c.name}`,
    `*Phone:* ${c.phone}`,
    `*Location:* ${c.location}`,
    `*For:* ${c.clientType}`,
    ...(c.size ? [`*Approx. size:* ${c.size}`] : []),
    `*Idea:* ${c.idea}`,
    '',
    "I'll send photos of the space in this chat.",
  ].join('\n')
}

export function maintenanceMessage(c: {name: string; phone: string; location: string; tanks: string; plan?: string}) {
  return [
    '*Maintenance request*',
    '',
    `*Name:* ${c.name}`,
    `*Phone:* ${c.phone}`,
    `*Location:* ${c.location}`,
    `*Tanks (number and size):* ${c.tanks}`,
    ...(c.plan ? [`*Plan:* ${c.plan}`] : []),
  ].join('\n')
}
```

Add `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` to `.env.local` so links in messages are correct.

## 2. Make the number available everywhere: `src/components/SettingsProvider.tsx`

```tsx
'use client'
import {createContext, useContext} from 'react'

export type Settings = {
  businessName?: string
  whatsappNumber: string
  phone?: string
  email?: string
  address?: string
  mapLink?: string
  openingHours?: string[]
  instagram?: string
  facebook?: string
  tiktok?: string
  announcementText?: string
  announcementActive?: boolean
}

const Ctx = createContext<Settings | null>(null)

export function SettingsProvider({settings, children}: {settings: Settings; children: React.ReactNode}) {
  return <Ctx.Provider value={settings}>{children}</Ctx.Provider>
}

export function useSettings() {
  const s = useContext(Ctx)
  if (!s) throw new Error('useSettings must be used inside SettingsProvider')
  return s
}
```

In `src/app/layout.tsx` (server component):

```tsx
import {client} from '@/lib/sanity'
import {settingsQuery} from '@/lib/queries'
import {SettingsProvider} from '@/components/SettingsProvider'
import {Toaster} from '@/components/ui/sonner'

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const settings = await client.fetch(settingsQuery, {}, {next: {revalidate: 60}})
  return (
    <html lang="en">
      <body>
        <SettingsProvider settings={settings}>
          {/* <AnnouncementBar /> <Header /> */}
          {children}
          {/* <Footer /> <WhatsAppFloat /> */}
          <Toaster />
        </SettingsProvider>
      </body>
    </html>
  )
}
```

(Fonts and the `className` on `<body>` are added in the design doc.)

## 3. Cart store: `src/lib/cart.ts`

```ts
'use client'
import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import type {CartItem} from './whatsapp'

type CartState = {
  items: CartItem[]
  add: (item: Omit<CartItem, 'qty'>, qty?: number) => void
  setQty: (id: string, qty: number) => void
  remove: (id: string) => void
  clear: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (item, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.id === item.id)
          return {
            items: existing
              ? s.items.map((i) => (i.id === item.id ? {...i, qty: i.qty + qty} : i))
              : [...s.items, {...item, qty}],
          }
        }),
      setQty: (id, qty) =>
        set((s) => ({
          items: qty <= 0 ? s.items.filter((i) => i.id !== id) : s.items.map((i) => (i.id === id ? {...i, qty} : i)),
        })),
      remove: (id) => set((s) => ({items: s.items.filter((i) => i.id !== id)})),
      clear: () => set({items: []}),
    }),
    {name: 'gabreils-cart'}
  )
)
```

**Hydration tip:** the cart is read from the browser, so wherever you show the cart count or the cart items, render them only after mount:

```tsx
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0))
// show {mounted ? count : 0}
```

## 4. Buy-online actions

### `src/components/AddToCart.tsx`

```tsx
'use client'
import {useState} from 'react'
import {Minus, Plus} from 'lucide-react'
import {toast} from 'sonner'
import {Button} from '@/components/ui/button'
import {useCart} from '@/lib/cart'

type Props = {product: {_id: string; title: string; slug: string; price: number; inStock?: boolean}}

export function AddToCart({product}: Props) {
  const add = useCart((s) => s.add)
  const [qty, setQty] = useState(1)

  if (product.inStock === false) {
    return <p className="rounded-lg bg-muted px-4 py-3 text-muted-foreground">Currently out of stock. Message us to be notified.</p>
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" size="icon" aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}>
          <Minus />
        </Button>
        <span className="w-6 text-center font-medium">{qty}</span>
        <Button type="button" variant="outline" size="icon" aria-label="Increase quantity" onClick={() => setQty(qty + 1)}>
          <Plus />
        </Button>
      </div>
      <Button
        type="button"
        size="lg"
        onClick={() => {
          add({id: product._id, title: product.title, slug: product.slug, price: product.price}, qty)
          toast.success(`${product.title} added to cart`)
        }}
      >
        Add to cart
      </Button>
    </div>
  )
}
```

### `src/components/AskAboutProduct.tsx`

A quick question link for buy-online items (large tanks especially).

```tsx
'use client'
import {buttonVariants} from '@/components/ui/button'
import {useSettings} from './SettingsProvider'
import {productQuestionMessage, waLink} from '@/lib/whatsapp'

export function AskAboutProduct({product}: {product: {title: string; slug: string}}) {
  const {whatsappNumber} = useSettings()
  return (
    <a
      href={waLink(whatsappNumber, productQuestionMessage(product))}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonVariants({variant: 'outline'})}
    >
      Ask a question on WhatsApp
    </a>
  )
}
```

## 5. Enquiry box (enquire-first tanks): `src/components/TankInquiry.tsx`

```tsx
'use client'
import {useState} from 'react'
import {toast} from 'sonner'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {useSettings} from './SettingsProvider'
import {tankInquiryMessage, waLink} from '@/lib/whatsapp'

export function TankInquiry({product}: {product: {title: string; slug: string}}) {
  const {whatsappNumber} = useSettings()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')

  const send = () => {
    if (!name.trim() || !phone.trim()) return toast.error('Please enter your name and phone number.')
    window.open(waLink(whatsappNumber, tankInquiryMessage(product, {name, phone, note})), '_blank')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ask about this tank</CardTitle>
        <CardDescription>We reply with availability, price and delivery details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input aria-label="Your name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input aria-label="Phone number" placeholder="Phone number" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Textarea aria-label="Message" placeholder="Message (optional): size changes, delivery location..." rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
        <Button type="button" variant="whatsapp" size="lg" className="w-full" onClick={send}>
          Send inquiry on WhatsApp
        </Button>
      </CardContent>
    </Card>
  )
}
```

## 6. One component picks the right path: `src/components/ProductActions.tsx`

```tsx
'use client'
import {AddToCart} from './AddToCart'
import {AskAboutProduct} from './AskAboutProduct'
import {TankInquiry} from './TankInquiry'

type Props = {
  product: {
    _id: string
    title: string
    slug: string
    purchaseType: 'buy' | 'inquire'
    price?: number | null
    inStock?: boolean
  }
}

export function ProductActions({product}: Props) {
  if (product.purchaseType === 'buy' && product.price != null) {
    return (
      <div className="space-y-3">
        <AddToCart product={{...product, price: product.price}} />
        <AskAboutProduct product={product} />
      </div>
    )
  }
  return <TankInquiry product={product} />
}
```

On the product page show the price with `priceLabel(product)` from `whatsapp.ts`. Use the same logic on product cards: `buy` shows a small Add to cart, `inquire` shows a "View / Ask" button that links to the product page.

## 7. Cart page: `src/app/cart/page.tsx`

```tsx
'use client'
import {useEffect, useState} from 'react'
import {toast} from 'sonner'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group'
import {Textarea} from '@/components/ui/textarea'
import {useCart} from '@/lib/cart'
import {useSettings} from '@/components/SettingsProvider'
import {orderMessage, waLink} from '@/lib/whatsapp'

export default function CartPage() {
  const {items, setQty, remove, clear} = useCart()
  const {whatsappNumber} = useSettings()
  const [mounted, setMounted] = useState(false)
  const [form, setForm] = useState({name: '', phone: '', method: 'delivery' as 'delivery' | 'pickup', address: '', note: ''})
  useEffect(() => setMounted(true), [])

  if (!mounted) return null
  if (items.length === 0) return <main className="mx-auto max-w-2xl p-6">Your cart is empty.</main>

  const total = items.reduce((s, i) => s + i.price * i.qty, 0)

  const sendOrder = () => {
    if (!form.name.trim() || !form.phone.trim()) return toast.error('Please enter your name and phone number.')
    if (form.method === 'delivery' && !form.address.trim()) return toast.error('Please enter your delivery address.')
    window.open(waLink(whatsappNumber, orderMessage(items, form)), '_blank')
  }

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <h1 className="font-heading text-2xl font-bold">Your cart</h1>

      {items.map((i) => (
        <div key={i.id} className="flex items-center justify-between gap-3 border-b pb-3">
          <div>
            <p className="font-medium">{i.title}</p>
            <p className="text-sm text-muted-foreground">GHS {i.price.toLocaleString('en-GH')}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" aria-label="Decrease" onClick={() => setQty(i.id, i.qty - 1)}>-</Button>
            <span className="w-6 text-center">{i.qty}</span>
            <Button variant="outline" size="icon" aria-label="Increase" onClick={() => setQty(i.id, i.qty + 1)}>+</Button>
            <Button variant="ghost" onClick={() => remove(i.id)}>Remove</Button>
          </div>
        </div>
      ))}

      <p className="text-right text-lg font-semibold">Total: GHS {total.toLocaleString('en-GH')}</p>

      <div className="space-y-4">
        <Input aria-label="Your name" placeholder="Your name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
        <Input aria-label="Phone number" placeholder="Phone number" inputMode="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} />

        <RadioGroup value={form.method} onValueChange={(v) => setForm({...form, method: v as 'delivery' | 'pickup'})} className="flex gap-6">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="delivery" id="delivery" />
            <Label htmlFor="delivery">Delivery</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="pickup" id="pickup" />
            <Label htmlFor="pickup">Pickup from the shop</Label>
          </div>
        </RadioGroup>

        {form.method === 'delivery' && (
          <Input aria-label="Delivery address" placeholder="Delivery address / landmark" value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} />
        )}
        <Textarea aria-label="Note" rows={2} placeholder="Note (optional)" value={form.note} onChange={(e) => setForm({...form, note: e.target.value})} />

        <Button variant="whatsapp" size="lg" className="w-full" onClick={sendOrder}>
          Send order on WhatsApp
        </Button>
        <p className="text-sm text-muted-foreground">
          We'll confirm availability, delivery fee and payment details in the chat. Large items like tanks may need extra delivery arrangements.
        </p>
        <Button variant="link" onClick={clear}>Clear cart</Button>
      </div>
    </main>
  )
}
```

## 8. Floating button: `src/components/WhatsAppFloat.tsx`

```tsx
'use client'
import {MessageCircle} from 'lucide-react'
import {buttonVariants} from '@/components/ui/button'
import {useSettings} from './SettingsProvider'
import {waLink} from '@/lib/whatsapp'

export function WhatsAppFloat() {
  const {whatsappNumber} = useSettings()
  return (
    <a
      href={waLink(whatsappNumber, "Hello Gabreil's Aquarium, I have a question.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`${buttonVariants({variant: 'whatsapp', size: 'lg'})} fixed bottom-5 right-5 z-50 shadow-lg`}
    >
      <MessageCircle />
      WhatsApp
    </a>
  )
}
```

Use the same pattern for the custom tank and maintenance forms, calling `customTankMessage` and `maintenanceMessage`.

## 9. Good to know

- **Phone number format:** `233241234567`, never `+233...` or `024...`. The Sanity validation enforces this.
- **Message length:** very long messages can exceed URL limits. A cart of up to about 20 different items is safe.
- **Prices in the message** are what the customer saw. The shop confirms the final price and delivery fee in the chat, which suits an order-by-chat flow and large tanks.
- **No photo upload:** WhatsApp links cannot attach files. The forms tell customers to send photos in the chat.
- **Use WhatsApp Business** on the shop's phone: quick replies, away message, labels (New, Quoted, Paid, Delivered).
- **Track clicks** (later phase): fire an analytics event on WhatsApp clicks to see which pages bring orders.
