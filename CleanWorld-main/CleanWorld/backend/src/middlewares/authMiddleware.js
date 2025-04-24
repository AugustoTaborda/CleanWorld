const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken (req, res, next) {

  console.log("verificando")
  const tokenHeader = req.headers["authorization"];
  const token = tokenHeader && tokenHeader.split(" ")[1];

  try{
    console.log("verificado em olha seu token ai: ", token)
    jwt.verify(token, JWT_SECRET);
    next();

  }catch(error) {
    res.status(400).json({msg: "Token inválido!"})
  }
}

module.exports = {authenticateToken}