/**
 * GET /api/leads-csv
 *
 * Zelfde token-protected leads export, maar als CSV download.
 * Voor handmatige upload naar Claude Cowork project (drag & drop in chat).
 */

import { NextResponse } from 'next/server';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import { type GeneratedReport } from '@/lib/report/types';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function isAuthorized(req: Request): boolean {
  const token = process.env.LEADS_EXPORT_TOKEN;
  if (!token) return false;
  const url = new URL(req.url);
  const queryToken = url.searchParams.get('token');
  const headerToken = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  return queryToken === token || headerToken === token;
}

function csvEscape(value: unknown): string {
  if (value == null) return '';
  const str = typeof value === 'string' ? value : JSON.stringify(value);
  if (str.includes('"') || str.includes(',') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  }

  const url = new URL(req.url);
  const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '500', 10) || 500, 1000);

  const client = getSupabaseClient();
  const { data, error } = await client
    .from('leads')
    .select(
      'created_at, name, email, company, job_title, phone, website, company_context, total_score, dimension_scores, assigned_offer, weakest_dimensions, report, email_sequence_step, unsubscribed',
    )
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: 'query_failed', detail: error.message }, { status: 500 });
  }

  const headers = [
    'created_at',
    'name',
    'email',
    'company',
    'job_title',
    'phone',
    'website',
    'company_context',
    'total_score',
    'urgency',
    'assigned_offer',
    'weakest_dimensions',
    'profile_label',
    'executive_summary',
    'first_step',
    'email_sequence_step',
    'unsubscribed',
  ];

  const rows = (data ?? []).map((l) => {
    const report = l.report as GeneratedReport | null;
    return [
      l.created_at,
      l.name,
      l.email,
      l.company,
      l.job_title ?? '',
      l.phone ?? '',
      l.website ?? '',
      l.company_context ?? '',
      l.total_score,
      report?.urgency ?? '',
      l.assigned_offer ?? '',
      (l.weakest_dimensions ?? []).join('; '),
      report?.scoreProfile?.profileLabel ?? '',
      report?.executiveSummary ?? '',
      report?.recommendedTrajectory?.firstStep ?? '',
      l.email_sequence_step ?? 0,
      l.unsubscribed ? 'true' : 'false',
    ];
  });

  const csv = [
    headers.join(','),
    ...rows.map((row) => row.map(csvEscape).join(',')),
  ].join('\n');

  const today = new Date().toISOString().split('T')[0];
  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="agentic-mindshift-leads-${today}.csv"`,
      'Cache-Control': 'private, no-store',
    },
  });
}
