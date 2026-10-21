import type { GuideLocale, GuideSlug } from './guideRoutes';
import { CHROME_DE, GUIDES_DE } from './guides.de';
import { CHROME_ES, GUIDES_ES } from './guides.es';
import { CHROME_PT, GUIDES_PT } from './guides.pt';

/**
 * Copy for the three decision pages. English and Dutch here; German, Spanish
 * and Portuguese in guides.de.ts, guides.es.ts and guides.pt.ts.
 *
 * Why here and not in messages/*.json: the catalogues are shared by all five
 * locales and validated against each other at build. These pages exist in two
 * languages, so their copy would be dead weight in de/es/pt and missing keys
 * there would fail the locale check. A typed module keeps each page in one
 * place, checked by the compiler. Same reasoning as apps/web/lib/guides.ts.
 *
 * Why these pages exist (GTM/ops/seo-ai-audit-2026-10.md #4, and the
 * "They Ask, You Answer" review of 21-10-2026): the site had product pages
 * only. Searchers and answer engines arrive with a question: what goes in a
 * data room, how long diligence takes, when a tool like this is the wrong
 * one. Each page answers one of them in plain terms and links to the product
 * page that carries the detail.
 *
 * Rules for whoever edits this:
 *  - Every product statement must already be on the site (messages/en.json)
 *    or in GTM/config/product-facts.md. No accuracy rate, no client, no case
 *    study, no price, no turnaround promise beyond "the pipeline pass runs in
 *    hours" and "days later".
 *  - Counts never as digits: `{disciplines}` is replaced with
 *    DISCIPLINE_COUNT from lib/site.ts at render.
 *  - Inline links use `[label](/path)`, a path without locale.
 *  - Glossary: "data room" in both languages, as in messages/nl.json.
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
  /** Without the brand suffix; GuidePage appends it like pageMetadata does. */
  metaTitle: string;
  metaDescription: string;
  /** Breadcrumb, footer and related-link label. */
  shortName: string;
  h1: string;
  /** The answer to the page's question, as the header lead. */
  answer: string;
  sections: GuideSection[];
  helps: { heading: string; bullets: string[]; note: string };
  datePublished: string;
}

export interface GuideChrome {
  tocLabel: string;
  relatedLabel: string;
  guidesLabel: string;
}

export const GUIDE_CHROME: Record<GuideLocale, GuideChrome> = {
  en: { tocLabel: 'On this page', relatedLabel: 'Read on', guidesLabel: 'Guides' },
  nl: { tocLabel: 'Op deze pagina', relatedLabel: 'Verder lezen', guidesLabel: 'Gidsen' },
  de: CHROME_DE,
  es: CHROME_ES,
  pt: CHROME_PT
};

const PUBLISHED = '2026-10-21';

const GUIDES: Record<GuideLocale, Record<GuideSlug, Guide>> = {
  en: {
    'data-room-checklist': {
      metaTitle: 'Data room checklist before a sale',
      metaDescription:
        'What a buyer will ask for in a data room, per discipline: the documents, the gaps that cost the most, and when to start. For sellers and sell-side brokers.',
      shortName: 'Data room checklist',
      h1: 'What belongs in a data room before a sale?',
      answer:
        'What a buyer will ask for, in a form a buyer can use: financials that reconcile, the contracts that carry the revenue, people, tax, legal and IP, each complete and easy to find. The gaps that cost the most are the quiet ones: a contract nobody filed, a year missing from an export, two documents that give different numbers.',
      sections: [
        {
          heading: 'Which documents does a buyer expect?',
          bullets: [
            'Financial: annual accounts for the last three years, management accounts and monthly figures, working capital, debt and debt-like items, and the adjustments behind the EBITDA in the information memorandum.',
            'Commercial: a customer list with revenue per customer, the largest customer contracts, pricing and discounts, churn.',
            'Legal: corporate documents, material contracts and their change-of-control clauses, guarantees, disputes.',
            'Tax: returns and assessments, open positions, the group structure.',
            'HR: contracts of key people, pension arrangements, collective labour agreements.',
            'Operational: key suppliers, single points of failure, lead times.',
            'Technology and AI: licences, who owns the data, which models the business depends on.'
          ],
          after: [
            'The exact list follows the deal. A capital raise asks for a use-of-funds plan, a sale for the order book.'
          ]
        },
        {
          heading: 'What if a document is there but does not answer the question?',
          paragraphs: [
            'Then a buyer reads it as a gap, and asks. A customer list without revenue per customer is the typical case: present in the room, useless for the question a buyer has.'
          ]
        },
        {
          heading: 'What about figures that contradict each other?',
          paragraphs: [
            'Revenue in the management accounts that differs from the annual accounts. A headcount in the HR export that does not match payroll. A buyer will find both sources. Find them first, and have the explanation ready.'
          ]
        },
        {
          heading: 'Why is a missing document so hard to spot?',
          paragraphs: [
            'Because an absence leaves no trace. The contract nobody filed, the year missing from the payroll export: there is no passage to quote, so nobody stumbles on it while reading. It only shows when the room is checked against a list of what a buyer expects.'
          ]
        },
        {
          heading: 'When should a seller start?',
          paragraphs: [
            'Early enough that the answer to a finding can still be “we fixed it”. Once the data room is live, the honest answer becomes “we know, and here is the context”. Both work. The first is worth more.'
          ]
        },
        {
          heading: 'How does Factum check a data room?',
          paragraphs: [
            'Factum reads the room the way a buyer will: what is still missing, what does not add up, and which risks a buyer will raise. Every point goes to your team first, because a contract filed inside another file can show as missing.',
            'It does not replace a vendor due diligence report from an adviser, and it is not a clean-up service. It names what is missing; obtaining it stays with the seller. See [what AI can’t do](/limits-of-ai).'
          ]
        }
      ],
      helps: {
        heading: 'For sell-side brokers',
        bullets: [
          'Your client’s room read the way a buyer will read it, before the buyer does.',
          'Missing documents and open questions go to your client as one request, inside the platform.',
          'Figures that contradict each other, with both sources named.',
          'Your team judges each point. Factum signs nothing off.'
        ],
        note: 'More on [Factum for sellers and brokers](/pre-sale).'
      },
      datePublished: PUBLISHED
    },
    'due-diligence-timeline': {
      metaTitle: 'How long does due diligence take?',
      metaDescription:
        'Where the time goes in due diligence, where days can be won, what does not get faster, and why Factum quotes no date before it has seen the data room.',
      shortName: 'How long due diligence takes',
      h1: 'How long does due diligence take?',
      answer:
        'Longer than most exclusivity periods would like. A quality-of-earnings read alone covers one dimension in four to ten weeks. Most of the time goes to reading, waiting and chasing documents, not to judgement. Factum’s pipeline pass runs in hours; your team’s review comes after it, at your pace.',
      sections: [
        {
          heading: 'Where does the time go?',
          bullets: [
            'Reading. A team under deadline reads a sample of the room and still runs out of days.',
            'Queueing. Specialists work one after another: tax waits for the financial and legal reads, the valuation waits for tax.',
            'Chasing. Documents that were never uploaded are found late, requested, and read again when they arrive.',
            'Reconciling. Separate reports have to be lined up against each other before anyone can say what they mean for the price.'
          ]
        },
        {
          heading: 'Where can days be won?',
          paragraphs: [
            'Mostly in the first three. Factum reads every document instead of a sample, runs the modules that do not depend on each other at the same time, and lists what is missing at the start instead of the end.',
            'The days come from running in parallel, not from any single answer arriving faster. How the order is set is on [the platform page](/platform).'
          ]
        },
        {
          heading: 'What does not get faster?',
          bullets: [
            'Your reviewer’s judgement on what is material.',
            'The seller’s answers to your questions, and the documents still to come.',
            'Negotiating the price and the purchase agreement.'
          ],
          after: [
            'Software shortens the reading and the queue. The conversations the findings start take as long as they take.'
          ]
        },
        {
          heading: 'How do you shorten it before it starts?',
          steps: [
            'Get the list of what is missing in the first days, while there is still time to ask for it.',
            'Brief your advisers on what the room actually contains, so their hours go where the risk is.',
            'As a seller, prepare the room before the process starts: [what belongs in a data room](/data-room-checklist).'
          ]
        },
        {
          heading: 'Why does Factum not promise a date upfront?',
          paragraphs: [
            'Because the duration depends on the size and state of the data room, and we have not seen it yet. The call to agree the NDA and the room takes thirty minutes. Days later you read the findings, source by source.'
          ]
        }
      ],
      helps: {
        heading: 'What Factum does to the timeline',
        bullets: [
          'The pipeline pass runs in hours, across {disciplines} disciplines.',
          'Each finding arrives with its source document and location, ready for your reviewer.',
          'The list of what never arrived, from the first pass on.',
          'Your team reviews and signs off in the platform, at its own pace.'
        ],
        note: 'Legal and tax are tuned to Dutch law; for a target elsewhere, have local counsel check them. A deal you closed last year works as a test.'
      },
      datePublished: PUBLISHED
    },
    'when-not-to-use-factum': {
      metaTitle: 'When AI due diligence is the wrong tool',
      metaDescription:
        'Six cases where Factum is the wrong instrument: a signed opinion, a foreign legal or tax read, a code review, background checks, no data room, or a decision made for you.',
      shortName: 'When Factum is the wrong tool',
      h1: 'When is Factum the wrong tool?',
      answer:
        'When the deal needs a signature, a jurisdiction or a kind of review that Factum does not provide. Factum reads every document in the data room and cites each finding to its source and location. Your own reviewer decides what matters and signs off. These are the cases where you need something else, or something next to it.',
      sections: [
        {
          heading: 'You need a signed opinion',
          paragraphs: [
            'A quality-of-earnings report or a vendor due diligence report comes out of a separate engagement with an accountant or adviser who signs it, and a bank or buyer may rely on that report. Factum does not replace that report, gives no assurance and signs nothing. Your reviewer signs off the findings for your own use.',
            'If the financing or the purchase agreement needs a signed report, commission one. Factum can run next to it, across {disciplines} disciplines, so the specialists start from what the room actually contains.'
          ]
        },
        {
          heading: 'Legal and tax decide the deal, and the target is abroad',
          paragraphs: [
            'Legal and tax are tuned to Dutch law. The financial, commercial and operational reads work in any jurisdiction. For a target elsewhere, have local counsel check the legal and tax findings.'
          ]
        },
        {
          heading: 'The question is the technology itself',
          paragraphs: [
            'Factum does no source-code review, architecture assessment or scalability testing. The AI discipline reads what the documents say: whose model, whose data, what falls under the AI Act. Whether the code holds up is a separate technical due diligence.'
          ]
        },
        {
          heading: 'You need background or integrity checks',
          paragraphs: [
            'Factum reads the data room. It does not screen people or companies for integrity or reputation, and it runs no background checks.'
          ]
        },
        {
          heading: 'There is no data room yet',
          paragraphs: [
            'Factum works on documents. If the room has not been assembled, there is nothing to read. A seller who is still preparing can start from [what a buyer will ask for](/data-room-checklist).'
          ]
        },
        {
          heading: 'You want the decision made for you',
          paragraphs: [
            'A model can find every change-of-control clause in the room. It cannot tell you which one kills the deal. Materiality depends on your structure, your price and your appetite, and none of those is in the data room.',
            'That is why the review step is mandatory: no export leaves without your reviewer’s sign-off. More in [what AI can’t do](/limits-of-ai).'
          ]
        }
      ],
      helps: {
        heading: 'Where Factum does fit',
        bullets: [
          'The whole data room read, with each finding cited to its document and location.',
          '{disciplines} disciplines in one pass, reconciled into one report.',
          'A running list of what the seller never uploaded.',
          'A deal you closed last year as the test: nothing in process is exposed, and you can hold the findings against what your team found then.'
        ],
        note: 'Factum is pre-launch: there is no public client or case study yet. The first real report you see is your own.'
      },
      datePublished: PUBLISHED
    }
  },
  nl: {
    'data-room-checklist': {
      metaTitle: 'Checklist data room voor de verkoop',
      metaDescription:
        'Wat een koper in een data room verwacht, per discipline: de stukken, de gaten die het meest kosten en wanneer u begint. Voor verkopers en sell-side brokers.',
      shortName: 'Checklist data room',
      h1: 'Wat hoort er in een data room vóór de verkoop?',
      answer:
        'Wat een koper gaat vragen, in een vorm waar een koper iets mee kan: cijfers die op elkaar aansluiten, de contracten die de omzet dragen, personeel, fiscaal, juridisch en IP, elk compleet en vindbaar. De duurste gaten zijn de stille: een contract dat niemand heeft geüpload, een jaar dat ontbreekt in een export, twee stukken met verschillende cijfers.',
      sections: [
        {
          heading: 'Welke stukken verwacht een koper?',
          bullets: [
            'Financieel: jaarrekeningen van de laatste drie jaar, managementrapportages en maandcijfers, werkkapitaal, schulden en schuldachtige posten, en de correcties achter de EBITDA in het informatiememorandum.',
            'Commercieel: een klantenlijst met omzet per klant, de grootste klantcontracten, prijzen en kortingen, klantverloop.',
            'Juridisch: vennootschapsstukken, belangrijke contracten en hun change-of-control-bepalingen, garanties, geschillen.',
            'Fiscaal: aangiften en aanslagen, open posities, de groepsstructuur.',
            'HR: contracten van sleutelpersonen, pensioenregelingen, cao’s.',
            'Operationeel: belangrijke leveranciers, enkelvoudige afhankelijkheden, doorlooptijden.',
            'Technologie en AI: licenties, wie eigenaar is van de data, van welke modellen het bedrijf afhangt.'
          ],
          after: [
            'De precieze lijst volgt de deal. Een kapitaalronde vraagt om een bestedingsplan, een verkoop om de orderportefeuille.'
          ]
        },
        {
          heading: 'Wat als een stuk er wel is, maar de vraag niet beantwoordt?',
          paragraphs: [
            'Dan leest een koper het als een gat, en vraagt ernaar. Een klantenlijst zonder omzet per klant is het bekende voorbeeld: aanwezig in de data room, onbruikbaar voor de vraag die een koper heeft.'
          ]
        },
        {
          heading: 'En cijfers die elkaar tegenspreken?',
          paragraphs: [
            'Omzet in de managementrapportage die afwijkt van de jaarrekening. Een aantal medewerkers in de HR-export dat niet klopt met de salarisadministratie. Een koper vindt beide bronnen. Vind ze eerder, en heb de uitleg klaar.'
          ]
        },
        {
          heading: 'Waarom is een ontbrekend stuk zo moeilijk te zien?',
          paragraphs: [
            'Omdat iets wat ontbreekt geen spoor achterlaat. Het contract dat niemand uploadde, het jaar dat mist in de salarisexport: er is geen passage om te citeren, dus niemand stuit er bij het lezen op. Het valt pas op als de data room wordt gelegd naast een lijst van wat een koper verwacht.'
          ]
        },
        {
          heading: 'Wanneer moet een verkoper beginnen?',
          paragraphs: [
            'Zo vroeg dat het antwoord op een bevinding nog kan zijn: “dat hebben we opgelost”. Zodra de data room live is, wordt het eerlijke antwoord: “dat weten we, en dit is de context”. Allebei werkt. Het eerste is meer waard.'
          ]
        },
        {
          heading: 'Hoe controleert Factum een data room?',
          paragraphs: [
            'Factum leest de data room zoals een koper dat doet: wat nog ontbreekt, wat niet klopt, en welke risico’s een koper gaat aankaarten. Elk punt gaat eerst naar uw team, omdat een contract dat in een ander bestand zit als ontbrekend kan verschijnen.',
            'Het vervangt geen vendor due diligence-rapport van een adviseur, en het is geen opruimdienst. Het benoemt wat ontbreekt; het verzamelen blijft bij de verkoper. Zie [wat AI niet kan](/limits-of-ai).'
          ]
        }
      ],
      helps: {
        heading: 'Voor sell-side brokers',
        bullets: [
          'De data room van uw cliënt gelezen zoals een koper hem leest, voordat de koper dat doet.',
          'Ontbrekende stukken en open vragen gaan als één verzoek naar uw cliënt, in het platform.',
          'Cijfers die elkaar tegenspreken, met beide bronnen erbij.',
          'Uw team beoordeelt elk punt. Factum tekent niets af.'
        ],
        note: 'Meer over [Factum voor verkopers en brokers](/pre-sale).'
      },
      datePublished: PUBLISHED
    },
    'due-diligence-timeline': {
      metaTitle: 'Hoe lang duurt due diligence?',
      metaDescription:
        'Waar de tijd in due diligence heen gaat, waar dagen te winnen zijn, wat niet sneller wordt, en waarom Factum geen datum noemt voordat het de data room heeft gezien.',
      shortName: 'Hoe lang due diligence duurt',
      h1: 'Hoe lang duurt due diligence?',
      answer:
        'Langer dan de meeste exclusiviteitsperiodes lief is. Een quality-of-earnings-analyse alleen dekt één dimensie in vier tot tien weken. De meeste tijd gaat op aan lezen, wachten en stukken najagen, niet aan oordelen. De pijplijnronde van Factum draait in uren; de review door uw team volgt daarna, in uw tempo.',
      sections: [
        {
          heading: 'Waar gaat de tijd heen?',
          bullets: [
            'Lezen. Een team onder tijdsdruk leest een steekproef van de data room en komt nog dagen tekort.',
            'Wachten. Specialisten werken na elkaar: fiscaal wacht op de financiële en juridische analyse, de waardering wacht op fiscaal.',
            'Najagen. Stukken die nooit zijn geüpload worden laat ontdekt, opgevraagd en opnieuw gelezen als ze binnenkomen.',
            'Afstemmen. Losse rapporten moeten naast elkaar worden gelegd voordat iemand kan zeggen wat ze betekenen voor de prijs.'
          ]
        },
        {
          heading: 'Waar zijn dagen te winnen?',
          paragraphs: [
            'Vooral in de eerste drie. Factum leest elk document in plaats van een steekproef, draait de modules die niet van elkaar afhangen tegelijk, en zet aan het begin op een rij wat ontbreekt in plaats van aan het eind.',
            'De dagen komen uit het parallel draaien, niet uit een antwoord dat sneller komt. Hoe de volgorde wordt bepaald, staat op [de platformpagina](/platform).'
          ]
        },
        {
          heading: 'Wat wordt niet sneller?',
          bullets: [
            'Het oordeel van uw reviewer over wat materieel is.',
            'De antwoorden van de verkoper op uw vragen, en de stukken die nog komen.',
            'De onderhandeling over de prijs en de koopovereenkomst.'
          ],
          after: [
            'Software verkort het lezen en het wachten. De gesprekken die de bevindingen opleveren duren zo lang als ze duren.'
          ]
        },
        {
          heading: 'Hoe verkort u het voordat het begint?',
          steps: [
            'Haal in de eerste dagen de lijst op van wat ontbreekt, nu er nog tijd is om erom te vragen.',
            'Brief uw adviseurs over wat er werkelijk in de data room zit, zodat hun uren gaan naar waar het risico zit.',
            'Als verkoper: zet de data room klaar voordat het proces begint. Zie [wat er in een data room hoort](/data-room-checklist).'
          ]
        },
        {
          heading: 'Waarom belooft Factum vooraf geen datum?',
          paragraphs: [
            'Omdat de duur afhangt van de omvang en staat van de data room, en die hebben we nog niet gezien. Het gesprek over de NDA en de data room duurt dertig minuten. Dagen later leest u de bevindingen, bron voor bron.'
          ]
        }
      ],
      helps: {
        heading: 'Wat Factum doet met de doorlooptijd',
        bullets: [
          'De pijplijnronde draait in uren, over {disciplines} disciplines.',
          'Elke bevinding komt met het brondocument en de vindplaats, klaar voor uw reviewer.',
          'De lijst van wat nooit binnenkwam, vanaf de eerste ronde.',
          'Uw team beoordeelt en tekent af in het platform, in eigen tempo.'
        ],
        note: 'Juridisch en fiscaal zijn afgestemd op Nederlands recht; laat ze voor een target elders door lokale advocaten controleren. Een deal die u vorig jaar sloot, werkt als test.'
      },
      datePublished: PUBLISHED
    },
    'when-not-to-use-factum': {
      metaTitle: 'Wanneer AI-due diligence niet past',
      metaDescription:
        'Zes situaties waarin Factum niet het juiste middel is: een ondertekende verklaring, buitenlands recht of fiscaal, een codereview, achtergrondchecks, geen data room, of een besluit dat u wilt uitbesteden.',
      shortName: 'Wanneer Factum niet past',
      h1: 'Wanneer is Factum niet het juiste middel?',
      answer:
        'Als de deal een handtekening, een rechtsgebied of een soort review nodig heeft die Factum niet levert. Factum leest elk document in de data room en verwijst bij elke bevinding naar de bron en de vindplaats. Uw eigen reviewer bepaalt wat ertoe doet en tekent af. Dit zijn de situaties waarin u iets anders nodig hebt, of iets ernaast.',
      sections: [
        {
          heading: 'U hebt een ondertekende verklaring nodig',
          paragraphs: [
            'Een quality-of-earnings-rapport of een vendor due diligence-rapport komt uit een aparte opdracht aan een accountant of adviseur die het ondertekent, en een bank of koper kan op dat rapport vertrouwen. Factum vervangt dat rapport niet, geeft geen assurance en tekent niets. Uw reviewer tekent de bevindingen af voor eigen gebruik.',
            'Vraagt de financiering of de koopovereenkomst om een ondertekend rapport, laat dat dan maken. Factum kan ernaast draaien, over {disciplines} disciplines, zodat de specialisten beginnen bij wat er werkelijk in de data room zit.'
          ]
        },
        {
          heading: 'Juridisch en fiscaal beslissen de deal, en het target zit in het buitenland',
          paragraphs: [
            'Juridisch en fiscaal zijn afgestemd op Nederlands recht. De financiële, commerciële en operationele analyse werkt in elk rechtsgebied. Laat bij een target elders de juridische en fiscale bevindingen door lokale advocaten controleren.'
          ]
        },
        {
          heading: 'De vraag gaat over de technologie zelf',
          paragraphs: [
            'Factum doet geen broncodereview, architectuurbeoordeling of schaalbaarheidstest. De AI-discipline leest wat de stukken zeggen: wiens model, wiens data, wat onder de AI Act valt. Of de code deugt, is een aparte technische due diligence.'
          ]
        },
        {
          heading: 'U hebt achtergrond- of integriteitsonderzoek nodig',
          paragraphs: [
            'Factum leest de data room. Het screent geen personen of bedrijven op integriteit of reputatie, en doet geen antecedentenonderzoek.'
          ]
        },
        {
          heading: 'Er is nog geen data room',
          paragraphs: [
            'Factum werkt met documenten. Is de data room nog niet samengesteld, dan valt er niets te lezen. Een verkoper die nog voorbereidt, kan beginnen bij [wat een koper gaat vragen](/data-room-checklist).'
          ]
        },
        {
          heading: 'U wilt dat het besluit voor u wordt genomen',
          paragraphs: [
            'Een model vindt elke change-of-control-bepaling in de data room. Het kan niet zeggen welke de deal laat klappen. Materialiteit hangt af van uw structuur, uw prijs en uw risicobereidheid, en geen van drieën staat in de data room.',
            'Daarom is de review verplicht: geen export gaat de deur uit zonder de aftekening van uw reviewer. Meer in [wat AI niet kan](/limits-of-ai).'
          ]
        }
      ],
      helps: {
        heading: 'Waar Factum wel past',
        bullets: [
          'De hele data room gelezen, met bij elke bevinding het document en de vindplaats.',
          '{disciplines} disciplines in één ronde, afgestemd tot één rapport.',
          'Een doorlopende lijst van wat de verkoper nooit heeft geüpload.',
          'Een deal die u vorig jaar sloot als test: niets uit een lopend proces ligt op tafel, en u legt de bevindingen naast wat uw team destijds vond.'
        ],
        note: 'Factum is pre-launch: er is nog geen publieke klant of case study. Het eerste echte rapport dat u ziet, is uw eigen.'
      },
      datePublished: PUBLISHED
    }
  },
  de: GUIDES_DE,
  es: GUIDES_ES,
  pt: GUIDES_PT
};

export function getGuide(slug: GuideSlug, locale: GuideLocale): Guide {
  return GUIDES[locale][slug];
}
