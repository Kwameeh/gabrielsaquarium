import { type SchemaTypeDefinition } from 'sanity';

import { siteSettings } from './siteSettings';
import { banner } from './banner';
import { tank } from './tank';
import { fish } from './fish';
import { feed } from './feed';
import { accessory } from './accessory';
import { project } from './project';
import { maintenancePlan } from './maintenancePlan';
import { testimonial } from './testimonial';
import { faq } from './faq';
import { page } from './page';

export const schemaTypes = [
  siteSettings,
  banner,
  tank,
  fish,
  feed,
  accessory,
  project,
  maintenancePlan,
  testimonial,
  faq,
  page,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
};
