const Pub = require("../models/Pub");

async function createPub(req, res) {
  //req.body onde vai chegar os dados
  const { titulo, conteudo, autor } = req.body;

  const pub = {
    titulo,
    conteudo,
    autor,
  };

  if (!pub) {
    res.status(422).json({ error: "Publicação não foi encontrado" });
    return;
  }

  if (!titulo) {
    res.status(422).json({ error: "Titulo obrigatorio!" });
    return;
  }
  // create
  try {
    await Pub.create(pub);

    res
      .status(201)
      .json({ message: "Publicação inserida no sistema com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getAllPubs(req, res) {
  try {
    const pubs = await Pub.find();

    res.status(200).json(pubs);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getPub(req, res) {
  //extrair o dado de requisição, pela url = req.params
  const id = req.params.id;

  try {
    const pub = await Pub.findOne({ _id: id });

    if (!pub) {
      res.status(422).json({ message: "Publicação não encontrada!" });
      return;
    }

    res.status(200).json(pub);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function updatePub(req, res) {
  const id = req.params.id;

  const { titulo, conteudo, autor } = req.body;

  const pub = {
    titulo,
    conteudo,
    autor,
  };

  try {
    const updatedPub = await Pub.updateOne({ _id: id }, pub);
    if (updatedPub.matchedCount === 0) {
      res.status(422).json({ error: "Publicação não foi encontrada!" });
      return;
    }
    res.status(200).json(pub);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function deletePub(req, res) {
  const id = req.params.id;

  const pub = await Pub.findOne({ _id: id });
  if (!pub) {
    res.status(422).json({ error: "Publicação não foi encontrada" });
    return;
  }

  try {
    await Pub.deleteOne({ _id: id });

    res.status(200).json("Publicação removida com sucesso!");
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
module.exports = { createPub, getAllPubs, getPub, updatePub, deletePub };
