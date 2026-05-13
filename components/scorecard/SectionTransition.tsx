import Link from 'next/link';
import Button from '@/components/ui/Button';

interface SectionTransitionProps {
  fromSection: number;
  toSection: number;
  toHref: string;
  fromHref?: string;
  title: string;
  description: string;
}

export default function SectionTransition({
  fromSection,
  toSection,
  toHref,
  fromHref,
  title,
  description,
}: SectionTransitionProps) {
  return (
    <div className="container-narrow py-12 text-center">
      <p
        className="text-xs uppercase tracking-widest mb-4"
        style={{ color: 'var(--accent-primary)', letterSpacing: '0.18em' }}
      >
        Sectie {fromSection} afgerond &mdash; door naar sectie {toSection}
      </p>
      <h2 className="text-3xl mb-4">{title}</h2>
      <p className="mb-8" style={{ color: 'var(--text-tertiary)' }}>
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {fromHref && (
          <Button href={fromHref} variant="secondary" size="md">
            Vorige sectie
          </Button>
        )}
        <Button href={toHref} variant="primary" size="md">
          Ga verder
        </Button>
      </div>
      <div className="mt-6 text-sm">
        <Link href="/scorecard" style={{ color: 'var(--text-muted)' }}>
          Terug naar de scorecard-overzichtspagina
        </Link>
      </div>
    </div>
  );
}
