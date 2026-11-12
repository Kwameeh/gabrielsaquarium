/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'iicegrrv'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: 'gabrielsaquarium',
  deployment: {
    appId: 'hci16c74s120tv5oc1g0gt0j',
  },
  vite: (config) => ({
    ...config,
    publicDir: false, // Excludes large Next.js public assets (e.g. 44MB videos) from the Sanity Studio hosted bundle
    define: {
      ...config.define,
      'process.env.SANITY_STUDIO_STANDALONE': JSON.stringify('true'),
    },
  }),
})
