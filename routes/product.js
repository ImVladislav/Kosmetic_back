const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

// отримання всіх товарів
router.get("/", productController.getAllProducts);
/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *      - products
 *     summary: Отримання всіх товарів
 *     description: Отримання всіх товарів з можливістю фільтрації та сортування за певними параметрами (наприклад, сортування за ціною та назвою, фільтрування за категорією, брендом, новинками, акціями, наявностю та іншими параметрами товарів, а також пагінація)
 *     operationId: getAllProducts
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           description: Номер сторінки
 *           example: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           description: Кількість товарів на сторінці
 *           example: 4
 *       - name: category
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           description: Категорія товару
 *           example: Догляд для обличчя
 *       - name: brand
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           description: Бренд товару
 *           example: BIODANCE
 *       - name: newness
 *         in: query
 *         required: false
 *         schema:
 *           type: boolean
 *           description: Якщо товар новинка
 *           example: false
 *       - name: sale
 *         in: query
 *         required: false
 *         schema:
 *           type: boolean
 *           description: Якщо товар акційний
 *           example: false
 *       - name: amount
 *         in: query
 *         required: false
 *         schema:
 *           type: boolean
 *           description: Якщо товар є в наявності
 *           example: false
 *       - name: name
 *         in: query
 *         required: false
 *         schema:
 *           type: boolean
 *           description: Сортування за назвою
 *           example: true
 *       - name: price
 *         in: query
 *         required: false
 *         schema:
 *           type: boolean
 *           description: Сортування за ціною
 *           example: false
 *       - name: priceOPT
 *         in: query
 *         required: false
 *         schema:
 *           type: boolean
 *           description: Сортування за оптовою ціною
 *           example: false
 *     responses:
 *      200:
 *       description: Список товарів
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Products'
 *      404:
 *       description: Товарів не знайдено
 *      500:
 *       description: Щось пішло не так. Спробуйте ще раз пізніше
 */

// // отримання товарів за категорією
// router.get("/category/:category", productController.getCategoryProducts);
// /**
//  * @swagger
//  * /products/category/{category}:
//  *   get:
//  *     tags:
//  *      - products
//  *     summary: Отримання товарів за категорією
//  *     description: Отримання товарів за категорією з можливістю пагінації
//  *     operationId: getCategoryProducts
//  *     responses:
//  *      200:
//  *          description: Список товарів з категорії
//  *          content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Products'
//  *      404:
//  *          description: Товарів не знайдено
//  */

// // отримання товарів за брендом
// router.get("/brand/:brand", productController.getBrandProducts);
// /**
//  * @swagger
//  * /products/brand/{brand}:
//  *   get:
//  *     tags:
//  *      - products
//  *     summary: Отримання товарів за брендом
//  *     description: Отримання товарів за брендом з можливістю пагінації
//  *     operationId: getBrandProducts
//  *     responses:
//  *      200:
//  *          description: Список товарів з брендом
//  *          content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Products'
//  *      404:
//  *          description: Товарів не знайдено
//  */

// пошук товарів

router.get("/search", productController.getSearchQueryProducts);
/**
 * @swagger
 * /products/search:
 *   get:
 *     tags:
 *      - products
 *     summary: Пошук товарів
 *     description: Пошук товарів за пошуковим запитом по назві, коду, опису, бренду та іншим параметрам
 *     operationId: getSearchQueryProducts
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           description: Номер сторінки
 *           example: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           description: Кількість товарів на сторінці
 *           example: 4
 *       - name: query
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           description: Пошуковий запит
 *           example: BIODANCE
 *     responses:
 *      200:
 *          description: Список товарів, які відповідають пошуковому запиту
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *      404:
 *          description: Товарів не знайдено
 */

// // отримання товарів з знижкою
// router.get("/discount", productController.getDiscountedProducts);
// /**
//  * @swagger
//  * /products/discount:
//  *   get:
//  *     tags:
//  *      - products
//  *     summary: Отримання товарів з знижкою
//  *     description: Отримання товарів з знижкою з можливістю пагінації
//  *     operationId: getDiscountedProducts
//  *     responses:
//  *      200:
//  *          description: Список товарів з знижкою
//  *          content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Products'
//  *      404:
//  *          description: Товарів не знайдено
//  */

// // отримання нових товарів
// router.get("/newness", productController.getNewnessProducts);
// /**
//  * @swagger
//  * /products/newness:
//  *   get:
//  *     tags:
//  *      - products
//  *     summary: Отримання нових товарів
//  *     description: Отримання нових товарів з можливістю пагінації
//  *     operationId: getNewnessProducts
//  *     responses:
//  *      200:
//  *         description: Список нових товарів
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Products'
//  *      404:
//  *         description: Товарів не знайдено
//  */

// створення нового товару

router.post("/", productController.createProduct);
/**
 * @swagger
 * /products:
 *   post:
 *     tags:
 *      - products
 *     summary: Створення нового товару (адмін)
 *     description: Створення нового товару (адмін) з можливістю вказати всі параметри товару
 *     operationId: createProduct
 *     requestBody:
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Створено новий товар
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *       400:
 *        description: "Product with this code already exists"
 *       404:
 *         description: Товар не створено
 *       500:
 *        description: Щось пішло не так. Спробуйте ще раз пізніше
 */

// отримання товару по id
router.get("/:id", productController.getProductById);
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags:
 *      - products
 *     summary: Отримання товару по id
 *     description: Отримання товару по id з можливістю перевірки наявності товару
 *     operationId: getProductById
 *     parameters:
 *        - name: id
 *          in: path
 *          description: ID товару
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *            example: 3214567
 *     responses:
 *       200:
 *        description: Товар знайдено
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *       400:
 *        description: Некоректний запит
 *       404:
 *        description: Товар не знайдено
 *       500:
 *        description: Щось пішло не так. Спробуйте ще раз пізніше
 */

// оновлення товару по id
router.put("/:id", productController.updateProduct);
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags:
 *       - products
 *     summary: Оновлення товару по ID
 *     description: Оновлення товару по ID, без можливості змінювати id та code
 *     operationId: updateProduct
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Унікальний ідентифікатор товару
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Об'єкт товару для оновлення (без id та code)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Назва товару
 *                 example: "Легкий сонцезахисний крем Lador Tamanu Airy Sunscreen SPF 50+ PA++++ - 50 мл"
 *               article:
 *                 type: string
 *                 description: Артикул товару
 *                 examples: "7c8-754"
 *               amount:
 *                 type: integer
 *                 description: Кількість товару
 *                 example: 566
 *               description:
 *                 type: string
 *                 description: Опис товару
 *                 example: "Легкий сонцезахисний крем Lador Tamanu Airy Sunscreen SPF 50+ PA++++ - 50 мл"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Ціна товару
 *                 example: 49.99
 *               priceOld:
 *                 type: number
 *                 format: float
 *                 description: Стара ціна товару
 *                 example: 59.99
 *               priceOldOPT:
 *                 type: number
 *                 format: float
 *                 description: Оптова стара ціна товару
 *                 examples: 49.99
 *               priceOPT:
 *                 type: number
 *                 format: float
 *                 description: Оптова ціна товару
 *                 example: 39.99
 *               brand:
 *                 type: string
 *                 description: Бренд товару
 *                 example: "BIODANCE"
 *               images:
 *                 type: string
 *                 format: uri
 *                 description: Список зображень товару
 *                 example: "https://example.com/image1.jpg"
 *               newness:
 *                 type: boolean
 *                 description: Чи є товар новинкою
 *                 example: false
 *               sale:
 *                 type: boolean
 *                 description: Чи є товар на розпродажу
 *                 example: true
 *               category:
 *                 type: string
 *                 description: Категорія товару
 *                 example: "Креми"
 *               subCategory:
 *                 type: string
 *                 description: Підкатегорія товару
 *                 example: "Сонцезахисні креми"
 *               subSubCategory:
 *                 type: string
 *                 description: Додаткова підкатегорія товару
 *                 examples: "Сонцезахисні креми для обличчя"
 *               country:
 *                 type: string
 *                 description: Країна виробник
 *                 example: "Південна Корея"
 *               compound:
 *                 type: string
 *                 description: Склад товару
 *                 example: "Склад: крем забезпечення сонцезахисними світлом, 50 мл"
 *             required:
 *               - name
 *               - article
 *               - amount
 *               - description
 *               - price
 *               - brand
 *               - category
 *     responses:
 *       200:
 *         description: Товар успішно оновлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Невірний запит (наприклад, передано id або code)
 *       404:
 *         description: Товар не знайдено
 *       500:
 *         description: Внутрішня помилка сервера
 */

// видалення товару по id
router.delete("/:id", productController.deleteProduct);
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags:
 *      - products
 *     summary: Видалення товару по id
 *     description: Видалення товару по id з можливістю перевірки наявності товару
 *     operationId: deleteProduct
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID товару
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *        description: Видалено товар
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *       404:
 *        description: Товар не видалено
 */

module.exports = router;
