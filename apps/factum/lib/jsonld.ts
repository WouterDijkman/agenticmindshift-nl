import { AM_URL, KVK, SITE_URL } from './site';

/**
 * Only facts that already appear on the site: legal name, KvK registration,
 * country, and the one affiliate link the footer carries. No addresses, no
 * phone numbers, no founding date — none of that is in the sources.
 */
export function organizationSchema(locale: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Factum Capital',
    // The KvK registration belongs to Agentic Mindshift Consultancy; Factum is
    // its trading name until incorporation. Publishing the number under the
    // trading name alone would assert a registration that doesn't exist.
    legalName: 'Agentic Mindshift Consultancy',
    url: `${SITE_URL}/${locale}`,
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
    sameAs: [AM_URL]
  };
}
