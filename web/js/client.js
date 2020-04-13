
$(document).ready(function () {

    var produto;
    var arrayProdutos = new Array();
    var arrayLojas = new Array();

    var endpointServer = "http://localhost:5000";

    $("#btnPesquisarProduto").click(function () {
        var inputProduto = $("#inputProduto").val();
        arrayProdutos = [];
        $('#resultList').empty();
        $('#produtoDetail').empty();
        pesquisaProduto(inputProduto);
    });

    $("#resultList").click(function (event) {
        console.log(event.target);
        arrayLojas = [];
        $('#resultList').empty();
        $('#produtoDetail').empty();
        pesquisaProdutoDetail(event.target.id);
    });

    function atualizarListaProdutos(){
        console.log(arrayProdutos);

        var list = $('#resultList');

        $.each(arrayProdutos, function (i) {
            //Nome do produto
            var btn = $('<a/>',{
                id : arrayProdutos[i].idProduto,
                class : 'list-group-item list-group-item-action btnProdutoDetail',
                href: "#",
                text : arrayProdutos[i].nomeProduto
            });
            btn.appendTo(list);
            var btn = '';
        });

    }

    function atualizarDetail() {
        console.log(arrayLojas);

        var list = $('#produtoDetail');

            //Nome do produto
            var li = $('<li/>');
            li.addClass('list-group-item list-nome-produto');
            li.text(produto.nomeProduto);
            li.appendTo(list);
            var li = '';

            //Marca do produto
            var marca;

            if (produto.marcaProduto === '') {
                marca = "Não informado";
            } else {
                marca = produto.marcaProduto;
            }

            var li = $('<li/>');
            li.addClass('list-group-item');
            li.text("Marca: " + marca);
            li.appendTo(list);
            var li = '';

            //Glúten Free
            var glutenFree;
            if (produto.glutenFree === "S") {
                glutenFree = 'Sim';
            } else if (produto.glutenFree === "N") {
                glutenFree = 'Não';
            } else {
                glutenFree = 'Não informado';
            }

            var li = $('<li/>');
            li.addClass('list-group-item');
            li.text("Glúten free? " + glutenFree);
            li.appendTo(list);
            var li = '';

            //Lojas
            var idLojas = produto.lojas;

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
                    li.text("Endereço " + j + 1 + ": " + endereco.local);
                    li.appendTo(list);
                    var li = '';
                }

            }
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
                atualizarListaProdutos();
            }
        });
    }

    function pesquisaProdutoDetail(idProduto) {

        jQuery.ajax({
            url: endpointServer + "/produtoDetail?idProduto=" + idProduto,
            method: "GET",
            dataType: "json",
            success: function (response) {
                produto = response;
            },
            error: function (textStatus, errorThrown) {
                console.log(errorThrown);
            },
            complete: function () {

                var arrayIdLojas = new Array();

                for (var k = 0; k < produto.lojas.length; k++) {
                    var objectLoja = produto.lojas[k];
                    if (arrayIdLojas.includes(objectLoja.idLoja) === false) {
                        arrayIdLojas.push(objectLoja.idLoja);
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
                atualizarDetail();
            }
        });
    }

});
