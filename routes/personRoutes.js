const router = require("express").Router();
const {
  createPerson,
  getAllPeople,
  getPerson,
  personUpdate,
  deletePerson,
} = require("../controllers/userController");

router.route("/").get(getAllPeople).post(createPerson);
router.route("/:id").get(getPerson).patch(personUpdate).delete(deletePerson);

module.exports = router;
