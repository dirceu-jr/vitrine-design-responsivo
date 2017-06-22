Por sorte esse projeto tem um README. Sem README seria complicado alguém continuar o trabalho pois tem muita coisa junta e "anormal" aqui.

O que tem junto?

- Site www.instantofertas.com.br
- Desenvolvimento da "Vitrine Responsiva"

O que é anormal?

- O site "instantofertas" é "one-single-page-app" mas tem versão alternativa para o Google crawlear (Ajax 'Crawleavel')
- Os arquivos de desenvolvimento da "Vitrine Responsiva" pois em produção é tudo comprimido para um arquivo .js

Mais sobre o "instantofertas":

A parte visivel para o usuario normal é feita com o template (template/index_br.html) em cima do base (/template/base.html). Renderizados via função IOHandler() no main.py.

A IOHandler por sua vez utiliza da render_page() que tem a função de exibir as categorias indexadas na base de dados.

No final da render_page() tem uma parte importante que é a substituição dos arquivos de desenvolvimento por versões minificadas.

Os arquivos de desenvolvimento ficam em /Site_Assets (io.js e style.css). Para re-gerar as versões minificadas é preciso executar (Site_Assets/build.sh). O build minifica e coloca em /static/ o minificado.

A parte visivel para o Google fica no main.py abaixo do código "if escaped > -1:".

Ambas partes utilizam das categorias que são crawleadas via cron jobs (cron.yaml). O crawler fica no engine.py.

Antes crawleavamos mais coisas (para exibir o autocomplete) mas agora existe uma API do Buscapé para autocomplete. Então isso está comentado no cron jobs.


Mais sobre a "Vitrine Responsiva"

Os arquivos de desenvolvimento ficam em /Responsive_Assets/. O JS é /bo.js o CSS é style.css e o template HTML é frame.html. Em produção o CSS e o HTML vão para dentro do JS no min.js.

Temos uma URL local para desenvolvimento que facilita (não precisa ficar dando build):
  //localhost:port/admin/iframe_view_dev

Em produção Servimos a Vitrine através da seguinte URL: //instant-ofertas.appspot.com/static/bo/min.js que é o /static/ dessa app.

Para gerar os arquivos para produção é necessario rodar "python build.py" dentro de /Responsive_Assets/.

O min.js desenha na página do usuario um iFrame que é o arquivo /frameads.html. O frameads chama novamente o min.js (que dessa vez já vai estar em cache) para continuar a renderização.

Nosso "responsivo" é uma união de layout fluido com breakpoints. Além disso, após a renderização do fluido com breakpoints nós re-calculamos quantas ofertas cabem e reajustamos o tamanho de tudo na função resizeCalc() do bo.js.

No blog ou site que utiliza a chamada é por exemplo:

  <div id="buscaofertas-01-idunico"></div>
  <script type="text/javascript">
  var _bpbuscaoq = _bpbuscaoq || [];
  _bpbuscaoq.push({
    placer_id: "buscaofertas-01-idunico",
    sourceId: "23069708",
    width: "100%"
  });
  (function() {
    var bo = document.createElement("script");
    bo.type = "text/javascript";
    bo.async = true;
    bo.src = "//instant-ofertas.appspot.com/static/bo/min.js";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bo, s);
  })();
  </script>

Ou seja no bo.js o começo de tudo está no final do arquivo em:
  if (typeof _bpbuscaoq == 'object') {
    BuscaOfertas.renderIframe(_bpbuscaoq.shift());
  }

Essa é a primeira chamada que inicia a renderização do iframe. E no iframe temos: 
  BuscaOfertas.renderWidget(undefined, options);
  
O arquivo bo.js em si é um tanto complexo tanto pela caracteristica do responsivo (função resizeCalc()), pela caracteristica de busca instantanea e pelo uso do YQL como fonte de dados principal (função YQL() e arquivo bws.lomadee.findoffers.v6.xml) responsavel por trazer resultados de mais uma categoria ao mesmo tempo.

Caso a fonte de dados principal falhe a função BWS é chamada para buscar diretamente no BWS porém somente com uma categoria.

Dentro de /Create_Lomadee/ ficam nossos arquivos que são hospedados no Lomadee e servem para o publisher gerar o código de instalação da Vitrine.

Dentro de /Create_Lomadee_Their_Version/ são os arquivos de geração de código mas a versão do pessoal do Lomadee. Eles podem fazer pequenas alterações antes de subir.

TODO

  As funcionalidades atuais estão bem solidas. O que é mais importante para o sucesso da Vitrine é a qualidade das ofertas exibidas.
  Se possivel utilizar Cookies e Navegg para exibir ofertas mais de acordo com o interesse do usuário para aumentar a taxa de conversão.
  Ser "responsivel" é legal e atrai muitos publishers porém depois de um tempo os publishers maiores tiram por causa da taxa de conversão "baixa-mediana".
  Então o foco de qualquer desenvolvimento deve ser em aumentar a taxa de conversão através da qualidade das ofertas exibidas.
  
  O padrão de apps lomadee é hospedar os arquivos lá. Porém cada atualização passa por homologação. Por isso preferimos hospedar os arquivos da Vitrine no AppEngine. Para atualizarmos a hora que quisermos. Porém com isso perdemos os Cookies do Lomadee.
  Uma possibilidade é passar a hospedar somente o arquivo frameads.html no Lomadee pois lá ele pegaria os Cookies de buscas no Buscapé com keywords e categorias já pesquisadas/navegadas. E seria possivel utilizar esse cookie no bo.js.