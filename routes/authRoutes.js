const router = require("express").Router();
const {
  registerController,
  loginController,
} = require("../controllers/authController");

// CADASTRO E LOGIN DE USUÁRIO.
router.post("/register", registerController).post("/login", loginController);

module.exports = router;
