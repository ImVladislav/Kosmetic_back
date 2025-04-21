const Routes = require("express");

const router = new Routes();
const orderedItemsController = require("../controllers/orderedItemsController");

router.post("/");
router.get("/");
router.delete("/:id");

module.exports = router;
