import { MongoClient } from 'mongodb';
import { get } from 'config';

const fs = require('fs');

const server = get('database.server'),
    port = get('database.port'),
    database = get('database.database'),
    url = "mongodb://" + server + ":" + port + "/" + database;


MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("devAgregador");

    dbo.createCollection("produtos", function (err, res) {
        if (err) throw err;
        console.log("Collection produtos created!");

        let rawdata = fs.readFileSync('./data/produtos.json');
        let arrayProduto = JSON.parse(rawdata);
    
        dbo.collection("produtos").insertMany(arrayProduto, function (err, res) {
            if (err) throw err;
            console.log("Produto inserido");
        });
    });

    dbo.createCollection("categorias", function (err, res) {
        if (err) throw err;
        console.log("Collection categorias created!");

        let rawdata = fs.readFileSync('./data/categorias.json');
        let arrayCategoria = JSON.parse(rawdata);

        dbo.collection("categorias").insertMany(arrayCategoria, function (err, res) {
            if (err) throw err;
            console.log("Categorias inseridas");
        });
    });

    dbo.createCollection("lojas", function (err, res) {
        if (err) throw err;
        console.log("Collection lojas created!");

        let rawdata = fs.readFileSync('./data/lojas.json');
        let arrayLoja = JSON.parse(rawdata);

        dbo.collection("lojas").insertMany(arrayLoja, function (err, res) {
            if (err) throw err;
            console.log("Lojas inseridos");
        });
    });

});
