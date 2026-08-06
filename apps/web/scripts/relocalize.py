#!/usr/bin/env python3
"""
Carry the SB7 rewrite from nl.json into en/de/es/pt.

NL is the source language for apps/web. This pass rewrote the proposition down
to three routes — sparring & strategy, AI advisory, implementation & adoption —
deleted the Scorecard outright, and moved AI-driven due diligence off this site
and onto factumcapital.eu. Every one of those changes has to land in all five
catalogues, equivalently, not machine-translated.

The script is deliberately not a translator. It carries a hand-written table.
What it automates is the bookkeeping that is easy to get wrong by hand:

  - every key present in nl.json must exist in each locale  (guard: `missing`)
  - no locale may carry a key nl.json does not have         (guard: `stray`)
  - every key in the table must actually exist in nl.json   (guard: `unknown`)
  - key ORDER follows nl.json, so the five files stay diffable side by side
  - the JSON round-trips byte-for-byte in the repo's format

Run from apps/web:  python3 scripts/relocalize.py
"""

import json
import sys
from pathlib import Path

MESSAGES = Path(__file__).resolve().parent.parent / 'messages'
LOCALES = ['en', 'de', 'es', 'pt']

# One canonical CTA, repeated wherever a button asks for the call. Factum's
# house rule: "Primaire CTA, overal identiek" — concrete and time-bound.
CTA = {
    'en': 'Book a 20-minute call',
    'de': '20-minütiges Gespräch buchen',
    'es': 'Reserva una llamada de 20 minutos',
    'pt': 'Marque uma conversa de 20 minutos',
}

# The three route names, used verbatim in six places each. Kept in one dict so
# a rename cannot land on the pricing page and miss the homepage card.
ROUTE_1 = {
    'en': 'AI Sparring & Strategy',
    'de': 'KI-Sparring & Strategie',
    'es': 'Sparring y estrategia de IA',
    'pt': 'Sparring e estratégia de IA',
}
ROUTE_2 = {
    'en': 'AI Advisory',
    'de': 'KI-Beratung',
    'es': 'Asesoramiento en IA',
    'pt': 'Consultoria em IA',
}
ROUTE_3 = {
    'en': 'Implementation & adoption',
    'de': 'Implementierung & Adoption',
    'es': 'Implementación y adopción',
    'pt': 'Implementação e adoção',
}
ON_QUOTE = {
    'en': 'On quotation',
    'de': 'Auf Anfrage',
    'es': 'Presupuesto a medida',
    'pt': 'Sob proposta',
}

# ── The table ────────────────────────────────────────────────────────────────
# key -> {locale: text}. Only keys whose NL text changed in this pass, plus the
# keys this pass added. Everything else in the four files is left alone.
T = {
    'meta.site_description': {
        'en': 'AI advisory for private equity funds and M&A firms in the European mid-market. Sparring and strategy, advisory, implementation and adoption. Straight out of deal practice.',
        'de': 'KI-Beratung für Private-Equity-Fonds und M&A-Häuser im europäischen Mid-Market. Sparring und Strategie, Beratung, Implementierung und Adoption. Direkt aus der Dealpraxis.',
        'es': 'Asesoramiento en IA para fondos de private equity y firmas de M&A del mid-market europeo. Sparring y estrategia, asesoramiento, implementación y adopción. Desde la propia práctica de deals.',
        'pt': 'Consultoria em IA para fundos de private equity e escritórios de M&A do mid-market europeu. Sparring e estratégia, consultoria, implementação e adoção. Saída da própria prática de deals.',
    },
    'nav.cta': CTA,
    'footer.cta': CTA,
    'footer.cta_title': {
        'en': 'One conversation, twenty minutes.',
        'de': 'Ein Gespräch, zwanzig Minuten.',
        'es': 'Una conversación de veinte minutos.',
        'pt': 'Uma conversa de vinte minutos.',
    },
    'footer.cta_sub': {
        'en': 'No preparation, no invoice, no email sequence.',
        'de': 'Keine Vorbereitung, keine Rechnung, keine Mailstrecke.',
        'es': 'Sin preparación, sin factura, sin secuencia de correos.',
        'pt': 'Sem preparação, sem fatura, sem sequência de e-mails.',
    },
    'footer.tagline_bottom': {
        'en': 'Factum Capital · AI platform for M&A and restructuring',
        'de': 'Factum Capital · KI-Plattform für M&A und Restrukturierung',
        'es': 'Factum Capital · plataforma de IA para M&A y reestructuración',
        'pt': 'Factum Capital · plataforma de IA para M&A e reestruturação',
    },

    # ── homepage ────────────────────────────────────────────────────────────
    'homepage.meta_title': {
        'en': 'AI advisory for private equity and M&A',
        'de': 'KI-Beratung für Private Equity und M&A',
        'es': 'Asesoramiento en IA para private equity y M&A',
        'pt': 'Consultoria em IA para private equity e M&A',
    },
    'homepage.meta_description': {
        'en': 'AI advisory for PE funds and M&A firms in the European mid-market. Three routes: sparring and strategy, AI advisory, implementation and adoption.',
        'de': 'KI-Beratung für PE-Fonds und M&A-Häuser im europäischen Mid-Market. Drei Wege: Sparring und Strategie, KI-Beratung, Implementierung und Adoption.',
        'es': 'Asesoramiento en IA para fondos de PE y firmas de M&A del mid-market europeo. Tres rutas: sparring y estrategia, asesoramiento en IA, implementación y adopción.',
        'pt': 'Consultoria em IA para fundos de PE e escritórios de M&A do mid-market europeu. Três percursos: sparring e estratégia, consultoria em IA, implementação e adoção.',
    },
    # The eyebrow is a name plus two industry terms that stay English in all
    # five markets — translating "acquisition finance" loses the signal.
    'homepage.hero.eyebrow': {
        'en': 'Wouter Dijkman · acquisition finance & restructuring',
        'de': 'Wouter Dijkman · Acquisition Finance & Restructuring',
        'es': 'Wouter Dijkman · acquisition finance y restructuring',
        'pt': 'Wouter Dijkman · acquisition finance e restructuring',
    },
    'homepage.hero.heading': {
        'en': 'AI in your deal practice, set up by someone who did the deals.',
        'de': 'KI in Ihrer Dealpraxis, eingerichtet von jemandem, der die Deals selbst gemacht hat.',
        'es': 'IA en su práctica de deals, implantada por alguien que hizo los deals.',
        'pt': 'IA na sua prática de deals, montada por quem fez os deals.',
    },
    'homepage.hero.subtext': {
        'en': 'Agentic Mindshift sets up AI at private equity funds and M&A firms in the European mid-market. Three routes: sparring and strategy, AI advisory, implementation and adoption.',
        'de': 'Agentic Mindshift richtet KI bei Private-Equity-Fonds und M&A-Häusern im europäischen Mid-Market ein. Drei Wege: Sparring und Strategie, KI-Beratung, Implementierung und Adoption.',
        'es': 'Agentic Mindshift implanta IA en fondos de private equity y firmas de M&A del mid-market europeo. Tres rutas: sparring y estrategia, asesoramiento en IA, implementación y adopción.',
        'pt': 'A Agentic Mindshift monta IA em fundos de private equity e escritórios de M&A do mid-market europeu. Três percursos: sparring e estratégia, consultoria em IA, implementação e adoção.',
    },
    'homepage.hero.cta_primary': CTA,
    'homepage.hero.cta_secondary': {
        'en': 'See the three routes',
        'de': 'Die drei Wege ansehen',
        'es': 'Ver las tres rutas',
        'pt': 'Ver os três percursos',
    },
    'homepage.hero.trust': {
        'en': 'First call without obligation · 20 minutes · no invoice',
        'de': 'Erstgespräch unverbindlich · 20 Minuten · keine Rechnung',
        'es': 'Primera llamada sin compromiso · 20 minutos · sin factura',
        'pt': 'Primeira conversa sem compromisso · 20 minutos · sem fatura',
    },
    'homepage.hero.routes_label': {
        'en': 'Three routes',
        'de': 'Drei Wege',
        'es': 'Tres rutas',
        'pt': 'Três percursos',
    },

    'homepage.pain.eyebrow': {
        'en': 'The problem', 'de': 'Das Problem', 'es': 'El problema', 'pt': 'O problema',
    },
    'homepage.pain.heading': {
        'en': 'Three things cost you return. Rarely said out loud.',
        'de': 'Drei Dinge kosten Rendite. Selten laut ausgesprochen.',
        'es': 'Tres cosas cuestan rentabilidad. Rara vez se dicen en voz alta.',
        'pt': 'Três coisas custam retorno. Raramente ditas em voz alta.',
    },

    'homepage.founder.heading': {
        'en': 'Six years on the financing side of deals like yours.',
        'de': 'Sechs Jahre auf der Finanzierungsseite von Deals wie Ihren.',
        'es': 'Seis años en el lado de la financiación de deals como los suyos.',
        'pt': 'Seis anos do lado do financiamento de deals como os seus.',
    },
    'homepage.founder.body': {
        'en': 'Wouter Dijkman worked in acquisition finance and financial restructuring at Rabobank, ING and Alter Domus. There he saw why deals that added up on paper still ran aground. He now sets up AI at funds and firms carrying that same risk. The firm stays small: a handful of partners at a time.',
        'de': 'Wouter Dijkman arbeitete in Acquisition Finance und Financial Restructuring bei Rabobank, ING und Alter Domus. Dort sah er, warum Deals, die auf dem Papier aufgingen, dennoch scheiterten. Heute richtet er KI bei Fonds und Häusern ein, die dasselbe Risiko tragen. Das Büro bleibt klein: eine Handvoll Partner gleichzeitig.',
        'es': 'Wouter Dijkman trabajó en acquisition finance y financial restructuring en Rabobank, ING y Alter Domus. Allí vio por qué deals que cuadraban sobre el papel acababan encallando. Ahora implanta IA en fondos y firmas que corren ese mismo riesgo. La firma se mantiene pequeña: un puñado de clientes a la vez.',
        'pt': 'Wouter Dijkman trabalhou em acquisition finance e financial restructuring no Rabobank, ING e Alter Domus. Aí viu porque deals que fechavam no papel acabavam por encalhar. Agora monta IA em fundos e escritórios que correm o mesmo risco. O escritório mantém-se pequeno: um punhado de parceiros de cada vez.',
    },

    'homepage.services.eyebrow': {
        'en': 'What we do', 'de': 'Was wir tun', 'es': 'Qué hacemos', 'pt': 'O que fazemos',
    },
    'homepage.services.heading': {
        'en': 'Three routes. You pick what fits your question.',
        'de': 'Drei Wege. Sie wählen, was zu Ihrer Frage passt.',
        'es': 'Tres rutas. Usted elige la que encaja con su pregunta.',
        'pt': 'Três percursos. Escolhe o que encaixa na sua questão.',
    },
    'homepage.services.subheading': {
        'en': 'Every route begins with a no-obligation conversation and ends with a concrete result.',
        'de': 'Jeder Weg beginnt mit einem unverbindlichen Gespräch und endet mit einem konkreten Ergebnis.',
        'es': 'Cada ruta empieza con una conversación sin compromiso y termina con un resultado concreto.',
        'pt': 'Cada percurso começa com uma conversa sem compromisso e termina com um resultado concreto.',
    },
    'homepage.services.card_cta': {
        'en': 'More on this route',
        'de': 'Mehr zu diesem Weg',
        'es': 'Más sobre esta ruta',
        'pt': 'Mais sobre este percurso',
    },
    'homepage.services.title_1': ROUTE_1,
    'homepage.services.body_1': {
        'en': 'One question about AI in your deal, your process or your next decision. Twenty minutes, one summary, no follow-up unless you want it.',
        'de': 'Eine Frage zu KI in Ihrem Deal, Ihrem Prozess oder Ihrer nächsten Entscheidung. Zwanzig Minuten, eine Zusammenfassung, keine Fortsetzung, wenn Sie das nicht wollen.',
        'es': 'Una pregunta sobre IA en su deal, su proceso o su próxima decisión. Veinte minutos, un resumen, sin continuación si no la quiere.',
        'pt': 'Uma pergunta sobre IA no seu deal, no seu processo ou na sua próxima decisão. Vinte minutos, um resumo, sem continuação se não a quiser.',
    },
    'homepage.services.price_1': {
        'en': 'No obligation', 'de': 'Unverbindlich', 'es': 'Sin compromiso', 'pt': 'Sem compromisso',
    },
    'homepage.services.note_1': {
        'en': '20 minutes · no invoice',
        'de': '20 Minuten · keine Rechnung',
        'es': '20 minutos · sin factura',
        'pt': '20 minutos · sem fatura',
    },
    'homepage.services.title_2': ROUTE_2,
    'homepage.services.body_2': {
        'en': 'Where AI pays off in your practice and where it does not. Analysis of your processes, a reasoned plan, and the business case underneath it.',
        'de': 'Wo KI in Ihrer Praxis rentiert und wo nicht. Analyse Ihrer Prozesse, ein begründeter Plan und der Business Case darunter.',
        'es': 'Dónde rinde la IA en su práctica y dónde no. Análisis de sus procesos, un plan fundamentado y el business case que lo sostiene.',
        'pt': 'Onde a IA rende na sua prática e onde não. Análise dos seus processos, um plano fundamentado e o business case por baixo.',
    },
    'homepage.services.price_2': {
        'en': 'From €4,500', 'de': 'Ab 4.500 €', 'es': 'Desde 4.500 €', 'pt': 'A partir de 4.500 €',
    },
    'homepage.services.note_2': {
        'en': 'Per engagement or on retainer',
        'de': 'Pro Projekt oder als Retainer',
        'es': 'Por proyecto o en retainer',
        'pt': 'Por projeto ou em retainer',
    },
    'homepage.services.title_3': ROUTE_3,
    'homepage.services.body_3': {
        'en': 'From plan to use. Setting up the workflows, masterclasses and training, until your team works with it on its own.',
        'de': 'Vom Plan zur Nutzung. Einrichtung der Workflows, Masterclasses und Training, bis Ihr Team selbst damit arbeitet.',
        'es': 'Del plan al uso. Configuración de los flujos de trabajo, masterclasses y formación, hasta que su equipo trabaje solo con ello.',
        'pt': 'Do plano ao uso. Configuração dos fluxos de trabalho, masterclasses e formação, até a sua equipa trabalhar sozinha com isso.',
    },
    'homepage.services.price_3': ON_QUOTE,
    'homepage.services.note_3': {
        'en': 'Scope and rate after the intake',
        'de': 'Umfang und Honorar nach dem Intake',
        'es': 'Alcance y tarifa tras la reunión inicial',
        'pt': 'Âmbito e valor após a reunião inicial',
    },
    'homepage.services.foot': {
        'en': 'All amounts exclude VAT. The first conversation is always without obligation.',
        'de': 'Alle Beträge zzgl. MwSt. Das erste Gespräch ist immer unverbindlich.',
        'es': 'Todos los importes excluyen IVA. La primera conversación es siempre sin compromiso.',
        'pt': 'Todos os valores excluem IVA. A primeira conversa é sempre sem compromisso.',
    },

    # The `homepage.factum.*` block used to live here. The homepage once had its
    # own inline Factum section, with its own copy, separate from the one on
    # /werkwijze. Both were replaced by the shared <FactumBanner />, which reads
    # `factum_banner.*` — so these five keys sat in all five locale files
    # rendering nowhere, a second version of the banner text that could drift
    # from the real one unnoticed. Dropped from nl.json; the stray sweep below
    # clears them from the other four.

    # ── homepage: the plan (SB7 beat 4) ─────────────────────────────────────
    'homepage.plan.eyebrow': {
        'en': 'How it starts', 'de': 'So fängt es an', 'es': 'Así empieza', 'pt': 'É assim que começa',
    },
    'homepage.plan.heading': {
        'en': 'Three steps. The first is a conversation.',
        'de': 'Drei Schritte. Der erste ist ein Gespräch.',
        'es': 'Tres pasos. El primero es una conversación.',
        'pt': 'Três passos. O primeiro é uma conversa.',
    },
    'homepage.plan.step_1_title': {
        'en': 'A twenty-minute call',
        'de': 'Gespräch von zwanzig Minuten',
        'es': 'Llamada de veinte minutos',
        'pt': 'Conversa de vinte minutos',
    },
    'homepage.plan.step_1_body': {
        'en': 'You book a call. No preparation needed; the points that matter come up on their own.',
        'de': 'Sie buchen ein Gespräch. Vorbereitung ist nicht nötig; die relevanten Punkte kommen von selbst zur Sprache.',
        'es': 'Usted reserva una llamada. No hace falta preparación; los puntos relevantes salen solos.',
        'pt': 'Marca uma conversa. Não é preciso preparação; os pontos relevantes surgem sozinhos.',
    },
    'homepage.plan.step_2_title': {
        'en': 'A proposal within two working days',
        'de': 'Vorschlag innerhalb von zwei Werktagen',
        'es': 'Propuesta en dos días laborables',
        'pt': 'Proposta em dois dias úteis',
    },
    'homepage.plan.step_2_body': {
        'en': 'Scope, timeline, fee and what it delivers. No loose ends.',
        'de': 'Umfang, Laufzeit, Honorar und was dabei herauskommt. Keine offenen Enden.',
        'es': 'Alcance, plazos, tarifa y qué produce. Sin cabos sueltos.',
        'pt': 'Âmbito, prazos, valor e o que produz. Sem pontas soltas.',
    },
    'homepage.plan.step_3_title': {
        'en': 'Start within seven days',
        'de': 'Start innerhalb von sieben Tagen',
        'es': 'Inicio en siete días',
        'pt': 'Início em sete dias',
    },
    'homepage.plan.step_3_body': {
        'en': 'Once agreed, we start within a week, with the first concrete result inside that week.',
        'de': 'Nach Zusage starten wir innerhalb einer Woche, mit dem ersten konkreten Ergebnis in derselben Woche.',
        'es': 'Tras el acuerdo empezamos en una semana, con el primer resultado concreto dentro de esa semana.',
        'pt': 'Após o acordo começamos numa semana, com o primeiro resultado concreto ainda nessa semana.',
    },

    # ── homepage: success (SB7 beat 7) ──────────────────────────────────────
    'homepage.success.eyebrow': {
        'en': 'What changes', 'de': 'Was sich ändert', 'es': 'Qué cambia', 'pt': 'O que muda',
    },
    'homepage.success.heading': {
        'en': 'Where you stand when it works.',
        'de': 'Wo Sie stehen, wenn es funktioniert.',
        'es': 'Dónde queda usted cuando funciona.',
        'pt': 'Onde fica quando funciona.',
    },
    'homepage.success.title_1': {
        'en': 'The judgement lands earlier',
        'de': 'Das Urteil kommt früher',
        'es': 'El juicio llega antes',
        'pt': 'O juízo chega mais cedo',
    },
    'homepage.success.body_1': {
        'en': 'The analysis is ready before the investment committee needs it.',
        'de': 'Die Analyse liegt vor, bevor das Investment Committee sie braucht.',
        'es': 'El análisis está listo antes de que lo necesite el comité de inversión.',
        'pt': 'A análise está pronta antes de o comité de investimento precisar dela.',
    },
    'homepage.success.title_2': {
        'en': 'The portfolio talks back',
        'de': 'Das Portfolio meldet sich',
        'es': 'La cartera responde',
        'pt': 'A carteira responde',
    },
    'homepage.success.body_2': {
        'en': 'Deviations surface in the month they arise, not in the annual report.',
        'de': 'Abweichungen tauchen in dem Monat auf, in dem sie entstehen, nicht im Jahresbericht.',
        'es': 'Las desviaciones afloran en el mes en que se producen, no en el informe anual.',
        'pt': 'Os desvios aparecem no mês em que ocorrem, não no relatório anual.',
    },
    'homepage.success.title_3': {
        'en': 'Knowledge stays in the firm',
        'de': 'Wissen bleibt im Haus',
        'es': 'El conocimiento se queda en casa',
        'pt': 'O conhecimento fica em casa',
    },
    'homepage.success.body_3': {
        'en': 'What a file produced is on record, even when the dealmaker leaves.',
        'de': 'Was ein Dossier ergeben hat, ist festgehalten, auch wenn der Dealmaker geht.',
        'es': 'Lo que dio un expediente queda registrado, aunque el dealmaker se marche.',
        'pt': 'O que um dossiê deu fica registado, mesmo que o dealmaker saia.',
    },

    'homepage.faq.cta': CTA,
    'homepage.final_cta.heading': {
        'en': 'One conversation, twenty minutes.',
        'de': 'Ein Gespräch, zwanzig Minuten.',
        'es': 'Una conversación de veinte minutos.',
        'pt': 'Uma conversa de vinte minutos.',
    },
    'homepage.final_cta.subtext': {
        'en': 'You set the subject. No agenda, no obligation, no email sequence.',
        'de': 'Sie bestimmen das Thema. Keine Agenda, keine Verpflichtung, keine Mailstrecke.',
        'es': 'Usted marca el tema. Sin agenda, sin compromiso, sin secuencia de correos.',
        'pt': 'O tema é seu. Sem agenda, sem compromisso, sem sequência de e-mails.',
    },
    'homepage.final_cta.cta_primary': CTA,
    'homepage.final_cta.cta_secondary': {
        'en': 'See approach & rates',
        'de': 'Vorgehen & Honorare ansehen',
        'es': 'Ver método y tarifas',
        'pt': 'Ver método e valores',
    },

    'homepage.faqItems.wat_q': {
        'en': 'What exactly does Agentic Mindshift do?',
        'de': 'Was genau macht Agentic Mindshift?',
        'es': '¿Qué hace exactamente Agentic Mindshift?',
        'pt': 'O que faz exatamente a Agentic Mindshift?',
    },
    'homepage.faqItems.wat_a': {
        'en': 'We put AI to work in the practice of private equity funds and M&A firms. That runs from a single sparring session, through advice on where AI pays off, to the implementation and your team’s adoption of it.',
        'de': 'Wir bringen KI in die Praxis von Private-Equity-Fonds und M&A-Häusern. Das reicht von einer einzelnen Sparringsession über Beratung dazu, wo KI rentiert, bis zur Implementierung und der Adoption durch Ihr Team.',
        'es': 'Ponemos la IA a trabajar en la práctica de fondos de private equity y firmas de M&A. Va desde una sesión de sparring, pasando por el asesoramiento sobre dónde rinde la IA, hasta la implementación y la adopción por parte de su equipo.',
        'pt': 'Pomos a IA a trabalhar na prática de fundos de private equity e escritórios de M&A. Vai de uma sessão de sparring, passando pelo aconselhamento sobre onde a IA rende, até à implementação e à adoção pela sua equipa.',
    },
    'homepage.faqItems.investering_q': {
        'en': 'What does it cost?', 'de': 'Was kostet das?',
        'es': '¿Cuánto cuesta?', 'pt': 'Quanto custa?',
    },
    'homepage.faqItems.investering_a': {
        'en': 'The sparring session is without obligation. AI advisory starts at €4,500 per engagement, or runs on retainer. Implementation and adoption are quoted after the intake. All amounts exclude VAT.',
        'de': 'Die Sparringsession ist unverbindlich. KI-Beratung beginnt bei 4.500 € pro Projekt oder läuft als Retainer. Implementierung und Adoption werden nach dem Intake angeboten. Alle Beträge zzgl. MwSt.',
        'es': 'La sesión de sparring es sin compromiso. El asesoramiento en IA arranca en 4.500 € por proyecto o va en retainer. La implementación y la adopción se presupuestan tras la reunión inicial. Todos los importes excluyen IVA.',
        'pt': 'A sessão de sparring é sem compromisso. A consultoria em IA começa em 4.500 € por projeto ou corre em retainer. A implementação e a adoção são orçamentadas após a reunião inicial. Todos os valores excluem IVA.',
    },
    'homepage.faqItems.anders_q': {
        'en': 'What makes Agentic Mindshift different?',
        'de': 'Was unterscheidet Agentic Mindshift?',
        'es': '¿Qué hace diferente a Agentic Mindshift?',
        'pt': 'O que distingue a Agentic Mindshift?',
    },
    'homepage.faqItems.anders_a': {
        'en': 'Six years in acquisition finance and financial restructuring. The advice comes out of deal practice; the AI speeds it up. And the firm stays small: a handful of partners at a time.',
        'de': 'Sechs Jahre in Acquisition Finance und Financial Restructuring. Die Beratung kommt aus der Dealpraxis; die KI beschleunigt sie. Und das Büro bleibt klein: eine Handvoll Partner gleichzeitig.',
        'es': 'Seis años en acquisition finance y financial restructuring. El consejo sale de la práctica de deals; la IA lo acelera. Y la firma se mantiene pequeña: un puñado de clientes a la vez.',
        'pt': 'Seis anos em acquisition finance e financial restructuring. O aconselhamento sai da prática de deals; a IA acelera-o. E o escritório mantém-se pequeno: um punhado de parceiros de cada vez.',
    },
    'homepage.faqItems.start_q': {
        'en': 'How quickly can we start?',
        'de': 'Wie schnell können wir starten?',
        'es': '¿Con qué rapidez podemos empezar?',
        'pt': 'Com que rapidez podemos começar?',
    },
    'homepage.faqItems.start_a': {
        'en': 'After the first call you get a proposal within two working days, with scope, timeline and fee. Once agreed, we start within seven days.',
        'de': 'Nach dem ersten Gespräch erhalten Sie innerhalb von zwei Werktagen einen Vorschlag mit Umfang, Laufzeit und Honorar. Nach Zusage starten wir innerhalb von sieben Tagen.',
        'es': 'Tras la primera llamada recibe una propuesta en dos días laborables, con alcance, plazos y tarifa. Aceptada, empezamos en siete días.',
        'pt': 'Após a primeira conversa recebe uma proposta em dois dias úteis, com âmbito, prazos e valor. Aceite, começamos em sete dias.',
    },

    # ── contact ─────────────────────────────────────────────────────────────
    'contact.subtext': {
        'en': 'Book a twenty-minute call, or first read what an engagement costs. You set the agenda.',
        'de': 'Buchen Sie ein Gespräch von zwanzig Minuten, oder lesen Sie zuerst, was ein Projekt kostet. Sie bestimmen die Agenda.',
        'es': 'Reserve una llamada de veinte minutos, o lea primero cuánto cuesta un proyecto. Usted marca la agenda.',
        'pt': 'Marque uma conversa de vinte minutos, ou leia primeiro quanto custa um projeto. A agenda é sua.',
    },
    'contact.card_01_title': {
        'en': 'Sparring session', 'de': 'Sparringsession',
        'es': 'Sesión de sparring', 'pt': 'Sessão de sparring',
    },
    'contact.card_01_body': {
        'en': 'Twenty minutes to establish whether there is a good fit. No preparation needed, no invoice.',
        'de': 'Zwanzig Minuten, um zu klären, ob es passt. Keine Vorbereitung nötig, keine Rechnung.',
        'es': 'Veinte minutos para ver si encajamos. Sin preparación, sin factura.',
        'pt': 'Vinte minutos para ver se há encaixe. Sem preparação, sem fatura.',
    },
    'contact.card_01_cta': {
        'en': 'Book a call', 'de': 'Gespräch buchen',
        'es': 'Reservar una llamada', 'pt': 'Marcar uma conversa',
    },
    'contact.card_02_title': {
        'en': 'Approach and investment', 'de': 'Vorgehen und Investition',
        'es': 'Método e inversión', 'pt': 'Método e investimento',
    },
    'contact.card_02_body': {
        'en': 'Three routes, with the amounts alongside. Useful if you want to know what something costs first.',
        'de': 'Drei Wege, mit den Beträgen daneben. Praktisch, wenn Sie zuerst wissen wollen, was etwas kostet.',
        'es': 'Tres rutas, con los importes al lado. Útil si primero quiere saber cuánto cuesta algo.',
        'pt': 'Três percursos, com os valores ao lado. Útil se quiser primeiro saber quanto custa.',
    },
    'contact.card_02_cta': {
        'en': 'See the routes', 'de': 'Die Wege ansehen',
        'es': 'Ver las rutas', 'pt': 'Ver os percursos',
    },

    # ── over ────────────────────────────────────────────────────────────────
    # Named the three routes as "AI strategy and AI-driven due diligence" long
    # after due diligence stopped being one of them. DD now lives on Factum and
    # appears here only as a banner, so the sentence names what is actually
    # sold. Kept in step with `personDescription` in lib/jsonld.ts, which makes
    # the same claim to answer engines and must not drift from this one.
    'over.answer_first': {
        'en': 'Agentic Mindshift was founded by Wouter Dijkman, with six years of acquisition finance and financial restructuring at Rabobank, ING and Alter Domus. The firm advises European mid-market PE funds and M&A firms on AI strategy, AI advisory and implementation, out of deal practice itself.',
        'de': 'Agentic Mindshift wurde von Wouter Dijkman gegründet, mit sechs Jahren Acquisition Finance und Financial Restructuring bei Rabobank, ING und Alter Domus. Das Büro berät europäische Mid-Market-PE-Fonds und M&A-Häuser zu KI-Strategie, KI-Beratung und Implementierung, direkt aus der Dealpraxis.',
        'es': 'Agentic Mindshift fue fundada por Wouter Dijkman, con seis años de acquisition finance y financial restructuring en Rabobank, ING y Alter Domus. La firma asesora a fondos de PE y firmas de M&A del mid-market europeo en estrategia de IA, asesoramiento en IA e implementación, desde la propia práctica de deals.',
        'pt': 'A Agentic Mindshift foi fundada por Wouter Dijkman, com seis anos de acquisition finance e financial restructuring no Rabobank, ING e Alter Domus. O escritório aconselha fundos de PE e escritórios de M&A do mid-market europeu em estratégia de IA, consultoria em IA e implementação, a partir da própria prática de deals.',
    },
    # "Founder" is the loanword the Dutch source uses and it carries into EN and
    # DE unchanged, but ES and PT have ordinary words for it.
    'over.hero.role': {
        'en': 'Founder Agentic Mindshift', 'de': 'Gründer Agentic Mindshift',
        'es': 'Fundador Agentic Mindshift', 'pt': 'Fundador da Agentic Mindshift',
    },
    # Sentence fragment: the Factum Capital link is spliced in after it, and
    # para2_suffix continues the sentence. It must end mid-clause.
    'over.bio.para2_prefix': {
        'en': 'Agentic Mindshift started in October 2025. AI for Business at Nyenrode followed in November 2025. Running since 2026:',
        'de': 'Im Oktober 2025 startete Agentic Mindshift. Im November 2025 folgte AI for Business an der Nyenrode. Seit 2026 läuft',
        'es': 'Agentic Mindshift arrancó en octubre de 2025. En noviembre de 2025 siguió AI for Business en Nyenrode. Desde 2026 funciona',
        'pt': 'A Agentic Mindshift arrancou em outubro de 2025. Em novembro de 2025 seguiu-se AI for Business na Nyenrode. Desde 2026 funciona',
    },
    'over.timeline.item_5_year': {'en': '2026', 'de': '2026', 'es': '2026', 'pt': '2026'},
    'over.werkwijze_link.body': {
        'en': 'Three routes: a single sparring session, an advisory engagement, or implementation with your team.',
        'de': 'Drei Wege: eine einzelne Sparringsession, ein Beratungsprojekt oder die Implementierung bei Ihrem Team.',
        'es': 'Tres rutas: una sesión de sparring, un proyecto de asesoramiento, o la implementación con su equipo.',
        'pt': 'Três percursos: uma sessão de sparring, um projeto de consultoria, ou a implementação com a sua equipa.',
    },
    'over.contact_cta.cta1': {
        'en': 'Book a call', 'de': 'Gespräch buchen',
        'es': 'Reservar una llamada', 'pt': 'Marcar uma conversa',
    },
    'over.contact_cta.cta2': {
        'en': 'See the routes', 'de': 'Die Wege ansehen',
        'es': 'Ver las rutas', 'pt': 'Ver os percursos',
    },

    # ── werkwijze ───────────────────────────────────────────────────────────
    'werkwijze.meta_description': {
        'en': 'Three ways to work with Agentic Mindshift: AI Sparring & Strategy, AI Advisory, and implementation and adoption. Rates and timelines on one page.',
        'de': 'Drei Wege, mit Agentic Mindshift zu arbeiten: KI-Sparring & Strategie, KI-Beratung sowie Implementierung und Adoption. Honorare und Laufzeiten auf einer Seite.',
        'es': 'Tres maneras de trabajar con Agentic Mindshift: sparring y estrategia de IA, asesoramiento en IA, e implementación y adopción. Tarifas y plazos en una sola página.',
        'pt': 'Três formas de trabalhar com a Agentic Mindshift: sparring e estratégia de IA, consultoria em IA, e implementação e adoção. Valores e prazos numa só página.',
    },
    'werkwijze.hero.heading': {
        'en': 'Three routes, three situations, one first conversation.',
        'de': 'Drei Wege, drei Situationen, ein erstes Gespräch.',
        'es': 'Tres rutas, tres situaciones, una primera conversación.',
        'pt': 'Três percursos, três situações, uma primeira conversa.',
    },
    'werkwijze.hero.subtext': {
        'en': 'What each route involves, what it costs and how quickly you start. Without a quotation process up front.',
        'de': 'Was jeder Weg umfasst, was er kostet und wie schnell Sie starten. Ohne vorgeschaltetes Angebotsverfahren.',
        'es': 'Qué incluye cada ruta, cuánto cuesta y con qué rapidez empieza. Sin proceso de presupuesto previo.',
        'pt': 'O que cada percurso inclui, quanto custa e com que rapidez começa. Sem processo de orçamento prévio.',
    },
    'werkwijze.answer_first': {
        'en': 'Agentic Mindshift delivers AI advisory to private equity funds and M&A firms in the European mid-market. You choose from three routes: a no-obligation sparring session, AI advisory from €4,500 per engagement, and implementation and adoption on quotation. Every route begins without obligation and ends with a concrete result.',
        'de': 'Agentic Mindshift liefert KI-Beratung an Private-Equity-Fonds und M&A-Häuser im europäischen Mid-Market. Sie wählen aus drei Wegen: eine unverbindliche Sparringsession, KI-Beratung ab 4.500 € pro Projekt sowie Implementierung und Adoption auf Anfrage. Jeder Weg beginnt unverbindlich und endet mit einem konkreten Ergebnis.',
        'es': 'Agentic Mindshift presta asesoramiento en IA a fondos de private equity y firmas de M&A del mid-market europeo. Elija entre tres rutas: una sesión de sparring sin compromiso, asesoramiento en IA desde 4.500 € por proyecto, e implementación y adopción con presupuesto a medida. Cada ruta empieza sin compromiso y termina con un resultado concreto.',
        'pt': 'A Agentic Mindshift presta consultoria em IA a fundos de private equity e escritórios de M&A do mid-market europeu. Escolhe entre três percursos: uma sessão de sparring sem compromisso, consultoria em IA a partir de 4.500 € por projeto, e implementação e adoção sob proposta. Cada percurso começa sem compromisso e termina com um resultado concreto.',
    },
    'werkwijze.steps.step_1_title': {
        'en': 'A twenty-minute call',
        'de': 'Gespräch von zwanzig Minuten',
        'es': 'Llamada de veinte minutos',
        'pt': 'Conversa de vinte minutos',
    },
    'werkwijze.steps.step_1_body': {
        'en': 'You book a call. No preparation needed; the points that matter come up on their own.',
        'de': 'Sie buchen ein Gespräch. Vorbereitung ist nicht nötig; die relevanten Punkte kommen von selbst zur Sprache.',
        'es': 'Usted reserva una llamada. No hace falta preparación; los puntos relevantes salen solos.',
        'pt': 'Marca uma conversa. Não é preciso preparação; os pontos relevantes surgem sozinhos.',
    },
    'werkwijze.steps.step_2_title': {
        'en': 'A proposal within two working days',
        'de': 'Vorschlag innerhalb von zwei Werktagen',
        'es': 'Propuesta en dos días laborables',
        'pt': 'Proposta em dois dias úteis',
    },
    'werkwijze.steps.step_2_body': {
        'en': 'Scope, timeline, fee and what it delivers. No loose ends.',
        'de': 'Umfang, Laufzeit, Honorar und was dabei herauskommt. Keine offenen Enden.',
        'es': 'Alcance, plazos, tarifa y qué produce. Sin cabos sueltos.',
        'pt': 'Âmbito, prazos, valor e o que produz. Sem pontas soltas.',
    },
    'werkwijze.steps.step_3_title': {
        'en': 'Start within seven days',
        'de': 'Start innerhalb von sieben Tagen',
        'es': 'Inicio en siete días',
        'pt': 'Início em sete dias',
    },
    'werkwijze.steps.step_3_body': {
        'en': 'Once agreed, we start within a week. You either receive the first concrete result straight away or are scheduled for the first session.',
        'de': 'Nach Zusage starten wir innerhalb einer Woche. Sie erhalten direkt das erste konkrete Ergebnis oder werden für die erste Session eingeplant.',
        'es': 'Tras el acuerdo empezamos en una semana. Recibe de inmediato el primer resultado concreto o queda programado para la primera sesión.',
        'pt': 'Após o acordo começamos numa semana. Recebe de imediato o primeiro resultado concreto ou fica agendado para a primeira sessão.',
    },
    'werkwijze.offerings.subtext': {
        'en': 'Three situations, three routes. Don’t recognise your question straight away? One conversation is enough to settle which route fits.',
        'de': 'Drei Situationen, drei Wege. Erkennen Sie Ihre Frage nicht sofort wieder? Ein Gespräch genügt, um den passenden Weg zu bestimmen.',
        'es': 'Tres situaciones, tres rutas. ¿No reconoce su pregunta de inmediato? Basta una conversación para determinar la ruta adecuada.',
        'pt': 'Três situações, três percursos. Não reconhece logo a sua questão? Basta uma conversa para determinar o percurso certo.',
    },
    'werkwijze.offerings.guarantee_body': {
        'en': 'The sparring session costs twenty minutes and no invoice. Once an engagement is agreed you start within seven working days, with the first concrete result in that first week.',
        'de': 'Die Sparringsession kostet zwanzig Minuten und keine Rechnung. Nach Zusage zu einem Projekt starten Sie innerhalb von sieben Werktagen, mit dem ersten konkreten Ergebnis in der ersten Woche.',
        'es': 'La sesión de sparring cuesta veinte minutos y ninguna factura. Aceptado un proyecto, empieza en siete días laborables, con el primer resultado concreto en esa primera semana.',
        'pt': 'A sessão de sparring custa vinte minutos e nenhuma fatura. Aceite um projeto, começa em sete dias úteis, com o primeiro resultado concreto nessa primeira semana.',
    },
    'werkwijze.offering_1.title': ROUTE_1,
    'werkwijze.offering_2.title': ROUTE_2,
    'werkwijze.offering_2.situation': {
        'en': 'You want to know where AI pays off in your practice and where it does not. Analysis of your processes, a reasoned plan, and the business case underneath it.',
        'de': 'Sie wollen wissen, wo KI in Ihrer Praxis rentiert und wo nicht. Analyse Ihrer Prozesse, ein begründeter Plan und der Business Case darunter.',
        'es': 'Quiere saber dónde rinde la IA en su práctica y dónde no. Análisis de sus procesos, un plan fundamentado y el business case que lo sostiene.',
        'pt': 'Quer saber onde a IA rende na sua prática e onde não. Análise dos seus processos, um plano fundamentado e o business case por baixo.',
    },
    'werkwijze.offering_3.badge': {
        'en': 'Per engagement or retainer',
        'de': 'Projektbasiert oder Retainer',
        'es': 'Por proyecto o retainer',
        'pt': 'Por projeto ou retainer',
    },
    'werkwijze.offering_3.title': ROUTE_3,
    'werkwijze.offering_3.situation': {
        'en': 'The plan is in place. Now your team has to work with it daily: setting up the workflows, masterclasses and training until adoption holds.',
        'de': 'Der Plan liegt vor. Jetzt muss Ihr Team täglich damit arbeiten: Einrichtung der Workflows, Masterclasses und Training, bis die Adoption steht.',
        'es': 'El plan ya está. Ahora su equipo tiene que trabajar con él a diario: configuración de los flujos, masterclasses y formación hasta que la adopción se sostenga.',
        'pt': 'O plano está feito. Agora a sua equipa tem de trabalhar com ele diariamente: configuração dos fluxos, masterclasses e formação até a adoção se aguentar.',
    },
    'werkwijze.offering_3.price_note': {
        'en': 'Scope and rate are set after the intake',
        'de': 'Umfang und Honorar werden nach dem Intake festgelegt',
        'es': 'El alcance y la tarifa se fijan tras la reunión inicial',
        'pt': 'O âmbito e o valor são definidos após a reunião inicial',
    },
    'werkwijze.offering_3.cta': {
        'en': 'Book an introduction →',
        'de': 'Kennenlernen buchen →',
        'es': 'Reservar una toma de contacto →',
        'pt': 'Marcar um primeiro contacto →',
    },
    'werkwijze.offering_3.price': ON_QUOTE,
    'werkwijze.risk.body': {
        'en': 'The sparring session costs twenty minutes and no invoice. Once agreed you start within seven working days, with the first concrete result.',
        'de': 'Die Sparringsession kostet zwanzig Minuten ohne Rechnung. Nach Zusage starten Sie innerhalb von sieben Werktagen mit dem ersten konkreten Ergebnis.',
        'es': 'La sesión de sparring cuesta veinte minutos sin factura. Aceptado el encargo, empieza en siete días laborables con el primer resultado concreto.',
        'pt': 'A sessão de sparring custa vinte minutos sem fatura. Aceite o trabalho, começa em sete dias úteis com o primeiro resultado concreto.',
    },
    'werkwijze.faq.a1': {
        'en': 'Start with a sparring session: one question, one summary, no follow-up.',
        'de': 'Beginnen Sie mit einer Sparringsession: eine Frage, eine Zusammenfassung, keine Fortsetzung.',
        'es': 'Empiece con una sesión de sparring: una pregunta, un resumen, sin continuación.',
        'pt': 'Comece com uma sessão de sparring: uma pergunta, um resumo, sem continuação.',
    },
    'werkwijze.faq.q3': {
        'en': 'Are we locked into a long term?',
        'de': 'Binden wir uns an eine lange Laufzeit?',
        'es': '¿Quedamos atados a un plazo largo?',
        'pt': 'Ficamos presos a um prazo longo?',
    },
    'werkwijze.faq.a3': {
        'en': 'Sparring, advisory and implementation all go per engagement. There is no minimum term and no notice period.',
        'de': 'Sparring, Beratung und Implementierung laufen pro Auftrag. Es gibt keine Mindestlaufzeit und keine Kündigungsfrist.',
        'es': 'El sparring, el asesoramiento y la implementación van por encargo. No hay plazo mínimo ni preaviso.',
        'pt': 'O sparring, a consultoria e a implementação vão por encomenda. Não há prazo mínimo nem pré-aviso.',
    },
    'werkwijze.faq.q4': {
        'en': 'And AI-driven due diligence on a deal?',
        'de': 'Und KI-gestützte Due Diligence auf einem Deal?',
        'es': '¿Y la due diligence con IA sobre una operación?',
        'pt': 'E a due diligence com IA sobre uma transação?',
    },
    'werkwijze.faq.a4': {
        'en': 'That work runs through Factum Capital, our AI platform, at factumcapital.eu. We refer you on and stay involved.',
        'de': 'Diese Arbeit läuft über Factum Capital, unsere KI-Plattform, auf factumcapital.eu. Wir verweisen Sie weiter und bleiben eingebunden.',
        'es': 'Ese trabajo va por Factum Capital, nuestra plataforma de IA, en factumcapital.eu. Le derivamos y seguimos implicados.',
        'pt': 'Esse trabalho corre pela Factum Capital, a nossa plataforma de IA, em factumcapital.eu. Encaminhamos e mantemo-nos envolvidos.',
    },
    'werkwijze.cta.heading': {
        'en': 'Not sure which route fits?',
        'de': 'Nicht sicher, welcher Weg passt?',
        'es': '¿No sabe qué ruta encaja?',
        'pt': 'Não sabe que percurso encaixa?',
    },
    'werkwijze.cta.subtext': {
        'en': 'One twenty-minute conversation is enough to settle it.',
        'de': 'Ein Gespräch von zwanzig Minuten genügt, um das zu klären.',
        'es': 'Basta una conversación de veinte minutos para determinarlo.',
        'pt': 'Basta uma conversa de vinte minutos para o determinar.',
    },
    'werkwijze.cta.primary': CTA,

    # ── privacy — a site with no forms ──────────────────────────────────────
    'privacy.s2_body': {
        'en': 'This site has no forms. We only collect data you send us yourself: the content of your email, and the name, email address and appointment details you provide when you book a call through our scheduling link. In addition we process technical data such as IP address and user agent in standard hosting logs.',
        'de': 'Diese Website hat keine Formulare. Wir erheben ausschließlich Daten, die Sie uns selbst senden: den Inhalt Ihrer E-Mail sowie Name, E-Mail-Adresse und Termindaten, die Sie angeben, wenn Sie über unseren Kalenderlink ein Gespräch buchen. Daneben verarbeiten wir technische Daten wie IP-Adresse und User-Agent in Standard-Hosting-Logs.',
        'es': 'Este sitio no tiene formularios. Solo recogemos los datos que usted mismo nos envía: el contenido de su correo, y el nombre, la dirección de correo y los datos de la cita que facilita al reservar una llamada a través de nuestro enlace de agenda. Además tratamos datos técnicos como la dirección IP y el user-agent en los registros estándar de alojamiento.',
        'pt': 'Este site não tem formulários. Apenas recolhemos os dados que nos envia: o conteúdo do seu e-mail e o nome, o endereço de e-mail e os dados da marcação que indica ao marcar uma conversa através do nosso link de agenda. Além disso tratamos dados técnicos como endereço IP e user-agent nos registos padrão de alojamento.',
    },
    'privacy.s3_li1': {
        'en': 'Scheduling and holding an introductory call — performance of a contract.',
        'de': 'Das Planen und Führen eines Kennenlerngesprächs — Vertragserfüllung.',
        'es': 'Programar y mantener una llamada de presentación — ejecución de un contrato.',
        'pt': 'Agendar e realizar uma conversa de apresentação — execução de contrato.',
    },
    'privacy.s3_li2': {
        'en': 'Answering your email and following up on it — legitimate interest.',
        'de': 'Die Beantwortung Ihrer E-Mail und deren Nachverfolgung — berechtigtes Interesse.',
        'es': 'Responder a su correo y su seguimiento — interés legítimo.',
        'pt': 'Responder ao seu e-mail e o respetivo seguimento — interesse legítimo.',
    },
    'privacy.s3_li3': {
        'en': 'Securing the website and keeping it available — legitimate interest.',
        'de': 'Die Absicherung und Verfügbarkeit der Website — berechtigtes Interesse.',
        'es': 'Proteger el sitio web y mantenerlo disponible — interés legítimo.',
        'pt': 'Proteger o site e mantê-lo disponível — interesse legítimo.',
    },
    'privacy.s4_body': {
        'en': 'We keep correspondence and appointment details for a maximum of 24 months after the last contact, unless you ask us to delete them sooner. Hosting logs are deleted after thirty days. Data belonging to an ongoing engagement is kept for as long as statutory retention periods require.',
        'de': 'Korrespondenz und Termindaten bewahren wir maximal 24 Monate nach dem letzten Kontakt auf, sofern Sie nicht eine frühere Löschung verlangen. Hosting-Logs werden nach dreißig Tagen gelöscht. Daten, die zu einem laufenden Auftrag gehören, bewahren wir so lange auf, wie es die gesetzlichen Aufbewahrungsfristen verlangen.',
        'es': 'Conservamos la correspondencia y los datos de las citas un máximo de 24 meses desde el último contacto, salvo que solicite su supresión antes. Los registros de alojamiento se eliminan a los treinta días. Los datos vinculados a un encargo en curso se conservan mientras lo exijan los plazos legales de conservación.',
        'pt': 'Conservamos a correspondência e os dados de marcações no máximo 24 meses após o último contacto, salvo se pedir a eliminação antes. Os registos de alojamento são apagados ao fim de trinta dias. Os dados ligados a um trabalho em curso são conservados enquanto os prazos legais de conservação o exigirem.',
    },
    'privacy.s8_body': {
        'en': 'The website sets no cookies. Visits are counted with Plausible Analytics: no cookie, no fingerprint, no profile across websites. What is recorded is page, referring site, country and device type. Nothing is placed on your device for that count. That is why there is no cookie banner on this site. If you book a call through our scheduling link, that provider’s terms apply on their page.',
        'de': 'Die Website setzt keine Cookies. Besuche werden mit Plausible Analytics gezählt: kein Cookie, kein Fingerprint, kein websiteübergreifendes Profil. Erfasst werden Seite, verweisende Website, Land und Gerätetyp. Für diese Zählung wird nichts auf Ihrem Gerät abgelegt. Deshalb gibt es auf dieser Website kein Cookie-Banner. Buchen Sie über unseren Kalenderlink ein Gespräch, gelten auf jener Seite die Bedingungen des betreffenden Anbieters.',
        'es': 'El sitio no coloca cookies. Las visitas se cuentan con Plausible Analytics: sin cookie, sin fingerprint, sin perfil entre sitios. Se registran la página, el sitio de origen, el país y el tipo de dispositivo. Para ese recuento no se coloca nada en su dispositivo. Por eso no hay banner de cookies en este sitio. Si reserva una llamada a través de nuestro enlace de agenda, en esa página se aplican las condiciones de dicho proveedor.',
        'pt': 'O site não coloca cookies. As visitas são contadas com o Plausible Analytics: sem cookie, sem fingerprint, sem perfil entre sites. São registados a página, o site de origem, o país e o tipo de dispositivo. Para essa contagem nada é colocado no seu dispositivo. Por isso não há banner de cookies neste site. Se marcar uma conversa através do nosso link de agenda, nessa página aplicam-se as condições desse fornecedor.',
    },

    # ── voorwaarden ─────────────────────────────────────────────────────────
    'voorwaarden.s1_body': {
        'en': 'In these terms, "Agentic Mindshift" means the sole proprietorship of Wouter Dijkman, established in the Netherlands. "Client" means the natural or legal person who commissions work or uses the website.',
        'de': 'In diesen Bedingungen bezeichnet „Agentic Mindshift" das Einzelunternehmen von Wouter Dijkman mit Sitz in den Niederlanden. „Auftraggeber" bezeichnet die natürliche oder juristische Person, die einen Auftrag erteilt oder die Website nutzt.',
        'es': 'En estas condiciones se entiende por "Agentic Mindshift" la empresa individual de Wouter Dijkman, establecida en los Países Bajos. Por "cliente" se entiende la persona física o jurídica que encarga un trabajo o utiliza el sitio web.',
        'pt': 'Nestas condições entende-se por "Agentic Mindshift" a empresa em nome individual de Wouter Dijkman, estabelecida nos Países Baixos. Por "cliente" entende-se a pessoa singular ou coletiva que encomenda um trabalho ou utiliza o site.',
    },
    'voorwaarden.s2_body': {
        'en': 'These terms apply to all use of the website agenticmindshift.nl and to all engagements in which Agentic Mindshift acts as contractor. Deviations apply only if agreed in writing.',
        'de': 'Diese Bedingungen gelten für jede Nutzung der Website agenticmindshift.nl und für alle Aufträge, bei denen Agentic Mindshift als Auftragnehmer auftritt. Abweichungen gelten nur, wenn sie schriftlich vereinbart wurden.',
        'es': 'Estas condiciones se aplican a todo uso del sitio web agenticmindshift.nl y a todos los encargos en los que Agentic Mindshift actúa como contratista. Las desviaciones solo son válidas si se acuerdan por escrito.',
        'pt': 'Estas condições aplicam-se a qualquer utilização do site agenticmindshift.nl e a todos os trabalhos em que a Agentic Mindshift atua como prestador. Os desvios só são válidos se acordados por escrito.',
    },
    'voorwaarden.s3_body': {
        'en': 'Engagements are performed as a best-efforts obligation, unless expressly agreed otherwise. The content of advice, reports and sparring sessions does not constitute investment or financial advice within the meaning of the Dutch Financial Supervision Act.',
        'de': 'Aufträge werden als Bemühensverpflichtung ausgeführt, sofern nicht ausdrücklich anders vereinbart. Der Inhalt von Beratung, Berichten und Sparringsessions stellt keine Anlage- oder Finanzberatung im Sinne des niederländischen Finanzaufsichtsgesetzes dar.',
        'es': 'Los encargos se ejecutan como obligación de medios, salvo acuerdo expreso en contrario. El contenido de los asesoramientos, informes y sesiones de sparring no constituye asesoramiento de inversión ni financiero en el sentido de la Ley neerlandesa de supervisión financiera.',
        'pt': 'Os trabalhos são executados como obrigação de meios, salvo acordo expresso em contrário. O conteúdo dos aconselhamentos, relatórios e sessões de sparring não constitui aconselhamento de investimento ou financeiro na aceção da Lei neerlandesa de supervisão financeira.',
    },
    # Carried a free-cancellation window for "AI-driven Due Diligence
    # engagements" — a thing the firm no longer sells, so the clause governed
    # nothing while the routes it does sell went uncovered. The window now
    # attaches to single sparring sessions (route one), and the workshop clause
    # picks up training, which is how the adoption route is delivered.
    'voorwaarden.s5_body': {
        'en': 'Retainer engagements have a minimum duration of three months and are thereafter terminable monthly with a notice period of one month. Single sparring sessions may be rescheduled or cancelled without charge up to three working days before the agreed date. Workshops and training are non-cancellable within ten working days before the agreed date.',
        'de': 'Retainer-Aufträge haben eine Mindestlaufzeit von drei Monaten und sind danach monatlich mit einer Kündigungsfrist von ebenfalls einem Monat kündbar. Einzelne Sparringsessions können bis zu drei Werktage vor dem vereinbarten Termin kostenlos verschoben oder storniert werden. Workshops und Schulungen können innerhalb von zehn Werktagen vor dem vereinbarten Termin nicht storniert werden.',
        'es': 'Los retainers tienen una duración mínima de tres meses y son rescindibles mensualmente a partir de entonces con un preaviso de un mes. Las sesiones de sparring sueltas pueden reprogramarse o cancelarse sin coste hasta tres días laborables antes de la fecha acordada. Los talleres y las formaciones no son cancelables en los diez días laborables anteriores a la fecha acordada.',
        'pt': 'Os retainers têm uma duração mínima de três meses e são rescindíveis mensalmente a partir daí com um pré-aviso de um mês. As sessões de sparring avulsas podem ser remarcadas ou canceladas sem custo até três dias úteis antes da data acordada. Os workshops e as formações não são canceláveis nos dez dias úteis anteriores à data acordada.',
    },

    # ── factum banner ───────────────────────────────────────────────────────
    'factum_banner.eyebrow': {
        'en': 'The platform behind it',
        'de': 'Die Plattform dahinter',
        'es': 'La plataforma detrás',
        'pt': 'A plataforma por trás',
    },
    'factum_banner.heading': {
        'en': 'Factum Capital', 'de': 'Factum Capital',
        'es': 'Factum Capital', 'pt': 'Factum Capital',
    },
    'factum_banner.body': {
        'en': 'AI-driven due diligence and portfolio monitoring run through Factum Capital, our AI platform. 23 modules, five moments: buying, financing, holding, selling and restructuring.',
        'de': 'KI-gestützte Due Diligence und Portfolio-Monitoring laufen über Factum Capital, unsere KI-Plattform. 23 Module, fünf Momente: Kaufen, Finanzieren, Halten, Verkaufen und Restrukturieren.',
        'es': 'La due diligence con IA y la monitorización de cartera van por Factum Capital, nuestra plataforma de IA. 23 módulos, cinco momentos: comprar, financiar, mantener, vender y reestructurar.',
        'pt': 'A due diligence com IA e a monitorização de carteira correm pela Factum Capital, a nossa plataforma de IA. 23 módulos, cinco momentos: comprar, financiar, manter, vender e reestruturar.',
    },
    'factum_banner.cta': {
        'en': 'Go to factumcapital.eu',
        'de': 'Zu factumcapital.eu',
        'es': 'Ir a factumcapital.eu',
        'pt': 'Ir para factumcapital.eu',
    },
}


def get(tree, path):
    node = tree
    for part in path.split('.'):
        if not isinstance(node, dict) or part not in node:
            return None, False
        node = node[part]
    return node, True


def build(nl_node, loc_node, table, locale, path=''):
    """Rebuild a locale subtree in nl.json's key order.

    Value precedence: the hand-written table, then the locale's existing
    string, then a hard failure. Never the Dutch — a silently untranslated
    string is worse than a build that stops.
    """
    out = {}
    for key, nl_val in nl_node.items():
        full = f'{path}.{key}' if path else key
        if isinstance(nl_val, dict):
            out[key] = build(nl_val, (loc_node or {}).get(key, {}), table, locale, full)
        elif full in table:
            out[key] = table[full][locale]
        elif isinstance(loc_node, dict) and key in loc_node:
            out[key] = loc_node[key]
        else:
            raise SystemExit(f'{locale}: no text for "{full}" — add it to the table')
    return out


def flat(node, path=''):
    out = {}
    if isinstance(node, dict):
        for k, v in node.items():
            out.update(flat(v, f'{path}.{k}' if path else k))
    else:
        out[path] = node
    return out


def main():
    nl = json.loads((MESSAGES / 'nl.json').read_text(encoding='utf-8'))
    nl_keys = set(flat(nl))

    unknown = sorted(k for k in T if k not in nl_keys)
    if unknown:
        raise SystemExit('table has keys nl.json does not: ' + ', '.join(unknown))

    for locale in LOCALES:
        path = MESSAGES / f'{locale}.json'
        before = json.loads(path.read_text(encoding='utf-8'))
        rebuilt = build(nl, before, T, locale)

        out_keys = set(flat(rebuilt))
        missing = sorted(nl_keys - out_keys)
        stray = sorted(out_keys - nl_keys)
        if missing or stray:
            raise SystemExit(f'{locale}: missing={missing} stray={stray}')

        text = json.dumps(rebuilt, ensure_ascii=False, indent=2) + '\n'
        assert json.dumps(json.loads(text), ensure_ascii=False, indent=2) + '\n' == text
        path.write_text(text, encoding='utf-8')

        dropped = len(set(flat(before)) - out_keys)
        changed = sum(1 for k, v in flat(rebuilt).items()
                      if flat(before).get(k) != v)
        print(f'{locale}: {len(out_keys)} keys · {changed} rewritten · {dropped} dropped')

    print(f'\nnl.json: {len(nl_keys)} keys — all four locales now match it exactly.')


if __name__ == '__main__':
    main()
