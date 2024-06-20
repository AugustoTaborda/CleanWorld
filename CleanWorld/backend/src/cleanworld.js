const express = require("express");
const bodyParser = require("body-parser");
const freteiroRouter = require("./router/freteiroRouter");
const usuarioRouter = require("./router/usuarioRouter");
const coletorRouter = require("./router/coletorRouter");
const descartanteRouter = require("./router/descartanteRouter");
const cors = require("cors");


const port = 3006;
const cleanworld = express();

cleanworld.use(cors());
cleanworld.use(bodyParser.json("application/json")) 

cleanworld.get("/", (req, res) => {
    res.send("<h1> CleanWorld <h1>");
})

cleanworld.use("/api", freteiroRouter);

cleanworld.use("/api", usuarioRouter);

cleanworld.use("/api", coletorRouter);

cleanworld.use("/api", descartanteRouter);



cleanworld.listen(port, () => {
    console.log(`Servidor rodando: http://localhost:${port}`);
});
