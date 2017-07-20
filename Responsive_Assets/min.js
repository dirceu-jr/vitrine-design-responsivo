// Copyright Coora
// http://www.coora.com.br/
;
var BuscaOfertas = (function (d) {
    // isso roda na pagina do publisher e cria um iframe
    function renderIframe(options) {
        var
            placer_element = document.getElementById(options["placer_id"]),
            placer_parent = placer_element.parentNode,
            iframe = d.createElement('iframe'),
            // close = d.createElement('a'),
            format = options["format"],
            size = format ? format.split('x') : undefined,
            width = size ? size[0] : (options["width"] || undefined),
            height = size ? size[1] : (options["height"] || undefined)
        ;

        // devido a um bug no ipad e iphone se o
        // width for % usamos minWidth que é uma forma de sair do bug
        if (width[width.length - 1] == "%") {
            iframe.width = "120";
            iframe.style.minWidth = width;
        } else {
            iframe.width = width;
        }

        iframe.height = "183";

        iframe.scrolling = "no";
        iframe.frameborder = 0;
        iframe.frameBorder = 0;
        iframe.marginwidth = 0;
        iframe.marginheight = 0;

        iframe.src = "http://community.lomadee.com/developers/vitrine_responsiva/frameads.html?sourceId=" + options["sourceId"];
        placer_element.appendChild(iframe);
    }

    return {
        renderIframe: renderIframe
    }
}(document));

if (typeof module != 'undefined' && module.exports) {
    module.exports = BuscaOfertas;
} else {
    window['BuscaOfertas'] = BuscaOfertas;
}

if (typeof _bpbuscaoq == 'object') {
    BuscaOfertas.renderIframe(_bpbuscaoq.shift());
}