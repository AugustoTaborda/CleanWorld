const freteiroService = require('../service/freteiroService.js');

async function getAllFreteiro(req, res){
    try{
        const rows = await freteiroService.getAllFreteiro();
        res.status(200).json(rows);
    }catch(error){
        res.status(500).send({
            message: "Error getting freteiro!",
            body: error.message,
        });
    }
}

async function createFreteiro(req, res){
    const {distancia, tipoColeta, peso, nomeCarro, modeloCarro, placaCarro, id_usuario} = req.body;
    try{
        await freteiroService.createFreteiro(distancia, tipoColeta, peso, nomeCarro, modeloCarro, placaCarro, id_usuario);

        res.status(201).json({message: "Sucess"});
    }catch(error){
        res.status(500).send({
            message: "Error adding freteiro!",
            error: error.message,
        });
    }
}

async function updateFreteiro(req, res){
    try{
        const {id} = req.params;
        const {distancia, tipoColeta, peso, nomeCarro, modeloCarro, placaCarro, id_usuario} = req.body;

        await freteiroService.updateFreteiro(distancia, tipoColeta, peso, nomeCarro, modeloCarro, placaCarro, id_usuario, id);

        res.status(200).json("Sucess")
    }catch(error){
        res.status(500).send({
            message: "Error updating freteiro!",
            body: error.message,
        })
    }
}

async function deleteFreteiro(req, res){
    try{
        const {id} = req.params;
        await freteiroService.deleteFreteiro(id);

        res.status(201).json({ message: "Sucess" });
    }catch(error){
        res.status(500).send({
            message: "Error updating freteiro!",
            body: error.message,
        })
    }
}

async function getFreteiroById(req, res){
    try{
        const {id} = req.params;
        const freteiro = await freteiroService.getFreteiroById(id);

        res.status(200).json(freteiro);
    } catch (error) {
        res.status(500).send({
            message: "Error getting freteiro!",
            body: error.message,
        })
    }
}

module.exports = {
    getAllFreteiro,
    createFreteiro,
    updateFreteiro,
    deleteFreteiro,
    getFreteiroById,
}