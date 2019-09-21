# Vitrine Para Design Responsivo

## História
Após experiências com a API (Interface de Programação de Aplicativos) da [Buscapé](https://buscape.com.br) na criação de uma extensão para navegador, o projeto "Vitrine Para Design Responsivo" começou a ser desenvolvido em Fevereiro de 2011 com o nome de "Widget Busca Ofertas".

Inicialmente foram disponibilizados formatos pré-desenhados (alert, widget e mobile). No primeiro semestre de 2013, a ferramenta foi re-desenhada para um formato único que se ajusta ao espaço disponível da página do publicador ou do dispositivo do visitante. Formato conhecido por "design responsivo". Em 2018 a funcionalidade "design responsivo" foi simplificada.

O formato é hospedado e distribuido pela rede de marketing de afiliados [Lomadee](https://www.lomadee.com) na aba "Formatos" e enfrenta a concorrência de produtos de empresas como a Criteo, Google Ads, Outbrain e outras.

Com foco em dispositivos móveis, foi otimizada para consumir poucos recursos de rede.

Já foi usado por sites como o [Catraca Livre](http://catracalivre.com.br), [BandaB](https://bandab.com.br), [Paiquere](https://www.paiquere.com.br/) e outros. É usada pelo [Bem Paraná](https://www.bemparana.com.br/).

## Uso
Faça o cadastro e login na rede de afiliados [Lomadee](https://www.lomadee.com), entre no menu "Formatos" e procure por "Vitrine Para Design Responsivo".

## Desenvolvendo
Os arquivos de desenvolvimento são Responsive_Assets/vitrine_responsiva.js (JS) e Responsive_Assets/style.css (CSS).

Executando o comando `python build.py` dentro da pasta Responsive_Assets/, os arquivos de produção são gerados dentro da pasta Responsive_Assets/staging/.

## Testes
Foram escritos testes unitários e de integração.
Os unitários podem ser rodados abrindo o arquivo Responsive_Assets/SpecRunner.html e os de integração usam a [gem watir](https://rubygems.org/gems/watir) e ficam na pasta Responsive_Assets/utils/

## Pics
![alt text](https://raw.githubusercontent.com/dirceup/vitrine-responsiva/master/formatos.png)

![alt text](https://raw.githubusercontent.com/dirceup/vitrine-responsiva/master/pics.png)

## Demonstração
[https://vitrine-responsiva.firebaseapp.com/](https://vitrine-responsiva.firebaseapp.com/)

## Devspeak
De forma a evitar código-fonte desnecessário, foi desenvolvido sem o uso de frameworks tal como jQuery, React ou Angular. Com aproximadamente 1200 linhas de JavaScript puro, o HTML + CSS + JS pesa minificado 11.7 KB.

## Team
Programação: Dirceu

Desenho da interface: [Mikael Carrara](https://github.com/mikaelcarrara)
