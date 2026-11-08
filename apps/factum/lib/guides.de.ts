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
  guidesLabel: 'Ratgeber'
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
      note: 'Die Funktionen von Data Rooms unterscheiden sich je Anbieter und ändern sich oft. Fragen Sie Ihren Anbieter, was er bietet.'
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
      note: 'Factum steht vor dem Launch: Es gibt noch keinen öffentlichen Kunden und keine Fallstudie. Recht und Steuern sind auf niederländisches Recht abgestimmt.'
    },
    datePublished: '2026-11-08'
  }
};
