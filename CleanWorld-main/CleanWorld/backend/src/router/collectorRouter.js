const express = require("express");
const router = express.Router();
const collectorController = require("../controller/collectorController.js");

router.get("/collector", collectorController.getAllCollector);
router.post("/collector", collectorController.createCollector);
router.post("/collector/login", collectorController.validateLogin);
router.put("/collector/:idCollector", collectorController.updateCollector);
router.delete("/collector/:idCollector", collectorController.deleteCollector);
router.get("/collector/:idCollector", collectorController.getCollectorById);

module.exports = router;