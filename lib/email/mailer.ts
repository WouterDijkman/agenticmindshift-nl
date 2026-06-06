/**
 * Gmail SMTP mailer via nodemailer.
 *
 * Vereist twee env vars:
 *   GMAIL_USER          — bv. wouter.dijkman@agenticmindshift.nl
 *   GMAIL_APP_PASSWORD  — 16-char Google App Password (NIET je gewone wachtwoord)
 *
 * App Password genereren:
 *   1. Google Account → Security → 2-Step Verification (verplicht inschakelen)
 *   2. Security → App passwords → Generate
 *   3. Naam "Agentic Mindshift website" → kopieer de 16-char string
 *
 * Optioneel:
 *   GMAIL_FROM_NAME     — display-naam in "From" header (default: "Wouter Dijkman")
 *
 * Graceful: alle calls naar sendMail() returnen { sent: false } als env ontbreekt,
 * geen throws — zodat de scorecard-flow blijft werken zonder Gmail-config.
 */

import nodemailer, { type Transporter } from 'nodemailer';

let cachedTransporter: Transporter | null = null;

export function isGmailConfigured(): boolean {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

function getTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER!,
      pass: process.env.GMAIL_APP_PASSWORD!,
    },
  });

  return cachedTransporter;
}

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  /** Optioneel: override reply-to (default = GMAIL_USER) */
  replyTo?: string;
  /** Optioneel: BCC voor archivering */
  bcc?: string;
}

export interface SendMailResult {
  sent: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Verstuur een email via Gmail SMTP. Graceful no-op als niet geconfigureerd.
 */
export async function sendMail(options: SendMailOptions): Promise<SendMailResult> {
  if (!isGmailConfigured()) {
    console.log('[mailer] GMAIL_USER/GMAIL_APP_PASSWORD ontbreekt — mail overgeslagen');
    return { sent: false, error: 'gmail_not_configured' };
  }

  const fromName = process.env.GMAIL_FROM_NAME ?? 'Wouter Dijkman';
  const fromAddress = process.env.GMAIL_USER!;

  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromAddress}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo ?? fromAddress,
      bcc: options.bcc,
    });
    return { sent: true, messageId: info.messageId };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown';
    console.error('[mailer] sendMail failed', message);
    return { sent: false, error: message };
  }
}

/**
 * Verifieer SMTP-credentials zonder een mail te sturen.
 * Handig voor een /api/email-health check.
 */
export async function verifyMailer(): Promise<{ ok: boolean; error?: string }> {
  if (!isGmailConfigured()) return { ok: false, error: 'gmail_not_configured' };
  try {
    await getTransporter().verify();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'unknown' };
  }
}
