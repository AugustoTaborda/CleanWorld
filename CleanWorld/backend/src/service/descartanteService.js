const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function getAllDescartante(){

    const connection = await mysql.createConnection(databaseConfig);

    const [rows] = await connection.query(`select
    id_usuario,
    nome,
    cpf,
    endereco,
    telefone,
    email,
    qtd_vol, 
    tam_vol,
    data_coleta,
    horario_coleta
    from descartante
    INNER JOIN USUARIO
    ON descartante.id_usuario = USUARIO.id`);

    await connection.end();

    return rows;
};

async function createDescartante(qtd_vol, tam_vol, data_coleta, horario_coleta, id_usuario){
    const connection = await mysql.createConnection(databaseConfig);

    const insertDescartante = "insert into descartante(qtd_vol, tam_vol, data_coleta, horario_coleta, id_usuario) values (?,?,?,?,?)";

    await connection.query(insertDescartante, [qtd_vol, tam_vol, data_coleta, horario_coleta, id_usuario])

    await connection.end();
}


async function updateDescartante(id, qtd_vol, tam_vol, data_coleta, horario_coleta, id_usuario){
    const connection = await mysql.createConnection(databaseConfig);

    const update = (`UPDATE Descartante SET qtd_vol = ?, tam_vol = ?, data_coleta = ?, horario_coleta = ?, id_usuario = ? where id = ?`);

    await connection.query(update,[id, qtd_vol, tam_vol, data_coleta, horario_coleta, id_usuario]);

    await connection.end();
};

async function deleteDescartante(id) {
    const connection = await mysql.createConnection(databaseConfig);

    await connection.query("DELETE FROM descartante WHERE id = ?", [id]);

    await connection.end();
}

async function getDescartanteById(id){
    
    const connection = await mysql.createConnection(databaseConfig);

    const [descartante] = await connection.query(`select
    id_usuario,
    nome,
    cpf,
    endereco,
    telefone,
    email,
    qtd_vol, 
    tam_vol,
    data_coleta,
    horario_coleta
    from descartante
    INNER JOIN USUARIO
    ON descartante.id_usuario = USUARIO.id where descartante.id = ?`, [id]);

    await connection.end();

    return descartante
}

module.exports = { 
getAllDescartante,
createDescartante,
updateDescartante,
deleteDescartante,
getDescartanteById,
};
