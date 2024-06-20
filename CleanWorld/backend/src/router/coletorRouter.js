const express = require("express");
const router = express.Router();
const coletorController = require("../controller/coletorController.js");

router.get("/coletor", coletorController.getAllcoletor);
router.post("/coletor", coletorController.createcoletor);
router.put("/coletor/:id", coletorController.updatecoletor);
router.delete("/coletor/:id", coletorController.deleteColetor);
router.get("/coletor/:id", coletorController.getColetorById);


module.exports = router;