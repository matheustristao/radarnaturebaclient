var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/devAgregador";

module.exports = {

    returnListaProdutoCategoria: function (idCategoria) {
        return new Promise(function (resolve, reject) {

            MongoClient.connect(url, function (err, db) {
                if (err) reject(err);

                var dbo = db.db("devAgregador");

                dbo.collection("produtos").find({ "idCategoria": idCategoria }).toArray(function (err, result) {
                    if (err) {
                        reject(err)
                    } else {
                        db.close();
                        console.log(JSON.stringify(result));
                        resolve(result);
                    }
                });

            });


        });
    },

    returnProduto: function (nome) {
        return new Promise(function (resolve, reject) {

            MongoClient.connect(url, function (err, db) {
                if (err) reject(err);

                var dbo = db.db("devAgregador");

                dbo.collection("produtos").findOne(
                    {
                    "nomeProduto": new RegExp(nome, "i")
                    },
                    {
                    projection:
                    {
                        _id: 0
                    }
                    },
                    function (err, result) {
                        if (err) {
                            reject(err)
                        } else {
                            db.close();
                            console.log(JSON.stringify(result));
                            resolve(result);
                        }
                    });
            });

        });
    },

    returnLoja: function (idLoja) {
        return new Promise(function (resolve, reject) {

            MongoClient.connect(url, function (err, db) {
                if (err) reject(err);

                var dbo = db.db("devAgregador");

                dbo.collection("lojas").findOne(
                    {
                    "idLoja": idLoja
                    },
                    {
                    projection:
                    {
                        _id: 0
                    }
                    },
                    function (err, result) {
                        if (err) {
                            reject(err)
                        } else {
                            db.close();
                            console.log(JSON.stringify(result));
                            resolve(result);
                        }
                    });
            });

        });
    }

}