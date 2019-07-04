import mongodb from "mongodb"

const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017';
const dbName = 'edu2';

export default (errlog, req, res, next) => {
    MongoClient.connect(url, function (err, client) {

        console.log("Connected successfully to server");

        const db = client.db(dbName);

        db.collection('error-logs')
            .insertOne({
                name: errlog.name,
                message: errlog.message,
                stack: errlog.stack,
                time: new Date()
            }, (err, result) => {
                res.json({
                    err_code: 0,
                    message: errlog.message
                })
            })

        client.close();
    });
}