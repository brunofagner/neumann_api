//config inicial
require("dotenv").config();
const { SECRET } = process.env;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Person = require("../models/Person");
const nodemailer = require("nodemailer");

async function registerController(req, res) {
  const { nome, email, senha, professor } = req.body;
  //validações
  if (!nome) {
    return res.status(422).json({ message: "Nome de usuario é obrigatorio!!" });
  }
  if (!email) {
    return res.status(422).json({ message: "Email é obrigatorio!!" });
  }
  if (!senha) {
    return res.status(422).json({ message: "Senha é obrigatoria!!" });
  }

  //checar se o usuario existe
  const userExists = await Person.findOne({ email: email });

  if (userExists) {
    return res.status(422).json({ message: "Email já cadastrado!!" });
  }

  //create password
  const salt = await bcrypt.genSalt(12);
  const senhaHash = await bcrypt.hash(senha, salt);

  //create user
  const person = new Person({
    nome,
    email,
    senha: senhaHash,
    professor,
  });

  try {
    const user = await person.save();
    const token = jwt.sign(
      {
        id: user._id,
      },
      SECRET
    );
    res.status(201).json({
      message: "Usuário criado com sucesso!",
      token,
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        professor: user.professor,
      },
    });
    //Enviar email de confirmação
    const transport = nodemailer.createTransport({
      //chaves padrão para mandar  email usando gmail
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.SENHA,
      },
    });

    transport
      .sendMail({
        from: `Suporte neumann <${process.env.EMAIL}>`,
        to: email,
        subject: "Confirmação de Registro",
        html: "<h1>Confirmação de registro!</h1>",
        text: "Sua conta foi criada com sucesso!!",
      })
      .then(() => console.log("Email enviado com sucesso!!"))
      .catch((err) => console.log("Falha no envio! ", err));
  } catch (error) {
    res.status(500).json(error);
  }
}

async function loginController(req, res) {
  const { email, senha } = req.body;
  const { SECRET } = process.env;

  if (!email) {
    return res.status(422).json({ message: "Email é obrigatorio!!" });
  }

  if (!senha) {
    return res.status(422).json({ message: "Senha é obrigatoria!!" });
  }
  //checar se o usuario existe
  const user = await Person.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ message: "Usuario não encontrado!!" });
  }

  //checar senha
  const checkSenha = await bcrypt.compare(senha, user.senha);

  if (!checkSenha) {
    return res.status(422).json({ message: "Usuario ou Senha invalida!" });
  }

  try {
    const token = jwt.sign(
      {
        id: user._id,
      },
      SECRET
    );

    res.status(200).json({
      msg: "Autenticação realizada com sucesso!",
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        professor: user.professor,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Aconteceu um erro inesperado.",
    });
  }
}

module.exports = { registerController, loginController };
