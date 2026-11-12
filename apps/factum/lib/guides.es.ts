import type { Guide, GuideChrome } from './guides';
import type { GuideSlug } from './guideRoutes';

/**
 * Spanish (es-ES) copy for the three decision pages. Translated from the `en`
 * entry of GUIDES in lib/guides.ts, with `nl` as a cross-check. The rules in
 * the header of lib/guides.ts apply unchanged. Terminology follows
 * messages/es.json: "data room", "hallazgo", "revisor", "target", usted.
 */

export const CHROME_ES: GuideChrome = {
  tocLabel: 'En esta página',
  relatedLabel: 'Siga leyendo',
  guidesLabel: 'Guías',
  governanceLabel: 'Cómo se tratan sus documentos'
};

const PUBLISHED = '2026-10-21';

export const GUIDES_ES: Record<GuideSlug, Guide> = {
  'data-room-checklist': {
    metaTitle: 'Checklist del data room antes de una venta',
    metaDescription:
      'Lo que un comprador pedirá en un data room, por disciplina: los documentos, las lagunas que más cuestan y cuándo empezar. Para vendedores y brokers.',
    shortName: 'Checklist del data room',
    h1: '¿Qué debe contener un data room antes de una venta?',
    answer:
      'Lo que pedirá un comprador, en una forma que un comprador pueda usar: cifras que cuadran, los contratos que sostienen los ingresos, personal, fiscal, legal y propiedad intelectual, cada bloque completo y fácil de encontrar. Las lagunas que más cuestan son las silenciosas: un contrato que nadie archivó, un año que falta en una exportación, dos documentos con cifras distintas.',
    sections: [
      {
        heading: '¿Qué documentos espera un comprador?',
        bullets: [
          'Financiero: cuentas anuales de los tres últimos ejercicios, cuentas de gestión y cifras mensuales, capital circulante, deuda y partidas asimilables a deuda, y los ajustes que hay detrás del EBITDA del cuaderno de venta.',
          'Comercial: una lista de clientes con ingresos por cliente, los mayores contratos con clientes, precios y descuentos, tasa de abandono.',
          'Legal: documentación societaria, contratos relevantes y sus cláusulas de cambio de control, garantías, litigios.',
          'Fiscal: declaraciones y liquidaciones, posiciones abiertas, la estructura del grupo.',
          'RR. HH.: contratos de las personas clave, planes de pensiones, convenios colectivos.',
          'Operativo: proveedores clave, puntos únicos de fallo, plazos de entrega.',
          'Tecnología e IA: licencias, de quién son los datos, de qué modelos depende el negocio.'
        ],
        after: [
          'La lista exacta sigue la operación. Una ronda de capital pide un plan de uso de fondos; una venta, la cartera de pedidos.'
        ]
      },
      {
        heading: '¿Y si un documento está, pero no responde a la pregunta?',
        paragraphs: [
          'Entonces un comprador lo lee como una laguna, y pregunta. Una lista de clientes sin ingresos por cliente es el caso típico: presente en el data room, inútil para la pregunta que tiene un comprador.'
        ]
      },
      {
        heading: '¿Y las cifras que se contradicen?',
        paragraphs: [
          'Unos ingresos en las cuentas de gestión que no coinciden con las cuentas anuales. Una plantilla en la exportación de RR. HH. que no cuadra con las nóminas. Un comprador encontrará ambas fuentes. Encuéntrelas usted antes, y tenga la explicación preparada.'
        ]
      },
      {
        heading: '¿Por qué cuesta tanto ver que falta un documento?',
        paragraphs: [
          'Porque una ausencia no deja rastro. El contrato que nadie archivó, el año que falta en la exportación de nóminas: no hay pasaje que citar, así que nadie tropieza con ello al leer. Solo aparece cuando el data room se contrasta con una lista de lo que espera un comprador.'
        ]
      },
      {
        heading: '¿Cuándo debe empezar un vendedor?',
        paragraphs: [
          'Lo bastante pronto como para que la respuesta a un hallazgo aún pueda ser «ya lo hemos arreglado». Una vez el data room está abierto, la respuesta honesta pasa a ser «lo sabemos, y este es el contexto». Las dos funcionan. La primera vale más.'
        ]
      },
      {
        heading: '¿Cómo revisa Factum un data room?',
        paragraphs: [
          'Factum lee el data room como lo hará un comprador: qué falta todavía, qué no cuadra y qué riesgos planteará un comprador. Cada punto pasa primero por su equipo, porque un contrato archivado dentro de otro fichero puede aparecer como ausente.',
          'No sustituye un informe de vendor due diligence de un asesor, y no es un servicio de limpieza. Señala lo que falta; conseguirlo sigue siendo cosa del vendedor. Vea [lo que la IA no puede hacer](/limits-of-ai).'
        ]
      }
    ],
    helps: {
      heading: 'Para brokers del lado vendedor',
      bullets: [
        'El data room de su cliente leído como lo leerá un comprador, antes de que lo haga el comprador.',
        'Los documentos que faltan y las preguntas abiertas llegan a su cliente como una sola solicitud, dentro de la plataforma.',
        'Las cifras que se contradicen, con ambas fuentes identificadas.',
        'Su equipo valora cada punto. Factum no firma nada.'
      ],
      note: 'Más sobre [Factum para vendedores y brokers](/pre-sale).'
    },
    datePublished: PUBLISHED
  },
  'due-diligence-timeline': {
    metaTitle: '¿Cuánto dura la due diligence?',
    metaDescription:
      'En qué se va el tiempo de una due diligence, dónde se ganan días, qué no se acelera y por qué Factum no da una fecha antes de haber visto el data room.',
    shortName: 'Cuánto dura la due diligence',
    h1: '¿Cuánto dura la due diligence?',
    answer:
      'Más de lo que permitirían la mayoría de los periodos de exclusividad. Un quality of earnings por sí solo cubre una dimensión en cuatro a diez semanas. La mayor parte del tiempo se va en leer, esperar y reclamar documentos, no en el juicio. La pasada del pipeline de Factum dura horas; la revisión de su equipo viene después, a su ritmo.',
    sections: [
      {
        heading: '¿En qué se va el tiempo?',
        bullets: [
          'Leer. Un equipo con plazos lee una muestra del data room y aun así se queda sin días.',
          'Esperar turno. Los especialistas trabajan uno tras otro: fiscal espera a la lectura financiera y legal, la valoración espera a fiscal.',
          'Reclamar. Los documentos que nunca se subieron se descubren tarde, se piden y se vuelven a leer cuando llegan.',
          'Conciliar. Hay que cotejar informes separados entre sí antes de que nadie pueda decir qué significan para el precio.'
        ]
      },
      {
        heading: '¿Dónde se pueden ganar días?',
        paragraphs: [
          'Sobre todo en los tres primeros. Factum lee cada documento en lugar de una muestra, ejecuta a la vez los módulos que no dependen unos de otros y enumera lo que falta al principio en lugar de al final.',
          'Los días salen de trabajar en paralelo, no de que una respuesta concreta llegue antes. Cómo se fija el orden se explica en [la página de la plataforma](/platform).'
        ]
      },
      {
        heading: '¿Qué no se acelera?',
        bullets: [
          'El juicio de su revisor sobre lo que es material.',
          'Las respuestas del vendedor a sus preguntas, y los documentos que aún faltan por llegar.',
          'La negociación del precio y del contrato de compraventa.'
        ],
        after: [
          'El software acorta la lectura y la espera. Las conversaciones que abren los hallazgos duran lo que duran.'
        ]
      },
      {
        heading: '¿Cómo se acorta antes de empezar?',
        steps: [
          'Consiga la lista de lo que falta en los primeros días, cuando todavía hay tiempo para pedirlo.',
          'Informe a sus asesores de lo que contiene realmente el data room, para que sus horas vayan donde está el riesgo.',
          'Como vendedor, prepare el data room antes de que empiece el proceso: [qué debe contener un data room](/data-room-checklist).'
        ]
      },
      {
        heading: '¿Por qué Factum no promete una fecha por adelantado?',
        paragraphs: [
          'Porque la duración depende del tamaño y del estado del data room, y aún no lo hemos visto. La llamada para acordar el NDA y el data room dura treinta minutos. Días después lee usted los hallazgos, fuente por fuente.'
        ]
      }
    ],
    helps: {
      heading: 'Lo que Factum cambia en los plazos',
      bullets: [
        'La pasada del pipeline dura horas, en {disciplines} disciplinas.',
        'Cada hallazgo llega con su documento de origen y su ubicación, listo para su revisor.',
        'La lista de lo que nunca llegó, desde la primera pasada.',
        'Su equipo revisa y aprueba en la plataforma, a su propio ritmo.'
      ],
      note: 'Legal y fiscal están ajustados al derecho neerlandés; para un target en otro país, que los revisen asesores jurídicos locales. Una operación que cerró el año pasado sirve como prueba.'
    },
    datePublished: PUBLISHED
  },
  'when-not-to-use-factum': {
    metaTitle: 'Cuándo la due diligence con IA no encaja',
    metaDescription:
      'Seis casos en los que Factum no encaja: una opinión firmada, legal o fiscal extranjero, revisión de código, antecedentes, sin data room o decidir por usted.',
    shortName: 'Cuándo Factum no encaja',
    h1: '¿Cuándo no es Factum la herramienta adecuada?',
    answer:
      'Cuando la operación necesita una firma, una jurisdicción o un tipo de revisión que Factum no ofrece. Factum lee cada documento del data room y cita cada hallazgo con su fuente y su ubicación. Su propio revisor decide qué importa y da el visto bueno. Estos son los casos en los que necesita otra cosa, o algo más al lado.',
    sections: [
      {
        heading: 'Necesita una opinión firmada',
        paragraphs: [
          'Un informe de quality of earnings o de vendor due diligence sale de un encargo aparte a un auditor o asesor que lo firma, y un banco o un comprador puede apoyarse en ese informe. Factum no sustituye ese informe, no da aseguramiento y no firma nada. Su revisor aprueba los hallazgos para su propio uso.',
          'Si la financiación o el contrato de compraventa exigen un informe firmado, encárguelo. Factum puede funcionar a su lado, en {disciplines} disciplinas, para que los especialistas partan de lo que contiene realmente el data room.'
        ]
      },
      {
        heading: 'Legal y fiscal deciden la operación, y el target está en el extranjero',
        paragraphs: [
          'Legal y fiscal están ajustados al derecho neerlandés. Las lecturas financiera, comercial y operativa funcionan en cualquier jurisdicción. Para un target en otro país, que asesores jurídicos locales revisen los hallazgos legales y fiscales.'
        ]
      },
      {
        heading: 'La pregunta es la propia tecnología',
        paragraphs: [
          'Factum no hace revisión de código fuente, evaluación de arquitectura ni pruebas de escalabilidad. La disciplina de IA lee lo que dicen los documentos: de quién es el modelo, de quién los datos, qué entra en el Reglamento de IA. Si el código aguanta es una due diligence técnica aparte.'
        ]
      },
      {
        heading: 'Necesita comprobaciones de antecedentes o de integridad',
        paragraphs: [
          'Factum lee el data room. No investiga a personas ni empresas en cuanto a integridad o reputación, y no hace comprobaciones de antecedentes.'
        ]
      },
      {
        heading: 'Todavía no hay data room',
        paragraphs: [
          'Factum trabaja sobre documentos. Si el data room no se ha montado, no hay nada que leer. Un vendedor que aún se está preparando puede empezar por [lo que pedirá un comprador](/data-room-checklist).'
        ]
      },
      {
        heading: 'Quiere que la decisión se tome por usted',
        paragraphs: [
          'Un modelo puede encontrar todas las cláusulas de cambio de control del data room. No puede decirle cuál mata la operación. La materialidad depende de su estructura, su precio y su apetito de riesgo, y nada de eso está en el data room.',
          'Por eso la revisión es obligatoria: ninguna exportación sale sin la aprobación de su revisor. Más en [lo que la IA no puede hacer](/limits-of-ai).'
        ]
      }
    ],
    helps: {
      heading: 'Dónde sí encaja Factum',
      bullets: [
        'Todo el data room leído, con cada hallazgo citado a su documento y su ubicación.',
        '{disciplines} disciplinas en una sola pasada, conciliadas en un solo informe.',
        'Una lista continua de lo que el vendedor nunca subió.',
        'Una operación que cerró el año pasado como prueba: nada de un proceso en curso queda expuesto, y puede contrastar los hallazgos con lo que encontró su equipo entonces.'
      ],
      note: 'Factum está en fase previa al lanzamiento: aún no hay ningún cliente público ni caso de estudio. El primer informe real que verá será el suyo.'
    },
    datePublished: PUBLISHED
  },
  'ai-due-diligence-vs-data-room-ai': {
    metaTitle: 'Due diligence con IA frente a la IA del data room',
    metaDescription:
      'La IA del data room ayuda a gestionarlo: ordenar, anonimizar, buscar, Q&A. La due diligence con IA lee cada documento para el comprador o el asesor vendedor y cita cada hallazgo.',
    shortName: 'Due diligence con IA frente a la IA del data room',
    h1: 'Due diligence con IA o IA del data room: ¿en qué se diferencian?',
    answer:
      'La IA del data room ayuda a gestionar la sala: ordena, anonimiza y busca en los documentos y organiza el Q&A, para la parte que dirige el proceso. Una plataforma de due diligence con IA trabaja para el comprador, o para el asesor de la parte vendedora que prepara el data room. Lee cada documento del data room y devuelve hallazgos, cada uno con su documento fuente y su ubicación. Factum es lo segundo. Su propio revisor decide qué importa y da el visto bueno.',
    table: {
      heading: 'Frente a frente',
      corner: 'Pregunta',
      columns: ['IA del data room', 'Plataforma de due diligence con IA'],
      rows: [
        {
          label: 'Para quién trabaja',
          cells: [
            'La parte que gestiona el data room, normalmente el vendedor y su asesor, y todos los que trabajan en él',
            'El comprador, o el asesor de la parte vendedora que quiere el data room leído como lo leerá un comprador'
          ]
        },
        {
          label: 'Para qué sirve',
          cells: [
            'Gestionar el data room: orden, accesos, anonimización, búsqueda, preguntas y respuestas',
            'Valorar el target: qué significan los documentos para la operación'
          ]
        },
        {
          label: 'Qué lee',
          cells: [
            'Los documentos a medida que se suben, para indexarlos, etiquetarlos, anonimizarlos y hacerlos buscables',
            'Cada documento del data room, en {disciplines} disciplinas, contrastados entre sí'
          ]
        },
        {
          label: 'Qué obtiene',
          cells: [
            'Un data room ordenado y buscable, y un registro de Q&A al día',
            'Hallazgos con su gravedad, cifras que se contradicen y una lista de lo que falta'
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
            label: 'Ejemplos',
            cells: [
              'Datasite (Blueflame AI), Imprima, Drooms, Ansarada, Intralinks',
              'Factum. Las herramientas de IA jurídica y financiera cubren parte de la misma lectura: vea más abajo'
            ]
          },
          {
          label: 'Fuentes',
          cells: [
            'Depende del proveedor y de la función',
            'Cada hallazgo cita literalmente el pasaje que lo respalda, con su documento fuente y su ubicación'
          ]
        },
        {
          label: 'Quién da el visto bueno',
          cells: [
            'Nada que aprobar: gestiona el data room, no revisa el target',
            'Su propio revisor. Ninguna exportación sale sin esa aprobación. Factum no firma nada.'
          ]
        }
      ],
      note:
        'Cada proveedor describe sus propias funciones, y cambian a menudo. Algunos data rooms ya revisan también documentos dentro de la propia sala: Imprima describe revisión de contratos y resúmenes con IA, Datasite un asistente que detecta posibles lagunas. Pregunte al suyo a qué remite cada respuesta y quién la aprueba.'
    },
    sections: [
      {
        heading: '¿Qué hace la IA del data room?',
        paragraphs: [
          'Los proveedores de data rooms virtuales han integrado IA en la propia sala. Ayuda a quien dirige el proceso a mantener el data room en orden y en marcha.'
        ],
        bullets: [
          'Ordenar: clasificar e indexar lo que se sube en una estructura.',
          'Anonimizar: encontrar datos personales y pasajes sensibles antes de compartir los documentos.',
          'Buscar: encontrar los documentos en los que aparece un término o una pregunta.',
          'Q&A: encaminar las preguntas de los ofertantes, ayudar a responderlas, seguir lo que sigue abierto.'
        ],
        after: ['Su trabajo es la sala: qué contiene, quién ve qué, qué preguntas siguen abiertas.']
      },
      {
        heading: '¿Qué hace una plataforma de due diligence con IA?',
        paragraphs: [
          'Lee el data room para quien tiene que valorar el target. Factum lee cada documento del data room, en {disciplines} disciplinas, y los contrasta entre sí: un contrato frente a los ingresos que debería sostener, las cuentas de gestión frente a las cuentas anuales.',
          'Cada hallazgo cita literalmente el pasaje que lo respalda, con su documento fuente y su ubicación, para que su revisor pueda comprobarlo en la fuente. Lo que debería estar en el data room y no está va a una lista aparte.'
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
          heading: '¿Dónde encajan las herramientas de IA jurídica y financiera?',
          paragraphs: [
            'Un equipo de deal también se encuentra con herramientas de IA hechas para una sola profesión. Kira, parte de Litera, se describe como creada para revisiones de gran volumen y due diligence, para abogados. Harvey es software de IA para servicios jurídicos y profesionales, usado por despachos y departamentos legales. Luminance se presenta como una plataforma de inteligencia contractual. Hebbia describe una IA creada para finanzas, para inversores y banqueros.',
            'Estas herramientas trabajan con los documentos y las preguntas que usted les da, casi siempre dentro de una disciplina. Factum lee todo el data room en {disciplines} disciplinas en una sola pasada y contrasta las disciplinas entre sí: el módulo financiero lee primero los hallazgos jurídicos, el fiscal lee ambos. Qué herramienta encaja depende de quién pregunta y de lo que necesita el deal.'
          ]
        },
        {
        heading: '¿Cuándo necesita cada una?',
        bullets: [
          'Dirige un proceso de venta y quiere el data room ordenado, anonimizado y las preguntas bajo control: IA del data room.',
          'Compra y necesita saber qué dicen los documentos sobre el target: due diligence con IA.',
          'Asesora al vendedor y quiere el data room leído como lo leerá un comprador, antes de que lo haga: due diligence con IA sobre el data room del vendedor. Vea [Factum para vendedores y brokers](/pre-sale).'
        ],
        after: ['La mayoría de las operaciones usan ambas. El data room guarda los documentos; Factum los lee.']
      },
      {
        heading: '¿Cómo funcionan juntas?',
        paragraphs: [
          'El data room sigue donde transcurre el proceso: accesos, versiones, preguntas y respuestas. Su equipo sube los documentos del data room a Factum. Factum devuelve los hallazgos, y su revisor los repasa en la plataforma. Cómo se prepara una pasada está en [la página de la plataforma](/platform).'
        ]
      },
      {
        heading: 'Lo que ninguna sustituye',
        paragraphs: [
          'Un informe firmado. Un informe de quality of earnings o de vendor due diligence sale de un encargo aparte a un auditor o asesor que lo firma. Factum no da aseguramiento; su revisor aprueba los hallazgos para su propio uso. Más en [cuándo Factum no encaja](/when-not-to-use-factum).'
        ]
      }
    ],
    faq: {
      heading: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Un data room con funciones de IA es lo mismo que la due diligence con IA?',
          a: 'No. La IA del data room ayuda a gestionar la sala: ordenar, anonimizar, buscar y Q&A. La due diligence con IA lee cada documento para el comprador o el asesor de la parte vendedora y devuelve hallazgos sobre el target, cada uno con su documento fuente y su ubicación.'
        },
        {
          q: '¿Sustituye Factum a nuestro data room virtual?',
          a: 'No. El data room sigue donde transcurre el proceso. Su equipo sube los documentos a Factum, que los lee y devuelve hallazgos para su revisor.'
        },
        {
          q: '¿Quién aprueba los hallazgos?',
          a: 'Su propio revisor. La revisión humana es obligatoria: ninguna exportación sale de la plataforma sin la aprobación de su revisor. Factum no firma nada y no da aseguramiento.'
        },
        {
          q: '¿Qué disciplinas cubre Factum?',
          a: '{disciplines} disciplinas: financiera, comercial, legal, fiscal, RR. HH., IA, operativa, y valoración y economía de la operación, conciliadas en un solo informe.'
        },
        {
          q: '¿Funciona para operaciones fuera de los Países Bajos?',
          a: 'Las lecturas financiera, comercial y operativa funcionan en cualquier jurisdicción. Legal y fiscal están ajustados al derecho neerlandés; para un target en otro país, que asesores jurídicos locales revisen esos hallazgos.'
        },
        {
          q: '¿Podemos probarlo antes de una operación en curso?',
          a: 'Sí. Una operación que cerró el año pasado sirve de prueba: nada de un proceso en curso queda expuesto, y puede comparar los hallazgos con lo que su equipo encontró entonces. Factum está en fase previa al lanzamiento, así que el primer informe real que verá será el suyo.'
        }
      ]
    },
    helps: {
      heading: 'Dónde encaja Factum',
      bullets: [
        'Para private equity y otros compradores, y para sell-side brokers.',
        'Todo el data room leído, con cada hallazgo citado a su documento y su ubicación.',
        '{disciplines} disciplinas en una sola pasada, conciliadas en un solo informe.',
        'Su equipo revisa los hallazgos y da el visto bueno en la plataforma.'
      ],
      note: 'Factum está en fase previa al lanzamiento: aún no hay ningún cliente público ni caso de estudio. Legal y fiscal están ajustados al derecho neerlandés. ¿Elige un proveedor? Use [diez preguntas para un proveedor de due diligence con IA](/ai-due-diligence-vendor-questions). Antes de firmar: [revisión de red flags de un data room](/red-flag-review). Si compra una BV neerlandesa: [due diligence de una BV neerlandesa](/dutch-bv-due-diligence). Y [cómo se tratan sus documentos](/governance).'
    },
    datePublished: '2026-11-08'
  },
  'dutch-bv-due-diligence': {
    metaTitle: 'Due diligence de una BV neerlandesa: qué revisa el comprador',
    metaDescription:
      '¿Compra una BV neerlandesa? Qué revisar en el data room según el derecho neerlandés: participaciones, cambio de control, comité de empresa, pensiones, unidad fiscal, ACM y la FDD.',
    shortName: 'Due diligence de una BV neerlandesa',
    h1: 'Due diligence de una BV neerlandesa: ¿qué revisa el comprador en el data room?',
    answer:
      'Cuando el target es una sociedad de responsabilidad limitada neerlandesa (besloten vennootschap, BV), el data room tiene que responder a preguntas que fija el derecho neerlandés: quién tiene realmente las participaciones, qué contratos sobreviven al cambio de control, qué exigen el comité de empresa y el plan de pensiones, y qué posiciones fiscales llegan con la sociedad. Esta página trata solo de targets sujetos al derecho neerlandés. Explica lo que revisa un comprador; no es asesoramiento jurídico.',
    sections: [
      {
        heading: '¿Quién tiene las participaciones, y se pueden transmitir?',
        bullets: [
          'Estatutos (statuten): el texto vigente y cualquier restricción a la transmisión (blokkeringsregeling), como un derecho de adquisición preferente o un requisito de aprobación.',
          'Libro registro de socios: cada emisión y transmisión desde la constitución, cada una con su escritura notarial. Las participaciones de una BV se transmiten por escritura notarial, así que un hueco en la cadena de escrituras es un hueco en la titularidad.',
          'Certificados emitidos a través de una fundación (STAK), prendas y usufructo sobre participaciones, y quién tiene los derechos de voto.',
          'Pacto de socios: drag-along y tag-along, good y bad leaver, vetos que sobreviven a la venta.',
          'Extractos del Registro Mercantil (KvK) y del registro de titulares reales (UBO) que cuadren con el libro registro de socios.'
        ],
        after: [
          'Una escritura que falta o una transmisión no inscrita a menudo se puede subsanar antes de la firma. Si aparece después, se convierte en una discusión sobre garantías.'
        ]
      },
      {
        heading: '¿Qué contratos cambian de manos con la sociedad?',
        paragraphs: [
          'En una compra de participaciones los contratos se quedan en la BV, así que la pregunta es cuáles permiten a la contraparte resolver o renegociar cuando cambia el control. En una compra de activos cada contrato tiene que cederse, y eso suele requerir la colaboración de la contraparte.'
        ],
        bullets: [
          'Cláusulas de cambio de control y de resolución en los mayores contratos de clientes, proveedores, licencias y arrendamientos.',
          'Prohibiciones de cesión y cláusulas de exclusividad que vincularían al grupo del comprador tras el cierre.',
          'Financiación bancaria con cláusulas de cambio de control y cross-default, y las garantías otorgadas bajo ella.',
          'Garantías que la BV otorgó a favor de sociedades del grupo, incluidas las declaraciones de responsabilidad depositadas en el Registro Mercantil (403-verklaringen).'
        ]
      },
      {
        heading: '¿Qué exigen el comité de empresa, la plantilla y las pensiones?',
        bullets: [
          'Comité de empresa (ondernemingsraad): donde lo hay, un cambio de control suele darle un derecho de consulta, y su opinión se pide cuando aún puede influir en la decisión.',
          'Sindicatos: según el tamaño de las empresas implicadas, el Código de Fusiones del SER (SER-Fusiegedragsregels) puede exigir que se les informe.',
          'Condiciones laborales: contratos de personas clave, pactos de no competencia, bonus y planes de retención que se pagan con la venta, y el convenio colectivo (cao) aplicable.',
          'Pensiones: qué plan se aplica, si la participación en un fondo de pensiones sectorial es obligatoria, y en qué punto está el plan en la transición de la Ley del futuro de las pensiones (Wet toekomst pensioenen).',
          'En una compra de activos, la plantilla pasa por ministerio de la ley con sus condiciones (overgang van onderneming).'
        ]
      },
      {
        heading: '¿Cuándo entran la ACM u otro regulador?',
        paragraphs: [
          'Si el volumen de negocios de las partes supera los umbrales de la Ley de Competencia neerlandesa (Mededingingswet), la operación debe notificarse antes del cierre a la Autoridad de Consumidores y Mercados (ACM); por encima de los umbrales europeos, la competencia pasa a la Comisión Europea.',
          'Además, adquirir un proveedor vital o una empresa con tecnología sensible puede requerir una notificación conforme a la ley neerlandesa de control de inversiones (Wet Vifo), y una licencia en un sector regulado puede requerir el consentimiento del regulador. Si algo de esto aplica es una pregunta para su abogado al inicio del proceso, porque fija el calendario.'
        ]
      },
      {
        heading: '¿Qué posiciones fiscales llegan con la sociedad?',
        bullets: [
          'Unidad fiscal en el impuesto de sociedades (fiscale eenheid): el target sale de la unidad fiscal del vendedor con la venta, con consecuencias para las pérdidas y para operaciones anteriores dentro del grupo.',
          'Unidad fiscal en el IVA: cada miembro responde solidariamente del IVA de toda la unidad durante el periodo en que perteneció a ella.',
          'Liquidaciones abiertas, inspecciones de la Administración tributaria neerlandesa (Belastingdienst) y cualquier ruling o acuerdo en el que se apoye el target.',
          'Retenciones sobre salarios y responsabilidad en cadena (ketenaansprakelijkheid) cuando la empresa trabaja con subcontratistas o personal cedido.',
          'Pasivos fiscales diferidos que de otro modo aparecerían en la primera declaración tras el cierre.'
        ]
      },
      {
        heading: '¿Qué no suele mostrar el data room?',
        paragraphs: [
          'Los documentos que nadie subió. Una escritura notarial de hace quince años, una side letter a un contrato de cliente, la opinión del comité de empresa, el último estado del gestor de pensiones. Lo que falta no deja ningún pasaje que citar, así que solo se nota cuando el data room se contrasta con una lista de lo que debería estar.',
          'Para el lado del vendedor de esa misma lista, vea [la checklist del data room](/data-room-checklist).'
        ]
      },
      {
        heading: '¿Cómo se relaciona una lectura con IA de todo el data room con la FDD del auditor?',
        paragraphs: [
          'La due diligence financiera (FDD) de una firma de auditoría o asesoría profundiza en las cifras: quality of earnings, EBITDA normalizado, deuda neta y capital circulante. Termina en un informe que la firma firma, y que un banco o una aseguradora de W&I puede querer ver.',
          'Factum lee cada documento del data room en {disciplines} disciplinas y devuelve hallazgos, cada uno con su documento fuente y su ubicación. No da ninguna garantía y no firma nada; su propio revisor aprueba los hallazgos para su propio uso. Junto a una FDD, muestra pronto a los especialistas qué contiene el data room, qué se contradice y qué falta, para que sus horas vayan donde está el riesgo. La FDD y la due diligence legal de su abogado siguen siendo lo que son.',
          'Cómo se ordena la lectura está en [la página de la plataforma](/platform). En qué se diferencia de la IA de un data room virtual está en [Due diligence con IA frente a la IA del data room](/ai-due-diligence-vs-data-room-ai).'
        ]
      },
      {
        heading: '¿Cómo llegan los hallazgos al contrato de compraventa?',
        paragraphs: [
          'Un hallazgo suele acabar en uno de tres lugares del contrato de compraventa (SPA): el precio, una indemnidad específica por un riesgo conocido o la revelación frente a las garantías. Bajo una póliza de W&I, los riesgos que el comprador conocía antes de firmar suelen quedar excluidos de la cobertura.',
          'Una razón más para tener los hallazgos pronto y con su fuente: su abogado puede decidir entonces, hallazgo por hallazgo, dónde encaja cada uno. Antes de la oferta vinculante, la [revisión de red flags](/red-flag-review) es la versión corta de la misma lectura.'
        ]
      }
    ],
    faq: {
      heading: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Sirve esta página para targets fuera de los Países Bajos?',
          a: 'No. Trata de targets sujetos al derecho neerlandés, sobre todo la BV. La lectura financiera, comercial y operativa de Factum funciona en cualquier jurisdicción; legal y fiscal están ajustados al derecho neerlandés, así que para un target en otro país pida a abogados locales que revisen esos hallazgos.'
        },
        {
          q: '¿Es asesoramiento jurídico?',
          a: 'No. Explica lo que un comprador suele revisar en el data room de una BV neerlandesa. Cada operación es distinta; pida a su propio abogado y asesor fiscal que evalúen el target concreto.'
        },
        {
          q: '¿Sustituye Factum la due diligence financiera del auditor?',
          a: 'No. Una FDD es un informe firmado de un encargo aparte, y un banco o una aseguradora pueden apoyarse en él. Factum no da ninguna garantía. Lee todo el data room en {disciplines} disciplinas junto a la FDD, y su propio revisor aprueba los hallazgos.'
        },
        {
          q: '¿Ve Factum lo que falta en el data room?',
          a: 'Sí, como una lista aparte de lo que un comprador esperaría y no encontró. Cada punto pasa primero por su revisor, porque un documento archivado dentro de otro puede aparecer como ausente.'
        },
        {
          q: '¿Dónde se procesan los documentos?',
          a: 'Por defecto en endpoints de la UE, sin retención en el proveedor del modelo y con seudonimización antes del análisis. El análisis jurídico, financiero y fiscal funciona obligatoriamente en endpoints sin retención.'
        }
      ]
    },
    helps: {
      heading: 'Dónde encaja Factum en la compra de una BV neerlandesa',
      bullets: [
        'Cada documento del data room leído, con cada hallazgo citando su documento fuente y su ubicación.',
        '{disciplines} disciplinas en una sola pasada: {modules} módulos en {waves} oleadas, donde el financiero lee los hallazgos jurídicos y el fiscal lee ambos.',
        'Legal y fiscal ajustados al derecho neerlandés.',
        'Su revisor aprueba en la plataforma. Ninguna exportación sale sin esa aprobación.'
      ],
      note: 'Factum está en fase previa al lanzamiento: aún no hay ningún cliente público ni caso de estudio. Más sobre [Factum para compradores](/diligence-sprint) y [cómo se tratan sus documentos](/governance). Antes de firmar: [revisión de red flags de un data room](/red-flag-review). Para elegir una herramienta: [diez preguntas para un proveedor de due diligence con IA](/ai-due-diligence-vendor-questions).'
    },
    datePublished: '2026-11-12'
  },
  'red-flag-review': {
    metaTitle: 'Revisión de red flags de un data room antes de firmar',
    metaDescription:
      'Qué es una revisión de red flags, qué red flags deciden una operación por disciplina, qué debe contener el informe y dónde falla. Para compradores, antes de firmar.',
    shortName: 'Revisión de red flags de un data room',
    h1: 'Revisión de red flags: ¿qué revisa el comprador en el data room antes de firmar?',
    answer:
      'Una revisión de red flags lee el data room buscando los problemas que pueden parar la operación o mover el precio, y solo informa de esos. Es más acotada que una due diligence completa y llega antes: antes de la oferta vinculante o de la firma, cuando aún hay tiempo para retirarse, renegociar o pedir una indemnidad específica. Un informe de red flags útil indica en cada punto su gravedad, y el documento y la ubicación de donde procede.',
    sections: [
      {
        heading: '¿Qué es una revisión de red flags, y en qué se diferencia de una due diligence completa?',
        paragraphs: [
          'Una due diligence completa describe el target: las cifras, los contratos, las personas y la posición fiscal, en un informe por disciplina. Una revisión de red flags hace una sola pregunta a los mismos documentos: ¿qué hay aquí que pueda tumbar la operación o cambiar lo que pagamos? Todo lo demás queda fuera del informe.',
          'La lectura no se aligera. Para encontrar la cláusula que importa, hay que leer todos los contratos. Lo que se acorta es el informe.'
        ]
      },
      {
        heading: '¿Qué red flags deciden una operación?',
        bullets: [
          'Jurídico: derechos de cambio de control y de resolución en los contratos que sostienen los ingresos, litigios, garantías otorgadas a terceros, huecos en la titularidad de las participaciones.',
          'Comercial: concentración de clientes, contratos que vencen o se revisan de precio poco después del cierre, pérdida de clientes que la presentación no muestra.',
          'Financiero: ajustes al EBITDA que los documentos no respaldan, capital circulante que oscila al cierre del ejercicio, deuda y partidas asimilables a deuda fuera de la deuda neta.',
          'Fiscal: liquidaciones abiertas, posiciones sin ruling, obligaciones de una unidad fiscal de la que sale el target.',
          'RR. HH.: personas clave sin contrato o sin pacto de no competencia, bonus que se pagan con la venta, obligaciones de pensiones que no están en el balance.',
          'Operativo e IA: proveedores únicos, licencias que no se transmiten, modelos o datos de los que depende el negocio y que no son suyos.'
        ],
        after: [
          'Cuál de ellos es material depende de su precio, su estructura y su apetito de riesgo. Nada de eso está en el data room.'
        ]
      },
      {
        heading: '¿Qué debe contener un informe de red flags?',
        paragraphs: [
          'Por cada punto: qué es, su gravedad, el pasaje que lo respalda, literal, y el documento y la ubicación donde está. Después, la lista de lo que nunca llegó. Un hallazgo sin fuente es un hallazgo que su revisor tiene que rehacer.',
          'Cada hallazgo de Factum tiene los mismos seis campos: módulo, hallazgo, extracto literal, gravedad, fuente y ubicación, y revisión humana.'
        ]
      },
      {
        heading: '¿Dónde falla una revisión de red flags?',
        bullets: [
          'Solo se leyó una muestra, y la cláusula que importa está en el contrato que nadie abrió.',
          'Nadie comprobó lo que faltaba, y la red flag es el documento que nunca se subió.',
          'Las disciplinas se leyeron por separado. Un contrato que vence el año que viene es a la vez un punto jurídico y un punto de ingresos, y solo un informe lo vio.',
          'Los hallazgos llegan sin fuente, y el equipo no puede distinguir un problema real de una mala lectura.'
        ]
      },
      {
        heading: '¿Cuánto tarda?',
        paragraphs: [
          'Depende del tamaño y del estado del data room, y de lo rápido que responda el vendedor. Adónde se van los días, y dónde se pueden ganar, está en [cuánto dura una due diligence](/due-diligence-timeline).'
        ]
      },
      {
        heading: '¿Cómo hace Factum una revisión de red flags?',
        paragraphs: [
          'Su equipo sube el data room. {modules} módulos lo leen en {waves} oleadas, en un orden fijo: primero comercial, RR. HH., operativo e IA, después jurídico, después financiero, que lee los hallazgos jurídicos, y luego fiscal, economía de la operación y valoración. Cada hallazgo cita su fuente. {blocks} bloqueos duros detienen un borrador y lo llevan a su revisor, sin aprobar.',
          'Su revisor decide qué es una red flag para esta operación y aprueba; ninguna exportación sale de la plataforma sin esa aprobación. Más en [la página de la plataforma](/platform), y sobre la diferencia con la IA de un data room virtual en [Due diligence con IA frente a la IA del data room](/ai-due-diligence-vs-data-room-ai).'
        ]
      }
    ],
    faq: {
      heading: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Puede la IA hacer sola una revisión de red flags?',
          a: 'Puede hacer la lectura: cada documento y cada cláusula, contrastados entre sí, con fuentes. No puede decidir qué es material para su operación. Por eso la revisión humana es obligatoria: su revisor aprueba antes de que nada salga de la plataforma.'
        },
        {
          q: '¿Quién firma el informe de red flags?',
          a: 'Su propio revisor, para su propio uso. Factum no firma nada y no da ninguna garantía. Si un banco o una aseguradora necesita un informe firmado, encárguelo a un asesor; Factum puede funcionar a su lado.'
        },
        {
          q: '¿Basta una revisión de red flags antes de firmar?',
          a: 'En algunas operaciones es el primer paso y después llega la due diligence completa; en otras es lo que permite el calendario. Deciden sus asesores y su revisor. Factum lee todo el data room en ambos casos.'
        },
        {
          q: '¿Funciona para un target fuera de los Países Bajos?',
          a: 'La lectura financiera, comercial y operativa funciona en cualquier jurisdicción. Legal y fiscal están ajustados al derecho neerlandés; para un target en otro país, pida a abogados locales que revisen esos hallazgos.'
        },
        {
          q: '¿Podemos probarlo antes de una operación en curso?',
          a: 'Sí. Una operación que cerró el año pasado sirve de prueba: nada de un proceso en curso queda expuesto, y puede comparar los hallazgos con lo que encontró entonces su equipo. Factum está en fase previa al lanzamiento, así que el primer informe real que verá será el suyo.'
        }
      ]
    },
    helps: {
      heading: 'Dónde encaja Factum',
      bullets: [
        'Para private equity y otros compradores, antes de la oferta vinculante o de la firma.',
        'Cada documento del data room leído, con cada hallazgo citando su documento fuente y su ubicación.',
        'Una lista de lo que el vendedor nunca subió, desde la primera pasada.',
        'Su revisor aprueba en la plataforma.'
      ],
      note: 'Factum está en fase previa al lanzamiento: aún no hay ningún cliente público ni caso de estudio. Legal y fiscal están ajustados al derecho neerlandés. ¿Compra una BV neerlandesa? Vea [due diligence de una BV neerlandesa](/dutch-bv-due-diligence). ¿Elige una herramienta? [Diez preguntas para un proveedor de due diligence con IA](/ai-due-diligence-vendor-questions), y [cómo se tratan sus documentos](/governance).'
    },
    datePublished: '2026-11-12'
  },
  /* Guía para compradores, lead magnet abierto (GTM/ops/geo-seo-audit-2026-11-12.md, asset 4). */
  'ai-due-diligence-vendor-questions': {
    metaTitle: 'Cómo evaluar un proveedor de due diligence con IA: 10 preguntas',
    metaDescription:
      'Diez preguntas para cualquier proveedor de due diligence con IA antes de subir el data room: tratamiento, conservación, NDA, fuentes, documentos que faltan, aprobación.',
    shortName: 'Diez preguntas para un proveedor de due diligence con IA',
    h1: '¿Cómo evaluar un proveedor de due diligence con IA? 10 preguntas',
    answer:
      'Pregunte antes de subir el data room. Diez preguntas cubren lo que un comprador necesita saber: dónde se tratan los documentos, quién los conserva, si el NDA lo permite, cómo se respalda cada hallazgo, qué no leyó la herramienta, qué falta, qué derecho conoce, quién aprueba, qué afirma sobre su precisión y de qué depende el precio. Pida cada respuesta por escrito. La lista sirve para cualquier proveedor, también para nosotros.',
    sections: [
      {
        heading: '1. ¿Dónde se tratan nuestros documentos?',
        paragraphs: [
          'Los documentos de un data room son confidenciales bajo el NDA y a menudo contienen datos personales sujetos al RGPD. Pregunte qué proveedores de modelos los tratan, en qué región, y si esa región es la opción por defecto o una que usted tiene que activar.',
          'Una buena respuesta nombra los proveedores y la región, y figura en el contrato de encargo del tratamiento.'
        ]
      },
      {
        heading: '2. ¿Alguien conserva nuestros documentos o entrena con ellos?',
        paragraphs: [
          'Son dos preguntas distintas. ¿El proveedor del modelo conserva prompts y documentos, y durante cuánto tiempo? ¿El proveedor o el proveedor del modelo los usa para entrenar un modelo?',
          'Una buena respuesta da el plazo de conservación por proveedor, descarta el entrenamiento y deja ambas cosas en el contrato.'
        ]
      },
      {
        heading: '3. ¿Lo permite nuestro NDA?',
        paragraphs: [
          'La mayoría de los NDA de M&A solo permiten revelar información a representantes designados: empleados, asesores, financiadores. Una plataforma de software y sus subencargados rara vez están en esa lista. Pida a su abogado que lo revise antes de la primera subida.',
          'Una buena respuesta: el proveedor firma un NDA antes de que se mueva ningún documento y enumera sus subencargados.'
        ]
      },
      {
        heading: '4. ¿A qué nivel cita cada hallazgo su fuente?',
        paragraphs: [
          'Documento, página o el pasaje mismo. Un hallazgo que su revisor no puede rastrear tiene que rehacerse. No todo hallazgo tiene un pasaje que citar: un cálculo sobre una hoja de cálculo remite a la pestaña o a las celdas que utilizó.',
          'Una buena respuesta: cada hallazgo indica su documento fuente y su ubicación, con el pasaje que lo respalda cuando lo hay.'
        ]
      },
      {
        heading: '5. ¿Lee todos los documentos o una muestra?',
        paragraphs: [
          'Algunas herramientas responden preguntas recuperando los pasajes que parecen relevantes. Eso es búsqueda, y la cláusula que importa puede estar en un documento que nunca se abrió. Pregunte qué parte del data room se leyó y qué ocurre con un archivo que no se pudo leer: un escaneo, un PDF bloqueado, una exportación dañada.',
          'Una buena respuesta: se lee cada documento, y lo que no se pudo leer figura en una lista.'
        ]
      },
      {
        heading: '6. ¿Nos dice lo que falta?',
        paragraphs: [
          'Un documento ausente no deja ningún pasaje que citar, así que una herramienta que solo lee lo que hay nunca lo señala. La red flag suele ser el contrato que nadie subió.',
          'Una buena respuesta: una lista aparte de lo que un comprador esperaría y no encontró, revisada por una persona.'
        ]
      },
      {
        heading: '7. ¿Qué disciplinas, y qué derecho?',
        paragraphs: [
          'Lo financiero, lo comercial y lo operativo funcionan en cualquier país. Lo legal y lo fiscal dependen del derecho de la empresa objetivo. Pregunte qué disciplinas entran en una sola ejecución, si leen los hallazgos de las demás y para qué jurisdicciones está construido el análisis legal y fiscal.',
          'Una buena respuesta nombra las jurisdicciones y dice con claridad dónde necesitará asesores locales.'
        ]
      },
      {
        heading: '8. ¿Quién aprueba los hallazgos?',
        paragraphs: [
          'El resultado de la IA es un borrador hasta que una persona lo acepta. Pregunte si algo puede exportarse sin la aprobación de una persona designada, si el proveedor ofrece alguna garantía y si un banco o una aseguradora de W&I puede basarse en el resultado.',
          'Una buena respuesta nombra el control humano y es clara sobre la reliance. La mayoría de las plataformas no ofrecen garantía; está bien, siempre que lo digan.'
        ]
      },
      {
        heading: '9. ¿Qué afirma el proveedor sobre su precisión, y quién la midió?',
        paragraphs: [
          'Un porcentaje sin método es una cifra de marketing. Pregunte sobre qué conjunto de datos se midió, quién lo midió y si alguien ajeno al proveedor lo comprobó.',
          'Una buena respuesta da el método, el conjunto de datos y el auditor, o dice con claridad que no hay una tasa auditada.'
        ]
      },
      {
        heading: '10. ¿Cuánto cuesta, y de qué depende el precio?',
        paragraphs: [
          'Por usuario, por documento, por página o por operación: el modelo determina lo que le costará un data room grande o desordenado. Pregunte qué está incluido, qué es adicional y qué ocurre si el data room crece durante el proceso.',
          'Una buena respuesta es un precio para un alcance acordado, por escrito, antes de subir el data room.'
        ]
      },
      {
        heading: '¿Cómo responde Factum a las diez?',
        paragraphs: ['En breve, y con las lagunas a la vista.'],
        steps: [
          'En endpoints de la UE por defecto, con un contrato de encargo del tratamiento.',
          'Sin conservación en el proveedor del modelo, que tampoco entrena con sus documentos. Seudonimización antes del análisis. El análisis legal, financiero y fiscal se ejecuta obligatoriamente en endpoints sin conservación.',
          'Primero el NDA. Los documentos solo se mueven después de firmarlo.',
          'Cada hallazgo indica su documento fuente y su ubicación, con el pasaje que lo respalda cuando lo hay.',
          'Se lee cada documento del data room, con {modules} módulos en {waves} oleadas.',
          'Una lista de lo que nunca llegó, desde la primera ejecución.',
          '{disciplines} disciplinas en una sola ejecución. Lo legal y lo fiscal están ajustados al derecho neerlandés; para una empresa objetivo en otro país, que asesores locales revisen esos hallazgos.',
          'Su propio revisor aprueba. Ninguna exportación sale de la plataforma sin esa aprobación. Factum no firma nada ni ofrece garantía.',
          'Ninguna tasa de precisión auditada. Factum está en fase previa al lanzamiento.',
          'Precio a consultar: un precio para todo el alcance, fijado según el tamaño y el estado del data room.'
        ],
        after: [
          'Más sobre [cómo se tratan sus documentos](/governance) y [lo que la IA no puede hacer en una due diligence](/limits-of-ai).'
        ]
      }
    ],
    faq: {
      heading: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Sirven estas preguntas para un data room virtual con funciones de IA?',
          a: 'Sí. Las preguntas 1 a 3 y 8 a 10 valen para cualquier herramienta que toque los documentos. Las preguntas 4 a 6 pesan más en una herramienta que dice hacer ella misma la lectura de la due diligence.'
        },
        {
          q: '¿Qué pregunta es la más importante?',
          a: 'La pregunta 3 va primero en el tiempo: si el NDA no permite la subida, lo demás no importa. Después, la pregunta 8. Quien aprueba responde de los hallazgos.'
        },
        {
          q: '¿Cómo ponemos a prueba las respuestas de un proveedor?',
          a: 'Hágalo trabajar sobre una operación que cerró el año pasado. No se expone nada en curso, y puede comparar los hallazgos con lo que su equipo encontró entonces.'
        },
        {
          q: '¿La due diligence con IA sustituye a nuestros asesores?',
          a: 'No. Lee todo el data room y muestra a los especialistas dónde mirar. La due diligence financiera del auditor y la due diligence legal de su abogado siguen siendo lo que son, y su propio revisor decide lo que importa.'
        }
      ]
    },
    helps: {
      heading: 'Dónde encaja Factum',
      bullets: [
        'Para private equity y otros compradores, antes de la oferta vinculante o la firma.',
        'Cada documento del data room leído, cada hallazgo con su documento fuente y su ubicación.',
        'Una lista de lo que el vendedor nunca subió.',
        'Su revisor aprueba en la plataforma.'
      ],
      note: 'Factum está en fase previa al lanzamiento: aún no hay ningún cliente público ni caso de estudio. La diferencia con la IA de un data room virtual: [due diligence con IA frente a la IA del data room](/ai-due-diligence-vs-data-room-ai). Antes de firmar: [revisión de red flags de un data room](/red-flag-review). Si compra una BV neerlandesa: [due diligence de una BV neerlandesa](/dutch-bv-due-diligence).'
    },
    datePublished: '2026-11-12'
  }
};
