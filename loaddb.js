var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/devAgregador";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("devAgregador");

    dbo.createCollection("produtos", function (err, res) {
        if (err) throw err;
        console.log("Collection produtos created!");

        var arrayProduto = [
            {
                "idProduto": 1,
                "idCategoria": 1,
                "nomeProduto": "PASTA DE AMENDOIM",
                "marcaProduto": "POWER ONE",
                "lojas": [
                    { "idLoja": 1 },
                    { "idLoja": 2 }
                ]
            },
            {
                "idProduto": 2,
                "idCategoria": 1,
                "nomeProduto": "CASTANHA DO PARA",
                "marcaProduto": "",
                "lojas": [
                    { "idLoja": 1 }
                ]
            }];

        dbo.collection("produtos").insertMany(arrayProduto, function (err, res) {
            if (err) throw err;
            console.log("Produto inserido");
        });
    });

    dbo.createCollection("categorias", function (err, res) {
        if (err) throw err;
        console.log("Collection categorias created!");

        var arrayCategoria = [
            {
                "idCategoria": 1,
                "nomeCategorias": "ALIMENTO"
            },
            {
                "idCategoria": 2,
                "nomeCategorias": "COSMÉTICO"
            }];

        dbo.collection("categorias").insertMany(arrayCategoria, function (err, res) {
            if (err) throw err;
            console.log("Categorias inseridas");
        });
    });

    dbo.createCollection("lojas", function (err, res) {
        if (err) throw err;
        console.log("Collection lojas created!");

        var arrayLoja = [
            {
                "idLoja": 1,
                "nomeLoja": "FEEL LIFE",
                "endereco": [
                    {
                        "local": "R. Antônio Lapa, 871 - Cambuí, Campinas - SP, 13025-241",
                        "telefone": "(19) 3307-0007",
                    }
                ],
                "enderecosVirtuais": [
                    { "facebook": "https://www.facebook.com/feellife.oficial" }
                ]
            },
            {
                "idLoja": 2,
                "nomeLoja": "MUNDO VERDE",
                "endereco": [
                    {
                        "local": "Shopping Parque Dom Pedro",
                        "telefone": "(19) 3756-9503",
                    }
                ],
                "enderecosVirtuais": [
                    { "website": "https://www.mundoverde.com.br/" }
                ]
            }
        ];

        dbo.collection("lojas").insertMany(arrayLoja, function (err, res) {
            if (err) throw err;
            console.log("Lojas inseridos");
        });
    });

});
