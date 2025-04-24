const userService = require("../service/userService.js");
const jwt = require("jsonwebtoken");
const SECRET = 'Hoisjda9hyg2872ijsadlOOOCleanWorld'

async function getAllUser(req, res) {
  try {
    const rows = await userService.getAllUser();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send({
      message: "error getting users",
      body: error.message,
    });
  }
}

async function createUser(req, res) {
  const { name, cpf, phone, birthDate, userType, email, password } = req.body;

  try {
    
    if(userType != 0 && userType != 1) {
        return res.status(400).json({ message: "Invalid userType! Must be 0 or 1. " })
    }

    await userService.createUser(
      name,
      cpf,
      phone,
      birthDate,
      userType,
      email,
      password
    );

    res.status(201).json({ message: "Sucess" });
  } catch (error) {
    res.status(500).send({
      message: "Error adding user! ",
      body: error.message,
    });
  }
}

async function updateUser(req, res) {
  try {
    const { idUser } = req.params;
    const { name, cpf, phone, birthDate, email, password } = req.body;

    await userService.updateUser(idUser, name, cpf, phone, birthDate, email, password);

    

    res.status(201).json({message: "Sucess"});
  } catch (error) {
    res.status(500).send({
      message: "Error updating user!",
      body: error.message,
    });
  }
}

async function deleteUser(req, res) {
  try {
    const { idUser } = req.params;

    if (!idUser || isNaN(idUser)) {
      return res.status(400).send({ message: "Invalid user ID!" });
    }

    await userService.deleteUser(idUser);

    res.status(200).json({ message: "Sucess" });
  } catch (error) {
    res.status(500).send({
      message: "Error delete user!",
      body: error.message,
    });
  }
}

async function getUserById(req, res) {
  try {
    const { idUser } = req.params;
    const user = await userService.getUserById(idUser);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({
      message: "Error getting user!",
      body: error.message,
    });
  }
}


const rotaOK = async (req, res) => {
  console.log("testando a rota")
  res.status(200).json({ message: "deu boa" })
}


module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  getUserById
};
