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
                        console.log(JSON.stringify(result));
                        resolve(result);
                    }
                });

            });


        });
    },

    returnListaProdutoDeatil: function () {

        return new Promise(function (resolve, reject) {

            MongoClient.connect(url, function (err, db) {
                if (err) reject(err);

                var dbo = db.db("devAgregador");

                dbo.collection('produtos').aggregate([
                    {
                        $lookup:
                        {
                            from: 'categorias',
                            localField: 'idCategoria',
                            foreignField: 'idCategoria',
                            as: 'Categoria'
                        }
                    },
                ]).toArray(function (err, result) {
                    if (err) throw err;
                    console.log(JSON.stringify(result));
                    resolve(result);
                    db.close();
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