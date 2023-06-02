const router = require("express").Router();
const {
      createProject,
      getAllProjects,
      getProject,
      projectUpdate,
      deleteProject,
} = require("../controllers/projectController");

router.route("/").get(getAllProjects).post(createProject);
router.route("/:id").get(getProject).patch(projectUpdate).delete(deleteProject);



module.exports = router;
