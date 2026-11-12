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
  guidesLabel: 'Guías'
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
      note: 'Factum está en fase previa al lanzamiento: aún no hay ningún cliente público ni caso de estudio. Legal y fiscal están ajustados al derecho neerlandés.'
    },
    datePublished: '2026-11-08'
  }
};
