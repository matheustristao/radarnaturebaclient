
$(document).ready(function () {

    var arrayProdutos = new Array();
    var arrayLojas = new Array();

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
            var li = $('<li/>');

            li.addClass('list-group-item list-nome-produto');
            li.text(arrayProdutos[i].nomeProduto);
            li.appendTo(list);

            var li = '';
            var li = $('<li/>');

            var lojas = arrayProdutos[i].lojas;

            for (var i = 0; i < lojas.length; i++) {

                var loja = lojas[i];

                console.log(arrayLojas);

                for (var j = 0; j < arrayLojas.length; j++) {

                    if (arrayLojas[j].idLoja = loja.idLoja) {
                        li.addClass('list-group-item ');
                        li.text(arrayLojas[j].nomeLoja);
                        li.appendTo(list);
                    }

                }

            }



        });

    }

    function pesquisaProduto(nome) {
        jQuery.ajax({
            url: "http://localhost:8080/produtos?nomeProduto=" + nome,
            method: "GET",
            dataType: "json",
            success: function (response) {

                arrayProdutos = response;

                var arrayIdLojas = new Array();

                for (var i = 0; i < response.length; i++) {
                    var objectProduto = response[i];
                    for (var k = 0; k < objectProduto.lojas.length; k++) {
                        var objectLoja = objectProduto.lojas[k];
                        if (arrayIdLojas.includes(objectLoja.idLoja) === false) {
                            arrayIdLojas.push(objectLoja.idLoja);
                        }
                    }
                }

                for (var j = 0; j < arrayIdLojas.length; j++) {
                    pesquisaLoja(arrayIdLojas[j]);
                }

                atualizarLista();
            },
            error: function (textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }

    function pesquisaLoja(idLoja) {
        jQuery.ajax({
            url: "http://localhost:8080/lojas?idLoja=" + idLoja,
            method: "GET",
            dataType: "json",
            success: function (responseLojas) {
                arrayLojas.push(responseLojas);
            },
            error: function (textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }

});
