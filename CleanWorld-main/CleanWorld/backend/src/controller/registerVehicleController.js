const registerVehicleService = require('../service/registerVehicleService')
const jwt = require("jsonwebtoken");
const SECRET = 'Hoisjda9hyg2872ijsadlOOOCleanWorld'

async function getAllRegisterVehicle(req, res) {
  try {
    const rows = await registerVehicleService.getAllRegisterVehicle();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send({
      message: "error getting RegisterVehicles",
      body: error.message,
    });
  }
}

async function createRegisterVehicle(req, res) {
  // Desestrutura os dados enviados no corpo da requisição
  const { volumeSize, carBrand, carModel, carLicensePlate, maximumWeight } = req.body;

  try {
    // Chama o serviço que registra o veículo e aguarda o retorno do ID do novo registro
    const newVehicleId = await registerVehicleService.createRegisterVehicle(
        volumeSize,
        carBrand,
        carModel,
        carLicensePlate,
        maximumWeight
    );
    
    // Retorna uma resposta de sucesso com o ID do registro criado
    res.status(201).json({
      message: "Veículo registrado com sucesso", 
      idRegisterVehicle: newVehicleId
    });

  } catch (error) {
    // Caso ocorra um erro, retorna uma resposta de erro com detalhes
    console.error("Erro ao tentar registrar veículo:", error);  // Log do erro no servidor para depuração

    // Envia uma resposta de erro para o cliente com status 500 (erro interno)
    res.status(500).json({
      message: "Erro ao adicionar veículo.",
      error: error.message // Retorna a mensagem do erro gerado na função de serviço
    });
  }
}

async function updateRegisterVehicle(req, res) {
  try {
    const { idRegisterVehicle } = req.params;
    const { volumeSize, carBrand, carModel, carLicensePlate, maximumWeight } = req.body;

    await registerVehicleService.updateRegisterVehicle(idRegisterVehicle, volumeSize, carBrand, carModel, carLicensePlate, maximumWeight);
    res.status(201).json({message: "Sucess"});
  } catch (error) {
    res.status(500).send({
      message: "Error updating RegisterVehicle!",
      body: error.message,
    });
  }
}

async function deleteRegisterVehicle(req, res) {
  try {
    const { idRegisterVehicle } = req.params;

    if (!idRegisterVehicle || isNaN(idRegisterVehicle)) {
      return res.status(400).send({ message: "Invalid RegisterVehicle ID!" });
    }
    await registerVehicleService.deleteRegisterVehicle(idRegisterVehicle);
    res.status(200).json({ message: "Sucess" });
  } catch (error) {
    res.status(500).send({
      message: "Error delete RegisterVehicle!",
      body: error.message,
    });
  }
}

      async function getAllRegisterVehicleById(req, res) {
  try {
    const { idRegisterVehicle } = req.params;
    const registerVehicle = await registerVehicleService.getAllRegisterVehicleById(idRegisterVehicle);

    res.status(200).json(registerVehicle);
  } catch (error) {
    res.status(500).send({
      message: "Error getting RegisterVehicle!",
      body: error.message,
    });
  }
}


module.exports = {
  getAllRegisterVehicle,
  createRegisterVehicle,
  updateRegisterVehicle,
  deleteRegisterVehicle,
  getAllRegisterVehicleById
};
