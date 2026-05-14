import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import { createElement } from 'react';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import Followup3DayEmail from '@/lib/email/templates/Followup3DayEmail';
import Followup7DayEmail from '@/lib/email/templates/Followup7DayEmail';
import { offerMap, type OfferType } from '@/lib/scoring';

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
}

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

  if (!isSupabaseConfigured() || !process.env.RESEND_API_KEY) {
    console.log('[cron] skipped — env missing');
    return NextResponse.json({ skipped: true });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromAddress =
    process.env.RESEND_FROM || 'Wouter Dijkman <wouter@agenticmindshift.nl>';

  let processed = 0;

  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('leads')
      .select(
        'id, name, email, email_sequence_step, last_email_sent_at, responded_to_email3, unsubscribed, weakest_dimensions, assigned_offer',
      )
      .eq('unsubscribed', false)
      .lt('email_sequence_step', 4);

    if (error) {
      console.error('[cron] supabase select error', error);
      return NextResponse.json({ error: 'select_failed' }, { status: 500 });
    }

    const now = Date.now();
    const leads: LeadRow[] = data ?? [];

    for (const lead of leads) {
      const step = lead.email_sequence_step ?? 1;
      const lastAt = lead.last_email_sent_at
        ? new Date(lead.last_email_sent_at).getTime()
        : 0;
      const daysSinceLast = lastAt === 0 ? Infinity : (now - lastAt) / DAY_MS;

      try {
        if (step === 1 && daysSinceLast >= 3) {
          const weakest = lead.weakest_dimensions ?? [];
          const html = await render(
            createElement(Followup3DayEmail, {
              name: lead.name,
              weakestDimensions: weakest,
            }),
          );
          await resend.emails.send({
            from: fromAddress,
            to: lead.email,
            subject: 'Drie dagen later — wat valt op in uw rapport?',
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
          const offerName = offerMap[offer]?.name ?? 'Portfolio Intelligence';
          const html = await render(
            createElement(Followup7DayEmail, {
              name: lead.name,
              offerName,
            }),
          );
          await resend.emails.send({
            from: fromAddress,
            to: lead.email,
            subject: 'Een week later — concrete vervolgstap',
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
          const offerName = offerMap[offer]?.name ?? 'Portfolio Intelligence';
          const html = await render(
            createElement(Followup7DayEmail, {
              name: lead.name,
              offerName,
            }),
          );
          await resend.emails.send({
            from: fromAddress,
            to: lead.email,
            subject: 'Opvolging — wanneer past het?',
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
