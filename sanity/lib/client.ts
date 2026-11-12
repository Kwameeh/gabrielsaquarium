import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // false ensures new edits and uploaded images in Sanity Studio reflect immediately
  stega: {
    studioUrl: '/studio',
  },
})
