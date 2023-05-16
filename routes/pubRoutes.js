const router = require("express").Router();
const {
  createPub,
  getAllPubs,
  getPub,
  updatePub,
  deletePub,
} = require("../controllers/pubController");

router.route("/").post(createPub).get(getAllPubs);
router.route("/:id").get(getPub).patch(updatePub).delete(deletePub);

module.exports = router;
