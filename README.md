# Vitrine Responsiva
> Para armazenamento e lembrança

## História
Após experiências com a API da Buscapé na criação de uma extensão para navegador, a Vitrine Responsiva começou a ser desenvolvida em Fevereiro de 2011 com o nome de "Widget Busca Ofertas".

Inicialmente foram disponibilizados formatos pre-desenhados (alert, widget e mobile). No primeiro semestre de 2013, a ferramenta foi re-desenhada para um formato único que se ajusta ao espaço disponível da página do publicador ou do dispositivo do visitante. 

Com foco em dispositivos móveis, foi otimizada para consumir poucos recursos de rede.

Usada por sites como o [Catraca Livre](http://catracalivre.com.br), [BandaB](https://bandab.com.br), [Paiquere](https://www.paiquere.com.br/) e outros. Foi hospedada e distribuida pela Lomadee (Buscapé Company) até Março de 2018 quando o projeto sucumbiu diante competidores como Criteo, Google Ads, Outbrain e outros.

## Desenvolvendo
Os arquivos de desenvolvimento ficam em Responsive_Assets/vitrine_responsiva.js e Responsive_Assets/style.css

O arquivo Responsive_Assets/sample.html mostra como deve ser instalada a Vitrine.

## Produção
Executando o comando `python build.py`, gera os arquivos de produção dentro da pasta Responsive_Assets/staging.

## Testes
Foram escritos testes unitários e de integração.
Os unitários podem ser rodados abrindo o arquivo Responsive_Assets/SpecRunner.html e os de integração usam a gem watir e ficam na pasta Responsive_Assets/utils/

## Pics
![alt text](https://raw.githubusercontent.com/dirceup/vitrine-responsiva/master/pics.png)

## Demonstração
[https://vitrine-responsiva.firebaseapp.com/](https://vitrine-responsiva.firebaseapp.com/)
