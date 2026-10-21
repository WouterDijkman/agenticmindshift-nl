import type { DemoCopy } from './demoData';

/** German copy for the /platform demo. Rules in demo.ts. */
export const DEMO_DE: DemoCopy = {
  chrome: {
    screenLabel: 'Factum-Prüfarbeitsplatz, konstruiertes Beispiel',
    badge: 'Konstruiertes Beispiel',
    back: 'Portfolio',
    dealNote: 'Fiktives Unternehmen · {docs} Dokumente im Data Room',
    stations: ['Dossier einrichten', 'Prüfen', 'Bericht an den Kunden'],
    waiting: '{n} Feststellungen warten auf Ihre Entscheidung',
    decidedAll: 'Jede Feststellung ist entschieden',
    railLabel: 'Disziplinen',
    domains: { financial: 'Finanzen', legal: 'Recht', tax: 'Steuern', commercial: 'Kommerziell' },
    railOpen: '{n} offen',
    railDone: 'entschieden',
    missingTab: 'Fehlende Dokumente',
    missingCount: '{n} fehlen',
    severity: { critical: 'Kritisch', high: 'Hoch', medium: 'Mittel' },
    counter: '{i} von {n}',
    prev: 'Vorherige Feststellung',
    next: 'Nächste Feststellung',
    fields: {
      module: 'Modul',
      finding: 'Feststellung',
      why: 'Warum eine Feststellung',
      observed: 'Festgestellt',
      standard: 'Maßstab',
      application: 'Anwendung',
      excerpt: 'Wörtliches Zitat',
      severity: 'Schweregrad',
      calc: 'Berechnung',
      source: 'Quelle und Fundstelle',
      review: 'Menschliche Prüfung'
    },
    excerptMarked: 'In der Quelle markiert, {loc}',
    excerptExact: 'Wortgleich aus dem Dokument',
    calcNote: 'Jeder Operand nennt seine Quelle.',
    review: {
      pending: 'Wartet auf Ihren Prüfer. Nichts geht vor der Freigabe an den Kunden.',
      approved: 'Von Ihrem Prüfer freigegeben.',
      adjusted: 'Von Ihrem Prüfer angepasst und freigegeben.',
      investigate: 'Zur Untersuchung gegeben: {route}.',
      rejected: 'Abgelehnt: {reason}.'
    },
    decisions: { approve: 'Freigeben', adjust: 'Anpassen', investigate: 'Untersuchen lassen', reject: 'Ablehnen' },
    demoNote: 'Nur eine Demo. Es wird nichts gespeichert.',
    rejectTitle: 'Warum ablehnen?',
    reasons: ['Von der Quelle nicht gedeckt', 'Nicht wesentlich', 'Doppelt', 'Außerhalb des Auftrags'],
    investigateTitle: 'Wie untersuchen lassen?',
    routes: ['Factum sucht weiter', 'Frage an den Verkäufer', 'In allen Dokumenten nachverfolgen'],
    adjustTitle: 'Feststellung anpassen',
    adjustSave: 'Anpassung speichern',
    cancel: 'Abbrechen',
    undo: 'Rückgängig',
    sourceLabel: 'Quelle',
    schematic: 'Schemaansicht',
    original: 'Originaldokument',
    pageOf: 'S. {n} von {total}',
    page: 'S. {n}',
    sheet: 'Blatt {s}',
    sourceHint: 'Die Feststellung stützt sich auf die markierte Passage. Prüfen Sie sie am Original.',
    docLanguage: 'Sprache des Dokuments: Deutsch',
    missingTitle: 'Fehlende Dokumente',
    missingLead: 'Was ein Käufer in diesem Data Room erwartet, abgeglichen mit dem Eingang.',
    received: 'Erhalten',
    missing: 'Fehlt',
    footnote:
      'Konstruiertes Beispiel. Die Halvoria Antriebstechnik GmbH und alle Namen, Dokumente und Zahlen hier sind erfunden. Zitate bleiben in der Sprache des Dokuments. Entscheidungen werden nicht gespeichert.'
  },
  findings: {
    'FIN-01': {
      title: 'EBITDA 2025 enthält einmalig 640.000 €',
      area: 'Finanzen · Ergebnisqualität',
      finding:
        'Das berichtete EBITDA 2025 von 3,22 Mio. € enthält die Auflösung einer Gewährleistungsrückstellung über 640.000 €. Das bereinigte EBITDA beträgt 2,58 Mio. €. Die Management Accounts zeigen keine Normalisierungen.',
      observed:
        'Der Anhang nennt die Auflösung von 640.000 € einen periodenfremden Ertrag [1]. Sie steckt in den sonstigen betrieblichen Erträgen von 720.000 € [2]. Die Management Accounts weisen null Normalisierungen aus [3]. Das IM meldet keine Sondereffekte [4].',
      standard:
        'Die Ergebnisqualität bereinigt das EBITDA um einmalige und periodenfremde Posten. Der SPA-Entwurf bewertet das Unternehmen mit 7,76 × EBITDA 2025 laut Management Accounts [5].',
      application:
        'Das bereinigte EBITDA beträgt 2,58 Mio. €, eine Marge von 10,5 % statt 13,1 % laut IM. Zum SPA-Multiplikator trägt die Auflösung rund 4,97 Mio. € Unternehmenswert.',
      calc: [
        ['EBITDA 2025, berichtet', 'Auflösung Gewährleistungsrückstellung', 'EBITDA bereinigt'],
        ['EBITDA bereinigt', 'Umsatz 2025', 'EBITDA-Marge bereinigt'],
        ['Auflösung Gewährleistungsrückstellung', 'SPA-Multiplikator', 'Getragener Unternehmenswert']
      ]
    },
    'FIN-02': {
      title: 'Covenant auf bereinigtem EBITDA verletzt: 3,14x statt 3,00x',
      area: 'Finanzen · Nettoverschuldung und Finanzierung',
      finding:
        'Auf bereinigtem EBITDA liegt der Verschuldungsgrad zum 31. Dezember 2025 bei 3,14x. § 14 des Kreditvertrags begrenzt ihn auf 3,00x. Die Compliance-Bescheinigung meldete 2,52x.',
      observed:
        'Die Compliance-Bescheinigung meldet 2,52 : 1 auf einem EBITDA von 3,22 Mio. € [4]. Dieses EBITDA enthält die periodenfremde Auflösung von 640.000 € [3]. Die Nettoverschuldung beträgt 8,1 Mio. €: 8,7 Mio. € Bankverbindlichkeiten abzüglich 0,6 Mio. € Kasse [2].',
      standard:
        '§ 14.1 begrenzt Nettofinanzverbindlichkeiten zu EBITDA auf 3,00 : 1. § 14.2 definiert das EBITDA ohne einmalige und periodenfremde Erträge [1]. Ein Verstoß erlaubt der Bank die Kündigung und Fälligstellung [5].',
      application:
        'Bereinigt liegt der Verschuldungsgrad bei 3,14x, über der Grenze. Ein Waiver liegt nicht im Data Room. § 18.2 (b) gibt der Bank ein zweites Kündigungsrecht beim Kontrollwechsel selbst [5].',
      calc: [
        ['Verbindlichkeiten gegenüber Kreditinstituten', 'Kasse', 'Nettoverschuldung'],
        ['Nettoverschuldung', 'EBITDA bereinigt', 'Verschuldungsgrad, bereinigt', 'Grenze nach § 14.1'],
        ['Nettoverschuldung', 'EBITDA laut Bescheinigung', 'Verschuldungsgrad laut Bescheinigung']
      ]
    },
    'LEG-01': {
      title: 'Größter Kunde kann beim Kontrollwechsel kündigen',
      area: 'Recht · Kontrollwechsel',
      finding:
        'Velmora, 28 % des Umsatzes 2025, darf den Rahmenvertrag nach dem Verkauf kündigen. Die Q&A-Antwort der Verkäuferin nennt nur die Bank.',
      observed:
        '§ 21 erlaubt Velmora die Kündigung binnen sechs Monaten nach der Anzeige, mit drei Monaten Frist und ohne Ersatz [1]. Auf Velmora entfielen 6,9 Mio. €, 28 % des Umsatzes 2025 [2]. Auf die Frage nach Kontrollwechselklauseln nannte die Verkäuferin nur die Bank [3].',
      standard:
        'Ein Recht, das der Deal selbst auslöst, gehört in den SPA: als Vollzugsbedingung, Freistellung oder Preisanpassung.',
      application:
        'Der SPA-Entwurf enthält nichts davon. Einzige Vollzugsbedingung ist die Freigabe durch das Bundeskartellamt [4]. Der Vertrag widerspricht der Q&A-Antwort.',
      calc: [['Umsatz Velmora 2025', 'Umsatz 2025', 'Anteil am Umsatz']]
    },
    'LEG-02': {
      title: 'Werksmiete endet Mitte 2027; Vermieter knüpft Zustimmung an neuen Vertrag',
      area: 'Recht · Immobilien',
      finding:
        'Der Mietvertrag des Werks Bamberg endet am 30. Juni 2027, ohne Verlängerungsoption. Der Anteilsverkauf braucht die vorherige schriftliche Zustimmung des Vermieters. Er erteilt sie nur bei zehn Jahren Verlängerung zu 890.000 € im Jahr.',
      observed:
        'Der Mietvertrag endet am 30. Juni 2027 ohne Verlängerungsoption [2]. Die Übertragung von mehr als 50 % der Anteile bedarf vorheriger schriftlicher Zustimmung. Ohne sie darf der Vermieter fristlos kündigen [1]. Sein Schreiben vom 2. September 2026 legt die Bedingungen für beides fest [3].',
      standard: 'Die Zustimmung muss vor dem Vollzug vorliegen. Das IM sagt, der Mietvertrag werde verlängert [6].',
      application:
        'Die Miete steigt von 684.000 € auf 890.000 € im Jahr [4], vor Indexierung. Die Genehmigung der Lackierstraße ist an diesen Standort gebunden. Ein Umzug braucht eine neue Genehmigung, erfahrungsgemäß 9 bis 14 Monate [5].',
      calc: [
        ['Geforderte Miete', 'Aktuelle Miete', 'Anstieg pro Jahr'],
        ['Anstieg pro Jahr', 'Geforderte Laufzeit (Jahre)', 'Anstieg über die Laufzeit']
      ]
    },
    'TAX-01': {
      title: 'Organschaft in der Prüfung, ohne Steuerfreistellung',
      area: 'Steuern · Organschaft',
      finding:
        'Die Gewinnabführung 2024 wurde erst am 15. Januar 2026 gezahlt. Eine Außenprüfung für 2022–2024 beginnt am 2. November 2026 und zielt auf die Organschaft. Der SPA-Entwurf sieht keine Freistellung vor, falls sie scheitert.',
      observed:
        'Das Vendor Tax Fact Book sagt, die Organschaft sei in allen Jahren durchgeführt worden. Danach vermerkt es die Zahlung der Abführung 2024 am 15. Januar 2026 [1]. Das Finanzamt prüft 2022–2024 ab dem 2. November 2026, mit der tatsächlichen Durchführung der Organschaft als Schwerpunkt [2].',
      standard:
        'Eine Organschaft trägt nur, wenn der Gewinnabführungsvertrag über die Mindestlaufzeit von fünf Jahren tatsächlich durchgeführt wird [3][6]. Der SPA-Entwurf kündigt den Vertrag zum Vollzug und schließt eine Freistellung für eine rückwirkende Nichtanerkennung aus [4].',
      application:
        'Der Vollzug ist für den 30. November 2026 geplant [5], einen Monat vor Ende der Mindestlaufzeit. Verwirft die Prüfung die Organschaft, kann die Zielgesellschaft für diese Jahre selbst besteuert werden. Nach diesem Entwurf trägt das der Käufer.'
    },
    'TAX-02': {
      title: 'Managementgebühr um 75 % erhöht, ohne Verrechnungspreisnachweis',
      area: 'Steuern · Verrechnungspreise',
      finding:
        'Die monatliche Gebühr an die Verkäuferin stieg von 20.000 € auf 35.000 €, ohne Leistungsdokumentation oder Verrechnungspreisanalyse. Die Außenprüfung zielt darauf. Der SPA-Entwurf lässt sie bis zum Vollzug als zulässiges Leakage laufen.',
      observed:
        'Die Vereinbarung sieht 35.000 € im Monat vor, bis 2024 20.000 €. Sie hält fest, dass keine Leistungsdokumentation oder Verrechnungspreisanalyse vorliegt [1]. Die Prüfungsanordnung nennt die Managementgebühren als Schwerpunkt [2].',
      standard:
        'Gebühren zwischen nahestehenden Parteien brauchen eine fremdübliche, dokumentierte Grundlage. Der SPA lässt Managementgebühren bis 35.000 € im Monat als Leakage zu [3].',
      application:
        'Ohne Dokumentation kann das Finanzamt einen Teil der Gebühr als verdeckte Gewinnausschüttung werten. Vom Locked-Box-Stichtag [4] bis zum geplanten Vollzug [5] fließen so bis zu 385.000 € ab.',
      calc: [
        ['Gebühr pro Monat, ab 2025', 'Gebühr pro Monat, bis 2024', 'Anstieg pro Monat', 'Monate', 'Anstieg pro Jahr'],
        ['Gebühr pro Monat', 'Monate von Locked Box bis Vollzug', 'Zulässiges Leakage bis Vollzug']
      ]
    },
    'COM-01': {
      title: 'Größter Kunde: jedes Jahr 3 % Preisminderung und sinkende Aufträge',
      area: 'Kommerziell · Kunden und Preise',
      finding:
        'Velmora, 28 % des Umsatzes, erhält ab 2026 jedes Jahr 3 % Preisminderung. Die Aufträge lagen in Q1 bis Q3 2026 um 4 %, 8 % und 12 % unter Vorjahr. Der Plan 2026 wächst trotzdem um 6,9 %.',
      observed:
        '§ 9.3 gewährt Velmora ab 1. Januar 2026 jährlich 3 % Minderung auf alle Teilepreise [1]. Die Quartalsberichte zeigen Velmora-Aufträge 4 % [5], 8 % [6] und 12 % [2] unter Vorjahr. Der Q3-Bericht nennt die Preisminderung und eine Verlagerung zu einem Zweitlieferanten [2].',
      standard:
        'Ein Plan ist belastbar, wenn er die vertraglichen Preise und den aktuellen Auftragseingang des größten Kunden abbildet.',
      application:
        'Bei Mengen von 2025 kostet allein die Preisminderung rund 207.000 € im Jahr [3]. Der Plan geht 2026 von 26,3 Mio. € Umsatz aus [4], 6,9 % über 2025 [7].',
      calc: [
        ['Umsatz Velmora 2025', 'Jährliche Preisminderung', 'Preiseffekt pro Jahr'],
        ['Umsatzplan 2026', 'Umsatz 2025', 'Geplanter Anstieg', 'Umsatz 2025', 'Geplantes Wachstum']
      ]
    },
    'COM-02': {
      title: 'Vier der fünf größten Kunden können mit sechs Monaten kündigen',
      area: 'Kommerziell · Vertragsbasis',
      finding:
        'Das IM nennt langfristige Rahmenverträge mit allen Top-5-Kunden. Vier davon sind mit sechs Monaten zum Jahresende kündbar. Zusammen tragen sie 8,1 Mio. €, 32,9 % des Umsatzes 2025.',
      observed:
        'Die Verträge mit Ortelia [1], Brisgau [2], Selvan [3] und Tremonia [4] sind unbefristet und mit sechs Monaten zum Jahresende kündbar. Das IM beschreibt langfristige Rahmenverträge mit allen Top-5-Kunden [5].',
      standard:
        'Umsatz gilt nur für die Zeit als vertraglich gesichert, in der ein Kunde gebunden ist. Die Kundenliste nennt den Umsatz je Kunde [6].',
      application:
        'Nur Velmora ist bis 2028 gebunden [8] und kann beim Kontrollwechsel kündigen. Die anderen vier tragen 8,1 Mio. € mit sechs Monaten Kündigungsfrist.',
      calc: [
        ['Ortelia', 'Brisgau', 'Selvan', 'Tremonia', 'Umsatz mit sechs Monaten Frist'],
        ['Umsatz mit sechs Monaten Frist', 'Umsatz 2025', 'Anteil am Umsatz']
      ]
    }
  },
  expected: [
    { label: 'Jahresabschlüsse 2024 und 2025 (HGB)' },
    { label: 'Management Accounts und Planung' },
    { label: 'Konsortialkreditvertrag, vollständige Fassung', note: 'Im Data Room liegt nur ein Auszug.' },
    { label: 'Waiver oder Bankkorrespondenz zu 2025', note: 'Nötig, um die Covenant-Feststellung zu schließen.' },
    { label: 'Kundenverträge, Top fünf' },
    { label: 'Mietvertrag und Korrespondenz mit dem Vermieter' },
    { label: 'Lizenzvertrag, Patent EP 3 412 118', note: 'Der Geschäftsführer hält das Patent persönlich.' },
    { label: 'Auftragsverarbeitungsvertrag, IT-Hosting', note: 'Dem Outsourcing-Vertrag nicht beigefügt.' },
    { label: 'SPA-Entwurf' },
    { label: 'Gewinnabführungsvertrag' },
    { label: 'Steuerbescheide 2022–2024' },
    { label: 'Verrechnungspreisdokumentation, Managementgebühr', note: 'Laut Vereinbarung liegt keine vor.' }
  ]
};
