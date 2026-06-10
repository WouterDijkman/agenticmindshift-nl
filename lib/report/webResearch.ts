/**
 * Strategisch bedrijfsonderzoek voor rapportgeneratie — VOLLEDIGE SITE-CRAWL.
 *
 * Doel: geen oppervlakkige homepage-scrape, maar een complete inlichtingen-pass
 * die ELKE pagina van de bedrijfssite ontdekt, inlaadt en meeneemt in de analyse.
 *
 * Pijplijn:
 * 1. ONTDEKKING — lees robots.txt voor de Sitemap-directive, val terug op
 *    /sitemap.xml en /sitemapindex.xml. Sitemap-indexen worden recursief
 *    uitgevouwen naar hun child-sitemaps. Alle <loc>-URL's worden verzameld,
 *    op same-host gefilterd en ontdubbeld. Geen sitemap? → val terug op
 *    homepage-linkextractie.
 * 2. PRIORITERING — elke URL krijgt een strategisch label en prioriteit op
 *    basis van het pad (expertise/diensten, team/leiderschap, referenties/
 *    portfolio, publicaties/insights, overig). Strategische pagina's eerst.
 * 3. INLADEN — alle pagina's worden in parallelle batches opgehaald via directe
 *    fetch (snel, schaalt naar 100+ pagina's) met HTML→tekst-extractie; Jina
 *    Reader als fallback bij magere output. Caps op concurrency, wandklok,
 *    paginatal, per-pagina-tekens én totale corpusgrootte beschermen de
 *    120s-functielimiet en het 64k-context-venster van DeepSeek.
 * 4. EXTERNE SIGNALEN — Serper.dev thematische Google-queries (optioneel).
 *
 * Alle bronnen zijn graceful: geen key/geen bereikbaarheid = lege output, geen throw.
 */

import type { ReportLocale } from './locale';

export interface SearchResult {
  title: string;
  snippet: string;
  link: string;
}

/** Eén ingeladen pagina van de bedrijfssite. */
export interface ScrapedPage {
  url: string;
  /** Strategisch label, bv. "Expertise / Diensten" of "Referenties / Track record". */
  label: string;
  content: string;
}

/** Een thematische zoekopdracht met de gevonden externe signalen. */
export interface SearchTheme {
  theme: string;
  query: string;
  results: SearchResult[];
}

/** Welk type marktpartij — bepaalt welke thema's prioriteit krijgen. */
export type SectorProfile = 'private-equity' | 'ma-advisory' | 'dga' | 'financiering' | 'algemeen';

export interface ResearchFindings {
  /** Ingeladen pagina's (strategisch geordend, homepage eerst). */
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
  /** Hoeveel unieke URL's ontdekt zijn (sitemap of linkextractie). */
  pagesDiscovered: number;
  /** Hoeveel pagina's daadwerkelijk met inhoud zijn ingeladen. */
  pagesScraped: number;
  /** Hoe de URL's ontdekt zijn. */
  discoverySource: 'sitemap' | 'homepage-links' | 'none';
}

// ── Crawl-budgetten ──────────────────────────────────────────────────────────
// Afgestemd op de 120s maxDuration van /api/generate-report en het 64k-token
// (≈260k tekens) context-venster van DeepSeek. We laten ruim marge voor prompt,
// scorecard-antwoorden en het JSON-output-budget.

const CRAWL = {
  /** Max pagina's dat we ophalen (na prioritering). */
  maxPages: 120,
  /** Gelijktijdige fetches per batch. */
  concurrency: 12,
  /** Harde wandklok-deadline voor de gehele crawl (ms). */
  wallClockMs: 70_000,
  /** Per-pagina time-out (ms). */
  pageTimeoutMs: 12_000,
  /** Fallback tekens-cap als een categorie er geen opgeeft. */
  charsDefault: 1400,
  /** Totale corpus-cap (tekens) — stopt met toevoegen zodra bereikt. */
  corpusCharBudget: 160_000,
} as const;

/** ISO 639-1 taalcodes voor het herkennen van locale-prefixen in paden. */
const LANG_CODE =
  /^(en|de|fr|es|it|pt|nl|pl|da|sv|no|nb|fi|cs|sk|hu|ro|bg|el|tr|ru|uk|zh|ja|ko|ar|he|hi|th|vi|id)$/i;

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

/** Normaliseer naar één canonieke vorm zodat varianten van dezelfde pagina ontdubbelen. */
function canonicalize(url: string): string {
  try {
    const u = new URL(url);
    u.hash = '';
    u.hostname = u.hostname.replace(/^www\./i, ''); // www en non-www = dezelfde pagina
    let s = u.toString();
    s = s.replace(/\/$/, '');
    return s;
  } catch {
    return url;
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

// ── URL-categorisering & prioritering ────────────────────────────────────────

/**
 * Strategische pagina-categorieën met meertalige pad/anchor-keywords.
 * `prio` = sorteervolgorde (lager = belangrijker, eerder ingeladen, meer tekens).
 */
const URL_CATEGORIES: { label: string; prio: number; chars: number; keywords: RegExp }[] = [
  {
    label: 'Expertise / Diensten',
    prio: 1,
    chars: 3200,
    keywords:
      /expertise|diensten|services|leistungen|servicios|servicos|aanpak|approach|what-we-do|propositie|oplossing|solutions?/i,
  },
  {
    label: 'Team / Leiderschap',
    prio: 2,
    chars: 3000,
    keywords:
      /team|over-?ons|about|people|mensen|management|leadership|partners?|ueber-?uns|sobre|quienes|equipo|founders?|directie|bestuur/i,
  },
  {
    label: 'Sectoren / Markten',
    prio: 3,
    chars: 2600,
    keywords: /sectoren|sectors?|branches?|industries|markten|markets|vakgebied/i,
  },
  {
    label: 'Referenties / Track record',
    prio: 4,
    chars: 1500,
    keywords:
      /referentie|portfolio|participat|cases?|track.?record|deals?|transact|realisat|exits?|clients?|klanten|projecten?|companies/i,
  },
  {
    label: 'Contact / Vestiging',
    prio: 5,
    chars: 1000,
    keywords: /contact|vestiging|locaties?|kantoor|office|locations?/i,
  },
  {
    label: 'Actueel / Insights',
    prio: 6,
    chars: 900,
    keywords: /publicat|news|nieuws|insights?|blog|actueel|press|pers|noticias|aktuelles|article|kennis|whitepaper/i,
  },
];

/**
 * Bepaal categorie + prioriteit + tekens-budget voor een URL.
 * Matcht primair op het EERSTE padsegment (nauwkeurig: /referenties/quality-services
 * → Referenties, niet Expertise), met de volledige pad als fallback.
 */
function categorizeUrl(url: string, isHomepage: boolean): { label: string; prio: number; chars: number } {
  if (isHomepage) return { label: 'Homepage / Propositie', prio: 0, chars: 3500 };
  let path = '';
  try {
    path = new URL(url).pathname;
  } catch {
    /* noop */
  }
  // Strip een eventueel locale-prefix zodat /en/expertise net zo categoriseert als /expertise.
  const segments = path.split('/').filter(Boolean);
  if (segments[0] && LANG_CODE.test(segments[0])) segments.shift();
  const firstSeg = segments[0] ?? '';

  for (const cat of URL_CATEGORIES) {
    if (firstSeg && cat.keywords.test(firstSeg)) return { label: cat.label, prio: cat.prio, chars: cat.chars };
  }
  for (const cat of URL_CATEGORIES) {
    if (cat.keywords.test(path)) return { label: cat.label, prio: cat.prio, chars: cat.chars };
  }
  return { label: 'Overige pagina', prio: 9, chars: CRAWL.charsDefault };
}

/** Eerste padsegment, voor locale-detectie en ontdubbeling. */
function firstSegment(url: string): string {
  try {
    return new URL(url).pathname.split('/').filter(Boolean)[0] ?? '';
  } catch {
    return '';
  }
}

// ── Sitemap-ontdekking ───────────────────────────────────────────────────────

async function fetchText(url: string, timeoutMs: number): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AgenticMindshiftBot/1.0)' },
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) return '';
    return await res.text();
  } catch {
    return '';
  }
}

/** Trek alle <loc>-waarden uit een (sitemap-)XML-string. */
function extractLocs(xml: string): string[] {
  const out: string[] = [];
  const re = /<loc>\s*([^<\s]+)\s*<\/loc>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    if (m[1]) out.push(m[1].trim());
  }
  return out;
}

/** Lees robots.txt en haal de Sitemap:-directives eruit. */
async function sitemapsFromRobots(baseUrl: string): Promise<string[]> {
  try {
    const origin = new URL(normalizeUrl(baseUrl)).origin;
    const robots = await fetchText(`${origin}/robots.txt`, 8_000);
    if (!robots) return [];
    return robots
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => /^sitemap:/i.test(l))
      .map((l) => l.replace(/^sitemap:\s*/i, '').trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

/**
 * Ontdek alle pagina-URL's van de site via de sitemap-infrastructuur.
 * Vouwt sitemap-indexen recursief uit (één niveau diep, max enkele child-sitemaps).
 */
async function discoverViaSitemap(baseUrl: string): Promise<string[]> {
  const baseHost = hostOf(baseUrl);
  if (!baseHost) return [];
  const origin = new URL(normalizeUrl(baseUrl)).origin;

  // Kandidaat-sitemaps: robots.txt eerst, dan de conventionele paden.
  const fromRobots = await sitemapsFromRobots(baseUrl);
  const candidates = Array.from(
    new Set([...fromRobots, `${origin}/sitemap.xml`, `${origin}/sitemapindex.xml`, `${origin}/sitemap_index.xml`]),
  );

  const pageUrls = new Set<string>();
  const childSitemaps = new Set<string>();

  for (const sm of candidates) {
    if (hostOf(sm) !== baseHost) continue;
    const xml = await fetchText(sm, 10_000);
    if (!xml) continue;
    const locs = extractLocs(xml);
    const isIndex = /<sitemapindex/i.test(xml);
    for (const loc of locs) {
      if (hostOf(loc) !== baseHost) continue;
      if (isIndex || /\.xml(\?|$)/i.test(loc)) childSitemaps.add(loc);
      else pageUrls.add(loc);
    }
    if (pageUrls.size > 0) break; // directe urlset gevonden, klaar
  }

  // Vouw child-sitemaps uit (cap om misbruik te voorkomen).
  let expanded = 0;
  for (const child of childSitemaps) {
    if (expanded >= 25) break;
    expanded++;
    const xml = await fetchText(child, 10_000);
    if (!xml) continue;
    for (const loc of extractLocs(xml)) {
      if (hostOf(loc) === baseHost && !/\.xml(\?|$)/i.test(loc)) pageUrls.add(loc);
    }
  }

  return Array.from(pageUrls).map(canonicalize);
}

// ── HTML → tekst-extractie ───────────────────────────────────────────────────

const HTML_ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
  '&nbsp;': ' ',
  '&euro;': '€',
  '&eacute;': 'é',
  '&egrave;': 'è',
  '&uuml;': 'ü',
  '&ouml;': 'ö',
  '&auml;': 'ä',
  '&hellip;': '…',
  '&mdash;': '—',
  '&ndash;': '–',
  '&rsquo;': '’',
  '&lsquo;': '‘',
  '&ldquo;': '“',
  '&rdquo;': '”',
};

function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&[a-z]+;/gi, (e) => HTML_ENTITIES[e.toLowerCase()] ?? e);
}

/**
 * Zet ruwe HTML om naar schone, leesbare tekst:
 * verwijdert script/style/nav/footer-ruis, behoudt de body-tekst, dedupliceert
 * whitespace. Bewust lichtgewicht — geen DOM-parser nodig voor crawl-schaal.
 */
function stripHtml(html: string): string {
  let s = html;
  // Verwijder hele non-content blokken inclusief inhoud.
  s = s.replace(/<!--[\s\S]*?-->/g, ' ');
  s = s.replace(/<(script|style|noscript|svg|head)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ');
  s = s.replace(/<(nav|footer|header|form)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ');
  // Blok-elementen → newlines zodat structuur (koppen, paragrafen) behouden blijft.
  s = s.replace(/<\/(p|div|section|article|li|h[1-6]|tr|br|td)>/gi, '\n');
  s = s.replace(/<br\s*\/?>/gi, '\n');
  // Resterende tags strippen.
  s = s.replace(/<[^>]+>/g, ' ');
  s = decodeEntities(s);
  // Whitespace normaliseren. [^\S\n] vangt élke horizontale witruimte behalve
  // newline — inclusief non-breaking spaces ( ) en zero-width tekens die
  // anders lege regels in stand houden en de collapse blokkeren.
  s = s
    .replace(/[ ​‌‍﻿]/g, ' ')
    .replace(/[^\S\n]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return s;
}

// ── Pagina-inladen (direct + Jina-fallback) ──────────────────────────────────

/**
 * Laad één pagina in via directe fetch + HTML→tekst. Bij magere output (JS-heavy
 * SPA, blokkade) valt het terug op Jina Reader voor schone markdown.
 */
async function loadPage(url: string, maxChars: number): Promise<string> {
  const normalized = normalizeUrl(url);

  // 1. Directe fetch (snel, schaalt).
  const html = await fetchText(normalized, CRAWL.pageTimeoutMs);
  if (html) {
    const text = stripHtml(html);
    if (text.length >= 200) {
      return text.length > maxChars ? `${text.slice(0, maxChars)}\n[… ingekort]` : text;
    }
  }

  // 2. Jina-fallback (trager, robuuster voor SPA's).
  const jina = await scrapeViaJina(normalized, maxChars);
  return jina;
}

/** Scrape één URL via Jina Reader. Returns schone markdown (truncated). */
async function scrapeViaJina(url: string, maxChars: number): Promise<string> {
  try {
    const headers: Record<string, string> = { Accept: 'text/plain', 'X-Return-Format': 'markdown' };
    if (process.env.JINA_API_KEY) headers.Authorization = `Bearer ${process.env.JINA_API_KEY}`;
    const response = await fetch(`https://r.jina.ai/${normalizeUrl(url)}`, {
      method: 'GET',
      headers,
      signal: AbortSignal.timeout(25_000),
    });
    if (!response.ok) return '';
    const text = await response.text();
    return text.length > maxChars ? `${text.slice(0, maxChars)}\n[… ingekort]` : text;
  } catch {
    return '';
  }
}

/**
 * Verwijder gedeelde boilerplate (navigatiemenu, footer-CTA) die op vrijwel
 * elke pagina identiek terugkomt. Bepaalt de langste gedeelde begin- en
 * eindregel-sequentie over de pagina's en strips die. Bespaart fors aan tokens
 * en levert een schoner corpus voor de analyse. Muteert de content in-place.
 */
function stripCommonBoilerplate(pages: { content: string }[]): void {
  if (pages.length < 4) return;
  const docs = pages.map((p) => p.content.split('\n'));

  const commonRun = (idxAt: (lines: string[], k: number) => string | undefined): number => {
    let run = 0;
    const MAX = 60;
    for (let k = 0; k < MAX; k++) {
      const counts = new Map<string, number>();
      let present = 0;
      for (const lines of docs) {
        const line = idxAt(lines, k);
        if (line === undefined) continue;
        present++;
        counts.set(line, (counts.get(line) ?? 0) + 1);
      }
      if (present < docs.length * 0.5) break;
      let bestCount = 0;
      for (const v of counts.values()) if (v > bestCount) bestCount = v;
      // De regel op deze positie moet door de meerderheid gedeeld worden om boilerplate te zijn.
      if (bestCount >= docs.length * 0.6) run = k + 1;
      else break;
    }
    return run;
  };

  const lead = commonRun((lines, k) => lines[k]);
  const tail = commonRun((lines, k) => lines[lines.length - 1 - k]);

  if (lead === 0 && tail === 0) return;
  pages.forEach((p, i) => {
    const lines = docs[i]!;
    const sliced = lines.slice(lead, tail > 0 ? lines.length - tail : undefined);
    p.content = sliced.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  });
}

/** Voer async taken uit met een vaste concurrency-limiet. */
async function runWithConcurrency<T, R>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  async function pump(): Promise<void> {
    while (cursor < items.length) {
      const i = cursor++;
      results[i] = await worker(items[i]!, i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => pump()));
  return results;
}

// ── Homepage-link fallback (geen sitemap) ────────────────────────────────────

/** Extraheer same-domain links uit ruwe homepage-HTML (fallback zonder sitemap). */
function linksFromHtml(html: string, baseUrl: string): string[] {
  const baseHost = hostOf(baseUrl);
  if (!baseHost) return [];
  const origin = new URL(normalizeUrl(baseUrl)).origin;
  const re = /href\s*=\s*["']([^"'#]+)["']/gi;
  const out = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    let href = m[1]!.trim();
    if (!href || /^(mailto:|tel:|javascript:)/i.test(href)) continue;
    try {
      const abs = href.startsWith('http') ? href : new URL(href, origin).toString();
      if (hostOf(abs) !== baseHost) continue;
      if (/\.(pdf|jpe?g|png|gif|svg|webp|zip|docx?|xlsx?|mp4|ico|css|js)(\?|$)/i.test(abs)) continue;
      out.add(canonicalize(abs));
    } catch {
      /* noop */
    }
  }
  return Array.from(out);
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
      headers: { 'X-API-KEY': process.env.SERPER_API_KEY!, 'Content-Type': 'application/json' },
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
  } catch {
    return [];
  }
}

function buildSearchThemes(company: string, sector: SectorProfile): { theme: string; query: string }[] {
  const q = `"${company}"`;
  const themes: { theme: string; query: string }[] = [];
  if (sector === 'private-equity') {
    themes.push({ theme: 'Deal-activiteit & track record', query: `${q} (acquisition OR investment OR exit OR portfolio OR fund)` });
    themes.push({ theme: 'Fonds & kapitaal', query: `${q} (AUM OR "assets under management" OR fund size OR "nieuw fonds")` });
  } else if (sector === 'ma-advisory') {
    themes.push({ theme: 'Mandaten & transacties', query: `${q} (overname OR fusie OR transaction OR "advised on" OR deal)` });
  } else {
    themes.push({ theme: 'Recente ontwikkelingen', query: `${q} (overname OR investering OR groei OR expansie OR nieuws)` });
  }
  themes.push({ theme: 'Leiderschap & stakeholders', query: `${q} (managing partner OR directie OR CEO OR founder OR board)` });
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

  let pages: ScrapedPage[] = [];
  let pagesDiscovered = 0;
  let discoverySource: ResearchFindings['discoverySource'] = 'none';

  if (website) {
    const baseHost = hostOf(primaryUrl);
    const homeCanon = canonicalize(primaryUrl);

    // 1. ONTDEKKING — sitemap eerst, dan homepage-links als fallback.
    let urls = await discoverViaSitemap(primaryUrl);
    if (urls.length > 0) {
      discoverySource = 'sitemap';
    } else {
      const homeHtml = await fetchText(primaryUrl, CRAWL.pageTimeoutMs);
      if (homeHtml) {
        urls = linksFromHtml(homeHtml, primaryUrl);
        discoverySource = urls.length > 0 ? 'homepage-links' : 'none';
      }
    }

    // Zorg dat de homepage altijd meedoet en vooraan staat.
    const urlSet = new Set(urls.map(canonicalize));
    urlSet.delete(homeCanon);
    let allUrls = [homeCanon, ...urlSet].filter((u) => hostOf(u) === baseHost);

    // Ontdubbel locale-varianten: als er niet-geprefixte pagina's bestaan, laat
    // de vertaalde duplicaten (/en/…, /de/…) vallen zodat we het budget niet aan
    // dezelfde content in een andere taal verspillen.
    const hasBarePages = allUrls.some((u) => !LANG_CODE.test(firstSegment(u)));
    if (hasBarePages) {
      allUrls = allUrls.filter((u) => canonicalize(u) === homeCanon || !LANG_CODE.test(firstSegment(u)));
    }
    pagesDiscovered = allUrls.length;

    // 2. PRIORITERING — categoriseer, sorteer (strategisch eerst), cap op maxPages.
    const categorized = allUrls.map((u) => {
      const isHome = canonicalize(u) === homeCanon;
      return { url: u, ...categorizeUrl(u, isHome) };
    });
    // Stabiele sort op prio; binnen een categorie behoudt de sitemap-volgorde
    // (doorgaans meest recente publicaties eerst).
    categorized.sort((a, b) => a.prio - b.prio);
    const selected = categorized.slice(0, CRAWL.maxPages);

    // 3. INLADEN — parallelle batches met wandklok-deadline. Laad ruim in
    // (absolute veiligheidscap) zodat boilerplate-stripping daarna nog
    // genoeg echte content overhoudt vóór de categorie-truncatie.
    const deadline = Date.now() + CRAWL.wallClockMs;
    const loaded = await runWithConcurrency(selected, CRAWL.concurrency, async (item) => {
      if (Date.now() > deadline) return null;
      const content = await loadPage(item.url, 12_000);
      if (!content || content.length < 80) return null;
      return { url: item.url, label: item.label, chars: item.chars, content };
    });
    const valid = loaded.filter((p): p is NonNullable<typeof p> => p !== null);

    // 4. SCHONEN — strip gedeeld navigatie-/footer-boilerplate over alle pagina's.
    stripCommonBoilerplate(valid);

    // 5. TRUNCEREN + CORPUS-BUDGET — categorie-cap per pagina, dan totale cap.
    let budget = CRAWL.corpusCharBudget;
    for (const p of valid) {
      if (budget <= 0) break;
      if (p.content.length < 80) continue;
      let content = p.content.length > p.chars ? `${p.content.slice(0, p.chars)}\n[… ingekort]` : p.content;
      if (content.length > budget) content = `${content.slice(0, budget)}\n[… corpuslimiet]`;
      pages.push({ url: p.url, label: p.label, content });
      budget -= content.length;
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
    pagesDiscovered,
    pagesScraped: pages.length,
    discoverySource,
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
 * analyse-opdracht. De volledige site-corpus wordt meegegeven.
 */
export function formatResearchForPrompt(findings: ResearchFindings): string {
  const sections: string[] = [];

  sections.push(`INGESCHAT PROFIEL VAN DE PARTIJ: ${SECTOR_LABEL[findings.sector]}.`, '');

  if (findings.scrapeSuccess && findings.pages.length > 0) {
    sections.push(
      `=== VOLLEDIGE SITE-CRAWL ===`,
      `Bron-URL: ${findings.primaryUrl}`,
      `Ontdekking: ${findings.discoverySource} — ${findings.pagesDiscovered} pagina's gevonden, ${findings.pagesScraped} volledig ingeladen.`,
      `Hieronder de complete ingeladen inhoud van de bedrijfssite, strategisch geordend.`,
    );
    for (const page of findings.pages) {
      sections.push('', `--- [${page.label}] ${page.url} ---`, page.content);
    }
    sections.push(
      '',
      `=== EINDE SITE-CRAWL ===`,
      '',
      'STRATEGISCHE ANALYSE-OPDRACHT op basis van de VOLLEDIGE site-inhoud hierboven. Werk ALLE punten expliciet uit — dit is geen optionele samenvatting:',
      '1. KERNPROPOSITIE & BUSINESSMODEL: identificeer de sub-sector(en) en hoe ze geld verdienen — gebruik de hele site, niet alleen de homepage.',
      '2. DIENSTEN-ANALYSE (verplicht): inventariseer ELKE dienst/expertise die ze aanbieden (uit de [Expertise / Diensten]- en [Sectoren / Markten]-pagina\'s). Beschrijf per dienst kort: wat het inhoudt, welk type werk en welke menselijke uren erachter zitten, en — cruciaal — waar AI/automatisering de economie van juist díe dienst verandert (bv. due diligence, waardebepaling, sourcing/screening, dossier-/datawerk, rapportage). Benoem welke diensten het meest blootgesteld zijn en welke het minst.',
      '3. TEAM-ANALYSE (verplicht): breng de teamsamenstelling in kaart uit de [Team / Leiderschap]-pagina — omvang, senioriteitsmix (partners vs. consultants vs. associates), rollen en specialismen, en wie de beslissers/stakeholders zijn. Leid hieruit af waar de menselijke capaciteit zit, welke rollen het meest tijd kwijt zijn aan werk dat AI kan versterken, en wat dit betekent voor schaalbaarheid en kennisborging.',
      '4. TRACK RECORD: bij een PE-/M&A-/restructuring-partij — extraheer concrete referenties/deals, deal-types, sectoren en exits uit ALLE [Referenties]-pagina\'s.',
      '5. DENKRICHTING: analyseer de publicaties/insights — welke thema\'s, expertise en visie komen herhaaldelijk terug? Dit toont waar de organisatie inhoudelijk op stuurt en hoe volwassen hun denken is.',
      '6. DIGITALE/AI-VOLWASSENHEID: spot expliciete én impliciete digitaliserings-/AI-/datasignalen — of juist het ontbreken daarvan over de hele site.',
      '7. KOPPELING: verbind elke observatie aan de scorecard-antwoorden — waar versterken ze elkaar, waar spreken ze elkaar tegen? Een hoog due-diligence-profiel met lage AI Readiness is een concrete strategische spanning — benoem die.',
      'VERZIN NIETS. Gebruik uitsluitend diensten, teamleden, deals en uitspraken die daadwerkelijk in de ingeladen tekst staan.',
    );
  } else if (findings.scrapeAttempted) {
    sections.push(
      `(Bedrijfswebsite ${findings.primaryUrl} kon niet worden gecrawld — baseer je op de antwoorden, het ingeschatte profiel en sector-kennis.)`,
    );
  }

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
