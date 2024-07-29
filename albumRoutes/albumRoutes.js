const express = require("express");
const albumController = require("../controllers/albumControllers");

const router = express.Router();

router.get("/albums", albumController.getalbumsLists);
router.get("/albums/search", albumController.getAlbumByCriteria);
router.get("/albums/:id", albumController.getSingleAlbumList)
router.post("/albums", albumController.createAlbum);
router.put("/albums/:id", albumController.updateAlbumList);
router.delete("/albums/:id", albumController.deleteAlbumList);

module.exports = router;
