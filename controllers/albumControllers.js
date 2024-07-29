const { ObjectId } = require("mongodb");
const db = require("../db");
const Album = require("../albumModels/models.js");

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

exports.getAlbumByCriteria = async (req, res) => {
  try {
    const filters = req.query;
    const query = {};

    // Build the query object based on provided filters
    for (const key in filters) {
      if (filters[key]) {
        if (key === "release_year") {
          query[key] = parseInt(filters[key], 10); // Convert release_year to an integer
        } else {
          query[key] = { $regex: new RegExp(filters[key], "i") }; // Case-insensitive regex search
        }
      }
    }

    console.log("Query:", query); // Log the query for debugging

    const albums = await db.collection("top20").find(query).toArray();

    if (albums.length === 0) {
      return res.status(404).json({ message: "No albums found" });
    }

    res.status(200).json({
      status: "success",
      data: albums,
    });
  } catch (error) {
    console.error("Error fetching albums:", error); // Log the error
    res.status(500).json({ message: error.message });
  }
};


exports.getSingleAlbumList = (req, res) => {
  const id = new ObjectId(req.params.id);
  db.collection("top20")
    .findOne({ _id: id })
    .then((album) => {
      if (album === null)
        return res.status(404).json({ message: "ALBUM not found" });
      res.status(200).json(album);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.createAlbum = async (req, res) => {
  try {
    const { album_Cover, album_name, artist_name, best_song, release_year } =
      req.body;
    const newAlbum = new Album({
      album_Cover,
      album_name,
      artist_name,
      best_song,
      release_year,
    });

    await newAlbum.save();
    res.status(201).json({ message: "Album added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAlbumList = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Received ID:", id); // Log received ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const { album_Cover, album_name, artist_name, best_song, release_year } =
      req.body;
    const updatedAlbum = await Album.findByIdAndUpdate(
      id,
      {
        album_Cover,
        album_name,
        artist_name,
        best_song,
        release_year,
      },
      { new: true }
    );

    if (!updatedAlbum) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.status(200).json({ message: "Album updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAlbumList = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Received ID:", id); // Log received ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const deletedAlbum = await Album.findByIdAndDelete(id);

    if (!deletedAlbum) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.status(200).json({ message: "Album deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
