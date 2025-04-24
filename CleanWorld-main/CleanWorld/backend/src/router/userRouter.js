const express = require("express");
const router = express.Router();
const userController = require("../controller/userController.js");

router.get("/user", userController.getAllUser);
router.post("/user", userController.createUser);
router.delete("/user/:idUser", userController.deleteUser);
router.put("/user/:idUser", userController.updateUser);
router.get("/user/:idUser", userController.getUserById);


module.exports=router;