import type { FaqItem } from './faq';

import nl from '@/messages/nl.json';
import en from '@/messages/en.json';
import de from '@/messages/de.json';
import es from '@/messages/es.json';
import pt from '@/messages/pt.json';

const SITE_URL = 'https://www.agenticmindshift.nl';

/* These three lived in the report pipeline (lib/report/locale.ts) and the PDF
   route ladder (lib/pdf/offerRoutes.ts). Both were scorecard-only and are
   gone; structured data was their last consumer, so they moved here rather
   than leaving two modules alive for one caller. */
export type SiteLocale = 'nl' | 'en' | 'de' | 'es' | 'pt';

const SITE_LOCALES: SiteLocale[] = ['nl', 'en', 'de', 'es', 'pt'];

function normalizeLocale(value: unknown): SiteLocale {
  return typeof value === 'string' && (SITE_LOCALES as string[]).includes(value)
    ? (value as SiteLocale)
    : 'nl';
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const MESSAGES: Record<SiteLocale, any> = { nl, en, de, es, pt };

/**
 * The three route names, read from the same catalog /werkwijze renders, so
 * structured data can never drift from what the visitor is shown.
 */
function getRouteNames(locale: SiteLocale): [string, string, string] {
  const w = MESSAGES[locale]?.werkwijze ?? MESSAGES.nl.werkwijze;
  return [
    w.offering_1?.title ?? MESSAGES.nl.werkwijze.offering_1.title,
    w.offering_2?.title ?? MESSAGES.nl.werkwijze.offering_2.title,
    w.offering_3?.title ?? MESSAGES.nl.werkwijze.offering_3.title,
  ];
}

/**
 * Structured data is copy too. A German visitor's page used to ship Dutch
 * service descriptions to search engines and answer engines; every prose field
 * below therefore lives in a per-locale table.
 *
 * What is NOT in this table, deliberately:
 *  - Identifiers and facts (KvK, address, e-mail, founding date, alumniOf,
 *    sameAs, prices) — language-independent.
 *  - schema.org enum values such as contactType: 'customer service' — those are
 *    vocabulary, not prose, and must stay English.
 *  - The three service NAMES. Those come from getRouteNames(locale), i.e. the
 *    same message catalog the public pricing page renders, so structured data
 *    cannot drift away from what the visitor actually reads.
 */
interface JsonLdCopy {
  organizationDescription: string;
  organizationKnowsAbout: string[];
  personJobTitle: string;
  personDescription: string;
  personKnowsAbout: string[];
  advisoryServiceType: string;
  /** Takes the three localized route names so the routes are never retyped. */
  advisoryDescription: (routes: string[]) => string;
  /** Descriptions of the three route offers, in ladder order. */
  offerDescriptions: [string, string, string];
  breadcrumbHome: string;
}

const COPY: Record<SiteLocale, JsonLdCopy> = {
  nl: {
    organizationDescription:
      'AI-advies voor Europese private-equityfondsen en M&A-kantoren in de mid-market. Founder: Wouter Dijkman.',
    organizationKnowsAbout: [
      'Private equity',
      'M&A due diligence',
      'AI-implementatie',
      'Financial restructuring',
      'AI-adoptie en training',
      'AI-strategie',
    ],
    personJobTitle: 'Founder & AI-adviseur',
    personDescription:
      'Voormalig PE- en M&A-professional met ervaring bij Rabobank, ING en Alter Domus. Adviseert Europese mid-marketfondsen en M&A-kantoren over AI-strategie, AI-advies en implementatie.',
    personKnowsAbout: [
      'Private equity',
      'M&A transaction advisory',
      'AI-strategie voor dealteams',
      'AI-adoptie en training',
      'Financial restructuring in Europa',
      'IBR/WHOA',
    ],
    advisoryServiceType: 'AI-advies voor M&A en private equity',
    advisoryDescription: ([a, b, c]) =>
      `AI-advies voor Europese PE-fondsen en M&A-kantoren in de mid-market. Drie routes: ${a}, ${b} en ${c}.`,
    offerDescriptions: [
      'Gratis kennismakingsgesprek van 20 minuten — geen verplichtingen',
      'Per traject of doorlopend in retainer',
      'Scope en tarief worden na de intake vastgelegd',
    ],
    breadcrumbHome: 'Home',
  },
  en: {
    organizationDescription:
      'AI advisory for European private equity funds and M&A firms in the mid-market. Founder: Wouter Dijkman.',
    organizationKnowsAbout: [
      'Private equity',
      'M&A due diligence',
      'AI implementation',
      'Financial restructuring',
      'AI adoption and training',
      'AI strategy',
    ],
    personJobTitle: 'Founder & AI Advisor',
    personDescription:
      'Former PE and M&A professional with experience at Rabobank, ING and Alter Domus. Advises European mid-market funds and M&A firms on AI strategy, AI advisory and implementation.',
    personKnowsAbout: [
      'Private equity',
      'M&A transaction advisory',
      'AI strategy for deal teams',
      'AI adoption and training',
      'Financial restructuring in Europe',
      'IBR/WHOA',
    ],
    advisoryServiceType: 'AI advisory for M&A and private equity',
    advisoryDescription: ([a, b, c]) =>
      `AI advisory for European PE funds and M&A firms in the mid-market. Three routes: ${a}, ${b} and ${c}.`,
    offerDescriptions: [
      'Free 20-minute introductory call — no obligations',
      'Per project or ongoing on retainer',
      'Scope and rate are set after the intake',
    ],
    breadcrumbHome: 'Home',
  },
  de: {
    organizationDescription:
      'KI-Beratung für europäische Private-Equity-Fonds und M&A-Häuser im Mid-Market. Gründer: Wouter Dijkman.',
    organizationKnowsAbout: [
      'Private Equity',
      'M&A Due Diligence',
      'KI-Implementierung',
      'Financial Restructuring',
      'KI-Adoption und Training',
      'KI-Strategie',
    ],
    personJobTitle: 'Gründer & KI-Berater',
    personDescription:
      'Ehemaliger PE- und M&A-Professional mit Stationen bei Rabobank, ING und Alter Domus. Berät europäische Mid-Market-Fonds und M&A-Häuser zu KI-Strategie, KI-Beratung und Implementierung.',
    personKnowsAbout: [
      'Private Equity',
      'M&A Transaction Advisory',
      'KI-Strategie für Dealteams',
      'KI-Adoption und Training',
      'Financial Restructuring in Europa',
      'IBR/WHOA',
    ],
    advisoryServiceType: 'KI-Beratung für M&A und Private Equity',
    advisoryDescription: ([a, b, c]) =>
      `KI-Beratung für europäische PE-Fonds und M&A-Häuser im Mid-Market. Drei Wege: ${a}, ${b} und ${c}.`,
    offerDescriptions: [
      'Kostenloses Kennenlerngespräch von 20 Minuten — unverbindlich',
      'Pro Projekt oder laufend als Retainer',
      'Umfang und Honorar werden nach dem Intake festgelegt',
    ],
    breadcrumbHome: 'Startseite',
  },
  es: {
    organizationDescription:
      'Asesoramiento en IA para fondos de private equity y firmas de M&A europeos del mid-market. Fundador: Wouter Dijkman.',
    organizationKnowsAbout: [
      'Private equity',
      'Due diligence de M&A',
      'Implementación de IA',
      'Reestructuración financiera',
      'Adopción y formación en IA',
      'Estrategia de IA',
    ],
    personJobTitle: 'Fundador y asesor de IA',
    personDescription:
      'Antiguo profesional de PE y M&A con experiencia en Rabobank, ING y Alter Domus. Asesora a fondos y firmas de M&A europeos del mid-market en estrategia de IA, asesoramiento e implementación.',
    personKnowsAbout: [
      'Private equity',
      'Asesoramiento en transacciones de M&A',
      'Estrategia de IA para equipos de deal',
      'Adopción y formación en IA',
      'Reestructuración financiera en Europa',
      'IBR/WHOA',
    ],
    advisoryServiceType: 'Asesoramiento en IA para M&A y private equity',
    advisoryDescription: ([a, b, c]) =>
      `Asesoramiento en IA para fondos de PE y firmas de M&A europeos del mid-market. Tres rutas: ${a}, ${b} y ${c}.`,
    offerDescriptions: [
      'Llamada introductoria gratuita de 20 minutos, sin compromiso',
      'Por proyecto o de forma continua con retainer',
      'El alcance y la tarifa se fijan tras la reunión inicial',
    ],
    breadcrumbHome: 'Inicio',
  },
  pt: {
    organizationDescription:
      'Consultoria em IA para fundos de private equity e escritórios de M&A europeus do mid-market. Fundador: Wouter Dijkman.',
    organizationKnowsAbout: [
      'Private equity',
      'Due diligence de M&A',
      'Implementação de IA',
      'Reestruturação financeira',
      'Adoção e formação em IA',
      'Estratégia de IA',
    ],
    personJobTitle: 'Fundador e consultor de IA',
    personDescription:
      'Antigo profissional de PE e M&A com experiência no Rabobank, ING e Alter Domus. Aconselha fundos e escritórios de M&A europeus do mid-market em estratégia de IA, consultoria e implementação.',
    personKnowsAbout: [
      'Private equity',
      'Assessoria em transações de M&A',
      'Estratégia de IA para equipas de deal',
      'Adoção e formação em IA',
      'Reestruturação financeira na Europa',
      'IBR/WHOA',
    ],
    advisoryServiceType: 'Consultoria em IA para M&A e private equity',
    advisoryDescription: ([a, b, c]) =>
      `Consultoria em IA para fundos de PE e escritórios de M&A europeus do mid-market. Três percursos: ${a}, ${b} e ${c}.`,
    offerDescriptions: [
      'Chamada introdutória gratuita de 20 minutos — sem compromisso',
      'Por projeto ou de forma contínua em retainer',
      'O âmbito e o valor são definidos após a reunião inicial',
    ],
    breadcrumbHome: 'Início',
  },
};

function copy(locale: string): { loc: SiteLocale; c: JsonLdCopy } {
  const loc = normalizeLocale(locale);
  return { loc, c: COPY[loc] };
}

/**
 * Organization — @id enables cross-schema entity linking.
 * AI citation engines use @id to disambiguate entities across pages.
 */
export function getOrganizationLd(locale: string) {
  const { c } = copy(locale);
  return {
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
    /* No taxID: this used to publish the KvK number as `NL 99495945`, which
       reads as a Dutch VAT number and is not one — those are formatted
       NL……B01. The registration is stated once, correctly, as an identifier. */
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'KvK',
      value: '99495945',
    },
    description: c.organizationDescription,
    founder: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#wouter-dijkman`,
    },
    areaServed: [
      { '@type': 'Place', name: 'Europe' },
      { '@type': 'Country', name: 'Netherlands' },
      { '@type': 'Country', name: 'Belgium' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Spain' },
      { '@type': 'Country', name: 'Portugal' },
    ],
    knowsAbout: c.organizationKnowsAbout,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'wouter@agenticmindshift.nl',
      areaServed: 'Europe',
      availableLanguage: ['Dutch', 'English', 'German', 'Spanish', 'Portuguese'],
    },
    sameAs: ['https://www.linkedin.com/in/wwdijkman/'],
  };
}

/**
 * Person — linked to Organization via @id.
 * The /over route is not localized; only the locale segment changes.
 */
export function getPersonLd(locale: string) {
  const { loc, c } = copy(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#wouter-dijkman`,
    name: 'Wouter Dijkman',
    url: `${SITE_URL}/${loc}/over`,
    jobTitle: c.personJobTitle,
    worksFor: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
    },
    description: c.personDescription,
    knowsAbout: c.personKnowsAbout,
    alumniOf: [
      { '@type': 'Organization', name: 'Rabobank' },
      { '@type': 'Organization', name: 'ING' },
      { '@type': 'Organization', name: 'Alter Domus' },
      { '@type': 'EducationalOrganization', name: 'Universiteit Maastricht' },
      { '@type': 'EducationalOrganization', name: 'Nyenrode Business Universiteit' },
    ],
    sameAs: ['https://www.linkedin.com/in/wwdijkman/'],
  };
}

/* getServiceLd() described the Scorecard as a free Service. The questionnaire
   is gone, so the emitter went with it — a Service node for a route that
   404s is worse than no Service node at all. The three routes we do sell are
   already covered by getProfessionalServiceLd()'s offer catalogue. */

/**
 * ProfessionalService — for /werkwijze.
 * More authoritative schema type for B2B advisory in Google's YMYL category.
 *
 * Names and prices come from the route ladder, i.e. from the same message
 * catalog the pricing page renders.
 */
export function getProfessionalServiceLd(locale: string) {
  const { loc, c } = copy(locale);
  const names = getRouteNames(loc);
  /* Ladder order: sparring, advies, implementatie. The third rung used to be
     AI-driven DD at a 10.000 floor; that work moved to Factum Capital and is
     no longer sold here, so no price is asserted for implementation until
     there is a real one. */
  const lowPrices = [null, '4500', null] as const;

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service-ai-advisory`,
    /* This used to be `names[2]`, so the whole service node was named after
       whatever the third rung happened to be — for a long time "AI-driven Due
       Diligence & Portfolio", a route this site no longer sells. The node
       covers all three rungs, so it takes the practice name, not a rung's. */
    name: c.advisoryServiceType,
    provider: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
    },
    areaServed: [
      { '@type': 'Place', name: 'Europe' },
      { '@type': 'Country', name: 'Netherlands' },
      { '@type': 'Country', name: 'Belgium' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Spain' },
      { '@type': 'Country', name: 'Portugal' },
    ],
    serviceType: c.advisoryServiceType,
    description: c.advisoryDescription(names),
    offers: names.map((name, i) => ({
      '@type': 'Offer',
      name,
      priceCurrency: 'EUR',
      ...(lowPrices[i] === null ? { price: '0' } : { lowPrice: lowPrices[i] }),
      description: c.offerDescriptions[i],
    })),
  };
}

/**
 * WebSite — enables Google sitelinks search box signal.
 * No prose, so no locale variant.
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
  const { loc, c } = copy(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: c.breadcrumbHome,
        item: `${SITE_URL}/${loc}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pageName,
        item: `${SITE_URL}/${loc}${path}`,
      },
    ],
  };
}

/**
 * FAQPage — items arrive already localized from the message catalog.
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
