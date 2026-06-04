import type { FaqItem } from './faq';

const SITE_URL = 'https://www.agenticmindshift.nl';

export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Agentic Mindshift',
  url: SITE_URL,
  email: 'wouter@agenticmindshift.nl',
  foundingDate: '2025-10',
  founder: { '@type': 'Person', name: 'Wouter Dijkman' },
  areaServed: 'NL',
  knowsAbout: [
    'Private Equity',
    'M&A',
    'AI',
    'Portefeuille-inzicht',
    'Financial Restructuring',
  ],
  sameAs: ['https://www.linkedin.com/in/wwdijkman/'],
};

export const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Wouter Dijkman',
  jobTitle: 'Founder Agentic Mindshift',
  worksFor: { '@type': 'Organization', name: 'Agentic Mindshift' },
  alumniOf: [
    { '@type': 'Organization', name: 'Rabobank' },
    { '@type': 'Organization', name: 'ING' },
    { '@type': 'Organization', name: 'Alter Domus' },
    { '@type': 'EducationalOrganization', name: 'Universiteit Maastricht' },
    { '@type': 'EducationalOrganization', name: 'Nyenrode Business Universiteit' },
  ],
  sameAs: ['https://www.linkedin.com/in/wwdijkman/'],
};

export const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Scorecard',
  provider: { '@type': 'Organization', name: 'Agentic Mindshift' },
  areaServed: 'NL',
  description:
    "Een 12-minuten assessment op zes dimensies voor Nederlandse PE-fondsen, M&A-kantoren en ondernemers in de mid-market.",
};

export const getFaqLd = (items: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});
