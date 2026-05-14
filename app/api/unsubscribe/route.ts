import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const BRAND_BG = '#081930';
const BRAND_CARD = '#0d1f3a';
const BRAND_TEXT = '#e4ecf5';
const BRAND_MUTED = '#a8b8cc';
const BRAND_ACCENT = '#F14C1D';
const BRAND_BORDER = 'rgba(107,125,150,0.2)';

function htmlPage({
  title,
  heading,
  body,
  status = 200,
}: {
  title: string;
  heading: string;
  body: string;
  status?: number;
}) {
  const html = `<!doctype html>
<html lang="nl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        background: ${BRAND_BG};
        color: ${BRAND_TEXT};
        font-family: 'Noto Serif', Georgia, serif;
        min-height: 100%;
      }
      .wrap {
        max-width: 560px;
        margin: 0 auto;
        padding: 64px 24px;
      }
      .card {
        background: ${BRAND_CARD};
        border: 1px solid ${BRAND_BORDER};
        border-radius: 4px;
        padding: 32px;
      }
      h1 {
        font-size: 24px;
        margin: 0 0 16px;
        color: ${BRAND_TEXT};
      }
      p {
        color: ${BRAND_MUTED};
        line-height: 1.6;
        margin: 0 0 16px;
      }
      a.btn {
        display: inline-block;
        margin-top: 8px;
        background: ${BRAND_ACCENT};
        color: #ffffff;
        padding: 12px 22px;
        border-radius: 4px;
        text-decoration: none;
        font-weight: 600;
      }
      a.link {
        color: ${BRAND_TEXT};
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="card">
        <h1>${heading}</h1>
        ${body}
        <p style="margin-top:24px"><a class="link" href="https://www.agenticmindshift.nl/">Terug naar agenticmindshift.nl</a></p>
      </div>
    </div>
  </body>
</html>`;
  return new NextResponse(html, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return htmlPage({
      title: 'Ongeldige afmeldlink',
      heading: 'Ongeldige afmeldlink',
      body: '<p>De afmeldlink is onvolledig. Open de link uit uw e-mail opnieuw, of stuur een bericht naar <a class="link" href="mailto:wouter@agenticmindshift.nl">wouter@agenticmindshift.nl</a>.</p>',
      status: 400,
    });
  }

  if (!isSupabaseConfigured()) {
    console.log('[unsubscribe] Supabase not configured. Token:', token);
    return htmlPage({
      title: 'Afgemeld',
      heading: 'U bent afgemeld',
      body: '<p>U bent afgemeld van onze e-mails. U ontvangt geen verdere berichten van Agentic Mindshift.</p>',
    });
  }

  try {
    const supabase = getSupabaseClient();
    const { data: lead, error: selErr } = await supabase
      .from('leads')
      .select('id')
      .eq('unsubscribe_token', token)
      .maybeSingle();

    if (selErr) {
      console.error('[unsubscribe] select error', selErr);
    }

    if (!lead) {
      return htmlPage({
        title: 'Niet gevonden',
        heading: 'Afmeldlink niet gevonden',
        body: '<p>We konden uw afmelding niet vinden. Het kan zijn dat u al was afgemeld, of dat de link is verlopen. Stuur bij twijfel een bericht naar <a class="link" href="mailto:wouter@agenticmindshift.nl">wouter@agenticmindshift.nl</a>.</p>',
        status: 404,
      });
    }

    const { error: updErr } = await supabase
      .from('leads')
      .update({ unsubscribed: true })
      .eq('id', lead.id);
    if (updErr) {
      console.error('[unsubscribe] update error', updErr);
    }

    return htmlPage({
      title: 'Afgemeld',
      heading: 'U bent afgemeld',
      body: '<p>U bent afgemeld van onze e-mails. U ontvangt geen verdere berichten van Agentic Mindshift.</p>',
    });
  } catch (err) {
    console.error('[unsubscribe] unexpected error', err);
    return htmlPage({
      title: 'Afgemeld',
      heading: 'U bent afgemeld',
      body: '<p>U bent afgemeld van onze e-mails. U ontvangt geen verdere berichten van Agentic Mindshift.</p>',
    });
  }
}
