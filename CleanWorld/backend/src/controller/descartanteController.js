const descartanteService = require('../service/descartanteService.js');

async function getAllDescartante(req, res) {
    try{
        const rows = await descartanteService.getAllDescartante();
        
        res.status(200).json(rows);
    }catch (error) {
        res.status(500).send({
            message: "Error getting descartante",
            body: error.message,
        });
    }
}

async function createDescartante(req, res){
    const{qtd_vol, tam_vol, data_coleta, horario_coleta, id_usuario} = req.body;
    try{
        await descartanteService.createDescartante(qtd_vol, tam_vol, data_coleta, horario_coleta, id_usuario);
        
        res.status(201).json({message:"Sucess"});
    }catch(error){
        res.status(500).send({
            message:"Error adding descartante!",
            error: error.message,
        });
    }
}

async function updateDescartante(req, res){
    try{
        const {id} = req.params;
        const {qtd_vol, tam_vol, data_coleta, horario_coleta, id_usuario} = req.body

        await descartanteService.updateDescartante(qtd_vol, tam_vol, data_coleta, horario_coleta, id_usuario, id);

        res.status(201).json({message:"Sucess"})
    }catch(error){
        res.status(500).send({
            message: "Error updating descartante!",
            body: error.message,
        })

    }
}

async function deleteDescartante(req, res){
    try{
        const {id} = req.params

        await descartanteService.deleteDescartante(id);

        res.status(201).json({message: "Sucess"})
    }catch(error){
        res.status(500).send({
            message: "Error updating Descartante",
            body: error.message,
        })
    }    
}

async function getDescartanteById(req, res){
    try{
        const {id} = req.params                
        const descartante = await descartanteService.getDescartanteById(id);

        res.status(200).json(descartante)
    }catch(error){
        res.status(500).send({
            message: "Error updating Descartante",
            body: error.message,
        })
    }
}

module.exports = { 
    getAllDescartante,
    createDescartante,
    updateDescartante,
    deleteDescartante,
    getDescartanteById, 
};
    