const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function createTableFreteiro(){
    try{
        const connection = await mysql.createConnection(databaseConfig);

        await connection.query(`USE ${databaseConfig.database}`);
        await connection.query(`Create table if not exists freteiro(
            id int not null auto_increment primary key,
            distancia VARCHAR(255) NOT NULL,
            tipoColeta VARCHAR(255) NOT NULL,
            peso VARCHAR(255) NOT NULL,
            nomeCarro VARCHAR(255) NOT NULL,
            modeloCarro VARCHAR(255) NOT NULL,
            placaCarro VARCHAR(255) NOT NULL,
            id_usuario INT,
            FOREIGN KEY (id_usuario) REFERENCES usuario(id)
        )`);

        await connection.end();

        console.log(`Table Freteiro created !`);
    }catch(error){
        console.log(`Error creating table freteiro: ${error}`);
    }
}

createTableFreteiro();
