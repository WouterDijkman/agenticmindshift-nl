import { NextResponse } from 'next/server';
import { render } from '@react-email/components';
import { createElement } from 'react';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import Followup3DayEmail from '@/lib/email/templates/Followup3DayEmail';
import Followup7DayEmail from '@/lib/email/templates/Followup7DayEmail';
import { sendMail, isGmailConfigured } from '@/lib/email/mailer';
import { type OfferType } from '@/lib/scoring';
import { getOfferName } from '@/lib/pdf/offerRoutes';
import { dimensionLabel, toDimensionIds } from '@/lib/questions.locales';
import {
  FOLLOWUP_STRINGS,
  normalizeReportLocale,
  type ReportLocale,
} from '@/lib/report/locale';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface LeadRow {
  id: string;
  name: string;
  email: string;
  email_sequence_step: number | null;
  last_email_sent_at: string | null;
  responded_to_email3: boolean | null;
  unsubscribed: boolean | null;
  weakest_dimensions: string[] | null;
  assigned_offer: OfferType | null;
  /** Ontbreekt als migratie 0004 niet is toegepast; valt dan terug op 'nl'. */
  locale?: string | null;
}

const LEAD_COLUMNS =
  'id, name, email, email_sequence_step, last_email_sent_at, responded_to_email3, unsubscribed, weakest_dimensions, assigned_offer';

const DAY_MS = 1000 * 60 * 60 * 24;

function isAuthorized(authHeader: string | null): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true; // dev mode: skip auth check
  return authHeader === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!isAuthorized(authHeader)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  if (!isSupabaseConfigured() || !isGmailConfigured()) {
    console.log('[cron] skipped — env missing (Supabase of Gmail)');
    return NextResponse.json({ skipped: true });
  }

  let processed = 0;

  try {
    const supabase = getSupabaseClient();
    const primary = await supabase
      .from('leads')
      .select(`${LEAD_COLUMNS}, locale`)
      .eq('unsubscribed', false)
      .lt('email_sequence_step', 4);

    let rows = primary.data as LeadRow[] | null;
    let error = primary.error;

    // Defensief: de locale-kolom kan ontbreken (migratie 0004 niet toegepast).
    // Zonder deze fallback zou de hele cron-run stilvallen op een schema-detail;
    // de leads krijgen dan simpelweg de Nederlandse standaardtaal.
    if (error && /locale/i.test(`${error.message} ${error.details ?? ''}`)) {
      const fallback = await supabase
        .from('leads')
        .select(LEAD_COLUMNS)
        .eq('unsubscribed', false)
        .lt('email_sequence_step', 4);
      rows = fallback.data as LeadRow[] | null;
      error = fallback.error;
    }

    if (error) {
      console.error('[cron] supabase select error', error);
      return NextResponse.json({ error: 'select_failed' }, { status: 500 });
    }

    const now = Date.now();
    const leads: LeadRow[] = rows ?? [];

    for (const lead of leads) {
      const step = lead.email_sequence_step ?? 1;
      const lastAt = lead.last_email_sent_at
        ? new Date(lead.last_email_sent_at).getTime()
        : 0;
      const daysSinceLast = lastAt === 0 ? Infinity : (now - lastAt) / DAY_MS;
      // De opvolgmail volgt de taal waarin de lead de scorecard invulde.
      const locale: ReportLocale = normalizeReportLocale(lead.locale);
      const strings = FOLLOWUP_STRINGS[locale];

      try {
        if (step === 1 && daysSinceLast >= 3) {
          const weakest = toDimensionIds(lead.weakest_dimensions).map((d) =>
            dimensionLabel(d, locale),
          );
          const html = await render(
            createElement(Followup3DayEmail, {
              name: lead.name,
              weakestDimensions: weakest,
              locale,
            }),
          );
          await sendMail({
            to: lead.email,
            subject: strings.day3.subject,
            html,
          });
          await supabase
            .from('leads')
            .update({
              email_sequence_step: 2,
              last_email_sent_at: new Date().toISOString(),
            })
            .eq('id', lead.id);
          processed += 1;
        } else if (step === 2 && daysSinceLast >= 4) {
          const offer = (lead.assigned_offer ?? 'none') as OfferType;
          const offerName = getOfferName(locale, offer);
          const html = await render(
            createElement(Followup7DayEmail, {
              name: lead.name,
              offerName,
              locale,
            }),
          );
          await sendMail({
            to: lead.email,
            subject: strings.day7.subject,
            html,
          });
          await supabase
            .from('leads')
            .update({
              email_sequence_step: 3,
              last_email_sent_at: new Date().toISOString(),
            })
            .eq('id', lead.id);
          processed += 1;
        } else if (
          step === 3 &&
          lead.responded_to_email3 === true &&
          daysSinceLast >= 7
        ) {
          // Step 4: light "if responded" follow-up reusing the same template body.
          const offer = (lead.assigned_offer ?? 'none') as OfferType;
          const offerName = getOfferName(locale, offer);
          const html = await render(
            createElement(Followup7DayEmail, {
              name: lead.name,
              offerName,
              locale,
            }),
          );
          await sendMail({
            to: lead.email,
            subject: strings.nudgeSubject,
            html,
          });
          await supabase
            .from('leads')
            .update({
              email_sequence_step: 4,
              last_email_sent_at: new Date().toISOString(),
            })
            .eq('id', lead.id);
          processed += 1;
        }
      } catch (sendErr) {
        console.error(
          '[cron] failed to process lead',
          lead.id,
          sendErr instanceof Error ? sendErr.message : sendErr,
        );
      }
    }

    return NextResponse.json({ processed });
  } catch (err) {
    console.error('[cron] unexpected error', err);
    return NextResponse.json({ error: 'unexpected' }, { status: 500 });
  }
}
