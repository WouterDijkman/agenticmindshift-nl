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
  }
};
