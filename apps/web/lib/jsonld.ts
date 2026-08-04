import type { FaqItem } from './faq';
import { normalizeReportLocale, type ReportLocale } from './report/locale';
import { getRouteLadder } from './pdf/offerRoutes';

const SITE_URL = 'https://www.agenticmindshift.nl';

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
 *  - The four service NAMES. Those come from getRouteLadder(locale), i.e. the
 *    same message catalog the public pricing page renders, so structured data
 *    cannot drift away from what the visitor actually reads.
 */
interface JsonLdCopy {
  organizationDescription: string;
  organizationKnowsAbout: string[];
  personJobTitle: string;
  personDescription: string;
  personKnowsAbout: string[];
  scorecardName: string;
  scorecardDescription: string;
  scorecardOffer: string;
  advisoryServiceType: string;
  /** Takes the four localized route names so the routes are never retyped. */
  advisoryDescription: (routes: string[]) => string;
  /** Descriptions of the four route offers, in ladder order. */
  offerDescriptions: [string, string, string, string];
  breadcrumbHome: string;
}

const COPY: Record<ReportLocale, JsonLdCopy> = {
  nl: {
    organizationDescription:
      'AI-advies voor Europese private-equityfondsen, M&A-kantoren en familiebedrijven in de mid-market. Founder: Wouter Dijkman.',
    organizationKnowsAbout: [
      'Private equity',
      'M&A due diligence',
      'AI-implementatie',
      'Financial restructuring',
      'Portfolio monitoring',
      'AI-strategie',
    ],
    personJobTitle: 'Founder & AI-adviseur',
    personDescription:
      'Voormalig PE- en M&A-professional met ervaring bij Rabobank, ING en Alter Domus. Adviseert Europese mid-marketfondsen en M&A-kantoren over AI-strategie en AI-gedreven due diligence.',
    personKnowsAbout: [
      'Private equity',
      'M&A transaction advisory',
      'AI-gedreven due diligence',
      'Portfolio monitoring',
      'Financial restructuring in Europa',
      'IBR/WHOA',
    ],
    scorecardName: 'AI Scorecard — assessment van twaalf minuten',
    scorecardDescription:
      'Een gratis assessment van twaalf minuten op zes AI-dimensies, voor Europese PE-fondsen, M&A-kantoren en family offices.',
    scorecardOffer: 'Gratis — geen account nodig',
    advisoryServiceType: 'AI-gedreven due diligence en portfolio-intelligence',
    advisoryDescription: ([a, b, c, d]) =>
      `AI-gedreven due diligence en portfolio-intelligence voor Europese PE-fondsen en M&A-kantoren. Vier routes: ${a}, ${b}, ${c} en ${d} via Factum Capital (31 modules).`,
    offerDescriptions: [
      'Gratis kennismakingsgesprek van 20 minuten — geen verplichtingen',
      'Per traject of doorlopend in retainer',
      '€1.099 per dag, minimaal 3 maanden, exclusief btw',
      'Vanaf €10.000 per deal via Factum Capital (31 modules)',
    ],
    breadcrumbHome: 'Home',
  },
  en: {
    organizationDescription:
      'AI advisory for European private equity funds, M&A firms and family businesses in the mid-market. Founder: Wouter Dijkman.',
    organizationKnowsAbout: [
      'Private equity',
      'M&A due diligence',
      'AI implementation',
      'Financial restructuring',
      'Portfolio monitoring',
      'AI strategy',
    ],
    personJobTitle: 'Founder & AI Advisor',
    personDescription:
      'Former PE and M&A professional with experience at Rabobank, ING and Alter Domus. Advises European mid-market funds and M&A firms on AI strategy and AI-driven due diligence.',
    personKnowsAbout: [
      'Private equity',
      'M&A transaction advisory',
      'AI-driven due diligence',
      'Portfolio monitoring',
      'Financial restructuring in Europe',
      'IBR/WHOA',
    ],
    scorecardName: 'AI Scorecard — twelve-minute assessment',
    scorecardDescription:
      'A free twelve-minute assessment across six AI dimensions, for European PE funds, M&A firms and family offices.',
    scorecardOffer: 'Free — no account required',
    advisoryServiceType: 'AI-driven due diligence and portfolio intelligence',
    advisoryDescription: ([a, b, c, d]) =>
      `AI-driven due diligence and portfolio intelligence for European PE funds and M&A firms. Four routes: ${a}, ${b}, ${c} and ${d} via Factum Capital (31 modules).`,
    offerDescriptions: [
      'Free 20-minute introductory call — no obligations',
      'Per project or ongoing on retainer',
      '€1,099 per day, minimum three months, excluding VAT',
      'From €10,000 per deal via Factum Capital (31 modules)',
    ],
    breadcrumbHome: 'Home',
  },
  de: {
    organizationDescription:
      'KI-Beratung für europäische Private-Equity-Fonds, M&A-Häuser und Familienunternehmen im Mid-Market. Gründer: Wouter Dijkman.',
    organizationKnowsAbout: [
      'Private Equity',
      'M&A Due Diligence',
      'KI-Implementierung',
      'Financial Restructuring',
      'Portfolio-Monitoring',
      'KI-Strategie',
    ],
    personJobTitle: 'Gründer & KI-Berater',
    personDescription:
      'Ehemaliger PE- und M&A-Professional mit Stationen bei Rabobank, ING und Alter Domus. Berät europäische Mid-Market-Fonds und M&A-Häuser zu KI-Strategie und KI-gestützter Due Diligence.',
    personKnowsAbout: [
      'Private Equity',
      'M&A Transaction Advisory',
      'KI-gestützte Due Diligence',
      'Portfolio-Monitoring',
      'Financial Restructuring in Europa',
      'IBR/WHOA',
    ],
    scorecardName: 'AI Scorecard — Assessment in zwölf Minuten',
    scorecardDescription:
      'Ein kostenloses Assessment in zwölf Minuten über sechs KI-Dimensionen, für europäische PE-Fonds, M&A-Häuser und Family Offices.',
    scorecardOffer: 'Kostenlos — kein Konto erforderlich',
    advisoryServiceType: 'KI-gestützte Due Diligence und Portfolio-Intelligence',
    advisoryDescription: ([a, b, c, d]) =>
      `KI-gestützte Due Diligence und Portfolio-Intelligence für europäische PE-Fonds und M&A-Häuser. Vier Wege: ${a}, ${b}, ${c} und ${d} über Factum Capital (31 Module).`,
    offerDescriptions: [
      'Kostenloses Kennenlerngespräch von 20 Minuten — unverbindlich',
      'Pro Projekt oder laufend als Retainer',
      '1.099 € pro Tag, mindestens drei Monate, zzgl. MwSt.',
      'Ab 10.000 € pro Deal über Factum Capital (31 Module)',
    ],
    breadcrumbHome: 'Startseite',
  },
  es: {
    organizationDescription:
      'Asesoramiento en IA para fondos de private equity, firmas de M&A y empresas familiares europeas del mid-market. Fundador: Wouter Dijkman.',
    organizationKnowsAbout: [
      'Private equity',
      'Due diligence de M&A',
      'Implementación de IA',
      'Reestructuración financiera',
      'Monitorización de cartera',
      'Estrategia de IA',
    ],
    personJobTitle: 'Fundador y asesor de IA',
    personDescription:
      'Antiguo profesional de PE y M&A con experiencia en Rabobank, ING y Alter Domus. Asesora a fondos y firmas de M&A europeos del mid-market en estrategia de IA y due diligence impulsada por IA.',
    personKnowsAbout: [
      'Private equity',
      'Asesoramiento en transacciones de M&A',
      'Due diligence con IA',
      'Monitorización de cartera',
      'Reestructuración financiera en Europa',
      'IBR/WHOA',
    ],
    scorecardName: 'AI Scorecard — evaluación de doce minutos',
    scorecardDescription:
      'Una evaluación gratuita de doce minutos sobre seis dimensiones de IA, para fondos de PE, firmas de M&A y family offices europeos.',
    scorecardOffer: 'Gratuito: sin necesidad de cuenta',
    advisoryServiceType: 'Due diligence e inteligencia de cartera con IA',
    advisoryDescription: ([a, b, c, d]) =>
      `Due diligence e inteligencia de cartera con IA para fondos de PE y firmas de M&A europeos. Cuatro rutas: ${a}, ${b}, ${c} y ${d} a través de Factum Capital (31 módulos).`,
    offerDescriptions: [
      'Llamada introductoria gratuita de 20 minutos, sin compromiso',
      'Por proyecto o de forma continua con retainer',
      '1.099 € por día, mínimo tres meses, IVA no incluido',
      'Desde 10.000 € por operación a través de Factum Capital (31 módulos)',
    ],
    breadcrumbHome: 'Inicio',
  },
  pt: {
    organizationDescription:
      'Consultoria em IA para fundos de private equity, escritórios de M&A e empresas familiares europeias do mid-market. Fundador: Wouter Dijkman.',
    organizationKnowsAbout: [
      'Private equity',
      'Due diligence de M&A',
      'Implementação de IA',
      'Reestruturação financeira',
      'Monitorização de carteira',
      'Estratégia de IA',
    ],
    personJobTitle: 'Fundador e consultor de IA',
    personDescription:
      'Antigo profissional de PE e M&A com experiência no Rabobank, ING e Alter Domus. Aconselha fundos e escritórios de M&A europeus do mid-market em estratégia de IA e due diligence assistida por IA.',
    personKnowsAbout: [
      'Private equity',
      'Assessoria em transações de M&A',
      'Due diligence com IA',
      'Monitorização de carteira',
      'Reestruturação financeira na Europa',
      'IBR/WHOA',
    ],
    scorecardName: 'AI Scorecard — avaliação de doze minutos',
    scorecardDescription:
      'Uma avaliação gratuita de doze minutos sobre seis dimensões de IA, para fundos de PE, escritórios de M&A e family offices europeus.',
    scorecardOffer: 'Gratuito — sem necessidade de conta',
    advisoryServiceType: 'Due diligence e inteligência de carteira com IA',
    advisoryDescription: ([a, b, c, d]) =>
      `Due diligence e inteligência de carteira com IA para fundos de PE e escritórios de M&A europeus. Quatro percursos: ${a}, ${b}, ${c} e ${d} através da Factum Capital (31 módulos).`,
    offerDescriptions: [
      'Chamada introdutória gratuita de 20 minutos — sem compromisso',
      'Por projeto ou de forma contínua em retainer',
      '1.099 € por dia, mínimo de três meses, IVA não incluído',
      'A partir de 10.000 € por transação através da Factum Capital (31 módulos)',
    ],
    breadcrumbHome: 'Início',
  },
};

function copy(locale: string): { loc: ReportLocale; c: JsonLdCopy } {
  const loc = normalizeReportLocale(locale);
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
    /** KvK Handelsregister (Dutch Chamber of Commerce) — used by Google as taxID */
    taxID: 'NL 99495945',
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

/**
 * Service — the scorecard, linked to the Organization via @id
 */
export function getServiceLd(locale: string) {
  const { c } = copy(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/#service-scorecard`,
    name: c.scorecardName,
    provider: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
    },
    areaServed: { '@type': 'Place', name: 'Europe' },
    description: c.scorecardDescription,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      description: c.scorecardOffer,
    },
  };
}

/**
 * ProfessionalService — for /werkwijze.
 * More authoritative schema type for B2B advisory in Google's YMYL category.
 *
 * Names and prices come from the route ladder, i.e. from the same message
 * catalog the pricing page renders.
 */
export function getProfessionalServiceLd(locale: string) {
  const { loc, c } = copy(locale);
  const ladder = getRouteLadder(loc);
  const names = ladder.map((r) => r.name);
  /** Ladder order: sparring, advies, fractional, dd. */
  const lowPrices = [null, '4500', '1099', '10000'] as const;

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service-ai-advisory`,
    name: names[3],
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
