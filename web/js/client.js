
$(document).ready(function () {

    var arrayProdutos = new Array();
    var arrayLojas = new Array();

    var endpointServer = "http://192.168.1.16:8080";

    $("#btnPesquisarProduto").click(function () {
        var inputProduto = $("#inputProduto").val();
        arrayProdutos = [];
        arrayLojas = [];
        $('#resultList').empty();
        pesquisaProduto(inputProduto);
    });

    function atualizarLista() {
        console.log(arrayProdutos);
        console.log(arrayLojas);

        var list = $('#resultList');

        $.each(arrayProdutos, function (i) {

            //Nome do produto
            var li = $('<li/>');
            li.addClass('list-group-item list-nome-produto');
            li.text(arrayProdutos[i].nomeProduto);
            li.appendTo(list);
            var li = '';

            //Marca do produto
            var marca;

            if(arrayProdutos[i].marcaProduto === ''){
                marca = "Não informado";
            } else{
                marca = arrayProdutos[i].marcaProduto;
            }

            var li = $('<li/>');
            li.addClass('list-group-item');
            li.text("Marca: " + marca);
            li.appendTo(list);
            var li = '';

            //Glúten Free
            var glutenFree;
            if(arrayProdutos[i].glutenFree === "S"){
                glutenFree = 'Sim';
            }else if(arrayProdutos[i].glutenFree === "N"){
                glutenFree = 'Não';
            }else{
                glutenFree = 'Não informado';
            }

            var li = $('<li/>');
            li.addClass('list-group-item');
            li.text("Glúten free? " + glutenFree);
            li.appendTo(list);
            var li = '';

            //Lojas
            var idLojas = arrayProdutos[i].lojas;

            for (var i = 0; i < idLojas.length; i++) {
                var idLoja = idLojas[i];

                var index = arrayLojas.map(function (e) {
                    return e.idLoja;
                }).indexOf(idLoja.idLoja);

                var lojaDetail = arrayLojas[index];

                var li = $('<li/>');
                li.addClass('list-group-item ');
                li.text("Nome da loja: " + lojaDetail.nomeLoja);
                li.appendTo(list);
                var li = '';

                //Endereco
                for (var j = 0; j < lojaDetail.endereco.length; j++) {

                    var endereco = lojaDetail.endereco[j];
                    var li = $('<li/>');
                    li.addClass('list-group-item ');
                    li.text("Endereço " + j+1 + ": " + endereco.local);
                    li.appendTo(list);
                    var li = '';
                }

            }
        });
    }

    function pesquisaProduto(nome) {
        jQuery.ajax({
            url: endpointServer + "/produtos?nomeProduto=" + nome,
            method: "GET",
            dataType: "json",
            success: function (response) {
                arrayProdutos = response;
            },
            error: function (textStatus, errorThrown) {
                console.log(errorThrown);
            },
            complete: function () {

                var arrayIdLojas = new Array();

                for (var i = 0; i < arrayProdutos.length; i++) {
                    var objectProduto = arrayProdutos[i];
                    for (var k = 0; k < objectProduto.lojas.length; k++) {
                        var objectLoja = objectProduto.lojas[k];
                        if (arrayIdLojas.includes(objectLoja.idLoja) === false) {
                            arrayIdLojas.push(objectLoja.idLoja);
                        }
                    }
                }
                pesquisaLoja(arrayIdLojas);
            }
        });
    }

    function pesquisaLoja(arrayIdLojas) {

        var concatLojas;

        for (var j = 0; j < arrayIdLojas.length; j++) {

            if (j === 0) {
                concatLojas = arrayIdLojas[j] + ',';
            }
            else if (j === arrayIdLojas.length - 1) {
                concatLojas = concatLojas + arrayIdLojas[j];
            }
            else {
                concatLojas = concatLojas + arrayIdLojas[j] + ',';
            }
        }


        jQuery.ajax({
            url: endpointServer + "/lojas?idLoja=" + concatLojas,
            method: "GET",
            dataType: "json",
            success: function (responseLojas) {
                arrayLojas = responseLojas;
            },
            error: function (textStatus, errorThrown) {
                console.log(errorThrown);
            },
            complete: function () {
                atualizarLista();
            }
        });
    }

});
