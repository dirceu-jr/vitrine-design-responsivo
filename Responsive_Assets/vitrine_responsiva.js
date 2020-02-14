/**
 * @preserve Copyright Dirceu Pauka Junior
 * https://github.com/dirceup
 */
;
var VitrineResponsiva = (
    function (d) {

        // APP
        var
            appid = "155001196902309c5f761",

            currency_map = {
                "BRL": {
                    abrv: "R$ ",
                    cents: 2,
                    mi: ".",
                    cent: ","
                }
            },

            tabs_map = {
                "bestsellers": "Mais Vendidos",
                77: "Celular e Smartphone",
                2852: "TV",
                // 3673: "Geladeira / Refrigerador",
                6424: "Notebook",
                // 3671: "Lavadora de Roupas",
                // 3661: "Ar Condicionado",
                // 6058: "Console de Video Game",
                // 3606: "Impressora",
                // 138: "Fogão",
                // 126: "Microondas",
                10232: "Tablet",
                // 9830: "Pneu para Carro",
                62: "Caixa de Som para PC",
                // 6504: "Frigobar",
                // 3662: "Ventilador / Circulador",
                145: "Forno Elétrico",
                150: "Fritadeira",
                9863: "Purificador de Água",
                131: "Freezer",
                121: "Cafeteira",
                // 3442: "Perfume",
                119: "Aspirador de Pó / Água",
                3694: "Relógio de Pulso",
                // 6378: "Monitor Cardíaco",
                129: "Lava Louças",
                // 10936: "Media Server",
                // 10104: "Leitor de e-book",
                // 16: "Fone de Ouvido",
                // 6409: "Jogos",
                // 8958: "Climatizador",
                36: "Monitor",
                3669: "Liquidificador",
                // 2858: "Tênis",
                120: "Batedeira",
                // 2796: "Secador de Cabelo",
                2801: "Armário / Guarda-Roupa",
                // 1437: "Bicicleta",
                7594: "Coifa / Exaustor",
                // 3737: "HD",

                // essas são as especiais de moda
                "2993": "Óculos de Sol",
                "8163": "Estojo de Maquiagem",
                "9877": "Anti-Acne",
                // "2796": "Secador de Cabelo",
                "k_bolsa guess": "Bolsa Guess",
                "k_bota ramarim": "Bota Ramarim"

            },

            default_categories_ids_order = ["bestsellers", 77, 2852, 6424, 10232, 62, 145, 150, 9863, 131, 121, 119, 3694, 129, 36, 3669, 120, 2801, 7594],
            // default_categories_ids_order = ["bestsellers", 77, 2852, 3673, 6424, 3671, 3661, 6058, 3606, 138, 126, 10232, 9830, 62, 6504, 3662, 145, 150, 9863, 131, 121, 3442, 119, 3694, 6378, 129, 10936, 10104, 16, 6409, 8958, 36, 3669, 2858, 120, 2796, 2801, 1437, 7594, 3737],

            suggestion_has_heart_beat = true,
            suggestion_has_heart_beat_keyboard = true,
            delayed_suggestion,
            last_suggestion = "",

            search_has_heart_beat = true,
            delayed_search,

            // suggestion
            hover_suggest,
            has_focus,
            hover_pos,
            max_suggestions = 6,

            // 'global options
            g_source_id,
            g_results,

            // spin.js
            offers_spinner,
            suggestions_spinner,

            // holders
            search_holder,
            suggestions_loading,

            suggestions_holder,
            tabs_holder,
            offers_holder,
            header,
            entry,
            bg_message,
            loading,
            sugst_scroll,

            // pagination
            pagination_previous,
            pagination_next,

            // to load more pages from last BWS call
            last_options,
            last_callback,
            last_method,

            zoom_in_interval
        ;

        // console.log(tabs_ids);

        function $(e) {
            return d.getElementById(e);
        }


        function paramsTo(params, prefix, and) {
            var query = [];
            params = params || {};
            for (key in params) {
                if (params.hasOwnProperty(key) && typeof params[key] !== "undefined") {
                    query.push(key + "=" + prefix + encodeURIComponent(params[key]) + prefix);
                }
            }
            return query.join(and);
        }


        function paramsToQuery(params) {
            return paramsTo(params, '', '&');
        }


        function xhr(url, successHandler, errorHandler, timeoutHandler) {
            var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            xhr.open('get', url, true);
            xhr.onreadystatechange = function () {
                var status;
                var data;
                // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
                if (xhr.readyState == 4) { // `DONE`
                    status = xhr.status;
                    if (status == 200) {
                        data = JSON.parse(xhr.responseText);
                        successHandler && successHandler(data);
                    } else {
                        errorHandler && errorHandler(status);
                    }
                }
            };
            xhr.ontimeout = function() {
                timeoutHandler && timeoutHandler();
            }
            xhr.timeout = 10000;
            xhr.send();
        }


        function shuffle(o) {
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {};
            return o;
        }


        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function (obj, start) {
                for (var i = (start || 0), j = this.length; i < j; i++) {
                    if (this[i] === obj) {
                        return i;
                    }
                }
                return -1;
            }
        }


        String.prototype.capitalize = function() {
            return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
        }


        // cross browser event handling
        function addEvent(el, type, fn) {
            if (window.addEventListener) {
                el.addEventListener(type, fn, false);
            } else if (window.attachEvent) {
                el.attachEvent("on" + type, fn);
            } else {
                var old = el["on" + type];
                el["on" + type] = function () {
                    old();
                    fn();
                };
            }
        }


        function slugify(to_slug) {
            var
                from = 'àáäãâèéëêìíïîòóöôõùúüûñç·/_,:;',
                to = 'aaaaaeeeeiiiiooooouuuunc------',
                i = 0,
                len = from.length,
                str = to_slug.toLowerCase();

            for (; i < len; i++) {
                str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
            }

            return str.replace(/^\s+|\s+$/g, '')
                      .replace(/[^-a-zA-Z0-9\s]+/ig, '')
                      .replace(/\s/gi, "-");
        }


        function formatMoney(number, currency) {
            if (number > 0) {
                var
                    currency = currency_map[currency],
                    n = currency.cents,
                    x = 3,
                    s = currency.mi,
                    c = currency.cent,
                    re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
                    num = parseInt(number).toFixed(Math.max(0, ~~n));

                return currency.abrv + (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
            } else {
                return "Consulte";
            }
        }


        // hide image and show text larger

        function imageError(el) {
            el.onerror = null;
            el.onload = null;
            el.src = "data:image/gif;base64,R0lGODlhZABkALMAAP///7W1tcLCwtPT07u7u8jIyPLy8s3Nzfz8/P7+/uvr69ra2vj4+OPj46ioqAAAACH5BAAAAAAALAAAAABkAGQAAAT/EMhJq7046827/2AojmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEgsGo/IpHLJbPYQB0JgSp1KA1fp1Yo9JJwZRgDBQJDJ5fKZwU6nzQEGGGMIABT4vH7PxwMIBnMXdXdVWAQEAooFjAUHjwORCgABgYIVBgQABg6HigIFoI4HkaULkn+WlxOEClYCiaKjA6SRC7cDk3GrFK2vi4yQtQOnp7mUqrx1CZyIwLPDtrcLCgmVvKwBCa6xogezttKnBgmA2BKZzFjPj8PF0+PlyavLdZ+NkOHw0+TX5/UB2OUTd6vBrX7zLqXLBKydKVqhEFFBeA6AmARi2JU6oMgZIokM/6wlFFQvEb5Hn1LC+uggpD9sFxnE+vbt3qdEOBGFNPdPm0xQNRfZ7BigU6cCL5URwGiyQDdZn6YMaNBAQYMBAQ4g6GlxkTOhoSIGuLpSwNQAA7byEgMAAQGnKqEKGOs0lskGAaops4Ng5deUjNByjCvgwAICahVqQlDl49O5DXDCKisAr5xVbBOY2cyZs4MBAjCYTTonE4AEmjejRrAaddbQF0aPbELoNOrbuFEDcMAIlO+wgWczqd2B4yNHo9o5Fb7EwFwtjbFQkUirukOsCy5fYnA1UrRhpEghKkX+QEAFiQWRUWCAffv3eeA3mFuAPNwGIbGt7szfDBsFA1zRCf8BU5VREQjrGUTMAlUZeCAImjFgwIQGlPHFgxhmqOGGHHbo4YcghigiCnaM2EGJJm5gx4pUTNCiBFNQAmOMMlZxCYsy1uhijjGiiGOJKDqxIoxEUtKij0YeWWSQTQzJY446EskkkEWC4SSVQF7pZJRUznHlklrySGOXTHpYZooz0ojmmmzueCYNb/KwJQdzlhAnBXf+kKcLe5JgY5ouqhkol2MaGWiWhSKZZJUtIOnojpD2CCWOUVY65KNSwqCojYpWGaank4aKZZqSvoCppXi6maqoqmbKZQV9joBpqVCKiWqiraIKaqwibKplmZIiKqWPhbpa64u8EpFsiMu26ewVs9BGK+201FZr7bXYZqvtttx2C0QEADs=";
        }


        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }


        // ------------------------------------------------------
        function Lomadee(service, params, callback) {

            params['sourceId'] = g_source_id;
            
            var
                protocol = ("https:" == window.location.protocol ? "https" : "http"),
                url = protocol + "://api.lomadee.com/v3/" + appid + "/" + service + "?" + paramsToQuery(params)
            ;

            xhr(url, function (obj) {
                callback(obj);
            }, function() { // error
                offers_spinner.stop();
                bg_message.innerHTML = "<div style='margin: 20px'>Ops, algum erro ocorreu. Tente novamente mais tarde.</div>";
            }, function() { // timeout
                offers_spinner.stop();
                bg_message.innerHTML = "<div style='margin: 20px'>Verifique sua conexão com a Internet e tente novamente.</div>";
            });

        }


        // this function help us to remember last call data
        // to use in loading more itens...

        function onDemandServices(method, params, callback) {
            // inicia loading
            if (offers_spinner) {
                offers_spinner.spin(loading);
            } else {
                offers_spinner = new Spinner({
                    color: "#d0d0d0",
                    lines: 12
                }).spin(loading);
            }

            last_method = method;
            last_options = params;

            last_callback = function (o) {

                delayedSearchCallback(function () {
                    // esconde loading
                    offers_spinner.stop();
                    callback(o);
                });

            }

            Lomadee(last_method, last_options, last_callback);
        }


        // TODO - executar delayed search no fail do jsonp

        function suggestionSearch(keyword) {

            // heartbeat p/ não executar de novo se ja estiver executando
            // isso faz com que uma segunda request fique no delayed_search
            searchHeartBeat(function () {

                keyword = slugify(keyword);

                if (keyword !== "") {

                    onDemandServices("offer/_search", {
                        keyword: keyword,
                        size: g_results,
                        page: 1
                    }, function (o) {
                        renderOffers(o.offers);
                        renderPagination(o.pagination);
                    });

                }

            });

        }


        function mouseSugst(over, el) {

            var
                suggestionHolder = el.parentNode.parentNode,
                index = el.getAttribute("data-index");

            if (over) {

                hover_suggest = true;

                if (hover_pos !== -1) {
                    var element = suggestionHolder.getElementsByTagName('li')[hover_pos];
                    if (element) {
                        element.getElementsByTagName('a')[0].className = "";
                    }
                }

                el.className = "hover";
                hover_pos = index;

                // out
            } else {
                hover_suggest = false;
                el.className = "";
            }

        }


        function selectSugst(el) {
            search_holder.value = el.innerHTML;
            suggestionSearch(el.innerHTML);
            return false;
        }


        function show(el) {
            el.style.display = "block";
        }


        function hide(el) {
            el.style.display = "none";
        }


        // query-suggestions
        // function autoCompleteCallback(data) {
        //     var value = search_holder.value;
        //     if (value.length == 1) {
        //         value = value + "%20";
        //     }

        //     delayed_suggestionCallback(function () {

        //         suggestions_spinner.stop();
        //         hide(suggestions_loading);

        //         var words = data["keywords"];

        //         if (words.length > 0 && has_focus) {
        //             var suggestion = [];
        //             for (var i = 0; i < words.length && i < max_suggestions; i++) {
        //                 if (words[i] !== value) {
        //                     suggestion.push(
        //                         "<li><a href='#' data-index='", i, "' onmouseover='VitrineResponsiva.mouseSugst(true, this);' onmouseout='VitrineResponsiva.mouseSugst(false, this);' onclick='return VitrineResponsiva.selectSugst(this);'>",
        //                             words[i],
        //                         "</a></li>");
        //                 }
        //             }

        //             if (words.length == 1 && words[0] == value) {
        //                 suggestionBoxHide();
        //             } else {
        //                 suggestionBoxShow(suggestion.join(''));
        //             }
        //         }

        //         // usar valor digitado se digitou mais de 4 letras ou não tem autocompletar
        //         // if (value.length > 4 || words[0] == undefined) {
        //         //     suggestionSearch(value);
        //         // } else {
        //         //     // usa primeiro resultado do autocompletar
        //         //     suggestionSearch(words[0]);

        //         //     // define o primeiro resultado do autocompletar como "selecionado"
        //         //     hover_pos = 0;
        //         //     suggestions_holder.getElementsByTagName("a")[hover_pos].className = "hover";
        //         // }

        //     });
        // }


        // query-suggestions
        // function suggestionInstant(value) {
        //     value = slugify(value);

        //     if (value == '') {
        //         suggestionBoxHide();
        //     }

        //     if (value == '' || value == last_suggestion) {
        //         delayed_suggestionCallback(function () {});
        //         return false;
        //     }

        //     openTab(0);

        //     hover_pos = -1;
        //     last_suggestion = value;

        //     // inicia loading
        //     if (suggestions_spinner) {
        //         suggestions_spinner.spin(suggestions_loading);
        //     } else {
        //         suggestions_spinner = new Spinner({
        //             color: options["search"] || "#d0d0d0",
        //             lines: 10,
        //             length: 6,
        //             width: 2,
        //             radius: 1
        //         }).spin(suggestions_loading);
        //     }

        //     show(suggestions_loading);

        //     if (value.length == 1) {
        //         value = value + "%20";
        //     }

        //     var subdomain = ("https:" == window.location.protocol ? "sbws" : "bws");
        //     var protocol = ("https:" == window.location.protocol ? "https:" : "http:");

        //     var jsonp = document.createElement("script");
        //     jsonp.src = protocol + "//" + subdomain + ".buscape.com.br/service/autoComplete/mobile/664f4c566e534b707844553d/BR/?format=json&keyword=" + value + "&callback=VitrineResponsiva.autoCompleteCallback";

        //     document.body.appendChild(jsonp);
        // }


        // hearbeat = debounce

        // -- search-heartbeat

        function searchHeartBeat(fn) {
            if (search_has_heart_beat) {

                search_has_heart_beat = false;
                fn();

            } else {

                delayed_search = fn;

            }
        }


        function delayedSearchCallback(fn) {
            if (delayed_search) {

                var delayed_buffer = delayed_search;
                delayed_search = null;
                delayed_buffer();

            } else {

                fn();
                search_has_heart_beat = true;
            }
        }
        // -- search-heartbeat

        // --- suggestion-heartbeat

        // query-suggestions
        // function suggestionHeartBeat(fn) {
        //     if (suggestion_has_heart_beat) {

        //         suggestion_has_heart_beat = false;
        //         fn();

        //     } else {

        //         delayed_suggestion = fn;

        //     }
        // }

        // query-suggestions
        // function delayed_suggestionCallback(fn) {
        //     if (delayed_suggestion) {

        //         var delayed_buffer = delayed_suggestion;
        //         delayed_suggestion = null;
        //         delayed_buffer();

        //     } else {

        //         fn();
        //         suggestion_has_heart_beat = true;

        //     }
        // }

        // -- suggestion-heartbeat

        function suggestionHeartBeatKeyboard(fn) {
            if (suggestion_has_heart_beat_keyboard) {

                suggestion_has_heart_beat_keyboard = false;
                fn();

                setTimeout(function () {
                    suggestion_has_heart_beat_keyboard = true;
                }, 200);
            }
        }

        //

        // query-suggestions
        // function suggestionBoxCommand(event) {

        //     if (event.keyCode == 38) {
        //         event.preventDefault && event.preventDefault();
        //     }

        //     if (sugst_scroll.style.display == "block") {

        //         suggestionHeartBeatKeyboard(function () {

        //             var elements = suggestions_holder.getElementsByTagName("a");

        //             if (elements) {
        //                 switch (event.keyCode) {
        //                     // p/ baixo
        //                     case 40:
        //                         if (hover_pos !== -1 && elements[hover_pos]) {
        //                             elements[hover_pos].className = "";
        //                         }

        //                         if ((hover_pos + 1) < elements.length) {
        //                             hover_pos++;
        //                         } else {
        //                             hover_pos = -1;
        //                         }
        //                         break;

        //                         // p/ cima
        //                     case 38:
        //                         if (hover_pos !== -1 && elements[hover_pos]) {
        //                             elements[hover_pos].className = "";
        //                         }

        //                         if (hover_pos > 0) {
        //                             hover_pos--;
        //                         } else {
        //                             hover_pos = elements.length;
        //                         }

        //                         break;

        //                     default:

        //                 }

        //                 if (event.keyCode == 40 || event.keyCode == 38) {

        //                     if (hover_pos !== -1 && elements[hover_pos]) {
        //                         search_holder.value = elements[hover_pos].innerHTML;
        //                         elements[hover_pos].className = "hover";
        //                     } else {
        //                         search_holder.value = search_holder.getAttribute('rel');
        //                     }

        //                     suggestionSearch(search_holder.value);

        //                 }

        //             }

        //         });

        //     }
        // }


        // query-suggestions
        // function suggestionBoxShow(suggestionsContent) {
        //     hover_pos = -1;
        //     suggestions_holder.innerHTML = suggestionsContent;
        //     show(sugst_scroll);
        //     hide(tabs_holder);
        // }


        // query-suggestions
        // function suggestionBoxHide() {
        //     hide(sugst_scroll);
        //     show(tabs_holder);
        //     last_suggestion = "";
        // }


        function renderOffers(o) {

            if (o && o[0]) {

                var
                    render = [],
                    expected_length = (g_results < o.length ? g_results : o.length);


                for (var i = 0; i < expected_length; i++) {

                    var
                        abrv = "BRL",
                        installment = (o[i].installment && o[i].installment.quantity) ?
                            (o[i].installment.quantity + " x " + formatMoney(o[i].installment.value, abrv)) : "&nbsp;",
                        price = formatMoney(o[i].price, abrv),
                        name = o[i].name.replace("Smartphone", ""),
                        thumbnail = o[i].thumbnail
                    ;

                    // console.log(o[i]);

                    // if (o[i].product.thumbnail && o[i].product.thumbnail.otherFormats[0]) {
                    //     var thumbnail = o[i].product.thumbnail.otherFormats[0].url;
                    // } else {
                    //     var thumbnail = o[i].thumbnail;
                    // }

                    render.push(
                        "<li>",
                            "<a href='", o[i].link, "' target='_blank' onclick='VitrineResponsiva.analytics(\"Oferta-Click\", \"", (o[i].id || 0), "-", (o[i].category.id || 0), "\", \"", name, "\");'>",
                                "<div class='thumbholder'>",
                                    "<img class='thumb' src='", thumbnail, "' onerror='VitrineResponsiva.imgErr(this);' />",
                                "</div>",
                                "<div>",
                                    "<h2 class='title'>", name, "</h2>",
                                    "<p class='price'>", price, "</p>",
                                    "<p class='installment'>", installment, "</p>",
                                "</div>",
                            "</a>",
                        "</li>"
                    );
                }

                hide(bg_message);
                offers_holder.innerHTML = render.join("");
                zoomInOffers(expected_length);

            } else {

                // não encontrou oferta
                offers_holder.innerHTML = "<div style='margin: 20px'>Nenhum produto encontrado para essa pesquisa.</div>";

                // hide(pagination_previous);
                // hide(pagination_next);

            }

        }


        function zoomInOffers(max) {
            
            var
                actual_count = 0,
                next = function() {
                    if (max == 1) {
                        return;
                    }
                    if (actual_count >= max) {
                        actual_count = 0;
                    }
                    var previous_count = actual_count - 1;
                    if (previous_count < 0) {
                        previous_count = max - 1;
                    }

                    var
                        actual = offers_holder.childNodes[actual_count].childNodes[0],
                        previous = offers_holder.childNodes[previous_count].childNodes[0]
                    ;
                    
                    previous.className = "";
                    actual.className = "hover";
                    
                    actual_count++;
                }
            ;
            
            // zoom_in_interval is global
            clearInterval(zoom_in_interval);
            zoom_in_interval = setInterval(function() {
                next();
            }, 2500);
        }


        function renderPagination(o) {

            // console.log(o);
            if (!o) {
                return false;
            }

            hide(pagination_previous);
            hide(pagination_next);

            if (o.page > 1) {
                show(pagination_previous);
            }

            if (o.totalPage > o.page) {
                show(pagination_next);
            }

        }

        function actionPagination(action) {

            analytics('Paginacao', action);

            if (action == "pre") {
                last_options.page = last_options.page - 1;
            } else {
                last_options.page = last_options.page + 1;
            }

            onDemandServices(last_method, last_options, last_callback);

        }


        // desenha menu lateral com "abas" de produtos
        function renderTabs(options) {

            // TODO
            // limitar tamanho da lista de keywords para não abusarem e bugar

            if (options["type"] == "fashion") {

                // 2993 óculos de sol
                // 3442 perfume
                // 9877 anti acne
                // 2796 Secador de Cabelo
                
                var
                    tabs_ids = shuffle(["k_bolsa guess", "k_bota ramarim", 2993, 3442, 2796])
                        .concat(default_categories_ids_order)
                ;

            } else if(options["keywords"] !== undefined) {

                var
                    keywords = options["keywords"].split(","),
                    new_tabs_ids = []
                ;
                
                for (var i = 0; i < keywords.length; i++) {
                    new_tabs_ids.push("k_" + decodeURIComponent(keywords[i]));
                }

                var tabs_ids = shuffle(new_tabs_ids).concat(default_categories_ids_order);

            } else {
                var tabs_ids = default_categories_ids_order;
            }

            var lomadee_cookie = getCookie("loc");
            
            // for tests
            // var lomadee_cookie = "\"cx=77|77&px=661034|637440&us=177132148620180607204233&si=9402546\"";
            // var lomadee_cookie = "\"cx=77|77&px=661034|637440&us=177132148620180607204233&si=9402546\"";

            // if has lomadee cookies
            if (lomadee_cookie !== "") {
                var cookie_array = lomadee_cookie.split("&");
                // cx (categories ids)
                if (cookie_array[0]) {
                    var cxs = cookie_array[0].split("=");
                    if (cxs[1]) {
                        var cxs_array = shuffle(cxs[1].split("|"));
                        if (cxs_array[0]) {
                            for (var i = 0; i < cxs_array.length; i++) {
                                // puxa para cima categorias dos cookies
                                // só adiciona se tiver no tabs_map
                                // &&
                                // aborta se já tiver em cima
                                if (tabs_map[cxs_array[i]] && cxs_array[i] !== tabs_ids[0]) {
                                    // localiza
                                    var index_of_to_remove = tabs_ids.indexOf(parseInt(cxs_array[i]));
                                    // remove
                                    tabs_ids.splice(index_of_to_remove, 1);
                                    // recoloca em cima
                                    tabs_ids.unshift(cxs_array[i]);
                                }
                            }
                        }
                    }
                }

                // não tem mais endpoint na API do Lomadee para produtos
                // // px (products ids)
                // if (cookie_array[1]) {
                //     var pxs = cookie_array[1].split("=");
                //     if (pxs[1]) {
                //         var pxs_array = shuffle(pxs[1].split("|"));
                //         if (pxs_array[0]) {
                //             for (var i = 0; i < pxs_array.length; i++) {
                //                 // coloca em cima
                //                 tabs_ids.unshift("p_" + pxs_array[i]);
                //             }
                //         }
                //     }
                // }
            }

            // aqui pode randomizar as primeiras
            var
                randomize_tabs_til = 4,
                top_tabs_ids = default_categories_ids_order.slice(0, randomize_tabs_til),
                other_tabs_ids = default_categories_ids_order.slice(randomize_tabs_til),
                tabs_ids = shuffle(top_tabs_ids).concat(other_tabs_ids),

                tabs_content = [],
                from_cookies_labels = shuffle(["Para você", "Recomendação"])
            ;

            for (tab in tabs_ids) {
                if (tabs_ids[tab][0] == "k") {
                    // if its a keyword tab
                    tabs_content.push(
                        "<li id='tab-", tabs_ids[tab], "'>",
                            tabs_ids[tab].split("k_")[1].capitalize(),
                        "</li>"
                    );
                } else if (tabs_ids[tab][0] == "p") {
                    // if its a product tab
                    tabs_content.push(
                        "<li id='tab-", tabs_ids[tab], "'>",
                            from_cookies_labels.pop(),
                        "</li>"
                    );

                } else {
                    // if its a category tab
                    tabs_content.push(
                        "<li id='tab-", tabs_ids[tab], "'>",
                            tabs_map[tabs_ids[tab].toString()],
                        "</li>"
                    );
                }
            }

            if (tabs_holder) {
                tabs_holder.innerHTML = tabs_content.join('');
            }

            openTab(tabs_ids[0]);
        }


        // abre uma aba

        function openTab(open_category, from_menu) {

            var
                tabsChilds = tabs_holder ? tabs_holder.getElementsByTagName('li') : [],
                tab = $("tab-" + open_category)
            ;

            // console.log(tabsChilds);

            // limpa estilo dos links das abas
            for (var i = 0; i < tabsChilds.length; i++) {
                var
                    text = tabsChilds[i].innerText ? tabsChilds[i].innerText : tabsChilds[i].textContent,
                    id = tabsChilds[i]["id"].split("tab-")[1]
                ;

                text = text.replace(/\n/g, "");

                tabsChilds[i].innerHTML = [
                    "<a onclick='VitrineResponsiva.openTab(\"", id, "\", true);VitrineResponsiva.analytics(\"Aba\", \"", id, "\", \"", text, "\");return false;' href='#'>",
                        text,
                    "</a>"
                ].join('');
                
                tabsChilds[i].className = "";
            }

            // define o estilo de ativo da aba que esta aberta
            if (tab) {
                tab.className = "current";
                tab.innerHTML = "<span>" + (tab.innerText ? tab.innerText : tab.textContent) + "</span>";
            }

            if (open_category) {
                findTab(open_category, from_menu);
            }

        }


        // procura no bws/lomadee e manda renderizar

        function findTab(category, from_menu) {

            var options = {
                page: 1,
                size: (g_results + 1),
                sourceId: g_source_id,
                sort: 'bestsellers'
            }

            // console.log(options);

            // hide pagination
            hide(pagination_previous);
            hide(pagination_next);
            
            // console.log(category);

            // if "category" is a keyword
            if (category[0] == "k") {
                options["keyword"] = category.split("k_")[1];
                var endpoint = "offer/_search";
            
            // if "category" is a product id
            // } else if (category[0] == "p") {
            //     var endpoint = "offer/_product/" + category.split("p_")[1];

            // if "category" is best sellers
            } else if (category == "bestsellers") {
                var
                    endpoint = "offer/_bestsellers",
                    // in fact currently there are 226 totalSize
                    // total_size = 226,
                    // but it has to works a long time without modifications so will be conservative and lower it 
                    total_size = 150,
                    per_page = (g_results + 1),
                    total_pages = total_size/per_page
                ;

                // console.log(total_pages);
                
                options["page"] = Math.floor(Math.random() * total_pages) + 1;
            // if category
            } else {
                var endpoint = "offer/_category/" + category;

                // if not from menu clicked randomize
                if (!from_menu) {
                    options["page"] = Math.floor(Math.random() * 3) + 1;
                }
            }

            onDemandServices(endpoint, options, function (o) {
                offers_holder.style.visibility = "visible";
                renderOffers(o.offers);
                renderPagination(o.pagination);
            });

        }


        // this function runs inside a iframe
        function renderWidget(options) {

            g_source_id = (options["sourceId"] || "35802480");
            search_holder = $("in_sx");
            suggestions_loading = $("sx-loa");
            suggestions_holder = $("sugst");
            tabs_holder = $("tabs_holder");
            sidebar = $("sidebar");
            // sugst_scroll = $("sugst_scroll");
            offers_holder = $("offer");
            footer = $("fotr");
            header = $("headr");
            entry = $("entry");
            pagination_previous = $("pre");
            pagination_next = $("nxt");
            bg_message = $("msg");
            loading = $("load");

            // !
            // Buscapé changed their "Query Suggestions" endpoint
            // The new one does not have a "callback" param so I can't make it work with JSONP
            // I will try to ask them but for now "Query Suggestions" will be disabled

            // query-suggestions
            // addEvent(search_holder, "keydown", function (event) {
            //     if (!event) {
            //         event = window.event;
            //     }
            //     suggestionBoxCommand(event);
            // });

            // query-suggestions
            // addEvent(search_holder, "keypress", function (event) {
            //     if (!event) {
            //         event = window.event;
            //     }
            //     suggestionBoxCommand(event);
            // });

            // query-suggestions
            // addEvent(search_holder, "keyup", function (event) {

            //     // console.log(event.keyCode);

            //     if (!event) {
            //         event = window.event;
            //     }

            //     var donothing = {
            //         38: true,
            //         40: true,
            //         16: true,
            //         17: true,
            //         18: true,
            //         91: true,
            //         37: true,
            //         39: true,
            //         27: true,
            //         13: true
            //     };

            //     // se for alguma tecla diferente de p/ cima, p/ baixo, shift, alt, control, command, esc
            //     if (!donothing[event.keyCode]) {

            //         var value = this.value;
            //         this.setAttribute('rel', value);

            //         suggestionHeartBeat(function () {
            //             suggestionInstant(value);
            //         });

            //     }

            //     // esc
            //     if (event.keyCode == 27) {
            //         search_holder.blur();
            //         suggestionBoxHide();
            //     }
            //     // enter
            //     if (event.keyCode == 13) {
            //         if (search_holder.value !== "") {
            //             suggestionSearch(search_holder.value);
            //         }
            //     }

            //     suggestion_has_heart_beat_keyboard = true;
            // });

            // query-suggestions
            // addEvent(search_holder, "focus", function () {
            //     has_focus = true;

            //     suggestionHeartBeat(function () {
            //         suggestionInstant(search_holder.value);
            //     });
            // });

            // query-suggestions
            // addEvent(search_holder, "blur", function () {
            //     has_focus = false;

            //     if (!hover_suggest) {
            //         suggestionBoxHide();
            //     }
            // });

            var onformsubmit = function(evt) {
                evt.preventDefault();
                if (search_holder.value !== "") {
                    suggestionSearch(search_holder.value);
                }
                search_holder.focus();
                return false;
            }
            
            addEvent($("search-submit"), "click", function(evt) {
                return onformsubmit(evt);
            });

            addEvent($("the-search"), "submit", function(evt) {
                return onformsubmit(evt);
            });

            addEvent(pagination_previous, "click", function (event) {
                event.preventDefault();
                actionPagination("pre");
                return false;
            });

            addEvent(pagination_next, "click", function (event) {
                event.preventDefault();
                actionPagination("nxt");
                return false;
            });

            // !! render
            // a quantidade de colunas é ajustada no css

            var resizeCalc = function(render) {

                var
                    // tamanho da tela
                    available_width = offers_holder.offsetWidth,
                    // available_width = windowWidth(),
                    available_height = windowHeight()
                ;

                // use width to define max_suggestions (2 to phones : 6 screen)
                // max_suggestions = (available_width <= 320) ? 2 : 6;

                // if (available_width <= 363) {
                //     search_holder.setAttribute('placeholder', "Digite o produto, marca ou modelo.");
                // }

                // menos a sidebar (se ela estiver na tela)
                // available_width -= (getStyle(sidebar, "display") !== "none" ? sidebar.offsetWidth : 0);

                // console.log("sidebar.offsetWidth: " + sidebar.offsetWidth);
                // console.log("offers_holder: " + offers_holder.offsetWidth);
                // console.log(getStyle(sidebar, "display"));

                // menos bordas
                available_height -= 2;

                entry.style.height = available_height + "px";

                // ajusta tamanho da parte scrollavel do menu
                tabs_holder.style.height = (available_height - 35) + "px";

                // ajusta suggestion
                // sugst_scroll.style.height = (available_height - header.offsetHeight) + "px";

                var
                    product_template = offers_holder.childNodes[0],
                    product_width = product_template.offsetWidth + 1
                ;

                // sum product margin in product height
                product_template.style.height = available_height + "px";

                // adjust line-height of pagination to align in the middle
                pagination_next.style.lineHeight = (available_height - 7.5) + "px";
                pagination_previous.style.lineHeight = (available_height - 7.5) + "px";

                // TODO: deixar somente a quantidade exata, não deixar um produto a mais, para tirar a borda da direita

                var
                    available_space_cols = Math.max(Math.floor(available_width / product_width), 1)
                ;

                // console.log("available_width: " + available_width);
                // console.log("product width: " + product_width);
                // console.log(available_width / product_width);
                // console.log(available_space_cols);
                //      console.log(available_space_lines);
                //      console.log(available_space_cols);

                // usa calculo para saber quantos produtos carregar
                g_results = available_space_cols;

                // se bugar algo para de carregar
                if (!isFinite(g_results)) {
                    return false;
                }

                if (render) {
                    renderTabs(options);
                }

                d.body.style.visibility = "visible";

            }

            setTimeout(function() {
                resizeCalc(true);
            }, 300);

            window.addEventListener("orientationchange", function() {
                resizeCalc(false);
            });
        }


        function windowHeight() {
            if (window.innerHeight) {
                return window.innerHeight;
            } else if (d.documentElement && d.documentElement.clientHeight) {
                return d.documentElement.clientHeight;
            }
        }


        function analytics(action, type, label, value) { 
            if (typeof (ga) !== "undefined") {
                ga('send', 'event', type, action, label, value);
            }
        }


        return {
            // autoCompleteCallback: autoCompleteCallback,
            selectSugst: selectSugst,
            mouseSugst: mouseSugst,
            renderWidget: renderWidget,
            imgErr: imageError,
            openTab: openTab,
            analytics: analytics
        }

    }(document)
);

var
    hash = window.location.href.split("#"),
    query = window.location.search.substring(1),
    vars = (hash[1] || query || "").split("&"),
    options = {};

for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    options[pair[0]] = pair[1];
}

VitrineResponsiva.renderWidget(options);