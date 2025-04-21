const Routes = require("express");

const router = new Routes();
const basketController = require("../controllers/basketController");

const authenticate = require("../middlewares/authenticate");

router.get("/", authenticate, basketController.getBasket); // перегляд всіх товарів у корзині користувача
router.post("/add", authenticate, basketController.createBasket); // додати новий товар до корзини користувача
router.put("/update/:id", authenticate, basketController.updateQuantity); // оновити кількість товару
router.delete("/remove/:id", authenticate, basketController.deleteBasketItem); // видалити товар

module.exports = router;
