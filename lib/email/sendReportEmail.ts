/**
 * Verstuurt het scorecard-rapport per email via Gmail SMTP (nodemailer).
 * Bevat de executive summary + link naar het volledige online rapport.
 * Graceful no-op als Gmail niet geconfigureerd is.
 */

import { createElement } from 'react';
import { render } from '@react-email/components';
import { type GeneratedReport } from '@/lib/report/types';
import ScorecardReportEmail from './templates/ScorecardReportEmail';
import { isSupabaseConfigured, getSupabaseClient } from '@/lib/supabase';
import { sendMail, isGmailConfigured } from './mailer';

interface SendReportEmailOptions {
  name: string;
  email: string; // kan leeg zijn — halen we zelf op als nodig
  company: string;
  reportUrl: string;
  report: GeneratedReport;
  leadId: string;
}

export async function sendReportEmail(options: SendReportEmailOptions): Promise<void> {
  if (!isGmailConfigured()) {
    console.log('[sendReportEmail] Gmail niet geconfigureerd — mail overgeslagen');
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
    console.warn('[sendReportEmail] Geen email-adres gevonden voor lead', options.leadId);
    return;
  }

  // Render React Email template naar HTML
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

  const result = await sendMail({
    to: emailAddress,
    subject,
    html,
    // BCC naar je eigen adres zodat de mail in je Gmail Sent + Inbox staat
    // voor archivering. Comment out als niet gewenst.
    bcc: process.env.GMAIL_USER,
  });

  if (result.sent) {
    console.log(`[sendReportEmail] Mail verstuurd naar ${emailAddress} (id: ${result.messageId})`);

    // Update lead row: email-sequence stap 1 actief
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
  } else {
    console.error('[sendReportEmail] Verzenden mislukt', result.error);
  }
}

function buildEmailSubject(name: string, report: GeneratedReport): string {
  const firstName = name.split(' ')[0];
  const urgencyPrefix = report.urgency === 'high' ? '⚡ ' : '';
  const profileLabel = report.scoreProfile?.profileLabel ?? 'Uw rapport';
  return `${urgencyPrefix}${firstName}, uw AI Readiness rapport is klaar — ${profileLabel}`;
}
