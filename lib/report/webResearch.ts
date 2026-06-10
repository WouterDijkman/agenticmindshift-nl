/**
 * Strategisch bedrijfsonderzoek voor rapportgeneratie.
 *
 * Doel: geen oppervlakkige homepage-scrape, maar een gerichte
 * inlichtingen-pass die de bronnen oplevert waar een PE-/M&A-adviseur
 * écht op stuurt — track record, deal-activiteit, leiderschap en
 * digitale volwassenheid.
 *
 * Drie lagen:
 * 1. Jina Reader (https://r.jina.ai) — converteert elke URL naar schone
 *    markdown. Scraped niet alleen de homepage maar ontdekt en haalt de
 *    strategisch belangrijkste subpagina's op (portfolio/track record,
 *    team/leiderschap, diensten, actueel). PRIMAIRE bron.
 * 2. Serper.dev — meerdere THEMATISCHE Google-queries (deal-activiteit,
 *    leiderschap, digitale signalen) i.p.v. één generieke zoekopdracht.
 *    Optioneel, alleen actief met SERPER_API_KEY.
 * 3. Sectorprofiel — leidt uit functie + toelichting af welke
 *    intelligence-thema's prioriteit krijgen.
 *
 * Alle bronnen zijn graceful: geen key = geen request, geen error.
 */

import type { ReportLocale } from './locale';

export interface SearchResult {
  title: string;
  snippet: string;
  link: string;
}

/** Eén strategisch opgehaalde pagina (homepage of subpagina). */
export interface ScrapedPage {
  url: string;
  /** Strategisch label, bv. "Portfolio / Track record" of "Team / Leiderschap". */
  label: string;
  content: string;
}

/** Een thematische zoekopdracht met de gevonden externe signalen. */
export interface SearchTheme {
  /** Intelligence-thema, bv. "Deal-activiteit". */
  theme: string;
  query: string;
  results: SearchResult[];
}

/** Welk type marktpartij — bepaalt welke thema's prioriteit krijgen. */
export type SectorProfile = 'private-equity' | 'ma-advisory' | 'dga' | 'financiering' | 'algemeen';

export interface ResearchFindings {
  /** Strategisch geprioriteerde, gescrapte pagina's (homepage eerst). */
  pages: ScrapedPage[];
  /** Thematische externe signalen uit Serper. */
  themes: SearchTheme[];
  /** Genormaliseerde primaire bron-URL. */
  primaryUrl: string;
  /** Afgeleid sectorprofiel. */
  sector: SectorProfile;
  serperConfigured: boolean;
  scrapeAttempted: boolean;
  scrapeSuccess: boolean;
}

function isSerperConfigured(): boolean {
  return Boolean(process.env.SERPER_API_KEY);
}

/** Normaliseer een URL: voeg https:// toe als protocol ontbreekt. */
function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

/** Haal de registreerbare host op (zonder protocol/www) voor same-domain filtering. */
function hostOf(url: string): string {
  try {
    return new URL(normalizeUrl(url)).hostname.replace(/^www\./i, '').toLowerCase();
  } catch {
    return '';
  }
}

// ── Sectorprofiel ────────────────────────────────────────────────────────────

function inferSector(jobTitle?: string, companyContext?: string): SectorProfile {
  const t = `${jobTitle ?? ''} ${companyContext ?? ''}`.toLowerCase();
  if (/\b(pe|private equity|fund|fonds|participatie|buyout|investeringsmaatschappij|venture)\b/.test(t))
    return 'private-equity';
  if (/\b(m&a|mergers|acquisitie|overname|fusie|corporate finance|deal)\b/.test(t)) return 'ma-advisory';
  if (/\b(dga|directeur-grootaandeelhouder|eigenaar|founder|oprichter|familiebedrijf)\b/.test(t)) return 'dga';
  if (/\b(bank|financier|krediet|debt|lending)\b/.test(t)) return 'financiering';
  return 'algemeen';
}

// ── Strategische subpagina-ontdekking ────────────────────────────────────────

/**
 * Strategische pagina-categorieën met meertalige URL/anchor-keywords.
 * Volgorde = prioriteit: track record & deals zeggen het meest over een
 * PE-/M&A-partij, daarna leiderschap, propositie en actualiteit.
 */
const PAGE_CATEGORIES: { label: string; keywords: RegExp }[] = [
  {
    label: 'Portfolio / Track record',
    keywords:
      /portfolio|participat|investment|beteiligung|inversion|holdings|deals?|transact|track.?record|cases?|realisat|exits?|companies/i,
  },
  {
    label: 'Team / Leiderschap',
    keywords: /about|over-?ons|team|people|mensen|management|leadership|partners?|ueber-?uns|sobre|quienes|equipo|founders?/i,
  },
  {
    label: 'Propositie / Diensten',
    keywords: /diensten|services|expertise|sectoren|approach|aanpak|strateg|leistungen|servicios|what-we-do|focus/i,
  },
  {
    label: 'Actueel / Insights',
    keywords: /news|nieuws|insights?|blog|actueel|press|pers|noticias|aktuelles|article|publicat/i,
  },
];

/** Extraheer same-domain links uit Jina-markdown en kies de strategisch sterkste subpagina's. */
function selectStrategicSubpages(homepageMarkdown: string, baseUrl: string, max: number): { url: string; label: string }[] {
  const baseHost = hostOf(baseUrl);
  if (!baseHost) return [];

  const linkRe = /\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g;
  const seen = new Set<string>();
  // Per categorie de eerste passende link bewaren (zo dekken we breed i.p.v. 3× portfolio).
  const picks = new Map<string, { url: string; label: string }>();

  let m: RegExpExecArray | null;
  while ((m = linkRe.exec(homepageMarkdown)) !== null) {
    const anchor = m[1] ?? '';
    const rawUrl = m[2] ?? '';
    if (hostOf(rawUrl) !== baseHost) continue;

    let clean: string;
    try {
      const u = new URL(rawUrl);
      u.hash = '';
      clean = u.toString();
    } catch {
      continue;
    }
    // Skip de homepage zelf en al geziene/bestandslinks.
    const path = (() => {
      try {
        return new URL(clean).pathname.replace(/\/$/, '');
      } catch {
        return '';
      }
    })();
    if (!path || path === '' || /\.(pdf|jpg|jpeg|png|gif|svg|zip|docx?)$/i.test(path)) continue;
    if (seen.has(clean)) continue;
    seen.add(clean);

    const haystack = `${path} ${anchor}`;
    for (const cat of PAGE_CATEGORIES) {
      if (picks.has(cat.label)) continue;
      if (cat.keywords.test(haystack)) {
        picks.set(cat.label, { url: clean, label: cat.label });
        break;
      }
    }
    if (picks.size >= PAGE_CATEGORIES.length) break;
  }

  // Behoud de prioriteitsvolgorde van PAGE_CATEGORIES.
  const ordered: { url: string; label: string }[] = [];
  for (const cat of PAGE_CATEGORIES) {
    const p = picks.get(cat.label);
    if (p) ordered.push(p);
  }
  return ordered.slice(0, max);
}

// ── Jina scraping ────────────────────────────────────────────────────────────

/**
 * Scrape één URL via Jina Reader. Returns schone markdown (truncated).
 * Graceful: alle fouten → lege string, geen throw.
 */
async function scrapeViaJina(url: string, maxChars: number): Promise<string> {
  try {
    const normalized = normalizeUrl(url);
    const jinaUrl = `https://r.jina.ai/${normalized}`;

    const headers: Record<string, string> = {
      Accept: 'text/plain',
      'X-Return-Format': 'markdown',
    };
    if (process.env.JINA_API_KEY) {
      headers.Authorization = `Bearer ${process.env.JINA_API_KEY}`;
    }

    const response = await fetch(jinaUrl, {
      method: 'GET',
      headers,
      signal: AbortSignal.timeout(25_000),
    });

    if (!response.ok) {
      console.warn(`[scrapeViaJina] ${response.status} for ${normalized}`);
      return '';
    }

    const text = await response.text();
    return text.length > maxChars ? `${text.slice(0, maxChars)}\n\n[... ingekort]` : text;
  } catch (err) {
    console.warn('[scrapeViaJina] fetch failed', err instanceof Error ? err.message : err);
    return '';
  }
}

// ── Serper thematische search ────────────────────────────────────────────────

const SERPER_REGION: Record<ReportLocale, { gl: string; hl: string }> = {
  nl: { gl: 'nl', hl: 'nl' },
  en: { gl: 'gb', hl: 'en' },
  de: { gl: 'de', hl: 'de' },
  es: { gl: 'es', hl: 'es' },
  pt: { gl: 'pt', hl: 'pt' },
};

async function searchViaSerper(
  query: string,
  region: { gl: string; hl: string },
  num: number,
): Promise<SearchResult[]> {
  if (!isSerperConfigured()) return [];
  try {
    const response = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': process.env.SERPER_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: query, num, hl: region.hl, gl: region.gl }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return [];
    const data = await response.json();
    return (data.organic ?? [])
      .slice(0, num)
      .map((r: { title: string; snippet: string; link: string }) => ({
        title: r.title ?? '',
        snippet: r.snippet ?? '',
        link: r.link ?? '',
      }))
      .filter((r: SearchResult) => r.snippet || r.title);
  } catch (err) {
    console.warn('[searchViaSerper] fetch failed', err instanceof Error ? err.message : err);
    return [];
  }
}

/**
 * Bouw de thematische intelligence-queries op. Elk thema is een aparte
 * zoekopdracht zodat we gerichte signalen krijgen i.p.v. één brij.
 * Sectorprofiel bepaalt het zwaartepunt (PE → track record/AUM,
 * M&A → mandaten/deals, DGA → bedrijf zelf).
 */
function buildSearchThemes(company: string, sector: SectorProfile): { theme: string; query: string }[] {
  const q = `"${company}"`;
  const themes: { theme: string; query: string }[] = [];

  // 1. Deal- / transactie-activiteit (kern voor PE & M&A).
  if (sector === 'private-equity') {
    themes.push({ theme: 'Deal-activiteit & track record', query: `${q} (acquisition OR investment OR exit OR portfolio OR fund)` });
    themes.push({ theme: 'Fonds & kapitaal', query: `${q} (AUM OR "assets under management" OR fund size OR "nieuw fonds")` });
  } else if (sector === 'ma-advisory') {
    themes.push({ theme: 'Mandaten & transacties', query: `${q} (overname OR fusie OR transaction OR "advised on" OR deal)` });
  } else {
    themes.push({ theme: 'Recente ontwikkelingen', query: `${q} (overname OR investering OR groei OR expansie OR nieuws)` });
  }

  // 2. Leiderschap & stakeholders.
  themes.push({ theme: 'Leiderschap & stakeholders', query: `${q} (managing partner OR directie OR CEO OR founder OR board)` });

  // 3. Digitale volwassenheid / AI-signalen (de kern van het rapport).
  themes.push({ theme: 'Digitale & AI-signalen', query: `${q} (AI OR "artificial intelligence" OR digitalisering OR data OR technology OR automation)` });

  return themes;
}

// ── Hoofd-onderzoek ──────────────────────────────────────────────────────────

export async function researchCompany(
  company: string,
  jobTitle?: string,
  website?: string,
  companyContext?: string,
  locale: ReportLocale = 'nl',
): Promise<ResearchFindings> {
  const sector = inferSector(jobTitle, companyContext);
  const region = SERPER_REGION[locale] ?? SERPER_REGION.nl;
  const primaryUrl = website ? normalizeUrl(website) : '';

  // Thematische searches kunnen direct parallel starten.
  const searchThemes = buildSearchThemes(company, sector);
  const searchPromise: Promise<SearchTheme[]> = isSerperConfigured()
    ? Promise.all(
        searchThemes.map(async (t) => ({
          theme: t.theme,
          query: t.query,
          results: await searchViaSerper(t.query, region, 4),
        })),
      ).then((all) => all.filter((t) => t.results.length > 0))
    : Promise.resolve([]);

  // Scraping: eerst homepage, dan strategische subpagina's parallel.
  let pages: ScrapedPage[] = [];
  if (website) {
    const homepage = await scrapeViaJina(primaryUrl, 6000);
    if (homepage) {
      pages.push({ url: primaryUrl, label: 'Homepage / Propositie', content: homepage });

      const subpages = selectStrategicSubpages(homepage, primaryUrl, 3);
      const scraped = await Promise.all(
        subpages.map(async (sp) => ({
          url: sp.url,
          label: sp.label,
          content: await scrapeViaJina(sp.url, 3500),
        })),
      );
      pages = pages.concat(scraped.filter((p) => p.content));
    }
  }

  const themes = await searchPromise;

  return {
    pages,
    themes,
    primaryUrl,
    sector,
    serperConfigured: isSerperConfigured(),
    scrapeAttempted: Boolean(website),
    scrapeSuccess: pages.length > 0,
  };
}

// ── Prompt-formattering ──────────────────────────────────────────────────────

const SECTOR_LABEL: Record<SectorProfile, string> = {
  'private-equity': 'private-equity / participatiemaatschappij',
  'ma-advisory': 'M&A- / corporate-finance-adviseur',
  dga: 'directeur-grootaandeelhouder / ondernemer',
  financiering: 'financier / kredietverstrekker',
  algemeen: 'algemeen mid-market',
};

/**
 * Formatteer alle findings als een STRATEGISCHE briefing voor DeepSeek —
 * niet als ruwe dump, maar als gestructureerde intelligence met expliciete
 * analyse-opdracht.
 */
export function formatResearchForPrompt(findings: ResearchFindings): string {
  const sections: string[] = [];

  sections.push(
    `INGESCHAT PROFIEL VAN DE PARTIJ: ${SECTOR_LABEL[findings.sector]}.`,
    '',
  );

  // 1. Gescrapte strategische pagina's.
  if (findings.scrapeSuccess && findings.pages.length > 0) {
    sections.push(
      `=== STRATEGISCHE BRONPAGINA'S (gescraped via Jina Reader, ${findings.pages.length} pagina's) ===`,
    );
    for (const page of findings.pages) {
      sections.push(
        '',
        `--- [${page.label}] ${page.url} ---`,
        page.content,
      );
    }
    sections.push(
      '',
      `=== EINDE BRONPAGINA'S ===`,
      '',
      'STRATEGISCHE ANALYSE-OPDRACHT op basis van bovenstaande pagina\'s:',
      '- Identificeer de kernpropositie, sub-sector(en) en het businessmodel.',
      '- Bij een PE-/M&A-partij: extraheer track record, portfoliobedrijven, deal-types, ticketgrootte en exits indien zichtbaar.',
      '- Breng de stakeholders/leiderschap in kaart (wie neemt beslissingen?).',
      '- Spot expliciete én impliciete digitaliserings-/AI-/datasignalen — of juist het ontbreken daarvan.',
      '- KOPPEL elke observatie aan de scorecard-antwoorden: waar versterken ze elkaar, waar spreken ze elkaar tegen? Een hoog due-diligence-profiel met lage AI Readiness is een concrete strategische spanning — benoem die.',
      '- VERZIN NIETS. Gebruik alleen wat daadwerkelijk in de tekst staat.',
    );
  } else if (findings.scrapeAttempted) {
    sections.push(
      `(Bedrijfswebsite ${findings.primaryUrl} kon niet worden opgehaald — baseer je op de antwoorden, het ingeschatte profiel en sector-kennis.)`,
    );
  }

  // 2. Thematische externe signalen.
  if (findings.themes.length > 0) {
    sections.push('', `=== EXTERNE SIGNALEN (thematische search) ===`);
    for (const t of findings.themes) {
      sections.push(
        '',
        `### ${t.theme}`,
        ...t.results.map((r, i) => `[${i + 1}] ${r.title}\n${r.snippet}\nBron: ${r.link}`),
      );
    }
    sections.push(
      '',
      `=== EINDE EXTERNE SIGNALEN ===`,
      '',
      'Gebruik deze externe signalen om recente ontwikkelingen, deal-momentum en marktpositie te duiden — niet om de antwoorden te overschrijven, maar om het advies scherper en actueler te maken.',
    );
  }

  if (sections.length <= 2) {
    return 'Geen externe bedrijfsdata beschikbaar (geen website opgegeven en geen search API geconfigureerd). Baseer de bedrijfscontext volledig op de antwoorden van de lead en het ingeschatte sectorprofiel.';
  }

  return sections.join('\n');
}
