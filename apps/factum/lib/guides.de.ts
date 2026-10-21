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
  }
};
