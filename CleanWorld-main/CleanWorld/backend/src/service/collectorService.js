const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");
const bcrypt = require("bcrypt");


async function getAllCollector(){
    const connection = await mysql.createConnection(databaseConfig);

    const [rows] = await connection.query(`SELECT
    collector.idCollector,
    collector.nameEnterprise,
    collector.cnpj,
    collector.phone,
    collector.userType,
    collector.email,
    collector.password,
    registerVehicle.idRegisterVehicle,
    registerVehicle.volumeSize,
    registerVehicle.carBrand,
    registerVehicle.carModel,
    registerVehicle.carLicensePlate,
    registerVehicle.maximumWeight
    FROM collector
    LEFT JOIN registerVehicle
    ON collector.idRegisterVehicle = registerVehicle.idRegisterVehicle`);
    await connection.end();
    return rows;
}

async function createCollector(nameEnterprise, cnpj, phone, userType, email, password){
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const connection = await mysql.createConnection(databaseConfig);

    const insertcollector = "INSERT INTO collector(nameEnterprise, cnpj, phone ,userType, email, password) values (?,?,?,?,?,?)";

    await connection.query(insertcollector, [nameEnterprise, cnpj, phone,userType, email, passwordHash])
    await connection.end();
}

async function updateCollector(idCollector,nameEnterprise, cnpj, phone,userType, email, password, idRegisterVehicle){
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const connection = await mysql.createConnection(databaseConfig);

    const updateCollector = "UPDATE collector SET nameEnterprise = ?,cnpj = ?, phone = ?,userType = ?, email = ?, password = ?, idRegisterVehicle = ? WHERE idCollector = ?";

    await connection.query(updateCollector,[nameEnterprise, cnpj, phone,userType, email, passwordHash , idRegisterVehicle, idCollector]);

    await connection.end();
}

async function deleteColetor (idCollector){
    
    const connection = await mysql.createConnection(databaseConfig);

    await connection.query("DELETE FROM coletor WHERE id = ?", [idCollector])

    await connection.end();
}

async function getAllColetorById(idCollector){
    
    const connection = await mysql.createConnection(databaseConfig);

    const [coletor] = await connection.query(`SELECT
    collector.idCollector,
    collector.nameEnterprise,
    collector.cnpj,
    collector.phone,
    collector.userType,
    collector.email,
    collector.password,
    registerVehicle.idRegisterVehicle,
    registerVehicle.volumeSize,
    registerVehicle.carBrand,
    registerVehicle.carModel,
    registerVehicle.carLicensePlate,
    registerVehicle.maximumWeight
    FROM collector
    LEFT JOIN registerVehicle
    ON collector.idRegisterVehicle = registerVehicle.idRegisterVehicle WHERE idCollector = ?`, [idCollector]);

    coletor.password

    await connection.end();
    
    return coletor;
}

async function validateLogin(email, password) {
    const connection = await mysql.createConnection(databaseConfig);
    const [collector] = await connection.query("SELECT * FROM collector WHERE email = ?", [email]);   

    if (collector.length === 0) {
        await connection.end(); 
        return null;
    }

    const isPasswordValid = await bcrypt.compare(password, collector[0].password);
    await connection.end();

    if (isPasswordValid) {
        return collector;
    } else {
        return null;
    }
}


module.exports = {
    getAllCollector,
    createCollector,
    updateCollector,
    deleteColetor,
    getAllColetorById,
    validateLogin
};

