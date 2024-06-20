const express = require("express");
const router = express.Router();
const descartanteController = require("../controller/descartanteController");

router.get("/descartante", descartanteController.getAllDescartante);
router.post("/descartante", descartanteController.createDescartante);
router.put("/descartante/:id", descartanteController.updateDescartante);
router.delete("/descartante/:id", descartanteController.deleteDescartante);
router.get("/descartante/:id", descartanteController.getDescartanteById);

module.exports=router;