const { MongoClient } = require("mongodb");

const connectionString = "mongodb://localhost:27017/goodAlbums";

const db = MongoClient.connect(connectionString)
.then((client)=>{
    console.log("mongo connected");
    return client.db();
})
.catch((err) =>  {
    console.error(err);
});

module.exports = db;

