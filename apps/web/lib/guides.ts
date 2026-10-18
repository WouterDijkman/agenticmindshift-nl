import type { GuideLocale, GuideSlug } from './guideRoutes';

/**
 * Copy for the three problem pages, in Dutch and English.
 *
 * Why here and not in messages/*.json: next-intl's catalogues are shared by
 * all five locales and sent whole to the client provider. These pages exist
 * in two languages only, so their copy would be dead weight in the German,
 * Spanish and Portuguese bundles, and missing keys there would be a standing
 * trap for the next person who adds a string. A typed module keeps each
 * page's copy in one place, checked by the compiler.
 *
 * Why these three pages exist (AUDIT-VINDBAARHEID-2026-10-12.md §2.1): answer
 * engines find Agentic Mindshift when someone asks for a *supplier* in PE or
 * M&A, and miss it when someone describes the *problem*. Each page answers
 * one problem Wouter has actually worked on.
 *
 * Rules for whoever edits this:
 *  - No client names, no prices, no figures beyond the two time statements
 *    from Wouter's own work, framed as his experience.
 *  - Nothing here is Factum Capital's work or result.
 *  - The NDA/AVG page states the Dutch/EU frame and is not legal advice.
 *  - Inline links use `[label](/path)`, a path without locale; GuidePage
 *    renders them through the locale-aware Link.
 *  - Glossary: "data room", "NDA", typographic apostrophes (’).
 */

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: string[];
  /** Paragraphs after the list. */
  after?: string[];
}

export interface Guide {
  metaTitle: string;
  metaDescription: string;
  /** Breadcrumb and link-card label. */
  shortName: string;
  /** One line for the link cards on /werkwijze and the homepage. */
  teaser: string;
  eyebrow: string;
  bgChar: string;
  h1: string;
  /** The answer to the page's question, as the first paragraph. */
  answer: string;
  sections: GuideSection[];
  helps: { heading: string; bullets: string[]; note: string };
  datePublished: string;
}

export interface GuideChrome {
  /** Label of the question list beside the article (desktop only). */
  tocLabel: string;
  relatedEyebrow: string;
  werkwijzeLink: string;
  overLink: string;
  moreEyebrow: string;
  moreHeading: string;
  readMore: string;
}

export const GUIDE_CHROME: Record<GuideLocale, GuideChrome> = {
  nl: {
    tocLabel: 'Op deze pagina',
    relatedEyebrow: 'Verder lezen',
    werkwijzeLink: 'Hoe een traject verloopt',
    overLink: 'Over Wouter Dijkman',
    moreEyebrow: 'Praktijkvragen',
    moreHeading: 'Drie praktijkvragen over AI in dealwerk',
    readMore: 'Lees verder',
  },
  en: {
    tocLabel: 'On this page',
    relatedEyebrow: 'Read on',
    werkwijzeLink: 'How an engagement works',
    overLink: 'About Wouter Dijkman',
    moreEyebrow: 'Practical questions',
    moreHeading: 'Three practical questions about AI in deal work',
    readMore: 'Read more',
  },
};

const PUBLISHED = '2026-10-12';

export const GUIDES: Record<GuideSlug, Record<GuideLocale, Guide>> = {
  /* ─────────────────────────────────────────────────────────────────────
     (a) One way of working for IMs and teasers
     ───────────────────────────────────────────────────────────────────── */
  'im-en-teasers': {
    nl: {
      metaTitle: 'Eén AI-werkwijze voor IM’s en teasers',
      metaDescription:
        'Junioren die ChatGPT en Claude elk op hun eigen manier inzetten voor IM’s en teasers? Zo ziet één vaste werkwijze eruit, met controle door het team.',
      shortName: 'IM’s en teasers',
      teaser: 'Eén vaste werkwijze voor het hele team, met geteste rekenstappen en een controle aan het eind.',
      eyebrow: 'Corporate finance · IM’s en teasers',
      bgChar: 'IM',
      h1: 'Eén AI-werkwijze voor IM’s en teasers, voor het hele team',
      answer:
        'Als elke junior ChatGPT of Claude op zijn eigen manier gebruikt, verschilt elk IM in opbouw, toon en betrouwbaarheid. Wat werkt is één ingerichte werkwijze die het hele team gebruikt: vaste stappen, berekeningen als geteste stap en een controle door het team aan het eind. Wat er gebouwd wordt, is van u.',
      sections: [
        {
          heading: 'Wat gaat er mis als iedereen zijn eigen AI gebruikt?',
          bullets: [
            'Elke junior heeft eigen prompts en instellingen. Twee IM’s van hetzelfde kantoor lezen als het werk van twee kantoren.',
            'Niemand weet welke tekst of tabel uit welk model kwam.',
            'Wat één persoon heeft uitgezocht, blijft in zijn chatgeschiedenis staan.',
            'Cijfers worden in een chatvenster “berekend”, zonder dat iemand de berekening ziet.',
          ],
        },
        {
          heading: 'Hoe ziet één vaste werkwijze eruit?',
          paragraphs: [
            'Een werkwijze is een vaste reeks stappen voor terugkerend werk. Voor een IM of teaser ziet dat er zo uit:',
          ],
          steps: [
            'De stukken van de verkoper komen in een vaste map, in een vaste vorm.',
            'Elk document heeft een vast sjabloon, in de opbouw en toon van het kantoor.',
            'Het model schrijft per hoofdstuk een eerste versie op basis van de bronstukken.',
            'Tabellen en kengetallen komen uit een geteste rekenstap.',
            'Het team leest, corrigeert en geeft akkoord voordat er iets naar buiten gaat.',
          ],
          after: [
            'Iedereen werkt met dezelfde stappen. Een nieuwe junior hoeft niets zelf uit te vinden, en een IM van vorig jaar is terug te lezen.',
          ],
        },
        {
          heading: 'Waarom zijn de berekeningen een aparte stap?',
          paragraphs: [
            'Een taalmodel rekent niet zelf. Het schrijft code die rekent, of het schat. Hoe meer een bedrijf afwijkt in zijn grondslagen, hoe groter de kans op een fout.',
            'Daarom bouwen we berekeningen als vaste stappen:',
          ],
          bullets: [
            'elke keer dezelfde formule voor normalisaties en kengetallen;',
            'getest voordat het team erop vertrouwt;',
            'elk getal in het IM is terug te voeren op de bron.',
          ],
        },
        {
          heading: 'Wie controleert de output?',
          paragraphs: [
            'Het team. Elke werkwijze eindigt met een controle door iemand van het kantoor. Het model levert de eerste versie; het oordeel en het akkoord blijven bij u.',
          ],
        },
        {
          heading: 'Van wie is wat er gebouwd wordt?',
          paragraphs: [
            'Van u. De werkwijze draait in uw eigen omgeving en gaat mee als u overstapt naar een andere aanbieder van AI-modellen. U zit niet vast aan ons of aan één model. Dat leggen we vast in de opdrachtbevestiging.',
          ],
        },
        {
          heading: 'Wat kan nog meer als vaste werkwijze?',
          paragraphs: [
            'Een voorbeeld uit mijn eigen werk: een bedrijfsprofiel van twee pagina’s, op basis van alleen een bedrijfsnaam.',
          ],
          bullets: [
            'website, eigenaren en structuur uit Company.info;',
            'concurrenten uit Gain.pro;',
            'een nieuwscheck, zodat u een al aangekondigde verkoop niet mist.',
          ],
          after: [
            'De analyse ligt klaar, het oordeel blijft bij het team. Wat een halve tot hele dag werk was, wordt controleren en bijschaven.',
          ],
        },
        {
          heading: 'Moet u daarvoor een AI-specialist aannemen?',
          paragraphs: [
            'Voor een boutique meestal niet. De winst zit in een paar goed ingerichte werkprocessen die het hele team elke dag gebruikt. Daar is geen extra functie voor nodig.',
          ],
        },
        {
          heading: 'Waar begint u?',
          paragraphs: [
            'Breng het werk in kaart van mandaat tot closing. Kijk per stap wat tijd kost, wat elke keer terugkomt en waar fouten ontstaan. Begin met een of twee stappen die vaak terugkomen, zoals de teaser of het eerste concept van het IM.',
            'Hoe een traject verder loopt, staat op [Werkwijze](/werkwijze). Mag u dealstukken eigenlijk in zo’n tool zetten? Zie [Dealstukken in ChatGPT](/dealstukken-en-ai).',
          ],
        },
      ],
      helps: {
        heading: 'Hoe Agentic Mindshift helpt',
        bullets: [
          'We brengen uw proces van mandaat tot closing in kaart en kiezen samen de eerste werkwijze.',
          'We richten die in, met geteste rekenstappen en een controle door uw team als laatste stap.',
          'We trainen het team tot het er zelfstandig mee werkt.',
        ],
        note: 'Het eerste gesprek duurt twintig minuten en is vrijblijvend.',
      },
      datePublished: PUBLISHED,
    },
    en: {
      metaTitle: 'One AI workflow for IMs and teasers',
      metaDescription:
        'Juniors each using ChatGPT or Claude their own way for IMs and teasers? This is what one fixed workflow looks like, checked by the team at the end.',
      shortName: 'IMs and teasers',
      teaser: 'One fixed workflow for the whole team, with tested calculation steps and a check at the end.',
      eyebrow: 'Corporate finance · IMs and teasers',
      bgChar: 'IM',
      h1: 'One AI workflow for IMs and teasers, for the whole team',
      answer:
        'When every junior uses ChatGPT or Claude their own way, every IM differs in structure, tone and reliability. What works is one configured workflow the whole team uses: fixed steps, calculations as tested steps, and a check by the team at the end. What gets built belongs to you.',
      sections: [
        {
          heading: 'What goes wrong when everyone uses their own AI?',
          bullets: [
            'Every junior has their own prompts and settings. Two IMs from the same firm read like the work of two firms.',
            'Nobody knows which text or table came from which model.',
            'What one person worked out stays in their chat history.',
            'Figures get “calculated” in a chat window, and nobody sees the calculation.',
          ],
        },
        {
          heading: 'What does one fixed workflow look like?',
          paragraphs: [
            'A workflow is a fixed sequence of steps for recurring work. For an IM or teaser it looks like this:',
          ],
          steps: [
            'The seller’s documents go into a fixed folder, in a fixed form.',
            'Each document has a fixed template, in the firm’s structure and tone.',
            'The model drafts each chapter from the source documents.',
            'Tables and ratios come out of a tested calculation step.',
            'The team reads, corrects and approves before anything goes out.',
          ],
          after: [
            'Everyone works with the same steps. A new junior has nothing to invent, and last year’s IM can be traced back.',
          ],
        },
        {
          heading: 'Why are the calculations a separate step?',
          paragraphs: [
            'A language model does not calculate by itself. It writes code that calculates, or it estimates. The more a company deviates in its accounting policies, the higher the risk of an error.',
            'So we build calculations as fixed steps:',
          ],
          bullets: [
            'the same formula for adjustments and ratios, every time;',
            'tested before the team relies on it;',
            'every figure in the IM traces back to its source.',
          ],
        },
        {
          heading: 'Who checks the output?',
          paragraphs: [
            'The team. Every workflow ends with a check by someone at the firm. The model delivers the first draft; the judgement and the sign-off stay with you.',
          ],
        },
        {
          heading: 'Who owns what gets built?',
          paragraphs: [
            'You do. The workflow runs in your own environment and moves with you if you switch to another AI model provider. You are not tied to us or to one model. We put that in the engagement confirmation.',
          ],
        },
        {
          heading: 'What else works as a fixed workflow?',
          paragraphs: [
            'An example from my own work: a two-page company profile, from nothing but a company name.',
          ],
          bullets: [
            'website, owners and structure from Company.info;',
            'competitors from Gain.pro;',
            'a news check, so you do not miss a sale that has already been announced.',
          ],
          after: [
            'The analysis is prepared, the judgement stays with the team. What was half a day to a day of work becomes checking and polishing.',
          ],
        },
        {
          heading: 'Do you need to hire an AI specialist for this?',
          paragraphs: [
            'For a boutique, usually not. The gain is in a few well-configured work processes the whole team uses every day. That needs no extra role.',
          ],
        },
        {
          heading: 'Where do you start?',
          paragraphs: [
            'Map the work from mandate to closing. For each step, look at what takes time, what comes back every time and where errors creep in. Start with one or two steps that recur often, such as the teaser or the first draft of the IM.',
            'How an engagement runs from there is on [How we work](/werkwijze). Are you even allowed to put deal documents into such a tool? See [Deal documents in ChatGPT](/dealstukken-en-ai).',
          ],
        },
      ],
      helps: {
        heading: 'How Agentic Mindshift helps',
        bullets: [
          'We map your process from mandate to closing and pick the first workflow together.',
          'We set it up, with tested calculation steps and a check by your team as the last step.',
          'We train the team until it works with it on its own.',
        ],
        note: 'The first call takes twenty minutes and comes without obligation.',
      },
      datePublished: PUBLISHED,
    },
  },

  /* ─────────────────────────────────────────────────────────────────────
     (b) Monthly reporting of a PE portfolio company
     ───────────────────────────────────────────────────────────────────── */
  maandrapportage: {
    nl: {
      metaTitle: 'Maandrapportage van deelnemingen met AI',
      metaDescription:
        'AI bereidt de maandreview van een PE-deelneming voor: afwijkingsanalyse, forensische checks en vragen voor CFO en CEO. De review blijft bij het dealteam.',
      shortName: 'Maandrapportage',
      teaser: 'Afwijkingsanalyse, forensische checks en vragen voor CFO en CEO, klaar voor review door het dealteam.',
      eyebrow: 'Private equity · Portfoliomonitoring',
      bgChar: 'M',
      h1: 'AI in de maandrapportage van een PE-deelneming',
      answer:
        'AI kan de maandelijkse review van een deelneming grotendeels voorbereiden: de afwijkingsanalyse, een forensische controle zoals een accountant die doet, en concrete vragen voor de CFO en CEO. Bij een PE-fonds waarvoor ik dit inrichtte, kostte het handmatig drie tot vier dagen. Nu start de werkwijze ’s ochtends en ligt het rapport een paar uur later klaar voor review. Het oordeel blijft bij het dealteam.',
      sections: [
        {
          heading: 'Wat doet de AI in een maandelijkse review?',
          bullets: [
            'Afwijkingsanalyse: realisatie tegen budget, vorig jaar en vorige maand, de grootste verschillen eerst.',
            'Forensische controle: de checks die een accountant zou doen, zoals marges die verschuiven, werkkapitaal dat oploopt en kosten die van rubriek wisselen.',
            'Vragen voor het management: per afwijking een concrete vraag voor de CFO of CEO, met het getal erbij.',
          ],
        },
        {
          heading: 'Hoe ziet de werkwijze eruit?',
          steps: [
            'De deelneming levert de maandcijfers aan in een vast format.',
            'De werkwijze start ’s ochtends en draait analyse en controles als vaste stappen.',
            'Berekeningen lopen via geteste rekenstappen. Het taalmodel schrijft de toelichting en de vragen.',
            'Een paar uur later ligt het rapport klaar voor review.',
            'Het dealteam leest, past aan en stuurt de vragen naar het management.',
          ],
        },
        {
          heading: 'Waarom niet gewoon de cijfers in ChatGPT plakken?',
          paragraphs: [
            'Een taalmodel rekent niet zelf. Het schrijft code of het schat. Bij een maandpakket met tientallen regels gaat dat vroeg of laat mis, en niemand ziet waar.',
            'U wilt bovendien dat elke maand dezelfde controles draaien, in dezelfde volgorde. Een losse chat onthoudt dat niet.',
            'En cijfers van een deelneming horen niet in een persoonlijk account. Zie [Dealstukken in ChatGPT](/dealstukken-en-ai).',
          ],
        },
        {
          heading: 'Wie beoordeelt het rapport?',
          paragraphs: [
            'Het dealteam. De werkwijze bereidt voor; de investment manager beoordeelt, kiest welke vragen naar de deelneming gaan en geeft akkoord. De review blijft bij het team dat de deelneming kent.',
          ],
        },
        {
          heading: 'Wat levert het op naast tijd?',
          bullets: [
            'Elke deelneming wordt elke maand op dezelfde manier bekeken.',
            'Afwijkingen vallen op in de maand waarin ze ontstaan.',
            'De vragen aan het management en de antwoorden staan vast, ook als iemand het team verlaat.',
          ],
        },
        {
          heading: 'Waar begint u?',
          paragraphs: [
            'Met één deelneming en het rapport dat u nu al maakt. We zetten de huidige stappen op papier, bouwen ze na als vaste werkwijze en draaien die eerst naast het handmatige proces. Het team stapt over als de uitkomsten kloppen.',
            'Hoe zo’n traject loopt, staat op [Werkwijze](/werkwijze). Wie het bouwt, staat op [Over Wouter](/over).',
          ],
        },
      ],
      helps: {
        heading: 'Hoe Agentic Mindshift helpt',
        bullets: [
          'We zetten uw huidige maandreview op papier en bepalen welke controles erin horen.',
          'We bouwen de werkwijze, met geteste rekenstappen en een review door uw team als laatste stap.',
          'We dragen het over, zodat uw team het zelf draait en aanpast.',
        ],
        note: 'Het eerste gesprek duurt twintig minuten en is vrijblijvend.',
      },
      datePublished: PUBLISHED,
    },
    en: {
      metaTitle: 'Monthly portfolio reviews with AI',
      metaDescription:
        'AI prepares the monthly review of a PE portfolio company: variance analysis, forensic checks and questions for CFO and CEO. The deal team does the review.',
      shortName: 'Monthly reporting',
      teaser: 'Variance analysis, forensic checks and questions for CFO and CEO, ready for the deal team to review.',
      eyebrow: 'Private equity · Portfolio monitoring',
      bgChar: 'M',
      h1: 'AI in the monthly reporting of a PE portfolio company',
      answer:
        'AI can prepare most of the monthly review of a portfolio company: the variance analysis, a forensic check like an accountant would do, and concrete questions for the CFO and CEO. At a PE fund where I set this up, it took three to four days of manual work. Now the workflow starts in the morning and the report is ready for review a few hours later. The judgement stays with the deal team.',
      sections: [
        {
          heading: 'What does the AI do in a monthly review?',
          bullets: [
            'Variance analysis: actuals against budget, last year and last month, largest differences first.',
            'Forensic check: the checks an accountant would run, such as margins that shift, working capital that builds up and costs that change category.',
            'Questions for management: for each variance, a concrete question for the CFO or CEO, with the figure attached.',
          ],
        },
        {
          heading: 'What does the workflow look like?',
          steps: [
            'The portfolio company delivers its monthly figures in a fixed format.',
            'The workflow starts in the morning and runs the analysis and checks as fixed steps.',
            'Calculations run through tested calculation steps. The language model writes the commentary and the questions.',
            'A few hours later the report is ready for review.',
            'The deal team reads, edits and sends the questions to management.',
          ],
        },
        {
          heading: 'Why not just paste the figures into ChatGPT?',
          paragraphs: [
            'A language model does not calculate by itself. It writes code or it estimates. With a monthly pack of dozens of lines, that goes wrong sooner or later, and nobody sees where.',
            'You also want the same checks to run every month, in the same order. A loose chat does not remember that.',
            'And a portfolio company’s figures do not belong in a personal account. See [Deal documents in ChatGPT](/dealstukken-en-ai).',
          ],
        },
        {
          heading: 'Who reviews the report?',
          paragraphs: [
            'The deal team. The workflow prepares; the investment manager reviews it, picks which questions go to the company and signs off. The review stays with the team that knows the business.',
          ],
        },
        {
          heading: 'What does it bring besides time?',
          bullets: [
            'Every portfolio company is looked at the same way, every month.',
            'Variances surface in the month they arise.',
            'The questions to management and the answers are on record, even when someone leaves the team.',
          ],
        },
        {
          heading: 'Where do you start?',
          paragraphs: [
            'With one portfolio company and the report you already make. We write down the current steps, rebuild them as a fixed workflow and run it alongside the manual process first. The team switches once the results match.',
            'How such an engagement runs is on [How we work](/werkwijze). Who builds it is on [About Wouter](/over).',
          ],
        },
      ],
      helps: {
        heading: 'How Agentic Mindshift helps',
        bullets: [
          'We write down your current monthly review and decide which checks belong in it.',
          'We build the workflow, with tested calculation steps and a review by your team as the last step.',
          'We hand it over, so your team runs and adjusts it itself.',
        ],
        note: 'The first call takes twenty minutes and comes without obligation.',
      },
      datePublished: PUBLISHED,
    },
  },

  /* ─────────────────────────────────────────────────────────────────────
     (c) Deal documents in ChatGPT under an NDA and the GDPR
     ───────────────────────────────────────────────────────────────────── */
  'dealstukken-en-ai': {
    nl: {
      metaTitle: 'Dealstukken in ChatGPT: NDA en AVG',
      metaDescription:
        'Mag uw dealteam stukken uit de data room in ChatGPT of Claude zetten? Wat de NDA, de AVG en de instellingen van de aanbieder vragen. NL- en EU-kader.',
      shortName: 'Dealstukken en AI',
      teaser: 'Wat de NDA, de AVG en de instellingen van de aanbieder vragen voordat stukken in een AI-tool gaan.',
      eyebrow: 'NDA · AVG · Nederlands en EU-kader',
      bgChar: '§',
      h1: 'Dealstukken in ChatGPT: wat mag onder NDA en AVG?',
      answer:
        'Het kan, als drie dingen geregeld zijn: de NDA staat delen met de aanbieder toe, er ligt een verwerkersovereenkomst met die aanbieder, en de instellingen zorgen dat uw stukken niet voor training worden gebruikt. Een persoonlijk of gratis account voldoet daar doorgaans niet aan. Dit is het Nederlandse en Europese kader (AVG), geen juridisch advies voor uw specifieke zaak.',
      sections: [
        {
          heading: 'Wat zegt de NDA?',
          bullets: [
            'Een NDA beperkt aan wie u vertrouwelijke informatie mag geven en waarvoor. Vaak alleen aan eigen medewerkers en adviseurs die het voor de transactie nodig hebben.',
            'Een AI-aanbieder is een derde partij. Of u stukken daar mag onderbrengen, hangt af van de tekst. Kijk naar de definitie van “representatives” of adviseurs, en naar wat er staat over opslag bij derden.',
            'Let op de plicht om informatie na afloop terug te geven of te vernietigen. Die geldt ook voor wat bij de aanbieder staat.',
            'Twijfelt u, vraag dan toestemming of neem het mee in de onderhandeling over de NDA.',
          ],
        },
        {
          heading: 'Staan er persoonsgegevens in de data room?',
          paragraphs: [
            'Bijna altijd: arbeidscontracten, salarislijsten, klantgegevens, correspondentie. Dan geldt de AVG.',
          ],
          bullets: [
            'Wie bepaalt waarom en hoe de gegevens worden verwerkt, is verwerkingsverantwoordelijke. Een AI-aanbieder die alleen op uw instructie verwerkt, is verwerker.',
            'Met een verwerker sluit u een verwerkersovereenkomst. Zakelijke abonnementen van de grote aanbieders bieden die aan; voor persoonlijke accounts is die er meestal niet.',
            'Deel alleen wat nodig is. Een salarislijst hoeft niet mee voor een samenvatting van de huurcontracten.',
            'Gaan gegevens buiten de EU, dan is een grondslag voor doorgifte nodig, zoals de standaardcontractbepalingen van de Europese Commissie.',
            'Bijzondere persoonsgegevens, zoals gezondheidsgegevens in verzuimdossiers, vragen extra voorzichtigheid.',
          ],
        },
        {
          heading: 'Welke instellingen bij de aanbieder doen ertoe?',
          bullets: [
            'Training: uw invoer mag niet worden gebruikt om modellen te trainen. Bij zakelijke abonnementen is dat meestal de standaard; bij persoonlijke accounts moet u het vaak zelf uitzetten.',
            'Bewaartermijn: hoe lang bewaart de aanbieder invoer en output, en kunt u dat inkorten?',
            'Regio: kies waar mogelijk opslag en verwerking in de EU.',
            'Toegang: wie binnen het kantoor ziet welke chats en bestanden, en wat gebeurt er als iemand vertrekt?',
            'Logboek: kunt u achteraf zien welke stukken zijn gedeeld?',
          ],
        },
        {
          heading: 'Wat moet een kantoor regelen?',
          steps: [
            'Eén zakelijk account voor het team, met verwerkersovereenkomst. Dealwerk gaat niet via persoonlijke accounts.',
            'Een korte interne regel: welke stukken mogen erin, welke niet, en wie beslist bij twijfel.',
            'Een vaste zin in uw NDA’s over het gebruik van AI-diensten met passende waarborgen.',
            'De instellingen vastgelegd: training uit, bewaartermijn bekend, EU-regio waar mogelijk.',
            'Een vast moment waarop iemand controleert of het zo blijft.',
          ],
        },
        {
          heading: 'Is dit juridisch advies?',
          paragraphs: [
            'Nee. Dit is het algemene Nederlandse en Europese kader. Wouter Dijkman heeft rechten gestudeerd. Elke NDA en elke data room is anders. Laat bij twijfel de tekst van uw NDA en uw verwerkersovereenkomst toetsen door uw eigen advocaat.',
            'Wilt u daarna AI echt in het dealwerk inzetten? Zie [IM’s en teasers](/im-en-teasers) en [Maandrapportage](/maandrapportage).',
          ],
        },
      ],
      helps: {
        heading: 'Hoe Agentic Mindshift helpt',
        bullets: [
          'We kiezen met u een zakelijke AI-omgeving en zetten de instellingen goed.',
          'We stellen een korte interne regel op voor AI in dealwerk.',
          'We richten de werkwijzen zo in dat vertrouwelijke stukken op de juiste plek blijven.',
        ],
        note: 'Het eerste gesprek duurt twintig minuten en is vrijblijvend. Meer over de aanpak op [Werkwijze](/werkwijze).',
      },
      datePublished: PUBLISHED,
    },
    en: {
      metaTitle: 'Deal documents in ChatGPT: NDA and GDPR',
      metaDescription:
        'Can your deal team put data room documents into ChatGPT or Claude? What the NDA, the GDPR and the provider’s settings require. Dutch and EU frame.',
      shortName: 'Deal documents and AI',
      teaser: 'What the NDA, the GDPR and the provider’s settings require before documents go into an AI tool.',
      eyebrow: 'NDA · GDPR · Dutch and EU frame',
      bgChar: '§',
      h1: 'Deal documents in ChatGPT: what is allowed under an NDA and the GDPR?',
      answer:
        'It can be done, if three things are in place: the NDA allows sharing with the provider, there is a data processing agreement with that provider, and the settings keep your documents out of model training. A personal or free account usually meets none of these. This is the Dutch and EU frame (GDPR), not legal advice for your specific case.',
      sections: [
        {
          heading: 'What does the NDA say?',
          bullets: [
            'An NDA limits who you may give confidential information to and for what. Often only your own staff and advisers who need it for the transaction.',
            'An AI provider is a third party. Whether you may store documents there depends on the wording. Look at the definition of “representatives” or advisers, and at what it says about storage with third parties.',
            'Mind the duty to return or destroy information afterwards. It covers what sits with the provider too.',
            'In doubt, ask for consent or raise it when the NDA is negotiated.',
          ],
        },
        {
          heading: 'Is there personal data in the data room?',
          paragraphs: [
            'Almost always: employment contracts, payroll lists, customer data, correspondence. Then the GDPR applies.',
          ],
          bullets: [
            'Whoever decides why and how the data is processed is the controller. An AI provider that processes only on your instructions is a processor.',
            'With a processor you sign a data processing agreement (DPA). The large providers offer one with their business plans; personal accounts usually have none.',
            'Share only what is needed. A payroll list does not need to go in for a summary of the leases.',
            'If data leaves the EU, the transfer needs a legal basis, such as the European Commission’s standard contractual clauses.',
            'Special categories of personal data, such as health data in absence files, call for extra care.',
          ],
        },
        {
          heading: 'Which provider settings matter?',
          bullets: [
            'Training: your input must not be used to train models. On business plans that is usually the default; on personal accounts you often have to switch it off yourself.',
            'Retention: how long does the provider keep inputs and outputs, and can you shorten it?',
            'Region: where possible, choose storage and processing in the EU.',
            'Access: who at the firm sees which chats and files, and what happens when someone leaves?',
            'Logs: can you see afterwards which documents were shared?',
          ],
        },
        {
          heading: 'What should a firm put in place?',
          steps: [
            'One business account for the team, with a DPA. Deal work does not go through personal accounts.',
            'A short internal rule: which documents may go in, which may not, and who decides in case of doubt.',
            'A standard clause in your NDAs on the use of AI services with appropriate safeguards.',
            'The settings on record: training off, retention known, EU region where possible.',
            'A fixed moment when someone checks it is still so.',
          ],
        },
        {
          heading: 'Is this legal advice?',
          paragraphs: [
            'No. This is the general Dutch and EU frame. Wouter Dijkman studied law. Every NDA and every data room is different. In doubt, have your own counsel review the wording of your NDA and your DPA.',
            'Ready to put AI to work in deal work itself? See [IMs and teasers](/im-en-teasers) and [Monthly reporting](/maandrapportage).',
          ],
        },
      ],
      helps: {
        heading: 'How Agentic Mindshift helps',
        bullets: [
          'We choose a business AI environment with you and set it up correctly.',
          'We draft a short internal rule for AI in deal work.',
          'We set up the workflows so confidential documents stay where they belong.',
        ],
        note: 'The first call takes twenty minutes and comes without obligation. More on the approach under [How we work](/werkwijze).',
      },
      datePublished: PUBLISHED,
    },
  },
};

export function getGuide(slug: GuideSlug, locale: GuideLocale): Guide {
  return GUIDES[slug][locale];
}
