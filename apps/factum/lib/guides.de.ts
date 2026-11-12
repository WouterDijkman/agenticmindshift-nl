import type { Guide, GuideChrome } from './guides';
import type { GuideSlug } from './guideRoutes';

/**
 * German copy for the three decision pages, translated from the English
 * entry in lib/guides.ts (Dutch used as a cross-check). Terminology follows
 * messages/de.json: "Data Room", formal "Sie", "Prüfer" for reviewer,
 * "Feststellung" for finding, "Target". The rules in the header comment of
 * lib/guides.ts apply unchanged. Not wired up yet: GUIDE_LOCALES is still
 * ['en', 'nl'].
 */

const PUBLISHED = '2026-10-21';

export const CHROME_DE: GuideChrome = {
  tocLabel: 'Auf dieser Seite',
  relatedLabel: 'Weiterlesen',
  guidesLabel: 'Ratgeber',
  governanceLabel: 'Wie Ihre Dokumente behandelt werden'
};

export const GUIDES_DE: Record<GuideSlug, Guide> = {
  'data-room-checklist': {
    metaTitle: 'Data-Room-Checkliste vor dem Verkauf',
    metaDescription:
      'Was ein Käufer im Data Room erwartet, je Disziplin: die Unterlagen, die teuersten Lücken und wann Sie beginnen. Für Verkäufer und Sell-Side-Broker.',
    shortName: 'Data-Room-Checkliste',
    h1: 'Was gehört vor einem Verkauf in den Data Room?',
    answer:
      'Was ein Käufer anfragen wird, in einer Form, mit der ein Käufer arbeiten kann: Zahlen, die zueinander passen, die Verträge, die den Umsatz tragen, Personal, Steuern, Recht und IP, jeweils vollständig und leicht auffindbar. Am teuersten sind die stillen Lücken: ein Vertrag, den niemand abgelegt hat, ein Jahr, das in einem Export fehlt, zwei Dokumente mit unterschiedlichen Zahlen.',
    sections: [
      {
        heading: 'Welche Unterlagen erwartet ein Käufer?',
        bullets: [
          'Finanzen: Jahresabschlüsse der letzten drei Jahre, Management Accounts und Monatszahlen, Working Capital, Schulden und schuldähnliche Posten sowie die Bereinigungen hinter dem EBITDA im Information Memorandum.',
          'Kommerz: eine Kundenliste mit Umsatz je Kunde, die größten Kundenverträge, Preise und Rabatte, Kundenabwanderung.',
          'Recht: Gesellschaftsunterlagen, wesentliche Verträge und ihre Change-of-Control-Klauseln, Garantien, Rechtsstreitigkeiten.',
          'Steuern: Steuererklärungen und Bescheide, offene Positionen, die Konzernstruktur.',
          'Personal: Verträge der Schlüsselpersonen, Pensionszusagen, Tarifverträge.',
          'Betrieb: wichtige Lieferanten, kritische Einzelabhängigkeiten, Durchlaufzeiten.',
          'Technologie und KI: Lizenzen, wem die Daten gehören, von welchen Modellen das Unternehmen abhängt.'
        ],
        after: [
          'Die genaue Liste folgt dem Deal. Eine Kapitalrunde verlangt einen Mittelverwendungsplan, ein Verkauf den Auftragsbestand.'
        ]
      },
      {
        heading: 'Was, wenn ein Dokument da ist, aber die Frage nicht beantwortet?',
        paragraphs: [
          'Dann liest ein Käufer es als Lücke und fragt nach. Eine Kundenliste ohne Umsatz je Kunde ist der typische Fall: im Data Room vorhanden, für die Frage des Käufers unbrauchbar.'
        ]
      },
      {
        heading: 'Und Zahlen, die sich widersprechen?',
        paragraphs: [
          'Umsatz in den Management Accounts, der vom Jahresabschluss abweicht. Eine Mitarbeiterzahl im HR-Export, die nicht zur Lohnabrechnung passt. Ein Käufer findet beide Quellen. Finden Sie sie zuerst, und halten Sie die Erklärung bereit.'
        ]
      },
      {
        heading: 'Warum ist ein fehlendes Dokument so schwer zu erkennen?',
        paragraphs: [
          'Weil etwas, das fehlt, keine Spur hinterlässt. Der Vertrag, den niemand abgelegt hat, das Jahr, das im Lohnexport fehlt: Es gibt keine Passage zum Zitieren, also stößt beim Lesen niemand darauf. Es fällt erst auf, wenn der Data Room mit einer Liste dessen abgeglichen wird, was ein Käufer erwartet.'
        ]
      },
      {
        heading: 'Wann sollte ein Verkäufer anfangen?',
        paragraphs: [
          'So früh, dass die Antwort auf eine Feststellung noch „das haben wir behoben“ lauten kann. Sobald der Data Room live ist, lautet die ehrliche Antwort „das wissen wir, und hier ist der Kontext“. Beides funktioniert. Das Erste ist mehr wert.'
        ]
      },
      {
        heading: 'Wie prüft Factum einen Data Room?',
        paragraphs: [
          'Factum liest den Data Room so, wie ein Käufer es tun wird: was noch fehlt, was nicht aufgeht und welche Risiken ein Käufer ansprechen wird. Jeder Punkt geht zuerst an Ihr Team, denn ein Vertrag, der in einer anderen Datei abgelegt ist, kann als fehlend erscheinen.',
          'Es ersetzt keinen Vendor-Due-Diligence-Bericht eines Beraters und ist kein Aufräumservice. Es benennt, was fehlt; es zu beschaffen bleibt Sache des Verkäufers. Siehe [was KI nicht kann](/limits-of-ai).'
        ]
      }
    ],
    helps: {
      heading: 'Für Sell-Side-Broker',
      bullets: [
        'Der Data Room Ihres Mandanten, gelesen, wie ein Käufer ihn lesen wird, bevor der Käufer es tut.',
        'Fehlende Unterlagen und offene Fragen gehen als eine Anfrage an Ihren Mandanten, innerhalb der Plattform.',
        'Zahlen, die sich widersprechen, mit beiden Quellen benannt.',
        'Ihr Team bewertet jeden Punkt. Factum gibt nichts frei.'
      ],
      note: 'Mehr zu [Factum für Verkäufer und Broker](/pre-sale).'
    },
    datePublished: PUBLISHED
  },
  'due-diligence-timeline': {
    metaTitle: 'Wie lange dauert eine Due Diligence?',
    metaDescription:
      'Wo die Zeit in der Due Diligence hingeht, wo Tage zu gewinnen sind, was nicht schneller wird und warum Factum erst nach Sicht des Data Rooms ein Datum nennt.',
    shortName: 'Dauer der Due Diligence',
    h1: 'Wie lange dauert eine Due Diligence?',
    answer:
      'Länger, als den meisten Exklusivitätsfristen lieb ist. Eine Quality-of-Earnings-Analyse allein deckt eine Dimension in vier bis zehn Wochen ab. Die meiste Zeit geht in Lesen, Warten und das Nachfassen von Unterlagen, nicht in das Urteil. Der Pipeline-Durchgang von Factum läuft in Stunden; die Prüfung durch Ihr Team folgt danach, in Ihrem Tempo.',
    sections: [
      {
        heading: 'Wo geht die Zeit hin?',
        bullets: [
          'Lesen. Ein Team unter Zeitdruck liest eine Stichprobe des Data Rooms, und die Tage reichen trotzdem nicht.',
          'Warten. Spezialisten arbeiten nacheinander: Steuern wartet auf den Finanz- und den Rechtsdurchgang, die Bewertung wartet auf Steuern.',
          'Nachfassen. Unterlagen, die nie hochgeladen wurden, fallen spät auf, werden angefragt und bei Eingang erneut gelesen.',
          'Abgleichen. Getrennte Berichte müssen nebeneinandergelegt werden, bevor jemand sagen kann, was sie für den Preis bedeuten.'
        ]
      },
      {
        heading: 'Wo lassen sich Tage gewinnen?',
        paragraphs: [
          'Vor allem bei den ersten drei. Factum liest jedes Dokument statt einer Stichprobe, führt die Module, die nicht voneinander abhängen, gleichzeitig aus und listet zu Beginn auf, was fehlt, nicht erst am Ende.',
          'Die Tage entstehen durch die parallele Ausführung, nicht dadurch, dass eine einzelne Antwort schneller kommt. Wie die Reihenfolge festgelegt wird, steht auf [der Plattformseite](/platform).'
        ]
      },
      {
        heading: 'Was wird nicht schneller?',
        bullets: [
          'Das Urteil Ihres Prüfers darüber, was wesentlich ist.',
          'Die Antworten des Verkäufers auf Ihre Fragen und die Unterlagen, die noch ausstehen.',
          'Die Verhandlung über den Preis und den Kaufvertrag.'
        ],
        after: [
          'Software verkürzt das Lesen und das Warten. Die Gespräche, die die Feststellungen auslösen, dauern so lange, wie sie dauern.'
        ]
      },
      {
        heading: 'Wie verkürzen Sie sie, bevor sie beginnt?',
        steps: [
          'Holen Sie sich in den ersten Tagen die Liste dessen, was fehlt, solange noch Zeit ist, es anzufordern.',
          'Briefen Sie Ihre Berater, was der Data Room tatsächlich enthält, damit ihre Stunden dorthin gehen, wo das Risiko liegt.',
          'Als Verkäufer: Bereiten Sie den Data Room vor, bevor der Prozess beginnt. Siehe [was in einen Data Room gehört](/data-room-checklist).'
        ]
      },
      {
        heading: 'Warum verspricht Factum vorab kein Datum?',
        paragraphs: [
          'Weil die Dauer von Umfang und Zustand des Data Rooms abhängt, und den haben wir noch nicht gesehen. Das Gespräch, um NDA und Data Room zu klären, dauert dreißig Minuten. Tage später lesen Sie die Feststellungen, Quelle für Quelle.'
        ]
      }
    ],
    helps: {
      heading: 'Was Factum mit der Dauer macht',
      bullets: [
        'Der Pipeline-Durchgang läuft in Stunden, über {disciplines} Disziplinen.',
        'Jede Feststellung kommt mit Quelldokument und Fundstelle, bereit für Ihren Prüfer.',
        'Die Liste dessen, was nie kam, ab dem ersten Durchgang.',
        'Ihr Team prüft und gibt in der Plattform frei, im eigenen Tempo.'
      ],
      note: 'Recht und Steuern sind auf niederländisches Recht abgestimmt; bei einem Target anderswo sollten lokale Rechtsberater sie prüfen. Ein Deal, den Sie letztes Jahr abgeschlossen haben, eignet sich als Test.'
    },
    datePublished: PUBLISHED
  },
  'when-not-to-use-factum': {
    metaTitle: 'Wann KI-Due-Diligence nicht passt',
    metaDescription:
      'Sechs Fälle, in denen Factum nicht passt: ein Testat, Recht oder Steuern im Ausland, Code-Review, Hintergrundcheck, kein Data Room oder die Entscheidung selbst.',
    shortName: 'Wann Factum nicht passt',
    h1: 'Wann ist Factum das falsche Werkzeug?',
    answer:
      'Wenn der Deal eine Unterschrift, eine Rechtsordnung oder eine Art von Prüfung braucht, die Factum nicht liefert. Factum liest jedes Dokument im Data Room und belegt jede Feststellung mit Quelle und Fundstelle. Ihr eigener Prüfer entscheidet, was zählt, und gibt frei. In diesen Fällen brauchen Sie etwas anderes, oder etwas zusätzlich.',
    sections: [
      {
        heading: 'Sie brauchen einen unterschriebenen Bericht',
        paragraphs: [
          'Ein Quality-of-Earnings-Bericht oder ein Vendor-Due-Diligence-Bericht entsteht in einem separaten Mandat mit einem Wirtschaftsprüfer oder Berater, der ihn unterschreibt, und eine Bank oder ein Käufer kann sich auf diesen Bericht stützen. Factum ersetzt diesen Bericht nicht, erbringt keine Assurance-Leistungen und unterschreibt nichts. Ihr Prüfer gibt die Feststellungen für Ihren eigenen Gebrauch frei.',
          'Verlangt die Finanzierung oder der Kaufvertrag einen unterschriebenen Bericht, geben Sie einen in Auftrag. Factum kann parallel dazu laufen, über {disciplines} Disziplinen, damit die Spezialisten bei dem beginnen, was der Data Room tatsächlich enthält.'
        ]
      },
      {
        heading: 'Recht und Steuern entscheiden den Deal, und das Target sitzt im Ausland',
        paragraphs: [
          'Recht und Steuern sind auf niederländisches Recht abgestimmt. Die Analyse von Finanzen, Kommerz und Betrieb funktioniert in jeder Rechtsordnung. Bei einem Target anderswo sollten lokale Rechtsberater die rechtlichen und steuerlichen Feststellungen prüfen.'
        ]
      },
      {
        heading: 'Die Frage betrifft die Technologie selbst',
        paragraphs: [
          'Factum führt keine Quellcode-Reviews, Architekturbewertungen oder Skalierbarkeitstests durch. Die KI-Disziplin liest, was die Dokumente sagen: wessen Modell, wessen Daten, was unter den AI Act fällt. Ob der Code hält, ist eine separate technische Due Diligence.'
        ]
      },
      {
        heading: 'Sie brauchen Hintergrund- oder Integritätsprüfungen',
        paragraphs: [
          'Factum liest den Data Room. Es prüft keine Personen oder Unternehmen auf Integrität oder Reputation und führt keine Hintergrundprüfungen durch.'
        ]
      },
      {
        heading: 'Es gibt noch keinen Data Room',
        paragraphs: [
          'Factum arbeitet mit Dokumenten. Ist der Data Room noch nicht zusammengestellt, gibt es nichts zu lesen. Ein Verkäufer, der sich noch vorbereitet, kann bei der Frage beginnen, [was ein Käufer anfragen wird](/data-room-checklist).'
        ]
      },
      {
        heading: 'Sie wollen, dass die Entscheidung für Sie fällt',
        paragraphs: [
          'Ein Modell kann jede Change-of-Control-Klausel im Data Room finden. Es kann Ihnen nicht sagen, welche den Deal platzen lässt. Wesentlichkeit hängt von Ihrer Struktur, Ihrem Preis und Ihrer Risikobereitschaft ab, und nichts davon steht im Data Room.',
          'Deshalb ist der Prüfschritt Pflicht: Kein Export verlässt die Plattform ohne die Freigabe Ihres Prüfers. Mehr dazu unter [Was KI nicht kann](/limits-of-ai).'
        ]
      }
    ],
    helps: {
      heading: 'Wo Factum passt',
      bullets: [
        'Der ganze Data Room gelesen, jede Feststellung mit Dokument und Fundstelle belegt.',
        '{disciplines} Disziplinen in einem Durchgang, zu einem Bericht abgeglichen.',
        'Eine laufende Liste dessen, was der Verkäufer nie hochgeladen hat.',
        'Ein Deal, den Sie letztes Jahr abgeschlossen haben, als Test: Nichts aus einem laufenden Prozess wird offengelegt, und Sie können die Feststellungen gegen das halten, was Ihr Team damals fand.'
      ],
      note: 'Factum steht vor dem Launch: Es gibt noch keinen öffentlichen Kunden und keine Fallstudie. Der erste echte Bericht, den Sie sehen, ist Ihr eigener.'
    },
    datePublished: PUBLISHED
  },
  'ai-due-diligence-vs-data-room-ai': {
    metaTitle: 'KI-Due-Diligence vs. KI im Data Room',
    metaDescription:
      'KI im Data Room hilft, den Raum zu führen: ordnen, schwärzen, suchen, Q&A. KI-gestützte Due Diligence liest jedes Dokument für Käufer oder Sell-Side-Berater, mit Quelle je Feststellung.',
    shortName: 'KI-Due-Diligence vs. KI im Data Room',
    h1: 'KI-Due-Diligence oder KI im Data Room: Was ist der Unterschied?',
    answer:
      'KI im Data Room hilft, den Raum zu führen: Sie ordnet, schwärzt und durchsucht die Dokumente und organisiert das Q&A, für die Partei, die den Prozess leitet. Eine Plattform für KI-gestützte Due Diligence arbeitet für den Käufer oder für den Sell-Side-Berater, der den Data Room vorbereitet. Sie liest jedes Dokument im Data Room und liefert Feststellungen, jede mit Quelldokument und Fundstelle. Factum gehört zur zweiten Art. Ihr eigener Prüfer entscheidet, was zählt, und gibt frei.',
    table: {
      heading: 'Im Vergleich',
      corner: 'Frage',
      columns: ['KI im Data Room', 'Plattform für KI-Due-Diligence'],
      rows: [
        {
          label: 'Für wen',
          cells: [
            'Die Partei, die den Data Room führt, meist der Verkäufer und sein Berater, und alle, die darin arbeiten',
            'Den Käufer, oder den Sell-Side-Berater, der den Data Room so gelesen haben will, wie ein Käufer ihn liest'
          ]
        },
        {
          label: 'Wofür',
          cells: [
            'Den Data Room führen: Ordnung, Zugriff, Schwärzung, Suche, Fragen und Antworten',
            'Das Target beurteilen: was die Dokumente für den Deal bedeuten'
          ]
        },
        {
          label: 'Was gelesen wird',
          cells: [
            'Dokumente beim Hochladen, um sie zu indexieren, zu verschlagworten, zu schwärzen und durchsuchbar zu machen',
            'Jedes Dokument im Data Room, über {disciplines} Disziplinen, gegeneinander abgeglichen'
          ]
        },
        {
          label: 'Was Sie bekommen',
          cells: [
            'Einen geordneten, durchsuchbaren Data Room und ein geführtes Q&A-Protokoll',
            'Feststellungen mit Schweregrad, Zahlen, die sich widersprechen, und eine Liste dessen, was fehlt'
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
            label: 'Beispiele',
            cells: [
              'Datasite (Blueflame AI), Imprima, Drooms, Ansarada, Intralinks',
              'Factum. Juristische und Finanz-KI-Tools decken einen Teil derselben Lektüre ab: siehe unten'
            ]
          },
          {
          label: 'Quellenangabe',
          cells: [
            'Je nach Anbieter und Funktion unterschiedlich',
            'Jede Feststellung zitiert die belegende Passage wörtlich, mit Quelldokument und Fundstelle'
          ]
        },
        {
          label: 'Wer gibt frei',
          cells: [
            'Nichts freizugeben: Sie verwaltet den Data Room, sie prüft nicht das Target',
            'Ihr eigener Prüfer. Kein Export ohne diese Freigabe. Factum unterschreibt nichts.'
          ]
        }
      ],
      note:
        'Jeder Anbieter beschreibt seine eigenen Funktionen, und sie ändern sich oft. Manche Data Rooms prüfen inzwischen auch Dokumente im Raum selbst: Imprima beschreibt KI-Vertragsprüfung und Zusammenfassungen, Datasite einen Assistenten, der mögliche Lücken erkennt. Fragen Sie Ihren Anbieter, worauf jede Antwort verweist und wer sie freigibt.'
    },
    sections: [
      {
        heading: 'Was macht KI im Data Room?',
        paragraphs: [
          'Anbieter virtueller Data Rooms haben KI in den Raum selbst eingebaut. Sie hilft dem, der den Prozess leitet, den Data Room in Ordnung und in Bewegung zu halten.'
        ],
        bullets: [
          'Ordnen: Uploads sortieren und in eine Struktur indexieren.',
          'Schwärzen: personenbezogene Daten und sensible Passagen finden, bevor Dokumente geteilt werden.',
          'Suchen: die Dokumente finden, in denen ein Begriff oder eine Frage vorkommt.',
          'Q&A: Fragen der Bieter weiterleiten, bei der Antwort helfen, verfolgen, was noch offen ist.'
        ],
        after: ['Es geht um den Data Room selbst: was darin liegt, wer was sieht, welche Fragen offen sind.']
      },
      {
        heading: 'Was macht eine Plattform für KI-Due-Diligence?',
        paragraphs: [
          'Sie liest den Data Room für den, der das Target beurteilen muss. Factum liest jedes Dokument im Data Room, über {disciplines} Disziplinen, und gleicht sie gegeneinander ab: einen Vertrag mit dem Umsatz, den er tragen soll, die Managementberichte mit dem Jahresabschluss.',
          'Jede Feststellung zitiert die belegende Passage wörtlich, mit Quelldokument und Fundstelle, sodass Ihr Prüfer sie an der Quelle kontrollieren kann. Was im Data Room sein sollte und fehlt, kommt auf eine eigene Liste.'
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
          heading: 'Wo passen juristische und Finanz-KI-Tools?',
          paragraphs: [
            'Ein Dealteam trifft auch auf KI-Tools, die für einen einzelnen Beruf gebaut sind. Kira, Teil von Litera, beschreibt sich als gebaut für umfangreiche Prüfungen und Due Diligence, für Anwälte. Harvey ist KI-Software für Rechts- und professionelle Dienstleistungen, genutzt von Kanzleien und Rechtsabteilungen. Luminance nennt sich eine Contract-Intelligence-Plattform. Hebbia beschreibt KI, gebaut für Finance, für Investoren und Banker.',
            'Diese Tools arbeiten mit den Dokumenten und Fragen, die Sie ihnen geben, meist innerhalb einer Disziplin. Factum liest den ganzen Data Room über {disciplines} Disziplinen in einem Durchlauf und gleicht die Disziplinen gegeneinander ab: Das Finanzmodul liest zuerst die rechtlichen Feststellungen, Steuern liest beide. Welches Tool passt, hängt davon ab, wer fragt und was der Deal braucht.'
          ]
        },
        {
        heading: 'Wann brauchen Sie was?',
        bullets: [
          'Sie leiten einen Verkaufsprozess und wollen den Data Room geordnet, geschwärzt und die Fragen im Griff: KI im Data Room.',
          'Sie kaufen und müssen wissen, was die Dokumente über das Target sagen: KI-gestützte Due Diligence.',
          'Sie beraten den Verkäufer und wollen den Data Room so gelesen haben, wie ein Käufer ihn liest, bevor ein Käufer es tut: KI-gestützte Due Diligence auf dem Data Room des Verkäufers. Siehe [Factum für Verkäufer und Broker](/pre-sale).'
        ],
        after: ['Die meisten Deals nutzen beides. Der Data Room verwahrt die Dokumente; Factum liest sie.']
      },
      {
        heading: 'Wie arbeiten beide zusammen?',
        paragraphs: [
          'Der Data Room bleibt, wo der Prozess läuft: Zugriff, Versionen, Fragen und Antworten. Ihr Team lädt die Dokumente aus dem Data Room in Factum hoch. Factum liefert die Feststellungen, und Ihr Prüfer geht sie in der Plattform durch. Wie ein Durchgang aufgesetzt wird, steht auf [der Plattformseite](/platform).'
        ]
      },
      {
        heading: 'Was keines von beiden ersetzt',
        paragraphs: [
          'Einen unterschriebenen Bericht. Ein Quality-of-Earnings- oder Vendor-Due-Diligence-Bericht entsteht in einem separaten Mandat mit einem Wirtschaftsprüfer oder Berater, der ihn unterschreibt. Factum erbringt keine Assurance-Leistungen; Ihr Prüfer gibt die Feststellungen für Ihren eigenen Gebrauch frei. Mehr dazu in [wann Factum nicht passt](/when-not-to-use-factum).'
        ]
      }
    ],
    faq: {
      heading: 'Häufige Fragen',
      items: [
        {
          q: 'Ist ein Data Room mit KI-Funktionen dasselbe wie KI-gestützte Due Diligence?',
          a: 'Nein. KI im Data Room hilft, den Raum zu führen: ordnen, schwärzen, suchen und Q&A. KI-gestützte Due Diligence liest jedes Dokument für den Käufer oder den Sell-Side-Berater und liefert Feststellungen zum Target, jede mit Quelldokument und Fundstelle.'
        },
        {
          q: 'Ersetzt Factum unseren virtuellen Data Room?',
          a: 'Nein. Der Data Room bleibt, wo der Prozess läuft. Ihr Team lädt die Dokumente in Factum hoch; Factum liest sie und liefert Feststellungen für Ihren Prüfer.'
        },
        {
          q: 'Wer gibt die Feststellungen frei?',
          a: 'Ihr eigener Prüfer. Die menschliche Prüfung ist Pflicht: Kein Export verlässt die Plattform ohne die Freigabe Ihres Prüfers. Factum unterschreibt nichts und erbringt keine Assurance-Leistungen.'
        },
        {
          q: 'Welche Disziplinen deckt Factum ab?',
          a: '{disciplines} Disziplinen: Finanzen, Kommerziell, Recht, Steuern, Personal, KI, Operativ sowie Bewertung und Dealökonomie, zu einem Bericht abgeglichen.'
        },
        {
          q: 'Funktioniert es auch für Deals außerhalb der Niederlande?',
          a: 'Die Analyse von Finanzen, Kommerz und Betrieb funktioniert in jeder Rechtsordnung. Recht und Steuern sind auf niederländisches Recht abgestimmt; bei einem Target anderswo sollten lokale Rechtsberater diese Feststellungen prüfen.'
        },
        {
          q: 'Können wir es vor einem laufenden Deal testen?',
          a: 'Ja. Ein Deal, den Sie letztes Jahr abgeschlossen haben, eignet sich als Test: Nichts aus einem laufenden Prozess liegt offen, und Sie können die Feststellungen mit dem vergleichen, was Ihr Team damals fand. Factum steht vor dem Launch, der erste echte Bericht, den Sie sehen, ist also Ihr eigener.'
        }
      ]
    },
    helps: {
      heading: 'Wo Factum passt',
      bullets: [
        'Für Private Equity und andere Käufer, und für Sell-Side-Broker.',
        'Der ganze Data Room gelesen, jede Feststellung mit Dokument und Fundstelle belegt.',
        '{disciplines} Disziplinen in einem Durchgang, zu einem Bericht abgeglichen.',
        'Ihr Team prüft die Feststellungen und gibt in der Plattform frei.'
      ],
      note: 'Factum steht vor dem Launch: Es gibt noch keinen öffentlichen Kunden und keine Fallstudie. Recht und Steuern sind auf niederländisches Recht abgestimmt. Sie wählen einen Anbieter? Nutzen Sie [zehn Fragen an einen Anbieter für KI-Due-Diligence](/ai-due-diligence-vendor-questions). Vor dem Signing: [Red-Flag-Review eines Data Rooms](/red-flag-review). Beim Kauf einer niederländischen BV: [Due Diligence bei einer niederländischen BV](/dutch-bv-due-diligence). Und [wie Ihre Dokumente behandelt werden](/governance).'
    },
    datePublished: '2026-11-08'
  },
  'dutch-bv-due-diligence': {
    metaTitle: 'Due Diligence bei einer niederländischen BV: was ein Käufer prüft',
    metaDescription:
      'Kauf einer niederländischen BV? Was Sie im Data Room nach niederländischem Recht prüfen: Anteile, Change of Control, Betriebsrat, Pensionen, Steuereinheit, ACM, und das Verhältnis zur FDD.',
    shortName: 'Due Diligence bei einer niederländischen BV',
    h1: 'Due Diligence bei einer niederländischen BV: was prüft ein Käufer im Data Room?',
    answer:
      'Ist das Target eine niederländische Gesellschaft mit beschränkter Haftung (besloten vennootschap, BV), muss der Data Room Fragen beantworten, die das niederländische Recht stellt: Wer hält die Anteile tatsächlich, welche Verträge überstehen den Kontrollwechsel, was verlangen Betriebsrat und Pensionsregelung, und welche Steuerpositionen gehen mit der Gesellschaft über. Diese Seite behandelt nur Targets nach niederländischem Recht. Sie beschreibt, was ein Käufer prüft; sie ist keine Rechtsberatung.',
    sections: [
      {
        heading: 'Wer hält die Anteile, und sind sie übertragbar?',
        bullets: [
          'Satzung (statuten): der geltende Wortlaut und eine etwaige Übertragungsbeschränkung (blokkeringsregeling), etwa ein Vorkaufsrecht oder ein Zustimmungserfordernis.',
          'Gesellschafterregister: jede Ausgabe und Übertragung seit der Gründung, jeweils mit notarieller Urkunde. Anteile an einer BV gehen durch notarielle Urkunde über, eine Lücke in der Urkundenkette ist also eine Lücke im Rechtstitel.',
          'Zertifikate über eine Verwaltungsstiftung (STAK), Pfandrechte und Nießbrauch an Anteilen, und wer die Stimmrechte hält.',
          'Gesellschaftervereinbarung: Drag-along und Tag-along, Good und Bad Leaver, Vetorechte, die den Verkauf überdauern.',
          'Auszüge aus dem Handelsregister (KvK) und dem UBO-Register, die zum Gesellschafterregister passen.'
        ],
        after: [
          'Eine fehlende Urkunde oder eine nicht eingetragene Übertragung lässt sich oft vor dem Signing heilen. Nach dem Signing entdeckt, wird daraus eine Diskussion über Garantien.'
        ]
      },
      {
        heading: 'Welche Verträge gehen mit der Gesellschaft über?',
        paragraphs: [
          'Beim Share Deal bleiben die Verträge bei der BV. Die Frage ist dann, welche dem Vertragspartner erlauben, bei einem Kontrollwechsel zu kündigen oder nachzuverhandeln. Beim Asset Deal muss jeder Vertrag übertragen werden, wofür meist die Mitwirkung des Vertragspartners nötig ist.'
        ],
        bullets: [
          'Change-of-Control- und Kündigungsklauseln in den größten Kunden-, Lieferanten-, Lizenz- und Mietverträgen.',
          'Abtretungsverbote und Exklusivitätsklauseln, die nach dem Closing die Gruppe des Käufers binden würden.',
          'Bankfinanzierungen mit Change-of-Control- und Cross-Default-Klauseln und die dafür bestellten Sicherheiten.',
          'Garantien der BV für Gruppengesellschaften, einschließlich Haftungserklärungen beim Handelsregister (403-verklaringen).'
        ]
      },
      {
        heading: 'Was verlangen Betriebsrat, Mitarbeiter und Pensionen?',
        bullets: [
          'Betriebsrat (ondernemingsraad): Wo es einen gibt, löst ein Kontrollwechsel meist ein Beratungsrecht aus, und die Stellungnahme wird eingeholt, solange sie die Entscheidung noch beeinflussen kann.',
          'Gewerkschaften: Je nach Größe der beteiligten Unternehmen kann der SER-Fusionskodex (SER-Fusiegedragsregels) verlangen, dass sie informiert werden.',
          'Arbeitsbedingungen: Verträge der Schlüsselpersonen, Wettbewerbsverbote, Bonus- und Halteprämien, die bei einem Verkauf fällig werden, und der anwendbare Tarifvertrag (cao).',
          'Pensionen: welche Regelung gilt, ob die Teilnahme an einem Branchenpensionsfonds verpflichtend ist, und wo die Regelung beim Übergang nach dem Gesetz über die Zukunft der Renten (Wet toekomst pensioenen) steht.',
          'Beim Asset Deal gehen die Mitarbeiter kraft Gesetzes mit ihren Arbeitsbedingungen über (overgang van onderneming).'
        ]
      },
      {
        heading: 'Wann kommen die ACM oder eine andere Aufsicht ins Spiel?',
        paragraphs: [
          'Überschreitet der Umsatz der Beteiligten die Schwellen des niederländischen Wettbewerbsgesetzes (Mededingingswet), muss der Zusammenschluss vor dem Closing bei der Behörde für Verbraucher und Märkte (ACM) angemeldet werden; oberhalb der EU-Schwellen übernimmt die Europäische Kommission.',
          'Daneben kann der Erwerb eines vitalen Anbieters oder eines Unternehmens mit sensibler Technologie eine Anmeldung nach dem niederländischen Investitionsprüfungsgesetz (Wet Vifo) erfordern, und eine Lizenz in einem regulierten Sektor die Zustimmung der Aufsicht. Ob das zutrifft, klären Sie früh mit Ihrem Anwalt, weil es den Zeitplan bestimmt.'
        ]
      },
      {
        heading: 'Welche Steuerpositionen gehen mit der Gesellschaft über?',
        bullets: [
          'Steuerliche Einheit für die Körperschaftsteuer (fiscale eenheid): Das Target verlässt mit dem Verkauf die steuerliche Einheit des Verkäufers, mit Folgen für Verluste und frühere Transaktionen in der Gruppe.',
          'Steuerliche Einheit für die Umsatzsteuer: Jedes Mitglied haftet gesamtschuldnerisch für die Umsatzsteuer der ganzen Einheit für den Zeitraum seiner Zugehörigkeit.',
          'Offene Bescheide, Prüfungen durch die niederländische Steuerverwaltung (Belastingdienst) und Rulings oder Absprachen, auf die das Target sich stützt.',
          'Lohnsteuer und Kettenhaftung (ketenaansprakelijkheid), wo das Unternehmen mit Subunternehmern oder Leiharbeitskräften arbeitet.',
          'Latente Steuern, die sonst erst in der ersten Steuererklärung nach dem Closing auftauchen.'
        ]
      },
      {
        heading: 'Was zeigt der Data Room meistens nicht?',
        paragraphs: [
          'Die Dokumente, die niemand hochgeladen hat. Eine notarielle Urkunde von vor fünfzehn Jahren, ein Side Letter zu einem Kundenvertrag, die Stellungnahme des Betriebsrats, die letzte Mitteilung des Pensionsträgers. Was fehlt, hinterlässt keine Passage zum Zitieren, es fällt also erst auf, wenn der Data Room neben eine Liste dessen gelegt wird, was da sein sollte.',
          'Für die Seite des Verkäufers derselben Liste siehe [die Data-Room-Checkliste](/data-room-checklist).'
        ]
      },
      {
        heading: 'Wie verhält sich eine KI-Lektüre des ganzen Data Rooms zur FDD des Wirtschaftsprüfers?',
        paragraphs: [
          'Die Financial Due Diligence (FDD) einer Prüfungs- oder Beratungsgesellschaft geht bei den Zahlen in die Tiefe: Quality of Earnings, bereinigtes EBITDA, Nettoverschuldung und Working Capital. Sie endet in einem Bericht, den die Gesellschaft unterzeichnet und den eine Bank oder ein W&I-Versicherer sehen will.',
          'Factum liest jedes Dokument im Data Room über {disciplines} Disziplinen und liefert Feststellungen, jede mit Quelldokument und Fundstelle. Es gibt keine Assurance und unterschreibt nichts; Ihr eigener Prüfer gibt die Feststellungen für den eigenen Gebrauch frei. Neben einer FDD zeigt es den Spezialisten früh, was im Data Room liegt, was sich widerspricht und was fehlt, sodass ihre Stunden dorthin gehen, wo das Risiko liegt. Die FDD und die Legal Due Diligence Ihres Anwalts bleiben, was sie sind.',
          'Wie die Lektüre aufgebaut ist, steht auf [der Plattformseite](/platform). Wie sich das von KI in einem virtuellen Data Room unterscheidet, steht unter [KI-Due-Diligence vs. KI im Data Room](/ai-due-diligence-vs-data-room-ai).'
        ]
      },
      {
        heading: 'Wie gelangen die Feststellungen in den Kaufvertrag?',
        paragraphs: [
          'Eine Feststellung landet meist an einer von drei Stellen im Anteilskaufvertrag (SPA): im Preis, in einer Freistellung für ein bekanntes Risiko oder in der Offenlegung gegenüber den Garantien. Unter einer W&I-Versicherung sind Risiken, die der Käufer vor dem Signing kannte, in der Regel von der Deckung ausgenommen.',
          'Ein Grund mehr, die Feststellungen früh und mit ihrer Quelle zu haben: Ihr Anwalt kann dann je Feststellung entscheiden, wohin sie gehört. Vor dem bindenden Angebot ist der [Red-Flag-Review](/red-flag-review) die kürzere Fassung derselben Lektüre.'
        ]
      }
    ],
    faq: {
      heading: 'Häufige Fragen',
      items: [
        {
          q: 'Gilt diese Seite auch für Targets außerhalb der Niederlande?',
          a: 'Nein. Sie behandelt Targets nach niederländischem Recht, vor allem die BV. Die finanzielle, kommerzielle und operative Analyse von Factum funktioniert in jeder Rechtsordnung; Recht und Steuern sind auf niederländisches Recht abgestimmt, lassen Sie diese Feststellungen bei einem Target anderswo also von lokalen Anwälten prüfen.'
        },
        {
          q: 'Ist das Rechtsberatung?',
          a: 'Nein. Die Seite beschreibt, was ein Käufer im Data Room einer niederländischen BV üblicherweise prüft. Jeder Deal ist anders; lassen Sie das konkrete Target von Ihrem eigenen Anwalt und Steuerberater beurteilen.'
        },
        {
          q: 'Ersetzt Factum die Financial Due Diligence des Wirtschaftsprüfers?',
          a: 'Nein. Eine FDD ist ein unterzeichneter Bericht aus einem eigenen Mandat, auf den sich eine Bank oder ein Versicherer stützen kann. Factum gibt keine Assurance. Es liest den ganzen Data Room über {disciplines} Disziplinen neben der FDD, und Ihr eigener Prüfer gibt die Feststellungen frei.'
        },
        {
          q: 'Sieht Factum, was im Data Room fehlt?',
          a: 'Ja, als eigene Liste dessen, was ein Käufer erwarten würde und nicht gefunden hat. Jeder Punkt geht zuerst an Ihren Prüfer, weil ein Dokument, das in einer anderen Datei liegt, als fehlend erscheinen kann.'
        },
        {
          q: 'Wo werden die Dokumente verarbeitet?',
          a: 'Standardmäßig auf EU-Endpunkten, ohne Speicherung beim Modellanbieter und mit Pseudonymisierung vor der Analyse. Recht, Finanzen und Steuern laufen verpflichtend auf Endpunkten ohne Speicherung.'
        }
      ]
    },
    helps: {
      heading: 'Wo Factum beim Kauf einer niederländischen BV passt',
      bullets: [
        'Jedes Dokument im Data Room gelesen, jede Feststellung mit Quelldokument und Fundstelle.',
        '{disciplines} Disziplinen in einem Durchlauf: {modules} Module in {waves} Wellen, wobei Finanzen die rechtlichen Feststellungen liest und Steuern beide.',
        'Recht und Steuern auf niederländisches Recht abgestimmt.',
        'Ihr Prüfer gibt in der Plattform frei. Kein Export ohne diese Freigabe.'
      ],
      note: 'Factum steht vor dem Launch: Es gibt noch keinen öffentlichen Kunden und keine Fallstudie. Mehr zu [Factum für Käufer](/diligence-sprint) und [wie Ihre Dokumente behandelt werden](/governance). Vor dem Signing: [Red-Flag-Review eines Data Rooms](/red-flag-review). Bei der Wahl eines Tools: [zehn Fragen an einen Anbieter für KI-Due-Diligence](/ai-due-diligence-vendor-questions).'
    },
    datePublished: '2026-11-12'
  },
  'red-flag-review': {
    metaTitle: 'Red-Flag-Review eines Data Rooms vor dem Signing',
    metaDescription:
      'Was ein Red-Flag-Review ist, welche Red Flags einen Deal entscheiden, je Disziplin, was der Bericht enthalten muss und wo er scheitert. Für Käufer, vor dem Signing.',
    shortName: 'Red-Flag-Review eines Data Rooms',
    h1: 'Red-Flag-Review: was prüft ein Käufer im Data Room vor dem Signing?',
    answer:
      'Ein Red-Flag-Review liest den Data Room auf die Punkte, die den Deal stoppen oder den Preis verschieben können, und berichtet nur diese. Er ist schmaler als eine vollständige Due Diligence und kommt früher: vor dem bindenden Angebot oder dem Signing, solange noch Zeit ist auszusteigen, nachzuverhandeln oder eine Freistellung zu verlangen. Ein brauchbarer Red-Flag-Bericht nennt je Punkt den Schweregrad und das Dokument und die Fundstelle, aus denen er stammt.',
    sections: [
      {
        heading: 'Was ist ein Red-Flag-Review, und wie unterscheidet er sich von einer vollständigen Due Diligence?',
        paragraphs: [
          'Eine vollständige Due Diligence beschreibt das Target: die Zahlen, die Verträge, die Menschen und die Steuerposition, in einem Bericht je Disziplin. Ein Red-Flag-Review stellt denselben Dokumenten eine Frage: Was hier kann den Deal platzen lassen oder ändern, was wir zahlen? Alles andere bleibt aus dem Bericht.',
          'Die Lektüre wird dadurch nicht leichter. Um die eine Klausel zu finden, auf die es ankommt, muss jeder Vertrag gelesen werden. Kürzer wird der Bericht.'
        ]
      },
      {
        heading: 'Welche Red Flags entscheiden einen Deal?',
        bullets: [
          'Recht: Change-of-Control- und Kündigungsrechte in den Verträgen, die den Umsatz tragen, Streitigkeiten, Garantien für Dritte, Lücken im Rechtstitel an den Anteilen.',
          'Kommerziell: Kundenkonzentration, Verträge, die kurz nach dem Closing enden oder neu bepreist werden, Kundenabwanderung, die der Pitch nicht zeigt.',
          'Finanzen: EBITDA-Bereinigungen, die die Dokumente nicht stützen, Working Capital, das zum Jahresende schwankt, Schulden und schuldähnliche Posten außerhalb der Nettoverschuldung.',
          'Steuern: offene Bescheide, Positionen ohne Ruling, Verpflichtungen aus einer steuerlichen Einheit, die das Target verlässt.',
          'HR: Schlüsselpersonen ohne Vertrag oder Wettbewerbsverbot, Boni, die bei einem Verkauf fällig werden, Pensionsverpflichtungen, die nicht in der Bilanz stehen.',
          'Operativ und KI: einzelne Lieferanten, Lizenzen, die nicht mitgehen, Modelle oder Daten, von denen das Unternehmen abhängt und die ihm nicht gehören.'
        ],
        after: [
          'Welcher Punkt wesentlich ist, hängt von Ihrem Preis, Ihrer Struktur und Ihrer Risikobereitschaft ab. Nichts davon steht im Data Room.'
        ]
      },
      {
        heading: 'Was gehört in einen Red-Flag-Bericht?',
        paragraphs: [
          'Je Punkt: was es ist, wie schwer es wiegt, die belegende Passage im Wortlaut, und das Dokument und die Fundstelle. Danach die Liste dessen, was nie eingegangen ist. Eine Feststellung ohne Quelle ist eine Feststellung, die Ihr Prüfer neu machen muss.',
          'Jede Feststellung von Factum hat dieselben sechs Felder: Modul, Feststellung, wörtliches Zitat, Schweregrad, Quelle und Fundstelle, und menschliche Prüfung.'
        ]
      },
      {
        heading: 'Wo scheitert ein Red-Flag-Review?',
        bullets: [
          'Es wurde nur eine Stichprobe gelesen, und die entscheidende Klausel steht in dem Vertrag, den niemand geöffnet hat.',
          'Niemand hat geprüft, was fehlt, und die Red Flag ist das Dokument, das nie hochgeladen wurde.',
          'Die Disziplinen wurden getrennt gelesen. Ein Vertrag, der nächstes Jahr endet, ist zugleich ein rechtlicher Punkt und ein Umsatzpunkt, und nur ein Bericht hat ihn bemerkt.',
          'Die Feststellungen kommen ohne Quelle, sodass das Team ein echtes Problem nicht von einem Lesefehler unterscheiden kann.'
        ]
      },
      {
        heading: 'Wie lange dauert es?',
        paragraphs: [
          'Das hängt von Umfang und Zustand des Data Rooms ab und davon, wie schnell der Verkäufer antwortet. Wohin die Tage gehen und wo sie zu gewinnen sind, steht unter [wie lange Due Diligence dauert](/due-diligence-timeline).'
        ]
      },
      {
        heading: 'Wie führt Factum einen Red-Flag-Review durch?',
        paragraphs: [
          'Ihr Team lädt den Data Room hoch. {modules} Module lesen ihn in {waves} Wellen, in fester Reihenfolge: zuerst Kommerziell, HR, Operativ und KI, dann Recht, dann Finanzen, das die rechtlichen Feststellungen liest, dann Steuern, Deal Economics und Bewertung. Jede Feststellung zitiert ihre Quelle. {blocks} harte Blockaden stoppen einen Entwurf und legen ihn Ihrem Prüfer vor, nicht freigegeben.',
          'Ihr Prüfer entscheidet, was für diesen Deal eine Red Flag ist, und gibt frei; kein Export verlässt die Plattform ohne diese Freigabe. Mehr auf [der Plattformseite](/platform) und zum Unterschied zu KI in einem virtuellen Data Room unter [KI-Due-Diligence vs. KI im Data Room](/ai-due-diligence-vs-data-room-ai).'
        ]
      }
    ],
    faq: {
      heading: 'Häufige Fragen',
      items: [
        {
          q: 'Kann KI einen Red-Flag-Review allein durchführen?',
          a: 'Sie kann die Lektüre übernehmen: jedes Dokument und jede Klausel, gegeneinander abgeglichen, mit Quellen. Sie kann nicht entscheiden, was für Ihren Deal wesentlich ist. Deshalb ist die menschliche Prüfung verpflichtend: Ihr Prüfer gibt frei, bevor etwas die Plattform verlässt.'
        },
        {
          q: 'Wer unterzeichnet den Red-Flag-Bericht?',
          a: 'Ihr eigener Prüfer, für den eigenen Gebrauch. Factum unterschreibt nichts und gibt keine Assurance. Braucht eine Bank oder ein Versicherer einen unterzeichneten Bericht, beauftragen Sie einen Berater; Factum kann daneben laufen.'
        },
        {
          q: 'Reicht ein Red-Flag-Review vor dem Signing?',
          a: 'Bei manchen Deals ist er der erste Schritt, und die vollständige Due Diligence folgt; bei anderen ist er das, was der Zeitplan zulässt. Ihre Berater und Ihr Prüfer entscheiden. Factum liest in beiden Fällen den ganzen Data Room.'
        },
        {
          q: 'Funktioniert es für ein Target außerhalb der Niederlande?',
          a: 'Die finanzielle, kommerzielle und operative Analyse funktioniert in jeder Rechtsordnung. Recht und Steuern sind auf niederländisches Recht abgestimmt; lassen Sie diese Feststellungen bei einem Target anderswo von lokalen Anwälten prüfen.'
        },
        {
          q: 'Können wir es vor einem laufenden Deal testen?',
          a: 'Ja. Ein Deal, den Sie letztes Jahr abgeschlossen haben, eignet sich als Test: Nichts aus einem laufenden Prozess liegt offen, und Sie können die Feststellungen mit dem vergleichen, was Ihr Team damals gefunden hat. Factum steht vor dem Launch, der erste echte Bericht, den Sie sehen, ist also Ihr eigener.'
        }
      ]
    },
    helps: {
      heading: 'Wo Factum passt',
      bullets: [
        'Für Private Equity und andere Käufer, vor dem bindenden Angebot oder dem Signing.',
        'Jedes Dokument im Data Room gelesen, jede Feststellung mit Quelldokument und Fundstelle.',
        'Eine Liste dessen, was der Verkäufer nie hochgeladen hat, ab dem ersten Durchlauf.',
        'Ihr Prüfer gibt in der Plattform frei.'
      ],
      note: 'Factum steht vor dem Launch: Es gibt noch keinen öffentlichen Kunden und keine Fallstudie. Recht und Steuern sind auf niederländisches Recht abgestimmt. Kaufen Sie eine niederländische BV? Siehe [Due Diligence bei einer niederländischen BV](/dutch-bv-due-diligence). Sie wählen ein Tool? [Zehn Fragen an einen Anbieter für KI-Due-Diligence](/ai-due-diligence-vendor-questions), und [wie Ihre Dokumente behandelt werden](/governance).'
    },
    datePublished: '2026-11-12'
  },
  /* Käuferleitfaden, offener Lead-Magnet (GTM/ops/geo-seo-audit-2026-11-12.md, Asset 4). */
  'ai-due-diligence-vendor-questions': {
    metaTitle: 'Anbieter für KI-Due-Diligence prüfen: 10 Fragen',
    metaDescription:
      'Zehn Fragen an jeden Anbieter von KI-gestützter Due Diligence, bevor der Data Room hochgeladen wird: Verarbeitung, Speicherung, NDA, Quellen, Lücken, Freigabe.',
    shortName: 'Zehn Fragen an einen Anbieter für KI-Due-Diligence',
    h1: 'Wie prüfen Sie einen Anbieter für KI-gestützte Due Diligence? 10 Fragen',
    answer:
      'Fragen Sie, bevor der Data Room hochgeladen wird. Zehn Fragen decken ab, was ein Käufer wissen muss: wo die Dokumente verarbeitet werden, wer sie speichert, ob das NDA es erlaubt, wie jede Feststellung belegt ist, was das Tool nicht gelesen hat, was fehlt, welches Recht es kennt, wer freigibt, was es zur Genauigkeit behauptet und wovon der Preis abhängt. Lassen Sie sich jede Antwort schriftlich geben. Die Liste gilt für jeden Anbieter, auch für uns.',
    sections: [
      {
        heading: '1. Wo werden unsere Dokumente verarbeitet?',
        paragraphs: [
          'Dokumente aus dem Data Room sind unter dem NDA vertraulich und enthalten oft personenbezogene Daten im Sinne der DSGVO. Fragen Sie, welche Modellanbieter sie verarbeiten, in welcher Region, und ob diese Region Standard ist oder eine Option, die Sie selbst einschalten müssen.',
          'Eine gute Antwort nennt die Anbieter und die Region und steht im Auftragsverarbeitungsvertrag.'
        ]
      },
      {
        heading: '2. Speichert jemand unsere Dokumente oder trainiert damit?',
        paragraphs: [
          'Zwei getrennte Fragen. Speichert der Modellanbieter Prompts und Dokumente, und wie lange? Nutzt der Anbieter oder der Modellanbieter sie, um ein Modell zu trainieren?',
          'Eine gute Antwort nennt die Speicherdauer je Anbieter, schließt Training aus und hält beides im Vertrag fest.'
        ]
      },
      {
        heading: '3. Erlaubt unser NDA das?',
        paragraphs: [
          'Die meisten M&A-NDAs erlauben die Weitergabe nur an benannte Representatives: Mitarbeiter, Berater, Finanzierer. Eine Softwareplattform und ihre Unterauftragsverarbeiter stehen selten auf dieser Liste. Lassen Sie das vor dem ersten Upload von Ihrem Anwalt prüfen.',
          'Eine gute Antwort: Der Anbieter unterzeichnet ein NDA, bevor ein Dokument bewegt wird, und nennt seine Unterauftragsverarbeiter.'
        ]
      },
      {
        heading: '4. Auf welcher Ebene nennt jede Feststellung ihre Quelle?',
        paragraphs: [
          'Dokument, Seite oder die Passage selbst. Eine Feststellung, die Ihr Prüfer nicht zurückverfolgen kann, muss er neu erarbeiten. Nicht jede Feststellung hat eine zitierbare Passage: Eine Berechnung über eine Tabelle verweist auf das Blatt oder die Zellen, die sie verwendet hat.',
          'Eine gute Antwort: Jede Feststellung nennt Quelldokument und Fundstelle, mit der belegenden Passage, wo es eine gibt.'
        ]
      },
      {
        heading: '5. Liest es jedes Dokument oder eine Stichprobe?',
        paragraphs: [
          'Manche Tools beantworten Fragen, indem sie die Passagen abrufen, die relevant aussehen. Das ist Suche, und die entscheidende Klausel kann in einem Dokument stehen, das nie geöffnet wurde. Fragen Sie, welcher Teil des Data Rooms gelesen wurde und was mit einer Datei geschieht, die nicht lesbar war: ein Scan, ein gesperrtes PDF, ein defekter Export.',
          'Eine gute Antwort: Jedes Dokument wird gelesen, und was nicht lesbar war, steht auf einer Liste.'
        ]
      },
      {
        heading: '6. Sagt es uns, was fehlt?',
        paragraphs: [
          'Ein fehlendes Dokument hinterlässt keine Passage, die man zitieren könnte. Ein Tool, das nur liest, was da ist, meldet es also nie. Die Red Flag ist oft der Vertrag, den niemand hochgeladen hat.',
          'Eine gute Antwort: eine eigene Liste dessen, was ein Käufer erwarten würde und nicht gefunden hat, von einem Menschen geprüft.'
        ]
      },
      {
        heading: '7. Welche Disziplinen, und welches Recht?',
        paragraphs: [
          'Finanzen, Commercial und Operations funktionieren über Grenzen hinweg. Recht und Steuern hängen vom Recht des Targets ab. Fragen Sie, welche Disziplinen in einem Durchlauf enthalten sind, ob sie die Feststellungen der anderen lesen und für welche Rechtsordnungen die rechtliche und steuerliche Analyse gebaut ist.',
          'Eine gute Antwort nennt die Rechtsordnungen und sagt offen, wo Sie lokale Berater brauchen.'
        ]
      },
      {
        heading: '8. Wer gibt die Feststellungen frei?',
        paragraphs: [
          'KI-Ergebnisse sind ein Entwurf, bis ein Mensch sie annimmt. Fragen Sie, ob etwas ohne Freigabe durch eine benannte Person exportiert werden kann, ob der Anbieter irgendeine Gewähr gibt und ob eine Bank oder ein W&I-Versicherer sich auf das Ergebnis stützen kann.',
          'Eine gute Antwort nennt die menschliche Freigabe und ist klar zur Reliance. Die meisten Plattformen geben keine Gewähr; das ist in Ordnung, solange sie es sagen.'
        ]
      },
      {
        heading: '9. Was behauptet der Anbieter zur Genauigkeit, und wer hat sie gemessen?',
        paragraphs: [
          'Ein Prozentsatz ohne Methode ist eine Marketingzahl. Fragen Sie, auf welchem Datensatz gemessen wurde, von wem, und ob jemand außerhalb des Anbieters es geprüft hat.',
          'Eine gute Antwort nennt Methode, Datensatz und Prüfer, oder sagt offen, dass es keine geprüfte Quote gibt.'
        ]
      },
      {
        heading: '10. Was kostet es, und wovon hängt der Preis ab?',
        paragraphs: [
          'Pro Nutzer, pro Dokument, pro Seite oder pro Deal: Das Modell bestimmt, was ein großer oder unordentlicher Data Room Sie kostet. Fragen Sie, was enthalten ist, was extra kostet und was passiert, wenn der Data Room während des Prozesses wächst.',
          'Eine gute Antwort ist ein Preis für einen vereinbarten Umfang, schriftlich, bevor der Data Room hochgeladen wird.'
        ]
      },
      {
        heading: 'Wie beantwortet Factum die zehn?',
        paragraphs: ['Kurz, und mit den Lücken.'],
        steps: [
          'Standardmäßig auf EU-Endpunkten, unter einem Auftragsverarbeitungsvertrag.',
          'Keine Speicherung beim Modellanbieter, der auch nicht mit Ihren Dokumenten trainiert. Pseudonymisierung vor der Analyse. Rechtliche, finanzielle und steuerliche Analyse läuft verpflichtend auf Endpunkten ohne Speicherung.',
          'Zuerst das NDA. Dokumente bewegen sich erst nach der Unterzeichnung.',
          'Jede Feststellung nennt Quelldokument und Fundstelle, mit der belegenden Passage, wo es eine gibt.',
          'Jedes Dokument im Data Room wird gelesen, von {modules} Modulen in {waves} Wellen.',
          'Eine Liste dessen, was nie eingegangen ist, ab dem ersten Durchlauf.',
          '{disciplines} Disziplinen in einem Durchlauf. Recht und Steuern sind auf niederländisches Recht abgestimmt; bei einem Target anderswo sollten lokale Berater diese Feststellungen prüfen.',
          'Ihr eigener Prüfer gibt frei. Kein Export verlässt die Plattform ohne diese Freigabe. Factum unterzeichnet nichts und gibt keine Gewähr.',
          'Keine geprüfte Genauigkeitsquote. Factum steht vor dem Launch.',
          'Preis auf Anfrage: ein Preis für den gesamten Umfang, abgestimmt auf Größe und Zustand des Data Rooms.'
        ],
        after: [
          'Mehr dazu, [wie Ihre Dokumente behandelt werden](/governance) und [was KI in der Due Diligence nicht kann](/limits-of-ai).'
        ]
      }
    ],
    faq: {
      heading: 'Häufige Fragen',
      items: [
        {
          q: 'Gelten diese Fragen auch für einen virtuellen Data Room mit KI-Funktionen?',
          a: 'Ja. Die Fragen 1 bis 3 und 8 bis 10 gelten für jedes Tool, das die Dokumente berührt. Die Fragen 4 bis 6 wiegen am schwersten bei einem Tool, das behauptet, die Due-Diligence-Lektüre selbst zu leisten.'
        },
        {
          q: 'Welche Frage ist die wichtigste?',
          a: 'Frage 3 kommt zeitlich zuerst: Erlaubt das NDA den Upload nicht, spielt der Rest keine Rolle. Danach Frage 8. Wer freigibt, trägt die Feststellungen.'
        },
        {
          q: 'Wie testen wir die Antworten eines Anbieters?',
          a: 'Lassen Sie ihn einen Deal lesen, den Sie letztes Jahr abgeschlossen haben. Nichts Laufendes wird offengelegt, und Sie können die Feststellungen mit dem vergleichen, was Ihr Team damals gefunden hat.'
        },
        {
          q: 'Ersetzt KI-gestützte Due Diligence unsere Berater?',
          a: 'Nein. Sie liest den ganzen Data Room und zeigt den Spezialisten, wo sie hinschauen sollten. Die Financial Due Diligence des Wirtschaftsprüfers und die Legal Due Diligence Ihres Anwalts bleiben, was sie sind, und Ihr eigener Prüfer entscheidet, was zählt.'
        }
      ]
    },
    helps: {
      heading: 'Wo Factum passt',
      bullets: [
        'Für Private Equity und andere Käufer, vor dem bindenden Angebot oder dem Signing.',
        'Jedes Dokument im Data Room gelesen, jede Feststellung mit Quelldokument und Fundstelle.',
        'Eine Liste dessen, was der Verkäufer nie hochgeladen hat.',
        'Ihr Prüfer gibt in der Plattform frei.'
      ],
      note: 'Factum steht vor dem Launch: Es gibt noch keinen öffentlichen Kunden und keine Fallstudie. Der Unterschied zur KI in einem virtuellen Data Room: [KI-Due-Diligence vs. Data-Room-KI](/ai-due-diligence-vs-data-room-ai). Vor dem Signing: [Red-Flag-Review eines Data Rooms](/red-flag-review). Beim Kauf einer niederländischen BV: [Due Diligence bei einer niederländischen BV](/dutch-bv-due-diligence).'
    },
    datePublished: '2026-11-12'
  }
};
