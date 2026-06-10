/**
 * Vaste UI-teksten (chrome) voor de PDF, per taal.
 * De door DeepSeek gegenereerde inhoud staat al in de doeltaal; dit dekt de
 * sectiekoppen, labels, roadmap-fasen en colofon.
 */

import type { ReportLocale } from '@/lib/report/locale';

export interface PdfStrings {
  // Cover
  coverEyebrow: string;
  profileFallback: string;
  preparedFor: (name: string) => string;
  execSummary: string;
  totalScore: string;
  outOf75: string;
  belowMedian: string;
  dimensions: string;
  urgency: string;
  track: string;
  weakestDims: string;
  strongestDims: string;
  percentileNote: (p: number) => string;
  // Route (AM/Factum) page
  routeEyebrow: string;
  routeTitle: (firstName: string) => string;
  routeIntro: string;
  routeLadderLabel: string;
  routeActiveBadge: string;
  routeRecommended: string;
  routeWhatYouGet: string;
  routePriceLabel: string;
  routeFactumLabel: string;
  routeFactumNote: string;
  // Score overview
  scoreOverview: string;
  scoreOverviewTitle: string;
  scoreOverviewIntro: (peer: number) => string;
  belowPeerMedian: string;
  atOrAboveMedian: string;
  peerMedianLegend: (peer: number) => string;
  profileExplanation: string;
  // Critical
  criticalEyebrow: string;
  criticalTitle: string;
  criticalIntro: string;
  criticalPill: string;
  quickWinActionable: string;
  noCritical: string;
  attentionAlsoLabel: string;
  // Attention
  attentionEyebrow: string;
  attentionTitle: string;
  attentionIntro: string;
  attentionPill: string;
  quickWin: string;
  noAttention: string;
  // Strong
  strongEyebrow: string;
  strongTitle: string;
  strongIntro: string;
  strongEyebrowAlt: string;
  strongTitleAlt: string;
  strongIntroAlt: string;
  anchoring: string;
  noStrong: string;
  // Company profile
  companyEyebrow: string;
  companyTitle: (company: string) => string;
  companyIntro: string;
  sector: string;
  profile: string;
  keyActivities: string;
  researchFindings: string;
  noWebsite: string;
  urgencyExplanation: string;
  // Services & Team
  servicesEyebrow: string;
  servicesTitle: string;
  servicesIntro: string;
  servicesExposureHigh: string;
  servicesExposureMedium: string;
  servicesExposureLow: string;
  servicesAiLabel: string;
  teamSectionTitle: string;
  teamImplicationLabel: string;
  // Insights
  insightsEyebrow: string;
  insightsTitle: string;
  insightsIntro: string;
  // Q&A
  qaEyebrow: string;
  qaTitle: string;
  qaIntro: string;
  sectionLabel: (n: number, title: string) => string;
  sectionTitles: Record<number, string>;
  // Recommendation
  recEyebrow: string;
  recTitle: (firstName: string) => string;
  recommendedTrack: string;
  expectedOutcome: string;
  firstStep: string;
  whyTrack: string;
  yourScore: string;
  attentionRequired: string;
  dimAbbrev: string;
  ctaTitle: string;
  ctaContact: string;
  ctaBody: string;
  // Roadmap
  roadmapEyebrow: string;
  roadmapTitle: (firstName: string) => string;
  roadmapIntro: string;
  phase: string;
  phase1Days: string;
  phase1Title: string;
  phase2Days: string;
  phase2Title: string;
  phase3Days: string;
  phase3Title: string;
  pilotEval: string;
  phase3Anchor: (dims: string) => string;
  phase3Workflow: string;
  phase3Remeasure: string;
  // Colophon
  colophonEyebrow: string;
  colophonTitle: string;
  about1: string;
  about2: string;
  about3: string;
  founder: string;
  founderRole: string;
  contact: string;
  registration: string;
  city: string;
  finalCtaTitle: string;
  finalCtaBody: string;
  confidential: (name: string, company: string) => string;
  generatedBy: (model: string, date: string) => string;
  // Helpers
  priorityCritical: string;
  priorityAttention: string;
  priorityAdequate: string;
  priorityStrong: string;
  urgencyHigh: string;
  urgencyMedium: string;
  urgencyLow: string;
  footerConfidential: string;
  footerPage: (page: number, total: number) => string;
}

const nl: PdfStrings = {
  coverEyebrow: 'AI Readiness Scorecard',
  profileFallback: 'AI Readiness Profiel',
  preparedFor: (n) => `Opgesteld voor ${n}`,
  execSummary: 'Executive Summary',
  totalScore: 'Totaalscore',
  outOf75: 'van 75 punten',
  belowMedian: 'Onder mediaan',
  dimensions: 'dimensies',
  urgency: 'Urgentie',
  track: 'Traject',
  weakestDims: 'Zwakste dimensies',
  strongestDims: 'Sterkste dimensies',
  percentileNote: (p) => `Sterker dan ${p}% van vergelijkbare partijen`,
  routeEyebrow: 'Uw route · Agentic Mindshift',
  routeTitle: (n) => `Zo zetten we dit om in resultaat, ${n}`,
  routeIntro:
    'Uw scorecard wijst rechtstreeks naar één van onze vier routes. Hieronder ziet u waar u staat, welke route het beste past en wat die concreet oplevert — met transparante tarieven.',
  routeLadderLabel: 'De vier routes',
  routeActiveBadge: 'PAST BIJ U',
  routeRecommended: 'Aanbevolen op basis van uw scorecard',
  routeWhatYouGet: 'Wat dit concreet oplevert',
  routePriceLabel: 'Investering',
  routeFactumLabel: 'Powered by Factum Capital',
  routeFactumNote:
    'De due-diligence- en portfolio-routes draaien op Factum Capital — ons AI-analyseplatform dat het analytisch fundament levert. Agentic Mindshift verzorgt de dienst en, waar vereist, de gecertificeerde sign-off.',
  scoreOverview: 'Scoreoverzicht',
  scoreOverviewTitle: 'Uw profiel vs. peer-mediaan',
  scoreOverviewIntro: (peer) =>
    `Elke dimensie afgezet tegen de mediaan van vergelijkbare partijen in het Europese mid-market (private equity, M&A, corporate finance). De peer-mediaan staat op ${peer}/100. Rood = onder mediaan.`,
  belowPeerMedian: 'Onder peer-mediaan',
  atOrAboveMedian: 'Op / boven mediaan',
  peerMedianLegend: (peer) => `Peer-mediaan (${peer})`,
  profileExplanation: 'Profielduidering',
  criticalEyebrow: 'Diepteanalyse · Kritieke aandachtspunten',
  criticalTitle: 'Waar actie het meest urgent is',
  criticalIntro:
    "De dimensies met prioriteit 'Kritiek' vragen directe aandacht. Ze liggen het verst onder de peer-mediaan en vormen de grootste rem op uw analytische kwaliteit.",
  criticalPill: ' Kritiek',
  quickWinActionable: 'Direct uitvoerbare quick win',
  noCritical: 'Geen dimensies met kritieke prioriteit gevonden op basis van uw scorecard.',
  attentionAlsoLabel: 'Vraagt ook aandacht',
  attentionEyebrow: 'Diepteanalyse · Verbeterpotentieel',
  attentionTitle: 'Dimensies met ruimte voor verbetering',
  attentionIntro:
    "De dimensies met prioriteit 'Aandacht' liggen onder de peer-mediaan maar zijn niet acuut. Met gerichte actie kunnen zij snel op niveau worden gebracht.",
  attentionPill: ' Aandacht',
  quickWin: 'Quick win',
  noAttention: 'Geen dimensies met aandachtsprioriteit gevonden.',
  strongEyebrow: 'Diepteanalyse · Sterke punten',
  strongTitle: 'Wat u goed doet',
  strongIntro:
    'Deze dimensies scoren voldoende of sterk. Ze vormen uw operationele fundament en moeten worden geborgd bij AI-implementatie. Bouwen op sterkte is minstens zo strategisch als het repareren van zwaktes.',
  strongEyebrowAlt: 'Diepteanalyse · Kerninzichten',
  strongTitleAlt: 'Wat dit voor u betekent',
  strongIntroAlt:
    'Geen enkele dimensie scoort nog boven de peer-mediaan — dat betekent dat hier juist de grootste winst ligt. Deze observaties verbinden uw scores direct aan concrete bedrijfsrisico’s en kansen.',
  anchoring: 'Verankering',
  noStrong:
    "Elke dimensie valt in de categorie 'Aandacht' of 'Kritiek' — zie vorige pagina's voor de aanbevelingen.",
  companyEyebrow: 'Bedrijfsprofiel',
  companyTitle: (c) => `Onze kijk op ${c}`,
  companyIntro:
    'Dit profiel is opgesteld op basis van publiek beschikbare informatie (website, persberichten, sectordata) en uw eigen context. Het vormt de basis voor de bedrijfsspecifieke duiding in dit rapport.',
  sector: 'Sector',
  profile: 'Profiel',
  keyActivities: 'Kernactiviteiten',
  researchFindings: 'Bevindingen uit online onderzoek',
  noWebsite:
    'Geen website opgegeven. Vul bij een volgend traject de bedrijfswebsite in voor een specifiek bedrijfsprofiel gebaseerd op actuele online informatie.',
  urgencyExplanation: 'Urgentieverklaring',
  servicesEyebrow: 'Diensten × AI-kansen',
  servicesTitle: 'Waar AI uw diensten raakt',
  servicesIntro: 'Per dienst die u aanbiedt: waar AI en automatisering de economie van juist díe dienst veranderen — versnellen, verbreden of goedkoper maken.',
  servicesExposureHigh: 'Hoge impact',
  servicesExposureMedium: 'Gemiddelde impact',
  servicesExposureLow: 'Lage impact',
  servicesAiLabel: 'AI-kans',
  teamSectionTitle: 'Teamopbouw',
  teamImplicationLabel: 'Wat dit betekent',
  insightsEyebrow: 'Kernobservaties',
  insightsTitle: 'Wat dit rapport ziet dat anderen missen',
  insightsIntro:
    'De vijf strategisch meest relevante observaties, specifiek voor uw situatie en sector. Elk inzicht is direct gekoppeld aan uw scorecard-antwoorden en online bedrijfsprofiel.',
  qaEyebrow: 'Scorecard resultaten',
  qaTitle: 'Vraag & Antwoord overzicht',
  qaIntro:
    'Uw antwoorden op de 15 scorecard-vragen. De analyse in dit rapport is volledig op deze input gebaseerd — aangevuld met extern onderzoek per bedrijf.',
  sectionLabel: (n, t) => `Sectie ${n}: ${t}`,
  sectionTitles: {
    1: 'Uw analytische aanpak vandaag',
    2: 'Deal- en analysecyclus',
    3: 'Portefeuille, financiering en monitoring',
    4: 'Team en kennisbeheer',
  },
  recEyebrow: 'Aanbeveling',
  recTitle: (f) => `Het meest passende traject voor ${f}`,
  recommendedTrack: 'Aanbevolen traject',
  expectedOutcome: 'Verwacht resultaat',
  firstStep: 'Eerste concrete stap',
  whyTrack: 'Waarom dit traject',
  yourScore: 'Uw score',
  attentionRequired: 'Aandacht vereist',
  dimAbbrev: 'dim.',
  ctaTitle: 'Volgende stap: 20 minuten sparring',
  ctaContact: 'cal.com/wwdijkman/intake-call · wouter@agenticmindshift.nl',
  ctaBody: 'Geen verkoopgesprek — een concrete toets of dit traject aansluit op uw situatie.',
  roadmapEyebrow: 'Implementatieplan',
  roadmapTitle: (f) => `90-dagen roadmap voor ${f}`,
  roadmapIntro:
    'Een concrete roadmap op basis van uw scorecard-profiel. Gefaseerd, zodat elke stap voortbouwt op de vorige — zonder de organisatie te overbelasten.',
  phase: 'FASE',
  phase1Days: 'Dag 1–30',
  phase1Title: 'Fundering leggen',
  phase2Days: 'Dag 31–60',
  phase2Title: 'Processen optimaliseren',
  phase3Days: 'Dag 61–90',
  phase3Title: 'Structureel verankeren',
  pilotEval:
    'Pilot-evaluatie na 60 dagen: meten wat werkt en bijsturen op basis van eerste resultaten in de praktijk.',
  phase3Anchor: (d) =>
    `Sterke dimensies (${d}) als fundament borgen en documenteren voor het volledige team.`,
  phase3Workflow:
    'AI-workflow geïntegreerd in de dagelijkse dossiervoorbereiding — niet als experiment, maar als standaard werkwijze.',
  phase3Remeasure:
    'Opnieuw meten: herhaal de AI Readiness Scorecard na 90 dagen en vergelijk met dit rapport.',
  colophonEyebrow: 'Over de opsteller',
  colophonTitle: 'Agentic Mindshift Consultancy',
  about1:
    'Agentic Mindshift helpt mid-market private equity fondsen, M&A-adviseurs en corporate financiers om AI structureel te benutten in hun analytische processen — van deal-screening tot portefeuillemonitoring.',
  about2:
    'We werken uitsluitend in het segment waar het ertoe doet: complexe dossiers, hoge stakes, en een team dat al excellent is maar meer wil bereiken met dezelfde capaciteit.',
  about3:
    'Onze aanpak is pragmatisch: geen frameworks, geen PowerPoint-trajecten. Wij implementeren AI daar waar het direct resultaat geeft — in uw dossiers, uw modellen, uw processen.',
  founder: 'Oprichter',
  founderRole: 'Fractional AI Officer',
  contact: 'Contact',
  registration: 'Registratie',
  city: 'Amsterdam',
  finalCtaTitle: 'Dit rapport is uw startpunt — geen eindpunt',
  finalCtaBody:
    'Plan een gratis 20-minuten sessie om te bepalen of en hoe dit traject concreet voor uw organisatie werkt.',
  confidential: (n, c) =>
    `Dit rapport is vertrouwelijk en uitsluitend bestemd voor ${n} bij ${c}. Niet voor verdere verspreiding zonder schriftelijke toestemming van Agentic Mindshift Consultancy.`,
  generatedBy: (m, d) =>
    `Gegenereerd door ${m} op ${d}, op basis van scorecard-antwoorden en publiek beschikbare bedrijfsinformatie. Agentic Mindshift Consultancy · KvK 99495945 · agenticmindshift.nl`,
  priorityCritical: 'Kritiek',
  priorityAttention: 'Aandacht',
  priorityAdequate: '○ Voldoende',
  priorityStrong: '✓ Sterk',
  urgencyHigh: 'Hoog',
  urgencyMedium: 'Gemiddeld',
  urgencyLow: 'Laag',
  footerConfidential: 'Agentic Mindshift · Vertrouwelijk',
  footerPage: (p, t) => `agenticmindshift.nl · ${p} van ${t}`,
};

const en: PdfStrings = {
  coverEyebrow: 'AI Readiness Scorecard',
  profileFallback: 'AI Readiness Profile',
  preparedFor: (n) => `Prepared for ${n}`,
  execSummary: 'Executive Summary',
  totalScore: 'Total score',
  outOf75: 'out of 75 points',
  belowMedian: 'Below median',
  dimensions: 'dimensions',
  urgency: 'Urgency',
  track: 'Track',
  weakestDims: 'Weakest dimensions',
  strongestDims: 'Strongest dimensions',
  percentileNote: (p) => `Stronger than ${p}% of comparable firms`,
  routeEyebrow: 'Your route · Agentic Mindshift',
  routeTitle: (n) => `How we turn this into results, ${n}`,
  routeIntro:
    'Your scorecard points directly to one of our four routes. Below you see where you stand, which route fits best and what it concretely delivers — with transparent pricing.',
  routeLadderLabel: 'The four routes',
  routeActiveBadge: 'YOUR FIT',
  routeRecommended: 'Recommended based on your scorecard',
  routeWhatYouGet: 'What this concretely delivers',
  routePriceLabel: 'Investment',
  routeFactumLabel: 'Powered by Factum Capital',
  routeFactumNote:
    'The due-diligence and portfolio routes run on Factum Capital — our AI analysis platform that provides the analytical foundation. Agentic Mindshift delivers the service and, where required, the certified sign-off.',
  scoreOverview: 'Score overview',
  scoreOverviewTitle: 'Your profile vs. peer median',
  scoreOverviewIntro: (peer) =>
    `Each dimension set against the median of comparable players in the European mid-market (private equity, M&A, corporate finance). The peer median sits at ${peer}/100. Red = below median.`,
  belowPeerMedian: 'Below peer median',
  atOrAboveMedian: 'At / above median',
  peerMedianLegend: (peer) => `Peer median (${peer})`,
  profileExplanation: 'Profile interpretation',
  criticalEyebrow: 'Deep analysis · Critical priorities',
  criticalTitle: 'Where action is most urgent',
  criticalIntro:
    "The dimensions marked 'Critical' require immediate attention. They sit furthest below the peer median and form the biggest drag on your analytical quality.",
  criticalPill: ' Critical',
  quickWinActionable: 'Immediately actionable quick win',
  noCritical: 'No dimensions with critical priority were found based on your scorecard.',
  attentionAlsoLabel: 'Also needs attention',
  attentionEyebrow: 'Deep analysis · Improvement potential',
  attentionTitle: 'Dimensions with room for improvement',
  attentionIntro:
    "The dimensions marked 'Attention' sit below the peer median but are not acute. With targeted action they can quickly be brought up to level.",
  attentionPill: ' Attention',
  quickWin: 'Quick win',
  noAttention: 'No dimensions with attention priority were found.',
  strongEyebrow: 'Deep analysis · Strengths',
  strongTitle: 'What you do well',
  strongIntro:
    'These dimensions score adequate or strong. They form your operational foundation and must be safeguarded during AI implementation. Building on strength is at least as strategic as fixing weaknesses.',
  strongEyebrowAlt: 'Deep analysis · Key insights',
  strongTitleAlt: 'What this means for you',
  strongIntroAlt:
    'No dimension scores above the peer median yet — which means this is exactly where the biggest gains are. These observations connect your scores directly to concrete business risks and opportunities.',
  anchoring: 'Anchoring',
  noStrong:
    "Every dimension falls into the 'Attention' or 'Critical' category — see the previous pages for the recommendations.",
  companyEyebrow: 'Company profile',
  companyTitle: (c) => `Our view of ${c}`,
  companyIntro:
    'This profile is based on publicly available information (website, press releases, sector data) and your own context. It forms the basis for the company-specific interpretation in this report.',
  sector: 'Sector',
  profile: 'Profile',
  keyActivities: 'Core activities',
  researchFindings: 'Findings from online research',
  noWebsite:
    'No website provided. For a future engagement, enter the company website for a specific company profile based on current online information.',
  urgencyExplanation: 'Urgency rationale',
  servicesEyebrow: 'Services × AI opportunities',
  servicesTitle: 'Where AI touches your services',
  servicesIntro: 'For each service you offer: where AI and automation change the economics of that specific service — accelerating, broadening or lowering its cost.',
  servicesExposureHigh: 'High impact',
  servicesExposureMedium: 'Medium impact',
  servicesExposureLow: 'Low impact',
  servicesAiLabel: 'AI opportunity',
  teamSectionTitle: 'Team composition',
  teamImplicationLabel: 'What this means',
  insightsEyebrow: 'Key observations',
  insightsTitle: 'What this report sees that others miss',
  insightsIntro:
    'The five strategically most relevant observations, specific to your situation and sector. Each insight is directly linked to your scorecard answers and online company profile.',
  qaEyebrow: 'Scorecard results',
  qaTitle: 'Question & Answer overview',
  qaIntro:
    'Your answers to the 15 scorecard questions. The analysis in this report is based entirely on this input — supplemented with external research per company.',
  sectionLabel: (n, t) => `Section ${n}: ${t}`,
  sectionTitles: {
    1: 'Your analytical approach today',
    2: 'Deal and analysis cycle',
    3: 'Portfolio, financing and monitoring',
    4: 'Team and knowledge management',
  },
  recEyebrow: 'Recommendation',
  recTitle: (f) => `The most fitting track for ${f}`,
  recommendedTrack: 'Recommended track',
  expectedOutcome: 'Expected outcome',
  firstStep: 'First concrete step',
  whyTrack: 'Why this track',
  yourScore: 'Your score',
  attentionRequired: 'Attention required',
  dimAbbrev: 'dim.',
  ctaTitle: 'Next step: 20 minutes of sparring',
  ctaContact: 'cal.com/wwdijkman/intake-call · wouter@agenticmindshift.nl',
  ctaBody: 'Not a sales pitch — a concrete check of whether this track fits your situation.',
  roadmapEyebrow: 'Implementation plan',
  roadmapTitle: (f) => `90-day roadmap for ${f}`,
  roadmapIntro:
    'A concrete roadmap based on your scorecard profile. Phased, so each step builds on the previous one — without overloading the organisation.',
  phase: 'PHASE',
  phase1Days: 'Day 1–30',
  phase1Title: 'Lay the foundation',
  phase2Days: 'Day 31–60',
  phase2Title: 'Optimise processes',
  phase3Days: 'Day 61–90',
  phase3Title: 'Anchor structurally',
  pilotEval:
    'Pilot evaluation after 60 days: measure what works and adjust based on the first real-world results.',
  phase3Anchor: (d) =>
    `Safeguard and document strong dimensions (${d}) as a foundation for the entire team.`,
  phase3Workflow:
    'AI workflow integrated into daily case preparation — not as an experiment, but as standard practice.',
  phase3Remeasure:
    'Re-measure: repeat the AI Readiness Scorecard after 90 days and compare with this report.',
  colophonEyebrow: 'About the author',
  colophonTitle: 'Agentic Mindshift Consultancy',
  about1:
    'Agentic Mindshift helps mid-market private equity funds, M&A advisers and corporate financiers use AI structurally in their analytical processes — from deal screening to portfolio monitoring.',
  about2:
    'We work exclusively in the segment where it matters: complex cases, high stakes, and a team that is already excellent but wants to achieve more with the same capacity.',
  about3:
    'Our approach is pragmatic: no frameworks, no PowerPoint engagements. We implement AI where it delivers direct results — in your cases, your models, your processes.',
  founder: 'Founder',
  founderRole: 'Fractional AI Officer',
  contact: 'Contact',
  registration: 'Registration',
  city: 'Amsterdam',
  finalCtaTitle: 'This report is your starting point — not the end point',
  finalCtaBody:
    'Schedule a free 20-minute session to determine whether and how this track works concretely for your organisation.',
  confidential: (n, c) =>
    `This report is confidential and intended solely for ${n} at ${c}. Not for further distribution without written consent from Agentic Mindshift Consultancy.`,
  generatedBy: (m, d) =>
    `Generated by ${m} on ${d}, based on scorecard answers and publicly available company information. Agentic Mindshift Consultancy · KvK 99495945 · agenticmindshift.nl`,
  priorityCritical: 'Critical',
  priorityAttention: 'Attention',
  priorityAdequate: '○ Adequate',
  priorityStrong: '✓ Strong',
  urgencyHigh: 'High',
  urgencyMedium: 'Medium',
  urgencyLow: 'Low',
  footerConfidential: 'Agentic Mindshift · Confidential',
  footerPage: (p, t) => `agenticmindshift.nl · ${p} of ${t}`,
};

const de: PdfStrings = {
  coverEyebrow: 'AI-Readiness-Scorecard',
  profileFallback: 'AI-Readiness-Profil',
  preparedFor: (n) => `Erstellt für ${n}`,
  execSummary: 'Executive Summary',
  totalScore: 'Gesamtpunktzahl',
  outOf75: 'von 75 Punkten',
  belowMedian: 'Unter Median',
  dimensions: 'Dimensionen',
  urgency: 'Dringlichkeit',
  track: 'Weg',
  weakestDims: 'Schwächste Dimensionen',
  strongestDims: 'Stärkste Dimensionen',
  percentileNote: (p) => `Stärker als ${p}% vergleichbarer Häuser`,
  routeEyebrow: 'Ihr Weg · Agentic Mindshift',
  routeTitle: (n) => `So setzen wir das in Ergebnisse um, ${n}`,
  routeIntro:
    'Ihre Scorecard verweist direkt auf einen unserer vier Wege. Unten sehen Sie, wo Sie stehen, welcher Weg am besten passt und was er konkret liefert — mit transparenten Preisen.',
  routeLadderLabel: 'Die vier Wege',
  routeActiveBadge: 'PASST ZU IHNEN',
  routeRecommended: 'Empfohlen auf Basis Ihrer Scorecard',
  routeWhatYouGet: 'Was das konkret liefert',
  routePriceLabel: 'Investition',
  routeFactumLabel: 'Powered by Factum Capital',
  routeFactumNote:
    'Die Due-Diligence- und Portfolio-Wege laufen auf Factum Capital — unserer KI-Analyseplattform, die das analytische Fundament liefert. Agentic Mindshift erbringt die Leistung und, wo erforderlich, die zertifizierte Freigabe.',
  scoreOverview: 'Punkteübersicht',
  scoreOverviewTitle: 'Ihr Profil vs. Peer-Median',
  scoreOverviewIntro: (peer) =>
    `Jede Dimension im Vergleich zum Median vergleichbarer Akteure im europäischen Mid-Market (Private Equity, M&A, Corporate Finance). Der Peer-Median liegt bei ${peer}/100. Rot = unter dem Median.`,
  belowPeerMedian: 'Unter dem Peer-Median',
  atOrAboveMedian: 'Auf / über dem Median',
  peerMedianLegend: (peer) => `Peer-Median (${peer})`,
  profileExplanation: 'Profilerläuterung',
  criticalEyebrow: 'Tiefenanalyse · Kritische Schwerpunkte',
  criticalTitle: 'Wo Handeln am dringendsten ist',
  criticalIntro:
    "Die mit 'Kritisch' eingestuften Dimensionen erfordern sofortige Aufmerksamkeit. Sie liegen am weitesten unter dem Peer-Median und bremsen Ihre analytische Qualität am stärksten.",
  criticalPill: ' Kritisch',
  quickWinActionable: 'Sofort umsetzbarer Quick Win',
  noCritical: 'Auf Basis Ihrer Scorecard wurden keine Dimensionen mit kritischer Priorität gefunden.',
  attentionAlsoLabel: 'Erfordert ebenfalls Aufmerksamkeit',
  attentionEyebrow: 'Tiefenanalyse · Verbesserungspotenzial',
  attentionTitle: 'Dimensionen mit Verbesserungsspielraum',
  attentionIntro:
    "Die mit 'Aufmerksamkeit' eingestuften Dimensionen liegen unter dem Peer-Median, sind aber nicht akut. Mit gezieltem Handeln lassen sie sich schnell auf Niveau bringen.",
  attentionPill: ' Aufmerksamkeit',
  quickWin: 'Quick Win',
  noAttention: 'Keine Dimensionen mit Aufmerksamkeitspriorität gefunden.',
  strongEyebrow: 'Tiefenanalyse · Stärken',
  strongTitle: 'Was Sie gut machen',
  strongIntro:
    'Diese Dimensionen sind ausreichend oder stark. Sie bilden Ihr operatives Fundament und müssen bei der KI-Implementierung gesichert werden. Auf Stärken aufzubauen ist mindestens so strategisch wie das Beheben von Schwächen.',
  strongEyebrowAlt: 'Tiefenanalyse · Kernerkenntnisse',
  strongTitleAlt: 'Was das für Sie bedeutet',
  strongIntroAlt:
    'Noch keine Dimension liegt über dem Peer-Median — genau hier liegt also das größte Potenzial. Diese Beobachtungen verbinden Ihre Werte direkt mit konkreten Geschäftsrisiken und Chancen.',
  anchoring: 'Verankerung',
  noStrong:
    "Jede Dimension fällt in die Kategorie 'Aufmerksamkeit' oder 'Kritisch' — siehe die vorherigen Seiten für die Empfehlungen.",
  companyEyebrow: 'Unternehmensprofil',
  companyTitle: (c) => `Unsere Sicht auf ${c}`,
  companyIntro:
    'Dieses Profil basiert auf öffentlich verfügbaren Informationen (Website, Pressemitteilungen, Branchendaten) und Ihrem eigenen Kontext. Es bildet die Grundlage für die unternehmensspezifische Einordnung in diesem Bericht.',
  sector: 'Branche',
  profile: 'Profil',
  keyActivities: 'Kernaktivitäten',
  researchFindings: 'Erkenntnisse aus der Online-Recherche',
  noWebsite:
    'Keine Website angegeben. Geben Sie bei einem nächsten Vorhaben die Unternehmenswebsite an, um ein spezifisches Unternehmensprofil auf Basis aktueller Online-Informationen zu erhalten.',
  urgencyExplanation: 'Dringlichkeitsbegründung',
  servicesEyebrow: 'Leistungen × KI-Chancen',
  servicesTitle: 'Wo KI Ihre Leistungen berührt',
  servicesIntro: 'Für jede Ihrer Leistungen: wo KI und Automatisierung die Ökonomie genau dieser Leistung verändern — beschleunigen, erweitern oder verbilligen.',
  servicesExposureHigh: 'Hohe Wirkung',
  servicesExposureMedium: 'Mittlere Wirkung',
  servicesExposureLow: 'Geringe Wirkung',
  servicesAiLabel: 'KI-Chance',
  teamSectionTitle: 'Teamaufbau',
  teamImplicationLabel: 'Was das bedeutet',
  insightsEyebrow: 'Kernbeobachtungen',
  insightsTitle: 'Was dieser Bericht sieht, das andere übersehen',
  insightsIntro:
    'Die fünf strategisch relevantesten Beobachtungen, spezifisch für Ihre Situation und Branche. Jede Erkenntnis ist direkt mit Ihren Scorecard-Antworten und Ihrem Online-Unternehmensprofil verknüpft.',
  qaEyebrow: 'Scorecard-Ergebnisse',
  qaTitle: 'Frage-und-Antwort-Übersicht',
  qaIntro:
    'Ihre Antworten auf die 15 Scorecard-Fragen. Die Analyse in diesem Bericht basiert vollständig auf dieser Eingabe — ergänzt durch externe Recherche je Unternehmen.',
  sectionLabel: (n, t) => `Abschnitt ${n}: ${t}`,
  sectionTitles: {
    1: 'Ihr analytischer Ansatz heute',
    2: 'Deal- und Analysezyklus',
    3: 'Portfolio, Finanzierung und Monitoring',
    4: 'Team und Wissensmanagement',
  },
  recEyebrow: 'Empfehlung',
  recTitle: (f) => `Der passendste Weg für ${f}`,
  recommendedTrack: 'Empfohlener Weg',
  expectedOutcome: 'Erwartetes Ergebnis',
  firstStep: 'Erster konkreter Schritt',
  whyTrack: 'Warum dieser Weg',
  yourScore: 'Ihre Punktzahl',
  attentionRequired: 'Aufmerksamkeit erforderlich',
  dimAbbrev: 'Dim.',
  ctaTitle: 'Nächster Schritt: 20 Minuten Sparring',
  ctaContact: 'cal.com/wwdijkman/intake-call · wouter@agenticmindshift.nl',
  ctaBody: 'Kein Verkaufsgespräch — eine konkrete Prüfung, ob dieser Weg zu Ihrer Situation passt.',
  roadmapEyebrow: 'Umsetzungsplan',
  roadmapTitle: (f) => `90-Tage-Roadmap für ${f}`,
  roadmapIntro:
    'Eine konkrete Roadmap auf Basis Ihres Scorecard-Profils. Schrittweise, sodass jeder Schritt auf dem vorherigen aufbaut — ohne die Organisation zu überlasten.',
  phase: 'PHASE',
  phase1Days: 'Tag 1–30',
  phase1Title: 'Fundament legen',
  phase2Days: 'Tag 31–60',
  phase2Title: 'Prozesse optimieren',
  phase3Days: 'Tag 61–90',
  phase3Title: 'Strukturell verankern',
  pilotEval:
    'Pilot-Evaluation nach 60 Tagen: messen, was funktioniert, und auf Basis erster Praxisergebnisse nachsteuern.',
  phase3Anchor: (d) =>
    `Starke Dimensionen (${d}) als Fundament sichern und für das gesamte Team dokumentieren.`,
  phase3Workflow:
    'KI-Workflow in die tägliche Dossiervorbereitung integriert — nicht als Experiment, sondern als Standardvorgehen.',
  phase3Remeasure:
    'Erneut messen: Wiederholen Sie die AI-Readiness-Scorecard nach 90 Tagen und vergleichen Sie mit diesem Bericht.',
  colophonEyebrow: 'Über den Verfasser',
  colophonTitle: 'Agentic Mindshift Consultancy',
  about1:
    'Agentic Mindshift hilft Mid-Market-Private-Equity-Fonds, M&A-Beratern und Corporate Financiers, KI strukturell in ihren analytischen Prozessen zu nutzen — vom Deal-Screening bis zum Portfolio-Monitoring.',
  about2:
    'Wir arbeiten ausschließlich in dem Segment, in dem es darauf ankommt: komplexe Dossiers, hohe Einsätze und ein Team, das bereits exzellent ist, aber mit gleicher Kapazität mehr erreichen will.',
  about3:
    'Unser Ansatz ist pragmatisch: keine Frameworks, keine PowerPoint-Projekte. Wir implementieren KI dort, wo sie direkte Ergebnisse liefert — in Ihren Dossiers, Ihren Modellen, Ihren Prozessen.',
  founder: 'Gründer',
  founderRole: 'Fractional AI Officer',
  contact: 'Kontakt',
  registration: 'Registrierung',
  city: 'Amsterdam',
  finalCtaTitle: 'Dieser Bericht ist Ihr Ausgangspunkt — kein Endpunkt',
  finalCtaBody:
    'Vereinbaren Sie eine kostenlose 20-minütige Session, um zu bestimmen, ob und wie dieser Weg konkret für Ihre Organisation funktioniert.',
  confidential: (n, c) =>
    `Dieser Bericht ist vertraulich und ausschließlich für ${n} bei ${c} bestimmt. Keine Weiterverbreitung ohne schriftliche Zustimmung von Agentic Mindshift Consultancy.`,
  generatedBy: (m, d) =>
    `Erstellt von ${m} am ${d}, auf Basis der Scorecard-Antworten und öffentlich verfügbarer Unternehmensinformationen. Agentic Mindshift Consultancy · KvK 99495945 · agenticmindshift.nl`,
  priorityCritical: 'Kritisch',
  priorityAttention: 'Aufmerksamkeit',
  priorityAdequate: '○ Ausreichend',
  priorityStrong: '✓ Stark',
  urgencyHigh: 'Hoch',
  urgencyMedium: 'Mittel',
  urgencyLow: 'Niedrig',
  footerConfidential: 'Agentic Mindshift · Vertraulich',
  footerPage: (p, t) => `agenticmindshift.nl · ${p} von ${t}`,
};

const es: PdfStrings = {
  coverEyebrow: 'AI Readiness Scorecard',
  profileFallback: 'Perfil de AI Readiness',
  preparedFor: (n) => `Preparado para ${n}`,
  execSummary: 'Resumen ejecutivo',
  totalScore: 'Puntuación total',
  outOf75: 'de 75 puntos',
  belowMedian: 'Por debajo de la mediana',
  dimensions: 'dimensiones',
  urgency: 'Urgencia',
  track: 'Trayecto',
  weakestDims: 'Dimensiones más débiles',
  strongestDims: 'Dimensiones más fuertes',
  percentileNote: (p) => `Más fuerte que el ${p}% de firmas comparables`,
  routeEyebrow: 'Su ruta · Agentic Mindshift',
  routeTitle: (n) => `Así lo convertimos en resultados, ${n}`,
  routeIntro:
    'Su scorecard apunta directamente a una de nuestras cuatro rutas. A continuación verá dónde está, qué ruta encaja mejor y qué ofrece en concreto — con precios transparentes.',
  routeLadderLabel: 'Las cuatro rutas',
  routeActiveBadge: 'SU ENCAJE',
  routeRecommended: 'Recomendada según su scorecard',
  routeWhatYouGet: 'Qué ofrece en concreto',
  routePriceLabel: 'Inversión',
  routeFactumLabel: 'Impulsado por Factum Capital',
  routeFactumNote:
    'Las rutas de due diligence y portfolio funcionan sobre Factum Capital — nuestra plataforma de análisis con IA que aporta el fundamento analítico. Agentic Mindshift presta el servicio y, cuando se requiere, la firma certificada.',
  scoreOverview: 'Resumen de puntuación',
  scoreOverviewTitle: 'Su perfil frente a la mediana de pares',
  scoreOverviewIntro: (peer) =>
    `Cada dimensión comparada con la mediana de actores comparables del mid-market europeo (private equity, M&A, corporate finance). La mediana de pares se sitúa en ${peer}/100. Rojo = por debajo de la mediana.`,
  belowPeerMedian: 'Por debajo de la mediana de pares',
  atOrAboveMedian: 'En / por encima de la mediana',
  peerMedianLegend: (peer) => `Mediana de pares (${peer})`,
  profileExplanation: 'Interpretación del perfil',
  criticalEyebrow: 'Análisis en profundidad · Prioridades críticas',
  criticalTitle: 'Dónde la acción es más urgente',
  criticalIntro:
    "Las dimensiones marcadas como 'Crítico' requieren atención inmediata. Son las que más se alejan por debajo de la mediana de pares y suponen el mayor freno a su calidad analítica.",
  criticalPill: ' Crítico',
  quickWinActionable: 'Quick win de aplicación inmediata',
  noCritical: 'No se encontraron dimensiones con prioridad crítica según su scorecard.',
  attentionAlsoLabel: 'También requiere atención',
  attentionEyebrow: 'Análisis en profundidad · Potencial de mejora',
  attentionTitle: 'Dimensiones con margen de mejora',
  attentionIntro:
    "Las dimensiones marcadas como 'Atención' están por debajo de la mediana de pares, pero no son agudas. Con una acción específica pueden alcanzar el nivel rápidamente.",
  attentionPill: ' Atención',
  quickWin: 'Quick win',
  noAttention: 'No se encontraron dimensiones con prioridad de atención.',
  strongEyebrow: 'Análisis en profundidad · Fortalezas',
  strongTitle: 'Lo que hace bien',
  strongIntro:
    'Estas dimensiones obtienen una puntuación suficiente o fuerte. Constituyen su base operativa y deben preservarse durante la implementación de la IA. Construir sobre las fortalezas es al menos tan estratégico como corregir las debilidades.',
  strongEyebrowAlt: 'Análisis en profundidad · Ideas clave',
  strongTitleAlt: 'Lo que esto significa para usted',
  strongIntroAlt:
    'Ninguna dimensión supera todavía la mediana de pares, lo que significa que aquí es donde está el mayor potencial. Estas observaciones conectan sus puntuaciones directamente con riesgos y oportunidades concretos del negocio.',
  anchoring: 'Consolidación',
  noStrong:
    "Cada dimensión cae en la categoría 'Atención' o 'Crítico' — consulte las páginas anteriores para las recomendaciones.",
  companyEyebrow: 'Perfil de empresa',
  companyTitle: (c) => `Nuestra visión de ${c}`,
  companyIntro:
    'Este perfil se basa en información públicamente disponible (sitio web, notas de prensa, datos sectoriales) y su propio contexto. Constituye la base para la interpretación específica de la empresa en este informe.',
  sector: 'Sector',
  profile: 'Perfil',
  keyActivities: 'Actividades principales',
  researchFindings: 'Hallazgos de la investigación en línea',
  noWebsite:
    'No se indicó ningún sitio web. En un próximo trayecto, indique el sitio web de la empresa para obtener un perfil específico basado en información en línea actual.',
  urgencyExplanation: 'Justificación de la urgencia',
  servicesEyebrow: 'Servicios × oportunidades de IA',
  servicesTitle: 'Dónde la IA toca sus servicios',
  servicesIntro: 'Para cada servicio que ofrece: dónde la IA y la automatización cambian la economía de ese servicio concreto — acelerándolo, ampliándolo o abaratándolo.',
  servicesExposureHigh: 'Alto impacto',
  servicesExposureMedium: 'Impacto medio',
  servicesExposureLow: 'Bajo impacto',
  servicesAiLabel: 'Oportunidad de IA',
  teamSectionTitle: 'Composición del equipo',
  teamImplicationLabel: 'Qué significa esto',
  insightsEyebrow: 'Observaciones clave',
  insightsTitle: 'Lo que este informe ve y otros pasan por alto',
  insightsIntro:
    'Las cinco observaciones estratégicamente más relevantes, específicas para su situación y sector. Cada idea está directamente vinculada a sus respuestas de la scorecard y a su perfil de empresa en línea.',
  qaEyebrow: 'Resultados de la scorecard',
  qaTitle: 'Resumen de preguntas y respuestas',
  qaIntro:
    'Sus respuestas a las 15 preguntas de la scorecard. El análisis de este informe se basa íntegramente en estos datos, complementados con investigación externa por empresa.',
  sectionLabel: (n, t) => `Sección ${n}: ${t}`,
  sectionTitles: {
    1: 'Su enfoque analítico actual',
    2: 'Ciclo de deal y análisis',
    3: 'Cartera, financiación y monitorización',
    4: 'Equipo y gestión del conocimiento',
  },
  recEyebrow: 'Recomendación',
  recTitle: (f) => `El trayecto más adecuado para ${f}`,
  recommendedTrack: 'Trayecto recomendado',
  expectedOutcome: 'Resultado esperado',
  firstStep: 'Primer paso concreto',
  whyTrack: 'Por qué este trayecto',
  yourScore: 'Su puntuación',
  attentionRequired: 'Atención requerida',
  dimAbbrev: 'dim.',
  ctaTitle: 'Siguiente paso: 20 minutos de sparring',
  ctaContact: 'cal.com/wwdijkman/intake-call · wouter@agenticmindshift.nl',
  ctaBody: 'No es una llamada de ventas: una comprobación concreta de si este trayecto encaja con su situación.',
  roadmapEyebrow: 'Plan de implementación',
  roadmapTitle: (f) => `Hoja de ruta de 90 días para ${f}`,
  roadmapIntro:
    'Una hoja de ruta concreta basada en su perfil de scorecard. Por fases, de modo que cada paso se apoye en el anterior, sin sobrecargar a la organización.',
  phase: 'FASE',
  phase1Days: 'Día 1–30',
  phase1Title: 'Sentar las bases',
  phase2Days: 'Día 31–60',
  phase2Title: 'Optimizar procesos',
  phase3Days: 'Día 61–90',
  phase3Title: 'Consolidar estructuralmente',
  pilotEval:
    'Evaluación del piloto tras 60 días: medir lo que funciona y ajustar según los primeros resultados en la práctica.',
  phase3Anchor: (d) =>
    `Consolidar y documentar las dimensiones fuertes (${d}) como base para todo el equipo.`,
  phase3Workflow:
    'Flujo de trabajo con IA integrado en la preparación diaria de expedientes, no como experimento sino como método estándar.',
  phase3Remeasure:
    'Volver a medir: repita la AI Readiness Scorecard tras 90 días y compárela con este informe.',
  colophonEyebrow: 'Sobre el autor',
  colophonTitle: 'Agentic Mindshift Consultancy',
  about1:
    'Agentic Mindshift ayuda a fondos de private equity del mid-market, asesores de M&A y financieros corporativos a aprovechar la IA de forma estructural en sus procesos analíticos, desde el screening de deals hasta la monitorización de cartera.',
  about2:
    'Trabajamos exclusivamente en el segmento donde importa: expedientes complejos, mucho en juego y un equipo que ya es excelente pero quiere lograr más con la misma capacidad.',
  about3:
    'Nuestro enfoque es pragmático: sin frameworks, sin proyectos de PowerPoint. Implementamos la IA donde da resultados directos: en sus expedientes, sus modelos, sus procesos.',
  founder: 'Fundador',
  founderRole: 'Fractional AI Officer',
  contact: 'Contacto',
  registration: 'Registro',
  city: 'Ámsterdam',
  finalCtaTitle: 'Este informe es su punto de partida, no el final',
  finalCtaBody:
    'Programe una sesión gratuita de 20 minutos para determinar si este trayecto funciona, y cómo, de forma concreta para su organización.',
  confidential: (n, c) =>
    `Este informe es confidencial y está destinado exclusivamente a ${n} en ${c}. No debe distribuirse sin el consentimiento por escrito de Agentic Mindshift Consultancy.`,
  generatedBy: (m, d) =>
    `Generado por ${m} el ${d}, a partir de las respuestas de la scorecard e información de empresa públicamente disponible. Agentic Mindshift Consultancy · KvK 99495945 · agenticmindshift.nl`,
  priorityCritical: 'Crítico',
  priorityAttention: 'Atención',
  priorityAdequate: '○ Suficiente',
  priorityStrong: '✓ Fuerte',
  urgencyHigh: 'Alta',
  urgencyMedium: 'Media',
  urgencyLow: 'Baja',
  footerConfidential: 'Agentic Mindshift · Confidencial',
  footerPage: (p, t) => `agenticmindshift.nl · ${p} de ${t}`,
};

const pt: PdfStrings = {
  coverEyebrow: 'AI Readiness Scorecard',
  profileFallback: 'Perfil de AI Readiness',
  preparedFor: (n) => `Preparado para ${n}`,
  execSummary: 'Resumo executivo',
  totalScore: 'Pontuação total',
  outOf75: 'de 75 pontos',
  belowMedian: 'Abaixo da mediana',
  dimensions: 'dimensões',
  urgency: 'Urgência',
  track: 'Percurso',
  weakestDims: 'Dimensões mais fracas',
  strongestDims: 'Dimensões mais fortes',
  percentileNote: (p) => `Mais forte do que ${p}% de firmas comparáveis`,
  routeEyebrow: 'A sua rota · Agentic Mindshift',
  routeTitle: (n) => `Como transformamos isto em resultados, ${n}`,
  routeIntro:
    'O seu scorecard aponta diretamente para uma das nossas quatro rotas. Abaixo vê onde está, qual a rota que melhor se adequa e o que ela oferece em concreto — com preços transparentes.',
  routeLadderLabel: 'As quatro rotas',
  routeActiveBadge: 'A SUA ROTA',
  routeRecommended: 'Recomendada com base no seu scorecard',
  routeWhatYouGet: 'O que isto oferece em concreto',
  routePriceLabel: 'Investimento',
  routeFactumLabel: 'Powered by Factum Capital',
  routeFactumNote:
    'As rotas de due diligence e portfólio funcionam na Factum Capital — a nossa plataforma de análise com IA que fornece o fundamento analítico. A Agentic Mindshift presta o serviço e, quando necessário, a validação certificada.',
  scoreOverview: 'Resumo da pontuação',
  scoreOverviewTitle: 'O seu perfil vs. mediana de pares',
  scoreOverviewIntro: (peer) =>
    `Cada dimensão comparada com a mediana de intervenientes comparáveis no mid-market europeu (private equity, M&A, corporate finance). A mediana de pares situa-se em ${peer}/100. Vermelho = abaixo da mediana.`,
  belowPeerMedian: 'Abaixo da mediana de pares',
  atOrAboveMedian: 'Na / acima da mediana',
  peerMedianLegend: (peer) => `Mediana de pares (${peer})`,
  profileExplanation: 'Interpretação do perfil',
  criticalEyebrow: 'Análise aprofundada · Prioridades críticas',
  criticalTitle: 'Onde a ação é mais urgente',
  criticalIntro:
    "As dimensões marcadas como 'Crítico' exigem atenção imediata. São as que mais se afastam abaixo da mediana de pares e constituem o maior travão à sua qualidade analítica.",
  criticalPill: ' Crítico',
  quickWinActionable: 'Quick win de aplicação imediata',
  noCritical: 'Não foram encontradas dimensões com prioridade crítica com base na sua scorecard.',
  attentionAlsoLabel: 'Também requer atenção',
  attentionEyebrow: 'Análise aprofundada · Potencial de melhoria',
  attentionTitle: 'Dimensões com margem de melhoria',
  attentionIntro:
    "As dimensões marcadas como 'Atenção' estão abaixo da mediana de pares, mas não são agudas. Com ação direcionada podem rapidamente atingir o nível.",
  attentionPill: ' Atenção',
  quickWin: 'Quick win',
  noAttention: 'Não foram encontradas dimensões com prioridade de atenção.',
  strongEyebrow: 'Análise aprofundada · Pontos fortes',
  strongTitle: 'O que faz bem',
  strongIntro:
    'Estas dimensões obtêm uma pontuação suficiente ou forte. Constituem a sua base operacional e devem ser salvaguardadas durante a implementação da IA. Construir sobre os pontos fortes é, no mínimo, tão estratégico como corrigir as fraquezas.',
  strongEyebrowAlt: 'Análise aprofundada · Conclusões-chave',
  strongTitleAlt: 'O que isto significa para si',
  strongIntroAlt:
    'Nenhuma dimensão está ainda acima da mediana dos pares — o que significa que é precisamente aqui que reside o maior potencial. Estas observações ligam as suas pontuações diretamente a riscos e oportunidades concretos do negócio.',
  anchoring: 'Consolidação',
  noStrong:
    "Cada dimensão cai na categoria 'Atenção' ou 'Crítico' — consulte as páginas anteriores para as recomendações.",
  companyEyebrow: 'Perfil da empresa',
  companyTitle: (c) => `A nossa visão sobre ${c}`,
  companyIntro:
    'Este perfil baseia-se em informação publicamente disponível (site, comunicados de imprensa, dados setoriais) e no seu próprio contexto. Constitui a base para a interpretação específica da empresa neste relatório.',
  sector: 'Setor',
  profile: 'Perfil',
  keyActivities: 'Atividades principais',
  researchFindings: 'Conclusões da investigação online',
  noWebsite:
    'Nenhum site indicado. Num próximo percurso, indique o site da empresa para obter um perfil específico baseado em informação online atual.',
  urgencyExplanation: 'Justificação da urgência',
  servicesEyebrow: 'Serviços × oportunidades de IA',
  servicesTitle: 'Onde a IA toca os seus serviços',
  servicesIntro: 'Para cada serviço que oferece: onde a IA e a automação alteram a economia desse serviço específico — acelerando-o, ampliando-o ou tornando-o mais barato.',
  servicesExposureHigh: 'Alto impacto',
  servicesExposureMedium: 'Impacto médio',
  servicesExposureLow: 'Baixo impacto',
  servicesAiLabel: 'Oportunidade de IA',
  teamSectionTitle: 'Composição da equipa',
  teamImplicationLabel: 'O que isto significa',
  insightsEyebrow: 'Observações-chave',
  insightsTitle: 'O que este relatório vê e os outros não veem',
  insightsIntro:
    'As cinco observações estrategicamente mais relevantes, específicas para a sua situação e setor. Cada insight está diretamente ligado às suas respostas da scorecard e ao perfil online da empresa.',
  qaEyebrow: 'Resultados da scorecard',
  qaTitle: 'Resumo de perguntas e respostas',
  qaIntro:
    'As suas respostas às 15 perguntas da scorecard. A análise deste relatório baseia-se inteiramente nestes dados — complementados com investigação externa por empresa.',
  sectionLabel: (n, t) => `Secção ${n}: ${t}`,
  sectionTitles: {
    1: 'A sua abordagem analítica atual',
    2: 'Ciclo de deal e análise',
    3: 'Carteira, financiamento e monitorização',
    4: 'Equipa e gestão do conhecimento',
  },
  recEyebrow: 'Recomendação',
  recTitle: (f) => `O percurso mais adequado para ${f}`,
  recommendedTrack: 'Percurso recomendado',
  expectedOutcome: 'Resultado esperado',
  firstStep: 'Primeiro passo concreto',
  whyTrack: 'Porquê este percurso',
  yourScore: 'A sua pontuação',
  attentionRequired: 'Atenção necessária',
  dimAbbrev: 'dim.',
  ctaTitle: 'Próximo passo: 20 minutos de sparring',
  ctaContact: 'cal.com/wwdijkman/intake-call · wouter@agenticmindshift.nl',
  ctaBody: 'Não é uma chamada de vendas — uma verificação concreta de se este percurso se adequa à sua situação.',
  roadmapEyebrow: 'Plano de implementação',
  roadmapTitle: (f) => `Roteiro de 90 dias para ${f}`,
  roadmapIntro:
    'Um roteiro concreto com base no seu perfil de scorecard. Por fases, de modo que cada passo assente no anterior — sem sobrecarregar a organização.',
  phase: 'FASE',
  phase1Days: 'Dia 1–30',
  phase1Title: 'Lançar as bases',
  phase2Days: 'Dia 31–60',
  phase2Title: 'Otimizar processos',
  phase3Days: 'Dia 61–90',
  phase3Title: 'Consolidar estruturalmente',
  pilotEval:
    'Avaliação do piloto após 60 dias: medir o que funciona e ajustar com base nos primeiros resultados na prática.',
  phase3Anchor: (d) =>
    `Consolidar e documentar as dimensões fortes (${d}) como base para toda a equipa.`,
  phase3Workflow:
    'Fluxo de trabalho com IA integrado na preparação diária de dossiers — não como experiência, mas como método padrão.',
  phase3Remeasure:
    'Medir novamente: repita a AI Readiness Scorecard após 90 dias e compare com este relatório.',
  colophonEyebrow: 'Sobre o autor',
  colophonTitle: 'Agentic Mindshift Consultancy',
  about1:
    'A Agentic Mindshift ajuda fundos de private equity do mid-market, consultores de M&A e financeiros corporativos a usar a IA de forma estrutural nos seus processos analíticos — do screening de deals à monitorização de carteira.',
  about2:
    'Trabalhamos exclusivamente no segmento onde isso importa: dossiers complexos, muito em jogo e uma equipa que já é excelente mas quer alcançar mais com a mesma capacidade.',
  about3:
    'A nossa abordagem é pragmática: sem frameworks, sem projetos de PowerPoint. Implementamos a IA onde dá resultados diretos — nos seus dossiers, nos seus modelos, nos seus processos.',
  founder: 'Fundador',
  founderRole: 'Fractional AI Officer',
  contact: 'Contacto',
  registration: 'Registo',
  city: 'Amesterdão',
  finalCtaTitle: 'Este relatório é o seu ponto de partida — não o ponto final',
  finalCtaBody:
    'Agende uma sessão gratuita de 20 minutos para determinar se e como este percurso funciona concretamente para a sua organização.',
  confidential: (n, c) =>
    `Este relatório é confidencial e destina-se exclusivamente a ${n} na ${c}. Não deve ser distribuído sem o consentimento por escrito da Agentic Mindshift Consultancy.`,
  generatedBy: (m, d) =>
    `Gerado por ${m} a ${d}, com base nas respostas da scorecard e em informação de empresa publicamente disponível. Agentic Mindshift Consultancy · KvK 99495945 · agenticmindshift.nl`,
  priorityCritical: 'Crítico',
  priorityAttention: 'Atenção',
  priorityAdequate: '○ Suficiente',
  priorityStrong: '✓ Forte',
  urgencyHigh: 'Alta',
  urgencyMedium: 'Média',
  urgencyLow: 'Baixa',
  footerConfidential: 'Agentic Mindshift · Confidencial',
  footerPage: (p, t) => `agenticmindshift.nl · ${p} de ${t}`,
};

const PDF_STRINGS: Record<ReportLocale, PdfStrings> = { nl, en, de, es, pt };

export function getPdfStrings(locale: ReportLocale): PdfStrings {
  return PDF_STRINGS[locale] ?? nl;
}
