# Vitrine Responsiva

## História
Após experiências com a API (Interface de Programação de Aplicativos) da [Buscapé](https://buscape.com.br) na criação de uma extensão para navegador, a Vitrine Responsiva começou a ser desenvolvida em Fevereiro de 2011 com o nome de "Widget Busca Ofertas".

Inicialmente foram disponibilizados formatos pré-desenhados (alert, widget e mobile). No primeiro semestre de 2013, a ferramenta foi re-desenhada para um formato único que se ajusta ao espaço disponível da página do publicador ou do dispositivo do visitante. 

Com foco em dispositivos móveis, foi otimizada para consumir poucos recursos de rede.

Já foi usada por sites como o [Catraca Livre](http://catracalivre.com.br), [BandaB](https://bandab.com.br), [Paiquere](https://www.paiquere.com.br/) e outros. É hospedada e distribuida pela Lomadee (Buscapé Company) na aba "Formatos" e enfrenta a concorrência de produtos de empresas como a Criteo, Google Ads, Outbrain e outros.

## Uso
Basta incluir um `<iframe>` com o destino para o documento hospedado em "http://community.lomadee.com/developers/vitrine_responsiva/frameads.html?sourceId=x" e **colocar um sourceId do Lomadee no lugar do x**.

Exemplo:

`<iframe src="http://community.lomadee.com/developers/vitrine_responsiva/frameads.html?sourceId=35802480" width="100%" height="183" scrolling="no" frameborder="0"></iframe>`

## Desenvolvendo
Os arquivos de desenvolvimento são Responsive_Assets/vitrine_responsiva.js (JS) e Responsive_Assets/style.css (CSS).

Executando o comando `python build.py` dentro da pasta Responsive_Assets/, os arquivos de produção são gerados dentro da pasta Responsive_Assets/staging/.

## Testes
Foram escritos testes unitários e de integração.
Os unitários podem ser rodados abrindo o arquivo Responsive_Assets/SpecRunner.html e os de integração usam a gem watir e ficam na pasta Responsive_Assets/utils/

## Pics
![alt text](https://raw.githubusercontent.com/dirceup/vitrine-responsiva/master/formatos.png)

![alt text](https://raw.githubusercontent.com/dirceup/vitrine-responsiva/master/pics.png)

## Demonstração
[https://vitrine-responsiva.firebaseapp.com/](https://vitrine-responsiva.firebaseapp.com/)

## Devspeak
De forma a evitar código-fonte desnecessário, foi desenvolvido sem o uso de frameworks tal como jQuery. Com apróximadamente 1200 linhas de puro JavaScript, pesa minificado aproximadamente 13KB.

## Team
O desenho da interface foi feito por [Mikael Carrara](https://github.com/mikaelcarrara).