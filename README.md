# Vitrine Para Design Responsivo

## História
Após experiências com a API (Interface de Programação de Aplicativos) da [Buscapé](https://buscape.com.br) na criação de uma extensão para navegador, o projeto "Vitrine Para Design Responsivo" começou a ser desenvolvido em Fevereiro de 2011 com o nome de "Widget Busca Ofertas".

Inicialmente foram disponibilizados formatos pré-desenhados (alert, widget e mobile). No primeiro semestre de 2013, a ferramenta foi re-desenhada para um formato único que se ajusta ao espaço disponível da página do publicador ou do dispositivo do visitante. Formato conhecido por "design responsivo". Em 2018 a funcionalidade "design responsivo" foi simplificada.

O formato é hospedado e distribuido pela rede de marketing de afiliados [Lomadee](https://www.lomadee.com) na aba "Formatos" e enfrenta a concorrência de produtos de empresas como a Criteo, Google Ads, Outbrain e outras.

Com foco em dispositivos móveis, foi otimizada para consumir poucos recursos de rede.

Já foi usado por sites como o [Catraca Livre](http://catracalivre.com.br), [BandaB](https://bandab.com.br), [Paiquere](https://www.paiquere.com.br/) e outros. É usada pelo [Bem Paraná](https://www.bemparana.com.br/).

## Uso
Faça o cadastro e login na rede de afiliados [Lomadee](https://www.lomadee.com), entre no menu "Formatos" e procure por "Vitrine Para Design Responsivo".

## Navegadores suportados

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>iOS Safari |
| --------- | --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| | | |

Foi usada a ferramenta BrowserStack para gerar captura de tela da Vitrine rodando em diversos sistemas operacionais e navegadores diferentes. [Ver página "BrowserStack"](https://github.com/dirceup/vitrine-design-responsivo/blob/master/browserstack.md).

## Desenvolvimento
O formato possui um modelo de desenvolvimento colaborativo, baseado em código livre. Issues e Pull requests são bem-vindas.

Os arquivos de desenvolvimento são Responsive_Assets/vitrine_responsiva.js (JavaScript) e Responsive_Assets/style.css (CSS).

Executando o comando `python build.py` dentro da pasta Responsive_Assets/, os arquivos de produção são gerados dentro da pasta Responsive_Assets/staging/.

## Testes
Foram escritos testes unitários e de integração.
Os unitários podem ser rodados abrindo o arquivo Responsive_Assets/SpecRunner.html e os de integração usam a [gem watir](https://rubygems.org/gems/watir) e ficam na pasta Responsive_Assets/utils/

## Analytics
Alguns dados de uso são disponibilizados na página [Analytics](https://github.com/dirceup/vitrine-design-responsivo/blob/master/analytics.md).

## Pics
![alt text](https://raw.githubusercontent.com/dirceup/vitrine-responsiva/master/formatos.png)

![alt text](https://raw.githubusercontent.com/dirceup/vitrine-responsiva/master/pics.png)

## Demonstração
[https://vitrine-responsiva.firebaseapp.com/](https://vitrine-responsiva.firebaseapp.com/)

## Devspeak
De forma a evitar código-fonte desnecessário, foi desenvolvido sem o uso de frameworks tal como jQuery, React ou Angular. Com aproximadamente 1200 linhas de JavaScript puro, o HTML + CSS + JS pesa minificado 11.7 KB.

## Time
Programação: Dirceu

Desenho da interface: [Mikael Carrara](https://github.com/mikaelcarrara)
