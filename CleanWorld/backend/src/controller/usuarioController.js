const usuarioService = require("../service/usuarioService.js");

async function getAllUsuario(req, res) {
  try {
    const rows = await usuarioService.getAllUsuario();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send({
      message: "error getting users",
      body: error.message,
    });
  }
}

async function createUsuario(req, res) {
  const { nome, cpf, endereco, telefone, email, senhaUsuario, tipoCadastro } = req.body;

  try {
    await usuarioService.createUsuario(
      nome,
      cpf,
      endereco,
      telefone,
      email,
      senhaUsuario,
      tipoCadastro
    );

    res.status(201).json({ message: "Sucess" });
  } catch (error) {
    res.status(500).send({
      message: "Error adding user! ",
      body: error.message,
    });
  }
}

async function updateUsuario(req, res) {
  try {
    const { id } = req.params;
    const { nome,cpf,endereco,telefone,email,senhaUsuario,tipoCadastro } = req.body;

    await usuarioService.updateUsuario(nome,cpf,endereco,telefone,email,senhaUsuario,tipoCadastro,id);

    res.status(201).json({message: "Sucess"});
  } catch (error) {
    res.status(500).send({
      message: "Error updating user!",
      body: error.message,
    });
  }
}

async function deleteUsuario(req, res) {
  try {
    const { id } = req.params;
    await usuarioService.deleteUsuario(id);

    res.status(201).json({ message: "Sucess" });
  } catch (error) {
    res.status(500).send({
      message: "Error delete user!",
      body: error.message,
    });
  }
}

async function getUsuarioById(req, res) {
  try {
    const { id } = req.params;
    const usuario = await usuarioService.getUsuarioById(id);

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).send({
      message: "Error getting user!",
      body: error.message,
    });
  }
}

module.exports = {
  getAllUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  getUsuarioById,
};
