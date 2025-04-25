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
 *                  example: "12345Abc"
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
 *                avatarUrl:
 *                  type: string
 *                  description: URL аватарки користувача
 *                  example: "https://example.com/avatar.jpg"
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
 *                email:
 *                  type: string
 *                  description: Електронна пошта користувача
 *                  example: "Ivanchenko_Ivan@example.com"
 *                firstName:
 *                  type: string
 *                  description: Ім'я користувача
 *                  example: "Іван"
 *                lastName:
 *                  type: string
 *                  description: Прізвище користувача
 *                  example: "Іванченко"
 *                number:
 *                  type: string
 *                  description: Номер телефону користувача
 *                  example: "+380123456789"
 *                isAdmin:
 *                  type: boolean
 *                  description: Чи є користувач адміном
 *                  example: true
 *                optUser:
 *                  type: boolean
 *                  description: Чи є користувач оптовим
 *                  example: false
 *                token:
 *                  type: string
 *                  description: Токен користувача
 *                  example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"
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
 *                avatarUrl:
 *                  type: string
 *                  description: URL аватарки користувача
 *                  example: "https://example.com/avatar.jpg"
 *                optUser:
 *                  type: boolean
 *                  description: Чи є користувач оптовим
 *                  example: false
 *                isAdmin:
 *                  type: boolean
 *                  description: Чи є користувач адміном
 *                  example: true
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

/** оновлення даних користувача */
router.patch("/update", authenticate, userController.update);
/**
 * @swagger
 * /auth/update:
 *   post:
 *     tags:
 *      - user
 *     summary: Оновлення даних користувача
 *     description: Оновлення даних користувача
 *     operationId: update
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *         description: Об'єкт користувача для оновлення даних
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
 *                  example: "12345Abc"
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
 *                avatarUrl:
 *                  type: string
 *                  description: URL аватарки користувача
 *                  example: "https://example.com/avatar.jpg"
 *                optUser:
 *                  type: boolean
 *                  description: Чи є користувач оптовим
 *                  example: false
 *                isAdmin:
 *                  type: boolean
 *                  description: Чи є користувач адміном
 *                  example: true
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
 *                avatarUrl:
 *                  type: string
 *                  description: URL аватарки користувача
 *                  example: "https://example.com/avatar.jpg"
 *                optUser:
 *                  type: boolean
 *                  description: Чи є користувач оптовим
 *                  example: false
 *                isAdmin:
 *                  type: boolean
 *                  description: Чи є користувач адміном
 *                  example: true
 *       400:
 *         description: Щось пішло не так. Спробуйте ще раз пізніше
 */

/** відновлення пароля */
router.post("/forgotPassword", userController.forgotPassword);
/**
 * @swagger
 * /auth/forgotPassword:
 *   post:
 *     tags:
 *      - user
 *     summary: Відновлення пароля
 *     description: Відновлення пароля через email користувача
 *     operationId: forgotPassword
 *     requestBody:
 *         required: true
 *         description: Email користувача для відновлення пароля
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *               - email
 *              properties:
 *                email:
 *                  type: string
 *                  description: Електронна пошта користувача
 *                  example: "Ivanchenko_Ivan@example.com"
 *     responses:
 *       201:
 *         description: Реєстрація користувача
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *               message:
 *                 type: string
 *                 description: Повідомлення про успішне відновлення пароля
 *                 example: "Password changed successfully"
 *       400:
 *        description: Щось пішло не так. Спробуйте ще раз пізніше
 */

//** зміна пароля */
router.post("/changePassword", authenticate, userController.changePassword);
/**
 * @swagger
 * /auth/changePassword:
 *   post:
 *     tags:
 *      - user
 *     summary: Зміна пароля користувача
 *     description: Дозволяє змінити пароль користувача після перевірки старого пароля
 *     operationId: changePassword
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Дані для зміни пароля
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: Старий пароль користувача
 *                 example: "OldPassword123"
 *               newPassword:
 *                 type: string
 *                 description: Новий пароль користувача
 *                 example: "NewPassword456"
 *     responses:
 *       200:
 *         description: Пароль успішно змінено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password changed successfully"
 *       400:
 *         description: Невірний старий пароль або інша помилка
 */

module.exports = router;
