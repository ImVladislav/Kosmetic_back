const Routes = require("express");

const router = new Routes();
const menuController = require("../controllers/menuController");

router.post("/"); //додати новий пункт меню
router.get("/", menuController.getAllMenu); //повернути всі пункти меню
router.delete("/:id"); //видалити пункт меню по i                                                                                                                                                     d

module.exports = router;
