import { AM_URL, KVK, SITE_URL } from './site';

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
 * Factum Capital, Agentic Mindshift Consultancy and two named people are one
 * organisation, and there is nothing on the web telling it so.
 *
 * A `@graph` with internal `@id` references says it directly: the WebSite is
 * published by the Organization, the Organization was founded by two People,
 * and one of those People has a `sameAs` to the LinkedIn profile that already
 * ranks. That last edge is the whole point — it hangs the new entity off the
 * only node the graph already knows.
 *
 * Deliberately absent: `FAQPage`. Google deprecated FAQ rich results in May
 * 2026 (last shown 7 May, docs pulled 15 June, Search Console support ending),
 * so marking up the nineteen Q/A pairs on this site would buy nothing.
 *
 * Still, as before: only facts that already appear on the site. No addresses
 * beyond the country, no phone number, no founding date, no employee count.
 */

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const WOUTER_ID = `${SITE_URL}/#wouter-dijkman`;
const DANIEL_ID = `${SITE_URL}/#daniel-dropuljic`;

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
      sameAs: ['https://www.linkedin.com/in/wwdijkman/']
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
    // The KvK registration belongs to Agentic Mindshift Consultancy; Factum is
    // its trading name until incorporation. Publishing the number under the
    // trading name alone would assert a registration that doesn't exist.
    legalName: 'Agentic Mindshift Consultancy',
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
    // The consultancy that trades under this name. agenticmindshift.nl asserts
    // the reverse edge in its own Organization block, so the claim is made from
    // both sides rather than only from the newer, weaker domain.
    sameAs: [AM_URL, 'https://www.linkedin.com/in/wwdijkman/']
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
