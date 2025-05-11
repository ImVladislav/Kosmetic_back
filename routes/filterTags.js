const Routes = require("express");
const router = new Routes();
const multer = require("multer");
const path = require("path");

const filterTagController = require("../controllers/filterTagController");

const upload = multer({ dest: "uploads/" });

router.post(
  "/import",
  upload.single("file"),
  filterTagController.importFilterTagFromExcel
);
/**
 * @swagger
 * /filter-tags/import:
 *   post:
 *     summary: Отримати всі фільтри
 *     tags: [filter-tags]
 *     description: Отримати всі фільтри
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Фільтри успішно завантажені
 */

// Отримати всі фільтри
router.get("/", filterTagController.getAllFilterTags);
/**
 * @swagger
 * /filter-tags:
 *   get:
 *     summary: Отримати всі фільтри
 *     tags: [filter-tags]
 *     description: Отримати всі фільтри
 *     responses:
 *       200:
 *         description: Фільтри успішно отримані
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: "#/components/schemas/FilterTag"
 */

module.exports = router;
