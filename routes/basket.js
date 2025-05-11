const Routes = require("express");
const router = new Routes();

const basketController = require("../controllers/basketController");
const optionalAuth = require("../middlewares/optionalAuth");

//отримання всіх товарів у корзині користувача
router.get("/", optionalAuth, basketController.getBasket);
/**
 * @swagger
 * /basket:
 *   get:
 *     summary: Отримати всі товари у кошику користувача
 *     tags: [basket]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Повертає кошик користувача
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Basket'
 */

//додати новий товар або оновити товар у кошику користувача
router.post("/", optionalAuth, basketController.addOrUpdateItem);
/**
 * @swagger
 * /basket:
 *   post:
 *     summary: Додати або оновити товар у кошику
 *     tags: [basket]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Товар додано або оновлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasketItem'
 */

// видалити товар з кошика по id
router.delete("/clear/:productId", optionalAuth, basketController.removeItem);
/**
 * @swagger
 * /basket/clear/{productId}:
 *   delete:
 *     summary: Видалити товар з кошика
 *     tags: [basket]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Товар успішно видалено
 *       401:
 *         description: Неавторизований доступ
 */

// очистити весь кошик
router.delete("/clear", optionalAuth, basketController.clearBasket);
/**
 * @swagger
 * /basket/clear:
 *   delete:
 *     summary: Очистити весь кошик користувача
 *     tags: [basket]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Кошик очищено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Кошик очищено
 *       401:
 *         description: Неавторизований доступ
 */

module.exports = router;
