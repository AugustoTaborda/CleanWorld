const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function createTableRegisterOrder(){

    try{
    const connection = await mysql.createConnection(databaseConfig);

    await connection.query(`USE ${databaseConfig.database}`);

    await connection.query(`CREATE TABLE IF NOT EXISTS registerOrder(
        idRegisterOrder INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        quantityVolume INT NOT NULL,
        volumeSize VARCHAR(255) NOT NULL,
        collectionDate DATE NOT NULL,
        collectionTime TIME NOT NULL,
        address VARCHAR(255) NOT NULL,
        materialDescription VARCHAR(100),
        status INT NOT NULL,
        idUser INT NOT NULL,
        idCollector INT NULL,
        FOREIGN KEY (idUser) REFERENCES user(idUser),
        FOREIGN KEY (idCollector) REFERENCES Collector(idCollector)
        )`);
    await connection.end();
    console.log(`Table registerOrder created`);

    }catch(error){
        console.log(`Error creating table: ${error}`);
    }
};

createTableRegisterOrder();