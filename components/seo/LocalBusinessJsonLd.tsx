import React from 'react';

export function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    name: "Gabriel's Aquarium",
    description:
      "Ghana's premier specialist in handcrafted curved glass aquariums, living coral reefs, exotic freshwater & marine fish, and professional aquarium maintenance.",
    url: 'https://gabrielsaquarium.com',
    telephone: '+233241234567',
    priceRange: 'GHS 85 - GHS 15,000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kasoa Workshop & Showroom',
      addressLocality: 'Kasoa',
      addressRegion: 'Greater Accra / Central',
      addressCountry: 'GH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 5.5345,
      longitude: -0.4244,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      'https://instagram.com/gabrielsaquarium',
      'https://facebook.com/gabrielsaquarium',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
