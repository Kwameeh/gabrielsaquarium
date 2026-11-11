import { groq } from 'next-sanity';

const PRODUCTS = `["tank","fish","feed","accessory"]`;

// What a product card needs, plus the few details each type shows on its card
const cardFields = `
  _id, _type, title, "slug": slug.current, price, inStock, soldAs,
  "image": images[0],
  "purchaseType": select(_type == "tank" => coalesce(purchaseType, "inquire"), "buy"),
  _type == "tank" => {lengthCm, widthCm, heightCm, shape, glassType, suitableFor},
  _type == "fish" => {waterType, careLevel, temperament, adultSizeCm},
  _type == "feed" => {brand, foodType, packSize, suitableFor},
  _type == "accessory" => {brand, category}
`;

export const settingsQuery = groq`*[_type == "siteSettings"][0]`;

export const heroBannersQuery = groq`*[_type == "banner" && active == true && placement == "hero"] | order(order asc)`;
export const promoBannersQuery = groq`*[_type == "banner" && active == true && placement == "promo"] | order(order asc)`;

// Listing pages
export const tanksQuery = groq`*[_type == "tank"] | order(_createdAt desc){ ${cardFields} }`;
export const fishQuery = groq`*[_type == "fish"] | order(_createdAt desc){ ${cardFields} }`;
export const suppliesQuery = groq`*[_type in ["feed","accessory"]] | order(_type asc, _createdAt desc){ ${cardFields} }`;

// Home page: pass $type = "tank" or "fish"
export const featuredQuery = groq`*[_type == $type && featured == true][0...6]{ ${cardFields} }`;
export const featuredSuppliesQuery = groq`*[_type in ["feed","accessory"] && featured == true][0...6]{ ${cardFields} }`;

// Product page (all fields) and "you may also like" (pass the product's _type)
export const productQuery = groq`*[_type in ${PRODUCTS} && slug.current == $slug][0]{
  ...,
  "purchaseType": select(_type == "tank" => coalesce(purchaseType, "inquire"), "buy")
}`;
export const relatedQuery = groq`*[_type == $type && slug.current != $slug][0...4]{ ${cardFields} }`;

// Sitemap
export const allProductSlugsQuery = groq`*[_type in ${PRODUCTS} && defined(slug.current)]{"slug": slug.current, _updatedAt}`;

export const projectsQuery = groq`*[_type == "project"] | order(_createdAt desc){
  _id, title, "slug": slug.current, clientType, custom, "image": images[0]
}`;
export const featuredProjectsQuery = groq`*[_type == "project" && featured == true][0...6]{
  _id, title, "slug": slug.current, clientType, "image": images[0]
}`;
export const projectQuery = groq`*[_type == "project" && slug.current == $slug][0]`;

export const plansQuery = groq`*[_type == "maintenancePlan"] | order(order asc)`;
export const testimonialsQuery = groq`*[_type == "testimonial"][0...6]`;
export const faqsQuery = groq`*[_type == "faq"] | order(order asc)`;
export const homeFaqsQuery = groq`*[_type == "faq" && showOnHome == true] | order(order asc)[0...5]`;
export const pageQuery = groq`*[_type == "page" && slug.current == $slug][0]`;
