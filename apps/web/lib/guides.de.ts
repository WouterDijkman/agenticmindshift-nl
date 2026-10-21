import type { Guide, GuideChrome } from './guides';
import type { GuideSlug } from './guideRoutes';

/**
 * German copy for the three problem pages, translated from the Dutch entry
 * in lib/guides.ts (English used as a cross-check). Terminology follows
 * messages/de.json: formal "Sie", "Workflow", "Arbeitsweise" for /werkwijze,
 * "Haus" for the firm. The rules in the header comment of lib/guides.ts
 * apply unchanged; where the source says AVG, this says DSGVO. Not wired up
 * yet: GUIDE_LOCALES is still ['nl', 'en'].
 */

const PUBLISHED = '2026-10-12';

export const CHROME_DE: GuideChrome = {
  tocLabel: 'Auf dieser Seite',
  relatedEyebrow: 'Weiterlesen',
  werkwijzeLink: 'Wie ein Mandat abläuft',
  overLink: 'Über Wouter Dijkman',
  moreEyebrow: 'Praxisfragen',
  moreHeading: 'Drei Praxisfragen zu KI in der Dealarbeit',
  readMore: 'Mehr lesen',
};

export const GUIDES_DE: Record<GuideSlug, Guide> = {
  /* ─────────────────────────────────────────────────────────────────────
     (a) One way of working for IMs and teasers
     ───────────────────────────────────────────────────────────────────── */
  'im-en-teasers': {
    metaTitle: 'Ein KI-Workflow für IMs und Teaser',
    metaDescription:
      'Junioren, die ChatGPT und Claude jeweils auf eigene Weise für IMs und Teaser nutzen? So sieht ein fester Workflow aus, mit Kontrolle durch das Team.',
    shortName: 'IMs und Teaser',
    teaser: 'Ein fester Workflow für das ganze Team, mit getesteten Rechenschritten und einer Kontrolle am Ende.',
    eyebrow: 'Corporate Finance · IMs und Teaser',
    bgChar: 'IM',
    h1: 'Ein KI-Workflow für IMs und Teaser, für das ganze Team',
    answer:
      'Wenn jeder Junior ChatGPT oder Claude auf seine eigene Weise nutzt, unterscheidet sich jedes IM in Aufbau, Ton und Verlässlichkeit. Was funktioniert, ist ein eingerichteter Workflow, den das ganze Team nutzt: feste Schritte, Berechnungen als getesteter Schritt und eine Kontrolle durch das Team am Ende. Was gebaut wird, gehört Ihnen.',
    sections: [
      {
        heading: 'Was geht schief, wenn jeder seine eigene KI nutzt?',
        bullets: [
          'Jeder Junior hat eigene Prompts und Einstellungen. Zwei IMs desselben Hauses lesen sich wie die Arbeit von zwei Häusern.',
          'Niemand weiß, welcher Text oder welche Tabelle aus welchem Modell kam.',
          'Was eine Person herausgefunden hat, bleibt in ihrem Chatverlauf liegen.',
          'Zahlen werden in einem Chatfenster „berechnet“, ohne dass jemand die Berechnung sieht.',
        ],
      },
      {
        heading: 'Wie sieht ein fester Workflow aus?',
        paragraphs: [
          'Ein Workflow ist eine feste Abfolge von Schritten für wiederkehrende Arbeit. Für ein IM oder einen Teaser sieht das so aus:',
        ],
        steps: [
          'Die Unterlagen des Verkäufers kommen in einen festen Ordner, in einer festen Form.',
          'Jedes Dokument hat eine feste Vorlage, in Aufbau und Ton des Hauses.',
          'Das Modell schreibt je Kapitel einen ersten Entwurf auf Basis der Quelldokumente.',
          'Tabellen und Kennzahlen kommen aus einem getesteten Rechenschritt.',
          'Das Team liest, korrigiert und gibt frei, bevor etwas nach außen geht.',
        ],
        after: [
          'Alle arbeiten mit denselben Schritten. Ein neuer Junior muss nichts selbst erfinden, und ein IM vom letzten Jahr lässt sich nachvollziehen.',
        ],
      },
      {
        heading: 'Warum sind die Berechnungen ein eigener Schritt?',
        paragraphs: [
          'Ein Sprachmodell rechnet nicht selbst. Es schreibt Code, der rechnet, oder es schätzt. Je stärker ein Unternehmen in seinen Bilanzierungsgrundsätzen abweicht, desto größer ist das Fehlerrisiko.',
          'Deshalb bauen wir Berechnungen als feste Schritte:',
        ],
        bullets: [
          'jedes Mal dieselbe Formel für Normalisierungen und Kennzahlen;',
          'getestet, bevor das Team sich darauf verlässt;',
          'jede Zahl im IM lässt sich auf die Quelle zurückführen.',
        ],
      },
      {
        heading: 'Wer kontrolliert das Ergebnis?',
        paragraphs: [
          'Das Team. Jeder Workflow endet mit einer Kontrolle durch jemanden aus dem Haus. Das Modell liefert den ersten Entwurf; Urteil und Freigabe bleiben bei Ihnen.',
        ],
      },
      {
        heading: 'Wem gehört, was gebaut wird?',
        paragraphs: [
          'Ihnen. Der Workflow läuft in Ihrer eigenen Umgebung und zieht mit um, wenn Sie zu einem anderen Anbieter von KI-Modellen wechseln. Sie sind weder an uns noch an ein einzelnes Modell gebunden. Das halten wir in der Auftragsbestätigung fest.',
        ],
      },
      {
        heading: 'Was lässt sich noch als fester Workflow abbilden?',
        paragraphs: [
          'Ein Beispiel aus meiner eigenen Arbeit: ein zweiseitiges Unternehmensprofil, ausgehend allein von einem Firmennamen.',
        ],
        bullets: [
          'Website, Eigentümer und Struktur aus Company.info;',
          'Wettbewerber aus Gain.pro;',
          'ein Nachrichtencheck, damit Sie einen bereits angekündigten Verkauf nicht übersehen.',
        ],
        after: [
          'Die Analyse liegt bereit, das Urteil bleibt beim Team. Was ein halber bis ganzer Arbeitstag war, wird zu Kontrolle und Feinschliff.',
        ],
      },
      {
        heading: 'Müssen Sie dafür einen KI-Spezialisten einstellen?',
        paragraphs: [
          'Für eine Boutique meist nicht. Der Gewinn liegt in einigen gut eingerichteten Arbeitsabläufen, die das ganze Team jeden Tag nutzt. Dafür braucht es keine zusätzliche Stelle.',
        ],
      },
      {
        heading: 'Wo fangen Sie an?',
        paragraphs: [
          'Erfassen Sie die Arbeit vom Mandat bis zum Closing. Prüfen Sie für jeden Schritt, was Zeit kostet, was jedes Mal wiederkehrt und wo Fehler entstehen. Beginnen Sie mit ein oder zwei Schritten, die häufig vorkommen, etwa dem Teaser oder dem ersten Entwurf des IM.',
          'Wie ein Mandat weiter abläuft, steht unter [Arbeitsweise](/werkwijze). Dürfen Sie Dealunterlagen überhaupt in ein solches Tool geben? Siehe [Dealunterlagen in ChatGPT](/dealstukken-en-ai).',
        ],
      },
    ],
    helps: {
      heading: 'Wie Agentic Mindshift hilft',
      bullets: [
        'Wir erfassen Ihren Prozess vom Mandat bis zum Closing und wählen gemeinsam den ersten Workflow.',
        'Wir richten ihn ein, mit getesteten Rechenschritten und einer Kontrolle durch Ihr Team als letztem Schritt.',
        'Wir schulen das Team, bis es selbstständig damit arbeitet.',
      ],
      note: 'Das erste Gespräch dauert zwanzig Minuten und ist unverbindlich.',
    },
    datePublished: PUBLISHED,
  },
  /* ─────────────────────────────────────────────────────────────────────
     (b) Monthly reporting of a PE portfolio company
     ───────────────────────────────────────────────────────────────────── */
  maandrapportage: {
    metaTitle: 'Monatsreporting im Portfolio mit KI',
    metaDescription:
      'KI bereitet das Monatsreview einer PE-Beteiligung vor: Abweichungsanalyse, forensische Checks und Fragen an CFO und CEO. Das Review bleibt beim Dealteam.',
    shortName: 'Monatsreporting',
    teaser: 'Abweichungsanalyse, forensische Checks und Fragen an CFO und CEO, bereit für das Review durch das Dealteam.',
    eyebrow: 'Private Equity · Portfoliomonitoring',
    bgChar: 'M',
    h1: 'KI im Monatsreporting einer PE-Beteiligung',
    answer:
      'KI kann das monatliche Review einer Beteiligung größtenteils vorbereiten: die Abweichungsanalyse, eine forensische Kontrolle, wie sie ein Wirtschaftsprüfer durchführt, und konkrete Fragen an CFO und CEO. Bei einem PE-Fonds, für den ich das eingerichtet habe, dauerte es von Hand drei bis vier Tage. Heute startet der Workflow morgens, und der Bericht liegt wenige Stunden später zur Prüfung bereit. Das Urteil bleibt beim Dealteam.',
    sections: [
      {
        heading: 'Was macht die KI in einem monatlichen Review?',
        bullets: [
          'Abweichungsanalyse: Ist gegen Budget, Vorjahr und Vormonat, die größten Abweichungen zuerst.',
          'Forensische Kontrolle: die Prüfungen, die ein Wirtschaftsprüfer vornehmen würde, etwa Margen, die sich verschieben, Working Capital, das steigt, und Kosten, die die Position wechseln.',
          'Fragen an das Management: zu jeder Abweichung eine konkrete Frage an CFO oder CEO, mit der Zahl dazu.',
        ],
      },
      {
        heading: 'Wie sieht der Workflow aus?',
        steps: [
          'Die Beteiligung liefert die Monatszahlen in einem festen Format.',
          'Der Workflow startet morgens und führt Analyse und Kontrollen als feste Schritte aus.',
          'Berechnungen laufen über getestete Rechenschritte. Das Sprachmodell schreibt die Erläuterung und die Fragen.',
          'Wenige Stunden später liegt der Bericht zur Prüfung bereit.',
          'Das Dealteam liest, passt an und schickt die Fragen an das Management.',
        ],
      },
      {
        heading: 'Warum nicht einfach die Zahlen in ChatGPT einfügen?',
        paragraphs: [
          'Ein Sprachmodell rechnet nicht selbst. Es schreibt Code oder es schätzt. Bei einem Monatspaket mit Dutzenden Zeilen geht das früher oder später schief, und niemand sieht, wo.',
          'Außerdem sollen jeden Monat dieselben Kontrollen laufen, in derselben Reihenfolge. Ein einzelner Chat merkt sich das nicht.',
          'Und Zahlen einer Beteiligung gehören nicht in ein persönliches Konto. Siehe [Dealunterlagen in ChatGPT](/dealstukken-en-ai).',
        ],
      },
      {
        heading: 'Wer beurteilt den Bericht?',
        paragraphs: [
          'Das Dealteam. Der Workflow bereitet vor; der Investment Manager beurteilt, wählt aus, welche Fragen an die Beteiligung gehen, und gibt frei. Das Review bleibt bei dem Team, das die Beteiligung kennt.',
        ],
      },
      {
        heading: 'Was bringt es außer Zeit?',
        bullets: [
          'Jede Beteiligung wird jeden Monat auf dieselbe Weise betrachtet.',
          'Abweichungen fallen in dem Monat auf, in dem sie entstehen.',
          'Die Fragen an das Management und die Antworten sind festgehalten, auch wenn jemand das Team verlässt.',
        ],
      },
      {
        heading: 'Wo fangen Sie an?',
        paragraphs: [
          'Mit einer Beteiligung und dem Bericht, den Sie heute schon erstellen. Wir halten die bisherigen Schritte schriftlich fest, bauen sie als festen Workflow nach und lassen diesen zuerst parallel zum manuellen Prozess laufen. Das Team steigt um, wenn die Ergebnisse stimmen.',
          'Wie ein solches Mandat abläuft, steht unter [Arbeitsweise](/werkwijze). Wer es baut, steht unter [Über Wouter](/over).',
        ],
      },
    ],
    helps: {
      heading: 'Wie Agentic Mindshift hilft',
      bullets: [
        'Wir halten Ihr bisheriges Monatsreview schriftlich fest und bestimmen, welche Kontrollen hineingehören.',
        'Wir bauen den Workflow, mit getesteten Rechenschritten und einem Review durch Ihr Team als letztem Schritt.',
        'Wir übergeben ihn, damit Ihr Team ihn selbst betreibt und anpasst.',
      ],
      note: 'Das erste Gespräch dauert zwanzig Minuten und ist unverbindlich.',
    },
    datePublished: PUBLISHED,
  },
  /* ─────────────────────────────────────────────────────────────────────
     (c) Deal documents in ChatGPT under an NDA and the GDPR
     ───────────────────────────────────────────────────────────────────── */
  'dealstukken-en-ai': {
    metaTitle: 'Dealunterlagen in ChatGPT: NDA und DSGVO',
    metaDescription:
      'Darf Ihr Dealteam Unterlagen aus dem Data Room in ChatGPT oder Claude geben? Was NDA, DSGVO und die Einstellungen des Anbieters verlangen. NL- und EU-Rahmen.',
    shortName: 'Dealunterlagen und KI',
    teaser: 'Was NDA, DSGVO und die Einstellungen des Anbieters verlangen, bevor Unterlagen in ein KI-Tool gehen.',
    eyebrow: 'NDA · DSGVO · Niederländischer und EU-Rahmen',
    bgChar: '§',
    h1: 'Dealunterlagen in ChatGPT: Was ist unter NDA und DSGVO erlaubt?',
    answer:
      'Es geht, wenn drei Dinge geregelt sind: Das NDA erlaubt die Weitergabe an den Anbieter, mit diesem Anbieter besteht ein Auftragsverarbeitungsvertrag, und die Einstellungen sorgen dafür, dass Ihre Unterlagen nicht für das Training verwendet werden. Ein persönliches oder kostenloses Konto erfüllt das in der Regel nicht. Dies ist der niederländische und europäische Rahmen (DSGVO), keine Rechtsberatung für Ihren konkreten Fall.',
    sections: [
      {
        heading: 'Was sagt das NDA?',
        bullets: [
          'Ein NDA beschränkt, wem Sie vertrauliche Informationen geben dürfen und wofür. Oft nur eigenen Mitarbeitenden und Beratern, die sie für die Transaktion benötigen.',
          'Ein KI-Anbieter ist ein Dritter. Ob Sie Unterlagen dort ablegen dürfen, hängt vom Wortlaut ab. Achten Sie auf die Definition von „Representatives“ oder Beratern und darauf, was zur Speicherung bei Dritten geregelt ist.',
          'Beachten Sie die Pflicht, Informationen nach Abschluss zurückzugeben oder zu vernichten. Sie gilt auch für das, was beim Anbieter liegt.',
          'Im Zweifel holen Sie eine Zustimmung ein oder nehmen den Punkt in die Verhandlung über das NDA auf.',
        ],
      },
      {
        heading: 'Enthält der Data Room personenbezogene Daten?',
        paragraphs: [
          'Fast immer: Arbeitsverträge, Gehaltslisten, Kundendaten, Korrespondenz. Dann gilt die DSGVO.',
        ],
        bullets: [
          'Wer über Zweck und Mittel der Verarbeitung entscheidet, ist Verantwortlicher. Ein KI-Anbieter, der nur auf Ihre Weisung verarbeitet, ist Auftragsverarbeiter.',
          'Mit einem Auftragsverarbeiter schließen Sie einen Auftragsverarbeitungsvertrag. Die Business-Tarife der großen Anbieter bieten ihn an; für persönliche Konten gibt es ihn meist nicht.',
          'Teilen Sie nur, was nötig ist. Für eine Zusammenfassung der Mietverträge muss keine Gehaltsliste mit.',
          'Gehen Daten aus der EU hinaus, braucht es eine Grundlage für die Übermittlung, etwa die Standardvertragsklauseln der Europäischen Kommission.',
          'Besondere Kategorien personenbezogener Daten, etwa Gesundheitsdaten in Unterlagen zu Fehlzeiten, verlangen zusätzliche Vorsicht.',
        ],
      },
      {
        heading: 'Welche Einstellungen beim Anbieter zählen?',
        bullets: [
          'Training: Ihre Eingaben dürfen nicht zum Trainieren von Modellen verwendet werden. Bei Business-Tarifen ist das meist der Standard; bei persönlichen Konten müssen Sie es oft selbst abschalten.',
          'Speicherdauer: Wie lange speichert der Anbieter Eingaben und Ausgaben, und können Sie das verkürzen?',
          'Region: Wählen Sie, wo möglich, Speicherung und Verarbeitung in der EU.',
          'Zugriff: Wer im Haus sieht welche Chats und Dateien, und was passiert, wenn jemand geht?',
          'Protokoll: Können Sie im Nachhinein sehen, welche Unterlagen geteilt wurden?',
        ],
      },
      {
        heading: 'Was muss ein Haus regeln?',
        steps: [
          'Ein Business-Konto für das Team, mit Auftragsverarbeitungsvertrag. Dealarbeit läuft nicht über persönliche Konten.',
          'Eine kurze interne Regel: welche Unterlagen hineindürfen, welche nicht, und wer im Zweifel entscheidet.',
          'Ein fester Satz in Ihren NDAs zur Nutzung von KI-Diensten mit angemessenen Garantien.',
          'Die Einstellungen festgehalten: Training aus, Speicherdauer bekannt, EU-Region, wo möglich.',
          'Ein fester Termin, an dem jemand prüft, ob es so bleibt.',
        ],
      },
      {
        heading: 'Ist das Rechtsberatung?',
        paragraphs: [
          'Nein. Dies ist der allgemeine niederländische und europäische Rahmen. Wouter Dijkman hat Rechtswissenschaften studiert. Jedes NDA und jeder Data Room ist anders. Lassen Sie im Zweifel den Text Ihres NDA und Ihres Auftragsverarbeitungsvertrags von Ihrem eigenen Anwalt prüfen.',
          'Möchten Sie KI danach wirklich in der Dealarbeit einsetzen? Siehe [IMs und Teaser](/im-en-teasers) und [Monatsreporting](/maandrapportage).',
        ],
      },
    ],
    helps: {
      heading: 'Wie Agentic Mindshift hilft',
      bullets: [
        'Wir wählen mit Ihnen eine KI-Umgebung für Unternehmen und stellen sie richtig ein.',
        'Wir formulieren eine kurze interne Regel für KI in der Dealarbeit.',
        'Wir richten die Workflows so ein, dass vertrauliche Unterlagen am richtigen Ort bleiben.',
      ],
      note: 'Das erste Gespräch dauert zwanzig Minuten und ist unverbindlich. Mehr zum Vorgehen unter [Arbeitsweise](/werkwijze).',
    },
    datePublished: PUBLISHED,
  },
};
