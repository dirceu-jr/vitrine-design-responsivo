describe("VitrineResponsiva", function() {
         
    var vitrine_responsiva;

    beforeEach(function() {
        vitrine_responsiva = VitrineResponsiva;
    });
         
    // it("should render the IFRAME", function() {
    //     var body = document.getElementsByTagName("body")[0];
    //     var placer = document.createElement("div");
       
    //     var id = "vitrine_responsiva-500000";
    //     placer.id = id;
    //     body.appendChild(placer);

    //     var options = {
    //         placer_id: id,
    //         sourceId: "35798815"
    //     }
    //     vitrine_responsiva.renderIframe(options);
       
    //     var iframe = Sizzle("#" + id + " iframe");
       
    //     expect(iframe[0].parentNode.innerHTML).toEqual("<iframe height=\"186px\" width=\"120\" scrolling=\"no\" frameborder=\"0\" src=\"file:///Users/dirceujunior/Documents/Vitrine%20Responsiva%20v1.5/Responsive_Assets/frameads.html#sourceId=35798815\" style=\"min-width: 100%;\"></iframe>");
    // });
         
    it("should render the Widget body", function() {
        var options = {
            sourceId: "35798815"
        }
        vitrine_responsiva.renderWidget(options);
       
        // verifica se sidebar foi preenchida
        var sidebar_first_item = Sizzle("#tabs_holder li:first")[0];
        expect(sidebar_first_item.innerHTML).toEqual("<span>Mais Vendidos</span>");
       
        // verifica se paginação foi trabalhada e se prev não está visivel
        var pre_pagination = Sizzle("#pre")[0];
        expect(pre_pagination.style.display).toEqual("none");
       
        // verifica se product price está começando com R$
        // console.log(document.getElementById("entry").innerHTML);
        // console.log(jQuery("#entry").find(".price"));
       
    });

});
