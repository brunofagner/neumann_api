const mongoose = require("mongoose");

const Pub = mongoose.model("Pub", {
  titulo: String,
  conteudo: String,
  autor: String,
  date: Date,
});

module.exports = Pub;
