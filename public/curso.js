/* ─────────────────────────────────────────────────────────────
   CURSO DIDI INDEX — Área do aluno
   Conteúdo + quizzes + progresso em localStorage
   ───────────────────────────────────────────────────────────── */

const TOKEN_KEY    = 'curso_token';
const PROGRESS_KEY = 'curso_progresso_v1';
const QUIZ_KEY     = 'curso_quiz_v1';

/* ──────────── CONTEÚDO DO CURSO ──────────── */
const CURSO = [
  {
    num: '01',
    titulo: 'Introdução',
    aulas: [
      {
        id: 'm1-a0',
        titulo: 'Quem é Didi Aguiar e como nasceu o método',
        html: `
          <span class="content-tag">Módulo 1 · Aula 1</span>
          <h1>Quem é Didi Aguiar e como nasceu o método</h1>
          <p class="lead">Antes de aprender o setup, vale entender de onde ele veio. Conhecer o autor e o raciocínio por trás da estratégia ajuda você a aplicar o método com a cabeça certa — não só decorando regras.</p>

          <h2>Quem é Didi Aguiar</h2>
          <p><strong>Odir Aguiar</strong>, mais conhecido como <strong>Didi Aguiar</strong>, é um dos analistas técnicos mais respeitados do Brasil. Engenheiro de formação, dedicou décadas ao estudo do mercado financeiro e do comportamento dos preços, tornando-se referência em análise gráfica no país.</p>

          <p>Didi é o criador do indicador que leva seu nome — o <strong>Didi Index</strong> — e também do conceito de <strong>agulhada</strong>, que se tornou tão popular entre traders brasileiros que hoje é praticamente sinônimo da sua escola de análise.</p>

          <h2>De onde veio o Didi Index</h2>
          <p>O Didi Index não foi inventado: foi <em>percebido</em>. Em uma madrugada, por volta das 4 da manhã, depois de horas observando gráficos, Didi notou uma formação específica entre três médias móveis que <strong>se repetia inúmeras vezes</strong> e quase sempre antecedia movimentos fortes.</p>

          <div class="callout">
            <div class="callout-title">Nas palavras dele</div>
            "Vasculhei todos os tempos gráficos, todos os ativos daqui e de fora do Brasil, e fiquei como louco tentando provar que eu não havia descoberto isto. Mas foi inevitável… a coisa insistia em funcionar."
          </div>

          <p>O que ele havia percebido — e que mais tarde batizaria de <strong>agulhada</strong> — é o momento em que as três médias móveis (períodos 3, 8 e 20) se encontram praticamente no mesmo ponto e saem ordenadas, na compra ou na venda.</p>

          <h2>O que torna o método especial</h2>
          <p>Existem dezenas de indicadores no mercado. O grande mérito do Didi não foi criar mais um — foi montar um <strong>sistema</strong> em que <em>cinco</em> indicadores diferentes conversam entre si com regras claras de hierarquia. Cada indicador resolve uma parte do problema:</p>

          <ul>
            <li>Um decide se vale a pena operar (existe tendência?)</li>
            <li>Um decide quando agir (timing)</li>
            <li>Um confirma a direção do movimento</li>
            <li>Um valida cenários laterais</li>
            <li>Um dispara o gatilho de entrada (a agulhada)</li>
          </ul>

          <p>Essa <strong>divisão de tarefas</strong> é o que diferencia o setup do Didi de qualquer outra estratégia baseada em um único indicador. É também o motivo de o método continuar funcionando décadas depois de criado.</p>

          <h2>O que você vai aprender neste curso</h2>
          <ul>
            <li>Como instalar o setup pronto no MetaTrader 4, MetaTrader 5, Profit Chart e Tryd</li>
            <li>Quem é cada um dos 5 indicadores e qual é o papel dele</li>
            <li>Como ler a hierarquia (quem manda em quem)</li>
            <li>Como identificar uma agulhada — e quando ela vira uma "agulhada santa"</li>
            <li>Como entrar, sair e operar a estratégia na prática</li>
          </ul>

          <div class="callout tip">
            <div class="callout-title">Como aproveitar o curso</div>
            As aulas são curtas e diretas. Leia no seu ritmo, faça os quizzes ao fim de cada módulo para checar o que ficou e use as aulas como referência sempre que tiver dúvida operando no gráfico.
          </div>
        `
      },
      {
        id: 'm1-a-install',
        titulo: 'Instalando o setup: MT4, MT5, Profit e Tryd',
        html: `
          <span class="content-tag">Módulo 1 · Aula 2</span>
          <h1>Instalando o setup: MT4, MT5, Profit e Tryd</h1>
          <p class="lead">O setup foi entregue para você em um arquivo único por plataforma. Em todas elas a ideia é a mesma: <strong>copiar o arquivo para a pasta correta</strong> e reiniciar o programa. A seguir, o passo a passo de cada uma.</p>

          <div class="callout">
            <div class="callout-title">Antes de começar</div>
            Tenha o arquivo do setup salvo em um lugar fácil de encontrar (Downloads ou Desktop). Se a sua plataforma estiver aberta, feche-a antes de copiar os arquivos.
          </div>

          <h2>MetaTrader 4 (MT4)</h2>
          <ol>
            <li>Abra o MT4.</li>
            <li>No menu superior, vá em <strong>Arquivo &gt; Abrir Pasta de Dados</strong>.</li>
            <li>Uma janela do Windows Explorer vai abrir. Entre em <strong>MQL4 &gt; Templates</strong> e cole o arquivo <strong>.tpl</strong> do setup ali. Os arquivos <strong>.ex4</strong> (indicadores), se houver, vão em <strong>MQL4 &gt; Indicators</strong>.</li>
            <li>Feche o MT4 completamente e abra de novo.</li>
            <li>Abra um gráfico de qualquer ativo (ex: WIN, WDO). Clique com o botão direito no gráfico &gt; <strong>Modelo (Template) &gt; nome do setup</strong>.</li>
            <li>Pronto. Bollinger, ADX, Didi Index, TRIX e Estocástico aparecem já configurados.</li>
          </ol>

          <h2>MetaTrader 5 (MT5)</h2>
          <ol>
            <li>Abra o MT5.</li>
            <li>Vá em <strong>Arquivo &gt; Abrir Pasta de Dados</strong>.</li>
            <li>Entre em <strong>MQL5 &gt; Profiles &gt; Templates</strong> e cole o arquivo <strong>.tpl</strong>. Indicadores <strong>.ex5</strong>, se houver, vão em <strong>MQL5 &gt; Indicators</strong>.</li>
            <li>Feche e reabra o MT5.</li>
            <li>Abra um gráfico, clique com o botão direito &gt; <strong>Modelos &gt; nome do setup</strong>.</li>
            <li>Os 5 indicadores aparecem no gráfico, prontos para uso.</li>
          </ol>

          <div class="callout tip">
            <div class="callout-title">Dica para MT4 e MT5</div>
            Se preferir que o setup seja o padrão ao abrir qualquer gráfico, salve o template com o nome <strong>default</strong>. A partir daí, todo novo gráfico já vai abrir com o setup aplicado.
          </div>

          <h2>Profit Chart</h2>
          <ol>
            <li>Abra o Profit Chart.</li>
            <li>No menu, vá em <strong>Estudos &gt; Importar Estudo</strong> (ou <strong>Arquivo &gt; Importar</strong>, dependendo da versão).</li>
            <li>Selecione o arquivo do setup que você recebeu (extensão própria do Profit).</li>
            <li>O Profit pede para você confirmar a importação — confirme.</li>
            <li>Abra o gráfico do ativo desejado, clique com o botão direito &gt; <strong>Aplicar Estudo &gt; nome do setup</strong>.</li>
            <li>Os indicadores são aplicados automaticamente com os parâmetros corretos.</li>
          </ol>

          <h2>Tryd</h2>
          <ol>
            <li>Abra o Tryd.</li>
            <li>No menu, vá em <strong>Configurações &gt; Importar Layout</strong> (ou <strong>Gráfico &gt; Importar Template</strong>, dependendo da versão).</li>
            <li>Selecione o arquivo do setup recebido.</li>
            <li>Confirme a importação.</li>
            <li>Abra um gráfico, clique com o botão direito &gt; <strong>Aplicar Template &gt; nome do setup</strong>.</li>
            <li>Os 5 indicadores aparecem aplicados, com os períodos e configurações do método.</li>
          </ol>

          <div class="callout warn">
            <div class="callout-title">Importante</div>
            Os parâmetros já vêm prontos no arquivo: <strong>Didi Index com médias de 3, 8 e 20</strong>; Bollinger com 20 períodos e 2 desvios; ADX com 14 períodos; TRIX e Estocástico nos valores tradicionais. <strong>Não altere</strong> esses números — a estratégia foi calibrada com eles.
          </div>

          <h2>Conferindo se deu certo</h2>
          <p>Depois de aplicar o setup em qualquer plataforma, você deve ver:</p>
          <ul>
            <li><strong>Bandas de Bollinger</strong> envolvendo as barras de preço no gráfico principal</li>
            <li><strong>Didi Index</strong> com três linhas (azul, branca, amarela) em uma janela inferior</li>
            <li><strong>ADX</strong> com três linhas (AD+, AD-, ADX) em outra janela</li>
            <li><strong>TRIX</strong> e <strong>Estocástico</strong> em janelas separadas, cada um com duas linhas</li>
          </ul>

          <p>Se algum desses não aparecer, refaça o passo 3 da sua plataforma (copiar o arquivo para a pasta correta) e reinicie o programa. Na próxima aula você vai entender o papel de cada um deles.</p>
        `
      },
      {
        id: 'm1-a1',
        titulo: 'O setup do Didi: 5 indicadores, 1 decisão',
        html: `
          <span class="content-tag">Módulo 1 · Aula 3</span>
          <h1>O setup do Didi: 5 indicadores, 1 decisão</h1>
          <p class="lead">A estratégia do Didi Aguiar não é "um indicador mágico". É um sistema com cinco indicadores trabalhando juntos — cada um com um papel específico — para chegar em uma única decisão: <strong>comprar, vender ou ficar de fora</strong>.</p>

          <p>O Didi gosta de comparar o setup com uma empresa. Cada indicador é um diretor com função clara. Quando todos concordam, você tem o sinal mais forte que o método oferece: a <strong>agulhada santa</strong>.</p>

          <h2>Os 5 indicadores do setup</h2>

          <div class="indicator-card">
            <h4>1. Movimento Direcional (ADX, AD+, AD-) <span class="role-pill pres">Presidente</span></h4>
            <p>Decide se existe tendência no mercado. É ele quem libera os outros indicadores para falar.</p>
          </div>

          <div class="indicator-card">
            <h4>2. Bandas de Bollinger <span class="role-pill time">Diretor de Timing</span></h4>
            <p>Cuida do momento certo de entrar e de sair. As bandas abrindo = entrar. Fechando = sair.</p>
          </div>

          <div class="indicator-card">
            <h4>3. TRIX <span class="role-pill com">Com tendência</span></h4>
            <p>Confirma quando o mercado está andando direcional. Antecipa movimentos e é mão forte.</p>
          </div>

          <div class="indicator-card">
            <h4>4. Estocástico <span class="role-pill sem">Sem tendência</span></h4>
            <p>Especialista em mercados laterais. Avisa sobrecompra (acima de 80) e sobrevenda (abaixo de 20).</p>
          </div>

          <div class="indicator-card">
            <h4>5. Didi Index (3 médias móveis: 3, 8 e 20) <span class="role-pill com">Com tendência</span></h4>
            <p>O coração do setup. É aqui que nasce a famosa <strong>agulhada</strong>.</p>
          </div>

          <div class="callout key">
            <div class="callout-title">Ideia central</div>
            Você não opera só porque o Didi Index agulhou. Você opera quando o agulhamento acontece <strong>com os outros indicadores concordando</strong>. Sem isso, é um sinal solto.
          </div>

          <h2>Por que esse modelo funciona</h2>
          <p>Mercado tem dois estados: <strong>com tendência</strong> ou <strong>sem tendência</strong>. Indicadores que brilham na tendência (como o TRIX) atrapalham na lateralização. Indicadores que brilham na lateralização (como o Estocástico) erram na tendência forte.</p>
          <p>Usar o setup completo evita o erro mais clássico do trader iniciante: pegar um indicador qualquer e usar em todo cenário.</p>
        `
      },
      {
        id: 'm1-a2',
        titulo: 'A hierarquia dos indicadores',
        html: `
          <span class="content-tag">Módulo 1 · Aula 4</span>
          <h1>A hierarquia: quem manda em quem</h1>
          <p class="lead">Os 5 indicadores não falam ao mesmo tempo. Existe uma ordem clara — e respeitar essa ordem é o que separa quem entende o método de quem só decorou o nome dos indicadores.</p>

          <h2>1º — O Movimento Direcional decide se a sala vai falar</h2>
          <p>O ADX é o presidente. Antes de qualquer coisa, você olha pra ele e responde uma pergunta só: <strong>existe tendência?</strong></p>
          <ul>
            <li>Se <strong>sim</strong> → quem manda agora são os diretores "com tendência" (TRIX e Didi Index).</li>
            <li>Se <strong>não</strong> → quem manda é o diretor "sem tendência" (Estocástico).</li>
          </ul>

          <div class="callout">
            <div class="callout-title">Sem tendência quando…</div>
            ADX está <em>por baixo</em> do AD+ e do AD-, <strong>ou</strong> ADX está caindo e com valor menor ou igual a 32. Em qualquer outro cenário, existe tendência (forte ou fraca).
          </div>

          <h2>2º — As Bandas de Bollinger decidem o "quando"</h2>
          <p>Definido o cenário, o Bollinger entra: ele te diz se é hora de agir ou hora de esperar. Bandas abrindo é entrada. Bandas fechando é saída.</p>

          <h2>3º — Didi Index entrega o gatilho (a agulhada)</h2>
          <p>É o último a falar e o mais cirúrgico: quando as três médias do Didi se encontram em um único ponto e saem ordenadas, temos a <strong>agulhada</strong> — o gatilho de entrada.</p>

          <h2>4º — TRIX e Estocástico assinam embaixo</h2>
          <p>A agulhada só vira uma <strong>agulhada santa</strong> quando TRIX e Estocástico estão na mesma direção. Sem essa confirmação, o sinal é mais fraco.</p>

          <div class="callout tip">
            <div class="callout-title">Resumindo a hierarquia</div>
            <strong>ADX</strong> libera o cenário → <strong>Bollinger</strong> dá o timing → <strong>Didi Index</strong> dispara a agulhada → <strong>TRIX + Estocástico</strong> confirmam.
          </div>

          <p>Nas próximas aulas você vai entender cada diretor da empresa: o que ele faz, como configurar e como ler. No final, vamos juntar tudo na agulhada santa.</p>
        `
      }
    ],
    quiz: {
      titulo: 'Quiz · Introdução',
      perguntas: [
        {
          q: 'Quem é Didi Aguiar?',
          opcoes: [
            'Um operador estrangeiro famoso da bolsa de Nova York',
            'O analista técnico brasileiro que criou o Didi Index e o conceito de agulhada',
            'O fundador da B3',
            'Um robô automatizado de operações'
          ],
          correta: 1,
          explica: 'Odir "Didi" Aguiar é um dos analistas técnicos mais respeitados do Brasil. Criou o indicador Didi Index e o conceito de agulhada.'
        },
        {
          q: 'Em qual pasta do MetaTrader 5 você deve colar o arquivo .tpl do setup?',
          opcoes: [
            'MQL5 > Indicators',
            'MQL5 > Profiles > Templates',
            'MQL5 > Experts',
            'MQL5 > Scripts'
          ],
          correta: 1,
          explica: 'No MT5, os templates (.tpl) vão em MQL5 > Profiles > Templates. Os indicadores compilados (.ex5), quando há, vão em MQL5 > Indicators.'
        },
        {
          q: 'Quantos indicadores compõem o setup completo do Didi Aguiar?',
          opcoes: ['3', '4', '5', '7'],
          correta: 2,
          explica: 'São 5: Movimento Direcional (ADX/AD+/AD-), Bandas de Bollinger, TRIX, Estocástico e Didi Index.'
        },
        {
          q: 'Na "empresa de indicadores" do Didi, quem decide se existe tendência no mercado?',
          opcoes: ['Bandas de Bollinger', 'Movimento Direcional (ADX)', 'TRIX', 'Didi Index'],
          correta: 1,
          explica: 'O ADX é o "presidente". É ele quem decide se o cenário é com ou sem tendência, e libera os outros indicadores.'
        },
        {
          q: 'Qual é a função das Bandas de Bollinger no setup?',
          opcoes: [
            'Confirmar a direção da tendência',
            'Dar o timing (momento) de entrar e sair',
            'Detectar sobrecompra e sobrevenda',
            'Gerar o sinal da agulhada'
          ],
          correta: 1,
          explica: 'Bollinger é o "diretor de timing": bandas abrindo = entrar; bandas fechando = sair.'
        },
        {
          q: 'O TRIX é especialista em qual cenário?',
          opcoes: ['Mercado lateral (sem tendência)', 'Mercado com tendência', 'Apenas em tempos gráficos curtos', 'Não tem cenário ideal'],
          correta: 1,
          explica: 'O TRIX é um diretor "com tendência" — ele rastreia movimentos direcionais e funciona como mão forte.'
        }
      ]
    }
  },

  {
    num: '02',
    titulo: 'Movimento Direcional (ADX)',
    aulas: [
      {
        id: 'm2-a1',
        titulo: 'AD+, AD- e ADX: as três linhas',
        html: `
          <span class="content-tag">Módulo 2 · Aula 1</span>
          <h1>AD+, AD- e ADX: as três linhas</h1>
          <p class="lead">O Movimento Direcional não é uma linha só — são <strong>três</strong>. Cada uma responde uma pergunta diferente, e juntas elas dizem se existe tendência, qual a direção e qual a força.</p>

          <h2>AD+ vs AD-: direção</h2>
          <p>O cruzamento entre AD+ e AD- te diz <strong>para que lado</strong> o mercado pode ir:</p>
          <ul>
            <li><strong>AD+ acima do AD-</strong> → viés de compra</li>
            <li><strong>AD- acima do AD+</strong> → viés de venda</li>
          </ul>

          <h2>ADX: força</h2>
          <p>O ADX não diz direção. Ele diz <strong>quanto o motor do mercado está acelerado</strong>. Pense num carro: o AD+/AD- te diz para onde o carro está apontado, e o ADX te diz se ele está pisando fundo no acelerador, marchando devagar ou parado.</p>

          <div class="callout">
            <div class="callout-title">Como ler a inclinação do ADX</div>
            Quanto <strong>mais inclinado</strong> o ADX em relação ao eixo horizontal, mais aceleração tem o movimento. ADX subindo rápido = tendência ganhando força. ADX caindo = tendência perdendo fôlego.
          </div>

          <h2>Quando NÃO temos tendência</h2>
          <p>Existem apenas duas situações em que o método considera o mercado sem tendência:</p>
          <ol>
            <li><strong>ADX está abaixo</strong> do AD+ e do AD- ao mesmo tempo, <strong>ou</strong></li>
            <li><strong>ADX está descendo</strong> <em>e</em> o valor dele é <strong>menor ou igual a 32</strong>.</li>
          </ol>
          <p>Em qualquer outro cenário, existe alguma tendência (forte ou fraca).</p>

          <div class="callout warn">
            <div class="callout-title">Atenção</div>
            Quando o ADX está subindo e de repente inverte fazendo um "kick" (uma virada brusca), pode estar marcando um <strong>topo</strong> (se você está comprado) ou um <strong>fundo</strong> (se está vendido).
          </div>
        `
      },
      {
        id: 'm2-a2',
        titulo: 'Como o ADX libera o resto do setup',
        html: `
          <span class="content-tag">Módulo 2 · Aula 2</span>
          <h1>Como o ADX libera o resto do setup</h1>
          <p class="lead">O papel mais importante do Movimento Direcional não é gerar sinais sozinho — é decidir <strong>qual time entra em campo</strong>.</p>

          <h2>Cenário com tendência → TRIX e Didi Index dominam</h2>
          <p>Se o ADX mostra tendência (qualquer um dos casos fora das duas exceções da aula anterior), os diretores "com tendência" passam a comandar. As agulhadas do Didi Index ganham força e o TRIX confirma a direção.</p>

          <h2>Cenário sem tendência → Estocástico dá as cartas</h2>
          <p>Se ADX abaixo das outras linhas ou ADX caindo ≤ 32, o mercado está se acomodando. Aqui o Estocástico é quem trabalha bem, marcando ciclos suaves entre 0/20 (sobrevendido) e 80/100 (sobrecomprado).</p>

          <div class="callout key">
            <div class="callout-title">Regra prática</div>
            Antes de olhar agulhada, antes de olhar Bollinger, antes de qualquer coisa: <strong>olhe o ADX</strong>. Ele decide quais indicadores você vai usar para tomar a decisão.
          </div>

          <h2>Erros clássicos com o ADX</h2>
          <ul>
            <li><strong>Ignorar o ADX e operar agulhada em mercado lateral.</strong> Sinal bonito, resultado feio.</li>
            <li><strong>Confundir cruzamento AD+/AD- com sinal de entrada.</strong> O cruzamento dá <em>viés</em>, não dispara operação.</li>
            <li><strong>Olhar apenas o valor absoluto do ADX.</strong> A <em>inclinação</em> importa mais que o número.</li>
          </ul>
        `
      }
    ],
    quiz: {
      titulo: 'Quiz · Movimento Direcional',
      perguntas: [
        {
          q: 'Qual cruzamento informa viés de compra?',
          opcoes: ['ADX acima do AD+', 'AD+ acima do AD-', 'AD- acima do AD+', 'ADX abaixo de 20'],
          correta: 1,
          explica: 'Quando AD+ está acima do AD-, o viés é de compra. O contrário (AD- acima do AD+) é viés de venda.'
        },
        {
          q: 'O ADX informa principalmente:',
          opcoes: [
            'A direção do mercado',
            'A força (aceleração) do movimento',
            'O preço justo do ativo',
            'O momento exato de entrada'
          ],
          correta: 1,
          explica: 'O ADX não dá direção. Ele mede a força/aceleração da tendência. Quem dá direção é o cruzamento AD+ × AD-.'
        },
        {
          q: 'Em quais situações o mercado é considerado SEM tendência?',
          opcoes: [
            'Sempre que o ADX estiver abaixo de 50',
            'Quando o ADX estiver abaixo do AD+ e AD-, ou caindo com valor ≤ 32',
            'Quando o Bollinger estiver fechado',
            'Apenas quando o Estocástico estiver entre 40 e 60'
          ],
          correta: 1,
          explica: 'São exatamente essas duas situações: ADX abaixo das outras duas linhas, ou ADX descendo com valor menor ou igual a 32.'
        }
      ]
    }
  },

  {
    num: '03',
    titulo: 'Bandas de Bollinger',
    aulas: [
      {
        id: 'm3-a1',
        titulo: 'Bollinger como diretor de timing',
        html: `
          <span class="content-tag">Módulo 3 · Aula 1</span>
          <h1>Bollinger: o diretor de timing</h1>
          <p class="lead">No setup do Didi, o Bollinger tem uma função única: <strong>marcar o tempo</strong>. Você ignora as barras dentro das bandas e a média central. Foco total na <em>distância entre as bandas externas</em>.</p>

          <h2>A "boca de jacaré"</h2>
          <p>O Didi descreve o melhor cenário com uma imagem: as bandas se abrindo como a boca de um jacaré faminto. Quanto mais aberto o ângulo, mais violento tende a ser o movimento que vem.</p>

          <ul>
            <li><strong>Abertura forte</strong> (ângulo grande entre as bandas) → movimento promete força.</li>
            <li><strong>Abertura branda</strong> (ângulo pequeno) → movimento fraco, cuidado.</li>
            <li><strong>Bandas paralelas</strong> → o rally está em curso, sem novidade.</li>
            <li><strong>Bandas fechando</strong> → o rally está acabando, hora de sair.</li>
          </ul>

          <div class="callout">
            <div class="callout-title">Detalhe que muita gente perde</div>
            No <strong>primeiro</strong> momento em que você perceber as bandas começando a fechar, isso já indica fim do movimento. Não espere elas se cruzarem.
          </div>

          <h2>Em mercado lateral</h2>
          <p>Quando não há tendência, as bandas perdem a graça. O Didi as descreve como "linguiças amassadas e disformes" — sem ângulo de abertura, sem direção clara. Esse é o sinal pra você esperar.</p>
        `
      },
      {
        id: 'm3-a2',
        titulo: 'Combinando Bollinger com o ADX',
        html: `
          <span class="content-tag">Módulo 3 · Aula 2</span>
          <h1>Combinando Bollinger com o ADX</h1>
          <p class="lead">Bollinger e ADX são parceiros naturais: um diz <em>se</em> há tendência, o outro diz <em>quando</em> agir nela.</p>

          <h2>Receita de entrada</h2>
          <p>Você procura o encontro de duas condições:</p>
          <ol>
            <li>Bandas de Bollinger <strong>abrindo</strong> entre si.</li>
            <li>Movimento Direcional sinalizando entrada de tendência — <strong>ou prestes a sinalizar</strong>, se a abertura do Bollinger for forte.</li>
          </ol>
          <p>Quando os dois acontecem juntos, o rally está começando.</p>

          <h2>Receita de saída</h2>
          <p>Você sai quando:</p>
          <ul>
            <li>A tendência começa a enfraquecer (ADX caindo, AD+/AD- se aproximando), <strong>e</strong></li>
            <li>O Bollinger começa a <strong>fechar</strong> as bandas.</li>
          </ul>

          <div class="callout tip">
            <div class="callout-title">Filosofia do método</div>
            Você vai deixar de pegar a ponta do movimento. Tudo bem. O Didi prefere garantir o pedaço gordo do meio do que correr atrás de máximas e mínimas exatas e acabar zero a zero — ou perdendo.
          </div>

          <div class="callout warn">
            <div class="callout-title">Cuidado</div>
            Bollinger sem ADX gera muito sinal falso em mercado lateral. ADX sem Bollinger te coloca na operação cedo ou tarde demais. Os dois <strong>juntos</strong> é que fazem o setup brilhar.
          </div>
        `
      }
    ],
    quiz: {
      titulo: 'Quiz · Bandas de Bollinger',
      perguntas: [
        {
          q: 'No setup do Didi, qual é a função principal das Bandas de Bollinger?',
          opcoes: [
            'Determinar a direção da tendência',
            'Dar o timing de entrada e saída',
            'Calcular o stop loss',
            'Substituir o Estocástico em mercados laterais'
          ],
          correta: 1,
          explica: 'O Bollinger é o "diretor de timing": abertura das bandas = momento de entrar; fechamento = momento de sair.'
        },
        {
          q: 'Quando começa o sinal de saída pelas Bandas de Bollinger?',
          opcoes: [
            'Quando as bandas se cruzam',
            'Quando o preço encosta na banda superior',
            'No primeiro momento em que as bandas começam a fechar',
            'Apenas quando o ADX cai abaixo de 20'
          ],
          correta: 2,
          explica: 'No primeiro movimento de fechamento das bandas já há indicação de fim do rally. Não é preciso esperar muito mais que isso.'
        },
        {
          q: 'Bandas se abrindo com ângulo grande significam:',
          opcoes: [
            'Movimento provavelmente violento e forte',
            'Mercado lateralizado',
            'Sinal de inversão imediata',
            'Erro de configuração do indicador'
          ],
          correta: 0,
          explica: 'Aberturas com ângulo maior prometem movimentos mais violentos. Aberturas brandas, movimentos mais fracos.'
        }
      ]
    }
  },

  {
    num: '04',
    titulo: 'TRIX e Estocástico',
    aulas: [
      {
        id: 'm4-a1',
        titulo: 'TRIX: o rastreador de tendência',
        html: `
          <span class="content-tag">Módulo 4 · Aula 1</span>
          <h1>TRIX: o rastreador de tendência</h1>
          <p class="lead">O TRIX é o diretor especialista em momentos <strong>com tendência</strong>. Tem três qualidades que o tornam essencial no setup: antecipa, é mão forte e tem ângulo previsível.</p>

          <h2>Antecipação</h2>
          <p>O TRIX tende a antecipar o movimento — especialmente em tempos gráficos mais longos. Ele "fareja" o giro antes de outros indicadores reagirem.</p>

          <h2>Mão forte</h2>
          <p>Quando o TRIX vende, ele <strong>continua vendendo</strong> mesmo se o mercado andar um pouco contra. Quando o mercado começa a contrariar de verdade, ele só intensifica. É essa frieza — o Didi chama de "frieza de bloco de gelo" — que faz dele um aliado em movimentos longos.</p>

          <h2>Cruzamento + ângulo</h2>
          <p>Ele compra ou vende pelo <strong>cruzamento das linhas</strong>. Uma das linhas é uma média móvel tracejada, adicionada justamente para facilitar a leitura nas inversões.</p>

          <div class="callout">
            <div class="callout-title">Ângulo importa</div>
            Quanto <strong>mais fechado</strong> for o ângulo no momento de mergulho ou subida invertendo a mão, <strong>mais contundente</strong> tende a ser o movimento. Inversão "preguiçosa" = movimento fraco.
          </div>
        `
      },
      {
        id: 'm4-a2',
        titulo: 'Estocástico: o leitor de lateralidade',
        html: `
          <span class="content-tag">Módulo 4 · Aula 2</span>
          <h1>Estocástico: o leitor de lateralidade</h1>
          <p class="lead">Enquanto o TRIX brilha na tendência, o Estocástico é o especialista em <strong>mercados sem tendência</strong>. Ele desenha o movimento completo, indo de uma ponta a outra com velocidade.</p>

          <h2>As zonas</h2>
          <ul>
            <li><strong>Entre 80 e 100</strong> → área sobrecomprada</li>
            <li><strong>Entre 0 e 20</strong> → área sobrevendida</li>
            <li><strong>Entre 20 e 80</strong> → zona neutra</li>
          </ul>

          <h2>Como ele se comporta sem tendência</h2>
          <p>Em mercados laterais, o Estocástico desenha ciclos suaves: sobe limpo até a zona de cima, depois desce limpo até a zona de baixo. Sem pontos falsos, sem rabiscos.</p>

          <h2>Como ele se comporta COM tendência</h2>
          <p>Aqui vem o detalhe que muita gente entende errado:</p>

          <div class="callout key">
            <div class="callout-title">Não fique olhando o número</div>
            Quando o Estocástico "martela" no teto (fica indo e voltando na faixa de 80–100 por bastante tempo), ele <strong>não</strong> está dizendo "está caro, vai cair". Ele está dizendo: <strong>há tendência de alta firme</strong>. O contrário é igual: martelando no piso = tendência de baixa firme.
          </div>

          <p>O Didi resume: "quando informarem que o Estocástico já está em 98, responda que <em>calça 42</em>". O valor numérico isolado não significa nada — o que importa é o <em>comportamento</em>.</p>

          <h2>O sinal de virada</h2>
          <p>Quando o Estocástico finalmente <strong>desiste</strong> de martelar e vira a mesa de uma só vez, é hora de prestar muita atenção: o ciclo acabou.</p>

          <div class="callout tip">
            <div class="callout-title">Lembrete importante</div>
            TRIX e Estocástico podem <strong>concordar</strong>, mesmo sendo de departamentos diferentes. Quando concordam, o sinal é mais forte. Eles não são inimigos — são colegas que ajudam você a ganhar dinheiro.
          </div>
        `
      }
    ],
    quiz: {
      titulo: 'Quiz · TRIX e Estocástico',
      perguntas: [
        {
          q: 'A principal característica que torna o TRIX útil no setup é:',
          opcoes: [
            'Ele dá sinal antes do preço se mover (antecipação) e é mão forte',
            'Ele substitui o ADX em mercados laterais',
            'Ele calcula automaticamente o stop loss',
            'Ele oscila apenas entre 0 e 100'
          ],
          correta: 0,
          explica: 'O TRIX antecipa o movimento (especialmente em tempos mais longos) e é mão forte — característica de "frieza de bloco de gelo".'
        },
        {
          q: 'Quando o Estocástico fica "martelando" no teto (faixa 80–100) por bastante tempo, isso indica:',
          opcoes: [
            'Inversão iminente para baixo',
            'Erro no indicador',
            'Tendência de alta firme em andamento',
            'Sobrecompra extrema, hora de vender'
          ],
          correta: 2,
          explica: 'Ao contrário do que muita gente pensa, "martelar no teto" indica tendência de alta firme — não inversão. O valor isolado não significa nada.'
        },
        {
          q: 'Qual é o papel do Estocástico no setup do Didi?',
          opcoes: [
            'Diretor de "com tendência"',
            'Diretor de "sem tendência" / mercados laterais',
            'Define o stop loss',
            'É o presidente do setup'
          ],
          correta: 1,
          explica: 'O Estocástico é o diretor de "sem tendência". Brilha em mercados laterais, marcando ciclos limpos entre sobrevenda e sobrecompra.'
        },
        {
          q: 'No TRIX, ângulos mais fechados na inversão significam:',
          opcoes: [
            'Movimento mais fraco',
            'Movimento mais contundente / forte',
            'Sinal falso',
            'O indicador está mal configurado'
          ],
          correta: 1,
          explica: 'Quanto mais fechado o ângulo no momento da inversão, mais contundente tende a ser o movimento que vem.'
        }
      ]
    }
  },

  {
    num: '05',
    titulo: 'Didi Index e a Agulhada',
    aulas: [
      {
        id: 'm5-a1',
        titulo: 'As 3 médias móveis: 3, 8 e 20',
        html: `
          <span class="content-tag">Módulo 5 · Aula 1</span>
          <h1>As 3 médias móveis: 3, 8 e 20</h1>
          <p class="lead">O Didi Index é, na essência, um indicador de <strong>três médias móveis</strong> trabalhando juntas. Cada uma tem uma personalidade — e é o relacionamento entre elas que produz o sinal.</p>

          <h2>As três personagens</h2>

          <div class="indicator-card">
            <h4>Média curta — período 3</h4>
            <p>A mais rápida. Anda colada nas barras, reage primeiro a qualquer movimento. É a primeira a virar.</p>
          </div>

          <div class="indicator-card">
            <h4>Média intermediária — período 8</h4>
            <p>O meio-termo. Não é tão volátil quanto a curta nem tão lenta quanto a longa. Vai ser o ponto de referência.</p>
          </div>

          <div class="indicator-card">
            <h4>Média longa — período 20</h4>
            <p>A mais lenta. Filtra os pequenos ruídos do mercado. Quando ela vira, é coisa séria.</p>
          </div>

          <h2>Dois eventos importantes</h2>

          <h3>1. Alerta — cruzamento da curta com a intermediária</h3>
          <p>Quando a média de 3 cruza a de 8:</p>
          <ul>
            <li><strong>Para cima</strong> → alerta de compra</li>
            <li><strong>Para baixo</strong> → alerta de venda</li>
          </ul>

          <h3>2. Confirmação — cruzamento da intermediária com a longa</h3>
          <p>Quando a média de 8 cruza a de 20:</p>
          <ul>
            <li><strong>Para cima</strong> → confirmação de compra</li>
            <li><strong>Para baixo</strong> → confirmação de venda</li>
          </ul>

          <div class="callout key">
            <div class="callout-title">A regra de ouro</div>
            Quanto <strong>menor o intervalo de tempo</strong> entre o alerta e a confirmação, <strong>mais certeiro e contundente</strong> tende a ser o movimento. Esse princípio é o que nos leva direto para a próxima aula — a agulhada.
          </div>
        `
      },
      {
        id: 'm5-a2',
        titulo: 'A Agulhada: o sinal que dá nome à estratégia',
        html: `
          <span class="content-tag">Módulo 5 · Aula 2</span>
          <h1>A Agulhada: o sinal central</h1>
          <p class="lead">Lembra da regra de ouro: <em>quanto menor o intervalo entre alerta e confirmação, mais forte o movimento</em>. Agora imagine que esse intervalo seja <strong>zero</strong>.</p>

          <h2>O que é a agulhada</h2>
          <p>É exatamente isso: as <strong>três médias se encontrando praticamente no mesmo ponto</strong>, e logo depois saindo organizadas. Foi como o Didi descobriu o sinal, observando o mercado de madrugada e percebendo que essa formação se repetia com força impressionante.</p>

          <p>A metáfora que o próprio Didi usa:</p>

          <div class="callout">
            "Três novelos de lã de cores diferentes, entrando juntos num buraco de agulha e saindo perfeitamente desembaraçados, arrumados na compra ou na venda."
          </div>

          <h2>Como saem as médias</h2>
          <ul>
            <li><strong>Arrumadas na compra</strong>: curta em cima, intermediária no meio, longa embaixo</li>
            <li><strong>Arrumadas na venda</strong>: longa em cima, intermediária no meio, curta embaixo</li>
          </ul>
          <p>A intermediária sempre fica no meio. As que trocam de lugar são a curta e a longa.</p>

          <h2>A regra prática de entrada</h2>
          <ol>
            <li>Aconteceu o cruzamento.</li>
            <li><strong>Espere o fechamento da barra seguinte.</strong> Ela precisa confirmar a nova ordem das linhas.</li>
            <li>Se confirmou, você <strong>opera na abertura da segunda barra após o cruzamento</strong>.</li>
          </ol>

          <h2>O teste da lupa</h2>
          <p>Se você ampliar muito o gráfico, vai ver que poucas agulhadas são "geometricamente perfeitas". O Didi compara com o queijo minas no microscópio: visto de longe é queijo, visto de muito perto é uma gosma — mas continua sendo queijo.</p>

          <div class="callout tip">
            <div class="callout-title">Regra do bom senso</div>
            Se você precisou da lupa e percebeu que não foi agulhada <strong>por um triz</strong>, considere como agulhada. <em>E ela será.</em>
          </div>
        `
      },
      {
        id: 'm5-a3',
        titulo: 'Agulhada Santa: juntando tudo',
        html: `
          <span class="content-tag">Módulo 5 · Aula 3</span>
          <h1>Agulhada Santa: o sinal mais forte do setup</h1>
          <p class="lead">Uma agulhada qualquer já é um sinal. Mas uma <strong>agulhada santa</strong> — aquela em que <em>todos</em> os indicadores do setup concordam — é o tipo de sinal que faz o método ser o que é.</p>

          <h2>Checklist da agulhada santa</h2>
          <ol>
            <li><strong>ADX</strong> mostrando tendência (não estamos na zona "sem tendência").</li>
            <li><strong>Bandas de Bollinger</strong> abrindo (ou prestes a abrir, se a abertura prometer força).</li>
            <li><strong>Didi Index</strong> com agulhada formada e barra seguinte confirmando.</li>
            <li><strong>TRIX</strong> na mesma direção da agulhada.</li>
            <li><strong>Estocástico</strong> também concordando com a direção.</li>
          </ol>

          <div class="callout key">
            <div class="callout-title">Por que "santa"?</div>
            Porque é raríssimo bater todas as condições juntas. Mas quando bate, a probabilidade de o movimento entregar é altíssima. Não é "sinal qualquer" — é o momento em que toda a empresa concorda.
          </div>

          <h2>Entrada, alvo e saída</h2>

          <h3>Entrada</h3>
          <p>Na <strong>abertura da segunda barra</strong> após o cruzamento, desde que a primeira barra após o sinal tenha confirmado a nova ordem das médias.</p>

          <h3>Alvo</h3>
          <p>O método não usa alvo fixo em pontos. O alvo é o próprio sistema te avisando: você sai quando o setup começa a se desfazer.</p>

          <h3>Saída</h3>
          <ul>
            <li>Bollinger começa a <strong>fechar</strong> as bandas, <strong>ou</strong></li>
            <li>TRIX <strong>cruza</strong> contra a sua posição, <strong>ou</strong></li>
            <li>ADX perde força (kick / inclinação invertendo), <strong>ou</strong></li>
            <li>Nova agulhada se forma na direção contrária.</li>
          </ul>

          <div class="callout">
            <div class="callout-title">Filosofia da saída</div>
            "A agulhada é o instrumento de entrada. A saída é via indicações dos modelos gráficos." — você não decide antes de operar quando vai sair; o setup avisa.
          </div>

          <h2>Disciplina é metade do método</h2>
          <p>O Didi termina o eBook com uma frase que vale a leitura inteira: <em>"Tenha paciência, espere as boas oportunidades e a sorte vai encontrar você."</em></p>
          <p>O setup completo aparece menos do que a gente queria. A diferença entre quem ganha e quem perde com esse método não é o conhecimento técnico — é a paciência de só apertar o gatilho quando todos os diretores da empresa estão concordando.</p>
        `
      }
    ],
    quiz: {
      titulo: 'Quiz final · Didi Index e Agulhada',
      perguntas: [
        {
          q: 'Quais são os períodos das três médias móveis do Didi Index?',
          opcoes: ['5, 13 e 21', '3, 8 e 20', '9, 21 e 50', '7, 14 e 28'],
          correta: 1,
          explica: 'Os períodos clássicos do Didi Index são 3 (rápida), 8 (intermediária) e 20 (lenta).'
        },
        {
          q: 'Numa agulhada de compra, como as médias ficam ordenadas após o cruzamento?',
          opcoes: [
            'Longa em cima, intermediária no meio, curta embaixo',
            'Curta em cima, intermediária no meio, longa embaixo',
            'As três sobrepostas',
            'Curta embaixo, longa no meio, intermediária em cima'
          ],
          correta: 1,
          explica: 'Compra: curta em cima, intermediária no meio, longa embaixo. Venda é o inverso. A intermediária sempre fica no meio.'
        },
        {
          q: 'Qual é a regra prática para entrar após uma agulhada?',
          opcoes: [
            'Entrar na mesma barra do cruzamento',
            'Esperar 3 dias',
            'Esperar a barra seguinte confirmar e entrar na abertura da segunda barra após o cruzamento',
            'Não entrar até que o Estocástico chegue a 50'
          ],
          correta: 2,
          explica: 'Espere o fechamento da barra seguinte ao cruzamento — se confirmou a nova ordem das médias, opere na abertura da segunda barra após o evento.'
        },
        {
          q: 'O que caracteriza uma "agulhada santa"?',
          opcoes: [
            'Uma agulhada que aconteceu no fim do pregão',
            'Uma agulhada com Didi + TRIX + Estocástico (e cenário) concordando',
            'Uma agulhada em tempo gráfico semanal',
            'Qualquer cruzamento das três médias'
          ],
          correta: 1,
          explica: 'Agulhada santa é quando, além da agulhada no Didi Index, TRIX e Estocástico (e o cenário de ADX e Bollinger) concordam com a direção.'
        },
        {
          q: 'Segundo o método, quando devemos sair da operação?',
          opcoes: [
            'Em alvo fixo de pontos pré-definido',
            'Quando o setup começa a se desfazer (Bollinger fecha, TRIX cruza contra, ADX perde força)',
            'Apenas no fechamento do dia',
            'Quando dobrar o capital investido'
          ],
          correta: 1,
          explica: 'A agulhada é o instrumento de entrada. A saída é via indicações dos modelos gráficos — o próprio sistema avisa quando o movimento acabou.'
        }
      ]
    }
  }
];

/* ──────────── PROGRESSO (localStorage) ──────────── */

function getProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
  catch { return {}; }
}
function saveProgress(p) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}
function markDone(id) {
  const p = getProgress();
  p[id] = true;
  saveProgress(p);
}

function getQuizzes() {
  try { return JSON.parse(localStorage.getItem(QUIZ_KEY)) || {}; }
  catch { return {}; }
}
function saveQuizResult(modIdx, acertos, total) {
  const q = getQuizzes();
  q['m' + modIdx] = { acertos, total, ts: Date.now() };
  localStorage.setItem(QUIZ_KEY, JSON.stringify(q));
}

/* ──────────── ÍNDICE PLANO ──────────── */

const FLAT = []; // [{type:'aula'|'quiz', modIdx, aulaIdx?, id, titulo}]
CURSO.forEach((mod, mi) => {
  mod.aulas.forEach((a, ai) => {
    FLAT.push({ type: 'aula', modIdx: mi, aulaIdx: ai, id: a.id, titulo: a.titulo });
  });
  FLAT.push({ type: 'quiz', modIdx: mi, id: 'quiz-m' + mi, titulo: mod.quiz.titulo });
});

let currentIdx = 0;

/* ──────────── SIDEBAR ──────────── */

function renderSidebar() {
  const cont = document.getElementById('sidebar-modulos');
  const progress = getProgress();
  const quizzes = getQuizzes();

  cont.innerHTML = CURSO.map((mod, mi) => {
    const aulas = mod.aulas.map((a) => {
      const flatIdx = FLAT.findIndex((f) => f.id === a.id);
      const done = progress[a.id];
      const active = currentIdx === flatIdx;
      return `
        <li class="aula-item ${done ? 'done' : ''} ${active ? 'active' : ''}" data-idx="${flatIdx}">
          <span class="aula-check">${done ? '✓' : ''}</span>
          <span class="aula-text">${a.titulo}</span>
        </li>`;
    }).join('');

    const quizId = 'quiz-m' + mi;
    const quizFlatIdx = FLAT.findIndex((f) => f.id === quizId);
    const quizDone = quizzes['m' + mi];
    const quizActive = currentIdx === quizFlatIdx;

    return `
      <div class="modulo">
        <div class="modulo-head">
          <span class="modulo-num">${mod.num}</span>
          <span>${mod.titulo}</span>
        </div>
        <ul class="aulas">
          ${aulas}
          <li class="aula-item quiz ${quizDone ? 'done' : ''} ${quizActive ? 'active' : ''}" data-idx="${quizFlatIdx}">
            <span class="aula-check">${quizDone ? '✓' : '?'}</span>
            <span class="aula-text">${mod.quiz.titulo}</span>
          </li>
        </ul>
      </div>
    `;
  }).join('');

  cont.querySelectorAll('.aula-item').forEach((el) => {
    el.addEventListener('click', () => {
      currentIdx = parseInt(el.dataset.idx, 10);
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.getElementById('sidebar').classList.remove('open');
    });
  });

  updateProgressMini();
}

function updateProgressMini() {
  const progress = getProgress();
  const quizzes = getQuizzes();
  const totalAulas = FLAT.filter(f => f.type === 'aula').length;
  const totalQuiz = CURSO.length;
  const aulasDone = FLAT.filter(f => f.type === 'aula' && progress[f.id]).length;
  const quizDone = Object.keys(quizzes).length;
  const pct = Math.round(((aulasDone + quizDone) / (totalAulas + totalQuiz)) * 100);
  document.getElementById('progress-mini').textContent = pct + '% concluído';
}

/* ──────────── RENDER PRINCIPAL ──────────── */

function render() {
  const item = FLAT[currentIdx];
  const cont = document.getElementById('content');

  if (item.type === 'aula') {
    const aula = CURSO[item.modIdx].aulas[item.aulaIdx];
    cont.innerHTML = aula.html + renderNav();
    markDone(aula.id);
  } else {
    renderQuiz(item.modIdx);
  }

  renderSidebar();
  attachNav();
}

function renderNav() {
  const prevDisabled = currentIdx === 0;
  const nextDisabled = currentIdx === FLAT.length - 1;
  const nextItem = FLAT[currentIdx + 1];
  const nextLabel = !nextItem ? 'Fim do curso'
    : nextItem.type === 'quiz' ? 'Fazer o quiz →' : 'Próxima aula →';
  return `
    <div class="nav-buttons">
      <button class="nav-btn" id="btn-prev" ${prevDisabled ? 'disabled' : ''}>← Anterior</button>
      <button class="nav-btn primary" id="btn-next" ${nextDisabled ? 'disabled' : ''}>${nextLabel}</button>
    </div>
  `;
}

function attachNav() {
  const prev = document.getElementById('btn-prev');
  const next = document.getElementById('btn-next');
  if (prev) prev.addEventListener('click', () => {
    if (currentIdx > 0) { currentIdx--; render(); window.scrollTo({top:0,behavior:'smooth'}); }
  });
  if (next) next.addEventListener('click', () => {
    if (currentIdx < FLAT.length - 1) { currentIdx++; render(); window.scrollTo({top:0,behavior:'smooth'}); }
  });
}

/* ──────────── QUIZ ──────────── */

function renderQuiz(modIdx) {
  const mod = CURSO[modIdx];
  const quiz = mod.quiz;
  const cont = document.getElementById('content');

  const respostas = new Array(quiz.perguntas.length).fill(null);
  let finalizado = false;

  function paint() {
    const tudoRespondido = respostas.every(r => r !== null);
    cont.innerHTML = `
      <span class="content-tag">Módulo ${mod.num} · Quiz</span>
      <h1>${quiz.titulo}</h1>
      <p class="lead">Responda para verificar seu entendimento. ${finalizado ? '' : 'As respostas só aparecem depois que você finalizar.'}</p>

      ${quiz.perguntas.map((p, i) => `
        <div class="quiz-question">
          <div class="quiz-q-num">Pergunta ${i + 1} de ${quiz.perguntas.length}</div>
          <div class="quiz-q-text">${p.q}</div>
          <ul class="quiz-options">
            ${p.opcoes.map((op, oi) => {
              let cls = '';
              if (finalizado) {
                if (oi === p.correta) cls = 'correct';
                else if (respostas[i] === oi) cls = 'wrong';
                cls += ' disabled';
              } else if (respostas[i] === oi) {
                cls = 'selected';
              }
              return `<li><button class="quiz-opt ${cls}" data-q="${i}" data-o="${oi}" ${finalizado ? 'disabled' : ''}>${op}</button></li>`;
            }).join('')}
          </ul>
          ${finalizado ? `<div class="quiz-explain"><strong>Explicação:</strong> ${p.explica}</div>` : ''}
        </div>
      `).join('')}

      ${finalizado ? renderQuizResult() : `
        <div class="nav-buttons">
          <button class="nav-btn" id="btn-prev">← Voltar</button>
          <button class="nav-btn primary" id="btn-finalizar" ${tudoRespondido ? '' : 'disabled'}>Finalizar quiz</button>
        </div>
      `}
    `;

    cont.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        if (finalizado) return;
        const q = parseInt(btn.dataset.q, 10);
        const o = parseInt(btn.dataset.o, 10);
        respostas[q] = o;
        paint();
      });
    });

    const btnFin = document.getElementById('btn-finalizar');
    if (btnFin) btnFin.addEventListener('click', () => {
      finalizado = true;
      const acertos = respostas.reduce((acc, r, i) => acc + (r === quiz.perguntas[i].correta ? 1 : 0), 0);
      saveQuizResult(modIdx, acertos, quiz.perguntas.length);
      renderSidebar();
      paint();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const btnPrev = document.getElementById('btn-prev');
    if (btnPrev) btnPrev.addEventListener('click', () => {
      if (currentIdx > 0) { currentIdx--; render(); window.scrollTo({top:0,behavior:'smooth'}); }
    });

    const btnNext = document.getElementById('btn-next-quiz');
    if (btnNext) btnNext.addEventListener('click', () => {
      if (currentIdx < FLAT.length - 1) { currentIdx++; render(); window.scrollTo({top:0,behavior:'smooth'}); }
    });

    const btnRefazer = document.getElementById('btn-refazer');
    if (btnRefazer) btnRefazer.addEventListener('click', () => {
      renderQuiz(modIdx);
    });
  }

  function renderQuizResult() {
    const acertos = respostas.reduce((acc, r, i) => acc + (r === quiz.perguntas[i].correta ? 1 : 0), 0);
    const total = quiz.perguntas.length;
    const pct = Math.round((acertos / total) * 100);
    const msg = pct === 100 ? 'Gabaritou! Conteúdo do módulo bem assentado.'
      : pct >= 70 ? 'Bom resultado. Vale revisar os pontos errados antes de seguir.'
      : 'Vale revisar este módulo com calma antes de avançar.';

    const ehUltimo = currentIdx === FLAT.length - 1;

    return `
      <div class="quiz-result">
        <div class="quiz-score">${acertos} / ${total}</div>
        <div class="quiz-result-text">${msg}</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="nav-buttons">
        <button class="nav-btn" id="btn-refazer">Refazer quiz</button>
        ${ehUltimo
          ? `<button class="nav-btn primary" disabled>Curso concluído ✓</button>`
          : `<button class="nav-btn primary" id="btn-next-quiz">Próximo módulo →</button>`
        }
      </div>
    `;
  }

  paint();
}

/* ──────────── LOGIN ──────────── */

async function verificarToken(token) {
  try {
    const res = await fetch('/api/curso-verify', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.ok;
  } catch {
    return false;
  }
}

function mostrarCurso() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('curso-screen').style.display = 'block';
  render();
}

function mostrarLogin() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('curso-screen').style.display = 'none';
}

(async () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token && await verificarToken(token)) {
    mostrarCurso();
  }
})();

document.getElementById('form-login').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn   = document.getElementById('btn-login');
  const erro  = document.getElementById('login-error');
  const senha = document.getElementById('inp-senha').value;

  erro.textContent = '';
  btn.disabled = true;
  btn.textContent = 'Verificando...';

  try {
    const res  = await fetch('/api/curso-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senha })
    });
    const data = await res.json();
    if (!res.ok) {
      erro.textContent = data.error || 'Senha incorreta.';
      return;
    }
    localStorage.setItem(TOKEN_KEY, data.token);
    mostrarCurso();
  } catch {
    erro.textContent = 'Erro de conexão. Tente novamente.';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Entrar';
  }
});

document.getElementById('btn-logout').addEventListener('click', () => {
  localStorage.removeItem(TOKEN_KEY);
  mostrarLogin();
});

document.getElementById('sidebar-toggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});
