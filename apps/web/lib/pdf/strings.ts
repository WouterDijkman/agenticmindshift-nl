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
  belowReferenceStat: string;
  dimensions: string;
  urgency: string;
  track: string;
  weakestDims: string;
  strongestDims: string;
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
  scoreOverviewIntro: (reference: number) => string;
  belowReference: string;
  atOrAboveReference: string;
  referenceLegend: (reference: number) => string;
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
  belowReferenceStat: 'Onder referentie',
  dimensions: 'dimensies',
  urgency: 'Urgentie',
  track: 'Traject',
  weakestDims: 'Zwakste dimensies',
  strongestDims: 'Sterkste dimensies',
  routeEyebrow: 'Uw route · Agentic Mindshift',
  routeTitle: (n) => `Zo zetten wij dit om in resultaat, ${n}`,
  routeIntro:
    'Uw scorecard wijst naar één van onze vier routes. Hieronder ziet u waar u staat, welke route past en wat die oplevert. Inclusief tarief.',
  routeLadderLabel: 'De vier routes',
  routeActiveBadge: 'PAST BIJ U',
  routeRecommended: 'Aanbevolen op basis van uw scorecard',
  routeWhatYouGet: 'Wat dit oplevert',
  routePriceLabel: 'Investering',
  routeFactumLabel: 'Powered by Factum Capital',
  routeFactumNote:
    'De due-diligence- en portfolio-routes draaien op Factum Capital, ons eigen AI-analyseplatform. Agentic Mindshift verzorgt de dienst en waar vereist de gecertificeerde sign-off.',
  scoreOverview: 'Scoreoverzicht',
  scoreOverviewTitle: 'Uw profiel naast het referentieniveau',
  scoreOverviewIntro: (reference) =>
    `Elke dimensie afgezet tegen het referentieniveau van ${reference}/100. Dat is het punt waarop een dimensie voldoende is geïnstrumenteerd om op te sturen. Het is ons streefniveau, geen gemeten marktgemiddelde. Rood betekent: onder referentie.`,
  belowReference: 'Onder referentieniveau',
  atOrAboveReference: 'Op / boven referentie',
  referenceLegend: (reference) => `Referentieniveau (${reference})`,
  profileExplanation: 'Profielduidering',
  criticalEyebrow: 'Diepteanalyse · Kritieke aandachtspunten',
  criticalTitle: 'Waar actie het meest urgent is',
  criticalIntro:
    'Deze dimensies liggen het verst onder het referentieniveau. Ze remmen uw analytische kwaliteit het sterkst en vragen als eerste aandacht.',
  criticalPill: ' Kritiek',
  quickWinActionable: 'Direct uitvoerbare quick win',
  noCritical: 'Uw scorecard laat geen kritieke dimensies zien.',
  attentionAlsoLabel: 'Vraagt ook aandacht',
  attentionEyebrow: 'Diepteanalyse · Verbeterpotentieel',
  attentionTitle: 'Dimensies met ruimte voor verbetering',
  attentionIntro:
    'Deze dimensies liggen onder het referentieniveau, maar zijn niet acuut. Met gerichte actie komen ze snel op niveau.',
  attentionPill: ' Aandacht',
  quickWin: 'Quick win',
  noAttention: 'Geen dimensies in deze categorie.',
  strongEyebrow: 'Diepteanalyse · Sterke punten',
  strongTitle: 'Wat u goed doet',
  strongIntro:
    'Deze dimensies scoren voldoende tot sterk. Ze vormen uw operationele fundament. Borg ze expliciet bij elke AI-implementatie, zodat u niet afbreekt wat al werkt.',
  strongEyebrowAlt: 'Diepteanalyse · Kerninzichten',
  strongTitleAlt: 'Wat dit voor u betekent',
  strongIntroAlt:
    'Geen enkele dimensie komt boven het referentieniveau uit. Daar ligt tegelijk de grootste winst. Onderstaande observaties koppelen uw scores aan concrete risico’s en kansen.',
  anchoring: 'Verankering',
  noStrong:
    "Elke dimensie valt onder 'Aandacht' of 'Kritiek'. De aanbevelingen staan op de vorige pagina's.",
  companyEyebrow: 'Bedrijfsprofiel',
  companyTitle: (c) => `Onze kijk op ${c}`,
  companyIntro:
    'Dit profiel komt uit publiek beschikbare informatie — website, persberichten, sectordata — aangevuld met uw eigen toelichting. Het is de basis voor de bedrijfsspecifieke duiding verderop.',
  sector: 'Sector',
  profile: 'Profiel',
  keyActivities: 'Kernactiviteiten',
  researchFindings: 'Bevindingen uit online onderzoek',
  noWebsite:
    'U heeft geen website opgegeven. Vul die de volgende keer in, dan baseren wij het bedrijfsprofiel op actuele online informatie.',
  urgencyExplanation: 'Urgentieverklaring',
  servicesEyebrow: 'Diensten × AI-kansen',
  servicesTitle: 'Waar AI uw diensten raakt',
  servicesIntro: 'Per dienst die u levert: waar AI en automatisering de economie van díe dienst veranderen. Sneller, breder of goedkoper.',
  servicesExposureHigh: 'Hoge impact',
  servicesExposureMedium: 'Gemiddelde impact',
  servicesExposureLow: 'Lage impact',
  servicesAiLabel: 'AI-kans',
  teamSectionTitle: 'Teamopbouw',
  teamImplicationLabel: 'Wat dit betekent',
  insightsEyebrow: 'Kernobservaties',
  insightsTitle: 'De vijf observaties die het meest opvallen',
  insightsIntro:
    'Vijf observaties, specifiek voor uw situatie en sector. Elk inzicht is gekoppeld aan uw scorecard-antwoorden en uw online bedrijfsprofiel.',
  qaEyebrow: 'Scorecard resultaten',
  qaTitle: 'Vraag & Antwoord overzicht',
  qaIntro:
    'Uw antwoorden op de vijftien vragen. De analyse in dit rapport rust volledig op deze input, aangevuld met extern onderzoek per bedrijf.',
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
  ctaTitle: 'Volgende stap: twintig minuten sparring',
  ctaContact: 'cal.com/wwdijkman/intake-call · wouter@agenticmindshift.nl',
  ctaBody: 'Geen verkoopgesprek. Een toets of dit traject aansluit op uw situatie.',
  roadmapEyebrow: 'Implementatieplan',
  roadmapTitle: (f) => `90-dagen roadmap voor ${f}`,
  roadmapIntro:
    'Een roadmap op basis van uw scorecard-profiel. Gefaseerd, zodat elke stap voortbouwt op de vorige zonder de organisatie te overbelasten.',
  phase: 'FASE',
  phase1Days: 'Dag 1–30',
  phase1Title: 'Fundering leggen',
  phase2Days: 'Dag 31–60',
  phase2Title: 'Processen optimaliseren',
  phase3Days: 'Dag 61–90',
  phase3Title: 'Structureel verankeren',
  pilotEval:
    'Pilot-evaluatie na 60 dagen. Meten wat werkt en bijsturen op de eerste resultaten uit de praktijk.',
  phase3Anchor: (d) =>
    `Sterke dimensies (${d}) vastleggen en documenteren voor het hele team.`,
  phase3Workflow:
    'AI-workflow verankerd in de dagelijkse dossiervoorbereiding, als standaard werkwijze.',
  phase3Remeasure:
    'Opnieuw meten: herhaal de scorecard na 90 dagen en leg de uitkomst naast dit rapport.',
  colophonEyebrow: 'Over de opsteller',
  colophonTitle: 'Agentic Mindshift Consultancy',
  about1:
    'Agentic Mindshift helpt mid-market private equity, M&A-adviseurs en corporate financiers om AI structureel in te zetten in hun analyse. Van deal-screening tot portefeuillemonitoring.',
  about2:
    'Wij werken in het segment waar het ertoe doet: complexe dossiers, grote belangen, en teams die al goed zijn maar meer willen halen uit dezelfde bezetting.',
  about3:
    'Onze aanpak is pragmatisch. Geen frameworks, geen PowerPoint-trajecten. Wij implementeren AI waar het direct resultaat geeft: in uw dossiers, uw modellen, uw processen.',
  founder: 'Oprichter',
  founderRole: 'Fractional AI Officer',
  contact: 'Contact',
  registration: 'Registratie',
  city: 'Amsterdam',
  finalCtaTitle: 'Dit rapport is een startpunt',
  finalCtaBody:
    'Plan een kosteloze sessie van twintig minuten. Daarin bepalen wij samen of dit traject bij uw organisatie past.',
  confidential: (n, c) =>
    `Dit rapport is vertrouwelijk en uitsluitend bestemd voor ${n} bij ${c}. Verspreiding alleen met schriftelijke toestemming van Agentic Mindshift Consultancy.`,
  generatedBy: (m, d) =>
    `Opgesteld door ${m} op ${d}, op basis van uw scorecard-antwoorden en publiek beschikbare bedrijfsinformatie. Agentic Mindshift Consultancy · KvK 99495945 · agenticmindshift.nl`,
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
  belowReferenceStat: 'Below reference',
  dimensions: 'dimensions',
  urgency: 'Urgency',
  track: 'Route',
  weakestDims: 'Weakest dimensions',
  strongestDims: 'Strongest dimensions',
  routeEyebrow: 'Your route · Agentic Mindshift',
  routeTitle: (n) => `How we turn this into results, ${n}`,
  routeIntro:
    'Your scorecard points to one of our four routes. Below you see where you stand, which route fits and what it delivers. Fee included.',
  routeLadderLabel: 'The four routes',
  routeActiveBadge: 'FITS YOU',
  routeRecommended: 'Recommended on the basis of your scorecard',
  routeWhatYouGet: 'What this delivers',
  routePriceLabel: 'Investment',
  routeFactumLabel: 'Powered by Factum Capital',
  routeFactumNote:
    'The due diligence and portfolio routes run on Factum Capital, our own AI analysis platform. Agentic Mindshift delivers the service and, where required, the certified sign-off.',
  scoreOverview: 'Score overview',
  scoreOverviewTitle: 'Your profile alongside the reference level',
  scoreOverviewIntro: (reference) =>
    `Every dimension set against the reference level of ${reference}/100. That is the point at which a dimension is measured well enough to steer on. It is our own target level, not a measured market average. Red means below reference.`,
  belowReference: 'Below reference level',
  atOrAboveReference: 'At / above reference',
  referenceLegend: (reference) => `Reference level (${reference})`,
  profileExplanation: 'Profile reading',
  criticalEyebrow: 'In depth · Critical points',
  criticalTitle: 'Where action is most urgent',
  criticalIntro:
    'These dimensions sit furthest below the reference level. They hold back your analytical quality the most and need attention first.',
  criticalPill: ' Critical',
  quickWinActionable: 'Quick win you can act on today',
  noCritical: 'Your scorecard shows no critical dimensions.',
  attentionAlsoLabel: 'Also needs attention',
  attentionEyebrow: 'In depth · Room to improve',
  attentionTitle: 'Dimensions with room to improve',
  attentionIntro:
    'These dimensions sit below the reference level, but they are not acute. Targeted action brings them up quickly.',
  attentionPill: ' Attention',
  quickWin: 'Quick win',
  noAttention: 'No dimensions in this category.',
  strongEyebrow: 'In depth · Strengths',
  strongTitle: 'What you do well',
  strongIntro:
    'These dimensions score adequate to strong. They are your operational foundation. Secure them explicitly in every AI implementation, so you do not break what already works.',
  strongEyebrowAlt: 'In depth · Key insights',
  strongTitleAlt: 'What this means for you',
  strongIntroAlt:
    'No dimension rises above the reference level. That is also where the largest gain sits. The observations below tie your scores to concrete risks and opportunities.',
  anchoring: 'Anchoring',
  noStrong:
    "Every dimension falls under 'Attention' or 'Critical'. The recommendations are on the previous pages.",
  companyEyebrow: 'Company profile',
  companyTitle: (c) => `Our reading of ${c}`,
  companyIntro:
    'This profile comes from publicly available information — website, press releases, sector data — supplemented with your own notes. It is the basis for the company-specific reading further on.',
  sector: 'Sector',
  profile: 'Profile',
  keyActivities: 'Core activities',
  researchFindings: 'Findings from online research',
  noWebsite:
    'You did not give us a website. Add one next time and we will base the company profile on current online information.',
  urgencyExplanation: 'Urgency explained',
  servicesEyebrow: 'Services × AI opportunities',
  servicesTitle: 'Where AI touches your services',
  servicesIntro: 'Per service you deliver: where AI and automation change the economics of that service. Faster, broader or cheaper.',
  servicesExposureHigh: 'High impact',
  servicesExposureMedium: 'Medium impact',
  servicesExposureLow: 'Low impact',
  servicesAiLabel: 'AI opportunity',
  teamSectionTitle: 'Team composition',
  teamImplicationLabel: 'What this means',
  insightsEyebrow: 'Key observations',
  insightsTitle: 'The five observations that stand out most',
  insightsIntro:
    'Five observations, specific to your situation and sector. Each insight ties back to your scorecard answers and your online company profile.',
  qaEyebrow: 'Scorecard results',
  qaTitle: 'Question & answer overview',
  qaIntro:
    'Your answers to the fifteen questions. The analysis in this report rests entirely on this input, supplemented with external research per company.',
  sectionLabel: (n, t) => `Section ${n}: ${t}`,
  sectionTitles: {
    1: 'Your analytical approach today',
    2: 'Deal and analysis cycle',
    3: 'Portfolio, financing and monitoring',
    4: 'Team and knowledge management',
  },
  recEyebrow: 'Recommendation',
  recTitle: (f) => `The route that fits ${f} best`,
  recommendedTrack: 'Recommended route',
  expectedOutcome: 'Expected result',
  firstStep: 'First concrete step',
  whyTrack: 'Why this route',
  yourScore: 'Your score',
  attentionRequired: 'Attention required',
  dimAbbrev: 'dim.',
  ctaTitle: 'Next step: twenty minutes of sparring',
  ctaContact: 'cal.com/wwdijkman/intake-call · wouter@agenticmindshift.nl',
  ctaBody: 'Not a sales call. A check on whether this route fits your situation.',
  roadmapEyebrow: 'Implementation plan',
  roadmapTitle: (f) => `90-day roadmap for ${f}`,
  roadmapIntro:
    'A roadmap based on your scorecard profile. Phased, so each step builds on the one before it without overloading the organisation.',
  phase: 'PHASE',
  phase1Days: 'Day 1–30',
  phase1Title: 'Lay the foundation',
  phase2Days: 'Day 31–60',
  phase2Title: 'Optimise processes',
  phase3Days: 'Day 61–90',
  phase3Title: 'Anchor it structurally',
  pilotEval:
    'Pilot evaluation after 60 days. Measure what works and adjust on the first results from practice.',
  phase3Anchor: (d) =>
    `Record and document your strong dimensions (${d}) for the whole team.`,
  phase3Workflow:
    'AI workflow anchored in daily file preparation, as the standard way of working.',
  phase3Remeasure:
    'Measure again: repeat the scorecard after 90 days and set the outcome alongside this report.',
  colophonEyebrow: 'About the author',
  colophonTitle: 'Agentic Mindshift Consultancy',
  about1:
    'Agentic Mindshift helps mid-market private equity, M&A advisers and corporate financiers apply AI structurally in their analysis. From deal screening to portfolio monitoring.',
  about2:
    'We work in the segment where it counts: complex files, large stakes, and teams that are already good but want more out of the same headcount.',
  about3:
    'Our approach is pragmatic. No frameworks, no PowerPoint projects. We implement AI where it produces results directly: in your files, your models, your processes.',
  founder: 'Founder',
  founderRole: 'Fractional AI Officer',
  contact: 'Contact',
  registration: 'Registration',
  city: 'Amsterdam',
  finalCtaTitle: 'This report is a starting point',
  finalCtaBody:
    'Book a free twenty-minute session. Together we determine whether this route fits your organisation.',
  confidential: (n, c) =>
    `This report is confidential and intended solely for ${n} at ${c}. Circulation only with written permission from Agentic Mindshift Consultancy.`,
  generatedBy: (m, d) =>
    `Prepared by ${m} on ${d}, based on your scorecard answers and publicly available company information. Agentic Mindshift Consultancy · KvK 99495945 · agenticmindshift.nl`,
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
  coverEyebrow: 'AI Readiness Scorecard',
  profileFallback: 'AI-Readiness-Profil',
  preparedFor: (n) => `Erstellt für ${n}`,
  execSummary: 'Executive Summary',
  totalScore: 'Gesamtbewertung',
  outOf75: 'von 75 Punkten',
  belowReferenceStat: 'Unter Referenz',
  dimensions: 'Dimensionen',
  urgency: 'Dringlichkeit',
  track: 'Weg',
  weakestDims: 'Schwächste Dimensionen',
  strongestDims: 'Stärkste Dimensionen',
  routeEyebrow: 'Ihr Weg · Agentic Mindshift',
  routeTitle: (n) => `So setzen wir das in Ergebnisse um, ${n}`,
  routeIntro:
    'Ihre Scorecard weist auf einen unserer vier Wege. Unten sehen Sie, wo Sie stehen, welcher Weg passt und was er bringt. Honorar inklusive.',
  routeLadderLabel: 'Die vier Wege',
  routeActiveBadge: 'PASST ZU IHNEN',
  routeRecommended: 'Empfohlen auf Basis Ihrer Scorecard',
  routeWhatYouGet: 'Was das bringt',
  routePriceLabel: 'Investition',
  routeFactumLabel: 'Powered by Factum Capital',
  routeFactumNote:
    'Die Due-Diligence- und Portfolio-Wege laufen auf Factum Capital, unserer eigenen KI-Analyseplattform. Agentic Mindshift erbringt die Leistung und, wo erforderlich, die zertifizierte Freigabe.',
  scoreOverview: 'Bewertungsübersicht',
  scoreOverviewTitle: 'Ihr Profil neben dem Referenzniveau',
  scoreOverviewIntro: (reference) =>
    `Jede Dimension im Vergleich zum Referenzniveau von ${reference}/100. Das ist der Punkt, ab dem eine Dimension ausreichend gemessen wird, um danach zu steuern. Es ist unser Zielniveau, kein gemessener Marktdurchschnitt. Rot heißt: unter Referenz.`,
  belowReference: 'Unter Referenzniveau',
  atOrAboveReference: 'Auf / über Referenz',
  referenceLegend: (reference) => `Referenzniveau (${reference})`,
  profileExplanation: 'Profileinordnung',
  criticalEyebrow: 'Tiefenanalyse · Kritische Punkte',
  criticalTitle: 'Wo Handeln am dringendsten ist',
  criticalIntro:
    'Diese Dimensionen liegen am weitesten unter dem Referenzniveau. Sie bremsen Ihre analytische Qualität am stärksten und brauchen als Erstes Aufmerksamkeit.',
  criticalPill: ' Kritisch',
  quickWinActionable: 'Sofort umsetzbarer Quick Win',
  noCritical: 'Ihre Scorecard zeigt keine kritischen Dimensionen.',
  attentionAlsoLabel: 'Braucht ebenfalls Aufmerksamkeit',
  attentionEyebrow: 'Tiefenanalyse · Verbesserungspotenzial',
  attentionTitle: 'Dimensionen mit Luft nach oben',
  attentionIntro:
    'Diese Dimensionen liegen unter dem Referenzniveau, sind aber nicht akut. Mit gezieltem Vorgehen sind sie schnell auf Niveau.',
  attentionPill: ' Aufmerksamkeit',
  quickWin: 'Quick Win',
  noAttention: 'Keine Dimensionen in dieser Kategorie.',
  strongEyebrow: 'Tiefenanalyse · Stärken',
  strongTitle: 'Was Sie gut machen',
  strongIntro:
    'Diese Dimensionen liegen im Bereich ausreichend bis stark. Sie bilden Ihr operatives Fundament. Sichern Sie sie bei jeder KI-Einführung ausdrücklich, damit Sie nicht kaputtmachen, was bereits funktioniert.',
  strongEyebrowAlt: 'Tiefenanalyse · Kernerkenntnisse',
  strongTitleAlt: 'Was das für Sie bedeutet',
  strongIntroAlt:
    'Keine einzige Dimension kommt über das Referenzniveau hinaus. Genau dort liegt zugleich der größte Gewinn. Die folgenden Beobachtungen verbinden Ihre Bewertungen mit konkreten Risiken und Chancen.',
  anchoring: 'Verankerung',
  noStrong:
    'Jede Dimension fällt unter „Aufmerksamkeit“ oder „Kritisch“. Die Empfehlungen stehen auf den vorherigen Seiten.',
  companyEyebrow: 'Unternehmensprofil',
  companyTitle: (c) => `Unser Blick auf ${c}`,
  companyIntro:
    'Dieses Profil stammt aus öffentlich verfügbaren Informationen — Website, Pressemitteilungen, Branchendaten — ergänzt um Ihre eigenen Angaben. Es ist die Grundlage für die unternehmensspezifische Einordnung weiter hinten.',
  sector: 'Branche',
  profile: 'Profil',
  keyActivities: 'Kernaktivitäten',
  researchFindings: 'Erkenntnisse aus der Online-Recherche',
  noWebsite:
    'Sie haben keine Website angegeben. Tragen Sie sie beim nächsten Mal ein, dann stützen wir das Unternehmensprofil auf aktuelle Online-Informationen.',
  urgencyExplanation: 'Erläuterung der Dringlichkeit',
  servicesEyebrow: 'Leistungen × KI-Chancen',
  servicesTitle: 'Wo KI Ihre Leistungen berührt',
  servicesIntro: 'Je Leistung, die Sie erbringen: wo KI und Automatisierung die Ökonomie genau dieser Leistung verändern. Schneller, breiter oder günstiger.',
  servicesExposureHigh: 'Hohe Wirkung',
  servicesExposureMedium: 'Mittlere Wirkung',
  servicesExposureLow: 'Geringe Wirkung',
  servicesAiLabel: 'KI-Chance',
  teamSectionTitle: 'Teamaufbau',
  teamImplicationLabel: 'Was das bedeutet',
  insightsEyebrow: 'Kernbeobachtungen',
  insightsTitle: 'Die fünf Beobachtungen, die am meisten auffallen',
  insightsIntro:
    'Fünf Beobachtungen, konkret für Ihre Situation und Ihre Branche. Jede Erkenntnis ist an Ihre Scorecard-Antworten und Ihr Online-Unternehmensprofil geknüpft.',
  qaEyebrow: 'Scorecard-Ergebnisse',
  qaTitle: 'Übersicht Frage & Antwort',
  qaIntro:
    'Ihre Antworten auf die fünfzehn Fragen. Die Analyse in diesem Bericht ruht vollständig auf diesem Input, ergänzt um externe Recherche je Unternehmen.',
  sectionLabel: (n, t) => `Abschnitt ${n}: ${t}`,
  sectionTitles: {
    1: 'Ihr analytisches Vorgehen heute',
    2: 'Deal- und Analysezyklus',
    3: 'Portfolio, Finanzierung und Monitoring',
    4: 'Team und Wissensmanagement',
  },
  recEyebrow: 'Empfehlung',
  recTitle: (f) => `Der Weg, der am besten zu ${f} passt`,
  recommendedTrack: 'Empfohlener Weg',
  expectedOutcome: 'Erwartetes Ergebnis',
  firstStep: 'Erster konkreter Schritt',
  whyTrack: 'Warum dieser Weg',
  yourScore: 'Ihre Bewertung',
  attentionRequired: 'Aufmerksamkeit nötig',
  dimAbbrev: 'Dim.',
  ctaTitle: 'Nächster Schritt: zwanzig Minuten Sparring',
  ctaContact: 'cal.com/wwdijkman/intake-call · wouter@agenticmindshift.nl',
  ctaBody: 'Kein Verkaufsgespräch. Eine Prüfung, ob dieser Weg zu Ihrer Situation passt.',
  roadmapEyebrow: 'Umsetzungsplan',
  roadmapTitle: (f) => `90-Tage-Roadmap für ${f}`,
  roadmapIntro:
    'Eine Roadmap auf Basis Ihres Scorecard-Profils. Gestuft, damit jeder Schritt auf dem vorherigen aufbaut, ohne die Organisation zu überlasten.',
  phase: 'PHASE',
  phase1Days: 'Tag 1–30',
  phase1Title: 'Fundament legen',
  phase2Days: 'Tag 31–60',
  phase2Title: 'Prozesse optimieren',
  phase3Days: 'Tag 61–90',
  phase3Title: 'Strukturell verankern',
  pilotEval:
    'Pilot-Auswertung nach 60 Tagen. Messen, was funktioniert, und anhand der ersten Ergebnisse aus der Praxis nachsteuern.',
  phase3Anchor: (d) =>
    `Starke Dimensionen (${d}) festhalten und für das gesamte Team dokumentieren.`,
  phase3Workflow:
    'KI-Workflow in der täglichen Dossiervorbereitung verankert, als Standardvorgehen.',
  phase3Remeasure:
    'Erneut messen: die Scorecard nach 90 Tagen wiederholen und das Ergebnis neben diesen Bericht legen.',
  colophonEyebrow: 'Über den Verfasser',
  colophonTitle: 'Agentic Mindshift Consultancy',
  about1:
    'Agentic Mindshift hilft Mid-Market Private Equity, M&A-Beratern und Corporate Financiers, KI strukturell in ihrer Analyse einzusetzen. Vom Deal-Screening bis zum Portfolio-Monitoring.',
  about2:
    'Wir arbeiten in dem Segment, in dem es zählt: komplexe Dossiers, große Interessen und Teams, die schon gut sind, aber mehr aus derselben Besetzung holen wollen.',
  about3:
    'Unser Vorgehen ist pragmatisch. Keine Frameworks, keine PowerPoint-Projekte. Wir setzen KI dort ein, wo sie unmittelbar Ergebnisse bringt: in Ihren Dossiers, Ihren Modellen, Ihren Prozessen.',
  founder: 'Gründer',
  founderRole: 'Fractional AI Officer',
  contact: 'Kontakt',
  registration: 'Registrierung',
  city: 'Amsterdam',
  finalCtaTitle: 'Dieser Bericht ist ein Ausgangspunkt',
  finalCtaBody:
    'Buchen Sie eine kostenlose Session von zwanzig Minuten. Darin bestimmen wir gemeinsam, ob dieser Weg zu Ihrer Organisation passt.',
  confidential: (n, c) =>
    `Dieser Bericht ist vertraulich und ausschließlich für ${n} bei ${c} bestimmt. Weitergabe nur mit schriftlicher Zustimmung von Agentic Mindshift Consultancy.`,
  generatedBy: (m, d) =>
    `Erstellt von ${m} am ${d}, auf Basis Ihrer Scorecard-Antworten und öffentlich verfügbarer Unternehmensinformationen. Agentic Mindshift Consultancy · KvK 99495945 · agenticmindshift.nl`,
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
  preparedFor: (n) => `Elaborado para ${n}`,
  execSummary: 'Resumen ejecutivo',
  totalScore: 'Puntuación total',
  outOf75: 'sobre 75 puntos',
  belowReferenceStat: 'Bajo referencia',
  dimensions: 'dimensiones',
  urgency: 'Urgencia',
  track: 'Ruta',
  weakestDims: 'Dimensiones más débiles',
  strongestDims: 'Dimensiones más fuertes',
  routeEyebrow: 'Su ruta · Agentic Mindshift',
  routeTitle: (n) => `Así lo convertimos en resultados, ${n}`,
  routeIntro:
    'Su scorecard apunta a una de nuestras cuatro rutas. Abajo ve dónde está, qué ruta encaja y qué aporta. Tarifa incluida.',
  routeLadderLabel: 'Las cuatro rutas',
  routeActiveBadge: 'ENCAJA CON USTED',
  routeRecommended: 'Recomendada según su scorecard',
  routeWhatYouGet: 'Qué aporta',
  routePriceLabel: 'Inversión',
  routeFactumLabel: 'Powered by Factum Capital',
  routeFactumNote:
    'Las rutas de due diligence y cartera funcionan sobre Factum Capital, nuestra propia plataforma de análisis con IA. Agentic Mindshift presta el servicio y, cuando hace falta, la firma certificada.',
  scoreOverview: 'Resumen de puntuaciones',
  scoreOverviewTitle: 'Su perfil junto al nivel de referencia',
  scoreOverviewIntro: (reference) =>
    `Cada dimensión frente al nivel de referencia de ${reference}/100. Es el punto en que una dimensión está lo bastante medida como para gestionarla. Es nuestro nivel objetivo, no una media de mercado medida. El rojo indica: por debajo de la referencia.`,
  belowReference: 'Bajo el nivel de referencia',
  atOrAboveReference: 'En / sobre la referencia',
  referenceLegend: (reference) => `Nivel de referencia (${reference})`,
  profileExplanation: 'Lectura del perfil',
  criticalEyebrow: 'Análisis a fondo · Puntos críticos',
  criticalTitle: 'Dónde actuar con más urgencia',
  criticalIntro:
    'Estas dimensiones están más lejos del nivel de referencia. Son las que más frenan su calidad analítica y las primeras que piden atención.',
  criticalPill: ' Crítico',
  quickWinActionable: 'Quick win aplicable de inmediato',
  noCritical: 'Su scorecard no muestra dimensiones críticas.',
  attentionAlsoLabel: 'También pide atención',
  attentionEyebrow: 'Análisis a fondo · Margen de mejora',
  attentionTitle: 'Dimensiones con margen de mejora',
  attentionIntro:
    'Estas dimensiones están por debajo del nivel de referencia, pero no son agudas. Con acciones dirigidas suben rápido.',
  attentionPill: ' Atención',
  quickWin: 'Quick win',
  noAttention: 'Ninguna dimensión en esta categoría.',
  strongEyebrow: 'Análisis a fondo · Fortalezas',
  strongTitle: 'Lo que hace bien',
  strongIntro:
    'Estas dimensiones puntúan entre suficiente y fuerte. Son su base operativa. Consérvelas de forma explícita en cada implantación de IA, para no romper lo que ya funciona.',
  strongEyebrowAlt: 'Análisis a fondo · Ideas clave',
  strongTitleAlt: 'Qué significa esto para usted',
  strongIntroAlt:
    'Ninguna dimensión supera el nivel de referencia. Ahí está, a la vez, la mayor ganancia. Las observaciones siguientes conectan sus puntuaciones con riesgos y oportunidades concretos.',
  anchoring: 'Consolidación',
  noStrong:
    'Todas las dimensiones caen en «Atención» o «Crítico». Las recomendaciones están en las páginas anteriores.',
  companyEyebrow: 'Perfil de la empresa',
  companyTitle: (c) => `Nuestra lectura de ${c}`,
  companyIntro:
    'Este perfil procede de información pública — web, notas de prensa, datos del sector — completada con sus propias aclaraciones. Es la base de la lectura específica de la empresa que viene más adelante.',
  sector: 'Sector',
  profile: 'Perfil',
  keyActivities: 'Actividades principales',
  researchFindings: 'Hallazgos de la investigación online',
  noWebsite:
    'No nos indicó ninguna web. Añádala la próxima vez y basaremos el perfil de la empresa en información online actual.',
  urgencyExplanation: 'Explicación de la urgencia',
  servicesEyebrow: 'Servicios × oportunidades de IA',
  servicesTitle: 'Dónde toca la IA sus servicios',
  servicesIntro: 'Por cada servicio que presta: dónde la IA y la automatización cambian la economía de ese servicio. Más rápido, más amplio o más barato.',
  servicesExposureHigh: 'Impacto alto',
  servicesExposureMedium: 'Impacto medio',
  servicesExposureLow: 'Impacto bajo',
  servicesAiLabel: 'Oportunidad de IA',
  teamSectionTitle: 'Composición del equipo',
  teamImplicationLabel: 'Qué significa esto',
  insightsEyebrow: 'Observaciones clave',
  insightsTitle: 'Las cinco observaciones que más destacan',
  insightsIntro:
    'Cinco observaciones, específicas para su situación y su sector. Cada una se apoya en sus respuestas del scorecard y en su perfil online de empresa.',
  qaEyebrow: 'Resultados del scorecard',
  qaTitle: 'Resumen de preguntas y respuestas',
  qaIntro:
    'Sus respuestas a las quince preguntas. El análisis de este informe se apoya por completo en estos datos, sumados a la investigación externa por empresa.',
  sectionLabel: (n, t) => `Sección ${n}: ${t}`,
  sectionTitles: {
    1: 'Su enfoque analítico hoy',
    2: 'Ciclo de operación y análisis',
    3: 'Cartera, financiación y seguimiento',
    4: 'Equipo y gestión del conocimiento',
  },
  recEyebrow: 'Recomendación',
  recTitle: (f) => `La ruta que mejor encaja con ${f}`,
  recommendedTrack: 'Ruta recomendada',
  expectedOutcome: 'Resultado esperado',
  firstStep: 'Primer paso concreto',
  whyTrack: 'Por qué esta ruta',
  yourScore: 'Su puntuación',
  attentionRequired: 'Requiere atención',
  dimAbbrev: 'dim.',
  ctaTitle: 'Siguiente paso: veinte minutos de sparring',
  ctaContact: 'cal.com/wwdijkman/intake-call · wouter@agenticmindshift.nl',
  ctaBody: 'No es una llamada de venta. Es comprobar si esta ruta encaja con su situación.',
  roadmapEyebrow: 'Plan de implantación',
  roadmapTitle: (f) => `Hoja de ruta a 90 días para ${f}`,
  roadmapIntro:
    'Una hoja de ruta basada en su perfil de scorecard. Por fases, para que cada paso se apoye en el anterior sin sobrecargar a la organización.',
  phase: 'FASE',
  phase1Days: 'Día 1–30',
  phase1Title: 'Sentar la base',
  phase2Days: 'Día 31–60',
  phase2Title: 'Optimizar procesos',
  phase3Days: 'Día 61–90',
  phase3Title: 'Consolidar de forma estructural',
  pilotEval:
    'Evaluación del piloto a los 60 días. Medir qué funciona y ajustar con los primeros resultados reales.',
  phase3Anchor: (d) =>
    `Registrar y documentar las dimensiones fuertes (${d}) para todo el equipo.`,
  phase3Workflow:
    'Flujo de trabajo con IA consolidado en la preparación diaria de expedientes, como forma estándar de trabajar.',
  phase3Remeasure:
    'Volver a medir: repita el scorecard a los 90 días y ponga el resultado junto a este informe.',
  colophonEyebrow: 'Sobre el autor',
  colophonTitle: 'Agentic Mindshift Consultancy',
  about1:
    'Agentic Mindshift ayuda a private equity de mid-market, asesores de M&A y financieros corporativos a aplicar la IA de forma estructural en su análisis. Del cribado de operaciones al seguimiento de cartera.',
  about2:
    'Trabajamos en el segmento donde importa: expedientes complejos, intereses grandes y equipos que ya son buenos pero quieren sacar más de la misma plantilla.',
  about3:
    'Nuestro enfoque es pragmático. Sin frameworks, sin proyectos de PowerPoint. Implantamos IA donde da resultado directo: en sus expedientes, sus modelos, sus procesos.',
  founder: 'Fundador',
  founderRole: 'Fractional AI Officer',
  contact: 'Contacto',
  registration: 'Registro',
  city: 'Ámsterdam',
  finalCtaTitle: 'Este informe es un punto de partida',
  finalCtaBody:
    'Reserve una sesión gratuita de veinte minutos. En ella determinamos juntos si esta ruta encaja con su organización.',
  confidential: (n, c) =>
    `Este informe es confidencial y está destinado únicamente a ${n} en ${c}. Su difusión requiere autorización escrita de Agentic Mindshift Consultancy.`,
  generatedBy: (m, d) =>
    `Elaborado por ${m} el ${d}, a partir de sus respuestas del scorecard y de información pública de la empresa. Agentic Mindshift Consultancy · KvK 99495945 · agenticmindshift.nl`,
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
  preparedFor: (n) => `Elaborado para ${n}`,
  execSummary: 'Sumário executivo',
  totalScore: 'Pontuação total',
  outOf75: 'em 75 pontos',
  belowReferenceStat: 'Abaixo da referência',
  dimensions: 'dimensões',
  urgency: 'Urgência',
  track: 'Via',
  weakestDims: 'Dimensões mais fracas',
  strongestDims: 'Dimensões mais fortes',
  routeEyebrow: 'A sua via · Agentic Mindshift',
  routeTitle: (n) => `É assim que transformamos isto em resultados, ${n}`,
  routeIntro:
    'A sua scorecard aponta para uma das nossas quatro vias. Abaixo vê onde está, que via se ajusta e o que ela entrega. Honorário incluído.',
  routeLadderLabel: 'As quatro vias',
  routeActiveBadge: 'AJUSTA-SE A SI',
  routeRecommended: 'Recomendada com base na sua scorecard',
  routeWhatYouGet: 'O que isto entrega',
  routePriceLabel: 'Investimento',
  routeFactumLabel: 'Powered by Factum Capital',
  routeFactumNote:
    'As vias de due diligence e de carteira assentam na Factum Capital, a nossa própria plataforma de análise com IA. A Agentic Mindshift presta o serviço e, quando é preciso, a assinatura certificada.',
  scoreOverview: 'Resumo das pontuações',
  scoreOverviewTitle: 'O seu perfil ao lado do nível de referência',
  scoreOverviewIntro: (reference) =>
    `Cada dimensão face ao nível de referência de ${reference}/100. É o ponto em que uma dimensão está suficientemente medida para se poder gerir. É o nosso nível-alvo, não uma média de mercado medida. Vermelho significa: abaixo da referência.`,
  belowReference: 'Abaixo do nível de referência',
  atOrAboveReference: 'Na / acima da referência',
  referenceLegend: (reference) => `Nível de referência (${reference})`,
  profileExplanation: 'Leitura do perfil',
  criticalEyebrow: 'Análise a fundo · Pontos críticos',
  criticalTitle: 'Onde agir com mais urgência',
  criticalIntro:
    'Estas dimensões estão mais longe do nível de referência. São as que mais travam a sua qualidade analítica e as primeiras a pedir atenção.',
  criticalPill: ' Crítico',
  quickWinActionable: 'Quick win aplicável de imediato',
  noCritical: 'A sua scorecard não mostra dimensões críticas.',
  attentionAlsoLabel: 'Também pede atenção',
  attentionEyebrow: 'Análise a fundo · Margem para melhorar',
  attentionTitle: 'Dimensões com margem para melhorar',
  attentionIntro:
    'Estas dimensões estão abaixo do nível de referência, mas não são agudas. Com ações dirigidas sobem depressa.',
  attentionPill: ' Atenção',
  quickWin: 'Quick win',
  noAttention: 'Nenhuma dimensão nesta categoria.',
  strongEyebrow: 'Análise a fundo · Pontos fortes',
  strongTitle: 'O que faz bem',
  strongIntro:
    'Estas dimensões pontuam entre suficiente e forte. São a sua base operacional. Preserve-as de forma explícita em cada implementação de IA, para não partir o que já funciona.',
  strongEyebrowAlt: 'Análise a fundo · Ideias centrais',
  strongTitleAlt: 'O que isto significa para si',
  strongIntroAlt:
    'Nenhuma dimensão ultrapassa o nível de referência. É aí que está, ao mesmo tempo, o maior ganho. As observações seguintes ligam as suas pontuações a riscos e oportunidades concretos.',
  anchoring: 'Consolidação',
  noStrong:
    'Todas as dimensões caem em «Atenção» ou «Crítico». As recomendações estão nas páginas anteriores.',
  companyEyebrow: 'Perfil da empresa',
  companyTitle: (c) => `A nossa leitura da ${c}`,
  companyIntro:
    'Este perfil vem de informação pública — site, comunicados, dados do setor — completada com os seus próprios esclarecimentos. É a base da leitura específica da empresa mais à frente.',
  sector: 'Setor',
  profile: 'Perfil',
  keyActivities: 'Atividades principais',
  researchFindings: 'Conclusões da pesquisa online',
  noWebsite:
    'Não nos indicou nenhum site. Acrescente-o da próxima vez e baseamos o perfil da empresa em informação online atual.',
  urgencyExplanation: 'Explicação da urgência',
  servicesEyebrow: 'Serviços × oportunidades de IA',
  servicesTitle: 'Onde a IA toca os seus serviços',
  servicesIntro: 'Por cada serviço que presta: onde a IA e a automatização mudam a economia desse serviço. Mais rápido, mais amplo ou mais barato.',
  servicesExposureHigh: 'Impacto elevado',
  servicesExposureMedium: 'Impacto médio',
  servicesExposureLow: 'Impacto baixo',
  servicesAiLabel: 'Oportunidade de IA',
  teamSectionTitle: 'Composição da equipa',
  teamImplicationLabel: 'O que isto significa',
  insightsEyebrow: 'Observações centrais',
  insightsTitle: 'As cinco observações que mais se destacam',
  insightsIntro:
    'Cinco observações, específicas para a sua situação e o seu setor. Cada uma assenta nas suas respostas da scorecard e no seu perfil online de empresa.',
  qaEyebrow: 'Resultados da scorecard',
  qaTitle: 'Resumo de perguntas e respostas',
  qaIntro:
    'As suas respostas às quinze perguntas. A análise deste relatório assenta inteiramente nestes dados, somados à pesquisa externa por empresa.',
  sectionLabel: (n, t) => `Secção ${n}: ${t}`,
  sectionTitles: {
    1: 'A sua abordagem analítica hoje',
    2: 'Ciclo de operação e análise',
    3: 'Carteira, financiamento e monitorização',
    4: 'Equipa e gestão do conhecimento',
  },
  recEyebrow: 'Recomendação',
  recTitle: (f) => `A via que melhor se ajusta a ${f}`,
  recommendedTrack: 'Via recomendada',
  expectedOutcome: 'Resultado esperado',
  firstStep: 'Primeiro passo concreto',
  whyTrack: 'Porquê esta via',
  yourScore: 'A sua pontuação',
  attentionRequired: 'Requer atenção',
  dimAbbrev: 'dim.',
  ctaTitle: 'Passo seguinte: vinte minutos de sparring',
  ctaContact: 'cal.com/wwdijkman/intake-call · wouter@agenticmindshift.nl',
  ctaBody: 'Não é uma chamada de venda. É verificar se esta via se ajusta à sua situação.',
  roadmapEyebrow: 'Plano de implementação',
  roadmapTitle: (f) => `Roteiro a 90 dias para ${f}`,
  roadmapIntro:
    'Um roteiro baseado no seu perfil de scorecard. Faseado, para que cada passo assente no anterior sem sobrecarregar a organização.',
  phase: 'FASE',
  phase1Days: 'Dia 1–30',
  phase1Title: 'Assentar a base',
  phase2Days: 'Dia 31–60',
  phase2Title: 'Otimizar processos',
  phase3Days: 'Dia 61–90',
  phase3Title: 'Consolidar de forma estrutural',
  pilotEval:
    'Avaliação do piloto ao fim de 60 dias. Medir o que funciona e ajustar com os primeiros resultados reais.',
  phase3Anchor: (d) =>
    `Registar e documentar as dimensões fortes (${d}) para toda a equipa.`,
  phase3Workflow:
    'Fluxo de trabalho com IA consolidado na preparação diária de processos, como forma padrão de trabalhar.',
  phase3Remeasure:
    'Medir de novo: repita a scorecard ao fim de 90 dias e coloque o resultado ao lado deste relatório.',
  colophonEyebrow: 'Sobre o autor',
  colophonTitle: 'Agentic Mindshift Consultancy',
  about1:
    'A Agentic Mindshift ajuda private equity de mid-market, consultores de M&A e financeiros corporativos a aplicar IA de forma estrutural na sua análise. Da triagem de operações à monitorização da carteira.',
  about2:
    'Trabalhamos no segmento onde isso conta: processos complexos, interesses grandes e equipas que já são boas mas querem tirar mais do mesmo quadro de pessoal.',
  about3:
    'A nossa abordagem é pragmática. Sem frameworks, sem projetos de PowerPoint. Implementamos IA onde dá resultado direto: nos seus processos, nos seus modelos, nos seus fluxos.',
  founder: 'Fundador',
  founderRole: 'Fractional AI Officer',
  contact: 'Contacto',
  registration: 'Registo',
  city: 'Amesterdão',
  finalCtaTitle: 'Este relatório é um ponto de partida',
  finalCtaBody:
    'Marque uma sessão gratuita de vinte minutos. Nela determinamos em conjunto se esta via se ajusta à sua organização.',
  confidential: (n, c) =>
    `Este relatório é confidencial e destina-se exclusivamente a ${n} na ${c}. A sua divulgação exige autorização escrita da Agentic Mindshift Consultancy.`,
  generatedBy: (m, d) =>
    `Elaborado por ${m} em ${d}, a partir das suas respostas da scorecard e de informação pública da empresa. Agentic Mindshift Consultancy · KvK 99495945 · agenticmindshift.nl`,
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
