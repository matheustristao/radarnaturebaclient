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

    returnListaProdutos: function (nome) {
        return new Promise(function (resolve, reject) {

            MongoClient.connect(url, function (err, db) {
                if (err) reject(err);

                var dbo = db.db("devAgregador");

                dbo.collection("produtos").find(
                    {
                        "nomeProduto": new RegExp(nome, "i")
                    },
                    {
                        projection:
                        {
                            _id: 0
                        }
                    }).toArray(
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

    returnProdutoDetail: function (idProduto) {
        return new Promise(function (resolve, reject) {

            MongoClient.connect(url, function (err, db) {
                if (err) reject(err);

                var dbo = db.db("devAgregador");

                dbo.collection("produtos").findOne(
                    {
                        "idProduto": parseInt(idProduto)
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

    returnLoja: function (arrayLoja) {

        var transformedArrayLoja = new Array();

        transformedArrayLoja = arrayLoja.split(",");

        for (var i = 0; i < transformedArrayLoja.length; i++) {
            transformedArrayLoja[i] = parseInt(transformedArrayLoja[i]);
        }

        return new Promise(function (resolve, reject) {

            MongoClient.connect(url, function (err, db) {
                if (err) reject(err);

                var dbo = db.db("devAgregador");

                dbo.collection("lojas").find(
                    {
                        "idLoja": { "$in": transformedArrayLoja }
                    },
                    {
                        projection:
                        {
                            _id: 0
                        }
                    }).toArray(
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