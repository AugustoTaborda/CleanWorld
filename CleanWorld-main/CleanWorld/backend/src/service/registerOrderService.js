const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function getAllRegisterOrder(){
    const connection = await mysql.createConnection(databaseConfig);

    const [rows] = await connection.query(`SELECT
    registerOrder.idregisterOrder,
    registerOrder.quantityVolume,
    registerOrder.volumeSize,
    registerOrder.collectionDate,
    registerOrder.collectionTime,
    registerOrder.address,
    registerOrder.materialDescription,
    registerOrder.status,
    registerOrder.idCollector,
    user.idUser,
    user.name,
    user.cpf,
    user.phone,
    user.birthDate,
    user.userType
    FROM registerOrder
    LEFT JOIN user
    ON registerOrder.iduser = user.iduser`);

    await connection.end();

    return rows;
}

async function createRegisterOrder(quantityVolume, volumeSize, collectionDate, collectionTime, address, materialDescription, status, idUser, idregisterOrder){

    const connection = await mysql.createConnection(databaseConfig);

    const insertRegisterOrder = "INSERT INTO RegisterOrder(quantityVolume, volumeSize, collectionDate, collectionTime, address, materialDescription, status, idUser, idregisterOrder) VALUES (?,?,STR_TO_DATE(?, '%d/%m/%Y'),?,?,?,?,?,?)";

    await connection.query(insertRegisterOrder, [quantityVolume, volumeSize, collectionDate, collectionTime, address,materialDescription, status, idUser, idregisterOrder])

    await connection.end();
}

async function updateRegisterOrder(idRegisterOrder, quantityVolume, volumeSize, collectionDate, collectionTime, address, materialDescription, status, idUser, idCollector){
    const connection = await mysql.createConnection(databaseConfig);
    
    const updateRegisterOrder = "UPDATE RegisterOrder SET quantityVolume = ?, volumeSize = ?, collectionDate = STR_TO_DATE(?, '%d/%m/%Y'), collectionTime = ?, address = ?, materialDescription = ?, status = ?, idUser = ?, idCollector = ? WHERE idRegisterOrder = ?";

    await connection.query(updateRegisterOrder,[ quantityVolume, volumeSize, collectionDate, collectionTime, address,materialDescription, status, idUser, idCollector, idRegisterOrder]);

    await connection.end();
}

async function deleteRegisterOrder(idRegisterOrder) {
    const connection = await mysql.createConnection(databaseConfig); 

    await connection.query("DELETE FROM RegisterOrder WHERE idRegisterOrder = ?", [idRegisterOrder]);

    await connection.end();
}

async function getAllRegisterOrderById(idRegisterOrder){
    
    const connection = await mysql.createConnection(databaseConfig);

    const [coletor] = await connection.query(`SELECT * FROM RegisterOrder WHERE idRegisterOrder = ?`, [idRegisterOrder]);

    await connection.end();
    
    return coletor;
}

module.exports = {
    getAllRegisterOrder,
    createRegisterOrder,
    updateRegisterOrder,
    deleteRegisterOrder,
    getAllRegisterOrderById
};

