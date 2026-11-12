import type { Guide, GuideChrome } from './guides';
import type { GuideSlug } from './guideRoutes';

/**
 * European Portuguese copy for the three decision pages, translated from the
 * English entry in lib/guides.ts (Dutch used as a cross-check). Same rules as
 * there: no product statement beyond the English, `{disciplines}` kept as a
 * token, inline links `[label](/path)` with the original paths. Terminology
 * follows messages/pt.json ("data room", "constatação", "revisor", "target").
 */

export const CHROME_PT: GuideChrome = {
  tocLabel: 'Nesta página',
  relatedLabel: 'Continuar a ler',
  guidesLabel: 'Guias'
};

const PUBLISHED = '2026-10-21';

export const GUIDES_PT: Record<GuideSlug, Guide> = {
  'data-room-checklist': {
    metaTitle: 'Checklist do data room antes de uma venda',
    metaDescription:
      'O que um comprador vai pedir num data room, por disciplina: os documentos, as lacunas que mais custam e quando começar. Para vendedores e brokers.',
    shortName: 'Checklist do data room',
    h1: 'O que deve estar num data room antes de uma venda?',
    answer:
      'O que um comprador vai pedir, numa forma que um comprador consiga usar: dados financeiros coerentes entre si, os contratos que sustentam a receita, pessoas, fiscal, jurídico e propriedade intelectual, cada um completo e fácil de encontrar. As lacunas que mais custam são as silenciosas: um contrato que ninguém arquivou, um ano em falta numa exportação, dois documentos com números diferentes.',
    sections: [
      {
        heading: 'Que documentos espera um comprador?',
        bullets: [
          'Financeiro: contas anuais dos últimos três anos, contas de gestão e números mensais, fundo de maneio, dívida e itens equiparados a dívida, e os ajustamentos por trás do EBITDA do memorando de informação.',
          'Comercial: uma lista de clientes com a receita por cliente, os maiores contratos com clientes, preços e descontos, abandono de clientes.',
          'Jurídico: documentos societários, contratos relevantes e as respetivas cláusulas de mudança de controlo, garantias, litígios.',
          'Fiscal: declarações e liquidações, posições em aberto, a estrutura do grupo.',
          'RH: contratos das pessoas-chave, planos de pensões, convenções coletivas de trabalho.',
          'Operacional: fornecedores-chave, pontos únicos de falha, prazos de execução.',
          'Tecnologia e IA: licenças, a quem pertencem os dados, de que modelos o negócio depende.'
        ],
        after: [
          'A lista exata segue o negócio. Um aumento de capital pede um plano de aplicação de fundos; uma venda, a carteira de encomendas.'
        ]
      },
      {
        heading: 'E se um documento lá estiver, mas não responder à pergunta?',
        paragraphs: [
          'Então um comprador lê-o como uma lacuna, e pergunta. Uma lista de clientes sem receita por cliente é o caso típico: está no data room, mas não serve para a pergunta que o comprador tem.'
        ]
      },
      {
        heading: 'E números que se contradizem?',
        paragraphs: [
          'Receita nas contas de gestão diferente da que consta das contas anuais. Um número de colaboradores na exportação de RH que não bate com o processamento salarial. Um comprador vai encontrar as duas fontes. Encontre-as primeiro, e tenha a explicação pronta.'
        ]
      },
      {
        heading: 'Porque é tão difícil detetar um documento em falta?',
        paragraphs: [
          'Porque uma ausência não deixa rasto. O contrato que ninguém arquivou, o ano em falta na exportação salarial: não há passagem para citar, por isso ninguém tropeça nisso ao ler. Só aparece quando o data room é comparado com uma lista do que um comprador espera.'
        ]
      },
      {
        heading: 'Quando deve um vendedor começar?',
        paragraphs: [
          'Cedo o suficiente para que a resposta a uma constatação ainda possa ser «já corrigimos». Assim que o data room está no ar, a resposta honesta passa a ser «sabemos, e este é o contexto». As duas funcionam. A primeira vale mais.'
        ]
      },
      {
        heading: 'Como verifica a Factum um data room?',
        paragraphs: [
          'A Factum lê o data room como um comprador o fará: o que ainda falta, o que não bate certo e que riscos um comprador vai levantar. Cada ponto passa primeiro pela sua equipa, porque um contrato guardado dentro de outro ficheiro pode aparecer como em falta.',
          'Não substitui um relatório de vendor due diligence de um assessor, e não é um serviço de limpeza. Indica o que falta; obtê-lo cabe ao vendedor. Veja [o que a IA não consegue fazer](/limits-of-ai).'
        ]
      }
    ],
    helps: {
      heading: 'Para brokers do lado vendedor',
      bullets: [
        'O data room do seu cliente lido como um comprador o vai ler, antes de o comprador o fazer.',
        'Os documentos em falta e as questões em aberto seguem para o seu cliente num único pedido, dentro da plataforma.',
        'Números que se contradizem, com as duas fontes identificadas.',
        'A sua equipa avalia cada ponto. A Factum não aprova nada.'
      ],
      note: 'Mais sobre [a Factum para vendedores e brokers](/pre-sale).'
    },
    datePublished: PUBLISHED
  },
  'due-diligence-timeline': {
    metaTitle: 'Quanto tempo demora uma due diligence?',
    metaDescription:
      'Para onde vai o tempo numa due diligence, onde se ganham dias, o que não acelera e porque a Factum não indica uma data antes de ver o data room.',
    shortName: 'Quanto tempo demora a due diligence',
    h1: 'Quanto tempo demora uma due diligence?',
    answer:
      'Mais do que a maioria dos períodos de exclusividade gostaria. Só uma leitura de quality of earnings cobre uma dimensão em quatro a dez semanas. A maior parte do tempo vai para ler, esperar e correr atrás de documentos, não para o juízo. A passagem da pipeline da Factum demora horas; a revisão da sua equipa vem depois, ao seu ritmo.',
    sections: [
      {
        heading: 'Para onde vai o tempo?',
        bullets: [
          'Ler. Uma equipa com o prazo em cima lê uma amostra do data room e mesmo assim fica sem dias.',
          'Esperar na fila. Os especialistas trabalham uns a seguir aos outros: o fiscal espera pelas leituras financeira e jurídica, a avaliação espera pelo fiscal.',
          'Correr atrás. Documentos que nunca foram carregados são descobertos tarde, pedidos e lidos de novo quando chegam.',
          'Reconciliar. Relatórios separados têm de ser alinhados uns com os outros antes de alguém poder dizer o que significam para o preço.'
        ]
      },
      {
        heading: 'Onde se podem ganhar dias?',
        paragraphs: [
          'Sobretudo nos três primeiros. A Factum lê cada documento em vez de uma amostra, corre ao mesmo tempo os módulos que não dependem uns dos outros, e lista o que falta no início em vez de no fim.',
          'Os dias vêm de correr em paralelo, não de uma resposta isolada chegar mais depressa. Como se define a ordem está na [página da plataforma](/platform).'
        ]
      },
      {
        heading: 'O que não acelera?',
        bullets: [
          'O juízo do seu revisor sobre o que é material.',
          'As respostas do vendedor às suas perguntas, e os documentos que ainda estão por chegar.',
          'A negociação do preço e do contrato de compra e venda.'
        ],
        after: [
          'O software encurta a leitura e a fila. As conversas que as constatações abrem demoram o que demoram.'
        ]
      },
      {
        heading: 'Como encurtá-la antes de começar?',
        steps: [
          'Obtenha a lista dos documentos em falta nos primeiros dias, enquanto ainda há tempo para os solicitar.',
          'Informe os seus assessores sobre o que o data room contém de facto, para que as horas deles vão para onde está o risco.',
          'Se é vendedor, prepare o data room antes de o processo começar: [o que deve estar num data room](/data-room-checklist).'
        ]
      },
      {
        heading: 'Porque não promete a Factum uma data à partida?',
        paragraphs: [
          'Porque a duração depende da dimensão e do estado do data room, e ainda não o vimos. A chamada para acordar o NDA e o data room demora trinta minutos. Dias depois, lê as constatações, fonte a fonte.'
        ]
      }
    ],
    helps: {
      heading: 'O que a Factum faz ao prazo',
      bullets: [
        'A passagem da pipeline demora horas, em {disciplines} disciplinas.',
        'Cada constatação chega com o documento de origem e a localização, pronta para o seu revisor.',
        'A lista do que nunca chegou, desde a primeira passagem.',
        'A sua equipa revê e aprova na plataforma, ao seu ritmo.'
      ],
      note: 'Jurídico e fiscal estão ajustados ao direito neerlandês; para um target noutro país, peça a assessores jurídicos locais que os revejam. Um negócio que fechou no ano passado serve como teste.'
    },
    datePublished: PUBLISHED
  },
  'when-not-to-use-factum': {
    metaTitle: 'Quando a due diligence com IA não serve',
    metaDescription:
      'Seis casos em que a Factum não é o instrumento certo: parecer assinado, direito ou fiscal estrangeiro, código, antecedentes, sem data room, ou decidir por si.',
    shortName: 'Quando a Factum não serve',
    h1: 'Quando é que a Factum não é a ferramenta certa?',
    answer:
      'Quando o negócio precisa de uma assinatura, de uma jurisdição ou de um tipo de revisão que a Factum não oferece. A Factum lê cada documento do data room e cita cada constatação com a fonte e a localização. O seu próprio revisor decide o que importa e aprova. Estes são os casos em que precisa de outra coisa, ou de algo ao lado.',
    sections: [
      {
        heading: 'Precisa de um parecer assinado',
        paragraphs: [
          'Um relatório de quality of earnings ou de vendor due diligence resulta de um mandato separado com um contabilista ou assessor que o assina, e um banco ou comprador pode apoiar-se nesse relatório. A Factum não substitui esse relatório, não presta serviços de garantia de fiabilidade e não assina nada. O seu revisor aprova as constatações para uso próprio.',
          'Se o financiamento ou o contrato de compra e venda exigir um relatório assinado, encomende-o. A Factum pode correr ao lado, em {disciplines} disciplinas, para que os especialistas partam do que o data room contém de facto.'
        ]
      },
      {
        heading: 'O jurídico e o fiscal decidem o negócio, e o target está no estrangeiro',
        paragraphs: [
          'Jurídico e fiscal estão ajustados ao direito neerlandês. As leituras financeira, comercial e operacional funcionam em qualquer jurisdição. Para um target noutro país, peça a assessores jurídicos locais que revejam as constatações jurídicas e fiscais.'
        ]
      },
      {
        heading: 'A questão é a própria tecnologia',
        paragraphs: [
          'A Factum não faz revisão de código-fonte, avaliação de arquitetura nem testes de escalabilidade. A disciplina de IA lê o que os documentos dizem: de quem é o modelo, de quem são os dados, o que cai sob o Regulamento de IA da UE. Se o código se aguenta é uma due diligence técnica à parte.'
        ]
      },
      {
        heading: 'Precisa de verificações de antecedentes ou de integridade',
        paragraphs: [
          'A Factum lê o data room. Não faz investigações de integridade ou reputação sobre pessoas ou empresas, nem verificações de antecedentes.'
        ]
      },
      {
        heading: 'Ainda não há data room',
        paragraphs: [
          'A Factum trabalha sobre documentos. Se o data room ainda não foi montado, não há nada para ler. Um vendedor que ainda se está a preparar pode começar pelo [que um comprador vai pedir](/data-room-checklist).'
        ]
      },
      {
        heading: 'Quer que decidam por si',
        paragraphs: [
          'Um modelo pode encontrar todas as cláusulas de mudança de controlo no data room. Não lhe consegue dizer qual delas mata o negócio. A materialidade depende da sua estrutura, do seu preço e do seu apetite pelo risco, e nada disso está no data room.',
          'É por isso que o passo de revisão é obrigatório: nenhuma exportação sai sem a aprovação do seu revisor. Mais em [o que a IA não consegue fazer](/limits-of-ai).'
        ]
      }
    ],
    helps: {
      heading: 'Onde a Factum encaixa',
      bullets: [
        'Todo o data room lido, com cada constatação citada ao documento e à localização.',
        '{disciplines} disciplinas numa só passagem, reconciliadas num único relatório.',
        'Uma lista viva do que o vendedor nunca carregou.',
        'Um negócio que fechou no ano passado como teste: nada em processo fica exposto, e pode comparar as constatações com o que a sua equipa encontrou na altura.'
      ],
      note: 'A Factum está em fase anterior ao lançamento: ainda não há nenhum cliente público nem estudo de caso. O primeiro relatório real que verá será o seu.'
    },
    datePublished: PUBLISHED
  },
  'ai-due-diligence-vs-data-room-ai': {
    metaTitle: 'Due diligence com IA vs. IA do data room',
    metaDescription:
      'A IA do data room ajuda a geri-lo: organizar, anonimizar, pesquisar, Q&A. A due diligence com IA lê cada documento para o comprador ou o assessor do vendedor e cita cada constatação.',
    shortName: 'Due diligence com IA vs. IA do data room',
    h1: 'Due diligence com IA ou IA do data room: qual é a diferença?',
    answer:
      'A IA do data room ajuda a gerir a sala: organiza, anonimiza e pesquisa os documentos e gere o Q&A, para a parte que conduz o processo. Uma plataforma de due diligence com IA trabalha para o comprador, ou para o assessor do vendedor que prepara o data room. Lê cada documento do data room e devolve constatações, cada uma com o documento de origem e a localização. A Factum é a segunda. O seu próprio revisor decide o que importa e aprova.',
    table: {
      heading: 'Lado a lado',
      corner: 'Pergunta',
      columns: ['IA do data room', 'Plataforma de due diligence com IA'],
      rows: [
        {
          label: 'Para quem trabalha',
          cells: [
            'A parte que gere o data room, normalmente o vendedor e o seu assessor, e todos os que nele trabalham',
            'O comprador, ou o assessor do vendedor que quer o data room lido como um comprador o vai ler'
          ]
        },
        {
          label: 'Para que serve',
          cells: [
            'Gerir o data room: organização, acessos, anonimização, pesquisa, perguntas e respostas',
            'Avaliar o target: o que os documentos significam para o negócio'
          ]
        },
        {
          label: 'O que lê',
          cells: [
            'Os documentos à medida que são carregados, para os indexar, etiquetar, anonimizar e tornar pesquisáveis',
            'Cada documento do data room, em {disciplines} disciplinas, confrontados entre si'
          ]
        },
        {
          label: 'O que recebe',
          cells: [
            'Um data room organizado e pesquisável, e um registo de Q&A em dia',
            'Constatações com a sua gravidade, números que se contradizem e uma lista do que falta'
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
            label: 'Exemplos',
            cells: [
              'Datasite (Blueflame AI), Imprima, Drooms, Ansarada, Intralinks',
              'Factum. As ferramentas de IA jurídica e financeira cobrem parte da mesma leitura: veja abaixo'
            ]
          },
          {
          label: 'Fontes',
          cells: [
            'Depende do fornecedor e da funcionalidade',
            'Cada constatação cita palavra por palavra a passagem que a sustenta, com o documento de origem e a localização'
          ]
        },
        {
          label: 'Quem aprova',
          cells: [
            'Nada a aprovar: gere o data room, não revê o target',
            'O seu próprio revisor. Nenhuma exportação sai sem essa aprovação. A Factum não assina nada.'
          ]
        }
      ],
      note:
        'Cada fornecedor descreve as suas próprias funcionalidades, e elas mudam com frequência. Alguns data rooms já analisam também documentos dentro da própria sala: a Imprima descreve revisão de contratos e resumos com IA, a Datasite um assistente que deteta possíveis lacunas. Pergunte ao seu para onde remete cada resposta e quem a aprova.'
    },
    sections: [
      {
        heading: 'O que faz a IA do data room?',
        paragraphs: [
          'Os fornecedores de data rooms virtuais integraram IA na própria sala. Ajuda quem conduz o processo a manter o data room em ordem e em andamento.'
        ],
        bullets: [
          'Organizar: classificar e indexar o que é carregado numa estrutura.',
          'Anonimizar: encontrar dados pessoais e passagens sensíveis antes de os documentos serem partilhados.',
          'Pesquisar: encontrar os documentos em que aparece um termo ou uma pergunta.',
          'Q&A: encaminhar as perguntas dos licitantes, ajudar a responder-lhes, acompanhar o que continua em aberto.'
        ],
        after: ['O trabalho é a sala: o que lá está, quem vê o quê, que perguntas continuam em aberto.']
      },
      {
        heading: 'O que faz uma plataforma de due diligence com IA?',
        paragraphs: [
          'Lê o data room para quem tem de avaliar o target. A Factum lê cada documento do data room, em {disciplines} disciplinas, e confronta-os entre si: um contrato com a receita que devia sustentar, as contas de gestão com as contas anuais.',
          'Cada constatação cita palavra por palavra a passagem que a sustenta, com o documento de origem e a localização, para que o seu revisor a possa verificar na fonte. O que devia estar no data room e não está vai para uma lista à parte.'
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
          heading: 'Onde encaixam as ferramentas de IA jurídica e financeira?',
          paragraphs: [
            'Uma equipa de deal também encontra ferramentas de IA feitas para uma única profissão. A Kira, parte da Litera, descreve-se como criada para revisões de grande volume e due diligence, para advogados. A Harvey é software de IA para serviços jurídicos e profissionais, usado por sociedades de advogados e departamentos jurídicos. A Luminance apresenta-se como uma plataforma de inteligência contratual. A Hebbia descreve uma IA criada para finanças, para investidores e banqueiros.',
            'Estas ferramentas trabalham com os documentos e as perguntas que lhes dá, quase sempre dentro de uma disciplina. A Factum lê todo o data room em {disciplines} disciplinas numa só passagem e confronta as disciplinas entre si: o módulo financeiro lê primeiro as constatações jurídicas, o fiscal lê ambas. Que ferramenta encaixa depende de quem pergunta e do que o deal precisa.'
          ]
        },
        {
        heading: 'Quando precisa de cada uma?',
        bullets: [
          'Conduz um processo de venda e quer o data room organizado, anonimizado e as perguntas sob controlo: IA do data room.',
          'Está a comprar e precisa de saber o que os documentos dizem sobre o target: due diligence com IA.',
          'Assessora o vendedor e quer o data room lido como um comprador o vai ler, antes de um comprador o fazer: due diligence com IA sobre o data room do vendedor. Veja [a Factum para vendedores e brokers](/pre-sale).'
        ],
        after: ['A maioria dos negócios usa as duas. O data room guarda os documentos; a Factum lê-os.']
      },
      {
        heading: 'Como funcionam as duas em conjunto?',
        paragraphs: [
          'O data room fica onde o processo decorre: acessos, versões, perguntas e respostas. A sua equipa carrega os documentos do data room na Factum. A Factum devolve as constatações, e o seu revisor percorre-as na plataforma. Como se prepara uma passagem está na [página da plataforma](/platform).'
        ]
      },
      {
        heading: 'O que nenhuma substitui',
        paragraphs: [
          'Um relatório assinado. Um relatório de quality of earnings ou de vendor due diligence resulta de um mandato separado com um contabilista ou assessor que o assina. A Factum não presta serviços de garantia de fiabilidade; o seu revisor aprova as constatações para uso próprio. Mais em [quando a Factum não serve](/when-not-to-use-factum).'
        ]
      }
    ],
    faq: {
      heading: 'Perguntas frequentes',
      items: [
        {
          q: 'Um data room com funcionalidades de IA é o mesmo que due diligence com IA?',
          a: 'Não. A IA do data room ajuda a gerir a sala: organizar, anonimizar, pesquisar e Q&A. A due diligence com IA lê cada documento para o comprador ou o assessor do vendedor e devolve constatações sobre o target, cada uma com o documento de origem e a localização.'
        },
        {
          q: 'A Factum substitui o nosso data room virtual?',
          a: 'Não. O data room fica onde o processo decorre. A sua equipa carrega os documentos na Factum, que os lê e devolve constatações para o seu revisor.'
        },
        {
          q: 'Quem aprova as constatações?',
          a: 'O seu próprio revisor. A revisão humana é obrigatória: nenhuma exportação sai da plataforma sem a aprovação do seu revisor. A Factum não assina nada e não presta serviços de garantia de fiabilidade.'
        },
        {
          q: 'Que disciplinas cobre a Factum?',
          a: '{disciplines} disciplinas: financeira, comercial, jurídica, fiscal, RH, IA, operacional, e avaliação e economia da operação, reconciliadas num único relatório.'
        },
        {
          q: 'Funciona para negócios fora dos Países Baixos?',
          a: 'As leituras financeira, comercial e operacional funcionam em qualquer jurisdição. Jurídico e fiscal estão ajustados ao direito neerlandês; para um target noutro país, peça a assessores jurídicos locais que revejam essas constatações.'
        },
        {
          q: 'Podemos testá-la antes de um negócio em curso?',
          a: 'Sim. Um negócio que fechou no ano passado serve de teste: nada de um processo em curso fica exposto, e pode comparar as constatações com o que a sua equipa encontrou na altura. A Factum está em fase anterior ao lançamento, por isso o primeiro relatório real que verá será o seu.'
        }
      ]
    },
    helps: {
      heading: 'Onde a Factum encaixa',
      bullets: [
        'Para private equity e outros compradores, e para sell-side brokers.',
        'Todo o data room lido, com cada constatação citada ao documento e à localização.',
        '{disciplines} disciplinas numa só passagem, reconciliadas num único relatório.',
        'A sua equipa revê as constatações e aprova na plataforma.'
      ],
      note: 'A Factum está em fase anterior ao lançamento: ainda não há nenhum cliente público nem estudo de caso. Jurídico e fiscal estão ajustados ao direito neerlandês.'
    },
    datePublished: '2026-11-08'
  },
  'dutch-bv-due-diligence': {
    metaTitle: 'Due diligence de uma BV neerlandesa: o que o comprador verifica',
    metaDescription:
      'Vai comprar uma BV neerlandesa? O que verificar no data room segundo o direito neerlandês: quotas, mudança de controlo, comissão de trabalhadores, pensões, unidade fiscal, ACM e a FDD.',
    shortName: 'Due diligence de uma BV neerlandesa',
    h1: 'Due diligence de uma BV neerlandesa: o que verifica o comprador no data room?',
    answer:
      'Quando o target é uma sociedade de responsabilidade limitada neerlandesa (besloten vennootschap, BV), o data room tem de responder a perguntas que o direito neerlandês coloca: quem detém realmente as quotas, que contratos sobrevivem à mudança de controlo, o que exigem a comissão de trabalhadores e o plano de pensões, e que posições fiscais vêm com a sociedade. Esta página trata apenas de targets sujeitos ao direito neerlandês. Explica o que um comprador verifica; não é aconselhamento jurídico.',
    sections: [
      {
        heading: 'Quem detém as quotas, e podem ser transmitidas?',
        bullets: [
          'Estatutos (statuten): o texto em vigor e qualquer restrição à transmissão (blokkeringsregeling), como um direito de preferência ou um requisito de consentimento.',
          'Registo de sócios: cada emissão e transmissão desde a constituição, cada uma com a sua escritura notarial. As quotas de uma BV transmitem-se por escritura notarial, por isso uma falha na cadeia de escrituras é uma falha na titularidade.',
          'Certificados emitidos através de uma fundação (STAK), penhores e usufruto sobre quotas, e quem detém os direitos de voto.',
          'Acordo parassocial: drag-along e tag-along, good e bad leaver, vetos que sobrevivem à venda.',
          'Certidões do Registo Comercial (KvK) e do registo de beneficiários efetivos (UBO) que coincidam com o registo de sócios.'
        ],
        after: [
          'Uma escritura em falta ou uma transmissão não registada pode muitas vezes ser corrigida antes da assinatura. Descoberta depois, passa a ser uma discussão sobre garantias.'
        ]
      },
      {
        heading: 'Que contratos mudam de mãos com a sociedade?',
        paragraphs: [
          'Numa compra de quotas os contratos ficam na BV, por isso a pergunta é quais permitem à contraparte resolver ou renegociar quando o controlo muda. Numa compra de ativos cada contrato tem de ser cedido, o que normalmente exige a colaboração da contraparte.'
        ],
        bullets: [
          'Cláusulas de mudança de controlo e de resolução nos maiores contratos com clientes, fornecedores, licenças e arrendamentos.',
          'Proibições de cessão e cláusulas de exclusividade que vinculariam o grupo do comprador após o closing.',
          'Financiamento bancário com cláusulas de mudança de controlo e cross-default, e as garantias prestadas ao abrigo dele.',
          'Garantias prestadas pela BV a favor de sociedades do grupo, incluindo declarações de responsabilidade depositadas no Registo Comercial (403-verklaringen).'
        ]
      },
      {
        heading: 'O que exigem a comissão de trabalhadores, o pessoal e as pensões?',
        bullets: [
          'Comissão de trabalhadores (ondernemingsraad): onde existe, uma mudança de controlo costuma dar-lhe um direito de consulta, e o parecer é pedido enquanto ainda pode influenciar a decisão.',
          'Sindicatos: consoante a dimensão das empresas envolvidas, o Código de Fusões do SER (SER-Fusiegedragsregels) pode exigir que sejam informados.',
          'Condições de trabalho: contratos de pessoas-chave, cláusulas de não concorrência, bónus e planos de retenção pagos com a venda, e o contrato coletivo (cao) aplicável.',
          'Pensões: que plano se aplica, se a participação num fundo de pensões setorial é obrigatória, e em que ponto está o plano na transição da Lei do futuro das pensões (Wet toekomst pensioenen).',
          'Numa compra de ativos, os trabalhadores transitam por força da lei com as suas condições (overgang van onderneming).'
        ]
      },
      {
        heading: 'Quando entram a ACM ou outro regulador?',
        paragraphs: [
          'Se o volume de negócios das partes ultrapassar os limiares da Lei da Concorrência neerlandesa (Mededingingswet), a operação tem de ser notificada antes do closing à Autoridade para os Consumidores e Mercados (ACM); acima dos limiares europeus, a competência passa para a Comissão Europeia.',
          'Além disso, adquirir um fornecedor vital ou uma empresa com tecnologia sensível pode exigir uma notificação ao abrigo da lei neerlandesa de controlo de investimentos (Wet Vifo), e uma licença num setor regulado pode exigir o consentimento do regulador. Se algo disto se aplica é uma pergunta para o seu advogado no início do processo, porque define o calendário.'
        ]
      },
      {
        heading: 'Que posições fiscais vêm com a sociedade?',
        bullets: [
          'Unidade fiscal no imposto sobre as sociedades (fiscale eenheid): o target sai da unidade fiscal do vendedor com a venda, com consequências para os prejuízos e para operações anteriores dentro do grupo.',
          'Unidade fiscal no IVA: cada membro responde solidariamente pelo IVA de toda a unidade durante o período em que pertenceu a ela.',
          'Liquidações em aberto, inspeções da Administração Fiscal neerlandesa (Belastingdienst) e qualquer ruling ou acordo em que o target se apoie.',
          'Retenções sobre salários e responsabilidade em cadeia (ketenaansprakelijkheid) quando a empresa trabalha com subempreiteiros ou trabalho temporário.',
          'Passivos fiscais diferidos que, de outra forma, surgiriam na primeira declaração após o closing.'
        ]
      },
      {
        heading: 'O que o data room normalmente não mostra?',
        paragraphs: [
          'Os documentos que ninguém carregou. Uma escritura notarial de há quinze anos, uma side letter a um contrato de cliente, o parecer da comissão de trabalhadores, o último extrato da entidade gestora das pensões. O que falta não deixa nenhuma passagem para citar, por isso só se nota quando o data room é confrontado com uma lista do que devia lá estar.',
          'Para o lado do vendedor da mesma lista, veja [a checklist do data room](/data-room-checklist).'
        ]
      },
      {
        heading: 'Como se relaciona uma leitura com IA de todo o data room com a FDD do auditor?',
        paragraphs: [
          'A due diligence financeira (FDD) de uma sociedade de auditoria ou consultoria aprofunda os números: quality of earnings, EBITDA normalizado, dívida líquida e fundo de maneio. Termina num relatório que a sociedade assina, e que um banco ou uma seguradora de W&I pode querer ver.',
          'A Factum lê cada documento do data room em {disciplines} disciplinas e devolve constatações, cada uma com o seu documento de origem e a sua localização. Não dá qualquer garantia e não assina nada; o seu próprio revisor aprova as constatações para uso próprio. Ao lado de uma FDD, mostra cedo aos especialistas o que o data room contém, o que se contradiz e o que falta, para que as suas horas vão para onde está o risco. A FDD e a due diligence jurídica do seu advogado continuam a ser o que são.',
          'Como a leitura está ordenada está na [página da plataforma](/platform). Em que difere da IA de um data room virtual está em [Due diligence com IA vs. IA do data room](/ai-due-diligence-vs-data-room-ai).'
        ]
      },
      {
        heading: 'Como chegam as constatações ao contrato de compra e venda?',
        paragraphs: [
          'Uma constatação acaba normalmente num de três lugares do contrato de compra e venda (SPA): o preço, uma indemnização específica por um risco conhecido ou a divulgação face às garantias. Numa apólice de W&I, os riscos que o comprador conhecia antes de assinar ficam normalmente excluídos da cobertura.',
          'Mais uma razão para ter as constatações cedo e com a sua fonte: o seu advogado pode então decidir, constatação a constatação, onde cada uma pertence. Antes da oferta vinculativa, a [revisão de red flags](/red-flag-review) é a versão curta da mesma leitura.'
        ]
      }
    ],
    faq: {
      heading: 'Perguntas frequentes',
      items: [
        {
          q: 'Esta página aplica-se a targets fora dos Países Baixos?',
          a: 'Não. Trata de targets sujeitos ao direito neerlandês, sobretudo a BV. A leitura financeira, comercial e operacional da Factum funciona em qualquer jurisdição; jurídico e fiscal estão ajustados ao direito neerlandês, por isso para um target noutro país peça a advogados locais que verifiquem essas constatações.'
        },
        {
          q: 'Isto é aconselhamento jurídico?',
          a: 'Não. Explica o que um comprador costuma verificar no data room de uma BV neerlandesa. Cada operação é diferente; peça ao seu próprio advogado e consultor fiscal que avaliem o target concreto.'
        },
        {
          q: 'A Factum substitui a due diligence financeira do auditor?',
          a: 'Não. Uma FDD é um relatório assinado de um trabalho à parte, e um banco ou seguradora pode apoiar-se nele. A Factum não dá qualquer garantia. Lê todo o data room em {disciplines} disciplinas ao lado da FDD, e o seu próprio revisor aprova as constatações.'
        },
        {
          q: 'A Factum vê o que falta no data room?',
          a: 'Sim, numa lista à parte do que um comprador esperaria e não encontrou. Cada ponto passa primeiro pelo seu revisor, porque um documento arquivado dentro de outro pode aparecer como em falta.'
        },
        {
          q: 'Onde são processados os documentos?',
          a: 'Por defeito em endpoints da UE, sem retenção no fornecedor do modelo e com pseudonimização antes da análise. A análise jurídica, financeira e fiscal corre obrigatoriamente em endpoints sem retenção.'
        }
      ]
    },
    helps: {
      heading: 'Onde a Factum encaixa na compra de uma BV neerlandesa',
      bullets: [
        'Cada documento do data room lido, com cada constatação a citar o seu documento de origem e a sua localização.',
        '{disciplines} disciplinas numa só passagem: {modules} módulos em {waves} vagas, em que o financeiro lê as constatações jurídicas e o fiscal lê ambas.',
        'Jurídico e fiscal ajustados ao direito neerlandês.',
        'O seu revisor aprova na plataforma. Nenhuma exportação sai sem essa aprovação.'
      ],
      note: 'A Factum está em fase anterior ao lançamento: ainda não há nenhum cliente público nem estudo de caso. Mais sobre [a Factum para compradores](/diligence-sprint) e [como os seus documentos são tratados](/governance).'
    },
    datePublished: '2026-11-12'
  },
  'red-flag-review': {
    metaTitle: 'Revisão de red flags de um data room antes de assinar',
    metaDescription:
      'O que é uma revisão de red flags, que red flags decidem uma operação por disciplina, o que o relatório deve conter e onde falha. Para compradores, antes de assinar.',
    shortName: 'Revisão de red flags de um data room',
    h1: 'Revisão de red flags: o que verifica o comprador no data room antes de assinar?',
    answer:
      'Uma revisão de red flags lê o data room à procura dos problemas que podem travar a operação ou mexer no preço, e reporta apenas esses. É mais estreita do que uma due diligence completa e chega mais cedo: antes da oferta vinculativa ou da assinatura, quando ainda há tempo para desistir, renegociar ou pedir uma indemnização específica. Um relatório de red flags útil indica em cada ponto a gravidade, e o documento e a localização de onde vem.',
    sections: [
      {
        heading: 'O que é uma revisão de red flags, e em que difere de uma due diligence completa?',
        paragraphs: [
          'Uma due diligence completa descreve o target: os números, os contratos, as pessoas e a posição fiscal, num relatório por disciplina. Uma revisão de red flags faz uma única pergunta aos mesmos documentos: o que há aqui que possa deitar a operação abaixo ou mudar o que pagamos? Tudo o resto fica fora do relatório.',
          'A leitura não fica mais leve. Para encontrar a cláusula que importa, é preciso ler todos os contratos. O que encurta é o relatório.'
        ]
      },
      {
        heading: 'Que red flags decidem uma operação?',
        bullets: [
          'Jurídico: direitos de mudança de controlo e de resolução nos contratos que sustentam as receitas, litígios, garantias prestadas a terceiros, falhas na titularidade das quotas.',
          'Comercial: concentração de clientes, contratos que terminam ou mudam de preço pouco depois do closing, perda de clientes que a apresentação não mostra.',
          'Financeiro: ajustamentos ao EBITDA que os documentos não suportam, fundo de maneio que oscila no fecho do ano, dívida e itens equiparados a dívida fora da dívida líquida.',
          'Fiscal: liquidações em aberto, posições sem ruling, obrigações de uma unidade fiscal de que o target sai.',
          'RH: pessoas-chave sem contrato ou sem cláusula de não concorrência, bónus pagos com a venda, obrigações de pensões que não estão no balanço.',
          'Operacional e IA: fornecedores únicos, licenças que não se transmitem, modelos ou dados de que o negócio depende e que não lhe pertencem.'
        ],
        after: [
          'Qual deles é material depende do seu preço, da sua estrutura e do seu apetite pelo risco. Nada disso está no data room.'
        ]
      },
      {
        heading: 'O que deve conter um relatório de red flags?',
        paragraphs: [
          'Por cada ponto: o que é, a sua gravidade, a passagem que o sustenta, palavra por palavra, e o documento e a localização onde está. Depois, a lista do que nunca chegou. Uma constatação sem fonte é uma constatação que o seu revisor tem de refazer.',
          'Cada constatação da Factum tem os mesmos seis campos: módulo, constatação, excerto literal, gravidade, fonte e localização, e revisão humana.'
        ]
      },
      {
        heading: 'Onde falha uma revisão de red flags?',
        bullets: [
          'Só foi lida uma amostra, e a cláusula que importa está no contrato que ninguém abriu.',
          'Ninguém verificou o que faltava, e a red flag é o documento que nunca foi carregado.',
          'As disciplinas foram lidas em separado. Um contrato que termina no próximo ano é ao mesmo tempo um ponto jurídico e um ponto de receitas, e só um relatório o viu.',
          'As constatações chegam sem fonte, e a equipa não consegue distinguir um problema real de uma má leitura.'
        ]
      },
      {
        heading: 'Quanto tempo demora?',
        paragraphs: [
          'Depende da dimensão e do estado do data room, e da rapidez com que o vendedor responde. Para onde vão os dias, e onde se podem ganhar, está em [quanto tempo demora a due diligence](/due-diligence-timeline).'
        ]
      },
      {
        heading: 'Como faz a Factum uma revisão de red flags?',
        paragraphs: [
          'A sua equipa carrega o data room. {modules} módulos leem-no em {waves} vagas, numa ordem fixa: primeiro comercial, RH, operacional e IA, depois jurídico, depois financeiro, que lê as constatações jurídicas, e por fim fiscal, economia da operação e avaliação. Cada constatação cita a sua fonte. {blocks} bloqueios duros param um rascunho e levam-no ao seu revisor, sem aprovação.',
          'O seu revisor decide o que é uma red flag para esta operação e aprova; nenhuma exportação sai da plataforma sem essa aprovação. Mais na [página da plataforma](/platform), e sobre a diferença face à IA de um data room virtual em [Due diligence com IA vs. IA do data room](/ai-due-diligence-vs-data-room-ai).'
        ]
      }
    ],
    faq: {
      heading: 'Perguntas frequentes',
      items: [
        {
          q: 'A IA consegue fazer sozinha uma revisão de red flags?',
          a: 'Consegue fazer a leitura: cada documento e cada cláusula, confrontados entre si, com fontes. Não consegue decidir o que é material para a sua operação. Por isso a revisão humana é obrigatória: o seu revisor aprova antes de qualquer coisa sair da plataforma.'
        },
        {
          q: 'Quem assina o relatório de red flags?',
          a: 'O seu próprio revisor, para uso próprio. A Factum não assina nada e não dá qualquer garantia. Se um banco ou seguradora precisar de um relatório assinado, encomende-o a um consultor; a Factum pode correr ao lado.'
        },
        {
          q: 'Uma revisão de red flags chega antes de assinar?',
          a: 'Nalgumas operações é o primeiro passo e a due diligence completa vem depois; noutras é o que o calendário permite. Decidem os seus consultores e o seu revisor. A Factum lê todo o data room em ambos os casos.'
        },
        {
          q: 'Funciona para um target fora dos Países Baixos?',
          a: 'A leitura financeira, comercial e operacional funciona em qualquer jurisdição. Jurídico e fiscal estão ajustados ao direito neerlandês; para um target noutro país, peça a advogados locais que verifiquem essas constatações.'
        },
        {
          q: 'Podemos testar antes de uma operação em curso?',
          a: 'Sim. Uma operação que fechou no ano passado serve de teste: nada de um processo em curso fica exposto, e pode comparar as constatações com o que a sua equipa encontrou na altura. A Factum está em fase anterior ao lançamento, por isso o primeiro relatório real que verá será o seu.'
        }
      ]
    },
    helps: {
      heading: 'Onde a Factum encaixa',
      bullets: [
        'Para private equity e outros compradores, antes da oferta vinculativa ou da assinatura.',
        'Cada documento do data room lido, com cada constatação a citar o seu documento de origem e a sua localização.',
        'Uma lista do que o vendedor nunca carregou, desde a primeira passagem.',
        'O seu revisor aprova na plataforma.'
      ],
      note: 'A Factum está em fase anterior ao lançamento: ainda não há nenhum cliente público nem estudo de caso. Jurídico e fiscal estão ajustados ao direito neerlandês. Vai comprar uma BV neerlandesa? Veja [due diligence de uma BV neerlandesa](/dutch-bv-due-diligence).'
    },
    datePublished: '2026-11-12'
  }
};
