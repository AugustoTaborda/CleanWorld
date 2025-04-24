const collectorService = require('../service/collectorService.js');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

async function getAllCollector(req, res){
    try{
        const rows = await collectorService.getAllCollector();
        res.status(200).json(rows);
    }catch(error){
        res.status(500).send({
            message: "Error getting coletor",
            body: error.message,
        });
    }
}

async function createCollector(req, res){
    const{nameEnterprise, cnpj, phone, userType, email, password} = req.body;
    try{
        await collectorService.createCollector(nameEnterprise, cnpj, phone, userType, email, password);
        res.status(201).json({message:"Sucess"});
    }catch(error){
        res.status(500).send({
            message:"Error adding user!",
            error: error.message
        });
    }
}

async function updateCollector(req, res){
    try{
        const {idCollector}=req.params;
        const {nameEnterprise, cnpj, phone,userType, email, password, idRegisterVehicle} = req.body;

        await collectorService.updateCollector(idCollector, nameEnterprise, cnpj, phone,userType, email, password, idRegisterVehicle);
        
        res.status(201).json({message: "Sucess"});    
    }catch(error){
        res.status(500).send({
            message: "Error updating coletor",
            body: error.message,
        })
    }
}

async function deleteCollector(req, res){
    try{
        const {idCollector} = req.params;

        await collectorService.deleteCollector(idCollector);

        res.status(201).json({ message: "Sucess" });
    }catch(error){
        res.status(500).send({
            message: "Error updating coletor",
            body: error.message,
        })
    }
}

async function getCollectorById(req, res){
    try{
        const {idCollector} = req.params;

        const coletor = await collectorService.getAllColetorById(idCollector);

        res.status(200).json(coletor);
    }catch(error){
        res.status(500).send({
            message: "Error updating coletor",
            body: error.message,
        })
    }
}

async function validateLogin(req, res) {

    try {
      const {email, password} = req.body;
      const validatedCollector = await collectorService.validateLogin(email, password);
      const idCollector = validatedCollector[0].idCollector
      const userType = validatedCollector[0].userType
      const token = jwt.sign({ idCollector, userType}, JWT_SECRET);
      res.status(200).json({ auth: true, token, userType, idCollector});
    } catch (error) {
      res.status(401).send({
        message: "Error getting user!",
        body: error.message,
      })
    }
  }


module.exports = {
    getAllCollector,
    createCollector,
    updateCollector,
    deleteCollector,
    getCollectorById,
    validateLogin
}