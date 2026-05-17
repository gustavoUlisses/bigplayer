/* ─────────────────────────────────────────────────────────────
   CURSO DIDI INDEX — Área do aluno
   Roadmap:
     01 · Introdução            (sem quiz)
     02 · O Sistema             (com quiz)
     03 · Movimento Direcional  (com quiz)
     04 · Bandas de Bollinger   (com quiz)
     05 · TRIX e Estocástico    (com quiz)
     06 · Didi Index e Agulhada (com quiz)
   ───────────────────────────────────────────────────────────── */

const TOKEN_KEY    = 'curso_token';
const PROGRESS_KEY = 'curso_progresso_v1';
const QUIZ_KEY     = 'curso_quiz_v1';

/* ══════════════════════════════════════════════════════════════
   CONTEÚDO DO CURSO
══════════════════════════════════════════════════════════════ */
const CURSO = [

  /* ── MÓDULO 1 · INTRODUÇÃO ─────────────────────────────── */
  {
    num: '01',
    titulo: 'Introdução',
    quiz: null,
    aulas: [
      {
        id: 'm1-sobre',
        titulo: 'Sobre o Setup Didi Index',
        html: `
          <span class="content-tag">Módulo 1 · Aula 1</span>
          <h1>Sobre o Setup Didi Index</h1>
          <p class="lead">Antes de instalar e começar a operar, vale entender o que é o Setup Didi Index, quem está por trás dele e por que esse método se tornou referência no Brasil.</p>

          <h2>Quem é Didi Aguiar</h2>
          <p><strong>Odir Aguiar</strong>, conhecido como <strong>Didi Aguiar</strong>, é um dos analistas técnicos mais respeitados do Brasil. Engenheiro de formação, dedicou décadas ao estudo do mercado financeiro e do comportamento dos preços. É o criador do indicador <strong>Didi Index</strong> e do conceito de <strong>agulhada</strong> — hoje praticamente sinônimo da sua escola de análise.</p>

          <h2>Como o Didi Index foi descoberto</h2>
          <p>O indicador não foi inventado: foi <em>percebido</em>. Em uma madrugada, por volta das 4h, observando gráficos, Didi notou uma formação específica entre três médias móveis que se repetia inúmeras vezes e quase sempre antecedia movimentos fortes.</p>

          <div class="callout">
            <div class="callout-title">Nas palavras dele</div>
            "Vasculhei todos os tempos gráficos, todos os ativos daqui e de fora do Brasil, e fiquei como louco tentando provar que eu não havia descoberto isto. Mas foi inevitável… a coisa insistia em funcionar."
          </div>

          <p>O que ele havia percebido — e batizaria de <strong>agulhada</strong> — é o momento em que as três médias móveis (períodos 3, 8 e 20) se encontram quase no mesmo ponto e saem ordenadas, na compra ou na venda.</p>

          <h2>O que é o Setup Didi Index</h2>
          <p>O setup não é um indicador isolado. É um <strong>sistema com 5 indicadores</strong> trabalhando juntos, cada um com uma função clara:</p>

          <div class="indicator-card">
            <h4>Movimento Direcional (ADX, AD+, AD-) <span class="role-pill pres">Presidente</span></h4>
            <p>Decide se existe tendência. É o filtro principal — sem ele, os outros falam na hora errada.</p>
          </div>
          <div class="indicator-card">
            <h4>Bandas de Bollinger <span class="role-pill time">Timing</span></h4>
            <p>Marca o momento de entrar e sair. Bandas abrindo = entrar; fechando = sair.</p>
          </div>
          <div class="indicator-card">
            <h4>TRIX <span class="role-pill com">Com tendência</span></h4>
            <p>Confirma a direção em mercados direcionais. Antecipa movimentos e é mão forte.</p>
          </div>
          <div class="indicator-card">
            <h4>Estocástico <span class="role-pill sem">Sem tendência</span></h4>
            <p>Lê mercados laterais. Avisa sobrecompra (acima de 80) e sobrevenda (abaixo de 20).</p>
          </div>
          <div class="indicator-card">
            <h4>Didi Index — médias 3, 8 e 20 <span class="role-pill com">Com tendência</span></h4>
            <p>O coração do setup. É aqui que nasce a <strong>agulhada</strong>.</p>
          </div>

          <h2>O que você vai receber pronto</h2>
          <p>Você não precisa configurar nada na mão. O setup é entregue como um <strong>arquivo único por plataforma</strong>, com todos os 5 indicadores já parametrizados:</p>
          <ul>
            <li>Didi Index com médias <strong>3, 8 e 20</strong></li>
            <li>Bandas de Bollinger com <strong>20 períodos e 2 desvios</strong></li>
            <li>ADX com <strong>14 períodos</strong></li>
            <li>TRIX e Estocástico nos valores tradicionais do método</li>
          </ul>

          <div class="callout warn">
            <div class="callout-title">Não altere os parâmetros</div>
            A estratégia foi calibrada com esses valores. Mudar qualquer um deles descaracteriza o método.
          </div>

          <h2>Plataformas suportadas</h2>
          <ul>
            <li>MetaTrader 4 (MT4)</li>
            <li>MetaTrader 5 (MT5)</li>
            <li>Profit Chart</li>
            <li>Tryd Trader</li>
          </ul>
          <p>Nas próximas aulas, o passo a passo de instalação em cada uma. Pule direto para a sua plataforma.</p>
        `
      },
      {
        id: 'm1-mt4',
        titulo: 'Instalar no MetaTrader 4',
        html: `
          <span class="content-tag">Módulo 1 · Aula 2</span>
          <h1>Instalar no MetaTrader 4</h1>
          <p class="lead">Copiar o arquivo do setup para a pasta correta, reiniciar o MT4 e aplicar o template ao gráfico. São três passos rápidos.</p>

          <div class="callout">
            <div class="callout-title">Antes de começar</div>
            Tenha o arquivo do setup salvo em local fácil (Downloads ou Desktop) e feche o MT4 se ele estiver aberto.
          </div>

          <h2>Passo a passo</h2>
          <ol>
            <li>Abra o MT4.</li>
            <li>No menu superior: <strong>Arquivo → Abrir Pasta de Dados</strong>.</li>
            <li>No Windows Explorer que abrir, entre em <strong>MQL4 → Templates</strong> e cole o arquivo <strong>.tpl</strong> do setup.</li>
            <li>Se houver arquivos <strong>.ex4</strong> (indicadores compilados), cole-os em <strong>MQL4 → Indicators</strong>.</li>
            <li>Feche o MT4 completamente e reabra.</li>
            <li>Abra um gráfico (ex: WIN, WDO, PETR4), clique com o botão direito → <strong>Modelo (Template) → nome do setup</strong>.</li>
            <li>Os 5 indicadores aparecem no gráfico, configurados e prontos.</li>
          </ol>

          <h2>Conferindo se deu certo</h2>
          <p>Depois de aplicar, você deve ver:</p>
          <ul>
            <li><strong>Bandas de Bollinger</strong> envolvendo as barras de preço no gráfico principal</li>
            <li><strong>Didi Index</strong> com três linhas (rápida, intermediária, lenta) em janela inferior</li>
            <li><strong>ADX</strong> com três linhas (AD+, AD-, ADX) em outra janela</li>
            <li><strong>TRIX</strong> e <strong>Estocástico</strong> cada um em sua própria janela</li>
          </ul>

          <div class="callout tip">
            <div class="callout-title">Setup como padrão</div>
            Salve o template com o nome <strong>default</strong> na pasta Templates. Todo gráfico novo que você abrir já vai carregar o setup automaticamente.
          </div>

          <div class="callout warn">
            <div class="callout-title">Não apareceu?</div>
            Confirme que fechou o MT4 antes de copiar o arquivo e que colou em <em>MQL4 → Templates</em> — não em MQL5, nem em outra pasta.
          </div>
        `
      },
      {
        id: 'm1-mt5',
        titulo: 'Instalar no MetaTrader 5',
        html: `
          <span class="content-tag">Módulo 1 · Aula 3</span>
          <h1>Instalar no MetaTrader 5</h1>
          <p class="lead">Mesma lógica do MT4, com uma diferença: a pasta de templates no MT5 fica em um caminho ligeiramente diferente.</p>

          <div class="callout">
            <div class="callout-title">Antes de começar</div>
            Arquivo do setup salvo e MT5 fechado.
          </div>

          <h2>Passo a passo</h2>
          <ol>
            <li>Abra o MT5.</li>
            <li>No menu superior: <strong>Arquivo → Abrir Pasta de Dados</strong>.</li>
            <li>No Windows Explorer que abrir, entre em <strong>MQL5 → Profiles → Templates</strong> e cole o arquivo <strong>.tpl</strong>.</li>
            <li>Se houver arquivos <strong>.ex5</strong> (indicadores compilados), cole-os em <strong>MQL5 → Indicators</strong>.</li>
            <li>Feche o MT5 completamente e reabra.</li>
            <li>Abra um gráfico, clique com o botão direito → <strong>Modelos → nome do setup</strong>.</li>
            <li>Os 5 indicadores aparecem aplicados com os parâmetros corretos.</li>
          </ol>

          <h2>Conferindo se deu certo</h2>
          <ul>
            <li><strong>Bandas de Bollinger</strong> sobre o gráfico de preço</li>
            <li><strong>Didi Index</strong> com três médias em janela inferior</li>
            <li><strong>ADX</strong> com AD+, AD- e ADX em janela própria</li>
            <li><strong>TRIX</strong> e <strong>Estocástico</strong> cada um em sua janela</li>
          </ul>

          <div class="callout tip">
            <div class="callout-title">Setup como padrão</div>
            Salve o template com o nome <strong>default</strong> em <em>MQL5 → Profiles → Templates</em>. Todo novo gráfico abrirá com o setup já aplicado.
          </div>

          <div class="callout warn">
            <div class="callout-title">Pasta errada mais comum</div>
            No MT5 a pasta correta é <strong>MQL5 → Profiles → Templates</strong>. Alguns procuram em MQL5 → Templates direto e não encontram — atenção a esse detalhe.
          </div>
        `
      },
      {
        id: 'm1-profit',
        titulo: 'Instalar no Profit Chart',
        html: `
          <span class="content-tag">Módulo 1 · Aula 4</span>
          <h1>Instalar no Profit Chart</h1>
          <p class="lead">No Profit a instalação é feita pelo menu de estudos: você importa o arquivo e depois aplica no gráfico com dois cliques.</p>

          <div class="callout">
            <div class="callout-title">Antes de começar</div>
            Arquivo do setup salvo. O Profit pode ficar aberto durante o processo.
          </div>

          <h2>Passo a passo</h2>
          <ol>
            <li>Abra o Profit Chart.</li>
            <li>No menu superior: <strong>Estudos → Importar Estudo</strong> (em algumas versões: <strong>Arquivo → Importar</strong>).</li>
            <li>Navegue até o arquivo do setup e selecione-o.</li>
            <li>Confirme a importação quando o Profit solicitar.</li>
            <li>Abra o gráfico do ativo desejado.</li>
            <li>Clique com o botão direito no gráfico → <strong>Aplicar Estudo → nome do setup</strong>.</li>
            <li>Os 5 indicadores aparecem configurados.</li>
          </ol>

          <h2>Conferindo se deu certo</h2>
          <ul>
            <li><strong>Bandas de Bollinger</strong> sobre o gráfico</li>
            <li><strong>Didi Index</strong> com três linhas em sub-janela</li>
            <li><strong>ADX</strong> com AD+, AD- e ADX em outra sub-janela</li>
            <li><strong>TRIX</strong> e <strong>Estocástico</strong> em sub-janelas separadas</li>
          </ul>

          <div class="callout tip">
            <div class="callout-title">Salvando como padrão</div>
            Após aplicar, vá em <strong>Layout → Salvar como Padrão</strong> para que novos gráficos já abram com o setup.
          </div>

          <div class="callout warn">
            <div class="callout-title">Versões do Profit</div>
            O Profit tem variantes (One, Plus, Pro) com menus levemente diferentes. Se não encontrar, procure por "Importar" em <em>Estudos</em> ou em <em>Arquivo</em>.
          </div>
        `
      },
      {
        id: 'm1-tryd',
        titulo: 'Instalar no Tryd Trader',
        html: `
          <span class="content-tag">Módulo 1 · Aula 5</span>
          <h1>Instalar no Tryd Trader</h1>
          <p class="lead">No Tryd a lógica é a mesma: importar o arquivo do setup e aplicar como template no gráfico.</p>

          <div class="callout">
            <div class="callout-title">Antes de começar</div>
            Arquivo do setup salvo. O Tryd pode permanecer aberto.
          </div>

          <h2>Passo a passo</h2>
          <ol>
            <li>Abra o Tryd.</li>
            <li>No menu superior: <strong>Configurações → Importar Layout</strong> (em algumas versões: <strong>Gráfico → Importar Template</strong>).</li>
            <li>Selecione o arquivo do setup.</li>
            <li>Confirme a importação.</li>
            <li>Abra o gráfico do ativo que você quer operar.</li>
            <li>Clique com o botão direito no gráfico → <strong>Aplicar Template → nome do setup</strong>.</li>
            <li>Os 5 indicadores aparecem aplicados com os parâmetros do método.</li>
          </ol>

          <h2>Conferindo se deu certo</h2>
          <ul>
            <li><strong>Bandas de Bollinger</strong> sobre o gráfico</li>
            <li><strong>Didi Index</strong> com três linhas em janela inferior</li>
            <li><strong>ADX</strong> com AD+, AD- e ADX</li>
            <li><strong>TRIX</strong> e <strong>Estocástico</strong> em janelas separadas</li>
          </ul>

          <div class="callout tip">
            <div class="callout-title">Salvando o layout</div>
            Após aplicar, vá em <strong>Configurações → Salvar Layout</strong> para não precisar aplicar o template toda vez.
          </div>

          <div class="callout warn">
            <div class="callout-title">Versões diferentes</div>
            O Tryd tem variantes (Pro, Plus, Trader) com pequenas diferenças de menu. Se não encontrar, procure por "Importar" em <em>Configurações</em> ou <em>Gráfico</em>.
          </div>

          <div class="callout key">
            <div class="callout-title">Setup instalado? Próximo passo</div>
            Agora que o setup está no gráfico, vá para o <strong>Módulo 2 — O Sistema</strong>. Lá você vai entender o papel de cada indicador antes de partir para os detalhes de cada um.
          </div>
        `
      }
    ]
  },

  /* ── MÓDULO 2 · O SISTEMA ──────────────────────────────── */
  {
    num: '02',
    titulo: 'O Sistema',
    quiz: {
      titulo: 'Quiz · O Sistema',
      perguntas: [
        {
          q: 'Quantos indicadores compõem o setup completo do Didi Aguiar?',
          opcoes: ['3', '4', '5', '7'],
          correta: 2,
          explica: 'São 5: Movimento Direcional (ADX/AD+/AD-), Bandas de Bollinger, TRIX, Estocástico e Didi Index.'
        },
        {
          q: 'Qual indicador exerce o papel de "presidente" no setup — decidindo se existe tendência antes de qualquer outro?',
          opcoes: ['Bandas de Bollinger', 'Didi Index', 'Movimento Direcional (ADX)', 'Estocástico'],
          correta: 2,
          explica: 'O ADX é o presidente: ele decide se o cenário é com ou sem tendência, liberando os indicadores corretos para cada situação.'
        },
        {
          q: 'Qual é a função das Bandas de Bollinger dentro do setup?',
          opcoes: [
            'Gerar a agulhada',
            'Confirmar a direção da tendência',
            'Indicar o momento certo de entrar e sair',
            'Substituir o ADX em mercados laterais'
          ],
          correta: 2,
          explica: 'Bollinger é o "diretor de timing": bandas abrindo = entrar; fechando = sair.'
        },
        {
          q: 'Por que usar 5 indicadores juntos, em vez de apenas um?',
          opcoes: [
            'Para deixar o gráfico mais colorido e fácil de ver',
            'Porque cada indicador resolve uma parte do problema (tendência, timing, direção, gatilho)',
            'Por exigência da B3',
            'Porque indicadores individuais são proibidos no day trade'
          ],
          correta: 1,
          explica: 'Cada indicador tem especialidade: ADX detecta tendência, Bollinger dá timing, TRIX e Estocástico confirmam direção, Didi Index dispara o gatilho. Juntos cobrem os pontos cegos de cada um.'
        }
      ]
    },
    aulas: [
      {
        id: 'm2-sistema',
        titulo: 'Os 5 indicadores e seus papéis',
        html: `
          <span class="content-tag">Módulo 2 · Aula 1</span>
          <h1>Os 5 indicadores e seus papéis</h1>
          <p class="lead">O setup do Didi não é "um indicador mágico". É uma <strong>empresa</strong> — com um presidente e quatro diretores, cada um responsável por uma parte da decisão.</p>

          <p>Mercado tem dois estados: <strong>com tendência</strong> e <strong>sem tendência</strong>. Indicadores que brilham na tendência atrapalham na lateralização — e vice-versa. A genialidade do setup é ter especialistas para cada cenário, coordenados por um filtro central.</p>

          <h2>O Presidente</h2>
          <div class="indicator-card">
            <h4>Movimento Direcional — ADX, AD+ e AD- <span class="role-pill pres">Presidente</span></h4>
            <p>Antes de qualquer coisa, o ADX responde: <strong>existe tendência agora?</strong> Se sim, os diretores "com tendência" falam. Se não, o diretor "sem tendência" toma o comando.</p>
            <p>É ele quem evita o erro mais clássico do trader: usar um indicador de tendência num mercado lateral — e o Didi compara isso a "chamar um dermatologista pra operar o cérebro".</p>
          </div>

          <h2>Diretor de Timing</h2>
          <div class="indicator-card">
            <h4>Bandas de Bollinger <span class="role-pill time">Timing</span></h4>
            <p>Não diz direção — diz <strong>quando</strong>. As bandas abrindo como a "boca de um jacaré faminto" indicam início de movimento. Quando começam a fechar, o rally acabou.</p>
          </div>

          <h2>Diretores "Com Tendência"</h2>
          <div class="indicator-card">
            <h4>TRIX <span class="role-pill com">Com tendência</span></h4>
            <p>Antecipa movimentos e é mão forte: quando sinaliza uma direção, mantém mesmo com contra-movimentos, acertando na maioria das vezes por ter "frieza de bloco de gelo".</p>
          </div>
          <div class="indicator-card">
            <h4>Didi Index — médias 3, 8 e 20 <span class="role-pill com">Com tendência</span></h4>
            <p>O coração do setup. Quando as três médias se cruzam no mesmo ponto e saem ordenadas, nasce a <strong>agulhada</strong> — o gatilho de entrada.</p>
          </div>

          <h2>Diretor "Sem Tendência"</h2>
          <div class="indicator-card">
            <h4>Estocástico <span class="role-pill sem">Sem tendência</span></h4>
            <p>Especialista em mercados laterais. Em tendência forte, fica "martelando" no teto ou no piso — e isso <em>não</em> é sinal de inversão, é sinal de tendência firme.</p>
          </div>

          <div class="callout key">
            <div class="callout-title">Ideia central</div>
            Você não opera só porque o Didi Index agulhou. Você opera quando a agulhada acontece <strong>com os outros 4 indicadores concordando</strong>. Esse sinal conjunto é a <strong>agulhada santa</strong>.
          </div>
        `
      },
      {
        id: 'm2-hierarquia',
        titulo: 'A hierarquia: quem manda em quem',
        html: `
          <span class="content-tag">Módulo 2 · Aula 2</span>
          <h1>A hierarquia: quem manda em quem</h1>
          <p class="lead">Os 5 indicadores não falam ao mesmo tempo. Existe uma ordem — e respeitar essa ordem é o que separa quem entende o método de quem só decorou os nomes.</p>

          <h2>1º — ADX decide o cenário</h2>
          <p>Primeira coisa que você olha, sempre. Uma pergunta só: <strong>existe tendência?</strong></p>
          <ul>
            <li><strong>Sim</strong> → os diretores "com tendência" (TRIX e Didi Index) assumem.</li>
            <li><strong>Não</strong> → o diretor "sem tendência" (Estocástico) assume.</li>
          </ul>

          <div class="callout">
            <div class="callout-title">Quando não há tendência</div>
            ADX abaixo do AD+ e AD- ao mesmo tempo, <strong>ou</strong> ADX caindo com valor menor ou igual a 32. Fora dessas duas situações, existe tendência — forte ou fraca.
          </div>

          <h2>2º — Bollinger decide o timing</h2>
          <p>Definido o cenário, o Bollinger diz: <em>é hora de agir, ou é hora de esperar?</em> Bandas fechadas = aguardar. Bandas abrindo = preparar a entrada.</p>

          <h2>3º — Didi Index entrega o gatilho</h2>
          <p>O mais cirúrgico: quando as três médias se encontram e saem ordenadas, temos a <strong>agulhada</strong>. Esse é o momento exato de entrada.</p>

          <h2>4º — TRIX e Estocástico assinam embaixo</h2>
          <p>A agulhada vira <strong>santa</strong> quando TRIX e Estocástico estão na mesma direção. Sem essa confirmação dupla, o sinal é mais fraco.</p>

          <div class="callout tip">
            <div class="callout-title">Resumo da hierarquia</div>
            <strong>ADX</strong> libera o cenário → <strong>Bollinger</strong> dá o timing → <strong>Didi Index</strong> dispara a agulhada → <strong>TRIX + Estocástico</strong> confirmam a direção.
          </div>

          <p>A partir do próximo módulo você vai mergulhar em cada indicador, entender os detalhes e, no final, juntar tudo na agulhada santa.</p>
        `
      }
    ]
  },

  /* ── MÓDULO 3 · MOVIMENTO DIRECIONAL ──────────────────── */
  {
    num: '03',
    titulo: 'Movimento Direcional (ADX)',
    quiz: {
      titulo: 'Quiz · Movimento Direcional',
      perguntas: [
        {
          q: 'Qual cruzamento sinaliza viés de compra no Movimento Direcional?',
          opcoes: ['ADX acima do AD+', 'AD+ acima do AD-', 'AD- acima do AD+', 'ADX abaixo de 20'],
          correta: 1,
          explica: 'AD+ acima do AD- = viés de compra. O inverso (AD- acima do AD+) = viés de venda.'
        },
        {
          q: 'O ADX mede principalmente:',
          opcoes: [
            'A direção do mercado (alta ou baixa)',
            'A força (aceleração) da tendência',
            'O preço justo do ativo',
            'O momento exato de entrada'
          ],
          correta: 1,
          explica: 'O ADX mede força — não direção. Quem dá direção é o cruzamento AD+ × AD-.'
        },
        {
          q: 'Em quais situações o mercado é considerado SEM tendência?',
          opcoes: [
            'Sempre que ADX estiver abaixo de 50',
            'ADX abaixo do AD+ e AD-, ou ADX caindo com valor ≤ 32',
            'Quando o Bollinger estiver fechado',
            'Apenas quando o Estocástico estiver entre 40 e 60'
          ],
          correta: 1,
          explica: 'São exatamente essas duas situações. Em qualquer outro caso, existe tendência (fraca ou forte).'
        },
        {
          q: 'O que significa um "kick" no ADX?',
          opcoes: [
            'Uma aceleração brusca para cima, confirmando compra',
            'Uma inversão da inclinação do ADX, que pode marcar topo ou fundo da operação',
            'O ADX chegando a zero',
            'Um erro de leitura do indicador'
          ],
          correta: 1,
          explica: 'Quando o ADX inverte a direção fazendo um "kick", pode estar marcando um topo (em compra) ou fundo (em venda).'
        }
      ]
    },
    aulas: [
      {
        id: 'm3-adx-linhas',
        titulo: 'AD+, AD- e ADX: as três linhas',
        html: `
          <span class="content-tag">Módulo 3 · Aula 1</span>
          <h1>AD+, AD- e ADX: as três linhas</h1>
          <p class="lead">O Movimento Direcional são <strong>três linhas</strong>, não uma. Cada uma responde uma pergunta diferente — e juntas elas dizem se existe tendência, qual a direção e qual a força.</p>

          <h2>AD+ vs AD-: a direção</h2>
          <p>O cruzamento entre AD+ e AD- informa <strong>para que lado</strong> o mercado está inclinado:</p>
          <ul>
            <li><strong>AD+ acima do AD-</strong> → viés de compra</li>
            <li><strong>AD- acima do AD+</strong> → viés de venda</li>
          </ul>

          <h2>ADX: a força</h2>
          <p>O ADX não diz direção. Ele mede <strong>com que força o motor do mercado está girando</strong>. Pense num carro: o cruzamento AD+/AD- aponta para onde o carro vai, e o ADX diz se está pisando fundo no acelerador, em marcha lenta ou parado.</p>

          <div class="callout">
            <div class="callout-title">Inclinação importa mais que o valor</div>
            Quanto mais inclinado o ADX em relação ao eixo horizontal, mais acelerado o movimento. ADX subindo rápido = tendência ganhando força. ADX caindo = tendência perdendo fôlego.
          </div>

          <h2>Quando NÃO há tendência</h2>
          <p>Apenas duas situações:</p>
          <ol>
            <li>ADX está <strong>abaixo</strong> do AD+ e do AD- ao mesmo tempo, <strong>ou</strong></li>
            <li>ADX está <strong>caindo</strong> e com valor <strong>menor ou igual a 32</strong>.</li>
          </ol>
          <p>Fora dessas duas, existe tendência — seja ela forte ou fraca.</p>

          <div class="callout warn">
            <div class="callout-title">O "kick"</div>
            Quando o ADX estava subindo e de repente inverte fazendo uma virada brusca ("kick"), pode estar marcando um <strong>topo</strong> (se você está comprado) ou um <strong>fundo</strong> (se está vendido).
          </div>
        `
      },
      {
        id: 'm3-adx-libera',
        titulo: 'Como o ADX libera o resto do setup',
        html: `
          <span class="content-tag">Módulo 3 · Aula 2</span>
          <h1>Como o ADX libera o resto do setup</h1>
          <p class="lead">O papel mais importante do ADX não é gerar sinal sozinho — é decidir <strong>qual time entra em campo</strong>.</p>

          <h2>Com tendência → TRIX e Didi Index dominam</h2>
          <p>Quando o ADX aponta tendência, os diretores "com tendência" assumem. As agulhadas do Didi Index ganham força e o TRIX confirma a direção. É o cenário ideal para operar a agulhada.</p>

          <h2>Sem tendência → Estocástico comanda</h2>
          <p>Quando ADX cai abaixo das outras linhas ou desce com valor ≤ 32, o mercado está em acomodação. Aqui o Estocástico trabalha bem, marcando ciclos suaves entre sobrevendido (0–20) e sobrecomprado (80–100).</p>

          <div class="callout key">
            <div class="callout-title">Regra prática</div>
            Antes de olhar agulhada. Antes de olhar Bollinger. <strong>Olhe o ADX primeiro.</strong> Ele decide quais indicadores você vai usar para tomar a decisão.
          </div>

          <h2>Erros clássicos com o ADX</h2>
          <ul>
            <li><strong>Ignorar o ADX e operar agulhada em mercado lateral.</strong> Sinal bonito, resultado feio.</li>
            <li><strong>Confundir o cruzamento AD+/AD- com sinal de entrada.</strong> Ele dá viés — não dispara operação.</li>
            <li><strong>Focar no valor absoluto do ADX.</strong> A <em>inclinação</em> importa mais que o número.</li>
          </ul>
        `
      }
    ]
  },

  /* ── MÓDULO 4 · BANDAS DE BOLLINGER ───────────────────── */
  {
    num: '04',
    titulo: 'Bandas de Bollinger',
    quiz: {
      titulo: 'Quiz · Bandas de Bollinger',
      perguntas: [
        {
          q: 'No setup do Didi, qual é a função exclusiva das Bandas de Bollinger?',
          opcoes: [
            'Determinar a direção da tendência',
            'Dar o timing de entrada e saída',
            'Calcular stop loss',
            'Substituir o Estocástico'
          ],
          correta: 1,
          explica: 'Bollinger é o "diretor de timing": abertura = entrar; fechamento = sair.'
        },
        {
          q: 'Quando as bandas de Bollinger começam a fechar, isso indica:',
          opcoes: [
            'O movimento vai acelerar',
            'Hora de entrar na operação',
            'O rally está acabando — hora de sair',
            'Erro de configuração'
          ],
          correta: 2,
          explica: 'No primeiro sinal de fechamento das bandas, o rally está terminando. Não espere elas se cruzarem para sair.'
        },
        {
          q: 'Bandas abrindo com ângulo grande prometem:',
          opcoes: [
            'Movimento fraco',
            'Mercado lateral',
            'Movimento mais violento e forte',
            'Inversão imediata'
          ],
          correta: 2,
          explica: 'Quanto maior o ângulo de abertura, mais violento tende a ser o movimento. Aberturas brandas = movimentos mais fracos.'
        },
        {
          q: 'Como ficam as Bandas de Bollinger em um mercado lateral?',
          opcoes: [
            'Abertas no máximo, com ângulo de 90 graus',
            'Cruzadas entre si',
            'Sem ângulo de abertura — o Didi as chama de "linguiças amassadas e disformes"',
            'Paralelas e distantes'
          ],
          correta: 2,
          explica: 'Em mercados laterais, as bandas perdem o ângulo de abertura e ficam sem forma definida — é o sinal para esperar.'
        }
      ]
    },
    aulas: [
      {
        id: 'm4-bollinger-timing',
        titulo: 'Bollinger como diretor de timing',
        html: `
          <span class="content-tag">Módulo 4 · Aula 1</span>
          <h1>Bollinger: o diretor de timing</h1>
          <p class="lead">No setup do Didi, o Bollinger tem uma função única e exclusiva: <strong>marcar o tempo</strong>. Você ignora as barras dentro das bandas e a média central. O foco é só na <em>distância entre as bandas externas</em>.</p>

          <h2>A "boca de jacaré"</h2>
          <p>O Didi descreve o cenário ideal com uma imagem: as bandas se abrindo como a boca de um jacaré faminto. Quanto mais aberto o ângulo, mais violento tende a ser o movimento que vem.</p>
          <ul>
            <li><strong>Abertura forte</strong> (ângulo grande) → movimento promete força</li>
            <li><strong>Abertura branda</strong> (ângulo pequeno) → movimento mais fraco</li>
            <li><strong>Bandas paralelas</strong> → rally em curso, sem novidade</li>
            <li><strong>Bandas fechando</strong> → rally acabando, hora de sair</li>
          </ul>

          <div class="callout">
            <div class="callout-title">Detalhe que muita gente perde</div>
            No <strong>primeiro</strong> sinal de fechamento das bandas, o rally já está indicando fim. Não espere elas se cruzarem — você perde parte do movimento e arriscou mais do que precisava.
          </div>

          <h2>Em mercado lateral</h2>
          <p>Quando não há tendência, as bandas perdem o ângulo de abertura. O Didi as descreve como "linguiças amassadas e disformes" — sem direção clara. Esse é o sinal para aguardar.</p>
        `
      },
      {
        id: 'm4-bollinger-adx',
        titulo: 'Combinando Bollinger com o ADX',
        html: `
          <span class="content-tag">Módulo 4 · Aula 2</span>
          <h1>Combinando Bollinger com o ADX</h1>
          <p class="lead">Bollinger e ADX são parceiros naturais: um diz <em>se</em> há tendência, o outro diz <em>quando</em> agir nela. Separados, cada um tem pontos cegos. Juntos, se complementam.</p>

          <h2>Receita de entrada</h2>
          <ol>
            <li>Bandas de Bollinger <strong>abrindo</strong> entre si.</li>
            <li>ADX sinalizando entrada de tendência — ou prestes a sinalizar, se a abertura do Bollinger for forte.</li>
          </ol>
          <p>Quando os dois acontecem juntos, o rally está começando.</p>

          <h2>Receita de saída</h2>
          <ul>
            <li>Tendência enfraquecendo no ADX (caindo, AD+/AD- se aproximando), <strong>e</strong></li>
            <li>Bollinger começando a <strong>fechar</strong> as bandas.</li>
          </ul>

          <div class="callout tip">
            <div class="callout-title">Filosofia do método</div>
            Você vai deixar de pegar a ponta do movimento. Tudo bem. O Didi prefere garantir o pedaço gordo do meio a correr atrás de máximas e mínimas exatas — e acabar zerado.
          </div>

          <div class="callout warn">
            <div class="callout-title">Cuidado</div>
            Bollinger sem ADX gera muito sinal falso em mercado lateral. ADX sem Bollinger te coloca na operação cedo ou tarde demais. Os dois <strong>juntos</strong> é que fazem o setup funcionar.
          </div>
        `
      }
    ]
  },

  /* ── MÓDULO 5 · TRIX E ESTOCÁSTICO ────────────────────── */
  {
    num: '05',
    titulo: 'TRIX e Estocástico',
    quiz: {
      titulo: 'Quiz · TRIX e Estocástico',
      perguntas: [
        {
          q: 'O que torna o TRIX especial dentro do setup?',
          opcoes: [
            'Ele antecipa movimentos e é mão forte — mantém sinal mesmo com contra-movimentos',
            'Ele substitui o ADX em mercados laterais',
            'Ele calcula automaticamente o stop loss',
            'Ele oscila apenas entre 0 e 100'
          ],
          correta: 0,
          explica: 'O TRIX antecipa o movimento (especialmente em tempos mais longos) e é mão forte — mantém a direção com frieza mesmo que o mercado ande um pouco contra.'
        },
        {
          q: 'Estocástico "martelando" no teto (80–100) por muito tempo indica:',
          opcoes: [
            'Inversão iminente de baixa',
            'Tendência de alta firme em andamento',
            'Erro no indicador',
            'Hora de vender imediatamente'
          ],
          correta: 1,
          explica: 'Ao contrário do que parece, "martelar no teto" indica tendência de alta firme — não reversão. O Didi diz: quando falarem que "está em 98", responda que "calça 42".'
        },
        {
          q: 'No TRIX, quanto mais fechado o ângulo na inversão, o movimento tende a ser:',
          opcoes: ['Mais fraco', 'Mais contundente e forte', 'Um sinal falso', 'Irrelevante para a análise'],
          correta: 1,
          explica: 'Ângulo mais fechado = inversão mais contundente. Inversão "preguiçosa" = movimento mais fraco.'
        },
        {
          q: 'Qual o papel do Estocástico no setup?',
          opcoes: [
            'Diretor de tendência forte',
            'Presidente — decide o cenário',
            'Diretor de "sem tendência" — brilha em mercados laterais',
            'Gera a agulhada'
          ],
          correta: 2,
          explica: 'O Estocástico é o diretor de "sem tendência". Em mercados laterais, marca ciclos limpos entre sobrevenda e sobrecompra.'
        }
      ]
    },
    aulas: [
      {
        id: 'm5-trix',
        titulo: 'TRIX: o rastreador de tendência',
        html: `
          <span class="content-tag">Módulo 5 · Aula 1</span>
          <h1>TRIX: o rastreador de tendência</h1>
          <p class="lead">O TRIX é o diretor especialista em momentos <strong>com tendência</strong>. Tem três qualidades que o tornam essencial no setup: antecipa o movimento, é mão forte e o ângulo de inversão avisa a força do sinal.</p>

          <h2>Antecipação</h2>
          <p>O TRIX tende a antecipar o movimento — especialmente em tempos gráficos mais longos. Ele "fareja" o giro antes de outros indicadores reagirem.</p>

          <h2>Mão forte</h2>
          <p>Quando o TRIX sinaliza uma direção, ele <strong>mantém</strong> mesmo que o mercado ande um pouco contra. É essa frieza — o Didi chama de "frieza de bloco de gelo" — que faz dele um aliado confiável em movimentos mais longos.</p>

          <h2>Cruzamento e ângulo</h2>
          <p>O sinal é gerado pelo <strong>cruzamento das duas linhas</strong>. A linha tracejada é uma média móvel adicionada para facilitar a leitura nas inversões.</p>

          <div class="callout">
            <div class="callout-title">Ângulo na inversão</div>
            Quanto <strong>mais fechado</strong> o ângulo no momento da inversão (mergulho ou subida), <strong>mais contundente</strong> o movimento que vem. Inversão "preguiçosa" = movimento mais fraco.
          </div>
        `
      },
      {
        id: 'm5-estocastico',
        titulo: 'Estocástico: o leitor de lateralidade',
        html: `
          <span class="content-tag">Módulo 5 · Aula 2</span>
          <h1>Estocástico: o leitor de lateralidade</h1>
          <p class="lead">Enquanto o TRIX brilha na tendência, o Estocástico é o especialista em <strong>mercados sem tendência</strong>. Ele desenha o movimento completo, de uma extremidade a outra, com velocidade e clareza.</p>

          <h2>As zonas</h2>
          <ul>
            <li><strong>Entre 80 e 100</strong> → área sobrecomprada</li>
            <li><strong>Entre 0 e 20</strong> → área sobrevendida</li>
            <li><strong>Entre 20 e 80</strong> → zona neutra</li>
          </ul>

          <h2>Sem tendência</h2>
          <p>Em mercados laterais, o Estocástico desenha ciclos suaves: sobe limpo até a zona de cima, desce limpo até a zona de baixo. Sem pontos falsos, sem rabiscos.</p>

          <h2>COM tendência — o detalhe que todo mundo erra</h2>

          <div class="callout key">
            <div class="callout-title">Não olhe o número isolado</div>
            Quando o Estocástico "martela" no teto (vai e volta na faixa 80–100 por bastante tempo), ele <strong>não</strong> está dizendo "está caro, vai cair". Ele está dizendo: <strong>há tendência de alta firme</strong>. O contrário é igual — martelando no piso = tendência de baixa firme.
          </div>

          <p>O Didi resume com uma frase direta: <em>"quando informarem que o Estocástico já está em 98, responda que calça 42"</em>. O valor numérico isolado não significa nada — o que importa é o comportamento.</p>

          <h2>O sinal de virada</h2>
          <p>Quando o Estocástico finalmente <strong>desiste</strong> de martelar e vira a mesa de uma vez, o ciclo acabou — e vale prestar atenção.</p>

          <div class="callout tip">
            <div class="callout-title">TRIX e Estocástico podem concordar</div>
            Mesmo sendo de "departamentos" diferentes, os dois podem apontar a mesma direção ao mesmo tempo. Quando concordam, o sinal do setup é mais robusto.
          </div>
        `
      }
    ]
  },

  /* ── MÓDULO 6 · DIDI INDEX E A AGULHADA ───────────────── */
  {
    num: '06',
    titulo: 'Didi Index e a Agulhada',
    quiz: {
      titulo: 'Quiz final · Didi Index e Agulhada',
      perguntas: [
        {
          q: 'Quais são os períodos das três médias móveis do Didi Index?',
          opcoes: ['5, 13 e 21', '3, 8 e 20', '9, 21 e 50', '7, 14 e 28'],
          correta: 1,
          explica: 'Os períodos do Didi Index são 3 (rápida), 8 (intermediária) e 20 (lenta).'
        },
        {
          q: 'O que é o "alerta" no Didi Index?',
          opcoes: [
            'Cruzamento da média intermediária com a longa',
            'Cruzamento da média curta com a intermediária',
            'O ADX invertendo direção',
            'O Estocástico saindo da zona de sobrecompra'
          ],
          correta: 1,
          explica: 'O alerta é o cruzamento da média curta (3) com a intermediária (8). A confirmação vem depois, quando a intermediária cruza a longa (20).'
        },
        {
          q: 'Numa agulhada de compra, como ficam as três médias após o cruzamento?',
          opcoes: [
            'Longa em cima, intermediária no meio, curta embaixo',
            'Curta em cima, intermediária no meio, longa embaixo',
            'As três sobrepostas',
            'Curta embaixo, longa no meio, intermediária em cima'
          ],
          correta: 1,
          explica: 'Compra: curta em cima, intermediária no meio, longa embaixo. Na venda é o inverso. A intermediária sempre fica no meio.'
        },
        {
          q: 'Qual a regra prática para entrar após uma agulhada?',
          opcoes: [
            'Entrar na mesma barra do cruzamento',
            'Esperar a barra seguinte confirmar a nova ordem das médias e entrar na abertura da segunda barra',
            'Esperar 3 barras para segurança',
            'Não entrar até o Estocástico chegar a 50'
          ],
          correta: 1,
          explica: 'Aguarde o fechamento da barra seguinte ao cruzamento. Se confirmou a nova ordem das médias, opere na abertura da segunda barra após o evento.'
        },
        {
          q: 'O que caracteriza uma "agulhada santa"?',
          opcoes: [
            'Uma agulhada que aconteceu no fim do pregão',
            'Agulhada no Didi + TRIX e Estocástico concordando + Bollinger abrindo + ADX com tendência',
            'Uma agulhada em tempo gráfico semanal',
            'Qualquer cruzamento das três médias'
          ],
          correta: 1,
          explica: 'Agulhada santa é quando todos os indicadores do setup concordam: ADX com tendência, Bollinger abrindo, agulhada no Didi Index, TRIX e Estocástico na mesma direção.'
        },
        {
          q: 'Segundo o método, quando sair da operação?',
          opcoes: [
            'Em alvo fixo de pontos pré-definido',
            'Quando o setup começar a se desfazer (Bollinger fecha, TRIX cruza contra, ADX perde força)',
            'Apenas no fechamento do dia',
            'Quando dobrar o capital'
          ],
          correta: 1,
          explica: 'A agulhada é o instrumento de entrada. A saída é via os próprios indicadores do setup — eles avisam quando o movimento acabou.'
        }
      ]
    },
    aulas: [
      {
        id: 'm6-medias',
        titulo: 'As 3 médias móveis: 3, 8 e 20',
        html: `
          <span class="content-tag">Módulo 6 · Aula 1</span>
          <h1>As 3 médias móveis: 3, 8 e 20</h1>
          <p class="lead">O Didi Index é, na essência, um indicador de <strong>três médias móveis</strong> trabalhando juntas. Cada uma tem uma personalidade — e é o relacionamento entre elas que produz o sinal.</p>

          <h2>As três personagens</h2>
          <div class="indicator-card">
            <h4>Média curta — período 3</h4>
            <p>A mais rápida. Anda colada nas barras, reage primeiro a qualquer movimento. É a primeira a virar.</p>
          </div>
          <div class="indicator-card">
            <h4>Média intermediária — período 8</h4>
            <p>O meio-termo. Nem tão volátil quanto a curta, nem tão lenta quanto a longa. É o ponto de referência.</p>
          </div>
          <div class="indicator-card">
            <h4>Média longa — período 20</h4>
            <p>A mais lenta. Filtra os pequenos ruídos do mercado. Quando ela vira, é coisa séria.</p>
          </div>

          <h2>Dois eventos: alerta e confirmação</h2>

          <h3>Alerta — curta cruza a intermediária</h3>
          <ul>
            <li>Curta cruza intermediária <strong>para cima</strong> → alerta de compra</li>
            <li>Curta cruza intermediária <strong>para baixo</strong> → alerta de venda</li>
          </ul>

          <h3>Confirmação — intermediária cruza a longa</h3>
          <ul>
            <li>Intermediária cruza longa <strong>para cima</strong> → confirmação de compra</li>
            <li>Intermediária cruza longa <strong>para baixo</strong> → confirmação de venda</li>
          </ul>

          <div class="callout key">
            <div class="callout-title">Regra de ouro</div>
            Quanto <strong>menor o intervalo de tempo</strong> entre o alerta e a confirmação, <strong>mais certeiro e contundente</strong> tende a ser o movimento. Esse princípio é o que gera a agulhada — próxima aula.
          </div>
        `
      },
      {
        id: 'm6-agulhada',
        titulo: 'A Agulhada: o sinal central',
        html: `
          <span class="content-tag">Módulo 6 · Aula 2</span>
          <h1>A Agulhada: o sinal central</h1>
          <p class="lead">Lembra da regra de ouro: <em>quanto menor o intervalo entre alerta e confirmação, mais forte o movimento</em>. Agora imagine que esse intervalo seja <strong>zero</strong>.</p>

          <h2>O que é a agulhada</h2>
          <p>É exatamente isso: as <strong>três médias se encontrando praticamente no mesmo ponto</strong> e logo depois saindo organizadas. O próprio Didi descreve:</p>

          <div class="callout">
            "Três novelos de lã de cores diferentes, entrando juntos num buraco de agulha e saindo perfeitamente desembaraçados, arrumados na compra ou na venda."
          </div>

          <h2>Como saem as médias</h2>
          <ul>
            <li><strong>Agulhada de compra:</strong> curta em cima, intermediária no meio, longa embaixo</li>
            <li><strong>Agulhada de venda:</strong> longa em cima, intermediária no meio, curta embaixo</li>
          </ul>
          <p>A intermediária sempre fica no meio. As que trocam de posição são a curta e a longa.</p>

          <h2>Regra prática de entrada</h2>
          <ol>
            <li>Aconteceu o cruzamento.</li>
            <li><strong>Espere o fechamento da barra seguinte.</strong> Ela precisa confirmar a nova ordem das médias.</li>
            <li>Se confirmou → entre <strong>na abertura da segunda barra</strong> após o cruzamento.</li>
          </ol>

          <h2>O teste da lupa</h2>
          <p>Poucas agulhadas são "geometricamente perfeitas". O Didi compara com queijo minas no microscópio: de longe é queijo, de perto parece outra coisa — mas continua sendo queijo.</p>

          <div class="callout tip">
            <div class="callout-title">Regra do bom senso</div>
            Se você usou a lupa e percebeu que não foi agulhada <strong>por um triz</strong>, considere como agulhada. <em>E ela será.</em>
          </div>
        `
      },
      {
        id: 'm6-santa',
        titulo: 'Agulhada Santa: juntando tudo',
        html: `
          <span class="content-tag">Módulo 6 · Aula 3</span>
          <h1>Agulhada Santa: o sinal mais forte do setup</h1>
          <p class="lead">Uma agulhada qualquer já é um sinal. Uma <strong>agulhada santa</strong> — onde todos os indicadores do setup concordam — é o tipo de sinal que dá nome ao método inteiro.</p>

          <h2>Checklist da agulhada santa</h2>
          <ol>
            <li><strong>ADX</strong> mostrando tendência (fora das duas situações de "sem tendência")</li>
            <li><strong>Bollinger</strong> com bandas abrindo (ou prestes a abrir com força)</li>
            <li><strong>Didi Index</strong> com agulhada formada e barra seguinte confirmando</li>
            <li><strong>TRIX</strong> na mesma direção da agulhada</li>
            <li><strong>Estocástico</strong> concordando com a direção</li>
          </ol>

          <div class="callout key">
            <div class="callout-title">Por que "santa"?</div>
            Porque é raro bater todas as condições juntas. Mas quando bate, a probabilidade do movimento entregar é alta. Não é sinal qualquer — é o momento em que <em>toda a empresa concorda</em>.
          </div>

          <h2>Entrada, alvo e saída</h2>

          <h3>Entrada</h3>
          <p>Na <strong>abertura da segunda barra</strong> após o cruzamento, desde que a barra seguinte tenha confirmado a nova ordem das médias.</p>

          <h3>Alvo</h3>
          <p>O método não usa alvo fixo em pontos. O alvo é o próprio setup avisando.</p>

          <h3>Saída</h3>
          <ul>
            <li>Bollinger começando a <strong>fechar</strong>, <strong>ou</strong></li>
            <li>TRIX cruzando <strong>contra</strong> a posição, <strong>ou</strong></li>
            <li>ADX perdendo força (kick / inclinação invertendo), <strong>ou</strong></li>
            <li>Nova agulhada se formando na direção contrária</li>
          </ul>

          <div class="callout">
            <div class="callout-title">Filosofia da saída</div>
            "A agulhada é o instrumento de entrada. A saída é via indicações dos modelos gráficos." Você não decide antes de entrar quando vai sair — o setup avisa.
          </div>

          <h2>Disciplina é metade do método</h2>
          <p>O Didi termina o eBook com uma frase que vale o curso inteiro:</p>
          <div class="callout tip">
            <div class="callout-title">Princípio final</div>
            "Tenha paciência, espere as boas oportunidades e a sorte vai encontrar você." A agulhada santa aparece menos do que a gente queria — a diferença entre quem ganha e quem perde com esse método não é conhecimento técnico. É paciência para só apertar o gatilho quando todos os diretores da empresa estão concordando.
          </div>
        `
      }
    ]
  }

];

/* ══════════════════════════════════════════════════════════════
   PROGRESSO (localStorage)
══════════════════════════════════════════════════════════════ */

function getProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
  catch { return {}; }
}
function saveProgress(p) { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); }
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

/* ══════════════════════════════════════════════════════════════
   ÍNDICE PLANO
   Módulos sem quiz (quiz: null) não geram item de quiz no FLAT
══════════════════════════════════════════════════════════════ */

const FLAT = [];
CURSO.forEach((mod, mi) => {
  mod.aulas.forEach((a, ai) => {
    FLAT.push({ type: 'aula', modIdx: mi, aulaIdx: ai, id: a.id, titulo: a.titulo });
  });
  if (mod.quiz) {
    FLAT.push({ type: 'quiz', modIdx: mi, id: 'quiz-m' + mi, titulo: mod.quiz.titulo });
  }
});

let currentIdx = 0;

/* ══════════════════════════════════════════════════════════════
   SIDEBAR
══════════════════════════════════════════════════════════════ */

function renderSidebar() {
  const cont = document.getElementById('sidebar-modulos');
  const progress = getProgress();
  const quizzes = getQuizzes();

  cont.innerHTML = CURSO.map((mod, mi) => {
    const aulaItems = mod.aulas.map((a) => {
      const flatIdx = FLAT.findIndex(f => f.id === a.id);
      const done    = !!progress[a.id];
      const active  = currentIdx === flatIdx;
      return `
        <li class="aula-item ${done ? 'done' : ''} ${active ? 'active' : ''}" data-idx="${flatIdx}">
          <span class="aula-check">${done ? '✓' : ''}</span>
          <span class="aula-text">${a.titulo}</span>
        </li>`;
    }).join('');

    let quizItem = '';
    if (mod.quiz) {
      const quizId      = 'quiz-m' + mi;
      const quizFlatIdx = FLAT.findIndex(f => f.id === quizId);
      const quizDone    = !!quizzes['m' + mi];
      const quizActive  = currentIdx === quizFlatIdx;
      quizItem = `
        <li class="aula-item quiz ${quizDone ? 'done' : ''} ${quizActive ? 'active' : ''}" data-idx="${quizFlatIdx}">
          <span class="aula-check">${quizDone ? '✓' : '?'}</span>
          <span class="aula-text">${mod.quiz.titulo}</span>
        </li>`;
    }

    return `
      <div class="modulo">
        <div class="modulo-head">
          <span class="modulo-num">${mod.num}</span>
          <span>${mod.titulo}</span>
        </div>
        <ul class="aulas">${aulaItems}${quizItem}</ul>
      </div>`;
  }).join('');

  cont.querySelectorAll('.aula-item').forEach(el => {
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
  const progress  = getProgress();
  const quizzes   = getQuizzes();
  const totalAulas = FLAT.filter(f => f.type === 'aula').length;
  const totalQuiz  = CURSO.filter(m => m.quiz).length;
  const aulasDone  = FLAT.filter(f => f.type === 'aula' && progress[f.id]).length;
  const quizDone   = Object.keys(quizzes).length;
  const pct = Math.round(((aulasDone + quizDone) / (totalAulas + totalQuiz)) * 100);
  document.getElementById('progress-mini').textContent = pct + '% concluído';
}

/* ══════════════════════════════════════════════════════════════
   RENDER PRINCIPAL
══════════════════════════════════════════════════════════════ */

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
  const nextItem     = FLAT[currentIdx + 1];
  const nextLabel    = !nextItem        ? 'Fim do curso'
    : nextItem.type === 'quiz'          ? 'Fazer o quiz →'
    : 'Próxima aula →';
  return `
    <div class="nav-buttons">
      <button class="nav-btn" id="btn-prev" ${prevDisabled ? 'disabled' : ''}>← Anterior</button>
      <button class="nav-btn primary" id="btn-next" ${nextDisabled ? 'disabled' : ''}>${nextLabel}</button>
    </div>`;
}

function attachNav() {
  const prev = document.getElementById('btn-prev');
  const next = document.getElementById('btn-next');
  if (prev) prev.addEventListener('click', () => {
    if (currentIdx > 0) { currentIdx--; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  });
  if (next) next.addEventListener('click', () => {
    if (currentIdx < FLAT.length - 1) { currentIdx++; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  });
}

/* ══════════════════════════════════════════════════════════════
   QUIZ
══════════════════════════════════════════════════════════════ */

function renderQuiz(modIdx) {
  const mod  = CURSO[modIdx];
  const quiz = mod.quiz;
  const cont = document.getElementById('content');

  const respostas = new Array(quiz.perguntas.length).fill(null);
  let finalizado  = false;

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
        </div>`).join('')}

      ${finalizado ? renderQuizResult() : `
        <div class="nav-buttons">
          <button class="nav-btn" id="btn-prev-quiz">← Voltar</button>
          <button class="nav-btn primary" id="btn-finalizar" ${tudoRespondido ? '' : 'disabled'}>Finalizar quiz</button>
        </div>`}
    `;

    cont.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        if (finalizado) return;
        respostas[parseInt(btn.dataset.q, 10)] = parseInt(btn.dataset.o, 10);
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

    const btnPrevQuiz = document.getElementById('btn-prev-quiz');
    if (btnPrevQuiz) btnPrevQuiz.addEventListener('click', () => {
      if (currentIdx > 0) { currentIdx--; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    });

    const btnNext = document.getElementById('btn-next-quiz');
    if (btnNext) btnNext.addEventListener('click', () => {
      if (currentIdx < FLAT.length - 1) { currentIdx++; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    });

    const btnRefazer = document.getElementById('btn-refazer');
    if (btnRefazer) btnRefazer.addEventListener('click', () => { renderQuiz(modIdx); });
  }

  function renderQuizResult() {
    const acertos = respostas.reduce((acc, r, i) => acc + (r === quiz.perguntas[i].correta ? 1 : 0), 0);
    const total   = quiz.perguntas.length;
    const pct     = Math.round((acertos / total) * 100);
    const msg     = pct === 100 ? 'Gabaritou! Conteúdo do módulo bem assentado.'
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
          : `<button class="nav-btn primary" id="btn-next-quiz">Próximo módulo →</button>`}
      </div>`;
  }

  paint();
}

/* ══════════════════════════════════════════════════════════════
   LOGIN
══════════════════════════════════════════════════════════════ */

async function verificarToken(token) {
  try {
    const res = await fetch('/api/curso-verify', { headers: { Authorization: `Bearer ${token}` } });
    return res.ok;
  } catch { return false; }
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
  if (token && await verificarToken(token)) mostrarCurso();
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
    if (!res.ok) { erro.textContent = data.error || 'Senha incorreta.'; return; }
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
