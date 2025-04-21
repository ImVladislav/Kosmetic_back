const Routes = require("express");

const router = new Routes();
const userController = require("../controllers/userController");

const authenticate = require("../middlewares/authenticate");

/** реєстрація нового користувача */
router.post("/register", userController.register);
/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *      - user
 *     summary: Реєстрація нового користувача
 *     description: Реєстрація нового користувача
 *     operationId: register
 *     requestBody:
 *         description: Об'єкт користувача для реєстрації
 *         required: true
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                firstName:
 *                  type: string
 *                  description: Ім'я користувача
 *                  example: "Іван"
 *                lastName:
 *                  type: string
 *                  description: Прізвище користувача
 *                  example: "Іванченко"
 *                email:
 *                  type: string
 *                  description: Електронна пошта користувача
 *                  example: "Ivanchenko_Ivan@example.com"
 *                password:
 *                  type: string
 *                  description: Пароль користувача
 *                  example: "$2b$10$j3h8gK7yB769a7l8..jB.e"
 *                city:
 *                  type: string
 *                  description: Місто користувача
 *                  example: "Київ"
 *                number:
 *                  type: string
 *                  description: Номер телефону користувача
 *                  example: "+380123456789"
 *                linkSite:
 *                  type: string
 *                  description: Сайт користувача
 *                  example: "https://example.com"
 *                offlineShop:
 *                  type: boolean
 *                  description: Чи є магазин у користувача
 *                  example: true
 *                onlineShop:
 *                  type: boolean
 *                  description: Чи є онлайн магазин у користувача
 *                  example: true
 *                socialMedia:
 *                  type: string
 *                  description: Соціальні мережі користувача
 *                  example: "https://www.facebook.com/example"
 *                token:
 *                  type: string
 *                  description: Токен користувача
 *                  example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"
 *                avatarUrl:
 *                  type: string
 *                  description: URL аватарки користувача
 *                  example: "https://example.com/avatar.jpg"
 *                verify:
 *                  type: boolean
 *                  description: Чи є верифікація користувача
 *                  example: true
 *                verificationCode:
 *                  type: string
 *                  description: Код верифікації користувача
 *                  example: "123456"
 *                optUser:
 *                  type: boolean
 *                  description: Чи є користувач оптовим
 *                  example: false
 *                isAdmin:
 *                  type: boolean
 *                  description: Чи є користувач адміном
 *                  example: true
 *              required:
 *                 - firstName
 *                 - lastName
 *                 - email
 *                 - password
 *                 - number
 *     responses:
 *       201:
 *         description: Реєстрація користувача
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                firstName:
 *                  type: string
 *                  description: Ім'я користувача
 *                  example: "Іван"
 *                lastName:
 *                  type: string
 *                  description: Прізвище користувача
 *                  example: "Іванченко"
 *                email:
 *                  type: string
 *                  description: Електронна пошта користувача
 *                  example: "Ivanchenko_Ivan@example.com"
 *
 *       400:
 *         description: Щось пішло не так. Спробуйте ще раз пізніше
 */

// router.post("/verifyEmail"); // верифікація електронно пошти

/** авторизація користувача */
router.post("/login", userController.login);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *      - user
 *     summary: Авторизація користувача
 *     description: Авторизація користувача
 *     operationId: login
 *     requestBody:
 *         description: Об'єкт користувача для авторизації
 *         required: true
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  description: Електронна пошта користувача
 *                  example: "4G4Fg@example.com"
 *                password:
 *                  type: string
 *                  description: Пароль користувача
 *                  example: "password123"
 *     responses:
 *       200:
 *         description: Авторизація користувача
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                  description: Токен користувача
 *                  example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"
 *       400:
 *         description: Щось пішло не так. Спробуйте ще раз пізніше
 */

/** перевірка авторизації користувача */
router.get("/current", authenticate, userController.getCurrent);
/**
 * @swagger
 * /auth/current:
 *   get:
 *     tags:
 *      - user
 *     summary: Перевірка авторизації користувача
 *     description: Перевірка авторизації користувача
 *     operationId: getCurrent
 *     security:
 *      - bearerAuth: []
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: Токен користувача
 *         schema:
 *           type: string
 *           format: Bearer
 *           example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"
 *     responses:
 *       200:
 *         description: Перевірка авторизації користувача
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                firstName:
 *                  type: string
 *                  description: Ім'я користувача
 *                  example: "Іван"
 *                lastName:
 *                  type: string
 *                  description: Прізвище користувача
 *                  example: "Іванченко"
 *                email:
 *                  type: string
 *                  description: Електронна пошта користувача
 *                  example: "Ivanchenko_Ivan@example.com"
 *       401:
 *         description: Не авторизований користувач
 */

/** вихід з аккаунту */
router.post("/logout", authenticate, userController.logout);
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags:
 *      - user
 *     summary: Вихід з аккаунту
 *     description: Вихід з аккаунту
 *     operationId: logout
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Вихід з аккаунту
 *       401:
 *         description: Не авторизований користувач
 */

router.get("/:userId"); // отримання даних користувача
router.put("/:userId"); // оновледання даних користувача
// router.post("/changePassword"); // зміна пароля

router.post("/forgotPassword"); // відновлення пароля
router.post("/resetPassword"); // зміна пароля після відновлення

module.exports = router;
