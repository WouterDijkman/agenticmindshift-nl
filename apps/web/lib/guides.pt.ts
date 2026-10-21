import type { Guide, GuideChrome } from './guides';
import type { GuideSlug } from './guideRoutes';

/**
 * European Portuguese copy for the three problem pages, translated from the
 * Dutch entry in lib/guides.ts (English used as a cross-check). The rules in
 * the header of lib/guides.ts apply: no client names, no prices, nothing here
 * is Factum Capital's work, the NDA page states the Dutch/EU frame (RGPD) and
 * is not legal advice. Slugs, link paths, bgChar and datePublished as in the
 * source. Terminology follows messages/pt.json.
 */

export const CHROME_PT: GuideChrome = {
  tocLabel: 'Nesta página',
  relatedEyebrow: 'Continuar a ler',
  werkwijzeLink: 'Como decorre um projeto',
  overLink: 'Sobre Wouter Dijkman',
  moreEyebrow: 'Questões práticas',
  moreHeading: 'Três questões práticas sobre IA no trabalho de deals',
  readMore: 'Ler mais',
};

const PUBLISHED = '2026-10-12';

export const GUIDES_PT: Record<GuideSlug, Guide> = {
  /* (a) One way of working for IMs and teasers */
  'im-en-teasers': {
    metaTitle: 'Um só fluxo de IA para IM e teasers',
    metaDescription:
      'Juniores a usar o ChatGPT e o Claude cada um à sua maneira em IM e teasers? Assim é um fluxo de trabalho fixo, com controlo da equipa no fim.',
    shortName: 'IM e teasers',
    teaser: 'Um fluxo de trabalho fixo para toda a equipa, com passos de cálculo testados e um controlo no fim.',
    eyebrow: 'Corporate finance · IM e teasers',
    bgChar: 'IM',
    h1: 'Um só fluxo de trabalho de IA para IM e teasers, para toda a equipa',
    answer:
      'Quando cada júnior usa o ChatGPT ou o Claude à sua maneira, cada IM é diferente na estrutura, no tom e na fiabilidade. O que funciona é um fluxo de trabalho configurado que toda a equipa usa: passos fixos, cálculos como passo testado e um controlo pela equipa no fim. O que for construído é seu.',
    sections: [
      {
        heading: 'O que corre mal quando cada um usa a sua própria IA?',
        bullets: [
          'Cada júnior tem os seus próprios prompts e definições. Dois IM do mesmo escritório parecem trabalho de dois escritórios.',
          'Ninguém sabe que texto ou tabela veio de que modelo.',
          'O que uma pessoa apurou fica no histórico de chat dela.',
          'Os números são «calculados» numa janela de chat, sem que ninguém veja o cálculo.',
        ],
      },
      {
        heading: 'Como é um fluxo de trabalho fixo?',
        paragraphs: [
          'Um fluxo de trabalho é uma sequência fixa de passos para trabalho recorrente. Para um IM ou um teaser, é assim:',
        ],
        steps: [
          'Os documentos do vendedor entram numa pasta fixa, num formato fixo.',
          'Cada documento tem um template fixo, com a estrutura e o tom do escritório.',
          'O modelo escreve uma primeira versão de cada capítulo a partir dos documentos de origem.',
          'Tabelas e indicadores saem de um passo de cálculo testado.',
          'A equipa lê, corrige e aprova antes de qualquer coisa sair.',
        ],
        after: [
          'Todos trabalham com os mesmos passos. Um júnior novo não tem de inventar nada, e um IM do ano passado pode ser reconstituído.',
        ],
      },
      {
        heading: 'Porque são os cálculos um passo à parte?',
        paragraphs: [
          'Um modelo de linguagem não faz contas sozinho. Escreve código que calcula, ou estima. Quanto mais uma empresa se afasta nas suas políticas contabilísticas, maior a probabilidade de erro.',
          'Por isso construímos os cálculos como passos fixos:',
        ],
        bullets: [
          'sempre a mesma fórmula para normalizações e indicadores;',
          'testados antes de a equipa confiar neles;',
          'cada número do IM remonta à sua fonte.',
        ],
      },
      {
        heading: 'Quem controla o output?',
        paragraphs: [
          'A equipa. Cada fluxo de trabalho termina com um controlo feito por alguém do escritório. O modelo entrega a primeira versão; o juízo e a aprovação ficam consigo.',
        ],
      },
      {
        heading: 'De quem é o que for construído?',
        paragraphs: [
          'Seu. O fluxo de trabalho corre no seu próprio ambiente e acompanha-o se mudar para outro fornecedor de modelos de IA. Não fica preso a nós nem a um único modelo. Isso fica escrito na confirmação de adjudicação.',
        ],
      },
      {
        heading: 'Que mais funciona como fluxo de trabalho fixo?',
        paragraphs: [
          'Um exemplo do meu próprio trabalho: um perfil de empresa de duas páginas, a partir apenas do nome da empresa.',
        ],
        bullets: [
          'site, proprietários e estrutura a partir do Company.info;',
          'concorrentes a partir do Gain.pro;',
          'uma verificação de notícias, para não lhe escapar uma venda já anunciada.',
        ],
        after: [
          'A análise fica pronta, o juízo fica com a equipa. O que era meio dia a um dia de trabalho passa a ser verificar e afinar.',
        ],
      },
      {
        heading: 'Precisa de contratar um especialista em IA para isto?',
        paragraphs: [
          'Numa boutique, normalmente não. O ganho está em alguns processos de trabalho bem configurados que toda a equipa usa todos os dias. Para isso não é preciso uma função extra.',
        ],
      },
      {
        heading: 'Por onde começar?',
        paragraphs: [
          'Mapeie o trabalho do mandato ao closing. Veja, passo a passo, o que leva tempo, o que se repete sempre e onde surgem erros. Comece por um ou dois passos que se repetem com frequência, como o teaser ou a primeira versão do IM.',
          'Como decorre um projeto a partir daí está em [Metodologia](/werkwijze). Pode sequer colocar documentos de deals numa ferramenta destas? Veja [Documentos de deals no ChatGPT](/dealstukken-en-ai).',
        ],
      },
    ],
    helps: {
      heading: 'Como a Agentic Mindshift ajuda',
      bullets: [
        'Mapeamos o seu processo do mandato ao closing e escolhemos consigo o primeiro fluxo de trabalho.',
        'Configuramo-lo, com passos de cálculo testados e um controlo pela sua equipa como último passo.',
        'Formamos a equipa até trabalhar com ele de forma autónoma.',
      ],
      note: 'A primeira conversa dura vinte minutos e é sem compromisso.',
    },
    datePublished: PUBLISHED,
  },

  /* (b) Monthly reporting of a PE portfolio company */
  maandrapportage: {
    metaTitle: 'Relatório mensal de participadas com IA',
    metaDescription:
      'A IA prepara a revisão mensal de uma participada de PE: análise de desvios, controlos forenses e perguntas para CFO e CEO. A revisão fica com a equipa de deal.',
    shortName: 'Relatório mensal',
    teaser: 'Análise de desvios, controlos forenses e perguntas para o CFO e o CEO, prontos para revisão pela equipa de deal.',
    eyebrow: 'Private equity · Monitorização da carteira',
    bgChar: 'M',
    h1: 'IA no relatório mensal de uma participada de PE',
    answer:
      'A IA pode preparar a maior parte da revisão mensal de uma participada: a análise de desvios, um controlo forense como o que um contabilista faz, e perguntas concretas para o CFO e o CEO. Num fundo de PE onde montei isto, o trabalho manual levava três a quatro dias. Agora o fluxo de trabalho arranca de manhã e o relatório fica pronto para revisão algumas horas depois. O juízo fica com a equipa de deal.',
    sections: [
      {
        heading: 'O que faz a IA numa revisão mensal?',
        bullets: [
          'Análise de desvios: real face ao orçamento, ao ano anterior e ao mês anterior, com as maiores diferenças primeiro.',
          'Controlo forense: as verificações que um contabilista faria, como margens que se deslocam, fundo de maneio que sobe e custos que mudam de rubrica.',
          'Perguntas para a gestão: por cada desvio, uma pergunta concreta para o CFO ou o CEO, com o número ao lado.',
        ],
      },
      {
        heading: 'Como é o fluxo de trabalho?',
        steps: [
          'A participada entrega os números mensais num formato fixo.',
          'O fluxo de trabalho arranca de manhã e corre a análise e os controlos como passos fixos.',
          'Os cálculos passam por passos de cálculo testados. O modelo de linguagem escreve o comentário e as perguntas.',
          'Algumas horas depois, o relatório está pronto para revisão.',
          'A equipa de deal lê, ajusta e envia as perguntas à gestão.',
        ],
      },
      {
        heading: 'Porque não colar simplesmente os números no ChatGPT?',
        paragraphs: [
          'Um modelo de linguagem não faz contas sozinho. Escreve código ou estima. Num pacote mensal com dezenas de linhas, isso corre mal mais cedo ou mais tarde, e ninguém vê onde.',
          'Além disso, quer que os mesmos controlos corram todos os meses, pela mesma ordem. Um chat avulso não se lembra disso.',
          'E os números de uma participada não pertencem a uma conta pessoal. Veja [Documentos de deals no ChatGPT](/dealstukken-en-ai).',
        ],
      },
      {
        heading: 'Quem avalia o relatório?',
        paragraphs: [
          'A equipa de deal. O fluxo de trabalho prepara; o investment manager avalia, escolhe que perguntas seguem para a participada e aprova. A revisão fica com a equipa que conhece a participada.',
        ],
      },
      {
        heading: 'O que traz além de tempo?',
        bullets: [
          'Cada participada é analisada da mesma forma, todos os meses.',
          'Os desvios destacam-se no mês em que surgem.',
          'As perguntas à gestão e as respostas ficam registadas, mesmo que alguém saia da equipa.',
        ],
      },
      {
        heading: 'Por onde começar?',
        paragraphs: [
          'Por uma participada e pelo relatório que já faz hoje. Pomos os passos atuais no papel, reconstruímo-los como fluxo de trabalho fixo e corremo-lo primeiro em paralelo com o processo manual. A equipa muda quando os resultados batem certo.',
          'Como decorre um projeto destes está em [Metodologia](/werkwijze). Quem o constrói está em [Sobre o Wouter](/over).',
        ],
      },
    ],
    helps: {
      heading: 'Como a Agentic Mindshift ajuda',
      bullets: [
        'Pomos no papel a sua revisão mensal atual e definimos que controlos devem fazer parte dela.',
        'Construímos o fluxo de trabalho, com passos de cálculo testados e uma revisão pela sua equipa como último passo.',
        'Fazemos a passagem de testemunho, para que a sua equipa o corra e ajuste sozinha.',
      ],
      note: 'A primeira conversa dura vinte minutos e é sem compromisso.',
    },
    datePublished: PUBLISHED,
  },

  /* (c) Deal documents in ChatGPT under an NDA and the GDPR (RGPD) */
  'dealstukken-en-ai': {
    metaTitle: 'Documentos de deals no ChatGPT: NDA e RGPD',
    metaDescription:
      'A sua equipa pode colocar documentos do data room no ChatGPT ou no Claude? O que exigem o NDA, o RGPD e as definições do fornecedor. Quadro NL e UE.',
    shortName: 'Documentos de deals e IA',
    teaser: 'O que o NDA, o RGPD e as definições do fornecedor exigem antes de os documentos entrarem numa ferramenta de IA.',
    eyebrow: 'NDA · RGPD · Quadro neerlandês e da UE',
    bgChar: '§',
    h1: 'Documentos de deals no ChatGPT: o que é permitido ao abrigo do NDA e do RGPD?',
    answer:
      'É possível, se três coisas estiverem asseguradas: o NDA permite a partilha com o fornecedor, existe um acordo de tratamento de dados com esse fornecedor, e as definições garantem que os seus documentos não são usados para treino. Uma conta pessoal ou gratuita normalmente não cumpre isso. Este é o quadro neerlandês e europeu (RGPD), não aconselhamento jurídico para o seu caso concreto.',
    sections: [
      {
        heading: 'O que diz o NDA?',
        bullets: [
          'Um NDA limita a quem pode dar informação confidencial e para quê. Muitas vezes, apenas aos seus próprios colaboradores e assessores que precisam dela para a transação.',
          'Um fornecedor de IA é um terceiro. Se pode guardar documentos lá depende do texto. Veja a definição de «representatives» ou de assessores, e o que diz sobre armazenamento junto de terceiros.',
          'Atenção à obrigação de devolver ou destruir a informação no fim. Também se aplica ao que está junto do fornecedor.',
          'Em caso de dúvida, peça autorização ou inclua o tema na negociação do NDA.',
        ],
      },
      {
        heading: 'Há dados pessoais no data room?',
        paragraphs: [
          'Quase sempre: contratos de trabalho, listas salariais, dados de clientes, correspondência. Nesse caso aplica-se o RGPD.',
        ],
        bullets: [
          'Quem determina porquê e como os dados são tratados é o responsável pelo tratamento. Um fornecedor de IA que trata os dados apenas segundo as suas instruções é subcontratante.',
          'Com um subcontratante celebra um acordo de tratamento de dados. Os planos empresariais dos grandes fornecedores oferecem-no; para contas pessoais, normalmente não existe.',
          'Partilhe apenas o necessário. Uma lista salarial não precisa de entrar para um resumo dos contratos de arrendamento.',
          'Se os dados saírem da UE, a transferência precisa de um fundamento, como as cláusulas contratuais-tipo da Comissão Europeia.',
          'Categorias especiais de dados pessoais, como dados de saúde em processos de baixa por doença, exigem cuidado redobrado.',
        ],
      },
      {
        heading: 'Que definições do fornecedor importam?',
        bullets: [
          'Treino: os dados que introduz não podem ser usados para treinar modelos. Nos planos empresariais isso é normalmente o padrão; nas contas pessoais tem muitas vezes de o desativar você mesmo.',
          'Prazo de conservação: durante quanto tempo o fornecedor guarda os dados introduzidos e o output, e pode encurtá-lo?',
          'Região: sempre que possível, escolha armazenamento e tratamento na UE.',
          'Acesso: quem no escritório vê que chats e ficheiros, e o que acontece quando alguém sai?',
          'Registo: consegue ver depois que documentos foram partilhados?',
        ],
      },
      {
        heading: 'O que deve um escritório pôr em prática?',
        steps: [
          'Uma conta empresarial para a equipa, com acordo de tratamento de dados. O trabalho de deals não passa por contas pessoais.',
          'Uma regra interna curta: que documentos podem entrar, quais não, e quem decide em caso de dúvida.',
          'Uma cláusula-padrão nos seus NDA sobre o uso de serviços de IA com salvaguardas adequadas.',
          'As definições registadas: treino desligado, prazo de conservação conhecido, região UE sempre que possível.',
          'Um momento fixo em que alguém verifica se continua assim.',
        ],
      },
      {
        heading: 'Isto é aconselhamento jurídico?',
        paragraphs: [
          'Não. Este é o quadro geral neerlandês e europeu. Wouter Dijkman estudou Direito. Cada NDA e cada data room são diferentes. Em caso de dúvida, peça ao seu próprio advogado que reveja o texto do seu NDA e do seu acordo de tratamento de dados.',
          'Quer depois pôr a IA a trabalhar no próprio trabalho de deals? Veja [IM e teasers](/im-en-teasers) e [Relatório mensal](/maandrapportage).',
        ],
      },
    ],
    helps: {
      heading: 'Como a Agentic Mindshift ajuda',
      bullets: [
        'Escolhemos consigo um ambiente de IA empresarial e configuramos corretamente as definições.',
        'Redigimos uma regra interna curta para a IA no trabalho de deals.',
        'Configuramos os fluxos de trabalho para que os documentos confidenciais fiquem no sítio certo.',
      ],
      note: 'A primeira conversa dura vinte minutos e é sem compromisso. Mais sobre a abordagem em [Metodologia](/werkwijze).',
    },
    datePublished: PUBLISHED,
  },
};
