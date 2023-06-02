const mongoose = require("mongoose");
const Project = mongoose.model("Project", {
  nome: String,
  descricao: String,
  participantes: [{
      participante: String
  }],
});

module.exports = Project;
