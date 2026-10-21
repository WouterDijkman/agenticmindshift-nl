import type { DemoCopy } from './demoData';

/** Spanish copy for the /platform demo. Rules in demo.ts. */
export const DEMO_ES: DemoCopy = {
  chrome: {
    screenLabel: 'Espacio de revisión de Factum, ejemplo construido',
    badge: 'Ejemplo construido',
    back: 'Cartera',
    dealNote: 'Empresa ficticia · {docs} documentos en el data room',
    stations: ['Preparar el expediente', 'Revisar', 'Informe al cliente'],
    waiting: '{n} hallazgos esperan su decisión',
    decidedAll: 'Todos los hallazgos tienen decisión',
    railLabel: 'Disciplinas',
    domains: { financial: 'Financiera', legal: 'Legal', tax: 'Fiscal', commercial: 'Comercial' },
    railOpen: '{n} abiertos',
    railDone: 'decididos',
    missingTab: 'Documentos que faltan',
    missingCount: 'faltan {n}',
    severity: { critical: 'Crítica', high: 'Alta', medium: 'Media' },
    counter: '{i} de {n}',
    prev: 'Hallazgo anterior',
    next: 'Hallazgo siguiente',
    fields: {
      module: 'Módulo',
      finding: 'Hallazgo',
      why: 'Por qué es un hallazgo',
      observed: 'Constatado',
      standard: 'Criterio',
      application: 'Aplicación',
      excerpt: 'Extracto literal',
      severity: 'Gravedad',
      calc: 'Cálculo',
      source: 'Fuente y ubicación',
      review: 'Revisión humana'
    },
    excerptMarked: 'Marcado en la fuente, {loc}',
    excerptExact: 'Palabra por palabra del documento',
    calcNote: 'Cada operando cita su fuente.',
    review: {
      pending: 'Pendiente de su revisor. Nada llega al cliente sin su firma.',
      approved: 'Aprobado por su revisor.',
      adjusted: 'Ajustado y aprobado por su revisor.',
      investigate: 'Enviado a investigar: {route}.',
      rejected: 'Rechazado: {reason}.'
    },
    decisions: { approve: 'Aprobar', adjust: 'Ajustar', investigate: 'Mandar a investigar', reject: 'Rechazar' },
    demoNote: 'Solo es una demo. No se guarda nada.',
    rejectTitle: '¿Por qué rechazarlo?',
    reasons: ['La fuente no lo respalda', 'No es material', 'Duplicado', 'Fuera del encargo'],
    investigateTitle: '¿Cómo investigarlo?',
    routes: ['Factum sigue buscando', 'Preguntar al vendedor', 'Rastrearlo en todos los documentos'],
    adjustTitle: 'Ajustar el hallazgo',
    adjustSave: 'Guardar ajuste',
    cancel: 'Cancelar',
    undo: 'Deshacer',
    sourceLabel: 'Fuente',
    schematic: 'Esquema',
    original: 'Original',
    pageOf: 'pág. {n} de {total}',
    page: 'pág. {n}',
    sheet: 'hoja {s}',
    sourceHint: 'El hallazgo se apoya en el pasaje marcado. Compárelo con el original.',
    docLanguage: 'Idioma del documento: alemán',
    missingTitle: 'Documentos que faltan',
    missingLead: 'Lo que un comprador espera en este data room, frente a lo que ha llegado.',
    received: 'Recibido',
    missing: 'Falta',
    footnote:
      'Ejemplo construido. Halvoria Antriebstechnik GmbH y todos los nombres, documentos y cifras de aquí son ficticios. Las citas se quedan en el idioma del documento. Las decisiones no se guardan.'
  },
  findings: {
    'FIN-01': {
      title: 'El EBITDA 2025 incluye 640.000 € no recurrentes',
      area: 'Financiera · Calidad del resultado',
      finding:
        'El EBITDA 2025 declarado, de 3,22 M€, incluye la reversión de una provisión por garantías de 640.000 €. El EBITDA ajustado es de 2,58 M€. Las cuentas de gestión no muestran normalizaciones.',
      observed:
        'La memoria califica la reversión de 640.000 € como ingreso de otro ejercicio [1]. Está en otros ingresos de explotación, de 720.000 € [2]. Las cuentas de gestión recogen cero normalizaciones [3]. El IM afirma que no hubo partidas no recurrentes [4].',
      standard:
        'La calidad del resultado elimina del EBITDA las partidas no recurrentes y de otros ejercicios. El borrador de SPA valora la empresa en 7,76 × EBITDA 2025 según las cuentas de gestión [5].',
      application:
        'El EBITDA ajustado es de 2,58 M€, un margen del 10,5 % frente al 13,1 % del IM. Al múltiplo del SPA, la reversión arrastra unos 4,97 M€ de valor de empresa.',
      calc: [
        ['EBITDA 2025 declarado', 'Reversión de la provisión por garantías', 'EBITDA ajustado'],
        ['EBITDA ajustado', 'Ingresos 2025', 'Margen EBITDA ajustado'],
        ['Reversión de la provisión por garantías', 'Múltiplo del SPA', 'Valor de empresa arrastrado']
      ]
    },
    'FIN-02': {
      title: 'Covenant incumplido sobre el EBITDA ajustado: 3,14x frente a 3,00x',
      area: 'Financiera · Deuda neta y financiación',
      finding:
        'Sobre el EBITDA ajustado, el apalancamiento a 31 de diciembre de 2025 es de 3,14x. El § 14 del contrato de crédito lo limita a 3,00x. El certificado de cumplimiento declaró 2,52x.',
      observed:
        'El certificado de cumplimiento declara 2,52 : 1 sobre un EBITDA de 3,22 M€ [4]. Ese EBITDA incluye la reversión de 640.000 € de otro ejercicio [3]. La deuda neta es de 8,1 M€: 8,7 M€ de deuda bancaria menos 0,6 M€ de caja [2].',
      standard:
        'El § 14.1 limita la deuda neta sobre EBITDA a 3,00 : 1. El § 14.2 define el EBITDA sin ingresos no recurrentes ni de otros ejercicios [1]. Un incumplimiento permite al banco resolver y exigir el préstamo [5].',
      application:
        'Ajustado, el apalancamiento es de 3,14x, por encima del límite. No hay ninguna dispensa en el data room. El § 18.2 (b) da al banco un segundo derecho de resolución por el propio cambio de control [5].',
      calc: [
        ['Deudas con entidades de crédito', 'Caja', 'Deuda neta'],
        ['Deuda neta', 'EBITDA ajustado', 'Apalancamiento ajustado', 'Límite del § 14.1'],
        ['Deuda neta', 'EBITDA certificado', 'Apalancamiento certificado']
      ]
    },
    'LEG-01': {
      title: 'El mayor cliente puede resolver por el cambio de control',
      area: 'Legal · Cambio de control',
      finding:
        'Velmora, el 28 % de los ingresos de 2025, puede resolver su contrato marco tras la venta. La respuesta del vendedor en el Q&A solo menciona al banco.',
      observed:
        'El § 21 permite a Velmora resolver en los seis meses siguientes a la notificación, con tres meses de preaviso y sin indemnización [1]. Velmora aportó 6,9 M€, el 28 % de los ingresos de 2025 [2]. Preguntado por cláusulas de cambio de control, el vendedor respondió que solo la tiene el banco [3].',
      standard:
        'Un derecho que activa la propia operación pertenece al SPA: como condición de cierre, indemnidad específica o ajuste de precio.',
      application:
        'El borrador de SPA no recoge ninguna. Su única condición de cierre es la autorización de competencia [4]. El contrato contradice la respuesta del Q&A.',
      calc: [['Ingresos de Velmora 2025', 'Ingresos 2025', 'Peso en los ingresos']]
    },
    'LEG-02': {
      title: 'El arrendamiento de la planta vence a mediados de 2027 y el arrendador condiciona su consentimiento',
      area: 'Legal · Inmuebles',
      finding:
        'El arrendamiento de la planta de Bamberg vence el 30 de junio de 2027, sin opción de prórroga. La venta de participaciones exige el consentimiento previo y por escrito del arrendador. Solo lo da con una prórroga de diez años a 890.000 € anuales.',
      observed:
        'El contrato vence el 30 de junio de 2027 sin opción de prórroga [2]. Transmitir más del 50 % de las participaciones exige consentimiento previo por escrito. Sin él, el arrendador puede resolver sin preaviso [1]. Su carta del 2 de septiembre de 2026 fija las condiciones de ambas cosas [3].',
      standard: 'El consentimiento debe estar firmado antes del cierre. El IM afirma que el arrendamiento se prorrogará [6].',
      application:
        'La renta sube de 684.000 € a 890.000 € anuales [4], antes de indexación. El permiso de la línea de pintura está ligado a este emplazamiento. Mudarse exige un permiso nuevo, normalmente de 9 a 14 meses [5].',
      calc: [
        ['Renta exigida', 'Renta actual', 'Subida anual'],
        ['Subida anual', 'Plazo exigido (años)', 'Subida durante el plazo']
      ]
    },
    'TAX-01': {
      title: 'Consolidación fiscal en inspección y sin indemnidad fiscal',
      area: 'Fiscal · Consolidación fiscal (Organschaft)',
      finding:
        'La transferencia de beneficios de 2024 no se pagó hasta el 15 de enero de 2026. Una inspección de 2022 a 2024 empieza el 2 de noviembre de 2026 y apunta a la consolidación fiscal. El borrador de SPA no da indemnidad si esta cae.',
      observed:
        'El vendor tax fact book dice que la consolidación se aplicó todos los años. Después anota que la transferencia de 2024 se pagó el 15 de enero de 2026 [1]. Hacienda inspecciona 2022 a 2024 desde el 2 de noviembre de 2026, con la ejecución efectiva de la consolidación como foco [2].',
      standard:
        'La consolidación fiscal solo se sostiene si el contrato de transferencia de beneficios se ejecuta de verdad durante su plazo mínimo de cinco años [3][6]. El borrador de SPA lo resuelve al cierre y excluye una indemnidad por pérdida retroactiva [4].',
      application:
        'El cierre está previsto para el 30 de noviembre de 2026 [5], un mes antes del fin del plazo mínimo. Si la inspección rechaza la consolidación, la sociedad objetivo puede tributar por su cuenta esos años. Con este borrador, lo asume el comprador.'
    },
    'TAX-02': {
      title: 'Comisión de gestión un 75 % más alta, sin soporte de precios de transferencia',
      area: 'Fiscal · Precios de transferencia',
      finding:
        'La comisión mensual al vendedor pasó de 20.000 € a 35.000 €, sin registro de servicios ni análisis de precios de transferencia. La inspección apunta a ella. El borrador de SPA la mantiene hasta el cierre como leakage permitido.',
      observed:
        'El acuerdo fija 35.000 € al mes, frente a 20.000 € hasta 2024. Hace constar que no existe registro de servicios ni análisis de precios de transferencia [1]. La orden de inspección señala las comisiones de gestión como foco [2].',
      standard:
        'Las comisiones entre partes vinculadas necesitan una base de mercado que la empresa pueda documentar. El SPA admite comisiones de gestión de hasta 35.000 € al mes como leakage [3].',
      application:
        'Sin documentación, Hacienda puede tratar parte de la comisión como distribución encubierta de beneficios. Desde la fecha de locked box [4] hasta el cierre previsto [5], salen así hasta 385.000 €.',
      calc: [
        ['Comisión mensual desde 2025', 'Comisión mensual hasta 2024', 'Subida mensual', 'Meses', 'Subida anual'],
        ['Comisión mensual', 'Meses de locked box a cierre', 'Leakage permitido hasta el cierre']
      ]
    },
    'COM-01': {
      title: 'Mayor cliente: rebaja del 3 % cada año y pedidos a la baja',
      area: 'Comercial · Clientes y precios',
      finding:
        'Velmora, el 28 % de los ingresos, recibe una rebaja de precios del 3 % cada año desde 2026. Sus pedidos cayeron un 4 %, un 8 % y un 12 % interanual entre el primer y el tercer trimestre de 2026. Aun así, el plan 2026 crece un 6,9 %.',
      observed:
        'El § 9.3 concede a Velmora una rebaja anual del 3 % en todos los precios de piezas desde el 1 de enero de 2026 [1]. Los informes trimestrales muestran pedidos de Velmora un 4 % [5], un 8 % [6] y un 12 % [2] por debajo. El informe del tercer trimestre cita la rebaja y el paso a un segundo proveedor [2].',
      standard:
        'Un plan es creíble cuando refleja los precios pactados y los pedidos actuales del mayor cliente.',
      application:
        'Con los volúmenes de 2025, solo la rebaja cuesta unos 207.000 € al año [3]. El plan prevé 26,3 M€ de ingresos en 2026 [4], un 6,9 % más que en 2025 [7].',
      calc: [
        ['Ingresos de Velmora 2025', 'Rebaja anual de precios', 'Efecto precio anual'],
        ['Plan de ingresos 2026', 'Ingresos 2025', 'Aumento previsto', 'Ingresos 2025', 'Crecimiento previsto']
      ]
    },
    'COM-02': {
      title: 'Cuatro de los cinco mayores clientes pueden irse con seis meses de preaviso',
      area: 'Comercial · Base contractual',
      finding:
        'El IM dice que los cinco mayores clientes tienen contratos marco a largo plazo. Cuatro de ellos pueden resolver con seis meses de preaviso a fin de año. Juntos suman 8,1 M€, el 32,9 % de los ingresos de 2025.',
      observed:
        'Los contratos con Ortelia [1], Brisgau [2], Selvan [3] y Tremonia [4] son indefinidos y terminan con seis meses de preaviso a fin de año. El IM describe contratos marco a largo plazo con los cinco mayores clientes [5].',
      standard:
        'Los ingresos solo cuentan como contratados durante el plazo en que el cliente está vinculado. La lista de clientes da los ingresos por cliente [6].',
      application:
        'Solo Velmora está vinculada hasta 2028 [8], y puede resolver por el cambio de control. Los otros cuatro suman 8,1 M€ con seis meses de preaviso.',
      calc: [
        ['Ortelia', 'Brisgau', 'Selvan', 'Tremonia', 'Ingresos con seis meses de preaviso'],
        ['Ingresos con seis meses de preaviso', 'Ingresos 2025', 'Peso en los ingresos']
      ]
    }
  },
  expected: [
    { label: 'Cuentas anuales 2024 y 2025 (HGB)' },
    { label: 'Cuentas de gestión y plan' },
    { label: 'Contrato de crédito, versión completa', note: 'En el data room solo hay un extracto.' },
    { label: 'Dispensa o correspondencia bancaria sobre 2025', note: 'Necesaria para cerrar el hallazgo del covenant.' },
    { label: 'Contratos con clientes, los cinco mayores' },
    { label: 'Arrendamiento y correspondencia con el arrendador' },
    { label: 'Contrato de licencia, patente EP 3 412 118', note: 'El administrador es titular personal de la patente.' },
    { label: 'Contrato de encargo de tratamiento, hosting IT', note: 'No se adjunta al contrato de externalización.' },
    { label: 'Borrador de SPA' },
    { label: 'Contrato de transferencia de beneficios' },
    { label: 'Liquidaciones fiscales 2022–2024' },
    { label: 'Documentación de precios de transferencia, comisión de gestión', note: 'El acuerdo dice que no existe.' }
  ]
};
