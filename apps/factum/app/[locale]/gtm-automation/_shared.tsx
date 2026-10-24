import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { getAlternates } from '@/lib/hreflang';
import { SITE_URL } from '@/lib/site';
import { Section } from '@/components/Section';
import { automationCopy } from './_content';

type DocumentKind = 'home' | 'privacy' | 'terms';
const CONTACT = 'wouter.dijkman@agenticmindshift.nl';
const GOOGLE_POLICY = 'https://developers.google.com/terms/api-services-user-data-policy';
const GOOGLE_CONNECTIONS = 'https://myaccount.google.com/connections';
const documentPath = (kind: DocumentKind) => `/gtm-automation${kind === 'home' ? '' : `/${kind}`}`;

function validLocale(locale: string): Locale {
  if (!routing.locales.includes(locale as Locale)) notFound();
  return locale as Locale;
}

export function automationMetadata(locale: string, kind: DocumentKind): Metadata {
  const copy = automationCopy[validLocale(locale)][kind];
  const alternates = getAlternates(documentPath(kind), locale);
  return {
    title: { absolute: copy.title },
    description: copy.lead,
    alternates,
    robots: { index: false, follow: true },
    openGraph: { type: 'website', title: copy.title, description: copy.lead, url: alternates.canonical, images: [] },
  };
}

export function AutomationDocument({ locale, kind }: { locale: string; kind: DocumentKind }) {
  const language = validLocale(locale);
  setRequestLocale(language);
  const copy = automationCopy[language];
  const document = copy[kind];
  const links = [
    { kind: 'home' as const, label: copy.homeLabel },
    { kind: 'privacy' as const, label: copy.privacyLabel },
    { kind: 'terms' as const, label: copy.termsLabel },
  ];

  return (
    <>
      <header className="container-wide" style={{ paddingBlock: 'clamp(56px, 7vw, 100px) 40px' }}>
        <nav aria-label={copy.navigation} style={{ display: 'flex', flexWrap: 'wrap', columnGap: 28, rowGap: 14, marginBottom: 36 }}>
          {links.map((link) => (
            <a key={link.kind} className="link-quiet" href={`${SITE_URL}/${language}${documentPath(link.kind)}`} aria-current={kind === link.kind ? 'page' : undefined}>
              {link.label}
            </a>
          ))}
        </nav>
        <h1 className="type-display" style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)', maxWidth: '25ch' }}>{document.title}</h1>
        <p className="type-lead measure" style={{ marginTop: 24 }}>{document.lead}</p>
        <p className="type-small" style={{ marginTop: 24, color: 'var(--text-quaternary)' }}>{copy.updated}</p>
      </header>

      <Section width="medium" weight="tight">
        {document.sections.map((section, index) => (
          <section key={section.title} className={index === 0 ? undefined : 'hairline-top'} style={{ paddingBlock: index === 0 ? '0 32px' : '32px' }}>
            <h2 className="type-h3" style={{ marginBottom: 16 }}>{section.title}</h2>
            {section.body.map((paragraph) => <p key={paragraph} className="type-body measure" style={{ marginTop: 14 }}>{paragraph}</p>)}
          </section>
        ))}

        {kind === 'privacy' && (
          <div className="hairline-top" style={{ paddingBlock: 32 }}>
            <p className="type-body measure">{copy.limitedUse}</p>
            <p className="type-body measure" style={{ marginTop: 16 }}><a className="link-quiet" href={GOOGLE_POLICY}>{copy.policyLabel}</a></p>
            <p className="type-body measure" style={{ marginTop: 16 }}><a className="link-quiet" href={GOOGLE_CONNECTIONS}>{copy.revokeLabel}</a></p>
          </div>
        )}

        <section className="hairline-top" style={{ paddingTop: 32 }}>
          <h2 className="type-h3" style={{ marginBottom: 16 }}>{copy.contactLabel}</h2>
          <p className="type-body">Wouter Dijkman</p>
          <p className="type-body" style={{ marginTop: 12 }}><a className="link-quiet" style={{ overflowWrap: 'anywhere' }} href={`mailto:${CONTACT}`}>{CONTACT}</a></p>
        </section>
      </Section>
    </>
  );
}
