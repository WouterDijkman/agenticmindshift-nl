import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Button from '@/components/ui/Button';
import AnimatedHeroShell from '@/components/motion/AnimatedHeroShell';
import JsonLd from '@/components/JsonLd';
import { getBreadcrumbLd, getPersonLd, PERSON_ID } from '@/lib/jsonld';
import { getAlternates, OG_LOCALES } from '@/lib/hreflang';
import { sharedOpenGraph } from '@/lib/pageMetadata';
import { GUIDE_CHROME, getGuide, type Guide } from '@/lib/guides';
import { GUIDE_LOCALES, GUIDE_SLUGS, type GuideLocale, type GuideSlug } from '@/lib/guideRoutes';

/**
 * One problem page ("guide"): question as H1, the answer straight under it,
 * short sections whose H2s are the follow-up questions, then what Agentic
 * Mindshift does about it and the intake button.
 *
 * Built from the components the other pages already use (hero shell, eyebrow,
 * type scale, the dark CTA band), so the guides read as part of the site and
 * not as a blog bolted on.
 */

const INTAKE_URL = 'https://cal.com/wwdijkman/intake-call';
const SITE_URL = 'https://www.agenticmindshift.nl';

export async function guideMetadata(slug: GuideSlug, locale: GuideLocale): Promise<Metadata> {
  const g = getGuide(slug, locale);
  const tMeta = await getTranslations({ locale, namespace: 'meta' });
  const alternates = getAlternates(`/${slug}`, locale, GUIDE_LOCALES);
  return {
    title: g.metaTitle,
    description: g.metaDescription,
    alternates,
    openGraph: {
      ...sharedOpenGraph(locale, tMeta('site_name')),
      type: 'article',
      // Only the languages this page exists in.
      alternateLocale: GUIDE_LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
      url: alternates.canonical,
      publishedTime: g.datePublished,
      authors: [`${SITE_URL}/${locale}/over`],
    },
  };
}

/** `[label](/path)` → locale-aware links; everything else is plain text. */
function rich(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\((\/[^)]*)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <Link
        key={m.index}
        href={m[2]}
        style={{ color: 'var(--accent-cta-ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
      >
        {m[1]}
      </Link>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const bodyText = {
  fontSize: 'clamp(1.0625rem, 1.6vw, 1.1875rem)',
  lineHeight: 1.75,
  color: 'var(--text-secondary)',
  margin: 0,
} as const;

/** Stable anchor for a section heading, e.g. "Wie beoordeelt het rapport?" → "wie-beoordeelt-het-rapport". */
function anchor(heading: string): string {
  return heading
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function articleLd(slug: GuideSlug, locale: GuideLocale, g: Guide) {
  const url = `${SITE_URL}/${locale}/${slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: g.h1,
    description: g.metaDescription,
    inLanguage: locale,
    datePublished: g.datePublished,
    url,
    mainEntityOfPage: url,
    author: { '@id': PERSON_ID },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export default async function GuidePage({ slug, locale }: { slug: GuideSlug; locale: GuideLocale }) {
  const g = getGuide(slug, locale);
  const c = GUIDE_CHROME[locale];
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const others = GUIDE_SLUGS.filter((s) => s !== slug);

  return (
    <>
      <JsonLd data={articleLd(slug, locale, g)} />
      <JsonLd data={getPersonLd(locale)} />
      <JsonLd data={getBreadcrumbLd(`/${slug}`, g.shortName, locale)} />

      <AnimatedHeroShell bgChar={g.bgChar} eyebrow={g.eyebrow} heading={g.h1} subtext={g.answer} headingMaxWidth="820px" compact>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
          <Button
            href={INTAKE_URL}
            variant="primary"
            size="lg"
            external
            className={`plausible-event-name=Intake+CTA plausible-event-location=guide-${slug}-top`}
          >
            {tNav('cta')}
          </Button>
        </div>
      </AnimatedHeroShell>

      {/* The article, with its questions listed beside it on wide screens.
          The H2s are the follow-up questions a reader came with; seeing all
          of them at once is the fastest way to find the one that is theirs. */}
      <section className="has-sticky guide-article" style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(16px, 3vw, 40px) clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium guide-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 64px)' }}>
            {/* Below 1100px the side list is hidden, so phones get the same
                questions as a collapsed list under the intro (13 October 2026). */}
            <details className="guide-toc-mobile">
              <summary>{c.tocLabel}</summary>
              <ol>
                {g.sections.map((s) => (
                  <li key={s.heading}>
                    <a href={`#${anchor(s.heading)}`}>{s.heading}</a>
                  </li>
                ))}
              </ol>
            </details>
            {g.sections.map((s) => (
              <div key={s.heading} className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h2 id={anchor(s.heading)} className="type-h3" style={{ margin: 0, color: 'var(--text-primary)' }}>
                  {s.heading}
                </h2>
                {s.paragraphs?.map((p) => (
                  <p key={p} style={bodyText}>{rich(p)}</p>
                ))}
                {s.steps && (
                  <ol style={{ ...bodyText, paddingLeft: '1.4em', display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'decimal' }}>
                    {s.steps.map((b) => (
                      <li key={b} style={{ paddingLeft: '4px' }}>{rich(b)}</li>
                    ))}
                  </ol>
                )}
                {s.bullets && (
                  <ul style={{ ...bodyText, paddingLeft: '1.2em', display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'disc' }}>
                    {s.bullets.map((b) => (
                      <li key={b} style={{ paddingLeft: '4px' }}>{rich(b)}</li>
                    ))}
                  </ul>
                )}
                {s.after?.map((p) => (
                  <p key={p} style={bodyText}>{rich(p)}</p>
                ))}
              </div>
            ))}
          </div>
          <nav className="guide-toc" aria-label={c.tocLabel}>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>{c.tocLabel}</p>
            <ol>
              {g.sections.map((s) => (
                <li key={s.heading}>
                  <a href={`#${anchor(s.heading)}`}>{s.heading}</a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* How Agentic Mindshift helps — same dark band as the closing CTA on
          /werkwijze and /over. */}
      <section
        className="grain-overlay"
        data-surface="dark"
        style={{
          background: 'var(--surface-dark)',
          paddingBlock: 'clamp(64px, 9vw, 112px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container-medium" style={{ position: 'relative' }}>
          <div className="reveal" style={{ maxWidth: '760px' }}>
            <h2 className="type-h2" style={{ color: 'var(--text-primary)', marginBottom: '24px' }}>
              {g.helps.heading}
            </h2>
            <ul
              style={{
                ...bodyText,
                color: 'var(--text-muted)',
                paddingLeft: '1.2em',
                listStyle: 'disc',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginBottom: '24px',
              }}
            >
              {g.helps.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p style={{ ...bodyText, color: 'var(--text-muted)', marginBottom: '36px' }}>{rich(g.helps.note)}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <Button
                href={INTAKE_URL}
                variant="primary"
                size="lg"
                external
                className={`plausible-event-name=Intake+CTA plausible-event-location=guide-${slug}-final`}
              >
                {tNav('cta')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Read on: the two site pages every guide points at, and the other two guides. */}
      <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(48px, 6vw, 72px)' }}>
        <div className="container-medium">
          <p className="eyebrow" style={{ marginBottom: '20px' }}>{c.relatedEyebrow}</p>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
              gap: '12px 32px',
            }}
          >
            {[
              { href: '/werkwijze', label: c.werkwijzeLink },
              { href: '/over', label: c.overLink },
              ...others.map((s) => ({ href: `/${s}`, label: getGuide(s, locale).shortName })),
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  style={{ fontSize: '1rem', color: 'var(--text-primary)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  {l.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
