import { Link } from '@/i18n/navigation';
import { GUIDE_CHROME, getGuide } from '@/lib/guides';
import { GUIDE_SLUGS, isGuideLocale } from '@/lib/guideRoutes';

/**
 * The three problem pages, as one clearly titled block. Placed on /werkwijze
 * and the homepage, and listed in the footer, so the pages are findable
 * without a header nav item.
 */
export default function GuideLinks({ locale, background = 'var(--bg-primary)' }: { locale: string; background?: string }) {
  if (!isGuideLocale(locale)) return null;
  const c = GUIDE_CHROME[locale];

  return (
    <section style={{ background, paddingBlock: 'clamp(56px, 7vw, 88px)' }}>
      <div className="container-medium">
        <div className="reveal" style={{ marginBottom: 'clamp(28px, 4vw, 40px)', maxWidth: '640px' }}>
          <p className="eyebrow" style={{ marginBottom: '16px' }}>{c.moreEyebrow}</p>
          <h2 className="type-h2" style={{ margin: 0 }}>{c.moreHeading}</h2>
        </div>
        <div
          className="divider-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '1px',
            background: 'var(--border-subtle)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {GUIDE_SLUGS.map((slug, i) => {
            const g = getGuide(slug, locale);
            return (
              <Link
                key={slug}
                href={`/${slug}`}
                className="reveal"
                style={{
                  background,
                  padding: '28px 26px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  color: 'var(--text-primary)',
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <span className="type-h3" style={{ fontSize: 'clamp(19px, 2vw, 23px)' }}>{g.h1}</span>
                <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{g.teaser}</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent-cta-ink)', marginTop: 'auto' }}>
                  {c.readMore} →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
