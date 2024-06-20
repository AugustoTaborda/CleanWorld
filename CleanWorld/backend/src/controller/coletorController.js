const coletorService = require('../service/coletorService.js');

async function getAllcoletor(req, res){
    try{
        const rows = await coletorService.getAllColetor();
        res.status(200).json(rows);
    }catch(error){
        res.status(500).send({
            message: "Error getting coletor",
            body: error.message,
        });
    }
}

async function createcoletor(req, res){
    const{id, tipoColetor, peso, id_usuario} = req.body;
    try{
        await coletorService.createColetor(id, tipoColetor, peso, id_usuario);
        res.status(201).json({message:"Sucess"});
    }catch(error){
        res.status(500).send({
            message:"Error adding user!",
            error: error.message
        });
    }
}

async function updatecoletor(req, res){
    try{
        const {id}=req.params;
        const {tipoColetor, peso, id_usuario} = req.params;
        await coletorService.updateColetor(id, tipoColetor, peso, id_usuario);
        res.status(201).json({message: "Sucess"});    
    }catch(error){
        res.status(500).send({
            message: "Error updating coletor",
            body: error.message,
        })
    }
}

async function deleteColetor(req, res){
    try{
        const {id} = req.params;

        await coletorService.deleteColetor(id);

        res.status(201).json({ message: "Sucess" });
    }catch(error){
        res.status(500).send({
            message: "Error updating coletor",
            body: error.message,
        })
    }
}

async function getColetorById(req, res){
    try{
        const {id} = req.params;

        const coletor = await coletorService.getAllColetorById(id);

        res.status(200).json(coletor);
    }catch(error){
        res.status(500).send({
            message: "Error updating coletor",
            body: error.message,
        })
    }
}


module.exports = {
    getAllcoletor,
    createcoletor,
    updatecoletor,
    deleteColetor,
    getColetorById,
}