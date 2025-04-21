const Routes = require("express");

const router = new Routes();
const brandController = require("../controllers/brandController");

router.get("/", brandController.getAllBrands); // отримати всі бренди
/**
 * @swagger
 * /brands:
 *   get:
 *     tags:
 *      - brands
 *     summary: Отримання всіх брендів
 *     description: Отримання всіх брендів з бази даних
 *     operationId: getAllBrands
 *     responses:
 *      200:
 *          description: Список брендів
 *          content:
 *           application/json:
 *             schema:
 *              type: array
 *              properties:
 *                letter:
 *                  type: string
 *                  example: A
 *                brands:
 *                  type: array
 *                  example: ["Apple", "Acer", "Asus"]
 */

router.post("/", brandController.createBrand); // додати новий бренд
/**
 * @swagger
 * /brands:
 *   post:
 *     tags:
 *      - brands
 *     summary: Створення бренду (адмін)
 *     description: Створення нового бренду (адмін) з можливістю вказати всі параметри бренду
 *     requestBody:
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Brand'
 *     responses:
 *       201:
 *         description: Створено новий бренд
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Brand'
 */
router.get("/:id", brandController.getBrandById); // отримати бренд по id
/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     tags:
 *      - brands
 *     summary: Отримання бренду по id
 *     description: Отримання бренду по id з можливістю перевірки наявності бренду в базі даних
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID бренду
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *        description: Бренд знайдено
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Brand'
 *       404:
 *        description: Бренд не знайдено
 */
// router.put("/:id"); // змінити бренд по id

// router.delete("/:id"); // видалити бренд по id

module.exports = router;
