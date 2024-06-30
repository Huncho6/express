const express = require('express');
const { MongoClient } = require("mongodb");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");
const cors = require('cors');

const app = express();
let db;

app.use(cors());
app.use(express.json());

//connect to mongodb
connectToDb((err) => {
    if (!err) {
        app.listen(1669, () => {
            console.log("server is running on port 1669")
        });
        db = getDb();
    }
});

app.get("/", (req, res) => {
    res.send("Hello World");
});
//for get endpoint 
app.get("/albums", (req, res) => {
    let albums = [];
    db.collection("top20")
        .find()
        .forEach((album) => albums.push(album))
        .then(() => {
            res.status(200).json(albums);
        });
});

//find one using id 
 app.get("/albums/:id", (req, res) => {
        const id = new ObjectId (req.params.id);
        db.collection("top20")
        .findOne({ _id: id })
        .then((Album) => {
            res.status(200).json(Album);
        });
    });

//post endpoint
app.post("/albums", (req, res) =>{
    let albums = [];
    db.collection("top20")
    .find()
    .forEach((album) => albums.push(album))
    .then(() =>{
    res.status(200).json(albums);
    })
    });

//patch or update endpoint
app.patch("/albums/:id", async (req, res) => {
    try {
        const albumId = req.params.id;

        // Validate ObjectId
        if (!ObjectId.isValid(albumId)) {
            return res.status(400).json({ error: "Invalid album ID" });
        }

        const updates = req.body;

        const result = await db.collection("top20").updateOne(
            { _id: new ObjectId(albumId) },
            { $set: updates }
        );

         if (result && result.modifiedCount === 1) {
            res.status(200).json({ message: "Album updated successfully" });
        } else {
            res.status(404).json({ error: "Album not found or no updates applied" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//delete endpoint
app.delete("/albums/:id", async (req, res) => {
    try {
        const albumId = req.params.id;

        // Validate ObjectId
        if (!ObjectId.isValid(albumId)) {
            return res.status(400).json({ error: "Invalid album ID" });
        }

        const result = await db.collection("top20").deleteOne({ _id: new ObjectId(albumId) });

        if (result && result.deletedCount === 1) {
            res.status(200).json({ message: "Album deleted successfully" });
        } else {
            res.status(404).json({ error: "Album not found or no deletion performed" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})




