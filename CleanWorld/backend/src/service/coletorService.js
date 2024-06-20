const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");


async function getAllColetor(){
    
    const connection = await mysql.createConnection(databaseConfig);

    const [rows] = await connection.query(`select
    id_usuario,
    nome,
    cpf,
    endereco,
    telefone,
    email,
    senhaUsuario,
    tipoColetor, 
    peso
    from coletor
    INNER JOIN USUARIO
    ON coletor.id_usuario = USUARIO.id`);

    await connection.end();

    return rows;
}

async function createColetor(id, tipoColetor, peso, id_usuario){
    
    const connection = await mysql.createConnection(databaseConfig);

    const insertcoletor = "insert into coletor(id, tipoColetor, peso, id_usuario) values (?,?,?,?)";

    await connection.query(insertcoletor, [id, tipoColetor, peso, id_usuario])

    await connection.end();
}

async function updateColetor(id, tipoColetor, peso, id_usuario){
    
    const connection = await mysql.createConnection(databaseConfig);

    const updatecoletor = "UPDATE coletor SET tipoColetor = ?, peso = ?, id_usuario = ? where id = ?";

    await connection.query(updatecoletor,[id, tipoColetor, peso, id_usuario]);

    await connection.end();
}

async function deleteColetor (id){
    
    const connection = await mysql.createConnection(databaseConfig);

    await connection.query("DELETE FROM coletor WHERE id = ?", [id])

    await connection.end();
}

async function getAllColetorById(id){
    
    const connection = await mysql.createConnection(databaseConfig);

    

    const [coletor] = await connection.query(`select
    id_usuario,
    nome,
    cpf,
    endereco,
    telefone,
    email,
    senhaUsuario,
    tipoColetor, 
    peso
    from coletor
    INNER JOIN USUARIO
    ON coletor.id_usuario = USUARIO.id WHERE coletor.id = ?`, [id]);

    await connection.end();
    
    return coletor;
}


module.exports = {
    getAllColetor,
    createColetor,
    updateColetor,
    deleteColetor,
    getAllColetorById,
};

