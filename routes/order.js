const Routes = require("express");
const router = new Routes();
const orderController = require("../controllers/orderController");
const authenticate = require("../middlewares/authenticate");
const isAdmin = require("../middlewares/isAdmin");
const optionalAuth = require("../middlewares/optionalAuth");

/** Створення нового замовлення */
router.post("/", optionalAuth, orderController.createOrder);
/**
 * @swagger
 * /order:
 *   post:
 *     summary: Створити замовлення
 *     tags: [order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentMethod:
 *                 type: string
 *               comments:
 *                 type: string
 *               delivery:
 *                 type: string
 *               warehouse:
 *                 type: string
 *               address:
 *                 type: string
 *               building:
 *                 type: string
 *               apartment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Замовлення створено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
 *       400:
 *         description: Помилка при створенні замовлення
 */

/** Отримання всіх замовлень користувача в особистому кабінеті */
router.get("/my", authenticate, orderController.getUserOrders);
/**
 * @swagger
 * /order/my:
 *   get:
 *     summary: Отримати всі замовлення поточного користувача
 *     tags: [order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список замовлень користувача
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Неавторизований доступ
 */

/** Отримання деталі замовления за ID */
router.get("/my/:id", authenticate, orderController.getUserOrderById);
/**
 * @swagger
 * /order/my/{id}:
 *   get:
 *     summary: Отримати деталі замовлення користувача за ID
 *     tags: [order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID замовлення
 *     responses:
 *       200:
 *         description: Деталі замовлення
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       401:
 *         description: Неавторизований доступ
 *       404:
 *         description: Замовлення не знайдено
 */

/** Отримання всіх замовлень (для адміністратора) */
router.get("/admin", authenticate, isAdmin, orderController.getAllOrdersAdmin);
/**
 * @swagger
 * /order/admin:
 *   get:
 *     summary: Отримати всі замовлення з фільтрацією та пагінацією (для адміністратора)
 *     tags: [order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Пошук за електронною поштою
 *       - in: query
 *         name: orderNumber
 *         schema:
 *           type: string
 *       - in: query
 *         name: fullName
 *         schema:
 *           type: string
 *         description: Ім’я та прізвище, розділені пробілом
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Дата замовлення у форматі YYYY-MM-DD
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Всі, Новий, Прийняте в роботу, Збирається, Зібрано, Відправлено, Відміна]
 *       - in: query
 *         name: paymentMethod
 *         schema:
 *           type: string
 *       - in: query
 *         name: total
 *         schema:
 *           type: number
 *         description: Загальна сума замовлення
 *     responses:
 *       200:
 *         description: Успішне отримання замовлень
 */

/** Отримання деталі замовлення за ID (тільки для адміністратора) */
router.get(
  "/admin/:id",
  authenticate,
  isAdmin,
  orderController.getOrderByIdAdmin
);
/**
 * @swagger
 * /order/admin/{id}:
 *   get:
 *     summary: Отримати деталі замовлення за ID (для адміністратора)
 *     tags: [order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID замовлення
 *     responses:
 *       200:
 *         description: Деталі замовлення
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       401:
 *         description: Неавторизований доступ
 *       403:
 *         description: Доступ заборонено (не адміністратор)
 *       404:
 *         description: Замовлення не знайдено
 */

/** Оновлення статусу замовлення (тільки для адміністратора) */
router.patch(
  "/admin/:id",
  authenticate,
  isAdmin,
  orderController.updateOrderStatus
);
/**
 * @swagger
 * /order/admin/{id}:
 *   patch:
 *     summary: Оновити статус замовлення (для адміністратора)
 *     tags: [order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID замовлення
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Новий, Прийняте в роботу, Збирається, Зібрано, Відправлено, Відміна]
 *                 example: Відправлено
 *     responses:
 *       200:
 *         description: Статус замовлення оновлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Невірний запит або недопустимий перехід статусу
 *       401:
 *         description: Неавторизований доступ
 *       403:
 *         description: Доступ заборонено (не адміністратор)
 *       404:
 *         description: Замовлення не знайдено
 */

module.exports = router;
