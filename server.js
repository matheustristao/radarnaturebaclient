const express = require('express'),
      database = require('./database'); //Aqui eu carrego meu module database
      bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function (request, response, next) {
    if (request.url === '/favicon.ico') {
        response.writeHead(200, { 'Content-Type': 'image/x-icon' });
        response.end('');
    } else {
        next();
    }
});

app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.status(202);
    res.send("API running...");
});

app.get('/produtos', function (req, res) {
    database.returnListaProdutos(req.query.nomeProduto).then(function (result) {
        res.status(202);
        res.end(JSON.stringify(result));
    }, function (err) {
        res.end(err);
    });
});

app.get('/produtoDetail', function (req, res) {
    database.returnProdutoDetail(req.query.idProduto).then(function (result) {
        res.status(202);
        res.end(JSON.stringify(result));
    }, function (err) {
        res.end(err);
    });
});

app.get('/lojas', function (req, res) {
    database.returnLoja(req.query.idLoja,req.query.regio).then(function (result) {
        res.status(202);
        res.end(JSON.stringify(result));
    }, function (err) {
        res.end(err);
    });
});

app.get('/categorias', function (req, res) {
    database.returnListaProdutoCategoria(req.query.idCategoria).then(function (result) {
        res.status(202);
        res.end(JSON.stringify(result));
    }, function (err) {
        res.end(err);
    });
});

var server = app.listen(5000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("http://%s:%s", host, port);
});