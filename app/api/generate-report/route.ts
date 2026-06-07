/**
 * POST /api/generate-report
 * Body: { leadId: string }
 *
 * Checkt of rapport al bestaat in Supabase. Als niet: genereert via DeepSeek,
 * slaat op, stuurt rapport-email. Cachet via leads.report kolom.
 *
 * maxDuration 120s: DeepSeek + websearch kan 20-40s duren.
 */

import { NextResponse } from 'next/server';
import {
  generateAndStoreReport,
  getStoredReport,
  getLeadForReport,
} from '@/lib/report/generate';
import { sendReportEmail } from '@/lib/email/sendReportEmail';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 120; // Vercel Pro: max 300s; Hobby: max 60s (pas aan als nodig)

export async function POST(request: Request) {
  let leadId: string;
  try {
    const body = await request.json();
    leadId = body.leadId;
    if (!leadId || typeof leadId !== 'string') {
      return NextResponse.json({ error: 'leadId required' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }

  try {
    // 1. Check cache: rapport al gegenereerd?
    const cached = await getStoredReport(leadId);
    if (cached) {
      console.log(`[generate-report] Cache hit for lead ${leadId}`);
      return NextResponse.json({ report: cached, cached: true });
    }

    // 2. Haal lead-data op
    const leadData = await getLeadForReport(leadId);
    if (!leadData) {
      // Supabase niet geconfigureerd of lead niet gevonden:
      // geef een mock-rapport terug zodat de dev-flow werkt
      console.warn(`[generate-report] Lead ${leadId} not found or Supabase unconfigured`);
      return NextResponse.json(
        {
          error: 'lead_not_found',
          message: 'Lead niet gevonden in database. Supabase geconfigureerd?',
        },
        { status: 404 },
      );
    }

    // 3. Genereer rapport via DeepSeek
    const report = await generateAndStoreReport(leadData);

    // 4. Stuur rapport-email (await: PDF genereren kost 10-15s, fire-and-forget haalt de deadline niet)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.agenticmindshift.nl';
    const reportUrl = `${siteUrl}/nl/scorecard/rapport/${leadId}`;
    try {
      await sendReportEmail({
        name: leadData.name,
        email: '', // wordt opgehaald via aparte query in sendReportEmail
        company: leadData.company,
        reportUrl,
        report,
        leadId,
      });
    } catch (err) {
      console.error('[generate-report] Email send failed (non-fatal)', err);
    }

    return NextResponse.json({ report, cached: false });
  } catch (err) {
    console.error('[generate-report] Error:', err instanceof Error ? err.message : err);
    return NextResponse.json(
      {
        error: 'generation_failed',
        message: err instanceof Error ? err.message : 'Onbekende fout',
      },
      { status: 500 },
    );
  }
}
