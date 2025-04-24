const registerOrderService = require("../service/registerOrderService.js");

async function getAllRegisterOrder(req, res) {
  try {
    const rows = await registerOrderService.getAllRegisterOrder();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send({
      message: "error getting RegisterOrders",
      body: error.message,
    });
  }
}

async function createRegisterOrder(req, res) {
  const { quantityVolume, volumeSize, collectionDate, collectionTime, address, materialDescription, status, idUser, idCollector } = req.body;

  try {
    await registerOrderService.createRegisterOrder(
        quantityVolume,
        volumeSize,
        collectionDate,
        collectionTime,
        address,
        materialDescription,
        status,
        idUser,
        idCollector
    );
    res.status(201).json({ message: "Sucess" });
  } catch (error) {
    res.status(500).send({
      message: "Error adding RegisterOrder! ",
      body: error.message,
    });
  }
}

async function updateRegisterOrder(req, res) {
  try {
    const { idRegisterOrder } = req.params;
    const { quantityVolume, volumeSize, collectionDate, address, collectionTime, materialDescription, status, idUser, idCollector } = req.body;

    await registerOrderService.updateRegisterOrder( idRegisterOrder, quantityVolume, volumeSize, collectionDate, collectionTime, address, materialDescription, status, idUser, idCollector);
    res.status(201).json({message: "Sucess"});
  } catch (error) {
    res.status(500).send({
      message: "Error updating RegisterOrder!",
      body: error.message,
    });
  }
}

async function deleteRegisterOrder(req, res) {
  try {
    const { idRegisterOrder } = req.params;

    if (!idRegisterOrder || isNaN(idRegisterOrder)) {
      return res.status(400).send({ message: "Invalid RegisterOrder ID!" });
    }
    await registerOrderService.deleteRegisterOrder(idRegisterOrder);
    res.status(200).json({ message: "Sucess" });
  } catch (error) {
    res.status(500).send({
      message: "Error delete RegisterOrder!",
      body: error.message,
    });
  }
}

      async function getAllRegisterOrderById(req, res) {
  try {
    const { idRegisterOrder } = req.params;
    const RegisterOrder = await registerOrderService.getAllRegisterOrderById(idRegisterOrder);

    res.status(200).json(RegisterOrder);
  } catch (error) {
    res.status(500).send({
      message: "Error getting RegisterOrder!",
      body: error.message,
    });
  }
}


module.exports = {
  getAllRegisterOrder,
  createRegisterOrder,
  updateRegisterOrder,
  deleteRegisterOrder,
  getAllRegisterOrderById
};
