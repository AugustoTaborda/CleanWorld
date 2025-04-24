const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./router/userRouter");
const collectorRouter = require("./router/collectorRouter");
const loginRouter = require("./router/loginRouter");
const registerOrderRouter = require("./router/registerOrderRouter");
const registerVehicleRouter = require("./router/registerVehicleRouter");
const cors = require("cors");

const port = 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json("application/json")) 

app.get("/", (req, res) => {
    res.send("<h1> CleanWorld <h1>");
})

app.use("/api", userRouter);
app.use("/api", collectorRouter);
app.use("/api", loginRouter);
app.use("/api", registerOrderRouter);
app.use("/api", registerVehicleRouter);

app.listen(port, () => {
    console.log(`Servidor rodando: http://localhost:${port}`);
});
