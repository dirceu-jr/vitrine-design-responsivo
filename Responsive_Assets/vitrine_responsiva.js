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
                6424: "Notebook",
                10232: "Tablet",
                62: "Caixa de Som para PC",
                145: "Forno Elétrico",
                150: "Fritadeira",
                9863: "Purificador de Água",
                131: "Freezer",
                121: "Cafeteira",
                119: "Aspirador de Pó / Água",
                3694: "Relógio de Pulso",
                129: "Lava Louças",
                36: "Monitor",
                3669: "Liquidificador",
                120: "Batedeira",
                2801: "Armário / Guarda-Roupa",
                7594: "Coifa / Exaustor",

                // temp not working categories in lomadee...

                // 3673: "Geladeira / Refrigerador",
                // 3671: "Lavadora de Roupas",
                // 3661: "Ar Condicionado",
                // 6058: "Console de Video Game",
                // 3606: "Impressora",
                // 138: "Fogão",
                // 126: "Microondas",
                // 9830: "Pneu para Carro",
                // 6504: "Frigobar",
                // 3662: "Ventilador / Circulador",
                // 3442: "Perfume",
                // 6378: "Monitor Cardíaco",
                // 10936: "Media Server",
                // 10104: "Leitor de e-book",
                // 16: "Fone de Ouvido",
                // 6409: "Jogos",
                // 8958: "Climatizador",
                // 2858: "Tênis",
                // 2796: "Secador de Cabelo",
                // 1437: "Bicicleta",
                // 3737: "HD"
            },

            default_categories_ids_order = ["bestsellers", 77, 2852, 6424, 10232, 62, 145, 150, 9863, 131, 121, 119, 3694, 129, 36, 3669, 120, 2801, 7594],

            // 'global options
            g_source_id,
            g_results,

            // spin.js
            offers_spinner,

            // holders
            search_holder,
            tabs_holder,
            offers_holder,
            header,
            entry,
            bg_message,
            loading,

            // to load more pages from last BWS call
            // (eg: in older pagination method)
            last_options,
            last_callback,
            last_method,

            zoom_in_interval,

            has_scrolled = false
        ;


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
                offers_spinner = new Spin.Spinner({
                    color: "#d0d0d0",
                    lines: 12
                }).spin(loading);
            }

            last_method = method;
            last_options = params;

            last_callback = function (o) {
                offers_spinner.stop();
                callback(o);
            }

            Lomadee(last_method, last_options, last_callback);
        }


        function suggestionSearch(keyword) {

            keyword = slugify(keyword);

            if (keyword !== "") {

                onDemandServices("offer/_search", {
                    keyword: keyword,
                    size: g_results_to_size(),
                    page: 1
                }, function (o) {
                    renderOffers(o.offers);
                });

            }

        }


        function show(el) {
            el.style.display = "block";
        }


        function hide(el) {
            el.style.display = "none";
        }


        function renderOffers(o) {

            if (o && o[0]) {

                var
                    render = [],
                    expected_length = o.length
                ;

                for (var i = 0; i < expected_length; i++) {

                    var
                        abrv = "BRL",
                        installment_conditional = o[i].installment && o[i].installment.quantity && o[i].installment.quantity > 1,
                        installment = installment_conditional ?
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
                            "<a href='", o[i].link, "' target='_blank' title='", name, "' onclick='VitrineResponsiva.analytics(\"Oferta-Click\", \"", (o[i].id || 0), "-", (o[i].category.id || 0), "\", \"", name, "\");'>",
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

                // to allow horizontal scrolling
                offers_holder.style.width = (expected_length * 121) + 'px';

                zoomInOffers(expected_length);

            } else {

                // offer not found
                offers_holder.innerHTML = "<div style='margin: 20px'>Nenhum produto encontrado para essa pesquisa.</div>";

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
                        // avoid to move/scroll after user has manually scrolled
                        if (!has_scrolled) {
                            entry.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: 'smooth'
                            });
                            // in order to detect user scroll
                            // set it to false when auto scrolled
                            setTimeout(function() {
                                has_scrolled = false;
                            }, 500);
                        }

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

                    // scroll if its an element initially not visible
                    if (actual_count > 0 && (actual_count % g_results == 0)) {
                        // avoid to move/scroll after user has manually scrolled
                        if (!has_scrolled) {
                            entry.scrollTo({
                                top: 0,
                                left: actual_count * 121,
                                behavior: 'smooth'
                            });
                            // in order to detect user scroll
                            // set it to false when auto scrolled
                            setTimeout(function() {
                                has_scrolled = false;
                            }, 500);
                        }
                    }
                    
                    actual_count++;
                }
            ;
            
            // zoom_in_interval is global
            clearInterval(zoom_in_interval);
            zoom_in_interval = setInterval(function() {
                next();
            }, 2500);
        }


        // render side menu with 'tabs' of products
        function renderTabs(options) {

            if(options["keywords"] !== undefined) {

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
            }

            // in order to randomize first ones...
            var
                randomize_tabs_til = 1,
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


        function openTab(open_category, from_menu) {

            var
                tabsChilds = tabs_holder ? tabs_holder.getElementsByTagName('li') : [],
                tab = $("tab-" + open_category)
            ;

            // clean tabs links styles
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

            // set active style to open tab
            if (tab) {
                tab.className = "current";
                tab.innerHTML = "<span>" + (tab.innerText ? tab.innerText : tab.textContent) + "</span>";
            }

            if (open_category) {
                findTab(open_category, from_menu);
            }

        }

        // more 'weigth' when g_results is smaller
        // eg:
        // 1 * 4
        // 2 * 4
        // 3 * 4
        // 4 * 2
        // 5 * 2
        // ...
        function g_results_to_size() {
            if (g_results < 4) {
                return g_results * 4;
            } else {
                return g_results * 2;
            }
        }


        function findTab(category, from_menu) {

            has_scrolled = false;
            // console.log(g_results);

            var options = {
                page: 1,
                size: g_results_to_size(),
                sourceId: g_source_id,
                sort: 'bestsellers'
            }

            // if "category" is a keyword
            if (category[0] == "k") {
                options["keyword"] = category.split("k_")[1];
                var endpoint = "offer/_search";
                
            // if "category" is best sellers
            } else if (category == "bestsellers") {
                var
                    endpoint = "offer/_bestsellers",
                    // in fact currently there are 226 totalSize
                    // total_size = 226,
                    // but it has to works a long time without modifications so will be conservative and lower it 
                    total_size = 150,
                    per_page = g_results_to_size(),
                    total_pages = total_size/per_page
                ;
                
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
            });

        }


        // this function runs inside a iframe
        function renderWidget(options) {

            g_source_id = (options["sourceId"] || "35802480");
            search_holder = $("in_sx");
            tabs_holder = $("tabs_holder");
            sidebar = $("sidebar");
            offers_holder = $("offer");
            footer = $("fotr");
            header = $("headr");
            entry = $("entry");
            bg_message = $("msg");
            loading = $("load");

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

            addEvent(entry, "scroll", function(evt) {
                has_scrolled = true;
            });

            var resizeCalc = function(render) {

                var
                    available_width = entry.offsetWidth,
                    available_height = windowHeight()
                ;

                // minus border
                available_height -= 2;

                entry.style.height = available_height + "px";

                // adjust vertically scrollable menu
                tabs_holder.style.height = (available_height - 35) + "px";

                var
                    product_template = offers_holder.childNodes[0],
                    product_width = product_template.offsetWidth + 1
                ;

                // sum product margin in product height
                product_template.style.height = available_height + "px";

                // adjust line-height of pagination to align in the middle
                // pagination_next.style.lineHeight = (available_height - 7.5) + "px";
                // pagination_previous.style.lineHeight = (available_height - 7.5) + "px";

                var
                    available_space_cols = Math.max(Math.floor(available_width / product_width), 1)
                ;

                // console.log("available_width: " + available_width);
                // console.log("product width: " + product_width);
                // console.log(available_width / product_width);
                // console.log(available_space_cols);
                // console.log(available_space_lines);
                // console.log(available_space_cols);

                // calc how many products to load in function of width
                // load double to has scroll
                g_results = available_space_cols;

                // break if something went wrong
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
            }, 400);

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