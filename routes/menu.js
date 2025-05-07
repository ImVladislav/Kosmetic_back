const Routes = require("express");

const router = new Routes();
const menuController = require("../controllers/menuController");

router.get("/", menuController.getAllMenu); //повернути всі пункти меню

module.exports = router;
