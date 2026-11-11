import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gabrielsaquarium.com';

  const routes = [
    '',
    '/tanks',
    '/fish',
    '/supplies',
    '/custom-tanks',
    '/maintenance',
    '/our-work',
    '/about',
    '/contact',
    '/cart',
    '/faq',
    '/delivery-policy',
    '/terms',
    '/privacy',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2026-11-10'),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
