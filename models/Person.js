const mongoose = require("mongoose");

const Person = mongoose.model("Person", {
  nome: String,
  email: String,
  senha: String,
  professor: Boolean,
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = Person;
