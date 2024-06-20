const express = require("express");
const router = express.Router();
const cadastroMateriaisController = require("../controller/cadastroMateriaisController.js");

router.get("/cadastroMateriais", cadastroMateriaisController.getAllcadastroMateriais);
router.post("/cadastroMateriais", cadastroMateriaisController.createcadastroMateriais);
router.put("/cadastroMateriais", cadastroMateriaisController.updateCadastroMateriais);
router.delete("/cadastroMateriais", cadastroMateriaisController.deleteCadastroMateriais);
module.exports = router;