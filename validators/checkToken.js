require("dotenv").config();
const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  const { SECRET } = process.env;
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  if (!token) {
    return res.status(401).json({ msg: "Acesso negado!" });
  }
  try {
    decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token invalido" });
  }
}

module.exports = checkToken;
