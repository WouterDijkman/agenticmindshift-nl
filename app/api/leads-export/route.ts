/**
 * GET /api/leads-export
 *
 * Token-protected leads export voor consumptie door Claude Cowork projects.
 * Output is markdown geoptimaliseerd voor LLM consumptie (niet JSON dump).
 *
 * Auth:
 *   - Header `Authorization: Bearer LEADS_EXPORT_TOKEN`, OR
 *   - Query `?token=LEADS_EXPORT_TOKEN` (handig voor Claude in Chrome)
 *
 * Query params:
 *   ?limit=20         — aantal recente leads (default 20, max 100)
 *   ?format=md|json   — markdown (default) of raw JSON
 *   ?since=2026-06-01 — alleen leads vanaf datum
 *
 * Voorbeeld URL voor Cowork project:
 *   https://www.agenticmindshift.nl/api/leads-export?token=XXX&limit=20
 */

import { NextResponse } from 'next/server';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import { type GeneratedReport } from '@/lib/report/types';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface LeadRow {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string;
  job_title: string | null;
  phone: string | null;
  website: string | null;
  company_context: string | null;
  total_score: number;
  dimension_scores: Record<string, number> | null;
  assigned_offer: string | null;
  weakest_dimensions: string[] | null;
  report: GeneratedReport | null;
  report_generated_at: string | null;
  email_sequence_step: number | null;
  last_email_sent_at: string | null;
  unsubscribed: boolean | null;
}

function isAuthorized(req: Request): boolean {
  const token = process.env.LEADS_EXPORT_TOKEN;
  if (!token) return false; // niet geconfigureerd = niet bruikbaar
  const url = new URL(req.url);
  const queryToken = url.searchParams.get('token');
  const headerToken = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  return queryToken === token || headerToken === token;
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  }

  const url = new URL(req.url);
  const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '20', 10) || 20, 100);
  const format = url.searchParams.get('format') ?? 'md';
  const since = url.searchParams.get('since');

  try {
    const client = getSupabaseClient();
    let query = client
      .from('leads')
      .select(
        'id, created_at, name, email, company, job_title, phone, website, company_context, total_score, dimension_scores, assigned_offer, weakest_dimensions, report, report_generated_at, email_sequence_step, last_email_sent_at, unsubscribed',
      )
      .order('created_at', { ascending: false })
      .limit(limit);

    if (since) query = query.gte('created_at', since);

    const { data, error } = await query;
    if (error) {
      console.error('[leads-export] supabase error', error);
      return NextResponse.json({ error: 'query_failed', detail: error.message }, { status: 500 });
    }

    const leads: LeadRow[] = data ?? [];

    if (format === 'json') {
      return NextResponse.json({ count: leads.length, leads });
    }

    // Default: markdown geoptimaliseerd voor LLM consumptie
    const markdown = renderLeadsAsMarkdown(leads);
    return new Response(markdown, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'private, no-store',
      },
    });
  } catch (err) {
    console.error('[leads-export] unexpected', err);
    return NextResponse.json({ error: 'unexpected' }, { status: 500 });
  }
}

function renderLeadsAsMarkdown(leads: LeadRow[]): string {
  const now = new Date().toISOString();
  const lines: string[] = [];

  lines.push('# Agentic Mindshift — Recente leads');
  lines.push('');
  lines.push(`_Export tijdstip: ${now}_`);
  lines.push(`_Aantal leads in deze export: **${leads.length}**_`);
  lines.push('');
  lines.push('Deze leads hebben de AI Readiness Scorecard ingevuld op agenticmindshift.nl. De `assigned_offer` codes corresponderen met de Agentic Mindshift trajecten (A = Portfolio Intelligence, B = Buy-side Due Diligence, C = Fractional AI Officer, D = Consultancy & Workflow, E = Financieringsmemo, F = Sparring Sessie).');
  lines.push('');
  lines.push('---');
  lines.push('');

  if (leads.length === 0) {
    lines.push('_Nog geen leads. Zodra iemand de scorecard invult, verschijnen ze hier._');
    return lines.join('\n');
  }

  // Snelle samenvatting
  lines.push('## Samenvatting');
  lines.push('');
  const avgScore = (leads.reduce((sum, l) => sum + (l.total_score ?? 0), 0) / leads.length).toFixed(1);
  const highUrgency = leads.filter((l) => l.report?.urgency === 'high').length;
  const withReport = leads.filter((l) => l.report).length;
  lines.push(`- Gemiddelde score: **${avgScore}/75**`);
  lines.push(`- Leads met hoge urgentie: **${highUrgency}**`);
  lines.push(`- Leads met gegenereerd rapport: **${withReport}/${leads.length}**`);
  lines.push('');
  lines.push('---');
  lines.push('');

  // Per lead
  lines.push('## Leads (nieuw → oud)');
  lines.push('');
  for (const lead of leads) {
    const date = new Date(lead.created_at).toLocaleString('nl-NL', { dateStyle: 'short', timeStyle: 'short' });
    lines.push(`### ${lead.name} — ${lead.company}`);
    lines.push('');
    lines.push(`**Binnengekomen:** ${date}`);
    lines.push(`**Email:** ${lead.email}${lead.phone ? ` · **Tel:** ${lead.phone}` : ''}`);
    if (lead.job_title) lines.push(`**Functie:** ${lead.job_title}`);
    if (lead.website) lines.push(`**Website:** ${lead.website}`);
    lines.push(`**Score:** ${lead.total_score}/75${lead.assigned_offer ? ` · **Aanbevolen traject:** ${lead.assigned_offer}` : ''}`);
    if (lead.weakest_dimensions?.length) {
      lines.push(`**Zwakste dimensies:** ${lead.weakest_dimensions.join(', ')}`);
    }
    if (lead.email_sequence_step != null) {
      const stepLabel = ['nog geen mail', 'rapport-mail', 'dag-3 follow-up', 'dag-7 follow-up', 'dag-14 follow-up'][lead.email_sequence_step] ?? `step ${lead.email_sequence_step}`;
      lines.push(`**Email status:** ${stepLabel}${lead.unsubscribed ? ' · ⚠️ AFGEMELD' : ''}`);
    }
    if (lead.company_context) {
      lines.push('');
      lines.push(`**Eigen toelichting:**`);
      lines.push(`> ${lead.company_context}`);
    }
    if (lead.report) {
      lines.push('');
      if (lead.report.executiveSummary) {
        lines.push(`**Executive Summary:**`);
        lines.push(`> ${lead.report.executiveSummary}`);
      }
      if (lead.report.urgency) {
        const label = lead.report.urgency === 'high' ? '🔴 HOOG' : lead.report.urgency === 'medium' ? '🟠 GEMIDDELD' : '🟢 LAAG';
        lines.push(`**Urgentie:** ${label}`);
      }
      if (lead.report.recommendedTrajectory?.firstStep) {
        lines.push(`**Eerste stap (aanbevolen):** ${lead.report.recommendedTrajectory.firstStep}`);
      }
      if (lead.report.keyInsights?.length) {
        lines.push('');
        lines.push('**Kernobservaties uit rapport:**');
        for (const insight of lead.report.keyInsights.slice(0, 3)) {
          lines.push(`- **${insight.title}** — ${insight.body}`);
        }
      }
    } else {
      lines.push(`_Rapport: nog niet gegenereerd_`);
    }
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  lines.push('');
  lines.push(`_Gegenereerd door agenticmindshift.nl · KvK 99495945_`);
  return lines.join('\n');
}
