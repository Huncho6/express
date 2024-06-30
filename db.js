const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017/goodAlbums";
let dbCollection;

module.exports = {
    connectToDb: (callback) => {
        MongoClient.connect(url)
            .then((client) => {
                dbCollection = client.db();
                return callback();
            })
            .catch((err) => {
                console.error(err);
                return callback(err);
            });
    },
    getDb: () => dbCollection,
};
