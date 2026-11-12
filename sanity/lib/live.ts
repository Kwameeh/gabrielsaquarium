// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout.
import { defineLive } from "next-sanity/live";
import { client } from './client';

const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

const live = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});

export const { SanityLive } = live;

export async function sanityFetch<T = any>(
  options: Parameters<typeof live.sanityFetch>[0]
): Promise<{ data: T }> {
  return live.sanityFetch(options) as Promise<{ data: T }>;
}
