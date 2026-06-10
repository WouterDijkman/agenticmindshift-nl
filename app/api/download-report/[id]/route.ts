/**
 * GET /api/download-report/[id]
 * Genereert een PDF op basis van het opgeslagen rapport en stuurt het terug.
 * Caching via Cache-Control: max-age=3600.
 */

import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { createElement } from 'react';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import { type GeneratedReport } from '@/lib/report/types';
import { type OfferType } from '@/lib/scoring';
import { calculateScores, determineOffer } from '@/lib/scoring';
import { type Answers } from '@/lib/scoring';
import ReportDocument from '@/lib/pdf/reportTemplate';
import { type Dimension } from '@/lib/questions';
import { normalizeReportLocale, HTML_LANG } from '@/lib/report/locale';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: leadId } = await params;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Supabase niet geconfigureerd' }, { status: 503 });
  }

  try {
    const client = getSupabaseClient();
    const baseCols =
      'id, name, company, answers, total_score, dimension_scores, assigned_offer, weakest_dimensions, report';

    let { data, error } = await client
      .from('leads')
      .select(`${baseCols}, locale`)
      .eq('id', leadId)
      .single();

    // Defensief: val terug op een select zonder locale als migratie 0004 ontbreekt.
    if (error && /locale/i.test(`${error.message} ${error.details ?? ''}`)) {
      ({ data, error } = await client
        .from('leads')
        .select(baseCols)
        .eq('id', leadId)
        .single());
    }

    if (error || !data) {
      return NextResponse.json({ error: 'Lead niet gevonden' }, { status: 404 });
    }

    const locale = normalizeReportLocale((data as { locale?: unknown }).locale);

    // Herbereken scores voor PDF (of gebruik opgeslagen waarden)
    const scores = data.answers
      ? calculateScores(data.answers as Answers)
      : { total: data.total_score, byDimension: data.dimension_scores, weakest: data.weakest_dimensions ?? [] };

    const offer = (data.assigned_offer ?? 'none') as OfferType;
    const storedReport = data.report as GeneratedReport | null;

    const pdfElement = createElement(ReportDocument, {
      name: data.name,
      company: data.company,
      totalScore: scores.total,
      byDimension: scores.byDimension as Record<Dimension, number>,
      weakest: scores.weakest,
      offer,
      generatedAt: new Date().toLocaleDateString(HTML_LANG[locale]),
      report: storedReport ?? undefined,
      answers: data.answers as Answers | undefined, // voor de Q&A-pagina
      locale,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buffer = await renderToBuffer(pdfElement as any);
    const safeCompany = (data.company as string).replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();

    return new Response(buffer as unknown as ReadableStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="rapport-${safeCompany}.pdf"`,
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch (err) {
    console.error('[download-report] Error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'PDF generatie mislukt' }, { status: 500 });
  }
}
