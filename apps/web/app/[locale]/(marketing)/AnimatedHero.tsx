'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import SketchCrosshair from '@/components/icons/SketchCrosshair';

const ease = [0.22, 1, 0.36, 1] as const;

const ROUTES = [1, 2, 3] as const;

/**
 * Split hero: what this firm is on the left, what you can buy on the right.
 *
 * The right column used to hold the Scorecard report card, on the principle
 * that the most valuable thing to put beside a headline is a picture of the
 * deliverable. The principle survives; the Scorecard does not. It was a free
 * twelve-minute questionnaire that had grown into the site's entire
 * proposition — four of the homepage CTAs pointed at it — while the three
 * things the firm actually sells sat on another page. A partner landing here
 * met a quiz and had to infer the business behind it.
 *
 * So the deliverable beside the headline is now the offer itself: three
 * routes, each with its price anchor. It answers "what is this and what does
 * it cost" inside the first screen, which is the whole job of a first screen
 * for a consultancy that does not have a product to photograph.
 */
export default function AnimatedHero() {
  const locale = useLocale();
  const t = useTranslations('homepage.hero');
  const s = useTranslations('homepage.services');

  // The trust line is authored as "Eerste gesprek vrijblijvend · 20 minuten · …"
  // in every locale; split on the middot so it can be set as a spec strip.
  const facts = t('trust').split('·').map((x) => x.trim()).filter(Boolean);

  return (
    <section
      className="hero-home grain-overlay"
      style={{
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="hero-home-content container-medium"
        style={{
          /* Bottom pad exceeds top so the optical centre sits above the
             geometric one, leaving room for the scroll cue. */
          paddingTop: 'clamp(64px, 7vh, 88px)',
          paddingBottom: 'clamp(88px, 12vh, 132px)',
        }}
      >
        <div className="hero-home-split">
          <div>
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px' }}>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                style={{
                  width: '32px',
                  height: '1.5px',
                  background: 'var(--accent-cta)',
                  flexShrink: 0,
                  transformOrigin: 'left center',
                }}
              />
              <motion.p
                className="eyebrow"
                style={{ margin: 0 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.38, ease }}
              >
                {t('eyebrow')}
              </motion.p>
            </div>

            {/* H1 — single fade-up (per-word stagger removed: caused glued-words
                on this Next 16 / React 19 / framer 12 combo) */}
            <motion.h1
              className="type-display"
              style={{
                /* Height gets a vote as well as width: on a first screen the
                   short viewport is the binding constraint, not the wide one. */
                fontSize: 'clamp(34px, min(4.05vw, 7.4vh), 60px)',
                marginBottom: '20px',
                color: 'var(--text-primary)',
                maxWidth: '15ch',
              }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.5, ease }}
            >
              {t('heading')}
            </motion.h1>

            {/* Subkop — held to a short measure under the wide headline */}
            <motion.p
              style={{
                fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)',
                fontWeight: 400,
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                maxWidth: '58ch',
                marginBottom: '34px',
                letterSpacing: '-0.005em',
              }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.95, ease }}
            >
              {t('subtext')}
            </motion.p>

            {/* CTA */}
            <motion.div
              style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.15, ease }}
            >
              <Button
                href="https://cal.com/wwdijkman/intake-call"
                variant="primary"
                size="lg"
                external
                className="plausible-event-name=Intake+CTA plausible-event-location=home-hero"
              >
                {t('cta_primary')}
              </Button>
              <a
                href={`/${locale}/werkwijze`}
                style={{
                  fontSize: '1.0625rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  paddingBlock: '8px',
                  paddingInline: '8px',
                }}
              >
                {t('cta_secondary')} <span style={{ color: 'var(--accent-cta-ink)' }}>→</span>
              </a>
            </motion.div>

            {/* Spec strip — rule-anchored row of the same facts as the trust line. */}
            <motion.ul
              className="hero-specs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.35, ease }}
            >
              {facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </motion.ul>
          </div>

          {/* The offer, beside the claim rather than four screens under it. */}
          <motion.div
            className="hero-home-artefact"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease }}
          >
            <div className="hero-routes">
              <p className="hero-routes-label">{t('routes_label')}</p>
              <ul className="hero-routes-list">
                {ROUTES.map((n) => (
                  <li key={n}>
                    <a href={`/${locale}/werkwijze`} className="hero-route">
                      <span className="hero-route-n" aria-hidden="true">
                        {String(n).padStart(2, '0')}
                      </span>
                      <span className="hero-route-text">
                        <span className="hero-route-title">{s(`title_${n}`)}</span>
                        <span className="hero-route-note">{s(`note_${n}`)}</span>
                      </span>
                      <span className="hero-route-price">{s(`price_${n}`)}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="hero-routes-foot">{s('foot')}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.65, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }}
        className="scroll-indicator"
      >
        <SketchCrosshair size={34} color="var(--text-muted)" opacity={0.35} strokeWidth={1} />
      </motion.div>
    </section>
  );
}
