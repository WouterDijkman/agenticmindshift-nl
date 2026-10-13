import { DISCIPLINE_COUNT, KVK, SITE_URL } from './site';

/**
 * Structured data, emitted once per page as a linked `@graph`.
 *
 * This file used to hold a single `Organization` block and nothing else. That
 * is not a ranking problem — Google is explicit that structured data is not
 * required for generative AI search and that there is no schema which makes you
 * eligible for it, and there is no rich result for an advisory service anyway.
 * It is an *entity* problem, which is a different and more basic thing: as of
 * this writing a search for the company name returns Wouter's LinkedIn profile
 * and neither of our two websites. The search engine has not worked out that
 * Factum Capital and two named people are one organisation, and there is
 * nothing on the web telling it so.
 *
 * A `@graph` with internal `@id` references says it directly: the WebSite is
 * published by the Organization, the Organization was founded by two People,
 * and one of those People has a `sameAs` to the LinkedIn profile that already
 * ranks. That edge hangs the new entity off the only node the graph already
 * knows, through the founder, which is where it belongs.
 *
 * Deliberately absent: `FAQPage`. Google deprecated FAQ rich results in May
 * 2026 (last shown 7 May, docs pulled 15 June, Search Console support ending),
 * so marking up the Q/A pairs on this site would buy nothing. (No count here:
 * a number in a comment goes stale the first time a FAQ gains an item.)
 *
 * Still, as before: only facts that already appear on the site. No addresses
 * beyond the country, no phone number, no founding date, no employee count.
 */

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const WOUTER_ID = `${SITE_URL}/#wouter-dijkman`;
const DANIEL_ID = `${SITE_URL}/#daniel-dropuljic`;
const SERVICE_ID = `${SITE_URL}/#diligence-sprint`;

/**
 * The two founders, as the /team page already describes them.
 *
 * Only Wouter has a `sameAs`. Daniel's LinkedIn is not published anywhere on
 * either site, and guessing a profile URL would be asserting a fact we do not
 * have — a wrong one would point the graph at a stranger. If he wants the edge,
 * add the URL here and it will flow into every page.
 */
function people() {
  return [
    {
      '@type': 'Person',
      '@id': WOUTER_ID,
      name: 'Wouter Dijkman',
      jobTitle: 'Founder',
      worksFor: { '@id': ORG_ID },
      // Wouter's own profiles. The LinkedIn profile is a page about him, and
      // so is the /over page on agenticmindshift.nl (his consultancy), which
      // is what ties the two sites to one person without claiming the two
      // companies are the same entity.
      sameAs: [
        'https://www.linkedin.com/in/wwdijkman/',
        'https://www.agenticmindshift.nl/en/over'
      ]
    },
    {
      '@type': 'Person',
      '@id': DANIEL_ID,
      name: 'Daniel Dropuljic',
      jobTitle: 'Technical Lead',
      worksFor: { '@id': ORG_ID }
    }
  ];
}

function organization(description: string) {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Factum Capital',
    // "Factum" is how the product is named in copy, and the bare word is what
    // a search engine has to tell apart from Factum AG, Factum Global and the
    // rest of page one.
    alternateName: ['Factum'],
    // No `legalName`: Factum Capital is not yet a separate legal entity, and
    // publishing a legal name here would assert a registration that doesn't
    // exist. The bare KvK number below is the one fact that's actually true.
    url: SITE_URL,
    description,
    identifier: {
      '@type': 'PropertyValue',
      name: 'KvK',
      value: KVK
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NL'
    },
    founder: [{ '@id': WOUTER_ID }, { '@id': DANIEL_ID }],
    // No `sameAs`. It used to hold Wouter's personal LinkedIn, which says "this
    // organisation is the same thing as that person". It is not; the profile
    // now sits on his Person node. Add a Factum company page here once one
    // exists. Do not invent its URL.
    // What the organisation is *about*, in the terms a generative engine
    // assembles an answer from. Plain topic strings, not invented facts: each
    // one names a page section that already exists on the site.
    knowsAbout: [
      'AI due diligence for M&A and private equity',
      'Data room review',
      'Financial due diligence',
      'Commercial due diligence',
      'Legal due diligence',
      'Tax due diligence',
      'Sell-side data room readiness for brokers',
      'AI governance and data handling in due diligence'
    ],
    areaServed: { '@type': 'Place', name: 'Europe' }
  };
}

/**
 * The one thing that is sold, as a `Service` node the rest of the graph can
 * point at.
 *
 * No `areaServed` on this node, deliberately. Legal and tax analysis is tuned
 * to Dutch law (GTM/config/offers.md, "Jurisdictie"), so "Europe" would promise
 * EU-wide what is NL-bound for two of the disciplines. The description carries
 * the caveat instead; the Organization keeps `areaServed: Europe`, because the
 * company does serve European buyers with the jurisdiction-free disciplines. A generative engine answering "who does AI due diligence for
 * lower-mid private equity in Europe" needs a provider, a service type, an
 * area and a mechanism it can attribute; the Organization node alone gives it
 * a name and a country. Only facts already stated on the site: the name of the
 * engagement, what it covers, where analysis runs, and the guarantee with its
 * condition attached. No price, because the site states none.
 */
function service(locale: string) {
  return {
    '@type': 'Service',
    '@id': SERVICE_ID,
    name: 'Diligence Sprint',
    serviceType: 'AI-driven due diligence for M&A and private equity',
    provider: { '@id': ORG_ID },
    url: `${SITE_URL}/${locale}/diligence-sprint`,
    availableLanguage: ['en', 'nl'],
    description: `${DISCIPLINE_COUNT} disciplines run over the whole data room in dependency order. Every finding carries a verbatim excerpt, its source document and location, and a severity, and the client’s own reviewer signs off before any client export. By default, analysis runs on Google Vertex AI in the EU, with zero retention at the model provider. Legal and tax analysis is tuned to Dutch law. Findings Guarantee on pilot mandates: three material findings the client did not already have, or the engagement is free.`,
    termsOfService: `${SITE_URL}/${locale}/governance`
  };
}

function website(locale: string, name: string) {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE_URL,
    name,
    inLanguage: locale,
    publisher: { '@id': ORG_ID }
  };
}

/**
 * The site-wide half of the graph, emitted from the root layout so every page
 * carries it. `Organization`, `WebSite` and the two `Person` nodes never vary
 * by page, so there is nothing for a page to pass in but its language.
 */
export function siteSchema(locale: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization(description),
      website(locale, 'Factum Capital'),
      service(locale),
      ...people()
    ]
  };
}

/**
 * Breadcrumbs for one interior page. The site is two levels deep at most, so
 * the trail is always home → page, and the homepage has none.
 *
 * `BreadcrumbList` is one of the handful of types that still produces a rich
 * result after the 2025–26 cull, and it is the cheapest way to stop Search
 * printing a bare URL under the title on interior pages. Emitted per page
 * rather than from the layout, because a server layout is not told which route
 * it is wrapping.
 */
export function breadcrumbSchema(locale: string, path: string, name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/${locale}${path}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Factum Capital',
        item: `${SITE_URL}/${locale}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name,
        item: `${SITE_URL}/${locale}${path}`
      }
    ]
  };
}
