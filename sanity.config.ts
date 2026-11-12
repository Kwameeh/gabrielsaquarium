'use client';

/**
 * This configuration is used for the Sanity Studio mounted at `/app/studio/[[...tool]]/page.tsx`
 * and when deployed to Sanity hosting (`*.sanity.studio`)
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool, defineDocuments, defineLocations } from 'sanity/presentation';

import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

const isStandalone =
  typeof window !== 'undefined'
    ? window.location.hostname.endsWith('.sanity.studio') ||
      window.location.hostname.endsWith('.sanity.build') ||
      !window.location.pathname.startsWith('/studio')
    : process.env.SANITY_STUDIO_STANDALONE === 'true';

const previewOrigin =
  typeof window !== 'undefined' &&
  (window.location.hostname.endsWith('.sanity.studio') || window.location.hostname.endsWith('.sanity.build'))
    ? (process.env.NEXT_PUBLIC_SITE_URL || 'https://gabrielsaquarium.com')
    : undefined;

const resolve = {
  mainDocuments: defineDocuments([
    {
      route: '/',
      filter: `_type in ["siteSettings", "banner", "gallery", "tank", "fish", "project", "maintenancePlan", "testimonial", "faq"]`,
    },
    {
      route: '/product/:slug',
      filter: `_type in ["tank", "fish", "feed", "accessory"] && slug.current == $slug`,
    },
    {
      route: '/our-work/:slug',
      filter: `_type == "project" && slug.current == $slug`,
    },
    {
      route: '/:slug',
      filter: `_type == "page" && slug.current == $slug`,
    },
  ]),
  locations: {
    siteSettings: defineLocations({
      locations: [
        { title: 'Home', href: '/' },
        { title: 'Contact', href: '/contact' },
        { title: 'About', href: '/about' },
      ],
      message: 'Global site settings & homepage content',
      tone: 'positive',
    }),
    page: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Page',
            href: doc?.slug === 'home' ? '/' : `/${doc?.slug || ''}`,
          },
        ],
      }),
    }),
    tank: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Tank Product Page',
            href: `/product/${doc?.slug}`,
          },
          {
            title: 'Tanks Catalog',
            href: '/tanks',
          },
          {
            title: 'Home',
            href: '/',
          },
        ],
      }),
    }),
    fish: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Fish Product Page',
            href: `/product/${doc?.slug}`,
          },
          {
            title: 'Fish Catalog',
            href: '/fish',
          },
          {
            title: 'Home',
            href: '/',
          },
        ],
      }),
    }),
    feed: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Feed Product Page',
            href: `/product/${doc?.slug}`,
          },
          {
            title: 'Supplies Catalog',
            href: '/supplies',
          },
          {
            title: 'Home',
            href: '/',
          },
        ],
      }),
    }),
    accessory: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Accessory Product Page',
            href: `/product/${doc?.slug}`,
          },
          {
            title: 'Supplies Catalog',
            href: '/supplies',
          },
          {
            title: 'Home',
            href: '/',
          },
        ],
      }),
    }),
    project: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Project Case Study',
            href: `/our-work/${doc?.slug}`,
          },
          {
            title: 'Our Work Showcase',
            href: '/our-work',
          },
          {
            title: 'Home',
            href: '/',
          },
        ],
      }),
    }),
    maintenancePlan: defineLocations({
      locations: [
        { title: 'Maintenance Page', href: '/maintenance' },
        { title: 'Home (Maintenance Section)', href: '/#maintenance' },
      ],
    }),
    testimonial: defineLocations({
      locations: [
        { title: 'Home (Testimonials)', href: '/#testimonials' },
        { title: 'FAQ & Reviews Page', href: '/faq' },
      ],
    }),
    faq: defineLocations({
      locations: [
        { title: 'FAQ & Reviews Page', href: '/faq' },
        { title: 'Home (FAQ Section)', href: '/#testimonials' },
      ],
    }),
    gallery: defineLocations({
      locations: [
        { title: 'Home (Motion & 3D Hero Gallery)', href: '/' },
        { title: 'Full Gallery Page', href: '/gallery' },
      ],
    }),
  },
};

export default defineConfig({
  name: 'default',
  title: "Gabriel's Aquarium",
  basePath: isStandalone ? '/' : '/studio',
  projectId,
  dataset,
  schema: {
    ...schema,
    templates: (templates) => templates.filter(({ schemaType }) => schemaType !== 'siteSettings'),
  },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: {
        ...(previewOrigin ? { origin: previewOrigin } : {}),
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
