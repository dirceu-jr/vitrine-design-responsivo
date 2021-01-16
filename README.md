# Vitrine Para Design Responsivo

## História
Após experiências com a Interface de Programação de Aplicativos (API) da [Buscapé](https://buscape.com.br) na criação de uma extensão para navegadores, o projeto da ferramenta "Vitrine Para Design Responsivo" começou a ser desenvolvido pelo designer [Mikael Carrara](https://github.com/mikaelcarrara) e programador [Dirceu Jr.](https://github.com/dirceup) em Fevereiro de 2011 com o nome de "Widget Busca Ofertas".

Inicialmente foram disponibilizados formatos pré-desenhados: *alert*, *widget* e *mobile*.

No primeiro semestre de 2013, a ferramenta foi redesenhada para um formato único que se ajusta ao espaço disponível da página do publicador ou do dispositivo do visitante, e renomeada para "Vitrine Responsiva" por causa do seu *design responsivo*. Em 2018 a funcionalidade _design responsivo_ foi simplificada e o nome alterado para "Vitrine Para Design Responsivo".

Com foco em dispositivos móveis, é otimizada para consumir poucos recursos de rede.

Hospedado e distribuido pela rede de marketing de afiliados [Lomadee](https://www.lomadee.com) na aba "Formatos", enfrentou a concorrência de produtos de empresas como a Criteo, Google Ads, Outbrain e outras. Foi usado por sites como o [Catraca Livre](http://catracalivre.com.br), [BandaB](https://bandab.com.br), [Paiquere](https://www.paiquere.com.br/), [Bem Paraná](https://www.bemparana.com.br/) entre outros.

De forma a evitar código-fonte desnecessário, foi desenvolvido sem o uso de _frameworks_ tal como _jQuery_, _React_ ou _Angular_. O HTML + CSS + JS pesa "minificado" 11,7KB.

## Navegadores suportados

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>iOS Safari |
| --------- | --------- | --------- | --------- | --------- |
| IE10, IE11, Edge|✔|✔|✔|✔

Usamos o serviço BrowserStack para gerar captura de tela da Vitrine rodando em diversos sistemas operacionais e navegadores diferentes. [Ver página "BrowserStack"](https://github.com/dirceup/vitrine-design-responsivo/blob/master/browserstack.md).

## Desenvolvimento
O formato possui um modelo de desenvolvimento colaborativo, baseado em código livre. Os arquivos de desenvolvimento são `Responsive_Assets/vitrine_responsiva.js` (JavaScript) e `Responsive_Assets/style.css` (CSS).

Executando o comando `python build.py` dentro da pasta Responsive_Assets/, os arquivos de produção são gerados na pasta public/.

## Testes
Existem testes unitários e de integração. Os unitários podem ser rodados abrindo o arquivo `Responsive_Assets/SpecRunner.html` e os de integração usam a [gem watir](https://rubygems.org/gems/watir) e ficam na pasta `Responsive_Assets/utils/`.

## Analytics
Alguns dados de uso são disponibilizados na página [Analytics](https://github.com/dirceup/vitrine-design-responsivo/blob/master/analytics.md).

## Formato disponível na Lomadee

![alt text](https://raw.githubusercontent.com/dirceup/vitrine-responsiva/master/formatos.png)

## Formato em página de testes
![alt text](https://raw.githubusercontent.com/dirceup/vitrine-responsiva/master/pics.png)

## Demonstração
Veja uma página de demonstração da Vitrine: [https://vitrine-responsiva.firebaseapp.com/](https://vitrine-responsiva.firebaseapp.com/).
