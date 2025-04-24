const express = require("express");
const router = express.Router();
const RegisterVehicleController = require("../controller/registerVehicleController");

router.get("/registerVehicle", RegisterVehicleController.getAllRegisterVehicle);

router.post("/registerVehicle", RegisterVehicleController.createRegisterVehicle);

router.delete("/registerVehicle/:idRegisterVehicle", RegisterVehicleController.deleteRegisterVehicle);

router.put("/registerVehicle/:idRegisterVehicle", RegisterVehicleController.updateRegisterVehicle);

router.get("/registerVehicle/:idRegisterVehicle", RegisterVehicleController.getAllRegisterVehicleById);


module.exports=router;