import type { GuideLocale, GuideSlug } from './guideRoutes';
import { CHROME_DE, GUIDES_DE } from './guides.de';
import { CHROME_ES, GUIDES_ES } from './guides.es';
import { CHROME_PT, GUIDES_PT } from './guides.pt';

/**
 * Copy for the four decision pages. English and Dutch here; German, Spanish
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
 *  - Counts never as digits: `{disciplines}`, `{modules}`, `{waves}` and
 *    `{blocks}` are replaced with DISCIPLINE_COUNT, MODULE_COUNT, WAVE_COUNT
 *    and HARD_BLOCK_COUNT from lib/site.ts at render.
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

/** A two-column comparison, rendered as a text table (stacks on a phone). */
export interface GuideTable {
  heading: string;
  /** Header of the label column (screen readers; hidden visually on a phone). */
  corner: string;
  /** The two things compared. The second is Factum's category and is emphasised. */
  columns: [string, string];
  rows: { label: string; cells: [string, string] }[];
  /** One line under the table. */
  note?: string;
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
  /** Optional comparison table, shown before the sections. */
  table?: GuideTable;
  sections: GuideSection[];
  /** Optional FAQ after the sections; emitted as FAQPage by Disclosures. Plain text, no links. */
  faq?: { heading: string; items: { q: string; a: string }[] };
  helps: { heading: string; bullets: string[]; note: string };
  datePublished: string;
}

export interface GuideChrome {
  tocLabel: string;
  relatedLabel: string;
  guidesLabel: string;
  /** Related-link label for /governance, which every guide links to. */
  governanceLabel: string;
}

export const GUIDE_CHROME: Record<GuideLocale, GuideChrome> = {
  en: { tocLabel: 'On this page', relatedLabel: 'Read on', guidesLabel: 'Guides', governanceLabel: 'How your documents are handled' },
  nl: { tocLabel: 'Op deze pagina', relatedLabel: 'Verder lezen', guidesLabel: 'Gidsen', governanceLabel: 'Hoe uw stukken worden behandeld' },
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
    },
    'ai-due-diligence-vs-data-room-ai': {
      metaTitle: 'AI due diligence vs. data room AI',
      metaDescription:
        'Data room AI helps run the room: organising, redaction, search, Q&A. AI due diligence reads every document for the buyer or sell-side adviser and cites each finding.',
      shortName: 'AI due diligence vs. data room AI',
      h1: 'AI due diligence vs. data room AI: what is the difference?',
      answer:
        'Data room AI helps run the room: it organises, redacts and searches the documents and manages the Q&A for the party that runs the process. An AI due diligence platform works for the buyer, or for the sell-side adviser preparing the room. It reads every document in the room and returns findings, each citing its source document and location. Factum is the second kind. Your own reviewer decides what matters and signs off.',
      table: {
        heading: 'Side by side',
        corner: 'Question',
        columns: ['Data room AI', 'AI due diligence platform'],
        rows: [
          {
            label: 'Who it works for',
            cells: [
              'The party that runs the room, usually the seller and its adviser, and everyone working in it',
              'The buyer, or the sell-side adviser who wants the room read the way a buyer will read it'
            ]
          },
          {
            label: 'What it is for',
            cells: [
              'Running the room: order, access, redaction, search, questions and answers',
              'Judging the target: what the documents mean for the deal'
            ]
          },
          {
            label: 'What it reads',
            cells: [
              'Documents as they are uploaded, to index, tag, redact and search them',
              'Every document in the room, across {disciplines} disciplines, held against each other'
            ]
          },
          {
            label: 'What you get',
            cells: [
              'A tidy, searchable room and a managed Q&A log',
              'Findings with a severity, figures that contradict each other, and a list of what is missing'
            ]
          },
          {
            /* Vendor names below are stated only as each vendor describes itself on its
             own website (checked 12-11-2026). Sources:
             Datasite Blueflame AI: https://datasite.com/en/products/blueflame-ai
             Imprima AI due diligence (Smart Index, Smart Review, Smart Summaries,
               Smart Q&A, Smart Redaction): https://www.imprima.com/ai-due-diligence
             Drooms AI (auto-structuring to the index, AI Assistant):
               https://drooms.com/drooms-intelligence/ and https://drooms.com/ai/
             Ansarada AI-Redact, AI-Sort, Ask AiDA, AI-Smart Q&A:
               https://www.ansarada.com/data-room/ai-redaction
               https://www.ansarada.com/data-room/ai-sort
             Intralinks VDRPro AI Redaction:
               https://www.intralinks.com/products/virtual-data-room
             No claim is made about any vendor's quality. */
            label: 'Examples',
            cells: [
              'Datasite (Blueflame AI), Imprima, Drooms, Ansarada, Intralinks',
              'Factum. Legal and finance AI tools cover part of the same reading: see below'
            ]
          },
          {
            label: 'Sourcing',
            cells: [
              'Differs per provider and feature',
              'Each finding quotes the supporting passage word for word, with its source document and location'
            ]
          },
          {
            label: 'Who signs off',
            cells: [
              'Nothing to sign: it manages the room, it does not review the target',
              'Your own reviewer. No export leaves without that sign-off. Factum signs nothing.'
            ]
          }
        ],
        note:
        'Each provider describes its own features, and they change often. Some data rooms now also review documents inside the room: Imprima describes AI contract review and summaries, Datasite an assistant that spots potential gaps. Ask yours what each answer cites and who signs it off.'
      },
      sections: [
        {
          heading: 'What does data room AI do?',
          paragraphs: [
            'Virtual data room providers have built AI into the room itself. It helps whoever runs the process keep the room in order and keep it moving.'
          ],
          bullets: [
            'Organising: sorting and indexing uploads into a structure.',
            'Redacting: finding personal data and sensitive passages before documents are shared.',
            'Searching: finding the documents that mention a term or touch a question.',
            'Q&A: routing questions from bidders, helping answer them, tracking what is still open.'
          ],
          after: ['The job is the room: what is in it, who sees what, which questions are open.']
        },
        {
          heading: 'What does an AI due diligence platform do?',
          paragraphs: [
            'It reads the room for the person who has to judge the target. Factum reads every document in the data room, across {disciplines} disciplines, and holds them against each other: a contract against the revenue it is meant to carry, the management accounts against the annual accounts.',
            'Every finding quotes the supporting passage word for word, with its source document and location, so your reviewer can check it at the source. What should be in the room and is not goes on a separate list.'
          ]
        },
        {
          /* Self-descriptions, checked on each vendor's own website 12-11-2026:
           Kira (Litera), "purpose-built for high-volume, high-stakes review and
             due diligence", for lawyers: https://www.litera.com/products/kira
           Harvey, "AI software for legal and professional services", law firms
             and in-house teams: https://www.harvey.ai/
           Luminance, contract intelligence platform: https://www.luminance.com/
           Hebbia, "AI built for the rigor of finance", investors and bankers:
             https://www.hebbia.com/
           No claim about their quality or coverage beyond that. */
          heading: 'Where do legal and finance AI tools fit?',
          paragraphs: [
            'A deal team also meets AI tools built for one profession. Kira, part of Litera, describes itself as built for high-volume review and due diligence, for lawyers. Harvey is AI software for legal and professional services, used by law firms and in-house teams. Luminance calls itself a contract intelligence platform. Hebbia describes AI built for finance, for investors and bankers.',
            'These tools work on the documents and questions you give them, mostly within one discipline. Factum reads the whole room across {disciplines} disciplines in one run and holds the disciplines against each other: the financial module reads the legal findings before it starts, tax reads both. Which tool fits depends on who is asking and what the deal needs.'
          ]
        },
        {
          heading: 'When do you need which?',
          bullets: [
            'You run a sale process and want the room organised, redacted and the questions under control: data room AI.',
            'You are buying and need to know what the documents say about the target: AI due diligence.',
            'You advise the seller and want the room read the way a buyer will read it, before a buyer does: AI due diligence on the seller’s room. See [Factum for sellers and brokers](/pre-sale).'
          ],
          after: ['Most deals use both. The data room holds the documents; Factum reads them.']
        },
        {
          heading: 'How do the two work together?',
          paragraphs: [
            'The data room stays where the process runs: access, versions, questions and answers. Your team uploads the documents from the room into Factum. Factum returns the findings, and your reviewer goes through them in the platform. How a run is set up is on [the platform page](/platform).'
          ]
        },
        {
          heading: 'What neither replaces',
          paragraphs: [
            'A signed report. A quality-of-earnings or vendor due diligence report comes from a separate engagement with an accountant or adviser who signs it. Factum gives no assurance; your reviewer signs off the findings for your own use. More in [when Factum is the wrong tool](/when-not-to-use-factum).'
          ]
        }
      ],
      faq: {
        heading: 'Frequently asked questions',
        items: [
          {
            q: 'Is a data room with AI features the same as AI due diligence?',
            a: 'No. Data room AI helps run the room: organising, redaction, search and Q&A. AI due diligence reads every document for the buyer or the sell-side adviser and returns findings about the target, each citing its source document and location.'
          },
          {
            q: 'Does Factum replace our virtual data room?',
            a: 'No. The data room stays where the process runs. Your team uploads the documents into Factum, which reads them and returns findings for your reviewer.'
          },
          {
            q: 'Who signs off the findings?',
            a: 'Your own reviewer. Human review is mandatory: no export leaves the platform without your reviewer’s sign-off. Factum signs nothing and gives no assurance.'
          },
          {
            q: 'Which disciplines does Factum cover?',
            a: '{disciplines} disciplines: financial, commercial, legal, tax, HR, AI, operational, and valuation with deal economics, reconciled into one report.'
          },
          {
            q: 'Does it work for deals outside the Netherlands?',
            a: 'The financial, commercial and operational reads work in any jurisdiction. Legal and tax are tuned to Dutch law; for a target elsewhere, have local counsel check those findings.'
          },
          {
            q: 'Can we test it before a live deal?',
            a: 'Yes. A deal you closed last year works as the test: nothing in process is exposed, and you can hold the findings against what your team found then. Factum is pre-launch, so the first real report you see is your own.'
          }
        ]
      },
      helps: {
        heading: 'Where Factum fits',
        bullets: [
          'For private equity and other acquirers, and for sell-side brokers.',
          'The whole data room read, with each finding cited to its document and location.',
          '{disciplines} disciplines in one pass, reconciled into one report.',
          'Your team reviews the findings and signs off in the platform.'
        ],
        note: 'Factum is pre-launch: there is no public client or case study yet. Legal and tax are tuned to Dutch law. Choosing a vendor? Use [ten questions for an AI due diligence vendor](/ai-due-diligence-vendor-questions). Before signing: [red flag review of a data room](/red-flag-review). Buying a Dutch BV: [due diligence on a Dutch BV](/dutch-bv-due-diligence). And [how your documents are handled](/governance).'
      },
      datePublished: '2026-11-08'
    },
    /* Buyer guide (GTM/ops/geo-seo-audit-2026-11-12.md, A7 / asset 3).
       Dutch-law targets only; legal points are listed for review in
       REVIEW-WOUTER.md at the repo root. No thresholds or article numbers on
       purpose: they go stale and are for a lawyer to state. */
    'dutch-bv-due-diligence': {
      metaTitle: 'Due diligence on a Dutch BV: what a buyer checks',
      metaDescription:
        'Buying a Dutch BV? What to check in the data room under Dutch law: shares, change of control, works council, pensions, fiscal unity, ACM, and how it relates to the FDD.',
      shortName: 'Due diligence on a Dutch BV',
      h1: 'Due diligence on a Dutch BV: what does a buyer check in the data room?',
      answer:
        'When the target is a Dutch private limited company (besloten vennootschap, BV), the data room has to answer questions that Dutch law sets: who really holds the shares, which contracts survive the change of control, what the works council and the pension scheme require, and which tax positions come along with the company. This page is about Dutch-law targets only. It explains what a buyer checks; it is not legal advice.',
      sections: [
        {
          heading: 'Who holds the shares, and can they be transferred?',
          bullets: [
            'Articles of association (statuten): the current text, and any transfer restriction (blokkeringsregeling) such as a right of first refusal or a consent requirement.',
            'Shareholders’ register: every issue and transfer since incorporation, each backed by a notarial deed. Shares in a BV transfer by notarial deed, so a gap in the chain of deeds is a gap in title.',
            'Depositary receipts (certificaten) held through a foundation (STAK), pledges and usufruct on shares, and who holds the voting rights.',
            'Shareholders’ agreement: drag-along and tag-along, good and bad leaver, vetoes that survive the sale.',
            'Extracts from the trade register (KvK) and the UBO register that match the shareholders’ register.'
          ],
          after: [
            'A missing deed or an unrecorded transfer can often be repaired before signing. Found after signing, it becomes a warranty discussion.'
          ]
        },
        {
          heading: 'Which contracts change hands with the company?',
          paragraphs: [
            'In a share deal the contracts stay with the BV, so the question is which of them let the counterparty walk away or renegotiate when control changes. In an asset deal each contract has to be transferred, which usually needs the counterparty’s cooperation.'
          ],
          bullets: [
            'Change-of-control and termination clauses in the largest customer, supplier, licence and lease contracts.',
            'Non-assignment and exclusivity clauses that would bind the buyer’s group after closing.',
            'Bank facilities with change-of-control and cross-default provisions, and the security granted under them.',
            'Guarantees the BV gave for group companies, including liability statements filed at the trade register (403-verklaringen).'
          ]
        },
        {
          heading: 'What do the works council, employees and pensions require?',
          bullets: [
            'Works council (ondernemingsraad): where there is one, a change of control usually gives it a right to advise, and that advice is sought while it can still influence the decision.',
            'Trade unions: depending on the size of the companies involved, the SER Merger Code (SER-Fusiegedragsregels) can require them to be informed.',
            'Employment terms: contracts of key people, non-competes, bonus and retention arrangements that pay out on a sale, and the collective labour agreement (cao) that applies.',
            'Pensions: which scheme applies, whether participation in an industry-wide pension fund is mandatory, and where the scheme stands in the transition under the Future of Pensions Act (Wet toekomst pensioenen).',
            'In an asset deal, employees transfer by operation of law with their terms (overgang van onderneming).'
          ]
        },
        {
          heading: 'When does the ACM or another regulator come in?',
          paragraphs: [
            'When the turnover of the parties passes the thresholds of the Dutch Competition Act (Mededingingswet), the deal has to be notified to the Authority for Consumers and Markets (ACM) before closing; above the EU thresholds the European Commission takes over.',
            'Separately, buying a vital provider or a company with sensitive technology can need a filing under the Dutch investment screening act (Wet Vifo), and a licence in a regulated sector can need the regulator’s consent. Whether any of this applies is a question for your lawyer early in the process, because it sets the timetable.'
          ]
        },
        {
          heading: 'Which tax positions come with the company?',
          bullets: [
            'Fiscal unity for corporate income tax (fiscale eenheid): the target leaves the seller’s fiscal unity on the sale, with consequences for losses and for earlier transactions within the group.',
            'Fiscal unity for VAT: each member is jointly and severally liable for the VAT of the whole unity over the period it belonged to it.',
            'Open assessments, audits by the Dutch tax authority (Belastingdienst), and any ruling or agreement the target relies on.',
            'Payroll taxes and chain liability (ketenaansprakelijkheid) where the business works with subcontractors or hired staff.',
            'Deferred tax liabilities that would otherwise surface in the first tax return after closing.'
          ]
        },
        {
          heading: 'What does the data room usually not show?',
          paragraphs: [
            'The documents nobody uploaded. A notarial deed from fifteen years ago, a side letter to a customer contract, the works council’s advice, the latest statement from the pension provider. An absence leaves no passage to quote, so it only shows when the room is checked against a list of what should be there.',
            'For the seller’s side of the same list, see [the data room checklist](/data-room-checklist).'
          ]
        },
        {
          heading: 'How does an AI read of the full data room relate to the accountant’s FDD?',
          paragraphs: [
            'The financial due diligence (FDD) of an accountancy or advisory firm goes deep on the figures: quality of earnings, normalised EBITDA, net debt and working capital. It ends in a report the firm signs, and that a bank or a W&I insurer may want to see.',
            'Factum reads every document in the room across {disciplines} disciplines and returns findings, each quoting its source document and location. It gives no assurance and signs nothing; your own reviewer signs off the findings for your own use. Run next to an FDD, it shows the specialists early what the room contains, what contradicts what and what is missing, so their hours go where the risk is. The FDD and your lawyer’s legal due diligence stay what they are.',
            'How the reading is ordered is on [the platform page](/platform). How this differs from the AI inside a virtual data room is on [AI due diligence vs. data room AI](/ai-due-diligence-vs-data-room-ai).'
          ]
        },
        {
          heading: 'How do the findings reach the purchase agreement?',
          paragraphs: [
            'A finding usually ends up in one of three places in the share purchase agreement (SPA): the price, a specific indemnity for a known risk, or the disclosure against the warranties. Under a warranty and indemnity (W&I) policy, risks the buyer knew about before signing are commonly excluded from cover.',
            'That is one more reason to have the findings early and with their sources: your lawyer can then decide per finding where it belongs. Before the binding offer, the [red flag review](/red-flag-review) is the shorter version of the same reading.'
          ]
        }
      ],
      faq: {
        heading: 'Frequently asked questions',
        items: [
          {
            q: 'Does this page apply to targets outside the Netherlands?',
            a: 'No. It covers Dutch-law targets, mostly the BV. Factum’s financial, commercial and operational reads work in any jurisdiction; legal and tax are tuned to Dutch law, so for a target elsewhere have local counsel check those findings.'
          },
          {
            q: 'Is this legal advice?',
            a: 'No. It explains what a buyer usually checks in the data room of a Dutch BV. Every deal is different; have your own lawyer and tax adviser assess the specific target.'
          },
          {
            q: 'Does Factum replace the accountant’s financial due diligence?',
            a: 'No. An FDD is a signed report from a separate engagement, and a bank or insurer may rely on it. Factum gives no assurance. It reads the whole room across {disciplines} disciplines next to the FDD, and your own reviewer signs off its findings.'
          },
          {
            q: 'Can Factum see what is missing from the data room?',
            a: 'Yes, as a separate list of what a buyer would expect and did not find. Each point goes to your reviewer first, because a document filed inside another file can show as missing.'
          },
          {
            q: 'Where are the documents processed?',
            a: 'On EU endpoints by default, with zero retention at the model provider and pseudonymisation before analysis. Legal, financial and tax analysis is hard-gated to zero-retention endpoints.'
          }
        ]
      },
      helps: {
        heading: 'Where Factum fits on a Dutch BV deal',
        bullets: [
          'Every document in the room read, with each finding citing its source document and location.',
          '{disciplines} disciplines in one run: {modules} modules in {waves} waves, where financial reads the legal findings and tax reads both.',
          'Legal and tax tuned to Dutch law.',
          'Your reviewer signs off in the platform. No export leaves without that sign-off.'
        ],
        note: 'Factum is pre-launch: there is no public client or case study yet. More on [Factum for acquirers](/diligence-sprint) and [how your documents are handled](/governance). Before signing: [red flag review of a data room](/red-flag-review). Choosing a tool: [ten questions for an AI due diligence vendor](/ai-due-diligence-vendor-questions).'
      },
      datePublished: '2026-11-12'
    },
    /* Buyer guide (GTM/ops/geo-seo-audit-2026-11-12.md, A8 / asset 2). */
    'red-flag-review': {
      metaTitle: 'Red flag review of a data room before signing',
      metaDescription:
        'What a red flag review is, which red flags decide a deal per discipline, what the report should contain and where it goes wrong. For buyers, before signing.',
      shortName: 'Red flag review of a data room',
      h1: 'Red flag review: what does a buyer check in the data room before signing?',
      answer:
        'A red flag review reads the data room for the issues that could stop the deal or move the price, and reports only those. It is narrower than full due diligence and comes earlier: before the binding offer or the signing, while there is still time to walk away, renegotiate or ask for a specific indemnity. A useful red flag report names each issue, its severity, and the document and location it comes from.',
      sections: [
        {
          heading: 'What is a red flag review, and how is it different from full due diligence?',
          paragraphs: [
            'Full due diligence describes the target: the figures, the contracts, the people and the tax position, in a report per discipline. A red flag review asks one question of the same documents: what here could kill the deal or change what we pay? Everything else stays out of the report.',
            'The reading does not get lighter. To find the one clause that matters, every contract has to be read. What gets shorter is the report.'
          ]
        },
        {
          heading: 'Which red flags decide a deal?',
          bullets: [
            'Legal: change-of-control and termination rights in the contracts that carry the revenue, disputes, guarantees given for others, gaps in the title to the shares.',
            'Commercial: customer concentration, contracts that end or reprice soon after closing, churn the pitch does not show.',
            'Financial: EBITDA adjustments the documents do not support, working capital that swings at year-end, debt and debt-like items outside the net debt.',
            'Tax: open assessments, positions the target relies on without a ruling, liabilities from a fiscal unity it leaves.',
            'HR: key people without a contract or a non-compete, bonuses that pay out on a sale, pension obligations that are not on the balance sheet.',
            'Operational and AI: single suppliers, licences that do not transfer, models or data the business depends on and does not own.'
          ],
          after: [
            'Which of these is material depends on your price, your structure and your appetite. None of those are in the data room.'
          ]
        },
        {
          heading: 'What should a red flag report contain?',
          paragraphs: [
            'Per issue: what it is, how severe it is, the supporting passage word for word, and the document and location where it sits. Then the list of what never arrived. A finding without a source is a finding your reviewer has to redo.',
            'Every Factum finding carries the same six fields: module, finding, verbatim excerpt, severity, source and location, and human review.'
          ]
        },
        {
          heading: 'Where does a red flag review go wrong?',
          bullets: [
            'Only a sample was read, and the clause that matters sits in the contract nobody opened.',
            'Nobody checked what is missing, and the red flag is the document that was never uploaded.',
            'The disciplines were read apart. A contract that ends next year is a legal point and a revenue point at once, and only one report noticed.',
            'The findings come without a source, so the team cannot tell a real issue from a misreading.'
          ]
        },
        {
          heading: 'How long does it take?',
          paragraphs: [
            'It depends on the size and state of the room, and on how quickly the seller answers. Where the days go, and where they can be won, is in [how long due diligence takes](/due-diligence-timeline).'
          ]
        },
        {
          heading: 'How does Factum run a red flag review?',
          paragraphs: [
            'Your team uploads the room. {modules} modules read it in {waves} waves, in a fixed order: commercial, HR, operational and AI first, then legal, then financial, which reads the legal findings, then tax, deal economics and valuation. Each finding quotes its source. {blocks} hard-block conditions stop a draft and put it in front of your reviewer, unapproved.',
            'Your reviewer decides what counts as a red flag for this deal and signs off; no export leaves the platform without that sign-off. More on [the platform page](/platform), and on how this differs from the AI inside a virtual data room in [AI due diligence vs. data room AI](/ai-due-diligence-vs-data-room-ai).'
          ]
        }
      ],
      faq: {
        heading: 'Frequently asked questions',
        items: [
          {
            q: 'Can AI do a red flag review on its own?',
            a: 'It can do the reading: every document and every clause, held against each other, with sources. It cannot decide what is material for your deal. That is why human review is mandatory: your reviewer signs off before anything leaves the platform.'
          },
          {
            q: 'Who signs the red flag report?',
            a: 'Your own reviewer, for your own use. Factum signs nothing and gives no assurance. If a bank or insurer needs a signed report, commission one from an adviser; Factum can run next to it.'
          },
          {
            q: 'Is a red flag review enough before signing?',
            a: 'For some deals it is the first step and full due diligence follows; for others it is what the timetable allows. Your advisers and your reviewer decide. Factum reads the whole room either way.'
          },
          {
            q: 'Does it work for a target outside the Netherlands?',
            a: 'The financial, commercial and operational reads work in any jurisdiction. Legal and tax are tuned to Dutch law; for a target elsewhere, have local counsel check those findings.'
          },
          {
            q: 'Can we test it before a live deal?',
            a: 'Yes. A deal you closed last year works as the test: nothing in process is exposed, and you can hold the findings against what your team found then. Factum is pre-launch, so the first real report you see is your own.'
          }
        ]
      },
      helps: {
        heading: 'Where Factum fits',
        bullets: [
          'For private equity and other acquirers, before the binding offer or the signing.',
          'Every document in the room read, with each finding citing its source document and location.',
          'A list of what the seller never uploaded, from the first run on.',
          'Your reviewer signs off in the platform.'
        ],
        note: 'Factum is pre-launch: there is no public client or case study yet. Legal and tax are tuned to Dutch law. Buying a Dutch BV? See [due diligence on a Dutch BV](/dutch-bv-due-diligence). Choosing a tool? [Ten questions for an AI due diligence vendor](/ai-due-diligence-vendor-questions), and [how your documents are handled](/governance).'
      },
      datePublished: '2026-11-12'
    },
    /* Buyer guide, open lead magnet (GTM/ops/geo-seo-audit-2026-11-12.md, asset 4). */
    'ai-due-diligence-vendor-questions': {
      metaTitle: 'How to evaluate an AI due diligence vendor: 10 questions',
      metaDescription:
        'Ten questions to ask any AI due diligence vendor before a data room goes in: where documents go, retention, the NDA, citations, missing documents, sign-off, accuracy.',
      shortName: 'Ten questions for an AI due diligence vendor',
      h1: 'How to evaluate an AI due diligence vendor: 10 questions',
      answer:
        'Ask before the data room goes in. Ten questions cover what a buyer needs to know: where the documents are processed, who keeps them, whether the NDA allows it, how each finding is sourced, what the tool did not read, what is missing, which law it knows, who signs, what it claims about accuracy and what drives the price. Ask for every answer in writing. The list works for any vendor, including us.',
      sections: [
        {
          heading: '1. Where are our documents processed?',
          paragraphs: [
            'Data room documents are confidential under the NDA and often hold personal data under the GDPR. Ask which model providers handle them, in which region, and whether that region is the default or an option you have to switch on.',
            'A good answer names the providers and the region, and sits in the data processing agreement.'
          ]
        },
        {
          heading: '2. Does anyone keep or train on our documents?',
          paragraphs: [
            'Two separate questions. Does the model provider retain prompts and documents, and for how long? Does the vendor or the provider use them to train a model?',
            'A good answer gives the retention period per provider, says no to training, and puts both in the contract.'
          ]
        },
        {
          heading: '3. Does our NDA allow it?',
          paragraphs: [
            'Most M&A NDAs allow disclosure only to named representatives: staff, advisers, financing sources. A software platform and its sub-processors are rarely on that list. Have your lawyer check before the first upload.',
            'A good answer: the vendor signs an NDA before any document moves, and lists its sub-processors.'
          ]
        },
        {
          heading: '4. At what level does each finding cite its source?',
          paragraphs: [
            'Document, page, or the passage itself. A finding your reviewer cannot trace has to be redone. Not every finding has a passage to quote: a calculation over a spreadsheet points to the sheet or the cells it used.',
            'A good answer: every finding names its source document and location, with the supporting passage where there is one.'
          ]
        },
        {
          heading: '5. Does it read every document, or a sample?',
          paragraphs: [
            'Some tools answer questions by retrieving the passages that look relevant. That is search, and the clause that matters can sit in a document it never opened. Ask what share of the room was read, and what happens to a file it could not read: a scan, a locked PDF, a broken export.',
            'A good answer: every document is read, and anything that could not be read is listed.'
          ]
        },
        {
          heading: '6. Does it tell us what is missing?',
          paragraphs: [
            'An absent document leaves no passage to quote, so a tool that only reads what is there will never flag it. The red flag is often the contract nobody uploaded.',
            'A good answer: a separate list of what a buyer would expect and did not find, checked by a person.'
          ]
        },
        {
          heading: '7. Which disciplines, and which law?',
          paragraphs: [
            'Financial, commercial and operational reads work across borders. Legal and tax depend on the law of the target. Ask which disciplines are covered in one run, whether they read each other’s findings, and which jurisdictions the legal and tax reads are built for.',
            'A good answer names the jurisdictions, and says plainly where you need local counsel.'
          ]
        },
        {
          heading: '8. Who signs off the findings?',
          paragraphs: [
            'AI output is a draft until a person accepts it. Ask whether anything can be exported without a named human sign-off, whether the vendor gives any assurance, and whether a bank or a W&I insurer can rely on the output.',
            'A good answer names the human gate and is clear about reliance. Most platforms give no assurance; that is fine, as long as they say so.'
          ]
        },
        {
          heading: '9. What does the vendor claim about accuracy, and who measured it?',
          paragraphs: [
            'A percentage without a method is a marketing number. Ask on which dataset it was measured, by whom, and whether anyone outside the vendor checked it.',
            'A good answer gives the method, the dataset and the auditor, or says plainly that there is no audited rate.'
          ]
        },
        {
          heading: '10. What does it cost, and what moves the price?',
          paragraphs: [
            'Per seat, per document, per page or per deal: the model sets what a large or messy room will cost you. Ask what is included, what is extra, and what happens if the room grows during the process.',
            'A good answer is one price for an agreed scope, in writing, before the room goes in.'
          ]
        },
        {
          heading: 'How does Factum answer the ten?',
          paragraphs: ['Briefly, and with the gaps left in.'],
          steps: [
            'On EU endpoints by default, under a data processing agreement.',
            'Zero retention at the model provider, which does not train on your documents. Pseudonymisation before analysis. Legal, financial and tax analysis is hard-gated to zero-retention endpoints.',
            'NDA first. Documents move only after it is signed.',
            'Every finding names its source document and location, with the supporting passage where there is one.',
            'Every document in the room is read, across {modules} modules in {waves} waves.',
            'A list of what never arrived, from the first run on.',
            '{disciplines} disciplines in one run. Legal and tax are tuned to Dutch law; for a target elsewhere, have local counsel check those findings.',
            'Your own reviewer signs off. No export leaves the platform without that sign-off. Factum signs nothing and gives no assurance.',
            'No audited accuracy rate. Factum is pre-launch.',
            'Price on request: one price for the whole scope, set against the size and state of the data room.'
          ],
          after: [
            'Details on [how your documents are handled](/governance) and [what AI cannot do in due diligence](/limits-of-ai).'
          ]
        }
      ],
      faq: {
        heading: 'Frequently asked questions',
        items: [
          {
            q: 'Do these questions apply to a virtual data room with AI features?',
            a: 'Yes. Questions 1 to 3 and 8 to 10 apply to any tool that touches the documents. Questions 4 to 6 matter most for a tool that claims to do the diligence reading itself.'
          },
          {
            q: 'Which question matters most?',
            a: 'Question 3 comes first in time: if the NDA does not allow the upload, the rest does not matter. After that, question 8. Whoever signs carries the findings.'
          },
          {
            q: 'How do we test a vendor’s answers?',
            a: 'Run it on a deal you closed last year. Nothing in process is exposed, and you can hold the findings against what your team found then.'
          },
          {
            q: 'Can AI due diligence replace our advisers?',
            a: 'No. It reads the whole room and shows the specialists where to look. The accountant’s financial due diligence and your lawyer’s legal due diligence stay what they are, and your own reviewer decides what matters.'
          }
        ]
      },
      helps: {
        heading: 'Where Factum fits',
        bullets: [
          'For private equity and other acquirers, before the binding offer or the signing.',
          'Every document in the room read, with each finding citing its source document and location.',
          'A list of what the seller never uploaded.',
          'Your reviewer signs off in the platform.'
        ],
        note: 'Factum is pre-launch: there is no public client or case study yet. How this differs from the AI in a virtual data room: [AI due diligence vs. data room AI](/ai-due-diligence-vs-data-room-ai). Before signing: [red flag review of a data room](/red-flag-review). Buying a Dutch BV: [due diligence on a Dutch BV](/dutch-bv-due-diligence).'
      },
      datePublished: '2026-11-12'
    }
  },
  nl: {
    'data-room-checklist': {
      metaTitle: 'Data room request list: checklist voor de verkoop',
      metaDescription:
        'De request list van een koper, per discipline: welke stukken in de data room horen, de gaten die het meest kosten en wanneer u begint. Voor verkopers en sell-side brokers.',
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
    },
    'ai-due-diligence-vs-data-room-ai': {
      metaTitle: 'AI-due diligence vs. AI in de data room',
      metaDescription:
        'AI in de data room helpt bij het beheer: ordenen, anonimiseren, zoeken, Q&A. AI-due diligence leest elk document voor koper of sell-side adviseur, met bron per bevinding.',
      shortName: 'AI-due diligence vs. AI in de data room',
      h1: 'AI-due diligence of AI in de data room: wat is het verschil?',
      answer:
        'AI in de data room helpt de data room te beheren: ze ordent, anonimiseert en doorzoekt de stukken en regelt de Q&A, voor de partij die het proces leidt. Een AI-due-diligenceplatform werkt voor de koper, of voor de sell-side adviseur die de data room klaarzet. Het leest elk document in de data room en levert bevindingen, elk met het brondocument en de vindplaats. Factum is het tweede. Uw eigen reviewer bepaalt wat ertoe doet en tekent af.',
      table: {
        heading: 'Naast elkaar',
        corner: 'Vraag',
        columns: ['AI in de data room', 'AI-due-diligenceplatform'],
        rows: [
          {
            label: 'Voor wie',
            cells: [
              'De partij die de data room beheert, meestal de verkoper en zijn adviseur, en iedereen die erin werkt',
              'De koper, of de sell-side adviseur die de data room gelezen wil hebben zoals een koper dat doet'
            ]
          },
          {
            label: 'Waarvoor',
            cells: [
              'De data room draaien: ordening, toegang, anonimisering, zoeken, vragen en antwoorden',
              'Het target beoordelen: wat de stukken betekenen voor de deal'
            ]
          },
          {
            label: 'Wat het leest',
            cells: [
              'Stukken zodra ze worden geüpload, om ze te indexeren, te labelen, te anonimiseren en doorzoekbaar te maken',
              'Elk document in de data room, over {disciplines} disciplines, naast elkaar gelegd'
            ]
          },
          {
            label: 'Wat u krijgt',
            cells: [
              'Een geordende, doorzoekbare data room en een bijgehouden Q&A-log',
              'Bevindingen met een ernst, cijfers die elkaar tegenspreken, en een lijst van wat ontbreekt'
            ]
          },
          {
            /* Vendor names below are stated only as each vendor describes itself on its
             own website (checked 12-11-2026). Sources:
             Datasite Blueflame AI: https://datasite.com/en/products/blueflame-ai
             Imprima AI due diligence (Smart Index, Smart Review, Smart Summaries,
               Smart Q&A, Smart Redaction): https://www.imprima.com/ai-due-diligence
             Drooms AI (auto-structuring to the index, AI Assistant):
               https://drooms.com/drooms-intelligence/ and https://drooms.com/ai/
             Ansarada AI-Redact, AI-Sort, Ask AiDA, AI-Smart Q&A:
               https://www.ansarada.com/data-room/ai-redaction
               https://www.ansarada.com/data-room/ai-sort
             Intralinks VDRPro AI Redaction:
               https://www.intralinks.com/products/virtual-data-room
             No claim is made about any vendor's quality. */
            label: 'Voorbeelden',
            cells: [
              'Datasite (Blueflame AI), Imprima, Drooms, Ansarada, Intralinks',
              'Factum. Juridische en financiële AI-tools dekken een deel van hetzelfde leeswerk: zie hieronder'
            ]
          },
          {
            label: 'Bronvermelding',
            cells: [
              'Verschilt per aanbieder en functie',
              'Elke bevinding citeert de passage letterlijk, met het brondocument en de vindplaats'
            ]
          },
          {
            label: 'Wie tekent af',
            cells: [
              'Niets af te tekenen: het beheert de data room, het beoordeelt het target niet',
              'Uw eigen reviewer. Geen export zonder die aftekening. Factum tekent niets.'
            ]
          }
        ],
        note:
        'Elke aanbieder beschrijft zijn eigen functies, en die veranderen vaak. Sommige data rooms beoordelen inmiddels ook stukken in de data room zelf: Imprima beschrijft AI-contractreview en samenvattingen, Datasite een assistent die mogelijke gaten signaleert. Vraag uw aanbieder waar elk antwoord naar verwijst en wie het aftekent.'
      },
      sections: [
        {
          heading: 'Wat doet AI in de data room?',
          paragraphs: [
            'Aanbieders van virtuele data rooms hebben AI in de data room zelf gebouwd. Die helpt wie het proces leidt om de data room op orde en in beweging te houden.'
          ],
          bullets: [
            'Ordenen: uploads sorteren en indexeren in een structuur.',
            'Anonimiseren: persoonsgegevens en gevoelige passages vinden voordat stukken worden gedeeld.',
            'Zoeken: de stukken vinden waarin een term of een vraag terugkomt.',
            'Q&A: vragen van bieders doorsturen, helpen beantwoorden, bijhouden wat nog openstaat.'
          ],
          after: ['Het gaat om de data room zelf: wat erin zit, wie wat ziet, welke vragen openstaan.']
        },
        {
          heading: 'Wat doet een AI-due-diligenceplatform?',
          paragraphs: [
            'Het leest de data room voor wie het target moet beoordelen. Factum leest elk document in de data room, over {disciplines} disciplines, en legt ze naast elkaar: een contract naast de omzet die het moet dragen, de managementrapportage naast de jaarrekening.',
            'Elke bevinding citeert de onderbouwende passage letterlijk, met het brondocument en de vindplaats, zodat uw reviewer haar bij de bron kan controleren. Wat in de data room had moeten zitten en ontbreekt, komt op een aparte lijst.'
          ]
        },
        {
          /* Self-descriptions, checked on each vendor's own website 12-11-2026:
           Kira (Litera), "purpose-built for high-volume, high-stakes review and
             due diligence", for lawyers: https://www.litera.com/products/kira
           Harvey, "AI software for legal and professional services", law firms
             and in-house teams: https://www.harvey.ai/
           Luminance, contract intelligence platform: https://www.luminance.com/
           Hebbia, "AI built for the rigor of finance", investors and bankers:
             https://www.hebbia.com/
           No claim about their quality or coverage beyond that. */
          heading: 'Waar passen juridische en financiële AI-tools?',
          paragraphs: [
            'Een dealteam komt ook AI-tools tegen die voor één beroep zijn gebouwd. Kira, onderdeel van Litera, beschrijft zichzelf als gebouwd voor grootschalige review en due diligence, voor advocaten. Harvey is AI-software voor juridische en zakelijke dienstverlening, gebruikt door advocatenkantoren en juridische afdelingen. Luminance noemt zichzelf een contract-intelligenceplatform. Hebbia beschrijft AI gebouwd voor finance, voor investeerders en bankiers.',
            'Die tools werken met de stukken en vragen die u ze geeft, meestal binnen één discipline. Factum leest de hele data room over {disciplines} disciplines in één ronde en legt de disciplines naast elkaar: de financiële module leest eerst de juridische bevindingen, fiscaal leest beide. Welke tool past, hangt af van wie de vraag stelt en wat de deal nodig heeft.'
          ]
        },
        {
          heading: 'Wanneer hebt u wat nodig?',
          bullets: [
            'U leidt een verkoopproces en wilt de data room geordend, geanonimiseerd en de vragen onder controle: AI in de data room.',
            'U koopt en wilt weten wat de stukken zeggen over het target: AI-due diligence.',
            'U adviseert de verkoper en wilt de data room gelezen hebben zoals een koper dat doet, voordat een koper dat doet: AI-due diligence op de data room van de verkoper. Zie [Factum voor verkopers en brokers](/pre-sale).'
          ],
          after: ['De meeste deals gebruiken allebei. De data room bewaart de stukken; Factum leest ze.']
        },
        {
          heading: 'Hoe werken de twee samen?',
          paragraphs: [
            'De data room blijft waar het proces loopt: toegang, versies, vragen en antwoorden. Uw team uploadt de stukken uit de data room in Factum. Factum levert de bevindingen, en uw reviewer loopt ze door in het platform. Hoe een ronde wordt opgezet, staat op [de platformpagina](/platform).'
          ]
        },
        {
          heading: 'Wat geen van beide vervangt',
          paragraphs: [
            'Een ondertekend rapport. Een quality-of-earnings- of vendor due diligence-rapport komt uit een aparte opdracht aan een accountant of adviseur die het ondertekent. Factum geeft geen assurance; uw reviewer tekent de bevindingen af voor eigen gebruik. Meer in [wanneer Factum niet past](/when-not-to-use-factum).'
          ]
        }
      ],
      faq: {
        heading: 'Veelgestelde vragen',
        items: [
          {
            q: 'Is een data room met AI-functies hetzelfde als AI-due diligence?',
            a: 'Nee. AI in de data room helpt de data room te beheren: ordenen, anonimiseren, zoeken en Q&A. AI-due diligence leest elk document voor de koper of de sell-side adviseur en levert bevindingen over het target, elk met het brondocument en de vindplaats.'
          },
          {
            q: 'Vervangt Factum onze virtuele data room?',
            a: 'Nee. De data room blijft waar het proces loopt. Uw team uploadt de stukken in Factum, dat ze leest en bevindingen levert voor uw reviewer.'
          },
          {
            q: 'Wie tekent de bevindingen af?',
            a: 'Uw eigen reviewer. Menselijke review is verplicht: geen export verlaat het platform zonder de aftekening van uw reviewer. Factum tekent niets en geeft geen assurance.'
          },
          {
            q: 'Welke disciplines dekt Factum?',
            a: '{disciplines} disciplines: financieel, commercieel, juridisch, fiscaal, HR, AI, operationeel, en waardering en dealeconomie, afgestemd tot één rapport.'
          },
          {
            q: 'Werkt het ook voor deals buiten Nederland?',
            a: 'De financiële, commerciële en operationele analyse werkt in elk rechtsgebied. Juridisch en fiscaal zijn afgestemd op Nederlands recht; laat die bevindingen bij een target elders door lokale advocaten controleren.'
          },
          {
            q: 'Kunnen we het testen voor een lopende deal?',
            a: 'Ja. Een deal die u vorig jaar sloot, werkt als test: niets uit een lopend proces ligt op tafel, en u legt de bevindingen naast wat uw team destijds vond. Factum is pre-launch, dus het eerste echte rapport dat u ziet, is uw eigen.'
          }
        ]
      },
      helps: {
        heading: 'Waar Factum past',
        bullets: [
          'Voor private equity en andere kopers, en voor sell-side brokers.',
          'De hele data room gelezen, met bij elke bevinding het document en de vindplaats.',
          '{disciplines} disciplines in één ronde, afgestemd tot één rapport.',
          'Uw team beoordeelt de bevindingen en tekent af in het platform.'
        ],
        note: 'Factum is pre-launch: er is nog geen publieke klant of case study. Juridisch en fiscaal zijn afgestemd op Nederlands recht. Een leverancier kiezen? Gebruik [tien vragen voor een AI-due-diligenceleverancier](/ai-due-diligence-vendor-questions). Vóór de signing: [red flag review van een data room](/red-flag-review). Koopt u een BV: [due diligence bij een BV](/dutch-bv-due-diligence). En [hoe uw stukken worden behandeld](/governance).'
      },
      datePublished: '2026-11-08'
    },
    'dutch-bv-due-diligence': {
      metaTitle: 'Due diligence bij de overname van een BV: checklist voor de koper',
      metaDescription:
        'Een BV kopen? Wat u naar Nederlands recht in de dataroom controleert: aandelen, change of control, OR, pensioen, fiscale eenheid, ACM, en hoe het zich verhoudt tot de FDD.',
      shortName: 'Due diligence bij een BV',
      h1: 'Due diligence bij de overname van een BV: wat controleert een koper in de data room?',
      answer:
        'Is het target een Nederlandse besloten vennootschap (BV), dan moet de data room vragen beantwoorden die het Nederlandse recht stelt: wie houdt werkelijk de aandelen, welke contracten overleven de change of control, wat vragen de ondernemingsraad en de pensioenregeling, en welke fiscale posities komen mee met de vennootschap. Deze pagina gaat alleen over targets naar Nederlands recht. Ze beschrijft wat een koper controleert; ze is geen juridisch advies.',
      sections: [
        {
          heading: 'Wie houdt de aandelen, en zijn ze overdraagbaar?',
          bullets: [
            'Statuten: de geldende tekst, en een eventuele blokkeringsregeling, zoals een aanbiedingsplicht of een goedkeuringsvereiste.',
            'Aandeelhoudersregister: elke uitgifte en overdracht sinds de oprichting, elk met een notariële akte. Aandelen in een BV gaan over bij notariële akte, dus een gat in de reeks akten is een gat in de titel.',
            'Certificaten via een stichting administratiekantoor (STAK), pandrecht en vruchtgebruik op aandelen, en wie het stemrecht heeft.',
            'Aandeelhoudersovereenkomst: drag-along en tag-along, good en bad leaver, vetorechten die de verkoop overleven.',
            'Uittreksels uit het Handelsregister (KvK) en het UBO-register die aansluiten op het aandeelhoudersregister.'
          ],
          after: [
            'Een ontbrekende akte of een niet-ingeschreven overdracht is vaak vóór het tekenen te herstellen. Komt het na het tekenen boven, dan wordt het een discussie over garanties.'
          ]
        },
        {
          heading: 'Welke contracten gaan mee met de vennootschap?',
          paragraphs: [
            'Bij een aandelentransactie blijven de contracten bij de BV. De vraag is dan welke de wederpartij laten opzeggen of heronderhandelen als de zeggenschap wijzigt. Bij een activa-passivatransactie moet elk contract worden overgedragen, en daar is meestal medewerking van de wederpartij voor nodig.'
          ],
          bullets: [
            'Change-of-control- en opzegbepalingen in de grootste klant-, leveranciers-, licentie- en huurcontracten.',
            'Non-assignment- en exclusiviteitsbepalingen die na closing de groep van de koper zouden binden.',
            'Bankfinancieringen met change-of-control- en cross-defaultbepalingen, en de zekerheden die daarvoor zijn gegeven.',
            'Garanties die de BV voor groepsmaatschappijen heeft afgegeven, waaronder 403-verklaringen bij het Handelsregister.'
          ]
        },
        {
          heading: 'Wat vragen de OR, het personeel en het pensioen?',
          bullets: [
            'Ondernemingsraad: waar die er is, geeft een overdracht van zeggenschap meestal een adviesrecht, en dat advies wordt gevraagd terwijl het het besluit nog kan beïnvloeden.',
            'Vakbonden: afhankelijk van de omvang van de betrokken ondernemingen kunnen de SER-Fusiegedragsregels vragen dat zij worden ingelicht.',
            'Arbeidsvoorwaarden: contracten van sleutelpersonen, concurrentiebedingen, bonus- en retentieregelingen die bij een verkoop uitkeren, en de cao die van toepassing is.',
            'Pensioen: welke regeling geldt, of deelname aan een bedrijfstakpensioenfonds verplicht is, en waar de regeling staat in de transitie onder de Wet toekomst pensioenen.',
            'Bij een activa-passivatransactie gaan werknemers van rechtswege mee met hun arbeidsvoorwaarden (overgang van onderneming).'
          ]
        },
        {
          heading: 'Wanneer komen de ACM of een andere toezichthouder in beeld?',
          paragraphs: [
            'Als de omzet van de betrokken partijen de drempels van de Mededingingswet overschrijdt, moet de concentratie vóór closing worden gemeld bij de Autoriteit Consument & Markt (ACM); boven de Europese drempels neemt de Europese Commissie het over.',
            'Daarnaast kan de overname van een vitale aanbieder of een bedrijf met sensitieve technologie een melding vragen onder de Wet Vifo, en kan een vergunning in een gereguleerde sector toestemming van de toezichthouder vragen. Of dit speelt, is een vraag voor uw advocaat aan het begin van het proces, omdat het de planning bepaalt.'
          ]
        },
        {
          heading: 'Welke fiscale posities komen mee met de vennootschap?',
          bullets: [
            'Fiscale eenheid voor de vennootschapsbelasting: het target verlaat bij de verkoop de fiscale eenheid van de verkoper, met gevolgen voor verliezen en voor eerdere transacties binnen de groep.',
            'Fiscale eenheid voor de btw: elk lid is hoofdelijk aansprakelijk voor de btw van de hele eenheid over de periode dat het erbij hoorde.',
            'Openstaande aanslagen, boekenonderzoeken van de Belastingdienst, en rulings of afspraken waarop het target leunt.',
            'Loonheffingen en ketenaansprakelijkheid waar het bedrijf werkt met onderaannemers of ingeleend personeel.',
            'Latente belastingclaims die anders pas in de eerste aangifte na closing boven komen.'
          ]
        },
        {
          heading: 'Wat laat de data room meestal niet zien?',
          paragraphs: [
            'De stukken die niemand uploadde. Een notariële akte van vijftien jaar geleden, een side letter bij een klantcontract, het advies van de OR, het laatste overzicht van de pensioenuitvoerder. Wat ontbreekt laat geen passage achter om te citeren, dus het valt pas op als de data room wordt gelegd naast een lijst van wat er hoort te zijn.',
            'Voor de kant van de verkoper bij dezelfde lijst, zie [de checklist voor de data room](/data-room-checklist).'
          ]
        },
        {
          heading: 'Hoe verhoudt een AI-analyse van de hele data room zich tot de FDD van de accountant?',
          paragraphs: [
            'De financial due diligence (FDD) van een accountants- of adviesfirma gaat diep op de cijfers: quality of earnings, genormaliseerde EBITDA, nettoschuld en werkkapitaal. Ze eindigt in een rapport dat de firma ondertekent, en dat een bank of een W&I-verzekeraar wil zien.',
            'Factum leest elk document in de data room over {disciplines} disciplines en levert bevindingen, elk met het brondocument en de vindplaats. Het geeft geen assurance en tekent niets; uw eigen reviewer tekent de bevindingen af voor eigen gebruik. Naast een FDD laat het de specialisten vroeg zien wat er in de data room zit, wat elkaar tegenspreekt en wat ontbreekt, zodat hun uren gaan naar waar het risico zit. De FDD en de juridische due diligence van uw advocaat blijven wat ze zijn.',
            'Hoe de analyse is opgebouwd, staat op [de platformpagina](/platform). Hoe dit verschilt van AI in een virtuele data room, staat in [AI-due diligence vs. AI in de data room](/ai-due-diligence-vs-data-room-ai).'
          ]
        },
        {
          heading: 'Hoe komen de bevindingen in de koopovereenkomst?',
          paragraphs: [
            'Een bevinding komt meestal op een van drie plekken in de koopovereenkomst (SPA) terecht: in de prijs, in een specifieke vrijwaring voor een bekend risico, of in de disclosure tegen de garanties. Onder een W&I-verzekering zijn risico’s die de koper vóór het tekenen kende doorgaans van dekking uitgesloten.',
            'Nog een reden om de bevindingen vroeg en met hun bron te hebben: uw advocaat kan dan per bevinding bepalen waar ze thuishoort. Vóór het bindende bod is de [red-flag review](/red-flag-review) de kortere versie van hetzelfde leeswerk.'
          ]
        }
      ],
      faq: {
        heading: 'Veelgestelde vragen',
        items: [
          {
            q: 'Geldt deze pagina ook voor targets buiten Nederland?',
            a: 'Nee. Ze gaat over targets naar Nederlands recht, vooral de BV. De financiële, commerciële en operationele analyse van Factum werkt in elk rechtsgebied; juridisch en fiscaal zijn afgestemd op Nederlands recht, dus laat die bevindingen bij een target elders door lokale advocaten controleren.'
          },
          {
            q: 'Is dit juridisch advies?',
            a: 'Nee. Het beschrijft wat een koper doorgaans controleert in de data room van een Nederlandse BV. Elke deal is anders; laat uw eigen advocaat en belastingadviseur het specifieke target beoordelen.'
          },
          {
            q: 'Vervangt Factum de financial due diligence van de accountant?',
            a: 'Nee. Een FDD is een ondertekend rapport uit een aparte opdracht, en een bank of verzekeraar kan erop vertrouwen. Factum geeft geen assurance. Het leest de hele data room over {disciplines} disciplines naast de FDD, en uw eigen reviewer tekent de bevindingen af.'
          },
          {
            q: 'Ziet Factum wat er in de data room ontbreekt?',
            a: 'Ja, als aparte lijst van wat een koper zou verwachten en niet vond. Elk punt gaat eerst naar uw reviewer, omdat een stuk dat in een ander bestand zit als ontbrekend kan verschijnen.'
          },
          {
            q: 'Waar worden de stukken verwerkt?',
            a: 'Standaard op EU-endpoints, zonder bewaring bij de modelaanbieder en met pseudonimisering vóór de analyse. Juridisch, financieel en fiscaal draaien verplicht op endpoints zonder bewaring.'
          }
        ]
      },
      helps: {
        heading: 'Waar Factum past bij de overname van een BV',
        bullets: [
          'Elk document in de data room gelezen, met bij elke bevinding het brondocument en de vindplaats.',
          '{disciplines} disciplines in één ronde: {modules} modules in {waves} golven, waarbij financieel de juridische bevindingen leest en fiscaal beide.',
          'Juridisch en fiscaal afgestemd op Nederlands recht.',
          'Uw reviewer tekent af in het platform. Geen export zonder die aftekening.'
        ],
        note: 'Factum is pre-launch: er is nog geen publieke klant of case study. Meer over [Factum voor kopers](/diligence-sprint) en [hoe uw stukken worden behandeld](/governance). Vóór de signing: [red flag review van een data room](/red-flag-review). Een tool kiezen: [tien vragen voor een AI-due-diligenceleverancier](/ai-due-diligence-vendor-questions).'
      },
      datePublished: '2026-11-12'
    },
    'red-flag-review': {
      metaTitle: 'Red-flag review van een data room vóór het tekenen',
      metaDescription:
        'Wat een red-flag review is, welke red flags een deal bepalen per discipline, wat het rapport moet bevatten en waar het misgaat. Voor kopers, vóór het tekenen.',
      shortName: 'Red-flag review van een data room',
      h1: 'Red-flag review: wat controleert een koper in de data room vóór het tekenen?',
      answer:
        'Een red-flag review leest de data room op de punten die de deal kunnen stoppen of de prijs kunnen verschuiven, en rapporteert alleen die. Ze is smaller dan een volledige due diligence en komt eerder: vóór het bindende bod of het tekenen, terwijl er nog tijd is om af te haken, opnieuw te onderhandelen of een specifieke vrijwaring te vragen. Een bruikbaar red-flag-rapport noemt per punt de ernst, en het document en de vindplaats waar het vandaan komt.',
      sections: [
        {
          heading: 'Wat is een red-flag review, en hoe verschilt die van een volledige due diligence?',
          paragraphs: [
            'Een volledige due diligence beschrijft het target: de cijfers, de contracten, de mensen en de fiscale positie, in een rapport per discipline. Een red-flag review stelt de stukken één vraag: wat hier kan de deal laten klappen of veranderen wat we betalen? Al het andere blijft buiten het rapport.',
            'Het leeswerk wordt er niet lichter van. Om die ene bepaling te vinden die ertoe doet, moet elk contract gelezen worden. Wat korter wordt, is het rapport.'
          ]
        },
        {
          heading: 'Welke red flags bepalen een deal?',
          bullets: [
            'Juridisch: change-of-control- en opzegrechten in de contracten die de omzet dragen, geschillen, garanties voor anderen, gaten in de titel op de aandelen.',
            'Commercieel: klantconcentratie, contracten die kort na closing aflopen of opnieuw worden geprijsd, klantverloop dat de pitch niet laat zien.',
            'Financieel: EBITDA-correcties die de stukken niet onderbouwen, werkkapitaal dat rond de jaargrens schommelt, schulden en schuldachtige posten buiten de nettoschuld.',
            'Fiscaal: openstaande aanslagen, posities zonder ruling, verplichtingen uit een fiscale eenheid die het target verlaat.',
            'HR: sleutelpersonen zonder contract of concurrentiebeding, bonussen die bij een verkoop uitkeren, pensioenverplichtingen die niet op de balans staan.',
            'Operationeel en AI: enkelvoudige leveranciers, licenties die niet meegaan, modellen of data waarvan het bedrijf afhangt en die het niet bezit.'
          ],
          after: [
            'Welke daarvan materieel is, hangt af van uw prijs, uw structuur en uw risicobereidheid. Geen van drieën staat in de data room.'
          ]
        },
        {
          heading: 'Wat hoort er in een red-flag-rapport?',
          paragraphs: [
            'Per punt: wat het is, hoe ernstig, de onderbouwende passage letterlijk, en het document en de vindplaats. Daarna de lijst van wat nooit binnenkwam. Een bevinding zonder bron is een bevinding die uw reviewer opnieuw moet doen.',
            'Elke bevinding van Factum heeft dezelfde zes velden: module, bevinding, letterlijk citaat, ernst, bron en vindplaats, en menselijke review.'
          ]
        },
        {
          heading: 'Waar gaat een red-flag review mis?',
          bullets: [
            'Er is alleen een steekproef gelezen, en de bepaling die ertoe doet zit in het contract dat niemand opende.',
            'Niemand keek naar wat ontbreekt, en de red flag is het stuk dat nooit is geüpload.',
            'De disciplines zijn los van elkaar gelezen. Een contract dat volgend jaar afloopt is tegelijk een juridisch punt en een omzetpunt, en maar één rapport zag het.',
            'De bevindingen komen zonder bron, dus het team kan een echt probleem niet onderscheiden van een leesfout.'
          ]
        },
        {
          heading: 'Hoe lang duurt het?',
          paragraphs: [
            'Dat hangt af van de omvang en staat van de data room, en van hoe snel de verkoper antwoordt. Waar de dagen heen gaan, en waar ze te winnen zijn, staat in [hoe lang due diligence duurt](/due-diligence-timeline).'
          ]
        },
        {
          heading: 'Hoe voert Factum een red-flag review uit?',
          paragraphs: [
            'Uw team uploadt de data room. {modules} modules lezen hem in {waves} golven, in een vaste volgorde: eerst commercieel, HR, operationeel en AI, dan juridisch, dan financieel, dat de juridische bevindingen leest, dan fiscaal, dealeconomie en waardering. Elke bevinding citeert haar bron. {blocks} harde blokkades stoppen een concept en leggen het niet goedgekeurd aan uw reviewer voor.',
            'Uw reviewer bepaalt wat voor deze deal een red flag is en tekent af; geen export verlaat het platform zonder die aftekening. Meer op [de platformpagina](/platform), en over het verschil met AI in een virtuele data room in [AI-due diligence vs. AI in de data room](/ai-due-diligence-vs-data-room-ai).'
          ]
        }
      ],
      faq: {
        heading: 'Veelgestelde vragen',
        items: [
          {
            q: 'Kan AI zelfstandig een red-flag review doen?',
            a: 'Het kan het leeswerk doen: elk document en elke bepaling, naast elkaar gelegd, met bronnen. Het kan niet bepalen wat voor uw deal materieel is. Daarom is menselijke review verplicht: uw reviewer tekent af voordat er iets het platform verlaat.'
          },
          {
            q: 'Wie tekent het red-flag-rapport?',
            a: 'Uw eigen reviewer, voor eigen gebruik. Factum tekent niets en geeft geen assurance. Heeft een bank of verzekeraar een ondertekend rapport nodig, laat dat dan door een adviseur maken; Factum kan ernaast draaien.'
          },
          {
            q: 'Is een red-flag review genoeg vóór het tekenen?',
            a: 'Bij sommige deals is het de eerste stap en volgt de volledige due diligence; bij andere is het wat de planning toelaat. Uw adviseurs en uw reviewer beslissen. Factum leest in beide gevallen de hele data room.'
          },
          {
            q: 'Werkt het voor een target buiten Nederland?',
            a: 'De financiële, commerciële en operationele analyse werkt in elk rechtsgebied. Juridisch en fiscaal zijn afgestemd op Nederlands recht; laat die bevindingen bij een target elders door lokale advocaten controleren.'
          },
          {
            q: 'Kunnen we het testen voor een lopende deal?',
            a: 'Ja. Een deal die u vorig jaar sloot, werkt als test: niets uit een lopend proces ligt op tafel, en u legt de bevindingen naast wat uw team destijds vond. Factum is pre-launch, dus het eerste echte rapport dat u ziet, is uw eigen.'
          }
        ]
      },
      helps: {
        heading: 'Waar Factum past',
        bullets: [
          'Voor private equity en andere kopers, vóór het bindende bod of het tekenen.',
          'Elk document in de data room gelezen, met bij elke bevinding het brondocument en de vindplaats.',
          'Een lijst van wat de verkoper nooit uploadde, vanaf de eerste ronde.',
          'Uw reviewer tekent af in het platform.'
        ],
        note: 'Factum is pre-launch: er is nog geen publieke klant of case study. Juridisch en fiscaal zijn afgestemd op Nederlands recht. Koopt u een BV? Zie [due diligence bij een BV](/dutch-bv-due-diligence). Een tool kiezen? [Tien vragen voor een AI-due-diligenceleverancier](/ai-due-diligence-vendor-questions), en [hoe uw stukken worden behandeld](/governance).'
      },
      datePublished: '2026-11-12'
    },
    /* Kopersgids, open lead magnet (GTM/ops/geo-seo-audit-2026-11-12.md, asset 4). */
    'ai-due-diligence-vendor-questions': {
      metaTitle: 'Een AI-due-diligenceleverancier beoordelen: 10 vragen',
      metaDescription:
        'Tien vragen voor elke leverancier van AI due diligence, voordat de data room erin gaat: waar stukken heen gaan, bewaring, de NDA, bronnen, ontbrekende stukken, aftekening.',
      shortName: 'Tien vragen voor een AI-due-diligenceleverancier',
      h1: 'Hoe beoordeelt u een leverancier van AI due diligence? 10 vragen',
      answer:
        'Vraag het voordat de data room erin gaat. Tien vragen dekken wat een koper moet weten: waar de stukken worden verwerkt, wie ze bewaart, of de NDA het toestaat, hoe elke bevinding is onderbouwd, wat de tool niet las, wat er ontbreekt, welk recht hij kent, wie aftekent, wat hij over nauwkeurigheid claimt en waar de prijs van afhangt. Vraag elk antwoord op schrift. De lijst werkt voor elke leverancier, ook voor ons.',
      sections: [
        {
          heading: '1. Waar worden onze stukken verwerkt?',
          paragraphs: [
            'Stukken uit een data room zijn vertrouwelijk onder de NDA en bevatten vaak persoonsgegevens onder de AVG. Vraag welke modelaanbieders ze verwerken, in welke regio, en of die regio de standaard is of een optie die u zelf moet aanzetten.',
            'Een goed antwoord noemt de aanbieders en de regio, en staat in de verwerkersovereenkomst.'
          ]
        },
        {
          heading: '2. Bewaart of traint iemand op onze stukken?',
          paragraphs: [
            'Twee aparte vragen. Bewaart de modelaanbieder prompts en documenten, en hoe lang? Gebruikt de leverancier of de aanbieder ze om een model te trainen?',
            'Een goed antwoord geeft de bewaartermijn per aanbieder, zegt nee tegen training, en legt beide vast in het contract.'
          ]
        },
        {
          heading: '3. Staat onze NDA het toe?',
          paragraphs: [
            'De meeste NDA’s bij overnames staan delen alleen toe met genoemde vertegenwoordigers: medewerkers, adviseurs, financiers. Een softwareplatform en zijn subverwerkers staan zelden op die lijst. Laat uw advocaat het controleren vóór de eerste upload.',
            'Een goed antwoord: de leverancier tekent een NDA voordat er een document beweegt, en noemt zijn subverwerkers.'
          ]
        },
        {
          heading: '4. Op welk niveau noemt elke bevinding haar bron?',
          paragraphs: [
            'Document, pagina, of de passage zelf. Een bevinding die uw reviewer niet kan terugvinden, moet hij overdoen. Niet elke bevinding heeft een passage om te citeren: een berekening over een spreadsheet verwijst naar het tabblad of de cellen die zij gebruikte.',
            'Een goed antwoord: elke bevinding noemt brondocument en vindplaats, met de onderbouwende passage waar die er is.'
          ]
        },
        {
          heading: '5. Leest hij elk document, of een steekproef?',
          paragraphs: [
            'Sommige tools beantwoorden vragen door de passages op te halen die relevant lijken. Dat is zoeken, en de clausule die ertoe doet kan in een document staan dat nooit is geopend. Vraag welk deel van de data room is gelezen, en wat er gebeurt met een bestand dat niet te lezen was: een scan, een beveiligde pdf, een kapotte export.',
            'Een goed antwoord: elk document wordt gelezen, en wat niet te lezen was, staat op een lijst.'
          ]
        },
        {
          heading: '6. Zegt hij wat er ontbreekt?',
          paragraphs: [
            'Een ontbrekend document laat geen passage achter om te citeren, dus een tool die alleen leest wat er is, meldt het nooit. De rode vlag is vaak het contract dat niemand uploadde.',
            'Een goed antwoord: een aparte lijst van wat een koper zou verwachten en niet vond, gecontroleerd door een mens.'
          ]
        },
        {
          heading: '7. Welke disciplines, en welk recht?',
          paragraphs: [
            'Financieel, commercieel en operationeel werken over grenzen heen. Juridisch en fiscaal hangen af van het recht van de target. Vraag welke disciplines in één run zitten, of ze elkaars bevindingen lezen, en voor welke jurisdicties de juridische en fiscale analyse is gebouwd.',
            'Een goed antwoord noemt de jurisdicties, en zegt eerlijk waar u een lokale advocaat nodig hebt.'
          ]
        },
        {
          heading: '8. Wie tekent de bevindingen af?',
          paragraphs: [
            'AI-output is een concept tot een mens het accepteert. Vraag of er iets kan worden geëxporteerd zonder aftekening door een genoemde persoon, of de leverancier enige zekerheid geeft, en of een bank of W&I-verzekeraar op de output kan vertrouwen.',
            'Een goed antwoord noemt de menselijke toets en is duidelijk over reliance. De meeste platforms geven geen zekerheid; dat is prima, zolang ze het zeggen.'
          ]
        },
        {
          heading: '9. Wat claimt de leverancier over nauwkeurigheid, en wie heeft het gemeten?',
          paragraphs: [
            'Een percentage zonder methode is een marketinggetal. Vraag op welke dataset het is gemeten, door wie, en of iemand buiten de leverancier het heeft gecontroleerd.',
            'Een goed antwoord geeft de methode, de dataset en de auditor, of zegt eerlijk dat er geen geauditeerd percentage is.'
          ]
        },
        {
          heading: '10. Wat kost het, en waar hangt de prijs van af?',
          paragraphs: [
            'Per gebruiker, per document, per pagina of per deal: het model bepaalt wat een grote of rommelige data room u kost. Vraag wat erin zit, wat extra is, en wat er gebeurt als de data room tijdens het proces groeit.',
            'Een goed antwoord is één prijs voor een afgesproken scope, op schrift, voordat de data room erin gaat.'
          ]
        },
        {
          heading: 'Hoe beantwoordt Factum de tien?',
          paragraphs: ['Kort, en met de gaten erin.'],
          steps: [
            'Standaard op EU-endpoints, onder een verwerkersovereenkomst.',
            'Geen bewaring bij de modelaanbieder, die ook niet op uw stukken traint. Pseudonimisering vóór de analyse. Juridische, financiële en fiscale analyse draait verplicht op endpoints zonder bewaring.',
            'Eerst de NDA. Stukken bewegen pas na ondertekening.',
            'Elke bevinding noemt brondocument en vindplaats, met de onderbouwende passage waar die er is.',
            'Elk document in de data room wordt gelezen, door {modules} modules in {waves} golven.',
            'Een lijst van wat nooit is aangeleverd, vanaf de eerste run.',
            '{disciplines} disciplines in één run. Juridisch en fiscaal zijn afgestemd op Nederlands recht; laat die bevindingen bij een target elders door een lokale advocaat controleren.',
            'Uw eigen reviewer tekent af. Geen export verlaat het platform zonder die aftekening. Factum tekent niets en geeft geen zekerheid.',
            'Geen geauditeerd nauwkeurigheidspercentage. Factum is pre-launch.',
            'Prijs op aanvraag: één prijs voor de hele scope, afgestemd op de omvang en staat van de data room.'
          ],
          after: [
            'Meer over [hoe uw stukken worden behandeld](/governance) en [wat AI niet kan in due diligence](/limits-of-ai).'
          ]
        }
      ],
      faq: {
        heading: 'Veelgestelde vragen',
        items: [
          {
            q: 'Gelden deze vragen ook voor een virtuele data room met AI-functies?',
            a: 'Ja. Vraag 1 tot en met 3 en 8 tot en met 10 gelden voor elke tool die de stukken aanraakt. Vraag 4 tot en met 6 wegen het zwaarst bij een tool die zegt het due-diligenceleeswerk zelf te doen.'
          },
          {
            q: 'Welke vraag is het belangrijkst?',
            a: 'Vraag 3 komt als eerste: staat de NDA de upload niet toe, dan doet de rest er niet toe. Daarna vraag 8. Wie aftekent, draagt de bevindingen.'
          },
          {
            q: 'Hoe toetsen we de antwoorden van een leverancier?',
            a: 'Laat hem draaien op een deal die u vorig jaar sloot. Er ligt niets lopends op straat, en u kunt de bevindingen naast wat uw team toen vond leggen.'
          },
          {
            q: 'Vervangt AI due diligence onze adviseurs?',
            a: 'Nee. Het leest de hele data room en laat de specialisten zien waar ze moeten kijken. Het boekenonderzoek van de accountant en het juridisch onderzoek van uw advocaat blijven wat ze zijn, en uw eigen reviewer bepaalt wat ertoe doet.'
          }
        ]
      },
      helps: {
        heading: 'Waar Factum past',
        bullets: [
          'Voor private equity en andere kopers, vóór het bindend bod of de signing.',
          'Elk document in de data room gelezen, elke bevinding met brondocument en vindplaats.',
          'Een lijst van wat de verkoper nooit heeft geüpload.',
          'Uw reviewer tekent af in het platform.'
        ],
        note: 'Factum is pre-launch: er is nog geen publieke klant of case study. Het verschil met de AI in een virtuele data room: [AI due diligence vs. data room-AI](/ai-due-diligence-vs-data-room-ai). Vóór de signing: [red flag review van een data room](/red-flag-review). Koopt u een BV: [due diligence bij een BV](/dutch-bv-due-diligence).'
      },
      datePublished: '2026-11-12'
    }
  },
  de: GUIDES_DE,
  es: GUIDES_ES,
  pt: GUIDES_PT
};

export function getGuide(slug: GuideSlug, locale: GuideLocale): Guide {
  return GUIDES[locale][slug];
}
