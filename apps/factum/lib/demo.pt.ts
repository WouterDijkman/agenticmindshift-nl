import type { DemoCopy } from './demoData';

/** Portuguese copy for the /platform demo. Rules in demo.ts. */
export const DEMO_PT: DemoCopy = {
  chrome: {
    screenLabel: 'Espaço de revisão da Factum, exemplo construído',
    badge: 'Exemplo construído',
    back: 'Carteira',
    dealNote: 'Empresa fictícia · {docs} documentos no data room',
    stations: ['Preparar o dossiê', 'Rever', 'Relatório ao cliente'],
    waiting: '{n} constatações aguardam a sua decisão',
    decidedAll: 'Todas as constatações têm decisão',
    railLabel: 'Disciplinas',
    domains: { financial: 'Financeira', legal: 'Jurídica', tax: 'Fiscal', commercial: 'Comercial' },
    railOpen: '{n} em aberto',
    railDone: 'decididas',
    missingTab: 'Documentos em falta',
    missingCount: '{n} em falta',
    severity: { critical: 'Crítica', high: 'Alta', medium: 'Média' },
    counter: '{i} de {n}',
    prev: 'Constatação anterior',
    next: 'Constatação seguinte',
    fields: {
      module: 'Módulo',
      finding: 'Constatação',
      why: 'Porque é uma constatação',
      observed: 'Verificado',
      standard: 'Critério',
      application: 'Aplicação',
      excerpt: 'Excerto literal',
      severity: 'Gravidade',
      calc: 'Cálculo',
      source: 'Fonte e localização',
      review: 'Revisão humana'
    },
    excerptMarked: 'Marcado na fonte, {loc}',
    excerptExact: 'Palavra por palavra do documento',
    calcNote: 'Cada operando cita a sua fonte.',
    review: {
      pending: 'Aguarda o seu revisor. Nada chega ao cliente sem aprovação.',
      approved: 'Aprovada pelo seu revisor.',
      adjusted: 'Ajustada e aprovada pelo seu revisor.',
      investigate: 'Enviada para investigação: {route}.',
      rejected: 'Rejeitada: {reason}.'
    },
    decisions: { approve: 'Aprovar', adjust: 'Ajustar', investigate: 'Mandar investigar', reject: 'Rejeitar' },
    demoNote: 'É apenas uma demo. Nada é guardado.',
    rejectTitle: 'Porquê rejeitar?',
    reasons: ['A fonte não a sustenta', 'Não é material', 'Duplicada', 'Fora do mandato'],
    investigateTitle: 'Como investigar?',
    routes: ['A Factum continua a procurar', 'Perguntar ao vendedor', 'Rastrear em todos os documentos'],
    adjustTitle: 'Ajustar a constatação',
    adjustSave: 'Guardar ajuste',
    cancel: 'Cancelar',
    undo: 'Anular',
    sourceLabel: 'Fonte',
    schematic: 'Esquema',
    original: 'Original',
    pageOf: 'p. {n} de {total}',
    page: 'p. {n}',
    sheet: 'folha {s}',
    sourceHint: 'A constatação assenta na passagem marcada. Confronte-a com o original.',
    docLanguage: 'Língua do documento: alemão',
    missingTitle: 'Documentos em falta',
    missingLead: 'O que um comprador espera neste data room, face ao que chegou.',
    received: 'Recebido',
    missing: 'Em falta',
    footnote:
      'Exemplo construído. A Halvoria Antriebstechnik GmbH e todos os nomes, documentos e números aqui são fictícios. As citações ficam na língua do documento. As decisões não são guardadas.'
  },
  findings: {
    'FIN-01': {
      title: 'O EBITDA de 2025 inclui 640.000 € não recorrentes',
      area: 'Financeira · Qualidade dos resultados',
      finding:
        'O EBITDA de 2025 reportado, de 3,22 M€, inclui a reversão de uma provisão para garantias de 640.000 €. O EBITDA ajustado é de 2,58 M€. As contas de gestão não mostram normalizações.',
      observed:
        'O anexo classifica a reversão de 640.000 € como rendimento de outro exercício [1]. Está em outros rendimentos operacionais, de 720.000 € [2]. As contas de gestão registam zero normalizações [3]. O IM afirma que não houve itens não recorrentes [4].',
      standard:
        'A qualidade dos resultados retira do EBITDA os itens não recorrentes e de outros exercícios. A minuta de SPA avalia a empresa em 7,76 × EBITDA de 2025 segundo as contas de gestão [5].',
      application:
        'O EBITDA ajustado é de 2,58 M€, uma margem de 10,5 % contra 13,1 % no IM. Ao múltiplo do SPA, a reversão arrasta cerca de 4,97 M€ de valor da empresa.',
      calc: [
        ['EBITDA de 2025 reportado', 'Reversão da provisão para garantias', 'EBITDA ajustado'],
        ['EBITDA ajustado', 'Receitas de 2025', 'Margem EBITDA ajustada'],
        ['Reversão da provisão para garantias', 'Múltiplo do SPA', 'Valor da empresa arrastado']
      ]
    },
    'FIN-02': {
      title: 'Covenant violado no EBITDA ajustado: 3,14x contra 3,00x',
      area: 'Financeira · Dívida líquida e financiamento',
      finding:
        'No EBITDA ajustado, a alavancagem a 31 de dezembro de 2025 é de 3,14x. O § 14 do contrato de crédito limita-a a 3,00x. O certificado de cumprimento reportou 2,52x.',
      observed:
        'O certificado de cumprimento reporta 2,52 : 1 sobre um EBITDA de 3,22 M€ [4]. Esse EBITDA inclui a reversão de 640.000 € de outro exercício [3]. A dívida líquida é de 8,1 M€: 8,7 M€ de dívida bancária menos 0,6 M€ de caixa [2].',
      standard:
        'O § 14.1 limita a dívida líquida sobre EBITDA a 3,00 : 1. O § 14.2 define o EBITDA sem rendimentos não recorrentes nem de outros exercícios [1]. Uma violação permite ao banco denunciar e exigir o empréstimo [5].',
      application:
        'Ajustada, a alavancagem é de 3,14x, acima do limite. Não há nenhum waiver no data room. O § 18.2 (b) dá ao banco um segundo direito de denúncia pela própria mudança de controlo [5].',
      calc: [
        ['Dívidas a instituições de crédito', 'Caixa', 'Dívida líquida'],
        ['Dívida líquida', 'EBITDA ajustado', 'Alavancagem ajustada', 'Limite do § 14.1'],
        ['Dívida líquida', 'EBITDA certificado', 'Alavancagem certificada']
      ]
    },
    'LEG-01': {
      title: 'O maior cliente pode denunciar com a mudança de controlo',
      area: 'Jurídica · Mudança de controlo',
      finding:
        'A Velmora, 28 % das receitas de 2025, pode denunciar o contrato-quadro após a venda. A resposta do vendedor no Q&A só menciona o banco.',
      observed:
        'O § 21 permite à Velmora denunciar nos seis meses seguintes à notificação, com três meses de pré-aviso e sem indemnização [1]. A Velmora gerou 6,9 M€, 28 % das receitas de 2025 [2]. Questionado sobre cláusulas de mudança de controlo, o vendedor respondeu que só o banco tem uma [3].',
      standard:
        'Um direito que a própria operação ativa pertence ao SPA: como condição de fecho, indemnização específica ou ajuste de preço.',
      application:
        'A minuta de SPA não tem nenhuma delas. A sua única condição de fecho é a autorização da concorrência [4]. O contrato contradiz a resposta do Q&A.',
      calc: [['Receitas da Velmora 2025', 'Receitas de 2025', 'Peso nas receitas']]
    },
    'LEG-02': {
      title: 'Arrendamento da fábrica termina em meados de 2027 e o senhorio condiciona o consentimento',
      area: 'Jurídica · Imobiliário',
      finding:
        'O arrendamento da fábrica de Bamberg termina a 30 de junho de 2027, sem opção de renovação. A venda das quotas exige o consentimento prévio e escrito do senhorio. Ele só o dá com uma renovação de dez anos a 890.000 € por ano.',
      observed:
        'O contrato termina a 30 de junho de 2027 sem opção de renovação [2]. A transmissão de mais de 50 % das quotas exige consentimento prévio por escrito. Sem ele, o senhorio pode denunciar sem pré-aviso [1]. A carta de 2 de setembro de 2026 fixa as condições de ambos [3].',
      standard: 'O consentimento tem de estar assinado antes do fecho. O IM afirma que o arrendamento será renovado [6].',
      application:
        'A renda sobe de 684.000 € para 890.000 € por ano [4], antes de indexação. A licença da linha de pintura está ligada a este local. Mudar exige uma licença nova, em regra de 9 a 14 meses [5].',
      calc: [
        ['Renda exigida', 'Renda atual', 'Aumento anual'],
        ['Aumento anual', 'Prazo exigido (anos)', 'Aumento durante o prazo']
      ]
    },
    'TAX-01': {
      title: 'Consolidação fiscal sob inspeção e sem indemnização fiscal',
      area: 'Fiscal · Consolidação fiscal (Organschaft)',
      finding:
        'A transferência de lucros de 2024 só foi paga a 15 de janeiro de 2026. Uma inspeção a 2022–2024 começa a 2 de novembro de 2026 e visa a consolidação fiscal. A minuta de SPA não dá indemnização se esta cair.',
      observed:
        'O vendor tax fact book diz que a consolidação foi aplicada em todos os anos. Depois regista que a transferência de 2024 foi paga a 15 de janeiro de 2026 [1]. A administração fiscal inspeciona 2022–2024 a partir de 2 de novembro de 2026, com a execução efetiva da consolidação como foco [2].',
      standard:
        'A consolidação fiscal só se mantém se o contrato de transferência de lucros for efetivamente executado durante o prazo mínimo de cinco anos [3][6]. A minuta de SPA termina o contrato no fecho e exclui indemnização por perda retroativa [4].',
      application:
        'O fecho está previsto para 30 de novembro de 2026 [5], um mês antes do fim do prazo mínimo. Se a inspeção rejeitar a consolidação, a sociedade-alvo pode ser tributada por conta própria nesses anos. Com esta minuta, quem suporta isso é o comprador.'
    },
    'TAX-02': {
      title: 'Comissão de gestão sobe 75 % sem suporte de preços de transferência',
      area: 'Fiscal · Preços de transferência',
      finding:
        'A comissão mensal ao vendedor passou de 20.000 € para 35.000 €, sem registo de serviços nem análise de preços de transferência. A inspeção visa-a. A minuta de SPA mantém-na até ao fecho como leakage permitido.',
      observed:
        'O acordo fixa 35.000 € por mês, contra 20.000 € até 2024. Regista que não existe registo de serviços nem análise de preços de transferência [1]. A ordem de inspeção aponta as comissões de gestão como foco [2].',
      standard:
        'As comissões entre partes relacionadas precisam de uma base de mercado que a empresa possa documentar. O SPA admite comissões de gestão até 35.000 € por mês como leakage [3].',
      application:
        'Sem documentação, a administração fiscal pode tratar parte da comissão como distribuição oculta de lucros. Da data de locked box [4] até ao fecho previsto [5], saem assim até 385.000 €.',
      calc: [
        ['Comissão mensal desde 2025', 'Comissão mensal até 2024', 'Aumento mensal', 'Meses', 'Aumento anual'],
        ['Comissão mensal', 'Meses de locked box ao fecho', 'Leakage permitido até ao fecho']
      ]
    },
    'COM-01': {
      title: 'Maior cliente: desconto de 3 % todos os anos e encomendas em queda',
      area: 'Comercial · Clientes e preços',
      finding:
        'A Velmora, 28 % das receitas, recebe uma redução de preço de 3 % todos os anos a partir de 2026. As encomendas ficaram 4 %, 8 % e 12 % abaixo do ano anterior no primeiro, segundo e terceiro trimestres de 2026. Mesmo assim, o plano de 2026 cresce 6,9 %.',
      observed:
        'O § 9.3 concede à Velmora uma redução anual de 3 % em todos os preços de peças a partir de 1 de janeiro de 2026 [1]. Os relatórios trimestrais mostram encomendas da Velmora 4 % [5], 8 % [6] e 12 % [2] abaixo. O relatório do terceiro trimestre cita a redução e a passagem a um segundo fornecedor [2].',
      standard:
        'Um plano é credível quando reflete os preços contratados e as encomendas atuais do maior cliente.',
      application:
        'Com os volumes de 2025, só a redução custa cerca de 207.000 € por ano [3]. O plano assume receitas de 26,3 M€ em 2026 [4], 6,9 % acima de 2025 [7].',
      calc: [
        ['Receitas da Velmora 2025', 'Redução anual de preço', 'Efeito preço anual'],
        ['Plano de receitas 2026', 'Receitas de 2025', 'Aumento previsto', 'Receitas de 2025', 'Crescimento previsto']
      ]
    },
    'COM-02': {
      title: 'Quatro dos cinco maiores clientes podem sair com seis meses de pré-aviso',
      area: 'Comercial · Base contratual',
      finding:
        'O IM diz que os cinco maiores clientes têm contratos-quadro de longo prazo. Quatro deles podem denunciar com seis meses de pré-aviso para o fim do ano. Juntos somam 8,1 M€, 32,9 % das receitas de 2025.',
      observed:
        'Os contratos com a Ortelia [1], a Brisgau [2], a Selvan [3] e a Tremonia [4] não têm termo e cessam com seis meses de pré-aviso para o fim do ano. O IM descreve contratos-quadro de longo prazo com os cinco maiores clientes [5].',
      standard:
        'As receitas só contam como contratadas durante o prazo em que o cliente está vinculado. A lista de clientes dá as receitas por cliente [6].',
      application:
        'Só a Velmora está vinculada até 2028 [8], e pode denunciar com a mudança de controlo. Os outros quatro somam 8,1 M€ com seis meses de pré-aviso.',
      calc: [
        ['Ortelia', 'Brisgau', 'Selvan', 'Tremonia', 'Receitas com seis meses de pré-aviso'],
        ['Receitas com seis meses de pré-aviso', 'Receitas de 2025', 'Peso nas receitas']
      ]
    }
  },
  expected: [
    { label: 'Contas anuais 2024 e 2025 (HGB)' },
    { label: 'Contas de gestão e plano' },
    { label: 'Contrato de crédito, versão completa', note: 'No data room só há um extrato.' },
    { label: 'Waiver ou correspondência bancária sobre 2025', note: 'Necessário para fechar a constatação do covenant.' },
    { label: 'Contratos com clientes, os cinco maiores' },
    { label: 'Arrendamento e correspondência com o senhorio' },
    { label: 'Contrato de licença, patente EP 3 412 118', note: 'O gerente detém a patente a título pessoal.' },
    { label: 'Acordo de subcontratação de dados, alojamento IT', note: 'Não anexado ao contrato de outsourcing.' },
    { label: 'Minuta de SPA' },
    { label: 'Contrato de transferência de lucros' },
    { label: 'Liquidações fiscais 2022–2024' },
    { label: 'Documentação de preços de transferência, comissão de gestão', note: 'O acordo diz que não existe.' }
  ]
};
