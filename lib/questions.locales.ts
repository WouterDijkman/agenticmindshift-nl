type LocaleQuestionData = {
  [questionId: string]: {
    text: string;
    options: { [letter: string]: string };
  };
};

export const questionTranslations: Record<string, LocaleQuestionData> = {
  nl: {
    Q1: {
      text: 'Hoe omschrijft u de analytische kwaliteit van uw huidige dossiers — bij een deal, een financieringsaanvraag of een portefeuillereview?',
      options: {
        A: 'We werken grotendeels op ervaring, zonder gestructureerde analytische aanpak',
        B: 'We gebruiken standaard Excel-modellen, maar zonder vaste methodologie of benchmark',
        C: 'We hebben een basisaanpak, maar de kwaliteit verschilt per dossier en per persoon',
        D: 'We hanteren een gestructureerde methodologie, maar nog niet volledig consistent',
        E: 'Onze aanpak is systematisch, reproduceerbaar en consistent over alle dossiers',
      },
    },
    Q2: {
      text: 'Wanneer u terugkijkt op recente dossiers — acquisities, financieringsaanvragen of portefeuillereviews — wat was het meest voorkomende knelpunt in de analytische voorbereiding?',
      options: {
        A: 'We hadden onvoldoende tijd of capaciteit om het goed voor te bereiden',
        B: 'Data was beschikbaar maar niet gestructureerd of vergelijkbaar',
        C: 'Er ontbrak een gedeelde methodologie — elk dossier werd anders aangepakt',
        D: 'De aanpak was goed maar te handmatig — te veel tijd aan consolidatie, te weinig aan analyse',
        E: 'Geen significant knelpunt — we waren tevreden over de voorbereiding',
      },
    },
    Q3: {
      text: 'Welk aandeel van uw analytische werkzaamheden — modelleren, vergelijken, samenvatten — zou een goed-ingericht AI-systeem vandaag al kunnen overnemen zonder kwaliteitsverlies?',
      options: {
        A: 'Vrijwel niets, het werk is te specifiek en contextueel',
        B: 'Minder dan 20%',
        C: '20 tot 40%',
        D: '40 tot 60%',
        E: 'Meer dan 60% — de meeste analytische routine is geautomatiseerd',
      },
    },
    Q4: {
      text: 'Welke situatie is voor u het meest relevant op dit moment?',
      options: {
        A: 'Wij bereiden een acquisitie voor — buy-side analyse en deal intelligence',
        B: 'Wij bereiden een financieringsaanvraag voor — onderbouwing voor bank of investeerder',
        C: 'Wij monitoren bestaande deelnemingen — portefeuille-intelligence en vroege signalering',
        D: 'Wij signaleren financiële tegenwind — eerste indicatie van stress bij een deelneming',
        E: 'Wij willen meer deals kunnen analyseren met minder capaciteit',
      },
    },
    Q5: {
      text: 'Hoe modelleert u AI-substitutierisico in de entry-multiple bij dienstverlenende targets?',
      options: {
        A: 'Niet, het zit impliciet in de algemene sectorrisico-opslag',
        B: 'Kwalitatieve vermelding in de IC-memo',
        C: 'Sensitivity-analyse op 10% marge-erosie, generiek',
        D: 'Sensitivity met specifieke aannames per functiegroep',
        E: "Volledig gemodelleerd, doorgerekend naar hold-period scenario's",
      },
    },
    Q6: {
      text: 'Hoeveel werkdagen verstrijken er gemiddeld tussen ontvangst van een Information Memorandum (of vergelijkbaar startdocument) en uw eerste gefundeerde oordeel?',
      options: {
        A: 'Meer dan 20 werkdagen',
        B: '15 tot 20 werkdagen',
        C: '10 tot 15 werkdagen',
        D: '5 tot 10 werkdagen',
        E: 'Minder dan 5 werkdagen',
      },
    },
    Q7: {
      text: 'Bij uw laatste drie analytische trajecten: hoe vaak heeft u de centrale aannames laten valideren door iemand die expliciet niet bij de voorbereiding betrokken was?',
      options: {
        A: 'Niet, het team draagt zelf de verantwoordelijkheid voor de aannames',
        B: 'Informeel, via een gesprek buiten het team',
        C: 'Eén keer, in één van de drie trajecten',
        D: 'Standaard, intern door iemand buiten het team',
        E: 'Standaard, door iemand buiten onze organisatie',
      },
    },
    Q8: {
      text: 'Welk aandeel van uw tijd gaat op aan het handmatig consolideren, schoonmaken en interpreteren van data — voor portefeuillebeheer, financieringsdossiers of deal-analyses?',
      options: {
        A: 'Meer dan 70% van de tijd',
        B: '50 tot 70%',
        C: '30 tot 50%',
        D: '15 tot 30%',
        E: 'Minder dan 15%, het meeste is geautomatiseerd of gestructureerd',
      },
    },
    Q9: {
      text: 'Hoe vaak heeft u een actuele sectorvergelijking beschikbaar — voor een portefeuillerapportage, een financieringsmemo of een deal-analyse?',
      options: {
        A: 'Nooit of alleen ad hoc',
        B: 'Eén tot twee keer per jaar',
        C: 'Per kwartaal',
        D: 'Per dossier, handmatig samengesteld',
        E: 'Per dossier, systematisch en reproduceerbaar',
      },
    },
    Q10: {
      text: 'Wanneer u analytische onderbouwing voorbereidt — voor een acquisitie, financieringsaanvraag of portefeuillereview — hoe volledig en gestructureerd is het resultaat doorgaans?',
      options: {
        A: 'Ad hoc, op basis van beschikbare cijfers, geen vaste structuur',
        B: 'Gebaseerd op historische jaarcijfers, zonder forward-looking analyse of benchmark',
        C: 'Met een financieel model, maar zonder gestructureerde sectorvergelijking',
        D: 'Met een financieel model en benchmark, maar grotendeels handmatig samengesteld',
        E: 'Volledig gestructureerd dossier op alle relevante dimensies, systematisch en reproduceerbaar',
      },
    },
    Q11: {
      text: 'Wanneer een deelneming of dossier onder verwachting presteert, hoe snel weet u typisch of het een eenmalig effect is of een structureel patroon?',
      options: {
        A: 'Pas na drie kwartalen, achteraf evident',
        B: 'Na twee kwartalen, op basis van trendlijnen',
        C: 'Binnen één kwartaal, op basis van eigen analyse',
        D: 'Binnen weken, op basis van leading indicators',
        E: 'Direct, op basis van geautomatiseerde signalen in onze systemen',
      },
    },
    Q12: {
      text: 'Welk percentage van het analytische routinewerk van uw team — modelleren, samenvatten, benchmarken — kan een goed-getrainde AI-stack vandaag al overnemen, mits gecontroleerd door een senior?',
      options: {
        A: 'Vrijwel niets, het werk is te specifiek',
        B: 'Minder dan 20%',
        C: '20 tot 40%',
        D: '40 tot 60%',
        E: 'Meer dan 60%',
      },
    },
    Q13: {
      text: 'Wanneer een extern rapport binnenkomt — van een adviseur, accountant of DD-leverancier — hoe wordt de kennis structureel teruggebracht in uw eigen organisatie?',
      options: {
        A: 'We bewaren het rapport, verder niets',
        B: 'We bespreken het in een meeting, geen formele vastlegging',
        C: 'We onttrekken key learnings naar een interne notitie',
        D: 'We hebben een gestructureerd systeem dat rapport-output verwerkt',
        E: 'Rapport-output is ingebed in onze eigen modellen en methodologie, herbruikbaar bij volgende trajecten',
      },
    },
    Q14: {
      text: 'Wanneer een senior medewerker uw organisatie verlaat, welk aandeel van zijn of haar kennis over uw portefeuille, deals en aanpak blijft achter in vindbare systemen?',
      options: {
        A: 'Vrijwel niets, het meeste zit in zijn of haar hoofd',
        B: 'Minder dan 25%',
        C: 'Ongeveer de helft',
        D: '75% of meer, dankzij documentatie-discipline',
        E: 'Vrijwel alles, het zit ingebed in systemen, niet in personen',
      },
    },
    Q15: {
      text: 'Hoe vaak laat u een kans liggen — een deal, een financieringsronde, een exitmoment — doordat uw team de capaciteit of de analytische basis niet op tijd gereed heeft?',
      options: {
        A: 'Regelmatig, capaciteit is structureel onze bottleneck',
        B: 'Een paar keer per jaar',
        C: 'Zelden, maar het gebeurt',
        D: 'Vrijwel nooit, we hebben capaciteit op orde',
        E: 'Nooit, we kunnen meer aanvragen of dealflow aan dan we momenteel hebben',
      },
    },
  },

  en: {
    Q1: {
      text: 'How would you describe the analytical quality of your current files — in a deal, a financing application or a portfolio review?',
      options: {
        A: 'We work largely on experience, without a structured analytical approach',
        B: 'We use standard Excel models, but without a fixed methodology or benchmark',
        C: 'We have a basic approach, but quality varies by file and by person',
        D: 'We apply a structured methodology, but not yet fully consistent',
        E: 'Our approach is systematic, reproducible and consistent across all files',
      },
    },
    Q2: {
      text: 'Looking back at recent files — acquisitions, financing applications or portfolio reviews — what was the most common bottleneck in analytical preparation?',
      options: {
        A: 'We had insufficient time or capacity to prepare properly',
        B: 'Data was available but not structured or comparable',
        C: 'There was no shared methodology — each file was handled differently',
        D: 'The approach was good but too manual — too much time on consolidation, too little on analysis',
        E: 'No significant bottleneck — we were satisfied with the preparation',
      },
    },
    Q3: {
      text: 'What share of your analytical work — modelling, benchmarking, summarising — could a well-configured AI system take over today without loss of quality?',
      options: {
        A: 'Almost nothing, the work is too specific and contextual',
        B: 'Less than 20%',
        C: '20 to 40%',
        D: '40 to 60%',
        E: 'More than 60% — most analytical routine is already automated',
      },
    },
    Q4: {
      text: 'Which situation is most relevant for you right now?',
      options: {
        A: 'We are preparing an acquisition — buy-side analysis and deal intelligence',
        B: 'We are preparing a financing application — substantiation for a bank or investor',
        C: 'We are monitoring existing portfolio companies — portfolio intelligence and early warning',
        D: 'We are flagging financial headwinds — first indication of stress at a portfolio company',
        E: 'We want to analyse more deals with less capacity',
      },
    },
    Q5: {
      text: 'How do you model AI substitution risk in the entry multiple for service-sector targets?',
      options: {
        A: 'We do not — it is implicitly included in the general sector risk premium',
        B: 'Qualitative mention in the IC memo',
        C: 'Sensitivity analysis on 10% margin erosion, generic',
        D: 'Sensitivity with specific assumptions per job category',
        E: "Fully modelled, computed through to hold-period scenarios",
      },
    },
    Q6: {
      text: 'How many working days pass on average between receipt of an Information Memorandum (or comparable starting document) and your first substantiated assessment?',
      options: {
        A: 'More than 20 working days',
        B: '15 to 20 working days',
        C: '10 to 15 working days',
        D: '5 to 10 working days',
        E: 'Fewer than 5 working days',
      },
    },
    Q7: {
      text: 'In your last three analytical processes: how often did you have the key assumptions validated by someone explicitly not involved in the preparation?',
      options: {
        A: 'Not at all — the team itself bears responsibility for the assumptions',
        B: 'Informally, through a conversation outside the team',
        C: 'Once, in one of the three processes',
        D: 'Routinely, internally by someone outside the team',
        E: 'Routinely, by someone outside our organisation',
      },
    },
    Q8: {
      text: 'What share of your time is spent manually consolidating, cleaning and interpreting data — for portfolio management, financing files or deal analyses?',
      options: {
        A: 'More than 70% of the time',
        B: '50 to 70%',
        C: '30 to 50%',
        D: '15 to 30%',
        E: 'Less than 15% — most is automated or structured',
      },
    },
    Q9: {
      text: 'How often do you have an up-to-date sector comparison available — for a portfolio report, a financing memo or a deal analysis?',
      options: {
        A: 'Never or only ad hoc',
        B: 'One to two times per year',
        C: 'Quarterly',
        D: 'Per file, manually compiled',
        E: 'Per file, systematically and reproducibly',
      },
    },
    Q10: {
      text: 'When you prepare analytical substantiation — for an acquisition, financing application or portfolio review — how complete and structured is the output typically?',
      options: {
        A: 'Ad hoc, based on available figures, no fixed structure',
        B: 'Based on historical annual accounts, without forward-looking analysis or benchmark',
        C: 'With a financial model, but without a structured sector comparison',
        D: 'With a financial model and benchmark, but largely manually compiled',
        E: 'Fully structured file on all relevant dimensions, systematic and reproducible',
      },
    },
    Q11: {
      text: 'When a portfolio company or file underperforms, how quickly do you typically know whether it is a one-off effect or a structural pattern?',
      options: {
        A: 'Only after three quarters, evident in hindsight',
        B: 'After two quarters, based on trend lines',
        C: 'Within one quarter, based on own analysis',
        D: 'Within weeks, based on leading indicators',
        E: 'Immediately, based on automated signals in our systems',
      },
    },
    Q12: {
      text: "What percentage of your team's routine analytical work — modelling, summarising, benchmarking — could a well-trained AI stack take over today, provided it is reviewed by a senior?",
      options: {
        A: 'Almost nothing, the work is too specific',
        B: 'Less than 20%',
        C: '20 to 40%',
        D: '40 to 60%',
        E: 'More than 60%',
      },
    },
    Q13: {
      text: 'When an external report comes in — from an advisor, accountant or DD provider — how is the knowledge structurally brought back into your own organisation?',
      options: {
        A: 'We store the report, nothing further',
        B: 'We discuss it in a meeting, no formal recording',
        C: 'We extract key learnings into an internal note',
        D: 'We have a structured system that processes report output',
        E: 'Report output is embedded in our own models and methodology, reusable for future processes',
      },
    },
    Q14: {
      text: 'When a senior employee leaves your organisation, what share of their knowledge about your portfolio, deals and approach remains in findable systems?',
      options: {
        A: 'Almost nothing — most of it is in their head',
        B: 'Less than 25%',
        C: 'About half',
        D: '75% or more, thanks to documentation discipline',
        E: 'Almost everything — it is embedded in systems, not in individuals',
      },
    },
    Q15: {
      text: 'How often do you miss an opportunity — a deal, a financing round, an exit moment — because your team does not have the capacity or analytical foundation ready in time?',
      options: {
        A: 'Regularly — capacity is structurally our bottleneck',
        B: 'A few times per year',
        C: 'Rarely, but it happens',
        D: 'Almost never — we have capacity under control',
        E: 'Never — we can handle more applications or deal flow than we currently have',
      },
    },
  },

  de: {
    Q1: {
      text: 'Wie würden Sie die analytische Qualität Ihrer aktuellen Dossiers beschreiben — bei einem Deal, einer Finanzierungsanfrage oder einem Portfolio-Review?',
      options: {
        A: 'Wir arbeiten größtenteils auf Erfahrungsbasis, ohne strukturierten analytischen Ansatz',
        B: 'Wir verwenden Standard-Excel-Modelle, aber ohne feste Methodik oder Benchmark',
        C: 'Wir haben einen Basisansatz, aber die Qualität variiert je nach Dossier und Person',
        D: 'Wir wenden eine strukturierte Methodik an, aber noch nicht vollständig konsistent',
        E: 'Unser Ansatz ist systematisch, reproduzierbar und konsistent über alle Dossiers',
      },
    },
    Q2: {
      text: 'Wenn Sie auf aktuelle Dossiers zurückblicken — Akquisitionen, Finanzierungsanfragen oder Portfolio-Reviews — was war der häufigste Engpass bei der analytischen Vorbereitung?',
      options: {
        A: 'Wir hatten nicht genügend Zeit oder Kapazität für eine gründliche Vorbereitung',
        B: 'Daten waren vorhanden, aber nicht strukturiert oder vergleichbar',
        C: 'Es fehlte eine gemeinsame Methodik — jedes Dossier wurde anders angegangen',
        D: 'Der Ansatz war gut, aber zu manuell — zu viel Zeit für Konsolidierung, zu wenig für Analyse',
        E: 'Kein wesentlicher Engpass — wir waren mit der Vorbereitung zufrieden',
      },
    },
    Q3: {
      text: 'Welchen Anteil Ihrer analytischen Arbeiten — Modellierung, Benchmarking, Zusammenfassungen — könnte ein gut konfiguriertes KI-System heute ohne Qualitätsverlust übernehmen?',
      options: {
        A: 'Fast nichts, die Arbeit ist zu spezifisch und kontextuell',
        B: 'Weniger als 20%',
        C: '20 bis 40%',
        D: '40 bis 60%',
        E: 'Mehr als 60% — der größte Teil der analytischen Routine ist bereits automatisiert',
      },
    },
    Q4: {
      text: 'Welche Situation ist für Sie derzeit am relevantesten?',
      options: {
        A: 'Wir bereiten eine Akquisition vor — buy-side Analyse und Deal Intelligence',
        B: 'Wir bereiten eine Finanzierungsanfrage vor — Untermauerung für Bank oder Investor',
        C: 'Wir überwachen bestehende Beteiligungen — Portfolio-Intelligence und Früherkennung',
        D: 'Wir erkennen finanzielle Gegenwindsignale — erste Anzeichen von Stress bei einer Beteiligung',
        E: 'Wir möchten mehr Deals mit weniger Kapazität analysieren',
      },
    },
    Q5: {
      text: 'Wie modellieren Sie KI-Substitutionsrisiken im Entry-Multiple bei dienstleistungsorientierten Targets?',
      options: {
        A: 'Gar nicht — es ist implizit im allgemeinen Sektorrisikozuschlag enthalten',
        B: 'Qualitative Erwähnung im IC-Memo',
        C: 'Sensitivitätsanalyse auf 10% Margenerosion, generisch',
        D: 'Sensitivität mit spezifischen Annahmen je Funktionsgruppe',
        E: "Vollständig modelliert, auf Hold-Period-Szenarien durchgerechnet",
      },
    },
    Q6: {
      text: 'Wie viele Werktage vergehen durchschnittlich zwischen dem Eingang eines Information Memorandums (oder vergleichbarem Startdokument) und Ihrem ersten fundierten Urteil?',
      options: {
        A: 'Mehr als 20 Werktage',
        B: '15 bis 20 Werktage',
        C: '10 bis 15 Werktage',
        D: '5 bis 10 Werktage',
        E: 'Weniger als 5 Werktage',
      },
    },
    Q7: {
      text: 'In Ihren letzten drei analytischen Prozessen: Wie oft haben Sie die zentralen Annahmen von jemandem validieren lassen, der explizit nicht an der Vorbereitung beteiligt war?',
      options: {
        A: 'Gar nicht — das Team trägt selbst die Verantwortung für die Annahmen',
        B: 'Informell, durch ein Gespräch außerhalb des Teams',
        C: 'Einmal, in einem der drei Prozesse',
        D: 'Standardmäßig, intern durch jemanden außerhalb des Teams',
        E: 'Standardmäßig, durch jemanden außerhalb unserer Organisation',
      },
    },
    Q8: {
      text: 'Welcher Anteil Ihrer Zeit wird für das manuelle Konsolidieren, Bereinigen und Interpretieren von Daten aufgewendet — für Portfolio-Management, Finanzierungsdossiers oder Deal-Analysen?',
      options: {
        A: 'Mehr als 70% der Zeit',
        B: '50 bis 70%',
        C: '30 bis 50%',
        D: '15 bis 30%',
        E: 'Weniger als 15% — das meiste ist automatisiert oder strukturiert',
      },
    },
    Q9: {
      text: 'Wie oft haben Sie einen aktuellen Sektorvergleich verfügbar — für einen Portfolio-Bericht, ein Finanzierungsmemo oder eine Deal-Analyse?',
      options: {
        A: 'Nie oder nur ad hoc',
        B: 'Ein- bis zweimal pro Jahr',
        C: 'Quartalsweise',
        D: 'Pro Dossier, manuell zusammengestellt',
        E: 'Pro Dossier, systematisch und reproduzierbar',
      },
    },
    Q10: {
      text: 'Wenn Sie analytische Untermauerung vorbereiten — für eine Akquisition, Finanzierungsanfrage oder einen Portfolio-Review — wie vollständig und strukturiert ist das Ergebnis typischerweise?',
      options: {
        A: 'Ad hoc, auf Basis verfügbarer Zahlen, keine feste Struktur',
        B: 'Basierend auf historischen Jahreszahlen, ohne Forward-looking-Analyse oder Benchmark',
        C: 'Mit einem Finanzmodell, aber ohne strukturierten Sektorvergleich',
        D: 'Mit Finanzmodell und Benchmark, aber größtenteils manuell zusammengestellt',
        E: 'Vollständig strukturiertes Dossier auf allen relevanten Dimensionen, systematisch und reproduzierbar',
      },
    },
    Q11: {
      text: 'Wenn eine Beteiligung oder ein Dossier unter den Erwartungen bleibt, wie schnell wissen Sie typischerweise, ob es sich um einen einmaligen Effekt oder ein strukturelles Muster handelt?',
      options: {
        A: 'Erst nach drei Quartalen, im Nachhinein offensichtlich',
        B: 'Nach zwei Quartalen, anhand von Trendlinien',
        C: 'Innerhalb eines Quartals, anhand eigener Analyse',
        D: 'Innerhalb von Wochen, anhand von Leading Indicators',
        E: 'Sofort, anhand automatisierter Signale in unseren Systemen',
      },
    },
    Q12: {
      text: 'Welcher Prozentsatz der analytischen Routinearbeiten Ihres Teams — Modellierung, Zusammenfassungen, Benchmarking — könnte ein gut trainierter KI-Stack heute übernehmen, sofern er von einer Führungskraft kontrolliert wird?',
      options: {
        A: 'Fast nichts, die Arbeit ist zu spezifisch',
        B: 'Weniger als 20%',
        C: '20 bis 40%',
        D: '40 bis 60%',
        E: 'Mehr als 60%',
      },
    },
    Q13: {
      text: 'Wenn ein externer Bericht eingeht — von einem Berater, Wirtschaftsprüfer oder DD-Anbieter — wie wird das Wissen strukturell in Ihre eigene Organisation zurückgeführt?',
      options: {
        A: 'Wir archivieren den Bericht, weiter nichts',
        B: 'Wir besprechen ihn in einem Meeting, keine formelle Dokumentation',
        C: 'Wir extrahieren Key Learnings in eine interne Notiz',
        D: 'Wir haben ein strukturiertes System, das Berichtsoutput verarbeitet',
        E: 'Berichtsoutput ist in unsere eigenen Modelle und Methodik eingebettet, wiederverwendbar für zukünftige Prozesse',
      },
    },
    Q14: {
      text: 'Wenn ein leitender Mitarbeiter Ihre Organisation verlässt, welcher Anteil seines oder ihres Wissens über Ihr Portfolio, Deals und Vorgehen bleibt in auffindbaren Systemen erhalten?',
      options: {
        A: 'Fast nichts — das meiste ist in seinem oder ihrem Kopf',
        B: 'Weniger als 25%',
        C: 'Etwa die Hälfte',
        D: '75% oder mehr, dank Dokumentationsdisziplin',
        E: 'Fast alles — es ist in Systemen eingebettet, nicht in Personen',
      },
    },
    Q15: {
      text: 'Wie oft verpassen Sie eine Gelegenheit — einen Deal, eine Finanzierungsrunde, einen Exit-Moment — weil Ihr Team die Kapazität oder die analytische Grundlage nicht rechtzeitig bereit hat?',
      options: {
        A: 'Regelmäßig — Kapazität ist strukturell unser Engpass',
        B: 'Einige Male pro Jahr',
        C: 'Selten, aber es kommt vor',
        D: 'Fast nie — wir haben die Kapazität im Griff',
        E: 'Nie — wir können mehr Anfragen oder Deal-Flow bewältigen als wir derzeit haben',
      },
    },
  },

  es: {
    Q1: {
      text: '¿Cómo describiría la calidad analítica de sus expedientes actuales — en un deal, una solicitud de financiación o una revisión de cartera?',
      options: {
        A: 'Trabajamos principalmente por experiencia, sin un enfoque analítico estructurado',
        B: 'Utilizamos modelos estándar de Excel, pero sin metodología fija ni benchmark',
        C: 'Tenemos un enfoque básico, pero la calidad varía según el expediente y la persona',
        D: 'Aplicamos una metodología estructurada, pero todavía no completamente consistente',
        E: 'Nuestro enfoque es sistemático, reproducible y consistente en todos los expedientes',
      },
    },
    Q2: {
      text: 'Al revisar expedientes recientes — adquisiciones, solicitudes de financiación o revisiones de cartera — ¿cuál fue el cuello de botella más frecuente en la preparación analítica?',
      options: {
        A: 'No teníamos tiempo o capacidad suficiente para prepararlo bien',
        B: 'Los datos estaban disponibles pero no estructurados ni comparables',
        C: 'Faltaba una metodología compartida — cada expediente se abordaba de forma diferente',
        D: 'El enfoque era bueno pero demasiado manual — demasiado tiempo en consolidación, poco en análisis',
        E: 'Ningún cuello de botella significativo — estábamos satisfechos con la preparación',
      },
    },
    Q3: {
      text: '¿Qué parte de su trabajo analítico — modelización, benchmarking, síntesis — podría asumir hoy un sistema de IA bien configurado sin pérdida de calidad?',
      options: {
        A: 'Prácticamente nada, el trabajo es demasiado específico y contextual',
        B: 'Menos del 20%',
        C: 'Del 20 al 40%',
        D: 'Del 40 al 60%',
        E: 'Más del 60% — la mayor parte de la rutina analítica ya está automatizada',
      },
    },
    Q4: {
      text: '¿Qué situación es más relevante para usted en este momento?',
      options: {
        A: 'Estamos preparando una adquisición — análisis buy-side e inteligencia de deal',
        B: 'Estamos preparando una solicitud de financiación — justificación para banco o inversor',
        C: 'Estamos monitoreando participadas existentes — inteligencia de cartera y alerta temprana',
        D: 'Estamos identificando vientos en contra financieros — primera señal de estrés en una participada',
        E: 'Queremos analizar más deals con menos capacidad',
      },
    },
    Q5: {
      text: '¿Cómo modeliza el riesgo de sustitución por IA en el múltiplo de entrada para targets del sector servicios?',
      options: {
        A: 'No lo modelizamos — está implícito en la prima de riesgo sectorial general',
        B: 'Mención cualitativa en el memo del IC',
        C: 'Análisis de sensibilidad sobre erosión de margen del 10%, genérico',
        D: 'Sensibilidad con supuestos específicos por categoría de puesto',
        E: "Completamente modelizado, calculado hasta los escenarios del período de tenencia",
      },
    },
    Q6: {
      text: '¿Cuántos días hábiles transcurren en promedio entre la recepción de un Information Memorandum (o documento de inicio comparable) y su primera evaluación fundamentada?',
      options: {
        A: 'Más de 20 días hábiles',
        B: 'De 15 a 20 días hábiles',
        C: 'De 10 a 15 días hábiles',
        D: 'De 5 a 10 días hábiles',
        E: 'Menos de 5 días hábiles',
      },
    },
    Q7: {
      text: 'En sus últimos tres procesos analíticos: ¿con qué frecuencia hizo validar los supuestos clave por alguien que explícitamente no participó en la preparación?',
      options: {
        A: 'En ningún caso — el equipo asume la responsabilidad de los supuestos',
        B: 'De manera informal, mediante una conversación fuera del equipo',
        C: 'Una vez, en uno de los tres procesos',
        D: 'De manera sistemática, internamente por alguien fuera del equipo',
        E: 'De manera sistemática, por alguien fuera de nuestra organización',
      },
    },
    Q8: {
      text: '¿Qué parte de su tiempo se dedica a consolidar, limpiar e interpretar datos manualmente — para gestión de cartera, expedientes de financiación o análisis de deals?',
      options: {
        A: 'Más del 70% del tiempo',
        B: 'Del 50 al 70%',
        C: 'Del 30 al 50%',
        D: 'Del 15 al 30%',
        E: 'Menos del 15% — la mayor parte está automatizado o estructurado',
      },
    },
    Q9: {
      text: '¿Con qué frecuencia dispone de una comparativa sectorial actualizada — para un informe de cartera, un memo de financiación o un análisis de deal?',
      options: {
        A: 'Nunca o solo de manera ad hoc',
        B: 'Una o dos veces al año',
        C: 'Trimestralmente',
        D: 'Por expediente, compilado manualmente',
        E: 'Por expediente, de forma sistemática y reproducible',
      },
    },
    Q10: {
      text: 'Cuando prepara una justificación analítica — para una adquisición, solicitud de financiación o revisión de cartera — ¿qué tan completo y estructurado es el resultado habitualmente?',
      options: {
        A: 'Ad hoc, basado en cifras disponibles, sin estructura fija',
        B: 'Basado en cuentas anuales históricas, sin análisis prospectivo ni benchmark',
        C: 'Con un modelo financiero, pero sin comparativa sectorial estructurada',
        D: 'Con modelo financiero y benchmark, pero en gran medida compilado manualmente',
        E: 'Expediente completamente estructurado en todas las dimensiones relevantes, sistemático y reproducible',
      },
    },
    Q11: {
      text: 'Cuando una participada o expediente rinde por debajo de lo esperado, ¿con qué rapidez sabe típicamente si es un efecto puntual o un patrón estructural?',
      options: {
        A: 'Solo después de tres trimestres, evidente a posteriori',
        B: 'Después de dos trimestres, basándose en líneas de tendencia',
        C: 'En un trimestre, basándose en análisis propio',
        D: 'En semanas, basándose en indicadores adelantados',
        E: 'De inmediato, basándose en señales automatizadas en nuestros sistemas',
      },
    },
    Q12: {
      text: '¿Qué porcentaje del trabajo analítico rutinario de su equipo — modelización, síntesis, benchmarking — podría asumir hoy un stack de IA bien entrenado, siempre que lo supervise un senior?',
      options: {
        A: 'Prácticamente nada, el trabajo es demasiado específico',
        B: 'Menos del 20%',
        C: 'Del 20 al 40%',
        D: 'Del 40 al 60%',
        E: 'Más del 60%',
      },
    },
    Q13: {
      text: 'Cuando llega un informe externo — de un asesor, auditor o proveedor de DD — ¿cómo se incorpora estructuralmente ese conocimiento a su propia organización?',
      options: {
        A: 'Archivamos el informe, nada más',
        B: 'Lo discutimos en una reunión, sin registro formal',
        C: 'Extraemos los key learnings en una nota interna',
        D: 'Tenemos un sistema estructurado que procesa el output del informe',
        E: 'El output del informe está integrado en nuestros propios modelos y metodología, reutilizable en futuros procesos',
      },
    },
    Q14: {
      text: 'Cuando un empleado senior abandona su organización, ¿qué parte de su conocimiento sobre su cartera, deals y enfoque permanece en sistemas localizables?',
      options: {
        A: 'Prácticamente nada — la mayor parte está en su cabeza',
        B: 'Menos del 25%',
        C: 'Aproximadamente la mitad',
        D: 'El 75% o más, gracias a la disciplina de documentación',
        E: 'Prácticamente todo — está integrado en sistemas, no en personas',
      },
    },
    Q15: {
      text: '¿Con qué frecuencia pierde una oportunidad — un deal, una ronda de financiación, un momento de salida — porque su equipo no tiene la capacidad o la base analítica lista a tiempo?',
      options: {
        A: 'Con frecuencia — la capacidad es estructuralmente nuestro cuello de botella',
        B: 'Algunas veces al año',
        C: 'Raramente, pero ocurre',
        D: 'Casi nunca — tenemos la capacidad bajo control',
        E: 'Nunca — podemos asumir más solicitudes o deal flow del que tenemos actualmente',
      },
    },
  },

  pt: {
    Q1: {
      text: 'Como descreveria a qualidade analítica dos seus processos atuais — num deal, num pedido de financiamento ou numa revisão de portfólio?',
      options: {
        A: 'Trabalhamos principalmente com base na experiência, sem uma abordagem analítica estruturada',
        B: 'Utilizamos modelos Excel padrão, mas sem metodologia fixa ou benchmark',
        C: 'Temos uma abordagem básica, mas a qualidade varia consoante o processo e a pessoa',
        D: 'Aplicamos uma metodologia estruturada, mas ainda não completamente consistente',
        E: 'A nossa abordagem é sistemática, reproduzível e consistente em todos os processos',
      },
    },
    Q2: {
      text: 'Ao rever processos recentes — aquisições, pedidos de financiamento ou revisões de portfólio — qual foi o obstáculo mais frequente na preparação analítica?',
      options: {
        A: 'Não tínhamos tempo ou capacidade suficiente para preparar adequadamente',
        B: 'Os dados estavam disponíveis, mas não estruturados nem comparáveis',
        C: 'Faltava uma metodologia partilhada — cada processo era abordado de forma diferente',
        D: 'A abordagem era boa, mas demasiado manual — muito tempo em consolidação, pouco em análise',
        E: 'Nenhum obstáculo significativo — ficámos satisfeitos com a preparação',
      },
    },
    Q3: {
      text: 'Que parte do seu trabalho analítico — modelação, benchmarking, síntese — poderia ser assumida hoje por um sistema de IA bem configurado sem perda de qualidade?',
      options: {
        A: 'Praticamente nada, o trabalho é demasiado específico e contextual',
        B: 'Menos de 20%',
        C: '20 a 40%',
        D: '40 a 60%',
        E: 'Mais de 60% — a maior parte da rotina analítica já está automatizada',
      },
    },
    Q4: {
      text: 'Qual a situação mais relevante para si neste momento?',
      options: {
        A: 'Estamos a preparar uma aquisição — análise buy-side e deal intelligence',
        B: 'Estamos a preparar um pedido de financiamento — fundamentação para banco ou investidor',
        C: 'Estamos a monitorizar participadas existentes — portfolio intelligence e alerta precoce',
        D: 'Estamos a identificar ventos contrários financeiros — primeira indicação de stress numa participada',
        E: 'Queremos analisar mais deals com menos capacidade',
      },
    },
    Q5: {
      text: 'Como modela o risco de substituição por IA no múltiplo de entrada para targets do setor de serviços?',
      options: {
        A: 'Não modelamos — está implícito no prémio de risco setorial geral',
        B: 'Menção qualitativa no memo do IC',
        C: 'Análise de sensibilidade sobre erosão de margem de 10%, genérica',
        D: 'Sensibilidade com pressupostos específicos por categoria funcional',
        E: "Completamente modelado, calculado até aos cenários do período de detenção",
      },
    },
    Q6: {
      text: 'Quantos dias úteis decorrem em média entre a receção de um Information Memorandum (ou documento de início comparável) e o seu primeiro juízo fundamentado?',
      options: {
        A: 'Mais de 20 dias úteis',
        B: '15 a 20 dias úteis',
        C: '10 a 15 dias úteis',
        D: '5 a 10 dias úteis',
        E: 'Menos de 5 dias úteis',
      },
    },
    Q7: {
      text: 'Nos seus últimos três processos analíticos: com que frequência fez validar os pressupostos centrais por alguém que explicitamente não participou na preparação?',
      options: {
        A: 'Nunca — a equipa assume a responsabilidade pelos pressupostos',
        B: 'Informalmente, através de uma conversa fora da equipa',
        C: 'Uma vez, num dos três processos',
        D: 'Sistematicamente, internamente por alguém fora da equipa',
        E: 'Sistematicamente, por alguém fora da nossa organização',
      },
    },
    Q8: {
      text: 'Que parte do seu tempo é gasta a consolidar, limpar e interpretar dados manualmente — para gestão de portfólio, processos de financiamento ou análises de deals?',
      options: {
        A: 'Mais de 70% do tempo',
        B: '50 a 70%',
        C: '30 a 50%',
        D: '15 a 30%',
        E: 'Menos de 15% — a maior parte está automatizada ou estruturada',
      },
    },
    Q9: {
      text: 'Com que frequência dispõe de uma comparação setorial atualizada — para um relatório de portfólio, um memo de financiamento ou uma análise de deal?',
      options: {
        A: 'Nunca ou apenas de forma ad hoc',
        B: 'Uma a duas vezes por ano',
        C: 'Trimestralmente',
        D: 'Por processo, compilado manualmente',
        E: 'Por processo, de forma sistemática e reproduzível',
      },
    },
    Q10: {
      text: 'Quando prepara fundamentação analítica — para uma aquisição, pedido de financiamento ou revisão de portfólio — quão completo e estruturado é tipicamente o resultado?',
      options: {
        A: 'Ad hoc, com base em números disponíveis, sem estrutura fixa',
        B: 'Com base em contas anuais históricas, sem análise prospetiva ou benchmark',
        C: 'Com um modelo financeiro, mas sem comparação setorial estruturada',
        D: 'Com modelo financeiro e benchmark, mas em grande parte compilado manualmente',
        E: 'Processo completamente estruturado em todas as dimensões relevantes, sistemático e reproduzível',
      },
    },
    Q11: {
      text: 'Quando uma participada ou processo fica abaixo das expectativas, com que rapidez sabe tipicamente se é um efeito pontual ou um padrão estrutural?',
      options: {
        A: 'Só após três trimestres, evidente retrospetivamente',
        B: 'Após dois trimestres, com base em linhas de tendência',
        C: 'Dentro de um trimestre, com base em análise própria',
        D: 'Em semanas, com base em indicadores avançados',
        E: 'De imediato, com base em sinais automatizados nos nossos sistemas',
      },
    },
    Q12: {
      text: 'Que percentagem do trabalho analítico de rotina da sua equipa — modelação, síntese, benchmarking — poderia ser assumida hoje por um stack de IA bem treinado, desde que supervisionado por um sénior?',
      options: {
        A: 'Praticamente nada, o trabalho é demasiado específico',
        B: 'Menos de 20%',
        C: '20 a 40%',
        D: '40 a 60%',
        E: 'Mais de 60%',
      },
    },
    Q13: {
      text: 'Quando chega um relatório externo — de um consultor, contabilista ou fornecedor de DD — como é que o conhecimento é estruturalmente integrado na sua própria organização?',
      options: {
        A: 'Arquivamos o relatório, nada mais',
        B: 'Discutimos numa reunião, sem registo formal',
        C: 'Extraímos key learnings para uma nota interna',
        D: 'Temos um sistema estruturado que processa o output do relatório',
        E: 'O output do relatório está integrado nos nossos próprios modelos e metodologia, reutilizável em processos futuros',
      },
    },
    Q14: {
      text: 'Quando um colaborador sénior abandona a sua organização, que parte do seu conhecimento sobre o seu portfólio, deals e abordagem permanece em sistemas localizáveis?',
      options: {
        A: 'Praticamente nada — a maior parte está na sua cabeça',
        B: 'Menos de 25%',
        C: 'Cerca de metade',
        D: '75% ou mais, graças à disciplina de documentação',
        E: 'Praticamente tudo — está integrado em sistemas, não em pessoas',
      },
    },
    Q15: {
      text: 'Com que frequência perde uma oportunidade — um deal, uma ronda de financiamento, um momento de saída — porque a sua equipa não tem a capacidade ou a base analítica pronta a tempo?',
      options: {
        A: 'Com frequência — a capacidade é estruturalmente o nosso gargalo',
        B: 'Algumas vezes por ano',
        C: 'Raramente, mas acontece',
        D: 'Quase nunca — temos a capacidade sob controlo',
        E: 'Nunca — conseguimos lidar com mais pedidos ou deal flow do que temos atualmente',
      },
    },
  },
};

export const sectionTranslations: Record<string, {
  sections: Array<{ title: string; eyebrow: string; description: string }>;
  dimensions: Record<string, string>;
}> = {
  nl: {
    sections: [
      { title: 'Uw analytische aanpak vandaag', eyebrow: 'Sectie 1 van 4', description: 'Hoe systematisch is uw analytische aanpak, bij deals, financiering en portfolio review? Deze sectie brengt uw huidige positie in kaart.' },
      { title: 'Uw deal- en analysecyclus', eyebrow: 'Sectie 2 van 4', description: 'Doorlooptijd tot aan het IC, het risico dat AI de kernactiviteit overneemt, en uw oordeelsvorming: drie punten waar rendement weglekt. Deze sectie meet ze.' },
      { title: 'Maandrapportage en vroegsignalering', eyebrow: 'Sectie 3 van 4', description: 'Portefeuillerapportage, financieringsmemo\'s, vroegsignalering: kunt u op tijd bijsturen? Deze sectie meet de structuur achter uw informatie.' },
      { title: 'Kennisborging, capaciteit en AI-gereedheid', eyebrow: 'Sectie 4 van 4', description: 'Als een associate vertrekt, verdwijnt het geheugen van drie tot vijf dossiers. Deze sectie meet of uw organisatie daar bestand tegen is.' },
    ],
    dimensions: {
      DealVelocity: 'Deal Velocity',
      PortfolioIntelligence: 'Analytische Kwaliteit',
      BiasDetection: 'Bias Detection',
      AIReadiness: 'AI Readiness',
      CapacityEngineering: 'Capacity Engineering',
      KnowledgeRetention: 'Knowledge Retention',
    },
  },
  en: {
    sections: [
      { title: 'Your analytical approach today', eyebrow: 'Section 1 of 4', description: 'How systematic is your analytical approach, in deals, financing and portfolio reviews? This section maps your current position.' },
      { title: 'Your deal and analysis cycle', eyebrow: 'Section 2 of 4', description: 'Time-to-IC, the risk that AI takes over core activity, and your judgement formation: three points where returns leak. This section measures them.' },
      { title: 'Monthly reporting and early warning', eyebrow: 'Section 3 of 4', description: 'Portfolio reporting, financing memos, early warning: can you course-correct in time? This section measures the structure behind your information.' },
      { title: 'Knowledge retention, capacity and AI-readiness', eyebrow: 'Section 4 of 4', description: 'When an associate leaves, the memory of three to five files disappears. This section measures whether your organisation is resilient to that.' },
    ],
    dimensions: {
      DealVelocity: 'Deal Velocity',
      PortfolioIntelligence: 'Analytical Quality',
      BiasDetection: 'Bias Detection',
      AIReadiness: 'AI Readiness',
      CapacityEngineering: 'Capacity Engineering',
      KnowledgeRetention: 'Knowledge Retention',
    },
  },
  de: {
    sections: [
      { title: 'Ihr analytischer Ansatz heute', eyebrow: 'Abschnitt 1 von 4', description: 'Wie systematisch ist Ihr analytischer Ansatz bei Deals, Finanzierungen und Portfolio-Reviews? Dieser Abschnitt erfasst Ihre aktuelle Position.' },
      { title: 'Ihr Deal- und Analysezyklus', eyebrow: 'Abschnitt 2 von 4', description: 'Durchlaufzeit bis zum IC, das Risiko dass KI die Kernaktivität übernimmt, und Ihre Urteilsbildung: drei Punkte wo Rendite verloren geht. Dieser Abschnitt misst sie.' },
      { title: 'Monatsbericht und Früherkennung', eyebrow: 'Abschnitt 3 von 4', description: 'Portfolio-Berichte, Finanzierungsmemos, Früherkennung: Können Sie rechtzeitig gegensteuern? Dieser Abschnitt misst die Struktur hinter Ihren Informationen.' },
      { title: 'Wissenserhalt, Kapazität und KI-Bereitschaft', eyebrow: 'Abschnitt 4 von 4', description: 'Wenn ein Mitarbeiter das Unternehmen verlässt, verschwindet das Wissen über drei bis fünf Dossiers. Dieser Abschnitt misst, ob Ihre Organisation dafür gerüstet ist.' },
    ],
    dimensions: {
      DealVelocity: 'Deal Velocity',
      PortfolioIntelligence: 'Analytische Qualität',
      BiasDetection: 'Bias Detection',
      AIReadiness: 'KI-Bereitschaft',
      CapacityEngineering: 'Kapazitätsmanagement',
      KnowledgeRetention: 'Wissenserhalt',
    },
  },
  es: {
    sections: [
      { title: 'Su enfoque analítico hoy', eyebrow: 'Sección 1 de 4', description: '¿Qué tan sistemático es su enfoque analítico, en deals, financiación y revisiones de cartera? Esta sección mapea su posición actual.' },
      { title: 'Su ciclo de deal y análisis', eyebrow: 'Sección 2 de 4', description: 'Tiempo hasta el IC, el riesgo de que la IA tome las actividades principales, y su formación de juicio: tres puntos donde se pierde rentabilidad. Esta sección los mide.' },
      { title: 'Informes mensuales y alertas tempranas', eyebrow: 'Sección 3 de 4', description: 'Informes de cartera, memos de financiación, alertas tempranas: ¿puede corregir el rumbo a tiempo? Esta sección mide la estructura detrás de su información.' },
      { title: 'Retención de conocimiento, capacidad y preparación para IA', eyebrow: 'Sección 4 de 4', description: 'Cuando un analista se va, desaparece la memoria de tres a cinco expedientes. Esta sección mide si su organización es resiliente a eso.' },
    ],
    dimensions: {
      DealVelocity: 'Velocidad de Deal',
      PortfolioIntelligence: 'Calidad Analítica',
      BiasDetection: 'Detección de Sesgo',
      AIReadiness: 'Preparación para IA',
      CapacityEngineering: 'Ingeniería de Capacidad',
      KnowledgeRetention: 'Retención de Conocimiento',
    },
  },
  pt: {
    sections: [
      { title: 'A sua abordagem analítica hoje', eyebrow: 'Seção 1 de 4', description: 'Quão sistemática é a sua abordagem analítica, em deals, financiamento e revisões de portfólio? Esta seção mapeia a sua posição atual.' },
      { title: 'O seu ciclo de deal e análise', eyebrow: 'Seção 2 de 4', description: 'Tempo até ao IC, o risco de a IA assumir as atividades principais, e a formação do seu julgamento: três pontos onde a rentabilidade escapa. Esta seção mede-os.' },
      { title: 'Relatórios mensais e alerta precoce', eyebrow: 'Seção 3 de 4', description: 'Relatórios de portfólio, memos de financiamento, alerta precoce: consegue corrigir o rumo a tempo? Esta seção mede a estrutura por trás da sua informação.' },
      { title: 'Retenção de conhecimento, capacidade e prontidão para IA', eyebrow: 'Seção 4 de 4', description: 'Quando um analista sai, desaparece a memória de três a cinco processos. Esta seção mede se a sua organização é resiliente a isso.' },
    ],
    dimensions: {
      DealVelocity: 'Velocidade de Deal',
      PortfolioIntelligence: 'Qualidade Analítica',
      BiasDetection: 'Deteção de Viés',
      AIReadiness: 'Prontidão para IA',
      CapacityEngineering: 'Engenharia de Capacidade',
      KnowledgeRetention: 'Retenção de Conhecimento',
    },
  },
};
