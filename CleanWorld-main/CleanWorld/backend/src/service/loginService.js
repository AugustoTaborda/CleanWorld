const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");
const bcrypt = require("bcrypt");

async function validateLogin(email, password) {
    const connection = await mysql.createConnection(databaseConfig);
    const [user] = await connection.query("SELECT * FROM user WHERE email = ?", [email]);   

    if (user.length === 0) {
        await connection.end(); 
        return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    await connection.end();

    if (isPasswordValid) {
        return user;
    } else {
        return null;
    }
}

module.exports = {
    validateLogin
}