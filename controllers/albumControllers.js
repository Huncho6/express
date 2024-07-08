const { ObjectId } = require("mongodb");
const dbConnect = require("../db");

let db;
dbConnect.then((dbs) => {
    db = dbs;
});

exports.getalbumsLists = (req, res) => {
    let albums = [];
    db.collection("top20")
        .find()
        .forEach((album) => albums.push(album))
        .then(() => {
            res.status(200).json(albums);
        })
 .catch((err) => {
   res.status(500).json({ error: err });
     });   
};

exports.getSingleAlbumList = (req, res) => {
    const id = new ObjectId(req.params.id);
    db.collection("top20")
      .findOne({ _id: id })
      .then((album) => {
        if (album === null)
          return res.status(404).json({ message: "Cohort not found" });
        res.status(200).json(album);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  };

  exports.createAlbum = (req, res) => {
    const { album_Cover, album_name, artist_name, best_song, release_year } = req.body;
  db.collection("top20")
    .insertOne({ album_Cover, album_name, artist_name, best_song, release_year })
    .then(() => {
      res.status(201).json({ message: "album added" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
    }; 

    exports.updateAlbumList = (req, res) => {
        const id = new ObjectId(req.params.id);
        const { album_Cover, album_name, artist_name, best_song, release_year } = req.body;
        db.collection("top20")
          .updateOne(
            { _id: id },
            { $set: { album_Cover, album_name, artist_name, best_song, release_year } }
          )
          .then(() => {
            res.status(200).json({ message: "album updated" });
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      };
 
      exports.deleteAlbumList = (req, res) => {
        const id = new ObjectId(req.params.id);
        db.collection("top20")
          .deleteOne({ _id: id })
          .then(() => {
            res.status(200).json({ message: "album deleted" });
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      };     
