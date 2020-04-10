
$(document).ready(function(){

$("#btnPesquisarProduto").click(function () {
    pesquisaProduto($("#inputProduto").val());
});

function pesquisaProduto(nome) {
    jQuery.ajax({
        url: "http://localhost:8080/produtos?nomeProduto=" + nome,
        method: "GET",
        success: function (data) {
            console.log(data);
        },
        error: function (textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}
});
