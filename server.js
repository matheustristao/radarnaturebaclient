var http = require('http');
var url = require('url');
var database = require('./database'); //Aqui eu carrego meu module database

http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*"); //Aqui permite acesso de outro local
    res.writeHead(200, { 'Content-Type': 'text/html' });

    console.log(req.url);   

     //Aqui os parâmetros da url são recuperados como objeto
     var q = url.parse(req.url, true).query;
     console.log(q);

    /*
    database.returnListaProdutoCategoria(1).then(function (result) {
        res.end(JSON.stringify(result));
    }, function (err) {
        res.end(err);
    });
    */

    database.returnProduto(q.nomeProduto).then(function (result) {
        res.end(JSON.stringify(result));
    }, function (err) {
        res.end(err);
    });
   

    /*    
    database.returnLoja(1).then(function (result) {
        res.end(JSON.stringify(result));
    }, function (err) {
        res.end(err);
    });
     */

}).listen(8080);