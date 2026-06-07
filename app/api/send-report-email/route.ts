/**
 * POST /api/send-report-email
 * Body: { leadId: string }
 *
 * Stuurt het rapport-email voor een al-gegenereerd rapport.
 * Bedoeld voor retry / handmatige trigger. Vereist LEADS_EXPORT_TOKEN als auth.
 */

import { NextResponse } from 'next/server';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import { sendReportEmail } from '@/lib/email/sendReportEmail';
import { type GeneratedReport } from '@/lib/report/types';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 120;

function isAuthorized(req: Request): boolean {
  const token = process.env.LEADS_EXPORT_TOKEN;
  if (!token) return false;
  const url = new URL(req.url);
  const queryToken = url.searchParams.get('token');
  const headerToken = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  return queryToken === token || headerToken === token;
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const { leadId } = body;
  if (!leadId || typeof leadId !== 'string') {
    return NextResponse.json({ error: 'leadId required' }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  }

  const client = getSupabaseClient();
  const { data, error } = await client
    .from('leads')
    .select('id, name, email, company, report')
    .eq('id', leadId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'lead_not_found' }, { status: 404 });
  }

  if (!data.report) {
    return NextResponse.json({ error: 'no_report_yet', message: 'Rapport nog niet gegenereerd voor deze lead' }, { status: 422 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.agenticmindshift.nl';
  const reportUrl = `${siteUrl}/nl/scorecard/rapport/${leadId}`;

  try {
    await sendReportEmail({
      name: data.name,
      email: data.email,
      company: data.company,
      reportUrl,
      report: data.report as GeneratedReport,
      leadId,
    });
    return NextResponse.json({ sent: true });
  } catch (err) {
    console.error('[send-report-email] error', err);
    return NextResponse.json(
      { error: 'send_failed', message: err instanceof Error ? err.message : 'Onbekend' },
      { status: 500 },
    );
  }
}
