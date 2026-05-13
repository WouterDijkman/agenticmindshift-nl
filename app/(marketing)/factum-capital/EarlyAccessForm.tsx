'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { earlyAccessSchema, type EarlyAccessInput } from '@/lib/schemas';
import { Input, Select, Textarea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { submitEarlyAccess } from '@/app/actions/submitEarlyAccess';

export default function EarlyAccessForm() {
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
        setServerError('Niet alle gegevens zijn geldig. Controleer de velden.');
      }
    } catch {
      setServerError('Er ging iets mis. Probeer het later nog eens.');
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
          Bedankt. Uw gegevens zijn ontvangen. U hoort van ons zodra het early-access-
          traject opent.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
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
        hint="Geen Gmail/Outlook/Hotmail: gebruik uw zakelijke adres."
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
      <Select label="Type partij" {...register('partyType')} error={errors.partyType?.message}>
        <option value="PE-partner">PE-partner</option>
        <option value="M&A-director">M&amp;A-director</option>
        <option value="DGA">DGA</option>
        <option value="Restructuring-specialist">Restructuring-specialist</option>
        <option value="Anders">Anders</option>
      </Select>
      <Textarea
        label="Toelichting (optioneel)"
        placeholder="Wat is voor u de belangrijkste reden om vroeg toegang te willen?"
        {...register('notes')}
        error={errors.notes?.message}
      />
      {serverError && (
        <p className="text-sm" style={{ color: 'var(--status-error)' }} role="alert">
          {serverError}
        </p>
      )}
      <Button type="submit" variant="primary" size="lg" disabled={submitting}>
        {submitting ? 'Versturen...' : 'Vraag vroege toegang aan'}
      </Button>
      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
        Uw gegevens worden alleen gebruikt voor het Factum Capital early-access-traject.
      </p>
    </form>
  );
}
