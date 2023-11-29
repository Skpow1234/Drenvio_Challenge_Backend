const express = require("express");
const app = express();
const cors = require("cors");
const mainRouter = require("./routes");
const morgan = require("morgan");

app.use(morgan("dev"));
// Utilizar el middleware 'cors' para habilitar CORS
app.use(cors());
// Parser para el cuerpo de la solicitud en formato JSON
app.use(express.json());
// Manejo de rutas no definidas
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
    );
    next();
});
app.use(mainRouter);

module.exports = app;
