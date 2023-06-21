//config inicial
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");

// IMPORTAÇÃO DAS ROTAS.
const personRoutes = require("./routes/personRoutes");
const pubRoutes = require("./routes/pubRoutes");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

// CHECA O TOKEN.
const checkToken = require("./validators/checkToken");

// MONGODB
const { ME_CONFIG_MONGODB_URL, NEUMANN_API_PORT } = process.env;

// MIDDLEWARES
app.use(morgan("tiny"));

// Forma de ler JSON
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/person", checkToken, personRoutes);
app.use("/pub", checkToken, pubRoutes);
app.use("/project", checkToken, projectRoutes);

// CONEXÃO COM O BANCO DE DADOS E INICIALIZAÇÃO DO SERVIDOR.
mongoose
  .connect(ME_CONFIG_MONGODB_URL)
  .then(() => {
    console.log("O servidor foi iniciado!");
    app.listen(NEUMANN_API_PORT);
  })
  .catch((err) => console.log(err));
