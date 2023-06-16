const Project = require("../models/Project");

async function createProject(req, res) {
  //req.body onde vai chegar os dados
  const { nome, descricao, participantes } = req.body;
  const project = {
    nome,
    descricao,
    participantes,
  };
  if (!project) {
    res.status(422).json({ error: "Projeto não foi encontrado" });
    return;
  }
  if (!nome) {
    res.status(422).json({ error: "Nome obrigatorio!" });
    return;
  }
  if (!descricao) {
    res.status(422).json({ error: "Descrição obrigatorio!" });
    return;
  }

  // create
  try {
    await Project.create(project);

    res
      .status(201)
      .json({ message: "Projeto inserida no sistema com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getAllProjects(req, res) {
  try {
    const project = await Project.find();
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getProject(req, res) {
  //extrair o dado de requisição, pela url = req.params
  const id = req.params.id;

  try {
    const project = await Project.findOne({ _id: id });

    if (!project) {
      res.status(422).json({ message: "Projeto não encontrado!" });
      return;
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function projectUpdate(req, res) {
  const id = req.params.id;
  const { nome, descricao, participantes } = req.body;
  const project = {
    nome,
    descricao,
    participantes,
  };

  try {
    const updatedProject = await Project.updateOne({ _id: id }, project);
    if (updatedProject.matchedCount === 0) {
      res.status(422).json({ error: "Projeto não foi encontrado" });
      return;
    }
    res.status(200).json({ msg: "Projeto atualizado com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}

async function deleteProject(req, res) {
  const id = req.params.id;

  const project = await Project.findOne({ _id: id });
  if (!project) {
    res.status(422).json({ error: "Projeto não foi encontrado" });
    return;
  }

  try {
    await Project.deleteOne({ _id: id });
    res.status(200).json("Projeto removido com sucesso!");
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  createProject,
  getAllProjects,
  getProject,
  projectUpdate,
  deleteProject,
};
