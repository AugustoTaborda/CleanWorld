const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function getAllCadastroMateriais(){
    const connection = await mysql.createConnection(databaseConfig);

    const [rows] = await connection.query("SELECT * FROM cadastroMateriais");

    await connection.end();

    return rows;
}

async function createCadastroMateriais(descricaoMaterial, qtdVolumes, dataColeta, tamanhoVolume, horarioColeta){
    const connection = await mysql.createConnection(databaseConfig);

    const insertCadastroMateriais = "insert into cadastroMateriais(descricaoMaterial, qtdVolumes, dataColeta, tamanhoVolume, horarioColeta) values (?,?,?,?,?)";

    await connection.query(insertCadastroMateriais, [descricaoMaterial, qtdVolumes, dataColeta, tamanhoVolume, horarioColeta])

    await connection.end();
}

async function updateCadastroMateriais(id, descricaoMaterial, qtdVolumes, dataColeta, tamanhoVolume, horarioColeta){
    const connection = await mysql.createConnection(databaseConfig);
    
    const updateCadastroMateriais = "UPDATE cadastroMateriais SET id = ?, descricaoMaterial = ?, qtdVolumes = ?, dataColeta = ?, tamanhoVolume = ?, horarioColeta = where id = ?";

    await connection.query(updateCadastroMateriais,[id, descricaoMaterial, qtdVolumes, dataColeta, tamanhoVolume, horarioColeta]);

    await connection.end();
}

async function deleteCadastroMateriais (id){
    const connection = mysql.createConnection(databaseConfig);

    await connection.query("DELETE FROM cadastroMateriais WHERE id = ?", [id])

    await connection.end();
}

module.exports = {
    getAllCadastroMateriais,
    createCadastroMateriais,
    updateCadastroMateriais,
    deleteCadastroMateriais,
};

