const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function createTableCollector(){
    
    try{
        const connection = await mysql.createConnection(databaseConfig);

        await connection.query(`USE ${databaseConfig.database}`);

        await connection.query(`CREATE TABLE IF NOT EXISTS Collector (
            idCollector INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            nameEnterprise VARCHAR(255) NOT NULL,
            cnpj VARCHAR(255) NOT NULL UNIQUE,
            phone VARCHAR(255) NOT NULL,
            userType INT NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            idRegisterVehicle INT,
            FOREIGN KEY (idRegisterVehicle) REFERENCES registerVehicle(idRegisterVehicle)
        )`);

        await connection.end();

        console.log(`Table Collector created !`);
    }catch(error){
        console.log(`Error creating table: ${error}`);
    }
};

createTableCollector();
