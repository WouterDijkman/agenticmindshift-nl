'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAssessmentStore } from '@/store/assessmentStore';
import { calculateScores, maturityBand } from '@/lib/scoring';
import { dimensionLabel } from '@/lib/questions.locales';
import { emailCaptureSchema, type EmailCaptureInput } from '@/lib/schemas';
import { submitScorecard } from '@/app/actions/submitScorecard';
import { totalQuestions } from '@/lib/questions';
import { track, trackOnce } from '@/lib/analytics';

import TotalScoreCircle from '@/components/scorecard/TotalScoreCircle';
import DimensionBars from '@/components/scorecard/DimensionBars';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function ResultaatPage() {
  const t = useTranslations('scorecard.resultaat');
  const tR = useTranslations('scorecard.rapport');
  const tv = useTranslations('validation');
  const locale = useLocale();

  /**
   * Zod geeft een message *key* terug (zie lib/schemas.ts); hier wordt die
   * opgelost in de taal van de bezoeker. Een onbekende key valt terug op zijn
   * eigen tekst, zodat een ontbrekende vertaling het formulier niet laat crashen.
   */
  const fieldError = (message?: string) => {
    if (!message) return undefined;
    return tv.has(message) ? tv(message) : message;
  };
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

  // Completion is reaching this page with all fifteen answered — the form below
  // is a separate, optional step and is counted separately.
  useEffect(() => {
    if (!hydrated || !allAnswered) return;
    trackOnce('Scorecard Completed', { locale, band: maturityBand(scores.total) });
  }, [hydrated, allAnswered, locale, scores.total]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailCaptureInput>({
    resolver: zodResolver(emailCaptureSchema),
  });

  if (hydrated && !allAnswered) {
    const remaining = totalQuestions - answeredCount;
    const questionsWord = remaining === 1 ? t('question_singular') : t('question_plural');
    return (
      <section className="container-narrow py-16 text-center">
        <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('incomplete_eyebrow')}</p>
        <h1 className="type-h2" style={{ marginBottom: '16px' }}>
          {t('incomplete_heading', { remaining, questions: questionsWord })}
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '36px', lineHeight: 1.75 }}>
          {t('incomplete_body', { answered: answeredCount, total: totalQuestions })}
        </p>
        <Button href="/scorecard/sectie-1" variant="primary" size="lg">
          {t('back_to_scorecard')}
        </Button>
      </section>
    );
  }

  const onSubmit = async (data: EmailCaptureInput) => {
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await submitScorecard({
        ...data,
        answers,
        locale: locale as 'nl' | 'en' | 'de' | 'es' | 'pt',
      });
      if (res.ok && res.leadId) {
        track('Report Requested', { locale });
        setLeadId(res.leadId);
        setLeadName(data.name);
        router.push(`/scorecard/rapport/${res.leadId}`);
      } else {
        setServerError(t('error_create'));
      }
    } catch {
      setServerError(t('error_generic'));
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
        <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('eyebrow')}</p>
        <h1 className="type-h2" style={{ marginBottom: '12px' }}>
          {t('heading')}
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 1.6vw, 1.125rem)', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '520px' }}>
          {t('subtext')}
        </p>
      </div>

      {/*
        The result itself, before anything is asked for. The homepage promises
        "no account" six times and this page used to answer that with a name,
        a business email and a company field. Everything below is computed in
        the browser from answers already in the store, so there is nothing to
        withhold.
      */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'center',
          marginBottom: 'clamp(40px, 5vw, 56px)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <TotalScoreCircle score={scores.total} max={75} size={240} />
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.04em',
              textAlign: 'center',
              maxWidth: '220px',
              lineHeight: 1.6,
            }}
          >
            {tR(`band_${maturityBand(scores.total)}`)}
          </p>
        </div>

        <div>
          <h2 className="type-h3" style={{ marginBottom: '12px' }}>{t('weakest_eyebrow')}</h2>
          <p style={{ fontSize: 'clamp(1rem, 1.6vw, 1.125rem)', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
            {t('weakest_body', {
              first: dimensionLabel(scores.weakest[0], locale),
              second: dimensionLabel(scores.weakest[1], locale),
            })}
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '16px', lineHeight: 1.6 }}>
            {t('score_caption')}
          </p>
        </div>
      </div>

      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          padding: 'clamp(24px, 3.5vw, 32px)',
          marginBottom: 'clamp(48px, 6vw, 72px)',
        }}
      >
        <h2 className="type-h3" style={{ marginBottom: '24px' }}>{t('dimensions_heading')}</h2>
        <DimensionBars scores={scores.byDimension} weakest={scores.weakest} />
      </div>

      {/* The written report — an offer now, not a toll gate. */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-medium)',
          padding: 'clamp(28px, 4vw, 44px)',
        }}
      >
        <p className="eyebrow" style={{ marginBottom: '14px' }}>{t('optional_eyebrow')}</p>
        <h2 className="type-h3" style={{ marginBottom: '10px' }}>{t('form_heading')}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '52ch' }}>
          {t('report_lead')}
        </p>

        <div style={{ marginBlock: 'clamp(24px, 3vw, 32px)' }}>
          <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('report_contents_eyebrow')}</p>
          {(['report_item_1', 'report_item_2', 'report_item_3', 'report_item_4', 'report_item_5'] as const).map(
            (key, i) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  paddingBlock: '12px',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: 'var(--accent-cta-ink)',
                    letterSpacing: '0.06em',
                    flexShrink: 0,
                    paddingTop: '2px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {t(key)}
                </span>
              </div>
            ),
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5" noValidate>
          <Input
            label={t('field_name')}
            type="text"
            autoComplete="name"
            {...register('name')}
            error={fieldError(errors.name?.message)}
          />
          <Input
            label={t('field_email')}
            type="email"
            autoComplete="email"
            {...register('email')}
            error={fieldError(errors.email?.message)}
          />
          <Input
            label={t('field_company')}
            type="text"
            autoComplete="organization"
            {...register('company')}
            error={fieldError(errors.company?.message)}
          />
          <div
            className="md:col-span-2"
            style={{
              marginTop: '4px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <p
              style={{
                fontSize: '0.6875rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {t('optional_section_label')}
            </p>
          </div>
          <Input
            label={t('field_jobtitle')}
            type="text"
            autoComplete="organization-title"
            optional
            {...register('jobTitle')}
            error={fieldError(errors.jobTitle?.message)}
          />
          <Input
            label={t('field_phone')}
            type="tel"
            autoComplete="tel"
            optional
            {...register('phone')}
            error={fieldError(errors.phone?.message)}
          />
          <Input
            label={t('field_website')}
            type="text"
            autoComplete="url"
            placeholder={t('field_website_placeholder')}
            optional
            {...register('website')}
            error={fieldError(errors.website?.message)}
          />
          <div className="md:col-span-2">
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                fontWeight: 400,
                letterSpacing: '0.01em',
                marginBottom: '6px',
              }}
            >
              {t('field_company_context')}
            </label>
            <textarea
              {...register('companyContext')}
              rows={3}
              placeholder={t('field_company_context_placeholder')}
              style={{
                width: '100%',
                padding: '12px 14px',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                fontSize: '0.9375rem',
                lineHeight: 1.5,
                resize: 'vertical',
                borderRadius: '2px',
              }}
            />
            {errors.companyContext?.message && (
              <p className="text-sm mt-1" style={{ color: 'var(--status-error)' }}>
                {fieldError(errors.companyContext.message)}
              </p>
            )}
            <p
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                marginTop: '6px',
                lineHeight: 1.5,
              }}
            >
              {t('field_company_context_hint')}
            </p>
          </div>
          <div className="md:col-span-2 flex flex-col gap-3 mt-2">
            {serverError && (
              <p className="text-sm" style={{ color: 'var(--status-error)' }} role="alert">
                {serverError}
              </p>
            )}
            <Button type="submit" variant="primary" size="lg" disabled={submitting}>
              {submitting ? t('submit_loading') : t('submit_button')}
            </Button>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {t('privacy_notice')}
            </p>
          </div>
        </form>
      </div>

      {/* The route out for a reader who wants none of the above. */}
      <div style={{ marginTop: 'clamp(40px, 5vw, 56px)' }}>
        <p className="eyebrow" style={{ marginBottom: '12px' }}>{t('next_eyebrow')}</p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '20px', maxWidth: '48ch' }}>
          {t('next_body')}
        </p>
        <Button href="https://cal.com/wwdijkman/intake-call" variant="secondary" size="md" external className="plausible-event-name=Intake+CTA plausible-event-location=result">
          {t('next_cta')}
        </Button>
      </div>
    </section>
  );
}
