const express = require("express");
const router = express.Router();
const freteiroController = require("../controller/freteiroController.js");

router.get("/freteiro", freteiroController.getAllFreteiro);
router.post("/freteiro", freteiroController.createFreteiro);
router.put("/freteiro/:id", freteiroController.updateFreteiro);
router.delete("/freteiro/:id", freteiroController.deleteFreteiro);
router.get("/freteiro/:id", freteiroController.getFreteiroById);

module.exports = router;