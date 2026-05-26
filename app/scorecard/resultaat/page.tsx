'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAssessmentStore } from '@/store/assessmentStore';
import { calculateScores } from '@/lib/scoring';
import { emailCaptureSchema, type EmailCaptureInput } from '@/lib/schemas';
import { submitScorecard } from '@/app/actions/submitScorecard';
import { totalQuestions } from '@/lib/questions';

import TotalScoreCircle from '@/components/scorecard/TotalScoreCircle';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function ResultaatPage() {
  const router = useRouter();
  const answers = useAssessmentStore((s) => s.answers);
  const setLeadId = useAssessmentStore((s) => s.setLeadId);
  const setLeadName = useAssessmentStore((s) => s.setLeadName);

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const answeredCount = useMemo(
    () => Object.keys(answers).length,
    [answers],
  );
  const allAnswered = answeredCount === totalQuestions;

  const scores = useMemo(() => calculateScores(answers), [answers]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailCaptureInput>({
    resolver: zodResolver(emailCaptureSchema),
  });

  if (hydrated && !allAnswered) {
    return (
      <section className="container-narrow py-16 text-center">
        <p className="eyebrow" style={{ marginBottom: '16px' }}>Scorecard onvolledig</p>
        <h1 className="type-h2" style={{ marginBottom: '16px' }}>
          Nog {totalQuestions - answeredCount} {totalQuestions - answeredCount === 1 ? 'vraag' : 'vragen'} te gaan
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '36px', lineHeight: 1.75 }}>
          U heeft {answeredCount} van {totalQuestions} vragen beantwoord. Vul de scorecard
          eerst volledig af om uw persoonlijke rapport te genereren.
        </p>
        <Button href="/scorecard/sectie-1" variant="primary" size="lg">
          Terug naar de scorecard
        </Button>
      </section>
    );
  }

  const onSubmit = async (data: EmailCaptureInput) => {
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await submitScorecard({ ...data, answers });
      if (res.ok && res.leadId) {
        setLeadId(res.leadId);
        setLeadName(data.name);
        router.push(`/scorecard/rapport/${res.leadId}`);
      } else {
        setServerError(
          'We konden uw rapport niet aanmaken. Controleer de velden en probeer opnieuw.',
        );
      }
    } catch {
      setServerError('Er ging iets mis. Probeer het later nog eens.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container-medium py-12">

      {/* Header */}
      <div
        style={{
          marginBottom: '48px',
          paddingBottom: '40px',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <p className="eyebrow" style={{ marginBottom: '16px' }}>Scorecard voltooid</p>
        <h1 className="type-h2" style={{ marginBottom: '12px' }}>
          U ziet nu wat de meeste partners pas bij de jaarrapportage zien.
        </h1>
        <p style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1rem, 1.6vw, 1.125rem)', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '520px' }}>
          Vul uw gegevens in om het volledige rapport te ontvangen — direct in uw browser
          én als PDF in uw inbox.
        </p>
      </div>

      {/* Score + rapport-inhoud */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'center',
          marginBottom: '48px',
        }}
      >
        {/* Score cirkel */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <TotalScoreCircle score={scores.total} max={75} size={240} />
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.04em',
              textAlign: 'center',
              maxWidth: '200px',
              lineHeight: 1.6,
            }}
          >
            Het volledige rapport toont uw score per dimensie met peer-vergelijking.
          </p>
        </div>

        {/* Rapport inhoud */}
        <div>
          <p className="eyebrow" style={{ marginBottom: '20px' }}>Wat zit er in uw rapport?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { num: '01', text: 'Totaalscore met toelichting per dimensie' },
              { num: '02', text: 'Zes-dimensies-overzicht met peer-benchmark' },
              { num: '03', text: 'Uw twee zwakste dimensies en concrete duiding' },
              { num: '04', text: 'Aanbevolen vervolgstap op basis van uw antwoorden' },
              { num: '05', text: 'Persoonlijke link + PDF in uw inbox' },
            ].map((item) => (
              <div
                key={item.num}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  paddingBlock: '14px',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: 'var(--accent-cta)',
                    letterSpacing: '0.06em',
                    flexShrink: 0,
                    paddingTop: '1px',
                  }}
                >
                  {item.num}
                </span>
                <span style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Formulier */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-medium)',
          padding: 'clamp(28px, 4vw, 44px)',
        }}
      >
        <h2 className="type-h3" style={{ marginBottom: '8px' }}>Waar stuur ik uw rapport naartoe?</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5" noValidate>
          <Input
            label="Naam"
            type="text"
            autoComplete="name"
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            label="Zakelijk e-mailadres"
            type="email"
            autoComplete="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Bedrijf"
            type="text"
            autoComplete="organization"
            {...register('company')}
            error={errors.company?.message}
          />
          <Input
            label="Functietitel (optioneel)"
            type="text"
            autoComplete="organization-title"
            {...register('jobTitle')}
            error={errors.jobTitle?.message}
          />
          <Input
            label="Telefoon (optioneel)"
            type="tel"
            autoComplete="tel"
            {...register('phone')}
            error={errors.phone?.message}
          />
          <div className="md:col-span-2 flex flex-col gap-3 mt-2">
            {serverError && (
              <p className="text-sm" style={{ color: 'var(--status-error)' }} role="alert">
                {serverError}
              </p>
            )}
            <Button type="submit" variant="primary" size="lg" disabled={submitting}>
              {submitting ? 'Rapport genereren...' : 'Toon mijn rapport'}
            </Button>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Door te klikken gaat u akkoord met ons{' '}
              <a href="/privacy" style={{ color: 'var(--text-tertiary)', textDecoration: 'underline' }}>
                privacystatement
              </a>
              . U ontvangt twee opvolg-mails (dag&nbsp;3 en&nbsp;7). Daarna niets meer.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
