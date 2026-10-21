import type { Guide, GuideChrome } from './guides';
import type { GuideSlug } from './guideRoutes';

/**
 * Spanish (es-ES) copy for the three problem pages. Translated from the `nl`
 * entry of each guide in lib/guides.ts (Dutch is the original), with `en` as
 * a cross-check. The rules in the header of lib/guides.ts apply unchanged:
 * no client names, no prices, and the NDA page states the Dutch/EU frame
 * (AVG becomes RGPD in Spanish). Terminology follows messages/es.json: usted,
 * "deal", "flujo de trabajo", "Metodología" for /werkwijze.
 */

export const CHROME_ES: GuideChrome = {
  tocLabel: 'En esta página',
  relatedEyebrow: 'Siga leyendo',
  werkwijzeLink: 'Cómo funciona un encargo',
  overLink: 'Sobre Wouter Dijkman',
  moreEyebrow: 'Preguntas prácticas',
  moreHeading: 'Tres preguntas prácticas sobre IA en el trabajo de deals',
  readMore: 'Seguir leyendo',
};

const PUBLISHED = '2026-10-12';

export const GUIDES_ES: Record<GuideSlug, Guide> = {
  /* ─────────────────────────────────────────────────────────────────────
     (a) One way of working for IMs and teasers
     ───────────────────────────────────────────────────────────────────── */
  'im-en-teasers': {
    metaTitle: 'Un único flujo de IA para IM y teasers',
    metaDescription:
      '¿Cada junior usa ChatGPT y Claude a su manera para los IM y teasers? Así es un único flujo de trabajo fijo, con revisión del equipo al final.',
    shortName: 'IM y teasers',
    teaser: 'Un único flujo de trabajo para todo el equipo, con pasos de cálculo probados y una revisión al final.',
    eyebrow: 'Corporate finance · IM y teasers',
    bgChar: 'IM',
    h1: 'Un único flujo de IA para IM y teasers, para todo el equipo',
    answer:
      'Si cada junior usa ChatGPT o Claude a su manera, cada IM sale distinto en estructura, tono y fiabilidad. Lo que funciona es un único flujo de trabajo configurado que usa todo el equipo: pasos fijos, los cálculos como un paso probado y una revisión del equipo al final. Lo que se construye es suyo.',
    sections: [
      {
        heading: '¿Qué falla cuando cada uno usa su propia IA?',
        bullets: [
          'Cada junior tiene sus propios prompts y ajustes. Dos IM de la misma firma parecen obra de dos firmas distintas.',
          'Nadie sabe qué texto o qué tabla salió de qué modelo.',
          'Lo que una persona ha averiguado se queda en su historial de chat.',
          'Las cifras se «calculan» en una ventana de chat, sin que nadie vea el cálculo.',
        ],
      },
      {
        heading: '¿Cómo es un único flujo de trabajo fijo?',
        paragraphs: [
          'Un flujo de trabajo es una secuencia fija de pasos para un trabajo recurrente. Para un IM o un teaser, es así:',
        ],
        steps: [
          'Los documentos del vendedor van a una carpeta fija, en un formato fijo.',
          'Cada documento tiene una plantilla fija, con la estructura y el tono de la firma.',
          'El modelo redacta un primer borrador por capítulo a partir de los documentos de origen.',
          'Las tablas y los ratios salen de un paso de cálculo probado.',
          'El equipo lee, corrige y da su aprobación antes de que salga nada.',
        ],
        after: [
          'Todos trabajan con los mismos pasos. Un junior nuevo no tiene que inventar nada, y un IM del año pasado se puede reconstruir.',
        ],
      },
      {
        heading: '¿Por qué los cálculos son un paso aparte?',
        paragraphs: [
          'Un modelo de lenguaje no calcula por sí mismo. Escribe código que calcula, o estima. Cuanto más se apartan los criterios contables de una empresa de lo habitual, mayor es el riesgo de error.',
          'Por eso construimos los cálculos como pasos fijos:',
        ],
        bullets: [
          'siempre la misma fórmula para normalizaciones y ratios;',
          'probada antes de que el equipo confíe en ella;',
          'cada cifra del IM se puede rastrear hasta su fuente.',
        ],
      },
      {
        heading: '¿Quién revisa el resultado?',
        paragraphs: [
          'El equipo. Cada flujo de trabajo termina con una revisión de alguien de la firma. El modelo entrega el primer borrador; el criterio y la aprobación siguen siendo suyos.',
        ],
      },
      {
        heading: '¿De quién es lo que se construye?',
        paragraphs: [
          'Suyo. El flujo de trabajo funciona en su propio entorno y le acompaña si cambia a otro proveedor de modelos de IA. No queda atado a nosotros ni a un único modelo. Así lo dejamos por escrito en la carta de encargo.',
        ],
      },
      {
        heading: '¿Qué más se puede convertir en un flujo fijo?',
        paragraphs: [
          'Un ejemplo de mi propio trabajo: un perfil de empresa de dos páginas a partir de solo un nombre de empresa.',
        ],
        bullets: [
          'web, propietarios y estructura desde Company.info;',
          'competidores desde Gain.pro;',
          'una comprobación de noticias, para no pasar por alto una venta ya anunciada.',
        ],
        after: [
          'El análisis queda preparado; el criterio sigue en manos del equipo. Lo que era entre media jornada y una jornada entera de trabajo pasa a ser revisar y pulir.',
        ],
      },
      {
        heading: '¿Hace falta contratar a un especialista en IA?',
        paragraphs: [
          'Para una boutique, normalmente no. La ganancia está en unos pocos procesos bien configurados que todo el equipo usa a diario. Para eso no hace falta un puesto adicional.',
        ],
      },
      {
        heading: '¿Por dónde empezar?',
        paragraphs: [
          'Describa el trabajo desde el mandato hasta el cierre. Mire en cada paso qué consume tiempo, qué se repite cada vez y dónde surgen los errores. Empiece por uno o dos pasos que se repitan a menudo, como el teaser o el primer borrador del IM.',
          'Cómo sigue un proyecto se explica en [Metodología](/werkwijze). ¿Puede realmente subir documentos de un deal a una herramienta así? Vea [Documentos de deal en ChatGPT](/dealstukken-en-ai).',
        ],
      },
    ],
    helps: {
      heading: 'Cómo ayuda Agentic Mindshift',
      bullets: [
        'Describimos su proceso desde el mandato hasta el cierre y elegimos juntos el primer flujo de trabajo.',
        'Lo configuramos, con pasos de cálculo probados y una revisión de su equipo como último paso.',
        'Formamos al equipo hasta que trabaja con ello de forma autónoma.',
      ],
      note: 'La primera conversación dura veinte minutos y es sin compromiso.',
    },
    datePublished: PUBLISHED,
  },

  /* ─────────────────────────────────────────────────────────────────────
     (b) Monthly portfolio reporting
     ───────────────────────────────────────────────────────────────────── */
  maandrapportage: {
    metaTitle: 'Informe mensual de participadas con IA',
    metaDescription:
      'La IA prepara la revisión mensual de una participada de PE: análisis de desviaciones, controles forenses y preguntas para CFO y CEO. La revisión es del equipo.',
    shortName: 'Informe mensual',
    teaser: 'Análisis de desviaciones, controles forenses y preguntas para CFO y CEO, listos para que los revise el equipo del deal.',
    eyebrow: 'Private equity · Seguimiento de cartera',
    bgChar: 'M',
    h1: 'IA en el informe mensual de una participada de PE',
    answer:
      'La IA puede preparar buena parte de la revisión mensual de una participada: el análisis de desviaciones, un control forense como el que haría un auditor y preguntas concretas para el CFO y el CEO. En un fondo de PE para el que configuré esto, hacerlo a mano costaba entre tres y cuatro días. Ahora el flujo de trabajo arranca por la mañana y el informe está listo para revisión unas horas después. El criterio sigue en manos del equipo del deal.',
    sections: [
      {
        heading: '¿Qué hace la IA en una revisión mensual?',
        bullets: [
          'Análisis de desviaciones: real frente a presupuesto, al año anterior y al mes anterior, con las mayores diferencias primero.',
          'Control forense: las comprobaciones que haría un auditor, como márgenes que se desplazan, capital circulante que sube y costes que cambian de partida.',
          'Preguntas para la dirección: por cada desviación, una pregunta concreta para el CFO o el CEO, con la cifra al lado.',
        ],
      },
      {
        heading: '¿Cómo es el flujo de trabajo?',
        steps: [
          'La participada entrega las cifras mensuales en un formato fijo.',
          'El flujo de trabajo arranca por la mañana y ejecuta el análisis y los controles como pasos fijos.',
          'Los cálculos pasan por pasos de cálculo probados. El modelo de lenguaje redacta la explicación y las preguntas.',
          'Unas horas después, el informe está listo para revisión.',
          'El equipo del deal lo lee, lo ajusta y envía las preguntas a la dirección.',
        ],
      },
      {
        heading: '¿Por qué no pegar sin más las cifras en ChatGPT?',
        paragraphs: [
          'Un modelo de lenguaje no calcula por sí mismo. Escribe código o estima. Con un paquete mensual de decenas de líneas, tarde o temprano falla, y nadie ve dónde.',
          'Además, usted quiere que cada mes se ejecuten los mismos controles, en el mismo orden. Un chat suelto no lo recuerda.',
          'Y las cifras de una participada no deben estar en una cuenta personal. Vea [Documentos de deal en ChatGPT](/dealstukken-en-ai).',
        ],
      },
      {
        heading: '¿Quién evalúa el informe?',
        paragraphs: [
          'El equipo del deal. El flujo de trabajo prepara; el investment manager evalúa, elige qué preguntas van a la participada y da su aprobación. La revisión se queda en el equipo que conoce la participada.',
        ],
      },
      {
        heading: '¿Qué aporta además del tiempo?',
        bullets: [
          'Cada participada se examina cada mes de la misma manera.',
          'Las desviaciones salen a la luz en el mes en que aparecen.',
          'Las preguntas a la dirección y sus respuestas quedan registradas, aunque alguien deje el equipo.',
        ],
      },
      {
        heading: '¿Por dónde empezar?',
        paragraphs: [
          'Por una participada y el informe que ya elabora hoy. Ponemos por escrito los pasos actuales, los reproducimos como flujo de trabajo fijo y lo ejecutamos primero en paralelo al proceso manual. El equipo cambia cuando los resultados cuadran.',
          'Cómo funciona un proyecto así se explica en [Metodología](/werkwijze). Quién lo construye, en [Sobre Wouter](/over).',
        ],
      },
    ],
    helps: {
      heading: 'Cómo ayuda Agentic Mindshift',
      bullets: [
        'Ponemos por escrito su revisión mensual actual y decidimos qué controles debe incluir.',
        'Construimos el flujo de trabajo, con pasos de cálculo probados y una revisión de su equipo como último paso.',
        'Lo traspasamos, para que su equipo lo ejecute y lo adapte por sí mismo.',
      ],
      note: 'La primera conversación dura veinte minutos y es sin compromiso.',
    },
    datePublished: PUBLISHED,
  },

  /* ─────────────────────────────────────────────────────────────────────
     (c) Deal documents in ChatGPT: NDA and GDPR (RGPD)
     ───────────────────────────────────────────────────────────────────── */
  'dealstukken-en-ai': {
    metaTitle: 'Documentos de deal en ChatGPT: NDA y RGPD',
    metaDescription:
      '¿Puede su equipo subir documentos del data room a ChatGPT o Claude? Lo que exigen el NDA, el RGPD y los ajustes del proveedor. Marco neerlandés y de la UE.',
    shortName: 'Documentos de deal e IA',
    teaser: 'Lo que exigen el NDA, el RGPD y los ajustes del proveedor antes de subir documentos a una herramienta de IA.',
    eyebrow: 'NDA · RGPD · Marco neerlandés y de la UE',
    bgChar: '§',
    h1: 'Documentos de deal en ChatGPT: ¿qué permiten el NDA y el RGPD?',
    answer:
      'Se puede, si hay tres cosas resueltas: el NDA permite compartir con el proveedor, hay un contrato de encargo del tratamiento con ese proveedor y los ajustes garantizan que sus documentos no se usan para entrenar modelos. Una cuenta personal o gratuita no suele cumplir esas condiciones. Este es el marco neerlandés y europeo (RGPD), no asesoramiento jurídico para su caso concreto.',
    sections: [
      {
        heading: '¿Qué dice el NDA?',
        bullets: [
          'Un NDA limita a quién puede dar información confidencial y con qué fin. A menudo, solo a empleados y asesores propios que la necesitan para la operación.',
          'Un proveedor de IA es un tercero. Que pueda alojar documentos allí depende del texto. Fíjese en la definición de «representatives» o asesores, y en lo que dice sobre el almacenamiento en terceros.',
          'Atención a la obligación de devolver o destruir la información al terminar. También se aplica a lo que esté en el proveedor.',
          'Si tiene dudas, pida permiso o inclúyalo en la negociación del NDA.',
        ],
      },
      {
        heading: '¿Hay datos personales en el data room?',
        paragraphs: [
          'Casi siempre: contratos laborales, listados de salarios, datos de clientes, correspondencia. Entonces se aplica el RGPD.',
        ],
        bullets: [
          'Quien decide por qué y cómo se tratan los datos es el responsable del tratamiento. Un proveedor de IA que solo trata datos siguiendo sus instrucciones es encargado del tratamiento.',
          'Con un encargado se firma un contrato de encargo del tratamiento. Las suscripciones profesionales de los grandes proveedores lo ofrecen; para cuentas personales normalmente no existe.',
          'Comparta solo lo necesario. Un listado de salarios no hace falta para resumir los contratos de arrendamiento.',
          'Si los datos salen de la UE, hace falta una base para la transferencia, como las cláusulas contractuales tipo de la Comisión Europea.',
          'Las categorías especiales de datos, como los datos de salud de los expedientes de bajas, exigen especial cuidado.',
        ],
      },
      {
        heading: '¿Qué ajustes del proveedor importan?',
        bullets: [
          'Entrenamiento: sus entradas no deben usarse para entrenar modelos. En las suscripciones profesionales suele ser la opción por defecto; en las cuentas personales a menudo hay que desactivarlo uno mismo.',
          'Plazo de conservación: ¿cuánto tiempo guarda el proveedor las entradas y los resultados, y puede acortarlo?',
          'Región: elija, siempre que sea posible, almacenamiento y tratamiento en la UE.',
          'Acceso: ¿quién ve en la firma qué chats y archivos, y qué pasa cuando alguien se marcha?',
          'Registro: ¿puede ver después qué documentos se han compartido?',
        ],
      },
      {
        heading: '¿Qué debe organizar una firma?',
        steps: [
          'Una cuenta profesional para el equipo, con contrato de encargo del tratamiento. El trabajo de deals no pasa por cuentas personales.',
          'Una norma interna breve: qué documentos pueden subirse, cuáles no y quién decide en caso de duda.',
          'Una cláusula fija en sus NDA sobre el uso de servicios de IA con las garantías adecuadas.',
          'Los ajustes, por escrito: entrenamiento desactivado, plazo de conservación conocido, región UE siempre que sea posible.',
          'Un momento fijo en el que alguien comprueba que todo sigue así.',
        ],
      },
      {
        heading: '¿Es esto asesoramiento jurídico?',
        paragraphs: [
          'No. Es el marco general neerlandés y europeo. Wouter Dijkman estudió Derecho. Cada NDA y cada data room es distinto. En caso de duda, pida a su propio abogado que revise el texto de su NDA y de su contrato de encargo del tratamiento.',
          '¿Quiere después usar la IA de verdad en el trabajo de deals? Vea [IM y teasers](/im-en-teasers) e [Informe mensual](/maandrapportage).',
        ],
      },
    ],
    helps: {
      heading: 'Cómo ayuda Agentic Mindshift',
      bullets: [
        'Elegimos con usted un entorno de IA profesional y configuramos bien los ajustes.',
        'Redactamos una norma interna breve para la IA en el trabajo de deals.',
        'Configuramos los flujos de trabajo para que los documentos confidenciales se queden donde deben.',
      ],
      note: 'La primera conversación dura veinte minutos y es sin compromiso. Más sobre el enfoque en [Metodología](/werkwijze).',
    },
    datePublished: PUBLISHED,
  },
};
