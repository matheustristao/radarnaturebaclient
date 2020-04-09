var http = require('http');
var database = require('./database'); //Aqui eu carrego meu module database

http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*"); //Aqui permite acesso de outro local
    res.writeHead(200, { 'Content-Type': 'text/html' });

    /*
    database.returnListaProdutoCategoria(1).then(function (result) {
        res.end(JSON.stringify(result));
    }, function (err) {
        res.end(err);
    });
    */

    database.returnProduto("AMEN").then(function (result) {
        res.end(JSON.stringify(result));
    }, function (err) {
        res.end(err);
    });

}).listen(8080);