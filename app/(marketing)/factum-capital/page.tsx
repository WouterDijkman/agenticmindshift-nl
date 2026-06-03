import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import AnimatedHeroShell from '@/components/motion/AnimatedHeroShell';
import {
  SketchDueDiligence,
  SketchReport,
  SketchPortfolio,
  SketchWarning,
} from '@/components/icons/SketchIcons';
import EarlyAccessForm from './EarlyAccessForm';
import CountdownTimer from './CountdownTimer';
import FactumModulesGrid from './FactumModulesGrid';

type SketchIconComponent = ComponentType<{ size?: number; color?: string; opacity?: number; strokeWidth?: number }>;

export const metadata: Metadata = {
  title: 'Factum Capital — AI-platform achter de AI Due Diligence & Portfolio-dienstverlening',
  description:
    'Factum Capital is het AI-platform achter de AI Due Diligence & Portfolio-dienstverlening van Agentic Mindshift. Vier momenten: acquisitie, financiering, portfolio review en pre-IBR/WHOA. SaaS-toegang (lancering 1 juli 2026) of volledig uitbesteden via Agentic Mindshift.',
};

const MOMENTEN: {
  code: string;
  title: string;
  label: string;
  body: string;
  advisors: string;
  Icon: SketchIconComponent;
}[] = [
  {
    code: 'M1',
    title: 'Acquisitie',
    label: 'Buy-side deal-analyse',
    body: 'Van eerste beoordeling van het informatiememorandum tot closing: een uitgebreid analytisch fundament op alle relevante dimensies. Gecertificeerde adviseurs (RA/RB/advocaten) voor formele sign-off waar vereist.',
    advisors: 'RA · RB · Advocaten',
    Icon: SketchDueDiligence,
  },
  {
    code: 'M2',
    title: 'Financiering',
    label: 'Financieringsmemo & onderbouwing',
    body: 'Analytische onderbouwing voor bankgesprekken en investeerderspresentaties — ook voor kleinere financieringsaanvragen waarbij structuur het verschil maakt tussen toewijzing en afwijzing.',
    advisors: 'Financieel adviseurs · Accountants',
    Icon: SketchReport,
  },
  {
    code: 'M3',
    title: 'Portefeuille-doorlichting',
    label: 'Doorlopend inzicht',
    body: 'Periodieke doorlichting van uw bestaande deelnemingen op de zes dimensies. Vroegtijdige signalering van onderprestatie, AI-kwetsbaarheid en exit-obstakels — lang voor de jaarrapportage.',
    advisors: 'Portfolio management · Bestuurders',
    Icon: SketchPortfolio,
  },
  {
    code: 'M4',
    title: 'Pre-IBR / WHOA',
    label: 'Indicatief · Herstructurering',
    body: 'Bij eerste signalen van financiële stress: een indicatieve doorlichting die bepaalt of een IBR- of WHOA-traject aan de orde is — met directe koppeling naar gespecialiseerde restructuring consultants.',
    advisors: 'Restructuring consultants · Advocaten',
    Icon: SketchWarning,
  },
];

export default function FactumCapitalPage() {
  return (
    <>
      <AnimatedHeroShell
        bgChar="FC"
        bgCharSize="clamp(240px, 32vw, 480px)"
        eyebrow="Het platform achter onze AI Due Diligence-dienst"
        heading="Eén platform. Elke fase van uw deal- en portfoliopraktijk. Structureel."
        subtext="Vier momenten — acquisitie, financiering, portfolio review en pre-IBR/WHOA — op één gedeeld dossier. Vanaf 1 juli 2026 ook als SaaS voor uw eigen team."
        headingMaxWidth="900px"
      >
        {/* Launch stats strip */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0',
            border: '1px solid var(--border-medium)',
            overflow: 'hidden',
            width: 'fit-content',
          }}
        >
          {[
            { label: '23', sub: 'modules totaal' },
            { label: '4', sub: 'dienst-momenten' },
            { label: '1 juli', sub: 'livegang' },
          ].map((c, i) => (
            <div
              key={c.label}
              style={{
                padding: '10px 24px',
                borderLeft: i > 0 ? '1px solid var(--border-medium)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                }}
              >
                {c.label}
              </span>
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  lineHeight: 1,
                }}
              >
                {c.sub}
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '8px' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Lancering over
          </p>
          <CountdownTimer />
        </div>
      </AnimatedHeroShell>

      {/* PROBLEEM */}
      <section style={{ background: 'var(--accent-primary)', paddingBlock: 'clamp(48px, 6vw, 80px)' }}>
        <div className="container-medium">
          <div
            className="reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1px',
              background: 'rgba(247,242,235,0.06)',
            }}
          >
            {[
              { label: 'Elke situatie opnieuw', body: 'Elk moment begint bij nul. Geen gedeelde structuur, geen hergebruik van het vorige dossier.' },
              { label: 'Adviseurs te laat', body: 'Gecertificeerde adviseurs komen pas als het dossier al vol aannames zit. Dubbel werk, hogere kosten.' },
              { label: 'Stress te laat zichtbaar', body: 'IBR- of WHOA-signalen worden pas zichtbaar als de opties beperkt zijn.' },
            ].map((item, i) => (
              <div
                key={item.label}
                style={{
                  padding: 'clamp(28px, 4vw, 44px)',
                  borderLeft: i > 0 ? '1px solid rgba(247,242,235,0.06)' : 'none',
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--accent-cta)',
                    marginBottom: '8px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.label}
                </p>
                <p style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: '1.0625rem', color: 'rgba(247,242,235,0.65)', lineHeight: 1.65, margin: 0 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BESCHRIJVING */}
      <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'clamp(40px, 6vw, 80px)',
              alignItems: 'start',
            }}
          >
            <div className="reveal">
              <p className="eyebrow" style={{ marginBottom: '28px' }}>Het systeem</p>
              <blockquote
                style={{
                  margin: 0,
                  paddingLeft: '24px',
                  borderLeft: '3px solid var(--accent-cta)',
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    lineHeight: 1.4,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                    margin: 0,
                  }}
                >
                  &ldquo;Eén platform, vier momenten. Factum levert het analytisch fundament — Agentic Mindshift levert de dienst, met koppeling naar gecertificeerde adviseurs die formeel tekenen waar vereist.&rdquo;
                </p>
              </blockquote>
            </div>

            <div className="reveal" style={{ transitionDelay: '80ms' }}>
              <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", display: 'flex', flexDirection: 'column', gap: '20px', fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                <p>
                  Het <strong>platform</strong> &mdash; 23 modules van eerste IM-beoordeling tot
                  verkoopgereedheid &mdash; geeft uw team consistente structuur op elk moment.
                  Vanaf 1 juli 2026 beschikbaar als SaaS.
                </p>
                <p>
                  De <strong>dienstverlening</strong> via Agentic Mindshift levert het volledige
                  analytisch fundament en koppelt gecertificeerde adviseurs: RA/RB/advocaten,
                  financieel adviseurs, restructuring consultants. Eén gedeeld dossier &mdash;
                  minder dubbel werk, kortere doorlooptijd.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* VIER MOMENTEN */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium">
          <div className="reveal" style={{ marginBottom: '56px' }}>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>Vier momenten</p>
            <h2 className="type-h2" style={{ maxWidth: '640px' }}>
              Eén systeem. Elk moment in uw praktijk.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1px',
              background: 'var(--border-subtle)',
              border: '1px solid var(--border-subtle)',
              marginBottom: 'clamp(48px, 7vw, 80px)',
            }}
          >
            {MOMENTEN.map((m) => (
              <div
                key={m.code}
                className="reveal"
                style={{ background: 'var(--bg-primary)', padding: 'clamp(28px, 3.5vw, 44px)' }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '16px',
                    marginBottom: '20px',
                  }}
                >
                  <div style={{ color: 'var(--accent-cta)', opacity: 0.82, flexShrink: 0 }}>
                    <m.Icon size={44} strokeWidth={1.4} />
                  </div>
                  <p style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(28px, 4vw, 40px)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    lineHeight: 0.9,
                    color: 'var(--accent-cta)',
                    margin: 0,
                    opacity: 0.6,
                  }}>
                    {m.code}
                  </p>
                </div>
                <p style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '8px',
                }}>
                  {m.label}
                </p>
                <p style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '14px',
                  letterSpacing: '-0.01em',
                }}>
                  {m.title}
                </p>
                <p style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  marginBottom: '20px',
                }}>
                  {m.body}
                </p>
                <p style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--accent-cta)',
                  letterSpacing: '0.05em',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '14px',
                  lineHeight: 1.4,
                }}>
                  {m.advisors}
                </p>
              </div>
            ))}
          </div>

          {/* Platform vs Dienst */}
          <div className="reveal" style={{ marginBottom: '56px' }}>
            <p className="eyebrow" style={{ marginBottom: '24px' }}>Twee manieren om Factum in te zetten</p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1px',
                background: 'var(--border-subtle)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {([
                {
                  n: '01',
                  title: 'Het Platform',
                  label: 'SaaS — zelf in handen',
                  body: '23 modules die uw deal-team de structuur geven om alle vier momenten consistent uit te voeren. Van eerste IM-beoordeling tot verkoopgereedheid tot vroegtijdige herstructureringssignalering. Kennisopbouw die meegroeit.',
                  detail: 'Lancering 1 juli 2026 · Maandabonnement · Wachtlijst open',
                  link: null,
                },
                {
                  n: '02',
                  title: 'De Dienstverlening',
                  label: 'Via Agentic Mindshift — AI Due Diligence & Portfolio',
                  body: 'Agentic Mindshift voert het volledige traject voor u uit, met Factum als analytisch platform. Op elk moment koppelt Agentic Mindshift de juiste gecertificeerde professionals die op het gedeelde dossier verder bouwen en waar nodig formeel tekenen.',
                  detail: 'Vanaf €10.000 investering per deal · Of €6.500 – €8.500 / maand portefeuille-inzicht · Excl. btw',
                  link: { href: '/werkwijze', label: 'Bekijk werkwijze & investering →' },
                },
              ] as const).map((item) => (
                <div
                  key={item.n}
                  style={{ background: 'var(--bg-primary)', padding: 'clamp(36px, 4vw, 52px)' }}
                >
                  <p style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(44px, 6vw, 64px)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    lineHeight: 0.9,
                    color: 'var(--accent-cta)',
                    marginBottom: '24px',
                    opacity: 0.9,
                  }}>
                    {item.n}
                  </p>
                  <p style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '10px',
                  }}>
                    {item.label}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '16px',
                    letterSpacing: '-0.01em',
                  }}>
                    {item.title}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(1rem, 1.6vw, 1.125rem)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.75,
                    marginBottom: '24px',
                  }}>
                    {item.body}
                  </p>
                  <p style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'var(--accent-cta)',
                    letterSpacing: '0.03em',
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '16px',
                    marginBottom: item.link ? '14px' : 0,
                  }}>
                    {item.detail}
                  </p>
                  {item.link && (
                    <Link
                      href={item.link.href}
                      style={{
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        color: 'var(--accent-cta)',
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {item.link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hoe de dienst werkt */}
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom: '24px' }}>Hoe de dienstverlening werkt</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1px',
              background: 'var(--border-subtle)',
              border: '1px solid var(--border-subtle)',
            }}>
              {[
                {
                  step: '1',
                  title: 'Analytisch fundament',
                  body: 'Agentic Mindshift doorlicht de situatie systematisch op alle relevante dimensies, met Factum als platform — afhankelijk van het moment: acquisitie, financiering, portfolio of herstructurering.',
                },
                {
                  step: '2',
                  title: 'Juiste adviseur gekoppeld',
                  body: 'Agentic Mindshift koppelt de gecertificeerde professional die past bij het moment: RA/RB voor acquisitie-sign-off, financieel adviseur voor bankgesprekken, restructuring consultant voor pre-IBR/WHOA.',
                },
                {
                  step: '3',
                  title: 'Gedeeld dossier',
                  body: 'Alle betrokken partijen werken op één Factum-dossier. Minder dubbel werk, kortere doorlooptijd, kennisretentie na afronding.',
                },
              ].map((s) => (
                <div
                  key={s.step}
                  style={{
                    background: 'var(--bg-primary)',
                    padding: 'clamp(24px, 3vw, 36px)',
                  }}
                >
                  <p style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(36px, 5vw, 52px)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    lineHeight: 0.9,
                    color: 'var(--border-medium)',
                    marginBottom: '16px',
                    opacity: 0.6,
                  }}>
                    {s.step}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '10px',
                    letterSpacing: '-0.01em',
                  }}>
                    {s.title}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
            <p style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              marginTop: '10px',
              lineHeight: 1.5,
            }}>
              Noch Factum Capital noch Agentic Mindshift is een registeraccountant; geen van beide treedt op als formeel opdrachtnemer voor bank-proof due diligence of wettelijk verplichte rapportages. De gecertificeerde adviseurs en consultants met wie Agentic Mindshift samenwerkt zijn zelfstandige professionals met eigen beroepskwalificaties en aansprakelijkheid.
            </p>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      <FactumModulesGrid />

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* VOOR WIE */}
      <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(48px, 6vw, 80px)' }}>
        <div className="container-medium">
          <div className="reveal" style={{ marginBottom: '40px' }}>
            <p className="eyebrow" style={{ marginBottom: '12px' }}>Voor wie</p>
            <h2 className="type-h2" style={{ margin: 0 }}>Gebouwd voor de Nederlandse deal- en financieringspraktijk</h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1px',
              background: 'var(--border-subtle)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {[
              { label: 'Tier-2 PE-fondsen', body: 'Deals €5M–€50M. Structuur op acquisitie, portfolio review en exit.' },
              { label: 'Family offices', body: 'DD-kwaliteit en bankpresentaties zonder een groot intern team.' },
              { label: 'MKB-ondernemers', body: 'Financieringsaanvragen professioneel onderbouwd — ook bij kleinere bedragen.' },
              { label: "Buy-and-build ondernemers", body: 'De discipline van een professioneel deal-team, met adviseurs op afroep.' },
              { label: 'M&A-directors', body: 'Kennisretentie over meerdere deals — elk dossier bouwt voort op het vorige.' },
              { label: 'Financiers & herstructurering', body: 'Vroege signalering bij stress. Directe koppeling met restructuring consultants.' },
            ].map((item, i) => (
              <div
                key={item.label}
                className="reveal"
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '28px 24px',
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '10px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.label}
                </p>
                <p style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EARLY ACCESS FORM */}
      <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
        <div className="container-medium">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(40px, 6vw, 80px)',
              alignItems: 'start',
            }}
          >
            <div className="reveal">
              <p className="eyebrow" style={{ marginBottom: '20px' }}>Vroege toegang</p>
              <h2 className="type-h2" style={{ marginBottom: '20px' }}>
                Schrijf u in voor early access.
              </h2>
              <p style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '320px', marginBottom: '32px' }}>
                De wachtlijst is bewust beperkt. Vroege deelnemers krijgen directe input op de module-roadmap en gaan als eerste door onboarding. Geen vervolgmails buiten de Factum Capital-roadmap om.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Directe input op de module-roadmap',
                  'Voorrang op platform-onboarding per 1 juli 2026',
                  'Vroeg-toegangstarief bij lancering',
                  'Prioriteit voor pilot deal-analyse-opdrachten in het eerste kwartaal na lancering (juli–september 2026)',
                ].map((t) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--accent-cta)',
                        flexShrink: 0,
                        display: 'inline-block',
                        marginTop: '7px',
                      }}
                    />
                    <span style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal" style={{ transitionDelay: '80ms' }}>
              <EarlyAccessForm />
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />

      {/* SECONDARY CTA */}
      <section
        className="grain-overlay"
        style={{
          background: 'var(--accent-primary)',
          paddingBlock: 'clamp(56px, 7vw, 88px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container-medium reveal" style={{ textAlign: 'center', position: 'relative' }}>
          <p className="eyebrow" style={{ marginBottom: '20px', color: 'rgba(247,242,235,0.5)' }}>
            Begin hier
          </p>
          <h2
            className="type-h2"
            style={{ color: 'var(--text-inverse)', marginBottom: '16px', maxWidth: '520px', marginInline: 'auto' }}
          >
            Uw Scorecard-profiel bepaalt welk moment als eerste relevant is.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
              color: 'rgba(247,242,235,0.5)',
              marginBottom: '40px',
              maxWidth: '460px',
              marginInline: 'auto',
              lineHeight: 1.75,
            }}
          >
            Twaalf minuten. Zes dimensies. Een rapport dat laat zien waar u staat
            en wat als eerste aandacht verdient.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <Button href="/scorecard" variant="primary" size="lg">
              Start de Scorecard
            </Button>
            <Button href="/werkwijze" variant="secondary" size="lg">
              Werkwijze & investering
            </Button>
            <Button href="https://cal.com/wwdijkman/intake-call" variant="secondary" size="lg" external>
              Plan een kennismaking
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
