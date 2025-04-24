const express = require("express");
const router = express.Router();
const registerOrderController = require("../controller/registerOrderController.js");

router.get("/registerOrder", registerOrderController.getAllRegisterOrder);
router.get("/registerOrder/:idRegisterOrder", registerOrderController.getAllRegisterOrderById);
router.post("/registerOrder", registerOrderController.createRegisterOrder);
router.put("/registerOrder/:idRegisterOrder", registerOrderController.updateRegisterOrder);
router.delete("/registerOrder/:idRegisterOrder", registerOrderController.deleteRegisterOrder);

module.exports = router;