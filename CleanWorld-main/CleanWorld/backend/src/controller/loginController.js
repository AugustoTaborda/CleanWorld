const loginService = require("../service/loginService.js");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
 
async function validateLogin(req, res) {

  try {
    const {email, password} = req.body;
    const validatedUser = await loginService.validateLogin(email, password);
    const idUser = validatedUser[0].idUser
    const userType = validatedUser[0].userType
    const token = jwt.sign({ idUser, userType}, JWT_SECRET);
    res.status(200).json({ auth: true, token, userType, idUser});
  } catch (error) {
    res.status(401).send({
      message: "Error getting user!",
      body: error.message,
    })
  }
}
  
  const routeConfirmation = async (req, res) => {
    console.log("testando a rota...")
    res.status(200).json({ message: "Welcome" })
  }

  module.exports = {
    validateLogin,
    routeConfirmation
  }

 