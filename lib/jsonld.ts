import type { FaqItem } from './faq';

const SITE_URL = 'https://www.agenticmindshift.nl';

/**
 * Organization — @id enables cross-schema entity linking.
 * AI citation engines use @id to disambiguate entities across pages.
 */
export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Agentic Mindshift',
  legalName: 'Agentic Mindshift Consultancy',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo.svg`,
    width: 1500,
    height: 487,
  },
  email: 'wouter@agenticmindshift.nl',
  foundingDate: '2025-10',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Marius Bauerstraat 235 A 5',
    postalCode: '1062 AL',
    addressLocality: 'Amsterdam',
    addressCountry: 'NL',
  },
  /** KvK Handelsregister (Dutch Chamber of Commerce) — used by Google as taxID */
  taxID: 'NL 99495945',
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'KvK',
    value: '99495945',
  },
  description:
    'AI-advies voor Nederlandse Private Equity-fondsen, M&A-kantoren en familiebedrijven in de mid-market. Founder: Wouter Dijkman.',
  founder: {
    '@type': 'Person',
    '@id': `${SITE_URL}/#wouter-dijkman`,
  },
  areaServed: [
    { '@type': 'Country', name: 'Netherlands' },
    { '@type': 'Country', name: 'Belgium' },
    { '@type': 'Country', name: 'Germany' },
  ],
  knowsAbout: [
    'Private Equity',
    'M&A due diligence',
    'AI-implementatie',
    'Financial Restructuring',
    'Portfolio monitoring',
    'AI-strategie',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'wouter@agenticmindshift.nl',
    areaServed: 'NL',
    availableLanguage: ['Dutch', 'English', 'German'],
  },
  sameAs: ['https://www.linkedin.com/in/wwdijkman/'],
};

/**
 * Person — linked to Organization via @id
 */
export const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#wouter-dijkman`,
  name: 'Wouter Dijkman',
  url: `${SITE_URL}/nl/over`,
  jobTitle: 'Founder & AI Advisor',
  worksFor: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
  },
  description:
    'Voormalig PE- en M&A-professional met ervaring bij Rabobank, ING en Alter Domus. Adviseert Nederlandse mid-market fondsen en M&A-kantoren op AI-strategie en AI-gedreven due diligence.',
  knowsAbout: [
    'Private Equity',
    'M&A transaction advisory',
    'AI due diligence',
    'Portfolio monitoring',
    'Financial restructuring Netherlands',
    'IBR/WHOA',
  ],
  alumniOf: [
    { '@type': 'Organization', name: 'Rabobank' },
    { '@type': 'Organization', name: 'ING' },
    { '@type': 'Organization', name: 'Alter Domus' },
    { '@type': 'EducationalOrganization', name: 'Universiteit Maastricht' },
    { '@type': 'EducationalOrganization', name: 'Nyenrode Business Universiteit' },
  ],
  sameAs: ['https://www.linkedin.com/in/wwdijkman/'],
};

/**
 * Service — homepage scorecard service (linked via @id)
 */
export const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/#service-scorecard`,
  name: 'AI Scorecard — 12-minuten assessment',
  provider: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
  },
  areaServed: { '@type': 'Country', name: 'Netherlands' },
  description:
    'Een gratis 12-minuten assessment op zes AI-dimensies voor Nederlandse PE-fondsen, M&A-kantoren en family offices.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
    description: 'Gratis — geen account nodig',
  },
};

/**
 * ProfessionalService — for /werkwijze page.
 * More authoritative schema type for B2B advisory in Google's YMYL category.
 */
export const professionalServiceLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#service-ai-advisory`,
  name: 'AI-gedreven Due Diligence & Portfolio',
  provider: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
  },
  areaServed: [
    { '@type': 'Country', name: 'Netherlands' },
    { '@type': 'Country', name: 'Belgium' },
    { '@type': 'Country', name: 'Germany' },
  ],
  serviceType: 'AI Advisory & Due Diligence',
  description:
    'AI-gedreven due diligence en portfolio-intelligence voor Nederlandse PE-fondsen en M&A-kantoren. Vier routes: gratis Sparring Sessie, AI-advies & Implementatie, Fractional AI Officer, en AI-gedreven Due Diligence & Portfolio via Factum Capital (29 modules).',
  offers: [
    {
      '@type': 'Offer',
      name: 'AI Sparring Sessie',
      price: '0',
      priceCurrency: 'EUR',
      description: 'Gratis 30-minuten kennismakingsgesprek — geen verplichtingen',
    },
    {
      '@type': 'Offer',
      name: 'AI-advies & Implementatie',
      priceCurrency: 'EUR',
      lowPrice: '4500',
      description: 'Per traject of doorlopend retainer',
    },
    {
      '@type': 'Offer',
      name: 'Fractional AI Officer',
      priceCurrency: 'EUR',
      lowPrice: '1099',
      description: '€1.099 per dag, minimaal 3 maanden, exclusief btw',
    },
    {
      '@type': 'Offer',
      name: 'AI-gedreven Due Diligence & Portfolio',
      priceCurrency: 'EUR',
      lowPrice: '10000',
      description: 'Vanaf €10.000 per deal via Factum Capital (29 modules)',
    },
  ],
};

/**
 * WebSite — enables Google sitelinks search box signal
 */
export const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Agentic Mindshift',
  publisher: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
  },
  inLanguage: ['nl', 'en', 'de', 'es', 'pt'],
};

/**
 * BreadcrumbList — add to all non-homepage pages.
 * Usage: <JsonLd data={getBreadcrumbLd('/werkwijze', 'Werkwijze', locale)} />
 */
export function getBreadcrumbLd(path: string, pageName: string, locale = 'nl') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pageName,
        item: `${SITE_URL}/${locale}${path}`,
      },
    ],
  };
}

/**
 * FAQPage — used on homepage and inner pages
 */
export const getFaqLd = (items: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: typeof item.answer === 'string' ? item.answer : String(item.answer),
    },
  })),
});
