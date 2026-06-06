/**
 * Verstuurt het scorecard-rapport per email via Resend.
 * Bevat de executive summary + link naar het volledige online rapport.
 * Graceful no-op als Resend niet geconfigureerd is.
 */

import { Resend } from 'resend';
import { createElement } from 'react';
import { render } from '@react-email/components';
import { type GeneratedReport } from '@/lib/report/types';
import ScorecardReportEmail from './templates/ScorecardReportEmail';
import { isSupabaseConfigured, getSupabaseClient } from '@/lib/supabase';

interface SendReportEmailOptions {
  name: string;
  email: string; // kan leeg zijn — halen we zelf op als nodig
  company: string;
  reportUrl: string;
  report: GeneratedReport;
  leadId: string;
}

export async function sendReportEmail(options: SendReportEmailOptions): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.log('[sendReportEmail] RESEND_API_KEY not set — skipping email');
    return;
  }

  let emailAddress = options.email;

  // Haal email op uit Supabase als niet meegegeven
  if (!emailAddress && isSupabaseConfigured()) {
    const client = getSupabaseClient();
    const { data } = await client
      .from('leads')
      .select('email')
      .eq('id', options.leadId)
      .single();
    emailAddress = data?.email ?? '';
  }

  if (!emailAddress) {
    console.warn('[sendReportEmail] No email address found for lead', options.leadId);
    return;
  }

  const resend = new Resend(resendKey);
  const fromAddress = process.env.RESEND_FROM ?? 'Wouter Dijkman <wouter@agenticmindshift.nl>';

  // Rendert de React email template naar HTML
  const html = await render(
    createElement(ScorecardReportEmail, {
      name: options.name,
      company: options.company,
      reportUrl: options.reportUrl,
      totalScore: options.report.scoreProfile?.totalScore ?? 0,
      executiveSummary: options.report.executiveSummary,
      profileLabel: options.report.scoreProfile?.profileLabel ?? '',
      recommendedTrajectoryName: options.report.recommendedTrajectory?.offerName ?? '',
      urgency: options.report.urgency,
    }),
  );

  const subject = buildEmailSubject(options.name, options.report);

  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: emailAddress,
      subject,
      html,
    });

    if (error) {
      console.error('[sendReportEmail] Resend error', error);
    } else {
      console.log(`[sendReportEmail] Email sent to ${emailAddress}`, data?.id);

      // Update email_sequence_step: rapport-mail is stap 0 (vóór de 3/7-daagse follow-up)
      if (isSupabaseConfigured()) {
        const client = getSupabaseClient();
        await client
          .from('leads')
          .update({
            email_sequence_step: 1,
            last_email_sent_at: new Date().toISOString(),
          })
          .eq('id', options.leadId);
      }
    }
  } catch (err) {
    console.error('[sendReportEmail] Unexpected error', err);
  }
}

function buildEmailSubject(name: string, report: GeneratedReport): string {
  const firstName = name.split(' ')[0];
  const urgencyPrefix = report.urgency === 'high' ? '⚡ ' : '';
  const profileLabel = report.scoreProfile?.profileLabel ?? 'Uw rapport';
  return `${urgencyPrefix}${firstName}, uw AI Readiness rapport is klaar — ${profileLabel}`;
}
