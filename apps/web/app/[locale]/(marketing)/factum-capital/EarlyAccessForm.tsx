'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { earlyAccessSchema, type EarlyAccessInput } from '@/lib/schemas';
import { Input, Select, Textarea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { submitEarlyAccess } from '@/app/actions/submitEarlyAccess';

export default function EarlyAccessForm() {
  const t = useTranslations('factum_capital');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EarlyAccessInput>({
    resolver: zodResolver(earlyAccessSchema),
    defaultValues: { partyType: 'PE-partner' },
  });

  const onSubmit = async (data: EarlyAccessInput) => {
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await submitEarlyAccess(data);
      if (res.ok) {
        setSubmitted(true);
      } else {
        setServerError(t('form.error_invalid'));
      }
    } catch {
      setServerError(t('form.error_generic'));
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--status-success)',
          borderRadius: '4px',
          padding: '28px',
        }}
      >
        <p className="text-lg" style={{ color: 'var(--text-primary)' }}>
          {t('form.success')}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <Input
        label={t('form.field_name')}
        type="text"
        autoComplete="name"
        {...register('name')}
        error={errors.name?.message}
      />
      <Input
        label={t('form.field_email')}
        type="email"
        autoComplete="email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label={t('form.field_company')}
        type="text"
        autoComplete="organization"
        {...register('company')}
        error={errors.company?.message}
      />
      <Input
        label={t('form.field_jobtitle')}
        type="text"
        autoComplete="organization-title"
        {...register('jobTitle')}
        error={errors.jobTitle?.message}
      />
      <Select label={t('form.field_partytype')} {...register('partyType')} error={errors.partyType?.message}>
        <option value="PE-partner">{t('form.option_pe')}</option>
        <option value="M&A-director">{t('form.option_ma')}</option>
        <option value="Ondernemer">{t('form.option_entrepreneur')}</option>
        <option value="Restructuring-specialist">{t('form.option_restructuring')}</option>
        <option value="Anders">{t('form.option_other')}</option>
      </Select>
      <Textarea
        label={t('form.field_notes')}
        placeholder={t('form.notes_placeholder')}
        {...register('notes')}
        error={errors.notes?.message}
      />
      {serverError && (
        <p className="text-sm" style={{ color: 'var(--status-error)' }} role="alert">
          {serverError}
        </p>
      )}
      <Button type="submit" variant="primary" size="lg" disabled={submitting}>
        {submitting ? t('form.submitting') : t('form.submit')}
      </Button>
      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
        {t('form.privacy_note')}
      </p>
    </form>
  );
}
