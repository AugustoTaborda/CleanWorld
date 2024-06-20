const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function createTableDescartante(){
    try{
    const connection = await mysql.createConnection(databaseConfig);

    await connection.query(`USE ${databaseConfig.database}`);

    await connection.query(`CREATE TABLE IF NOT EXISTS descartante(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        qtd_vol int not null,
        tam_vol varchar(255) not null,
        data_coleta varchar(255)not null,
        horario_coleta varchar(255) not null,
        id_usuario int,
        FOREIGN KEY (id_usuario) REFERENCES usuario(id)
    )`);

    await connection.end();
    console.log(`Table Descartante created!`);

} catch(error){
    console.log(`Error creating table: ${error}`);
}
};

createTableDescartante();