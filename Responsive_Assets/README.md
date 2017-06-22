# responsive-design-affiliate-marketing

See it working here:

<img src="http://i.imgur.com/ZYGvRLz.jpg" alt="Vitrine Responsiva da Coora" width="720"/>

Beautiful and small footprint responsive design offers showcase for affiliate marketing Buscapé/Lomadee API

For development **bo.js** is main uncompressed script file - **style.css** is about style and **frame.html** is template

For production run
> python build.py

It will copy template and minimized CSS into minimized JS that will be saved as **min.js**

sample.html shows how it is called

**min.js** will insert an IFRAME (**frameads.html**) that use the now then cached **min.js** again for less requests/latency

You only have to host **min.js** and **frameads.html**. Remember to change the "path" variable at line 15 on **bo.js** specifically *instant-ofertas.appspot.com/static/bo/* with your production domain/path.

(script get offers via Yahoo! YQL custom data table (bws.lomadee.findoffers.v6.xml) first - if fail go direct to Buscapé/Lomadee API)

Passionately made by developer [Dirceu Pauka Junior](https://linkedin.com/in/pauka) & designer [Mikael Moratto Carrara](https://www.linkedin.com/in/mikaelcarrara)

[MIT License](https://opensource.org/licenses/MIT)
