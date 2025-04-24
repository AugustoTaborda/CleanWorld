const mysql = require("mysql2/promise");
const databaseconfig = require("../config/database.js");

async function createTableUser() {
try{

    const connection = await mysql.createConnection(databaseconfig);

    await connection.query(`USE ${databaseconfig.database}`);

    await connection.query(`CREATE TABLE IF NOT EXISTS user (
        idUser INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        cpf VARCHAR(100) NOT NULL unique,
        phone VARCHAR(100) NOT NULL,
        birthDate DATE NOT NULL,
        userType INT,
        email VARCHAR(100) NOT NULL unique,
        password VARCHAR(100) NOT NULL 
    )`);

    await connection.end();
    
    console.log(`Table user created!`);
    }  catch(error) {
        console.log(`Error creating table: ${error}`);
    }
}

createTableUser();
