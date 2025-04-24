const createTableUser = require("../migrations/002-createTableUser");
const createTableCollector = require("./003-createTableCollector");
const createTableRegisterOrder = require("./005-createTableRegisterOrder");
const createTableRegisterVehicle = require("../migrations/006-createTableRegisterVehicle")

async function createAllTables() {
    await createTableUser();
    await createTableRegisterVehicle();
    await createTableCollector();
    await createTableRegisterOrder();
}

createAllTables().then(() => {
    console.log("Todas as tabelas foram criadas com sucesso!");
}).catch((error) => {
    console.error("Erro ao criar tabelas:", error);
});