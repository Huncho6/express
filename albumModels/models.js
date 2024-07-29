const mongoose = require("mongoose");

const { Schema } = mongoose;

const albumsSchema = new Schema({
  album_name: {
    type: String,
    required: true,
  },
  release_year: {
    type: Number,
    required: true,
    validate: (v) => v > 1990 && v < 2024,
  },
  artist_name: {
    type: String,
    required: true,
  },
  best_song: {
    type: String,
    required: true,
  },
  album_Cover: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("albums", albumsSchema);
