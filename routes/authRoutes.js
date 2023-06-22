const router = require("express").Router();
const {
  registerController,
  loginController,
} = require("../controllers/authController");

// CADASTRO E LOGIN DE USUÁRIO.
router
  .get("/", (req, res) => {
    console.log("oi");
    res.json({ msg: "deu certo mano" });
  })
  .post("/register", registerController)
  .post("/login", loginController);

module.exports = router;
