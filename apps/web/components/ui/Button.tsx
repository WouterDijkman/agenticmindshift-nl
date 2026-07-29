'use client';

import { useLocale } from 'next-intl';
import BaseButton from '@repo/ui/Button';
import type { ComponentProps } from 'react';

type Props = ComponentProps<typeof BaseButton>;
type LinkProps = Extract<Props, { href: string }>;

/**
 * Locale-aware wrapper around the shared Button.
 *
 * The design-system Button renders a plain `next/link`, so an unprefixed href
 * like "/scorecard" leaves the locale for the proxy to guess. With no
 * NEXT_LOCALE cookie it falls back to the default and drops a German visitor
 * into the Dutch funnel. Prefixing here keeps every CTA in the reader's
 * language and avoids a redirect hop on the most important click.
 */
export default function Button(props: Props) {
  const locale = useLocale();
  const href = 'href' in props ? props.href : undefined;

  if (href && href.startsWith('/')) {
    const localized = href === '/' ? `/${locale}` : `/${locale}${href}`;
    return <BaseButton {...(props as LinkProps)} href={localized} />;
  }

  return <BaseButton {...props} />;
}
