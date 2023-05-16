const { checkSchema } = require("express-validator");

module.exports = {
  editInfo: checkSchema({
    titulo: {
      trim: true,
      isLength: {
        options: { min: 2 },
      },
      errorMensage: "Pelo menos 2 caracteres",
    },

    conteudo: {
      trim: true,
      isLength: {
        options: { min: 10 },
      },
      errorMensage: "Pelo menos 10 caracteres",
    },
  }),
};
