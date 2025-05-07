const Routes = require("express");

const router = new Routes();
const typeController = require("../controllers/typeController");

router.post("/", typeController.createType);
router.get("/", typeController.getAllType);
router.delete("/:id", typeController.deleteType);

module.exports = router;
