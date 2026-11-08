import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import PageHeader from '@/components/PageHeader';
import { Section } from '@/components/Section';
import Reveal from '@/components/Reveal';
import CtaBand from '@/components/CtaBand';
import GuaranteePanel from '@/components/GuaranteePanel';
import Disclosures from '@/components/Disclosures';
import { ArrowRight } from '@/components/Icons';
import { breadcrumbSchema } from '@/lib/jsonld';
import { getAlternates } from '@/lib/hreflang';
import { OG_LOCALES, sharedOpenGraph } from '@/lib/pageMetadata';
import { DISCIPLINE_COUNT, SITE_URL } from '@/lib/site';
import { GUIDE_CHROME, getGuide, type Guide, type GuideTable } from '@/lib/guides';
import { GUIDE_LOCALES, GUIDE_SLUGS, type GuideLocale, type GuideSlug } from '@/lib/guideRoutes';

/**
 * One decision page ("guide"): the question as H1, the answer straight under
 * it, short sections whose headings are the follow-up questions, then where
 * Factum fits and the one primary action.
 *
 * Built from the components every other page uses (PageHeader, Section,
 * CtaBand, GuaranteePanel), so the guides read as part of the site and not as
 * a blog bolted on. The pattern is apps/web's GuidePage, which got the AM
 * guides indexed within a week (GSC, 19-10-2026).
 */

const BRAND = 'Factum Capital';

/** `{disciplines}` → the live count from lib/site.ts. */
function fill(text: string): string {
  return text.replaceAll('{disciplines}', String(DISCIPLINE_COUNT));
}

/** `[label](/path)` → locale-aware links; everything else is plain text. */
function rich(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\((\/[^)]*)\)/g;
  const filled = fill(text);
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(filled))) {
    if (m.index > last) out.push(filled.slice(last, m.index));
    out.push(
      <Link key={m.index} href={m[2]} style={{ color: 'var(--text-primary)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
        {m[1]}
      </Link>
    );
    last = m.index + m[0].length;
  }
  if (last < filled.length) out.push(filled.slice(last));
  return out;
}

/** Stable anchor for a section heading. */
function anchor(heading: string): string {
  return heading
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function guideMetadata(slug: GuideSlug, locale: GuideLocale): Metadata {
  const g = getGuide(slug, locale);
  const title = `${fill(g.metaTitle)} — ${BRAND}`;
  const description = fill(g.metaDescription);
  const alternates = getAlternates(`/${slug}`, locale, GUIDE_LOCALES);
  return {
    title: { absolute: title },
    description,
    alternates,
    openGraph: {
      ...sharedOpenGraph(locale, `/${slug}`),
      type: 'article',
      // Only the languages this page exists in.
      alternateLocale: GUIDE_LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
      title,
      description,
      url: alternates.canonical,
      publishedTime: g.datePublished
    }
  };
}

function articleSchema(slug: GuideSlug, locale: GuideLocale, g: Guide) {
  const url = `${SITE_URL}/${locale}/${slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: g.h1,
    description: fill(g.metaDescription),
    inLanguage: locale,
    datePublished: g.datePublished,
    url,
    mainEntityOfPage: url,
    author: { '@id': `${SITE_URL}/#wouter-dijkman` },
    publisher: { '@id': `${SITE_URL}/#organization` }
  };
}

/** `[label](/path)` → `label`, for text that is emitted as plain text. */
function plain(text: string): string {
  return fill(text).replace(/\[([^\]]+)\]\((\/[^)]*)\)/g, '$1');
}

/**
 * A two-column comparison in text. Uses the `.matrix` table of /platform so
 * it restacks the same way below 700px; `.matrix-text` swaps the marks for
 * words and left-aligns them.
 */
function TextTable({ table }: { table: GuideTable }) {
  return (
    <Reveal className="matrix-wrap">
      <table className="matrix matrix-text">
        <thead>
          <tr>
            <th scope="col" className="matrix-corner"><span className="sr-only">{table.corner}</span></th>
            {table.columns.map((column, i) => (
              <th key={column} scope="col" className={`matrix-head ${i === 1 ? 'matrix-head-ours' : ''}`}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className="matrix-row-label">{row.label}</th>
              {row.cells.map((cell, i) => (
                <td key={table.columns[i]} className={`matrix-cell ${i === 1 ? 'matrix-cell-ours' : ''}`}>
                  <span className="matrix-cell-col">{table.columns[i]}</span>
                  <span>{rich(cell)}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  );
}

const listStyle = {
  margin: 0,
  paddingLeft: '1.2em',
  display: 'flex',
  flexDirection: 'column',
  gap: 10
} as const;

export default async function GuidePage({ slug, locale }: { slug: GuideSlug; locale: GuideLocale }) {
  const g = getGuide(slug, locale);
  const c = GUIDE_CHROME[locale];
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tHome = await getTranslations({ locale, namespace: 'home' });
  const tShared = await getTranslations({ locale, namespace: 'shared' });
  const others = GUIDE_SLUGS.filter((s) => s !== slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(slug, locale, g)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(locale, `/${slug}`, g.shortName)) }}
      />

      <PageHeader title={g.h1} lead={fill(g.answer)} cta={tNav('cta')} visual={4} />

      <Section width="medium" weight="loud">
        <nav aria-label={c.tocLabel} className="panel panel-inset" style={{ padding: 'clamp(18px, 2.5vw, 26px)', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
          <span className="eyebrow" style={{ marginBottom: 12 }}>{c.tocLabel}</span>
          <ol className="type-body" style={{ ...listStyle, gap: 6 }}>
            {[g.table?.heading, ...g.sections.map((s) => s.heading), g.faq?.heading]
              .filter((h): h is string => Boolean(h))
              .map((h) => (
                <li key={h}>
                  <a href={`#${anchor(h)}`} className="nav-link" style={{ whiteSpace: 'normal' }}>{h}</a>
                </li>
              ))}
          </ol>
        </nav>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 5vw, 60px)' }}>
          {g.table && (
            <div>
              <h2 id={anchor(g.table.heading)} className="type-h3" style={{ scrollMarginTop: 96, marginBottom: 24 }}>
                {g.table.heading}
              </h2>
              <TextTable table={g.table} />
              {g.table.note && (
                <p className="type-small" style={{ marginTop: 16, color: 'var(--text-quaternary)' }}>{rich(g.table.note)}</p>
              )}
            </div>
          )}
          {g.sections.map((s) => (
            <Reveal key={s.heading} className="measure" style={{ maxWidth: '68ch' }}>
              <h2 id={anchor(s.heading)} className="type-h3" style={{ scrollMarginTop: 96, marginBottom: 16 }}>
                {s.heading}
              </h2>
              <div className="type-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {s.paragraphs?.map((p) => <p key={p} style={{ margin: 0 }}>{rich(p)}</p>)}
                {s.steps && (
                  <ol style={{ ...listStyle, listStyle: 'decimal' }}>
                    {s.steps.map((b) => <li key={b}>{rich(b)}</li>)}
                  </ol>
                )}
                {s.bullets && (
                  <ul style={{ ...listStyle, listStyle: 'disc' }}>
                    {s.bullets.map((b) => <li key={b}>{rich(b)}</li>)}
                  </ul>
                )}
                {s.after?.map((p) => <p key={p} style={{ margin: 0 }}>{rich(p)}</p>)}
              </div>
            </Reveal>
          ))}
          {g.faq && (
            <div>
              <h2 id={anchor(g.faq.heading)} className="type-h3" style={{ scrollMarginTop: 96, marginBottom: 16 }}>
                {g.faq.heading}
              </h2>
              <Disclosures items={g.faq.items.map(({ q, a }) => ({ q: plain(q), a: plain(a) }))} />
            </div>
          )}
        </div>
      </Section>

      <Section width="medium" tone="raised">
        <Reveal className="measure" style={{ maxWidth: '68ch' }}>
          <h2 className="type-h2">{g.helps.heading}</h2>
          <ul className="type-body" style={{ ...listStyle, listStyle: 'disc', marginTop: 24 }}>
            {g.helps.bullets.map((b) => <li key={b}>{rich(b)}</li>)}
          </ul>
          <p className="type-small" style={{ marginTop: 20, color: 'var(--text-quaternary)' }}>{rich(g.helps.note)}</p>
        </Reveal>

        <Reveal style={{ marginTop: 'clamp(36px, 4vw, 52px)' }}>
          <span className="eyebrow" style={{ marginBottom: 14 }}>{c.relatedLabel}</span>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: '12px 32px' }}>
            {others.map((s) => (
              <li key={s}>
                <Link href={`/${s}`} className="link-quiet">
                  {getGuide(s, locale).shortName}
                  <ArrowRight />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <CtaBand
        title={tHome('cta.title')}
        body={tHome('cta.body')}
        cta={tHome('cta.button')}
        aside={
          <GuaranteePanel
            label={tShared('guarantee.label')}
            claim={tShared('guarantee.claim')}
            note={tShared('guarantee.note')}
          />
        }
      />
    </>
  );
}
