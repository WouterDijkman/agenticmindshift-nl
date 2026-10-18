/** Resolve known marketing URLs in one hop, including locale and final slash.
 * Unknown URLs must fall through to a real 404, never a homepage redirect.
 * Absolute alias targets receive the requested locale via {locale}.
 */
export function resolveMarketingUrl(
  pathname: string,
  locales: readonly string[],
  defaultLocale: string,
  pages: readonly string[],
  aliases: Readonly<Record<string, string>>
): { locale: string; target: string | null; known: boolean } {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const parts = clean.split('/').slice(1);
  const prefixed = locales.includes(parts[0]);
  const locale = prefixed ? parts.shift()! : defaultLocale;
  const path = '/' + parts.join('/');
  const alias = aliases[path];
  const known = pages.includes(path) || alias !== undefined;
  if (!known) return { locale, target: null, known: false };
  const target = alias?.startsWith('https://')
    ? alias.replace('{locale}', locale)
    : `/${locale}${(alias ?? path) === '/' ? '' : (alias ?? path)}`;
  return { locale, target: target === pathname ? null : target, known: true };
}
