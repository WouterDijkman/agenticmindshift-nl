/**
 * Websearch module voor bedrijfscontext in rapportgeneratie.
 * Gebruikt Serper.dev (Google Search API, OpenAI-compatibel).
 * Graceful no-op als SERPER_API_KEY niet geconfigureerd is.
 */

export interface SearchResult {
  title: string;
  snippet: string;
  link: string;
}

export interface ResearchFindings {
  query: string;
  results: SearchResult[];
  configured: boolean;
}

function isSerperConfigured(): boolean {
  return Boolean(process.env.SERPER_API_KEY);
}

/**
 * Zoek naar bedrijfsinformatie voor rapportcontext.
 * Returns leeg resultset (geen error) als Serper niet geconfigureerd is.
 */
export async function researchCompany(
  company: string,
  jobTitle?: string,
): Promise<ResearchFindings> {
  if (!isSerperConfigured()) {
    return {
      query: '',
      results: [],
      configured: false,
    };
  }

  // Combineer bedrijfsnaam + sector-hint voor betere resultaten
  const sectorHint = jobTitle ? inferSectorHint(jobTitle) : '';
  const query = [company, sectorHint, 'Nederland'].filter(Boolean).join(' ');

  try {
    const response = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': process.env.SERPER_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: query,
        num: 5,
        hl: 'nl',
        gl: 'nl',
      }),
    });

    if (!response.ok) {
      console.warn('[webResearch] Serper returned', response.status);
      return { query, results: [], configured: true };
    }

    const data = await response.json();
    const organic: SearchResult[] = (data.organic ?? [])
      .slice(0, 4)
      .map((r: { title: string; snippet: string; link: string }) => ({
        title: r.title ?? '',
        snippet: r.snippet ?? '',
        link: r.link ?? '',
      }));

    return { query, results: organic, configured: true };
  } catch (err) {
    console.warn('[webResearch] fetch failed', err instanceof Error ? err.message : err);
    return { query, results: [], configured: true };
  }
}

/** Afleiden van sector-hint uit jobtitel voor betere zoekopdrachten */
function inferSectorHint(jobTitle: string): string {
  const title = jobTitle.toLowerCase();
  if (title.includes('pe') || title.includes('private equity') || title.includes('fund')) return 'private equity';
  if (title.includes('m&a') || title.includes('acquisitie') || title.includes('deal')) return 'M&A';
  if (title.includes('dga') || title.includes('directeur') || title.includes('eigenaar')) return 'DGA';
  if (title.includes('bank') || title.includes('financier')) return 'financiering';
  return '';
}

/** Formatteer research findings als tekst voor in de prompt */
export function formatResearchForPrompt(findings: ResearchFindings): string {
  if (!findings.configured) {
    return 'Geen externe bedrijfsinformatie beschikbaar (websearch niet geconfigureerd). Baseer de company context op de antwoorden van de lead.';
  }
  if (findings.results.length === 0) {
    return `Websearch uitgevoerd voor "${findings.query}" maar geen relevante resultaten gevonden. Baseer de company context op de antwoorden.`;
  }

  const lines = [
    `Websearch resultaten voor "${findings.query}":`,
    '',
    ...findings.results.map((r, i) =>
      `[${i + 1}] ${r.title}\n${r.snippet}`,
    ),
    '',
    'Gebruik bovenstaande informatie als context, maar verifieer niets wat je niet zeker weet.',
  ];
  return lines.join('\n');
}
