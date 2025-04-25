const Routes = require("express");

const router = new Routes();
const basketController = require("../controllers/basketController");

const authenticate = require("../middlewares/authenticate");

//отримання всіх товарів у корзині користувача
router.get("/", authenticate, basketController.getBasket);
/**
 * @swagger
 * /basket:
 *   get:
 *     tags:
 *       - basket
 *     summary: Отримати всі товари з кошика користувача
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Повертає вміст кошика
 *       401:
 *         description: Неавторизований доступ
 */

router.post("/add", authenticate, basketController.addToBasket); // додати новий товар до корзини користувача
/**
 * @swagger
 * /basket/add:
 *   post:
 *     tags:
 *       - basket
 *     summary: Додати товар в кошик
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Товар додано в кошик
 *       401:
 *         description: Неавторизований доступ
 */

router.patch("/update/:id", authenticate, basketController.updateQuantity); // оновити кількість товару
/**
 * @swagger
 * /basket/update/{id}:
 *   patch:
 *     tags:
 *       - basket
 *     summary: Оновити кількість товару в кошику
 *     description: Змінює кількість конкретного товару в кошику користувача
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID товару в кошику
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Кількість успішно оновлена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Кількість оновлено"
 *                 item:
 *                   $ref: '#/components/schemas/OrderedItem'
 *       400:
 *         description: Невірна кількість
 *       404:
 *         description: Товар не знайдено
 */
router.delete("/remove/:id", authenticate, basketController.deleteBasketItem); // видалити товар
/**
 * @swagger
 * /basket/remove/{id}:
 *   delete:
 *     tags:
 *       - basket
 *     summary: Видалити товар з кошика
 *     description: Видаляє один товар з кошика користувача
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID товару в кошику
 *     responses:
 *       200:
 *         description: Товар успішно видалено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Товар видалено з кошика"
 *       404:
 *         description: Товар не знайдено або не належить користувачу
 */

router.delete("/clear", authenticate, basketController.clearBasket); // очистити корзину
/**
 * @swagger
 * /basket/clear:
 *   delete:
 *     tags:
 *       - basket
 *     summary: Очистити кошик користувача
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Кошик очищено
 *       401:
 *         description: Неавторизований доступ
 */

module.exports = router;
