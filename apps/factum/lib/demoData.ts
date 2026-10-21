/**
 * The /platform demo: a constructed review dossier on a fictional company.
 *
 * Everything here is invented. The data room it quotes was generated for a
 * product demo (factum/run-logs/liberta-2026-10/maak_dossier.py and
 * uitbreiding.py): "Halvoria Antriebstechnik GmbH" in Bamberg, its bank, its
 * customers and its landlord do not exist. Never put a real client, a real
 * dossier or a screenshot of one in this file.
 *
 * What lives here: the parts that are identical in every language. Document
 * names, page numbers, the verbatim German passages, and every number a
 * calculation uses. A translator cannot change an amount by accident, because
 * the copy files (demo.ts, demo.de.ts, demo.es.ts, demo.pt.ts) hold labels
 * only. Quotes stay in the document's language, German, in every locale.
 *
 * Every figure below was checked against the generator scripts: EBITDA 2025
 * reported 3,220,000 (24.6m - 11.2m - 7.9m - 3.0m + 0.72m), the release of the
 * warranty provision 640,000, net debt 8,100,000 (bank 8.7m less cash 0.6m),
 * so adjusted leverage 8.1 / 2.58 = 3.14x against the 3.00x limit in §14.1,
 * while the compliance certificate states 2.52 : 1 on the unadjusted EBITDA.
 */

export type DemoDomain = 'financial' | 'legal' | 'tax' | 'commercial';
export type DemoSeverity = 'critical' | 'high' | 'medium';
export type DemoUnit = 'eur' | 'x' | 'pct' | 'n';
export type DemoOp = '+' | '−' | '×' | '÷' | '=';

export const DEMO_DOMAINS: readonly DemoDomain[] = ['financial', 'legal', 'tax', 'commercial'];

/** The target, as named in its own documents. Not translated. */
export const DEMO_TARGET = 'Halvoria Antriebstechnik GmbH';

/** Files in the generated data room (ls dossier | wc -l on 21-10-2026). */
export const DEMO_DOC_COUNT = 101;

export interface DemoDoc {
  file: string;
  /** The document's own title, in its own language. */
  title: string;
  pages?: number;
}

export const DEMO_DOCS = {
  ja25: { file: '01_Jahresabschluss_2025_HGB.pdf', title: 'Jahresabschluss 2025 (HGB)', pages: 3 },
  ma: { file: '02_Management_Accounts_2023-2027.xlsx', title: 'Management Accounts 2023–2027' },
  kredit: { file: '03_Konsortialkreditvertrag_Auszug.pdf', title: 'Konsortialkreditvertrag (Auszug)', pages: 1 },
  compliance: { file: '04_Compliance-Bescheinigung_2025.pdf', title: 'Compliance-Bescheinigung 2025', pages: 1 },
  velmora: { file: '05_Rahmenliefervertrag_Velmora.pdf', title: 'Rahmenliefervertrag Velmora', pages: 1 },
  miete: { file: '07_Mietvertrag_Werk_Bamberg.pdf', title: 'Gewerbemietvertrag Werk Bamberg', pages: 1 },
  gav: { file: '10_Gewinnabfuehrungsvertrag.docx', title: 'Beherrschungs- und Gewinnabführungsvertrag' },
  spa: { file: '11_SPA_Entwurf_Locked_Box.docx', title: 'Geschäftsanteilskaufvertrag (Entwurf)' },
  q1: { file: '036_Quartalsbericht_2026_Q1.pdf', title: 'Quartalsbericht Q1 2026', pages: 1 },
  q2: { file: '037_Quartalsbericht_2026_Q2.pdf', title: 'Quartalsbericht Q2 2026', pages: 1 },
  q3: { file: '038_Quartalsbericht_2026_Q3.pdf', title: 'Quartalsbericht Q3 2026', pages: 1 },
  ortelia: { file: '041_Kundenvertrag_Ortelia.pdf', title: 'Liefervertrag Ortelia Landmaschinen GmbH', pages: 1 },
  brisgau: { file: '042_Kundenvertrag_Brisgau.pdf', title: 'Liefervertrag Brisgau Fördertechnik KG', pages: 1 },
  selvan: { file: '043_Kundenvertrag_Selvan.pdf', title: 'Liefervertrag Selvan Pumpen GmbH', pages: 1 },
  tremonia: { file: '044_Kundenvertrag_Tremonia.pdf', title: 'Liefervertrag Tremonia Antriebe AG', pages: 1 },
  bp: { file: '075_Betriebspruefung_Anordnung.pdf', title: 'Prüfungsanordnung', pages: 1 },
  fee: { file: '076_Managementgebuehren_Vereinbarung.pdf', title: 'Dienstleistungsvereinbarung Managementgebühr', pages: 1 },
  bimsch: { file: '083_BImSchG_Genehmigung.pdf', title: 'Genehmigung nach BImSchG – Lackierstraße', pages: 1 },
  im: { file: '095_Information_Memorandum_Auszug.pdf', title: 'Information Memorandum (Auszug)', pages: 1 },
  qa: { file: '096_Q&A-Liste_Runde1.pdf', title: 'Q&A-Liste Runde 1', pages: 1 },
  vdd: { file: '098_Vendor_Due_Diligence_Steuern_Auszug.pdf', title: 'Vendor Tax Fact Book (Auszug)', pages: 1 },
  vermieter: { file: '099_Mietvertrag_Verlaengerung_Korrespondenz.pdf', title: 'Korrespondenz Vermieter', pages: 1 }
} satisfies Record<string, DemoDoc>;

export type DemoDocId = keyof typeof DEMO_DOCS;

/** Where in a document. Clauses are cited as the document writes them. */
export interface DemoRef {
  doc: DemoDocId;
  page?: number;
  clause?: string;
  sheet?: string;
  cell?: string;
}

/**
 * One paragraph of the source page, verbatim. `mark` is the passage the
 * finding rests on: `true` for the whole paragraph, or an exact substring.
 */
export interface DemoBlock {
  h?: boolean;
  text: string;
  mark?: true | string;
}

export interface DemoCalcLine {
  op?: DemoOp;
  v: number;
  /** Default 'eur'. 'pct' takes a fraction (0.105 renders as 10.5%). */
  u?: DemoUnit;
  /** 1-based index into the finding's refs. */
  ref?: number | number[];
}

export interface DemoFindingData {
  id: string;
  domain: DemoDomain;
  severity: DemoSeverity;
  /** refs[0] is the passage shown in the source panel. */
  refs: DemoRef[];
  source: DemoBlock[];
  calc?: DemoCalcLine[][];
}

export const DEMO_FINDINGS: readonly DemoFindingData[] = [
  {
    id: 'FIN-01',
    domain: 'financial',
    severity: 'high',
    refs: [
      { doc: 'ja25', page: 3 },
      { doc: 'ja25', page: 2 },
      { doc: 'ma', sheet: 'GuV Management', cell: 'D3:D4' },
      { doc: 'im', page: 1 },
      { doc: 'spa', clause: '§ 3.1' }
    ],
    source: [
      { h: true, text: 'Anhang (Auszug)' },
      {
        text: 'Die Gesellschaft ist Organgesellschaft der Halvoria Beteiligungs GmbH. Mit dieser besteht seit dem 15. März 2022 ein Beherrschungs- und Gewinnabführungsvertrag mit einer festen Mindestlaufzeit von fünf Zeitjahren bis zum 31. Dezember 2026; das Ergebnis wird vollständig abgeführt. Ertragsteuern werden beim Organträger erhoben.'
      },
      {
        text: 'Die Rückstellungen für Pensionen betreffen eine unmittelbare Pensionszusage an den Geschäftsführer. Bewertung nach dem Anwartschaftsbarwertverfahren mit einem Rechnungszins von 1,90 % (Durchschnitt zehn Jahre, § 253 Abs. 2 HGB).'
      },
      {
        text: 'In den sonstigen betrieblichen Erträgen ist die Auflösung der Rückstellung für Gewährleistungen aus dem Serienanlauf Baureihe HX-4 in Höhe von EUR 640.000 enthalten. Die Gewährleistungsfrist ist im Geschäftsjahr abgelaufen; Inanspruchnahmen erfolgten nicht. Es handelt sich um einen periodenfremden Ertrag.',
        mark: true
      },
      {
        text: 'Die Umsatzerlöse entfallen zu 28 % (EUR 6.900.000) auf die Velmora Fahrzeugtechnik AG. Die fünf größten Kunden stehen für 61 % der Umsatzerlöse.'
      }
    ],
    calc: [
      [{ v: 3_220_000, ref: 3 }, { op: '−', v: 640_000, ref: 1 }, { op: '=', v: 2_580_000 }],
      [{ v: 2_580_000 }, { op: '÷', v: 24_600_000, ref: 2 }, { op: '=', v: 2_580_000 / 24_600_000, u: 'pct' }],
      [{ v: 640_000, ref: 1 }, { op: '×', v: 7.76, u: 'x', ref: 5 }, { op: '=', v: 640_000 * 7.76 }]
    ]
  },
  {
    id: 'FIN-02',
    domain: 'financial',
    severity: 'critical',
    refs: [
      { doc: 'kredit', page: 1, clause: '§ 14.1–14.2' },
      { doc: 'ja25', page: 1 },
      { doc: 'ja25', page: 3 },
      { doc: 'compliance', page: 1 },
      { doc: 'kredit', page: 1, clause: '§ 18.2–18.3' }
    ],
    source: [
      {
        text: 'Zwischen der Mainfeld Bank AG als Kreditgeberin und der Halvoria Antriebstechnik GmbH als Kreditnehmerin, abgeschlossen am 12. Juli 2023. Kreditbetrag EUR 9.500.000, Laufzeit bis 30. Juni 2029.'
      },
      { h: true, text: '§ 14 Finanzkennzahlen' },
      {
        text: '14.1 Die Kreditnehmerin stellt sicher, dass das Verhältnis von Nettofinanzverbindlichkeiten zu EBITDA (Verschuldungsgrad) zu jedem Prüfungsstichtag 3,00 : 1 nicht übersteigt.',
        mark: true
      },
      {
        text: '14.2 „EBITDA“ bezeichnet das Ergebnis vor Zinsen, Steuern und Abschreibungen auf Basis des geprüften Jahresabschlusses, bereinigt um außerordentliche, einmalige oder periodenfremde Erträge und Aufwendungen.',
        mark: true
      },
      { text: '14.3 Die Eigenkapitalquote darf 15 % nicht unterschreiten.' },
      { h: true, text: '§ 18 Kündigung' },
      {
        text: '18.2 Die Kreditgeberin ist zur Kündigung aus wichtigem Grund berechtigt, wenn (a) eine Finanzkennzahl nach § 14 nicht eingehalten wird oder (b) ein Kontrollwechsel stattfindet. Ein Kontrollwechsel liegt vor, wenn eine andere Person als die Halvoria Beteiligungs GmbH mehr als 50 % der Geschäftsanteile oder Stimmrechte erwirbt.'
      },
      {
        text: '18.3 Im Falle der Kündigung ist der gesamte ausstehende Betrag nebst Vorfälligkeitsentschädigung sofort fällig.'
      }
    ],
    calc: [
      [{ v: 8_700_000, ref: 2 }, { op: '−', v: 600_000, ref: 2 }, { op: '=', v: 8_100_000 }],
      [
        { v: 8_100_000 },
        { op: '÷', v: 2_580_000, ref: 3 },
        { op: '=', v: 8_100_000 / 2_580_000, u: 'x' },
        { v: 3, u: 'x', ref: 1 }
      ],
      [{ v: 8_100_000, ref: 4 }, { op: '÷', v: 3_220_000, ref: 4 }, { op: '=', v: 8_100_000 / 3_220_000, u: 'x' }]
    ]
  },
  {
    id: 'LEG-01',
    domain: 'legal',
    severity: 'high',
    refs: [
      { doc: 'velmora', page: 1, clause: '§ 21.1–21.2' },
      { doc: 'ja25', page: 3 },
      { doc: 'qa', page: 1, clause: 'Nr. 2' },
      { doc: 'spa', clause: '§ 12' },
      { doc: 'ja25', page: 2 }
    ],
    source: [
      {
        text: 'Vertragsbeginn 1. Januar 2021, Laufzeit bis 31. Dezember 2028 mit automatischer Verlängerung um jeweils zwei Jahre.'
      },
      { h: true, text: '§ 9 Preise' },
      {
        text: '9.3 Die Lieferantin gewährt ab dem 1. Januar 2026 eine jährliche Produktivitätsminderung von 3 % auf alle Teilepreise.'
      },
      { h: true, text: '§ 21 Kontrollwechsel' },
      {
        text: '21.1 Ändern sich die unmittelbaren oder mittelbaren Beteiligungsverhältnisse an der Lieferantin dergestalt, dass ein Dritter die Kontrolle erlangt, ist die Lieferantin verpflichtet, dies der Bestellerin unverzüglich schriftlich anzuzeigen.'
      },
      {
        text: '21.2 Die Bestellerin ist in diesem Fall berechtigt, den Vertrag innerhalb von sechs Monaten nach Zugang der Anzeige mit einer Frist von drei Monaten zu kündigen. Ansprüche der Lieferantin auf Ersatz von Investitionen oder entgangenem Gewinn sind ausgeschlossen.',
        mark: true
      }
    ],
    calc: [[{ v: 6_900_000, ref: 2 }, { op: '÷', v: 24_600_000, ref: 5 }, { op: '=', v: 6_900_000 / 24_600_000, u: 'pct' }]]
  },
  {
    id: 'LEG-02',
    domain: 'legal',
    severity: 'high',
    refs: [
      { doc: 'miete', page: 1, clause: '§ 17' },
      { doc: 'miete', page: 1, clause: '§ 3' },
      { doc: 'vermieter', page: 1 },
      { doc: 'miete', page: 1 },
      { doc: 'bimsch', page: 1 },
      { doc: 'im', page: 1 }
    ],
    source: [
      {
        text: 'Mietgegenstand: Produktions- und Bürogebäude, 11.400 m², Regnitzstraße 40 (fiktiv), Bamberg. Jahresmiete netto EUR 684.000, indexiert nach VPI.'
      },
      { text: '§ 3 Mietzeit: Das Mietverhältnis endet am 30. Juni 2027. Eine Verlängerungsoption besteht nicht.' },
      {
        text: '§ 17 Wechsel des Mieters: Als Wechsel des Mieters gilt auch die Übertragung von mehr als 50 % der Geschäftsanteile an der Mieterin. Hierzu bedarf es der vorherigen schriftlichen Zustimmung des Vermieters, die nur aus wichtigem Grund verweigert werden darf. Erfolgt die Übertragung ohne Zustimmung, kann der Vermieter außerordentlich fristlos kündigen.',
        mark: true
      },
      {
        text: '§ 22 Rückbau: Bei Beendigung sind die Einbauten (Krananlage, Lackierstraße) auf Kosten der Mieterin zurückzubauen.'
      }
    ],
    calc: [
      [{ v: 890_000, ref: 3 }, { op: '−', v: 684_000, ref: 4 }, { op: '=', v: 206_000 }],
      [{ v: 206_000 }, { op: '×', v: 10, u: 'n', ref: 3 }, { op: '=', v: 2_060_000 }]
    ]
  },
  {
    id: 'TAX-01',
    domain: 'tax',
    severity: 'high',
    refs: [
      { doc: 'vdd', page: 1 },
      { doc: 'bp', page: 1 },
      { doc: 'gav', clause: '§ 6' },
      { doc: 'spa', clause: '§ 10' },
      { doc: 'spa', clause: '§ 12' },
      { doc: 'ja25', page: 3 }
    ],
    source: [
      {
        text: 'Die Organschaft wurde in allen Jahren tatsächlich durchgeführt. Die Verlustübernahme 2022 (EUR 0) war nicht erforderlich. Hinweis: Die Gewinnabführung 2024 wurde erst am 15. Januar 2026 gezahlt.',
        mark: 'Hinweis: Die Gewinnabführung 2024 wurde erst am 15. Januar 2026 gezahlt.'
      }
    ]
  },
  {
    id: 'TAX-02',
    domain: 'tax',
    severity: 'medium',
    refs: [
      { doc: 'fee', page: 1 },
      { doc: 'bp', page: 1 },
      { doc: 'spa', clause: '§ 4.2 (b)' },
      { doc: 'spa', clause: '§ 3.1' },
      { doc: 'spa', clause: '§ 12' }
    ],
    source: [
      {
        text: 'Monatliche Managementgebühr EUR 35.000 (bis 2024: EUR 20.000). Eine Leistungsdokumentation oder Verrechnungspreisanalyse liegt nicht vor.',
        mark: true
      }
    ],
    calc: [
      [
        { v: 35_000, ref: 1 },
        { op: '−', v: 20_000, ref: 1 },
        { op: '=', v: 15_000 },
        { op: '×', v: 12, u: 'n' },
        { op: '=', v: 180_000 }
      ],
      [{ v: 35_000, ref: 1 }, { op: '×', v: 11, u: 'n', ref: [4, 5] }, { op: '=', v: 385_000 }]
    ]
  },
  {
    id: 'COM-01',
    domain: 'commercial',
    severity: 'high',
    refs: [
      { doc: 'velmora', page: 1, clause: '§ 9.3' },
      { doc: 'q3', page: 1 },
      { doc: 'ja25', page: 3 },
      { doc: 'ma', sheet: 'GuV Management', cell: 'E2' },
      { doc: 'q1', page: 1 },
      { doc: 'q2', page: 1 },
      { doc: 'ja25', page: 2 }
    ],
    source: [
      {
        text: 'Vertragsbeginn 1. Januar 2021, Laufzeit bis 31. Dezember 2028 mit automatischer Verlängerung um jeweils zwei Jahre.'
      },
      { h: true, text: '§ 9 Preise' },
      {
        text: '9.3 Die Lieferantin gewährt ab dem 1. Januar 2026 eine jährliche Produktivitätsminderung von 3 % auf alle Teilepreise.',
        mark: true
      },
      { h: true, text: '§ 21 Kontrollwechsel' },
      {
        text: '21.1 Ändern sich die unmittelbaren oder mittelbaren Beteiligungsverhältnisse an der Lieferantin dergestalt, dass ein Dritter die Kontrolle erlangt, ist die Lieferantin verpflichtet, dies der Bestellerin unverzüglich schriftlich anzuzeigen.'
      }
    ],
    calc: [
      [{ v: 6_900_000, ref: 3 }, { op: '×', v: 0.03, u: 'pct', ref: 1 }, { op: '=', v: 207_000 }],
      [
        { v: 26_300_000, ref: 4 },
        { op: '−', v: 24_600_000, ref: 7 },
        { op: '=', v: 1_700_000 },
        { op: '÷', v: 24_600_000, ref: 7 },
        { op: '=', v: 1_700_000 / 24_600_000, u: 'pct' }
      ]
    ]
  },
  {
    id: 'COM-02',
    domain: 'commercial',
    severity: 'medium',
    refs: [
      { doc: 'ortelia', page: 1 },
      { doc: 'brisgau', page: 1 },
      { doc: 'selvan', page: 1 },
      { doc: 'tremonia', page: 1 },
      { doc: 'im', page: 1 },
      { doc: 'ma', sheet: 'Kunden 2025', cell: 'B3:B6' },
      { doc: 'ja25', page: 2 },
      { doc: 'velmora', page: 1 }
    ],
    source: [
      { text: 'Laufzeit unbefristet, kündbar mit sechs Monaten zum Jahresende.', mark: true },
      { text: 'Konsignationslager beim Kunden; Eigentum bleibt bis Entnahme bei der Lieferantin.' }
    ],
    calc: [
      [
        { v: 3_100_000, ref: 6 },
        { op: '+', v: 2_400_000, ref: 6 },
        { op: '+', v: 1_700_000, ref: 6 },
        { op: '+', v: 900_000, ref: 6 },
        { op: '=', v: 8_100_000 }
      ],
      [{ v: 8_100_000 }, { op: '÷', v: 24_600_000, ref: 7 }, { op: '=', v: 8_100_000 / 24_600_000, u: 'pct' }]
    ]
  }
];

/**
 * What a buyer expects in this room, against what arrived. Labels and notes
 * are translated in the copy files, in this order.
 */
export const DEMO_EXPECTED: readonly { domain: DemoDomain; files?: string[] }[] = [
  { domain: 'financial', files: ['01_Jahresabschluss_2024_HGB.pdf', '01_Jahresabschluss_2025_HGB.pdf'] },
  { domain: 'financial', files: ['02_Management_Accounts_2023-2027.xlsx'] },
  { domain: 'financial' },
  { domain: 'financial' },
  {
    domain: 'commercial',
    files: [
      '05_Rahmenliefervertrag_Velmora.pdf',
      '041_Kundenvertrag_Ortelia.pdf',
      '042_Kundenvertrag_Brisgau.pdf',
      '043_Kundenvertrag_Selvan.pdf',
      '044_Kundenvertrag_Tremonia.pdf'
    ]
  },
  { domain: 'legal', files: ['07_Mietvertrag_Werk_Bamberg.pdf', '099_Mietvertrag_Verlaengerung_Korrespondenz.pdf'] },
  { domain: 'legal' },
  { domain: 'legal' },
  { domain: 'legal', files: ['11_SPA_Entwurf_Locked_Box.docx'] },
  { domain: 'tax', files: ['10_Gewinnabfuehrungsvertrag.docx'] },
  {
    domain: 'tax',
    files: [
      '072_Steuerbescheid_Organtraeger_2022.pdf',
      '073_Steuerbescheid_Organtraeger_2023.pdf',
      '074_Steuerbescheid_Organtraeger_2024.pdf'
    ]
  },
  { domain: 'tax' }
];

// ─── Copy, per locale ───────────────────────────────────────────────────────

export interface DemoFindingCopy {
  title: string;
  /** Module and sub-area, e.g. "Financial · Quality of earnings". */
  area: string;
  finding: string;
  /** Reasoning. `[n]` renders as a numbered source reference. */
  observed: string;
  standard: string;
  application: string;
  /** One label per calc line, block by block. */
  calc?: string[][];
}

export interface DemoChrome {
  screenLabel: string;
  badge: string;
  back: string;
  /** {docs} */
  dealNote: string;
  stations: [string, string, string];
  /** {n} */
  waiting: string;
  decidedAll: string;
  railLabel: string;
  domains: Record<DemoDomain, string>;
  /** {n} */
  railOpen: string;
  railDone: string;
  missingTab: string;
  /** {n} */
  missingCount: string;
  severity: Record<DemoSeverity, string>;
  /** {i} {n} */
  counter: string;
  prev: string;
  next: string;
  fields: {
    module: string;
    finding: string;
    why: string;
    observed: string;
    standard: string;
    application: string;
    excerpt: string;
    severity: string;
    calc: string;
    source: string;
    review: string;
  };
  /** {loc} */
  excerptMarked: string;
  excerptExact: string;
  calcNote: string;
  review: {
    pending: string;
    approved: string;
    adjusted: string;
    /** {route} */
    investigate: string;
    /** {reason} */
    rejected: string;
  };
  decisions: { approve: string; adjust: string; investigate: string; reject: string };
  demoNote: string;
  rejectTitle: string;
  reasons: string[];
  investigateTitle: string;
  routes: string[];
  adjustTitle: string;
  adjustSave: string;
  cancel: string;
  undo: string;
  sourceLabel: string;
  schematic: string;
  original: string;
  /** {n} {total} */
  pageOf: string;
  /** {n} */
  page: string;
  /** {s} */
  sheet: string;
  sourceHint: string;
  docLanguage: string;
  missingTitle: string;
  missingLead: string;
  received: string;
  missing: string;
  footnote: string;
}

export interface DemoCopy {
  chrome: DemoChrome;
  findings: Record<string, DemoFindingCopy>;
  /** In DEMO_EXPECTED order. */
  expected: { label: string; note?: string }[];
}
