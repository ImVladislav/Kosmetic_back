const Routes = require("express");

const router = new Routes();
const feedbackController = require("../controllers/feedbackController");

router.get("/"); // Отримання відгуків.
router.post("/"); // Додавання відгуку.

router.delete("/:id"); // видалити відгук

module.exports = router;
