export function waLink(number: string, text: string) {
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? '';

export type CartItem = {
  id: string;
  title: string;
  slug: string;
  price: number;
  qty: number;
  image?: string;
};

export function priceLabel(p: {
  price?: number | null;
  purchaseType: 'buy' | 'inquire';
  soldAs?: string | null;
}) {
  if (p.price == null) return 'Price on request';
  const amount = `GHS ${p.price.toLocaleString('en-GH')}`;
  if (p.purchaseType === 'inquire') return `From ${amount}`;
  return p.soldAs ? `${amount} ${p.soldAs}` : amount; // e.g. "GHS 25 each"
}

export function orderMessage(
  items: CartItem[],
  c: {
    name: string;
    phone: string;
    method: 'delivery' | 'pickup';
    address?: string;
    note?: string;
  }
) {
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const lines = items.map(
    (i) => `• ${i.qty} x ${i.title} - GHS ${(i.price * i.qty).toLocaleString('en-GH')}`
  );
  return [
    "*New order - Gabriel's Aquarium*",
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
  ].join('\n');
}

export function tankInquiryMessage(
  p: { title: string; slug: string },
  c: { name: string; phone: string; note?: string }
) {
  return [
    "Hello Gabriel's Aquarium, I'm interested in this tank:",
    `*${p.title}*`,
    `${SITE_URL}/product/${p.slug}`,
    '',
    `*Name:* ${c.name}`,
    `*Phone:* ${c.phone}`,
    ...(c.note ? [`*Message:* ${c.note}`] : []),
  ].join('\n');
}

export function productQuestionMessage(p: { title: string; slug: string }) {
  return [
    "Hello Gabriel's Aquarium, I have a question about:",
    `*${p.title}*`,
    `${SITE_URL}/product/${p.slug}`,
  ].join('\n');
}

export function customTankMessage(c: {
  name: string;
  phone: string;
  location: string;
  clientType: string;
  size?: string;
  idea: string;
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
  ].join('\n');
}

export function maintenanceMessage(c: {
  name: string;
  phone: string;
  location: string;
  tanks: string;
  plan?: string;
}) {
  return [
    '*Maintenance request*',
    '',
    `*Name:* ${c.name}`,
    `*Phone:* ${c.phone}`,
    `*Location:* ${c.location}`,
    `*Tanks (number and size):* ${c.tanks}`,
    ...(c.plan ? [`*Plan:* ${c.plan}`] : []),
  ].join('\n');
}
