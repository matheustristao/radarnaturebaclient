var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/devAgregador";

module.exports = {

    returnListaProduto: function () {
        return new Promise(function (resolve, reject) {

            MongoClient.connect(url, function (err, db) {
                if (err) reject(err);

                var dbo = db.db("devAgregador");

                dbo.collection("produtos").find({}).toArray(function (err, result) {
                    if (err) {
                        reject(err)
                    } else {
                        db.close();
                        resolve(result);
                    }
                });

            });


        });
    }

}






/*


    returnProduto: function (nome) {

        return new Promise(function (resolve, reject) {

            MongoClient.connect(url, function (err, db) {
                if (err) reject(err);

                var dbo = db.db("dev");

                dbo.collection("produto").findOne(
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
                            resolve(result);
                        }
                    });
            });
        });
    },

    returnListaProduto: function (categoria) {
        return new Promise(function (resolve, reject) {

            MongoClient.connect(url, function (err, db) {
                if (err) reject(err);

                var dbo = db.db("dev");

                dbo.collection("produto").find(
                    {
                        "categoria": new RegExp(categoria, "i")
                    },
                    {
                        projection:
                        {
                            _id: 0,
                            categoria: 0
                        }
                    }).toArray(function (err, result) {
                        if (err) {
                            reject(err)
                        } else {
                            db.close();
                            resolve(result);
                        }
                    });

            });
        });
    },

    returnLoja: function (nome) {

        return new Promise(function (resolve, reject) {

            MongoClient.connect(url, function (err, db) {
                if (err) reject(err);

                var dbo = db.db("dev");

                dbo.collection("loja").findOne(
                    {
                        "_id":  new RegExp(nome, "i")
                    },
                    {
                        projection:
                        {
                            _id: 0
                        }
                    }, function (err, result) {
                        if (err) {
                            reject(err)
                        } else {
                            db.close();
                            resolve(result);
                        }
                    });
            });
        });
    },


*/