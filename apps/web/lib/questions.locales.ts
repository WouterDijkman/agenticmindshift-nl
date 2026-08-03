type LocaleQuestionData = {
  [questionId: string]: {
    text: string;
    options: { [letter: string]: string };
  };
};

export const questionTranslations: Record<string, LocaleQuestionData> = {
  nl: {
    Q1: {
      text: 'Hoe goed onderbouwd zijn uw dossiers op dit moment?',
      options: {
        A: 'We werken grotendeels op ervaring, zonder vaste werkwijze',
        B: 'We gebruiken standaard Excel-modellen, zonder vaste werkwijze of benchmark',
        C: 'Er is een basisaanpak, maar de kwaliteit verschilt per dossier en per persoon',
        D: 'We volgen een vaste werkwijze, maar nog niet overal consistent',
        E: 'Onze aanpak is systematisch, reproduceerbaar en overal gelijk',
      },
    },
    Q2: {
      text: 'Waar liep de voorbereiding bij uw recente dossiers het vaakst vast?',
      options: {
        A: 'Onvoldoende tijd of capaciteit om het goed voor te bereiden',
        B: 'De data was er wel, maar niet gestructureerd of vergelijkbaar',
        C: 'Er was geen gedeelde werkwijze; elk dossier werd anders aangepakt',
        D: 'De aanpak was goed, maar te handmatig: veel verzamelen, weinig analyseren',
        E: 'Niets noemenswaardigs; we waren tevreden over de voorbereiding',
      },
    },
    Q3: {
      text: 'Hoeveel van uw analysewerk — modelleren, vergelijken, samenvatten — kan AI vandaag al overnemen zonder kwaliteitsverlies?',
      options: {
        A: 'Vrijwel niets; het werk is te specifiek',
        B: 'Minder dan 20%',
        C: '20 tot 40%',
        D: '40 tot 60%',
        E: 'Meer dan 60%; het meeste routinewerk loopt al geautomatiseerd',
      },
    },
    Q4: {
      text: 'Welke situatie is voor u het meest relevant op dit moment?',
      options: {
        A: 'We bereiden een acquisitie voor: buy-side analyse en deal intelligence',
        B: 'We bereiden een financieringsaanvraag voor: onderbouwing voor bank of investeerder',
        C: 'We volgen bestaande deelnemingen: portefeuille-inzicht en vroege signalen',
        D: 'We zien financiële tegenwind: eerste signalen van stress bij een deelneming',
        E: 'We willen meer deals analyseren met dezelfde bezetting',
      },
    },
    Q5: {
      text: 'Rekent u het risico dat AI het werk overneemt mee in de entry-multiple bij dienstverlenende targets?',
      options: {
        A: 'Nee; het zit impliciet in de algemene sectorrisico-opslag',
        B: 'Alleen als opmerking in de IC-memo',
        C: 'Generieke sensitivity-analyse op 10% marge-erosie',
        D: 'Sensitivity met eigen aannames per functiegroep',
        E: "Volledig doorgerekend, tot in de hold-period scenario's",
      },
    },
    Q6: {
      text: 'Hoeveel werkdagen zitten er gemiddeld tussen het binnenkomen van een Information Memorandum en uw eerste gefundeerde oordeel?',
      options: {
        A: 'Meer dan 20 werkdagen',
        B: '15 tot 20 werkdagen',
        C: '10 tot 15 werkdagen',
        D: '5 tot 10 werkdagen',
        E: 'Minder dan 5 werkdagen',
      },
    },
    Q7: {
      text: 'Bij uw laatste drie dossiers: hoe vaak liet u de kernaannames toetsen door iemand die er zelf niet aan gewerkt had?',
      options: {
        A: 'Niet; het team staat zelf voor zijn aannames',
        B: 'Informeel, in een gesprek buiten het team',
        C: 'Eén keer, bij één van de drie',
        D: 'Standaard, door iemand binnen het bedrijf maar buiten het team',
        E: 'Standaard, door iemand van buiten het bedrijf',
      },
    },
    Q8: {
      text: 'Hoeveel van uw tijd gaat op aan het handmatig verzamelen, opschonen en interpreteren van data?',
      options: {
        A: 'Meer dan 70%',
        B: '50 tot 70%',
        C: '30 tot 50%',
        D: '15 tot 30%',
        E: 'Minder dan 15%; het meeste loopt geautomatiseerd',
      },
    },
    Q9: {
      text: 'Hoe vaak heeft u een actuele sectorvergelijking bij de hand?',
      options: {
        A: 'Nooit, of alleen incidenteel',
        B: 'Eén tot twee keer per jaar',
        C: 'Elk kwartaal',
        D: 'Per dossier, handmatig samengesteld',
        E: 'Per dossier, systematisch en reproduceerbaar',
      },
    },
    Q10: {
      text: 'Hoe compleet is uw onderbouwing op het moment dat een dossier af is?',
      options: {
        A: 'Ad hoc, op de cijfers die er zijn, zonder vaste structuur',
        B: 'Op historische jaarcijfers, zonder vooruitblik of benchmark',
        C: 'Met een financieel model, maar zonder sectorvergelijking',
        D: 'Met model en benchmark, maar grotendeels handmatig samengesteld',
        E: 'Compleet dossier op alle relevante dimensies, systematisch en reproduceerbaar',
      },
    },
    Q11: {
      text: 'Wanneer een deelneming onder verwachting presteert: hoe snel weet u of het eenmalig is of structureel?',
      options: {
        A: 'Pas na drie kwartalen, als het achteraf duidelijk is',
        B: 'Na twee kwartalen, uit de trendlijn',
        C: 'Binnen één kwartaal, uit eigen analyse',
        D: 'Binnen weken, uit vroege indicatoren',
        E: 'Direct, via geautomatiseerde signalen in onze systemen',
      },
    },
    Q12: {
      text: 'Hoeveel van het routinewerk van uw team — modelleren, samenvatten, benchmarken — kan AI vandaag al doen, met een senior die controleert?',
      options: {
        A: 'Vrijwel niets; het werk is te specifiek',
        B: 'Minder dan 20%',
        C: '20 tot 40%',
        D: '40 tot 60%',
        E: 'Meer dan 60%',
      },
    },
    Q13: {
      text: 'Er komt een extern rapport binnen, van een adviseur of accountant. Wat blijft daarvan structureel achter in uw organisatie?',
      options: {
        A: 'We bewaren het rapport en verder niets',
        B: 'We bespreken het, zonder formele vastlegging',
        C: 'We halen de leerpunten eruit in een interne notitie',
        D: 'We hebben een vast systeem dat de uitkomsten verwerkt',
        E: 'De uitkomsten zitten in onze eigen modellen en werkwijze, klaar voor het volgende dossier',
      },
    },
    Q14: {
      text: 'Als een senior vertrekt: hoeveel van zijn of haar kennis blijft terugvindbaar achter?',
      options: {
        A: 'Vrijwel niets; het meeste zat in zijn of haar hoofd',
        B: 'Minder dan 25%',
        C: 'Ongeveer de helft',
        D: '75% of meer, dankzij strakke documentatie',
        E: 'Vrijwel alles; het zit in de systemen, niet in de personen',
      },
    },
    Q15: {
      text: 'Hoe vaak laat u een kans liggen doordat uw team het werk niet op tijd gereed heeft?',
      options: {
        A: 'Regelmatig; capaciteit is structureel onze bottleneck',
        B: 'Een paar keer per jaar',
        C: 'Zelden, maar het gebeurt',
        D: 'Vrijwel nooit; onze capaciteit is op orde',
        E: 'Nooit; onze capaciteit overtreft de huidige dealflow',
      },
    },
  },

  en: {
    Q1: {
      text: 'How well evidenced are your files at the moment?',
      options: {
        A: 'We work largely on experience, with no set method',
        B: 'We use standard Excel models, with no set method or benchmark',
        C: 'There is a basic approach, but quality varies by file and by person',
        D: 'We follow a set method, but not yet consistently everywhere',
        E: 'Our approach is systematic, reproducible and the same everywhere',
      },
    },
    Q2: {
      text: 'Where did preparation most often get stuck on your recent files?',
      options: {
        A: 'Not enough time or capacity to prepare properly',
        B: 'The data was there, but not structured or comparable',
        C: 'There was no shared method; every file was handled differently',
        D: 'The approach was sound, but too manual: much gathering, little analysis',
        E: 'Nothing worth mentioning; we were satisfied with the preparation',
      },
    },
    Q3: {
      text: 'How much of your analytical work — modelling, comparing, summarising — could AI already take over today without loss of quality?',
      options: {
        A: 'Almost nothing; the work is too specific',
        B: 'Less than 20%',
        C: '20 to 40%',
        D: '40 to 60%',
        E: 'More than 60%; most routine work already runs automatically',
      },
    },
    Q4: {
      text: 'Which situation is most relevant to you right now?',
      options: {
        A: 'We are preparing an acquisition: buy-side analysis and deal intelligence',
        B: 'We are preparing a financing request: evidence for a bank or investor',
        C: 'We are tracking existing holdings: portfolio insight and early signals',
        D: 'We see financial headwind: first signs of stress at a holding',
        E: 'We want to analyse more deals with the same headcount',
      },
    },
    Q5: {
      text: 'Do you price the risk of AI taking over the work into the entry multiple for services targets?',
      options: {
        A: 'No; it sits implicitly in the general sector risk premium',
        B: 'Only as a remark in the IC memo',
        C: 'Generic sensitivity analysis on 10% margin erosion',
        D: 'Sensitivity with our own assumptions per role type',
        E: 'Fully worked through, down to the hold-period scenarios',
      },
    },
    Q6: {
      text: 'How many working days pass on average between an Information Memorandum arriving and your first well-founded judgement?',
      options: {
        A: 'More than 20 working days',
        B: '15 to 20 working days',
        C: '10 to 15 working days',
        D: '5 to 10 working days',
        E: 'Fewer than 5 working days',
      },
    },
    Q7: {
      text: 'On your last three files: how often did you have the core assumptions tested by someone who had not worked on them?',
      options: {
        A: 'Not at all; the team stands behind its own assumptions',
        B: 'Informally, in a conversation outside the team',
        C: 'Once, on one of the three',
        D: 'As standard, by someone inside the firm but outside the team',
        E: 'As standard, by someone outside the firm',
      },
    },
    Q8: {
      text: 'How much of your time goes into manually gathering, cleaning and interpreting data?',
      options: {
        A: 'More than 70%',
        B: '50 to 70%',
        C: '30 to 50%',
        D: '15 to 30%',
        E: 'Less than 15%; most of it runs automatically',
      },
    },
    Q9: {
      text: 'How often do you have an up-to-date sector comparison to hand?',
      options: {
        A: 'Never, or only now and then',
        B: 'Once or twice a year',
        C: 'Every quarter',
        D: 'Per file, put together by hand',
        E: 'Per file, systematic and reproducible',
      },
    },
    Q10: {
      text: 'How complete is your evidence at the moment a file is finished?',
      options: {
        A: 'Ad hoc, on whatever figures are there, with no set structure',
        B: 'On historical annual figures, with no forward view or benchmark',
        C: 'With a financial model, but no sector comparison',
        D: 'With model and benchmark, but largely put together by hand',
        E: 'A complete file across every relevant dimension, systematic and reproducible',
      },
    },
    Q11: {
      text: 'When a holding underperforms: how quickly do you know whether it is a one-off or structural?',
      options: {
        A: 'Only after three quarters, once it is clear in hindsight',
        B: 'After two quarters, from the trend line',
        C: 'Within one quarter, from our own analysis',
        D: 'Within weeks, from early indicators',
        E: 'Immediately, through automated signals in our systems',
      },
    },
    Q12: {
      text: 'How much of your team’s routine work — modelling, summarising, benchmarking — could AI already do today, with a senior checking?',
      options: {
        A: 'Almost nothing; the work is too specific',
        B: 'Less than 20%',
        C: '20 to 40%',
        D: '40 to 60%',
        E: 'More than 60%',
      },
    },
    Q13: {
      text: 'An external report comes in, from an adviser or accountant. What of it structurally stays behind in your organisation?',
      options: {
        A: 'We keep the report and nothing more',
        B: 'We discuss it, without recording anything formally',
        C: 'We pull the lessons out into an internal note',
        D: 'We have a fixed system that processes the findings',
        E: 'The findings sit in our own models and method, ready for the next file',
      },
    },
    Q14: {
      text: 'When a senior leaves: how much of their knowledge stays behind, findable?',
      options: {
        A: 'Almost nothing; most of it was in their head',
        B: 'Less than 25%',
        C: 'About half',
        D: '75% or more, thanks to tight documentation',
        E: 'Almost all of it; it sits in the systems, not in the people',
      },
    },
    Q15: {
      text: 'How often do you let an opportunity go because your team cannot get the work done in time?',
      options: {
        A: 'Regularly; capacity is a structural bottleneck for us',
        B: 'A few times a year',
        C: 'Rarely, but it happens',
        D: 'Almost never; our capacity is in order',
        E: 'Never; our capacity exceeds our current deal flow',
      },
    },
  },

  de: {
    Q1: {
      text: 'Wie gut belegt sind Ihre Dossiers derzeit?',
      options: {
        A: 'Wir arbeiten weitgehend aus Erfahrung, ohne feste Vorgehensweise',
        B: 'Wir nutzen Standard-Excel-Modelle, ohne feste Vorgehensweise oder Benchmark',
        C: 'Es gibt einen Grundansatz, aber die Qualität schwankt je Dossier und Person',
        D: 'Wir folgen einer festen Vorgehensweise, aber noch nicht überall einheitlich',
        E: 'Unser Vorgehen ist systematisch, reproduzierbar und überall gleich',
      },
    },
    Q2: {
      text: 'Woran ist die Vorbereitung bei Ihren jüngsten Dossiers am häufigsten hängengeblieben?',
      options: {
        A: 'Zu wenig Zeit oder Kapazität, um es sauber vorzubereiten',
        B: 'Die Daten waren da, aber nicht strukturiert oder vergleichbar',
        C: 'Es gab keine gemeinsame Vorgehensweise; jedes Dossier lief anders',
        D: 'Der Ansatz war gut, aber zu manuell: viel Sammeln, wenig Analysieren',
        E: 'Nichts Nennenswertes; wir waren mit der Vorbereitung zufrieden',
      },
    },
    Q3: {
      text: 'Wie viel Ihrer analytischen Arbeit — Modellieren, Vergleichen, Zusammenfassen — könnte KI heute schon ohne Qualitätsverlust übernehmen?',
      options: {
        A: 'So gut wie nichts; die Arbeit ist zu spezifisch',
        B: 'Weniger als 20%',
        C: '20 bis 40%',
        D: '40 bis 60%',
        E: 'Mehr als 60%; die meiste Routinearbeit läuft bereits automatisiert',
      },
    },
    Q4: {
      text: 'Welche Situation ist für Sie derzeit am relevantesten?',
      options: {
        A: 'Wir bereiten eine Akquisition vor: Buy-Side-Analyse und Deal Intelligence',
        B: 'Wir bereiten eine Finanzierungsanfrage vor: Herleitung für Bank oder Investor',
        C: 'Wir verfolgen bestehende Beteiligungen: Portfolioeinblick und Frühsignale',
        D: 'Wir sehen finanziellen Gegenwind: erste Anzeichen von Stress bei einer Beteiligung',
        E: 'Wir wollen mehr Deals mit derselben Besetzung analysieren',
      },
    },
    Q5: {
      text: 'Rechnen Sie das Risiko, dass KI die Arbeit übernimmt, im Entry Multiple bei Dienstleistungs-Targets mit ein?',
      options: {
        A: 'Nein; es steckt implizit im allgemeinen Branchenrisikoaufschlag',
        B: 'Nur als Anmerkung im IC-Memo',
        C: 'Generische Sensitivitätsanalyse auf 10% Margenerosion',
        D: 'Sensitivität mit eigenen Annahmen je Rollentyp',
        E: 'Vollständig durchgerechnet, bis in die Hold-Period-Szenarien',
      },
    },
    Q6: {
      text: 'Wie viele Arbeitstage vergehen im Schnitt zwischen dem Eingang eines Information Memorandums und Ihrem ersten fundierten Urteil?',
      options: {
        A: 'Mehr als 20 Arbeitstage',
        B: '15 bis 20 Arbeitstage',
        C: '10 bis 15 Arbeitstage',
        D: '5 bis 10 Arbeitstage',
        E: 'Weniger als 5 Arbeitstage',
      },
    },
    Q7: {
      text: 'Bei Ihren letzten drei Dossiers: wie oft haben Sie die Kernannahmen von jemandem prüfen lassen, der selbst nicht daran gearbeitet hat?',
      options: {
        A: 'Gar nicht; das Team steht für seine Annahmen selbst ein',
        B: 'Informell, in einem Gespräch außerhalb des Teams',
        C: 'Einmal, bei einem der drei',
        D: 'Standardmäßig, durch jemanden im Haus, aber außerhalb des Teams',
        E: 'Standardmäßig, durch jemanden außerhalb des Hauses',
      },
    },
    Q8: {
      text: 'Wie viel Ihrer Zeit geht in das manuelle Sammeln, Bereinigen und Interpretieren von Daten?',
      options: {
        A: 'Mehr als 70%',
        B: '50 bis 70%',
        C: '30 bis 50%',
        D: '15 bis 30%',
        E: 'Weniger als 15%; das meiste läuft automatisiert',
      },
    },
    Q9: {
      text: 'Wie oft haben Sie einen aktuellen Branchenvergleich zur Hand?',
      options: {
        A: 'Nie, oder nur gelegentlich',
        B: 'Ein- bis zweimal im Jahr',
        C: 'Jedes Quartal',
        D: 'Je Dossier, manuell zusammengestellt',
        E: 'Je Dossier, systematisch und reproduzierbar',
      },
    },
    Q10: {
      text: 'Wie vollständig ist Ihre Herleitung in dem Moment, in dem ein Dossier fertig ist?',
      options: {
        A: 'Ad hoc, auf den vorhandenen Zahlen, ohne feste Struktur',
        B: 'Auf historischen Jahreszahlen, ohne Ausblick oder Benchmark',
        C: 'Mit einem Finanzmodell, aber ohne Branchenvergleich',
        D: 'Mit Modell und Benchmark, aber weitgehend manuell zusammengestellt',
        E: 'Vollständiges Dossier über alle relevanten Dimensionen, systematisch und reproduzierbar',
      },
    },
    Q11: {
      text: 'Wenn eine Beteiligung unter Erwartung liegt: wie schnell wissen Sie, ob es einmalig oder strukturell ist?',
      options: {
        A: 'Erst nach drei Quartalen, wenn es im Rückblick klar ist',
        B: 'Nach zwei Quartalen, aus der Trendlinie',
        C: 'Innerhalb eines Quartals, aus eigener Analyse',
        D: 'Innerhalb von Wochen, aus Frühindikatoren',
        E: 'Sofort, über automatisierte Signale in unseren Systemen',
      },
    },
    Q12: {
      text: 'Wie viel der Routinearbeit Ihres Teams — Modellieren, Zusammenfassen, Benchmarking — könnte KI heute schon erledigen, mit einem Senior zur Kontrolle?',
      options: {
        A: 'So gut wie nichts; die Arbeit ist zu spezifisch',
        B: 'Weniger als 20%',
        C: '20 bis 40%',
        D: '40 bis 60%',
        E: 'Mehr als 60%',
      },
    },
    Q13: {
      text: 'Es kommt ein externer Bericht herein, von einem Berater oder Wirtschaftsprüfer. Was davon bleibt strukturell in Ihrer Organisation?',
      options: {
        A: 'Wir bewahren den Bericht auf, mehr nicht',
        B: 'Wir besprechen ihn, ohne formale Festhaltung',
        C: 'Wir ziehen die Lernpunkte in eine interne Notiz',
        D: 'Wir haben ein festes System, das die Ergebnisse verarbeitet',
        E: 'Die Ergebnisse stecken in unseren eigenen Modellen und Abläufen, bereit für das nächste Dossier',
      },
    },
    Q14: {
      text: 'Wenn ein Senior geht: wie viel von seinem oder ihrem Wissen bleibt auffindbar zurück?',
      options: {
        A: 'So gut wie nichts; das meiste war im Kopf',
        B: 'Weniger als 25%',
        C: 'Etwa die Hälfte',
        D: '75% oder mehr, dank straffer Dokumentation',
        E: 'So gut wie alles; es steckt in den Systemen, nicht in den Personen',
      },
    },
    Q15: {
      text: 'Wie oft lassen Sie eine Chance liegen, weil Ihr Team die Arbeit nicht rechtzeitig fertig bekommt?',
      options: {
        A: 'Regelmäßig; Kapazität ist bei uns ein struktureller Engpass',
        B: 'Ein paar Mal im Jahr',
        C: 'Selten, aber es kommt vor',
        D: 'So gut wie nie; unsere Kapazität ist in Ordnung',
        E: 'Nie; unsere Kapazität übersteigt den aktuellen Dealflow',
      },
    },
  },

  es: {
    Q1: {
      text: '¿Qué tan bien fundamentados están sus expedientes ahora mismo?',
      options: {
        A: 'Trabajamos sobre todo por experiencia, sin un método fijo',
        B: 'Usamos modelos estándar de Excel, sin método fijo ni benchmark',
        C: 'Hay un enfoque básico, pero la calidad varía según el expediente y la persona',
        D: 'Seguimos un método fijo, pero aún no de forma uniforme',
        E: 'Nuestro enfoque es sistemático, reproducible e igual en todas partes',
      },
    },
    Q2: {
      text: '¿Dónde se atascó más a menudo la preparación en sus últimos expedientes?',
      options: {
        A: 'Falta de tiempo o capacidad para prepararlo bien',
        B: 'Los datos estaban, pero sin estructurar ni comparar',
        C: 'No había un método compartido; cada expediente se abordaba distinto',
        D: 'El enfoque era bueno, pero demasiado manual: mucho recopilar, poco analizar',
        E: 'Nada reseñable; quedamos satisfechos con la preparación',
      },
    },
    Q3: {
      text: '¿Cuánto de su trabajo analítico — modelar, comparar, resumir — podría asumir ya hoy la IA sin perder calidad?',
      options: {
        A: 'Casi nada; el trabajo es demasiado específico',
        B: 'Menos del 20%',
        C: 'Del 20 al 40%',
        D: 'Del 40 al 60%',
        E: 'Más del 60%; la mayor parte del trabajo rutinario ya está automatizado',
      },
    },
    Q4: {
      text: '¿Qué situación le resulta más relevante en este momento?',
      options: {
        A: 'Preparamos una adquisición: análisis buy-side y deal intelligence',
        B: 'Preparamos una solicitud de financiación: fundamentación para banco o inversor',
        C: 'Seguimos participadas existentes: visión de cartera y señales tempranas',
        D: 'Vemos viento en contra financiero: primeras señales de tensión en una participada',
        E: 'Queremos analizar más operaciones con la misma plantilla',
      },
    },
    Q5: {
      text: '¿Incorpora el riesgo de que la IA asuma el trabajo en el múltiplo de entrada de targets de servicios?',
      options: {
        A: 'No; va implícito en la prima general de riesgo sectorial',
        B: 'Solo como comentario en el memorando al comité de inversión',
        C: 'Análisis de sensibilidad genérico sobre un 10% de erosión de margen',
        D: 'Sensibilidad con hipótesis propias por tipo de puesto',
        E: 'Totalmente calculado, hasta los escenarios de hold period',
      },
    },
    Q6: {
      text: '¿Cuántos días hábiles pasan de media entre la llegada de un Information Memorandum y su primer juicio fundado?',
      options: {
        A: 'Más de 20 días hábiles',
        B: 'De 15 a 20 días hábiles',
        C: 'De 10 a 15 días hábiles',
        D: 'De 5 a 10 días hábiles',
        E: 'Menos de 5 días hábiles',
      },
    },
    Q7: {
      text: 'En sus tres últimos expedientes: ¿cuántas veces hizo revisar las hipótesis centrales por alguien que no había trabajado en ellos?',
      options: {
        A: 'Ninguna; el equipo responde de sus propias hipótesis',
        B: 'De manera informal, en una conversación fuera del equipo',
        C: 'Una vez, en uno de los tres',
        D: 'Siempre, por alguien de la casa pero ajeno al equipo',
        E: 'Siempre, por alguien de fuera de la casa',
      },
    },
    Q8: {
      text: '¿Cuánto de su tiempo se va en recopilar, depurar e interpretar datos a mano?',
      options: {
        A: 'Más del 70%',
        B: 'Del 50 al 70%',
        C: 'Del 30 al 50%',
        D: 'Del 15 al 30%',
        E: 'Menos del 15%; casi todo está automatizado',
      },
    },
    Q9: {
      text: '¿Con qué frecuencia tiene a mano una comparativa sectorial actualizada?',
      options: {
        A: 'Nunca, o solo de forma puntual',
        B: 'Una o dos veces al año',
        C: 'Cada trimestre',
        D: 'Por expediente, montada a mano',
        E: 'Por expediente, de forma sistemática y reproducible',
      },
    },
    Q10: {
      text: '¿Cómo de completa es su fundamentación en el momento en que un expediente queda cerrado?',
      options: {
        A: 'Ad hoc, sobre las cifras que haya, sin estructura fija',
        B: 'Sobre cuentas anuales históricas, sin mirada a futuro ni benchmark',
        C: 'Con un modelo financiero, pero sin comparativa sectorial',
        D: 'Con modelo y benchmark, pero montados en gran parte a mano',
        E: 'Expediente completo en todas las dimensiones relevantes, sistemático y reproducible',
      },
    },
    Q11: {
      text: 'Cuando una participada rinde por debajo de lo esperado: ¿cuánto tarda en saber si es puntual o estructural?',
      options: {
        A: 'Solo tras tres trimestres, cuando ya se ve a posteriori',
        B: 'Tras dos trimestres, por la línea de tendencia',
        C: 'En un trimestre, por análisis propio',
        D: 'En semanas, por indicadores tempranos',
        E: 'De inmediato, por señales automatizadas en nuestros sistemas',
      },
    },
    Q12: {
      text: '¿Cuánto del trabajo rutinario de su equipo — modelar, resumir, hacer benchmark — podría hacer ya hoy la IA, con un senior revisando?',
      options: {
        A: 'Casi nada; el trabajo es demasiado específico',
        B: 'Menos del 20%',
        C: 'Del 20 al 40%',
        D: 'Del 40 al 60%',
        E: 'Más del 60%',
      },
    },
    Q13: {
      text: 'Llega un informe externo, de un asesor o un auditor. ¿Qué queda de él de forma estructural en su organización?',
      options: {
        A: 'Guardamos el informe y nada más',
        B: 'Lo comentamos, sin dejarlo por escrito de forma formal',
        C: 'Sacamos los aprendizajes en una nota interna',
        D: 'Tenemos un sistema fijo que procesa las conclusiones',
        E: 'Las conclusiones están en nuestros propios modelos y método, listas para el siguiente expediente',
      },
    },
    Q14: {
      text: 'Cuando se va un senior: ¿cuánto de su conocimiento queda de forma localizable?',
      options: {
        A: 'Casi nada; la mayor parte estaba en su cabeza',
        B: 'Menos del 25%',
        C: 'Alrededor de la mitad',
        D: 'Un 75% o más, gracias a una documentación rigurosa',
        E: 'Casi todo; está en los sistemas, no en las personas',
      },
    },
    Q15: {
      text: '¿Con qué frecuencia deja pasar una oportunidad porque su equipo no llega a tiempo con el trabajo?',
      options: {
        A: 'Con regularidad; la capacidad es un cuello de botella estructural',
        B: 'Unas cuantas veces al año',
        C: 'Rara vez, pero ocurre',
        D: 'Casi nunca; nuestra capacidad está en orden',
        E: 'Nunca; nuestra capacidad supera el flujo de operaciones actual',
      },
    },
  },

  pt: {
    Q1: {
      text: 'Quão bem fundamentados estão os seus processos neste momento?',
      options: {
        A: 'Trabalhamos sobretudo por experiência, sem método fixo',
        B: 'Usamos modelos padrão de Excel, sem método fixo nem benchmark',
        C: 'Há uma abordagem básica, mas a qualidade varia com o processo e a pessoa',
        D: 'Seguimos um método fixo, mas ainda não de forma uniforme',
        E: 'A nossa abordagem é sistemática, reproduzível e igual em todo o lado',
      },
    },
    Q2: {
      text: 'Onde é que a preparação mais vezes encalhou nos seus processos recentes?',
      options: {
        A: 'Falta de tempo ou de capacidade para preparar como deve ser',
        B: 'Os dados existiam, mas não estavam estruturados nem comparáveis',
        C: 'Não havia método partilhado; cada processo era tratado de outra maneira',
        D: 'A abordagem era boa, mas demasiado manual: muito recolher, pouco analisar',
        E: 'Nada de relevo; ficámos satisfeitos com a preparação',
      },
    },
    Q3: {
      text: 'Quanto do seu trabalho analítico — modelar, comparar, resumir — já hoje a IA conseguiria assumir sem perda de qualidade?',
      options: {
        A: 'Quase nada; o trabalho é demasiado específico',
        B: 'Menos de 20%',
        C: 'De 20 a 40%',
        D: 'De 40 a 60%',
        E: 'Mais de 60%; a maior parte do trabalho de rotina já corre automatizada',
      },
    },
    Q4: {
      text: 'Que situação lhe é mais relevante neste momento?',
      options: {
        A: 'Estamos a preparar uma aquisição: análise buy-side e deal intelligence',
        B: 'Estamos a preparar um pedido de financiamento: fundamentação para banco ou investidor',
        C: 'Acompanhamos participadas existentes: visão da carteira e sinais precoces',
        D: 'Vemos vento contrário financeiro: primeiros sinais de tensão numa participada',
        E: 'Queremos analisar mais operações com o mesmo quadro de pessoal',
      },
    },
    Q5: {
      text: 'Incorpora o risco de a IA assumir o trabalho no múltiplo de entrada em targets de serviços?',
      options: {
        A: 'Não; fica implícito no prémio geral de risco setorial',
        B: 'Apenas como observação no memorando à comissão de investimento',
        C: 'Análise de sensibilidade genérica sobre 10% de erosão de margem',
        D: 'Sensibilidade com pressupostos próprios por tipo de função',
        E: 'Totalmente calculado, até aos cenários de hold period',
      },
    },
    Q6: {
      text: 'Quantos dias úteis passam em média entre a chegada de um Information Memorandum e o seu primeiro juízo fundamentado?',
      options: {
        A: 'Mais de 20 dias úteis',
        B: 'De 15 a 20 dias úteis',
        C: 'De 10 a 15 dias úteis',
        D: 'De 5 a 10 dias úteis',
        E: 'Menos de 5 dias úteis',
      },
    },
    Q7: {
      text: 'Nos seus três últimos processos: quantas vezes mandou testar os pressupostos centrais por alguém que não tinha trabalhado neles?',
      options: {
        A: 'Nenhuma; a equipa responde pelos seus próprios pressupostos',
        B: 'De modo informal, numa conversa fora da equipa',
        C: 'Uma vez, num dos três',
        D: 'Sempre, por alguém da casa mas de fora da equipa',
        E: 'Sempre, por alguém de fora da casa',
      },
    },
    Q8: {
      text: 'Quanto do seu tempo se vai a recolher, limpar e interpretar dados à mão?',
      options: {
        A: 'Mais de 70%',
        B: 'De 50 a 70%',
        C: 'De 30 a 50%',
        D: 'De 15 a 30%',
        E: 'Menos de 15%; quase tudo corre automatizado',
      },
    },
    Q9: {
      text: 'Com que frequência tem à mão uma comparação setorial atualizada?',
      options: {
        A: 'Nunca, ou só pontualmente',
        B: 'Uma a duas vezes por ano',
        C: 'Todos os trimestres',
        D: 'Por processo, montada à mão',
        E: 'Por processo, de forma sistemática e reproduzível',
      },
    },
    Q10: {
      text: 'Quão completa é a sua fundamentação no momento em que um processo fica fechado?',
      options: {
        A: 'Ad hoc, sobre os números que existem, sem estrutura fixa',
        B: 'Sobre contas anuais históricas, sem olhar em frente nem benchmark',
        C: 'Com um modelo financeiro, mas sem comparação setorial',
        D: 'Com modelo e benchmark, mas montados em grande parte à mão',
        E: 'Processo completo em todas as dimensões relevantes, sistemático e reproduzível',
      },
    },
    Q11: {
      text: 'Quando uma participada rende abaixo do esperado: quão depressa sabe se é pontual ou estrutural?',
      options: {
        A: 'Só ao fim de três trimestres, quando já se vê a posteriori',
        B: 'Ao fim de dois trimestres, pela linha de tendência',
        C: 'Dentro de um trimestre, por análise própria',
        D: 'Em semanas, por indicadores precoces',
        E: 'De imediato, por sinais automatizados nos nossos sistemas',
      },
    },
    Q12: {
      text: 'Quanto do trabalho de rotina da sua equipa — modelar, resumir, fazer benchmark — já hoje a IA conseguiria fazer, com um sénior a verificar?',
      options: {
        A: 'Quase nada; o trabalho é demasiado específico',
        B: 'Menos de 20%',
        C: 'De 20 a 40%',
        D: 'De 40 a 60%',
        E: 'Mais de 60%',
      },
    },
    Q13: {
      text: 'Chega um relatório externo, de um consultor ou de um revisor de contas. O que fica dele, de forma estrutural, na sua organização?',
      options: {
        A: 'Guardamos o relatório e mais nada',
        B: 'Discutimo-lo, sem registo formal',
        C: 'Retiramos as aprendizagens para uma nota interna',
        D: 'Temos um sistema fixo que trata as conclusões',
        E: 'As conclusões estão nos nossos próprios modelos e método, prontas para o processo seguinte',
      },
    },
    Q14: {
      text: 'Quando um sénior sai: quanto do seu conhecimento fica para trás, localizável?',
      options: {
        A: 'Quase nada; a maior parte estava na cabeça dele',
        B: 'Menos de 25%',
        C: 'Cerca de metade',
        D: '75% ou mais, graças a documentação rigorosa',
        E: 'Quase tudo; está nos sistemas, não nas pessoas',
      },
    },
    Q15: {
      text: 'Com que frequência deixa passar uma oportunidade porque a sua equipa não tem o trabalho pronto a tempo?',
      options: {
        A: 'Com regularidade; a capacidade é um estrangulamento estrutural',
        B: 'Algumas vezes por ano',
        C: 'Raramente, mas acontece',
        D: 'Quase nunca; a nossa capacidade está em ordem',
        E: 'Nunca; a nossa capacidade excede o fluxo de operações atual',
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
      { title: 'Uw analytische aanpak vandaag', eyebrow: 'Sectie 1 van 4', description: 'Hoe systematisch werkt u bij deals, financiering en portfolio review? Deze sectie bepaalt waar u nu staat.' },
      { title: 'Uw deal- en analysecyclus', eyebrow: 'Sectie 2 van 4', description: 'Doorlooptijd tot het IC, het risico dat AI de kernactiviteit overneemt, en hoe u tot een oordeel komt. Drie plekken waar rendement weglekt.' },
      { title: 'Maandrapportage en vroegsignalering', eyebrow: 'Sectie 3 van 4', description: 'Portefeuillerapportage, financieringsmemo\'s, vroegsignalering. Kunt u op tijd bijsturen? Deze sectie meet de structuur achter uw informatie.' },
      { title: 'Kennisborging, capaciteit en AI-gereedheid', eyebrow: 'Sectie 4 van 4', description: 'Als een associate vertrekt, verdwijnt het geheugen van drie tot vijf dossiers. Deze sectie meet of uw organisatie daartegen bestand is.' },
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
  en: {
    sections: [
      { title: 'Your analytical approach today', eyebrow: 'Section 1 of 4', description: 'How systematically do you work on deals, financing and portfolio reviews? This section establishes where you stand now.' },
      { title: 'Your deal and analysis cycle', eyebrow: 'Section 2 of 4', description: 'Time to IC, the risk that AI takes over the core work, and how you reach a judgement. Three places where return leaks away.' },
      { title: 'Monthly reporting and early warning', eyebrow: 'Section 3 of 4', description: 'Portfolio reporting, financing memos, early warning. Can you correct course in time? This section measures the structure behind your information.' },
      { title: 'Knowledge retention, capacity and AI readiness', eyebrow: 'Section 4 of 4', description: 'When an associate leaves, the memory of three to five files goes with them. This section measures whether your organisation can absorb that.' },
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
      { title: 'Ihr analytischer Ansatz heute', eyebrow: 'Abschnitt 1 von 4', description: 'Wie systematisch arbeiten Sie bei Deals, Finanzierungen und Portfolio-Reviews? Dieser Abschnitt bestimmt, wo Sie heute stehen.' },
      { title: 'Ihr Deal- und Analysezyklus', eyebrow: 'Abschnitt 2 von 4', description: 'Laufzeit bis zum IC, das Risiko, dass KI die Kernarbeit übernimmt, und wie Sie zu einem Urteil kommen. Drei Stellen, an denen Rendite versickert.' },
      { title: 'Monatsbericht und Früherkennung', eyebrow: 'Abschnitt 3 von 4', description: 'Portfolioberichte, Finanzierungsmemos, Früherkennung. Können Sie rechtzeitig gegensteuern? Dieser Abschnitt misst die Struktur hinter Ihren Informationen.' },
      { title: 'Wissenssicherung, Kapazität und KI-Bereitschaft', eyebrow: 'Abschnitt 4 von 4', description: 'Geht ein Associate, verschwindet das Gedächtnis von drei bis fünf Dossiers. Dieser Abschnitt misst, ob Ihre Organisation das auffängt.' },
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
  es: {
    sections: [
      { title: 'Su enfoque analítico hoy', eyebrow: 'Sección 1 de 4', description: '¿Con qué método trabaja en operaciones, financiación y revisiones de cartera? Esta sección fija dónde está ahora.' },
      { title: 'Su ciclo de operación y análisis', eyebrow: 'Sección 2 de 4', description: 'Plazo hasta el comité, el riesgo de que la IA asuma el trabajo central y cómo llega a un juicio. Tres puntos por donde se escapa la rentabilidad.' },
      { title: 'Informe mensual y alerta temprana', eyebrow: 'Sección 3 de 4', description: 'Reporte de cartera, memorandos de financiación, alerta temprana. ¿Puede corregir a tiempo? Esta sección mide la estructura detrás de su información.' },
      { title: 'Retención de conocimiento, capacidad y preparación para la IA', eyebrow: 'Sección 4 de 4', description: 'Cuando un associate se va, se lleva la memoria de tres a cinco expedientes. Esta sección mide si su organización lo absorbe.' },
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
  pt: {
    sections: [
      { title: 'A sua abordagem analítica hoje', eyebrow: 'Secção 1 de 4', description: 'Com que método trabalha em operações, financiamento e revisões de carteira? Esta secção fixa onde está agora.' },
      { title: 'O seu ciclo de operação e análise', eyebrow: 'Secção 2 de 4', description: 'Prazo até à comissão, o risco de a IA assumir o trabalho central e como chega a um juízo. Três pontos por onde o retorno escapa.' },
      { title: 'Relatório mensal e alerta precoce', eyebrow: 'Secção 3 de 4', description: 'Reporte de carteira, memorandos de financiamento, alerta precoce. Consegue corrigir a tempo? Esta secção mede a estrutura por trás da sua informação.' },
      { title: 'Retenção de conhecimento, capacidade e preparação para a IA', eyebrow: 'Secção 4 de 4', description: 'Quando um associate sai, leva a memória de três a cinco processos. Esta secção mede se a sua organização o absorve.' },
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
};
