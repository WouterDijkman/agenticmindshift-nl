import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Button } from '@repo/ui/Button';
import { pageMetadata } from '@/lib/pageMetadata';
import { INTAKE_URL, KVK } from '@/lib/site';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { Section, SectionHeader } from '@/components/Section';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'contact', '/contact');
}

export default async function ContactPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('contact');
  const s = await getTranslations('shared');

  return (
    <>
      <PageHeader
        eyebrow={t('header.eyebrow')}
        title={t('header.title')}
        lead={t('header.lead')}
        cta={t('header.cta')}
        footnote={s('ctaProof')}
        visual={5}
      />

      {/* One channel, deliberately. A form with no one behind it is worse than no form. */}
      <Section width="medium">
        <div className="split-grid">
          <div>
            <SectionHeader
              eyebrow={t('call.eyebrow')}
              title={t('call.title')}
              lead={t('call.lead')}
            />
            <Reveal delay={60} style={{ marginTop: 32 }}>
              <Button href={INTAKE_URL} size="lg" magnetic={false} className="plausible-event-name=Intake+CTA plausible-event-location=contact">
                {t('call.button')}
              </Button>
              <p className="type-small" style={{ marginTop: 18, color: 'var(--text-quaternary)' }}>
                {t('call.note')}
              </p>
            </Reveal>

            {/* Before you send anything — folded in as a note rather than a standalone
                section, which used to be a 160-character block with no visual weight
                of its own sitting between two panel-heavy sections. */}
            <Reveal delay={90} style={{ marginTop: 28 }}>
              <div
                className="hairline-top"
                style={{ paddingTop: 20 }}
              >
                <span className="eyebrow eyebrow-accent" style={{ marginBottom: 10 }}>
                  {t('documents.eyebrow')}
                </span>
                <p className="type-h4" style={{ marginBottom: 6 }}>
                  {t('documents.title')}
                </p>
                <p className="type-small" style={{ color: 'var(--text-quaternary)', maxWidth: '52ch' }}>
                  {t('documents.lead')}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={90}>
            <div className="panel" style={{ padding: 'clamp(22px, 3vw, 32px)' }}>
              <span className="eyebrow" style={{ marginBottom: 16 }}>
                {t('agenda.label')}
              </span>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {(t.raw('agenda.items') as string[]).map((item, i) => (
                  <li
                    key={item}
                    className="type-body"
                    style={{
                      display: 'flex',
                      gap: 14,
                      paddingBlock: 13,
                      borderTop: i === 0 ? 'none' : '1px solid var(--hairline-faint)'
                    }}
                  >
                    <span className="mono" style={{ color: 'var(--wine-text)', paddingTop: 4 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Company details — only what is on the register. */}
      <Section width="medium">
        <SectionHeader eyebrow={t('details.eyebrow')} title={t('details.title')} />
        <Reveal delay={60} style={{ marginTop: 28 }}>
          <dl className="rule-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))' }}>
            <div>
              <dt className="eyebrow" style={{ marginBottom: 10 }}>
                {t('details.entityLabel')}
              </dt>
              <dd className="type-body" style={{ margin: 0 }}>
                {t('details.entityValue')}
              </dd>
            </div>
            <div>
              <dt className="eyebrow" style={{ marginBottom: 10 }}>
                {t('details.kvkLabel')}
              </dt>
              <dd className="type-body mono" style={{ margin: 0 }}>
                {KVK}
              </dd>
            </div>
            <div>
              <dt className="eyebrow" style={{ marginBottom: 10 }}>
                {t('details.languagesLabel')}
              </dt>
              <dd className="type-body" style={{ margin: 0 }}>
                {t('details.languagesValue')}
              </dd>
            </div>
          </dl>
        </Reveal>
      </Section>
    </>
  );
}
