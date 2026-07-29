/**
 * Verstuurt het scorecard-rapport per email via Gmail SMTP (nodemailer).
 * Bevat de executive summary + link naar het volledige online rapport.
 * Graceful no-op als Gmail niet geconfigureerd is.
 */

import { createElement } from 'react';
import { render } from '@react-email/components';
import { renderToBuffer } from '@react-pdf/renderer';
import { type GeneratedReport } from '@/lib/report/types';
import ScorecardReportEmail from './templates/ScorecardReportEmail';
import ReportDocument from '@/lib/pdf/reportTemplate';
import { isSupabaseConfigured, getSupabaseClient } from '@/lib/supabase';
import { sendMail, isGmailConfigured } from './mailer';
import { type Answers, calculateScores, determineOffer, type OfferType } from '@/lib/scoring';
import { type Dimension } from '@/lib/questions';
import {
  type ReportLocale,
  normalizeReportLocale,
  EMAIL_STRINGS,
  HTML_LANG,
} from '@/lib/report/locale';

interface SendReportEmailOptions {
  name: string;
  email: string; // kan leeg zijn — halen we zelf op als nodig
  company: string;
  reportUrl: string;
  report: GeneratedReport;
  leadId: string;
  /** Taal van de e-mail + PDF. Default 'nl'. */
  locale?: ReportLocale;
}

export async function sendReportEmail(options: SendReportEmailOptions): Promise<void> {
  if (!isGmailConfigured()) {
    console.log('[sendReportEmail] Gmail niet geconfigureerd — mail overgeslagen');
    return;
  }

  let emailAddress = options.email;
  let answers: Answers | undefined;
  let locale: ReportLocale = options.locale ?? 'nl';

  // Haal email + answers op uit Supabase als niet meegegeven (voor PDF generatie)
  if (isSupabaseConfigured()) {
    const client = getSupabaseClient();
    let { data } = await client
      .from('leads')
      .select('email, answers, locale')
      .eq('id', options.leadId)
      .single();
    // Defensief: locale-kolom kan ontbreken (migratie 0004 niet toegepast)
    if (!data) {
      ({ data } = await client
        .from('leads')
        .select('email, answers')
        .eq('id', options.leadId)
        .single());
    }
    if (!emailAddress) emailAddress = data?.email ?? '';
    answers = data?.answers as Answers | undefined;
    if (!options.locale) {
      locale = normalizeReportLocale((data as { locale?: unknown } | null)?.locale);
    }
  }

  const strings = EMAIL_STRINGS[locale];

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
      locale,
    }),
  );

  const subject = buildEmailSubject(options.name, options.report, locale);

  // Genereer PDF als attachment (cream editorial template)
  let pdfAttachment: { filename: string; content: Buffer; contentType: string } | undefined;
  if (answers) {
    try {
      const scores = calculateScores(answers);
      const offer = determineOffer(answers['Q4']) as OfferType;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfElement = createElement(ReportDocument as any, {
        name: options.name,
        company: options.company,
        totalScore: scores.total,
        byDimension: scores.byDimension as Record<Dimension, number>,
        weakest: scores.weakest,
        offer,
        generatedAt: new Date().toLocaleDateString(HTML_LANG[locale]),
        locale,
        report: options.report,
        answers, // voor de Q&A-pagina in het rapport
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const buffer = await renderToBuffer(pdfElement as any);
      const safeCompany = options.company.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
      pdfAttachment = {
        filename: `ai-readiness-rapport-${safeCompany}.pdf`,
        content: buffer as Buffer,
        contentType: 'application/pdf',
      };
      console.log(`[sendReportEmail] PDF gegenereerd (${(buffer as Buffer).length} bytes)`);
    } catch (err) {
      console.error('[sendReportEmail] PDF-generatie mislukt (mail gaat zonder bijlage)', err instanceof Error ? err.message : err);
    }
  }

  const result = await sendMail({
    to: emailAddress,
    subject,
    html,
    // BCC naar je eigen adres zodat de mail in je Gmail Sent + Inbox staat
    bcc: process.env.GMAIL_USER,
    attachments: pdfAttachment ? [pdfAttachment] : undefined,
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

function buildEmailSubject(name: string, report: GeneratedReport, locale: ReportLocale): string {
  const firstName = name.split(' ')[0];
  const profileLabel = report.scoreProfile?.profileLabel ?? '';
  return EMAIL_STRINGS[locale].subject(firstName, profileLabel, report.urgency === 'high');
}
