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
  }
};
