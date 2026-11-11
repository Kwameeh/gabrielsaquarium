'use client';

/**
 * This configuration is used for the Sanity Studio mounted at `/app/studio/[[...tool]]/page.tsx`
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

export default defineConfig({
  name: 'default',
  title: "Gabriel's Aquarium",
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    ...schema,
    templates: (templates) => templates.filter(({ schemaType }) => schemaType !== 'siteSettings'),
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
