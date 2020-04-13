
$(document).ready(function () {

    var produto;
    var arrayProdutos = new Array();
    var arrayLojas = new Array();

    var endpointServer = "http://localhost:5000";


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

});
