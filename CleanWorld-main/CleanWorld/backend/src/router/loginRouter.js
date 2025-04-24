const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.post("/login", loginController.validateLogin);

router.get("/main", authMiddleware.authenticateToken, (req, res) => {
  console.log("Parabéns, você acessou e está autenticado!");
  res.status(200).json({ msg: "Você está autenticado!", user: req.user });
});

module.exports = router;
