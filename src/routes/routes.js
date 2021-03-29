const express = require("express");
const router = express.Router();
const serieController = require("../controllers/serie");
const platformController = require("../controllers/platform");

router.post("/serie", serieController.saveSerie);
router.get("/series", serieController.getSeries);
router.get("/serie/:id", serieController.getSerie);
router.put("/serie/:id", serieController.updateSerie);
router.delete("/serie/:id", serieController.deleteSerie);

router.post("/platform", platformController.savePlatform);
router.get("/platforms", platformController.getPlatforms);
router.get("/platform/:id", platformController.getPlatform);
//router.put("/platform/:id", platformController.updatePlatform);
//router.delete("/platform/:id", platformController.deletePlatform);

module.exports = router;
