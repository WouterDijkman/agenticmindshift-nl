'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

const ease = [0.22, 1, 0.36, 1] as const;

export default function HomepageBioSection() {
  return (
    <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(80px, 11vw, 136px)' }}>
      <div className="container-medium">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(56px, 7vw, 104px)',
            alignItems: 'start',
          }}
        >
          {/* Links: pullquote */}
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom: '28px' }}>De adviseur</p>
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
                  fontSize: 'clamp(1.5rem, 3vw, 2.375rem)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  lineHeight: 1.35,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.015em',
                  margin: 0,
                }}
              >
                &ldquo;Ik ken het gevoel: alles goed gedaan — en toch de vraag of u het volgende probleem ziet v&oacute;&oacute;rdat het in de jaarcijfers staat. Dat gevoel is geen paranoia. Het is een informatieprobleem dat oplosbaar is.&rdquo;
              </p>
            </blockquote>
          </div>

          {/* Rechts: bio */}
          <div className="reveal" style={{ transitionDelay: '100ms' }}>
            <p
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.625rem, 2.5vw, 2.125rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                marginBottom: '6px',
                lineHeight: 1.1,
              }}
            >
              Wouter Dijkman
            </p>
            <p
              style={{
                fontSize: '0.8125rem',
                color: 'var(--accent-cta)',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '28px',
              }}
            >
              Portfolio Intelligence Adviseur
            </p>
            <p
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                marginBottom: '28px',
              }}
            >
              Zes jaar deal-ervaring aan beide kanten van de transactietafel: acquisition
              finance op leveraged buy-outs en financial restructuring op portefeuilles in
              stress. Mid-market transacties van 1 tot 25 miljoen, Nederlandse context. Nu
              vertaal ik die praktijk naar meetbare portfolio-intelligence voor PE-partners
              die rendement willen borgen v&oacute;&oacute;rdat de jaarcijfers het bevestigen.
            </p>

            {/* Identity transformation — Van/Naar met animated border */}
            <motion.div
              initial={{ borderLeftColor: 'var(--border-medium)' }}
              whileInView={{ borderLeftColor: 'var(--accent-cta)' }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              viewport={{ once: true, amount: 0.8 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                padding: '16px 20px',
                background: 'var(--bg-secondary)',
                borderLeft: '2px solid var(--border-medium)',
                marginBottom: '28px',
              }}
            >
              {[
                { prefix: 'Van:', text: 'wachten op de jaarrapportage om variantie te verklaren' },
                { prefix: 'Naar:', text: 'rendementslekken zien voordat ze in de P&L landen', accent: true },
              ].map((row) => (
                <p key={row.prefix} style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  <span style={{ fontWeight: 700, color: row.accent ? 'var(--accent-cta)' : 'var(--text-muted)', marginRight: '8px', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>{row.prefix}</span>
                  {row.text}
                </p>
              ))}
            </motion.div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
              {['6 jaar deal-ervaring', 'Acquisition finance & LBO', 'Financial restructuring'].map((badge) => (
                <span
                  key={badge}
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '5px 12px',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-secondary)',
                    background: 'transparent',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
            <Button href="/over" variant="secondary" size="md">
              Lees meer over de adviseur →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
