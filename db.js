// db.js
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/goodAlbums");
const db = mongoose.connection;

db.on("error", (error) => console.error("Connection error:", error));
db.once("open", () => {
  console.log("Database connected");
});

module.exports = db;


// const db = MongoClient.connect(connectionString)
// .then((client)=>{
//     console.log("mongo connected");
//     return client.db();
// })
// .catch((err) =>  {
//     console.error(err);
// });
