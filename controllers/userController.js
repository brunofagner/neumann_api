const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Person = require("../models/Person");

async function createPerson(req, res) {
  //req.body onde vai chegar os dados
  const { nome, email, senha, professor } = req.body;
  bcrypt.hash(senha, 10).then(async (hash) => {
    const person = {
      nome,
      email,
      senha: hash,
      professor,
    };

    if (!person) {
      res.status(422).json({ error: "Usuario não foi encontrado" });
      return;
    }
    if (!nome) {
      res.status(422).json({ error: "Nome obrigatorio!" });
      return;
    }
    // create
    try {
      await Person.create(person);

      res
        .status(201)
        .json({ message: "Pessoa inserida no sistema com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
}

async function getAllPeople(req, res) {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getPerson(req, res) {
  //extrair o dado de requisição, pela url = req.params
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });

    if (!person) {
      res.status(422).json({ message: "Usuario não encontrado!" });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function personUpdate(req, res) {
  const id = req.params.id;
  const { nome, email, senha, professor } = req.body;

  const person = {
    nome,
    email,
    senha,
    professor,
  };

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);
    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ error: "Usuario não foi encontrado" });
      return;
    }
    res.status(200).json({ id, person });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}

async function deletePerson(req, res) {
  const id = req.params.id;

  const person = await Person.findOne({ _id: id });
  if (!person) {
    res.status(422).json({ error: "Usuario não foi encontrado" });
    return;
  }

  try {
    await Person.deleteOne({ _id: id });

    res.status(200).json("Usuario removido com sucesso!");
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  createPerson,
  getAllPeople,
  getPerson,
  personUpdate,
  deletePerson,
};
