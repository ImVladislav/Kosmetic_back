const Routes = require("express");

const router = new Routes();
const orderController = require("../controllers/orderController");
const authenticate = require("../middlewares/authenticate");

router.post("/create", authenticate, orderController.createOrder); // створення нового замовлення

// router.get("/"); // отримання всіх замовлень (адмін)

// router.put("/:id/status"); // зміна статусу замовлення (адмін)

// router.delete("/:id"); // видалення замовлення (адмін)

module.exports = router;
