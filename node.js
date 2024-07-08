const express = require('express');
const albumRoutes = require("./albumRoutes/albumRoutes");
const cors = require('cors');
const db = require("./db")

const app = express();

app.use(cors());
app.use(express.json());

//connect to mongodb

app.get("/", (req, res) => {
    res.send("Hello World");
});
//albums
app.use("/", albumRoutes);

app.listen(1669, () => {
    console.log("server is running on 1669");
   });








