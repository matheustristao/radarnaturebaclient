var http = require('http');
var url = require('url');
var database = require('./database'); //Aqui eu carrego meu module database

http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*"); //Aqui permite acesso de outro local
    res.writeHead(200, { 'Content-Type': 'text/html' });

     //Aqui os parâmetros da url são recuperados como objeto
     var filter = url.parse(req.url, true).query;
     //console.log(filter);

    switch (req.url.split("?")[0]){
        case "/produtos":
            database.returnProduto(filter.nomeProduto).then(function (result) {
                res.end(JSON.stringify(result));
            }, function (err) {
                res.end(err);
            });
        break;
        case "/lojas":
            database.returnLoja(filter.idLoja).then(function (result) {
                res.end(JSON.stringify(result));
            }, function (err) {
                res.end(err);
            });
        break;
        case "/categorias":
            database.returnListaProdutoCategoria(filter.idCategoria).then(function (result) {
                res.end(JSON.stringify(result));
            }, function (err) {
                res.end(err);
            });
        break;
    }

}).listen(8080);