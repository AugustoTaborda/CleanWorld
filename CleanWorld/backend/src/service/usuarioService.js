const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function getAllUsuario(){
    const connection = await mysql.createConnection(databaseConfig);

    const [rows] = await connection.query("SELECT * FROM usuario");

    await connection.end();

    return rows;

};

async function createUsuario(nome,cpf,endereco,telefone,email,senhaUsuario,tipoCadastro){
    const connection = await mysql.createConnection(databaseConfig);

    const insertUsuario = "insert into usuario(nome,cpf,endereco,telefone,email,senhaUsuario,tipocadastro) values (?,?,?,?,?,?,?)";

    await connection.query(insertUsuario,[nome,cpf,endereco,telefone,email,senhaUsuario,tipoCadastro])

    await connection.end();
}


async function updateUsuario(id,nome,cpf,endereco,telefone,email,senhaUsuario,tipoCadastro){
    
    const connection = await mysql.createConnection(databaseConfig);  
    
    const updateUsuario = "UPDATE usuario SET nome = ?, cpf = ?, endereco = ?, telefone = ?, email = ? , senhaUsuario = ?, tipoCadastro = ? where id = ?";
    
    await connection.query(updateUsuario,[id, nome,cpf,endereco,telefone,email,senhaUsuario,tipoCadastro])
    
    await connection.end();

};

async function deleteUsuario(id){
    const connection = await mysql.createConnection(databaseConfig);

    await connection.query("DELETE FROM usuario WHERE id = ?", [id])

    await connection.end();
}

async function getUsuarioById(id){
    const connection = await mysql.createConnection(databaseConfig);

    const [usuario] = await connection.query("SELECT * FROM usuario WHERE id = ?", [id]);

    await connection.end();

    return usuario;
}

module.exports = {
    getAllUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuarioById
};