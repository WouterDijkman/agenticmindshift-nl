import { getLocale, getTranslations } from 'next-intl/server';
import { breadcrumbSchema } from '@/lib/jsonld';
import { NAV } from '@/lib/site';

/**
 * The breadcrumb trail for one interior page, as JSON-LD and nothing else.
 *
 * There is no visible breadcrumb in the design and this does not add one — the
 * site is two levels deep, and a visible trail on an eight-page site is
 * furniture pretending to be navigation. What it adds is the machine-readable
 * version, which is what stops Search printing
 * `factumcapital.eu › en › diligence-sprint` as a raw path under the title.
 *
 * The page's own name is looked up rather than passed in, so the crumb and the
 * header link cannot drift apart and no locale needs a second set of strings.
 * `NAV` covers five of the seven interior pages; `/contact` has a `nav` key but
 * sits in the header CTA rather than the list, and `/privacy` only exists in
 * the footer. Both are named explicitly below — a lookup that silently returned
 * the raw slug would publish "privacy" as a page title in five languages.
 */
export default async function Breadcrumb({ path }: { path: string }) {
  const locale = await getLocale();
  const nav = await getTranslations('nav');
  const footer = await getTranslations('footer');

  const navKey = NAV.find((item) => item.href === path)?.key;

  let name: string;
  if (navKey) {
    name = nav(navKey);
  } else if (path === '/contact') {
    name = nav('contact');
  } else if (path === '/privacy') {
    name = footer('privacy');
  } else {
    // An interior page nobody named. Better to emit nothing than to publish a
    // URL slug as a human-readable title.
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema(locale, path, name))
      }}
    />
  );
}
