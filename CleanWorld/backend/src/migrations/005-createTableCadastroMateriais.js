const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function createTableCadastroMateriais(){

    try{
    const connection = await mysql.createConnection(databaseConfig);

    await connection.query(`USE ${databaseConfig.database}`);

    await connection.query(`CREATE TABLE IF NOT EXISTS cadastroMateriais(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        descricaoMaterial VARCHAR(255) NOT NULL,
        qtdVolumes INT NOT NULL,
        dataColeta VARCHAR(255) NOT NULL,
        tamanhoVolume VARCHAR(255) NOT NULL,
        horarioColeta VARCHAR(255) NOT NULL);`);
    await connection.end();
    console.log(`Table cadastroMateriais created`);

    }catch(error){
        console.log(`Error creating table: ${error}`);
    }
};

createTableCadastroMateriais();