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
        <h1 className="text-3xl mb-4">Nog niet alle vragen beantwoord</h1>
        <p className="mb-8" style={{ color: 'var(--text-tertiary)' }}>
          U heeft {answeredCount} van {totalQuestions} vragen beantwoord. Vul de scorecard
          eerst af om uw rapport te genereren.
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
      <p
        className="text-xs uppercase mb-4"
        style={{ color: 'var(--accent-primary)', letterSpacing: '0.22em' }}
      >
        Scorecard voltooid
      </p>
      <h1 className="text-3xl sm:text-4xl mb-4">Uw voorlopige score</h1>
      <p className="mb-10 max-w-2xl" style={{ color: 'var(--text-tertiary)' }}>
        Hieronder ziet u uw totaalscore. Vul uw zakelijke gegevens in om het volledige
        rapport van vier pagina&apos;s te ontgrendelen en als PDF te ontvangen.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
        <div className="flex justify-center">
          <TotalScoreCircle score={scores.total} max={75} size={240} />
        </div>
        <div>
          <h2 className="text-2xl mb-4">Wat zit er in uw rapport?</h2>
          <ul
            className="flex flex-col gap-3 text-base"
            style={{ color: 'var(--text-tertiary)' }}
          >
            <li>Totaalscore (zichtbaar) plus uitleg.</li>
            <li>Zes-dimensies-overzicht met peer-vergelijking.</li>
            <li>Uw twee zwakste dimensies met toelichting.</li>
            <li>Concrete aanbevolen vervolgstap, gebaseerd op uw antwoorden.</li>
            <li>Persoonlijke link plus PDF in uw inbox.</li>
          </ul>
        </div>
      </div>

      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px',
          padding: '36px',
        }}
      >
        <h2 className="text-2xl mb-3">Ontgrendel uw rapport</h2>
        <p
          className="mb-6 text-sm"
          style={{ color: 'var(--text-tertiary)' }}
        >
          Alleen zakelijke e-mailadressen. Wij sturen u na drie en zeven dagen een
          inhoudelijke opvolg-mail; daarna hoort u niets meer.
        </p>
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
            label="Functietitel"
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
              Door op de knop te klikken gaat u akkoord met ons{' '}
              <a href="/privacy" style={{ color: 'var(--text-tertiary)', textDecoration: 'underline' }}>
                privacystatement
              </a>
              .
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
