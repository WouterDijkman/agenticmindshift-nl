/**
 * Bedrijfsonderzoek voor rapportgeneratie.
 *
 * Twee bronnen:
 * 1. Jina Reader (https://r.jina.ai) — converteert elke URL naar
 *    schone markdown. Geen API key nodig voor lage volumes; met
 *    JINA_API_KEY hogere rate limits. Dit is de PRIMAIRE bron.
 * 2. Serper.dev — Google Search snippets. Optioneel, alleen actief
 *    als SERPER_API_KEY gezet is.
 *
 * Beide bronnen zijn graceful: geen key = geen request, geen error.
 */

export interface SearchResult {
  title: string;
  snippet: string;
  link: string;
}

export interface ResearchFindings {
  /** Zoekquery die naar Serper ging (leeg als niet gebruikt) */
  query: string;
  /** Search snippets uit Serper (leeg als niet geconfigureerd) */
  results: SearchResult[];
  /** Volledige scraped markdown van de bedrijfssite (truncated tot 8k chars) */
  scrapedContent: string;
  /** Bron-URL van de scrape */
  scrapedUrl: string;
  /** Welke services beschikbaar waren */
  serperConfigured: boolean;
  scrapeAttempted: boolean;
  scrapeSuccess: boolean;
}

function isSerperConfigured(): boolean {
  return Boolean(process.env.SERPER_API_KEY);
}

/** Normaliseer een URL: voeg https:// toe als protocol ontbreekt */
function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

/**
 * Scrape een website via Jina Reader (https://r.jina.ai/{url}).
 * Returns schone markdown van de pagina (truncated).
 * Graceful: alle fouten → lege string, geen throw.
 */
async function scrapeViaJina(websiteUrl: string): Promise<string> {
  try {
    const normalized = normalizeUrl(websiteUrl);
    const jinaUrl = `https://r.jina.ai/${normalized}`;

    const headers: Record<string, string> = {
      Accept: 'text/plain',
      // Vraag om de "default" mode (gehele pagina als markdown)
      'X-Return-Format': 'markdown',
    };
    if (process.env.JINA_API_KEY) {
      headers.Authorization = `Bearer ${process.env.JINA_API_KEY}`;
    }

    const response = await fetch(jinaUrl, {
      method: 'GET',
      headers,
      // Reader kan 10-30s duren voor zware sites
      signal: AbortSignal.timeout(25_000),
    });

    if (!response.ok) {
      console.warn(`[scrapeViaJina] ${response.status} for ${normalized}`);
      return '';
    }

    const text = await response.text();
    // Truncate naar 8000 chars (genoeg voor LLM context, voorkomt token-overflow)
    return text.length > 8000 ? `${text.slice(0, 8000)}\n\n[... truncated]` : text;
  } catch (err) {
    console.warn('[scrapeViaJina] fetch failed', err instanceof Error ? err.message : err);
    return '';
  }
}

/** Serper Google Search → top snippets */
async function searchViaSerper(query: string): Promise<SearchResult[]> {
  if (!isSerperConfigured()) return [];

  try {
    const response = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': process.env.SERPER_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: query, num: 5, hl: 'nl', gl: 'nl' }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) return [];

    const data = await response.json();
    return (data.organic ?? [])
      .slice(0, 4)
      .map((r: { title: string; snippet: string; link: string }) => ({
        title: r.title ?? '',
        snippet: r.snippet ?? '',
        link: r.link ?? '',
      }));
  } catch (err) {
    console.warn('[searchViaSerper] fetch failed', err instanceof Error ? err.message : err);
    return [];
  }
}

/**
 * Doe volledig bedrijfsonderzoek: scrape de bedrijfssite (Jina) +
 * eventuele Google snippets (Serper).
 */
export async function researchCompany(
  company: string,
  jobTitle?: string,
  website?: string,
): Promise<ResearchFindings> {
  const sectorHint = jobTitle ? inferSectorHint(jobTitle) : '';
  const query = [company, sectorHint, 'Nederland'].filter(Boolean).join(' ');

  // Voer parallel uit: scrape + search
  const [scrapedContent, results] = await Promise.all([
    website ? scrapeViaJina(website) : Promise.resolve(''),
    isSerperConfigured() ? searchViaSerper(query) : Promise.resolve([]),
  ]);

  return {
    query,
    results,
    scrapedContent,
    scrapedUrl: website ? normalizeUrl(website) : '',
    serperConfigured: isSerperConfigured(),
    scrapeAttempted: Boolean(website),
    scrapeSuccess: Boolean(scrapedContent),
  };
}

function inferSectorHint(jobTitle: string): string {
  const title = jobTitle.toLowerCase();
  if (title.includes('pe') || title.includes('private equity') || title.includes('fund')) return 'private equity';
  if (title.includes('m&a') || title.includes('acquisitie') || title.includes('deal')) return 'M&A';
  if (title.includes('dga') || title.includes('directeur') || title.includes('eigenaar')) return 'DGA';
  if (title.includes('bank') || title.includes('financier')) return 'financiering';
  return '';
}

/** Formatteer alle research findings als prompt-context voor DeepSeek */
export function formatResearchForPrompt(findings: ResearchFindings): string {
  const sections: string[] = [];

  // 1. Scraped website content (de meest waardevolle bron)
  if (findings.scrapeSuccess && findings.scrapedContent) {
    sections.push(
      `=== BEDRIJFSWEBSITE (gescraped via Jina Reader van ${findings.scrapedUrl}) ===`,
      findings.scrapedContent,
      `=== EINDE WEBSITE-CONTENT ===`,
      '',
      'Gebruik bovenstaande gescrapte website-inhoud actief in je analyse: noem specifieke diensten, sectoren, portfoliobedrijven, propositie of stakeholders die je daadwerkelijk in de tekst tegenkomt. Verzin niets.',
    );
  } else if (findings.scrapeAttempted) {
    sections.push(
      `(Bedrijfswebsite ${findings.scrapedUrl} kon niet worden opgehaald — baseer je op de antwoorden en algemene sector-kennis.)`,
    );
  }

  // 2. Serper search snippets (extra externe signalen)
  if (findings.results.length > 0) {
    sections.push(
      '',
      `=== EXTERNE SIGNALEN (Google search voor "${findings.query}") ===`,
      ...findings.results.map((r, i) =>
        `[${i + 1}] ${r.title}\n${r.snippet}\nBron: ${r.link}`,
      ),
      `=== EINDE EXTERNE SIGNALEN ===`,
    );
  }

  if (sections.length === 0) {
    return 'Geen externe bedrijfsdata beschikbaar (geen website opgegeven en geen search API geconfigureerd). Baseer de bedrijfscontext volledig op de antwoorden van de lead.';
  }

  return sections.join('\n');
}
